// Guard against stale Dockerfile COPY sources (e.g. a file renamed in the
// repo but not in the Dockerfile — `docker compose up --build` then fails
// with "not found" at the COPY step, which no local `npm run verify` would
// catch because it never reads the Dockerfiles).
// Usage: node scripts/check-dockerfiles.mjs  (exit 0 = every COPY source exists
// in its build context and is not excluded by that context's .dockerignore)
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contexts = [
  { name: 'backend', dir: join(root, 'backend') },
  { name: 'frontend', dir: join(root, 'frontend') },
];

function dockerignorePatterns(dir) {
  const p = join(dir, '.dockerignore');
  if (!existsSync(p)) return [];
  return readFileSync(p, 'utf8').split('\n').map((s) => s.trim()).filter((s) => s && !s.startsWith('#'));
}

function isIgnored(rel, patterns) {
  return patterns.some((pat) => {
    if (pat.startsWith('*.')) return rel.endsWith(pat.slice(1));
    if (pat.endsWith('/')) return rel.startsWith(pat);
    return rel === pat || rel.startsWith(pat + '/');
  });
}

function globMatch(pattern, dir) {
  // Single-segment glob (* and ?) against the context dir listing.
  const re = new RegExp('^' + pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
  return readdirSync(dir).filter((f) => re.test(f));
}

let failures = 0;
for (const { name, dir } of contexts) {
  const patterns = dockerignorePatterns(dir);
  const dockerfile = readFileSync(join(dir, 'Dockerfile'), 'utf8');
  for (const raw of dockerfile.split('\n')) {
    const line = raw.trim();
    if (!line.startsWith('COPY ')) continue;
    if (line.includes('--from=')) continue; // build-stage output, not context
    const tokens = line.slice(5).trim().split(/\s+/).filter((t) => !t.startsWith('--'));
    const sources = tokens.slice(0, -1);
    for (const src of sources) {
      const matches = src.includes('*') || src.includes('?') ? globMatch(src, dir) : (existsSync(join(dir, src)) ? [src] : []);
      if (matches.length === 0) {
        console.error(`FAIL ${name}/Dockerfile: COPY source not found in build context: ${src}`);
        failures++;
        continue;
      }
      for (const m of matches) {
        if (isIgnored(m, patterns)) {
          console.error(`FAIL ${name}/Dockerfile: COPY source excluded by .dockerignore: ${m}`);
          failures++;
        }
      }
    }
  }
}
if (failures) {
  console.error(`${failures} Dockerfile COPY problem(s) — fix the Dockerfile or restore the file before shipping.`);
  process.exit(1);
}
console.log('Dockerfile COPY check OK (backend + frontend, all sources present and not dockerignored).');
