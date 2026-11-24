// Compact authoring format for the 700-track expansion.
//
// Authors write one CompactTrack per track (10 lessons + 1 capstone exercise +
// capstone brief). expandTrack() derives everything else the Lesson schema
// needs — objectives, walkthrough, summary, mini-challenge, the two
// knowledge-check questions per lesson, and the 10-question end-of-track
// assessment — from the authored content, following the same shapes the
// 100-track expansion used (see tracks-data.ts: concept-Q + mistake-Q,
// code-reading from exercise tests, debugging from the lesson bug pair).
// Schema compliance is enforced by construction (builder.ts) plus the
// validations below, so a malformed track fails the build instead of
// seeding a broken lesson.
//
// Rules enforced here:
// - exactly 10 lessons per track (keeps seed counts consistent/verifiable)
// - exactly 1 exercise per lesson (builder rule)
// - code exercises: >= 1 visible + >= 1 hidden test
// - quiz exercises (multiple-choice / predict-output): options + answerIndex
// - lessons 1, 5, 9 (0-based) must be code exercises whose first visible test
//   has an exact expectedStdout OR an expectedContains — the assessment
//   code-reading questions are built from those tests, so they need real
//   answers. expectedContains exists for tools whose full stdout is
//   non-deterministic (ansible playbook runs, docker builds): the contained
//   string is the verifiable answer there.
// - concept openings are unique by construction: every built concept starts
//   with "<lesson title> in <track title>:".
import { buildCourse, buildShortAssessment } from './builder.js';
import type {
  AssessmentQuestion, Course, Exercise, ExerciseType, Hint, Lesson,
  MasteryAssessment, Module, QuizQuestion, TestCase,
} from './types.js';
import type { CourseSpec, ExerciseSpec, LessonSpec, ModuleSpec } from './builder.js';

export interface CompactTest {
  name: string;
  stdin?: string;
  expectedStdout?: string;
  expectedContains?: string;
  hidden: boolean;
}

export interface CompactExercise {
  title: string;
  type: ExerciseType;
  instructions: string;
  starterCode: string;
  solution: string;
  solutionExplanation: string;
  complexity?: string;
  tests: CompactTest[];
  hintNotes: { concept: string; approach: string; structure: string };
  options?: string[];
  answerIndex?: number;
}

export interface CompactLesson {
  id: string;
  slug: string;
  title: string;
  /** 2-3 sentences, topic-specific. First sentence is reused as the correct
   *  option of the concept quiz question, so it must state a true fact. */
  concept: string;
  syntax: string;
  exampleCode: string;
  /** Executor language id; normally the track language (react tracks may use
   *  'typescript' / 'javascript' / 'react'). Must be a language the executor
   *  and the provisioning catalogue know. */
  exampleLanguage: string;
  /** One lesson-specific common mistake (also the level-4 hint source). */
  mistake: string;
  bug: { prompt: string; buggyCode: string; fixedCode: string; explanation: string };
  exercise: CompactExercise;
}

export interface CompactModule {
  id: string;
  title: string;
  level: Module['level'];
  lessons: CompactLesson[];
}

export interface CompactTrack {
  id: string;
  slug: string;
  language: string;
  /** Catalog group: languages | web | mobile | data-ai | databases | devops | cs-career */
  category: string;
  title: string;
  description: string;
  difficulty: Course['difficulty'];
  estimatedHours: number;
  skills: string[];
  prerequisites: string[];
  /** One analogy sentence containing a {topic} placeholder, e.g.
   *  "Learning {topic} is like learning to juggle: ..." */
  analogy: string;
  modules: CompactModule[];
  /** Assessment programming exercise (capstone coding task for the track). */
  capstoneExercise: CompactExercise;
  capstone: { title: string; description: string; requirements: string[]; rubric: string[] };
}

// ---------------------------------------------------------------------------
// Language display names (for templated prose)
// ---------------------------------------------------------------------------
const LANG_NAME: Record<string, string> = {
  c: 'C', cpp: 'C++', python: 'Python', typescript: 'TypeScript',
  react: 'React', rust: 'Rust', go: 'Go',
};
function langName(id: string): string { return LANG_NAME[id] ?? id; }

// ---------------------------------------------------------------------------
// Distractor banks (same style as the 100-track expansion: obviously-false
// claims about the topic, and good practices for the mistake question)
// ---------------------------------------------------------------------------
function conceptDistractors(topic: string, lang: string): string[] {
  return [
    `${topic} can only be used once in a program`,
    `${topic} requires a separate paid licence to use`,
    `${topic} is not available in ${lang}`,
    `${topic} only works when the program prints text`,
    `${topic} was removed from ${lang} in the latest version`,
    `${topic} only works on Windows`,
  ];
}

