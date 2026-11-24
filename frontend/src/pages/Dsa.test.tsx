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
  CodeEditor: ({ value, ariaLabel }: { value: string; ariaLabel?: string }) => (
    <div data-testid="code-editor" aria-label={ariaLabel}>{value}</div>
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

  it('lays the filters out in a single row', async () => {
    renderList();
    await screen.findByText('Two Sum');
    const search = screen.getByLabelText('Search problems');
    expect(search.parentElement?.className).toContain('flex-nowrap');
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
});
