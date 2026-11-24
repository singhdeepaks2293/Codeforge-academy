// Locked-feature equivalents, implemented for real against CodeForge's own
// data and engines. Nothing here is a paywall and nothing is faked:
//  - skill/career paths: ordered sequences of real catalog courses, progress
//    read from user_course_progress;
//  - certificates: issued only when completion criteria are actually met
//    (all lessons done for a course; all steps + capstone for a career);
//  - standalone quizzes: real questions drawn from lesson knowledge-checks
//    and mastery assessments, graded server-side;
//  - code challenges + interview coding rounds: graded by the real executor;
//  - interview behavioral scores are the learner's own rubric
//    self-assessment, labelled as such;
//  - bootcamps: dated milestones computed from the enrollment date;
//  - coach: recommendations derived from real progress/submission data;
//  - builder: a local planner over the real catalog — no AI model, offline.
import { randomBytes } from 'node:crypto';
import { Router } from 'express';
import { z } from 'zod';
import { getDbPath, openDb, uid, type Db } from '../db/db.js';
import { requireAuth, type AuthedRequest } from '../middleware/auth.js';
import { evaluateCode } from './execute.js';
import { weakTopics, totalXp, getStreak } from '../services/gamification.js';
import { SKILL_PATHS, CAREER_PATHS, BOOTCAMPS } from '../curriculum/data/paths.js';
import { CHALLENGES } from '../curriculum/data/challenges.js';
import { INTERVIEW_TRACKS, INTERVIEW_RUBRIC } from '../curriculum/data/interview.js';

export const featuresRouter = Router();
const db = () => openDb(getDbPath());

function parseJson(s: string, fallback: unknown = null): unknown {
  try { return JSON.parse(s); } catch { return fallback; }
}

interface CourseProgress {
  slug: string; title: string; enrolled: boolean;
  completedLessons: number; totalLessons: number; percent: number; completed: boolean;
}

function courseProgress(conn: Db, userId: string, slugs: string[]): CourseProgress[] {
  return slugs.map((slug) => {
    const row = conn.prepare(`SELECT c.title AS title, ucp.enrolled AS enrolled,
        ucp.completed_lessons AS completed_lessons, ucp.total_lessons AS total_lessons
      FROM courses c LEFT JOIN user_course_progress ucp
        ON ucp.course_id = c.id AND ucp.user_id = ? WHERE c.slug = ?`)
      .get(userId, slug) as { title?: string; enrolled?: number; completed_lessons?: number; total_lessons?: number } | undefined;
    const total = Number(row?.total_lessons ?? 0);
    const done = Number(row?.completed_lessons ?? 0);
    return {
      slug, title: String(row?.title ?? slug), enrolled: !!row?.enrolled,
      completedLessons: done, totalLessons: total,
      percent: total ? Math.round((done / total) * 100) : 0,
      completed: total > 0 && done >= total,
    };
  });
}

function courseCompleted(conn: Db, userId: string, slug: string): { ok: boolean; title: string } {
  const p = courseProgress(conn, userId, [slug])[0];
  return { ok: p.completed, title: p.title };
}

function newCode(): string {
  return `CF-${randomBytes(4).toString('hex').toUpperCase()}-${randomBytes(2).toString('hex').toUpperCase()}`;
}

function issueCertificate(conn: Db, userId: string, kind: 'course' | 'career', refSlug: string, title: string) {
  const existing = conn.prepare('SELECT * FROM certificates WHERE user_id = ? AND kind = ? AND ref_slug = ?')
    .get(userId, kind, refSlug) as Record<string, unknown> | undefined;
  if (existing) return existing;
  const id = uid('cert');
  const code = newCode();
  conn.prepare('INSERT INTO certificates (id, user_id, code, kind, ref_slug, title) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, userId, code, kind, refSlug, title);
  return conn.prepare('SELECT * FROM certificates WHERE id = ?').get(id) as Record<string, unknown>;
}

function publicCert(c: Record<string, unknown>) {
  return { id: c.id, code: c.code, kind: c.kind, refSlug: c.ref_slug, title: c.title, issuedAt: c.issued_at };
}

// ---- Skill paths ----
featuresRouter.get('/paths', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const out = SKILL_PATHS.map((p) => {
    const progress = courseProgress(conn, req.user!.id, p.steps.map((s) => s.courseSlug));
    const done = progress.filter((x) => x.completed).length;
    const enrolled = !!conn.prepare('SELECT 1 FROM path_enrollments WHERE user_id = ? AND path_id = ?').get(req.user!.id, p.id);
    return { ...p, enrolled, coursesCompleted: done, coursesTotal: p.steps.length, progress };
  });
  res.json({ paths: out });
});

