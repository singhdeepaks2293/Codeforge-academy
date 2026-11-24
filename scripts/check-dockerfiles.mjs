// Guard against stale Dockerfile COPY sources (e.g. a file renamed in the
// repo but not in the Dockerfile — `docker compose up --build` then fails
// with "not found" at the COPY step, which no local `npm run verify` would
// catch because it never reads the Dockerfiles).
// Also guards against .dockerignore silently eating files a COPY needs:
// Docker matches a bare pattern (no slash) against ANY path segment, so a
// `data` line once excluded src/curriculum/data/ from the backend image and
// the live catalog seeded 0 courses with no build error at all.
// Usage: node scripts/check-dockerfiles.mjs  (exit 0 = every COPY source exists
// in its build context and is not excluded by that context's .dockerignore,
// checked recursively inside copied directories)
import { readdirSync, existsSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, sep } from 'node:path';
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

function globToRegExp(glob) {
  return new RegExp('^' + glob.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
}

// Docker .dockerignore semantics: a pattern starting with '/' is anchored to
// the context root; a bare pattern matches any single path segment (so `data`
// matches src/curriculum/data, while `/data` matches only the root data dir).
function isIgnored(rel, patterns) {
  const segments = rel.split(sep);
  return patterns.some((pat) => {
    if (pat.startsWith('/')) {
      const anchored = pat.slice(1);
      return globToRegExp(anchored).test(rel) || rel.startsWith(anchored + '/');
    }
    return segments.some((seg) => globToRegExp(pat).test(seg));
  });
}

// All paths (files and dirs) under dir, relative to dir, recursively.
function walk(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = full.slice(base.length + 1);
    out.push(rel);
    if (statSync(full).isDirectory()) walk(full, base, out);
  }
  return out;
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
        // Check the source itself, and — when it is a directory — every path
        // inside it: Docker applies .dockerignore to the whole copied tree.
        const entries = [m];
        const full = join(dir, m);
        if (existsSync(full) && statSync(full).isDirectory()) {
          for (const sub of walk(full, dir)) entries.push(sub);
        }
        for (const entry of entries) {
          if (isIgnored(entry, patterns)) {
            console.error(`FAIL ${name}/Dockerfile: COPY source excluded by .dockerignore: ${entry} (via COPY ${src})`);
            failures++;
          }
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
