import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { Page } from '../components/Layout';

interface Course {
  id: string; slug: string; language: string; title: string; description: string;
  difficulty: string; estimated_hours: number; skills: string[]; prerequisites: string[];
  totalLessons: number; status: string;
}

const LANG_LABEL: Record<string, string> = {
  c: 'C', cpp: 'C++', python: 'Python', typescript: 'TypeScript', react: 'React', rust: 'Rust', go: 'Go',
  java: 'Java', javascript: 'JavaScript', csharp: 'C#', kotlin: 'Kotlin', swift: 'Swift', php: 'PHP',
  ruby: 'Ruby', dart: 'Dart', scala: 'Scala', haskell: 'Haskell', elixir: 'Elixir', lua: 'Lua',
  r: 'R', julia: 'Julia', perl: 'Perl', 'objective-c': 'Objective-C', asm: 'Assembly', solidity: 'Solidity',
  sql: 'SQL', html: 'HTML & CSS', bash: 'Bash', mongodb: 'MongoDB', redis: 'Redis',
};

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'languages', label: 'Languages' },
  { id: 'web', label: 'Web & Frontend' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'data-ai', label: 'Data, AI & ML' },
  { id: 'databases', label: 'Databases & Backend' },
  { id: 'devops', label: 'DevOps, Cloud & Systems' },
  { id: 'cs-career', label: 'CS Foundations & Career' },
];

export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lang, setLang] = useState('');
  const [category, setCategory] = useState('');
  const [q, setQ] = useState('');
  const [error, setError] = useState('');
  const [params] = useSearchParams();

  useEffect(() => {
    const initial = params.get('q') || '';
    setQ(initial);
    api<{ courses: Course[] }>('/api/courses').then((d) => setCourses(d.courses)).catch((e) => setError(e.message));
  }, [params]);

  const totalLessons = courses.reduce((n, c) => n + (c.totalLessons || 0), 0);
  const filtered = courses.filter((c) => {
    if (lang && c.language !== lang) return false;
    if (category && (c as Course & { category?: string }).category !== category) return false;
    if (q && !(c.title + c.description).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <Page title="Explore Courses" subtitle="Complete tracks — beginner to advanced, each with an end-of-track assessment.">
      <p className="mb-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
        {courses.length} tracks · {totalLessons} lessons
      </p>
      {error && <p role="alert" className="text-red-600">{error}</p>}
      <div className="mb-4 flex flex-wrap gap-2">
        <input className="input max-w-sm" placeholder="Search courses…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search courses" />
        <select className="input w-auto" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <select className="input w-auto" value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Filter by language">
          <option value="">All languages</option>
          {Object.entries(LANG_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>
      {filtered.length === 0 && <div className="card p-6 text-center text-slate-500">No courses match your filters.</div>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <article key={c.id} className="card flex flex-col p-5">
            <div className="flex items-center justify-between">
              <span className="badge bg-navy-900 text-white dark:bg-slate-700">{LANG_LABEL[c.language] || c.language}</span>
              <span className="text-xs text-slate-500">{c.estimated_hours}h · {c.totalLessons} lessons</span>
            </div>
            <h2 className="mt-3 text-lg font-bold">{c.title}</h2>
            <p className="mt-1 flex-1 text-sm text-slate-500">{c.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {c.skills.slice(0, 4).map((s) => <span key={s} className="badge bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-slate-300">{s}</span>)}
            </div>
            {c.prerequisites.length > 0 && <p className="mt-2 text-xs text-slate-500">Prerequisites: {c.prerequisites.join(', ')}</p>}
            <Link className="btn-primary mt-4" to={`/courses/${c.slug}`}>Start course →</Link>
          </article>
        ))}
      </div>
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
  const [error, setError] = useState('');
  const toast = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!slug) return;
    api<CourseDetail>(`/api/courses/${slug}`).then(setDetail).catch((e) => setError(e.message));
    api<{ completed: number; total: number; percent: number; nextLessonId: string | null; unlockedLessons: string[] }>(`/api/courses/${slug}/progress`).then(setProgress).catch(() => undefined);
  }, [slug]);

  if (error) return <Page title="Course"><p role="alert" className="text-red-600">{error}</p></Page>;
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

  return (
    <Page title={detail.course.title} subtitle={detail.course.description}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="badge bg-navy-900 text-white">{LANG_LABEL[detail.course.language]}</span>
        <span className="text-sm text-slate-500">{detail.course.estimated_hours} hours · {detail.modules.length} modules</span>
        {progress && <span className="text-sm font-semibold">{progress.completed}/{progress.total} lessons · {progress.percent}% complete</span>}
        {user && <button className="btn-primary" onClick={enroll}>Enroll</button>}
        {progress?.nextLessonId && (
          <Link className="btn-primary" to={`/courses/${slug}/lessons/${progress.nextLessonId}`}>Continue learning →</Link>
        )}
        <Link className="btn-secondary" to={`/assessments/${slug}`}>Mastery assessment</Link>
      </div>

      <div className="mt-6 space-y-4">
        {detail.modules.map((m) => (
          <section key={m.id} className="card p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{m.title}</h2>
              <span className="badge bg-slate-100 text-slate-600 capitalize dark:bg-navy-800 dark:text-slate-300">{m.level}</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">{m.description}</p>
            <ul className="mt-3 space-y-1">
              {m.lessons.map((l) => {
                const unlocked = !progress || progress.unlockedLessons.includes(l.id);
                const done = progress?.completed && false;
                return (
                  <li key={l.id} className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-navy-800">
                    <span className="text-sm">{unlocked ? '📖' : '🔒'} {l.title}</span>
                    {unlocked
                      ? <Link className="text-sm font-semibold text-brand-600" to={`/courses/${slug}/lessons/${l.id}`}>Open →</Link>
                      : <span className="text-xs text-slate-400">Complete the previous lesson to unlock</span>}
                    {done && <span />}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      {firstLesson && <p className="mt-4 text-sm text-slate-500">First lesson: {firstLesson.title}</p>}
    </Page>
  );
}

export function MyLearningPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    api<{ courses: Course[] }>('/api/courses').then((d) => setCourses(d.courses)).catch(() => undefined);
  }, []);
  return (
    <Page title="My Learning" subtitle="Everything you have enrolled in, in one place.">
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((c) => (
          <div key={c.id} className="card p-4">
            <h2 className="font-bold">{c.title}</h2>
            <p className="text-sm text-slate-500">{c.description}</p>
            <Link className="btn-primary mt-3" to={`/courses/${c.slug}`}>Open course →</Link>
          </div>
        ))}
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
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 font-bold text-white">{s.n}</span>
            <div><h2 className="font-bold">{s.title}</h2><p className="text-sm text-slate-500">{s.desc}</p></div>
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