featuresRouter.get('/paths/:id', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const p = SKILL_PATHS.find((x) => x.id === req.params.id);
  if (!p) { res.status(404).json({ error: 'path not found' }); return; }
  const progress = courseProgress(conn, req.user!.id, p.steps.map((s) => s.courseSlug));
  const enrolled = !!conn.prepare('SELECT 1 FROM path_enrollments WHERE user_id = ? AND path_id = ?').get(req.user!.id, p.id);
  res.json({ path: { ...p, enrolled, progress } });
});

featuresRouter.post('/paths/:id/enroll', requireAuth, (req: AuthedRequest, res) => {
  const p = SKILL_PATHS.find((x) => x.id === req.params.id);
  if (!p) { res.status(404).json({ error: 'path not found' }); return; }
  const conn = db();
  conn.prepare('INSERT OR IGNORE INTO path_enrollments (user_id, path_id, kind) VALUES (?, ?, \'skill\')').run(req.user!.id, p.id);
  res.json({ ok: true });
});

// ---- Career paths ----
function careerStatus(conn: Db, userId: string, career: (typeof CAREER_PATHS)[number]) {
  const progress = courseProgress(conn, userId, career.steps.map((s) => s.courseSlug));
  const coursesDone = progress.every((x) => x.completed);
  const cap = conn.prepare(`SELECT upp.status AS status FROM user_project_progress upp
    JOIN projects p ON p.id = upp.project_id WHERE upp.user_id = ? AND p.slug = ?`)
    .get(userId, career.capstoneProjectSlug) as { status?: string } | undefined;
  const capstoneDone = cap?.status === 'completed';
  const enrolled = !!conn.prepare('SELECT 1 FROM path_enrollments WHERE user_id = ? AND path_id = ?').get(userId, career.id);
  const cert = conn.prepare('SELECT * FROM certificates WHERE user_id = ? AND kind = \'career\' AND ref_slug = ?')
    .get(userId, career.id) as Record<string, unknown> | undefined;
  return {
    ...career, enrolled, progress, coursesDone, capstoneDone,
    completed: coursesDone && capstoneDone, certificate: cert ? publicCert(cert) : null,
  };
}

featuresRouter.get('/careers', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  res.json({ careers: CAREER_PATHS.map((c) => careerStatus(conn, req.user!.id, c)) });
});

featuresRouter.get('/careers/:id', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const c = CAREER_PATHS.find((x) => x.id === req.params.id);
  if (!c) { res.status(404).json({ error: 'career path not found' }); return; }
  res.json({ career: careerStatus(conn, req.user!.id, c) });
});

featuresRouter.post('/careers/:id/enroll', requireAuth, (req: AuthedRequest, res) => {
  const c = CAREER_PATHS.find((x) => x.id === req.params.id);
  if (!c) { res.status(404).json({ error: 'career path not found' }); return; }
  const conn = db();
  conn.prepare('INSERT OR IGNORE INTO path_enrollments (user_id, path_id, kind) VALUES (?, ?, \'career\')').run(req.user!.id, c.id);
  res.json({ ok: true });
});

featuresRouter.post('/careers/:id/claim-certificate', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const c = CAREER_PATHS.find((x) => x.id === req.params.id);
  if (!c) { res.status(404).json({ error: 'career path not found' }); return; }
  const status = careerStatus(conn, req.user!.id, c);
  if (!status.completed) {
    res.status(403).json({
      error: 'career path not completed',
      coursesDone: status.coursesDone, capstoneDone: status.capstoneDone,
      coursesCompleted: status.progress.filter((p) => p.completed).length, coursesTotal: status.progress.length,
    });
    return;
  }
  const cert = issueCertificate(conn, req.user!.id, 'career', c.id, c.certificateTitle);
  res.json({ certificate: publicCert(cert) });
});

// ---- Certificates ----
featuresRouter.get('/certificates', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  // Auto-issue for every course the learner has actually completed.
  const done = conn.prepare(`SELECT c.slug AS slug, c.title AS title FROM user_course_progress ucp
    JOIN courses c ON c.id = ucp.course_id
    WHERE ucp.user_id = ? AND ucp.total_lessons > 0 AND ucp.completed_lessons >= ucp.total_lessons`)
    .all(req.user!.id) as { slug: string; title: string }[];
  for (const c of done) issueCertificate(conn, req.user!.id, 'course', c.slug, `Course Completion — ${c.title}`);
  const certs = conn.prepare('SELECT * FROM certificates WHERE user_id = ? ORDER BY issued_at DESC').all(req.user!.id) as Record<string, unknown>[];
  res.json({ certificates: certs.map(publicCert) });
});

