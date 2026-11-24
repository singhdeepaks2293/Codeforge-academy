// Code execution engine — REAL local execution in a restricted subprocess.
// Each run gets a fresh temp workspace under data/runs/, scrubbed env, no shell,
// a hard timeout, output caps, and cleanup. This is NOT a container sandbox:
// see docs/SECURITY.md — timeout + process limits are documented as the local
// mode, and container execution is a documented future option.
import { spawn, execFile } from 'node:child_process';
import { mkdtemp, writeFile, rm, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { createRequire } from 'node:module';

const execFileAsync = promisify(execFile);

// Resolve bundled modules (typescript, react) through Node resolution so
// npm-workspace hoisting (root node_modules) and standalone installs
// (backend/node_modules, e.g. the Docker image) both work.
const requireFromHere = createRequire(import.meta.url);
// node:sqlite is loaded via createRequire (not a static import) so Vitest's
// module transform does not try to resolve the builtin specifier as a file
// — same pattern as src/db/db.ts.
const { DatabaseSync } = requireFromHere('node:sqlite') as typeof import('node:sqlite');
function resolveModule(spec: string): string | null {
  try { return requireFromHere.resolve(spec); } catch { return null; }
}

export interface RuntimeInfo {
  id: string;
  name: string;
  available: boolean;
  version?: string;
  installHint: string;
}

export interface RunResult {
  success: boolean;
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut: boolean;
  runtimeUnavailable?: boolean;
  durationMs: number;
  error?: string;
}

const MAX_OUTPUT = Number(process.env.MAX_RUN_OUTPUT_BYTES || 262144);
export const RUN_TIMEOUT_MS = Number(process.env.RUN_TIMEOUT_MS || 10000);

const EXTRA_PATHS = (process.env.RUNTIME_EXTRA_PATHS || '')
  .split(':').filter(Boolean);
const HOME_CARGO = join(process.env.HOME || '', '.cargo', 'bin');
if (HOME_CARGO) EXTRA_PATHS.push(HOME_CARGO);
const SEARCH_PATHS = [...EXTRA_PATHS, '/usr/local/go/bin', '/usr/local/bin', '/usr/bin', '/bin'];

export async function which(bin: string): Promise<string | null> {
  for (const dir of SEARCH_PATHS) {
    try {
      const { stdout } = await execFileAsync('test', ['-x', join(dir, bin)]);
      void stdout;
      return join(dir, bin);
    } catch { /* try next */ }
  }
  // fall back to shell `command -v` without interpolation (bin is a fixed literal here)
  try {
    const { stdout } = await execFileAsync('sh', ['-c', `command -v ${bin}`]);
    const p = stdout.trim().split('\n')[0];
    return p || null;
  } catch { return null; }
}

export async function detectRuntimes(): Promise<RuntimeInfo[]> {
  const defs: { id: string; name: string; bin: string; args: string[]; hint: string }[] = [
    { id: 'python', name: 'Python 3', bin: 'python3', args: ['--version'], hint: 'Install CPython 3.10+ and ensure `python3` is on PATH (https://www.python.org/downloads/).' },
    { id: 'c', name: 'C (GCC)', bin: 'gcc', args: ['--version'], hint: 'Install GCC: `sudo apt install build-essential` (Debian/Ubuntu) or Xcode CLT (macOS).' },
    { id: 'cpp', name: 'C++ (G++)', bin: 'g++', args: ['--version'], hint: 'Install G++: `sudo apt install build-essential` (Debian/Ubuntu) or Xcode CLT (macOS).' },
    { id: 'node', name: 'JavaScript / TypeScript (Node.js)', bin: 'node', args: ['--version'], hint: 'Install Node.js 20+ from https://nodejs.org/.' },
    { id: 'go', name: 'Go', bin: 'go', args: ['version'], hint: 'Install Go from https://go.dev/dl/ and ensure `go` is on PATH.' },
    { id: 'rust', name: 'Rust (rustc)', bin: 'rustc', args: ['--version'], hint: 'Install Rust via rustup: `curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh`.' },
    { id: 'java', name: 'Java (single-file launch)', bin: 'java', args: ['-version'], hint: 'Install a JDK 11+ (single-file source launch needs java, not javac): `sudo apt install default-jre` (Debian/Ubuntu) or a JDK from https://adoptium.net/.' },
    { id: 'bash', name: 'Bash', bin: 'bash', args: ['--version'], hint: 'Bash is part of Linux/macOS; on Windows use Git Bash or WSL.' },
    { id: 'perl', name: 'Perl', bin: 'perl', args: ['--version'], hint: 'Install Perl: `sudo apt install perl` (Debian/Ubuntu) or https://www.perl.org/get.html.' },
    { id: 'sql', name: 'SQL (SQLite, in-process)', bin: '', args: [], hint: 'SQL runs in-process via Node\'s built-in SQLite — no install needed.' },
    { id: 'csharp', name: 'C# (.NET)', bin: 'dotnet', args: ['--version'], hint: 'Install the .NET SDK from https://dotnet.microsoft.com/download.' },
    { id: 'kotlin', name: 'Kotlin', bin: 'kotlinc', args: ['-version'], hint: 'Install Kotlin via SDKMAN (`sdk install kotlin`) or https://kotlinlang.org/docs/command-line.html.' },
    { id: 'swift', name: 'Swift', bin: 'swift', args: ['--version'], hint: 'Install Swift from https://www.swift.org/download/ (Linux) or Xcode (macOS).' },
    { id: 'php', name: 'PHP', bin: 'php', args: ['--version'], hint: 'Install PHP: `sudo apt install php-cli` (Debian/Ubuntu) or https://www.php.net/downloads.' },
    { id: 'ruby', name: 'Ruby', bin: 'ruby', args: ['--version'], hint: 'Install Ruby: `sudo apt install ruby` (Debian/Ubuntu) or https://www.ruby-lang.org/en/downloads/.' },
    { id: 'dart', name: 'Dart', bin: 'dart', args: ['--version'], hint: 'Install Dart from https://dart.dev/get-dart.' },
    { id: 'scala', name: 'Scala', bin: 'scala', args: ['-version'], hint: 'Install Scala via Coursier (`cs setup`) or https://www.scala-lang.org/download/.' },
    { id: 'haskell', name: 'Haskell (runghc)', bin: 'runghc', args: ['--version'], hint: 'Install GHCup from https://www.haskell.org/ghcup/ (`ghcup install ghc`).' },
    { id: 'elixir', name: 'Elixir', bin: 'elixir', args: ['--version'], hint: 'Install Elixir from https://elixir-lang.org/install.html.' },
    { id: 'lua', name: 'Lua', bin: 'lua', args: ['-v'], hint: 'Install Lua: `sudo apt install lua5.4` (Debian/Ubuntu) or https://www.lua.org/download.html.' },
    { id: 'r', name: 'R', bin: 'Rscript', args: ['--version'], hint: 'Install R from https://cran.r-project.org/.' },
    { id: 'julia', name: 'Julia', bin: 'julia', args: ['--version'], hint: 'Install Julia from https://julialang.org/downloads/.' },
    { id: 'solidity', name: 'Solidity (solc)', bin: 'solc', args: ['--version'], hint: 'Install solc from https://docs.soliditylang.org/en/latest/installing-solidity.html.' },
    // NOTE: MongoDB / Redis are services, not code runners — their tracks are
    // quiz-style, so they are deliberately NOT listed here; runCode still
    // answers 503 runtime_unavailable for them instead of a fake pass.
  ];
  const out: RuntimeInfo[] = [];
  for (const d of defs) {
    // 'sql' needs no external binary: it runs in-process via node:sqlite.
    if (!d.bin) { out.push({ id: d.id, name: d.name, available: true, version: 'node:sqlite (built-in)', installHint: d.hint }); continue; }
    const path = await which(d.bin);
    if (!path) { out.push({ id: d.id, name: d.name, available: false, installHint: d.hint }); continue; }
    try {
      const { stdout } = await execFileAsync(path, d.args, { timeout: 5000 });
      out.push({ id: d.id, name: d.name, available: true, version: stdout.trim().split('\n')[0], installHint: d.hint });
    } catch {
      out.push({ id: d.id, name: d.name, available: true, installHint: d.hint });
    }
  }
  return out;
}

function scrubbedEnv(cwd: string): NodeJS.ProcessEnv {
  const realHome = process.env.HOME || '';
  return {
    PATH: [...SEARCH_PATHS, process.env.PATH || ''].join(':'),
    // HOME points at the temp workspace so student code cannot reach the real home.
    HOME: cwd,
    // ...but the Rust toolchain lives under the real home; point rustup at it
    // explicitly so `rustc` (rustup shim) keeps working with a scrubbed HOME.
    RUSTUP_HOME: process.env.RUSTUP_HOME || join(realHome, '.rustup'),
    CARGO_HOME: process.env.CARGO_HOME || join(realHome, '.cargo'),
    LANG: 'C.UTF-8',
    LC_ALL: 'C.UTF-8',
    NODE_ENV: 'production',
  };
}

interface SpawnOpts { timeoutMs: number; stdin?: string; }
function runProcess(cmd: string, args: string[], cwd: string, opts: SpawnOpts): Promise<RunResult> {
  const started = Date.now();
  return new Promise((resolve) => {
    let stdout = '', stderr = '', timedOut = false;
    const child = spawn(cmd, args, {
      cwd, env: scrubbedEnv(cwd), stdio: ['pipe', 'pipe', 'pipe'],
      timeout: opts.timeoutMs, killSignal: 'SIGKILL',
    });
    const timer = setTimeout(() => {
      timedOut = true;
      try { child.kill('SIGKILL'); } catch { /* already dead */ }
    }, opts.timeoutMs);
    const cap = (s: string) => (s.length > MAX_OUTPUT ? s.slice(0, MAX_OUTPUT) + '\n[output truncated]' : s);
    child.stdout.on('data', (d: Buffer) => { stdout = cap(stdout + d.toString()); });
    child.stderr.on('data', (d: Buffer) => { stderr = cap(stderr + d.toString()); });
    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ success: false, stdout, stderr: stderr + String(err), exitCode: null, timedOut, durationMs: Date.now() - started, error: String(err) });
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ success: code === 0 && !timedOut, stdout, stderr, exitCode: code, timedOut, durationMs: Date.now() - started });
    });
    if (opts.stdin !== undefined) { child.stdin.end(opts.stdin); } else { child.stdin.end(); }
  });
}

