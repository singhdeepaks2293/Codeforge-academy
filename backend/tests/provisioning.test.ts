// Provisioning tests — unit (mocked installer) + endpoint tests.
// The mocked-installer tests NEVER run a real install: the spawn layer is
// replaced with a fake runner/detector. Exactly one test is live: the Lua
// apt install, gated behind CODEFORGE_LIVE_INSTALL=1 (and root), which runs
// the real apt path end-to-end in the sandbox.
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const tmp = mkdtempSync(join(tmpdir(), 'cf-prov-test-'));
process.env.DATABASE_PATH = join(tmp, 'test.db');
process.env.NODE_ENV = 'test';
process.env.SESSION_SECRET = 'test-secret-at-least-32-chars-long!!';
// Default the suite to "provisioning disabled" so enrol/lesson triggers in
// endpoint tests never start a real install; the live test opts back in.
process.env.CODEFORGE_PROVISIONING_ENABLED = '0';

const LIVE = process.env.CODEFORGE_LIVE_INSTALL === '1';
const IS_ROOT = typeof process.getuid === 'function' && process.getuid() === 0;

import {
  RUNTIME_CATALOG, RUNTIME_BY_ID, LANGUAGE_TO_RUNTIME,
  ensureRuntime, getProvisionStatus, listProvisionStatuses,
  __clearInFlightForTests, type CommandRunner, type ProvisionDeps,
} from '../src/services/provisioning.js';
import { openDb } from '../src/db/db.js';
import type { RuntimeInfo } from '../src/execution/executor.js';

let server: ReturnType<import('node:http').Server>;
let base = '';
let studentCookie = '';

const jar = new Map<string, string>();
function jarHeader(): string {
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
}
function storeCookies(res: Response): void {
  const list = typeof res.headers.getSetCookie === 'function' ? res.headers.getSetCookie() : [];
  for (const c of list) {
    const [pair] = c.split(';');
    const eq = pair.indexOf('=');
    if (eq > 0) jar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
  }
}
async function req(path: string, opts: RequestInit & { cookie?: string } = {}) {
  const headers: Record<string, string> = { ...(opts.headers as Record<string, string> || {}) };
  headers['Cookie'] = opts.cookie ?? jarHeader();
  const res = await fetch(base + path, { ...opts, headers });
  storeCookies(res);
  const text = await res.text();
  let json: unknown = null;
  try { json = JSON.parse(text); } catch { /* ignore */ }
  return { res, json: json as Record<string, unknown> | null, text };
}
async function getCsrf(): Promise<string> {
  const { json } = await req('/api/auth/csrf');
  return (json?.csrfToken as string) || '';
}
function sessionOf(cookie: string): string {
  const m = cookie.match(/cf_session=[^;]+/);
  return m ? m[0] : '';
}
async function authed(path: string, cookie: string, method = 'GET', body?: unknown) {
  const token = await getCsrf();
  const full = [sessionOf(cookie), `cf_csrf=${token}`].filter(Boolean).join('; ');
  return req(path, {
    method, cookie: full,
    headers: { 'X-CSRF-Token': token, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
}

beforeAll(async () => {
  const app = (await import('../src/index.js')).default;
  const { seedRolesAndPermissions } = await import('../src/db/db.js');
  const conn = openDb(process.env.DATABASE_PATH);
  seedRolesAndPermissions(conn);
  const { seedCurriculum } = await import('../src/db/seed.js');
  await seedCurriculum(conn);
  server = app.listen(0);
  await new Promise<void>((resolve) => server.on('listening', () => resolve()));
  const addr = server.address();
  const port = typeof addr === 'object' && addr ? addr.port : 0;
  base = `http://127.0.0.1:${port}`;
  await req('/api/auth/setup', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@local.test', password: 'Admin1234', displayName: 'Admin' }),
  });
  const reg = await req('/api/auth/register', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'student@local.test', password: 'Student123', displayName: 'Learner' }),
  });
  expect(reg.res.status).toBe(201);
  studentCookie = jarHeader();
}, 60000);