featuresRouter.post('/certificates/claim/:courseSlug', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const courseSlug = String(req.params.courseSlug);
  const { ok, title } = courseCompleted(conn, req.user!.id, courseSlug);
  if (!ok) { res.status(403).json({ error: 'course not completed — finish all lessons first' }); return; }
  const cert = issueCertificate(conn, req.user!.id, 'course', courseSlug, `Course Completion — ${title}`);
  res.json({ certificate: publicCert(cert) });
});

// Public verification — no login required, so a certificate can be checked
// by anyone holding its code.
featuresRouter.get('/certificates/:code', (req, res) => {
  const conn = db();
  const cert = conn.prepare(`SELECT cert.*, u.display_name AS holder FROM certificates cert
    JOIN users u ON u.id = cert.user_id WHERE cert.code = ?`).get(req.params.code) as Record<string, unknown> | undefined;
  if (!cert) { res.status(404).json({ error: 'certificate not found', valid: false }); return; }
  res.json({ valid: true, certificate: { ...publicCert(cert), holder: cert.holder } });
});

// ---- Standalone quizzes ----
interface QuizQuestion { id: string; source: string; topic: string; question: string; options: string[]; answer: number; explanation: string; }

function quizPool(conn: Db, quizId: string): QuizQuestion[] {
  const pool: QuizQuestion[] = [];
  const langMatch = quizId.match(/^mixed:(.+)$/);
  const courseMatch = quizId.match(/^course:(.+)$/);
  // Lesson knowledge-checks live inside lessons.content JSON.
  const lessonRows = conn.prepare(`SELECT l.id AS id, l.content AS content, c.slug AS course_slug, c.language AS language
    FROM lessons l JOIN modules m ON m.id = l.module_id JOIN courses c ON c.id = m.course_id`).all() as Record<string, unknown>[];
  for (const r of lessonRows) {
    if (langMatch && r.language !== langMatch[1]) continue;
    if (courseMatch && r.course_slug !== courseMatch[1]) continue;
    const content = parseJson(String(r.content), {}) as { knowledgeCheck?: QuizQuestion[] };
    (content.knowledgeCheck || []).forEach((q, i) => {
      if (q.options && q.options.length >= 2 && typeof q.answer === 'number') {
        pool.push({ id: `kc:${r.id}:${i}`, source: 'lesson', topic: String(r.course_slug), question: q.question, options: q.options, answer: q.answer, explanation: q.explanation || '' });
      }
    });
  }
  // Mastery assessment questions.
  const assessRows = conn.prepare('SELECT course_slug, questions FROM assessments').all() as { course_slug: string; questions: string }[];
  for (const r of assessRows) {
    if (langMatch) {
      const lang = conn.prepare('SELECT language FROM courses WHERE slug = ?').get(r.course_slug) as { language?: string } | undefined;
      if (lang?.language !== langMatch[1]) continue;
    }
    if (courseMatch && r.course_slug !== courseMatch[1]) continue;
    for (const q of parseJson(r.questions, []) as { id: string; topic: string; question: string; options: string[]; answer: number; explanation: string }[]) {
      pool.push({ id: `as:${r.course_slug}:${q.id}`, source: 'assessment', topic: q.topic || String(r.course_slug), question: q.question, options: q.options, answer: q.answer, explanation: q.explanation || '' });
    }
  }
  // Multiple-choice / predict-output exercises.
  const exRows = conn.prepare(`SELECT e.id AS id, e.title AS title, e.options AS options, e.answer_index AS answer_index,
      c.slug AS course_slug, c.language AS language FROM exercises e
    LEFT JOIN lessons l ON l.id = e.lesson_id LEFT JOIN modules m ON m.id = l.module_id
    LEFT JOIN courses c ON c.id = m.course_id
    WHERE e.type IN ('multiple-choice','predict-output') AND e.options IS NOT NULL AND e.answer_index IS NOT NULL`).all() as Record<string, unknown>[];
  for (const r of exRows) {
    if (langMatch && r.language !== langMatch[1]) continue;
    if (courseMatch && r.course_slug !== courseMatch[1]) continue;
    const options = parseJson(String(r.options), []) as string[];
    if (options.length >= 2) {
      pool.push({ id: `ex:${r.id}`, source: 'exercise', topic: String(r.course_slug || 'general'), question: String(r.title), options, answer: Number(r.answer_index), explanation: '' });
    }
  }
  return pool;
}

