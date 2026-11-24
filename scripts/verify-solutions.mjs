#!/usr/bin/env node
// Batch-verifies every code exercise's stored solution against its own tests
// using the real executor (dist build). Quiz exercises are checked for a valid
// answerIndex instead. Unavailable runtimes are counted as `unavailable`
// (honest 503), not failures. Usage:
//   npm run build --workspace=backend && node scripts/verify-solutions.mjs [out.json]
// Exit 0 only if zero solution failures.
import { pathToFileURL } from 'node:url';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFileSync } from 'node:fs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'backend', 'dist');
const outPath = process.argv[2] || join(root, 'solution-check.json');

const { runCode } = await import(pathToFileURL(join(dist, 'execution', 'executor.js')).href);

const files = [
  ['curriculum/data/c.js', ['C_COURSE']], ['curriculum/data/cpp.js', ['CPP_COURSE']],
  ['curriculum/data/python.js', ['PYTHON_COURSE']], ['curriculum/data/typescript.js', ['TYPESCRIPT_COURSE']],
  ['curriculum/data/react.js', ['REACT_COURSE']], ['curriculum/data/rust.js', ['RUST_COURSE']],
  ['curriculum/data/go.js', ['GO_COURSE']],
  ['curriculum/data/tracks-languages.js', ['TRACKS_LANGUAGES']],
  ['curriculum/data/tracks-web.js', ['TRACKS_WEB']],
  ['curriculum/data/tracks-mobile.js', ['TRACKS_MOBILE']],
  ['curriculum/data/tracks-data.js', ['TRACKS_DATA']],
  ['curriculum/data/tracks-databases.js', ['TRACKS_DATABASES']],
  ['curriculum/data/tracks-devops.js', ['TRACKS_DEVOPS']],
  ['curriculum/data/tracks-cs.js', ['TRACKS_CS']],
];

function checkTest(stdout, t) {
  const out = stdout.trim();
  if (t.expectedStdout !== undefined) return out === t.expectedStdout.trim();
  if (t.expectedContains !== undefined) return stdout.includes(t.expectedContains);
  return false;
}

const results = { passed: 0, failed: [], unavailable: 0, quiz: 0, total: 0 };
for (const [rel, keys] of files) {
  let mod;
  try { mod = await import(pathToFileURL(join(dist, rel)).href); }
  catch (e) { console.log(`SKIP ${rel}: ${e.message}`); continue; }
  const courses = [];
  for (const k of keys) if (Array.isArray(mod[k])) courses.push(...mod[k]); else if (mod[k]) courses.push(mod[k]);
  for (const c of courses) {
    for (const m of c.modules || []) {
      for (const l of m.lessons || []) {
        for (const ex of l.exercises || []) {
          results.total++;
          if (ex.type === 'multiple-choice' || ex.type === 'predict-output') {
            results.quiz++;
            if (ex.answerIndex === undefined || !ex.options || ex.answerIndex >= ex.options.length) {
              results.failed.push({ id: ex.id, reason: 'bad quiz answerIndex/options' });
            }
            continue;
          }
          let unavailable = false, ok = true, detail = '';
          for (const t of ex.tests || []) {
            const r = await runCode({ language: l.exampleLanguage, code: ex.solution, stdin: t.stdin ?? '' });
            if (r.runtimeUnavailable) { unavailable = true; break; }
            if (!r.success || r.timedOut || !checkTest(r.stdout, t)) {
              ok = false;
              detail = `test "${t.name}": success=${r.success} timedOut=${r.timedOut} stdout=${JSON.stringify(r.stdout.slice(0, 200))} stderr=${r.stderr.slice(0, 300)}`;
              break;
            }
          }
          if (unavailable) results.unavailable++;
          else if (ok) results.passed++;
          else results.failed.push({ id: ex.id, language: l.exampleLanguage, reason: detail });
        }
      }
    }
  }
  console.log(`done ${rel}: total=${results.total} passed=${results.passed} unavailable=${results.unavailable} failed=${results.failed.length}`);
}
writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`\nTOTAL exercises: ${results.total}  solution-passed: ${results.passed}  quiz: ${results.quiz}  unavailable-runtime: ${results.unavailable}  FAILED: ${results.failed.length}`);
for (const f of results.failed.slice(0, 30)) console.log(`  FAIL ${f.id} [${f.language || ''}] ${f.reason}`);
process.exit(results.failed.length ? 1 : 0);
