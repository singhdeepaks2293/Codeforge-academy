import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SkillPathsPage, CertificatesPage, CoachPage, BuilderPage, QuizzesPage } from './Features';

const { mockApi } = vi.hoisted(() => ({ mockApi: vi.fn() }));
vi.mock('../lib/api', () => ({ api: mockApi }));

function renderPage(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('SkillPathsPage', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockResolvedValue({
      paths: [{
        id: 'python-developer', title: 'Python Developer', description: 'From first print to OOP.',
        level: 'Beginner to Advanced', estimatedWeeks: 8, enrolled: false,
        coursesCompleted: 1, coursesTotal: 2,
        progress: [
          { slug: 'python', title: 'Python Programming', enrolled: true, completedLessons: 1, totalLessons: 1, percent: 100, completed: true },
          { slug: 'python-functions', title: 'Functions', enrolled: false, completedLessons: 0, totalLessons: 1, percent: 0, completed: false },
        ],
      }],
    });
  });
  it('shows real path progress and course titles', async () => {
    renderPage(<SkillPathsPage />);
    await screen.findByText('Python Developer');
    expect(screen.getByText('1/2 courses completed')).toBeTruthy();
  });
});

describe('CertificatesPage', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockResolvedValue({
      certificates: [{ code: 'CF-ABCD-12', kind: 'course', refSlug: 'python', title: 'Course Completion — Python Programming', issuedAt: '2026-11-24 10:00:00' }],
    });
  });
  it('lists certificates with their verification codes', async () => {
    renderPage(<CertificatesPage />);
    await screen.findByText('Course Completion — Python Programming');
    expect(screen.getByText('CF-ABCD-12')).toBeTruthy();
  });
  it('shows an empty state when there are no certificates', async () => {
    mockApi.mockResolvedValue({ certificates: [] });
    renderPage(<CertificatesPage />);
    await screen.findByText(/No certificates yet/);
  });
});

describe('CoachPage', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockResolvedValue({
      summary: { xp: 250, streak: 3, dsaSolved: 5, last7DaysXp: 120, last7DaysLessons: 4 },
      recommendations: [{ text: 'Continue "Python Programming"', evidence: '3 of 10 lessons completed', link: '/courses/python' }],
      weeklyPlan: [{ day: 'Monday', task: 'Continue Python', reason: 'Most-advanced in-progress course.' }],
    });
  });
  it('shows the weekly plan and evidence-backed recommendations', async () => {
    renderPage(<CoachPage />);
    await screen.findByText('Your weekly plan');
    expect(screen.getByText(/Continue "Python Programming"/)).toBeTruthy();
    expect(screen.getByText(/Evidence: 3 of 10 lessons completed/)).toBeTruthy();
  });
});

describe('BuilderPage', () => {
  beforeEach(() => { mockApi.mockReset(); mockApi.mockResolvedValue({ suggestions: ['Backend Engineer'] }); });
  it('labels itself a local planner with no AI model', async () => {
    renderPage(<BuilderPage />);
    await screen.findByText(/no AI model, works offline/);
    expect(screen.getByPlaceholderText(/Become a backend engineer/)).toBeTruthy();
  });
});

describe('QuizzesPage', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockResolvedValue({ quizzes: [{ id: 'mixed:python', title: 'Mixed python review quiz', questionCount: 42 }] });
  });
  it('lists real quizzes with question counts', async () => {
    renderPage(<QuizzesPage />);
    await screen.findByText('Mixed python review quiz');
    expect(screen.getByText(/42 questions available/)).toBeTruthy();
  });
});
