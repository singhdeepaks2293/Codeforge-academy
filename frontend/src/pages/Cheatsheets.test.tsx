import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CheatsheetsPage } from './Cheatsheets';

const { mockApi } = vi.hoisted(() => ({ mockApi: vi.fn() }));

vi.mock('../lib/api', () => ({ api: mockApi }));

const COURSES = [
  { id: 'c-python', slug: 'python', language: 'python', category: 'languages', title: 'Python Programming', description: 'Learn Python.', difficulty: 'All levels', estimated_hours: 55, skills: ['Python', 'Testing'], prerequisites: [], totalLessons: 54, status: 'published' },
  { id: 'c-rust', slug: 'rust', language: 'rust', category: 'languages', title: 'Rust Programming', description: 'Learn Rust.', difficulty: 'All levels', estimated_hours: 55, skills: ['Rust', 'Ownership'], prerequisites: [], totalLessons: 46, status: 'published' },
];

function renderCheatsheets() {
  return render(
    <MemoryRouter>
      <CheatsheetsPage />
    </MemoryRouter>,
  );
}

describe('CheatsheetsPage', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockImplementation((path: string) => {
      if (path === '/api/courses') return Promise.resolve({ courses: COURSES });
      if (path === '/api/execute/runtimes') {
        return Promise.resolve({
          runtimes: [
            { id: 'python', name: 'Python 3', available: true, version: '3.12.0', installHint: 'Install CPython 3.10+.' },
            { id: 'rust', name: 'Rust', available: false, version: '', installHint: 'Install Rust via rustup.' },
          ],
          languageToRuntime: { python: 'python', rust: 'rust' },
        });
      }
      if (path === '/api/courses/python') {
        return Promise.resolve({ modules: [
          { id: 'm1', title: 'Basics', description: '', level: 'beginner', lessons: [{ id: 'l1', slug: 'a', title: 'A' }, { id: 'l2', slug: 'b', title: 'B' }] },
          { id: 'm2', title: 'Functions', description: '', level: 'intermediate', lessons: [{ id: 'l3', slug: 'c', title: 'C' }] },
        ] });
      }
      return Promise.reject(new Error(`unexpected ${path}`));
    });
  });

  it('lists real languages in the rail and real tracks for the selected language', async () => {
    renderCheatsheets();
    await screen.findByText('Python Programming');
    const rail = document.querySelector('aside[aria-label="Filters"]') as HTMLElement;
    expect(rail).toBeInTheDocument();
    expect(rail.textContent).toContain('Python');
    expect(rail.textContent).toContain('Rust');
    expect(screen.getByText(/1 track · 54 lessons/)).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });

  it('shows the live runtime status and install hint for the language', async () => {
    renderCheatsheets();
    await screen.findByText('Python Programming');
    expect(screen.getByText(/Python 3/)).toBeInTheDocument();
    expect(screen.getByText(/Available \(3\.12\.0\)/)).toBeInTheDocument();
  });

  it('shows the real syllabus outline from the first track', async () => {
    renderCheatsheets();
    await screen.findByText('Python Programming');
    expect(await screen.findByText('Basics')).toBeInTheDocument();
    expect(screen.getByText('Functions')).toBeInTheDocument();
    expect(screen.getByText(/2 lessons/)).toBeInTheDocument();
  });

  it('switching language switches the runtime card to real data', async () => {
    renderCheatsheets();
    await screen.findByText('Python Programming');
    fireEvent.click(screen.getByRole('button', { name: /Rust/ }));
    expect(await screen.findByText('Rust Programming')).toBeInTheDocument();
    expect(screen.getByText(/Not installed/)).toBeInTheDocument();
    expect(screen.getByText(/Install Rust via rustup/)).toBeInTheDocument();
  });
});
