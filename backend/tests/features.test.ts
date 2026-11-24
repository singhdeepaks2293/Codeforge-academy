// Tests for the locked-feature equivalents (backend/src/routes/features.ts).
// Runs standalone against a minimal seeded DB — no full-catalog seed — so it
// stays fast and small. Slug validation imports the real catalog data files
// (same lists as backend/src/db/seed.ts) and asserts every slug referenced
// by paths/careers/bootcamps exists in the catalog.
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdtempSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import express from 'express';
import cookieParser from 'cookie-parser';

const tmp = mkdtempSync(join(tmpdir(), 'cf-features-test-'));
process.env.DATABASE_PATH = join(tmp, 'test.db');
process.env.NODE_ENV = 'test';
process.env.SESSION_SECRET = 'test-secret-that-is-long-enough-123456';

let server: ReturnType<import('node:http').Server>;
let base = '';
let studentCookie = '';

const jar = new Map<string, string>();
function jarHeader(): string { return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; '); }
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

const KC = [
  { question: 'What does print do in Python?', options: ['Reads input', 'Writes text to the screen', 'Saves a file', 'Exits the program'], answer: 1, explanation: 'print writes text to the screen.' },
  { question: 'Which keyword defines a function?', options: ['func', 'def', 'function', 'lambda-def'], answer: 1, explanation: 'def defines a function.' },
];

beforeAll(async () => {
  const { openDb, seedRolesAndPermissions } = await import('../src/db/db.js');
  const conn = openDb(process.env.DATABASE_PATH);
  seedRolesAndPermissions(conn);
  // Minimal catalog rows the feature routes join against.
  const insertCourse = (id: string, slug: string, language: string, title: string) =>
    conn.prepare('INSERT OR IGNORE INTO courses (id, slug, language, title) VALUES (?, ?, ?, ?)').run(id, slug, language, title);
  insertCourse('python', 'python', 'python', 'Python Programming');
  insertCourse('go', 'go', 'go', 'Go Programming');
  insertCourse('rest-api-service', 'rest-api-service', 'python', 'REST API Service');
  conn.prepare('INSERT OR IGNORE INTO modules (id, course_id, title, sort_order) VALUES (?, ?, ?, 0)').run('python-m1', 'python', 'Introduction');
  conn.prepare('INSERT OR IGNORE INTO lessons (id, module_id, slug, title, sort_order, content) VALUES (?, ?, ?, ?, 0, ?)')
    .run('python-m1-l1', 'python-m1', 'python-m1-l1', 'What Is Python', JSON.stringify({ knowledgeCheck: KC }));
  conn.prepare(`INSERT OR IGNORE INTO assessments (id, course_slug, pass_percent, questions, programming_exercises, capstone)
    VALUES (?, ?, 80, ?, '[]', '{}')`).run('assess-python', 'python', JSON.stringify([
    { id: 'a1', kind: 'conceptual', topic: 'basics', question: 'Which type is immutable?', options: ['list', 'dict', 'tuple', 'set'], answer: 2, explanation: 'Tuples are immutable.' },
    { id: 'a2', kind: 'conceptual', topic: 'basics', question: 'What is 2 + 2?', options: ['3', '4', '22', '0'], answer: 1, explanation: '2 + 2 is 4.' },
  ]));
  conn.prepare('INSERT OR IGNORE INTO projects (id, slug, level, title) VALUES (?, ?, 1, ?)').run('proj-rest-api', 'rest-api-service', 'REST API Service');

  const app = express();
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());
  const { loadSession, csrfProtect } = await import('../src/middleware/auth.js');
  const { authRouter } = await import('../src/routes/auth.js');
  const { featuresRouter } = await import('../src/routes/features.js');
  app.use(loadSession);
  app.use('/api/auth', authRouter);
  app.use('/api', csrfProtect);
  app.use('/api/features', featuresRouter);
  server = app.listen(0);
  await new Promise<void>((resolve) => server.on('listening', () => resolve()));
  const addr = server.address();
  const port = typeof addr === 'object' && addr ? addr.port : 0;
  base = `http://127.0.0.1:${port}`;

  const setup = await req('/api/auth/setup', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@local.test', password: 'Admin1234', displayName: 'Admin' }),
  });
  expect(setup.res.status).toBe(201);
  const { res } = await req('/api/auth/register', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'student@local.test', password: 'Student123', displayName: 'Learner' }),
  });
  expect(res.status).toBe(201);
  studentCookie = jarHeader();
}, 60000);

