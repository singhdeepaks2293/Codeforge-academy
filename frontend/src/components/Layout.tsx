import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useCan } from '../context/AuthContext';
import { useToast } from './Toast';
import { applyTheme, useTheme } from '../lib/theme';
import { APP_VERSION } from '../lib/version';

const SIDEBAR_KEY = 'cf-sidebar-collapsed';
const SIDEBAR_EXPANDED = 210;
const SIDEBAR_COLLAPSED = 68;

interface NavItem { to: string; label: string; icon: string; }

const studentNav: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: '⌂' },
  { to: '/courses', label: 'Explore Courses', icon: '▦' },
  { to: '/my-learning', label: 'My Learning', icon: '✓' },
  { to: '/paths', label: 'Learning Paths', icon: '⤳' },
  { to: '/practice', label: 'Practice · DSA', icon: '⌘' },
  { to: '/projects', label: 'Projects', icon: '▣' },
  { to: '/assessments', label: 'Assessments', icon: '✎' },
  { to: '/achievements', label: 'Achievements', icon: '★' },
  { to: '/progress', label: 'Progress', icon: '▤' },
  { to: '/profile', label: 'Profile', icon: '◉' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
];
const adminNav: NavItem[] = [
  { to: '/admin', label: 'Admin Dashboard', icon: '▤' },
  { to: '/admin/users', label: 'Users', icon: '◉' },
  { to: '/admin/roles', label: 'Roles & Permissions', icon: '⚑' },
  { to: '/admin/curriculum', label: 'Course Management', icon: '▦' },
  { to: '/admin/submissions', label: 'Submissions', icon: '✉' },
  { to: '/admin/audit', label: 'Audit Logs', icon: '≡' },
  { to: '/admin/settings', label: 'System Settings', icon: '⚙' },
];

function readCollapsed(): boolean {
  // No saved preference yet: the narrow icon rail is the default (the
  // reference layout). Expanding to the wide labelled sidebar is a choice,
  // persisted the first time the user toggles it.
  try {
    const v = localStorage.getItem(SIDEBAR_KEY);
    return v === null ? true : v === '1';
  } catch { return true; }
}