afterAll(() => {
  server?.close();
  rmSync(tmp, { recursive: true, force: true });
});

beforeEach(() => { __clearInFlightForTests(); });

// ---- Fake installer world (mocked spawn layer) ----
function makeFake(initialAvailable: string[] = []) {
  const available = new Set<string>(initialAvailable);
  const commands: { cmd: string; args: string[] }[] = [];
  const detector = async (): Promise<RuntimeInfo[]> =>
    RUNTIME_CATALOG.map((def) => ({
      id: def.id, name: def.name,
      available: available.has(def.id),
      version: available.has(def.id) ? 'fake 1.0' : undefined,
      installHint: def.installHint,
    }));
  const runner: CommandRunner = {
    run: async (cmd, args) => {
      commands.push({ cmd, args });
      // Simulate the apt installs the planner emits.
      if (args.includes('lua5.4')) available.add('lua');
      if (args.includes('rustc')) available.add('rust');
      if (args.includes('php-cli')) available.add('php');
      if (cmd.includes('rustup-init') || args.includes('--default-toolchain')) available.add('rust');
      return { code: 0, stdout: '', stderr: '', timedOut: false };
    },
  };
  const envOverride = { platform: 'linux' as const, isRoot: true, hasSudo: false, packageManager: 'apt' as const, inContainer: false };
  const deps: ProvisionDeps & { enabled?: boolean } = { runner, detector, whichFn: async () => null, envOverride, enabled: true };
  return { available, commands, detector, runner, deps };
}

async function pollStatus(conn: ReturnType<typeof openDb>, runtime: string, want: string[], deps?: ProvisionDeps, timeoutMs = 5000): Promise<string> {
  const deadline = Date.now() + timeoutMs;
  let state = '';
  while (Date.now() < deadline) {
    const s = await getProvisionStatus(conn, runtime, deps);
    state = s?.state ?? '';
    if (want.includes(state)) return state;
    await new Promise((r) => setTimeout(r, 50));
  }
  return state;
}

async function pollEndpoint(path: string, wantState: string, timeoutMs = 5000): Promise<Record<string, unknown> | null> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const st = await req(path);
    const s = st.json?.runtime as { state: string } | undefined;
    if (s?.state === wantState) return s as unknown as Record<string, unknown>;
    await new Promise((r) => setTimeout(r, 100));
  }
  return null;
}

describe('catalogue completeness', () => {
  it('every course language maps to a runtime with a defined provisioning path', () => {
    // All 30 course languages (see provisioning.ts header) + javascript.
    const expected = ['asm', 'bash', 'c', 'cpp', 'csharp', 'dart', 'elixir', 'go', 'haskell', 'html', 'java',
      'javascript', 'julia', 'kotlin', 'lua', 'mongodb', 'objc', 'perl', 'php', 'python', 'r', 'react',
      'redis', 'ruby', 'rust', 'scala', 'solidity', 'sql', 'swift', 'typescript'];
    for (const lang of expected) {
      const runtimeId = LANGUAGE_TO_RUNTIME[lang];
      expect(runtimeId, `language ${lang} has no runtime mapping`).toBeTruthy();
      const def = RUNTIME_BY_ID.get(runtimeId!);
      expect(def, `language ${lang} maps to unknown runtime ${runtimeId}`).toBeDefined();
      expect(['builtin', 'baked', 'auto', 'manual']).toContain(def!.kind);
      expect(def!.installHint.length).toBeGreaterThan(10);
      expect(def!.manualSteps.length).toBeGreaterThan(10);
    }
    // No runtime in the catalogue is orphaned: each serves >= 1 language.
    for (const def of RUNTIME_CATALOG) expect(def.serves.length).toBeGreaterThan(0);
  });

  it('every executor language case maps to a runtime', async () => {
    const { readFileSync } = await import('node:fs');
    const src = readFileSync(new URL('../src/execution/executor.ts', import.meta.url), 'utf8');
    const cases = [...src.matchAll(/case '([a-z]+)':/g)].map((m) => m[1]);
    expect(cases.length).toBeGreaterThan(20);
    for (const lang of new Set(cases)) {
      expect(LANGUAGE_TO_RUNTIME[lang], `executor language ${lang} has no runtime mapping`).toBeTruthy();
    }
  });
});

