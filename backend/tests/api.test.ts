import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const tmp = mkdtempSync(join(tmpdir(), 'cf-test-'));
process.env.DATABASE_PATH = join(tmp, 'test.db');
process.env.NODE_ENV = 'test';
process.env.SESSION_SECRET = 'test-secret-that-is-long-enough-123456';

let server: ReturnType<import('node:http').Server>;
let base = '';
let adminCookie = '';
let studentCookie = '';

// Proper cookie jar: undici joins multiple Set-Cookie headers with ", " which
// corrupts Expires dates when split naively — and duplicate cf_csrf values
// make Express read the stale first one. getSetCookie() avoids both.
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
  return { res, json: json as Record<string, unknown> | null, text, setCookie: res.headers.get('set-cookie') || '' };
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
  // Send the user's session plus the FRESH csrf token (header + cookie must match).
  const full = [sessionOf(cookie), `cf_csrf=${token}`].filter(Boolean).join('; ');
  return req(path, {
    method, cookie: full,
    headers: { 'X-CSRF-Token': token, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
}

beforeAll(async () => {
  const app = (await import('../src/index.js')).default;
  const { openDb, seedRolesAndPermissions } = await import('../src/db/db.js');
  openDb(process.env.DATABASE_PATH);
  seedRolesAndPermissions(openDb(process.env.DATABASE_PATH));
  // Seed the full catalog (100 tracks) — main() does not run under NODE_ENV=test.
  const { seedCurriculum } = await import('../src/db/seed.js');
  const counts = await seedCurriculum(openDb(process.env.DATABASE_PATH));
  console.log('[test seed]', JSON.stringify(counts));
  server = app.listen(0);
  await new Promise<void>((resolve) => server.on('listening', () => resolve()));
  const addr = server.address();
  const port = typeof addr === 'object' && addr ? addr.port : 0;
  base = `http://127.0.0.1:${port}`;
}, 30000);

afterAll(() => {
  server?.close();
  rmSync(tmp, { recursive: true, force: true });
});

describe('setup + auth', () => {
  it('setup wizard creates the first super-admin and then disables itself', async () => {
    const { res, json, setCookie } = await req('/api/auth/setup', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@local.test', password: 'Admin1234', displayName: 'Admin' }),
    });
    expect(res.status).toBe(201);
    expect(json?.user).toMatchObject({ role: 'super-admin' });
    adminCookie = jarHeader();
    const again = await req('/api/auth/setup', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin2@local.test', password: 'Admin1234', displayName: 'Admin2' }),
    });
    expect(again.res.status).toBe(409);
  });

  it('registers a student and logs in with a session cookie (no token in body)', async () => {
    const { res, json, setCookie } = await req('/api/auth/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'student@local.test', password: 'Student123', displayName: 'Learner' }),
    });
    expect(res.status).toBe(201);
    expect(json?.user).toMatchObject({ role: 'student' });
    expect(JSON.stringify(json)).not.toContain('Student123');
    studentCookie = jarHeader();
    const me = await req('/api/auth/me', { cookie: studentCookie });
    expect(me.res.status).toBe(200);
    expect(me.json?.user).toMatchObject({ email: 'student@local.test' });
  });

  it('rejects weak passwords and wrong logins; locks out after 5 failures', async () => {
    const weak = await req('/api/auth/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'weak@local.test', password: 'short', displayName: 'Weak' }),
    });
    expect(weak.res.status).toBe(400);
    for (let i = 0; i < 5; i++) {
      const bad = await req('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'student@local.test', password: 'WrongPass1' }),
      });
      expect([401, 423]).toContain(bad.res.status);
    }
    const locked = await req('/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'student@local.test', password: 'Student123' }),
    });
    expect(locked.res.status).toBe(423);
    // failed attempts are audit-logged
    const { json } = await authed('/api/admin/audit-logs?action=auth.login_failed', adminCookie);
    expect(Array.isArray(json?.logs)).toBe(true);
    expect((json?.logs as unknown[]).length).toBeGreaterThan(0);
  });

  it('unauthenticated requests get 401', async () => {
    const r = await req('/api/auth/me', { cookie: '' });
    expect(r.res.status).toBe(401);
    const run = await req('/api/execute/run', {
      method: 'POST', cookie: '', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: 'python', code: 'print(1)' }),
    });
    expect(run.res.status).toBe(401);
  });
});