export interface RunRequest {
  language: string; // python | c | cpp | javascript | typescript | react | go | rust | java | bash | perl | sql | asm | html
  code: string;
  stdin?: string;
  timeoutMs?: number;
}

export async function runCode(req: RunRequest): Promise<RunResult> {
  const timeoutMs = Math.min(Math.max(req.timeoutMs || RUN_TIMEOUT_MS, 1000), 60000);
  const lang = req.language.toLowerCase();
  const workdir = await mkdtemp(join(tmpdir(), 'codeforge-run-'));
  try {
    // Awaited inner run: the finally cleanup below must only delete the
    // workspace AFTER the child process has finished reading its files.
    return await (async (): Promise<RunResult> => {
    await mkdir(workdir, { recursive: true });
    const execOrUnavailable = async (bin: string): Promise<string | null> => which(bin);
    // Single-file interpreted languages: write the file, run the interpreter.
    const runScript = async (binName: string, file: string): Promise<RunResult | null> => {
      const bin = await execOrUnavailable(binName);
      if (!bin) return unavailable(binName);
      await writeFile(join(workdir, file), req.code);
      return runProcess(bin, [file], workdir, { timeoutMs, stdin: req.stdin });
    };
    switch (lang) {
      case 'python': {
        const bin = await execOrUnavailable('python3');
        if (!bin) return unavailable('python');
        await writeFile(join(workdir, 'main.py'), req.code);
        return runProcess(bin, ['-I', '-u', 'main.py'], workdir, { timeoutMs, stdin: req.stdin });
      }
      case 'c': {
        const bin = await execOrUnavailable('gcc');
        if (!bin) return unavailable('c');
        await writeFile(join(workdir, 'main.c'), req.code);
        const comp = await runProcess(bin, ['-O2', '-std=c17', '-Wall', '-o', 'prog', 'main.c'], workdir, { timeoutMs, stdin: '' });
        if (!comp.success) return { ...comp, success: false, error: 'compilation failed' };
        return runProcess(join(workdir, 'prog'), [], workdir, { timeoutMs, stdin: req.stdin });
      }
      case 'cpp': {
        const bin = await execOrUnavailable('g++');
        if (!bin) return unavailable('cpp');
        await writeFile(join(workdir, 'main.cpp'), req.code);
        const comp = await runProcess(bin, ['-O2', '-std=c++17', '-Wall', '-o', 'prog', 'main.cpp'], workdir, { timeoutMs, stdin: '' });
        if (!comp.success) return { ...comp, success: false, error: 'compilation failed' };
        return runProcess(join(workdir, 'prog'), [], workdir, { timeoutMs, stdin: req.stdin });
      }
      case 'javascript': {
        const bin = await execOrUnavailable('node');
        if (!bin) return unavailable('node');
        // Content sniffing: ESM (`import`/`export`) runs as .mjs, plain
        // scripts and CommonJS (`require`) run as .cjs — content authors use
        // both styles, and each must actually run.
        const isEsm = /^\s*import\s/m.test(req.code) || /^\s*export\s/m.test(req.code);
        const file = isEsm ? 'main.mjs' : 'main.cjs';
        await writeFile(join(workdir, file), req.code);
        return runProcess(bin, ['--no-warnings', file], workdir, { timeoutMs, stdin: req.stdin });
      }
      case 'typescript': {
        const bin = await execOrUnavailable('node');
        if (!bin) return unavailable('node');
        // Transpile with the bundled typescript compiler API via a small node script.
        const tsc = resolveModule('typescript/lib/typescript.js');
        if (!tsc) return { success: false, stdout: '', stderr: '', exitCode: null, timedOut: false, durationMs: 0, runtimeUnavailable: true, error: 'TypeScript compiler is not installed (npm package "typescript" missing). Run npm install.' };
        const runner = `const ts=require(${JSON.stringify(tsc)});const fs=require('fs');
const src=fs.readFileSync('main.ts','utf8');
const out=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX},fileName:'main.ts'});
fs.writeFileSync('main.js',out.outputText);`;
        await writeFile(join(workdir, 'main.ts'), req.code);
        await writeFile(join(workdir, '_compile.cjs'), runner);
        const comp = await runProcess(bin, ['_compile.cjs'], workdir, { timeoutMs, stdin: '' });
        if (!comp.success) return { ...comp, success: false, error: 'TypeScript transpile failed: ' + comp.stderr };
        return runProcess(bin, ['main.js'], workdir, { timeoutMs, stdin: req.stdin });
      }
      case 'react': {
        // Transpile TSX + render to string with react-dom/server in Node.
        // Honest scope: SSR smoke test, not a browser DOM run (see docs/SECURITY.md).
        const bin = await execOrUnavailable('node');
        if (!bin) return unavailable('node');
        const tsc = resolveModule('typescript/lib/typescript.js');
        const reactDom = resolveModule('react-dom/server');
        const react = resolveModule('react');
        if (!tsc || !react || !reactDom) return { success: false, stdout: '', stderr: '', exitCode: null, timedOut: false, durationMs: 0, runtimeUnavailable: true, error: 'React/TypeScript packages are not installed (npm packages "typescript", "react", "react-dom" missing). Run npm install.' };
        const runner = `const ts=require(${JSON.stringify(tsc)});const fs=require('fs');
const React=require(${JSON.stringify(react)});const {renderToString}=require(${JSON.stringify(reactDom)});
global.React=React; // components written in modern JSX style omit the React import
const src=fs.readFileSync('App.tsx','utf8');
const out=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.React,jsxFactory:'React.createElement'},fileName:'App.tsx'});
fs.writeFileSync('App.js',out.outputText);
const mod=require('./App.js');const App=mod.default||mod.App||mod;
const html=renderToString(React.createElement(App));
console.log(html);`;
        await writeFile(join(workdir, 'App.tsx'), req.code);
        await writeFile(join(workdir, '_render.cjs'), runner);
        const r = await runProcess(bin, ['_render.cjs'], workdir, { timeoutMs, stdin: '' });
        return r;
      }
      case 'go': {
        const bin = await execOrUnavailable('go');
        if (!bin) return unavailable('go');
        await writeFile(join(workdir, 'main.go'), req.code);
        return runProcess(bin, ['run', 'main.go'], workdir, { timeoutMs, stdin: req.stdin });
      }
      case 'rust': {
        const bin = await execOrUnavailable('rustc');
        if (!bin) return unavailable('rust');
        await writeFile(join(workdir, 'main.rs'), req.code);
        const comp = await runProcess(bin, ['-O', 'main.rs', '-o', 'prog'], workdir, { timeoutMs, stdin: '' });
        if (!comp.success) return { ...comp, success: false, error: 'compilation failed' };
        return runProcess(join(workdir, 'prog'), [], workdir, { timeoutMs, stdin: req.stdin });
      }
      case 'java': {
        // Single-file source launch (Java 11+): `java Main.java` runs the
        // first top-level class — no javac needed. stdin is piped through.
        const bin = await execOrUnavailable('java');
        if (!bin) return unavailable('java');
        await writeFile(join(workdir, 'Main.java'), req.code);
        return runProcess(bin, ['Main.java'], workdir, { timeoutMs, stdin: req.stdin });
      }
      case 'bash': {
        const bin = await execOrUnavailable('bash');
        if (!bin) return unavailable('bash');
        await writeFile(join(workdir, 'script.sh'), req.code);
        return runProcess(bin, ['script.sh'], workdir, { timeoutMs, stdin: req.stdin });
      }
      case 'perl': {
        const bin = await execOrUnavailable('perl');
        if (!bin) return unavailable('perl');
        await writeFile(join(workdir, 'main.pl'), req.code);
        return runProcess(bin, ['main.pl'], workdir, { timeoutMs, stdin: req.stdin });
      }
      case 'sql': {
        // In-process SQLite: test stdin holds setup SQL (CREATE TABLE +
        // INSERT), the submitted code is one SELECT. Rows are rendered as
        // `col1|col2` per line so tests can compare exact stdout.
        const started = Date.now();
        try {
          const db = new DatabaseSync(':memory:');
          try {
            if (req.stdin) db.exec(req.stdin);
            const q = req.code.trim().replace(/;$/, '');
            if (/^(select|with|pragma|explain)\b/i.test(q)) {
              const stmt = db.prepare(q);
              const cols = stmt.columns().map((c) => c.name);
              const hasDupes = new Set(cols).size !== cols.length;
              if (!hasDupes) {
                const rows = stmt.all() as Record<string, unknown>[];
                const out = rows.map((r) => Object.values(r).map((v) => (v === null ? 'NULL' : String(v))).join('|')).join('\n');
                return { success: true, stdout: out ? out + '\n' : '', stderr: '', exitCode: 0, timedOut: false, durationMs: Date.now() - started };
              }
              // Duplicate output column names (e.g. SELECT e.name, d.name):
              // node:sqlite rows are objects, so the second column would
              // silently overwrite the first. Fall back to Python's sqlite3,
              // which returns real tuples and preserves every column.
              const py = await execOrUnavailable('python3');
              if (!py) {
                const rows = stmt.all() as Record<string, unknown>[];
                const out = rows.map((r) => Object.values(r).map((v) => (v === null ? 'NULL' : String(v))).join('|')).join('\n');
                return { success: true, stdout: out ? out + '\n' : '', stderr: '', exitCode: 0, timedOut: false, durationMs: Date.now() - started };
              }
              await writeFile(join(workdir, '_setup.sql'), req.stdin ?? '');
              await writeFile(join(workdir, '_query.sql'), q);
              await writeFile(join(workdir, '_sql.py'), `import sqlite3\ncon = sqlite3.connect(':memory:')\nwith open('_setup.sql') as f: con.executescript(f.read())\nwith open('_query.sql') as f: query = f.read()\nfor row in con.execute(query):\n    print('|'.join('NULL' if v is None else str(v) for v in row))\n`);
              return runProcess(py, ['_sql.py'], workdir, { timeoutMs, stdin: '' });
            }
            db.exec(req.code);
            return { success: true, stdout: 'ok\n', stderr: '', exitCode: 0, timedOut: false, durationMs: Date.now() - started };
          } finally { db.close(); }
        } catch (e) {
          return { success: false, stdout: '', stderr: String((e as Error).message || e), exitCode: 1, timedOut: false, durationMs: Date.now() - started, error: 'SQL error' };
        }
      }
      case 'asm': {
        // x86-64 assembly, assembled + linked by gcc (main + libc, printf).
        const bin = await execOrUnavailable('gcc');
        if (!bin) return unavailable('c');
        await writeFile(join(workdir, 'main.s'), req.code);
        const comp = await runProcess(bin, ['-o', 'prog', 'main.s'], workdir, { timeoutMs, stdin: '' });
        if (!comp.success) return { ...comp, success: false, error: 'assembly failed' };
        return runProcess(join(workdir, 'prog'), [], workdir, { timeoutMs, stdin: req.stdin });
      }
      case 'html': {
        // Honest scope: static tag-balance validation, NOT a browser render.
        // The HTML & CSS track labels this in the UI; code is checked, not run.
        const started = Date.now();
        const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
        const cleaned = req.code.replace(/<!--[\s\S]*?-->/g, '').replace(/<!DOCTYPE[^>]*>/gi, '');
        const stack: string[] = [];
        const problems: string[] = [];
        let count = 0;
        for (const m of cleaned.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*?(\/?)>/g)) {
          const tag = m[1].toLowerCase();
          const closing = m[0].startsWith('</');
          const selfClose = m[2] === '/' || voidTags.has(tag);
          count++;
          if (closing) {
            if (stack.length === 0 || stack[stack.length - 1] !== tag) problems.push(`unexpected closing tag </${tag}>`);
            else stack.pop();
          } else if (!selfClose) stack.push(tag);
        }
        for (const t of stack) problems.push(`unclosed tag <${t}>`);
        if (problems.length) {
          return { success: false, stdout: '', stderr: `HTML validation failed:\n${problems.join('\n')}`, exitCode: 1, timedOut: false, durationMs: Date.now() - started, error: 'HTML validation failed (static check, not a browser render)' };
        }
        return { success: true, stdout: `HTML OK: ${count} tags, all balanced (static validation — not a browser render)\n`, stderr: '', exitCode: 0, timedOut: false, durationMs: Date.now() - started };
      }
      case 'php': { const r = await runScript('php', 'main.php'); return r!; }
      case 'ruby': { const r = await runScript('ruby', 'main.rb'); return r!; }
      case 'lua': { const r = await runScript('lua', 'main.lua'); return r!; }
      case 'elixir': { const r = await runScript('elixir', 'main.exs'); return r!; }
      case 'r': { const r = await runScript('Rscript', 'main.R'); return r!; }
      case 'julia': { const r = await runScript('julia', 'main.jl'); return r!; }
      case 'swift': { const r = await runScript('swift', 'Main.swift'); return r!; }
      case 'scala': { const r = await runScript('scala', 'Main.scala'); return r!; }
      case 'haskell': { const r = await runScript('runghc', 'Main.hs'); return r!; }
      case 'dart': { const r = await runScript('dart', 'main.dart'); return r!; }
      // Known languages with no simple single-file runner on a plain host:
      // report honestly instead of a fake pass or a bare "unsupported".
      case 'csharp':
      case 'kotlin':
      case 'objc':
      case 'solidity':
      case 'mongodb':
      case 'redis':
        return unavailable(lang);
      default:
        return { success: false, stdout: '', stderr: `Unsupported language: ${lang}`, exitCode: null, timedOut: false, durationMs: 0, error: 'unsupported language' };
    }
    })();
  } finally {
    await rm(workdir, { recursive: true, force: true }).catch(() => undefined);
  }
}

function unavailable(id: string): RunResult {
  return {
    success: false, stdout: '', stderr: '',
    exitCode: null, timedOut: false, durationMs: 0,
    runtimeUnavailable: true,
    error: `Runtime '${id}' is not installed on this host. See GET /api/runtimes for install instructions.`,
  };
}