const GOOD_PRACTICES = [
  'Testing the code with a small example first',
  'Reading the error message before changing code',
  'Naming variables clearly so the code is easy to follow',
  'Writing a small test before changing the code',
  'Checking the documentation for the function first',
  'Running the program after every small change',
];

const DEBUG_DISTRACTORS = [
  'The code is correct; the problem is the compiler',
  'The program needs to be restarted',
  'The wrong variable name in the print statement',
  'A missing import at the top of the file',
  'The computer is out of memory',
  'The code runs too fast for the output to appear',
];

const CODE_READING_FALLBACKS = [
  'It prints nothing',
  'It crashes with an error',
  'It prints the input unchanged',
];

// Generic per-language common mistakes (lesson-specific mistake is first;
// two of these fill out the list). Keep them true for the language.
const MISTAKE_BANK: Record<string, string[]> = {
  c: [
    'Forgetting to free memory allocated with malloc.',
    'Using = instead of == inside an if condition.',
    'Writing past the end of an array.',
    'Forgetting the & in scanf for a variable.',
    'Using a pointer after it has been freed.',
    'Forgetting to check the return value of fopen.',
  ],
  cpp: [
    'Forgetting to free memory allocated with new.',
    'Using = instead of == inside an if condition.',
    'Passing a large object by value instead of by reference.',
    'Forgetting a virtual destructor in a base class.',
    'Using an iterator after the container was modified.',
    'Forgetting to include the right header for a standard library type.',
  ],
  python: [
    'Forgetting to convert input strings to numbers before doing arithmetic on them.',
    'Using a mutable default argument such as def f(x=[]).',
    'Comparing strings with is instead of ==.',
    'Modifying a list while iterating over it.',
    'Forgetting the colon at the end of an if or for line.',
    'Mixing tabs and spaces for indentation.',
  ],
  typescript: [
    'Using any everywhere instead of a real type.',
    'Forgetting that a value can be undefined and accessing a property on it.',
    'Mixing up = (assignment) with === (comparison).',
    'Forgetting to await a promise before using its result.',
    'Assuming an array index exists without checking its length.',
    'Mutating an object that was meant to stay unchanged.',
  ],
  react: [
    'Mutating state directly instead of calling the state setter.',
    'Forgetting the dependency array on useEffect.',
    'Using the array index as a key for a list that can reorder.',
    'Calling a hook inside a loop or a condition.',
    'Forgetting to clean up a subscription or timer in useEffect.',
    'Reading stale state inside an event handler.',
  ],
  rust: [
    'Trying to use a value after it has been moved.',
    'Forgetting that a borrow must end before a mutable borrow starts.',
    'Using unwrap() on a Result that can actually fail.',
    'Forgetting the semicolon so a function returns () instead of a value.',
    'Mixing up String and &str.',
    'Forgetting to handle the None case of an Option.',
  ],
  go: [
    'Forgetting to check the error return value.',
    'Capturing a loop variable in a goroutine closure.',
    'Using a nil map and then writing to it.',
    'Forgetting that slices share their backing array.',
    'Sending on a channel nobody receives from.',
    'Shadowing a variable with := inside a block.',
  ],
};

const GENERIC_MISTAKES = [
  'Skipping the setup step and trying to run code before the toolchain is ready.',
  'Testing the code with only one input and assuming it works for all inputs.',
  'Changing several things at once and not knowing which change fixed the bug.',
  'Copying code without understanding what each line does.',
  'Forgetting to save the file before running it.',
  'Reading the output but not comparing it with the expected output.',
];

