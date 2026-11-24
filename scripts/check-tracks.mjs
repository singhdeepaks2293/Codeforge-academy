#!/usr/bin/env node
// Validates curriculum data files after `npm run build --workspace=backend`.
// Usage: node scripts/check-tracks.mjs [backend/dist dir]
// Checks: course/lesson/exercise counts, required fields, exactly 5 hints,
// >=2 tests (1 visible + 1 hidden) for code exercises, >=2 quiz questions,
// unique lesson/exercise ids, concept-opening duplication, assessment shape.
// Exit 0 only if everything passes.
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
// --skip-totals: validate structure only (duplicates, hints, tests, openings)
// without the final totals — for incremental work while tracks still land.
const skipTotals = process.argv.includes('--skip-totals');
const distArg = process.argv.slice(2).find((a) => !a.startsWith('--'));
const dist = distArg || join(root, 'backend', 'dist');
let errors = 0, warnings = 0;
function err(msg) { errors++; console.error(`  FAIL ${msg}`); }
function warn(msg) { warnings++; console.log(`  WARN ${msg}`); }

const singleCourses = [
  ['curriculum/data/c.js', 'C_COURSE'], ['curriculum/data/cpp.js', 'CPP_COURSE'],
  ['curriculum/data/python.js', 'PYTHON_COURSE'], ['curriculum/data/typescript.js', 'TYPESCRIPT_COURSE'],
  ['curriculum/data/react.js', 'REACT_COURSE'], ['curriculum/data/rust.js', 'RUST_COURSE'],
  ['curriculum/data/go.js', 'GO_COURSE'],
];
const trackArrays = [
  ['curriculum/data/tracks-languages.js', 'TRACKS_LANGUAGES'],
  ['curriculum/data/tracks-web.js', 'TRACKS_WEB'],
  ['curriculum/data/tracks-mobile.js', 'TRACKS_MOBILE'],
  ['curriculum/data/tracks-data.js', 'TRACKS_DATA'],
  ['curriculum/data/tracks-databases.js', 'TRACKS_DATABASES'],
  ['curriculum/data/tracks-devops.js', 'TRACKS_DEVOPS'],
  ['curriculum/data/tracks-cs.js', 'TRACKS_CS'],
];
const assessmentArrays = [
  ['curriculum/data/tracks-languages.js', 'SHORT_ASSESSMENTS_LANGUAGES'],
  ['curriculum/data/tracks-web.js', 'SHORT_ASSESSMENTS_WEB'],
  ['curriculum/data/tracks-mobile.js', 'SHORT_ASSESSMENTS_MOBILE'],
  ['curriculum/data/tracks-data.js', 'SHORT_ASSESSMENTS_DATA'],
  ['curriculum/data/tracks-databases.js', 'SHORT_ASSESSMENTS_DATABASES'],
  ['curriculum/data/tracks-devops.js', 'SHORT_ASSESSMENTS_DEVOPS'],
  ['curriculum/data/tracks-cs.js', 'SHORT_ASSESSMENTS_CS'],
];
// 700-track expansion: every tracks700-*.js exports TRACKS_700 + SHORT_ASSESSMENTS_700.
const sevenHundred = readdirSync(join(dist, 'curriculum', 'data'))
  .filter((f) => f.startsWith('tracks700-') && f.endsWith('.js')).sort();
for (const f of sevenHundred) {
  trackArrays.push([`curriculum/data/${f}`, 'TRACKS_700']);
  assessmentArrays.push([`curriculum/data/${f}`, 'SHORT_ASSESSMENTS_700']);
}

async function load(rel, key) {
  try {
    const mod = await import(pathToFileURL(join(dist, rel)).href);
    if (!(key in mod)) { err(`${rel} missing export ${key}`); return null; }
    return mod[key];
  } catch (e) { err(`cannot import ${rel}: ${e.message}`); return null; }
}

const courses = [];
for (const [rel, key] of singleCourses) {
  const c = await load(rel, key);
  if (c) courses.push(c);
}
const perFile = {};
for (const [rel, key] of trackArrays) {
  const arr = await load(rel, key);
  if (Array.isArray(arr)) { courses.push(...arr); perFile[rel] = arr.length; }
  else if (arr !== null) err(`${rel}:${key} is not an array`);
}
for (const [rel, key] of assessmentArrays) {
  const arr = await load(rel, key);
  if (Array.isArray(arr)) {
    for (const a of arr) {
      if (a.questions?.length !== 10) err(`assessment ${a.courseSlug} has ${a.questions?.length} questions (need 10)`);
      if (a.programmingExercises?.length !== 1) err(`assessment ${a.courseSlug} has ${a.programmingExercises?.length} programming exercises (need 1)`);
      if (a.passPercent !== 80) err(`assessment ${a.courseSlug} passPercent=${a.passPercent} (need 80)`);
    }
  }
}

