import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { IndexLayout, Page } from '../components/Layout';
import { LANG_LABEL } from '../lib/courseTaxonomy';

interface Course {
  id: string; slug: string; language: string; category?: string; title: string; description: string;
  difficulty: string; estimated_hours: number; skills: string[]; prerequisites: string[];
  totalLessons: number; status: string;
}

interface Runtime {
  id: string; name: string; available: boolean; version?: string; installHint: string;
}

interface CourseDetail {
  modules: { id: string; title: string; description: string; level: string; lessons: { id: string; slug: string; title: string }[] }[];
}

// Per-language quick reference, built only from real data:
//  - tracks, lesson counts and skills come from the courses API
//  - run/install commands come from the live runtimes API (install hints)
//  - the module outline comes from the first track's own syllabus
// No syntax is invented here: runnable examples live in the lessons
// themselves, linked from each card.
export function CheatsheetsPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [runtimes, setRuntimes] = useState<Runtime[]>([]);
  const [languageToRuntime, setLanguageToRuntime] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState('');
  const [outline, setOutline] = useState<{ title: string; modules: { title: string; lessons: number }[] } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ courses: Course[] }>('/api/courses').then((d) => {
      setCourses(d.courses);
      const langs = [...new Set(d.courses.map((c) => c.language))].sort();
      if (langs.length > 0) setSelected(langs[0]);
    }).catch((e) => setError(e.message));
    api<{ runtimes: Runtime[]; languageToRuntime: Record<string, string> }>('/api/execute/runtimes')
      .then((d) => { setRuntimes(d.runtimes); setLanguageToRuntime(d.languageToRuntime || {}); })
      .catch(() => undefined);
  }, []);

  const languages = useMemo(
    () => [...new Set(courses.map((c) => c.language))].sort(),
    [courses],
  );
  const langCourses = courses.filter((c) => c.language === selected);
  const skills = [...new Set(langCourses.flatMap((c) => c.skills))].sort();
  const runtimeId = languageToRuntime[selected];
  const runtime = runtimes.find((r) => r.id === runtimeId);

  useEffect(() => {
    setOutline(null);
    const first = langCourses[0];
    if (!first) return;
    api<CourseDetail>(`/api/courses/${first.slug}`)
      .then((d) => setOutline({ title: first.title, modules: d.modules.map((m) => ({ title: m.title, lessons: m.lessons.length })) }))
      .catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, courses.length]);

  const label = (lang: string) => LANG_LABEL[lang] || lang;

  return (
    <Page title="Cheatsheets" subtitle="Per-language quick reference — tracks, skills, and how to run the language on this machine. Syntax examples live in the lessons; this page points at the real data, it does not invent any.">
      {error && <p role="alert" className="text-danger">{error}</p>}
      <IndexLayout
        rail={(
          <nav aria-label="Languages" className="space-y-1">
            <h2 className="text-sm font-bold">Languages</h2>
            {languages.length === 0 && <p className="text-sm text-muted">Loading…</p>}
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSelected(lang)}
                aria-current={selected === lang ? 'true' : undefined}
                className={`block w-full rounded-lg px-2 py-1.5 text-left text-sm ${selected === lang ? 'bg-accent-soft font-semibold text-accent-600' : 'text-muted hover:bg-elevated hover:text-ink'}`}
              >
                {label(lang)}
                <span className="float-right text-xs">{courses.filter((c) => c.language === lang).length}</span>
              </button>
            ))}
          </nav>
        )}
      >
        {selected === '' ? (
          <p className="text-sm text-muted">Loading cheatsheets…</p>
        ) : (
          <div className="space-y-4">
            <section className="card p-5">
              <h2 className="text-lg font-bold">{label(selected)}</h2>
              <p className="mt-1 text-sm text-muted">
                {langCourses.length} track{langCourses.length === 1 ? '' : 's'} · {langCourses.reduce((n, c) => n + (c.totalLessons || 0), 0)} lessons
              </p>
              <h3 className="mt-4 font-semibold">Run it on this machine</h3>
              {runtime ? (
                <div className="mt-1 rounded-lg border border-line p-3 text-sm">
                  <strong>{runtime.name}</strong> — {runtime.available ? `✓ Available (${runtime.version || ''})` : '✗ Not installed'}
                  {!runtime.available && <span className="block text-muted">{runtime.installHint}</span>}
                  {runtime.available && <span className="block text-muted">Ready to run — open any {label(selected)} lesson and press Run.</span>}
                </div>
              ) : (
                <p className="mt-1 text-sm text-muted">
                  No runtime entry for this language in <code>/api/runtimes</code> — check the lesson workspace, which reports the real runtime status when you open a lesson.
                </p>
              )}
            </section>

            <section className="card p-5">
              <h2 className="font-bold">Tracks</h2>
              <ul className="mt-2 space-y-2">
                {langCourses.map((c) => (
                  <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line p-3 text-sm">
                    <span><strong>{c.title}</strong> <span className="text-muted">· {c.difficulty} · {c.estimated_hours}h · {c.totalLessons} lessons</span></span>
                    <Link className="font-semibold text-accent-600" to={`/courses/${c.slug}`}>Open track →</Link>
                  </li>
                ))}
              </ul>
              {skills.length > 0 && (
                <>
                  <h3 className="mt-4 font-semibold">Skills these tracks teach</h3>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {skills.map((s) => <span key={s} className="badge bg-elevated text-muted">{s}</span>)}
                  </div>
                </>
              )}
            </section>

            <section className="card p-5">
              <h2 className="font-bold">Syllabus outline {outline ? `— ${outline.title}` : ''}</h2>
              {!outline && <p className="mt-2 text-sm text-muted">Loading the first track&apos;s syllabus…</p>}
              {outline && (
                <ul className="mt-2 space-y-1 text-sm">
                  {outline.modules.map((m) => (
                    <li key={m.title} className="flex justify-between gap-2 border-b border-line pb-1 last:border-0">
                      <span>{m.title}</span>
                      <span className="shrink-0 text-muted">{m.lessons} lessons</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-sm text-muted">
                The worked examples and starter code for each module are in the lessons themselves — start with the first track above.
              </p>
            </section>
          </div>
        )}
      </IndexLayout>
    </Page>
  );
}
