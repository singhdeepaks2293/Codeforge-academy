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

function renderLayout() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <ToastProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Dashboard content</div>} />
          </Route>
        </Routes>
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe('Layout sidebar', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('starts collapsed to the ~68px icon rail with no saved preference', () => {
    renderLayout();
    expect(screen.getByLabelText('Main navigation')).toHaveStyle({ width: '68px' });
    expect(screen.queryByText('Explore Courses')).not.toBeInTheDocument();
    expect(screen.getByTitle('Explore Courses')).toBeInTheDocument();
  });

  it('expands to ~210px labelled and persists the preference', () => {
    renderLayout();
    fireEvent.click(screen.getByLabelText('Expand sidebar'));
    const aside = screen.getByLabelText('Main navigation');
    expect(aside).toHaveStyle({ width: '210px' });
    expect(localStorage.getItem('cf-sidebar-collapsed')).toBe('0');
    expect(screen.getByText('Explore Courses')).toBeInTheDocument();
  });

  it('restores a persisted expanded sidebar on load', () => {
    localStorage.setItem('cf-sidebar-collapsed', '0');
    renderLayout();
    expect(screen.getByLabelText('Main navigation')).toHaveStyle({ width: '210px' });
    fireEvent.click(screen.getByLabelText('Collapse sidebar'));
    expect(screen.getByLabelText('Main navigation')).toHaveStyle({ width: '68px' });
    expect(localStorage.getItem('cf-sidebar-collapsed')).toBe('1');
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

  it('gives the main content its own scroll panel', () => {
    const { container } = renderLayout();
    const main = container.querySelector('main') as HTMLElement;
    expect(main.className).toContain('panel-scroll');
    expect(main.className).toContain('min-h-0');
  });

  it('resets the sidebar scroll position on navigation', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <ToastProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<div>Dashboard content</div>} />
              <Route path="profile" element={<div>Profile content</div>} />
            </Route>
          </Routes>
        </ToastProvider>
      </MemoryRouter>,
    );
    const nav = container.querySelector('nav') as HTMLElement;
    nav.scrollTop = 120;
    fireEvent.click(screen.getByTitle('Profile'));
    expect(nav.scrollTop).toBe(0);
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
