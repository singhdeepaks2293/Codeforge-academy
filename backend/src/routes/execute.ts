import { Router } from 'express';
import { z } from 'zod';
import { getDbPath, openDb } from '../db/db.js';
import { requireAuth, type AuthedRequest } from '../middleware/auth.js';
import { detectRuntimes, runCode, type RunResult } from '../execution/executor.js';
import { buildRuntimesPayload } from '../services/provisioning.js';
import { awardXp, xpFor, grantAchievement } from '../services/gamification.js';

export const executeRouter = Router();
const db = () => openDb(getDbPath());

// Every catalog runtime (not just the ones detectRuntimes lists) with its
// provisioning state — baked / auto-installable / manual / builtin — so a
// learner can see why a runtime is missing and what happens next.
executeRouter.get('/runtimes', async (_req, res) => {
  const payload = await buildRuntimesPayload(db());
  res.json(payload);
});

const runSchema = z.object({
  language: z.string().min(1),
  code: z.string().min(1).max(200000),
  stdin: z.string().max(100000).optional(),
  timeoutMs: z.number().int().min(1000).max(60000).optional(),
});

executeRouter.post('/run', requireAuth, async (req: AuthedRequest, res) => {
  const parsed = runSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input', details: parsed.error.flatten() }); return; }
  const result = await runCode(parsed.data);
  if (result.runtimeUnavailable) { res.status(503).json({ ...result, error: result.error }); return; }
  res.json(result);
});

interface TestCase { name: string; stdin?: string; expectedStdout?: string; expectedContains?: string; hidden: boolean; }

function checkTest(stdout: string, t: TestCase): boolean {
  const out = stdout.trim();
  if (t.expectedStdout !== undefined) return out === t.expectedStdout.trim();
  if (t.expectedContains !== undefined) return stdout.includes(t.expectedContains);
  return false;
}

export async function evaluateCode(language: string, code: string, tests: TestCase[]): Promise<{ results: { name: string; passed: boolean; stdout: string; stderr: string; hidden: boolean }[]; allPassed: boolean; runtimeUnavailable: boolean }> {
  const results = [];
  let runtimeUnavailable = false;
  for (const t of tests) {
    const r: RunResult = await runCode({ language, code, stdin: t.stdin ?? '' });
    if (r.runtimeUnavailable) { runtimeUnavailable = true; break; }
    const passed = !r.timedOut && r.success && checkTest(r.stdout, t);
    results.push({ name: t.name, passed, stdout: r.stdout, stderr: r.stderr, hidden: t.hidden });
  }
  return { results, allPassed: results.length > 0 && results.every((r) => r.passed), runtimeUnavailable };
}

executeRouter.post('/exercises/:exerciseId/submit', requireAuth, async (req: AuthedRequest, res) => {
  const conn = db();
  const parsed = z.object({ code: z.string().min(1).max(200000).optional(), answerIndex: z.number().int().min(0).optional(), hintsUsed: z.number().int().min(0).default(0), solutionRevealed: z.boolean().default(false), timeSeconds: z.number().int().min(0).default(0) }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const ex = conn.prepare('SELECT * FROM exercises WHERE id = ?').get(req.params.exerciseId) as Record<string, unknown> | undefined;
  if (!ex) { res.status(404).json({ error: 'exercise not found' }); return; }
  // Quiz-style exercises (multiple-choice / predict-output) are graded by
  // answer, never by running code — this is how tracks whose toolchain is
  // missing (or that are purely conceptual) stay honestly evaluable.
  if ((ex.type === 'multiple-choice' || ex.type === 'predict-output') && parsed.data.answerIndex !== undefined) {
    const correct = parsed.data.answerIndex === Number(ex.answer_index);
    const id = `sub-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    conn.prepare(`INSERT INTO submissions (id, user_id, exercise_id, language, code, passed, test_results, hints_used, solution_revealed, time_seconds)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(id, req.user!.id, ex.id, String(ex.language), `answer:${parsed.data.answerIndex}`, correct ? 1 : 0,
        JSON.stringify([{ name: String(ex.title), passed: correct, hidden: false }]), parsed.data.hintsUsed, parsed.data.solutionRevealed ? 1 : 0, parsed.data.timeSeconds);
    if (correct) {
      awardXp(conn, req.user!.id, xpFor(conn, 'exercise'), 'exercise');
      grantAchievement(conn, req.user!.id, 'first-program');
    }
    res.json({ submissionId: id, passed: correct, results: [{ name: String(ex.title), passed: correct, hidden: false }] });
    return;
  }
  if (!parsed.data.code) { res.status(400).json({ error: 'code is required for this exercise' }); return; }
  const tests = JSON.parse(String(ex.tests)) as TestCase[];
  const { results, allPassed, runtimeUnavailable } = await evaluateCode(String(ex.language), parsed.data.code, tests);
  if (runtimeUnavailable) { res.status(503).json({ error: 'language runtime is not installed on this host', runtimeUnavailable: true, results: [] }); return; }
  const id = `sub-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  conn.prepare(`INSERT INTO submissions (id, user_id, exercise_id, language, code, passed, test_results, hints_used, solution_revealed, time_seconds)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(id, req.user!.id, ex.id, String(ex.language), parsed.data.code, allPassed ? 1 : 0,
      JSON.stringify(results), parsed.data.hintsUsed, parsed.data.solutionRevealed ? 1 : 0, parsed.data.timeSeconds);
  if (allPassed) {
    awardXp(conn, req.user!.id, xpFor(conn, 'exercise'), 'exercise');
    // first program achievement: any successful run/submission
    grantAchievement(conn, req.user!.id, 'first-program');
  }
  // Never expose hidden test inputs/expected outputs in the response
  const publicResults = results.map((r) => r.hidden ? { name: r.name, passed: r.passed, hidden: true } : r);
  res.json({ submissionId: id, passed: allPassed, results: publicResults });
});

executeRouter.get('/exercises/:exerciseId/hints/:level', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const level = Number(req.params.level);
  if (![1, 2, 3, 4, 5].includes(level)) { res.status(400).json({ error: 'hint level must be 1-5' }); return; }
  const ex = conn.prepare('SELECT hints FROM exercises WHERE id = ?').get(req.params.exerciseId) as { hints: string } | undefined;
  if (!ex) { res.status(404).json({ error: 'exercise not found' }); return; }
  const hints = JSON.parse(ex.hints) as { level: number; title: string; content: string }[];
  const hint = hints.find((h) => h.level === level);
  if (!hint) { res.status(404).json({ error: 'hint not available' }); return; }
  res.json({ hint });
});
