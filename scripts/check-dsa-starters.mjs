#!/usr/bin/env node
// Checks every DSA starter against every test of its problem, in every one
// of the 8 DSA languages (python, javascript, typescript, c, cpp, java, go,
// rust), using the REAL compilers/runtimes — never the backend executor's
// per-run mkdtemp (/tmp is a 512 MB tmpfs here) and never a fake pass.
//
// Sources:
//   - problems (tests + python/javascript starters): backend/dist/curriculum/data/dsa.js
//   - the six newer languages: backend/dist/curriculum/data/dsa-starters-{c,cpp,java,go,rust,typescript}.js,
//     each exporting a Record<problemId, starterCode>. A starter file that
//     does not exist (yet) is reported as MISSING for every problem, not a
//     crash — the language agents land those files in parallel.
//
// Method: compile each starter ONCE per problem (gcc / g++ / rustc / go
// build / TS transpile; Java uses single-file launch `java Main.java` like
// production, since the Docker image ships no javac), then run the binary
// once per test (visible + hidden) with the test's stdin and compare stdout
// exactly after trimming trailing whitespace/newlines.
//
// Workdirs live under <repo>/.dsa-check-tmp (persistent disk, removed at
// the end); Go's build cache lives under ~/.toolchains/go-cache.
//
// Usage:
//   npm run build --workspace=backend   # FIRST — this reads dist, like verify-solutions.mjs
//   node scripts/check-dsa-starters.mjs [out.json] [--langs=python,javascript]
// Exit 0 only when zero starters fail AND zero are missing. A language
// whose runtime binary is absent is counted `unavailable` (honest, not a
// failure) — but it still means that language was not actually checked.
import { pathToFileURL } from 'node:url';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { access, constants } from 'node:fs/promises';
import { homedir } from 'node:os';
import { createRequire } from 'node:module';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'backend', 'dist');
const outPath = process.argv.find((a) => a.endsWith('.json')) || join(root, 'dsa-starter-check.json');
const langsArg = process.argv.find((a) => a.startsWith('--langs='));
const LANGS = ['python', 'javascript', 'typescript', 'c', 'cpp', 'java', 'go', 'rust'];
const WANTED = langsArg ? langsArg.slice('--langs='.length).split(',').map((s) => s.trim()).filter(Boolean) : LANGS;
for (const l of WANTED) if (!LANGS.includes(l)) { console.error(`unknown language: ${l}`); process.exit(2); }

// Persistent-disk work area (NOT os.tmpdir() — /tmp is a 512 MB tmpfs).
const WORK_BASE = join(root, '.dsa-check-tmp');
const GO_TOOLCHAIN = join(root, '..', '.toolchains', 'go', 'bin', 'go');
const GO_CACHE = join(root, '..', '.toolchains', 'go-cache');
const CONCURRENCY = Math.max(1, Number(process.env.DSA_CHECK_CONCURRENCY || 4));
const TEST_TIMEOUT_MS = 10_000;
// Java single-file launch compiles on every run, so its per-test budget is
// larger; compile steps get a generous budget because this sandbox's shared
// CPU makes wall-clock compile times ~10-20x CPU time (g++ on
// bits/stdc++.h measured 78s wall / 4s CPU here). On real hardware these
// are seconds; the generous caps only bite when a host is genuinely slow.
const JAVA_TEST_TIMEOUT_MS = 60_000;
const COMPILE_TIMEOUT_MS = 120_000;

async function fileExists(p) { try { await access(p, constants.X_OK); return true; } catch { return false; } }

async function findBin(candidates) {
  for (const c of candidates) if (c && (await fileExists(c))) return c;
  return null;
}

const BIN = {
  python3: await findBin(['/usr/bin/python3', '/usr/local/bin/python3']),
  node: await findBin(['/usr/local/bin/node', '/usr/bin/node']),
  gcc: await findBin(['/usr/bin/gcc', '/usr/local/bin/gcc']),
  gpp: await findBin(['/usr/bin/g++', '/usr/local/bin/g++']),
  java: await findBin(['/usr/bin/java', '/usr/local/bin/java']),
  go: await findBin([process.env.DSA_GO_BIN, GO_TOOLCHAIN, '/usr/local/go/bin/go', '/usr/local/bin/go', '/usr/bin/go'].filter(Boolean)),
  rustc: await findBin([join(homedir(), '.cargo', 'bin', 'rustc'), '/usr/local/cargo/bin/rustc', '/usr/bin/rustc']),
};
// PATH fallback for anything not found at a fixed location.
for (const [key, name] of [['python3', 'python3'], ['node', 'node'], ['gcc', 'gcc'], ['gpp', 'g++'], ['java', 'java'], ['go', 'go'], ['rustc', 'rustc']]) {
  if (!BIN[key]) {
    for (const dir of (process.env.PATH || '').split(':')) {
      if (dir && (await fileExists(join(dir, name)))) { BIN[key] = join(dir, name); break; }
    }
  }
}

