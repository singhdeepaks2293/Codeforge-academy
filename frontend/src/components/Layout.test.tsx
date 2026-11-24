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

  it('starts expanded (~210px) with no saved preference', () => {
    renderLayout();
    expect(screen.getByLabelText('Main navigation')).toHaveStyle({ width: '210px' });
    expect(screen.getByText('Explore Courses')).toBeInTheDocument();
  });

  it('collapses to ~68px icons-only and persists the preference', () => {
    renderLayout();
    fireEvent.click(screen.getByLabelText('Collapse sidebar'));
    const aside = screen.getByLabelText('Main navigation');
    expect(aside).toHaveStyle({ width: '68px' });
    expect(localStorage.getItem('cf-sidebar-collapsed')).toBe('1');
    // Labels are hidden when collapsed; the icon link still carries a tooltip.
    expect(screen.queryByText('Explore Courses')).not.toBeInTheDocument();
    expect(screen.getByTitle('Explore Courses')).toBeInTheDocument();
  });

  it('restores a persisted collapsed sidebar on load', () => {
    localStorage.setItem('cf-sidebar-collapsed', '1');
    renderLayout();
    expect(screen.getByLabelText('Main navigation')).toHaveStyle({ width: '68px' });
    fireEvent.click(screen.getByLabelText('Expand sidebar'));
    expect(screen.getByLabelText('Main navigation')).toHaveStyle({ width: '210px' });
    expect(localStorage.getItem('cf-sidebar-collapsed')).toBe('0');
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
