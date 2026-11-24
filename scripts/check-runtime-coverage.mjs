// Guard: every language used by any track / DSA problem / project must have
// a defined provisioning path — baked into the Docker image, auto-installable
// on demand, or explicitly manual-only with exact steps. A language with no
// mapping at all is a silent gap: a learner would hit a bare 503 with no
// path forward. This check fails the build (see scripts/verify.sh) instead.
//
// Usage: node scripts/check-runtime-coverage.mjs  (run AFTER the backend
// build — it imports the compiled provisioning catalogue from backend/dist).
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'backend', 'src', 'curriculum', 'data');
const dockerfile = readFileSync(join(root, 'backend', 'Dockerfile'), 'utf8');
const executorSrc = readFileSync(join(root, 'backend', 'src', 'execution', 'executor.ts'), 'utf8');

const { RUNTIME_CATALOG, RUNTIME_BY_ID, LANGUAGE_TO_RUNTIME } = await import(
  pathToFileURL(join(root, 'backend', 'dist', 'services', 'provisioning.js')).href
);

// ---- Enumerate every language the catalogue actually uses ----
const languages = new Set();
for (const f of readdirSync(dataDir).filter((x) => x.endsWith('.ts'))) {
  const text = readFileSync(join(dataDir, f), 'utf8');
  // Course `language` ids (both `language: 'x'` and `"language": "x"` styles).
  for (const m of text.matchAll(/['"]?language['"]?\s*:\s*['"]([^'"]+)['"]/g)) languages.add(m[1]);
  // DSA starter-code keys: "starterCode": { "python": ..., "javascript": ... }
  for (const m of text.matchAll(/"starterCode":\s*\{([^}]+)\}/g)) {
    for (const k of m[1].matchAll(/"([a-z]+)":/g)) languages.add(k[1]);
  }
}
// Executor language cases (runCode switch) — each must map too.
for (const m of executorSrc.matchAll(/case '([a-z]+)':/g)) languages.add(m[1]);

const failures = [];
for (const lang of [...languages].sort()) {
  const runtimeId = LANGUAGE_TO_RUNTIME[lang];
  if (!runtimeId) { failures.push(`${lang}: no runtime mapping in LANGUAGE_TO_RUNTIME`); continue; }
  const def = RUNTIME_BY_ID.get(runtimeId);
  if (!def) { failures.push(`${lang}: maps to unknown runtime ${runtimeId}`); continue; }
  if (!['builtin', 'baked', 'auto', 'manual'].includes(def.kind)) {
    failures.push(`${lang} -> ${runtimeId}: unknown provisioning kind ${def.kind}`);
  }
  if (!def.installHint || def.installHint.length < 10) failures.push(`${lang} -> ${runtimeId}: empty installHint`);
  if (!def.manualSteps || def.manualSteps.length < 10) failures.push(`${lang} -> ${runtimeId}: empty manualSteps`);
  if (def.kind === 'baked') {
    // Baked runtimes must actually be baked: an apt package named in the
    // Dockerfile, the download marker (solc / kotlinc), or the base image
    // itself (node + bash come with node:24-bookworm-slim).
    const baseImageHit = (def.id === 'node' || def.id === 'bash') && /FROM node:24-bookworm-slim/.test(dockerfile);
    const aptHit = (def.aptPackages || []).some((p) => dockerfile.includes(p));
    const dlHit = def.installer === 'solc' ? dockerfile.includes('solc-static-linux')
      : def.installer === 'kotlin' ? dockerfile.includes('kotlin-compiler')
      : def.installer === 'terraform' ? dockerfile.includes('releases.hashicorp.com/terraform')
      : false;
    if (!baseImageHit && !aptHit && !dlHit) failures.push(`${lang} -> ${runtimeId}: kind=baked but no apt package, installer marker, or base-image provision in backend/Dockerfile`);
  }
  if (def.kind === 'auto' && def.installer === 'none' && !def.aptPackages && !def.brewFormula && !def.chocoPackage) {
    failures.push(`${lang} -> ${runtimeId}: kind=auto but no installer and no package-manager mapping`);
  }
}
// No orphaned catalogue entries: every runtime must serve >= 1 language.
for (const def of RUNTIME_CATALOG) {
  if (!def.serves || def.serves.length === 0) failures.push(`${def.id}: catalogue entry serves no language`);
}

if (failures.length) {
  console.error(`FAIL runtime coverage: ${failures.length} gap(s) — every track language needs a provisioning path:`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`Runtime coverage OK: ${languages.size} languages (${[...languages].sort().join(', ')}) -> ${RUNTIME_CATALOG.length} runtimes, every one baked / auto-installable / manual / builtin.`);
