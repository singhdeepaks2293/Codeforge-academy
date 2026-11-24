import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../lib/api';
import { fetchRuntimes, installRuntime, canInstall, kindLabel, provisioningStatusText, type RuntimeInfo } from '../lib/provisioning';
import { useToast } from '../components/Toast';
import { Page } from '../components/Layout';

interface AdminUser { id: string; email: string; displayName: string; role: string; status: string; createdAt: string; lastLoginAt: string | null; }

export function AdminDashboardPage() {
  const [stats, setStats] = useState<{ users: number; activeToday: number; lessons: number; submissions: number; dsaSolved: number } | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    api<{ stats: typeof stats }>('/api/admin/stats').then((d) => setStats(d.stats)).catch((e) => setError(e.message));
  }, []);
  return (
    <Page title="Admin Dashboard" subtitle="Platform health at a glance.">
      {error && <p role="alert" className="text-danger">{error}</p>}
      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Object.entries({ Users: stats.users, 'Active today': stats.activeToday, Lessons: stats.lessons, Submissions: stats.submissions, 'DSA solved': stats.dsaSolved }).map(([k, v]) => (
            <div key={k} className="card p-4"><div className="text-sm text-muted">{k}</div><div className="text-3xl font-bold">{v}</div></div>
          ))}
        </div>
      )}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Link className="card p-4 hover:shadow-md" to="/admin/users"><h2 className="font-bold">Users & IAM →</h2><p className="text-sm text-muted">Search, create, suspend, assign roles.</p></Link>
        <Link className="card p-4 hover:shadow-md" to="/admin/curriculum"><h2 className="font-bold">Course Management →</h2><p className="text-sm text-muted">Create courses and modules, manage lessons.</p></Link>
        <Link className="card p-4 hover:shadow-md" to="/admin/runtimes"><h2 className="font-bold">Runtimes &amp; Provisioning →</h2><p className="text-sm text-muted">Which languages are ready, installing, or need a manual install.</p></Link>
        <Link className="card p-4 hover:shadow-md" to="/admin/audit"><h2 className="font-bold">Audit Logs →</h2><p className="text-sm text-muted">Every sensitive action, with actor and result.</p></Link>
      </div>
    </Page>
  );
}

export function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [q, setQ] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [newRole, setNewRole] = useState('student');
  const toast = useToast();

  const load = () => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (role) params.set('role', role);
    api<{ users: AdminUser[] }>(`/api/admin/users?${params}`).then((d) => setUsers(d.users)).catch((e) => setError(e.message));
  };
  useEffect(() => { load(); }, [q, role]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api('/api/admin/users', { method: 'POST', body: JSON.stringify({ email, password, displayName, role: newRole }) });
      toast('User created', 'success');
      setEmail(''); setPassword(''); setDisplayName('');
      load();
    } catch (err) { toast((err as Error).message, 'error'); }
  };
  const setRoleFor = async (u: AdminUser, r: string) => {
    try { await api(`/api/admin/users/${u.id}`, { method: 'PATCH', body: JSON.stringify({ role: r }) }); toast(`Role updated to ${r}`, 'success'); load(); } catch (err) { toast((err as Error).message, 'error'); }
  };
  const setStatus = async (u: AdminUser, s: string) => {
    try { await api(`/api/admin/users/${u.id}`, { method: 'PATCH', body: JSON.stringify({ status: s }) }); toast(`Account ${s}`, 'success'); load(); } catch (err) { toast((err as Error).message, 'error'); }
  };

  return (
    <Page title="User Management" subtitle="Search, filter, create users, assign roles, suspend or activate accounts.">
      {error && <p role="alert" className="text-danger">{error}</p>}
      <div className="mb-4 flex flex-wrap gap-2">
        <input className="input max-w-sm" placeholder="Search by email or name…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search users" />
        <select className="input !w-auto" value={role} onChange={(e) => setRole(e.target.value)} aria-label="Filter by role">
          <option value="">All roles</option><option>student</option><option>instructor</option><option>admin</option><option>super-admin</option>
        </select>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left"><th className="p-3">User</th><th className="p-3">Role</th><th className="p-3">Status</th><th className="p-3">Last login</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-3"><div className="font-semibold">{u.displayName}</div><div className="text-xs text-muted">{u.email}</div></td>
                <td className="p-3">
                  <select className="input !w-auto" value={u.role} onChange={(e) => setRoleFor(u, e.target.value)} aria-label={`Role for ${u.email}`}>
                    <option>student</option><option>instructor</option><option>admin</option><option>super-admin</option>
                  </select>
                </td>
                <td className="p-3">{u.status}</td>
                <td className="p-3 text-xs">{u.lastLoginAt || 'never'}</td>
                <td className="p-3">
                  {u.status === 'active'
                    ? <button className="btn-secondary" onClick={() => setStatus(u, 'suspended')}>Suspend</button>
                    : <button className="btn-secondary" onClick={() => setStatus(u, 'active')}>Activate</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p className="p-4 text-muted">No users match.</p>}
      </div>
      <div className="card mt-6 p-4">
        <h2 className="font-bold">Create user</h2>
        <form onSubmit={create} className="mt-3 grid gap-3 md:grid-cols-4">
          <input className="input" placeholder="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password (min 8)" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <select className="input" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
            <option>student</option><option>instructor</option><option>admin</option><option>super-admin</option>
          </select>
          <button className="btn-primary md:col-span-4" type="submit">Create user</button>
        </form>
      </div>
    </Page>
  );
}