function quizTitle(conn: Db, quizId: string): string {
  const m = quizId.match(/^mixed:(.+)$/);
  if (m) return `Mixed ${m[1]} review quiz`;
  const c = quizId.match(/^course:(.+)$/);
  if (c) {
    const row = conn.prepare('SELECT title FROM courses WHERE slug = ?').get(c[1]) as { title?: string } | undefined;
    return row?.title ? `${row.title} — practice quiz` : `Practice quiz: ${c[1]}`;
  }
  return quizId;
}

featuresRouter.get('/quizzes', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const quizzes: { id: string; title: string; questionCount: number }[] = [];
  const langs = conn.prepare('SELECT DISTINCT language FROM courses ORDER BY language').all() as { language: string }[];
  for (const { language } of langs) {
    const n = quizPool(conn, `mixed:${language}`).length;
    if (n >= 3) quizzes.push({ id: `mixed:${language}`, title: quizTitle(conn, `mixed:${language}`), questionCount: n });
  }
  const courses = conn.prepare(`SELECT c.slug AS slug FROM assessments a JOIN courses c ON c.slug = a.course_slug ORDER BY c.title`).all() as { slug: string }[];
  for (const { slug } of courses.slice(0, 12)) {
    const n = quizPool(conn, `course:${slug}`).length;
    if (n >= 3) quizzes.push({ id: `course:${slug}`, title: quizTitle(conn, `course:${slug}`), questionCount: n });
  }
  res.json({ quizzes });
});

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed >>> 0;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}

featuresRouter.post('/quizzes/:id/start', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const parsed = z.object({ count: z.number().int().min(1).max(20).default(10) }).safeParse(req.body ?? {});
  const count = parsed.success ? parsed.data.count : 10;
  const quizId = String(req.params.id);
  const pool = quizPool(conn, quizId);
  if (pool.length < 1) { res.status(404).json({ error: 'quiz not found or has no questions' }); return; }
  const attemptId = uid('quiz');
  const seed = [...attemptId].reduce((a, ch) => a + ch.charCodeAt(0), 7);
  const picked = seededShuffle(pool, seed).slice(0, Math.min(count, pool.length));
  conn.prepare('INSERT INTO quiz_attempts (id, user_id, quiz_id, questions, total) VALUES (?, ?, ?, ?, ?)')
    .run(attemptId, req.user!.id, quizId, JSON.stringify(picked), picked.length);
  res.json({
    attemptId, quizId, title: quizTitle(conn, quizId),
    questions: picked.map(({ answer, ...rest }) => rest),
  });
});

featuresRouter.post('/quizzes/attempts/:attemptId/submit', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const attempt = conn.prepare('SELECT * FROM quiz_attempts WHERE id = ? AND user_id = ?').get(req.params.attemptId, req.user!.id) as Record<string, unknown> | undefined;
  if (!attempt) { res.status(404).json({ error: 'quiz attempt not found' }); return; }
  if (attempt.submitted) { res.status(409).json({ error: 'attempt already submitted' }); return; }
  const parsed = z.object({ answers: z.record(z.number().int()), timeSeconds: z.number().int().min(0).default(0) }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const questions = parseJson(String(attempt.questions), []) as QuizQuestion[];
  let correct = 0;
  const review = questions.map((q) => {
    const given = parsed.data.answers[q.id];
    const ok = given === q.answer;
    if (ok) correct++;
    return { questionId: q.id, question: q.question, options: q.options, given: given ?? null, correctAnswer: q.answer, correct: ok, explanation: q.explanation, topic: q.topic };
  });
  const scorePercent = questions.length ? Math.round((correct / questions.length) * 100) : 0;
  conn.prepare('UPDATE quiz_attempts SET score_percent = ?, correct = ?, answers = ?, time_seconds = ?, submitted = 1 WHERE id = ?')
    .run(scorePercent, correct, JSON.stringify(parsed.data.answers), parsed.data.timeSeconds, req.params.attemptId);
  res.json({ attemptId: req.params.attemptId, scorePercent, correct, total: questions.length, review });
});

featuresRouter.get('/quizzes/attempts', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const attempts = conn.prepare('SELECT id, quiz_id, score_percent, correct, total, time_seconds, created_at FROM quiz_attempts WHERE user_id = ? AND submitted = 1 ORDER BY created_at DESC LIMIT 50').all(req.user!.id);
  res.json({ attempts });
});

