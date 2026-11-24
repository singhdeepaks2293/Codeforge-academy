// Shared curriculum content types. Content lives in backend/src/curriculum/data/*.ts
// and is seeded into SQLite at startup. The frontend never hardcodes lesson text.
// Execution/display language id. v1 used the 7 ids below; the 100-track
// expansion adds more (java, javascript, bash, sql, asm, perl, html, and
// ids for toolchains that may be missing on a given host — those return an
// honest runtime_unavailable 503 instead of a fake run).
export type LanguageId = 'c' | 'cpp' | 'python' | 'typescript' | 'react' | 'rust' | 'go' | (string & {});
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type ExerciseType =
  | 'write-code' | 'fill-blank' | 'predict-output' | 'find-bug' | 'fix-bug'
  | 'refactor' | 'multiple-choice' | 'build-function' | 'build-program' | 'test-driven';

export interface TestCase {
  name: string;
  /** stdin fed to the program */
  stdin?: string;
  /** exact expected stdout (trimmed comparison) */
  expectedStdout?: string;
  /** substring that must appear in stdout */
  expectedContains?: string;
  hidden: boolean;
}

export interface Hint {
  level: 1 | 2 | 3 | 4 | 5;
  title: string;
  content: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  /** index into options */
  answer: number;
  explanation: string;
}

export interface Exercise {
  id: string;
  title: string;
  type: ExerciseType;
  instructions: string;
  starterCode: string;
  solution: string;
  solutionExplanation: string;
  complexity?: string;
  tests: TestCase[];
  hints: Hint[]; // exactly 5, levels 1..5
  /** multiple-choice options (for multiple-choice / predict-output) */
  options?: string[];
  answerIndex?: number;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  objectives: string[];
  introduction: string;
  concept: string;
  syntax: string;
  analogy: string;
  exampleCode: string;
  exampleLanguage: string;
  walkthrough: string[];
  commonMistakes: string[];
  debuggingExercise: {
    prompt: string;
    buggyCode: string;
    fixedCode: string;
    explanation: string;
  };
  miniChallenge: string;
  summary: string;
  knowledgeCheck: QuizQuestion[];
  exercises: Exercise[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  level: Level;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  language: LanguageId;
  /** Catalog group: languages | web | mobile | data-ai | databases | devops | cs-career (v1 tracks: 'languages'). */
  category?: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All levels';
  estimatedHours: number;
  skills: string[];
  prerequisites: string[];
  modules: Module[];
}

export interface AssessmentQuestion {
  id: string;
  kind: 'conceptual' | 'code-reading' | 'debugging';
  topic: string;
  question: string;
  code?: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface MasteryAssessment {
  courseSlug: string;
  passPercent: number;
  questions: AssessmentQuestion[]; // 20 conceptual + 10 code-reading + 10 debugging
  programmingExercises: Exercise[]; // 5
  capstone: {
    title: string;
    description: string;
    requirements: string[];
    rubric: string[];
  };
}

export type DsaDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface DsaProblem {
  id: string;
  slug: string;
  title: string;
  difficulty: DsaDifficulty;
  topics: string[];
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: Record<string, string>; // language -> starter, at least 'python'
  tests: TestCase[];
  hints: Hint[];
  solutionDiscussion: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface ProjectMilestone {
  id: string;
  order: number;
  title: string;
  objectives: string[];
  instructions: string;
  concepts: string[];
  hints: string[];
  acceptanceCriteria: string[];
  tests: string[];
}

export interface Project {
  id: string;
  slug: string;
  level: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  skills: string[];
  language: string;
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  architecture: string;
  databaseSchema?: string;
  apis?: string[];
  fileStructure: string;
  taskBreakdown: string[];
  milestones: ProjectMilestone[];
  reviewChecklist: string[];
  finalAssessment: string[];
}
