import { Router } from 'express';
import { z } from 'zod';
import { getDbPath, openDb, getConfig } from '../db/db.js';
import { requireAuth, type AuthedRequest } from '../middleware/auth.js';
import { masteryGate } from './courses.js';
import { evaluateCode } from './execute.js';
import { awardXp, xpFor, grantAchievement } from '../services/gamification.js';

export const dsaRouter = Router();
const db = () => openDb(getDbPath());

function parseJson(s: string, fallback: unknown = null) {
  try { return JSON.parse(s); } catch { return fallback; }
}

dsaRouter.get('/gate', requireAuth, (req: AuthedRequest, res) => {
  res.json(masteryGate(db(), req.user!.id));
});

dsaRouter.get('/problems', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const gate = masteryGate(conn, req.user!.id);
  const { difficulty, topic, q } = req.query;
  let sql = 'SELECT id, slug, title, difficulty, topics, description FROM dsa_problems WHERE 1=1';
  const params: unknown[] = [];
  if (difficulty) { sql += ' AND difficulty = ?'; params.push(difficulty); }
  if (topic) { sql += ' AND topics LIKE ?'; params.push(`%${topic}%`); }
  if (q) { sql += ' AND (title LIKE ? OR description LIKE ?)'; params.push(`%${q}%`, `%${q}%`); }
  sql += ' ORDER BY title LIMIT 300';
  const problems = (conn.prepare(sql).all(...params) as Record<string, unknown>[]).map((p) => ({
    ...p, topics: parseJson(String(p.topics), []),
    solved: !!(conn.prepare('SELECT 1 FROM user_dsa_progress WHERE user_id = ? AND problem_id = ? AND status = \'solved\'').get(req.user!.id, p.id)),
  }));
  res.json({ gate, problems });
});

dsaRouter.get('/problems/:slug', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const p = conn.prepare('SELECT * FROM dsa_problems WHERE slug = ?').get(req.params.slug) as Record<string, unknown> | undefined;
  if (!p) { res.status(404).json({ error: 'problem not found' }); return; }
  const tests = (parseJson(String(p.tests), []) as { hidden: boolean }[]).filter((t) => !t.hidden);
  // Map the snake_case DB columns to the camelCase names the frontend uses
  // (starterCode, timeComplexity, spaceComplexity, solutionDiscussion).
  // Previously the raw row was spread straight into the response, so the
  // editor saw starterCode={} and the complexity line was blank.
  res.json({
    problem: {
      id: p.id, slug: p.slug, title: p.title, difficulty: p.difficulty,
      description: p.description,
      topics: parseJson(String(p.topics), []), examples: parseJson(String(p.examples), []),
      constraints: parseJson(String(p.constraints), []), starterCode: parseJson(String(p.starter_code), {}),
      tests, hints: parseJson(String(p.hints), []),
      solutionDiscussion: p.solution_discussion, timeComplexity: p.time_complexity, spaceComplexity: p.space_complexity,
    },
  });
});

