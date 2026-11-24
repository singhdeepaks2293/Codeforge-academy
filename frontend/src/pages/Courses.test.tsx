import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CoursesPage } from './Courses';

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

  it('keeps search + filters in one row (important w-auto beats .input width)', async () => {
    renderCourses();
    await screen.findByText('AWS Fundamentals');
    for (const label of ['Filter by category', 'Filter by language']) {
      expect((screen.getByLabelText(label) as HTMLElement).className).toContain('!w-auto');
    }
    expect((screen.getByLabelText('Search courses') as HTMLElement).className).toContain('flex-1');
  });
});
