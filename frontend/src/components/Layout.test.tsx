import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { ToastProvider } from './Toast';

const { mockLogout } = vi.hoisted(() => ({ mockLogout: vi.fn(async () => undefined) }));

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '1', email: 'test@example.com', displayName: 'Test Learner', role: 'learner', status: 'active' },
    permissions: [],
    loading: false,
    refresh: async () => {},
    logout: mockLogout,
  }),
  useCan: () => false,
}));

function renderLayout(initialEntries: string[] = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <ToastProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Dashboard content</div>} />
            <Route path="courses" element={<div>Courses content</div>} />
            <Route path="courses/:slug/lessons/:lessonId" element={<div>Lesson workspace</div>} />
            <Route path="practice/:slug" element={<div>DSA workspace</div>} />
            <Route path="projects/:slug" element={<div>Project workspace</div>} />
          </Route>
        </Routes>
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe('Layout top header nav (no sidebar)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('has no persistent left sidebar', () => {
    renderLayout();
    // The header <nav> is the only navigation; there is no <aside> at all.
    expect(document.querySelector('aside')).toBeNull();
    expect(screen.queryByLabelText('Expand sidebar')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Collapse sidebar')).not.toBeInTheDocument();
    expect(localStorage.getItem('cf-sidebar-collapsed')).toBeNull();
  });

  it('shows the header nav links: Catalog, My Home, Paths, Practice, Projects, Assessments', () => {
    renderLayout();
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
    for (const [label, href] of [
      ['Catalog', '/courses'], ['My Home', '/'], ['Paths', '/paths'],
      ['Practice', '/practice'], ['Projects', '/projects'], ['Assessments', '/assessments'],
    ] as const) {
      const link = screen.getByRole('link', { name: label });
      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe(href);
    }
  });

  it('shows the version in the footer on standard pages', () => {
    renderLayout();
    expect(screen.getByText(/CodeForge Academy v1\.1\.0/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
    expect(screen.getByRole('link', { name: 'Cheatsheets' })).toHaveAttribute('href', '/cheatsheets');
  });

  it('shows the avatar linking to the profile', () => {
    renderLayout();
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('href', '/profile');
  });
});

describe('Layout workspace routes render full-bleed', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it.each([
    ['/courses/python/lessons/lesson-1', 'Lesson workspace'],
    ['/practice/two-sum', 'DSA workspace'],
    ['/projects/cli-calculator', 'Project workspace'],
  ])('renders %s with no header, footer or nav', (path, content) => {
    renderLayout([path]);
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.queryByRole('banner')).toBeNull();
    expect(screen.queryByRole('contentinfo')).toBeNull();
    expect(screen.queryByRole('navigation', { name: 'Main navigation' })).toBeNull();
  });

  it('keeps the header and footer on a standard page', () => {
    renderLayout(['/courses']);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('Courses content')).toBeInTheDocument();
  });
});

describe('Layout viewport-fit shell', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('is exactly viewport height and never scrolls at page level', () => {
    const { container } = renderLayout();
    const shell = container.firstChild as HTMLElement;
    expect(shell.className).toContain('h-dvh');
    expect(shell.className).toContain('overflow-hidden');
  });

  it('gives the main content its own scroll panel and centres it at ~1100px', () => {
    const { container } = renderLayout();
    const main = container.querySelector('main') as HTMLElement;
    expect(main.className).toContain('panel-scroll');
    expect(main.className).toContain('min-h-0');
    const inner = main.firstChild as HTMLElement;
    expect(inner.className).toContain('max-w-[1100px]');
  });
});

describe('Layout header search', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('mirrors ?q= on /courses and clears on navigation away', () => {
    renderLayout(['/courses?q=python']);
    const search = screen.getByLabelText('Search') as HTMLInputElement;
    expect(search.value).toBe('python');
    fireEvent.click(screen.getByRole('link', { name: 'My Home' }));
    expect((screen.getByLabelText('Search') as HTMLInputElement).value).toBe('');
  });
});

describe('Layout theme toggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('toggles dark/light and persists the choice', () => {
    renderLayout();
    // Default theme is dark, so the button offers light.
    expect(screen.getByLabelText('Toggle theme')).toHaveTextContent('Light');
    fireEvent.click(screen.getByLabelText('Toggle theme'));
    expect(localStorage.getItem('cf-theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByLabelText('Toggle theme')).toHaveTextContent('Dark');
    fireEvent.click(screen.getByLabelText('Toggle theme'));
    expect(localStorage.getItem('cf-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('starts in light mode when light was saved', () => {
    localStorage.setItem('cf-theme', 'light');
    renderLayout();
    expect(screen.getByLabelText('Toggle theme')).toHaveTextContent('Dark');
  });
});