// ---- Code challenges ----
function challengePublic(c: (typeof CHALLENGES)[number]) {
  const { tests, ...rest } = c;
  return { ...rest, tests: tests.filter((t) => !t.hidden).map((t) => ({ name: t.name })) };
}

featuresRouter.get('/challenges', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const out = CHALLENGES.map((c) => {
    const best = conn.prepare(`SELECT COUNT(*) AS attempts, SUM(passed) AS passes,
        MIN(CASE WHEN passed = 1 THEN time_seconds END) AS best_seconds
      FROM challenge_attempts WHERE user_id = ? AND challenge_id = ?`).get(req.user!.id, c.id) as { attempts: number; passes: number; best_seconds: number | null };
    return { ...challengePublic(c), attempts: best.attempts, passes: best.passes || 0, bestSeconds: best.best_seconds };
  });
  res.json({ challenges: out });
});

featuresRouter.get('/challenges/:id', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const c = CHALLENGES.find((x) => x.id === req.params.id);
  if (!c) { res.status(404).json({ error: 'challenge not found' }); return; }
  const attempts = conn.prepare('SELECT id, passed, time_seconds, created_at FROM challenge_attempts WHERE user_id = ? AND challenge_id = ? ORDER BY created_at DESC LIMIT 20').all(req.user!.id, c.id);
  res.json({ challenge: challengePublic(c), attempts });
});

