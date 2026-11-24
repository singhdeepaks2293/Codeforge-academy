import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { api } from '../lib/api';
import { useToast } from '../components/Toast';
import { Page } from '../components/Layout';
import { Visualization } from '../components/Visualizations';
import { useTheme } from '../lib/theme';
import { codeForgeTheme, setupCodeForgeThemes } from '../lib/monacoTheme';

interface ProblemSummary { id: string; slug: string; title: string; difficulty: string; topics: string[]; description: string; solved: boolean; }
interface ProblemDetail extends ProblemSummary {
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: Record<string, string>;
  tests: { name: string; stdin?: string; expectedStdout?: string; expectedContains?: string; hidden: boolean }[];
  hints: { level: number; title: string; content: string }[];
  solutionDiscussion: string; timeComplexity: string; spaceComplexity: string;
}

const VIZ_BY_TOPIC: Record<string, string> = {
  'Sorting': 'merge-sort', 'Arrays': 'merge-sort', 'Binary search': 'binary-search',
  'Stack': 'stack', 'Queue': 'queue', 'Trees': 'bst', 'Graphs': 'graph-bfs',
  'Dynamic Programming': 'dp-fib',
};

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
          🔒 <strong>DSA is locked:</strong> {gate.reason} You can still browse problems and visualizations below, but submissions require the unlock.
        </div>
      )}
      <div className="mb-4">
        <h2 className="mb-2 font-bold">Interactive visualizations</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Visualization kind="merge-sort" />
          <Visualization kind="binary-search" />
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Visualization kind="stack" />
          <Visualization kind="graph-bfs" />
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Visualization kind="bst" />
          <Visualization kind="dp-fib" />
        </div>
        <div className="mt-3"><Visualization kind="quick-sort" /></div>
        <div className="mt-3"><Visualization kind="queue" /></div>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <input className="input max-w-sm" placeholder="Search problems…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search problems" />
        <select className="input w-auto" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} aria-label="Filter by difficulty">
          <option value="">All difficulties</option><option>Easy</option><option>Medium</option><option>Hard</option>
        </select>
        <select className="input w-auto" value={topic} onChange={(e) => setTopic(e.target.value)} aria-label="Filter by topic">
          <option value="">All topics</option>
          {topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      {filtered.length === 0 && <div className="card p-6 text-center text-muted">No problems match your filters.</div>}
      <div className="space-y-2">
        {filtered.map((p) => (
          <Link key={p.id} to={`/practice/${p.slug}`} className="card flex items-center justify-between p-4 hover:shadow-md">
            <div>
              <span className="font-semibold">{p.solved ? '✓ ' : ''}{p.title}</span>
              <div className="mt-1 flex gap-1">{p.topics.map((t) => <span key={t} className="badge bg-elevated text-muted">{t}</span>)}</div>
            </div>
            <span className={`badge ${p.difficulty === 'Easy' ? 'bg-success-soft text-success' : p.difficulty === 'Medium' ? 'bg-warning-soft text-warning' : 'bg-danger-soft text-danger'}`}>{p.difficulty}</span>
          </Link>
        ))}
      </div>
    </Page>
  );
}

