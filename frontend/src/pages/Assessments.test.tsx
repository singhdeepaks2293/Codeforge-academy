import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AssessmentsListPage } from './Assessment';

const { mockApi } = vi.hoisted(() => ({ mockApi: vi.fn() }));

vi.mock('../lib/api', () => ({ api: mockApi }));
vi.mock('@monaco-editor/react', () => ({ default: () => null }));
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '1', email: 'student@example.com', displayName: 'Student', role: 'learner', status: 'active' },
    permissions: [], loading: false, refresh: async () => {}, logout: async () => {},
  }),
  useCan: () => false,
}));

describe('AssessmentsListPage', () => {
  beforeEach(() => {
    mockApi.mockReset();
    mockApi.mockImplementation((path: string) => {
      if (path === '/api/courses') {
        return Promise.resolve({
          courses: [
            { slug: 'python', title: 'Python Programming', language: 'python', category: 'languages', totalLessons: 54 },
            { slug: 'aws-fundamentals', title: 'AWS Fundamentals', language: 'python', category: 'devops', totalLessons: 11 },
          ],
        });
      }
      if (path === '/api/progress/dashboard') {
        return Promise.resolve({ courses: [{ slug: 'python', mastery_passed: 1 }] });
      }
      return Promise.reject(new Error(`unexpected ${path}`));
    });
  });

  it('lists every track assessment with passed state and links', async () => {
    render(
      <MemoryRouter>
        <AssessmentsListPage />
      </MemoryRouter>,
    );
    await screen.findByText('AWS Fundamentals');
    expect(screen.getByText('Python Programming')).toBeInTheDocument();
    expect(screen.getByText('✓ Passed')).toBeInTheDocument();
    expect(screen.getByText('Not passed')).toBeInTheDocument();
    // Domain track shows its category pill, not the exercise language.
    expect(screen.getByText('DevOps')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Retake assessment/ });
    expect(link.getAttribute('href')).toBe('/assessments/python');
    const take = screen.getByRole('link', { name: /Take assessment/ });
    expect(take.getAttribute('href')).toBe('/assessments/aws-fundamentals');
  });
});
