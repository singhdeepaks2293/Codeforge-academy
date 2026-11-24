import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useToast } from '../components/Toast';
import { Page } from '../components/Layout';

interface ProjectSummary { id: string; slug: string; level: number; title: string; description: string; skills: string[]; language: string; progress?: { status: string; completed_milestones: string } | null; }
interface Milestone {
  id: string; order: number; title: string; objectives: string[]; instructions: string;
  concepts: string[]; hints: string[]; acceptanceCriteria: string[]; tests: string[];
}
interface ProjectDetail {
  project: { id: string; slug: string; level: number; title: string; description: string; skills: string[]; language: string;
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
      {error && <p role="alert" className="text-red-600">{error}</p>}
      <div className="mb-4 flex gap-2">
        <select className="input w-auto" value={level} onChange={(e) => setLevel(e.target.value)} aria-label="Filter by level">
          <option value="">All levels</option>
          {[1, 2, 3, 4].map((l) => <option key={l} value={l}>Level {l} — {LEVEL_NAMES[l]}</option>)}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <article key={p.id} className="card p-5">
            <span className="badge bg-navy-900 text-white dark:bg-slate-700">Level {p.level} · {LEVEL_NAMES[p.level]}</span>
            <h2 className="mt-2 text-lg font-bold">{p.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{p.description}</p>
            <div className="mt-2 flex flex-wrap gap-1">{p.skills.slice(0, 5).map((s) => <span key={s} className="badge bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-slate-300">{s}</span>)}</div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-slate-500">{p.language}{p.progress ? ` · ${p.progress.status}` : ''}</span>
              <Link className="btn-primary" to={`/projects/${p.slug}`}>Open project →</Link>
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const [detail, setDetail] = useState<ProjectDetail | null>(null);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState('');
  const toast = useToast();

  const load = () => {
    if (!slug) return;
    api<ProjectDetail>(`/api/projects/${slug}`).then(setDetail).catch((e) => setError(e.message));
  };
  useEffect(load, [slug]);

  if (error) return <Page title="Project"><p role="alert" className="text-red-600">{error}</p></Page>;
  if (!detail) return <Page title="Project"><p>Loading project…</p></Page>;
  const { project, milestones } = detail;
  const done = new Set(detail.progress?.completedMilestones || []);

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

  return (
    <div>
      <Link className="text-sm text-brand-600" to="/projects">← Back to projects</Link>
      <h1 className="mt-2 text-2xl font-bold">{project.title}</h1>
      <p className="text-sm text-slate-500">Level {project.level} · {LEVEL_NAMES[project.level]} · {project.language} · {done.size}/{milestones.length} milestones complete</p>
      <div className="mt-2 h-2 rounded bg-slate-200 dark:bg-navy-800"><div className="h-2 rounded bg-brand-600" style={{ width: `${milestones.length ? (done.size / milestones.length) * 100 : 0}%` }} /></div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <section className="card p-4">
            <h2 className="font-bold">Phase 1 — Requirements</h2>
            <p className="mt-1 text-sm">{project.description}</p>
            <h3 className="mt-3 text-sm font-semibold">Functional requirements</h3>
            <ul className="list-disc pl-5 text-sm">{project.functionalRequirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
            <h3 className="mt-3 text-sm font-semibold">Non-functional requirements</h3>
            <ul className="list-disc pl-5 text-sm">{project.nonFunctionalRequirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </section>
          <section className="card p-4">
            <h2 className="font-bold">Phase 2 — Planning</h2>
            <p className="mt-1 text-sm">{project.architecture}</p>
            {project.databaseSchema && <><h3 className="mt-3 text-sm font-semibold">Database schema</h3><pre className="mt-1 overflow-auto rounded bg-navy-950 p-3 text-xs text-green-300">{project.databaseSchema}</pre></>}
            {project.apis && project.apis.length > 0 && <><h3 className="mt-3 text-sm font-semibold">APIs</h3><ul className="list-disc pl-5 text-sm">{project.apis.map((a, i) => <li key={i}>{a}</li>)}</ul></>}
            <h3 className="mt-3 text-sm font-semibold">File structure</h3>
            <pre className="mt-1 overflow-auto rounded bg-navy-950 p-3 text-xs text-green-300">{project.fileStructure}</pre>
            <h3 className="mt-3 text-sm font-semibold">Task breakdown</h3>
            <ul className="list-disc pl-5 text-sm">{project.taskBreakdown.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </section>
          <section className="card p-4">
            <h2 className="font-bold">Phase 5 — Code review checklist</h2>
            <ul className="mt-1 list-disc pl-5 text-sm">{project.reviewChecklist.map((c, i) => <li key={i}>{c}</li>)}</ul>
            <h2 className="mt-3 font-bold">Phase 6 — Final assessment</h2>
            <ul className="mt-1 list-disc pl-5 text-sm">{project.finalAssessment.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </section>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Phases 3–4 — Guided milestones</h2>
          {milestones.map((m) => (
            <section key={m.id} className="card p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold">{m.order}. {m.title}</h3>
                {done.has(m.id)
                  ? <span className="badge bg-green-100 text-green-800">✓ Done</span>
                  : <button className="btn-primary" onClick={() => complete(m.id)}>Mark complete</button>}
              </div>
              <p className="mt-1 text-sm">{m.instructions}</p>
              <h4 className="mt-2 text-sm font-semibold">Objectives</h4>
              <ul className="list-disc pl-5 text-sm">{m.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
              <h4 className="mt-2 text-sm font-semibold">Concepts</h4>
              <p className="text-sm text-slate-500">{m.concepts.join(', ')}</p>
              <h4 className="mt-2 text-sm font-semibold">Acceptance criteria</h4>
              <ul className="list-disc pl-5 text-sm">{m.acceptanceCriteria.map((a, i) => <li key={i}>{a}</li>)}</ul>
              <h4 className="mt-2 text-sm font-semibold">Tests</h4>
              <ul className="list-disc pl-5 text-sm">{m.tests.map((t, i) => <li key={i}>{t}</li>)}</ul>
              <details className="mt-2 text-sm"><summary className="cursor-pointer font-semibold text-brand-600">Hints</summary>
                <ul className="mt-1 list-disc pl-5">{m.hints.map((h, i) => <li key={i}>{h}</li>)}</ul>
              </details>
            </section>
          ))}
          <section className="card p-4">
            <h2 className="font-bold">Submit for review</h2>
            <p className="text-sm text-slate-500">When your milestones are done, submit your project for instructor review.</p>
            <textarea className="input mt-2" rows={3} placeholder="Notes for your reviewer (what you built, how to run it)…" value={notes} onChange={(e) => setNotes(e.target.value)} />
            <button className="btn-primary mt-2" onClick={submit}>Submit project</button>
          </section>
        </div>
      </div>
    </div>
  );
}
