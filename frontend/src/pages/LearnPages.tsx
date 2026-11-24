import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { Page } from '../components/Layout';

interface DashboardData {
  xp: number; streak: number; activity: { activity_date: string; xp: number; lessons_completed: number; exercises_solved: number }[];
  achievements: { id: string; title: string; icon: string }[];
  allAchievements: { id: string; title: string; description: string; icon: string; xp: number }[];
  dsa: { solved: number; total: number };
  weakTopics: { topic: string; passRate: number; attempts: number }[];
}

export function AchievementsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  useEffect(() => { api<DashboardData>('/api/progress/dashboard').then(setData).catch(() => undefined); }, []);
  if (!data) return <Page title="Achievements"><p>Loading…</p></Page>;
  return (
    <Page title="Achievements" subtitle={`${data.achievements.length} of ${data.allAchievements.length} earned — ${data.xp} total XP. Achievements reward real skill: they are earned from actual completions, never granted by hand.`}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.allAchievements.map((a) => {
          const earned = data.achievements.find((x) => x.id === a.id);
          return (
            <div key={a.id} className={`card p-4 ${earned ? '' : 'opacity-50'}`}>
              <div className="text-3xl">{a.icon}</div>
              <h2 className="mt-2 font-bold">{a.title} {earned ? '✓' : '🔒'}</h2>
              <p className="text-sm text-muted">{a.description}</p>
              <p className="mt-1 text-xs font-semibold text-accent-600">+{a.xp} XP</p>
            </div>
          );
        })}
      </div>
    </Page>
  );
}

export function ProgressPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  useEffect(() => { api<DashboardData>('/api/progress/dashboard').then(setData).catch(() => undefined); }, []);
  if (!data) return <Page title="Progress"><p>Loading…</p></Page>;
  return (
    <Page title="Progress & Analytics" subtitle="Your learning, measured from real activity — not hardcoded numbers.">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <h2 className="font-bold">Weekly activity (XP per day)</h2>
          <div className="mt-3 space-y-2">
            {data.activity.slice(0, 14).map((a) => (
              <div key={a.activity_date} className="flex items-center gap-2 text-sm">
                <span className="w-24 text-muted">{a.activity_date}</span>
                <div className="h-4 flex-1 rounded bg-elevated"><div className="h-4 rounded bg-accent-500" style={{ width: `${Math.min(100, a.xp)}%` }} /></div>
                <span className="w-16 text-right">{a.xp} XP · {a.lessons_completed} lessons · {a.exercises_solved} exercises</span>
              </div>
            ))}
            {data.activity.length === 0 && <p className="text-sm text-muted">No activity yet.</p>}
          </div>
        </div>
        <div className="card p-4">
          <h2 className="font-bold">Skills needing attention</h2>
          {data.weakTopics.length === 0
            ? <p className="mt-2 text-sm text-muted">No weak topics detected. Weak topics are computed from your DSA pass rates (topics with ≥2 attempts and &lt;60% pass rate).</p>
            : data.weakTopics.map((w) => (
              <div key={w.topic} className="mt-2 rounded-lg bg-warning-soft p-3 text-sm">
                <strong>{w.topic}</strong> — {Math.round(w.passRate * 100)}% pass rate over {w.attempts} attempts. Recommendation: revisit the {w.topic} lessons and solve easier problems first.
              </div>
            ))}
          <h2 className="mt-5 font-bold">DSA progress</h2>
          <p className="text-sm">{data.dsa.solved} / {data.dsa.total} problems solved</p>
          <div className="mt-1 h-2 rounded bg-line"><div className="h-2 rounded bg-accent-500" style={{ width: `${data.dsa.total ? (data.dsa.solved / data.dsa.total) * 100 : 0}%` }} /></div>
        </div>
      </div>
    </Page>
  );
}

