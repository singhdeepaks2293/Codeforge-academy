// Lesson workspace: 3-column Codecademy-style layout (Learn | Code Editor |
// Output Terminal), black top bar with segment ticks, dark bottom bar with
// the Exercise N/M counter and gated Next, Run-as-check, drawers, and a
// syllabus overlay with padlocks.
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

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: { displayName: 'Singh', email: 'singh@test.local' } }),
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
  { id: 'ex-1', title: 'Hello Rust', type: 'code', instructions: 'Print hello.', starterCode: 'fn main() {}', tests: [{ name: 'prints hello', hidden: false }], hints: [], solutionExplanation: '' },
  { id: 'ex-2', title: 'Quiz One', type: 'multiple-choice', instructions: 'Pick the right answer.', starterCode: '', tests: [], hints: [], solutionExplanation: '', options: ['Alpha', 'Beta'] },
];

let runResponse: { success: boolean; stdout: string; stderr: string; exitCode: number; timedOut: boolean; durationMs: number } = {
  success: true, stdout: 'hello\n', stderr: '', exitCode: 0, timedOut: false, durationMs: 5,
};
let submitResponse: { passed: boolean; results: { name: string; passed: boolean }[] } = {
  passed: true, results: [{ name: 'prints hello', passed: true }],
};
let progressResponse: { completedLessons: string[]; unlockedLessons: string[] } | null = {
  completedLessons: [], unlockedLessons: ['lesson-1'],
};

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

