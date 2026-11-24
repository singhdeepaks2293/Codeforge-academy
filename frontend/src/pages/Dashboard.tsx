import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { HatchedProgress, Page } from '../components/Layout';

interface DashboardData {
  xp: number; streak: number; dailyGoal: number; todayXp: number;
  courses: { slug: string; title: string; language: string; completed_lessons: number; total_lessons: number; enrolled: number; mastery_passed: number }[];
  recentLessons: { id: string; title: string }[];
  activity: { activity_date: string; xp: number; lessons_completed: number; exercises_solved: number }[];
  achievements: { id: string; title: string; icon: string; earned_at: string }[];
  allAchievements: { id: string; title: string; description: string; icon: string; xp: number }[];
  dsa: { solved: number; total: number };
  projectsCompleted: number;
  weakTopics: { topic: string; passRate: number; attempts: number }[];
}

interface ProjectSummary {
  id: string; slug: string; level: number; title: string; description: string;
  skills: string[]; language: string;
  progress?: { status: string; completed_milestones: string } | null;
}

// My Home tabs. Route tabs are real pages; Workspaces is a tab of this page
// that lists the learner's real in-progress project workspaces — there is
// no cloud workspace product behind it, so it shows local project work.
const HOME_TABS: { label: string; to: string | null }[] = [
  { label: 'Dashboard', to: '/' },
  { label: 'My learning', to: '/my-learning' },
  { label: 'AI Builder', to: '/features/builder' },
  { label: 'Skills tracking', to: '/progress' },
  { label: 'Projects', to: '/projects' },
  { label: 'Workspaces', to: null },
];