featuresRouter.post('/challenges/:id/submit', requireAuth, async (req: AuthedRequest, res) => {
  const conn = db();
  const c = CHALLENGES.find((x) => x.id === req.params.id);
  if (!c) { res.status(404).json({ error: 'challenge not found' }); return; }
  const parsed = z.object({ code: z.string().min(1).max(200000), timeSeconds: z.number().int().min(0).default(0) }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const { results, allPassed, runtimeUnavailable } = await evaluateCode(c.language, parsed.data.code, c.tests);
  if (runtimeUnavailable) { res.status(503).json({ error: `language runtime (${c.language}) is not installed on this host`, runtimeUnavailable: true }); return; }
  conn.prepare('INSERT INTO challenge_attempts (id, user_id, challenge_id, passed, time_seconds, code) VALUES (?, ?, ?, ?, ?, ?)')
    .run(uid('chal'), req.user!.id, c.id, allPassed ? 1 : 0, parsed.data.timeSeconds, parsed.data.code);
  const publicResults = results.map((r) => (r.hidden ? { name: r.name, passed: r.passed, hidden: true } : r));
  res.json({ passed: allPassed, results: publicResults });
});

// ---- Interview prep + simulator ----
featuresRouter.get('/interview/tracks', requireAuth, (_req, res) => {
  res.json({
    tracks: INTERVIEW_TRACKS.map((t) => ({ ...t, behavioral: t.behavioral, technical: t.technical })),
    rubric: INTERVIEW_RUBRIC,
  });
});

featuresRouter.post('/interview/start', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const parsed = z.object({ track: z.string().min(1) }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const track = INTERVIEW_TRACKS.find((t) => t.id === parsed.data.track);
  if (!track) { res.status(404).json({ error: 'interview track not found' }); return; }
  const challenge = CHALLENGES.find((c) => c.id === track.codingChallengeId);
  if (!challenge) { res.status(500).json({ error: 'interview coding question is misconfigured' }); return; }
  const attemptId = uid('int');
  conn.prepare('INSERT INTO interview_attempts (id, user_id, track, challenge_id, behavioral_max) VALUES (?, ?, ?, ?, ?)')
    .run(attemptId, req.user!.id, track.id, challenge.id, track.behavioral.length * INTERVIEW_RUBRIC.length * 5);
  res.json({
    attemptId, track: { id: track.id, title: track.title, description: track.description },
    coding: challengePublic(challenge),
    behavioral: track.behavioral, technical: track.technical, rubric: INTERVIEW_RUBRIC,
  });
});

featuresRouter.post('/interview/:attemptId/submit', requireAuth, async (req: AuthedRequest, res) => {
  const conn = db();
  const attempt = conn.prepare('SELECT * FROM interview_attempts WHERE id = ? AND user_id = ?').get(req.params.attemptId, req.user!.id) as Record<string, unknown> | undefined;
  if (!attempt) { res.status(404).json({ error: 'interview attempt not found' }); return; }
  const parsed = z.object({
    code: z.string().min(1).max(200000),
    behavioral: z.record(z.object({ scores: z.record(z.number().int().min(1).max(5)) })),
  }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const track = INTERVIEW_TRACKS.find((t) => t.id === String(attempt.track));
  const challenge = CHALLENGES.find((c) => c.id === String(attempt.challenge_id));
  if (!track || !challenge) { res.status(500).json({ error: 'interview attempt is misconfigured' }); return; }
  const { results, allPassed, runtimeUnavailable } = await evaluateCode(challenge.language, parsed.data.code, challenge.tests);
  if (runtimeUnavailable) { res.status(503).json({ error: `language runtime (${challenge.language}) is not installed on this host`, runtimeUnavailable: true }); return; }
  // Behavioral scores are the learner's own rubric self-assessment (1–5 per
  // rubric criterion, per question). Stored and reported as self-assessed.
  let behavioralTotal = 0;
  const behavioralDetail = track.behavioral.map((q) => {
    const given = parsed.data.behavioral[q.id]?.scores ?? {};
    const perCriterion = INTERVIEW_RUBRIC.map((r) => ({ criterion: r.criterion, score: given[r.criterion] ?? 0 }));
    const sum = perCriterion.reduce((a, x) => a + x.score, 0);
    behavioralTotal += sum;
    return { questionId: q.id, question: q.question, perCriterion, total: sum, max: INTERVIEW_RUBRIC.length * 5 };
  });
  const behavioralMax = track.behavioral.length * INTERVIEW_RUBRIC.length * 5;
  conn.prepare('UPDATE interview_attempts SET coding_passed = ?, behavioral_scores = ?, behavioral_total = ?, behavioral_max = ? WHERE id = ?')
    .run(allPassed ? 1 : 0, JSON.stringify(parsed.data.behavioral), behavioralTotal, behavioralMax, req.params.attemptId);
  res.json({
    attemptId: req.params.attemptId,
    coding: { passed: allPassed, results: results.map((r) => (r.hidden ? { name: r.name, passed: r.passed, hidden: true } : r)) },
    behavioral: { total: behavioralTotal, max: behavioralMax, selfAssessed: true, detail: behavioralDetail },
    technical: track.technical.map((q) => ({ questionId: q.id, question: q.question, guidance: q.guidance })),
  });
});

featuresRouter.get('/interview/attempts', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const attempts = conn.prepare('SELECT * FROM interview_attempts WHERE user_id = ? ORDER BY created_at DESC LIMIT 20').all(req.user!.id) as Record<string, unknown>[];
  res.json({ attempts: attempts.map((a) => ({ ...a, behavioral_scores: parseJson(String(a.behavioral_scores), {}) })) });
});

// ---- Bootcamps ----
function bootcampSchedule(conn: Db, userId: string, b: (typeof BOOTCAMPS)[number]) {
  const enr = conn.prepare('SELECT start_date FROM bootcamp_enrollments WHERE user_id = ? AND bootcamp_id = ?').get(userId, b.id) as { start_date?: string } | undefined;
  // Not enrolled yet: preview the schedule as if starting today.
  const start = enr?.start_date ? new Date(`${enr.start_date}T00:00:00Z`) : new Date();
  const weeks = b.plan.map((w) => {
    const weekStart = new Date(start.getTime() + (w.week - 1) * 7 * 86400000);
    const weekEnd = new Date(weekStart.getTime() + 6 * 86400000);
    const progress = courseProgress(conn, userId, w.courseSlugs);
    const avg = progress.length ? Math.round(progress.reduce((a, x) => a + x.percent, 0) / progress.length) : 0;
    return {
      ...w, progress,
      startDate: weekStart.toISOString().slice(0, 10),
      endDate: weekEnd.toISOString().slice(0, 10),
      percent: avg, completed: progress.length > 0 && progress.every((x) => x.completed),
    };
  });
  return { ...b, enrolled: !!enr, startDate: enr?.start_date ?? null, weeks };
}

featuresRouter.get('/bootcamps', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  res.json({ bootcamps: BOOTCAMPS.map((b) => bootcampSchedule(conn, req.user!.id, b)) });
});

featuresRouter.get('/bootcamps/:id', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const b = BOOTCAMPS.find((x) => x.id === req.params.id);
  if (!b) { res.status(404).json({ error: 'bootcamp not found' }); return; }
  res.json({ bootcamp: bootcampSchedule(conn, req.user!.id, b) });
});

