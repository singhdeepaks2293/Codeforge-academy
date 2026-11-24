import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectsPage } from './Projects';

const { mockApi } = vi.hoisted(() => ({ mockApi: vi.fn() }));

vi.mock('../lib/api', () => ({ api: mockApi }));
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '1', email: 'student@example.com', displayName: 'Student', role: 'learner', status: 'active' },
    permissions: [], loading: false, refresh: async () => {}, logout: async () => {},
  }),
  useCan: () => false,
}));

const PROJECTS = [
  { id: 'p1', slug: 'cli-calculator', level: 1, title: 'CLI Calculator', description: 'Build a calculator.', skills: ['Python'], language: 'python', portfolio: false, progress: null },
  { id: 'p2', slug: 'capstone', level: 4, title: 'Capstone Product', description: 'Build a whole product.', skills: ['React'], language: 'typescript', portfolio: true, progress: { status: 'in-progress', completed_milestones: '[]' } },
];

function renderProjects() {
  return render(
    <MemoryRouter>
      <ProjectsPage />
    </MemoryRouter>,
  );
}

describe('ProjectsPage (list)', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockResolvedValue({ projects: PROJECTS });
  });

  it('puts the level filter in a narrow left rail', async () => {
    renderProjects();
    await screen.findByText('CLI Calculator');
    const rail = document.querySelector('aside[aria-label="Filters"]') as HTMLElement;
    expect(rail).toBeInTheDocument();
    expect(rail.querySelector('select[aria-label="Filter by level"]')).not.toBeNull();
  });

  it('renders a Portfolio Ready tag only on portfolio projects', async () => {
    renderProjects();
    await screen.findByText('CLI Calculator');
    const tags = screen.getAllByTestId('portfolio-tag');
    expect(tags).toHaveLength(1);
    expect(tags[0]).toHaveTextContent('Portfolio Ready');
    const capstone = screen.getByText('Capstone Product').closest('article') as HTMLElement;
    expect(capstone.querySelector('[data-testid="portfolio-tag"]')).not.toBeNull();
    const cli = screen.getByText('CLI Calculator').closest('article') as HTMLElement;
    expect(cli.querySelector('[data-testid="portfolio-tag"]')).toBeNull();
  });

  it('filters by level from the rail', async () => {
    renderProjects();
    await screen.findByText('CLI Calculator');
    fireEvent.change(screen.getByLabelText('Filter by level'), { target: { value: '4' } });
    expect(screen.queryByText('CLI Calculator')).not.toBeInTheDocument();
    expect(screen.getByText('Capstone Product')).toBeInTheDocument();
  });
});
