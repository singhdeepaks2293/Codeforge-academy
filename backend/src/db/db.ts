import { createRequire } from 'node:module';
import { readFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// node:sqlite is loaded via createRequire so Vitest's module transform does not
// try to resolve the builtin specifier as a file.
const require = createRequire(import.meta.url);
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');

// Thin typed wrapper over node:sqlite's DatabaseSync. The driver's own
// StatementSync types are very strict (SQLInputValue / SQLOutputValue),
// which makes ordinary Express handler code (req.params / req.query are
// string | string[]) need a cast at every call site. This interface keeps
// the same runtime behaviour with pragmatic argument types.
export interface LooseStatement {
  get(...args: unknown[]): Record<string, unknown> | undefined;
  all(...args: unknown[]): Record<string, unknown>[];
  run(...args: unknown[]): { changes: number; lastInsertRowid: number | bigint };
}
export interface Db {
  prepare(sql: string): LooseStatement;
  exec(sql: string): void;
  close(): void;
}

let db: Db | null = null;

export function getDbPath(): string {
  return process.env.DATABASE_PATH || join(process.cwd(), 'data', 'codeforge.db');
}

export function openDb(path?: string): Db {
  if (db) return db;
  const p = path || getDbPath();
  mkdirSync(dirname(p), { recursive: true });
  db = new DatabaseSync(p) as unknown as Db;
  db.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;');
  applyMigrations(db);
  return db;
}

export function applyMigrations(conn: Db): void {
  conn.exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
    version TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT (datetime('now')));`);
  const dir = join(dirname(fileURLToPath(import.meta.url)), 'migrations');
  const files = readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
  for (const f of files) {
    const version = f.replace('.sql', '');
    const row = conn.prepare('SELECT 1 FROM schema_migrations WHERE version = ?').get(version);
    if (!row) {
      const sql = readFileSync(join(dir, f), 'utf8');
      conn.exec(sql);
      conn.prepare('INSERT INTO schema_migrations (version) VALUES (?)').run(version);
    }
  }
}

export function closeDb(): void {
  if (db) { db.close(); db = null; }
}

export function uid(prefix = 'id'): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

export function nowIso(): string {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

export function getMeta(conn: Db, key: string): string | null {
  const row = conn.prepare('SELECT value FROM app_meta WHERE key = ?').get(key) as { value: string } | undefined;
  return row ? row.value : null;
}
export function setMeta(conn: Db, key: string, value: string): void {
  conn.prepare(`INSERT INTO app_meta (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(key, value);
}

export function getConfig(conn: Db, key: string, fallback = ''): string {
  const row = conn.prepare('SELECT value FROM runtime_config WHERE key = ?').get(key) as { value: string } | undefined;
  return row ? row.value : fallback;
}
export function setConfig(conn: Db, key: string, value: string): void {
  conn.prepare(`INSERT INTO runtime_config (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`).run(key, value);
}

export const DEFAULT_PERMISSIONS: { name: string; description: string }[] = [
  { name: 'users.read', description: 'View users' },
  { name: 'users.create', description: 'Create users' },
  { name: 'users.update', description: 'Update users and assign roles' },
  { name: 'users.delete', description: 'Delete / suspend users' },
  { name: 'roles.read', description: 'View roles' },
  { name: 'roles.manage', description: 'Create, edit and delete roles and permissions' },
  { name: 'courses.read', description: 'View courses' },
  { name: 'courses.create', description: 'Create courses' },
  { name: 'courses.update', description: 'Update courses' },
  { name: 'courses.delete', description: 'Delete courses' },
  { name: 'lessons.manage', description: 'Create and edit lessons, exercises and hints' },
  { name: 'projects.manage', description: 'Manage projects and milestones' },
  { name: 'submissions.review', description: 'Review project submissions' },
  { name: 'system.settings', description: 'Change system settings and runtime config' },
];

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  student: ['courses.read'],
  instructor: ['courses.read', 'courses.create', 'courses.update', 'lessons.manage', 'projects.manage', 'submissions.review', 'users.read'],
  admin: ['users.read', 'users.create', 'users.update', 'users.delete', 'roles.read', 'courses.read', 'courses.create', 'courses.update', 'courses.delete', 'lessons.manage', 'projects.manage', 'submissions.review', 'system.settings'],
  'super-admin': DEFAULT_PERMISSIONS.map((p) => p.name),
};

