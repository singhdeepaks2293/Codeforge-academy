import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, langToEditor, langToExec } from '../lib/api';
import { fetchRuntimes, installRuntime, provisioningStatusText, canInstall, type RuntimeInfo } from '../lib/provisioning';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { IndexLayout, Page } from '../components/Layout';
import { WorkspaceShell, type WorkspaceDrawerId } from '../components/WorkspaceShell';
import { CodeEditor } from '../components/MonacoEditor';

interface ProjectSummary { id: string; slug: string; level: number; title: string; description: string; skills: string[]; language: string; portfolio?: boolean; progress?: { status: string; completed_milestones: string } | null; }
interface Milestone {
  id: string; order: number; title: string; objectives: string[]; instructions: string;
  concepts: string[]; hints: string[]; acceptanceCriteria: string[]; tests: string[];
}
interface ProjectDetail {
  project: { id: string; slug: string; level: number; title: string; description: string; skills: string[]; language: string; portfolio?: boolean;
    functionalRequirements: string[]; nonFunctionalRequirements: string[]; architecture: string; databaseSchema?: string; apis?: string[];
    fileStructure: string; taskBreakdown: string[]; reviewChecklist: string[]; finalAssessment: string[] };
  milestones: Milestone[];
  progress: { completedMilestones: string[]; status: string } | null;
}

const LEVEL_NAMES: Record<number, string> = { 1: 'Small', 2: 'Intermediate', 3: 'Advanced', 4: 'Industry Simulation' };

export function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [level, setLevel] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    api<{ projects: ProjectSummary[] }>('/api/projects').then((d) => setProjects(d.projects)).catch((e) => setError(e.message));
  }, []);
  const filtered = level ? projects.filter((p) => p.level === Number(level)) : projects;
  return (
    <Page title="Project Academy" subtitle="Guided, industry-style projects — requirements, planning, milestones, code review and final assessment. No copy-paste solutions: you build it, milestone by milestone.">
      {error && <p role="alert" className="text-danger">{error}</p>}
      <IndexLayout
        rail={(
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold">Filters</h2>
              <p className="text-sm text-muted">{filtered.length} project{filtered.length === 1 ? '' : 's'}</p>
            </div>
            <div>
              <label className="label" htmlFor="project-level">Level</label>
              <select id="project-level" className="input" value={level} onChange={(e) => setLevel(e.target.value)} aria-label="Filter by level">
                <option value="">All levels</option>
                {[1, 2, 3, 4].map((l) => <option key={l} value={l}>Level {l} — {LEVEL_NAMES[l]}</option>)}
              </select>
            </div>
            {level && <button className="btn-ghost text-xs" onClick={() => setLevel('')}>Clear filters</button>}
          </div>
        )}
      >
        <div className="grid items-start gap-4 md:grid-cols-2">
          {filtered.map((p) => (
            <article key={p.id} className="card flex flex-col p-4">
              <div className="flex flex-wrap items-center gap-1">
                <span className="badge w-fit bg-accent-soft text-accent-600">Level {p.level} · {LEVEL_NAMES[p.level]}</span>
                {p.portfolio && <span className="badge bg-warning-soft text-warning" data-testid="portfolio-tag">★ Portfolio Ready</span>}
              </div>
              <h2 className="mt-2 text-lg font-bold">{p.title}</h2>
              <p className="mt-1 text-sm text-muted">{p.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">{p.skills.slice(0, 5).map((s) => <span key={s} className="badge bg-elevated text-muted">{s}</span>)}</div>
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-3">
                <span className="text-xs text-muted">{p.language}{p.progress ? ` · ${p.progress.status}` : ''}</span>
                <Link className="btn-primary" to={`/projects/${p.slug}`}>Open project →</Link>
              </div>
            </article>
          ))}
        </div>
      </IndexLayout>
    </Page>
  );
}

function starterFor(lang: string, title: string): string {
  const head = `${title}\nBuild your solution here.`;
  switch (lang) {
    case 'python': return `# ${head}\n`;
    case 'javascript':
    case 'typescript': return `// ${head}\n`;
    case 'java': return `public class Main {\n  public static void main(String[] args) {\n    // ${head}\n  }\n}\n`;
    case 'go': return `package main\n\nfunc main() {\n\t// ${head}\n}\n`;
    case 'cpp':
    case 'c': return `#include <iostream>\n\nint main() {\n  // ${head}\n  return 0;\n}\n`;
    case 'rust': return `fn main() {\n    // ${head}\n}\n`;
    case 'sql': return `-- ${head}\n`;
    case 'html': return `<!-- ${head} -->\n`;
    case 'r': return `# ${head}\n`;
    default: return `# ${head}\n`;
  }
}