dsaRouter.post('/problems/:slug/submit', requireAuth, async (req: AuthedRequest, res) => {
  const conn = db();
  const parsed = z.object({ code: z.string().min(1).max(200000), language: z.string().default('python'), hintsUsed: z.number().int().min(0).default(0) }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const p = conn.prepare('SELECT * FROM dsa_problems WHERE slug = ?').get(req.params.slug) as Record<string, unknown> | undefined;
  if (!p) { res.status(404).json({ error: 'problem not found' }); return; }
  const tests = parseJson(String(p.tests), []) as { name: string; stdin?: string; expectedStdout?: string; expectedContains?: string; hidden: boolean }[];
  const { results, allPassed, runtimeUnavailable } = await evaluateCode(parsed.data.language, parsed.data.code, tests);
  if (runtimeUnavailable) { res.status(503).json({ error: 'language runtime is not installed on this host', runtimeUnavailable: true }); return; }
  conn.prepare(`INSERT INTO user_dsa_progress (user_id, problem_id, status, attempts)
    VALUES (?, ?, ?, 1) ON CONFLICT(user_id, problem_id) DO UPDATE SET
    attempts = attempts + 1, status = CASE WHEN ? = 1 THEN 'solved' ELSE status END`)
    .run(req.user!.id, p.id, allPassed ? 'solved' : 'attempted', allPassed ? 1 : 0);
  const id = `sub-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  conn.prepare(`INSERT INTO submissions (id, user_id, exercise_id, language, code, passed, test_results, hints_used, solution_revealed, time_seconds)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0)`)
    .run(id, req.user!.id, `dsa:${p.id}`, parsed.data.language, parsed.data.code, allPassed ? 1 : 0, JSON.stringify(results), parsed.data.hintsUsed);
  if (allPassed) awardXp(conn, req.user!.id, xpFor(conn, 'dsa'), 'dsa');
  const publicResults = results.map((r) => (r.hidden ? { name: r.name, passed: r.passed, hidden: true } : r));
  res.json({ passed: allPassed, results: publicResults });
});

// ---- Projects ----
export const projectsRouter = Router();

projectsRouter.get('/', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const { level } = req.query;
  let sql = 'SELECT id, slug, level, title, description, skills, language FROM projects WHERE 1=1';
  const params: unknown[] = [];
  if (level) { sql += ' AND level = ?'; params.push(Number(level)); }
  sql += ' ORDER BY level, title';
  const projects = (conn.prepare(sql).all(...params) as Record<string, unknown>[]).map((p) => ({
    ...p, skills: parseJson(String(p.skills), []),
    progress: conn.prepare('SELECT status, completed_milestones FROM user_project_progress WHERE user_id = ? AND project_id = ?').get(req.user!.id, p.id) as { status: string; completed_milestones: string } | undefined,
  }));
  res.json({ projects });
});

projectsRouter.get('/:slug', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const p = conn.prepare('SELECT * FROM projects WHERE slug = ?').get(req.params.slug) as Record<string, unknown> | undefined;
  if (!p) { res.status(404).json({ error: 'project not found' }); return; }
  const milestones = conn.prepare('SELECT * FROM project_milestones WHERE project_id = ? ORDER BY sort_order').all(p.id) as Record<string, unknown>[];
  const progress = conn.prepare('SELECT * FROM user_project_progress WHERE user_id = ? AND project_id = ?').get(req.user!.id, p.id) as { completed_milestones: string; status: string } | undefined;
  res.json({
    project: { ...p, ...parseJson(String(p.content), {}), skills: parseJson(String(p.skills), []) },
    milestones: milestones.map((m) => ({ ...m, ...parseJson(String(m.content), {}) })),
    progress: progress ? { ...progress, completedMilestones: parseJson(progress.completed_milestones, []) } : null,
  });
});

projectsRouter.post('/:slug/milestones/:milestoneId/complete', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const milestoneId = String(req.params.milestoneId);
  const p = conn.prepare('SELECT * FROM projects WHERE slug = ?').get(req.params.slug) as { id: string } | undefined;
  if (!p) { res.status(404).json({ error: 'project not found' }); return; }
  const m = conn.prepare('SELECT * FROM project_milestones WHERE id = ? AND project_id = ?').get(milestoneId, p.id);
  if (!m) { res.status(404).json({ error: 'milestone not found' }); return; }
  const existing = conn.prepare('SELECT completed_milestones FROM user_project_progress WHERE user_id = ? AND project_id = ?').get(req.user!.id, p.id) as { completed_milestones: string } | undefined;
  const done: string[] = existing ? (parseJson(existing.completed_milestones, []) as string[]) : [];
  if (!done.includes(milestoneId)) {
    done.push(milestoneId);
    awardXp(conn, req.user!.id, xpFor(conn, 'milestone'), 'milestone');
  }
  const total = (conn.prepare('SELECT COUNT(*) AS n FROM project_milestones WHERE project_id = ?').get(p.id) as { n: number }).n;
  const status = done.length >= total ? 'completed' : 'in-progress';
  conn.prepare(`INSERT INTO user_project_progress (user_id, project_id, completed_milestones, status)
    VALUES (?, ?, ?, ?) ON CONFLICT(user_id, project_id) DO UPDATE SET completed_milestones = excluded.completed_milestones, status = excluded.status`)
    .run(req.user!.id, p.id, JSON.stringify(done), status);
  res.json({ ok: true, completed: done.length, total, status });
});

projectsRouter.post('/:slug/submit', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const p = conn.prepare('SELECT * FROM projects WHERE slug = ?').get(req.params.slug) as { id: string } | undefined;
  if (!p) { res.status(404).json({ error: 'project not found' }); return; }
  const parsed = z.object({ milestoneId: z.string().optional(), notes: z.string().default('') }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const id = `psub-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  conn.prepare('INSERT INTO project_submissions (id, user_id, project_id, milestone_id, status, notes) VALUES (?, ?, ?, ?, \'submitted\', ?)')
    .run(id, req.user!.id, p.id, parsed.data.milestoneId ?? null, parsed.data.notes);
  res.status(201).json({ id });
});

