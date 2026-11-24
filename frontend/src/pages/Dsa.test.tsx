// DSA list + problem page: collapsible learning-first layout, one-row
// filters, deduplicated legend, wrapping pseudocode, and the snake_case
// API normalisation (empty language dropdown / blank complexity fix).
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DsaListPage, DsaProblemPage } from './Dsa';
import { ToastProvider } from '../components/Toast';

const { mockApi } = vi.hoisted(() => ({ mockApi: vi.fn() }));

vi.mock('../lib/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../lib/api')>();
  return { ...actual, api: mockApi };
});

vi.mock('../components/MonacoEditor', () => ({
  // Exposes the Monaco language as data-language and an editable textarea
  // wired to onChange, so tests can assert the editor mode and simulate
  // typing without a real Monaco instance.
  CodeEditor: ({ value, language, onChange, ariaLabel }: { value: string; language: string; onChange?: (v: string) => void; ariaLabel?: string }) => (
    <div data-testid="code-editor" data-language={language} aria-label={ariaLabel}>
      {value}
      <textarea data-testid="code-editor-input" aria-label="Edit solution code" value={value} onChange={(e) => onChange?.(e.target.value)} />
    </div>
  ),
}));

const listProblems = [
  { id: 'dsa-two-sum', slug: 'two-sum', title: 'Two Sum', difficulty: 'Easy', topics: ['Arrays'], description: 'Find two indices.', solved: false },
  { id: 'dsa-merge', slug: 'merge-sorted', title: 'Merge Sorted Arrays', difficulty: 'Easy', topics: ['Sorting'], description: 'Merge two sorted arrays.', solved: true },
];

// Two Sum as the real API returns it: snake_case DB columns.
const twoSumRaw = {
  id: 'dsa-two-sum', slug: 'two-sum', title: 'Two Sum', difficulty: 'Easy', topics: ['Arrays'],
  description: 'Given an array of integers and a target value, return the indices of the two numbers that add up to the target.',
  examples: [{ input: '4\n2 7 11 15\n9', output: '0 1', explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' }],
  constraints: ['2 <= nums.length <= 10^4', 'Exactly one valid answer exists.'],
  starter_code: { python: 'def solve(nums, target):\n    return [0, 1]\n', javascript: 'function solve(nums, target) { return [0, 1]; }\n' },
  tests: [{ name: 'basic', stdin: '4\n2 7 11 15\n9', expectedStdout: '0 1', hidden: false }],
  hints: [
    { level: 1, title: 'Understand the core idea', content: 'Use a hash map.' },
    { level: 5, title: 'Solution outline', content: 'Scan once with a map.' },
  ],
  solution_discussion: 'Scanning once and looking up each complement in a hash map finds the pair in linear time.',
  time_complexity: 'O(n)',
  space_complexity: 'O(n)',
};

const ALL_LANG_IDS = ['c', 'cpp', 'java', 'go', 'rust', 'typescript', 'python', 'javascript'];
const ALL_LANG_LABELS = ['C', 'C++', 'Java', 'Go', 'Rust', 'TypeScript', 'Python', 'JavaScript'];

// Same problem, but with a starter for every one of the eight languages.
const twoSumAllLangs = {
  ...twoSumRaw,
  starter_code: {
    c: '/* C_STARTER */\n',
    cpp: '// CPP_STARTER\n',
    java: '// JAVA_STARTER\n',
    go: '// GO_STARTER\n',
    rust: '// RUST_STARTER\n',
    typescript: '// TYPESCRIPT_STARTER\n',
    python: 'def solve(nums, target):\n    return [0, 1]\n',
    javascript: 'function solve(nums, target) { return [0, 1]; }\n',
  },
};

function renderList() {
  return render(
    <MemoryRouter initialEntries={['/practice']}>
      <ToastProvider>
        <Routes><Route path="/practice" element={<DsaListPage />} /></Routes>
      </ToastProvider>
    </MemoryRouter>,
  );
}

function renderProblem() {
  return render(
    <MemoryRouter initialEntries={['/practice/two-sum']}>
      <ToastProvider>
        <Routes><Route path="/practice/:slug" element={<DsaProblemPage />} /></Routes>
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe('DsaListPage', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockResolvedValue({
      gate: { dsaUnlocked: false, reason: 'Complete the mastery assessment to unlock DSA' },
      problems: listProblems,
    });
  });

  it('keeps a space between the lock reason and the browse sentence', async () => {
    renderList();
    expect(await screen.findByText(/unlock DSA You can still browse/)).toBeInTheDocument();
  });

  it('keeps all visualizations collapsed behind one panel by default', async () => {
    renderList();
    await screen.findByText('Two Sum');
    expect(screen.queryByText(/merge sort visualization/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Interactive visualizations/ }));
    expect(await screen.findByText(/merge sort visualization/i)).toBeInTheDocument();
  });

  it('shows the "How to read this" legend exactly once', async () => {
    renderList();
    await screen.findByText('Two Sum');
    fireEvent.click(screen.getByRole('button', { name: /Interactive visualizations/ }));
    await screen.findByText(/merge sort visualization/i);
    expect(screen.getAllByText(/How to read this/i)).toHaveLength(1);
  });

  it('puts the filters in a narrow left rail, with search in the content column', async () => {
    renderList();
    await screen.findByText('Two Sum');
    const rail = document.querySelector('aside[aria-label="Filters"]') as HTMLElement;
    expect(rail).toBeInTheDocument();
    expect(within(rail).getByLabelText('Filter by difficulty')).toBeInTheDocument();
    expect(within(rail).getByLabelText('Filter by topic')).toBeInTheDocument();
    expect(rail.querySelector('input[aria-label="Search problems"]')).toBeNull();
    expect(screen.getByLabelText('Search problems')).toBeInTheDocument();
  });

  it('wraps pseudocode instead of clipping it horizontally', async () => {
    renderList();
    await screen.findByText('Two Sum');
    fireEvent.click(screen.getByRole('button', { name: /Interactive visualizations/ }));
    const pseudo = await screen.findByText(/mergeSort\(arr, lo, hi\)/);
    expect(pseudo.className).toContain('whitespace-pre-wrap');
    expect(pseudo.className).not.toContain('overflow-auto');
  });
});

