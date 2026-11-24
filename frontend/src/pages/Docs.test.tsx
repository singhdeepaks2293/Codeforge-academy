import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DocsPage } from './Docs';

const { mockApi } = vi.hoisted(() => ({ mockApi: vi.fn() }));

vi.mock('../lib/api', () => ({ api: mockApi }));

const RUNTIMES = [
  { id: 'python', name: 'Python 3', available: true, version: '3.12.0', installHint: 'Install CPython 3.10+.' },
  { id: 'go', name: 'Go', available: false, version: '', installHint: 'Install Go from https://go.dev/dl/.' },
];

function renderDocs() {
  return render(
    <MemoryRouter>
      <DocsPage />
    </MemoryRouter>,
  );
}

describe('DocsPage', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockResolvedValue({ runtimes: RUNTIMES });
  });

  it('has a filter-rail style section nav and the real setup sections', async () => {
    renderDocs();
    await screen.findByText('Python 3');
    const rail = document.querySelector('aside[aria-label="Filters"]') as HTMLElement;
    expect(rail).toBeInTheDocument();
    for (const [railLabel, heading] of [
      ['How to learn', 'How to learn'],
      ['Runtimes on this machine', 'Runtimes on this machine'],
      ['Local setup', 'Local setup (no Docker)'],
      ['Docker setup', 'Docker setup'],
      ['Troubleshooting', 'Troubleshooting'],
    ] as const) {
      // Each section appears twice by design: once as a rail link, once as
      // the section heading — assert both, scoped so the match is exact.
      expect(within(rail).getByText(railLabel)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }
    // Real content from the repo docs, not placeholder text.
    expect(screen.getAllByText(/npm run dev/)).toHaveLength(2); // setup block + reset note
    expect(screen.getByText(/docker compose up --build/)).toBeInTheDocument();
    expect(screen.getAllByText(/127\.0\.0\.1:8080/).length).toBeGreaterThanOrEqual(2); // backend line + troubleshooting curl
  });

  it('shows the live runtime table from the API', async () => {
    renderDocs();
    await screen.findByText('Python 3');
    expect(screen.getByText(/Available \(3\.12\.0\)/)).toBeInTheDocument();
    expect(screen.getByText(/Not installed/)).toBeInTheDocument();
    expect(screen.getByText(/Install Go from/)).toBeInTheDocument();
  });

  it('shows an honest error when the runtimes API fails', async () => {
    mockApi.mockReset();
    mockApi.mockRejectedValue(new Error('backend down'));
    renderDocs();
    expect(await screen.findByText(/Could not load live runtime status/)).toBeInTheDocument();
  });
});
