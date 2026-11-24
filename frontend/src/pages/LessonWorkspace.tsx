import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CodeEditor } from '../components/MonacoEditor';
import { api, langToEditor, langToExec } from '../lib/api';
import { fetchRuntimes, installRuntime, provisioningStatusText, canInstall, kindLabel, type RuntimeInfo } from '../lib/provisioning';
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

const LESSON_WIDTH_KEY = 'cf-lesson-width';
const LESSON_COLLAPSED_KEY = 'cf-lesson-collapsed';
const CURRICULUM_COLLAPSED_KEY = 'cf-curriculum-collapsed';
const OUTPUT_HEIGHT_KEY = 'cf-output-height';
const OUTPUT_COLLAPSED_KEY = 'cf-output-collapsed';

function readNumber(key: string, fallback: number): number {
  try {
    const v = Number(localStorage.getItem(key));
    return Number.isFinite(v) && v > 0 ? v : fallback;
  } catch { return fallback; }
}
function readFlag(key: string): boolean {
  try { return localStorage.getItem(key) === '1'; } catch { return false; }
}
function writeLocal(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}

type OutputTab = 'output' | 'tests' | 'input' | 'hints';
// 'input' is the stdin box + runtime info, labelled honestly: it is not a
// real terminal, it is where program input goes.
type LessonTab = 'lesson' | 'examples' | 'quiz';

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
  const [runtimes, setRuntimes] = useState<RuntimeInfo[]>([]);
  const [installing, setInstalling] = useState(false);
  const [nav, setNav] = useState<{ modules: { id: string; title: string; lessons: { id: string; title: string }[] }[] } | null>(null);
  const toast = useToast();

  // --- Workspace layout state (persisted where sensible) ---
  const [lessonCollapsed, setLessonCollapsed] = useState<boolean>(() => readFlag(LESSON_COLLAPSED_KEY));
  const [lessonWidthPct, setLessonWidthPct] = useState<number>(() => Math.min(50, Math.max(20, readNumber(LESSON_WIDTH_KEY, 35))));
  const [navCollapsed, setNavCollapsed] = useState<boolean>(() => readFlag(CURRICULUM_COLLAPSED_KEY));
  const [outputTab, setOutputTab] = useState<OutputTab>('output');
  const [lessonTab, setLessonTab] = useState<LessonTab>('lesson');
  // 'Example' file tab: shows the lesson example read-only in the editor
  // without clobbering the learner's exercise code.
  const [exampleTab, setExampleTab] = useState(false);
  const [outputCollapsed, setOutputCollapsed] = useState<boolean>(() => readFlag(OUTPUT_COLLAPSED_KEY));
  const [outputHeight, setOutputHeight] = useState<number>(() => Math.min(420, Math.max(120, readNumber(OUTPUT_HEIGHT_KEY, 220))));
  const [expanded, setExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const toggleLessonCollapsed = () => {
    const next = !lessonCollapsed;
    setLessonCollapsed(next);
    writeLocal(LESSON_COLLAPSED_KEY, next ? '1' : '0');
  };
  const toggleNavCollapsed = () => {
    const next = !navCollapsed;
    setNavCollapsed(next);
    writeLocal(CURRICULUM_COLLAPSED_KEY, next ? '1' : '0');
  };
  const toggleOutputCollapsed = () => {
    const next = !outputCollapsed;
    setOutputCollapsed(next);
    writeLocal(OUTPUT_COLLAPSED_KEY, next ? '1' : '0');
  };

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

  // Draggable divider: resize the lesson panel (20–50% of the body width).
  const startLessonResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const body = bodyRef.current;
    if (!body) return;
    const rect = body.getBoundingClientRect();
    const startX = e.clientX;
    const startPct = lessonWidthPct;
    let latest = startPct;
    const onMove = (ev: PointerEvent) => {
      latest = Math.min(50, Math.max(20, startPct + ((ev.clientX - startX) / rect.width) * 100));
      setLessonWidthPct(latest);
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      writeLocal(LESSON_WIDTH_KEY, String(Math.round(latest)));
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  // Draggable top edge: resize the output panel (120–420px tall).
  const startOutputResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startH = outputHeight;
    let latest = startH;
    const onMove = (ev: PointerEvent) => {
      latest = Math.min(420, Math.max(120, startH - (ev.clientY - startY)));
      setOutputHeight(latest);
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      writeLocal(OUTPUT_HEIGHT_KEY, String(Math.round(latest)));
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const load = useCallback(() => {
    if (!slug || !lessonId) return;
    api<{ lesson: LessonContent; exercises: Exercise[] }>(`/api/courses/${slug}/lessons/${lessonId}`)
      .then((d) => {
        setLesson(d.lesson);
        setExercises(d.exercises);
        setCode(d.exercises[0]?.starterCode || d.lesson.exampleCode);
        setSelectedEx(0); setHintLevel(0); setHint(null); setHintsUsed(0); setSolutionRevealed(false);
        setTestResults([]); setOutput(''); setQuizAnswers({}); setQuizDone(false); setQuizChoice(null);
        setLessonTab('lesson'); setExampleTab(false);
      })
      .catch((e) => setError(e.message));
    api<{ course: unknown; modules: { id: string; title: string; lessons: { id: string; title: string }[] }[] }>(`/api/courses/${slug}`)
      .then((d) => setNav({ modules: d.modules })).catch(() => undefined);
    fetchRuntimes()
      .then((d) => setRuntimes(d.runtimes)).catch(() => undefined);
  }, [slug, lessonId]);

  useEffect(() => { load(); }, [load]);

  const ex = exercises[selectedEx];
  const execLang = lesson ? langToExec(lesson.exampleLanguage) : 'python';
  const isQuizEx = !!ex && (ex.type === 'multiple-choice' || ex.type === 'predict-output');
  // Map the editor language to the runtime id reported by /api/runtimes.
  const runtimeId = execLang === 'javascript' || execLang === 'typescript' || execLang === 'react' ? 'node' : execLang === 'asm' ? 'c' : execLang;
  const runtime = runtimes.find((r) => r.id === runtimeId);
  const runtimeState = runtime?.provisioning?.state;
  const runtimeStatus = runtime ? provisioningStatusText(runtime) : null;

  // While this lesson's runtime is installing in the background, poll until it lands.
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

  const run = async () => {
    setRunning(true);
    setOutput('');
    setOutputTab('output');
    // The Example file tab runs the lesson example; exercise tabs run the
    // learner's code.
    const codeToRun = exampleTab ? (lesson?.exampleCode ?? '') : code;
    try {
      const r = await api<{ success: boolean; stdout: string; stderr: string; exitCode: number | null; timedOut: boolean; durationMs: number; error?: string }>('/api/execute/run', {
        method: 'POST', body: JSON.stringify({ language: execLang, code: codeToRun, stdin }),
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
        setOutputTab('tests');
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
      setOutputTab('tests');
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

  if (error) return <Page title="Lesson"><p role="alert" className="text-danger">{error}</p></Page>;
  if (!lesson) return <Page title="Lesson"><p>Loading lesson…</p></Page>;

  // Compact prev/next lesson navigation across all modules.
  const flatLessons = (nav?.modules ?? []).flatMap((m) => m.lessons);
  const currentIdx = flatLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? flatLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx >= 0 && currentIdx < flatLessons.length - 1 ? flatLessons[currentIdx + 1] : null;
  const passedCount = testResults.filter((t) => t.passed).length;

  const lessonTabBtn = (tab: LessonTab, label: string) => (
    <button
      key={tab}
      role="tab"
      aria-selected={lessonTab === tab}
      onClick={() => setLessonTab(tab)}
      className={`-mb-px border-b-2 px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
        lessonTab === tab ? 'border-accent-500 text-accent-600' : 'border-transparent text-muted hover:text-ink'
      }`}
    >
      {label}
    </button>
  );

  const outputTabBtn = (tab: OutputTab, label: string, badge?: string) => (
    <button
      key={tab}
      role="tab"
      aria-selected={outputTab === tab}
      onClick={() => { setOutputTab(tab); if (outputCollapsed) toggleOutputCollapsed(); }}
      className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-200 ${
        outputTab === tab ? 'bg-accent-soft text-accent-600' : 'text-muted hover:bg-elevated hover:text-ink'
      }`}
    >
      {label}{badge ? ` (${badge})` : ''}
    </button>
  );

  return (
    <section
      ref={workspaceRef}
      aria-label="Lesson workspace"
      className={`flex min-h-0 flex-1 flex-col overflow-hidden bg-base ${expanded && !isFullscreen ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2 text-sm">
        <Link className="font-medium text-accent-600 hover:underline" to={`/courses/${slug}`}>← Back to course</Link>
        <span className="text-faint">/</span>
        <span className="font-semibold">{lesson.title}</span>
        {runtime && !runtime.available && runtimeStatus && (
          <span className={`badge ${runtimeStatus.tone === 'busy' || runtimeStatus.tone === 'warn' ? 'bg-warning-soft text-warning' : 'bg-danger-soft text-danger'}`}>{runtimeStatus.text}</span>
        )}
        {runtime && !runtime.available && canInstall(runtime) && (
          <button className="btn-secondary px-2 py-1 text-xs" onClick={retryInstall} disabled={installing}>
            {installing ? 'Starting install…' : `Install ${runtime.name}`}
          </button>
        )}
        <div className="ml-auto flex flex-wrap items-center gap-1">
          <button className="btn-ghost px-2 py-1 text-xs" onClick={toggleNavCollapsed}>{navCollapsed ? 'Show curriculum' : 'Hide curriculum'}</button>
          <button className="btn-ghost px-2 py-1 text-xs" onClick={toggleLessonCollapsed}>{lessonCollapsed ? 'Show lesson' : 'Hide lesson'}</button>
          <button className="btn-ghost px-2 py-1 text-xs" onClick={toggleFullscreen} aria-label="Toggle fullscreen">
            {isFullscreen || expanded ? '⤢ Exit fullscreen' : '⤢ Fullscreen'}
          </button>
        </div>
      </div>

      {/* Provisioning banner: honest status + guidance while the runtime is missing. */}
      {runtime && !runtime.available && runtime.provisioning && runtime.provisioning.state === 'installing' && (
        <div className="border-b border-line bg-warning-soft px-3 py-2 text-sm text-warning" role="status">
          Setting up {runtime.name} in the background — you can keep reading the lesson; Run will work as soon as it reports ready.
        </div>
      )}
      {runtime && !runtime.available && runtime.provisioning && (runtime.provisioning.state === 'failed' || runtime.provisioning.state === 'install_unavailable') && (
        <div className="border-b border-line bg-surface px-3 py-2 text-sm" role="status">
          <strong>{runtime.name} isn&apos;t ready yet.</strong>{' '}
          <span className="text-muted">
            {runtime.provisioning.reason ? `${runtime.provisioning.reason} ` : ''}
            {runtime.provisioning.guidance || runtime.installHint}
          </span>
          {canInstall(runtime) && (
            <button className="btn-secondary ml-2 px-2 py-1 text-xs" onClick={retryInstall} disabled={installing}>
              {installing ? 'Starting install…' : 'Retry install'}
            </button>
          )}
        </div>
      )}

      {/* Body: curriculum rail | lesson panel | editor column */}
      <div ref={bodyRef} className="flex min-h-0 flex-1">
        {!navCollapsed && !expanded && (
          <aside className="panel-scroll w-[200px] shrink-0 border-r border-line bg-sidebar p-3" aria-label="Curriculum">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-faint">Curriculum</h2>
            {nav?.modules.map((m) => (
              <div key={m.id} className="mb-3">
                <div className="px-2 py-1 text-xs font-semibold text-muted">{m.title}</div>
                {m.lessons.map((l) => (
                  <Link key={l.id} to={`/courses/${slug}/lessons/${l.id}`}
                    className={`block rounded-lg px-2 py-1.5 text-sm transition-colors duration-200 ${l.id === lessonId ? 'bg-accent-soft font-semibold text-accent-600' : 'text-muted hover:bg-elevated hover:text-ink'}`}>
                    {l.title}
                  </Link>
                ))}
              </div>
            ))}
          </aside>
        )}

        {!lessonCollapsed && !expanded && (
          <>
            <article className="flex min-h-0 shrink-0 flex-col overflow-hidden bg-surface" style={{ width: `${lessonWidthPct}%` }} aria-label="Lesson">
              <div className="shrink-0 px-5 pt-4">
                <div className="flex items-center justify-between gap-2">
                  <h1 className="min-w-0 text-lg font-bold leading-snug">{lesson.title}</h1>
                  <button className="btn-ghost shrink-0 px-2 py-1 text-xs" onClick={toggleLessonCollapsed} aria-label="Collapse lesson panel">‹ Hide</button>
                </div>
                <p className="mt-1 text-xs font-semibold text-muted">
                  {nav ? `Lesson ${currentIdx + 1} of ${flatLessons.length}` : 'Lesson'}
                </p>
                <div className="mt-3 flex gap-1 border-b border-line" role="tablist" aria-label="Lesson sections">
                  {lessonTabBtn('lesson', 'Lesson')}
                  {lessonTabBtn('examples', 'Examples')}
                  {lessonTabBtn('quiz', 'Quiz')}
                </div>
              </div>
              <div className="panel-scroll min-h-0 flex-1 px-5 py-4">
              {lessonTab === 'lesson' && (
              <>
              <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Learning objectives</h2>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-relaxed">{lesson.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>

              <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Introduction</h2>
              <p className="mt-1 text-sm leading-relaxed">{lesson.introduction}</p>

              <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Concept</h2>
              <p className="mt-1 text-sm leading-relaxed">{lesson.concept}</p>

              <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Syntax</h2>
              <pre className="mt-1 overflow-auto rounded-lg bg-code p-3 font-mono text-xs leading-relaxed text-success">{lesson.syntax}</pre>

              <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Real-world analogy</h2>
              <p className="mt-1 text-sm italic leading-relaxed text-muted">{lesson.analogy}</p>
              </>
              )}
              {lessonTab === 'examples' && (
              <>
              <h2 className="text-xs font-bold uppercase tracking-wide text-faint">Example</h2>
              <pre className="mt-1 overflow-auto rounded-lg bg-code p-3 font-mono text-xs leading-relaxed text-success">{lesson.exampleCode}</pre>
              <button className="btn-secondary mt-2" onClick={() => setCode(lesson.exampleCode)}>Load example into editor →</button>

              <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Walkthrough</h2>
              <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-sm leading-relaxed">{lesson.walkthrough.map((w, i) => <li key={i}>{w}</li>)}</ol>

              <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Common mistakes</h2>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-relaxed">{lesson.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}</ul>

              <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Debugging exercise</h2>
              <p className="mt-1 text-sm leading-relaxed">{lesson.debuggingExercise.prompt}</p>
              <pre className="mt-2 overflow-auto rounded-lg bg-danger-soft p-3 font-mono text-xs leading-relaxed text-danger">{lesson.debuggingExercise.buggyCode}</pre>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer font-semibold text-accent-600">Show fix &amp; explanation</summary>
                <pre className="mt-2 overflow-auto rounded-lg bg-code p-3 font-mono text-xs leading-relaxed text-success">{lesson.debuggingExercise.fixedCode}</pre>
                <p className="mt-1 leading-relaxed">{lesson.debuggingExercise.explanation}</p>
              </details>
              </>
              )}
              {lessonTab === 'lesson' && (
              <>
              <h2 className="text-xs font-bold uppercase tracking-wide text-faint">Mini challenge</h2>
              <p className="mt-1 text-sm leading-relaxed">{lesson.miniChallenge}</p>

              <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Summary</h2>
              <p className="mt-1 text-sm leading-relaxed">{lesson.summary}</p>
              </>
              )}
              {lessonTab === 'quiz' && (
              <>
              <h2 className="text-xs font-bold uppercase tracking-wide text-faint">Knowledge check</h2>
              {lesson.knowledgeCheck.map((q, qi) => (
                <div key={qi} className="mt-2 rounded-lg border border-line bg-elevated p-3">
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
                    <p className={`mt-2 text-sm ${quizAnswers[qi] === q.answer ? 'text-success' : 'text-danger'}`}>
                      {quizAnswers[qi] === q.answer ? '✓ Correct. ' : `✗ The correct answer is: ${q.options[q.answer]}. `}{q.explanation}
                    </p>
                  )}
                </div>
              ))}
              {!quizDone && <button className="btn-secondary mt-2" onClick={() => setQuizDone(true)}>Check answers</button>}
              </>
              )}
              </div>
              <div className="flex shrink-0 items-center justify-between gap-2 border-t border-line px-5 py-3">
                {prevLesson
                  ? <Link className="btn-secondary px-3 py-1.5 text-xs" title={prevLesson.title} to={`/courses/${slug}/lessons/${prevLesson.id}`}>← Previous</Link>
                  : <span />}
                {nextLesson
                  ? <Link className="btn-primary px-3 py-1.5 text-xs" title={nextLesson.title} to={`/courses/${slug}/lessons/${nextLesson.id}`}>Next →</Link>
                  : <span className="text-xs text-muted">Last lesson in this course</span>}
              </div>
            </article>
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize lesson panel"
              onPointerDown={startLessonResize}
              className="w-1.5 shrink-0 cursor-col-resize touch-none transition-colors duration-200 hover:bg-accent-500/40 active:bg-accent-500/60"
            />
          </>
        )}
        {lessonCollapsed && !expanded && (
          <button
            onClick={toggleLessonCollapsed}
            aria-label="Show lesson panel"
            title="Show lesson panel"
            className="flex w-8 shrink-0 items-center justify-center border-r border-line bg-surface text-muted transition-colors duration-200 hover:bg-elevated hover:text-ink"
          >
            <span className="text-sm font-bold" style={{ writingMode: 'vertical-rl' }}>Lesson ›</span>
          </button>
        )}

        {/* Editor column */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-base">
          <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2">
            <h2 className="text-sm font-bold">Code editor — {lesson.exampleLanguage}</h2>
            <span className={`text-xs ${!runtime || !runtimeStatus ? 'text-muted' : runtimeStatus.tone === 'ok' ? 'text-success' : runtimeStatus.tone === 'muted' ? 'text-muted' : runtimeStatus.tone === 'busy' || runtimeStatus.tone === 'warn' ? 'text-warning' : 'text-danger'}`}>
              {runtime && runtimeStatus ? runtimeStatus.text : 'Runtime status unknown'}
            </span>
            <div className="ml-auto flex flex-wrap gap-2">
              <button className="btn-primary" onClick={run} disabled={running}>{running ? 'Running…' : '▶ Run'}</button>
              <button className="btn-secondary" onClick={() => setCode(ex?.starterCode || lesson.exampleCode)}>Reset</button>
              <button className="btn-primary" onClick={submit} disabled={submitting || !ex || exampleTab || (isQuizEx && quizChoice === null)}>{submitting ? 'Submitting…' : isQuizEx ? '✓ Submit answer' : '✓ Submit & test'}</button>
            </div>
          </div>

          {/* File tabs: one per exercise plus the lesson example (read-only).
              Always visible, even with a single exercise — the reference
              layout has real file tabs, not just a heading. */}
          <div className="panel-scroll-x flex shrink-0 gap-1 border-b border-line bg-surface px-2 py-1.5" role="tablist" aria-label="Editor files">
            {exercises.map((e, i) => (
              <button key={e.id} role="tab" aria-selected={i === selectedEx && !exampleTab}
                className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-200 ${i === selectedEx && !exampleTab ? 'bg-accent-500 text-white' : 'bg-elevated text-muted hover:text-ink'}`}
                onClick={() => { setSelectedEx(i); setCode(e.starterCode); setHint(null); setHintLevel(0); setQuizChoice(null); setTestResults([]); setExampleTab(false); }}>
                ▤ {e.title}
              </button>
            ))}
            <button role="tab" aria-selected={exampleTab}
              className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-200 ${exampleTab ? 'bg-accent-500 text-white' : 'bg-elevated text-muted hover:text-ink'}`}
              onClick={() => setExampleTab(true)}>
              ▤ Example
            </button>
          </div>

          {ex && (
            <div className="border-b border-line bg-surface px-3 py-2 text-sm">
              <strong>Exercise: {ex.title}</strong>
              <p className="mt-0.5 text-muted">{ex.instructions}</p>
              {isQuizEx && ex.options && (
                <div className="mt-2 space-y-1">
                  {ex.options.map((o, oi) => (
                    <label key={oi} className="flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-elevated px-2 py-1.5">
                      <input type="radio" name={`ex-${ex.id}`} checked={quizChoice === oi} onChange={() => setQuizChoice(oi)} />
                      {o}
                    </label>
                  ))}
                  <p className="text-xs text-muted">Quiz exercise — graded by your answer, no code runs for this one.</p>
                </div>
              )}
              {!isQuizEx && <div className="mt-1 text-xs text-muted">Visible tests: {ex.tests.map((t) => t.name).join(', ') || 'none listed'}</div>}
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-hidden">
            <CodeEditor
              language={langToEditor(lesson.exampleLanguage)}
              value={exampleTab ? lesson.exampleCode : code}
              onChange={(v) => setCode(v)}
              ariaLabel={exampleTab ? 'Lesson example code (read-only)' : 'Code editor'}
              options={{ readOnly: exampleTab }}
            />
          </div>

          {/* Output panel */}
          {!expanded && (
            <div className="flex shrink-0 flex-col border-t border-line bg-surface" style={{ height: outputCollapsed ? undefined : outputHeight }}>
              <div
                role="separator"
                aria-orientation="horizontal"
                aria-label="Resize output panel"
                onPointerDown={startOutputResize}
                className="h-1.5 shrink-0 cursor-row-resize touch-none transition-colors duration-200 hover:bg-accent-500/40 active:bg-accent-500/60"
              />
              <div className="flex items-center gap-1 border-b border-line px-2 py-1">
                {outputTabBtn('output', 'Output')}
                {outputTabBtn('tests', 'Tests', testResults.length ? `${passedCount}/${testResults.length}` : undefined)}
                {outputTabBtn('input', 'Input')}
                {outputTabBtn('hints', 'Hints', hint ? String(hintLevel) : undefined)}
                <div className="ml-auto flex items-center gap-1">
                  <button
                    className="btn-ghost px-2 py-1 text-xs"
                    onClick={() => { setOutput(''); setTestResults([]); }}
                    disabled={!output && testResults.length === 0}
                  >
                    Clear
                  </button>
                  <button className="btn-ghost px-2 py-1 text-xs" onClick={toggleOutputCollapsed} aria-label={outputCollapsed ? 'Expand output panel' : 'Collapse output panel'}>
                    {outputCollapsed ? '▲' : '▼'}
                  </button>
                </div>
              </div>
              {!outputCollapsed && (
                <div className="panel-scroll min-h-0 flex-1 px-3 py-2">
                  {outputTab === 'output' && (
                    output
                      ? <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-ink">{output}</pre>
                      : <p className="text-xs text-muted">No output yet — press Run to execute your code.</p>
                  )}
                  {outputTab === 'tests' && (
                    testResults.length > 0 ? (
                      <div className="space-y-1">
                        {testResults.map((t, i) => (
                          <div key={i} className={`rounded-lg px-2 py-1.5 text-sm ${t.passed ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'}`}>
                            {t.passed ? '✓' : '✗'} {t.name}{t.hidden ? ' (hidden test)' : ''}
                            {!t.passed && t.stdout !== undefined && !t.hidden && <span className="block font-mono text-xs">got: {JSON.stringify(t.stdout)}</span>}
                            {!t.passed && t.stderr && <span className="block font-mono text-xs">error: {t.stderr.slice(0, 300)}</span>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted">No test results yet — press “Submit &amp; test” to run the exercise tests.</p>
                    )
                  )}
                  {outputTab === 'input' && (
                    <div className="space-y-3">
                      <div>
                        <label className="label" htmlFor="stdin">Standard input (stdin) — this is program input, not a terminal</label>
                        <input id="stdin" className="input" placeholder="e.g. 3 4" value={stdin} onChange={(e) => setStdin(e.target.value)} />
                      </div>
                      <div className="text-xs leading-relaxed text-muted">
                        <p>Language: <strong className="text-ink">{execLang}</strong> · Runtime: {runtime && runtimeStatus ? runtimeStatus.text : 'unknown'}{runtime?.provisioning ? ` · ${kindLabel(runtime.provisioning.kind)}${runtime.provisioning.dockerBaked ? ' (in Docker image)' : ''}` : ''}</p>
                        {runtime && !runtime.available && runtime.provisioning?.guidance && (
                          <p className="mt-1">{runtime.provisioning.guidance}</p>
                        )}
                        <p className="mt-1">Code runs locally on this machine. A missing runtime is reported honestly — nothing is faked.</p>
                      </div>
                    </div>
                  )}
                  {outputTab === 'hints' && ex && (
                    <div>
                      <h3 className="text-sm font-semibold">Hints (progressive — no penalty for using them)</h3>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {[1, 2, 3, 4, 5].map((l) => (
                          <button key={l} className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-200 ${hintLevel === l ? 'bg-accent-500 text-white' : 'bg-elevated text-muted hover:text-ink'}`} onClick={() => requestHint(l)}>
                            {l === 1 ? '💡 Concept' : l === 2 ? '🧭 Approach' : l === 3 ? '🧱 Structure' : l === 4 ? '🐛 Debug' : '✅ Solution'}
                          </button>
                        ))}
                      </div>
                      {hint ? (
                        <div className="mt-2 rounded-lg bg-warning-soft p-3 text-sm">
                          <strong>{hint.title}</strong>
                          <pre className="mt-1 whitespace-pre-wrap font-sans">{hint.content}</pre>
                          {hintLevel === 5 && ex.solutionExplanation && <p className="mt-2 text-xs text-muted">{ex.solutionExplanation}</p>}
                        </div>
                      ) : (
                        <p className="mt-2 text-xs text-muted">Pick a hint level — each one reveals a little more, up to the full solution at level 5.</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
