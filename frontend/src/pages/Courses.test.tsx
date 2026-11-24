import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CoursesPage, CourseDetailPage } from './Courses';
import { ToastProvider } from '../components/Toast';

const { mockApi } = vi.hoisted(() => ({ mockApi: vi.fn() }));

vi.mock('../lib/api', () => ({ api: mockApi }));
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '1', email: 'student@example.com', displayName: 'Student', role: 'learner', status: 'active' },
    permissions: [], loading: false, refresh: async () => {}, logout: async () => {},
  }),
  useCan: () => false,
}));

const COURSES = [
  { id: 'c-python', slug: 'python', language: 'python', category: 'languages', title: 'Python Programming', description: 'Learn Python.', difficulty: 'All levels', estimated_hours: 55, skills: ['Python'], prerequisites: [], totalLessons: 54, status: 'published' },
  { id: 'c-aws', slug: 'aws-fundamentals', language: 'python', category: 'devops', title: 'AWS Fundamentals', description: 'Cloud basics.', difficulty: 'Beginner', estimated_hours: 10, skills: ['AWS'], prerequisites: [], totalLessons: 11, status: 'published' },
  { id: 'c-algo', slug: 'algorithms-refresher', language: 'python', category: 'cs-career', title: 'Algorithms Refresher', description: 'Algorithms.', difficulty: 'Beginner', estimated_hours: 10, skills: ['Algorithms'], prerequisites: [], totalLessons: 11, status: 'published' },
  { id: 'c-react', slug: 'react', language: 'react', category: 'languages', title: 'React', description: 'UI library.', difficulty: 'All levels', estimated_hours: 55, skills: ['JSX'], prerequisites: [], totalLessons: 46, status: 'published' },
  { id: 'c-mongo', slug: 'mongodb', language: 'mongodb', category: 'databases', title: 'MongoDB', description: 'Documents.', difficulty: 'Beginner', estimated_hours: 10, skills: ['MongoDB'], prerequisites: [], totalLessons: 11, status: 'published' },
  { id: 'c-stats', slug: 'statistics', language: 'python', category: 'data-ai', title: 'Statistics for Programmers', description: 'Stats.', difficulty: 'Beginner', estimated_hours: 10, skills: ['Stats'], prerequisites: [], totalLessons: 11, status: 'published' },
];

function renderCourses() {
  return render(
    <MemoryRouter>
      <CoursesPage />
    </MemoryRouter>,
  );
}

describe('CoursesPage pills', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockResolvedValue({ courses: COURSES });
  });

  it('shows the category pill on domain tracks, not the exercise language', async () => {
    renderCourses();
    await screen.findByText('AWS Fundamentals');
    // Scoped per card: the badge inside the AWS card must be the category,
    // and the Python track card keeps its language pill.
    const pillOf = (title: string) =>
      screen.getByText(title).closest('article')?.querySelector('.badge')?.textContent;
    expect(pillOf('AWS Fundamentals')).toBe('DevOps');
    expect(pillOf('Algorithms Refresher')).toBe('CS Foundations');
    expect(pillOf('Statistics for Programmers')).toBe('Data & AI');
    expect(pillOf('Python Programming')).toBe('Python');
  });

  it('keeps the language pill where the language is the subject', async () => {
    renderCourses();
    // Pill + card title both read the label (findByText would fail on the duplicate).
    await screen.findAllByText('React');
    expect(screen.getAllByText('React')).toHaveLength(2);
    // Pill + card title + the 'MongoDB' skills badge.
    expect(screen.getAllByText('MongoDB')).toHaveLength(3);
  });

  it('lists only true programming languages in the Languages filter', async () => {
    renderCourses();
    await screen.findByText('AWS Fundamentals');
    const select = screen.getByLabelText('Filter by language') as HTMLSelectElement;
    const options = Array.from(select.options).map((o) => o.textContent);
    expect(options).not.toContain('React');
    expect(options).not.toContain('MongoDB');
    expect(options).not.toContain('Redis');
    expect(options).toContain('Python');
    expect(options).toContain('SQL');
    expect(options).toContain('Bash');
    expect(options).toContain('HTML & CSS');
    expect(options).toContain('Assembly');
  });

  it('puts the filters in a narrow left rail, with search in the content column', async () => {
    renderCourses();
    await screen.findByText('AWS Fundamentals');
    const rail = document.querySelector('aside[aria-label="Filters"]') as HTMLElement;
    expect(rail).toBeInTheDocument();
    expect(rail.querySelector('select[aria-label="Filter by category"]')).not.toBeNull();
    expect(rail.querySelector('select[aria-label="Filter by language"]')).not.toBeNull();
    // Search lives outside the rail, in the content column.
    expect(rail.querySelector('input[aria-label="Search courses"]')).toBeNull();
    expect(screen.getByLabelText('Search courses')).toBeInTheDocument();
  });

  it('shows a hatched progress bar with a yellow % pill on enrolled courses', async () => {
    mockApi.mockImplementation((path: string) => {
      if (path === '/api/progress/dashboard') {
        return Promise.resolve({ courses: [{ slug: 'python', completed_lessons: 27, total_lessons: 54, enrolled: 1, mastery_passed: 0 }] });
      }
      return Promise.resolve({ courses: COURSES });
    });
    renderCourses();
    await screen.findByText('AWS Fundamentals');
    const card = screen.getByText('Python Programming').closest('article') as HTMLElement;
    const pill = card.querySelector('[data-testid="progress-pill"]') as HTMLElement;
    expect(pill).toHaveTextContent('50%');
    expect(pill.className).toContain('pill-yellow');
    expect(card.querySelector('.progress-hatch')).not.toBeNull();
    // A course the learner is not enrolled in shows no progress bar.
    const awsCard = screen.getByText('AWS Fundamentals').closest('article') as HTMLElement;
    expect(awsCard.querySelector('[data-testid="progress-pill"]')).toBeNull();
  });
});

