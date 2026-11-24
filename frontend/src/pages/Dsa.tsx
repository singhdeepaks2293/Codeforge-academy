import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, langToEditor } from '../lib/api';
import { useToast } from '../components/Toast';
import { Page } from '../components/Layout';
import { Collapsible } from '../components/Collapsible';
import { CodeEditor } from '../components/MonacoEditor';
import { Visualization, HOW_TO_READ_TEXT } from '../components/Visualizations';

interface ProblemSummary { id: string; slug: string; title: string; difficulty: string; topics: string[]; description: string; solved: boolean; }
interface ProblemDetail extends ProblemSummary {
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: Record<string, string>;
  tests: { name: string; stdin?: string; expectedStdout?: string; expectedContains?: string; hidden: boolean }[];
  hints: { level: number; title: string; content: string }[];
  solutionDiscussion: string; timeComplexity: string; spaceComplexity: string;
}

// The detail endpoint returns the DB row, whose columns are snake_case
// (starter_code, time_complexity, …) while the UI uses camelCase. Normalise
// here so an empty language dropdown / blank complexity can never come from
// a casing mismatch again. (The backend should map these too; this is the
// frontend-side defence.)
interface ProblemDetailRaw extends Omit<ProblemDetail, 'starterCode' | 'timeComplexity' | 'spaceComplexity' | 'solutionDiscussion'> {
  starterCode?: Record<string, string>;
  starter_code?: Record<string, string>;
  timeComplexity?: string; time_complexity?: string;
  spaceComplexity?: string; space_complexity?: string;
  solutionDiscussion?: string; solution_discussion?: string;
}

function normalizeProblem(raw: ProblemDetailRaw): ProblemDetail {
  const starterCode = (raw.starterCode && Object.keys(raw.starterCode).length > 0)
    ? raw.starterCode
    : (raw.starter_code || {});
  return {
    ...raw,
    starterCode,
    timeComplexity: raw.timeComplexity || raw.time_complexity || '',
    spaceComplexity: raw.spaceComplexity || raw.space_complexity || '',
    solutionDiscussion: raw.solutionDiscussion || raw.solution_discussion || '',
  };
}

// Turn literal "\n" sequences into real line breaks (defensive: some
// stored strings carry escaped newlines) so examples keep their shape.
const nl = (s: string) => s.replace(/\\n/g, '\n');

// Only topics with a genuinely matching visualization get one. A generic
// topic such as "Arrays" must never pull in an unrelated algorithm —
// Two Sum is a hash-map problem, not Merge Sort.
const VIZ_BY_TOPIC: Record<string, string> = {
  'Sorting': 'merge-sort', 'Binary search': 'binary-search',
  'Stack': 'stack', 'Queue': 'queue', 'Trees': 'bst', 'Graphs': 'graph-bfs',
  'Dynamic Programming': 'dp-fib',
};

const VIZ_KINDS = ['merge-sort', 'binary-search', 'stack', 'graph-bfs', 'bst', 'dp-fib', 'quick-sort', 'queue'];

const LANG_EXT: Record<string, string> = { python: 'py', javascript: 'js', typescript: 'ts', java: 'java', cpp: 'cpp', c: 'c', rust: 'rs', go: 'go' };