const requireFromHere = createRequire(import.meta.url);
function resolveTs() {
  try { return requireFromHere.resolve('typescript/lib/typescript.js'); } catch { return null; }
}
const TS_LIB = resolveTs();

// ---- Load problems + starter files (dist build) ---------------------------
if (!existsSync(join(dist, 'curriculum', 'data', 'dsa.js'))) {
  console.error('backend/dist is missing the compiled DSA data. Run `npm run build --workspace=backend` first.');
  process.exit(2);
}
const { DSA_PROBLEMS } = await import(pathToFileURL(join(dist, 'curriculum', 'data', 'dsa.js')).href);
if (!Array.isArray(DSA_PROBLEMS) || DSA_PROBLEMS.length === 0) {
  console.error('no DSA problems loaded from backend/dist/curriculum/data/dsa.js');
  process.exit(2);
}

const STARTER_FILES = {
  c: 'dsa-starters-c', cpp: 'dsa-starters-cpp', java: 'dsa-starters-java',
  go: 'dsa-starters-go', rust: 'dsa-starters-rust', typescript: 'dsa-starters-typescript',
};
// Each file exports a Record<problemId, code> under some name; take the
// first export that looks like one (plain object, string values).
const starters = { python: null, javascript: null }; // filled per-problem from dsa.ts
const starterFileStatus = {};
for (const [lang, base] of Object.entries(STARTER_FILES)) {
  const distFile = join(dist, 'curriculum', 'data', `${base}.js`);
  const srcFile = join(root, 'backend', 'src', 'curriculum', 'data', `${base}.ts`);
  if (!existsSync(distFile)) {
    starterFileStatus[lang] = existsSync(srcFile)
      ? 'src-present-but-not-built (run npm run build --workspace=backend)'
      : 'file-missing';
    starters[lang] = null;
    continue;
  }
  let mod;
  try { mod = await import(pathToFileURL(distFile).href); }
  catch (e) { starterFileStatus[lang] = `import-failed: ${e.message}`; starters[lang] = null; continue; }
  let record = null;
  for (const v of Object.values(mod)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && Object.values(v).every((x) => typeof x === 'string')) { record = v; break; }
  }
  if (!record) { starterFileStatus[lang] = 'no Record<string,string> export found'; starters[lang] = null; continue; }
  starterFileStatus[lang] = `ok (${Object.keys(record).length} starters)`;
  starters[lang] = record;
}

// ---- Process runner --------------------------------------------------------
function runProc(cmd, args, cwd, { stdin = '', timeoutMs = TEST_TIMEOUT_MS, env = {} } = {}) {
  const started = Date.now();
  return new Promise((resolve) => {
    let stdout = '', stderr = '', timedOut = false;
    const child = spawn(cmd, args, {
      cwd,
      env: {
        PATH: [dirname(BIN.go || ''), dirname(BIN.rustc || ''), process.env.PATH || ''].filter(Boolean).join(':'),
        HOME: homedir(),
        GOCACHE: GO_CACHE,
        GOTMPDIR: WORK_BASE,
        GOFLAGS: '-mod=mod',
        LANG: 'C.UTF-8', LC_ALL: 'C.UTF-8',
        ...env,
      },
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: timeoutMs, killSignal: 'SIGKILL',
    });
    const timer = setTimeout(() => { timedOut = true; try { child.kill('SIGKILL'); } catch { /* dead */ } }, timeoutMs);
    const cap = (s) => (s.length > 262144 ? s.slice(0, 262144) + '\n[output truncated]' : s);
    child.stdout.on('data', (d) => { stdout = cap(stdout + d.toString()); });
    child.stderr.on('data', (d) => { stderr = cap(stderr + d.toString()); });
    child.on('error', (err) => { clearTimeout(timer); resolve({ success: false, stdout, stderr: stderr + String(err), exitCode: null, timedOut, durationMs: Date.now() - started, error: String(err) }); });
    child.on('close', (code) => { clearTimeout(timer); resolve({ success: code === 0 && !timedOut, stdout, stderr, exitCode: code, timedOut, durationMs: Date.now() - started }); });
    child.stdin.on('error', () => { /* exited before reading stdin */ });
    child.stdin.end(stdin);
  });
}