featuresRouter.post('/bootcamps/:id/enroll', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const b = BOOTCAMPS.find((x) => x.id === req.params.id);
  if (!b) { res.status(404).json({ error: 'bootcamp not found' }); return; }
  const parsed = z.object({ startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional() }).safeParse(req.body ?? {});
  const startDate = parsed.success && parsed.data.startDate ? parsed.data.startDate : new Date().toISOString().slice(0, 10);
  conn.prepare(`INSERT INTO bootcamp_enrollments (user_id, bootcamp_id, start_date) VALUES (?, ?, ?)
    ON CONFLICT(user_id, bootcamp_id) DO UPDATE SET start_date = excluded.start_date`).run(req.user!.id, b.id, startDate);
  res.json({ ok: true, bootcamp: bootcampSchedule(conn, req.user!.id, b) });
});

// ---- Coach: guidance derived from real progress data ----
featuresRouter.get('/coach', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const userId = req.user!.id;
  const xp = totalXp(conn, userId);
  const streak = getStreak(conn, userId);
  const weak = weakTopics(conn, userId);
  const assessWeak = conn.prepare(`SELECT weak_topics FROM assessment_attempts WHERE user_id = ? AND passed = 0 ORDER BY created_at DESC LIMIT 10`).all(userId) as { weak_topics: string }[];
  const assessTopicCounts = new Map<string, number>();
  for (const row of assessWeak) {
    for (const t of parseJson(row.weak_topics, []) as string[]) assessTopicCounts.set(t, (assessTopicCounts.get(t) ?? 0) + 1);
  }
  const inProgress = conn.prepare(`SELECT c.slug AS slug, c.title AS title, ucp.completed_lessons AS done, ucp.total_lessons AS total
    FROM user_course_progress ucp JOIN courses c ON c.id = ucp.course_id
    WHERE ucp.user_id = ? AND ucp.enrolled = 1 AND ucp.total_lessons > 0 AND ucp.completed_lessons < ucp.total_lessons
    ORDER BY (1.0 * ucp.completed_lessons / ucp.total_lessons) DESC LIMIT 3`).all(userId) as { slug: string; title: string; done: number; total: number }[];
  const dsaSolved = (conn.prepare('SELECT COUNT(*) AS n FROM user_dsa_progress WHERE user_id = ? AND status = \'solved\'').get(userId) as { n: number }).n;
  const last7 = conn.prepare(`SELECT COALESCE(SUM(xp),0) AS xp, COALESCE(SUM(lessons_completed),0) AS lessons
    FROM learning_activity WHERE user_id = ? AND activity_date >= date('now','-7 days')`).get(userId) as { xp: number; lessons: number };

  const recommendations: { text: string; evidence: string; link: string }[] = [];
  for (const w of weak.slice(0, 3)) {
    recommendations.push({
      text: `Practise ${w.topic}: your pass rate there is ${Math.round(w.passRate * 100)}% over ${w.attempts} DSA attempts.`,
      evidence: `${w.passed}/${w.attempts} solved in topic "${w.topic}" (user_dsa_progress)`,
      link: '/practice',
    });
  }
  for (const [topic, count] of [...assessTopicCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2)) {
    recommendations.push({
      text: `Revisit "${topic}" — it appeared as a weak topic in ${count} failed assessment attempt(s).`,
      evidence: `${count} failed assessment attempt(s) list "${topic}" in weak_topics`,
      link: '/assessments',
    });
  }
  for (const c of inProgress) {
    recommendations.push({
      text: `Continue "${c.title}" — ${c.done}/${c.total} lessons done.`,
      evidence: `${c.done} of ${c.total} lessons completed in user_course_progress`,
      link: `/courses/${c.slug}`,
    });
  }
  if (recommendations.length === 0) {
    recommendations.push({
      text: xp === 0
        ? 'No learning activity recorded yet. Start with Python Programming — the beginner track with the most lessons.'
        : 'No weak topics detected in your recent work. Take a mixed quiz to find your next gap.',
      evidence: xp === 0 ? 'learning_activity has no rows for this user' : `total XP ${xp}, streak ${streak} days, no weak topics`,
      link: xp === 0 ? '/courses/python' : '/features/quizzes',
    });
  }

  const weeklyPlan: { day: string; task: string; reason: string }[] = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const tasks: { task: string; reason: string }[] = [];
  if (inProgress[0]) tasks.push({ task: `Continue "${inProgress[0].title}" — complete the next lesson.`, reason: `Most-advanced in-progress course (${inProgress[0].done}/${inProgress[0].total} lessons).` });
  else tasks.push({ task: 'Enroll in a skill path and complete its first course.', reason: 'No course is currently in progress (user_course_progress).' });
  if (weak[0]) tasks.push({ task: `DSA practice in ${weak[0].topic} (weakest topic).`, reason: `${Math.round(weak[0].passRate * 100)}% pass rate over ${weak[0].attempts} attempts.` });
  else tasks.push({ task: `Solve 3 DSA problems (you have solved ${dsaSolved} so far).`, reason: 'No weak DSA topic detected yet — keep the habit going.' });
  tasks.push({ task: 'Take a 10-question mixed quiz and review every wrong answer.', reason: 'Quizzes are drawn from your own lesson knowledge-checks and assessments.' });
  tasks.push({ task: 'Solve one timed code challenge.', reason: 'Keeps coding speed sharp; attempts and personal bests are tracked.' });
  if (inProgress[1]) tasks.push({ task: `Continue "${inProgress[1].title}".`, reason: `Second in-progress course (${inProgress[1].done}/${inProgress[1].total} lessons).` });
  else tasks.push({ task: 'Complete one project milestone on a project you have started, or start one.', reason: 'Project work is tracked in user_project_progress.' });
  tasks.push({ task: 'Run a mock interview round on your current track.', reason: 'Timed coding plus behavioral rubric practice.' });
  tasks.push({ task: 'Review the week: re-attempt one failed assessment or quiz question set.', reason: `This week so far: ${last7.lessons} lessons, ${last7.xp} XP.` });
  tasks.forEach((t, i) => weeklyPlan.push({ day: days[i], ...t }));

  res.json({
    summary: { xp, streak, dsaSolved, last7DaysXp: last7.xp, last7DaysLessons: last7.lessons, weakTopics: weak },
    recommendations, weeklyPlan,
  });
});