describe('RBAC (backend-enforced)', () => {
  it('student cannot hit admin endpoints (403)', async () => {
    const r = await authed('/api/admin/users', studentCookie);
    expect(r.res.status).toBe(403);
    const r2 = await authed('/api/admin/config', studentCookie);
    expect(r2.res.status).toBe(403);
  });

  it('admin can list users; student cannot create courses', async () => {
    const r = await authed('/api/admin/users', adminCookie);
    expect(r.res.status).toBe(200);
    expect(Array.isArray(r.json?.users)).toBe(true);
    const denied = await authed('/api/courses', studentCookie, 'POST', { slug: 'x', language: 'python', title: 'X' });
    expect(denied.res.status).toBe(403);
  });

  it('CSRF protection blocks mutating requests without a token', async () => {
    const r = await req('/api/courses/python/enroll', {
      method: 'POST', cookie: studentCookie, headers: { 'Content-Type': 'application/json' },
    });
    expect(r.res.status).toBe(403);
  });
});

describe('code execution (real)', () => {
  it('runs Python and returns real stdout', async () => {
    const { res, json } = await authed('/api/execute/run', studentCookie, 'POST', { language: 'python', code: 'print("hello")' });
    expect(res.status).toBe(200);
    expect(json?.stdout).toContain('hello');
    expect(json?.success).toBe(true);
  });

  it('surfaces Python runtime errors', async () => {
    const { json } = await authed('/api/execute/run', studentCookie, 'POST', { language: 'python', code: 'raise ValueError("boom")' });
    expect(json?.success).toBe(false);
    expect(String(json?.stderr)).toContain('ValueError');
  });

  it('compiles and runs C, surfacing compile errors', async () => {
    const ok = await authed('/api/execute/run', studentCookie, 'POST', {
      language: 'c', code: '#include <stdio.h>\nint main(){printf("hi C\\n");return 0;}',
    });
    expect(ok.json?.stdout).toContain('hi C');
    const bad = await authed('/api/execute/run', studentCookie, 'POST', {
      language: 'c', code: 'int main(){ this is not c; }',
    });
    expect(bad.json?.success).toBe(false);
    expect(String(bad.json?.stderr)).toMatch(/error/i);
  });

  it('enforces the execution timeout', async () => {
    const { json } = await authed('/api/execute/run', studentCookie, 'POST', {
      language: 'python', code: 'import time\ntime.sleep(30)\nprint("never")', timeoutMs: 2000,
    });
    expect(json?.timedOut).toBe(true);
  });

  it('reports missing runtimes honestly instead of faking a run', async () => {
    const { json } = await authed('/api/execute/runtimes', studentCookie);
    expect(Array.isArray(json?.runtimes)).toBe(true);
    const go = (json?.runtimes as { id: string; available: boolean }[]).find((r) => r.id === 'go');
    expect(go).toBeDefined();
    if (!go?.available) {
      const r = await authed('/api/execute/run', studentCookie, 'POST', { language: 'go', code: 'package main\nfunc main(){}' });
      expect(r.res.status).toBe(503);
      expect(r.json?.runtimeUnavailable).toBe(true);
    }
  });
});

