import { Router } from 'express';
import { z } from 'zod';
import { getDbPath, openDb, audit, getConfig, setConfig, DEFAULT_PERMISSIONS, ROLE_PERMISSIONS, type UserRow } from '../db/db.js';
import { requireAuth, requirePermission, requireRole, hashPassword, type AuthedRequest } from '../middleware/auth.js';
import { getClientIp } from '../middleware/auth.js';

export const adminRouter = Router();
const db = () => openDb(getDbPath());

function publicUser(u: Record<string, unknown>) {
  return { id: u.id, email: u.email, displayName: u.display_name, role: u.role, status: u.status, createdAt: u.created_at, lastLoginAt: u.last_login_at, failedLoginCount: u.failed_login_count, lockedUntil: u.locked_until };
}

adminRouter.get('/stats', requireAuth, requirePermission('system.settings'), (req, res) => {
  const conn = db();
  const users = (conn.prepare('SELECT COUNT(*) AS n FROM users WHERE status != \'deleted\'').get() as { n: number }).n;
  const activeToday = (conn.prepare(`SELECT COUNT(DISTINCT user_id) AS n FROM learning_activity WHERE activity_date = date('now')`).get() as { n: number }).n;
  const lessons = (conn.prepare('SELECT COUNT(*) AS n FROM lessons').get() as { n: number }).n;
  const submissions = (conn.prepare('SELECT COUNT(*) AS n FROM submissions').get() as { n: number }).n;
  const dsaSolved = (conn.prepare('SELECT COUNT(*) AS n FROM user_dsa_progress WHERE status = \'solved\'').get() as { n: number }).n;
  res.json({ stats: { users, activeToday, lessons, submissions, dsaSolved } });
});

adminRouter.get('/users', requireAuth, requirePermission('users.read'), (req, res) => {
  const conn = db();
  const { q, role, status } = req.query;
  let sql = 'SELECT * FROM users WHERE status != \'deleted\'';
  const params: unknown[] = [];
  if (q) { sql += ' AND (email LIKE ? OR display_name LIKE ?)'; params.push(`%${q}%`, `%${q}%`); }
  if (role) { sql += ' AND role = ?'; params.push(role); }
  if (status) { sql += ' AND status = ?'; params.push(status); }
  sql += ' ORDER BY created_at DESC LIMIT 200';
  const users = (conn.prepare(sql).all(...params) as Record<string, unknown>[]).map(publicUser);
  res.json({ users });
});

adminRouter.get('/users/:id', requireAuth, requirePermission('users.read'), (req, res) => {
  const conn = db();
  const user = conn.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id) as Record<string, unknown> | undefined;
  if (!user) { res.status(404).json({ error: 'user not found' }); return; }
  const roles = (conn.prepare('SELECT role_id FROM user_roles WHERE user_id = ?').all(req.params.id) as { role_id: string }[]).map((r) => r.role_id);
  const sessions = conn.prepare('SELECT id, created_at, expires_at, user_agent, ip, revoked FROM sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 20').all(req.params.id);
  res.json({ user: publicUser(user), roles, sessions });
});

