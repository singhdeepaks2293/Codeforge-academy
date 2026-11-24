import { Router } from 'express';
import { z } from 'zod';
import { getDbPath, openDb, audit, getConfig } from '../db/db.js';
import { requireAuth, requirePermission, type AuthedRequest } from '../middleware/auth.js';
import { awardXp, xpFor } from '../services/gamification.js';

export const coursesRouter = Router();
const db = () => openDb(getDbPath());

function parseJson(s: string, fallback: unknown = null) {
  try { return JSON.parse(s); } catch { return fallback; }
}

coursesRouter.get('/', (req, res) => {
  const conn = db();
  const { language, level, q, status, category } = req.query;
  let sql = 'SELECT * FROM courses WHERE 1=1';
  const params: unknown[] = [];
  if (language) { sql += ' AND language = ?'; params.push(language); }
  if (category) { sql += ' AND category = ?'; params.push(category); }
  if (status) { sql += ' AND status = ?'; params.push(status); }
  if (q) { sql += ' AND (title LIKE ? OR description LIKE ?)'; params.push(`%${q}%`, `%${q}%`); }
  sql += ' ORDER BY title';
  const courses = conn.prepare(sql).all(...params) as Record<string, unknown>[];
  const out = courses.map((c) => {
    const total = (conn.prepare('SELECT COUNT(*) AS n FROM lessons l JOIN modules m ON m.id = l.module_id WHERE m.course_id = ?').get(c.id) as { n: number }).n;
    return { ...c, skills: parseJson(String(c.skills), []), prerequisites: parseJson(String(c.prerequisites), []), totalLessons: total };
  });
  void level;
  res.json({ courses: out });
});

coursesRouter.get('/search', (req, res) => {
  const conn = db();
  const q = String(req.query.q || '').trim();
  if (!q) { res.json({ results: [] }); return; }
  const like = `%${q}%`;
  const courses = conn.prepare('SELECT id, slug, title, language FROM courses WHERE title LIKE ? OR description LIKE ? LIMIT 10').all(like, like);
  const lessons = conn.prepare(`SELECT l.id, l.title, l.slug, m.course_id FROM lessons l
    JOIN modules m ON m.id = l.module_id WHERE l.title LIKE ? LIMIT 10`).all(like);
  const problems = conn.prepare('SELECT id, slug, title, difficulty FROM dsa_problems WHERE title LIKE ? OR description LIKE ? LIMIT 10').all(like, like);
  const projects = conn.prepare('SELECT id, slug, title, level FROM projects WHERE title LIKE ? OR description LIKE ? LIMIT 10').all(like, like);
  res.json({ results: { courses, lessons, problems, projects } });
});

coursesRouter.get('/:slug', (req, res) => {
  const conn = db();
  const course = conn.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug) as Record<string, unknown> | undefined;
  if (!course) { res.status(404).json({ error: 'course not found' }); return; }
  const modules = conn.prepare('SELECT * FROM modules WHERE course_id = ? ORDER BY sort_order').all(course.id) as Record<string, unknown>[];
  const modulesOut = modules.map((m) => {
    const lessons = conn.prepare('SELECT id, slug, title, sort_order FROM lessons WHERE module_id = ? ORDER BY sort_order').all(m.id);
    return { ...m, lessons };
  });
  res.json({ course: { ...course, skills: parseJson(String(course.skills), []), prerequisites: parseJson(String(course.prerequisites), []) }, modules: modulesOut });
});

coursesRouter.get('/:slug/lessons/:lessonId', (req, res) => {
  const conn = db();
  const lesson = conn.prepare(`SELECT l.*, m.course_id AS course_id FROM lessons l
    JOIN modules m ON m.id = l.module_id WHERE l.id = ?`).get(req.params.lessonId) as Record<string, unknown> | undefined;
  if (!lesson) { res.status(404).json({ error: 'lesson not found' }); return; }
  const course = conn.prepare('SELECT slug FROM courses WHERE id = ?').get(lesson.course_id) as { slug: string } | undefined;
  if (course && course.slug !== req.params.slug) { res.status(404).json({ error: 'lesson not in this course' }); return; }
  const content = parseJson(String(lesson.content), {});
  const exercises = conn.prepare('SELECT * FROM exercises WHERE lesson_id = ?').all(lesson.id) as Record<string, unknown>[];
  const exercisesOut = exercises.map((e) => ({
    ...e,
    // Never send the quiz answer to the client; options ARE needed for display.
    answer_index: undefined,
    options: e.options ? parseJson(String(e.options), null) : null,
    tests: (parseJson(String(e.tests), []) as { hidden: boolean }[]).filter((t) => !t.hidden),
    hints: parseJson(String(e.hints), []),
  }));
  res.json({ lesson: { ...lesson, ...content, content: undefined }, exercises: exercisesOut });
});