export function DsaListPage() {
  const [problems, setProblems] = useState<ProblemSummary[]>([]);
  const [gate, setGate] = useState<{ dsaUnlocked: boolean; reason: string } | null>(null);
  const [difficulty, setDifficulty] = useState('');
  const [topic, setTopic] = useState('');
  const [q, setQ] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ gate: { dsaUnlocked: boolean; reason: string }; problems: ProblemSummary[] }>('/api/dsa/problems')
      .then((d) => { setProblems(d.problems); setGate(d.gate); })
      .catch((e) => setError(e.message));
  }, []);

  const topics = [...new Set(problems.flatMap((p) => p.topics))].sort();
  const filtered = problems.filter((p) => {
    if (difficulty && p.difficulty !== difficulty) return false;
    if (topic && !p.topics.includes(topic)) return false;
    if (q && !(p.title + p.description).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });
  const solved = problems.filter((p) => p.solved).length;

  return (
    <Page title="DSA Practice" subtitle={`Data structures & algorithms — ${solved} of ${problems.length} problems solved. Learn the concept, watch it run, then solve it.`}>
      {error && <p role="alert" className="text-danger">{error}</p>}
      {gate && !gate.dsaUnlocked && (
        <div className="mb-4 rounded-lg bg-warning-soft p-4 text-sm">
          🔒 <strong>DSA is locked:</strong> {gate.reason}{' '}You can still browse problems and visualizations below, but submissions require the unlock.
        </div>
      )}
      {/* Learning-first: the problem library is the focus. All eight
          visualizations live behind one collapsed panel so the list is not
          a long scroll away, and the "How to read this" legend appears once. */}
      <Collapsible title="Interactive visualizations" badge={`${VIZ_KINDS.length} visualizations`} className="mb-4">
        <h3 className="mb-1 font-semibold">How to read this</h3>
        <p className="mb-3 text-sm text-muted">{HOW_TO_READ_TEXT}</p>
        <div className="grid gap-3 lg:grid-cols-2">
          {VIZ_KINDS.map((k) => <Visualization key={k} kind={k} />)}
        </div>
      </Collapsible>
      {/* Filters: one row, never stacked full-width. */}
      <div className="panel-scroll-x mb-4 flex flex-nowrap items-center gap-2">
        <input className="input min-w-0 flex-1" placeholder="Search problems…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search problems" />
        <select className="input !w-auto shrink-0" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} aria-label="Filter by difficulty">
          <option value="">All difficulties</option><option>Easy</option><option>Medium</option><option>Hard</option>
        </select>
        <select className="input !w-auto shrink-0" value={topic} onChange={(e) => setTopic(e.target.value)} aria-label="Filter by topic">
          <option value="">All topics</option>
          {topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      {filtered.length === 0 && <div className="card p-6 text-center text-muted">No problems match your filters.</div>}
      <div className="space-y-2">
        {filtered.map((p) => (
          <Link key={p.id} to={`/practice/${p.slug}`} className="card flex items-center justify-between gap-3 p-4 hover:shadow-md">
            <div className="min-w-0">
              <span className="font-semibold">{p.solved ? '✓ ' : ''}{p.title}</span>
              <div className="mt-1 flex flex-wrap gap-1">{p.topics.map((t) => <span key={t} className="badge bg-elevated text-muted">{t}</span>)}</div>
            </div>
            <span className={`badge shrink-0 ${p.difficulty === 'Easy' ? 'bg-success-soft text-success' : p.difficulty === 'Medium' ? 'bg-warning-soft text-warning' : 'bg-danger-soft text-danger'}`}>{p.difficulty}</span>
          </Link>
        ))}
      </div>
    </Page>
  );
}

type DsaOutputTab = 'output' | 'tests';