afterAll(() => {
  server?.close();
  rmSync(tmp, { recursive: true, force: true });
});

describe('slug validation against the real catalog', () => {
  it('every course/project slug referenced by paths, careers and bootcamps exists', async () => {
    const dataDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'curriculum', 'data');
    async function imp(f: string) { return import(pathToFileURL(join(dataDir, f)).href) as Promise<Record<string, unknown>>; }
    const courseSlugs = new Set<string>();
    const singles: [string, string][] = [['c.ts', 'C_COURSE'], ['cpp.ts', 'CPP_COURSE'], ['python.ts', 'PYTHON_COURSE'], ['typescript.ts', 'TYPESCRIPT_COURSE'], ['react.ts', 'REACT_COURSE'], ['rust.ts', 'RUST_COURSE'], ['go.ts', 'GO_COURSE']];
    for (const [f, k] of singles) courseSlugs.add(((await imp(f))[k] as { slug: string }).slug);
    const arrs: [string, string][] = [['tracks-languages.ts', 'TRACKS_LANGUAGES'], ['tracks-web.ts', 'TRACKS_WEB'], ['tracks-mobile.ts', 'TRACKS_MOBILE'], ['tracks-data.ts', 'TRACKS_DATA'], ['tracks-databases.ts', 'TRACKS_DATABASES'], ['tracks-devops.ts', 'TRACKS_DEVOPS'], ['tracks-cs.ts', 'TRACKS_CS']];
    for (const [f, k] of arrs) for (const c of (await imp(f))[k] as { slug: string }[]) courseSlugs.add(c.slug);
    for (const f of readdirSync(dataDir).filter((x) => x.startsWith('tracks700-') && x.endsWith('.ts')).sort()) {
      for (const c of ((await imp(f)).TRACKS_700 as { slug: string }[] | undefined) || []) courseSlugs.add(c.slug);
    }
    const projectSlugs = new Set<string>();
    for (const p of ((await imp('projects.ts')).PROJECTS as { slug: string }[])) projectSlugs.add(p.slug);
    for (const f of readdirSync(dataDir).filter((x) => x.startsWith('projects-industry-') && x.endsWith('.ts')).sort()) {
      for (const p of ((await imp(f)).PROJECTS_INDUSTRY as { slug: string }[] | undefined) || []) projectSlugs.add(p.slug);
    }
    expect(courseSlugs.size).toBeGreaterThanOrEqual(793);
    expect(projectSlugs.size).toBeGreaterThanOrEqual(90);
    const { SKILL_PATHS, CAREER_PATHS, BOOTCAMPS } = await import('../src/curriculum/data/paths.js');
    const missingCourses: string[] = [];
    const check = (slug: string) => { if (!courseSlugs.has(slug)) missingCourses.push(slug); };
    for (const p of SKILL_PATHS) p.steps.forEach((s) => check(s.courseSlug));
    for (const c of CAREER_PATHS) c.steps.forEach((s) => check(s.courseSlug));
    for (const b of BOOTCAMPS) b.plan.forEach((w) => w.courseSlugs.forEach(check));
    expect(missingCourses).toEqual([]);
    const missingProjects = CAREER_PATHS.map((c) => c.capstoneProjectSlug).filter((s) => !projectSlugs.has(s));
    expect(missingProjects).toEqual([]);
  }, 120000);
});

