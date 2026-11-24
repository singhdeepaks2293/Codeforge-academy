// Lesson workspace — Codecademy-style 3-column teaching workspace
// (Learn | Code Editor | Output Terminal), CodeForge branding only.
//
// Layout only: the teaching method is unchanged — same lessons, exercises,
// tests, 5-level hints, XP and completion flows. Run IS the check: pressing
// Run executes the code AND runs the current exercise's tests (quiz
// exercises: Run submits the chosen answer). On pass the checkpoint block
// in Learn flips to "Checkpoint Passed" in place, lesson completion is
// posted (the existing /complete call, same XP), and Next enables.
//
// No sidebar in the workspace, no streak/XP display here. stdin lives in
// the Tools drawer — the Terminal column is output-only.
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CodeEditor } from '../components/MonacoEditor';
import { WorkspaceShell, type WorkspaceDrawerId } from '../components/WorkspaceShell';
import { api, langToEditor, langToExec } from '../lib/api';
import { fetchRuntimes, installRuntime, provisioningStatusText, canInstall, kindLabel, type RuntimeInfo } from '../lib/provisioning';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';

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
interface NavModule { id: string; title: string; lessons: { id: string; title: string }[] }

type LessonTab = 'lesson' | 'examples' | 'quiz';

export function LessonWorkspacePage() {
  const { slug, lessonId } = useParams();
  const { user } = useAuth();
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [runError, setRunError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedEx, setSelectedEx] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [hint, setHint] = useState<{ title: string; content: string } | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizDone, setQuizDone] = useState(false);
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [runtimes, setRuntimes] = useState<RuntimeInfo[]>([]);
  const [installing, setInstalling] = useState(false);
  const [nav, setNav] = useState<{ modules: NavModule[] } | null>(null);
  // Per-exercise checkpoint state: Run passing flips the checkpoint in
  // place for that exercise (kept when switching between exercises).
  const [passedByEx, setPassedByEx] = useState<Record<string, boolean>>({});
  // Progress from GET /:slug/progress — the only source of per-lesson lock
  // state (see syllabusLockRule below). Absent/failed => fallback rule.
  const [progress, setProgress] = useState<{ completedLessons: string[]; unlockedLessons: string[] } | null>(null);
  const toast = useToast();

  const [lessonTab, setLessonTab] = useState<LessonTab>('lesson');
  const [exampleTab, setExampleTab] = useState(false);
  const [fileTreeOpen, setFileTreeOpen] = useState(false);
  const [drawer, setDrawer] = useState<WorkspaceDrawerId | null>(null);
  const [syllabusOpen, setSyllabusOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // Set when the learner taps "Explain error": the help drawer then shows
  // the error alongside the lesson concept and a hint (local content only).
  const [explainedError, setExplainedError] = useState<string | null>(null);
  const workspaceRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined);
      return;
    }
    const el = workspaceRef.current;
    if (el && el.requestFullscreen) {
      try { await el.requestFullscreen(); return; } catch { /* fall through to CSS expand */ }
    }
    setExpanded((v) => !v);
  };

  const load = useCallback(() => {
    if (!slug || !lessonId) return;
    api<{ lesson: LessonContent; exercises: Exercise[] }>(`/api/courses/${slug}/lessons/${lessonId}`)
      .then((d) => {
        setLesson(d.lesson);
        setExercises(d.exercises);
        setCode(d.exercises[0]?.starterCode || d.lesson.exampleCode);
        setSelectedEx(0); setHintLevel(0); setHint(null); setHintsUsed(0); setSolutionRevealed(false);
        setTestResults([]); setOutput(''); setRunError(null); setQuizAnswers({}); setQuizDone(false); setQuizChoice(null);
        setLessonTab('lesson'); setExampleTab(false); setPassedByEx({}); setExplainedError(null);
      })
      .catch((e) => setError(e.message));
    api<{ course: unknown; modules: NavModule[] }>(`/api/courses/${slug}`)
      .then((d) => setNav({ modules: d.modules })).catch(() => undefined);
    api<{ completedLessons: string[]; unlockedLessons: string[] }>(`/api/courses/${slug}/progress`)
      .then((d) => setProgress({ completedLessons: d.completedLessons ?? [], unlockedLessons: d.unlockedLessons ?? [] }))
      .catch(() => setProgress(null));
    fetchRuntimes()
      .then((d) => setRuntimes(d.runtimes)).catch(() => undefined);
  }, [slug, lessonId]);

  useEffect(() => { load(); }, [load]);

  const ex = exercises[selectedEx];
  const execLang = lesson ? langToExec(lesson.exampleLanguage) : 'python';
  const isQuizEx = !!ex && (ex.type === 'multiple-choice' || ex.type === 'predict-output');
  const runtimeId = execLang === 'javascript' || execLang === 'typescript' || execLang === 'react' ? 'node' : execLang === 'asm' ? 'c' : execLang;
  const runtime = runtimes.find((r) => r.id === runtimeId);
  const runtimeState = runtime?.provisioning?.state;
  const runtimeStatus = runtime ? provisioningStatusText(runtime) : null;

  useEffect(() => {
    if (runtimeState !== 'installing') return;
    const t = window.setInterval(() => {
      fetchRuntimes().then((d) => setRuntimes(d.runtimes)).catch(() => undefined);
    }, 3000);
    return () => window.clearInterval(t);
  }, [runtimeState]);

  const retryInstall = async () => {
    if (!runtime || installing) return;
    setInstalling(true);
    try {
      await installRuntime(runtime.id);
      toast(`Installing ${runtime.name} in the background — you can keep reading.`, 'info');
      const d = await fetchRuntimes();
      setRuntimes(d.runtimes);
    } catch (e) { toast((e as Error).message, 'error'); }
    finally { setInstalling(false); }
  };

  const markPassed = async () => {
    if (!ex) return;
    setPassedByEx((p) => ({ ...p, [ex.id]: true }));
    toast('All tests passed! +20 XP', 'success');
    // Existing lesson-complete behaviour: same endpoint, same XP.
    await api(`/api/courses/${slug}/lessons/${lessonId}/complete`, { method: 'POST' }).catch(() => undefined);
    setProgress((p) => p ? { ...p, completedLessons: [...new Set([...p.completedLessons, lessonId!])] } : p);
  };

  // Run IS the check: execute the code, then run the current exercise's
  // tests (quiz exercises: submit the chosen answer instead of running
  // code). The Example file tab only runs the lesson example — no check.
  const run = async () => {
    if (exampleTab) {
      setRunning(true);
      setOutput('');
      setRunError(null);
      try {
        const r = await api<{ success: boolean; stdout: string; stderr: string; exitCode: number | null; timedOut: boolean; durationMs: number; error?: string }>('/api/execute/run', {
          method: 'POST', body: JSON.stringify({ language: execLang, code: lesson?.exampleCode ?? '', stdin }),
        });
        setOutput(`exit code: ${r.exitCode ?? '—'} · ${r.durationMs}ms${r.timedOut ? ' · TIMED OUT' : ''}\n--- stdout ---\n${r.stdout}`);
        if (r.stderr) { setRunError(r.stderr); setOutput((o) => `${o}\n--- stderr ---\n${r.stderr}`); }
        if (r.success) toast('Program ran successfully', 'success');
      } catch (e) {
        const err = e as Error & { status?: number };
        setOutput(`Run failed (${err.status ?? 'error'}): ${err.message}\n${runtime && !runtime.available ? `Runtime missing: ${runtime.installHint}` : ''}`);
        setRunError(err.message);
        toast(err.message, 'error');
      } finally { setRunning(false); }
      return;
    }
    if (!ex) { toast('This lesson has no coding exercise to run', 'info'); return; }
    // Quiz-style exercises are graded by answer on the server — no code runs.
    if (isQuizEx) {
      if (quizChoice === null) { toast('Pick an answer first', 'info'); return; }
      setRunning(true);
      try {
        const r = await api<{ passed: boolean; results: TestResult[] }>(`/api/execute/exercises/${ex.id}/submit`, {
          method: 'POST', body: JSON.stringify({ answerIndex: quizChoice, hintsUsed, solutionRevealed, timeSeconds: 0 }),
        });
        setTestResults(r.results);
        if (r.passed) await markPassed();
        else toast('Not quite — try a hint or re-read the concept', 'error');
      } catch (e) { toast((e as Error).message, 'error'); }
      finally { setRunning(false); }
      return;
    }
    setRunning(true);
    setOutput('');
    setRunError(null);
    setTestResults([]);
    try {
      const r = await api<{ success: boolean; stdout: string; stderr: string; exitCode: number | null; timedOut: boolean; durationMs: number; error?: string }>('/api/execute/run', {
        method: 'POST', body: JSON.stringify({ language: execLang, code, stdin }),
      });
      setOutput(`exit code: ${r.exitCode ?? '—'} · ${r.durationMs}ms${r.timedOut ? ' · TIMED OUT' : ''}\n--- stdout ---\n${r.stdout}`);
      if (r.stderr) { setRunError(r.stderr); setOutput((o) => `${o}\n--- stderr ---\n${r.stderr}`); }
      if (r.success) toast('Program ran successfully', 'success');
    } catch (e) {
      const err = e as Error & { status?: number };
      setOutput(`Run failed (${err.status ?? 'error'}): ${err.message}\n${runtime && !runtime.available ? `Runtime missing: ${runtime.installHint}` : ''}`);
      setRunError(err.message);
      toast(err.message, 'error');
      setRunning(false);
      return;
    }
    // Program ran (even with a non-zero exit) — now run the exercise tests.
    try {
      const r = await api<{ passed: boolean; results: TestResult[] }>(`/api/execute/exercises/${ex.id}/submit`, {
        method: 'POST', body: JSON.stringify({ code, hintsUsed, solutionRevealed, timeSeconds: 0 }),
      });
      setTestResults(r.results);
      if (r.passed) await markPassed();
      else toast('Some tests failed — check the results in the Terminal', 'error');
    } catch (e) { toast((e as Error).message, 'error'); }
    finally { setRunning(false); }
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

  if (error) return <div className="p-6"><p role="alert" className="text-danger">{error}</p></div>;
  if (!lesson) return <div className="p-6"><p>Loading lesson…</p></div>;

  const flatLessons = (nav?.modules ?? []).flatMap((m) => m.lessons);
  const currentIdx = flatLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? flatLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx >= 0 && currentIdx < flatLessons.length - 1 ? flatLessons[currentIdx + 1] : null;
  const checkpointPassed = !!ex && !!passedByEx[ex.id];
  const lessonCompleted = !!progress && progress.completedLessons.includes(lessonId ?? '');
  // Next unlocks when this exercise's checkpoint passes (Run is the check).
  // Revisiting an already-completed lesson keeps Next available without
  // re-running the exercise.
  const nextEnabled = checkpointPassed || lessonCompleted;
  const passedCount = testResults.filter((t) => t.passed).length;

  // --- Syllabus lock rule ---
  // The lesson and course APIs expose NO per-lesson lock state. The
  // progress endpoint (GET /:slug/progress) does: unlockedLessons + the
  // server's unlock rule (a lesson is unlocked if it is first or the
  // previous lesson is completed). Use that when available.
  // Fallback (progress unavailable, e.g. signed out): the current lesson is
  // the frontier — lessons up to and including it are unlocked, later
  // lessons in order are padlocked. Locked lessons render as plain text
  // with a padlock, never as links.
  const unlockedSet = progress
    ? new Set(progress.unlockedLessons)
    : new Set(flatLessons.slice(0, currentIdx + 1).map((l) => l.id));
  const isLocked = (id: string) => !unlockedSet.has(id);

  const selectExercise = (i: number) => {
    setSelectedEx(i);
    setCode(exercises[i].starterCode);
    setHint(null); setHintLevel(0); setQuizChoice(null); setTestResults([]);
    setExampleTab(false); setFileTreeOpen(false);
  };

  const hintButtons = (compact = false) => (
    <div className="mt-2 flex flex-wrap gap-1">
      {[1, 2, 3, 4, 5].map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={hintLevel === l}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${hintLevel === l ? 'bg-yellow-400 text-black' : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'}`}
          onClick={() => requestHint(l)}
        >
          {l === 1 ? '💡 Concept' : l === 2 ? '🧭 Approach' : l === 3 ? '🧱 Structure' : l === 4 ? '🐛 Debug' : '✅ Solution'}
        </button>
      ))}
      {compact && hint && <span className="ml-1 text-xs text-zinc-500">Level {hintLevel} shown below</span>}
    </div>
  );

  const hintPanel = hint ? (
    <div className="mt-2 rounded-lg bg-yellow-50 p-3 text-sm text-zinc-900">
      <strong>{hint.title}</strong>
      <pre className="mt-1 whitespace-pre-wrap font-sans">{hint.content}</pre>
      {hintLevel === 5 && ex?.solutionExplanation && <p className="mt-2 text-xs text-zinc-500">{ex.solutionExplanation}</p>}
    </div>
  ) : (
    <p className="mt-2 text-xs text-zinc-500">Pick a hint level — each one reveals a little more, up to the full solution at level 5.</p>
  );

  const lessonTabBtn = (tab: LessonTab, label: string) => (
    <button
      key={tab}
      type="button"
      role="tab"
      aria-selected={lessonTab === tab}
      onClick={() => setLessonTab(tab)}
      className={`-mb-px border-b-2 px-3 py-2 text-sm font-semibold ${lessonTab === tab ? 'border-yellow-500 text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-900'}`}
    >
      {label}
    </button>
  );

  // ----- Learn column -----
  const learn = (
    <div className="px-5 py-4">
      <div className="flex gap-1 border-b border-zinc-200" role="tablist" aria-label="Lesson sections">
        {lessonTabBtn('lesson', 'Lesson')}
        {lessonTabBtn('examples', 'Examples')}
        {lessonTabBtn('quiz', 'Quiz')}
      </div>

      {ex && (
        <section aria-label="Current exercise" className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <h2 className="text-sm font-bold">Exercise: {ex.title}</h2>
          <p className="mt-0.5 text-sm leading-relaxed text-zinc-700">{ex.instructions}</p>
          {isQuizEx && ex.options && (
            <div className="mt-2 space-y-1">
              {ex.options.map((o, oi) => (
                <label key={oi} className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm">
                  <input type="radio" name={`ex-${ex.id}`} checked={quizChoice === oi} onChange={() => setQuizChoice(oi)} />
                  {o}
                </label>
              ))}
              <p className="text-xs text-zinc-500">Quiz exercise — press Run to submit your answer; no code runs for this one.</p>
            </div>
          )}
          {!isQuizEx && <p className="mt-1 text-xs text-zinc-500">Visible tests: {ex.tests.map((t) => t.name).join(', ') || 'none listed'}</p>}
          {/* Checkpoint: flips to passed in place when Run passes the tests. */}
          <div
            role="status"
            className={`mt-3 rounded-lg px-3 py-2 text-sm font-semibold ${checkpointPassed ? 'bg-green-100 text-green-800' : 'bg-zinc-200 text-zinc-700'}`}
          >
            {checkpointPassed ? '✓ Checkpoint Passed — nice work! You can move on.' : 'Checkpoint — press Run to check your code against the tests.'}
          </div>
          <div className="mt-3 rounded-lg bg-yellow-50 p-3">
            <h3 className="text-sm font-semibold">Stuck? Get a hint</h3>
            <p className="text-xs text-zinc-500">Progressive hints — no penalty for using them.</p>
            {hintButtons()}
            {hintPanel}
          </div>
        </section>
      )}

      {lessonTab === 'lesson' && (
        <>
          <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Learning objectives</h2>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-relaxed">{lesson.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
          <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Introduction</h2>
          <p className="mt-1 text-sm leading-relaxed">{lesson.introduction}</p>
          <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Concept</h2>
          <p className="mt-1 text-sm leading-relaxed">{lesson.concept}</p>
          <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Syntax</h2>
          <pre className="mt-1 overflow-auto rounded-lg bg-zinc-900 p-3 font-mono text-xs leading-relaxed text-green-400">{lesson.syntax}</pre>
          <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Real-world analogy</h2>
          <p className="mt-1 text-sm italic leading-relaxed text-zinc-500">{lesson.analogy}</p>
          <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Mini challenge</h2>
          <p className="mt-1 text-sm leading-relaxed">{lesson.miniChallenge}</p>
          <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Summary</h2>
          <p className="mt-1 text-sm leading-relaxed">{lesson.summary}</p>
        </>
      )}
      {lessonTab === 'examples' && (
        <>
          <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Example</h2>
          <pre className="mt-1 overflow-auto rounded-lg bg-zinc-900 p-3 font-mono text-xs leading-relaxed text-green-400">{lesson.exampleCode}</pre>
          <button type="button" className="mt-2 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-semibold text-white" onClick={() => setCode(lesson.exampleCode)}>Load example into editor →</button>
          <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Walkthrough</h2>
          <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-sm leading-relaxed">{lesson.walkthrough.map((w, i) => <li key={i}>{w}</li>)}</ol>
          <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Common mistakes</h2>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-relaxed">{lesson.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}</ul>
          <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Debugging exercise</h2>
          <p className="mt-1 text-sm leading-relaxed">{lesson.debuggingExercise.prompt}</p>
          <pre className="mt-2 overflow-auto rounded-lg bg-red-50 p-3 font-mono text-xs leading-relaxed text-red-700">{lesson.debuggingExercise.buggyCode}</pre>
          <details className="mt-2 text-sm">
            <summary className="cursor-pointer font-semibold text-yellow-600">Show fix &amp; explanation</summary>
            <pre className="mt-2 overflow-auto rounded-lg bg-zinc-900 p-3 font-mono text-xs leading-relaxed text-green-400">{lesson.debuggingExercise.fixedCode}</pre>
            <p className="mt-1 leading-relaxed">{lesson.debuggingExercise.explanation}</p>
          </details>
        </>
      )}
      {lessonTab === 'quiz' && (
        <>
          <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Knowledge check</h2>
          {lesson.knowledgeCheck.map((q, qi) => (
            <div key={qi} className="mt-2 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
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
                <p className={`mt-2 text-sm ${quizAnswers[qi] === q.answer ? 'text-green-700' : 'text-red-700'}`}>
                  {quizAnswers[qi] === q.answer ? '✓ Correct. ' : `✗ The correct answer is: ${q.options[q.answer]}. `}{q.explanation}
                </p>
              )}
            </div>
          ))}
          {!quizDone && <button type="button" className="mt-2 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-semibold text-white" onClick={() => setQuizDone(true)}>Check answers</button>}
        </>
      )}
    </div>
  );

  // ----- Editor column -----
  const editor = (
    <>
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-zinc-800 px-3 py-2">
        <button
          type="button"
          onClick={() => setFileTreeOpen((v) => !v)}
          aria-expanded={fileTreeOpen}
          aria-label="Toggle file tree"
          className="rounded-md bg-zinc-800 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-zinc-700"
        >
          ▤ Files
        </button>
        <h2 className="text-sm font-bold text-white">Code editor — {lesson.exampleLanguage}</h2>
        <span className={`text-xs ${!runtime || !runtimeStatus ? 'text-zinc-400' : runtimeStatus.tone === 'ok' ? 'text-green-400' : runtimeStatus.tone === 'muted' ? 'text-zinc-400' : runtimeStatus.tone === 'busy' || runtimeStatus.tone === 'warn' ? 'text-yellow-400' : 'text-red-400'}`}>
          {runtime && runtimeStatus ? runtimeStatus.text : 'Runtime status unknown'}
        </span>
      </div>
      <div className="panel-scroll-x flex shrink-0 gap-1 border-b border-zinc-800 bg-zinc-900 px-2 py-1.5" role="tablist" aria-label="Editor files">
        {exercises.map((e, i) => (
          <button
            key={e.id} type="button" role="tab" aria-selected={i === selectedEx && !exampleTab}
            className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold ${i === selectedEx && !exampleTab ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-300 hover:text-white'}`}
            onClick={() => selectExercise(i)}
          >
            ▤ {e.title}
          </button>
        ))}
        <button
          type="button" role="tab" aria-selected={exampleTab}
          className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold ${exampleTab ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-300 hover:text-white'}`}
          onClick={() => { setExampleTab(true); setFileTreeOpen(false); }}
        >
          ▤ Example
        </button>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <CodeEditor
          language={langToEditor(lesson.exampleLanguage)}
          value={exampleTab ? lesson.exampleCode : code}
          onChange={(v) => setCode(v)}
          ariaLabel={exampleTab ? 'Lesson example code (read-only)' : 'Code editor'}
          options={{ readOnly: exampleTab }}
        />
        {/* File tree: an in-editor drawer, not a persistent sidebar. */}
        {fileTreeOpen && (
          <div className="absolute inset-y-0 left-0 z-10 w-56 overflow-y-auto border-r border-zinc-700 bg-zinc-800 p-3 text-white" role="dialog" aria-label="File tree">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-400">Files</h3>
              <button type="button" onClick={() => setFileTreeOpen(false)} aria-label="Close file tree" className="rounded px-1.5 py-0.5 text-zinc-300 hover:bg-zinc-700">✕</button>
            </div>
            <ul className="mt-2 space-y-1 text-sm">
              {exercises.map((e, i) => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => selectExercise(i)}
                    className={`w-full rounded-md px-2 py-1.5 text-left ${i === selectedEx && !exampleTab ? 'bg-yellow-400 font-semibold text-black' : 'hover:bg-zinc-700'}`}
                  >
                    ▤ {e.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => { setExampleTab(true); setFileTreeOpen(false); }}
                  className={`w-full rounded-md px-2 py-1.5 text-left ${exampleTab ? 'bg-yellow-400 font-semibold text-black' : 'hover:bg-zinc-700'}`}
                >
                  ▤ Example
                </button>
              </li>
            </ul>
            <p className="mt-3 text-xs text-zinc-400">One file per exercise, plus the lesson example (read-only).</p>
          </div>
        )}
      </div>
      {/* Bottom action bar: Run is the check. */}
      <div className="flex shrink-0 items-center gap-2 border-t border-zinc-800 bg-zinc-900 px-3 py-2.5">
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="rounded-md bg-yellow-400 px-5 py-2 text-sm font-bold text-black hover:bg-yellow-300 disabled:opacity-50"
        >
          {running ? 'Running…' : '▶ Run'}
        </button>
        <button
          type="button"
          onClick={() => setCode(ex?.starterCode || lesson.exampleCode)}
          className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
        >
          Reset
        </button>
        <span className="ml-auto text-xs text-zinc-400">
          {isQuizEx ? 'Run submits your answer' : 'Run executes your code and runs the tests'}
        </span>
      </div>
    </>
  );

  // ----- Terminal column (output only) -----
  const terminal = (
    <>
      <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-3 py-2">
        <h2 className="text-sm font-bold text-white">Terminal</h2>
        <button
          type="button"
          onClick={() => { setOutput(''); setTestResults([]); setRunError(null); }}
          disabled={!output && testResults.length === 0}
          className="rounded-md px-2 py-1 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-40"
        >
          Clear
        </button>
      </div>
      <div className="workspace-terminal-scroll panel-scroll min-h-0 flex-1 overflow-y-auto px-3 py-2">
        {output ? (
          <>
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-zinc-100">{output}</pre>
            {runError && (
              <div className="mt-3 rounded-lg border border-red-900 bg-red-950/60 p-3">
                <p className="font-mono text-xs leading-relaxed text-red-400">{runError.slice(0, 500)}</p>
                <button
                  type="button"
                  onClick={() => { setExplainedError(runError); setDrawer('ai-help'); }}
                  className="mt-2 rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-bold text-black hover:bg-yellow-300"
                >
                  Explain error
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-xs text-zinc-500">No output yet — press Run to execute your code.</p>
        )}
        {testResults.length > 0 && (
          <div className="mt-3 border-t border-zinc-800 pt-3">
            <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-400">
              Test results ({passedCount}/{testResults.length} passed)
            </h3>
            <div className="mt-2 space-y-1">
              {testResults.map((t, i) => (
                <div key={i} className={`rounded-lg px-2 py-1.5 text-sm ${t.passed ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-400'}`}>
                  {t.passed ? '✓' : '✗'} {t.name}{t.hidden ? ' (hidden test)' : ''}
                  {!t.passed && t.stdout !== undefined && !t.hidden && <span className="block font-mono text-xs">got: {JSON.stringify(t.stdout)}</span>}
                  {!t.passed && t.stderr && <span className="block font-mono text-xs">error: {t.stderr.slice(0, 300)}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );

  // ----- Syllabus overlay content -----
  const syllabus = (
    <>
      <p className="text-xs text-zinc-500">
        Locked lessons open once the previous lesson is complete. A 🔒 means that lesson is not unlocked yet.
      </p>
      {(nav?.modules ?? []).map((m) => (
        <div key={m.id} className="mt-4">
          <div className="px-1 py-1 text-xs font-bold uppercase tracking-wide text-zinc-500">{m.title}</div>
          {m.lessons.map((l) => (
            isLocked(l.id) ? (
              <span
                key={l.id}
                aria-disabled="true"
                title="Locked — complete the previous lesson first"
                className="block cursor-not-allowed rounded-lg px-2 py-1.5 text-sm text-zinc-400"
              >
                🔒 {l.title}
              </span>
            ) : (
              <Link
                key={l.id}
                to={`/courses/${slug}/lessons/${l.id}`}
                onClick={() => setSyllabusOpen(false)}
                className={`block rounded-lg px-2 py-1.5 text-sm ${l.id === lessonId ? 'bg-yellow-100 font-semibold text-zinc-900' : 'text-zinc-700 hover:bg-zinc-100'}`}
              >
                {l.id === lessonId ? '▸ ' : ''}{l.title}
              </Link>
            )
          ))}
        </div>
      ))}
      {!(nav?.modules ?? []).length && <p className="mt-3 text-sm text-zinc-500">No syllabus loaded yet.</p>}
    </>
  );

  // ----- Drawer content -----
  const drawerTitles: Record<WorkspaceDrawerId, string> = {
    'ai-help': 'AI help',
    'unstuck': 'Get Unstuck',
    'tools': 'Tools',
    'unlocked': 'Everything unlocked',
  };
  const drawerContent = (
    <>
      {drawer === 'ai-help' && (
        <div className="space-y-3 text-sm leading-relaxed">
          <p className="rounded-lg bg-zinc-100 px-3 py-2 text-xs text-zinc-600">
            Local help, not an AI assistant — CodeForge runs entirely on this machine, so guidance here comes from the lesson itself, your hints, and the runtime status below.
          </p>
          {explainedError && (
            <div>
              <h3 className="font-bold">Your error, explained</h3>
              <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-red-50 p-2 font-mono text-xs text-red-700">{explainedError.slice(0, 500)}</pre>
              <p className="mt-1">Concept recap: {lesson.concept}</p>
              <p className="mt-1 text-zinc-600">Common cause: {lesson.commonMistakes[0] ?? 'check the syntax section in Learn.'}</p>
              <button type="button" className="mt-2 rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-bold text-black" onClick={() => { setDrawer('unstuck'); }}>Open a hint for this exercise</button>
            </div>
          )}
          <div>
            <h3 className="font-bold">Concept recap</h3>
            <p className="mt-1">{lesson.concept}</p>
          </div>
          <div>
            <h3 className="font-bold">Syntax</h3>
            <pre className="mt-1 overflow-auto rounded-lg bg-zinc-900 p-2 font-mono text-xs text-green-400">{lesson.syntax}</pre>
          </div>
          <div>
            <h3 className="font-bold">Runtime</h3>
            <p className="mt-1">{runtime && runtimeStatus ? `${runtime.name}: ${runtimeStatus.text}` : 'Runtime status unknown'}</p>
          </div>
          <Link to={`/courses/${slug}`} className="inline-block font-semibold text-yellow-600 hover:underline">Back to course overview →</Link>
        </div>
      )}
      {drawer === 'unstuck' && (
        <div className="text-sm">
          <h3 className="font-bold">Hints (progressive — no penalty for using them)</h3>
          {ex ? (
            <>
              {hintButtons()}
              {hintPanel}
            </>
          ) : (
            <p className="mt-2 text-zinc-500">This lesson has no exercise to hint on.</p>
          )}
        </div>
      )}
      {drawer === 'tools' && (
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-bold">Display</h3>
            <button type="button" onClick={toggleFullscreen} className="mt-1 rounded-md bg-zinc-900 px-3 py-1.5 font-semibold text-white">
              {isFullscreen || expanded ? '⤢ Exit fullscreen' : '⤢ Fullscreen'}
            </button>
          </div>
          <div>
            <h3 className="font-bold">Editor</h3>
            <button type="button" onClick={() => setCode(ex?.starterCode || lesson.exampleCode)} className="mt-1 rounded-md bg-zinc-200 px-3 py-1.5 font-semibold">
              Reset code to starter
            </button>
          </div>
          <div>
            <h3 className="font-bold">Standard input (stdin)</h3>
            <p className="mt-0.5 text-xs text-zinc-500">Program input for the next Run — the Terminal column is output-only.</p>
            <input
              aria-label="Standard input"
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 font-mono text-sm"
              placeholder="e.g. 3 4"
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
            />
          </div>
          <div>
            <h3 className="font-bold">Runtime</h3>
            <p className="mt-1">Language: <strong>{execLang}</strong></p>
            <p>Runtime: {runtime && runtimeStatus ? runtimeStatus.text : 'unknown'}</p>
            {runtime?.provisioning && <p>Provisioning: {kindLabel(runtime.provisioning.kind)}{runtime.provisioning.dockerBaked ? ' (in Docker image)' : ''}</p>}
            {runtime && !runtime.available && runtime.provisioning?.guidance && <p className="mt-1 text-zinc-600">{runtime.provisioning.guidance}</p>}
            <p className="mt-1 text-xs text-zinc-500">Code runs locally on this machine. A missing runtime is reported honestly — nothing is faked.</p>
            {runtime && !runtime.available && canInstall(runtime) && (
              <button type="button" className="mt-2 rounded-md bg-zinc-900 px-3 py-1.5 font-semibold text-white" onClick={retryInstall} disabled={installing}>
                {installing ? 'Starting install…' : `Retry install ${runtime.name}`}
              </button>
            )}
          </div>
        </div>
      )}
      {drawer === 'unlocked' && (
        <div className="space-y-3 text-sm leading-relaxed">
          <p className="text-base font-bold">Everything in CodeForge is already unlocked. 🎉</p>
          <p>CodeForge is free and runs locally on your machine — there is no paid plan, no upgrade, and no paywall. Every course, lesson, hint, project, assessment and the full code editor are included.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>All courses and lessons — no locked content</li>
            <li>All 5 hint levels, including full solutions</li>
            <li>All projects, DSA problems and assessments</li>
          </ul>
          <p className="text-xs text-zinc-500">Lessons still open in order so each one builds on the last — that is a learning order, not a payment gate.</p>
        </div>
      )}
    </>
  );

  return (
    <WorkspaceShell
      title={lesson.title}
      segmentCount={flatLessons.length || 1}
      segmentIndex={Math.max(currentIdx, 0)}
      banner={
        <>
          {runtime && !runtime.available && runtime.provisioning && runtime.provisioning.state === 'installing' && (
            <div className="shrink-0 border-b border-zinc-800 bg-yellow-400 px-4 py-2 text-sm font-semibold text-black" role="status">
              Setting up {runtime.name} in the background — you can keep reading the lesson; Run will work as soon as it reports ready.
            </div>
          )}
          {runtime && !runtime.available && runtime.provisioning && (runtime.provisioning.state === 'failed' || runtime.provisioning.state === 'install_unavailable') && (
            <div className="shrink-0 border-b border-zinc-800 bg-white px-4 py-2 text-sm text-zinc-900" role="status">
              <strong>{runtime.name} isn&apos;t ready yet.</strong>{' '}
              <span className="text-zinc-600">
                {runtime.provisioning.reason ? `${runtime.provisioning.reason} ` : ''}
                {runtime.provisioning.guidance || runtime.installHint}
              </span>
              {canInstall(runtime) && (
                <button type="button" className="ml-2 rounded-md bg-zinc-900 px-2 py-1 text-xs font-semibold text-white" onClick={retryInstall} disabled={installing}>
                  {installing ? 'Starting install…' : 'Retry install'}
                </button>
              )}
            </div>
          )}
        </>
      }
      learn={learn}
      editor={editor}
      terminal={terminal}
      bottomCenter={<>{exercises.length ? `Exercise ${selectedEx + 1} of ${exercises.length}` : 'No exercises in this lesson'}</>}
      bottomRight={
        <>
          {prevLesson ? (
            <Link className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700" title={prevLesson.title} to={`/courses/${slug}/lessons/${prevLesson.id}`}>← Back</Link>
          ) : (
            <span aria-disabled="true" className="cursor-not-allowed rounded-md bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-500 opacity-60">← Back</span>
          )}
          {nextLesson && nextEnabled ? (
            <Link className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-bold text-black hover:bg-yellow-300" title={nextLesson.title} to={`/courses/${slug}/lessons/${nextLesson.id}`}>Next →</Link>
          ) : nextLesson ? (
            <span aria-disabled="true" title="Pass the checkpoint to continue" className="cursor-not-allowed rounded-md bg-yellow-400 px-4 py-2 text-sm font-bold text-black opacity-50">Next →</span>
          ) : (
            <span className="text-xs text-zinc-400">Last lesson in this course</span>
          )}
        </>
      }
      avatarInitial={(user?.displayName ?? user?.email ?? '?').charAt(0).toUpperCase()}
      onOpenSyllabus={() => setSyllabusOpen(true)}
      syllabusOpen={syllabusOpen}
      onCloseSyllabus={() => setSyllabusOpen(false)}
      syllabus={syllabus}
      drawer={drawer}
      onCloseDrawer={() => setDrawer(null)}
      drawerTitle={drawer ? drawerTitles[drawer] : ''}
      drawerContent={drawerContent}
      onOpenAiHelp={() => { setExplainedError(null); setDrawer('ai-help'); }}
      onOpenUnstuck={() => setDrawer('unstuck')}
      onOpenTools={() => setDrawer('tools')}
      onOpenUnlocked={() => setDrawer('unlocked')}
      workspaceRef={workspaceRef}
      expanded={expanded && !isFullscreen}
    />
  );
}