export function seedRolesAndPermissions(conn: Db): void {
  for (const p of DEFAULT_PERMISSIONS) {
    conn.prepare('INSERT OR IGNORE INTO permissions (id, name, description) VALUES (?, ?, ?)').run(p.name, p.name, p.description);
  }
  const roles: { id: string; name: string; desc: string; system: number }[] = [
    { id: 'student', name: 'student', desc: 'Learner', system: 1 },
    { id: 'instructor', name: 'instructor', desc: 'Course author and reviewer', system: 1 },
    { id: 'admin', name: 'admin', desc: 'Platform administrator', system: 1 },
    { id: 'super-admin', name: 'super-admin', desc: 'Full platform administration', system: 1 },
  ];
  for (const r of roles) {
    conn.prepare('INSERT OR IGNORE INTO roles (id, name, description, is_system) VALUES (?, ?, ?, ?)').run(r.id, r.name, r.desc, r.system);
    for (const perm of ROLE_PERMISSIONS[r.id] || []) {
      conn.prepare('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)').run(r.id, perm);
    }
  }
  // Default runtime config
  const defaults: Record<string, string> = {
    mastery_pass_percent: '80',
    dsa_requires_mastery: 'true',
    projects_require_dsa: 'false',
    run_timeout_ms: '10000',
    max_failed_logins: '5',
    lockout_minutes: '15',
    xp_per_lesson: '50',
    xp_per_exercise: '20',
    xp_per_dsa: '30',
    xp_per_project_milestone: '40',
    daily_goal_xp: '100',
  };
  for (const [k, v] of Object.entries(defaults)) {
    conn.prepare('INSERT OR IGNORE INTO runtime_config (key, value) VALUES (?, ?)').run(k, v);
  }
  const achievements: { id: string; title: string; desc: string; xp: number; icon: string }[] = [
    { id: 'first-program', title: 'First Program', desc: 'Run your first program', xp: 10, icon: '🚀' },
    { id: 'lessons-10', title: '10 Lessons Completed', desc: 'Complete 10 lessons', xp: 50, icon: '📚' },
    { id: 'lessons-50', title: '50 Lessons Completed', desc: 'Complete 50 lessons', xp: 150, icon: '📖' },
    { id: 'exercises-100', title: '100 Exercises Solved', desc: 'Solve 100 exercises', xp: 200, icon: '💯' },
    { id: 'debugging-expert', title: 'Debugging Expert', desc: 'Solve 10 debugging exercises', xp: 100, icon: '🐛' },
    { id: 'c-master', title: 'C Master', desc: 'Pass the C mastery assessment', xp: 300, icon: '⚡' },
    { id: 'cpp-master', title: 'C++ Master', desc: 'Pass the C++ mastery assessment', xp: 300, icon: '⚡' },
    { id: 'python-master', title: 'Python Master', desc: 'Pass the Python mastery assessment', xp: 300, icon: '🐍' },
    { id: 'typescript-master', title: 'TypeScript Master', desc: 'Pass the TypeScript mastery assessment', xp: 300, icon: '🔷' },
    { id: 'react-master', title: 'React Master', desc: 'Pass the React mastery assessment', xp: 300, icon: '⚛️' },
    { id: 'rust-master', title: 'Rust Master', desc: 'Pass the Rust mastery assessment', xp: 300, icon: '🦀' },
    { id: 'go-master', title: 'Go Master', desc: 'Pass the Go mastery assessment', xp: 300, icon: '🐹' },
    { id: 'dsa-explorer', title: 'DSA Explorer', desc: 'Solve your first 10 DSA problems', xp: 100, icon: '🧩' },
    { id: 'graph-master', title: 'Graph Master', desc: 'Solve 5 graph problems', xp: 150, icon: '🕸️' },
    { id: 'project-builder', title: 'Project Builder', desc: 'Complete your first project', xp: 200, icon: '🏗️' },
    { id: 'capstone-champion', title: 'Capstone Champion', desc: 'Complete the capstone project', xp: 500, icon: '👑' },
    { id: 'streak-7', title: '7-Day Streak', desc: 'Learn 7 days in a row', xp: 100, icon: '🔥' },
    { id: 'streak-30', title: '30-Day Streak', desc: 'Learn 30 days in a row', xp: 300, icon: '🔥' },
  ];
  for (const a of achievements) {
    conn.prepare('INSERT OR IGNORE INTO achievements (id, slug, title, description, xp, icon) VALUES (?, ?, ?, ?, ?, ?)').run(a.id, a.id, a.title, a.desc, a.xp, a.icon);
  }
  if (!existsSync(join(process.cwd(), '.keep'))) { /* no-op, keeps data dir intent clear */ }
}

export function isSetupComplete(conn: Db): boolean {
  return getMeta(conn, 'setup_complete') === '1';
}

export interface UserRow {
  id: string; email: string; password_hash: string; display_name: string;
  role: string; status: string; created_at: string; last_login_at: string | null;
  failed_login_count: number; locked_until: string | null;
}

export function userPermissions(conn: Db, userId: string, role: string): string[] {
  const perms = new Set<string>();
  const rows = conn.prepare(
    `SELECT rp.permission_id FROM role_permissions rp
     JOIN user_roles ur ON ur.role_id = rp.role_id WHERE ur.user_id = ?`).all(userId) as { permission_id: string }[];
  for (const r of rows) perms.add(r.permission_id);
  // Fall back to the user's primary role mapping when no explicit user_roles rows exist
  if (rows.length === 0) {
    for (const p of ROLE_PERMISSIONS[role] || []) perms.add(p);
  }
  return [...perms];
}

export function audit(conn: Db, entry: {
  actorId?: string | null; actorEmail?: string; action: string;
  targetType?: string; targetId?: string; result?: string; metadata?: unknown; ip?: string;
}): void {
  conn.prepare(`INSERT INTO audit_logs (actor_id, actor_email, action, target_type, target_id, result, metadata, ip)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(
    entry.actorId ?? null, entry.actorEmail ?? '', entry.action,
    entry.targetType ?? '', entry.targetId ?? '',
    entry.result ?? 'success', JSON.stringify(entry.metadata ?? {}), entry.ip ?? '');
}
