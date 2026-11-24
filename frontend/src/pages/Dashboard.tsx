import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Page } from '../components/Layout';

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

export function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api<DashboardData>('/api/progress/dashboard').then(setData).catch((e) => setError(e.message));
  }, []);

  if (error) return <Page title="Dashboard"><p role="alert" className="text-danger">{error}</p></Page>;
  if (!data) return <Page title="Dashboard"><p>Loading your learning dashboard…</p></Page>;

  const enrolled = data.courses.filter((c) => c.enrolled);
  const totalLessons = data.courses.reduce((s, c) => s + c.total_lessons, 0);
  const doneLessons = data.courses.reduce((s, c) => s + c.completed_lessons, 0);
  const pct = totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0;
  const maxXp = Math.max(...data.activity.map((a) => a.xp), 1);

  return (
    <Page title={`Welcome back, ${user?.displayName ?? 'learner'} 👋`} subtitle="Learn → Understand → Practice → Debug → Master → DSA → Build Projects → Become Industry Ready">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-4"><div className="text-sm text-muted">Total XP</div><div className="text-3xl font-bold text-accent-600">{data.xp}</div><div className="text-xs text-muted">Today: {data.todayXp} / {data.dailyGoal} daily goal</div>
          <div className="mt-2 h-2 rounded bg-line"><div className="h-2 rounded bg-accent-500" style={{ width: `${Math.min(100, (data.todayXp / data.dailyGoal) * 100)}%` }} /></div></div>
        <div className="card p-4"><div className="text-sm text-muted">Learning streak</div><div className="text-3xl font-bold">🔥 {data.streak} {data.streak === 1 ? 'day' : 'days'}</div><div className="text-xs text-muted">Keep it alive — learn a little every day</div></div>
        <div className="card p-4"><div className="text-sm text-muted">Completion</div><div className="text-3xl font-bold">{pct}%</div><div className="text-xs text-muted">{doneLessons} of {totalLessons} lessons completed</div>
          <div className="mt-2 h-2 rounded bg-line"><div className="h-2 rounded bg-success" style={{ width: `${pct}%` }} /></div></div>
        <div className="card p-4"><div className="text-sm text-muted">DSA · Projects</div><div className="text-3xl font-bold">{data.dsa.solved} / {data.dsa.total}</div><div className="text-xs text-muted">Problems solved · {data.projectsCompleted} projects completed</div></div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <h2 className="text-lg font-bold">Continue learning</h2>
          {enrolled.length === 0 && <p className="mt-2 text-sm text-muted">You have not enrolled in a course yet.</p>}
          {enrolled.map((c) => (
            <div key={c.slug} className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3 first:border-0">
              <div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-xs text-muted">{c.completed_lessons}/{c.total_lessons} lessons {c.mastery_passed ? '· 🏆 Mastery passed' : ''}</div>
                <div className="mt-1 h-1.5 w-48 rounded bg-line"><div className="h-1.5 rounded bg-accent-500" style={{ width: `${c.total_lessons ? (c.completed_lessons / c.total_lessons) * 100 : 0}%` }} /></div>
              </div>
              <Link className="btn-primary" to={`/courses/${c.slug}`}>Continue →</Link>
            </div>
          ))}
          <Link className="btn-secondary mt-4" to="/courses">Explore all courses</Link>
        </div>

        <div className="card p-4">
          <h2 className="text-lg font-bold">Last 14 days of activity</h2>
          {data.activity.length === 0 && <p className="mt-2 text-sm text-muted">No activity yet — complete a lesson to start your chart.</p>}
          <div className="mt-3 flex h-28 items-end gap-1">
            {[...data.activity].reverse().map((a) => (
              <div key={a.activity_date} className="flex-1 rounded-t bg-accent-500" style={{ height: `${Math.max(4, (a.xp / maxXp) * 100)}%` }} title={`${a.activity_date}: ${a.xp} XP, ${a.lessons_completed} lessons`} />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted"><span>14 days ago</span><span>today</span></div>
          <h3 className="mt-5 font-semibold">Recently completed lessons</h3>
          {data.recentLessons.length === 0 && <p className="text-sm text-muted">None yet.</p>}
          <ul className="mt-1 list-disc pl-5 text-sm">{data.recentLessons.map((l) => <li key={l.id}>{l.title}</li>)}</ul>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <h2 className="text-lg font-bold">Achievements ({data.achievements.length} / {data.allAchievements.length})</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.allAchievements.map((a) => {
              const earned = data.achievements.find((x) => x.id === a.id);
              return (
                <span key={a.id} title={earned ? `Earned ${earned.earned_at}` : a.description}
                  className={`badge ${earned ? 'bg-warning-soft text-warning' : 'bg-elevated text-faint'}`}>
                  {a.icon} {a.title}
                </span>
              );
            })}
          </div>
          <Link className="btn-secondary mt-4" to="/achievements">View all achievements</Link>
        </div>
        <div className="card p-4">
          <h2 className="text-lg font-bold">Recommended for you</h2>
          {data.weakTopics.length === 0
            ? <p className="mt-2 text-sm text-muted">No weak topics detected yet. Solve a few DSA problems and your recommendations will appear here, based on your real pass rates.</p>
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
    </Page>
  );
}