describe('DsaProblemPage', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockResolvedValue({ problem: twoSumRaw });
  });

  it('preselects Python and loads its starter code (snake_case API)', async () => {
    renderProblem();
    const select = await screen.findByLabelText('Language') as HTMLSelectElement;
    expect(select.value).toBe('python');
    expect(screen.getByTestId('code-editor')).toHaveTextContent('def solve(nums, target):');
    expect(screen.getByText('▤ solution.py')).toBeInTheDocument();
  });

  it('shows real complexity values instead of empty "Time: · Space:"', async () => {
    renderProblem();
    await screen.findByTestId('code-editor');
    fireEvent.click(screen.getByRole('button', { name: /Constraints & complexity/ }));
    expect(await screen.findByText(/Time:/)).toBeInTheDocument();
    expect(screen.getAllByText('O(n)', { selector: 'strong' })).toHaveLength(2);
  });

  it('preserves example line breaks', async () => {
    renderProblem();
    await screen.findByTestId('code-editor');
    const pres = document.querySelectorAll('pre');
    const inputPre = [...pres].find((p) => p.textContent?.includes('2 7 11 15'));
    expect(inputPre).toBeDefined();
    expect(inputPre!.textContent).toContain('2 7 11 15\n9');
  });

  it('shows no visualization for an Arrays-only problem (no unrelated viz)', async () => {
    renderProblem();
    await screen.findByTestId('code-editor');
    expect(screen.queryByText('Visualization')).not.toBeInTheDocument();
    expect(screen.queryByText(/visualization/i)).not.toBeInTheDocument();
  });

  it('keeps hints and solution collapsed by default, expandable on demand', async () => {
    renderProblem();
    await screen.findByTestId('code-editor');
    expect(screen.queryByText(/Use a hash map/)).not.toBeInTheDocument();
    expect(screen.queryByText(/linear time/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /^Hints/ }));
    fireEvent.click(screen.getByRole('button', { name: /Level 1/ }));
    expect(await screen.findByText(/Use a hash map/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Solution discussion/ }));
    expect(await screen.findByText(/linear time/)).toBeInTheDocument();
  });

  it('keeps the output panel inside the workspace with its own tabs', async () => {
    const { container } = renderProblem();
    await screen.findByTestId('code-editor');
    expect(screen.getByRole('tab', { name: 'Output' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /^Tests/ })).toBeInTheDocument();
    const workspace = container.querySelector('section[aria-label="DSA problem workspace"]') as HTMLElement;
    expect(workspace.className).toContain('overflow-hidden');
  });

  it('omits the complexity line entirely when the API sends no values', async () => {
    mockApi.mockResolvedValue({ problem: { ...twoSumRaw, time_complexity: '', space_complexity: '' } });
    renderProblem();
    await screen.findByTestId('code-editor');
    fireEvent.click(screen.getByRole('button', { name: /Constraints & complexity/ }));
    await screen.findByText('2 <= nums.length <= 10^4');
    expect(screen.queryByText(/Time:/)).not.toBeInTheDocument();
  });

  it('offers all eight languages even when the problem ships only two starters', async () => {
    renderProblem();
    const select = await screen.findByLabelText('Language') as HTMLSelectElement;
    expect([...select.options].map((o) => o.value)).toEqual(ALL_LANG_IDS);
    expect([...select.options].map((o) => o.textContent)).toEqual(ALL_LANG_LABELS);
  });

  it('shows an honest empty state, not a blank editor, for a language with no starter', async () => {
    renderProblem();
    const select = await screen.findByLabelText('Language') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'rust' } });
    expect(await screen.findByText(/No starter code is available for Rust on this problem/)).toBeInTheDocument();
    expect(screen.queryByTestId('code-editor')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '▶ Run' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '✓ Submit' })).toBeDisabled();
  });
});