function checkTest(stdout, t) {
  // Mirror production grading exactly (backend/src/routes/execute.ts):
  // both sides are fully trimmed, so a leading blank line (e.g. the empty
  // subset rendered as an empty line) does not fail a starter that the
  // production grader would pass.
  if (t.expectedStdout !== undefined) return stdout.trim() === String(t.expectedStdout).trim();
  if (t.expectedContains !== undefined) return stdout.includes(t.expectedContains);
  return false;
}

// Prepare a starter for one run: write sources, compile once. Returns
// { run: [cmd, args] } or { unavailable } or { compileError }.
async function prepare(lang, code, cwd) {
  const { writeFile } = await import('node:fs/promises');
  switch (lang) {
    case 'python': {
      if (!BIN.python3) return { unavailable: 'python3' };
      await writeFile(join(cwd, 'main.py'), code);
      return { run: [BIN.python3, ['-I', '-u', 'main.py']] };
    }
    case 'javascript': {
      if (!BIN.node) return { unavailable: 'node' };
      const isEsm = /^\s*import\s/m.test(code) || /^\s*export\s/m.test(code);
      const file = isEsm ? 'main.mjs' : 'main.cjs';
      await writeFile(join(cwd, file), code);
      return { run: [BIN.node, ['--no-warnings', file]] };
    }
    case 'typescript': {
      if (!BIN.node) return { unavailable: 'node' };
      if (!TS_LIB) return { unavailable: 'typescript-package' };
      await writeFile(join(cwd, 'main.ts'), code);
      await writeFile(join(cwd, '_compile.cjs'), `const ts=require(${JSON.stringify(TS_LIB)});const fs=require('fs');
const src=fs.readFileSync('main.ts','utf8');
const out=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022},fileName:'main.ts'});
fs.writeFileSync('main.js',out.outputText);`);
      const comp = await runProc(BIN.node, ['_compile.cjs'], cwd, { timeoutMs: COMPILE_TIMEOUT_MS, stdin: '' });
      if (!comp.success) return { compileError: `TypeScript transpile failed: ${comp.stderr.slice(0, 500)}` };
      return { run: [BIN.node, ['main.js']] };
    }
    case 'c': {
      if (!BIN.gcc) return { unavailable: 'gcc' };
      await writeFile(join(cwd, 'main.c'), code);
      const comp = await runProc(BIN.gcc, ['-O2', '-std=c17', '-Wall', '-o', 'prog', 'main.c'], cwd, { timeoutMs: COMPILE_TIMEOUT_MS, stdin: '' });
      if (!comp.success) return { compileError: `gcc failed: ${comp.stderr.slice(0, 500)}` };
      return { run: [join(cwd, 'prog'), []] };
    }
    case 'cpp': {
      if (!BIN.gpp) return { unavailable: 'g++' };
      await writeFile(join(cwd, 'main.cpp'), code);
      const comp = await runProc(BIN.gpp, ['-O2', '-std=c++20', '-Wall', '-o', 'prog', 'main.cpp'], cwd, { timeoutMs: COMPILE_TIMEOUT_MS, stdin: '' });
      if (!comp.success) return { compileError: `g++ failed: ${comp.stderr.slice(0, 500)}` };
      return { run: [join(cwd, 'prog'), []] };
    }
    case 'java': {
      // Single-file source launch, like production: the Docker image ships
      // default-jre-headless (no javac), so there is no binary to reuse.
      if (!BIN.java) return { unavailable: 'java' };
      await writeFile(join(cwd, 'Main.java'), code);
      return { run: [BIN.java, ['Main.java']] };
    }
    case 'go': {
      if (!BIN.go) return { unavailable: 'go' };
      await writeFile(join(cwd, 'main.go'), code);
      const comp = await runProc(BIN.go, ['build', '-o', 'prog', 'main.go'], cwd, { timeoutMs: COMPILE_TIMEOUT_MS, stdin: '' });
      if (!comp.success) return { compileError: `go build failed: ${(comp.stderr || comp.stdout).slice(0, 500)}` };
      return { run: [join(cwd, 'prog'), []] };
    }
    case 'rust': {
      if (!BIN.rustc) return { unavailable: 'rustc' };
      await writeFile(join(cwd, 'main.rs'), code);
      const comp = await runProc(BIN.rustc, ['-O', 'main.rs', '-o', 'prog'], cwd, { timeoutMs: COMPILE_TIMEOUT_MS, stdin: '' });
      if (!comp.success) return { compileError: `rustc failed: ${comp.stderr.slice(0, 500)}` };
      return { run: [join(cwd, 'prog'), []] };
    }
    default: return { compileError: `no runner for language ${lang}` };
  }
}

