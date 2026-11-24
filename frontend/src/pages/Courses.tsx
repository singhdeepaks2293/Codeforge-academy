import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { HatchedProgress, IndexLayout, Page } from '../components/Layout';
import { CATEGORIES, LANG_LABEL, LANGUAGE_FILTER_OPTIONS, coursePill } from '../lib/courseTaxonomy';

interface Course {
  id: string; slug: string; language: string; category?: string; title: string; description: string;
  difficulty: string; estimated_hours: number; skills: string[]; prerequisites: string[];
  totalLessons: number; status: string;
}

interface DashboardCourse {
  slug: string; completed_lessons: number; total_lessons: number; enrolled: number; mastery_passed: number;
}

export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lang, setLang] = useState('');
  const [category, setCategory] = useState('');
  const [q, setQ] = useState('');
  const [error, setError] = useState('');
  const [progressBySlug, setProgressBySlug] = useState<Record<string, number>>({});
  const [params] = useSearchParams();

  useEffect(() => {
    const initial = params.get('q') || '';
    setQ(initial);
    api<{ courses: Course[] }>('/api/courses').then((d) => setCourses(d.courses)).catch((e) => setError(e.message));
    // Enrolled-course progress comes from the dashboard API (the catalog
    // API carries no progress); best-effort — the catalog works without it.
    api<{ courses: DashboardCourse[] }>('/api/progress/dashboard').then((d) => {
      const map: Record<string, number> = {};
      for (const c of d.courses) {
        if (c.enrolled && c.total_lessons) map[c.slug] = Math.round((c.completed_lessons / c.total_lessons) * 100);
      }
      setProgressBySlug(map);
    }).catch(() => undefined);
  }, [params]);

  const totalLessons = courses.reduce((n, c) => n + (c.totalLessons || 0), 0);
  const filtered = courses.filter((c) => {
    if (lang && c.language !== lang) return false;
    if (category && c.category !== category) return false;
    if (q && !(c.title + c.description).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <Page title="Explore Courses" subtitle="Complete tracks — beginner to advanced, each with an end-of-track assessment.">
      <p className="mb-4 text-sm font-semibold text-muted">
        {courses.length} tracks · {totalLessons} lessons
      </p>
      {error && <p role="alert" className="text-danger">{error}</p>}
      <IndexLayout
        rail={(
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold">Filters</h2>
              <p className="text-xs text-muted">{filtered.length} of {courses.length} tracks</p>
            </div>
            <div>
              <label className="label" htmlFor="course-category">Category</label>
              <select id="course-category" className="input" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
                <option value="">All categories</option>
                {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="course-language">Language</label>
              <select id="course-language" className="input" value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Filter by language">
                <option value="">All languages</option>
                {LANGUAGE_FILTER_OPTIONS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
            {(lang || category) && <button className="btn-ghost text-xs" onClick={() => { setLang(''); setCategory(''); }}>Clear filters</button>}
          </div>
        )}
      >
        <div className="mb-4">
          <input className="input" placeholder="Search courses…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search courses" />
        </div>
        {filtered.length === 0 && <div className="card p-6 text-center text-muted">No courses match your filters.</div>}
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((c) => {
            const pct = progressBySlug[c.slug];
            return (
              <article key={c.id} className="card flex flex-col p-5">
                <div className="flex items-center justify-between">
                  <span className="badge bg-accent-soft text-accent-600">{coursePill(c)}</span>
                  <span className="text-xs text-muted">{c.estimated_hours}h · {c.totalLessons} lessons</span>
                </div>
                <h2 className="mt-3 text-lg font-bold">{c.title}</h2>
                <p className="mt-1 flex-1 text-sm text-muted">{c.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {c.skills.slice(0, 4).map((s) => <span key={s} className="badge bg-elevated text-muted">{s}</span>)}
                </div>
                {c.prerequisites.length > 0 && <p className="mt-2 text-xs text-muted">Prerequisites: {c.prerequisites.join(', ')}</p>}
                {pct !== undefined && (
                  <div className="mt-3"><HatchedProgress percent={pct} label={`${c.title} progress ${pct}%`} /></div>
                )}
                <Link className="btn-primary mt-4" to={`/courses/${c.slug}`}>Start course →</Link>
              </article>
            );
          })}
        </div>
      </IndexLayout>
    </Page>
  );
}

interface CourseDetail {
  course: Course;
  modules: { id: string; title: string; description: string; level: string; lessons: { id: string; slug: string; title: string }[] }[];
}

export function CourseDetailPage() {
  const { slug } = useParams();
  const [detail, setDetail] = useState<CourseDetail | null>(null);
  const [progress, setProgress] = useState<{ completed: number; total: number; percent: number; nextLessonId: string | null; unlockedLessons: string[] } | null>(null);
  const [masteryPassed, setMasteryPassed] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!slug) return;
    api<CourseDetail>(`/api/courses/${slug}`).then(setDetail).catch((e) => setError(e.message));
    api<{ completed: number; total: number; percent: number; nextLessonId: string | null; unlockedLessons: string[] }>(`/api/courses/${slug}/progress`).then(setProgress).catch(() => undefined);
    // Mastery comes from the dashboard API (the per-course progress API
    // carries no mastery flag); best-effort — the trophy also shows on
    // 100% completion without it.
    api<{ courses: DashboardCourse[] }>('/api/progress/dashboard').then((d) => {
      setMasteryPassed(Boolean(d.courses.find((c) => c.slug === slug)?.mastery_passed));
    }).catch(() => undefined);
  }, [slug]);

  if (error) return <Page title="Course"><p role="alert" className="text-danger">{error}</p></Page>;
  if (!detail) return <Page title="Course"><p>Loading course…</p></Page>;

  const enroll = async () => {
    try {
      await api(`/api/courses/${slug}/enroll`, { method: 'POST' });
      toast('Enrolled!', 'success');
      const p = await api<{ completed: number; total: number; percent: number; nextLessonId: string | null; unlockedLessons: string[] }>(`/api/courses/${slug}/progress`);
      setProgress(p);
    } catch (e) { toast((e as Error).message, 'error'); }
  };

  const firstLesson = detail.modules[0]?.lessons[0];
  const totalLessons = detail.modules.reduce((n, m) => n + m.lessons.length, 0);
  const complete = (progress?.percent ?? 0) >= 100;
  const facts: [string, string][] = [
    ['Language', LANG_LABEL[detail.course.language] || detail.course.language],
    ['Level', detail.course.difficulty],
    ['Duration', `${detail.course.estimated_hours} hours`],
    ['Lessons', `${totalLessons} lessons in ${detail.modules.length} modules`],
    ['Skills', detail.course.skills.join(', ') || '—'],
  ];

  return (
    <Page title={detail.course.title} subtitle={detail.course.description}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="badge bg-accent-soft text-accent-600">{coursePill(detail.course)}</span>
        {user && <button className="btn-primary" onClick={enroll}>Enroll</button>}
        {progress?.nextLessonId && (
          <Link className="btn-primary" to={`/courses/${slug}/lessons/${progress.nextLessonId}`}>Continue learning →</Link>
        )}
        <Link className="btn-secondary" to={`/assessments/${slug}`}>Mastery assessment</Link>
      </div>

      {progress && (
        <div className="card mt-5 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold">Your progress</span>
            <span className="text-sm text-muted">{progress.completed}/{progress.total} lessons</span>
            {complete && <span className="badge bg-warning-soft text-warning" data-testid="course-trophy">🏆 Course complete</span>}
            {masteryPassed && <span className="badge bg-warning-soft text-warning" data-testid="mastery-trophy">🏆 Mastery passed</span>}
          </div>
          <div className="mt-2"><HatchedProgress percent={progress.percent} label={`Course progress ${progress.percent}%`} /></div>
        </div>
      )}

      <dl className="card mt-5 divide-y divide-line px-4">
        {facts.map(([term, value]) => (
          <div key={term} className="flex flex-wrap gap-x-4 gap-y-0.5 py-2.5 text-sm">
            <dt className="w-24 shrink-0 font-semibold text-muted">{term}</dt>
            <dd className="min-w-0 flex-1">{value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-6 text-lg font-bold">Syllabus</h2>
      <div className="mt-3 space-y-3">
        {detail.modules.map((m, i) => (
          <details key={m.id} className="card p-4" open={i === 0}>
            <summary className="cursor-pointer">
              <span className="flex items-center justify-between gap-2">
                <span className="text-lg font-bold">{m.title}</span>
                <span className="badge shrink-0 bg-elevated text-muted capitalize">{m.level} · {m.lessons.length} lessons</span>
              </span>
            </summary>
            <p className="mt-1 text-sm text-muted">{m.description}</p>
            <ul className="mt-3 space-y-1">
              {m.lessons.map((l) => {
                const unlocked = !progress || progress.unlockedLessons.includes(l.id);
                return (
                  <li key={l.id} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-base">
                    <span className="min-w-0 text-sm">{unlocked ? '📖' : '🔒'} {l.title}</span>
                    {unlocked
                      ? <Link className="shrink-0 text-sm font-semibold text-accent-600" to={`/courses/${slug}/lessons/${l.id}`}>Open →</Link>
                      : <span className="shrink-0 text-xs text-faint">Complete the previous lesson to unlock</span>}
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </div>
      {firstLesson && <p className="mt-4 text-sm text-muted">First lesson: {firstLesson.title}</p>}
    </Page>
  );
}

export function MyLearningPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressBySlug, setProgressBySlug] = useState<Record<string, number>>({});
  useEffect(() => {
    api<{ courses: Course[] }>('/api/courses').then((d) => setCourses(d.courses)).catch(() => undefined);
    api<{ courses: DashboardCourse[] }>('/api/progress/dashboard').then((d) => {
      const map: Record<string, number> = {};
      for (const c of d.courses) {
        if (c.enrolled && c.total_lessons) map[c.slug] = Math.round((c.completed_lessons / c.total_lessons) * 100);
      }
      setProgressBySlug(map);
    }).catch(() => undefined);
  }, []);
  return (
    <Page title="My Learning" subtitle="Everything you have enrolled in, in one place.">
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((c) => {
          const pct = progressBySlug[c.slug];
          return (
            <div key={c.id} className="card p-4">
              <h2 className="font-bold">{c.title}</h2>
              <p className="text-sm text-muted">{c.description}</p>
              {pct !== undefined && <div className="mt-3"><HatchedProgress percent={pct} label={`${c.title} progress ${pct}%`} /></div>}
              <Link className="btn-primary mt-3" to={`/courses/${c.slug}`}>Open course →</Link>
            </div>
          );
        })}
      </div>
    </Page>
  );
}

export function PathsPage() {
  const stages = [
    { n: 1, title: 'Foundations', desc: 'Choose a language and complete the beginner modules.' },
    { n: 2, title: 'Intermediate', desc: 'Complete beginner lessons, exercises and the level assessment.' },
    { n: 3, title: 'Advanced', desc: 'Complete intermediate lessons and assessment.' },
    { n: 4, title: 'Language Mastery', desc: 'Complete the advanced curriculum and pass the mastery assessment (80%+).' },
    { n: 5, title: 'DSA', desc: 'Start DSA foundations — unlocked after a mastery assessment.' },
    { n: 6, title: 'DSA Mastery', desc: 'Complete DSA modules and problem-solving assessments.' },
    { n: 7, title: 'Industry Projects', desc: 'Build projects from beginner to advanced.' },
    { n: 8, title: 'Capstone', desc: 'Build an industry-grade project of your own.' },
  ];
  return (
    <Page title="Learning Paths" subtitle="The structured road from absolute beginner to industry-ready engineer.">
      <ol className="space-y-3">
        {stages.map((s) => (
          <li key={s.n} className="card flex gap-4 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500 font-bold text-white">{s.n}</span>
            <div><h2 className="font-bold">{s.title}</h2><p className="text-sm text-muted">{s.desc}</p></div>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex gap-2">
        <Link className="btn-primary" to="/courses">Start Stage 1</Link>
        <Link className="btn-secondary" to="/practice">Go to DSA</Link>
      </div>
    </Page>
  );
}