describe('installer planning (mocked)', () => {
  it('apt plan for lua installs lua5.4 and symlinks lua', async () => {
    const conn = openDb(process.env.DATABASE_PATH);
    const fake = makeFake([]);
    const first = await ensureRuntime(conn, 'lua', fake.deps);
    expect(first.state).toBe('installing');
    const final = await pollStatus(conn, 'lua', ['ready', 'failed'], fake.deps);
    expect(final).toBe('ready');
    expect(fake.commands.some((c) => c.args.includes('lua5.4'))).toBe(true);
    expect(fake.commands.some((c) => c.cmd === 'ln' || c.args.includes('/usr/local/bin/lua'))).toBe(true);
    const status = await getProvisionStatus(conn, 'lua', fake.deps);
    expect(status?.state).toBe('ready');
    expect(status?.available).toBe(true);
  });

  it('apt plan for rust prefers apt rustc+cargo over rustup', async () => {
    const conn = openDb(process.env.DATABASE_PATH);
    const fake = makeFake([]);
    await ensureRuntime(conn, 'rust', fake.deps);
    const final = await pollStatus(conn, 'rust', ['ready', 'failed'], fake.deps);
    expect(final).toBe('ready');
    expect(fake.commands.some((c) => c.args.includes('rustc') && c.args.includes('cargo'))).toBe(true);
    expect(fake.commands.some((c) => c.cmd.includes('rustup'))).toBe(false);
  });

  it('rust falls back to rustup when no package manager exists', async () => {
    const conn = openDb(process.env.DATABASE_PATH);
    const fake = makeFake([]);
    const deps = { ...fake.deps, envOverride: { platform: 'linux' as const, isRoot: false, hasSudo: false, packageManager: null, inContainer: false } };
    await ensureRuntime(conn, 'rust', deps);
    const final = await pollStatus(conn, 'rust', ['ready', 'failed'], deps);
    expect(final).toBe('ready');
    expect(fake.commands.some((c) => c.cmd.includes('rustup-init'))).toBe(true);
  });

  it('manual runtimes never invoke the installer', async () => {
    const conn = openDb(process.env.DATABASE_PATH);
    const fake = makeFake([]);
    for (const id of ['swift', 'objc', 'mongodb', 'redis']) {
      const s = await ensureRuntime(conn, id, fake.deps);
      expect(s.state).toBe('install_unavailable');
      expect(s.guidance.length).toBeGreaterThan(20);
    }
    expect(fake.commands.length).toBe(0);
  });

  it('in-container env reports install_unavailable without running anything', async () => {
    const conn = openDb(process.env.DATABASE_PATH);
    const fake = makeFake([]);
    const deps = { ...fake.deps, envOverride: { platform: 'linux' as const, isRoot: false, hasSudo: false, packageManager: 'apt' as const, inContainer: true } };
    const s = await ensureRuntime(conn, 'php', deps);
    expect(s.state).toBe('install_unavailable');
    expect(s.reason).toMatch(/container/i);
    expect(fake.commands.length).toBe(0);
  });

  it('a failing installer is recorded as failed with the reason', async () => {
    const conn = openDb(process.env.DATABASE_PATH);
    const fake = makeFake([]);
    const failing: CommandRunner = {
      run: async () => ({ code: 100, stdout: '', stderr: 'E: Unable to locate package lua5.4', timedOut: false }),
    };
    const deps = { ...fake.deps, runner: failing };
    await ensureRuntime(conn, 'lua', deps);
    const final = await pollStatus(conn, 'lua', ['failed', 'ready'], deps);
    expect(final).toBe('failed');
    const status = await getProvisionStatus(conn, 'lua', deps);
    expect(status?.reason).toMatch(/Unable to locate package/);
  });

  it('concurrent ensures for one runtime run the installer once', async () => {
    const conn = openDb(process.env.DATABASE_PATH);
    const fake = makeFake([]);
    const slow: CommandRunner = {
      run: async (cmd, args) => {
        await new Promise((r) => setTimeout(r, 150));
        return fake.runner.run(cmd, args);
      },
    };
    const deps = { ...fake.deps, runner: slow };
    const [a, b] = await Promise.all([ensureRuntime(conn, 'php', deps), ensureRuntime(conn, 'php', deps)]);
    expect([a.state, b.state]).toContain('installing');
    const final = await pollStatus(conn, 'php', ['ready', 'failed'], deps);
    expect(final).toBe('ready');
    const installs = fake.commands.filter((c) => c.args.includes('php-cli'));
    expect(installs.length).toBe(1);
  });

  it('unknown runtime throws', async () => {
    const conn = openDb(process.env.DATABASE_PATH);
    await expect(ensureRuntime(conn, 'cobol', makeFake([]).deps)).rejects.toThrow(/unknown runtime/);
  });

  it('already-present runtimes are reported present without installing', async () => {
    const conn = openDb(process.env.DATABASE_PATH);
    const fake = makeFake(['python']);
    const s = await ensureRuntime(conn, 'python', fake.deps);
    expect(s.state).toBe('present');
    expect(s.available).toBe(true);
    expect(fake.commands.length).toBe(0);
  });
});

