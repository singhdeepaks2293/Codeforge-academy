import { useState, type ReactNode } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth, useCan } from '../context/AuthContext';
import { useToast } from './Toast';
import { api } from '../lib/api';

const studentNav = [
  { to: '/', label: 'Dashboard' },
  { to: '/courses', label: 'Explore Courses' },
  { to: '/my-learning', label: 'My Learning' },
  { to: '/paths', label: 'Learning Paths' },
  { to: '/practice', label: 'Practice · DSA' },
  { to: '/projects', label: 'Projects' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/progress', label: 'Progress' },
  { to: '/profile', label: 'Profile' },
  { to: '/settings', label: 'Settings' },
];
const adminNav = [
  { to: '/admin', label: 'Admin Dashboard' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/roles', label: 'Roles & Permissions' },
  { to: '/admin/curriculum', label: 'Course Management' },
  { to: '/admin/submissions', label: 'Submissions' },
  { to: '/admin/audit', label: 'Audit Logs' },
  { to: '/admin/settings', label: 'System Settings' },
];

export function Layout() {
  const { user, logout } = useAuth();
  const canAdmin = useCan('users.read');
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('cf-theme', next ? 'dark' : 'light');
  };

  const doSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/courses?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-navy-900 md:flex">
        <Link to="/" className="flex items-center gap-2 px-5 py-4 text-xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-lg text-white">⌘</span>
          CodeForge <span className="text-brand-600">Academy</span>
        </Link>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
          {studentNav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'}
              className={({ isActive }) => `block rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-brand-50 text-brand-700 dark:bg-navy-800 dark:text-brand-500' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-navy-800'}`}>
              {n.label}
            </NavLink>
          ))}
          {canAdmin && (
            <>
              <div className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">Administration</div>
              {adminNav.map((n) => (
                <NavLink key={n.to} to={n.to}
                  className={({ isActive }) => `block rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-brand-50 text-brand-700 dark:bg-navy-800 dark:text-brand-500' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-navy-800'}`}>
                  {n.label}
                </NavLink>
              ))}
            </>
          )}
        </nav>
        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <div className="px-2 text-sm font-semibold">{user?.displayName}</div>
          <div className="px-2 text-xs text-slate-500">{user?.email} · {user?.role}</div>
          <button className="btn-ghost mt-2 w-full justify-start" onClick={async () => { await logout(); toast('Signed out', 'success'); navigate('/login'); }}>Sign out</button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-navy-900/90">
          <Link to="/" className="text-lg font-bold md:hidden">CodeForge Academy</Link>
          <form onSubmit={doSearch} className="hidden flex-1 sm:block">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses, lessons, DSA problems, projects…"
              className="input max-w-md" aria-label="Search" />
          </form>
          <div className="ml-auto flex items-center gap-2">
            <button className="btn-secondary" onClick={toggleTheme} aria-label="Toggle theme">{dark ? '☀️ Light' : '🌙 Dark'}</button>
            <Link to="/profile" className="btn-secondary">Profile</Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
          <Outlet />
        </main>
        <footer className="border-t border-slate-200 px-4 py-3 text-center text-xs text-slate-500 dark:border-slate-800">
          CodeForge Academy — runs locally. Your code executes on this machine; runtimes are detected, never faked.
        </footer>
      </div>
    </div>
  );
}

export function Page({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}