coursesRouter.post('/:slug/enroll', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const course = conn.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug) as { id: string } | undefined;
  if (!course) { res.status(404).json({ error: 'course not found' }); return; }
  const total = (conn.prepare('SELECT COUNT(*) AS n FROM lessons l JOIN modules m ON m.id = l.module_id WHERE m.course_id = ?').get(course.id) as { n: number }).n;
  conn.prepare(`INSERT INTO user_course_progress (user_id, course_id, enrolled, completed_lessons, total_lessons, mastery_passed)
    VALUES (?, ?, 1, 0, ?, 0) ON CONFLICT(user_id, course_id) DO UPDATE SET enrolled = 1, total_lessons = excluded.total_lessons`)
    .run(req.user!.id, course.id, total);
  res.json({ ok: true });
});

/** Ordered lesson list for progression/unlock checks. */
export function orderedLessons(conn: ReturnType<typeof db>, courseId: string): string[] {
  const rows = conn.prepare(`SELECT l.id FROM lessons l JOIN modules m ON m.id = l.module_id
    WHERE m.course_id = ? ORDER BY m.sort_order, l.sort_order`).all(courseId) as { id: string }[];
  return rows.map((r) => r.id);
}

coursesRouter.post('/:slug/lessons/:lessonId/complete', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const lessonId = String(req.params.lessonId);
  const course = conn.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug) as { id: string } | undefined;
  if (!course) { res.status(404).json({ error: 'course not found' }); return; }
  const lesson = conn.prepare('SELECT id FROM lessons WHERE id = ?').get(lessonId);
  if (!lesson) { res.status(404).json({ error: 'lesson not found' }); return; }
  // Unlock rule: a lesson is unlocked if it is the first, or the previous lesson is completed.
  const order = orderedLessons(conn, course.id);
  const idx = order.indexOf(lessonId);
  if (idx > 0) {
    const prev = conn.prepare('SELECT status FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?').get(req.user!.id, order[idx - 1]) as { status: string } | undefined;
    if (!prev || prev.status !== 'completed') {
      res.status(403).json({ error: 'previous lesson must be completed first', locked: true });
      return;
    }
  }
  const existing = conn.prepare('SELECT status FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?').get(req.user!.id, lessonId) as { status: string } | undefined;
  conn.prepare(`INSERT INTO user_lesson_progress (user_id, lesson_id, status, xp_earned)
    VALUES (?, ?, 'completed', ?) ON CONFLICT(user_id, lesson_id) DO UPDATE SET status='completed'`)
    .run(req.user!.id, lessonId, xpFor(conn, 'lesson'));
  if (!existing || existing.status !== 'completed') {
    awardXp(conn, req.user!.id, xpFor(conn, 'lesson'), 'lesson');
    const done = (conn.prepare(`SELECT COUNT(*) AS n FROM user_lesson_progress ulp
      JOIN lessons l ON l.id = ulp.lesson_id JOIN modules m ON m.id = l.module_id
      WHERE ulp.user_id = ? AND ulp.status = 'completed' AND m.course_id = ?`).get(req.user!.id, course.id) as { n: number }).n;
    conn.prepare('UPDATE user_course_progress SET completed_lessons = ? WHERE user_id = ? AND course_id = ?').run(done, req.user!.id, course.id);
  }
  res.json({ ok: true });
});

coursesRouter.get('/:slug/progress', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const course = conn.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug) as { id: string } | undefined;
  if (!course) { res.status(404).json({ error: 'course not found' }); return; }
  const order = orderedLessons(conn, course.id);
  const done = new Set((conn.prepare(`SELECT lesson_id FROM user_lesson_progress
    WHERE user_id = ? AND status = 'completed' AND lesson_id IN (${order.map(() => '?').join(',') || 'NULL'})`).all(req.user!.id, ...order) as { lesson_id: string }[]).map((r) => r.lesson_id));
  // first incomplete lesson is the next unlocked one
  const nextIndex = order.findIndex((id) => !done.has(id));
  const unlocked = new Set<string>();
  order.forEach((id, i) => { if (i === 0 || done.has(order[i - 1])) unlocked.add(id); });
  res.json({
    total: order.length, completed: done.size,
    completedLessons: [...done], unlockedLessons: [...unlocked],
    nextLessonId: nextIndex >= 0 ? order[nextIndex] : null,
    percent: order.length ? Math.round((done.size / order.length) * 100) : 0,
  });
});