// ---- Builder: honest local planner over the real catalog ----
featuresRouter.get('/builder/suggestions', requireAuth, (_req, res) => {
  res.json({
    note: 'Built from CodeForge\'s own curriculum — no AI model, works offline.',
    suggestions: CAREER_PATHS.map((c) => c.title),
  });
});

featuresRouter.post('/builder/plan', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const parsed = z.object({ goal: z.string().min(3).max(500) }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input — describe your goal in a few words' }); return; }
  const tokens = parsed.data.goal.toLowerCase().split(/[^a-z0-9+#.]+/).filter((t) => t.length > 1);
  const stop = new Set(['learn', 'want', 'become', 'with', 'into', 'from', 'that', 'this', 'build', 'make']);
  const keys = tokens.filter((t) => !stop.has(t));
  // Short tokens (e.g. "go", "c") must match whole words, or "go" would
  // match "algorithms"; longer tokens match as substrings.
  const matches = (text: string, k: string) => {
    const lower = text.toLowerCase();
    if (k.length <= 3) return new RegExp(`\\b${k.replace(/[^a-z0-9]/g, '')}\\b`).test(lower);
    return lower.includes(k);
  };
  const score = (text: string) => keys.reduce((a, k) => a + (matches(text, k) ? 1 : 0), 0);
  const courses = conn.prepare('SELECT slug, title, description, language, skills, estimated_hours FROM courses').all() as Record<string, unknown>[];
  const rankedCourses = courses
    .map((c) => ({
      slug: c.slug, title: c.title, description: c.description, language: c.language,
      estimatedHours: c.estimated_hours,
      score: score(String(c.title)) * 3 + score(String(c.skills)) * 2 + score(String(c.description)),
    }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
  const projects = conn.prepare('SELECT slug, title, description, skills, level FROM projects').all() as Record<string, unknown>[];
  const rankedProjects = projects
    .map((p) => ({ slug: p.slug, title: p.title, description: p.description, level: p.level, score: score(String(p.title)) * 3 + score(String(p.skills)) * 2 + score(String(p.description)) }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const matchedPath = CAREER_PATHS.find((c) => score(c.title) > 0) ?? SKILL_PATHS.find((p) => score(p.title) > 0);
  res.json({
    note: 'Built from CodeForge\'s own curriculum — no AI model, works offline.',
    goal: parsed.data.goal,
    matchedKeywords: keys,
    suggestedPath: matchedPath ? { id: matchedPath.id, title: matchedPath.title } : null,
    steps: rankedCourses.map((c, i) => ({ step: i + 1, kind: 'course', slug: c.slug, title: c.title, estimatedHours: c.estimatedHours })),
    projects: rankedProjects.map((p) => ({ slug: p.slug, title: p.title, level: p.level })),
    docs: rankedCourses.slice(0, 3).map((c) => ({ title: `${c.title} — course page`, link: `/courses/${c.slug}` })),
    matchedAnything: rankedCourses.length > 0,
  });
});