describe('skill paths + career paths', () => {
  it('requires auth', async () => {
    const r = await req('/api/features/paths', { cookie: '' });
    expect(r.res.status).toBe(401);
  });
  it('lists skill paths and enrolls', async () => {
    const { res, json } = await authed('/api/features/paths', studentCookie);
    expect(res.status).toBe(200);
    expect((json?.paths as unknown[]).length).toBeGreaterThanOrEqual(5);
    const enr = await authed('/api/features/paths/python-developer/enroll', studentCookie, 'POST', {});
    expect(enr.res.status).toBe(200);
    const one = await authed('/api/features/paths/python-developer', studentCookie);
    expect((one.json?.path as Record<string, unknown>).enrolled).toBe(true);
  });
  it('lists career paths with capstone + certificate state', async () => {
    const { res, json } = await authed('/api/features/careers', studentCookie);
    expect(res.status).toBe(200);
    const careers = json?.careers as { id: string; capstoneProjectSlug: string; completed: boolean }[];
    const backend = careers.find((c) => c.id === 'career-backend-engineer');
    expect(backend?.capstoneProjectSlug).toBe('rest-api-service');
    expect(backend?.completed).toBe(false);
  });
});

describe('certificates (criteria-gated)', () => {
  it('refuses a certificate for an incomplete course, issues one when complete', async () => {
    const denied = await authed('/api/features/certificates/claim/python', studentCookie, 'POST', {});
    expect(denied.res.status).toBe(403);
    const { openDb } = await import('../src/db/db.js');
    const conn = openDb(process.env.DATABASE_PATH);
    const user = conn.prepare('SELECT id FROM users WHERE email = ?').get('student@local.test') as { id: string };
    conn.prepare(`INSERT INTO user_course_progress (user_id, course_id, enrolled, completed_lessons, total_lessons, mastery_passed)
      VALUES (?, 'python', 1, 1, 1, 0) ON CONFLICT(user_id, course_id) DO UPDATE SET completed_lessons = 1, total_lessons = 1`)
      .run(user.id);
    const ok = await authed('/api/features/certificates/claim/python', studentCookie, 'POST', {});
    expect(ok.res.status).toBe(200);
    const cert = ok.json?.certificate as { code: string; kind: string };
    expect(cert.kind).toBe('course');
    expect(cert.code).toMatch(/^CF-/);
    const list = await authed('/api/features/certificates', studentCookie);
    expect(((list.json?.certificates as unknown[]) || []).length).toBeGreaterThanOrEqual(1);
    // Public verification works without auth and rejects unknown codes.
    const verify = await req(`/api/features/certificates/${cert.code}`, { cookie: '' });
    expect(verify.res.status).toBe(200);
    expect(verify.json?.valid).toBe(true);
    expect((verify.json?.certificate as Record<string, unknown>).holder).toBe('Learner');
    const bad = await req('/api/features/certificates/CF-NOPE-00', { cookie: '' });
    expect(bad.res.status).toBe(404);
  });

  it('issues a professional certificate only when the career path is fully complete', async () => {
    const { openDb } = await import('../src/db/db.js');
    const conn = openDb(process.env.DATABASE_PATH);
    const user = conn.prepare('SELECT id FROM users WHERE email = ?').get('student@local.test') as { id: string };
    const { CAREER_PATHS } = await import('../src/curriculum/data/paths.js');
    const career = CAREER_PATHS.find((c) => c.id === 'career-backend-engineer')!;
    // Career claim must fail before the steps are done.
    const early = await authed('/api/features/careers/career-backend-engineer/claim-certificate', studentCookie, 'POST', {});
    expect(early.res.status).toBe(403);
    for (const s of career.steps) {
      conn.prepare('INSERT OR IGNORE INTO courses (id, slug, language, title) VALUES (?, ?, ?, ?)').run(s.courseSlug, s.courseSlug, 'python', s.courseSlug);
      conn.prepare(`INSERT INTO user_course_progress (user_id, course_id, enrolled, completed_lessons, total_lessons, mastery_passed)
        VALUES (?, ?, 1, 1, 1, 0) ON CONFLICT(user_id, course_id) DO UPDATE SET completed_lessons = 1, total_lessons = 1`)
        .run(user.id, s.courseSlug);
    }
    conn.prepare(`INSERT INTO user_project_progress (user_id, project_id, completed_milestones, status)
      VALUES (?, 'proj-rest-api', '[]', 'completed') ON CONFLICT(user_id, project_id) DO UPDATE SET status = 'completed'`).run(user.id);
    const ok = await authed('/api/features/careers/career-backend-engineer/claim-certificate', studentCookie, 'POST', {});
    expect(ok.res.status).toBe(200);
    expect((ok.json?.certificate as { kind: string }).kind).toBe('career');
  });
});