describe('provisioning endpoints', () => {
  it('GET /api/runtimes lists every catalog runtime with provisioning state', async () => {
    const { res, json } = await req('/api/runtimes');
    expect(res.status).toBe(200);
    const runtimes = json?.runtimes as { id: string; available: boolean; provisioning: { state: string; kind: string; dockerBaked: boolean } }[];
    expect(runtimes.length).toBe(RUNTIME_CATALOG.length);
    const byId = new Map(runtimes.map((r) => [r.id, r]));
    expect(byId.get('python')?.available).toBe(true);
    expect(byId.get('python')?.provisioning.kind).toBe('baked');
    expect(byId.get('rust')?.provisioning.dockerBaked).toBe(true);
    expect(byId.get('swift')?.provisioning.kind).toBe('manual');
    expect(byId.get('sql')?.available).toBe(true);
    expect((json?.languageToRuntime as Record<string, string>)['rust']).toBe('rust');
    // Same payload at the /api/execute/runtimes path.
    const again = await req('/api/execute/runtimes');
    expect(again.res.status).toBe(200);
    expect((again.json?.runtimes as unknown[]).length).toBe(RUNTIME_CATALOG.length);
  });

  it('GET /api/provisioning lists statuses; unknown runtime 404s', async () => {
    const { res, json } = await req('/api/provisioning');
    expect(res.status).toBe(200);
    expect((json?.runtimes as unknown[]).length).toBe(RUNTIME_CATALOG.length);
    const one = await req('/api/provisioning/python');
    expect(one.res.status).toBe(200);
    expect((one.json?.runtime as { available: boolean }).available).toBe(true);
    const nope = await req('/api/provisioning/cobol');
    expect(nope.res.status).toBe(404);
  });

  it('POST install requires auth; unknown runtime 404s', async () => {
    const anon = await req('/api/provisioning/lua/install', {
      method: 'POST', cookie: '', headers: { 'Content-Type': 'application/json' }, body: '{}',
    });
    expect(anon.res.status).toBe(401);
    const nope = await authed('/api/provisioning/cobol/install', studentCookie, 'POST', {});
    expect(nope.res.status).toBe(404);
  });

  it('POST install for a manual runtime reports install_unavailable honestly', async () => {
    const { res, json } = await authed('/api/provisioning/swift/install', studentCookie, 'POST', {});
    expect(res.status).toBe(200);
    const st = json?.runtime as { state: string; guidance: string };
    expect(st.state).toBe('install_unavailable');
    expect(st.guidance).toMatch(/Swift/);
  });

  it('enrolling in a course with a missing runtime triggers provisioning (disabled here, recorded honestly)', async () => {
    // kotlin is genuinely missing in this sandbox (no kotlinc anywhere).
    const { res } = await authed('/api/courses/kotlin/enroll', studentCookie, 'POST', {});
    expect(res.status).toBe(200);
    // The enrol trigger runs in the background; poll until it records.
    const s = await pollEndpoint('/api/provisioning/kotlin', 'install_unavailable');
    expect(s, 'enrol trigger did not record a provisioning state').not.toBeNull();
    // Provisioning is disabled in this suite (CODEFORGE_PROVISIONING_ENABLED=0),
    // so the trigger must record install_unavailable, never start an install.
    expect(s!.reason as string).toMatch(/disabled/);
  });

  it('opening a lesson as an enrolled user triggers provisioning for its runtime', async () => {
    const detail = await req('/api/courses/kotlin');
    const modules = detail.json?.modules as { lessons: { id: string }[] }[];
    const lessonId = modules[0].lessons[0].id;
    const lesson = await authed(`/api/courses/kotlin/lessons/${lessonId}`, studentCookie);
    expect(lesson.res.status).toBe(200);
    const s = await pollEndpoint('/api/provisioning/kotlin', 'install_unavailable');
    expect(s, 'lesson-open trigger did not record a provisioning state').not.toBeNull();
  });

  it('live detection matches the runtimes actually present in this sandbox', async () => {
    const statuses = await listProvisionStatuses(openDb(process.env.DATABASE_PATH));
    const byId = new Map(statuses.map((s) => [s.runtime, s]));
    expect(byId.get('python')?.available).toBe(true);
    expect(byId.get('node')?.available).toBe(true);
    expect(byId.get('java')?.available).toBe(true);
    expect(byId.get('c')?.available).toBe(true);
    // Go is genuinely absent from this sandbox (verified by hand); Rust is
    // present via the rustup toolchain under ~/.cargo/bin, which the
    // executor searches — detection must find it there.
    expect(byId.get('go')?.available).toBe(false);
    expect(byId.get('rust')?.available).toBe(true);
    // 'ready' here only because the mocked unit tests above recorded a rust
    // install in this same test DB; either state means "detected present".
    expect(['present', 'ready']).toContain(byId.get('rust')?.state);
  });
});

