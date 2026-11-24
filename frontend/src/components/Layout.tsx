import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useCan } from '../context/AuthContext';
import { useToast } from './Toast';
import { applyTheme, useTheme } from '../lib/theme';
import { APP_VERSION } from '../lib/version';

interface NavItem { to: string; label: string; }

const headerNav: NavItem[] = [
  { to: '/courses', label: 'Catalog' },
  { to: '/', label: 'My Home' },
  { to: '/paths', label: 'Paths' },
  { to: '/practice', label: 'Practice' },
  { to: '/projects', label: 'Projects' },
  { to: '/assessments', label: 'Assessments' },
];

// Extra destinations that do not fit the main nav row: the locked-feature
// equivalents (all free in CodeForge), Docs and Cheatsheets.
const moreNav: NavItem[] = [
  { to: '/features/skill-paths', label: 'Skill Paths' },
  { to: '/features/careers', label: 'Career Paths' },
  { to: '/features/quizzes', label: 'Quizzes' },
  { to: '/features/challenges', label: 'Challenges' },
  { to: '/features/interview', label: 'Interview Prep' },
  { to: '/features/certificates', label: 'Certificates' },
  { to: '/features/bootcamps', label: 'Bootcamps' },
  { to: '/features/coach', label: 'Coach' },
  { to: '/features/builder', label: 'AI Builder' },
  { to: '/docs', label: 'Docs' },
  { to: '/cheatsheets', label: 'Cheatsheets' },
];

/**
 * Hatched progress bar with a yellow % pill.
 * Used on course cards, the dashboard and the course page — one shared
 * component so the progress treatment stays identical everywhere.
 */
export function HatchedProgress({ percent, label }: { percent: number; label?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 min-w-0 flex-1 rounded bg-line" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label ?? `Progress ${pct}%`}>
        <div className="progress-hatch h-2 rounded bg-accent-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="pill-yellow shrink-0" data-testid="progress-pill">{pct}%</span>
    </div>
  );
}

/**
 * Index-page layout: a narrow left filter rail + the content column.
 * The rail is for filters/navigation only — never for the main nav, which
 * lives in the top header. On narrow screens the rail stacks above the
 * content.
 */
export function IndexLayout({ rail, children }: { rail: ReactNode; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-start">
      <aside aria-label="Filters" className="w-full shrink-0 md:w-56">
        <div className="card p-4 md:sticky md:top-0">{rail}</div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function Layout() {
  const { user, logout } = useAuth();
  const canAdmin = useCan('users.read');
  const theme = useTheme();
  const dark = theme === 'dark';
  const [q, setQ] = useState('');
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  // The More menu closes on navigation and on Escape.
  useEffect(() => { setMoreOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMoreOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [moreOpen]);

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

  // Workspaces take the whole viewport: the lesson workspace, the DSA
  // problem page and the project workspace render full-bleed — no header,
  // no footer, no sidebar, just the workspace itself (Outlet only).
  const isWorkspace = /\/courses\/[^/]+\/lessons\//.test(location.pathname)
    || /^\/practice\/[^/]+$/.test(location.pathname)
    || /^\/projects\/[^/]+$/.test(location.pathname);

  const toggleTheme = () => applyTheme(dark ? 'light' : 'dark');

  const doSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/courses?q=${encodeURIComponent(q.trim())}`);
  };

  const headerLinkClass = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-accent-soft font-semibold text-accent-600'
        : 'text-ink/75 hover:bg-elevated hover:text-ink'
    }`;

  if (isWorkspace) {
    return (
      <div className="flex h-dvh flex-col overflow-hidden bg-base">
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }

  return (
    // Viewport-fit shell: exactly viewport height, never scrolls itself.
    // The content column is the page's own scroll panel.
    <div className="flex h-dvh flex-col overflow-hidden bg-base">
      <header className="sticky top-0 z-40 flex shrink-0 items-center gap-3 border-b border-line bg-base/90 px-4 py-3 backdrop-blur">
        <Link to="/" className="flex shrink-0 items-center gap-2 text-lg font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-lg text-white">⌘</span>
          <span className="hidden lg:inline">CodeForge <span className="text-brand-500">Academy</span></span>
        </Link>
        <nav aria-label="Main navigation" className="panel-scroll-x flex min-w-0 flex-1 items-center gap-0.5">
          {headerNav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={headerLinkClass}>{n.label}</NavLink>
          ))}
          {canAdmin && <NavLink to="/admin" className={headerLinkClass}>Admin</NavLink>}
        </nav>
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            aria-haspopup="true"
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-ink/75 transition-colors duration-200 hover:bg-elevated hover:text-ink"
          >
            More ▾
          </button>
          {moreOpen && (
            <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-line bg-surface p-1 shadow-lg" role="menu" aria-label="More sections">
              {moreNav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setMoreOpen(false)} role="menuitem"
                  className="block rounded-md px-3 py-2 text-sm text-ink/85 hover:bg-elevated hover:text-ink">
                  {n.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        <form onSubmit={doSearch} className="hidden shrink-0 sm:block">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses…"
            className="input !w-52 lg:!w-64" aria-label="Search" />
        </form>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button className="btn-secondary" onClick={toggleTheme} aria-label="Toggle theme">{dark ? '☀ Light' : '☾ Dark'}</button>
          <Link to="/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-elevated text-sm font-bold text-accent-600" title={`${user?.displayName ?? ''} · ${user?.email ?? ''}`} aria-label="Profile">
            {(user?.displayName ?? '?').charAt(0).toUpperCase()}
          </Link>
          <button className="btn-ghost px-2" onClick={async () => { await logout(); toast('Signed out', 'success'); navigate('/login'); }} aria-label="Sign out" title="Sign out">
            <span aria-hidden className="text-base leading-none">↩</span>
          </button>
        </div>
      </header>
      <main className="panel-scroll min-h-0 min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[1100px] px-4 py-6">
          <Outlet />
        </div>
      </main>
      <footer className="shrink-0 border-t border-line px-4 py-3 text-center text-xs text-muted">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link className="hover:text-ink" to="/docs">Docs</Link>
          <Link className="hover:text-ink" to="/cheatsheets">Cheatsheets</Link>
          <Link className="hover:text-ink" to="/achievements">Achievements</Link>
          <Link className="hover:text-ink" to="/progress">Progress</Link>
          <Link className="hover:text-ink" to="/settings">Settings</Link>
        </div>
        <p className="mt-1">
          CodeForge Academy v{APP_VERSION} — runs locally. Your code executes on this machine; runtimes are detected, never faked.
        </p>
      </footer>
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