export function Layout() {
  const { user, logout } = useAuth();
  const canAdmin = useCan('users.read');
  const theme = useTheme();
  const dark = theme === 'dark';
  const [collapsed, setCollapsed] = useState<boolean>(readCollapsed);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const navRef = useRef<HTMLElement>(null);

  // The sidebar keeps its own scroll position per page otherwise; reset it
  // on navigation so the logo and Collapse button are never scrolled away.
  useEffect(() => {
    if (navRef.current) navRef.current.scrollTop = 0;
  }, [location.pathname]);

  // Header search follows navigation: on /courses it mirrors ?q= (so a
  // shared/searched link shows its query); anywhere else it clears, so a
  // stale query (e.g. "assessment") does not linger after navigating away.
  useEffect(() => {
    if (location.pathname === '/courses') {
      setQ(new URLSearchParams(location.search).get('q') || '');
    } else {
      setQ('');
    }
  }, [location.pathname, location.search]);

  // The lesson workspace and the DSA problem page are full-height multi-panel
  // workspaces: they take the whole content area (no max-width, no padding,
  // no footer) and scroll each panel independently inside the viewport.
  const isWorkspace = /\/courses\/[^/]+\/lessons\//.test(location.pathname)
    || /^\/practice\/[^/]+$/.test(location.pathname);

  const toggleTheme = () => applyTheme(dark ? 'light' : 'dark');
  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    try { localStorage.setItem(SIDEBAR_KEY, next ? '1' : '0'); } catch { /* ignore */ }
  };

  const doSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/courses?q=${encodeURIComponent(q.trim())}`);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      collapsed ? 'justify-center px-0' : ''
    } ${
      isActive
        ? 'bg-accent-soft font-semibold text-accent-600'
        : 'text-ink/75 hover:bg-elevated hover:text-ink'
    }`;

  const renderNav = (items: NavItem[]) => items.map((n) => (
    <NavLink key={n.to} to={n.to} end={n.to === '/'} title={collapsed ? n.label : undefined} className={navLinkClass}>
      <span aria-hidden className="flex h-5 w-5 shrink-0 items-center justify-center text-base leading-none">{n.icon}</span>
      {!collapsed && <span className="truncate">{n.label}</span>}
    </NavLink>
  ));

  return (
    // Viewport-fit shell: exactly viewport height, never scrolls itself.
    // The sidebar and the content column each scroll their own panels.
    <div className="flex h-dvh overflow-hidden bg-base">
      <aside
        aria-label="Main navigation"
        className="hidden min-h-0 shrink-0 flex-col overflow-hidden border-r border-line bg-sidebar transition-[width] duration-200 md:flex"
        style={{ width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED }}
      >
        <Link to="/" className={`flex items-center gap-2 py-4 text-lg font-bold ${collapsed ? 'justify-center px-0' : 'px-4'}`} title={collapsed ? 'CodeForge Academy' : undefined}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-lg text-white">⌘</span>
          {!collapsed && <span className="min-w-0 flex-1 whitespace-normal break-words leading-tight">CodeForge <span className="text-brand-500">Academy</span></span>}
        </Link>
        <nav ref={navRef} className="panel-scroll min-h-0 flex-1 space-y-0.5 overflow-x-hidden px-3 py-2">
          {renderNav(studentNav)}
          {canAdmin && (
            <>
              {!collapsed && <div className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-faint">Administration</div>}
              {collapsed && <div className="mx-1 my-3 border-t border-line" aria-hidden />}
              {renderNav(adminNav)}
            </>
          )}
        </nav>
        <div className="shrink-0 border-t border-line p-3">
          <button
            className="btn-ghost w-full justify-start px-2 py-1.5 text-xs"
            onClick={toggleSidebar}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span aria-hidden className="text-base leading-none">{collapsed ? '»' : '«'}</span>
            {!collapsed && <span>Collapse</span>}
          </button>
          {!collapsed && (
            <>
              <div className="mt-2 px-2 text-sm font-semibold">{user?.displayName}</div>
              <div className="break-all px-2 text-xs leading-snug text-muted" title={user?.email}>{user?.email} · {user?.role}</div>
              <div className="mt-1 px-2 text-[11px] text-faint">v{APP_VERSION}</div>
            </>
          )}
          {collapsed && (
            <div className="mt-2 flex justify-center" title={`${user?.displayName ?? ''} · ${user?.email ?? ''}`}>
              <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-elevated text-sm font-bold text-accent-600">
                {(user?.displayName ?? '?').charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <button className="btn-ghost mt-2 w-full justify-start" onClick={async () => { await logout(); toast('Signed out', 'success'); navigate('/login'); }}>
            <span aria-hidden className="text-base leading-none">↩</span>
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex shrink-0 items-center gap-3 border-b border-line bg-base/90 px-4 py-3 backdrop-blur">
          <Link to="/" className="text-lg font-bold md:hidden">CodeForge <span className="text-brand-500">Academy</span></Link>
          <form onSubmit={doSearch} className="hidden flex-1 sm:block">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses, lessons, DSA problems, projects…"
              className="input max-w-md" aria-label="Search" />
          </form>
          <div className="ml-auto flex items-center gap-2">
            <button className="btn-secondary" onClick={toggleTheme} aria-label="Toggle theme">{dark ? '☀ Light' : '☾ Dark'}</button>
            <Link to="/profile" className="btn-secondary">Profile</Link>
          </div>
        </header>
        <main
          className={
            isWorkspace
              ? 'flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden'
              // Standard pages: this main is the page's own scroll panel.
              : 'panel-scroll min-h-0 min-w-0 flex-1'
          }
        >
          <div className={isWorkspace ? 'flex min-h-0 min-w-0 flex-1 flex-col' : 'mx-auto w-full max-w-6xl px-4 py-6'}>
            <Outlet />
          </div>
        </main>
        {!isWorkspace && (
          <footer className="shrink-0 break-words border-t border-line px-4 py-3 text-center text-xs text-muted">
            CodeForge Academy — runs locally. Your code executes on this machine; runtimes are detected, never faked.
          </footer>
        )}
      </div>
    </div>
  );
}

export function Page({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <h1 className="break-words text-xl font-bold">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      <div className="mt-5 min-w-0">{children}</div>
    </div>
  );
}