export function DsaProblemPage() {
  const { slug } = useParams();
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [error, setError] = useState('');
  const [lang, setLang] = useState('');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [results, setResults] = useState<{ name: string; passed: boolean; stdout?: string; stderr?: string; hidden?: boolean }[]>([]);
  const [hintLevel, setHintLevel] = useState(0);
  const [outputTab, setOutputTab] = useState<DsaOutputTab>('output');
  const [outputCollapsed, setOutputCollapsed] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!slug) return;
    api<{ problem: ProblemDetailRaw }>(`/api/dsa/problems/${slug}`)
      .then((d) => {
        const p = normalizeProblem(d.problem);
        setProblem(p);
        // Preselect a real language: prefer Python, otherwise the first
        // language the problem actually ships starter code for. The
        // dropdown must never render empty.
        const langs = Object.keys(p.starterCode);
        const initial = langs.includes('python') ? 'python' : (langs[0] || '');
        setLang(initial);
        setCode(p.starterCode[initial] || '');
      })
      .catch((e) => setError(e.message));
  }, [slug]);

  if (error) return <Page title="Problem"><p role="alert" className="text-danger">{error}</p></Page>;
  if (!problem) return <Page title="Problem"><p>Loading problem…</p></Page>;

  const langs = Object.keys(problem.starterCode);
  const vizKind = problem.topics.map((t) => VIZ_BY_TOPIC[t]).find(Boolean);
  const passedCount = results.filter((r) => r.passed).length;

  const run = async () => {
    try {
      const r = await api<{ success: boolean; stdout: string; stderr: string; exitCode: number | null; timedOut: boolean }>('/api/execute/run', {
        method: 'POST', body: JSON.stringify({ language: lang, code, stdin: problem.tests[0]?.stdin || '' }),
      });
      setOutput(`exit ${r.exitCode ?? '—'}${r.timedOut ? ' · TIMED OUT' : ''}\n${r.stdout}\n${r.stderr}`);
      setOutputTab('output');
      if (outputCollapsed) setOutputCollapsed(false);
    } catch (e) { toast((e as Error).message, 'error'); }
  };

  const submit = async () => {
    try {
      const r = await api<{ passed: boolean; results: { name: string; passed: boolean; stdout?: string; stderr?: string; hidden?: boolean }[] }>(`/api/dsa/problems/${slug}/submit`, {
        method: 'POST', body: JSON.stringify({ code, language: lang, hintsUsed: hintLevel }),
      });
      setResults(r.results);
      setOutputTab('tests');
      if (outputCollapsed) setOutputCollapsed(false);
      toast(r.passed ? 'All tests passed! +30 XP' : 'Some tests failed — check the results', r.passed ? 'success' : 'error');
    } catch (e) { toast((e as Error).message, 'error'); }
  };

  const fileName = `solution.${LANG_EXT[lang] || lang || 'txt'}`;

  return (
    <section aria-label="DSA problem workspace" className="flex min-h-0 flex-1 flex-col overflow-hidden bg-base">
      {/* Top bar */}
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2 text-sm">
        <Link className="font-medium text-accent-600 hover:underline" to="/practice">← Back to practice</Link>
        <span className="text-faint">/</span>
        <span className="min-w-0 truncate font-semibold">{problem.title}</span>
        <span className={`badge shrink-0 ${problem.difficulty === 'Easy' ? 'bg-success-soft text-success' : problem.difficulty === 'Medium' ? 'bg-warning-soft text-warning' : 'bg-danger-soft text-danger'}`}>{problem.difficulty}</span>
        {problem.topics.map((t) => <span key={t} className="badge shrink-0 bg-elevated text-muted">{t}</span>)}
        {problem.solved && <span className="badge shrink-0 bg-success-soft text-success">✓ Solved</span>}
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Problem panel: statement first, everything else collapsible. */}
        <aside className="panel-scroll w-[38%] min-w-[300px] shrink-0 border-r border-line bg-surface px-5 py-4" aria-label="Problem statement">
          <p className="text-sm leading-relaxed">{problem.description}</p>

          <Collapsible title="Examples" defaultOpen badge={`${problem.examples.length}`} className="mt-4">
            <div className="space-y-3">
              {problem.examples.map((ex, i) => (
                <div key={i} className="rounded-lg bg-elevated p-3">
                  <p className="text-sm font-semibold">Example {i + 1}</p>
                  <p className="mt-2 text-xs font-semibold text-muted">Input</p>
                  <pre className="mt-0.5 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed">{nl(ex.input)}</pre>
                  <p className="mt-2 text-xs font-semibold text-muted">Output</p>
                  <pre className="mt-0.5 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed">{nl(ex.output)}</pre>
                  {ex.explanation && <p className="mt-2 text-xs leading-relaxed text-muted">{ex.explanation}</p>}
                </div>
              ))}
              {problem.examples.length === 0 && <p className="text-sm text-muted">No examples for this problem.</p>}
            </div>
          </Collapsible>

          {vizKind && (
            <Collapsible title="Visualization" defaultOpen badge={vizKind.replace(/-/g, ' ')} className="mt-3">
              <Visualization kind={vizKind} />
            </Collapsible>
          )}

          <Collapsible title="Constraints & complexity" className="mt-3">
            <ul className="list-disc space-y-0.5 pl-5 text-sm leading-relaxed">
              {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            {(problem.timeComplexity || problem.spaceComplexity) && (
              <p className="mt-2 text-sm text-muted">
                {problem.timeComplexity && <>Time: <strong className="text-ink">{problem.timeComplexity}</strong></>}
                {problem.timeComplexity && problem.spaceComplexity && ' · '}
                {problem.spaceComplexity && <>Space: <strong className="text-ink">{problem.spaceComplexity}</strong></>}
              </p>
            )}
          </Collapsible>

          <Collapsible title="Hints" badge={hintLevel ? `Level ${hintLevel} open` : `${problem.hints.length} levels`} className="mt-3">
            <div className="flex flex-wrap gap-1">
              {problem.hints.map((h) => (
                <button key={h.level} className={`rounded px-2 py-1 text-xs font-semibold ${hintLevel === h.level ? 'bg-accent-500 text-white' : 'bg-elevated text-muted hover:text-ink'}`} onClick={() => setHintLevel(h.level)}>
                  Level {h.level}: {h.title}
                </button>
              ))}
            </div>
            {hintLevel > 0 && problem.hints.find((h) => h.level === hintLevel) && (
              <div className="mt-2 rounded-lg bg-warning-soft p-3 text-sm">
                <strong>{problem.hints.find((h) => h.level === hintLevel)!.title}</strong>
                <pre className="mt-1 whitespace-pre-wrap font-sans">{problem.hints.find((h) => h.level === hintLevel)!.content}</pre>
              </div>
            )}
            {hintLevel === 0 && <p className="mt-2 text-xs text-muted">Pick a hint level — each one reveals a little more, up to the full solution outline at the last level.</p>}
          </Collapsible>

          <Collapsible title="Solution discussion" className="mt-3">
            {problem.solutionDiscussion
              ? <p className="text-sm leading-relaxed">{problem.solutionDiscussion}</p>
              : <p className="text-sm text-muted">No solution discussion is available for this problem yet.</p>}
          </Collapsible>
        </aside>

        {/* Editor column: file tab, editor, output panel under it. */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-base">
          <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2">
            <span className="rounded-md bg-accent-500 px-2.5 py-1 text-xs font-semibold text-white" role="tab" aria-selected="true">▤ {fileName}</span>
            <label className="text-xs font-semibold text-muted" htmlFor="dsa-lang">Language</label>
            <select
              id="dsa-lang"
              className="input !w-auto"
              value={lang}
              onChange={(e) => { setLang(e.target.value); setCode(problem.starterCode[e.target.value] || ''); }}
              disabled={langs.length === 0}
            >
              {langs.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <div className="ml-auto flex flex-wrap gap-2">
              <button className="btn-primary" onClick={run} disabled={!lang}>▶ Run</button>
              <button className="btn-primary" onClick={submit} disabled={!lang}>✓ Submit</button>
              <button className="btn-secondary" onClick={() => setCode(problem.starterCode[lang] || '')} disabled={!lang}>Reset</button>
            </div>
          </div>

          {langs.length === 0 ? (
            <div className="flex min-h-0 flex-1 items-center justify-center p-6">
              <p className="text-sm text-muted">No starter code is available for this problem — the problem data has no language to run.</p>
            </div>
          ) : (
            <div className="min-h-0 flex-1 overflow-hidden">
              <CodeEditor language={langToEditor(lang)} value={code} onChange={setCode} ariaLabel="DSA solution editor" />
            </div>
          )}

          <div className="flex shrink-0 flex-col border-t border-line bg-surface" style={{ height: outputCollapsed ? undefined : 180 }}>
            <div className="flex items-center gap-1 border-b border-line px-2 py-1">
              {(['output', 'tests'] as DsaOutputTab[]).map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={outputTab === tab}
                  onClick={() => { setOutputTab(tab); if (outputCollapsed) setOutputCollapsed(false); }}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-200 ${outputTab === tab ? 'bg-accent-soft text-accent-600' : 'text-muted hover:bg-elevated hover:text-ink'}`}
                >
                  {tab === 'output' ? 'Output' : `Tests${results.length ? ` (${passedCount}/${results.length})` : ''}`}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-1">
                <button className="btn-ghost px-2 py-1 text-xs" onClick={() => { setOutput(''); setResults([]); }} disabled={!output && results.length === 0}>Clear</button>
                <button className="btn-ghost px-2 py-1 text-xs" onClick={() => setOutputCollapsed((v) => !v)} aria-label={outputCollapsed ? 'Expand output panel' : 'Collapse output panel'}>
                  {outputCollapsed ? '▲' : '▼'}
                </button>
              </div>
            </div>
            {!outputCollapsed && (
              <div className="panel-scroll min-h-0 flex-1 px-3 py-2">
                {outputTab === 'output' && (
                  output
                    ? <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-ink">{output}</pre>
                    : <p className="text-xs text-muted">No output yet — press Run to execute your code against the first example.</p>
                )}
                {outputTab === 'tests' && (
                  results.length > 0 ? (
                    <div className="space-y-1">
                      {results.map((r, i) => (
                        <div key={i} className={`rounded-lg px-2 py-1.5 text-sm ${r.passed ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'}`}>
                          {r.passed ? '✓' : '✗'} {r.name}{r.hidden ? ' (hidden test)' : ''}
                          {!r.passed && !r.hidden && r.stdout !== undefined && <span className="block font-mono text-xs">got: {JSON.stringify(r.stdout)}</span>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted">No test results yet — press “Submit” to run the problem tests.</p>
                  )
                )}
              </div>
            )}
          </div>
          <p className="shrink-0 border-t border-line bg-surface px-3 py-1.5 text-xs text-muted">Visible tests: {problem.tests.filter((t) => !t.hidden).map((t) => t.name).join(', ') || 'none listed'}</p>
        </div>
      </div>
    </section>
  );
}