let lessons = 0, exercises = 0;
const lessonIds = new Set(), exerciseIds = new Set(), courseSlugs = new Set(), courseTitles = new Set();
const perLang = {};
const openings = new Map();
const noTests = [], noHints = [], noQuiz = [];
for (const c of courses) {
  if (courseSlugs.has(c.slug)) err(`duplicate course slug ${c.slug}`);
  courseSlugs.add(c.slug);
  if (courseTitles.has(c.title)) err(`duplicate course title "${c.title}" (slug ${c.slug})`);
  courseTitles.add(c.title);
  perLang[c.language] = (perLang[c.language] || 0) + 1;
  if (!c.category && !['c','cpp','python','typescript','react','rust','go'].includes(c.id)) {
    // category lives on CourseSpec; buildCourse strips it — check via modules instead.
  }
  for (const m of c.modules || []) {
    for (const l of m.lessons || []) {
      lessons++;
      if (lessonIds.has(l.id)) err(`duplicate lesson id ${l.id}`);
      lessonIds.add(l.id);
      for (const f of ['introduction','concept','syntax','analogy','exampleCode','summary','miniChallenge']) {
        if (!l[f] || String(l[f]).trim().length < 10) err(`lesson ${l.id} field ${f} too short/missing`);
      }
      if (!l.title || String(l.title).trim().length < 2) err(`lesson ${l.id} field title too short/missing`);
      if (!l.objectives?.length) err(`lesson ${l.id} has no objectives`);
      if (!l.walkthrough || l.walkthrough.length < 3) err(`lesson ${l.id} walkthrough < 3 steps`);
      if (!l.commonMistakes?.length) err(`lesson ${l.id} has no common mistakes`);
      if (!l.debuggingExercise?.buggyCode || !l.debuggingExercise?.fixedCode) err(`lesson ${l.id} debugging exercise incomplete`);
      if (!l.knowledgeCheck || l.knowledgeCheck.length < 2) noQuiz.push(l.id);
      const open = String(l.concept || '').slice(0, 60);
      openings.set(open, (openings.get(open) || 0) + 1);
      for (const ex of l.exercises || []) {
        exercises++;
        if (exerciseIds.has(ex.id)) err(`duplicate exercise id ${ex.id}`);
        exerciseIds.add(ex.id);
        if (!ex.hints || ex.hints.length !== 5 || !ex.hints.every((h, i) => h.level === i + 1)) noHints.push(ex.id);
        if (!ex.solution || String(ex.solution).trim().length === 0) err(`exercise ${ex.id} has no solution`);
        if (ex.type === 'multiple-choice' || ex.type === 'predict-output') {
          if (ex.answerIndex === undefined || !ex.options || ex.answerIndex >= ex.options.length) err(`quiz exercise ${ex.id} has bad options/answerIndex`);
        } else {
          const vis = (ex.tests || []).filter((t) => !t.hidden).length;
          const hid = (ex.tests || []).filter((t) => t.hidden).length;
          // Strict visible+hidden rule applies to the 93 new tracks only;
          // v1 tracks (grandfathered) need at least one test of either kind.
          const slug = ex.id.split('-m')[0];
          const isV1 = ['c', 'cpp', 'python', 'typescript', 'react', 'rust', 'go'].includes(slug);
          if (isV1 ? (vis + hid < 1) : (vis < 1 || hid < 1)) noTests.push(`${ex.id} (visible=${vis} hidden=${hid})`);
        }
      }
      if ((l.exercises || []).length !== 1) err(`lesson ${l.id} has ${(l.exercises || []).length} exercises (need exactly 1)`);
    }
  }
}
if (noTests.length) err(`exercises without visible+hidden tests: ${noTests.slice(0, 10).join(', ')}${noTests.length > 10 ? ` … +${noTests.length - 10} more` : ''}`);
if (noHints.length) err(`exercises without exactly 5 hints: ${noHints.slice(0, 10).join(', ')}${noHints.length > 10 ? ` … +${noHints.length - 10} more` : ''}`);
if (noQuiz.length) err(`lessons with <2 quiz questions: ${noQuiz.slice(0, 10).join(', ')}${noQuiz.length > 10 ? ` … +${noQuiz.length - 10} more` : ''}`);
const dupOpenings = [...openings.entries()].filter(([, n]) => n > 2).sort((a, b) => b[1] - a[1]);
if (dupOpenings.length) err(`concept openings repeated >2x: ${dupOpenings.slice(0, 5).map(([s, n]) => `${n}x "${s}"`).join(' | ')}`);
else console.log('  PASS concept openings: most-repeated <= 2x');

console.log(`\nCourses: ${courses.length}  Lessons: ${lessons}  Exercises: ${exercises}`);
console.log(`Per new-track file: ${JSON.stringify(perFile)}`);
console.log(`Per core language: ${JSON.stringify(perLang)}`);
console.log(`Errors: ${errors}  Warnings: ${warnings}`);
if (!skipTotals) {
  // Final totals: 100 existing tracks + 653 new language tracks (98 C,
  // 99 C++, 62 Python, 97 TypeScript, 99 React, 99 Rust, 99 Go) + 40 new
  // DevOps tool tracks (10 each Ansible/Terraform/Docker/Git) + 70 new
  // Network Automation tracks (10 each in 7 areas) + 1 Lightweight LLM
  // track (12 lessons) = 864 courses; every new track has exactly 10
  // lessons except the LLM track (12)
  // => 1354 + 6530 + 400 + 700 + 12 = 8996 lessons/exercises.
  if (courses.length !== 864) err(`TOTAL courses ${courses.length} != 864`);
  if (lessons !== 8996) err(`TOTAL lessons ${lessons} != 8996`);
  if (exercises !== 8996) err(`TOTAL exercises ${exercises} != 8996`);
  // Core languages stay at exactly 100 tracks each — except python, which
  // also carries the 50 Python-language Network Automation tracks
  // (5 areas x 10) plus the 1 Lightweight LLM track, so python is 151.
  for (const lang of ['c', 'cpp', 'typescript', 'react', 'rust', 'go']) {
    if ((perLang[lang] || 0) !== 100) err(`language ${lang} has ${perLang[lang] || 0} tracks (need exactly 100)`);
  }
  if ((perLang['python'] || 0) !== 151) err(`language python has ${perLang['python'] || 0} tracks (need exactly 151)`);
} else {
  console.log('(totals skipped: --skip-totals)');
}
process.exit(errors ? 1 : 0);