describe('100-track catalog + new executors', () => {
  it('catalog has 100 courses and 1354 lessons across 7 categories', async () => {
    const { res, json } = await req('/api/courses');
    expect(res.status).toBe(200);
    const courses = json?.courses as { slug: string; totalLessons: number; category?: string }[];
    expect(courses.length).toBe(100);
    expect(courses.reduce((n, c) => n + (c.totalLessons || 0), 0)).toBe(1354);
    const cats = new Set(courses.map((c) => c.category));
    expect([...cats].sort()).toEqual(['cs-career', 'data-ai', 'databases', 'devops', 'languages', 'mobile', 'web']);
    const dataAi = await req('/api/courses?category=data-ai');
    const dataCourses = (dataAi.json?.courses || []) as { category?: string }[];
    expect(dataCourses.length).toBe(16);
    expect(dataCourses.every((c) => c.category === 'data-ai')).toBe(true);
    const py = courses.find((c) => c.slug === 'python');
    expect(py?.totalLessons).toBe(54); // v1 track untouched
  });

  it('new-track lesson fetch returns a full lesson with a 5-hint exercise', async () => {
    const detail = await req('/api/courses/java');
    expect(detail.res.status).toBe(200);
    const modules = detail.json?.modules as { lessons: { id: string }[] }[];
    expect(modules.length).toBe(5);
    const firstLessonId = modules[0].lessons[0].id as string;
    const lesson = await req(`/api/courses/java/lessons/${firstLessonId}`);
    expect(lesson.res.status).toBe(200);
    const exs = lesson.json?.exercises as { hints: unknown[]; tests: unknown[] }[];
    expect(exs.length).toBe(1);
    expect(exs[0].hints.length).toBe(5);
    expect(lesson.json?.lesson?.knowledgeCheck?.length).toBeGreaterThanOrEqual(2);
  });

  it('runs Java (single-file launch), Bash and SQL for real', async () => {
    const java = await authed('/api/execute/run', studentCookie, 'POST', {
      language: 'java',
      code: 'class Main { public static void main(String[] args) { System.out.println("hello java"); } }',
    });
    expect(java.res.status).toBe(200);
    expect(String(java.json?.stdout)).toContain('hello java');
    const bash = await authed('/api/execute/run', studentCookie, 'POST', {
      language: 'bash', code: 'echo "bash-ok $((6 * 7))"',
    });
    expect(String(bash.json?.stdout)).toContain('bash-ok 42');
    const sql = await authed('/api/execute/run', studentCookie, 'POST', {
      language: 'sql',
      code: 'SELECT name, score FROM t ORDER BY score DESC',
      stdin: 'CREATE TABLE t (name TEXT, score INTEGER); INSERT INTO t VALUES (\'Ada\', 95), (\'Bo\', 80);',
    });
    expect(String(sql.json?.stdout)).toContain('Ada|95');
  });

  it('grades quiz exercises by answer (html-css) without running code', async () => {
    const { openDb } = await import('../src/db/db.js');
    const conn = openDb(process.env.DATABASE_PATH);
    const row = conn.prepare(`SELECT e.id, e.answer_index FROM exercises e
      JOIN lessons l ON l.id = e.lesson_id JOIN modules m ON m.id = l.module_id
      JOIN courses c ON c.id = m.course_id WHERE c.slug = 'html-css' AND e.type = 'multiple-choice' LIMIT 1`)
      .get() as { id: string; answer_index: number } | undefined;
    expect(row).toBeDefined();
    const ok = await authed(`/api/execute/exercises/${row!.id}/submit`, studentCookie, 'POST', { answerIndex: row!.answer_index });
    expect(ok.res.status).toBe(200);
    expect(ok.json?.passed).toBe(true);
    const wrong = await authed(`/api/execute/exercises/${row!.id}/submit`, studentCookie, 'POST', { answerIndex: (row!.answer_index + 1) % 4 });
    expect(wrong.json?.passed).toBe(false);
    // the answer index is never leaked to the client
    const detail = await req('/api/courses/html-css');
    const modules = detail.json?.modules as { lessons: { id: string }[] }[];
    const lesson = await req(`/api/courses/html-css/lessons/${modules[0].lessons[0].id}`);
    expect(JSON.stringify(lesson.json)).not.toContain('answer_index');
  });

  it('new-track code exercise submits honestly: python passes, kotlin 503s', async () => {
    async function firstExercise(slug: string) {
      const detail = await req(`/api/courses/${slug}`);
      const modules = detail.json?.modules as { lessons: { id: string }[] }[];
      const lesson = await req(`/api/courses/${slug}/lessons/${modules[0].lessons[0].id}`);
      const ex = (lesson.json?.exercises as { id: string; type: string; solution?: string }[])[0];
      return ex;
    }
    const pyEx = await firstExercise('statistics');
    expect(pyEx.type).not.toBe('multiple-choice');
    const pass = await authed(`/api/execute/exercises/${pyEx.id}/submit`, studentCookie, 'POST', { code: pyEx.solution });
    expect(pass.res.status).toBe(200);
    expect(pass.json?.passed).toBe(true);
    const ktEx = await firstExercise('kotlin');
    if (ktEx.type !== 'multiple-choice') {
      const r = await authed(`/api/execute/exercises/${ktEx.id}/submit`, studentCookie, 'POST', { code: ktEx.solution });
      expect(r.res.status).toBe(503);
      expect(r.json?.runtimeUnavailable).toBe(true);
    }
  });
});

describe('progress + sessions', () => {
  it('session revocation works', async () => {
    const { json } = await authed('/api/auth/sessions', studentCookie);
    const sessions = json?.sessions as { id: string }[];
    expect(sessions.length).toBeGreaterThan(0);
    const revoked = await authed(`/api/auth/sessions/${sessions[0].id}/revoke`, studentCookie, 'POST');
    expect(revoked.res.status).toBe(200);
  });

  it('password change requires the current password', async () => {
    const r = await authed('/api/auth/change-password', studentCookie, 'POST', { currentPassword: 'Nope1234', newPassword: 'NewPass123' });
    expect([401, 403]).toContain(r.res.status);
  });
});