describe('DsaProblemPage language selector (all 8 languages)', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockResolvedValue({ problem: twoSumAllLangs });
  });

  it('lists all eight languages with correct labels', async () => {
    renderProblem();
    const select = await screen.findByLabelText('Language') as HTMLSelectElement;
    expect([...select.options].map((o) => o.value)).toEqual(ALL_LANG_IDS);
    expect([...select.options].map((o) => o.textContent)).toEqual(ALL_LANG_LABELS);
  });

  it('loads the matching starter and Monaco language on select', async () => {
    renderProblem();
    const select = await screen.findByLabelText('Language') as HTMLSelectElement;
    expect(select.value).toBe('python');
    fireEvent.change(select, { target: { value: 'rust' } });
    const editor = screen.getByTestId('code-editor');
    expect(editor).toHaveTextContent('RUST_STARTER');
    expect(editor).toHaveAttribute('data-language', 'rust');
    expect(screen.getByText('▤ solution.rs')).toBeInTheDocument();
    fireEvent.change(select, { target: { value: 'cpp' } });
    expect(screen.getByTestId('code-editor')).toHaveTextContent('CPP_STARTER');
    expect(screen.getByTestId('code-editor')).toHaveAttribute('data-language', 'cpp');
    expect(screen.getByText('▤ solution.cpp')).toBeInTheDocument();
    fireEvent.change(select, { target: { value: 'typescript' } });
    expect(screen.getByTestId('code-editor')).toHaveTextContent('TYPESCRIPT_STARTER');
    expect(screen.getByTestId('code-editor')).toHaveAttribute('data-language', 'typescript');
    expect(screen.getByText('▤ solution.ts')).toBeInTheDocument();
  });

  it('preserves typed code per language across switches', async () => {
    renderProblem();
    const select = await screen.findByLabelText('Language') as HTMLSelectElement;
    const input = screen.getByTestId('code-editor-input') as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: '# my python edit' } });
    expect(screen.getByTestId('code-editor')).toHaveTextContent('# my python edit');
    fireEvent.change(select, { target: { value: 'go' } });
    expect(screen.getByTestId('code-editor')).toHaveTextContent('GO_STARTER');
    fireEvent.change(select, { target: { value: 'python' } });
    expect(screen.getByTestId('code-editor')).toHaveTextContent('# my python edit');
    expect(screen.getByTestId('code-editor')).toHaveAttribute('data-language', 'python');
  });

  it('Reset restores only the current language starter, keeping other languages intact', async () => {
    renderProblem();
    const select = await screen.findByLabelText('Language') as HTMLSelectElement;
    const input = screen.getByTestId('code-editor-input') as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: '# my python edit' } });
    fireEvent.change(select, { target: { value: 'java' } });
    fireEvent.change(screen.getByTestId('code-editor-input'), { target: { value: '// my java edit' } });
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByTestId('code-editor')).toHaveTextContent('JAVA_STARTER');
    fireEvent.change(select, { target: { value: 'python' } });
    expect(screen.getByTestId('code-editor')).toHaveTextContent('# my python edit');
  });

  it('sends the selected language with the run request', async () => {
    mockApi.mockImplementation(async (path: string) => {
      if (path === '/api/execute/run') return { success: true, stdout: '0 1\n', stderr: '', exitCode: 0, timedOut: false };
      return { problem: twoSumAllLangs };
    });
    renderProblem();
    const select = await screen.findByLabelText('Language') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'rust' } });
    fireEvent.click(screen.getByRole('button', { name: '▶ Run' }));
    await screen.findByText(/exit 0/);
    const runCall = mockApi.mock.calls.find((c) => c[0] === '/api/execute/run');
    expect(runCall).toBeDefined();
    const body = JSON.parse((runCall as unknown as [string, { body: string }])[1].body as string);
    expect(body.language).toBe('rust');
    expect(body.code).toContain('RUST_STARTER');
  });

  it('sends the selected language with the submit request', async () => {
    mockApi.mockImplementation(async (path: string) => {
      if (path.endsWith('/submit')) return { passed: true, results: [{ name: 'basic', passed: true, hidden: false }] };
      return { problem: twoSumAllLangs };
    });
    renderProblem();
    const select = await screen.findByLabelText('Language') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'java' } });
    fireEvent.click(screen.getByRole('button', { name: '✓ Submit' }));
    await screen.findByText(/Tests \(1\/1\)/);
    const submitCall = mockApi.mock.calls.find((c) => typeof c[0] === 'string' && (c[0] as string).endsWith('/submit'));
    expect(submitCall).toBeDefined();
    const body = JSON.parse((submitCall as unknown as [string, { body: string }])[1].body as string);
    expect(body.language).toBe('java');
    expect(body.code).toContain('JAVA_STARTER');
  });
});
