// Seeds curriculum data files into SQLite. Idempotent: re-running updates
// existing rows (upsert by id/slug). Content lives in data/*.ts, never in the frontend.
//
// Performance: the catalogue is ~800 tracks / ~17k rows, so the seed
// prepares each statement ONCE and writes everything inside a single
// transaction (one commit, not one per row). The import phase (dynamic
// imports, async) runs first; the write phase is fully synchronous so no
// await ever happens inside the transaction.
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Db } from './db.js';
import type { Course, DsaProblem, MasteryAssessment, Project } from '../curriculum/types.js';

async function tryImport<T>(path: string, key: string): Promise<T | null> {
  try {
    const mod = await import(path) as Record<string, unknown>;
    return (mod[key] as T) ?? null;
  } catch (e) {
    console.warn(`[seed] could not load ${path}:`, (e as Error).message);
    return null;
  }
}

type Counts = { courses: number; lessons: number; exercises: number; dsa: number; projects: number; assessments: number };

type Stmt = ReturnType<Db['prepare']>;
interface Stmts {
  course: Stmt; module: Stmt; lesson: Stmt; exercise: Stmt;
  progressInsert: Stmt; progressUpdate: Stmt;
  assessment: Stmt; dsa: Stmt; project: Stmt; milestone: Stmt;
}

function prepareStmts(conn: Db): Stmts {
  return {
    course: conn.prepare(`INSERT INTO courses (id, slug, language, category, title, description, difficulty, estimated_hours, skills, prerequisites, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')
    ON CONFLICT(id) DO UPDATE SET title=excluded.title, description=excluded.description,
      difficulty=excluded.difficulty, estimated_hours=excluded.estimated_hours,
      skills=excluded.skills, prerequisites=excluded.prerequisites,
      category=excluded.category, updated_at=datetime('now')`),
    module: conn.prepare(`INSERT INTO modules (id, course_id, title, description, level, sort_order)
      VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET title=excluded.title,
      description=excluded.description, level=excluded.level, sort_order=excluded.sort_order`),
    lesson: conn.prepare(`INSERT INTO lessons (id, module_id, slug, title, sort_order, content)
        VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET title=excluded.title,
        sort_order=excluded.sort_order, content=excluded.content`),
    exercise: conn.prepare(`INSERT INTO exercises (id, lesson_id, title, type, instructions, starter_code, solution, solution_explanation, tests, hints, language, options, answer_index)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET title=excluded.title,
          instructions=excluded.instructions, starter_code=excluded.starter_code, solution=excluded.solution,
          solution_explanation=excluded.solution_explanation, tests=excluded.tests, hints=excluded.hints, language=excluded.language,
          options=excluded.options, answer_index=excluded.answer_index`),
    progressInsert: conn.prepare(`INSERT OR IGNORE INTO user_course_progress (user_id, course_id, enrolled, completed_lessons, total_lessons, mastery_passed)
    SELECT id, ?, 0, 0, ?, 0 FROM users`),
    progressUpdate: conn.prepare('UPDATE user_course_progress SET total_lessons = ? WHERE course_id = ?'),
    assessment: conn.prepare(`INSERT INTO assessments (id, course_slug, pass_percent, questions, programming_exercises, capstone)
    VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(course_slug) DO UPDATE SET pass_percent=excluded.pass_percent,
    questions=excluded.questions, programming_exercises=excluded.programming_exercises, capstone=excluded.capstone`),
    dsa: conn.prepare(`INSERT INTO dsa_problems (id, slug, title, difficulty, topics, description, examples, constraints, starter_code, tests, hints, solution_discussion, time_complexity, space_complexity)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET title=excluded.title,
        difficulty=excluded.difficulty, topics=excluded.topics, description=excluded.description,
        examples=excluded.examples, constraints=excluded.constraints, starter_code=excluded.starter_code,
        tests=excluded.tests, hints=excluded.hints, solution_discussion=excluded.solution_discussion,
        time_complexity=excluded.time_complexity, space_complexity=excluded.space_complexity`),
    project: conn.prepare(`INSERT INTO projects (id, slug, level, title, description, skills, language, content)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET title=excluded.title,
    description=excluded.description, skills=excluded.skills, language=excluded.language, content=excluded.content`),
    milestone: conn.prepare(`INSERT INTO project_milestones (id, project_id, sort_order, title, content)
      VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET title=excluded.title, content=excluded.content, sort_order=excluded.sort_order`),
  };
}

