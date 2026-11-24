// Gamification: XP, streaks, achievements — computed from real activity rows.
import type { Db } from '../db/db.js';
import { getConfig } from '../db/db.js';

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function awardXp(conn: Db, userId: string, xp: number, kind: 'lesson' | 'exercise' | 'dsa' | 'milestone' | 'assessment'): void {
  const today = todayStr();
  conn.prepare(`INSERT INTO learning_activity (user_id, activity_date, xp, lessons_completed, exercises_solved, minutes_spent)
    VALUES (?, ?, ?, ?, ?, 0)
    ON CONFLICT(user_id, activity_date) DO UPDATE SET
      xp = xp + excluded.xp,
      lessons_completed = lessons_completed + ?,
      exercises_solved = exercises_solved + ?`)
    .run(userId, today, xp,
      kind === 'lesson' ? 1 : 0,
      kind === 'exercise' || kind === 'dsa' ? 1 : 0,
      kind === 'lesson' ? 1 : 0,
      kind === 'exercise' || kind === 'dsa' ? 1 : 0);
  checkAchievements(conn, userId);
}

export function xpFor(conn: Db, kind: string): number {
  const map: Record<string, string> = {
    lesson: 'xp_per_lesson', exercise: 'xp_per_exercise', dsa: 'xp_per_dsa', milestone: 'xp_per_project_milestone',
  };
  return Number(getConfig(conn, map[kind] || 'xp_per_exercise', '20'));
}

export function getStreak(conn: Db, userId: string): number {
  const rows = conn.prepare(
    `SELECT activity_date FROM learning_activity WHERE user_id = ? AND xp > 0 ORDER BY activity_date DESC`).all(userId) as { activity_date: string }[];
  if (!rows.length) return 0;
  let streak = 0;
  const d = new Date();
  // allow today or yesterday as the most recent active day
  const dates = new Set(rows.map((r) => r.activity_date));
  const cursor = new Date(d);
  if (!dates.has(cursor.toISOString().slice(0, 10))) cursor.setDate(cursor.getDate() - 1);
  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function totalXp(conn: Db, userId: string): number {
  const row = conn.prepare('SELECT COALESCE(SUM(xp),0) AS xp FROM learning_activity WHERE user_id = ?').get(userId) as { xp: number };
  return row.xp;
}

export function grantAchievement(conn: Db, userId: string, achievementId: string): boolean {
  const exists = conn.prepare('SELECT 1 FROM achievements WHERE id = ?').get(achievementId);
  if (!exists) return false;
  const res = conn.prepare('INSERT OR IGNORE INTO user_achievements (user_id, achievement_id) VALUES (?, ?)').run(userId, achievementId);
  return res.changes > 0;
}

export function checkAchievements(conn: Db, userId: string): string[] {
  const earned: string[] = [];
  const grant = (id: string) => { if (grantAchievement(conn, userId, id)) earned.push(id); };
  const lessons = (conn.prepare('SELECT COUNT(*) AS n FROM user_lesson_progress WHERE user_id = ? AND status = \'completed\'').get(userId) as { n: number }).n;
  if (lessons >= 10) grant('lessons-10');
  if (lessons >= 50) grant('lessons-50');
  const solved = (conn.prepare('SELECT COUNT(*) AS n FROM submissions WHERE user_id = ? AND passed = 1').get(userId) as { n: number }).n;
  if (solved >= 100) grant('exercises-100');
  const debugSolved = (conn.prepare(`SELECT COUNT(*) AS n FROM submissions s JOIN exercises e ON e.id = s.exercise_id
    WHERE s.user_id = ? AND s.passed = 1 AND (e.type = 'fix-bug' OR e.type = 'find-bug')`).get(userId) as { n: number }).n;
  if (debugSolved >= 10) grant('debugging-expert');
  const dsaSolved = (conn.prepare('SELECT COUNT(*) AS n FROM user_dsa_progress WHERE user_id = ? AND status = \'solved\'').get(userId) as { n: number }).n;
  if (dsaSolved >= 10) grant('dsa-explorer');
  const graphSolved = (conn.prepare(`SELECT COUNT(*) AS n FROM user_dsa_progress udp JOIN dsa_problems dp ON dp.id = udp.problem_id
    WHERE udp.user_id = ? AND udp.status = 'solved' AND dp.topics LIKE '%Graph%'`).get(userId) as { n: number }).n;
  if (graphSolved >= 5) grant('graph-master');
  const projectsDone = (conn.prepare('SELECT COUNT(*) AS n FROM user_project_progress WHERE user_id = ? AND status = \'completed\'').get(userId) as { n: number }).n;
  if (projectsDone >= 1) grant('project-builder');
  const capstone = conn.prepare('SELECT 1 FROM user_project_progress WHERE user_id = ? AND project_id = \'proj-capstone\' AND status = \'completed\'').get(userId);
  if (capstone) grant('capstone-champion');
  const streak = getStreak(conn, userId);
  if (streak >= 7) grant('streak-7');
  if (streak >= 30) grant('streak-30');
  return earned;
}

/** Weak-topic recommendations from real submission data (low pass rate per topic). */
export function weakTopics(conn: Db, userId: string): { topic: string; attempts: number; passed: number; passRate: number }[] {
  const rows = conn.prepare(`SELECT dp.topics AS topics, COUNT(*) AS attempts,
      SUM(CASE WHEN udp.status = 'solved' THEN 1 ELSE 0 END) AS passed
    FROM user_dsa_progress udp JOIN dsa_problems dp ON dp.id = udp.problem_id
    WHERE udp.user_id = ? GROUP BY dp.topics`).all(userId) as { topics: string; attempts: number; passed: number }[];
  const byTopic = new Map<string, { attempts: number; passed: number }>();
  for (const r of rows) {
    for (const t of JSON.parse(r.topics) as string[]) {
      const cur = byTopic.get(t) || { attempts: 0, passed: 0 };
      cur.attempts += r.attempts; cur.passed += r.passed;
      byTopic.set(t, cur);
    }
  }
  return [...byTopic.entries()]
    .map(([topic, v]) => ({ topic, attempts: v.attempts, passed: v.passed, passRate: v.attempts ? v.passed / v.attempts : 0 }))
    .filter((t) => t.attempts >= 2 && t.passRate < 0.6)
    .sort((a, b) => a.passRate - b.passRate);
}