const DETAIL = {
  course: { id: 'c-python', slug: 'python', language: 'python', category: 'languages', title: 'Python Programming', description: 'Learn Python.', difficulty: 'All levels', estimated_hours: 55, skills: ['Python', 'Testing'], prerequisites: [], totalLessons: 2, status: 'published' },
  modules: [
    { id: 'm1', title: 'Module 1 — Basics', description: 'First steps.', level: 'beginner', lessons: [
      { id: 'l1', slug: 'hello', title: 'Hello Python' },
      { id: 'l2', slug: 'variables', title: 'Variables' },
    ] },
    { id: 'm2', title: 'Module 2 — Functions', description: 'Deeper.', level: 'intermediate', lessons: [
      { id: 'l3', slug: 'functions', title: 'Functions' },
    ] },
  ],
};

function renderDetail(progress: { completed: number; total: number; percent: number; nextLessonId: string | null; unlockedLessons: string[] }, masteryPassed = 0) {
  mockApi.mockReset();
  mockApi.mockImplementation((path: string) => {
    if (path === '/api/courses/python') return Promise.resolve(DETAIL);
    if (path === '/api/courses/python/progress') return Promise.resolve(progress);
    if (path === '/api/progress/dashboard') {
      return Promise.resolve({ courses: [{ slug: 'python', completed_lessons: progress.completed, total_lessons: progress.total, enrolled: 1, mastery_passed: masteryPassed }] });
    }
    return Promise.reject(new Error(`unexpected ${path}`));
  });
  return render(
    <MemoryRouter initialEntries={['/courses/python']}>
      <ToastProvider>
        <Routes><Route path="/courses/:slug" element={<CourseDetailPage />} /></Routes>
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe('CourseDetailPage (centred course page)', () => {
  it('shows a hatched progress bar with a yellow % pill', async () => {
    renderDetail({ completed: 1, total: 2, percent: 50, nextLessonId: 'l2', unlockedLessons: ['l1', 'l2'] });
    await screen.findByText('Python Programming');
    const pill = screen.getByTestId('progress-pill');
    expect(pill).toHaveTextContent('50%');
    expect(pill.className).toContain('pill-yellow');
    expect(document.querySelector('.progress-hatch')).not.toBeNull();
    expect(screen.getByText('1/2 lessons')).toBeInTheDocument();
    expect(screen.queryByTestId('course-trophy')).toBeNull();
  });

  it('shows the trophy when the course is complete and when mastery passed', async () => {
    renderDetail({ completed: 2, total: 2, percent: 100, nextLessonId: null, unlockedLessons: ['l1', 'l2', 'l3'] }, 1);
    await screen.findByText('Python Programming');
    expect(screen.getByTestId('course-trophy')).toHaveTextContent('Course complete');
    expect(screen.getByTestId('mastery-trophy')).toHaveTextContent('Mastery passed');
  });

  it('lists facts divided by rows: language, level, duration, lessons, skills', async () => {
    renderDetail({ completed: 0, total: 2, percent: 0, nextLessonId: 'l1', unlockedLessons: ['l1'] });
    await screen.findByText('Python Programming');
    const facts = document.querySelector('dl') as HTMLElement;
    expect(facts).toBeInTheDocument();
    expect(facts.textContent).toContain('Language');
    expect(facts.textContent).toContain('Python');
    expect(facts.textContent).toContain('All levels');
    expect(facts.textContent).toContain('55 hours');
    expect(facts.textContent).toContain('3 lessons in 2 modules');
    expect(facts.textContent).toContain('Python, Testing');
  });

  it('renders syllabus modules as accordions with padlocks on locked lessons', async () => {
    renderDetail({ completed: 1, total: 3, percent: 33, nextLessonId: 'l2', unlockedLessons: ['l1', 'l2'] });
    await screen.findByText('Python Programming');
    // Accordions: the first module is open, the rest start closed.
    const accordions = document.querySelectorAll('details');
    expect(accordions.length).toBe(2);
    expect((accordions[0] as HTMLDetailsElement).open).toBe(true);
    expect((accordions[1] as HTMLDetailsElement).open).toBe(false);
    // l3 is locked (only l1/l2 unlocked): padlock, no Open link.
    const locked = screen.getByText(/🔒 Functions/);
    expect(locked).toBeInTheDocument();
    expect(locked.closest('li')?.querySelector('a')).toBeNull();
    // l1 is unlocked: an Open link, no padlock.
    expect(screen.getByText(/📖 Hello Python/)).toBeInTheDocument();
    expect(screen.getByText(/📖 Hello Python/).closest('li')?.querySelector('a')).toHaveAttribute('href', '/courses/python/lessons/l1');
  });
});