function seedOneCourse(s: Stmts, course: Course, counts: Counts): void {
  s.course.run(course.id, course.slug, course.language, course.category || 'languages', course.title, course.description,
    course.difficulty, course.estimatedHours, JSON.stringify(course.skills), JSON.stringify(course.prerequisites));
  counts.courses++;
  let totalLessons = 0;
  for (const mod of course.modules) {
    s.module.run(mod.id, course.id, mod.title, mod.description, mod.level, mod.order);
    mod.lessons.forEach((lesson, li) => {
      s.lesson.run(lesson.id, mod.id, lesson.slug, lesson.title, li, JSON.stringify(lesson));
      totalLessons++;
      for (const ex of lesson.exercises) {
        s.exercise.run(ex.id, lesson.id, ex.title, ex.type, ex.instructions, ex.starterCode, ex.solution,
          ex.solutionExplanation, JSON.stringify(ex.tests), JSON.stringify(ex.hints), lesson.exampleLanguage,
          ex.options ? JSON.stringify(ex.options) : null, ex.answerIndex ?? null);
        counts.exercises++;
      }
    });
  }
  counts.lessons += totalLessons;
  s.progressInsert.run(course.id, totalLessons);
  // fix total_lessons for existing rows too
  s.progressUpdate.run(totalLessons, course.id);
}

function seedOneAssessment(s: Stmts, a: MasteryAssessment, counts: Counts): void {
  s.assessment.run(`assess-${a.courseSlug}`, a.courseSlug, a.passPercent, JSON.stringify(a.questions),
    JSON.stringify(a.programmingExercises), JSON.stringify(a.capstone));
  counts.assessments++;
}

function seedOneDsa(s: Stmts, p: DsaProblem, counts: Counts): void {
  s.dsa.run(p.id, p.slug, p.title, p.difficulty, JSON.stringify(p.topics), p.description,
    JSON.stringify(p.examples), JSON.stringify(p.constraints), JSON.stringify(p.starterCode),
    JSON.stringify(p.tests), JSON.stringify(p.hints), p.solutionDiscussion, p.timeComplexity, p.spaceComplexity);
  counts.dsa++;
}

function seedOneProject(s: Stmts, p: Project, counts: Counts): void {
  const { milestones, ...rest } = p;
  s.project.run(p.id, p.slug, p.level, p.title, p.description, JSON.stringify(p.skills), p.language, JSON.stringify(rest));
  for (const m of milestones) {
    s.milestone.run(m.id, p.id, m.order, m.title, JSON.stringify(m));
  }
  counts.projects++;
}

