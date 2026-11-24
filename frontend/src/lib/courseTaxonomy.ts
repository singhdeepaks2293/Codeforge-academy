// Course catalog taxonomy: what pill a course card shows, and which
// languages the Languages filter may list.
//
// Background: every track stores a `language` — the language its code
// exercises actually run in (seed stores each exercise with the lesson's
// exampleLanguage, which matches the track language; audited 2026-11-24
// across tracks-*.ts — no stored language is wrong for its own content, so
// no data fix was needed). But for domain tracks the language is only the
// exercise vehicle, not the subject: AWS Fundamentals runs Python snippets
// yet is a DevOps track, Algorithms runs Python yet is a CS Foundations
// track. Showing "Python" on those cards misleads learners, so the pill
// shows the language only when the language (or framework) IS the subject.

export const LANG_LABEL: Record<string, string> = {
  c: 'C', cpp: 'C++', python: 'Python', typescript: 'TypeScript', react: 'React', rust: 'Rust', go: 'Go',
  java: 'Java', javascript: 'JavaScript', csharp: 'C#', kotlin: 'Kotlin', swift: 'Swift', php: 'PHP',
  ruby: 'Ruby', dart: 'Dart', scala: 'Scala', haskell: 'Haskell', elixir: 'Elixir', lua: 'Lua',
  r: 'R', julia: 'Julia', perl: 'Perl', 'objective-c': 'Objective-C', objc: 'Objective-C', asm: 'Assembly',
  solidity: 'Solidity', sql: 'SQL', html: 'HTML & CSS', bash: 'Bash', mongodb: 'MongoDB', redis: 'Redis',
};

export const CATEGORIES: { id: string; label: string }[] = [
  { id: 'languages', label: 'Languages' },
  { id: 'web', label: 'Web & Frontend' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'data-ai', label: 'Data, AI & ML' },
  { id: 'databases', label: 'Databases & Backend' },
  { id: 'devops', label: 'DevOps, Cloud & Systems' },
  { id: 'cs-career', label: 'CS Foundations & Career' },
];

// Categories where the track's subject is a language, framework or data
// technology — the language pill is correct there (Python, React, MongoDB…).
const LANGUAGE_SUBJECT_CATEGORIES = new Set(['languages', 'web', 'mobile', 'databases']);

// Short pill labels for domain categories (the subject, not the vehicle).
const CATEGORY_PILL_LABEL: Record<string, string> = {
  'data-ai': 'Data & AI',
  devops: 'DevOps',
  'cs-career': 'CS Foundations',
};

export function categoryLabel(id: string | undefined): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id ?? '';
}

/**
 * The pill text for a course card / detail page.
 * Language-subject tracks show the language; domain tracks show the
 * category label instead. A missing category (v1 tracks predate the
 * category column; the seed defaults them to 'languages') is treated as a
 * language subject.
 */
export function coursePill(course: { language: string; category?: string }): string {
  const category = course.category || 'languages';
  if (LANGUAGE_SUBJECT_CATEGORIES.has(category)) {
    return LANG_LABEL[course.language] || course.language;
  }
  return CATEGORY_PILL_LABEL[category] || categoryLabel(category) || (LANG_LABEL[course.language] || course.language);
}

// The Languages filter must list only true programming languages.
// Frameworks (React) and data services (MongoDB, Redis) are NOT languages:
// those tracks stay findable via the Web & Frontend / Databases & Backend
// category filters. Values are the stored language ids the API returns
// (note: Objective-C is stored as 'objc').
export const LANGUAGE_FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'python', label: 'Python' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'csharp', label: 'C#' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'swift', label: 'Swift' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'dart', label: 'Dart' },
  { value: 'scala', label: 'Scala' },
  { value: 'haskell', label: 'Haskell' },
  { value: 'elixir', label: 'Elixir' },
  { value: 'lua', label: 'Lua' },
  { value: 'r', label: 'R' },
  { value: 'julia', label: 'Julia' },
  { value: 'perl', label: 'Perl' },
  { value: 'objc', label: 'Objective-C' },
  { value: 'asm', label: 'Assembly' },
  { value: 'solidity', label: 'Solidity' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'html', label: 'HTML & CSS' },
];