// ---- Assessments ----
export const assessmentsRouter = Router();

assessmentsRouter.get('/:courseSlug', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const a = conn.prepare('SELECT * FROM assessments WHERE course_slug = ?').get(req.params.courseSlug) as Record<string, unknown> | undefined;
  if (!a) { res.status(404).json({ error: 'assessment not found' }); return; }
  // Never send answers to the client before submission
  const questions = (parseJson(String(a.questions), []) as Record<string, unknown>[]).map((q) => {
    const { answer, ...rest } = q;
    return rest;
  });
  const programming = (parseJson(String(a.programming_exercises), []) as Record<string, unknown>[]).map((e) => {
    const tests = (parseJson(String(e.tests ?? '[]'), []) as { hidden: boolean }[]).filter((t) => !t.hidden);
    return { ...e, solution: undefined, tests, hints: parseJson(String(e.hints ?? '[]'), []) };
  });
  const attempts = conn.prepare('SELECT id, score_percent, passed, weak_topics, time_seconds, created_at FROM assessment_attempts WHERE user_id = ? AND assessment_id = ? ORDER BY created_at DESC LIMIT 10').all(req.user!.id, a.id);
  res.json({ assessment: { id: a.id, courseSlug: a.course_slug, passPercent: a.pass_percent, questions, programmingExercises: programming, capstone: parseJson(String(a.capstone), {}) }, attempts });
});