describe('standalone quizzes (real questions, server-side grading)', () => {
  it('starts a mixed quiz without answers, grades a perfect submission', async () => {
    const list = await authed('/api/features/quizzes', studentCookie);
    expect(list.res.status).toBe(200);
    const quizzes = list.json?.quizzes as { id: string; questionCount: number }[];
    const mixed = quizzes.find((q) => q.id === 'mixed:python');
    expect(mixed).toBeDefined();
    expect(mixed!.questionCount).toBeGreaterThanOrEqual(4);
    const start = await authed('/api/features/quizzes/mixed%3Apython/start', studentCookie, 'POST', { count: 4 });
    expect(start.res.status).toBe(200);
    const questions = (start.json as { questions: { id: string; options: string[] }[] }).questions;
    expect(questions.length).toBe(4);
    expect(JSON.stringify(start.json)).not.toContain('"answer":');
    // Build the correct answers from the DB rows the pool was drawn from.
    const { openDb } = await import('../src/db/db.js');
    const conn = openDb(process.env.DATABASE_PATH);
    const answers: Record<string, number> = {};
    for (const q of questions) {
      if (q.id.startsWith('kc:')) {
        const idx = Number(q.id.split(':').pop());
        answers[q.id] = KC[idx].answer;
      } else if (q.id.startsWith('as:')) {
        const row = conn.prepare('SELECT questions FROM assessments WHERE course_slug = ?').get('python') as { questions: string };
        const list2 = JSON.parse(row.questions) as { id: string; answer: number }[];
        const item = list2.find((x) => q.id.endsWith(x.id));
        answers[q.id] = item!.answer;
      }
    }
    const attemptId = (start.json as { attemptId: string }).attemptId;
    const submit = await authed(`/api/features/quizzes/attempts/${attemptId}/submit`, studentCookie, 'POST', { answers, timeSeconds: 30 });
    expect(submit.res.status).toBe(200);
    expect(submit.json?.scorePercent).toBe(100);
    expect(submit.json?.correct).toBe(4);
    const history = await authed('/api/features/quizzes/attempts', studentCookie);
    expect(((history.json?.attempts as unknown[]) || []).length).toBeGreaterThanOrEqual(1);
  });
});

describe('code challenges (real executor)', () => {
  it('passes correct code, fails wrong code, tracks personal bests', async () => {
    const list = await authed('/api/features/challenges', studentCookie);
    expect(list.res.status).toBe(200);
    expect(((list.json?.challenges as unknown[]) || []).length).toBeGreaterThanOrEqual(6);
    const good = await authed('/api/features/challenges/fizzbuzz/submit', studentCookie, 'POST', {
      code: 'n = int(input())\nfor i in range(1, n + 1):\n    s = ""\n    if i % 3 == 0: s += "Fizz"\n    if i % 5 == 0: s += "Buzz"\n    print(s or i)\n',
      timeSeconds: 42,
    });
    expect(good.res.status).toBe(200);
    expect(good.json?.passed).toBe(true);
    const bad = await authed('/api/features/challenges/fizzbuzz/submit', studentCookie, 'POST', { code: 'print("nope")\n', timeSeconds: 5 });
    expect(bad.json?.passed).toBe(false);
    const detail = await authed('/api/features/challenges/fizzbuzz', studentCookie);
    expect(((detail.json?.attempts as unknown[]) || []).length).toBeGreaterThanOrEqual(2);
    const after = await authed('/api/features/challenges', studentCookie);
    const fizz = ((after.json?.challenges as { id: string; passes: number; bestSeconds: number }[])).find((c) => c.id === 'fizzbuzz');
    expect(fizz?.passes).toBeGreaterThanOrEqual(1);
    expect(fizz?.bestSeconds).toBe(42);
  });
});

