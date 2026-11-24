// Builder for CodeForge Academy curriculum content (v1 + 100-track expansion).
// Authors write compact LessonSpec objects; this builds the full Lesson schema
// (5 hints, quiz, debugging exercise, etc.) so schema compliance is enforced
// by construction instead of by hand-checking 1,000 lesson objects.
//
// Rules enforced here:
// - exactly 1 exercise per lesson (same as v1: lessons == exercises)
// - exactly 5 hints, levels 1..5, with lesson-specific content supplied by
//   the author via hintNotes (concept / approach / structure). Level 4 uses
//   the lesson's own first common mistake; level 5 is the real solution.
// - >= 2 knowledge-check questions per lesson (validated by check-tracks.mjs)
import type {
  AssessmentQuestion, Course, Exercise, Hint, Lesson, MasteryAssessment,
  Module, QuizQuestion, TestCase,
} from './types.js';

export interface ExerciseSpec {
  id: string;
  title: string;
  type: Exercise['type'];
  instructions: string;
  starterCode: string;
  solution: string;
  solutionExplanation: string;
  complexity?: string;
  tests: TestCase[];
  /** Author-written, lesson-specific hint text (short, 1-3 sentences each). */
  hintNotes: { concept: string; approach: string; structure: string };
  options?: string[];
  answerIndex?: number;
  /** Execution language for assessment programming exercises (defaults to the course exec language). */
  language?: string;
}

export interface LessonSpec {
  id: string;
  slug: string;
  title: string;
  objectives: string[];
  introduction: string;
  concept: string;
  syntax: string;
  analogy: string;
  exampleCode: string;
  /** Execution language id: python | javascript | typescript | c | cpp | rust | go |
   *  java | bash | perl | sql | asm | html. For tracks whose real toolchain is
   *  missing, use the real language id anyway — the executor returns an honest
   *  503 (runtime_unavailable). Quiz-style exercises (multiple-choice /
   *  predict-output) are graded by answer and never touch the executor. */
  exampleLanguage: string;
  walkthrough: string[];
  commonMistakes: string[];
  debugging: { prompt: string; buggyCode: string; fixedCode: string; explanation: string };
  miniChallenge: string;
  summary: string;
  quiz: QuizQuestion[];
  exercise: ExerciseSpec;
}

export interface ModuleSpec {
  id: string;
  title: string;
  description: string;
  level: Module['level'];
  order: number;
  lessons: LessonSpec[];
}

export interface CourseSpec {
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
  modules: ModuleSpec[];
}

export function buildHints(ex: ExerciseSpec, firstMistake: string): Hint[] {
  const solutionBody = ex.type === 'multiple-choice' || ex.type === 'predict-output'
    ? `The correct answer is: ${ex.options?.[ex.answerIndex ?? 0] ?? '(see explanation)'}. ${ex.solutionExplanation}`
    : `${ex.solution}\n\n${ex.solutionExplanation}${ex.complexity ? `\nComplexity: ${ex.complexity}.` : ''}`;
  return [
    { level: 1, title: 'Conceptual hint', content: ex.hintNotes.concept },
    { level: 2, title: 'Approach hint', content: ex.hintNotes.approach },
    { level: 3, title: 'Structural hint', content: ex.hintNotes.structure },
    {
      level: 4, title: 'Debugging hint',
      content: `A common mistake here is: ${firstMistake} Check your code for that first — if your output is wrong, compare each step against the expected output and isolate the first line where they differ.`,
    },
    {
      level: 5, title: 'Solution',
      content: `Complete solution with explanation:\n${solutionBody}\n\nWhy it works: ${ex.solutionExplanation}`,
    },
  ];
}

export function buildExercise(spec: ExerciseSpec, firstMistake: string): Exercise {
  if (!spec.tests || spec.tests.length === 0) {
    throw new Error(`exercise ${spec.id} has no tests`);
  }
  if ((spec.type === 'multiple-choice' || spec.type === 'predict-output')
    && (spec.answerIndex === undefined || !spec.options || spec.options.length < 2)) {
    throw new Error(`quiz exercise ${spec.id} needs options + answerIndex`);
  }
  const { language: _language, ...rest } = spec;
  void _language;
  return { ...rest, hints: buildHints(spec, firstMistake) };
}

export function buildLesson(spec: LessonSpec): Lesson {
  if (!spec.objectives || spec.objectives.length === 0) throw new Error(`lesson ${spec.id} has no objectives`);
  if (!spec.quiz || spec.quiz.length < 2) throw new Error(`lesson ${spec.id} needs >= 2 knowledge-check questions`);
  if (!spec.walkthrough || spec.walkthrough.length < 3) throw new Error(`lesson ${spec.id} needs >= 3 walkthrough steps`);
  if (!spec.commonMistakes || spec.commonMistakes.length === 0) throw new Error(`lesson ${spec.id} has no common mistakes`);
  const { exercise, quiz, ...rest } = spec;
  return {
    ...rest,
    knowledgeCheck: quiz,
    debuggingExercise: spec.debugging,
    exercises: [buildExercise(exercise, spec.commonMistakes[0])],
  };
}

export function buildCourse(spec: CourseSpec): Course {
  const modules: Module[] = spec.modules.map((m) => ({
    id: m.id, title: m.title, description: m.description, level: m.level, order: m.order,
    lessons: m.lessons.map(buildLesson),
  }));
  const { modules: _m, ...rest } = spec;
  void _m;
  return { ...rest, modules };
}

/** Short end-of-track assessment for the 93 new tracks: 10 questions
 *  (5 conceptual, 3 code-reading, 2 debugging) + 1 programming exercise + capstone.
 *  Pass 80%, same as the v1 mastery assessments. */
export function buildShortAssessment(
  courseSlug: string,
  questions: AssessmentQuestion[],
  programming: ExerciseSpec,
  capstone: MasteryAssessment['capstone'],
): MasteryAssessment {
  if (questions.length !== 10) throw new Error(`assessment ${courseSlug} needs exactly 10 questions, got ${questions.length}`);
  const kinds = questions.map((q) => q.kind);
  const count = (k: string) => kinds.filter((x) => x === k).length;
  if (count('conceptual') !== 5 || count('code-reading') !== 3 || count('debugging') !== 2) {
    throw new Error(`assessment ${courseSlug} needs 5 conceptual + 3 code-reading + 2 debugging questions`);
  }
  const prog = buildExercise(programming, `Rushing the requirements of "${programming.title}" instead of reading them first — re-read the task and list the required inputs and outputs before coding.`);
  return {
    courseSlug,
    passPercent: 80,
    questions,
    programmingExercises: [{ ...prog, language: programming.language } as Exercise & { language?: string }] as unknown as Exercise[],
    capstone,
  };
}