describe('live install (real apt path)', () => {
  it.skipIf(!LIVE || !IS_ROOT)('installs Lua via the real apt installer and then runs Lua code', async () => {
    // Opt back in: this is the one test allowed to run a real install.
    process.env.CODEFORGE_PROVISIONING_ENABLED = '1';
    try {
      const before = await req('/api/provisioning/lua');
      const alreadyThere = (before.json?.runtime as { available: boolean }).available === true;
      if (!alreadyThere) {
      const started = await authed('/api/provisioning/lua/install', studentCookie, 'POST', {});
      expect([200, 202]).toContain(started.res.status);
      const state = (started.json?.runtime as { state: string }).state;
      expect(['installing', 'ready']).toContain(state);
      // Poll for the background install (apt-get update + install).
      let s = state;
      const deadline = Date.now() + 240000;
      while (s === 'installing' && Date.now() < deadline) {
        await new Promise((r) => setTimeout(r, 2000));
        const cur = await req('/api/provisioning/lua');
        s = (cur.json?.runtime as { state: string }).state;
      }
      expect(s).toBe('ready');
      }
      const run = await authed('/api/execute/run', studentCookie, 'POST', { language: 'lua', code: 'print("lua-live-ok " .. (6 * 7))' });
      expect(run.res.status).toBe(200);
      expect(String(run.json?.stdout)).toContain('lua-live-ok 42');
    } finally {
      process.env.CODEFORGE_PROVISIONING_ENABLED = '0';
    }
  }, 300000);
});
