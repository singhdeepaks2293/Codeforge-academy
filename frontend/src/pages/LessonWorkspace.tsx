import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { api, langToEditor, langToExec } from '../lib/api';
import { useToast } from '../components/Toast';
import { Page } from '../components/Layout';

interface LessonContent {
  id: string; slug: string; title: string; objectives: string[]; introduction: string;
  concept: string; syntax: string; analogy: string; exampleCode: string; exampleLanguage: string;
  walkthrough: string[]; commonMistakes: string[]; debuggingExercise: { prompt: string; buggyCode: string; fixedCode: string; explanation: string };
  miniChallenge: string; summary: string;
  knowledgeCheck: { question: string; options: string[]; answer: number; explanation: string }[];
}
interface Exercise {
  id: string; title: string; type: string; instructions: string; starterCode: string;
  tests: { name: string; stdin?: string; expectedStdout?: string; expectedContains?: string; hidden: boolean }[];
  hints: { level: number; title: string; content: string }[];
  solutionExplanation: string;
  options?: string[] | null;
}
interface TestResult { name: string; passed: boolean; stdout?: string; stderr?: string; hidden?: boolean; }

export function LessonWorkspacePage() {
  const { slug, lessonId } = useParams();
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedEx, setSelectedEx] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [hint, setHint] = useState<{ title: string; content: string } | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizDone, setQuizDone] = useState(false);
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [runtimes, setRuntimes] = useState<{ id: string; available: boolean; version?: string; installHint: string }[]>([]);
  const [nav, setNav] = useState<{ modules: { id: string; title: string; lessons: { id: string; title: string }[] }[] } | null>(null);
  const toast = useToast();

  const load = useCallback(() => {
    if (!slug || !lessonId) return;
    api<{ lesson: LessonContent; exercises: Exercise[] }>(`/api/courses/${slug}/lessons/${lessonId}`)
      .then((d) => {
        setLesson(d.lesson);
        setExercises(d.exercises);
        setCode(d.exercises[0]?.starterCode || d.lesson.exampleCode);
        setSelectedEx(0); setHintLevel(0); setHint(null); setHintsUsed(0); setSolutionRevealed(false);
        setTestResults([]); setOutput(''); setQuizAnswers({}); setQuizDone(false); setQuizChoice(null);
      })
      .catch((e) => setError(e.message));
    api<{ course: unknown; modules: { id: string; title: string; lessons: { id: string; title: string }[] }[] }>(`/api/courses/${slug}`)
      .then((d) => setNav({ modules: d.modules })).catch(() => undefined);
    api<{ runtimes: { id: string; available: boolean; version?: string; installHint: string }[] }>('/api/execute/runtimes')
      .then((d) => setRuntimes(d.runtimes)).catch(() => undefined);
  }, [slug, lessonId]);

  useEffect(() => { load(); }, [load]);

  const ex = exercises[selectedEx];
  const execLang = lesson ? langToExec(lesson.exampleLanguage) : 'python';
  const isQuizEx = !!ex && (ex.type === 'multiple-choice' || ex.type === 'predict-output');
  // Map the editor language to the runtime id reported by /api/execute/runtimes.
  const runtimeId = execLang === 'javascript' || execLang === 'typescript' || execLang === 'react' ? 'node' : execLang === 'asm' ? 'c' : execLang;
  const runtime = runtimes.find((r) => r.id === runtimeId);

  const run = async () => {
    setRunning(true);
    setOutput('');
    try {
      const r = await api<{ success: boolean; stdout: string; stderr: string; exitCode: number | null; timedOut: boolean; durationMs: number; error?: string }>('/api/execute/run', {
        method: 'POST', body: JSON.stringify({ language: execLang, code, stdin }),
      });
      setOutput(`exit code: ${r.exitCode ?? '—'} · ${r.durationMs}ms${r.timedOut ? ' · TIMED OUT' : ''}\n--- stdout ---\n${r.stdout}\n--- stderr ---\n${r.stderr}`);
      if (r.success) toast('Program ran successfully', 'success');
    } catch (e) {
      const err = e as Error & { status?: number };
      setOutput(`Run failed (${err.status ?? 'error'}): ${err.message}\n${runtime && !runtime.available ? `Runtime missing: ${runtime.installHint}` : ''}`);
      toast(err.message, 'error');
    } finally { setRunning(false); }
  };

  const submit = async () => {
    if (!ex) { toast('This lesson has no coding exercise to submit', 'info'); return; }
    // Quiz-style exercises are graded by answer on the server — no code runs.
    if (isQuizEx) {
      if (quizChoice === null) { toast('Pick an answer first', 'info'); return; }
      setSubmitting(true);
      try {
        const r = await api<{ passed: boolean; results: TestResult[] }>(`/api/execute/exercises/${ex.id}/submit`, {
          method: 'POST', body: JSON.stringify({ answerIndex: quizChoice, hintsUsed, solutionRevealed, timeSeconds: 0 }),
        });
        setTestResults(r.results);
        if (r.passed) {
          toast('Correct! +20 XP', 'success');
          await api(`/api/courses/${slug}/lessons/${lessonId}/complete`, { method: 'POST' }).catch(() => undefined);
        } else {
          toast('Not quite — try a hint or re-read the concept', 'error');
        }
      } catch (e) { toast((e as Error).message, 'error'); }
      finally { setSubmitting(false); }
      return;
    }
    setSubmitting(true);
    try {
      const r = await api<{ passed: boolean; results: TestResult[] }>(`/api/execute/exercises/${ex.id}/submit`, {
        method: 'POST', body: JSON.stringify({ code, hintsUsed, solutionRevealed, timeSeconds: 0 }),
      });
      setTestResults(r.results);
      if (r.passed) {
        toast('All tests passed! +20 XP', 'success');
        await api(`/api/courses/${slug}/lessons/${lessonId}/complete`, { method: 'POST' }).catch(() => undefined);
      } else {
        toast('Some tests failed — check the results below', 'error');
      }
    } catch (e) { toast((e as Error).message, 'error'); }
    finally { setSubmitting(false); }
  };

  const requestHint = async (level: number) => {
    if (!ex) return;
    try {
      const r = await api<{ hint: { title: string; content: string } }>(`/api/execute/exercises/${ex.id}/hints/${level}`);
      setHint(r.hint);
      setHintLevel(level);
      setHintsUsed((h) => Math.max(h, level));
      if (level === 5) setSolutionRevealed(true);
    } catch (e) { toast((e as Error).message, 'error'); }
  };

  if (error) return <Page title="Lesson"><p role="alert" className="text-red-600">{error}</p></Page>;
  if (!lesson) return <Page title="Lesson"><p>Loading lesson…</p></Page>;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <Link className="text-brand-600" to={`/courses/${slug}`}>← Back to course</Link>
        <span className="text-slate-400">/</span>
        <span className="font-semibold">{lesson.title}</span>
        {runtime && !runtime.available && (
          <span className="badge bg-red-100 text-red-800">Runtime unavailable: {execLang} — {runtime.installHint}</span>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-[220px_1fr_1fr]">
        {/* Left: curriculum nav */}
        <aside className="card max-h-[75vh] overflow-y-auto p-3">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">Curriculum</h2>
          {nav?.modules.map((m) => (
            <div key={m.id} className="mb-3">
              <div className="text-xs font-semibold text-slate-500">{m.title}</div>
              {m.lessons.map((l) => (
                <Link key={l.id} to={`/courses/${slug}/lessons/${l.id}`}
                  className={`block rounded px-2 py-1 text-sm ${l.id === lessonId ? 'bg-brand-50 font-semibold text-brand-700 dark:bg-navy-800' : 'hover:bg-slate-100 dark:hover:bg-navy-800'}`}>
                  {l.title}
                </Link>
              ))}
            </div>
          ))}
        </aside>

        {/* Center: lesson content */}
        <article className="card max-h-[75vh] overflow-y-auto p-5">
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <h2 className="mt-4 font-semibold">Learning objectives</h2>
          <ul className="list-disc pl-5 text-sm">{lesson.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
          <h2 className="mt-4 font-semibold">Introduction</h2>
          <p className="text-sm leading-relaxed">{lesson.introduction}</p>
          <h2 className="mt-4 font-semibold">Concept</h2>
          <p className="text-sm leading-relaxed">{lesson.concept}</p>
          <h2 className="mt-4 font-semibold">Syntax</h2>
          <pre className="overflow-auto rounded-lg bg-navy-950 p-3 text-xs text-green-300">{lesson.syntax}</pre>
          <h2 className="mt-4 font-semibold">Real-world analogy</h2>
          <p className="text-sm italic">{lesson.analogy}</p>
          <h2 className="mt-4 font-semibold">Example</h2>
          <pre className="overflow-auto rounded-lg bg-navy-950 p-3 text-xs text-green-300">{lesson.exampleCode}</pre>
          <button className="btn-secondary mt-2" onClick={() => setCode(lesson.exampleCode)}>Load example into editor →</button>
          <h2 className="mt-4 font-semibold">Walkthrough</h2>
          <ol className="list-decimal pl-5 text-sm">{lesson.walkthrough.map((w, i) => <li key={i}>{w}</li>)}</ol>
          <h2 className="mt-4 font-semibold">Common mistakes</h2>
          <ul className="list-disc pl-5 text-sm">{lesson.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}</ul>
          <h2 className="mt-4 font-semibold">Debugging exercise</h2>
          <p className="text-sm">{lesson.debuggingExercise.prompt}</p>
          <pre className="mt-2 overflow-auto rounded-lg bg-red-950 p-3 text-xs text-red-200">{lesson.debuggingExercise.buggyCode}</pre>
          <details className="mt-2 text-sm">
            <summary className="cursor-pointer font-semibold text-brand-600">Show fix & explanation</summary>
            <pre className="mt-2 overflow-auto rounded-lg bg-navy-950 p-3 text-xs text-green-300">{lesson.debuggingExercise.fixedCode}</pre>
            <p className="mt-1">{lesson.debuggingExercise.explanation}</p>
          </details>
          <h2 className="mt-4 font-semibold">Mini challenge</h2>
          <p className="text-sm">{lesson.miniChallenge}</p>
          <h2 className="mt-4 font-semibold">Summary</h2>
          <p className="text-sm">{lesson.summary}</p>
          <h2 className="mt-4 font-semibold">Knowledge check</h2>
          {lesson.knowledgeCheck.map((q, qi) => (
            <div key={qi} className="mt-2 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
              <p className="text-sm font-medium">{qi + 1}. {q.question}</p>
              <div className="mt-2 space-y-1">
                {q.options.map((o, oi) => (
                  <label key={oi} className="flex items-center gap-2 text-sm">
                    <input type="radio" name={`q-${qi}`} checked={quizAnswers[qi] === oi} onChange={() => setQuizAnswers({ ...quizAnswers, [qi]: oi })} />
                    {o}
                  </label>
                ))}
              </div>
              {quizDone && (
                <p className={`mt-2 text-sm ${quizAnswers[qi] === q.answer ? 'text-green-600' : 'text-red-600'}`}>
                  {quizAnswers[qi] === q.answer ? '✓ Correct. ' : `✗ The correct answer is: ${q.options[q.answer]}. `}{q.explanation}
                </p>
              )}
            </div>
          ))}
          {!quizDone && <button className="btn-secondary mt-2" onClick={() => setQuizDone(true)}>Check answers</button>}
        </article>

        {/* Right: editor + run/submit */}
        <section className="card flex max-h-[75vh] flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 p-3 dark:border-slate-700">
            <h2 className="font-bold">Code editor — {lesson.exampleLanguage}</h2>
            <span className="text-xs text-slate-500">{runtime?.available ? `✓ ${runtime.version || 'runtime ready'}` : '⚠ runtime missing'}</span>
          </div>
          {exercises.length > 1 && (
            <div className="flex gap-1 overflow-x-auto border-b border-slate-200 p-2 dark:border-slate-700">
              {exercises.map((e, i) => (
                <button key={e.id} className={`whitespace-nowrap rounded px-2 py-1 text-xs font-semibold ${i === selectedEx ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-navy-800'}`}
                  onClick={() => { setSelectedEx(i); setCode(e.starterCode); setHint(null); setHintLevel(0); setQuizChoice(null); setTestResults([]); }}>
                  {e.title}
                </button>
              ))}
            </div>
          )}
          {ex && (
            <div className="border-b border-slate-200 p-3 text-sm dark:border-slate-700">
              <strong>Exercise: {ex.title}</strong>
              <p className="mt-1 text-slate-600 dark:text-slate-300">{ex.instructions}</p>
              {isQuizEx && ex.options && (
                <div className="mt-2 space-y-1">
                  {ex.options.map((o, oi) => (
                    <label key={oi} className="flex cursor-pointer items-center gap-2 rounded border border-slate-200 px-2 py-1 dark:border-slate-700">
                      <input type="radio" name={`ex-${ex.id}`} checked={quizChoice === oi} onChange={() => setQuizChoice(oi)} />
                      {o}
                    </label>
                  ))}
                  <p className="text-xs text-slate-500">Quiz exercise — graded by your answer, no code runs for this one.</p>
                </div>
              )}
              {!isQuizEx && <div className="mt-2 text-xs text-slate-500">Visible tests: {ex.tests.map((t) => t.name).join(', ') || 'none listed'}</div>}
            </div>
          )}
          <div className="min-h-[280px] flex-1">
            <Editor height="100%" language={langToEditor(lesson.exampleLanguage)} value={code}
              onChange={(v) => setCode(v || '')} theme="vs-dark"
              options={{ minimap: { enabled: false }, fontSize: 14, automaticLayout: true }} />
          </div>
          <div className="border-t border-slate-200 p-3 dark:border-slate-700">
            <label className="label" htmlFor="stdin">Standard input (stdin)</label>
            <input id="stdin" className="input" placeholder="e.g. 3 4" value={stdin} onChange={(e) => setStdin(e.target.value)} />
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="btn-primary" onClick={run} disabled={running}>{running ? 'Running…' : '▶ Run'}</button>
              <button className="btn-secondary" onClick={() => setCode(ex?.starterCode || lesson.exampleCode)}>Reset</button>
              <button className="btn-primary" onClick={submit} disabled={submitting || !ex || (isQuizEx && quizChoice === null)}>{submitting ? 'Submitting…' : isQuizEx ? '✓ Submit answer' : '✓ Submit & test'}</button>
            </div>
            {output && (
              <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-navy-950 p-3 text-xs text-slate-100">{output}</pre>
            )}
            {testResults.length > 0 && (
              <div className="mt-3 space-y-1">
                <h3 className="font-semibold">Test results</h3>
                {testResults.map((t, i) => (
                  <div key={i} className={`rounded px-2 py-1 text-sm ${t.passed ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                    {t.passed ? '✓' : '✗'} {t.name}{t.hidden ? ' (hidden test)' : ''}
                    {!t.passed && t.stdout !== undefined && !t.hidden && <span className="block font-mono text-xs">got: {JSON.stringify(t.stdout)}</span>}
                    {!t.passed && t.stderr && <span className="block font-mono text-xs">error: {t.stderr.slice(0, 300)}</span>}
                  </div>
                ))}
              </div>
            )}
            {ex && (
              <div className="mt-3">
                <h3 className="font-semibold">Hints (progressive — no penalty for using them)</h3>
                <div className="mt-1 flex flex-wrap gap-1">
                  {[1, 2, 3, 4, 5].map((l) => (
                    <button key={l} className={`rounded px-2 py-1 text-xs font-semibold ${hintLevel === l ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-navy-800'}`} onClick={() => requestHint(l)}>
                      {l === 1 ? '💡 Concept' : l === 2 ? '🧭 Approach' : l === 3 ? '🧱 Structure' : l === 4 ? '🐛 Debug' : '✅ Solution'}
                    </button>
                  ))}
                </div>
                {hint && (
                  <div className="mt-2 rounded-lg bg-amber-50 p-3 text-sm dark:bg-amber-900/20">
                    <strong>{hint.title}</strong>
                    <pre className="mt-1 whitespace-pre-wrap font-sans">{hint.content}</pre>
                    {hintLevel === 5 && ex.solutionExplanation && <p className="mt-2 text-xs text-slate-500">{ex.solutionExplanation}</p>}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