export function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  const [showWorkspaces, setShowWorkspaces] = useState(false);
  const [projects, setProjects] = useState<ProjectSummary[] | null>(null);

  useEffect(() => {
    api<DashboardData>('/api/progress/dashboard').then(setData).catch((e) => setError(e.message));
    // Workspaces come from the real project list + the learner's progress
    // on each project. Loaded up front so the tab never shows stale data.
    api<{ projects: ProjectSummary[] }>('/api/projects').then((d) => setProjects(d.projects)).catch(() => setProjects([]));
  }, []);

  if (error) return <Page title="My Home"><p role="alert" className="text-danger">{error}</p></Page>;
  if (!data) return <Page title="My Home"><p>Loading your learning dashboard…</p></Page>;

  const enrolled = data.courses.filter((c) => c.enrolled);
  const totalLessons = data.courses.reduce((s, c) => s + c.total_lessons, 0);
  const doneLessons = data.courses.reduce((s, c) => s + c.completed_lessons, 0);
  const pct = totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0;
  const earnedAchievements = data.allAchievements.filter((a) => data.achievements.some((x) => x.id === a.id));
  const unearnedAchievements = data.allAchievements.filter((a) => !data.achievements.some((x) => x.id === a.id));
  // A workspace is a project the learner has started (or finished): real
  // progress rows from /api/projects, never invented cloud workspaces.
  const workspaces = (projects ?? []).filter((p) => p.progress);
  const inProgress = workspaces.filter((p) => p.progress?.status === 'in-progress');
  const completedWork = workspaces.filter((p) => p.progress?.status === 'completed');

  const tabClass = (active: boolean) =>
    `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      active ? 'bg-accent-soft font-semibold text-accent-600' : 'text-ink/75 hover:bg-elevated hover:text-ink'
    }`;

  return (
    <Page title={`Welcome back, ${user?.displayName ?? 'learner'} 👋`} subtitle="Learn → Understand → Practice → Debug → Master → DSA → Build Projects → Become Industry Ready">
      <nav aria-label="My Home sections" className="panel-scroll-x -mt-1 mb-5 flex flex-nowrap gap-0.5 border-b border-line pb-3">
        {HOME_TABS.map((t) => t.to !== null ? (
          <NavLink key={t.label} to={t.to} end={t.to === '/'} className={({ isActive }) => tabClass(isActive && !showWorkspaces)} onClick={() => setShowWorkspaces(false)}>
            {t.label}
          </NavLink>
        ) : (
          <button key={t.label} type="button" className={tabClass(showWorkspaces)} aria-current={showWorkspaces ? 'page' : undefined} onClick={() => setShowWorkspaces(true)}>
            {t.label}
          </button>
        ))}
      </nav>

      {showWorkspaces ? (
        <div>
          <h2 className="text-lg font-bold">Your workspaces</h2>
          <p className="mt-1 text-sm text-muted">
            Each workspace is a project you have started on this machine — your milestones, code and review notes live in the project itself. There are no cloud workspaces here; everything runs locally.
          </p>
          {projects === null && <p className="mt-4 text-sm text-muted">Loading workspaces…</p>}
          {projects !== null && workspaces.length === 0 && (
            <div className="card mt-4 p-6 text-center text-muted">
              <p>No project workspace yet — you have not started a project.</p>
              <Link className="btn-primary mt-3" to="/projects">Browse projects</Link>
            </div>
          )}
          {inProgress.length > 0 && (
            <>
              <h3 className="mt-5 font-semibold">In progress ({inProgress.length})</h3>
              <div className="mt-2 grid gap-4 md:grid-cols-2">
                {inProgress.map((p) => (
                  <article key={p.id} className="card p-4">
                    <span className="badge bg-accent-soft text-accent-600">Level {p.level} · {p.language}</span>
                    <h3 className="mt-2 font-bold">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted">{p.description}</p>
                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-3">
                      <span className="text-xs text-muted">Status: {p.progress?.status}</span>
                      <Link className="btn-primary" to={`/projects/${p.slug}`}>Open workspace →</Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
          {completedWork.length > 0 && (
            <>
              <h3 className="mt-5 font-semibold">Completed ({completedWork.length})</h3>
              <ul className="mt-2 space-y-2">
                {completedWork.map((p) => (
                  <li key={p.id} className="card flex items-center justify-between gap-3 p-3">
                    <span className="text-sm"><strong>{p.title}</strong> · Level {p.level} · {p.language}</span>
                    <Link className="text-sm font-semibold text-accent-600" to={`/projects/${p.slug}`}>Revisit →</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          {data.recentLessons.length > 0 && (
            <>
              <h3 className="mt-6 font-semibold">Recent work</h3>
              <ul className="mt-2 list-disc pl-5 text-sm">{data.recentLessons.map((l) => <li key={l.id}>{l.title}</li>)}</ul>
            </>
          )}
        </div>
      ) : (
        <>
          {/* XP and streak live here as cards. XP bars live ONLY on the
              Skills tracking tab (/progress) — this page shows XP as numbers
              and the 14-day activity as a text list, never as bars. */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card p-4"><div className="text-sm text-muted">Total XP</div><div data-testid="total-xp" className="text-4xl font-bold leading-tight text-accent-600">{(data.xp ?? 0).toLocaleString()} <span className="text-lg">XP</span></div><div className="text-xs text-muted">Today: {data.todayXp} / {data.dailyGoal} daily goal{data.xp === 0 ? ' — complete your first lesson to earn XP' : ''}</div></div>
            <div className="card p-4"><div className="text-sm text-muted">Learning streak</div><div className="text-3xl font-bold">🔥 {data.streak} {data.streak === 1 ? 'day' : 'days'}</div><div className="text-xs text-muted">Keep it alive — learn a little every day</div></div>
            <div className="card p-4"><div className="text-sm text-muted">Completion</div><div className="text-3xl font-bold">{pct}%</div><div className="text-xs text-muted">{doneLessons} of {totalLessons} lessons completed</div>
              <div className="mt-2"><HatchedProgress percent={pct} label={`Overall completion ${pct}%`} /></div></div>
            <div className="card p-4"><div className="text-sm text-muted">DSA · Projects</div><div className="text-3xl font-bold">{data.dsa.solved} / {data.dsa.total}</div><div className="text-xs text-muted">Problems solved · {data.projectsCompleted} projects completed</div></div>
          </div>

          <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
            <div className="card p-4">
              <h2 className="text-lg font-bold">Continue learning</h2>
              {enrolled.length === 0 && <p className="mt-2 text-sm text-muted">You have not enrolled in a course yet.</p>}
              {enrolled.map((c) => {
                const cpct = c.total_lessons ? Math.round((c.completed_lessons / c.total_lessons) * 100) : 0;
                return (
                  <div key={c.slug} className="mt-3 border-t border-line pt-3 first:border-0">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold">{c.title}</div>
                        <div className="text-xs text-muted">{c.completed_lessons}/{c.total_lessons} lessons {c.mastery_passed ? '· 🏆 Mastery passed' : ''}</div>
                      </div>
                      <Link className="btn-primary shrink-0" to={`/courses/${c.slug}`}>Continue →</Link>
                    </div>
                    <div className="mt-2"><HatchedProgress percent={cpct} label={`${c.title} progress ${cpct}%`} /></div>
                  </div>
                );
              })}
              <Link className="btn-secondary mt-4" to="/courses">Explore all courses</Link>
            </div>

            <div className="card scroll-mt-24 p-4">
              <h2 className="text-lg font-bold">Last 14 days of activity</h2>
              {data.activity.reduce((s, a) => s + a.xp, 0) === 0
                ? <p className="mt-2 text-sm text-muted">No activity yet — <Link className="font-semibold text-accent-600" to="/courses">complete a lesson</Link> to start your chart.</p>
                : (
                  <ul className="mt-2 space-y-1 text-sm">
                    {[...data.activity].reverse().slice(0, 14).map((a) => (
                      <li key={a.activity_date} className="flex justify-between gap-2 border-b border-line pb-1 last:border-0">
                        <span className="text-muted">{a.activity_date}</span>
                        <span>{a.xp} XP · {a.lessons_completed} lessons · {a.exercises_solved} exercises</span>
                      </li>
                    ))}
                  </ul>
                )}
              <p className="mt-3 text-xs text-muted">See the XP chart on the <Link className="font-semibold text-accent-600" to="/progress">Skills tracking</Link> tab.</p>
              <h3 className="mt-5 font-semibold">Recently completed lessons</h3>
              {data.recentLessons.length === 0 && <p className="text-sm text-muted">None yet.</p>}
              <ul className="mt-1 list-disc pl-5 text-sm">{data.recentLessons.map((l) => <li key={l.id}>{l.title}</li>)}</ul>
            </div>
          </div>

          <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
            <div className="card p-4">
              <h2 className="text-lg font-bold">Achievements ({data.achievements.length} / {data.allAchievements.length})</h2>
              {earnedAchievements.length === 0 ? (
                <p className="mt-2 text-sm text-muted">No achievements yet — complete your first lesson to earn your first badge.</p>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {earnedAchievements.map((a) => {
                    const earned = data.achievements.find((x) => x.id === a.id)!;
                    return (
                      <span key={a.id} title={`Earned ${earned.earned_at} — ${a.description}`}
                        className="badge bg-warning-soft text-warning">
                        {a.icon} {a.title}
                      </span>
                    );
                  })}
                </div>
              )}
              {unearnedAchievements.length > 0 && earnedAchievements.length > 0 && (
                <details className="mt-3 text-sm">
                  <summary className="cursor-pointer font-semibold text-accent-600">Show {unearnedAchievements.length} unearned achievements</summary>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {unearnedAchievements.map((a) => (
                      <span key={a.id} title={a.description} className="badge bg-elevated text-faint">{a.icon} {a.title}</span>
                    ))}
                  </div>
                </details>
              )}
              <Link className="btn-secondary mt-4" to="/achievements">View all achievements</Link>
            </div>
            <div className="card p-4">
              <h2 className="text-lg font-bold">Recommended for you</h2>
              {data.weakTopics.length === 0
                ? <p className="mt-2 text-sm text-muted">No recommendations yet — solve a few DSA problems and this will fill in from your real pass rates.</p>
                : (
                  <ul className="mt-2 space-y-2 text-sm">
                    {data.weakTopics.map((w) => (
                      <li key={w.topic} className="rounded-lg bg-warning-soft p-3">
                        You are struggling with <strong>{w.topic}</strong> ({Math.round(w.passRate * 100)}% pass rate over {w.attempts} attempts). Revisit the {w.topic} lessons and try easier problems first.
                      </li>
                    ))}
                  </ul>
                )}
              <div className="mt-4 flex gap-2">
                <Link className="btn-primary" to="/practice">Practice DSA</Link>
                <Link className="btn-secondary" to="/projects">Browse projects</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </Page>
  );
}