export async function seedCurriculum(conn: Db): Promise<Counts> {
  const counts: Counts = { courses: 0, lessons: 0, exercises: 0, dsa: 0, projects: 0, assessments: 0 };
  const courseFiles: [string, string][] = [
    ['../curriculum/data/c.js', 'C_COURSE'],
    ['../curriculum/data/cpp.js', 'CPP_COURSE'],
    ['../curriculum/data/python.js', 'PYTHON_COURSE'],
    ['../curriculum/data/typescript.js', 'TYPESCRIPT_COURSE'],
    ['../curriculum/data/react.js', 'REACT_COURSE'],
    ['../curriculum/data/rust.js', 'RUST_COURSE'],
    ['../curriculum/data/go.js', 'GO_COURSE'],
  ];
  const assessmentFiles: [string, string][] = [
    ['../curriculum/data/c.js', 'C_ASSESSMENT'],
    ['../curriculum/data/cpp.js', 'CPP_ASSESSMENT'],
    ['../curriculum/data/python.js', 'PYTHON_ASSESSMENT'],
    ['../curriculum/data/typescript.js', 'TYPESCRIPT_ASSESSMENT'],
    ['../curriculum/data/react.js', 'REACT_ASSESSMENT'],
    ['../curriculum/data/rust.js', 'RUST_ASSESSMENT'],
    ['../curriculum/data/go.js', 'GO_ASSESSMENT'],
  ];
  // 100-track expansion: each file exports an array of courses + assessments.
  const courseArrays: [string, string][] = [
    ['../curriculum/data/tracks-languages.js', 'TRACKS_LANGUAGES'],
    ['../curriculum/data/tracks-web.js', 'TRACKS_WEB'],
    ['../curriculum/data/tracks-mobile.js', 'TRACKS_MOBILE'],
    ['../curriculum/data/tracks-data.js', 'TRACKS_DATA'],
    ['../curriculum/data/tracks-databases.js', 'TRACKS_DATABASES'],
    ['../curriculum/data/tracks-devops.js', 'TRACKS_DEVOPS'],
    ['../curriculum/data/tracks-cs.js', 'TRACKS_CS'],
  ];
  const assessmentArrays: [string, string][] = [
    ['../curriculum/data/tracks-languages.js', 'SHORT_ASSESSMENTS_LANGUAGES'],
    ['../curriculum/data/tracks-web.js', 'SHORT_ASSESSMENTS_WEB'],
    ['../curriculum/data/tracks-mobile.js', 'SHORT_ASSESSMENTS_MOBILE'],
    ['../curriculum/data/tracks-data.js', 'SHORT_ASSESSMENTS_DATA'],
    ['../curriculum/data/tracks-databases.js', 'SHORT_ASSESSMENTS_DATABASES'],
    ['../curriculum/data/tracks-devops.js', 'SHORT_ASSESSMENTS_DEVOPS'],
    ['../curriculum/data/tracks-cs.js', 'SHORT_ASSESSMENTS_CS'],
  ];
  // Phase 1 — imports (async). Everything is collected first; nothing is
  // written until phase 2, so no await ever happens inside the transaction.
  const courses: Course[] = [];
  const assessments: MasteryAssessment[] = [];
  for (const [path, key] of courseFiles) {
    const course = await tryImport<Course>(path, key);
    if (course) courses.push(course);
  }
  for (const [path, key] of courseArrays) {
    const arr = await tryImport<Course[]>(path, key);
    if (arr) courses.push(...arr);
  }
  for (const [path, key] of assessmentFiles) {
    const a = await tryImport<MasteryAssessment>(path, key);
    if (a) assessments.push(a);
  }
  for (const [path, key] of assessmentArrays) {
    const arr = await tryImport<MasteryAssessment[]>(path, key);
    if (arr) assessments.push(...arr);
  }
  // 700-track expansion: any file named tracks700-*.js exports TRACKS_700
  // (Course[]) + SHORT_ASSESSMENTS_700 (MasteryAssessment[]). Globbed so new
  // track files wire up without editing this file. The glob accepts .js
  // (built dist) and .ts (vitest running against src, where the files are
  // still .ts) — the import uses the filename actually found on disk.
  const dataDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'curriculum', 'data');
  const sevenHundred = readdirSync(dataDir)
    .filter((f) => f.startsWith('tracks700-') && (f.endsWith('.js') || f.endsWith('.ts'))).sort();
  for (const f of sevenHundred) {
    const cs = await tryImport<Course[]>(`../curriculum/data/${f}`, 'TRACKS_700');
    if (cs) courses.push(...cs);
    const as = await tryImport<MasteryAssessment[]>(`../curriculum/data/${f}`, 'SHORT_ASSESSMENTS_700');
    if (as) assessments.push(...as);
  }
  const dsa = await tryImport<DsaProblem[]>('../curriculum/data/dsa.js', 'DSA_PROBLEMS') ?? [];
  const projects: Project[] = [];
  const baseProjects = await tryImport<Project[]>('../curriculum/data/projects.js', 'PROJECTS');
  if (baseProjects) projects.push(...baseProjects);
  // Industry projects: any file named projects-industry-*.js exports PROJECTS_INDUSTRY.
  // (.js in dist, .ts under vitest — same glob rule as the tracks above.)
  for (const f of readdirSync(dataDir)
    .filter((x) => x.startsWith('projects-industry-') && (x.endsWith('.js') || x.endsWith('.ts'))).sort()) {
    const extra = await tryImport<Project[]>(`../curriculum/data/${f}`, 'PROJECTS_INDUSTRY');
    if (extra) projects.push(...extra);
  }
  // Phase 2 — writes, one transaction, prepared statements reused.
  const s = prepareStmts(conn);
  conn.exec('BEGIN');
  try {
    for (const course of courses) seedOneCourse(s, course, counts);
    for (const a of assessments) seedOneAssessment(s, a, counts);
    for (const p of dsa) seedOneDsa(s, p, counts);
    for (const p of projects) seedOneProject(s, p, counts);
    conn.exec('COMMIT');
  } catch (e) {
    // ROLLBACK itself can fail (e.g. SQLITE_FULL auto-aborts the
    // transaction, leaving none active) — never let that mask the
    // original error, which is the one the caller needs to see.
    try { conn.exec('ROLLBACK'); } catch { /* transaction already ended */ }
    throw e;
  }
  return counts;
}