export function AdminRolesPage() {
  const [roles, setRoles] = useState<{ id: string; name: string; description: string; is_system: number; permissions: string[] }[]>([]);
  const [allPermissions, setAllPermissions] = useState<{ name: string; description: string }[]>([]);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();
  const load = () => {
    api<{ roles: typeof roles; allPermissions: typeof allPermissions }>('/api/admin/roles').then((d) => { setRoles(d.roles); setAllPermissions(d.allPermissions); }).catch((e) => setError(e.message));
  };
  useEffect(() => { load(); }, []);
  const toggle = async (role: { id: string; permissions: string[] }, perm: string) => {
    const next = role.permissions.includes(perm) ? role.permissions.filter((p) => p !== perm) : [...role.permissions, perm];
    try { await api(`/api/admin/roles/${role.id}`, { method: 'PATCH', body: JSON.stringify({ permissions: next }) }); toast('Permissions updated', 'success'); load(); } catch (err) { toast((err as Error).message, 'error'); }
  };
  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await api('/api/admin/roles', { method: 'POST', body: JSON.stringify({ name, description, permissions: ['courses.read'] }) }); toast('Role created', 'success'); setName(''); setDescription(''); load(); } catch (err) { toast((err as Error).message, 'error'); }
  };
  const remove = async (id: string) => {
    if (!window.confirm('Delete this role?')) return;
    try { await api(`/api/admin/roles/${id}`, { method: 'DELETE' }); toast('Role deleted', 'success'); load(); } catch (err) { toast((err as Error).message, 'error'); }
  };
  return (
    <Page title="Roles & Permissions" subtitle="Permission-based access control. System roles cannot be deleted; roles assigned to users cannot be deleted.">
      {error && <p role="alert" className="text-danger">{error}</p>}
      <div className="space-y-4">
        {roles.map((r) => (
          <div key={r.id} className="card p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">{r.name} {r.is_system ? <span className="badge bg-elevated text-muted">system</span> : ''}</h2>
              {!r.is_system && <button className="btn-secondary" onClick={() => remove(r.id)}>Delete role</button>}
            </div>
            <p className="text-sm text-muted">{r.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {allPermissions.map((p) => (
                <label key={p.name} className="flex items-center gap-1 rounded border border-line px-2 py-1 text-xs" title={p.description}>
                  <input type="checkbox" checked={r.permissions.includes(p.name)} onChange={() => toggle(r, p.name)} />
                  {p.name}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="card mt-6 p-4">
        <h2 className="font-bold">Create role</h2>
        <form onSubmit={create} className="mt-3 flex flex-wrap gap-2">
          <input className="input max-w-xs" placeholder="Role name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="input max-w-sm" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button className="btn-primary" type="submit">Create role</button>
        </form>
      </div>
    </Page>
  );
}

export function AdminCurriculumPage() {
  const [courses, setCourses] = useState<{ id: string; slug: string; title: string; language: string; status: string }[]>([]);
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('python');
  const [error, setError] = useState('');
  const toast = useToast();
  const load = () => api<{ courses: typeof courses }>('/api/courses').then((d) => setCourses(d.courses)).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);
  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await api('/api/courses', { method: 'POST', body: JSON.stringify({ slug, title, language }) }); toast('Course created as draft', 'success'); setSlug(''); setTitle(''); load(); } catch (err) { toast((err as Error).message, 'error'); }
  };
  const setStatus = async (c: { slug: string }, status: string) => {
    try { await api(`/api/courses/${c.slug}`, { method: 'PATCH', body: JSON.stringify({ status }) }); toast(`Course ${status}`, 'success'); load(); } catch (err) { toast((err as Error).message, 'error'); }
  };
  const remove = async (c: { slug: string; title: string }) => {
    if (!window.confirm(`Delete course "${c.title}" and all its lessons?`)) return;
    try { await api(`/api/courses/${c.slug}`, { method: 'DELETE' }); toast('Course deleted', 'success'); load(); } catch (err) { toast((err as Error).message, 'error'); }
  };
  return (
    <Page title="Course & Curriculum Management" subtitle="Create courses (draft), publish/unpublish, delete. Lessons and exercises are managed per course; seeded curriculum is versioned in the repository.">
      {error && <p role="alert" className="text-danger">{error}</p>}
      <div className="space-y-2">
        {courses.map((c) => (
          <div key={c.id} className="card flex flex-wrap items-center justify-between gap-2 p-4">
            <div><span className="font-semibold">{c.title}</span> <span className="text-xs text-muted">({c.language} · {c.status})</span></div>
            <div className="flex gap-2">
              <button className="btn-secondary" onClick={() => setStatus(c, c.status === 'published' ? 'draft' : 'published')}>{c.status === 'published' ? 'Unpublish' : 'Publish'}</button>
              <button className="btn-secondary text-danger" onClick={() => remove(c)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="card mt-6 p-4">
        <h2 className="font-bold">Create course</h2>
        <form onSubmit={create} className="mt-3 flex flex-wrap gap-2">
          <input className="input max-w-xs" placeholder="Slug (e.g. kotlin)" value={slug} onChange={(e) => setSlug(e.target.value)} required />
          <input className="input max-w-sm" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <select className="input !w-auto" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="python">Python</option><option value="c">C</option><option value="cpp">C++</option>
            <option value="typescript">TypeScript</option><option value="react">React</option>
            <option value="rust">Rust</option><option value="go">Go</option>
          </select>
          <button className="btn-primary" type="submit">Create draft course</button>
        </form>
      </div>
    </Page>
  );
}

export function AdminSubmissionsPage() {
  const [subs, setSubs] = useState<{ id: string; user_id: string; project_id: string; status: string; notes: string; created_at: string }[]>([]);
  const [error, setError] = useState('');
  const toast = useToast();
  const load = () => api<{ submissions: typeof subs }>('/api/admin/submissions').then((d) => setSubs(d.submissions)).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);
  const review = async (id: string, status: string) => {
    const notes = window.prompt('Review notes for the learner:') || '';
    try { await api(`/api/admin/submissions/${id}/review`, { method: 'POST', body: JSON.stringify({ status, reviewNotes: notes }) }); toast('Review saved', 'success'); load(); } catch (err) { toast((err as Error).message, 'error'); }
  };
  return (
    <Page title="Project Submissions" subtitle="Review learner project submissions and give feedback.">
      {error && <p role="alert" className="text-danger">{error}</p>}
      {subs.length === 0 && <div className="card p-6 text-center text-muted">No project submissions yet.</div>}
      <div className="space-y-2">
        {subs.map((s) => (
          <div key={s.id} className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span><strong>{s.project_id}</strong> · by {s.user_id} · {s.created_at} · <span className="badge bg-elevated text-muted">{s.status}</span></span>
              <span className="flex gap-2">
                <button className="btn-primary" onClick={() => review(s.id, 'approved')}>Approve</button>
                <button className="btn-secondary" onClick={() => review(s.id, 'needs-changes')}>Request changes</button>
              </span>
            </div>
            {s.notes && <p className="mt-2 text-sm">{s.notes}</p>}
          </div>
        ))}
      </div>
    </Page>
  );
}

export function AdminAuditPage() {
  const [logs, setLogs] = useState<{ id: number; actor_email: string; action: string; target_type: string; target_id: string; result: string; created_at: string; metadata: string }[]>([]);
  const [error, setError] = useState('');
  const [action, setAction] = useState('');
  useEffect(() => {
    const params = action ? `?action=${encodeURIComponent(action)}` : '';
    api<{ logs: typeof logs }>(`/api/admin/audit-logs${params}`).then((d) => setLogs(d.logs)).catch((e) => setError(e.message));
  }, [action]);
  return (
    <Page title="Audit Logs" subtitle="Sensitive actions with actor, action, timestamp, target and result.">
      {error && <p role="alert" className="text-danger">{error}</p>}
      <input className="input mb-4 max-w-sm" placeholder="Filter by action (e.g. auth.login_failed)" value={action} onChange={(e) => setAction(e.target.value)} />
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left"><th className="p-3">Time</th><th className="p-3">Actor</th><th className="p-3">Action</th><th className="p-3">Target</th><th className="p-3">Result</th></tr></thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id} className="border-b">
                <td className="p-3 text-xs">{l.created_at}</td>
                <td className="p-3">{l.actor_email || '—'}</td>
                <td className="p-3 font-mono text-xs">{l.action}</td>
                <td className="p-3 text-xs">{l.target_type}:{l.target_id}</td>
                <td className="p-3">{l.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && <p className="p-4 text-muted">No audit entries match.</p>}
      </div>
    </Page>
  );
}

export function AdminSettingsPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const toast = useToast();
  const load = () => api<{ config: Record<string, string> }>('/api/admin/config').then((d) => setConfig(d.config)).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await api('/api/admin/config', { method: 'PATCH', body: JSON.stringify(config) }); toast('Settings saved', 'success'); } catch (err) { toast((err as Error).message, 'error'); }
  };
  const labels: Record<string, string> = {
    mastery_pass_percent: 'Mastery pass % (default 80)', dsa_requires_mastery: 'DSA requires a passed mastery assessment (true/false)',
    projects_require_dsa: 'Projects require DSA progress (true/false)', run_timeout_ms: 'Code run timeout (ms)',
    max_failed_logins: 'Failed logins before lockout', lockout_minutes: 'Lockout duration (minutes)',
    xp_per_lesson: 'XP per lesson', xp_per_exercise: 'XP per exercise', xp_per_dsa: 'XP per DSA problem',
    xp_per_project_milestone: 'XP per project milestone', daily_goal_xp: 'Daily goal XP',
  };
  return (
    <Page title="System Settings" subtitle="Runtime configuration. Changes are audit-logged.">
      {error && <p role="alert" className="text-danger">{error}</p>}
      <form onSubmit={save} className="card space-y-3 p-4">
        {Object.entries(config).map(([k, v]) => (
          <div key={k}>
            <label className="label" htmlFor={k}>{labels[k] || k}</label>
            <input id={k} className="input max-w-sm" value={v} onChange={(e) => setConfig({ ...config, [k]: e.target.value })} />
          </div>
        ))}
        <button className="btn-primary" type="submit">Save settings</button>
      </form>
    </Page>
  );
}

export function AdminRuntimesPage() {
  const [runtimes, setRuntimes] = useState<RuntimeInfo[]>([]);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const toast = useToast();
  const load = useCallback(() => {
    fetchRuntimes().then((d) => setRuntimes(d.runtimes)).catch((e) => setError(e.message));
  }, []);
  useEffect(() => { load(); }, [load]);
  const anyInstalling = runtimes.some((r) => r.provisioning?.state === 'installing');
  useEffect(() => {
    if (!anyInstalling) return;
    const t = window.setInterval(load, 5000);
    return () => window.clearInterval(t);
  }, [anyInstalling, load]);
  const install = async (rt: RuntimeInfo) => {
    setBusyId(rt.id);
    try {
      await installRuntime(rt.id);
      toast(`Installing ${rt.name} in the background.`, 'info');
      load();
    } catch (e) { toast((e as Error).message, 'error'); }
    finally { setBusyId(null); }
  };
  return (
    <Page title="Runtimes & Provisioning" subtitle="Every language the catalogue needs, and how it gets onto this machine. Baked-in runtimes ship in the Docker image; auto-installable ones are fetched in the background when a learner starts a course; manual ones need the steps shown.">
      {error && <p role="alert" className="text-danger">{error}</p>}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="px-3 py-2">Runtime</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Provisioning</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {runtimes.map((rt) => {
              const st = provisioningStatusText(rt);
              return (
                <tr key={rt.id} className="border-b border-line align-top last:border-0">
                  <td className="px-3 py-2">
                    <strong>{rt.name}</strong>
                    <div className="text-xs text-muted">{rt.id}{rt.version ? ` · ${rt.version}` : ''}</div>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`badge ${st.tone === 'ok' ? 'bg-success-soft text-success' : st.tone === 'busy' || st.tone === 'warn' ? 'bg-warning-soft text-warning' : st.tone === 'muted' ? 'bg-elevated text-muted' : 'bg-danger-soft text-danger'}`}>{st.text}</span>
                    {rt.provisioning?.reason && <div className="mt-1 text-xs text-muted">{rt.provisioning.reason}</div>}
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-xs">{rt.provisioning?.state ?? 'unknown'}</span>
                    {rt.provisioning?.guidance && <div className="mt-1 max-w-md text-xs text-muted">{rt.provisioning.guidance}</div>}
                    {!rt.provisioning?.guidance && !rt.available && <div className="mt-1 max-w-md text-xs text-muted">{rt.installHint}</div>}
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {rt.provisioning ? kindLabel(rt.provisioning.kind) : '—'}
                    {rt.provisioning?.dockerBaked && <div className="text-muted">in Docker image</div>}
                  </td>
                  <td className="px-3 py-2">
                    {canInstall(rt) && (
                      <button className="btn-secondary px-2 py-1 text-xs" onClick={() => install(rt)} disabled={busyId === rt.id}>
                        {busyId === rt.id ? 'Starting…' : `Install ${rt.name}`}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {runtimes.length === 0 && !error && <p className="p-4 text-sm text-muted">Loading runtimes…</p>}
      </div>
      <button className="btn-secondary mt-3" onClick={load}>Refresh</button>
    </Page>
  );
}

export function AdminRootRedirect() {
  const location = useLocation();
  void location;
  return <AdminDashboardPage />;
}