function fileExt(lang: string): string {
  const map: Record<string, string> = {
    python: 'py', javascript: 'js', typescript: 'ts', java: 'java', go: 'go',
    cpp: 'cpp', c: 'c', rust: 'rs', sql: 'sql', html: 'html', r: 'r',
    bash: 'sh', perl: 'pl', php: 'php', ruby: 'rb', kotlin: 'kt',
    swift: 'swift', lua: 'lua', scala: 'scala', haskell: 'hs', dart: 'dart', csharp: 'cs',
  };
  return map[lang] || 'txt';
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [detail, setDetail] = useState<ProjectDetail | null>(null);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState('');
  const [code, setCode] = useState<string | null>(null);
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [lastError, setLastError] = useState('');
  const [running, setRunning] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [runtimes, setRuntimes] = useState<RuntimeInfo[]>([]);
  const [drawer, setDrawer] = useState<WorkspaceDrawerId | null>(null);
  const [syllabusOpen, setSyllabusOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const workspaceRef = useRef<HTMLElement>(null);
  const toast = useToast();

  const load = () => {
    if (!slug) return;
    api<ProjectDetail>(`/api/projects/${slug}`).then(setDetail).catch((e) => setError(e.message));
  };
  useEffect(load, [slug]);

  // Initialise the editor once per project: saved code from localStorage,
  // else a small starter. Guarded on the loaded slug, so a reload after
  // completing a milestone never clobbers the learner's code.
  useEffect(() => {
    if (!detail || !slug || code !== null || detail.project.slug !== slug) return;
    try {
      const saved = localStorage.getItem(`cf-project-code-${slug}`);
      setCode(saved ?? starterFor(detail.project.language, detail.project.title));
    } catch { setCode(starterFor(detail.project.language, detail.project.title)); }
  }, [detail, slug, code]);
  useEffect(() => {
    if (!slug || code === null) return;
    try { localStorage.setItem(`cf-project-code-${slug}`, code); } catch { /* ignore */ }
  }, [code, slug]);

  useEffect(() => {
    fetchRuntimes().then((d) => setRuntimes(d.runtimes)).catch(() => undefined);
  }, []);

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

  if (error) return <div className="flex min-h-0 flex-1 items-center justify-center bg-base p-6"><p role="alert" className="text-danger">{error}</p></div>;
  if (!detail || code === null) return <div className="flex min-h-0 flex-1 items-center justify-center bg-base p-6"><p>Loading project…</p></div>;

  const { project, milestones } = detail;
  const done = new Set(detail.progress?.completedMilestones || []);
  const execLang = langToExec(project.language);
  const runtimeId = execLang === 'javascript' || execLang === 'typescript' || execLang === 'react' ? 'node' : execLang === 'asm' ? 'c' : execLang;
  const runtime = runtimes.find((r) => r.id === runtimeId);
  const runtimeStatus = runtime ? provisioningStatusText(runtime) : null;
  const currentMilestone = milestones.find((m) => !done.has(m.id)) ?? milestones[0];

  const complete = async (mid: string) => {
    try {
      const r = await api<{ completed: number; total: number; status: string }>(`/api/projects/${slug}/milestones/${mid}/complete`, { method: 'POST' });
      toast(`Milestone complete (${r.completed}/${r.total}) — +40 XP`, 'success');
      load();
    } catch (e) { toast((e as Error).message, 'error'); }
  };

  const submit = async () => {
    try {
      await api(`/api/projects/${slug}/submit`, { method: 'POST', body: JSON.stringify({ notes }) });
      toast('Submitted for instructor review', 'success');
      setNotes('');
    } catch (e) { toast((e as Error).message, 'error'); }
  };

  const run = async () => {
    if (code === null) return;
    setRunning(true); setOutput(''); setLastError('');
    try {
      const r = await api<{ success: boolean; stdout: string; stderr: string; exitCode: number | null; timedOut: boolean; durationMs: number; error?: string }>('/api/execute/run', {
        method: 'POST', body: JSON.stringify({ language: execLang, code, stdin }),
      });
      setOutput(`exit code: ${r.exitCode ?? '—'} · ${r.durationMs}ms${r.timedOut ? ' · TIMED OUT' : ''}\n--- stdout ---\n${r.stdout}\n--- stderr ---\n${r.stderr}`);
      if (r.stderr.trim() || !r.success) setLastError(r.stderr.trim() || r.error || 'The program exited with an error.');
      if (r.success) toast('Program ran successfully', 'success');
    } catch (e) {
      const err = e as Error & { status?: number };
      setOutput(`Run failed (${err.status ?? 'error'}): ${err.message}${runtime && !runtime.available ? `\nRuntime missing: ${runtime.installHint}` : ''}`);
      setLastError(err.message);
      toast(err.message, 'error');
    } finally { setRunning(false); }
  };

  const retryInstall = async () => {
    if (!runtime || installing) return;
    setInstalling(true);
    try {
      await installRuntime(runtime.id);
      toast(`Installing ${runtime.name} in the background — you can keep working.`, 'info');
      const d = await fetchRuntimes();
      setRuntimes(d.runtimes);
    } catch (e) { toast((e as Error).message, 'error'); }
    finally { setInstalling(false); }
  };

  const drawerTitle = drawer === 'ai-help' ? 'AI help — local guidance' : drawer === 'unstuck' ? 'Get unstuck' : drawer === 'tools' ? 'Tools' : 'Everything unlocked';
  const drawerContent = drawer === 'ai-help' ? (
    <div className="space-y-3 text-sm">
      <p className="rounded-lg bg-warning-soft p-3 text-xs leading-relaxed">
        Guided help, powered by CodeForge&apos;s local project brief and hints — no AI model, works offline.
      </p>
      {lastError && (
        <div>
          <h3 className="font-semibold">What went wrong</h3>
          <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-danger-soft p-2 font-mono text-xs text-danger">{lastError.slice(0, 800)}</pre>
        </div>
      )}
      {currentMilestone && (
        <div>
          <h3 className="font-semibold">Current milestone: {currentMilestone.title}</h3>
          <p className="mt-1 leading-relaxed">{currentMilestone.instructions}</p>
          <h4 className="mt-2 font-semibold">Concepts</h4>
          <p className="text-muted">{currentMilestone.concepts.join(', ')}</p>
          <h4 className="mt-2 font-semibold">Hints</h4>
          <ul className="list-disc pl-5">{currentMilestone.hints.map((h, i) => <li key={i}>{h}</li>)}</ul>
        </div>
      )}
      <p className="text-xs text-muted">Stuck on the brief itself? Re-read the requirements in the Brief panel — every milestone lists its acceptance criteria and tests.</p>
    </div>
  ) : drawer === 'unstuck' ? (
    <div className="space-y-3 text-sm">
      {currentMilestone ? (
        <>
          <h3 className="font-semibold">{currentMilestone.title}</h3>
          <ul className="list-disc space-y-1 pl-5">{currentMilestone.hints.map((h, i) => <li key={i}>{h}</li>)}</ul>
          <p className="text-xs text-muted">Hints never cost XP. The acceptance criteria for this milestone are in the Brief panel.</p>
        </>
      ) : <p>All milestones are complete — nice work.</p>}
    </div>
  ) : drawer === 'tools' ? (
    <div className="space-y-3 text-sm">
      <div>
        <label className="label" htmlFor="project-stdin">Standard input (stdin)</label>
        <input id="project-stdin" className="input" placeholder="e.g. 3 4" value={stdin} onChange={(e) => setStdin(e.target.value)} />
      </div>
      <div className="text-xs leading-relaxed text-muted">
        <p>Language: <strong className="text-ink">{execLang}</strong> · Runtime: {runtime && runtimeStatus ? runtimeStatus.text : 'unknown'}</p>
        {runtime && !runtime.available && runtime.provisioning?.guidance && <p className="mt-1">{runtime.provisioning.guidance}</p>}
        {runtime && !runtime.available && canInstall(runtime) && (
          <button className="btn-secondary mt-2 px-2 py-1 text-xs" onClick={retryInstall} disabled={installing}>{installing ? 'Starting install…' : `Install ${runtime.name}`}</button>
        )}
      </div>
      <button className="btn-secondary" onClick={toggleFullscreen}>{isFullscreen || expanded ? 'Exit fullscreen' : 'Fullscreen'}</button>
      <button className="btn-secondary" onClick={() => setCode(starterFor(project.language, project.title))}>Reset code to starter</button>
    </div>
  ) : (
    <div className="space-y-3 text-sm">
      <p>Everything in CodeForge Academy is unlocked — no Pro plan, no paywall. Every course, project, path, certificate and tool here is free because it runs locally on your machine.</p>
      <p className="text-muted">This project, all 793 courses, the DSA practice, assessments, interview prep and certificates are all included.</p>
    </div>
  );

  const syllabus = (
    <div className="space-y-1">
      {milestones.map((m) => (
        <button key={m.id} type="button" onClick={() => setSyllabusOpen(false)} className="flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-zinc-100">
          <span aria-hidden>{done.has(m.id) ? '✓' : '○'}</span>
          <span><span className="font-semibold">{m.order}. {m.title}</span>{done.has(m.id) && <span className="ml-1 text-xs text-green-700">Done</span>}</span>
        </button>
      ))}
    </div>
  );

  // The Brief panel is the light column of the 3-panel workspace, so it
  // uses explicit zinc classes (like the lesson Learn panel), not theme
  // tokens, which would be unreadable on white in dark mode.
  const brief = (
    <div className="px-5 py-4">
      <div className="flex flex-wrap items-center gap-1">
        <span className="badge bg-zinc-900 text-white">Level {project.level} · {LEVEL_NAMES[project.level]}</span>
        {project.portfolio && <span className="badge bg-yellow-100 text-yellow-800">★ Portfolio Ready</span>}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-zinc-800">{project.description}</p>
      <p className="mt-1 text-xs font-semibold text-zinc-500">{project.language} · {done.size}/{milestones.length} milestones complete</p>

      <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Requirements</h2>
      <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-relaxed text-zinc-800">{project.functionalRequirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
      <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Non-functional requirements</h2>
      <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-relaxed text-zinc-800">{project.nonFunctionalRequirements.map((r, i) => <li key={i}>{r}</li>)}</ul>

      <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Planning</h2>
      <p className="mt-1 text-sm leading-relaxed text-zinc-800">{project.architecture}</p>
      {project.databaseSchema && (<><h3 className="mt-3 text-sm font-semibold text-zinc-900">Database schema</h3><pre className="mt-1 overflow-auto rounded-lg bg-zinc-900 p-3 font-mono text-xs leading-relaxed text-green-400">{project.databaseSchema}</pre></>)}
      {project.apis && project.apis.length > 0 && (<><h3 className="mt-3 text-sm font-semibold text-zinc-900">APIs</h3><ul className="mt-1 list-disc pl-5 text-sm text-zinc-800">{project.apis.map((a, i) => <li key={i}>{a}</li>)}</ul></>)}
      <h3 className="mt-3 text-sm font-semibold text-zinc-900">File structure</h3>
      <pre className="mt-1 overflow-auto rounded-lg bg-zinc-900 p-3 font-mono text-xs leading-relaxed text-green-400">{project.fileStructure}</pre>
      <h3 className="mt-3 text-sm font-semibold text-zinc-900">Task breakdown</h3>
      <ul className="mt-1 list-disc pl-5 text-sm text-zinc-800">{project.taskBreakdown.map((t, i) => <li key={i}>{t}</li>)}</ul>

      <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Milestones</h2>
      {milestones.map((m) => (
        <section key={m.id} className="mt-2 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-zinc-900">{m.order}. {m.title}</h3>
            {done.has(m.id) ? <span className="text-sm text-green-700">✓ Done</span> : (
              <button className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-zinc-700" onClick={() => complete(m.id)}>Mark complete</button>
            )}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-zinc-700">{m.instructions}</p>
          <p className="mt-1 text-sm"><b>Objectives:</b> {m.objectives.join('; ')}</p>
          <p className="mt-1 text-sm"><b>Concepts:</b> {m.concepts.join(', ')}</p>
          <p className="mt-1 text-sm"><b>Acceptance criteria:</b> {m.acceptanceCriteria.join('; ')}</p>
          <p className="mt-1 text-sm"><b>Tests:</b> {m.tests.join('; ')}</p>
          <details className="mt-2"><summary className="cursor-pointer text-sm font-semibold text-zinc-700">Hints</summary><ul className="mt-1 list-disc pl-5 text-sm text-zinc-700">{m.hints.map((h, i) => <li key={i}>{h}</li>)}</ul></details>
        </section>
      ))}

      <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Code review checklist</h2>
      <ul className="mt-1 list-disc pl-5 text-sm text-zinc-800">{project.reviewChecklist.map((c, i) => <li key={i}>{c}</li>)}</ul>
      <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Final assessment</h2>
      <ul className="mt-1 list-disc pl-5 text-sm text-zinc-800">{project.finalAssessment.map((c, i) => <li key={i}>{c}</li>)}</ul>

      <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-zinc-400">Notes for your reviewer</h2>
      <textarea className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900" rows={3} placeholder="What you built, how to run it…" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <p className="mt-1 text-xs text-zinc-500">Notes are sent with Submit (bottom-right).</p>
    </div>
  );

  const editor = (
    <>
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-3 py-2">
        <span className="rounded-md bg-yellow-400 px-2.5 py-1 text-xs font-bold text-black">▤ main.{fileExt(project.language)}</span>
        <span className="text-xs text-zinc-400">{runtime && runtimeStatus ? runtimeStatus.text : 'Runtime status unknown'}</span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <CodeEditor language={langToEditor(project.language)} value={code} onChange={(v) => setCode(v)} ariaLabel="Project code editor" />
      </div>
      <div className="flex shrink-0 items-center gap-2 border-t border-zinc-800 bg-zinc-900 px-3 py-2">
        <button className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-bold text-black hover:bg-yellow-300 disabled:opacity-50" onClick={run} disabled={running || code === null}>{running ? 'Running…' : '▶ Run'}</button>
        <button className="rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-700" onClick={() => setCode(starterFor(project.language, project.title))}>Reset</button>
        <span className="ml-auto text-xs text-zinc-400">Code is saved in this browser.</span>
      </div>
    </>
  );

  const terminal = (
    <>
      <div className="flex shrink-0 items-center gap-2 border-b border-zinc-800 px-3 py-2">
        <h2 className="text-sm font-bold text-white">Terminal</h2>
        <button className="ml-auto rounded-md px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white" onClick={() => { setOutput(''); setLastError(''); }}>Clear</button>
      </div>
      <div className="panel-scroll min-h-0 flex-1 overflow-y-auto px-3 py-2">
        {output ? <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-zinc-100">{output}</pre> : <p className="text-xs text-zinc-500">No output yet — press Run to execute your code.</p>}
      </div>
      {lastError && (
        <button type="button" onClick={() => setDrawer('ai-help')} className="shrink-0 border-t border-zinc-800 bg-zinc-900 px-3 py-2 text-left text-xs font-semibold text-yellow-400 hover:bg-zinc-800">
          ⚠ Something went wrong — Explain error →
        </button>
      )}
    </>
  );

  return (
    <WorkspaceShell
      title={project.title}
      segmentCount={milestones.length}
      segmentIndex={done.size}
      learnLabel="Brief"
      syllabusLabel="Milestones"
      banner={runtime && !runtime.available && runtime.provisioning ? (
        <div className={`flex items-center gap-3 px-4 py-2 text-xs font-medium ${runtime.provisioning.state === 'failed' ? 'bg-red-50 text-red-800' : 'bg-amber-50 text-amber-800'}`} role="alert">
          <span className="flex-1">{runtime.provisioning.state === 'failed'
            ? `Automatic install of ${runtime.name} failed. ${runtime.provisioning.guidance}`
            : `${runtime.name} is installing in the background — you can keep working.`}
          </span>
          {runtime.provisioning.state === 'failed' && canInstall(runtime) && (
            <button className="rounded-md border border-current px-2 py-1 font-semibold" onClick={retryInstall} disabled={installing}>{installing ? 'Starting…' : 'Retry install'}</button>
          )}
        </div>
      ) : undefined}
      learn={brief}
      editor={editor}
      terminal={terminal}
      bottomCenter={<span>Milestone {done.size} of {milestones.length} complete</span>}
      bottomRight={
        <>
          <Link to="/projects" className="rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-700">← Back to projects</Link>
          <button className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-bold text-black hover:bg-yellow-300" onClick={submit}>Submit project</button>
        </>
      }
      avatarInitial={(user?.displayName ?? '?').charAt(0).toUpperCase()}
      onOpenSyllabus={() => setSyllabusOpen(true)}
      syllabusOpen={syllabusOpen}
      onCloseSyllabus={() => setSyllabusOpen(false)}
      syllabus={syllabus}
      drawer={drawer}
      onCloseDrawer={() => setDrawer(null)}
      drawerTitle={drawerTitle}
      drawerContent={drawerContent}
      onOpenAiHelp={() => setDrawer('ai-help')}
      onOpenUnstuck={() => setDrawer('unstuck')}
      onOpenTools={() => setDrawer('tools')}
      onOpenUnlocked={() => setDrawer('unlocked')}
      workspaceRef={workspaceRef}
      expanded={expanded}
    />
  );
}
