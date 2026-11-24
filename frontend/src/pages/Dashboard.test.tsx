import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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

function renderDashboard() {
  return render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>,
  );
}

describe('DashboardPage (0-progress account)', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockResolvedValue(EMPTY_DASHBOARD);
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
});

describe('DashboardPage (with activity)', () => {
  it('renders bars once XP exists', async () => {
    mockApi.mockReset();
    mockApi.mockResolvedValue({
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
    expect(document.querySelector('[title="2026-11-24: 40 XP, 2 lessons"]')).not.toBeNull();
    expect(screen.getByText(/First Lesson/)).toBeInTheDocument();
  });
});