describe('interview simulator', () => {
  it('runs a timed mock interview: real coding grade + rubric self-assessment', async () => {
    const tracks = await authed('/api/features/interview/tracks', studentCookie);
    expect(tracks.res.status).toBe(200);
    expect(((tracks.json?.tracks as unknown[]) || []).length).toBeGreaterThanOrEqual(5);
    const start = await authed('/api/features/interview/start', studentCookie, 'POST', { track: 'general' });
    expect(start.res.status).toBe(200);
    const attemptId = (start.json as { attemptId: string }).attemptId;
    const coding = (start.json as { coding: { id: string } }).coding;
    expect(coding.id).toBe('two-sum-count');
    const behavioral: Record<string, { scores: Record<string, number> }> = {};
    for (const q of (start.json as { behavioral: { id: string }[] }).behavioral) {
      behavioral[q.id] = { scores: { 'Specific example': 5, 'Role and actions': 4, 'Outcome and learning': 5 } };
    }
    const submit = await authed(`/api/features/interview/${attemptId}/submit`, studentCookie, 'POST', {
      code: 'nums = list(map(int, input().split()))\ntarget = int(input())\ncount = 0\nfor i in range(len(nums)):\n    for j in range(i + 1, len(nums)):\n        if nums[i] + nums[j] == target:\n            count += 1\nprint(count)\n',
      behavioral,
    });
    expect(submit.res.status).toBe(200);
    expect((submit.json?.coding as { passed: boolean }).passed).toBe(true);
    // 3 behavioral questions x (5+4+5) = 42 of 45, labelled self-assessed.
    expect((submit.json?.behavioral as { total: number; max: number; selfAssessed: boolean }).total).toBe(42);
    expect((submit.json?.behavioral as { max: number }).max).toBe(45);
    expect((submit.json?.behavioral as { selfAssessed: boolean }).selfAssessed).toBe(true);
    const attempts = await authed('/api/features/interview/attempts', studentCookie);
    expect(((attempts.json?.attempts as unknown[]) || []).length).toBeGreaterThanOrEqual(1);
  });
});

describe('bootcamps, coach, builder', () => {
  it('computes dated milestones from the enrollment date', async () => {
    const enr = await authed('/api/features/bootcamps/bootcamp-python-6wk/enroll', studentCookie, 'POST', { startDate: '2026-11-24' });
    expect(enr.res.status).toBe(200);
    const b = (enr.json as { bootcamp: { startDate: string; weeks: { week: number; startDate: string; endDate: string }[] } }).bootcamp;
    expect(b.startDate).toBe('2026-11-24');
    expect(b.weeks[0].startDate).toBe('2026-11-24');
    expect(b.weeks[1].startDate).toBe('2026-12-01');
    expect(b.weeks[0].endDate).toBe('2026-11-30');
  });
  it('coach returns a weekly plan + evidence-backed recommendations', async () => {
    const { res, json } = await authed('/api/features/coach', studentCookie);
    expect(res.status).toBe(200);
    expect(((json?.weeklyPlan as unknown[]) || []).length).toBe(7);
    expect(((json?.recommendations as unknown[]) || []).length).toBeGreaterThanOrEqual(1);
    const recs = json?.recommendations as { evidence: string }[];
    expect(recs.every((r) => r.evidence.length > 0)).toBe(true);
  });
  it('builder plans from the real catalog and labels itself a local planner', async () => {
    const { res, json } = await authed('/api/features/builder/plan', studentCookie, 'POST', { goal: 'become a backend engineer with Go' });
    expect(res.status).toBe(200);
    expect(String(json?.note)).toContain('no AI model');
    const steps = json?.steps as { slug: string }[];
    expect(steps.length).toBeGreaterThan(0);
    expect(steps.some((s) => s.slug === 'go' || s.slug.includes('go'))).toBe(true);
  });
});
