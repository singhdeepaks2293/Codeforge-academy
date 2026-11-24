// Lesson workspace: Lesson/Examples/Quiz tabs, Lesson N/M counter,
// Previous/Next at the bottom, always-visible file tabs, Input (not
// Terminal) output tab, and the editor inside the viewport-fit shell.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LessonWorkspacePage } from './LessonWorkspace';
import { ToastProvider } from '../components/Toast';

const { mockApi } = vi.hoisted(() => ({ mockApi: vi.fn() }));

vi.mock('../lib/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../lib/api')>();
  return { ...actual, api: mockApi };
});

vi.mock('../lib/provisioning', () => ({
  fetchRuntimes: async () => ({ runtimes: [] }),
  installRuntime: async () => undefined,
  provisioningStatusText: () => null,
  canInstall: () => false,
  kindLabel: (k: string) => k,
}));

vi.mock('../components/MonacoEditor', () => ({
  CodeEditor: ({ value, ariaLabel }: { value: string; ariaLabel?: string }) => (
    <div data-testid="code-editor" aria-label={ariaLabel}>{value}</div>
  ),
}));

const lesson = {
  id: 'lesson-1', slug: 'what-is-rust', title: 'What is Rust?',
  objectives: ['Understand ownership'],
  introduction: 'Rust is a systems language.',
  concept: 'Ownership is the core idea.',
  syntax: 'let x = 5;',
  analogy: 'Ownership is like lending a book.',
  exampleCode: 'fn main() { println!("hi"); }',
  exampleLanguage: 'rust',
  walkthrough: ['Step one'],
  commonMistakes: ['Forgetting mut'],
  debuggingExercise: { prompt: 'Fix the bug.', buggyCode: 'let x = 1; x = 2;', fixedCode: 'let mut x = 1; x = 2;', explanation: 'mut needed.' },
  miniChallenge: 'Write a program.',
  summary: 'Ownership rules.',
  knowledgeCheck: [{ question: 'What is ownership?', options: ['A', 'B'], answer: 0, explanation: 'It is A.' }],
};

const exercises = [
  { id: 'ex-1', title: 'Hello Rust', type: 'code', instructions: 'Print hello.', starterCode: 'fn main() {}', tests: [], hints: [], solutionExplanation: '' },
  { id: 'ex-2', title: 'Variables', type: 'code', instructions: 'Use a variable.', starterCode: 'let x = 1;', tests: [], hints: [], solutionExplanation: '' },
];

function renderWorkspace() {
  return render(
    <MemoryRouter initialEntries={['/courses/rust/lessons/lesson-1']}>
      <ToastProvider>
        <Routes>
          <Route path="/courses/:slug/lessons/:lessonId" element={<LessonWorkspacePage />} />
        </Routes>
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe('LessonWorkspacePage reference layout', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockImplementation((url: string) => {
      if (url.includes('/lessons/')) return Promise.resolve({ lesson, exercises });
      return Promise.resolve({
        course: {},
        modules: [{
          id: 'm1', title: 'Module 1',
          lessons: Array.from({ length: 12 }, (_, i) => ({ id: `lesson-${i + 1}`, title: `Lesson ${i + 1}` })),
        }],
      });
    });
  });

  it('shows the Lesson N/M counter and the Lesson/Examples/Quiz tabs', async () => {
    renderWorkspace();
    expect(await screen.findByText('Lesson 1 of 12')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Lesson' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Examples' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Quiz' })).toBeInTheDocument();
  });

  it('switches lesson-panel tabs: Examples shows the example, Quiz shows the check', async () => {
    renderWorkspace();
    await screen.findByText('Lesson 1 of 12');
    expect(screen.getByText('Understand ownership')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Examples' }));
    expect(await screen.findByText('Fix the bug.')).toBeInTheDocument();
    expect(screen.queryByText('Understand ownership')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Quiz' }));
    expect(await screen.findByText(/What is ownership\?/)).toBeInTheDocument();
  });

  it('puts Previous/Next at the bottom (Next only on the first lesson)', async () => {
    renderWorkspace();
    await screen.findByText('Lesson 1 of 12');
    expect(screen.getByRole('link', { name: /Next/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Previous/ })).not.toBeInTheDocument();
    expect(screen.getByText('Next →').closest('div')?.className).toContain('border-t');
  });

  it('always shows real file tabs, including an Example tab', async () => {
    renderWorkspace();
    await screen.findByText('Lesson 1 of 12');
    const tablist = screen.getByRole('tablist', { name: 'Editor files' });
    expect(tablist).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Hello Rust/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Variables/ })).toBeInTheDocument();
    const { getByRole } = within(tablist);
    expect(getByRole('tab', { name: '▤ Example' })).toBeInTheDocument();
    fireEvent.click(getByRole('tab', { name: '▤ Example' }));
    expect(screen.getByTestId('code-editor')).toHaveTextContent('fn main() { println!("hi"); }');
  });

  it('labels the stdin tab Input, not Terminal, and keeps output in-viewport', async () => {
    const { container } = renderWorkspace();
    await screen.findByText('Lesson 1 of 12');
    expect(screen.getByRole('tab', { name: 'Input' })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: 'Terminal' })).not.toBeInTheDocument();
    const workspace = container.querySelector('section[aria-label="Lesson workspace"]') as HTMLElement;
    expect(workspace.className).toContain('overflow-hidden');
    expect(workspace.className).toContain('flex-1');
  });

  it('renders no stale "Loading…" line under the editor', async () => {
    renderWorkspace();
    await screen.findByText('Lesson 1 of 12');
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