// ---- Check -----------------------------------------------------------------
const results = {
  problems: DSA_PROBLEMS.length,
  perLanguage: {},
  failures: [],
};
for (const l of WANTED) results.perLanguage[l] = { passed: 0, failed: 0, missing: 0, unavailable: 0 };
for (const [lang, status] of Object.entries(starterFileStatus)) {
  if (WANTED.includes(lang)) console.log(`starter file ${lang}: ${status}`);
}

const items = [];
for (const p of DSA_PROBLEMS) {
  for (const lang of WANTED) {
    let code;
    if (lang === 'python' || lang === 'javascript') code = p.starterCode?.[lang];
    else code = starters[lang]?.[p.id];
    items.push({ problem: p, lang, code });
  }
}

let next = 0, done = 0;
async function checkOne({ problem: p, lang, code }) {
  const stat = results.perLanguage[lang];
  if (code === undefined || code === null || code === '') { stat.missing++; return; }
  const cwd = join(WORK_BASE, `${p.id}-${lang}-${process.pid}-${Math.random().toString(36).slice(2, 8)}`);
  mkdirSync(cwd, { recursive: true });
  try {
    const prep = await prepare(lang, code, cwd);
    if (prep.unavailable) { stat.unavailable++; return; }
    if (prep.compileError) {
      stat.failed++;
      results.failures.push({ problem: p.id, language: lang, test: '(compile)', expected: '', actual: prep.compileError.slice(0, 300) });
      return;
    }
    const [cmd, args] = prep.run;
    let ok = true;
    for (const t of p.tests || []) {
      const r = await runProc(cmd, args, cwd, { stdin: t.stdin ?? '', timeoutMs: lang === 'java' ? JAVA_TEST_TIMEOUT_MS : TEST_TIMEOUT_MS });
      if (!r.success || r.timedOut || !checkTest(r.stdout, t)) {
        ok = false;
        stat.failed++;
        results.failures.push({
          problem: p.id, language: lang, test: t.name,
          expected: (t.expectedStdout ?? t.expectedContains ?? '').slice(0, 200),
          actual: r.timedOut ? '[timed out]' : (r.stdout || r.stderr || `[exit ${r.exitCode}]`).trim().slice(0, 200),
        });
        break; // one failure per problem-language keeps the report readable
      }
    }
    if (ok) stat.passed++;
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
  done++;
  if (done % 200 === 0) console.log(`  ... ${done}/${items.length} checked`);
}

async function worker() {
  while (next < items.length) {
    const item = items[next++];
    await checkOne(item);
  }
}
mkdirSync(WORK_BASE, { recursive: true });
mkdirSync(GO_CACHE, { recursive: true });
try {
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, () => worker()));
} finally {
  rmSync(WORK_BASE, { recursive: true, force: true });
}

writeFileSync(outPath, JSON.stringify(results, null, 2));
let totalFailed = 0, totalMissing = 0, totalUnavailable = 0;
console.log(`\nDSA starters: ${results.problems} problems x ${WANTED.length} language(s)`);
for (const l of WANTED) {
  const s = results.perLanguage[l];
  totalFailed += s.failed; totalMissing += s.missing; totalUnavailable += s.unavailable;
  console.log(`  ${l}: passed=${s.passed} failed=${s.failed} missing=${s.missing} unavailable=${s.unavailable}`);
}
console.log(`TOTAL failed=${totalFailed} missing=${totalMissing} unavailable=${totalUnavailable}`);
for (const f of results.failures.slice(0, 40)) {
  console.log(`  FAIL ${f.problem} [${f.language}] test "${f.test}": expected=${JSON.stringify(f.expected)} actual=${JSON.stringify(f.actual)}`);
}
if (results.failures.length > 40) console.log(`  ... and ${results.failures.length - 40} more (see ${outPath})`);
process.exit(totalFailed || totalMissing ? 1 : 0);