export function DsaProblemPage() {
  const { slug } = useParams();
  const theme = useTheme();
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [error, setError] = useState('');
  const [lang, setLang] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [results, setResults] = useState<{ name: string; passed: boolean; stdout?: string; stderr?: string; hidden?: boolean }[]>([]);
  const [hintLevel, setHintLevel] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!slug) return;
    api<{ problem: ProblemDetail }>(`/api/dsa/problems/${slug}`)
      .then((d) => { setProblem(d.problem); setCode(d.problem.starterCode.python || ''); setLang('python'); })
      .catch((e) => setError(e.message));
  }, [slug]);

  if (error) return <Page title="Problem"><p role="alert" className="text-danger">{error}</p></Page>;
  if (!problem) return <Page title="Problem"><p>Loading problem…</p></Page>;

  const run = async () => {
    try {
      const r = await api<{ success: boolean; stdout: string; stderr: string; exitCode: number | null; timedOut: boolean }>('/api/execute/run', {
        method: 'POST', body: JSON.stringify({ language: lang, code, stdin: problem.tests[0]?.stdin || '' }),
      });
      setOutput(`exit ${r.exitCode ?? '—'}${r.timedOut ? ' · TIMED OUT' : ''}\n${r.stdout}\n${r.stderr}`);
    } catch (e) { toast((e as Error).message, 'error'); }
  };

  const submit = async () => {
    try {
      const r = await api<{ passed: boolean; results: { name: string; passed: boolean; stdout?: string; stderr?: string; hidden?: boolean }[] }>(`/api/dsa/problems/${slug}/submit`, {
        method: 'POST', body: JSON.stringify({ code, language: lang, hintsUsed: hintLevel }),
      });
      setResults(r.results);
      toast(r.passed ? 'All tests passed! +30 XP' : 'Some tests failed — check the results', r.passed ? 'success' : 'error');
    } catch (e) { toast((e as Error).message, 'error'); }
  };

  const vizKind = problem.topics.map((t) => VIZ_BY_TOPIC[t]).find(Boolean);

  return (
    <div>
      <Link className="text-sm text-accent-600" to="/practice">← Back to practice</Link>
      <h1 className="mt-2 text-2xl font-bold">{problem.title}</h1>
      <div className="mt-1 flex gap-2">
        <span className={`badge ${problem.difficulty === 'Easy' ? 'bg-success-soft text-success' : problem.difficulty === 'Medium' ? 'bg-warning-soft text-warning' : 'bg-danger-soft text-danger'}`}>{problem.difficulty}</span>
        {problem.topics.map((t) => <span key={t} className="badge bg-elevated text-muted">{t}</span>)}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <p className="text-sm leading-relaxed">{problem.description}</p>
          <h2 className="mt-4 font-semibold">Examples</h2>
          {problem.examples.map((ex, i) => (
            <pre key={i} className="mt-2 overflow-auto rounded-lg bg-elevated p-3 text-xs">Input: {ex.input}{'\n'}Output: {ex.output}{ex.explanation ? `\n${ex.explanation}` : ''}</pre>
          ))}
          <h2 className="mt-4 font-semibold">Constraints</h2>
          <ul className="list-disc pl-5 text-sm">{problem.constraints.map((c, i) => <li key={i}>{c}</li>)}</ul>
          <p className="mt-3 text-sm text-muted">Time: {problem.timeComplexity} · Space: {problem.spaceComplexity}</p>
          {vizKind && <div className="mt-4"><Visualization kind={vizKind} /></div>}
          <h2 className="mt-4 font-semibold">Hints</h2>
          <div className="mt-1 flex flex-wrap gap-1">
            {problem.hints.map((h) => (
              <button key={h.level} className={`rounded px-2 py-1 text-xs font-semibold ${hintLevel === h.level ? 'bg-accent-500 text-white' : 'bg-elevated'}`} onClick={() => setHintLevel(h.level)}>
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
          <button className="btn-secondary mt-3" onClick={() => setShowSolution(!showSolution)}>{showSolution ? 'Hide' : 'Show'} solution discussion</button>
          {showSolution && <p className="mt-2 text-sm leading-relaxed">{problem.solutionDiscussion}</p>}
        </div>
        <div className="card flex flex-col p-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold" htmlFor="lang">Language</label>
            <select id="lang" className="input w-auto" value={lang} onChange={(e) => { setLang(e.target.value); setCode(problem.starterCode[e.target.value] || problem.starterCode.python || ''); }}>
              {Object.keys(problem.starterCode).map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="mt-3 min-h-[320px] flex-1">
            <Editor height="320px" language={lang === 'python' ? 'python' : lang === 'javascript' ? 'javascript' : lang} value={code} onChange={(v) => setCode(v || '')} theme={codeForgeTheme(theme)} beforeMount={setupCodeForgeThemes} options={{ minimap: { enabled: false }, fontSize: 14 }} />
          </div>
          <div className="mt-3 flex gap-2">
            <button className="btn-primary" onClick={run}>▶ Run</button>
            <button className="btn-primary" onClick={submit}>✓ Submit</button>
            <button className="btn-secondary" onClick={() => setCode(problem.starterCode[lang] || '')}>Reset</button>
          </div>
          {output && <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-code p-3 text-xs text-ink">{output}</pre>}
          {results.length > 0 && (
            <div className="mt-3 space-y-1">
              {results.map((r, i) => (
                <div key={i} className={`rounded px-2 py-1 text-sm ${r.passed ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'}`}>
                  {r.passed ? '✓' : '✗'} {r.name}{r.hidden ? ' (hidden test)' : ''}
                  {!r.passed && !r.hidden && r.stdout !== undefined && <span className="block font-mono text-xs">got: {JSON.stringify(r.stdout)}</span>}
                </div>
              ))}
            </div>
          )}
          <p className="mt-3 text-xs text-muted">Visible tests: {problem.tests.filter((t) => !t.hidden).map((t) => t.name).join(', ')}</p>
        </div>
      </div>
    </div>
  );
}