// ---- Admin curriculum management ----
coursesRouter.post('/', requireAuth, requirePermission('courses.create'), (req: AuthedRequest, res) => {
  const parsed = z.object({
    slug: z.string().min(1), language: z.string().min(1), title: z.string().min(1),
    description: z.string().default(''), difficulty: z.string().default('All levels'),
    estimatedHours: z.number().int().min(0).default(0), skills: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).default([]),
  }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input', details: parsed.error.flatten() }); return; }
  const conn = db();
  const id = `course-${parsed.data.slug}`;
  try {
    conn.prepare('INSERT INTO courses (id, slug, language, title, description, difficulty, estimated_hours, skills, prerequisites, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .run(id, parsed.data.slug, parsed.data.language, parsed.data.title, parsed.data.description, parsed.data.difficulty, parsed.data.estimatedHours, JSON.stringify(parsed.data.skills), JSON.stringify(parsed.data.prerequisites), 'draft');
  } catch { res.status(409).json({ error: 'course slug already exists' }); return; }
  audit(conn, { actorId: req.user!.id, actorEmail: req.user!.email, action: 'course.create', targetType: 'course', targetId: id });
  res.status(201).json({ id });
});

coursesRouter.patch('/:slug', requireAuth, requirePermission('courses.update'), (req: AuthedRequest, res) => {
  const conn = db();
  const course = conn.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug) as { id: string } | undefined;
  if (!course) { res.status(404).json({ error: 'course not found' }); return; }
  const parsed = z.object({
    title: z.string().min(1).optional(), description: z.string().optional(),
    difficulty: z.string().optional(), estimatedHours: z.number().int().min(0).optional(),
    status: z.enum(['draft', 'published']).optional(),
  }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const d = parsed.data;
  conn.prepare(`UPDATE courses SET title = COALESCE(?, title), description = COALESCE(?, description),
    difficulty = COALESCE(?, difficulty), estimated_hours = COALESCE(?, estimated_hours),
    status = COALESCE(?, status), updated_at = datetime('now') WHERE id = ?`)
    .run(d.title ?? null, d.description ?? null, d.difficulty ?? null, d.estimatedHours ?? null, d.status ?? null, course.id);
  audit(conn, { actorId: req.user!.id, actorEmail: req.user!.email, action: 'course.update', targetType: 'course', targetId: course.id });
  res.json({ ok: true });
});

coursesRouter.delete('/:slug', requireAuth, requirePermission('courses.delete'), (req: AuthedRequest, res) => {
  const conn = db();
  const course = conn.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug) as { id: string } | undefined;
  if (!course) { res.status(404).json({ error: 'course not found' }); return; }
  conn.prepare('DELETE FROM courses WHERE id = ?').run(course.id);
  audit(conn, { actorId: req.user!.id, actorEmail: req.user!.email, action: 'course.delete', targetType: 'course', targetId: course.id });
  res.json({ ok: true });
});

coursesRouter.post('/:slug/modules', requireAuth, requirePermission('lessons.manage'), (req: AuthedRequest, res) => {
  const conn = db();
  const course = conn.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug) as { id: string } | undefined;
  if (!course) { res.status(404).json({ error: 'course not found' }); return; }
  const parsed = z.object({ title: z.string().min(1), description: z.string().default(''), level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner') }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const maxOrder = (conn.prepare('SELECT COALESCE(MAX(sort_order), -1) AS m FROM modules WHERE course_id = ?').get(course.id) as { m: number }).m;
  const id = `mod-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  conn.prepare('INSERT INTO modules (id, course_id, title, description, level, sort_order) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, course.id, parsed.data.title, parsed.data.description, parsed.data.level, maxOrder + 1);
  res.status(201).json({ id });
});

coursesRouter.post('/lessons/:lessonId/exercises', requireAuth, requirePermission('lessons.manage'), (req: AuthedRequest, res) => {
  const conn = db();
  const lesson = conn.prepare('SELECT id, module_id FROM lessons WHERE id = ?').get(req.params.lessonId) as { id: string } | undefined;
  if (!lesson) { res.status(404).json({ error: 'lesson not found' }); return; }
  const parsed = z.object({
    title: z.string().min(1), type: z.string().default('write-code'), instructions: z.string().default(''),
    starterCode: z.string().default(''), solution: z.string().default(''), solutionExplanation: z.string().default(''),
    tests: z.array(z.object({ name: z.string(), stdin: z.string().optional(), expectedStdout: z.string().optional(), expectedContains: z.string().optional(), hidden: z.boolean().default(false) })).default([]),
    hints: z.array(z.object({ level: z.number().int().min(1).max(5), title: z.string(), content: z.string() })).default([]),
    language: z.string().default('python'),
  }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input', details: parsed.error.flatten() }); return; }
  const id = `ex-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  conn.prepare('INSERT INTO exercises (id, lesson_id, title, type, instructions, starter_code, solution, solution_explanation, tests, hints, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(id, lesson.id, parsed.data.title, parsed.data.type, parsed.data.instructions, parsed.data.starterCode, parsed.data.solution, parsed.data.solutionExplanation, JSON.stringify(parsed.data.tests), JSON.stringify(parsed.data.hints), parsed.data.language);
  res.status(201).json({ id });
});

export function masteryGate(conn: ReturnType<typeof db>, userId: string): { dsaUnlocked: boolean; reason: string } {
  const required = getConfig(conn, 'dsa_requires_mastery', 'true') === 'true';
  if (!required) return { dsaUnlocked: true, reason: 'mastery gate disabled by admin' };
  const passed = conn.prepare('SELECT COUNT(*) AS n FROM user_course_progress WHERE user_id = ? AND mastery_passed = 1').get(userId) as { n: number };
  return passed.n > 0
    ? { dsaUnlocked: true, reason: 'mastery assessment passed' }
    : { dsaUnlocked: false, reason: 'Complete a language mastery assessment (80%+) to unlock DSA' };
}