adminRouter.post('/users', requireAuth, requirePermission('users.create'), (req: AuthedRequest, res) => {
  const parsed = z.object({
    email: z.string().email(), password: z.string().min(8), displayName: z.string().min(1), role: z.enum(['student', 'instructor', 'admin', 'super-admin']).default('student'),
  }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input', details: parsed.error.flatten() }); return; }
  const conn = db();
  if (conn.prepare('SELECT id FROM users WHERE email = ?').get(parsed.data.email)) { res.status(409).json({ error: 'email already registered' }); return; }
  const id = `user-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  conn.prepare('INSERT INTO users (id, email, password_hash, display_name, role, status) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, parsed.data.email, hashPassword(parsed.data.password), parsed.data.displayName, parsed.data.role, 'active');
  conn.prepare('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)').run(id, parsed.data.role);
  audit(conn, { actorId: req.user!.id, actorEmail: req.user!.email, action: 'user.create', targetType: 'user', targetId: id, metadata: { role: parsed.data.role }, ip: getClientIp(req) });
  res.status(201).json({ id });
});

adminRouter.patch('/users/:id', requireAuth, requirePermission('users.update'), (req: AuthedRequest, res) => {
  const conn = db();
  const target = conn.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id) as UserRow | undefined;
  if (!target) { res.status(404).json({ error: 'user not found' }); return; }
  const parsed = z.object({
    displayName: z.string().min(1).optional(), role: z.enum(['student', 'instructor', 'admin', 'super-admin']).optional(),
    status: z.enum(['active', 'suspended']).optional(),
  }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  // Only super-admins may touch admins/super-admins
  if ((target.role === 'admin' || target.role === 'super-admin') && req.user!.role !== 'super-admin') {
    res.status(403).json({ error: 'only a super-admin can modify administrator accounts' });
    return;
  }
  const d = parsed.data;
  if (d.role && d.role !== target.role) {
    if (d.role === 'super-admin' && req.user!.role !== 'super-admin') {
      res.status(403).json({ error: 'only a super-admin can grant super-admin' });
      return;
    }
    conn.prepare('UPDATE users SET role = ? WHERE id = ?').run(d.role, target.id);
    conn.prepare('DELETE FROM user_roles WHERE user_id = ?').run(target.id);
    conn.prepare('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)').run(target.id, d.role);
    audit(conn, { actorId: req.user!.id, actorEmail: req.user!.email, action: 'user.role_assign', targetType: 'user', targetId: target.id, metadata: { from: target.role, to: d.role }, ip: getClientIp(req) });
  }
  if (d.displayName) conn.prepare('UPDATE users SET display_name = ? WHERE id = ?').run(d.displayName, target.id);
  if (d.status && d.status !== target.status) {
    conn.prepare('UPDATE users SET status = ? WHERE id = ?').run(d.status, target.id);
    if (d.status === 'suspended') conn.prepare('UPDATE sessions SET revoked = 1 WHERE user_id = ?').run(target.id);
    audit(conn, { actorId: req.user!.id, actorEmail: req.user!.email, action: d.status === 'suspended' ? 'user.suspend' : 'user.activate', targetType: 'user', targetId: target.id, ip: getClientIp(req) });
  }
  res.json({ ok: true });
});

adminRouter.delete('/users/:id', requireAuth, requirePermission('users.delete'), (req: AuthedRequest, res) => {
  const conn = db();
  const target = conn.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id) as UserRow | undefined;
  if (!target) { res.status(404).json({ error: 'user not found' }); return; }
  if (target.id === req.user!.id) { res.status(400).json({ error: 'cannot delete your own account here' }); return; }
  if (target.role === 'super-admin' && req.user!.role !== 'super-admin') { res.status(403).json({ error: 'only a super-admin can delete a super-admin' }); return; }
  conn.prepare('UPDATE users SET status = \'deleted\' WHERE id = ?').run(target.id);
  conn.prepare('UPDATE sessions SET revoked = 1 WHERE user_id = ?').run(target.id);
  audit(conn, { actorId: req.user!.id, actorEmail: req.user!.email, action: 'user.delete', targetType: 'user', targetId: target.id, ip: getClientIp(req) });
  res.json({ ok: true });
});

adminRouter.get('/roles', requireAuth, requirePermission('roles.read'), (_req, res) => {
  const conn = db();
  const roles = conn.prepare('SELECT * FROM roles ORDER BY name').all() as Record<string, unknown>[];
  const out = roles.map((r) => ({
    ...r,
    permissions: (conn.prepare('SELECT permission_id FROM role_permissions WHERE role_id = ?').all(r.id) as { permission_id: string }[]).map((p) => p.permission_id),
  }));
  res.json({ roles: out, allPermissions: DEFAULT_PERMISSIONS });
});

adminRouter.post('/roles', requireAuth, requirePermission('roles.manage'), (req: AuthedRequest, res) => {
  const parsed = z.object({ name: z.string().min(1).max(50), description: z.string().default(''), permissions: z.array(z.string()).default([]) }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const conn = db();
  const id = `role-${parsed.data.name.toLowerCase().replace(/[^a-z0-9-]/g, '-')}`;
  if (conn.prepare('SELECT id FROM roles WHERE id = ? OR name = ?').get(id, parsed.data.name)) { res.status(409).json({ error: 'role already exists' }); return; }
  conn.prepare('INSERT INTO roles (id, name, description, is_system) VALUES (?, ?, ?, 0)').run(id, parsed.data.name, parsed.data.description);
  for (const p of parsed.data.permissions) {
    if (DEFAULT_PERMISSIONS.some((dp) => dp.name === p)) conn.prepare('INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)').run(id, p);
  }
  audit(conn, { actorId: req.user!.id, actorEmail: req.user!.email, action: 'role.create', targetType: 'role', targetId: id, ip: getClientIp(req) });
  res.status(201).json({ id });
});

adminRouter.patch('/roles/:id', requireAuth, requirePermission('roles.manage'), (req: AuthedRequest, res) => {
  const conn = db();
  const role = conn.prepare('SELECT * FROM roles WHERE id = ?').get(req.params.id) as { id: string; is_system: number } | undefined;
  if (!role) { res.status(404).json({ error: 'role not found' }); return; }
  const parsed = z.object({ description: z.string().optional(), permissions: z.array(z.string()).optional() }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  if (parsed.data.description !== undefined) conn.prepare('UPDATE roles SET description = ? WHERE id = ?').run(parsed.data.description, role.id);
  if (parsed.data.permissions) {
    conn.prepare('DELETE FROM role_permissions WHERE role_id = ?').run(role.id);
    for (const p of parsed.data.permissions) {
      if (DEFAULT_PERMISSIONS.some((dp) => dp.name === p)) conn.prepare('INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)').run(role.id, p);
    }
    audit(conn, { actorId: req.user!.id, actorEmail: req.user!.email, action: 'role.permissions_change', targetType: 'role', targetId: role.id, metadata: { permissions: parsed.data.permissions }, ip: getClientIp(req) });
  }
  res.json({ ok: true });
});

adminRouter.delete('/roles/:id', requireAuth, requirePermission('roles.manage'), (req: AuthedRequest, res) => {
  const conn = db();
  const role = conn.prepare('SELECT * FROM roles WHERE id = ?').get(req.params.id) as { id: string; is_system: number } | undefined;
  if (!role) { res.status(404).json({ error: 'role not found' }); return; }
  if (role.is_system) { res.status(400).json({ error: 'system roles cannot be deleted' }); return; }
  const inUse = (conn.prepare('SELECT COUNT(*) AS n FROM user_roles WHERE role_id = ?').get(role.id) as { n: number }).n;
  if (inUse > 0) { res.status(400).json({ error: 'role is assigned to users and cannot be deleted' }); return; }
  conn.prepare('DELETE FROM roles WHERE id = ?').run(role.id);
  audit(conn, { actorId: req.user!.id, actorEmail: req.user!.email, action: 'role.delete', targetType: 'role', targetId: role.id, ip: getClientIp(req) });
  res.json({ ok: true });
});

adminRouter.get('/audit-logs', requireAuth, requirePermission('system.settings'), (req, res) => {
  const conn = db();
  const { action, limit } = req.query;
  const lim = Math.min(Number(limit || 100), 500);
  const rows = action
    ? conn.prepare('SELECT * FROM audit_logs WHERE action = ? ORDER BY id DESC LIMIT ?').all(action, lim)
    : conn.prepare('SELECT * FROM audit_logs ORDER BY id DESC LIMIT ?').all(lim);
  res.json({ logs: rows });
});

adminRouter.get('/config', requireAuth, requirePermission('system.settings'), (_req, res) => {
  const conn = db();
  const rows = conn.prepare('SELECT key, value FROM runtime_config ORDER BY key').all() as { key: string; value: string }[];
  res.json({ config: Object.fromEntries(rows.map((r) => [r.key, r.value])) });
});

adminRouter.patch('/config', requireAuth, requirePermission('system.settings'), (req: AuthedRequest, res) => {
  const conn = db();
  const parsed = z.record(z.string()).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const allowed = new Set(['mastery_pass_percent', 'dsa_requires_mastery', 'projects_require_dsa', 'run_timeout_ms', 'max_failed_logins', 'lockout_minutes', 'xp_per_lesson', 'xp_per_exercise', 'xp_per_dsa', 'xp_per_project_milestone', 'daily_goal_xp']);
  for (const [k, v] of Object.entries(parsed.data)) {
    if (allowed.has(k)) setConfig(conn, k, v);
  }
  audit(conn, { actorId: req.user!.id, actorEmail: req.user!.email, action: 'system.config_change', targetType: 'system', targetId: 'runtime_config', metadata: parsed.data, ip: getClientIp(req) });
  res.json({ ok: true });
});

adminRouter.get('/submissions', requireAuth, requirePermission('submissions.review'), (req, res) => {
  const conn = db();
  const { status } = req.query;
  const rows = status
    ? conn.prepare('SELECT * FROM project_submissions WHERE status = ? ORDER BY created_at DESC LIMIT 100').all(status)
    : conn.prepare('SELECT * FROM project_submissions ORDER BY created_at DESC LIMIT 100').all();
  res.json({ submissions: rows });
});

adminRouter.post('/submissions/:id/review', requireAuth, requirePermission('submissions.review'), (req: AuthedRequest, res) => {
  const conn = db();
  const parsed = z.object({ status: z.enum(['approved', 'needs-changes', 'in-review']), reviewNotes: z.string().default('') }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const sub = conn.prepare('SELECT * FROM project_submissions WHERE id = ?').get(req.params.id) as { id: string } | undefined;
  if (!sub) { res.status(404).json({ error: 'submission not found' }); return; }
  conn.prepare('UPDATE project_submissions SET status = ?, review_notes = ?, reviewer_id = ?, updated_at = datetime(\'now\') WHERE id = ?')
    .run(parsed.data.status, parsed.data.reviewNotes, req.user!.id, sub.id);
  audit(conn, { actorId: req.user!.id, actorEmail: req.user!.email, action: 'submission.review', targetType: 'project_submission', targetId: sub.id, metadata: { status: parsed.data.status }, ip: getClientIp(req) });
  res.json({ ok: true });
});

export { ROLE_PERMISSIONS };
