// Locked-feature equivalents, as real working pages (free, no paywall).
// All data comes from /api/features; nothing here is mocked or faked.
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { Page } from '../components/Layout';

function Err({ error }: { error: string }) {
  return error ? <p role="alert" className="text-danger">{error}</p> : null;
}

interface CourseProgress { slug: string; title: string; enrolled: boolean; completedLessons: number; totalLessons: number; percent: number; completed: boolean; }
interface SkillPath { id: string; title: string; description: string; level: string; estimatedWeeks: number; enrolled: boolean; coursesCompleted: number; coursesTotal: number; progress: CourseProgress[]; }

export function SkillPathsPage() {
  const [paths, setPaths] = useState<SkillPath[]>([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => { api<{ paths: SkillPath[] }>('/api/features/paths').then((d) => setPaths(d.paths)).catch((e) => setError(e.message)); }, []);
  const enroll = async (id: string) => {
    await api(`/api/features/paths/${id}/enroll`, { method: 'POST' });
    setPaths((ps) => ps.map((p) => (p.id === id ? { ...p, enrolled: true } : p)));
  };
  return (
    <Page title="Skill Paths" subtitle="Curated sequences of real courses, in order. Progress is your real course progress.">
      <Err error={error} />
      <div className="space-y-4">
        {paths.map((p) => (
          <article key={p.id} className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold">{p.title}</h2>
              <span className="badge">{p.level} · {p.estimatedWeeks} weeks</span>
            </div>
            <p className="text-sm text-muted">{p.description}</p>
            <p className="mt-1 text-sm font-semibold">{p.coursesCompleted}/{p.coursesTotal} courses completed {p.enrolled ? '· Enrolled' : ''}</p>
            <div className="mt-2 flex gap-2">
              <button className="btn-secondary" onClick={() => setOpen(open === p.id ? null : p.id)}>{open === p.id ? 'Hide courses' : 'Show courses'}</button>
              {!p.enrolled && <button className="btn-primary" onClick={() => enroll(p.id)}>Enroll</button>}
            </div>
            {open === p.id && (
              <ol className="mt-3 space-y-1">
                {p.progress.map((c) => (
                  <li key={c.slug} className="flex items-center justify-between gap-2 text-sm">
                    <Link className="text-accent-500" to={`/courses/${c.slug}`}>{c.title}</Link>
                    <span className="text-muted">{c.completed ? 'Completed' : `${c.percent}% · ${c.completedLessons}/${c.totalLessons} lessons`}</span>
                  </li>
                ))}
              </ol>
            )}
          </article>
        ))}
      </div>
    </Page>
  );
}

interface Career { id: string; title: string; description: string; level: string; estimatedWeeks: number; enrolled: boolean; coursesDone: boolean; capstoneDone: boolean; completed: boolean; capstoneProjectSlug: string; certificate: { code: string; title: string } | null; progress: CourseProgress[]; }

export function CareerPathsPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const load = () => api<{ careers: Career[] }>('/api/features/careers').then((d) => setCareers(d.careers)).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);
  const claim = async (id: string) => {
    try {
      const d = await api<{ certificate: { code: string } }>(`/api/features/careers/${id}/claim-certificate`, { method: 'POST' });
      setMsg(`Professional certificate issued — code ${d.certificate.code}`);
      load();
    } catch (e) { setError((e as Error).message); }
  };
  return (
    <Page title="Career Paths" subtitle="Multi-track routes to a job, ending in a capstone project and a professional certificate.">
      <Err error={error} />
      {msg && <p className="mb-2 font-semibold">{msg}</p>}
      <div className="space-y-4">
        {careers.map((c) => (
          <article key={c.id} className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold">{c.title}</h2>
              <span className="badge">{c.level} · {c.estimatedWeeks} weeks</span>
            </div>
            <p className="text-sm text-muted">{c.description}</p>
            <p className="mt-1 text-sm">Courses: {c.progress.filter((p) => p.completed).length}/{c.progress.length} complete · Capstone: {c.capstoneDone ? 'completed' : 'not done'}</p>
            <p className="text-sm">Capstone project: <Link className="text-accent-500" to={`/projects/${c.capstoneProjectSlug}`}>{c.capstoneProjectSlug}</Link></p>
            <div className="mt-2 flex gap-2">
              {!c.enrolled && <button className="btn-primary" onClick={async () => { await api(`/api/features/careers/${c.id}/enroll`, { method: 'POST' }); load(); }}>Enroll</button>}
              {c.completed && !c.certificate && <button className="btn-primary" onClick={() => claim(c.id)}>Claim professional certificate</button>}
              {c.certificate && <span className="font-semibold">Certificate issued: {c.certificate.code}</span>}
            </div>
            <ol className="mt-3 space-y-1">
              {c.progress.map((p) => (
                <li key={p.slug} className="flex items-center justify-between gap-2 text-sm">
                  <Link className="text-accent-500" to={`/courses/${p.slug}`}>{p.title}</Link>
                  <span className="text-muted">{p.completed ? 'Completed' : `${p.percent}%`}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </Page>
  );
}

interface Cert { code: string; kind: string; refSlug: string; title: string; issuedAt: string; }

export function CertificatesPage() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [error, setError] = useState('');
  useEffect(() => { api<{ certificates: Cert[] }>('/api/features/certificates').then((d) => setCerts(d.certificates)).catch((e) => setError(e.message)); }, []);
  return (
    <Page title="My Certificates" subtitle="Issued only when you actually complete a course or career path. Each has a unique verification code.">
      <Err error={error} />
      {certs.length === 0 && <div className="card p-6 text-center text-muted">No certificates yet — finish a course to earn one.</div>}
      <div className="space-y-3">
        {certs.map((c) => (
          <article key={c.code} className="card p-4">
            <h2 className="font-bold">{c.title}</h2>
            <p className="text-sm text-muted">{c.kind} · issued {c.issuedAt}</p>
            <p className="text-sm">Verification code: <Link className="text-accent-500" to={`/features/certificates/${c.code}`}>{c.code}</Link></p>
          </article>
        ))}
      </div>
    </Page>
  );
}

export function VerifyCertificatePage() {
  const { code } = useParams();
  const [result, setResult] = useState<{ valid: boolean; certificate?: Cert & { holder?: string } } | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    api<{ valid: boolean; certificate?: Cert & { holder?: string } }>(`/api/features/certificates/${code}`)
      .then(setResult).catch((e) => setError(e.message));
  }, [code]);
  return (
    <Page title="Verify Certificate" subtitle={`Checking code ${code}`}>
      <Err error={error} />
      {result?.valid && result.certificate && (
        <div className="card p-4">
          <p className="font-bold">Valid certificate</p>
          <p>{result.certificate.title}</p>
          <p className="text-sm text-muted">Issued to {result.certificate.holder} · {result.certificate.issuedAt}</p>
          <p className="text-sm">Code: {result.certificate.code}</p>
        </div>
      )}
      {result && !result.valid && <p role="alert">This certificate code is not valid.</p>}
    </Page>
  );
}

interface QuizDef { id: string; title: string; questionCount: number; }
interface QuizQ { id: string; topic: string; question: string; options: string[]; }

export function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizDef[]>([]);
  const [active, setActive] = useState<{ attemptId: string; title: string; questions: QuizQ[] } | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ scorePercent: number; correct: number; total: number; review: { question: string; options: string[]; given: number | null; correctAnswer: number; correct: boolean; explanation: string }[] } | null>(null);
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(0);
  useEffect(() => { api<{ quizzes: QuizDef[] }>('/api/features/quizzes').then((d) => setQuizzes(d.quizzes)).catch((e) => setError(e.message)); }, []);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [active]);
  const start = async (id: string) => {
    const d = await api<{ attemptId: string; title: string; questions: QuizQ[] }>(`/api/features/quizzes/${encodeURIComponent(id)}/start`, { method: 'POST', body: JSON.stringify({ count: 10 }) });
    setActive(d); setAnswers({}); setResult(null); setSeconds(0);
  };
  const submit = async () => {
    if (!active) return;
    const d = await api<typeof result & { attemptId: string }>(`/api/features/quizzes/attempts/${active.attemptId}/submit`, { method: 'POST', body: JSON.stringify({ answers, timeSeconds: seconds }) });
    setResult(d); setActive(null);
  };
  return (
    <Page title="Practice Quizzes" subtitle="Timed mixed quizzes drawn from real lesson knowledge-checks and assessments — separate from per-course mastery assessments.">
      <Err error={error} />
      {active ? (
        <div>
          <h2 className="mb-2 font-bold">{active.title} · {seconds}s elapsed</h2>
          <div className="space-y-4">
            {active.questions.map((q, i) => (
              <div key={q.id} className="card p-4">
                <p className="font-semibold">{i + 1}. {q.question}</p>
                <p className="text-xs text-muted">Topic: {q.topic}</p>
                <div className="mt-2 space-y-1">
                  {q.options.map((o, oi) => (
                    <label key={oi} className="flex items-center gap-2 text-sm">
                      <input type="radio" name={q.id} checked={answers[q.id] === oi} onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))} />
                      {o}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="btn-primary mt-4" onClick={submit}>Submit quiz</button>
        </div>
      ) : result ? (
        <div>
          <h2 className="mb-2 font-bold">Score: {result.scorePercent}% ({result.correct}/{result.total})</h2>
          <button className="btn-secondary mb-4" onClick={() => setResult(null)}>Back to quizzes</button>
          <div className="space-y-3">
            {result.review.map((r, i) => (
              <div key={i} className="card p-4">
                <p className="font-semibold">{r.correct ? 'Correct' : 'Wrong'} — {r.question}</p>
                <p className="text-sm">Your answer: {r.given === null ? '—' : r.options[r.given]}</p>
                <p className="text-sm">Correct answer: {r.options[r.correctAnswer]}</p>
                {r.explanation && <p className="text-sm text-muted">{r.explanation}</p>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {quizzes.map((q) => (
            <article key={q.id} className="card p-4">
              <h2 className="font-bold">{q.title}</h2>
              <p className="text-sm text-muted">{q.questionCount} questions available · 10 per attempt</p>
              <button className="btn-primary mt-2" onClick={() => start(q.id)}>Start quiz</button>
            </article>
          ))}
          {quizzes.length === 0 && <p className="text-muted">No quizzes available yet.</p>}
        </div>
      )}
    </Page>
  );
}

interface Challenge { id: string; title: string; language: string; difficulty: string; timeLimitSeconds: number; instructions: string; starterCode: string; attempts: number; passes: number; bestSeconds: number | null; }

export function ChallengesPage() {
  const [list, setList] = useState<Challenge[]>([]);
  const [open, setOpen] = useState<Challenge | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ passed: boolean; results: { name: string; passed: boolean }[] } | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { api<{ challenges: Challenge[] }>('/api/features/challenges').then((d) => setList(d.challenges)).catch((e) => setError(e.message)); }, []);
  const submit = async () => {
    if (!open) return;
    try {
      const d = await api<{ passed: boolean; results: { name: string; passed: boolean }[] }>(`/api/features/challenges/${open.id}/submit`, { method: 'POST', body: JSON.stringify({ code }) });
      setResult(d);
    } catch (e) { setError((e as Error).message); }
  };
  return (
    <Page title="Code Challenges" subtitle="Short timed challenges, graded by running your code against real tests. Your personal bests are tracked.">
      <Err error={error} />
      {open ? (
        <div>
          <button className="btn-secondary mb-3" onClick={() => { setOpen(null); setResult(null); }}>Back to challenges</button>
          <h2 className="font-bold">{open.title} · {open.language} · {open.difficulty} · {open.timeLimitSeconds}s limit</h2>
          <p className="text-sm text-muted">{open.instructions}</p>
          <textarea className="input mt-3 min-h-64 w-full font-mono" value={code} onChange={(e) => setCode(e.target.value)} aria-label="Your code" />
          <button className="btn-primary mt-2" onClick={submit}>Run tests</button>
          {result && (
            <div className="card mt-3 p-4">
              <p className="font-bold">{result.passed ? 'All tests passed' : 'Some tests failed'}</p>
              <ul className="text-sm">{result.results.map((r) => <li key={r.name}>{r.name}: {r.passed ? 'passed' : 'failed'}</li>)}</ul>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((c) => (
            <article key={c.id} className="card p-4">
              <h2 className="font-bold">{c.title}</h2>
              <p className="text-sm text-muted">{c.language} · {c.difficulty} · {c.timeLimitSeconds}s</p>
              <p className="text-sm">{c.instructions}</p>
              <p className="text-sm">Attempts: {c.attempts} · Passed: {c.passes}{c.bestSeconds !== null ? ` · Best: ${c.bestSeconds}s` : ''}</p>
              <button className="btn-primary mt-2" onClick={() => { setOpen(c); setCode(c.starterCode); setResult(null); }}>Attempt challenge</button>
            </article>
          ))}
        </div>
      )}
    </Page>
  );
}

interface InterviewTrack { id: string; title: string; description: string; }
export function InterviewPage() {
  const [tracks, setTracks] = useState<InterviewTrack[]>([]);
  const [session, setSession] = useState<{ attemptId: string; track: InterviewTrack; coding: Challenge; behavioral: { id: string; question: string; guidance: string }[]; technical: { id: string; question: string; guidance: string }[]; rubric: { criterion: string; description: string }[] } | null>(null);
  const [code, setCode] = useState('');
  const [scores, setScores] = useState<Record<string, Record<string, number>>>({});
  const [result, setResult] = useState<{ coding: { passed: boolean }; behavioral: { total: number; max: number; selfAssessed: boolean } } | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { api<{ tracks: InterviewTrack[] }>('/api/features/interview/tracks').then((d) => setTracks(d.tracks)).catch((e) => setError(e.message)); }, []);
  const start = async (id: string) => {
    const d = await api<typeof session & { attemptId: string }>(`/api/features/interview/start`, { method: 'POST', body: JSON.stringify({ track: id }) });
    setSession(d); setCode(d!.coding.starterCode); setScores({}); setResult(null);
  };
  const submit = async () => {
    if (!session) return;
    const behavioral: Record<string, { scores: Record<string, number> }> = {};
    for (const q of session.behavioral) behavioral[q.id] = { scores: scores[q.id] ?? {} };
    try {
      const d = await api<typeof result & { attemptId: string }>(`/api/features/interview/${session.attemptId}/submit`, { method: 'POST', body: JSON.stringify({ code, behavioral }) });
      setResult(d);
    } catch (e) { setError((e as Error).message); }
  };
  return (
    <Page title="Interview Prep" subtitle="Timed mock interviews: a real coding round plus behavioral questions scored against a published rubric (self-assessed).">
      <Err error={error} />
      {result ? (
        <div className="card p-4">
          <p className="font-bold">Coding round: {result.coding.passed ? 'passed' : 'not passed'}</p>
          <p>Behavioral self-assessment: {result.behavioral.total}/{result.behavioral.max} (self-assessed — not an examiner score)</p>
          <button className="btn-secondary mt-3" onClick={() => { setResult(null); setSession(null); }}>Back to tracks</button>
        </div>
      ) : session ? (
        <div className="space-y-4">
          <h2 className="font-bold">{session.track.title} mock interview</h2>
          <div className="card p-4">
            <p className="font-semibold">Coding: {session.coding.title}</p>
            <p className="text-sm text-muted">{session.coding.instructions}</p>
            <textarea className="input mt-2 min-h-48 w-full font-mono" value={code} onChange={(e) => setCode(e.target.value)} aria-label="Your code" />
          </div>
          <div className="card p-4">
            <p className="font-semibold">Behavioral — rate yourself 1–5 per rubric criterion</p>
            {session.behavioral.map((q) => (
              <div key={q.id} className="mt-3">
                <p className="text-sm font-semibold">{q.question}</p>
                <p className="text-xs text-muted">{q.guidance}</p>
                {session.rubric.map((r) => (
                  <label key={r.criterion} className="mt-1 flex items-center gap-2 text-sm">
                    {r.criterion}
                    <select className="input !w-auto" value={scores[q.id]?.[r.criterion] ?? ''} onChange={(e) => setScores((s) => ({ ...s, [q.id]: { ...(s[q.id] ?? {}), [r.criterion]: Number(e.target.value) } }))} aria-label={`${q.id} ${r.criterion}`}>
                      <option value="">—</option>
                      {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </label>
                ))}
              </div>
            ))}
          </div>
          <div className="card p-4">
            <p className="font-semibold">Technical discussion (review after submitting)</p>
            {session.technical.map((q) => <p key={q.id} className="text-sm">• {q.question}</p>)}
          </div>
          <button className="btn-primary" onClick={submit}>Submit interview</button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {tracks.map((t) => (
            <article key={t.id} className="card p-4">
              <h2 className="font-bold">{t.title}</h2>
              <p className="text-sm text-muted">{t.description}</p>
              <button className="btn-primary mt-2" onClick={() => start(t.id)}>Start mock interview</button>
            </article>
          ))}
        </div>
      )}
    </Page>
  );
}

interface Bootcamp { id: string; title: string; description: string; weeks: number; hoursPerWeek: number; enrolled: boolean; startDate: string | null; plan: { week: number; title: string; goal: string; startDate: string | null; endDate: string | null; percent: number; completed: boolean; courseSlugs: string[] }[]; }

export function BootcampsPage() {
  const [list, setList] = useState<Bootcamp[]>([]);
  const [error, setError] = useState('');
  const load = () => api<{ bootcamps: Bootcamp[] }>('/api/features/bootcamps').then((d) => setList(d.bootcamps)).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);
  return (
    <Page title="Bootcamps" subtitle="Multi-week structured plans with dated milestones computed from your enrollment date.">
      <Err error={error} />
      <div className="space-y-4">
        {list.map((b) => (
          <article key={b.id} className="card p-4">
            <h2 className="font-bold">{b.title}</h2>
            <p className="text-sm text-muted">{b.description} · {b.weeks} weeks · {b.hoursPerWeek}h/week</p>
            <p className="text-sm">{b.enrolled ? `Enrolled — started ${b.startDate}` : 'Not enrolled — dates below are a preview from today.'}</p>
            {!b.enrolled && <button className="btn-primary mt-2" onClick={async () => { await api(`/api/features/bootcamps/${b.id}/enroll`, { method: 'POST', body: JSON.stringify({}) }); load(); }}>Enroll (starts today)</button>}
            <ol className="mt-3 space-y-2">
              {b.plan.map((w) => (
                <li key={w.week} className="flex justify-between gap-2 text-sm">
                  <span><strong>Week {w.week}: {w.title}</strong> — {w.goal}</span>
                  <span className="shrink-0 text-muted">{w.startDate ? `${w.startDate} → ${w.endDate}` : '—'} · {w.percent}%{w.completed ? ' · done' : ''}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </Page>
  );
}

interface CoachData { summary: { xp: number; streak: number; dsaSolved: number; last7DaysXp: number; last7DaysLessons: number }; recommendations: { text: string; evidence: string; link: string }[]; weeklyPlan: { day: string; task: string; reason: string }[]; }

export function CoachPage() {
  const [data, setData] = useState<CoachData | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { api<CoachData>('/api/features/coach').then(setData).catch((e) => setError(e.message)); }, []);
  return (
    <Page title="Coach" subtitle="A weekly plan and recommendations built from your real progress and submissions — never invented advice.">
      <Err error={error} />
      {data && (
        <div className="space-y-4">
          <div className="card p-4">
            <p className="text-sm">XP: <strong>{data.summary.xp}</strong> · Streak: <strong>{data.summary.streak} days</strong> · DSA solved: <strong>{data.summary.dsaSolved}</strong> · Last 7 days: <strong>{data.summary.last7DaysLessons} lessons, {data.summary.last7DaysXp} XP</strong></p>
          </div>
          <div className="card p-4">
            <h2 className="font-bold">Your weekly plan</h2>
            <ol className="mt-2 space-y-2">
              {data.weeklyPlan.map((d) => (
                <li key={d.day} className="text-sm"><strong>{d.day}:</strong> {d.task} <span className="text-muted">({d.reason})</span></li>
              ))}
            </ol>
          </div>
          <div className="card p-4">
            <h2 className="font-bold">Recommendations</h2>
            <ul className="mt-2 space-y-2">
              {data.recommendations.map((r, i) => (
                <li key={i} className="text-sm">
                  <Link className="text-accent-500" to={r.link}>{r.text}</Link>
                  <span className="block text-muted">Evidence: {r.evidence}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Page>
  );
}

export function BuilderPage() {
  const [goal, setGoal] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [plan, setPlan] = useState<{ note: string; suggestedPath: { id: string; title: string } | null; steps: { step: number; slug: string; title: string; estimatedHours: number }[]; projects: { slug: string; title: string }[]; matchedAnything: boolean } | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { api<{ suggestions: string[] }>('/api/features/builder/suggestions').then((d) => setSuggestions(d.suggestions)).catch(() => undefined); }, []);
  const build = async () => {
    try {
      const d = await api<typeof plan & { note: string }>('/api/features/builder/plan', { method: 'POST', body: JSON.stringify({ goal }) });
      setPlan(d);
    } catch (e) { setError((e as Error).message); }
  };
  return (
    <Page title="Build Planner" subtitle="Built from CodeForge's own curriculum — no AI model, works offline. Pick a goal and it assembles a plan from real courses, projects and docs.">
      <Err error={error} />
      <p className="mb-3 text-sm text-muted">This is a local planner: it matches your words against the real course catalog. It does not generate text or pretend to be an AI assistant.</p>
      <div className="mb-2 flex flex-wrap gap-2">
        {suggestions.map((s) => <button key={s} className="btn-secondary" onClick={() => setGoal(s)}>{s}</button>)}
      </div>
      <div className="flex gap-2">
        <input className="input flex-1" placeholder="e.g. Become a backend engineer" value={goal} onChange={(e) => setGoal(e.target.value)} aria-label="Your goal" />
        <button className="btn-primary" onClick={build}>Build my plan</button>
      </div>
      {plan && (
        <div className="mt-4 space-y-3">
          {plan.suggestedPath && <p className="font-semibold">Suggested path: {plan.suggestedPath.title}</p>}
          {!plan.matchedAnything && <p role="alert">No courses matched that goal — try words like Python, React, data, DevOps or backend.</p>}
          <ol className="space-y-1">
            {plan.steps.map((s) => (
              <li key={s.slug} className="card p-3 text-sm"><strong>Step {s.step}:</strong> <Link className="text-accent-500" to={`/courses/${s.slug}`}>{s.title}</Link> · {s.estimatedHours}h</li>
            ))}
          </ol>
          {plan.projects.length > 0 && (
            <div className="card p-3">
              <p className="font-semibold">Projects to build</p>
              {plan.projects.map((p) => <p key={p.slug} className="text-sm"><Link className="text-accent-500" to={`/projects/${p.slug}`}>{p.title}</Link></p>)}
            </div>
          )}
        </div>
      )}
    </Page>
  );
}
