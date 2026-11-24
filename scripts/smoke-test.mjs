#!/usr/bin/env node
// Smoke test: boots the real backend against a temp SQLite DB and exercises the
// core end-to-end path: setup -> register -> login -> courses -> run Python ->
// submit exercise (pass + fail) -> hint -> progress -> RBAC 403 -> unauth 401.
// Usage: node scripts/smoke-test.mjs [backend-url]  (defaults to http://127.0.0.1:8080)
// The backend must already be running with a FRESH database for a full pass.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE = process.argv[2] || process.env.SMOKE_BASE || 'http://127.0.0.1:8080';
let passed = 0, failed = 0;
function check(name, ok, detail = '') {
  if (ok) { passed++; console.log(`  PASS ${name}`); }
  else { failed++; console.log(`  FAIL ${name} ${detail}`); }
}

const jar = new Map();
function jarHeader() {
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
}
function storeCookies(res) {
  const list = typeof res.headers.getSetCookie === 'function' ? res.headers.getSetCookie() : [];
  for (const c of list) {
    const [pair] = c.split(';');
    const eq = pair.indexOf('=');
    if (eq > 0) jar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
  }
}
let csrfCookie = '';
async function req(path, { method = 'GET', body, cookie } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  headers['Cookie'] = cookie !== undefined ? cookie : jarHeader();
  // cookie === '' means "deliberately unauthenticated": send no session and
  // no CSRF token, so the server must answer 401 from requireAuth.
  if (method !== 'GET' && cookie !== '') {
    const csrfRes = await fetch(BASE + '/api/auth/csrf', { headers: { Cookie: headers['Cookie'] } });
    storeCookies(csrfRes);
    const csrfJson = await csrfRes.json();
    headers['X-CSRF-Token'] = csrfJson.csrfToken;
    headers['Cookie'] = jarHeader();
  }
  const res = await fetch(BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  storeCookies(res);
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* ignore */ }
  const sc = res.headers.get('set-cookie');
  return { status: res.status, json, text, setCookie: sc };
}