export function ProfilePage() {
  const { user, refresh } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [sessions, setSessions] = useState<{ id: string; created_at: string; expires_at: string; user_agent: string; ip: string; revoked: number }[]>([]);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (user) setDisplayName(user.displayName);
    api<{ sessions: typeof sessions }>('/api/auth/sessions').then((d) => setSessions(d.sessions)).catch(() => undefined);
  }, [user]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setMsg('');
    try { await api('/api/progress/profile', { method: 'PATCH', body: JSON.stringify({ displayName }) }); await refresh(); setMsg('Profile updated.'); } catch (err) { setError((err as Error).message); }
  };
  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setMsg('');
    try { await api('/api/auth/change-password', { method: 'POST', body: JSON.stringify({ currentPassword, newPassword }) }); setMsg('Password changed. Other sessions were revoked.'); setCurrentPassword(''); setNewPassword(''); } catch (err) { setError((err as Error).message); }
  };
  const revoke = async (id: string) => {
    try { await api(`/api/auth/sessions/${id}/revoke`, { method: 'POST' }); setSessions(sessions.map((s) => (s.id === id ? { ...s, revoked: 1 } : s))); toast('Session revoked', 'success'); } catch (err) { toast((err as Error).message, 'error'); }
  };
  const deleteAccount = async () => {
    if (!window.confirm('Delete your account? This deactivates it permanently.')) return;
    try { await api('/api/auth/account', { method: 'DELETE' }); window.location.href = '/login'; } catch (err) { toast((err as Error).message, 'error'); }
  };

  return (
    <Page title="Profile" subtitle="Your account, sessions and security.">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <h2 className="font-bold">Profile</h2>
          <p className="text-sm text-muted">{user?.email} · Role: {user?.role}</p>
          <form onSubmit={saveProfile} className="mt-3 space-y-3">
            <div><label className="label" htmlFor="dn">Display name</label><input id="dn" className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} /></div>
            <button className="btn-primary" type="submit">Save profile</button>
          </form>
          <h2 className="mt-6 font-bold">Change password</h2>
          <form onSubmit={changePassword} className="mt-3 space-y-3">
            <div><label className="label" htmlFor="cp">Current password</label><input id="cp" type="password" className="input" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required /></div>
            <div><label className="label" htmlFor="np">New password (min 8, upper + lower + digit)</label><input id="np" type="password" className="input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required /></div>
            <button className="btn-primary" type="submit">Change password</button>
          </form>
          {msg && <p className="mt-2 text-sm text-success">{msg}</p>}
          {error && <p role="alert" className="mt-2 text-sm text-danger">{error}</p>}
          <button className="btn-secondary mt-6 text-danger" onClick={deleteAccount}>Delete my account</button>
        </div>
        <div className="card p-4">
          <h2 className="font-bold">Active sessions</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {sessions.map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded-lg border border-line p-2">
                <span>{s.user_agent || 'Unknown client'} · {s.ip || ''} · created {s.created_at}{s.revoked ? ' · revoked' : ''}</span>
                {!s.revoked && <button className="btn-secondary" onClick={() => revoke(s.id)}>Revoke</button>}
              </li>
            ))}
            {sessions.length === 0 && <li className="text-muted">No sessions found.</li>}
          </ul>
        </div>
      </div>
    </Page>
  );
}

export function SettingsPage() {
  const [runtimes, setRuntimes] = useState<{ id: string; name: string; available: boolean; version?: string; installHint: string }[]>([]);
  useEffect(() => { api<{ runtimes: typeof runtimes }>('/api/execute/runtimes').then((d) => setRuntimes(d.runtimes)).catch(() => undefined); }, []);
  return (
    <Page title="Settings" subtitle="Runtime configuration and local environment status.">
      <div className="card p-4">
        <h2 className="font-bold">Language runtimes on this machine</h2>
        <p className="text-sm text-muted">Code runs locally. If a runtime is missing, the platform reports it honestly and shows how to install it — it never pretends code ran.</p>
        <ul className="mt-3 space-y-2">
          {runtimes.map((r) => (
            <li key={r.id} className="rounded-lg border border-line p-3 text-sm">
              <strong>{r.name}</strong> — {r.available ? `✓ Available (${r.version || ''})` : '✗ Not installed'}
              {!r.available && <span className="block text-muted">{r.installHint}</span>}
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}