function mistakeBank(lang: string): string[] {
  return MISTAKE_BANK[lang] ?? GENERIC_MISTAKES;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function firstSentence(text: string): string {
  const m = text.match(/^[^.!?]+[.!?]/);
  return (m ? m[0] : text).trim();
}

/** Deterministic rotation of the correct option so answers are not always index 0. */
function placeCorrect<T>(correct: T, distractors: T[], seed: number): { options: T[]; answer: number } {
  const options = [...distractors];
  const pos = seed % (options.length + 1);
  options.splice(pos, 0, correct);
  return { options, answer: pos };
}

function isCodeType(t: ExerciseType): boolean {
  return t !== 'multiple-choice' && t !== 'predict-output';
}

function validateExercise(ex: CompactExercise, where: string): void {
  if (!ex.title || !ex.instructions || !ex.solution || !ex.solutionExplanation) {
    throw new Error(`${where}: exercise needs title/instructions/solution/solutionExplanation`);
  }
  if (!ex.hintNotes?.concept || !ex.hintNotes?.approach || !ex.hintNotes?.structure) {
    throw new Error(`${where}: exercise needs all three hintNotes`);
  }
  if (!ex.tests || ex.tests.length === 0) throw new Error(`${where}: exercise has no tests`);
  if (isCodeType(ex.type)) {
    const vis = ex.tests.filter((t) => !t.hidden).length;
    const hid = ex.tests.filter((t) => t.hidden).length;
    if (vis < 1 || hid < 1) throw new Error(`${where}: code exercise needs >=1 visible + >=1 hidden test (got ${vis} visible, ${hid} hidden)`);
  } else {
    if (ex.answerIndex === undefined || !ex.options || ex.options.length < 2) {
      throw new Error(`${where}: quiz exercise needs options + answerIndex`);
    }
  }
}

function toExerciseSpec(ex: CompactExercise): ExerciseSpec {
  return {
    id: '', // set by caller
    title: ex.title,
    type: ex.type,
    instructions: ex.instructions,
    starterCode: ex.starterCode,
    solution: ex.solution,
    solutionExplanation: ex.solutionExplanation,
    complexity: ex.complexity,
    tests: ex.tests as TestCase[],
    hintNotes: ex.hintNotes,
    options: ex.options,
    answerIndex: ex.answerIndex,
  };
}

// ---------------------------------------------------------------------------
// Lesson expansion
// ---------------------------------------------------------------------------
function expandLesson(
  track: CompactTrack,
  lesson: CompactLesson,
  lessonIndex: number,
): LessonSpec {
  const lang = langName(track.language);
  const title = lesson.title;
  const conceptFirst = firstSentence(lesson.concept);
  const bank = mistakeBank(track.language);
  const mistakes = [lesson.mistake];
  for (let i = 0; i < bank.length && mistakes.length < 3; i++) {
    const cand = bank[(lessonIndex * 2 + i) % bank.length];
    if (cand !== lesson.mistake && !mistakes.includes(cand)) mistakes.push(cand);
  }
  while (mistakes.length < 3) mistakes.push(GENERIC_MISTAKES[mistakes.length % GENERIC_MISTAKES.length]);

  // Knowledge check: Q1 concept, Q2 common mistake (same shapes as the
  // 100-track expansion; correct position rotates by lesson index).
  const q1 = placeCorrect(conceptFirst, conceptDistractors(title, lang).slice(0, 3), lessonIndex);
  const q2 = placeCorrect(
    lesson.mistake,
    GOOD_PRACTICES.filter((g) => g !== lesson.mistake).slice(0, 3),
    lessonIndex + 1,
  );
  const quiz: QuizQuestion[] = [
    {
      question: `Which statement about ${title} is correct?`,
      options: q1.options,
      answer: q1.answer,
      explanation: conceptFirst,
    },
    {
      question: `Which of these is a common mistake when working with ${title}?`,
      options: q2.options,
      answer: q2.answer,
      explanation: lesson.mistake,
    },
  ];

  const exSpec = toExerciseSpec(lesson.exercise);
  exSpec.id = `${lesson.id}-e1`;

  return {
    id: lesson.id,
    slug: lesson.slug,
    title,
    objectives: [
      `Explain what ${title} is and when to use it`,
      `Use ${title} in a small ${lang} program`,
      `Recognise and fix a common mistake with ${title}`,
    ],
    introduction: `${title} is a core skill in this track. In this lesson you will learn what ${title} is, see it in action on a small example, and practise it yourself.`,
    concept: `${title} in ${track.title}: ${lesson.concept} A common slip here: ${lesson.mistake} The debugging exercise below demonstrates a related mistake.`,
    syntax: lesson.syntax,
    analogy: (lesson as { analogy?: string }).analogy
      ?? track.analogy.replaceAll('{topic}', title),
    exampleCode: lesson.exampleCode,
    exampleLanguage: lesson.exampleLanguage,
    walkthrough: [
      `Read the example code and find where ${title} appears.`,
      'Trace the values step by step, writing down what each variable holds.',
      'Predict the output before running the code.',
      'Run the code and compare the real output with your prediction.',
    ],
    commonMistakes: mistakes,
    debugging: lesson.bug,
    miniChallenge: `Write a tiny program that uses ${title} in a new situation of your choice. Test it with two different inputs and write down what changes.`,
    summary: `In this lesson you worked with ${title} in ${track.title}. ${conceptFirst}`,
    quiz,
    exercise: exSpec,
  };
}

// ---------------------------------------------------------------------------
// Assessment derivation (from the track's own lessons)
// ---------------------------------------------------------------------------
function deriveAssessment(track: CompactTrack, lessons: CompactLesson[]): MasteryAssessment {
  const lang = langName(track.language);
  const questions: AssessmentQuestion[] = [];

  // 5 conceptual: lessons 0, 2, 4, 6, 8 — same concept-Q shape as the lessons.
  for (const [qi, li] of [0, 2, 4, 6, 8].entries()) {
    const lesson = lessons[li];
    const correct = firstSentence(lesson.concept);
    const placed = placeCorrect(correct, conceptDistractors(lesson.title, lang).slice(0, 3), qi + 2);
    questions.push({
      id: `${track.slug}-aq${qi + 1}`,
      kind: 'conceptual',
      topic: lesson.title,
      question: `Which statement about ${lesson.title} is correct?`,
      options: placed.options,
      answer: placed.answer,
      explanation: correct,
    });
  }

  // 3 code-reading: lessons 1, 5, 9 — "what does this program print for this
  // input?" The correct answer is the exercise test's exact expected stdout,
  // or (for tools with non-deterministic full stdout, e.g. ansible/docker)
  // the expectedContains string that must appear in the output. Distractors
  // are other exercises' outputs from the same track.
  const allOutputs = lessons
    .flatMap((l) => l.exercise.tests)
    .map((t) => (t.expectedStdout ?? t.expectedContains) as string | undefined)
    .filter((v): v is string => v !== undefined)
    .map((v) => v.trim())
    .filter((v, i, a) => a.indexOf(v) === i);
  for (const [qi, li] of [1, 5, 9].entries()) {
    const lesson = lessons[li];
    const test = lesson.exercise.tests.find((t) => !t.hidden && (t.expectedStdout !== undefined || t.expectedContains !== undefined));
    if (!test || (test.expectedStdout === undefined && test.expectedContains === undefined)) {
      throw new Error(`track ${track.slug}: lesson ${lesson.id} must be a code exercise whose first visible test has an exact expectedStdout or an expectedContains (assessment code-reading needs a real answer)`);
    }
    const exact = test.expectedStdout !== undefined;
    const correct = (exact ? test.expectedStdout : test.expectedContains)!.trim();
    const distractors = allOutputs.filter((o) => o !== correct).slice(0, 3);
    for (const fb of CODE_READING_FALLBACKS) {
      if (distractors.length >= 3) break;
      if (!distractors.includes(fb)) distractors.push(fb);
    }
    const placed = placeCorrect(correct, distractors.slice(0, 3), qi + 1);
    const inputDesc = test.stdin !== undefined && test.stdin !== ''
      ? `when the input is ${JSON.stringify(test.stdin.trim())}`
      : 'with no input';
    questions.push({
      id: `${track.slug}-aq${6 + qi}`,
      kind: 'code-reading',
      topic: lesson.title,
      question: exact
        ? `What is the output of this ${lang} program ${inputDesc}?`
        : `Which of these appears in the output of this ${lang} program ${inputDesc}?`,
      code: lesson.exercise.solution,
      options: placed.options,
      answer: placed.answer,
      explanation: exact
        ? `Running the program ${inputDesc} prints exactly ${JSON.stringify(correct)}.`
        : `Running the program ${inputDesc} produces output containing ${JSON.stringify(correct)}.`,
    });
  }

  // 2 debugging: lessons 3, 7 — from the lesson bug pairs.
  for (const [qi, li] of [3, 7].entries()) {
    const lesson = lessons[li];
    const placed = placeCorrect(
      lesson.bug.explanation,
      DEBUG_DISTRACTORS.filter((d) => d !== lesson.bug.explanation).slice(0, 3),
      qi + 3,
    );
    questions.push({
      id: `${track.slug}-aq${9 + qi}`,
      kind: 'debugging',
      topic: lesson.title,
      question: lesson.bug.prompt,
      code: lesson.bug.buggyCode,
      options: placed.options,
      answer: placed.answer,
      explanation: lesson.bug.explanation,
    });
  }

  const prog = toExerciseSpec(track.capstoneExercise);
  prog.id = `${track.slug}-cap-e1`;
  prog.language = track.language;
  return buildShortAssessment(track.slug, questions, prog, track.capstone);
}

// ---------------------------------------------------------------------------
// Track expansion
// ---------------------------------------------------------------------------
export function expandTrack(track: CompactTrack): { course: Course; assessment: MasteryAssessment } {
  if (!track.id || !track.slug || !track.title) throw new Error('track needs id/slug/title');
  if (!track.analogy.includes('{topic}')) {
    throw new Error(`track ${track.slug}: analogy must contain a {topic} placeholder`);
  }
  if (!track.skills || track.skills.length < 3) throw new Error(`track ${track.slug}: needs >= 3 skills`);
  if (!track.capstone?.title || !track.capstone.requirements?.length || !track.capstone.rubric?.length) {
    throw new Error(`track ${track.slug}: capstone needs title/requirements/rubric`);
  }
  validateExercise(track.capstoneExercise, `track ${track.slug} capstone exercise`);

  const lessons = track.modules.flatMap((m) => m.lessons);
  if (lessons.length !== 10) {
    throw new Error(`track ${track.slug}: needs exactly 10 lessons, got ${lessons.length}`);
  }
  const seen = new Set<string>();
  for (const l of lessons) {
    if (seen.has(l.id)) throw new Error(`track ${track.slug}: duplicate lesson id ${l.id}`);
    seen.add(l.id);
    if (!l.concept || l.concept.length < 40) throw new Error(`lesson ${l.id}: concept too short (needs >= 40 chars of real explanation)`);
    if (!l.syntax || !l.exampleCode || !l.mistake) throw new Error(`lesson ${l.id}: needs syntax/exampleCode/mistake`);
    if (!l.bug?.prompt || !l.bug?.buggyCode || !l.bug?.fixedCode || !l.bug?.explanation) {
      throw new Error(`lesson ${l.id}: debugging exercise incomplete`);
    }
    validateExercise(l.exercise, `lesson ${l.id}`);
  }
  // Assessment code-reading questions come from lessons 1, 5, 9 (0-based):
  // they must be code exercises whose first visible test has an exact
  // expectedStdout or an expectedContains. The capstone exercise must be a
  // code exercise too.
  for (const li of [1, 5, 9]) {
    const l = lessons[li];
    if (!isCodeType(l.exercise.type)) {
      throw new Error(`track ${track.slug}: lesson ${l.id} (index ${li}) must be a code exercise — the assessment code-reading question is built from it`);
    }
    const t = l.exercise.tests.find((x) => !x.hidden);
    if (!t || (t.expectedStdout === undefined && t.expectedContains === undefined)) {
      throw new Error(`track ${track.slug}: lesson ${l.id} (index ${li}) needs an exact expectedStdout or an expectedContains on its first visible test`);
    }
  }
  if (!isCodeType(track.capstoneExercise.type)) {
    throw new Error(`track ${track.slug}: capstone exercise must be a code exercise`);
  }

  const spec: CourseSpec = {
    id: track.id,
    slug: track.slug,
    language: track.language,
    category: track.category,
    title: track.title,
    description: track.description,
    difficulty: track.difficulty,
    estimatedHours: track.estimatedHours,
    skills: track.skills,
    prerequisites: track.prerequisites,
    modules: track.modules.map((m): ModuleSpec => ({
      id: m.id,
      title: m.title,
      description: `${m.title} in the ${track.title} track.`,
      level: m.level,
      order: track.modules.indexOf(m) + 1,
      lessons: m.lessons.map((l) => expandLesson(track, l, lessons.indexOf(l))),
    })),
  };
  const course = buildCourse(spec);
  const assessment = deriveAssessment(track, lessons);
  return { course, assessment };
}

export function expandTracks(tracks: CompactTrack[]): { courses: Course[]; assessments: MasteryAssessment[] } {
  const courses: Course[] = [];
  const assessments: MasteryAssessment[] = [];
  const slugs = new Set<string>();
  for (const t of tracks) {
    if (slugs.has(t.slug)) throw new Error(`duplicate track slug ${t.slug}`);
    slugs.add(t.slug);
    const { course, assessment } = expandTrack(t);
    courses.push(course);
    assessments.push(assessment);
  }
  return { courses, assessments };
}

// Re-exported for data-file authors that want the raw builder too.
export type { CourseSpec, ExerciseSpec, LessonSpec, ModuleSpec };
export type { Course, Exercise, Hint, Lesson, MasteryAssessment, Module, QuizQuestion, TestCase };