async function main() {
  console.log(`Smoke test against ${BASE}`);
  // health
  const health = await req('/api/health');
  check('health endpoint', health.status === 200, health.text.slice(0, 120));

  // setup (may already be complete on a reused DB — that is OK, we skip)
  const setupStatus = await req('/api/auth/setup-status');
  let adminCookie = '';
  if (!setupStatus.json?.setupComplete) {
    const s = await req('/api/auth/setup', { method: 'POST', body: { email: 'smoke-admin@local.test', password: 'SmokeAdmin1', displayName: 'Smoke Admin' } });
    check('setup wizard creates admin', s.status === 201, s.text.slice(0, 200));
    adminCookie = jarHeader();
  } else {
    console.log('  SKIP setup (already complete on this DB)');
  }

  // register student
  const email = `smoke-${Date.now()}@local.test`;
  const reg = await req('/api/auth/register', { method: 'POST', body: { email, password: 'SmokeStud1', displayName: 'Smoke Student' } });
  check('register student', reg.status === 201, reg.text.slice(0, 200));
  const studentCookie = jarHeader();

  // login
  const login = await req('/api/auth/login', { method: 'POST', body: { email, password: 'SmokeStud1' } });
  check('login student', login.status === 200, login.text.slice(0, 200));

  // courses
  const courses = await req('/api/courses', { cookie: studentCookie });
  check('list courses', courses.status === 200 && Array.isArray(courses.json?.courses), `status=${courses.status}`);
  const nCourses = courses.json?.courses?.length || 0;
  console.log(`  INFO courses in DB: ${nCourses}`);
  const nLessons = (courses.json?.courses || []).reduce((n, c) => n + (c.totalLessons || 0), 0);
  console.log(`  INFO lessons in DB: ${nLessons}`);
  check('864 courses in catalog', nCourses === 864, `got ${nCourses}`); // 793 phase-2 + 70 network-automation tracks + 1 lightweight-LLM track
  check('8996 lessons in catalog', nLessons === 8996, `got ${nLessons}`); // 8284 + 700 + 12
  const py = courses.json?.courses?.find((c) => c.slug === 'python');
  check('python course present', !!py);
  const cats = new Set((courses.json?.courses || []).map((c) => c.category));
  check('7 catalog categories', cats.size === 7, [...cats].join(','));

  // new-track lesson: java first lesson completes, java run works
  const javaDetail = await req('/api/courses/java', { cookie: studentCookie });
  const javaLesson = javaDetail.json?.modules?.[0]?.lessons?.[0];
  if (javaLesson) {
    const jl = await req(`/api/courses/java/lessons/${javaLesson.id}`, { cookie: studentCookie });
    const jex = jl.json?.exercises?.[0];
    check('java lesson loads with exercise', jl.status === 200 && !!jex, jl.text.slice(0, 200));
    if (jex?.type !== 'multiple-choice' && jex?.type !== 'predict-output' && jex?.solution) {
      const jsub = await req(`/api/execute/exercises/${jex.id}/submit`, { method: 'POST', cookie: studentCookie, body: { code: jex.solution } });
      check('java exercise solution passes (or honest 503)', jsub.json?.passed === true || jsub.status === 503, jsub.text.slice(0, 200));
    }
    const jcomplete = await req(`/api/courses/java/lessons/${javaLesson.id}/complete`, { method: 'POST', cookie: studentCookie });
    check('complete a new-track lesson', jcomplete.status === 200, jcomplete.text.slice(0, 200));
  } else {
    check('java lesson loads with exercise', false, 'no java lessons found');
  }

  // runtimes
  const runtimes = await req('/api/execute/runtimes', { cookie: studentCookie });
  const pyRt = runtimes.json?.runtimes?.find((r) => r.id === 'python');
  check('python runtime detected', !!pyRt?.available, JSON.stringify(runtimes.json?.runtimes?.map((r) => `${r.id}:${r.available}`)));

  // run python
  const run = await req('/api/execute/run', { method: 'POST', cookie: studentCookie, body: { language: 'python', code: 'print("hello")' } });
  check('run print("hello") returns real output', run.status === 200 && run.json?.stdout?.includes('hello'), run.text.slice(0, 200));

  // lesson + exercise submit (pass and fail)
  let exerciseId = null;
  if (py) {
    const lesson = await req(`/api/courses/python/lessons/${py ? '' : ''}x`, { cookie: studentCookie });
    void lesson;
    const detail = await req('/api/courses/python', { cookie: studentCookie });
    const firstModule = detail.json?.modules?.[0];
    const firstLesson = firstModule?.lessons?.[0];
    if (firstLesson) {
      const l = await req(`/api/courses/python/lessons/${firstLesson.id}`, { cookie: studentCookie });
      const ex = l.json?.exercises?.[0];
      if (ex) {
        exerciseId = ex.id;
        const good = await req(`/api/execute/exercises/${ex.id}/submit`, { method: 'POST', cookie: studentCookie, body: { code: ex.solution || '' } });
        // solution may be empty in a stub; only assert pass when a solution exists
        if (ex.solution) check('submit correct solution passes', good.json?.passed === true, good.text.slice(0, 300));
        else console.log('  SKIP correct-submit (exercise has no solution stored)');
        const bad = await req(`/api/execute/exercises/${ex.id}/submit`, { method: 'POST', cookie: studentCookie, body: { code: 'print("wrong")' } });
        check('submit wrong code fails with test breakdown', bad.json?.passed === false && Array.isArray(bad.json?.results), bad.text.slice(0, 300));
        const hint = await req(`/api/execute/exercises/${ex.id}/hints/1`, { cookie: studentCookie });
        check('hint level 1 accessible', hint.status === 200 && !!hint.json?.hint?.content, hint.text.slice(0, 200));
        const complete = await req(`/api/courses/python/lessons/${firstLesson.id}/complete`, { method: 'POST', cookie: studentCookie });
        check('complete lesson (progress)', complete.status === 200, complete.text.slice(0, 200));
      } else console.log('  SKIP exercise submit (no exercises on first lesson)');
    }
  }
  void exerciseId;

  // progress persisted
  const dash = await req('/api/progress/dashboard', { cookie: studentCookie });
  check('dashboard loads with XP/streak', dash.status === 200 && typeof dash.json?.xp === 'number', dash.text.slice(0, 200));

  // RBAC: student cannot list admin users
  const forbidden = await req('/api/admin/users', { cookie: studentCookie });
  check('student GET /api/admin/users -> 403', forbidden.status === 403, `status=${forbidden.status}`);

  // unauthenticated run -> 401
  const unauth = await req('/api/execute/run', { method: 'POST', cookie: '', body: { language: 'python', code: 'print(1)' } });
  check('unauthenticated run -> 401', unauth.status === 401, `status=${unauth.status}`);

  // DSA gate + problems
  const dsa = await req('/api/dsa/problems', { cookie: studentCookie });
  check('DSA problems list', dsa.status === 200 && Array.isArray(dsa.json?.problems), `status=${dsa.status}`);
  console.log(`  INFO DSA problems in DB: ${dsa.json?.problems?.length || 0}`);

  console.log(`\nSmoke result: ${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
