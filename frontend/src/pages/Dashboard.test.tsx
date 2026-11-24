import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DashboardPage } from './Dashboard';

const { mockApi } = vi.hoisted(() => ({ mockApi: vi.fn() }));

vi.mock('../lib/api', () => ({ api: mockApi }));
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '1', email: 'student@example.com', displayName: 'Student', role: 'learner', status: 'active' },
    permissions: [], loading: false, refresh: async () => {}, logout: async () => {},
  }),
  useCan: () => false,
}));

const EMPTY_DASHBOARD = {
  xp: 0, streak: 0, dailyGoal: 100, todayXp: 0,
  courses: [], recentLessons: [], activity: [], achievements: [],
  allAchievements: [
    { id: 'a1', title: 'First Lesson', description: 'Complete a lesson', icon: '📖', xp: 10 },
    { id: 'a2', title: 'Streak 7', description: 'Seven day streak', icon: '🔥', xp: 50 },
  ],
  dsa: { solved: 0, total: 152 }, projectsCompleted: 0, weakTopics: [],
};

const PROJECTS = [
  { id: 'p1', slug: 'cli-calculator', level: 1, title: 'CLI Calculator', description: 'Build a calculator.', skills: ['Python'], language: 'python', progress: { status: 'in-progress', completed_milestones: '[]' } },
  { id: 'p2', slug: 'todo-api', level: 2, title: 'Todo API', description: 'Build an API.', skills: ['Python'], language: 'python', progress: { status: 'completed', completed_milestones: '["m1"]' } },
];

function renderDashboard() {
  return render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>,
  );
}

function mockDashboard(dashboard: unknown, projects: unknown = { projects: [] }) {
  mockApi.mockReset();
  mockApi.mockImplementation((path: string) => {
    if (path === '/api/projects') return Promise.resolve(projects);
    return Promise.resolve(dashboard);
  });
}

describe('DashboardPage (0-progress account)', () => {
  beforeEach(() => {
    mockDashboard(EMPTY_DASHBOARD);
  });

  it('renders the total XP number prominently, even at zero', async () => {
    renderDashboard();
    const xp = await screen.findByTestId('total-xp');
    expect(xp).toHaveTextContent('0');
    expect(xp).toHaveTextContent('XP');
    expect(xp.className).toMatch(/text-4xl/);
  });

  it('shows a compact empty state instead of an empty activity grid', async () => {
    renderDashboard();
    await screen.findByText('Last 14 days of activity');
    expect(screen.getByText(/No activity yet/)).toBeInTheDocument();
    // No bar elements (they carry an XP title) when there is no activity.
    expect(document.querySelector('[title$="lessons"]')).toBeNull();
  });

  it('keeps achievements and recommendations compact with nothing earned', async () => {
    renderDashboard();
    await screen.findByText(/Achievements \(0 \/ 2\)/);
    expect(screen.getByText(/No achievements yet/)).toBeInTheDocument();
    // The unearned badge cloud stays hidden behind nothing — no badges shown.
    expect(screen.queryByText('First Lesson')).not.toBeInTheDocument();
    expect(screen.getByText(/No recommendations yet/)).toBeInTheDocument();
  });

  it('shows XP as numbers, never as XP bars — bars live only on Skills tracking', async () => {
    renderDashboard();
    await screen.findByTestId('total-xp');
    // No daily-goal XP bar and no activity chart bars anywhere on My Home.
    expect(screen.queryByRole('progressbar', { name: /daily goal/i })).toBeNull();
    expect(document.querySelector('[title$="lessons"]')).toBeNull();
  });
});

describe('DashboardPage (with activity)', () => {
  it('renders activity as a text list, not bars, once XP exists', async () => {
    mockDashboard({
      ...EMPTY_DASHBOARD,
      xp: 120, todayXp: 40,
      activity: [
        { activity_date: '2026-11-24', xp: 40, lessons_completed: 2, exercises_solved: 2 },
        { activity_date: '2026-11-23', xp: 80, lessons_completed: 3, exercises_solved: 1 },
      ],
      achievements: [{ id: 'a1', title: 'First Lesson', icon: '📖', earned_at: '2026-11-24' }],
    });
    renderDashboard();
    expect(await screen.findByTestId('total-xp')).toHaveTextContent('120');
    expect(await screen.findByText(/40 XP · 2 lessons/)).toBeInTheDocument();
    expect(document.querySelector('[title="2026-11-24: 40 XP, 2 lessons"]')).toBeNull();
    expect(screen.getByText(/First Lesson/)).toBeInTheDocument();
    // "Skills tracking" appears twice by design: the tab and the pointer
    // to the XP chart that lives on that tab.
    expect(screen.getAllByText(/Skills tracking/)).toHaveLength(2);
  });

  it('shows hatched progress bars with a yellow % pill on course cards', async () => {
    mockDashboard({
      ...EMPTY_DASHBOARD,
      courses: [
        { slug: 'python', title: 'Python Programming', language: 'python', completed_lessons: 5, total_lessons: 10, enrolled: 1, mastery_passed: 0 },
      ],
    });
    renderDashboard();
    await screen.findByText('Python Programming');
    const pills = screen.getAllByTestId('progress-pill');
    expect(pills.length).toBeGreaterThan(0);
    for (const pill of pills) {
      expect(pill).toHaveTextContent('50%');
      expect(pill.className).toContain('pill-yellow');
    }
    expect(document.querySelector('.progress-hatch')).not.toBeNull();
  });
});

describe('DashboardPage My Home tabs', () => {
  beforeEach(() => {
    mockDashboard(EMPTY_DASHBOARD);
  });

  it('shows all six tabs with the right destinations', async () => {
    renderDashboard();
    await screen.findByTestId('total-xp');
    const tabs = screen.getByRole('navigation', { name: 'My Home sections' });
    expect(tabs).toBeInTheDocument();
    for (const [label, href] of [
      ['Dashboard', '/'], ['My learning', '/my-learning'], ['AI Builder', '/features/builder'],
      ['Skills tracking', '/progress'], ['Projects', '/projects'],
    ] as const) {
      const link = within(tabs).getByRole('link', { name: label });
      expect(link.getAttribute('href')).toBe(href);
    }
    expect(screen.getByRole('button', { name: 'Workspaces' })).toBeInTheDocument();
  });

  it('Workspaces tab lists real in-progress project workspaces, not fake cloud ones', async () => {
    mockDashboard(EMPTY_DASHBOARD, { projects: PROJECTS });
    renderDashboard();
    await screen.findByTestId('total-xp');
    fireEvent.click(screen.getByRole('button', { name: 'Workspaces' }));
    expect(await screen.findByText('Your workspaces')).toBeInTheDocument();
    expect(screen.getByText('CLI Calculator')).toBeInTheDocument();
    const open = screen.getByRole('link', { name: 'Open workspace →' });
    expect(open.getAttribute('href')).toBe('/projects/cli-calculator');
    expect(screen.getByText('Todo API')).toBeInTheDocument();
    // Honest about what workspaces are: local project work, not a cloud
    // product — the page says so instead of inventing cloud workspaces.
    expect(screen.getByText(/There are no cloud workspaces here/)).toBeInTheDocument();
  });

  it('Workspaces tab shows an honest empty state with no started projects', async () => {
    renderDashboard();
    await screen.findByTestId('total-xp');
    fireEvent.click(screen.getByRole('button', { name: 'Workspaces' }));
    expect(await screen.findByText(/No project workspace yet/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse projects' })).toHaveAttribute('href', '/projects');
  });
});