describe('LessonWorkspacePage codecademy-style workspace', () => {
  beforeEach(() => {
    mockApi.mockReset();
    runResponse = { success: true, stdout: 'hello\n', stderr: '', exitCode: 0, timedOut: false, durationMs: 5 };
    submitResponse = { passed: true, results: [{ name: 'prints hello', passed: true }] };
    progressResponse = { completedLessons: [], unlockedLessons: ['lesson-1'] };
    mockApi.mockImplementation((url: string) => {
      if (url.includes('/complete')) return Promise.resolve({ ok: true });
      if (url.includes('/execute/run')) return Promise.resolve(runResponse);
      if (url.includes('/submit')) return Promise.resolve(submitResponse);
      if (url.includes('/hints/')) return Promise.resolve({ hint: { title: 'Concept hint', content: 'Think about ownership.' } });
      if (url.includes('/progress')) {
        return progressResponse ? Promise.resolve(progressResponse) : Promise.reject(new Error('signed out'));
      }
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

  it('shows the black top bar with segment ticks and the Exercise N of M counter', async () => {
    renderWorkspace();
    expect(await screen.findByText('Exercise 1 of 2')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Lesson 1 of 12' })).toBeInTheDocument();
    expect(screen.getByText('What is Rust?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /AI help/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Everything unlocked' })).toBeInTheDocument();
    expect(screen.queryByText(/streak/i)).not.toBeInTheDocument();
  });

  it('keeps Lesson/Examples/Quiz tabs inside Learn', async () => {
    renderWorkspace();
    await screen.findByText('Exercise 1 of 2');
    expect(screen.getByText('Understand ownership')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Examples' }));
    expect(await screen.findByText('Fix the bug.')).toBeInTheDocument();
    expect(screen.queryByText('Understand ownership')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Quiz' }));
    expect(await screen.findByText(/What is ownership\?/)).toBeInTheDocument();
  });

  it('always shows real file tabs, including an Example tab, and an in-editor file tree', async () => {
    renderWorkspace();
    await screen.findByText('Exercise 1 of 2');
    const tablist = screen.getByRole('tablist', { name: 'Editor files' });
    expect(within(tablist).getByRole('tab', { name: /Hello Rust/ })).toBeInTheDocument();
    expect(within(tablist).getByRole('tab', { name: '▤ Example' })).toBeInTheDocument();
    fireEvent.click(within(tablist).getByRole('tab', { name: '▤ Example' }));
    expect(screen.getByTestId('code-editor')).toHaveTextContent('fn main() { println!("hi"); }');
    fireEvent.click(screen.getByRole('button', { name: 'Toggle file tree' }));
    expect(screen.getByRole('dialog', { name: 'File tree' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close file tree' }));
    expect(screen.queryByRole('dialog', { name: 'File tree' })).not.toBeInTheDocument();
  });

  it('disables Next until the checkpoint passes, then Run flips the checkpoint and enables Next', async () => {
    renderWorkspace();
    await screen.findByText('Exercise 1 of 2');
    expect(screen.queryByRole('link', { name: /Next/ })).not.toBeInTheDocument();
    expect(screen.getByText(/Checkpoint — press Run/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Run/ }));
    expect(await screen.findByText(/Checkpoint Passed/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Next/ })).toBeInTheDocument();
    // Test results are visible in the Terminal column after Run.
    expect(screen.getByText(/Test results \(1\/1 passed\)/)).toBeInTheDocument();
    expect(screen.getByText(/exit code: 0/)).toBeInTheDocument();
  });

  it('Run on a quiz exercise submits the chosen answer and passes the checkpoint', async () => {
    renderWorkspace();
    await screen.findByText('Exercise 1 of 2');
    fireEvent.click(screen.getByRole('tab', { name: /Quiz One/ }));
    expect(await screen.findByText('Exercise 2 of 2')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Alpha'));
    fireEvent.click(screen.getByRole('button', { name: /Run/ }));
    expect(await screen.findByText(/Checkpoint Passed/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Next/ })).toBeInTheDocument();
  });

  it('shows an Explain error strip when output contains an error', async () => {
    runResponse = { success: false, stdout: '', stderr: 'error: expected `;`', exitCode: 1, timedOut: false, durationMs: 5 };
    submitResponse = { passed: false, results: [{ name: 'prints hello', passed: false }] };
    renderWorkspace();
    await screen.findByText('Exercise 1 of 2');
    fireEvent.click(screen.getByRole('button', { name: /Run/ }));
    const explain = await screen.findByRole('button', { name: 'Explain error' });
    expect(explain).toBeInTheDocument();
    expect(screen.queryByText(/Checkpoint Passed/)).not.toBeInTheDocument();
    fireEvent.click(explain);
    const dialog = screen.getByRole('dialog', { name: 'AI help' });
    expect(within(dialog).getByText(/Your error, explained/)).toBeInTheDocument();
    expect(within(dialog).getByText(/expected `;`/)).toBeInTheDocument();
  });

  it('opens and closes each drawer', async () => {
    renderWorkspace();
    await screen.findByText('Exercise 1 of 2');
    fireEvent.click(screen.getByRole('button', { name: /AI help/ }));
    expect(screen.getByRole('dialog', { name: 'AI help' })).toBeInTheDocument();
    expect(screen.getByText(/Local help, not an AI assistant/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close panel' }));
    expect(screen.queryByRole('dialog', { name: 'AI help' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Get Unstuck' }));
    expect(screen.getByRole('dialog', { name: 'Get Unstuck' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close panel' }));

    fireEvent.click(screen.getByRole('button', { name: 'Tools' }));
    const tools = screen.getByRole('dialog', { name: 'Tools' });
    expect(within(tools).getByLabelText('Standard input')).toBeInTheDocument();
    expect(within(tools).getByRole('button', { name: /Fullscreen/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close panel' }));

    fireEvent.click(screen.getByRole('button', { name: 'Everything unlocked' }));
    expect(screen.getByRole('dialog', { name: 'Everything unlocked' })).toBeInTheDocument();
    expect(screen.getByText(/already unlocked/)).toBeInTheDocument();
    expect(screen.getByText(/no paid plan/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /upgrade/i })).not.toBeInTheDocument();
  });

  it('shows the syllabus overlay with padlocks on locked lessons', async () => {
    renderWorkspace();
    await screen.findByText('Exercise 1 of 2');
    fireEvent.click(screen.getByRole('button', { name: 'Open syllabus' }));
    const dialog = screen.getByRole('dialog', { name: 'Syllabus' });
    expect(within(dialog).getByRole('link', { name: /Lesson 1/ })).toBeInTheDocument();
    const locked = within(dialog).getByText('🔒 Lesson 2');
    expect(locked.getAttribute('aria-disabled')).toBe('true');
    expect(within(dialog).queryByRole('link', { name: /Lesson 2/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close syllabus' }));
    expect(screen.queryByRole('dialog', { name: 'Syllabus' })).not.toBeInTheDocument();
  });

  it('falls back to the current lesson as the unlock frontier when progress is unavailable', async () => {
    progressResponse = null;
    renderWorkspace();
    await screen.findByText('Exercise 1 of 2');
    fireEvent.click(screen.getByRole('button', { name: 'Open syllabus' }));
    const dialog = screen.getByRole('dialog', { name: 'Syllabus' });
    expect(within(dialog).getByRole('link', { name: /Lesson 1/ })).toBeInTheDocument();
    expect(within(dialog).getByText('🔒 Lesson 2')).toBeInTheDocument();
  });

  it('renders no stale "Loading…" line under the editor', async () => {
    renderWorkspace();
    await screen.findByText('Exercise 1 of 2');
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('keeps the workspace viewport-fit with three columns', async () => {
    const { container } = renderWorkspace();
    await screen.findByText('Exercise 1 of 2');
    const workspace = container.querySelector('section[aria-label="Lesson workspace"]') as HTMLElement;
    expect(workspace.className).toContain('overflow-hidden');
    expect(workspace.className).toContain('flex-1');
    expect(container.querySelector('.grid-cols-3')).toBeInTheDocument();
  });
});