assessmentsRouter.post('/:courseSlug/submit', requireAuth, async (req: AuthedRequest, res) => {
  const conn = db();
  const a = conn.prepare('SELECT * FROM assessments WHERE course_slug = ?').get(req.params.courseSlug) as Record<string, unknown> | undefined;
  if (!a) { res.status(404).json({ error: 'assessment not found' }); return; }
  const parsed = z.object({
    answers: z.record(z.number().int()),
    programming: z.record(z.string()).default({}),
    timeSeconds: z.number().int().min(0).default(0),
  }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const questions = parseJson(String(a.questions), []) as { id: string; topic: string; answer: number; explanation: string }[];
  let correct = 0;
  const weakByTopic = new Map<string, { total: number; wrong: number }>();
  const feedback = questions.map((q) => {
    const given = parsed.data.answers[q.id];
    const ok = given === q.answer;
    if (ok) correct++;
    const t = weakByTopic.get(q.topic) || { total: 0, wrong: 0 };
    t.total++; if (!ok) t.wrong++;
    weakByTopic.set(q.topic, t);
    return { questionId: q.id, correct: ok, explanation: q.explanation };
  });
  const programming = parseJson(String(a.programming_exercises), []) as { id: string; language?: string; tests: { name: string; stdin?: string; expectedStdout?: string; expectedContains?: string; hidden: boolean }[] }[];
  let progCorrect = 0;
  for (const ex of programming) {
    const code = parsed.data.programming[ex.id];
    if (!code) continue;
    const { allPassed } = await evaluateCode(ex.language || 'python', code, ex.tests);
    if (allPassed) progCorrect++;
  }
  const totalItems = questions.length + programming.length;
  const scorePercent = totalItems ? Math.round(((correct + progCorrect) / totalItems) * 100) : 0;
  const passPercent = Number(getConfig(conn, 'mastery_pass_percent', String(a.pass_percent)));
  const passed = scorePercent >= passPercent;
  const weakTopics = [...weakByTopic.entries()].filter(([, v]) => v.wrong > 0).map(([topic]) => topic);
  const id = `att-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  conn.prepare(`INSERT INTO assessment_attempts (id, user_id, assessment_id, score_percent, passed, answers, weak_topics, time_seconds)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(id, req.user!.id, a.id, scorePercent, passed ? 1 : 0, JSON.stringify(parsed.data.answers), JSON.stringify(weakTopics), parsed.data.timeSeconds);
  if (passed) {
    const course = conn.prepare('SELECT id FROM courses WHERE slug = ?').get(req.params.courseSlug) as { id: string } | undefined;
    if (course) {
      conn.prepare('UPDATE user_course_progress SET mastery_passed = 1 WHERE user_id = ? AND course_id = ?').run(req.user!.id, course.id);
    }
    const masterMap: Record<string, string> = { c: 'c-master', cpp: 'cpp-master', python: 'python-master', typescript: 'typescript-master', react: 'react-master', rust: 'rust-master', go: 'go-master' };
    const slugKey = String(req.params.courseSlug);
    if (masterMap[slugKey]) grantAchievement(conn, req.user!.id, masterMap[slugKey]);
    awardXp(conn, req.user!.id, 100, 'assessment');
  }
  res.json({ attemptId: id, scorePercent, passed, passPercent, correct, total: totalItems, weakTopics, feedback });
});

// ---- Progress / analytics ----
export const progressRouter = Router();

progressRouter.get('/dashboard', requireAuth, async (req: AuthedRequest, res) => {
  const conn = db();
  const { totalXp, getStreak, weakTopics, checkAchievements } = await import('../services/gamification.js');
  checkAchievements(conn, req.user!.id);
  const xp = totalXp(conn, req.user!.id);
  const streak = getStreak(conn, req.user!.id);
  const dailyGoal = Number(getConfig(conn, 'daily_goal_xp', '100'));
  const today = conn.prepare('SELECT xp FROM learning_activity WHERE user_id = ? AND activity_date = date(\'now\')').get(req.user!.id) as { xp: number } | undefined;
  const courses = conn.prepare(`SELECT c.slug, c.title, c.language, ucp.completed_lessons, ucp.total_lessons, ucp.enrolled, ucp.mastery_passed
    FROM user_course_progress ucp JOIN courses c ON c.id = ucp.course_id WHERE ucp.user_id = ?`).all(req.user!.id);
  const recentLessons = conn.prepare(`SELECT l.id, l.title, ulp.updated_at FROM user_lesson_progress ulp
    JOIN lessons l ON l.id = ulp.lesson_id WHERE ulp.user_id = ? AND ulp.status = 'completed' ORDER BY ulp.updated_at DESC LIMIT 5`).all(req.user!.id);
  const activity = conn.prepare('SELECT activity_date, xp, lessons_completed, exercises_solved FROM learning_activity WHERE user_id = ? ORDER BY activity_date DESC LIMIT 14').all(req.user!.id);
  const achievements = conn.prepare(`SELECT a.id, a.title, a.description, a.icon, a.xp, ua.earned_at FROM user_achievements ua
    JOIN achievements a ON a.id = ua.achievement_id WHERE ua.user_id = ? ORDER BY ua.earned_at DESC`).all(req.user!.id);
  const allAchievements = conn.prepare('SELECT * FROM achievements ORDER BY xp').all();
  const dsaSolved = (conn.prepare('SELECT COUNT(*) AS n FROM user_dsa_progress WHERE user_id = ? AND status = \'solved\'').get(req.user!.id) as { n: number }).n;
  const dsaTotal = (conn.prepare('SELECT COUNT(*) AS n FROM dsa_problems').get() as { n: number }).n;
  const projectsDone = (conn.prepare('SELECT COUNT(*) AS n FROM user_project_progress WHERE user_id = ? AND status = \'completed\'').get(req.user!.id) as { n: number }).n;
  res.json({
    xp, streak, dailyGoal, todayXp: today?.xp || 0,
    courses, recentLessons, activity, achievements, allAchievements,
    dsa: { solved: dsaSolved, total: dsaTotal },
    projectsCompleted: projectsDone,
    weakTopics: weakTopics(conn, req.user!.id),
  });
});

progressRouter.get('/profile', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const user = conn.prepare('SELECT id, email, display_name, role, status, created_at, last_login_at FROM users WHERE id = ?').get(req.user!.id);
  res.json({ user });
});

progressRouter.patch('/profile', requireAuth, (req: AuthedRequest, res) => {
  const parsed = z.object({ displayName: z.string().min(1).max(100) }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const conn = db();
  conn.prepare('UPDATE users SET display_name = ? WHERE id = ?').run(parsed.data.displayName, req.user!.id);
  res.json({ ok: true });
});
