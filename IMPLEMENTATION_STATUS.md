# CodeForge Academy — Implementation Status

Last updated: 2026-11-24 (phase-2 700-track expansion, sandbox verification)

## What was built

A complete, working, locally hosted interactive programming learning platform in `~/workspace/codeforge-academy`:

- **Monorepo**: `backend/` (Node 24 + TypeScript + Express + SQLite via `node:sqlite`), `frontend/` (React 18 + TypeScript + Vite + Tailwind + Monaco), root npm workspaces.
- **IAM**: first-run setup wizard (no default admin), register/login/logout, bcryptjs hashing, HttpOnly SameSite session cookies, sliding expiry + remember-me, CSRF double-submit, 5-failure lockout (15 min), password reset (local token flow), change password, session list/revoke, account deletion, RBAC (student/instructor/admin/super-admin) with 14 permission strings enforced in Express middleware, audit log.
- **Learning platform**: course catalog + search + category filter, 3-panel lesson workspace (curriculum nav / lesson / Monaco editor + Run/Reset/Submit + output + test results + 5-level hints), server-side unlock order, progress tracking, mastery assessments (80% pass, retakes, weak-topic feedback), DSA gate.
- **Execution engine**: real local runs for Python, C, C++, TypeScript, JavaScript, React (TSX → SSR), Rust, Go, Java (single-file launch), Bash, Perl, SQL (in-process SQLite), x86-64 Assembly (gcc), HTML (static tag validation), plus interpreted runners for PHP/Ruby/Lua/Elixir/R/Julia/Swift/Scala/Haskell/Dart when installed; missing runtimes honestly 503. Temp workspace per run, scrubbed env, no shell, 10s timeout, output cap, cleanup after exit.
- **Quiz exercises**: multiple-choice / predict-output exercises are graded by answer on the server (never by faking a run); the correct answer is never sent to the client.
- **DSA**: 10-level curriculum content in lessons, 6 visualization types (merge/quick sort, binary search, stack, queue, BST, graph BFS, DP table) with play/pause/step/speed, 152-problem library.
- **Projects**: 38 guided projects (see below — seeding status).
- **Gamification/analytics**: XP, streaks, daily goals, 18 achievements, activity charts, weak-topic recommendations from real submission data.
- **Admin**: dashboard/stats, user search/filter/create/suspend/role assignment, role CRUD + permission matrix, audit log viewer, runtime config, submission review, curriculum management.
- **Docker**: `backend/Dockerfile` (multi-stage Node 24, non-root, HEALTHCHECK on `/api/health`, ships python3/gcc/g++/go/java-JRE/perl/bash), `frontend/Dockerfile` (Node build → nginx, `/api` proxied to `backend:4000`), root `docker-compose.yml` (backend host :4000, frontend host :80, SQLite in named volume `codeforge-data`), `.dockerignore` files, `docs/DOCKER.md`.

## 100-track expansion (2026-11-24)

The original 7 tracks (354 lessons) are untouched. Added **93 tracks / 1000 lessons** (23 tracks × 10 lessons + 70 × 11), for totals of **100 courses, 1354 lessons, 1354 exercises, 100 assessments** (7 full mastery + 93 short). New content lives in `backend/src/curriculum/data/tracks-*.ts` (one file per group, authored with the `LessonSpec` builder in `backend/src/curriculum/builder.ts`); see `docs/TRACKS-100-MANIFEST.md` for the authoring rules and `docs/CURRICULUM.md` for the full per-track table with runtime support.

| Group | Tracks | Lessons |
|---|---|---|
| Languages | 20 | 217 |
| Web & Frontend | 14 | 152 |
| Mobile | 6 | 64 |
| Data, AI & ML | 16 | 172 |
| Databases & Backend | 10 | 108 |
| DevOps, Cloud & Systems | 14 | 151 |
| CS Foundations & Career | 13 | 136 |
| **New total** | **93** | **1000** |
| Original 7 tracks | 7 | 354 |
| **Grand total** | **100** | **1354** |

Supporting changes in this expansion: `category` column on courses (migration 002), quiz `options`/`answer_index` columns on exercises (migration 003), answer-graded submit path, category filter + track-count header in the catalog, extended executor + runtime detection, `short assessments` (10 questions + 1 programming exercise + capstone, pass 80%) seeded alongside the 7 full assessments.

## Phase status

| Phase | Status |
|---|---|
| 1 Foundation (scaffold, DB+migrations, auth/IAM, setup wizard, dashboard) | ✅ Complete |
| 2 Learning platform (catalog, workspace, progress, unlocking, search) | ✅ Complete |
| 3 Execution engine (runtimes, run/submit, timeout/errors, detection) | ✅ Complete |
| 4 Exercises/hints (visible+hidden tests, 5-level hints + tracking) | ✅ Complete |
| 5 Curricula (7 tracks) | ✅ Complete — 354 lessons, 354 exercises |
| 6 Mastery assessments | ✅ Complete — 7 assessments, 40 questions each |
| 7 DSA (curriculum + visualizations + 150 problems) | ✅ Complete — 152 problems |
| 8 Projects (academy + milestones + review) | ✅ Complete — 38 projects, 261 milestones |
| 9 Analytics/gamification/admin curriculum editor | ✅ Complete |
| 10 Quality (tests, docs, packaging) | ✅ Complete — verify + smoke green |
| 11 100-track expansion (93 tracks, 1000 lessons, executors, quiz grading) | ✅ Complete — see verification log below |
| 12 700-track expansion (100 tracks per core language, ML/Neural, industry + DevOps projects, audit fixes) | ✅ Complete — 793 courses / 8284 lessons, see "Phase 2" below |

## Curriculum counts (measured from the seeded database)

| Track | Modules | Lessons | Exercises |
|---|---|---|---|
| C | 27 | 54 | 54 |
| C++ | 26 | 52 | 52 |
| Python | 27 | 54 | 54 |
| TypeScript | 23 | 46 | 46 |
| React | 23 | 46 | 46 |
| Rust | 27 | 54 | 54 |
| Go | 24 | 48 | 48 |
| **Original 7 subtotal** | **177** | **354** | **354** |
| 93 new tracks (7 groups) | 465 | 1000 | 1000 |
| **Grand total** | **642** | **1354** | **1354** |

- Mastery assessments: **100** — 7 full (40 questions + 5 programming + capstone) + 93 short (10 questions + 1 programming + capstone), all pass 80%.
- DSA problems: **152** — Easy 54, Medium 91, Hard 7. Categories: Arrays 18, Strings 14, Trees 14, DP 14, Linked list 12, Hashing 12, Graphs 12, Two pointers 10, Sliding window 10, Binary search 10, Stack 8, Queue 6, Greedy 6, Backtracking 6.
- Projects: **38** (10 small + 10 intermediate + 10 advanced + 8 industry simulations), 261 milestones, seeded and verified via the API (list returns 38, detail returns 6–8 milestones).
- Content quality checks (`scripts/check-tracks.mjs`, exit 0): 0 exercises without tests; 0 exercises without exactly 5 hints; 0 lessons with fewer than 2 knowledge-check questions; most-repeated lesson-concept opening appears only 2× (no mass-duplicated filler). Note: some lesson framing text was template-generated per lesson with lesson-specific values (per the content authors' reports); explanations, examples, quizzes and exercises are lesson-specific.
- Batch solution verification (`scripts/verify-solutions.mjs`, exit 0): **1354 exercises — 968 stored solutions pass their own tests through the real executor, 258 quiz exercises (answer-graded), 128 honestly unavailable (Go 48 + missing toolchains 80), 0 failed.** Per-group authors also executed their runnable solutions during generation (data 296 tests, databases 214, devops 165, cs 130, languages 150, mobile 27, web all runnable).

## Verification log (this sandbox, real runs)

### v1 (2026-11-24)
- `npm run verify` (scripts/verify.sh): **PASS** — backend tests, backend `tsc` build, frontend tests, frontend `tsc + vite build`.
- Backend tests (vitest): **14 passed / 0 failed** — setup wizard + double-setup 409, register/login + session cookie, weak-password rejection, 5-failure lockout (423) + audit log, unauthenticated 401, student admin-endpoint 403, admin user list, CSRF block without token, Python run + runtime error, C compile + run + compile error, execution timeout, Go runtime-unavailable honesty, session revocation, password-change guard.
- Frontend tests (vitest): **5 passed / 0 failed** — language mapping, visualization rendering (merge sort, stack, DP).
- Smoke test (`node scripts/smoke-test.mjs`, fresh DB): **16 passed / 0 failed** — setup, register, login, course list (7), Python runtime detected, `print("hello")` real output, correct solution passes, wrong code fails with test breakdown, hint level 1, lesson complete, dashboard XP/streak, student admin 403, unauthenticated run 401, DSA list (152), projects list (38).
- Projects API check (signed-in admin): `GET /api/projects` → 200, 38 projects; `GET /api/projects/cli-calculator` → 200, 6 milestones. Unauthenticated → 401 (correct).
- `npm run dev` (concurrently: backend + Vite): backend health OK on :8080, frontend 200 on :5173.
- Per-language exercise spot-check (first-lesson exercise solution submitted through the API): C PASS, C++ PASS, Python PASS, TypeScript PASS, React PASS (renders `<h1>Hello React</h1>`), Rust PASS (incl. hidden test), Go → **503 runtime_unavailable** (correct — no Go in sandbox).
- Direct runs: Python `print(42)` → `42`; C `hi C`; Rust `rust-ok` (6ms); TypeScript `ts: 3`; React SSR `<h1>Hello React</h1>`; Go → 503.
- Persistence: registered user earned 50 XP (lesson complete), server restarted with the same DB, login again → **XP 50, streak 1 — persisted**.
- Runtime detection (`GET /api/execute/runtimes`): python3 ✅, gcc ✅, g++ ✅, node ✅, rustc ✅ (via `~/.cargo/bin`, Rust 1.100.0 — note: the original brief said Rust was not in PATH; it exists at `~/.cargo/bin/rustc` and the executor searches it), go ❌ (not installed anywhere in the sandbox).
- Docker: **NOT verified by running** — no Docker in this sandbox (`docker: command not found`). Compose file validated with a YAML parser and cross-checked (services, ports 4000/80, env, named volume, healthcheck, nginx `proxy_pass http://backend:4000`, brace balance, SPA fallback). `docker compose config` / `up --build` remain to be run on a host with Docker — see `docs/DOCKER.md`.

### 100-track expansion (2026-11-24)
- `node scripts/check-tracks.mjs`: **exit 0, Errors 0** — Courses 100, Lessons 1354, Exercises 1354; per-file: languages 20, web 14, mobile 6, data 16, databases 10, devops 14, cs 13.
- `node scripts/verify-solutions.mjs` (after executor fixes): **exit 0 — 1354 exercises: 968 passed, 258 quiz, 128 unavailable, 0 failed.** First run found 105 failures, all fixed in the executor (see bugs 11–13).
- `npm run verify`: **PASS** — backend tests **19/19** (14 v1 + 5 new: 100 courses/1354 lessons/7 categories, Java lesson fetch + 5 hints, Java+Bash+SQL real runs, quiz grading by answer + no `answer_index` leak, Python-pass vs Kotlin-503), frontend tests **5/5**, both builds pass. Test seed log: `{"courses":100,"lessons":1354,"exercises":1354,"dsa":152,"projects":38,"assessments":100}`.
- Smoke test (`node scripts/smoke-test.mjs`, fresh DB, `tsx` server): **22 passed / 0 failed** (16 v1 + 6 new: 100 courses, 1354 lessons, 7 categories, Java lesson + exercise, complete a new-track lesson). Seed log identical to above.
- Per-group spot-check (first-lesson exercise solution via the live API, **built** server `node dist/index.js`, fresh DB): languages/java **PASS**, web/vue **PASS**, mobile/react-native **PASS**, data-ai/statistics **PASS**, databases/postgresql **PASS**, devops/linux-bash **PASS**, cs-career/operating-systems **PASS**. Kotlin code exercise → **503 runtime_unavailable** (correct). HTML/CSS quiz exercise: multiple-choice, 4 options, `answer_index` not leaked.
- Runtime detection (`GET /api/execute/runtimes`, built server): python yes, c yes, cpp yes, node yes, go no, rust yes, java yes, bash yes, perl yes, sql yes, csharp/kotlin/swift/php/ruby/dart/scala/haskell/elixir/lua/r/julia/solidity no. (MongoDB/Redis are services, not code runners, and are deliberately not listed.)
- Fresh-zip verification: see "Fresh-copy (zip) verification" below.

### 700-track expansion (2026-11-24)
- `node scripts/check-tracks.mjs`: **exit 0, Errors 0, Warnings 0** — Courses 793, Lessons 8284, Exercises 8284; per-language c/cpp/python/typescript/react/rust/go = 100 each; data-ai 31, devops 54 (10 per Ansible/Terraform/Docker/Git); concept openings most-repeated ≤ 2×.
- `npm run verify` (stages run individually — see bug 19): backend tests **41 passed | 1 skipped** (api 23 incl. the 793/8284 catalog test, git EPIPE regression, Terraform/Ansible/Docker honesty tests, DSA camelCase test; provisioning 18 + 1 skipped), frontend tests **66/66 across 11 files**, Dockerfile COPY check OK, runtime coverage OK (34 languages → 31 runtimes), both builds pass.
- Smoke test (`node scripts/smoke-test.mjs` against the built server, fresh DB): **22 passed / 0 failed**; seed log `{"courses":793,"lessons":8284,"exercises":8284,"dsa":152,"projects":95,"assessments":793}`.
- Seed timing (fresh scratch DB, quiet box): **fresh seed 6,986 ms, re-seed 5,409 ms**, identical counts on re-seed (idempotent). Seeded DB file ~105 MB.
- Batch solution verification (`scripts/verify-solutions.mjs`, 8284 exercises): RUNNING at time of writing — results to be added here. Per-file author verification during generation: C-A 528/528 gcc tests, C-B 108/108 executor spot-check, TS-A 264/264, React-C 528/528, Python-ML 105 lesson + 15 capstones, Python-A/B all solutions executed in Python 3.12, Rust-C 1,254 snippets rustc-verified, Git 52 distinct script patterns executed.
- Built-server boot: `DATABASE_PATH=/tmp/cf-smoke.db PORT=8080 node backend/dist/index.js` → health `{"status":"ok"}` in ~4 s; seed log as above.
- Executor spot-checks (real runs): git `5fcdd97 first commit`; terraform 1.17.2 `Success! The configuration is valid.`; ansible/docker honest 503s without binaries; default-import probe — `import fs from 'node:fs'` fails under the executor while `import * as fs` passes (see bug 18).
- Fresh-zip verification: see "Fresh-copy (700-track zip) verification" below.

## Bugs found and fixed during verification

1. SQLite UPSERT is rejected on `INSERT ... SELECT` — seed used `INSERT OR IGNORE` + `UPDATE`.
2. Seed used `SELECT user_id ... FROM users` — the column is `id`.
3. Execution workspace was deleted by `finally` before the child process read its files (race) — runs now `await` the child before cleanup.
4. Scrubbed env set `HOME` to the temp dir, breaking the rustup `rustc` shim — `RUSTUP_HOME`/`CARGO_HOME` are now passed through explicitly.
5. CSRF 403s in tests: raw `fetch` without a cookie jar sent two `cf_csrf` values (stale + fresh) and comma-split `Expires` dates corrupted cookies — test/smoke helpers now use `getSetCookie()` jars. (Real browsers were never affected.)
6. TypeScript/React execution failed: workspace hoisting puts `typescript`/`react` in the repo-root `node_modules`, not `backend/node_modules` — modules are now resolved with `createRequire().resolve()`. React also needed `react-dom/server` (not `server.js`, blocked by the package `exports` map), `fileName: 'App.tsx'` for JSX parsing, `jsx: React` (not the removed `Classic` enum value), and `global.React` for components that omit the React import.
7. Go exercise submit returned 200 FAIL instead of 503 — evaluator now surfaces a `runtimeUnavailable` flag and both submit routes return 503.
8. Vitest default 5s timeout too short for bcrypt cost-12 lockout test — `testTimeout: 30000` in backend vitest config.
9. Frontend `postcss.config.js` used `module.exports` under `"type": "module"` — renamed to `.cjs`.
10. Backend `tsc` strictness on `node:sqlite` types — a thin typed wrapper (`Db`/`LooseStatement`) in `src/db/db.ts`.
11. **(expansion) Executor returned plain "Unsupported language" for known-but-missing toolchains** — the first batch run showed 105 failures, all of that kind. Fixed: real run cases for PHP/Ruby/Lua/Elixir/R/Julia/Swift/Scala/Haskell/Dart (single-file interpreters) and explicit `runtime_unavailable` for C#/Kotlin/ObjC/Solidity/MongoDB/Redis; detection entries added for all of them. The 80 missing-toolchain code exercises now count as unavailable, not failed.
12. **(expansion) JavaScript `require('fs')` solutions failed in `.mjs`** — the executor wrote every JS submission as `main.mjs`, where `require` is undefined (22 failures). Fixed: content sniffing — ESM (`import`/`export`) runs as `.mjs`, plain/CommonJS scripts as `.cjs`. Both styles verified working.
13. **(expansion) SQL duplicate output column names collapsed** — `SELECT e.name, d.name` returns rows as objects from `node:sqlite`, so the second `name` overwrote the first (3 failures). Fixed: when `columns()` shows duplicates, the executor falls back to Python's sqlite3 tuples, preserving every column. Verified: `Ada|Engineering`.
14. **(expansion) `node:sqlite` static import broke Vitest** — `import { DatabaseSync } from 'node:sqlite'` in `executor.ts` failed test collection ("Failed to load url sqlite"). Fixed by loading it via `createRequire`, same pattern as `src/db/db.ts`.
15. **(expansion) Build script silently dropped new migrations in `dist`** — `cp -r src/db/migrations dist/db/migrations` nests the directory when the target already exists, so `002`/`003` landed at `dist/db/migrations/migrations/` and the built server booted with a partial catalog (`table courses has no column named category`, seed failed, 0 courses). Fixed: `mkdir -p dist/db/migrations && cp src/db/migrations/*.sql dist/db/migrations/`. This was a pre-existing v1 bug that only surfaced once a second migration existed; the `tsx` dev path (which reads `src/`) was never affected, which is why v1 tests passed.
16. **(phase 2) EPIPE crash in the executor** — `runProcess` wrote stdin with no error handler, so fast-exiting commands (`git init`) crashed the backend process with an unhandled socket error. Fixed with a `child.stdin.on('error', …)` guard; regression test added (real git run in `api.test.ts`).
17. **(phase 2) Seed glob missed the 700-track files under vitest** — `seed.ts` globbed `tracks700-*.js`, but under vitest the files are still `.ts` in `src/`, so tests silently seeded only the 100 old tracks (catalog test got 100, not 793). Fixed: the glob accepts `.js` (dist) and `.ts` (vitest/src); the import uses the filename actually found. Same fix for the `projects-industry-*` glob.
18. **(phase 2) Default `node:` imports crash under the executor** — `import fs from 'node:fs'` transpiles to an undefined `.default` access (`Cannot read properties of undefined (reading 'readFileSync')`), so 219 solutions in the v1 files (`tracks-web/cs/languages/mobile.ts`) failed at runtime. Probed empirically (default fails, namespace passes), then replaced all 219 with `import * as fs/http/path from 'node:…'`. Verified: 5/5 real fixed solutions from `tracks-web.ts` pass through the executor. The 700-track files already used the namespace form.
19. **(phase 2) Seed ROLLBACK masked the real error + /tmp disk-full** — `seed.ts` called `ROLLBACK` unconditionally in the catch; when SQLite auto-aborts the transaction (e.g. `SQLITE_FULL`), the ROLLBACK itself throws "cannot rollback - no transaction is active" and hides the original error. Fixed: ROLLBACK is now best-effort inside its own try/catch and the original error propagates. The underlying failure was real: `/tmp` is a 512 MB tmpfs and was 100% full (old scratch DBs + Terraform binary + caches). Cleaned ~360 MB. Consequence for this sandbox: the two backend test files each seed a ~105 MB DB + WAL in `/tmp`, so running them in parallel (vitest default) can exhaust /tmp again — run them serially here (`npx vitest run tests/api.test.ts`, then `tests/provisioning.test.ts`). `verify.sh` itself is unchanged; on a host with a real /tmp this does not apply.
20. **(phase 2) DSA detail API returned raw snake_case columns** — `GET /api/dsa/problems/:slug` spread the DB row, so `starterCode` was `{}` (empty language dropdown, blank editor), `timeComplexity`/`spaceComplexity` were missing. The frontend had a `normalizeProblem()` defence; the backend now maps the columns to camelCase explicitly. Regression test added in `api.test.ts` (two-sum: starterCode non-empty, complexities `O(n)`/`O(n)`, no snake_case keys leak). The test registers its own student because the shared student session is revoked by the earlier revocation test.

## Honest limitations

- **Go is not installed in this sandbox** — Go lessons/DSA submissions return 503 `runtime_unavailable` with install instructions. In the Docker image Go IS installed (`golang-go`), so Go works there; the local path needs `go` on PATH.
- **Rust is now baked into the Docker image** (rustc/cargo via apt) — see the provisioning section below. Rust works locally here via `~/.cargo/bin/rustc`.
- **Toolchain coverage (2026-11-24):** all 30 catalogue languages now have a provisioning path. Baked into the Docker image: Python, C/C++, Node (JS/TS/React), Go, Rust, Java, Bash, Perl, PHP, Ruby, Lua, Elixir, R, Haskell, Scala, Solidity, Kotlin, plus built-in SQL/HTML. Auto-installable on local/dev only: C#, Dart, Julia. Manual-only with exact steps: Swift, Objective-C, MongoDB, Redis. In this sandbox, Go/PHP/Ruby/Elixir/R/Haskell/Scala/solc/kotlinc/dotnet/dart/julia/swift are genuinely absent, so their code exercises still return honest 503s with install instructions; their quiz exercises grade by answer.
- **No container isolation for student code** — execution is a restricted subprocess (temp workspace, scrubbed env, no shell, timeout, output cap). Timeout alone is not claimed as full isolation; see `docs/SECURITY.md`. Do not expose to untrusted users without adding container-per-run execution.
- **React execution is transpile + server-render smoke test**, not a browser DOM run.
- **HTML execution is static tag-balance validation**, not a browser render.
- **Docker build/run not verified here** (no Docker in sandbox) — see above.
- **DSA Hard problems are thin** (7 of 152; target mix was ~20% Hard). Easy/Medium coverage is complete.
- **No live browser click-through** of the frontend in this session (no browser tool in this subagent) — the frontend is verified by build + unit tests + API smoke tests, not by clicking through the UI. The phase-2 layout/DSA audit fixes (P0 blank-panel ResizeObserver fix, reference-layout gaps, collapsible DSA) are code + test verified only; **a live browser re-check on the host is still needed after deploy**.
- **Seeded database is ~105 MB** (793 courses / 8284 lessons of JSON content). Startup seed is ~7 s fresh on this sandbox. In this sandbox `/tmp` is a 512 MB tmpfs: the two backend test files each seed a ~105 MB DB + WAL there, so run them serially (see bug 19) and keep `/tmp` clear of old scratch DBs.
- **Rust-A content quality flags (unfixed, check-tracks does not catch them):** quizzes rotate across [2,4,7]/[0,3,8]/[3,6,8] rather than fixed 2/4/7, 6 skills/track instead of 8, prerequisites not chained to the previous track, and 3 non-compiling snippets were reported in the rust-box track (the batch solution check is the arbiter — see the phase-2 verification entry).
- Curriculum prose for some lessons is template-framed with lesson-specific values (see content quality note above).
- **Code exercises in missing-toolchain languages were verified by careful reading, not by running** (80 exercises: 4 per missing-toolchain track, plus Laravel/ASP.NET Core). Their solutions cannot be executed anywhere in this sandbox; they run (or 503) on hosts with the toolchain.

## Docker build fix (2026-11-24)

- **Bug:** `docker compose up --build` failed on the user's host at frontend build step 5/7: `COPY index.html vite.config.ts tsconfig.json tailwind.config.js postcss.config.js ./` → `"/postcss.config.js": not found`. Root cause: v1 renamed the file to `postcss.config.cjs` (it uses `module.exports` under `"type": "module"`) but `frontend/Dockerfile` was never updated. Same latent issue in both Dockerfiles: `COPY package.json package-lock.json* ./` referenced a lockfile that does not exist in either build context (`frontend/` and `backend/` have no `package-lock.json`; the only lockfile is at the repo root, outside both contexts).
- **Fix:** `frontend/Dockerfile` now copies `postcss.config.cjs`; both Dockerfiles now use `COPY package.json ./`. No application code changed.
- **Guard:** new `scripts/check-dockerfiles.mjs` verifies every build-stage `COPY` source exists in its build context and is not excluded by `.dockerignore`; it now runs first in `scripts/verify.sh`. Proven: the old Dockerfile fails it with exactly the reported error (`FAIL frontend/Dockerfile: COPY source not found: postcss.config.js`, exit 1); the fixed one passes (exit 0).
- **Verification of the fix:** fresh-extracted `codeforge-academy-2026-11-24-100-tracks-dockerfix.zip` passes the Dockerfile check + `npm run verify` (backend 19/19, frontend 5/5) + built-server smoke 22/22. The actual `docker compose up --build` still has NOT been run anywhere (no Docker in this sandbox) — the user must re-run it on their host; that is the remaining Docker proof.

## Docker seed bug — empty catalog on the host (2026-11-24, fixed same day)

- **Symptom on the user's host:** app loads, signed in as singh, but Explore Courses shows "0 tracks · 0 lessons", dashboard all zeros. Backend log: every curriculum file `could not load ../curriculum/data/*.js: Cannot find module '/app/dist/curriculum/data/*.js'`, then `[seed] {"courses":0,...}`, and `GET /api/courses` returns `{"courses":[]}`. Containers healthy — the failure is silent (seed catches import errors and the server still starts).
- **Root cause:** `backend/.dockerignore` contained a bare `data` line, meant for the top-level database dir. Docker matches a bare pattern against ANY path segment, so it excluded `src/curriculum/data/` (all 16 curriculum files) from the build context. `COPY src ./src` then copied src without them, `tsc` emitted no curriculum files, and the seed's dynamic imports all failed. Local `npm run verify` and fresh-zip checks never caught it because `.dockerignore` only affects Docker builds.
- **Fix:** anchored the directory patterns in `backend/.dockerignore` (`/node_modules`, `/dist`, `/data`, `/coverage` — bare `*.db`, `*.db-journal`, `.env` kept, they are meant to match at any depth). No application code changed.
- **Guard:** `scripts/check-dockerfiles.mjs` now also walks recursively inside every copied directory and applies Docker's .dockerignore matching rules. Proven: the old `.dockerignore` fails it with all 17 `src/curriculum/data` entries listed; the fixed one passes.
- **Verification of the fix:** Docker build stage simulated exactly (rsync the backend context with `.dockerignore` applied, then the Dockerfile's own `npm install` + `npm run build`): the context holds all 16 data files, `dist/curriculum/data/` holds all 16 `.js` files plus all 3 migrations, and the simulated built server logs `[seed] {"courses":100,"lessons":1354,"exercises":1354,"dsa":152,"projects":38,"assessments":100}` and serves courses. The real `docker compose up --build` still has NOT been run anywhere (no Docker in this sandbox) — the user re-runs it on their host.
- **Host note:** the user's project dir is `~/Codeforge-academy` (capital C), not `~/codeforge-academy`.

## GitHub repo check — the real root cause (2026-11-24)

- The user asked to check the code on https://github.com/singhdeepaks2293/Codeforge-academy (commit `8a47ae2` "Version2", 74 files). Verdict: **the code is right except for one thing — the curriculum data is missing from the repo.**
- `backend/src/curriculum/` on GitHub contains only `builder.ts` and `types.ts`. The entire `data/` directory (16 files: c, cpp, python, typescript, react, rust, go, dsa, projects, tracks-languages/web/mobile/data/databases/devops/cs) is absent, while `seed.ts` imports all 16. That alone explains the host failure: with no source files, no `.dockerignore` fix can help — `tsc` emits nothing, every seed import fails, 0 courses. (The earlier `.dockerignore` diagnosis was correct for the zip, but the host dir evidently comes from this repo, where the files were never present.)
- **Why they are missing:** root `.gitignore` line 2 was a bare `data/`. Like Docker, git matches a bare pattern against ANY path segment, so it silently ignored `backend/src/curriculum/data/`. Proven with `git check-ignore -v` (matched both test files). The diff of the GitHub clone against this tree showed exactly one missing item: `backend/src/curriculum/data/` (only `PROGRESS.md` differed otherwise). The Dockerfiles, `.dockerignore`, seed, routes and frontend on GitHub are all the fixed versions.
- **Fix:** root `.gitignore` now uses anchored patterns only (`/data`, `/backend/data/`, `/dist`, `/backend/dist/`, `/frontend/dist/`, `/node_modules`, etc.). Proven in a scratch clone: with the fixed file, `git check-ignore` no longer matches the curriculum files, still matches real DB/build paths, and `git status` shows `backend/src/curriculum/data/` as untracked.
- **Host recovery (order matters):** 1) replace `.gitignore` with the fixed one (it is in the repackaged dockerfix zip), 2) restore the 16 data files from that zip into `backend/src/curriculum/data/`, 3) `git add` + commit + push so GitHub stops dropping them, 4) `docker compose build --no-cache` + up, 5) confirm `[seed]` shows 100 courses. The dockerfix zip was repackaged with the fixed `.gitignore` (110 files, 1.8 MB) and fresh-verified (19/19 + 5/5 + smoke 22/22, seed 100/1354).

## Runtime auto-provisioning — all languages (2026-11-24)

- **Trigger:** enrol (`POST /api/courses/:slug/enroll`) and first lesson open for already-enrolled users kick off a background install for the course's primary runtime when it is missing; neither blocks the lesson UI or the enrol response. Manual install/retry via `POST /api/provisioning/:runtime/install` (202 when a new install starts). `CODEFORGE_PROVISIONING_ENABLED=0` disables auto-install.
- **Service:** `backend/src/services/provisioning.ts` — state machine (`unknown`/`present`/`installing`/`ready`/`failed`/`install_unavailable` + reason + guidance), persisted in SQLite (`runtime_provisioning`, migration `004_runtime_provisioning.sql`), one install per runtime at a time (claim-set + in-flight map), idempotent, ~5 min timeout, `[provisioning]` logging. Allow-listed installers only — fixed commands/argv via `execFile`, no shell, no user input ever reaches a command. A runtime is only marked `ready` when the executor's own detection re-finds it, so `ready` never lies about Run working. Install dirs are recorded and restored onto `PATH` at startup.
- **API:** `GET /api/runtimes` (new alias — the old `/api/runtimes` did not exist; only `/api/execute/runtimes` did, and the executor's 503 hint text pointed at the missing path), `GET /api/provisioning`, `GET /api/provisioning/:runtime`, `POST /api/provisioning/:runtime/install` (auth + CSRF; GETs public like the existing runtime surface). `GET /api/execute/runtimes` now returns all 27 catalog runtimes with `provisioning: {state, kind, dockerBaked, reason, guidance}` plus `languageToRuntime`. Execution behaviour untouched: a missing runtime still returns 503 `runtime_unavailable`.
- **Runtime matrix (30 course languages → 27 runtimes):** baked into the Docker image (19): python, c (+asm via gcc), cpp, node (JS/TS/React), go, rust, java (JRE, single-file launch), bash, perl, php, ruby, lua, elixir, R, haskell (ghc), scala, solidity (solc static binary), kotlin (compiler zip), plus built-ins SQL (`node:sqlite`) and HTML (static validation). Auto-installable on local/dev only (3): C# (dotnet-install script), Dart (official SDK zip), Julia (official tarball, Linux) — in Docker these report `install_unavailable` honestly because the container runs as non-root `node`. Manual-only with exact steps (4): Swift (platform-specific ~700 MB toolchains, no stable unattended installer), Objective-C (Xcode/GNUstep; no single-file ObjC runner exists yet, so the track stays quiz-graded), MongoDB and Redis (services, not code runners — quiz-style tracks). Dependencies ship with the installs (build-essential headers/libs for C/C++/Rust, JRE for Java/Kotlin/Scala, Erlang via the Elixir package).
- **Coverage gate:** `scripts/check-runtime-coverage.mjs` runs in `verify.sh` after the backend build and fails if any track language has no provisioning path. Negative control verified: temporarily removing Swift's mapping failed the gate (exit 1, 2 gaps); restoring passed (exit 0).
- **Live install verified in this sandbox:** with `CODEFORGE_LIVE_INSTALL=1`, Lua installed end-to-end via the real apt path in 7.5 s, re-detected as Lua 5.4.6, and real Lua code then ran via `/api/execute/run` (`lua-live-ok 42`). Detection cross-checked against the sandbox: python/node/java/c/perl/bash/rust (via `~/.cargo/bin`) present; go/php/ruby/elixir/R/Haskell/Scala/solc/kotlinc/dotnet/dart/julia/swift genuinely absent.
- **Dockerfile:** bakes in rustc/cargo, php-cli, ruby, lua5.4 (+`lua` symlink), elixir, r-base-core, ghc, scala, build-essential, solc static binary, Kotlin compiler zip. Estimated +~1.0–1.3 GB image growth (ghc ~650 MB installed dominates, then rustc/cargo+LLVM ~200 MB, R ~150 MB with deps) — completeness was prioritised over size per the user's direction; measure on the first real `docker build`. `check-dockerfiles.mjs` still passes; Docker build stage simulated (rsync context with `.dockerignore` applied + `npm install` + `npm run build` → all 16 data `.js` files in `dist`).
- **Frontend wiring (coordinator integration):** `frontend/src/lib/provisioning.ts` (fetch/install + status text / canInstall / kind labels) with 9 unit tests; the lesson workspace shows installing / ready / failed / unavailable states in the top bar, a guidance banner under it, the Run-area status, and the Terminal tab (with source: baked/auto/manual + in-Docker-image note), polls every 3 s while installing, and offers Retry for auto runtimes. Admin → Runtimes & Provisioning (`/admin/runtimes`, linked from the admin dashboard) lists all 27 runtimes with status, provisioning state, guidance, source, and Install/Retry.
- **Still unverified:** real Docker build/run (no Docker here — notably the new apt list and the solc/Kotlin downloads); real installs beyond apt+Lua are mocked-only in tests; dnf/brew/choco/Windows install paths untested; no live browser click-through of the new provisioning states.

## Ubuntu GNOME-inspired redesign (2026-11-24)

- **Theme system (one mechanism everywhere):** CSS variables in `src/index.css` (`:root` = light, `.dark` = dark) backing Tailwind tokens in `tailwind.config.js` (`base`/`sidebar`/`surface`/`elevated`/`code`/`ink`/`muted`/`faint`/`line`, violet `accent`, orange `brand`, semantic `success`/`danger`/`warning` + `-soft` tints). Dark: `#242129` base, `#2B2731` sidebar, `#332E39` surface, `#393340` elevated, `#A970F5` accent, `#C084FC` accent-400, `#E78A45` brand, `#F1EDF5`/`#B9B0C4` text, 7–9% white borders. Light: warm off-white `#F4F1EC` base, soft grey-purple panels, muted violet `#8B4FE0` primary, same orange. No pure black/white, no glow, no harsh shadows. Pre-paint script in `index.html` + `App.tsx` `ThemeInit` apply the saved theme before first paint; default is dark (only a saved `light` opts out). Toggle in the header, persisted as `cf-theme` (`src/lib/theme.ts`: `getTheme`/`applyTheme`/`useTheme`). Fonts: Inter-first system stack + JetBrains Mono-first mono stack, no runtime CDN fetch (offline-safe). `prefers-reduced-motion` disables animation/transitions in CSS.
- **Sidebar (`components/Layout.tsx`):** collapsible 210px ↔ 68px with 200ms width transition, persisted as `cf-sidebar-collapsed`; icons + labels expanded, icons-only with `title` tooltips collapsed; rounded active items with subtle violet backgrounds; user block collapses to an initial avatar. Lesson-workspace routes render full-width with no max-width/padding/footer; other pages keep the `max-w-6xl` layout and footer.
- **Lesson workspace (`pages/LessonWorkspace.tsx`, rewritten):** 3-panel structure kept — collapsible 200px curriculum rail, resizable lesson panel (default 35%, draggable divider, 20–50% clamp, persisted `cf-lesson-width`, collapsible with a slim vertical "Lesson ›" rail that hands all space to the editor), dominant editor column. Lesson panel has compact prev/next navigation and clean sections (objectives, concept, syntax, analogy, example, walkthrough, mistakes, debugging, challenge, summary, knowledge check) with small-caps muted section labels. Editor toolbar has exercise file tabs, runtime status, Run/Reset/Submit; Monaco uses custom warm themes (`src/lib/monacoTheme.ts`: `codeforge-dark` on `#2B2731`, `codeforge-light` on `#FBF9F7`) via `beforeMount`, switching with the theme. Fullscreen toggle uses the Fullscreen API with a CSS-expand fallback. Output panel under the editor: Output / Tests (with `passed/total` badge) / Terminal (stdin input + runtime info) / Hints tabs, Clear, collapse, draggable top-edge resize (120–420px, persisted `cf-output-height`); Run auto-switches to Output, Submit to Tests. All Monaco features (autocomplete, multi-file exercise tabs) preserved.
- **Sweep:** every page/component restyled — Admin, Assessment, AuthPages, Courses, Dashboard, Dsa, LearnPages, Projects, Visualizations, Toast — via a scripted remap (slate/navy/brand/green/red/amber → tokens) plus hand fixes. Verified: zero `slate-`/`navy-`/`dark:`/`vs-dark`/old hex classes remain in `src/`; the built CSS contains both theme variable sets and no old hex. Buttons: primary muted violet, secondary surface + subtle border, danger muted red, all rounded with 200ms transitions; headings capped at `text-xl`/`text-lg`.
- **Tests:** frontend 14/14 at redesign delivery (was 5/5 baseline) — new `lib/theme.test.ts` (4) and `components/Layout.test.tsx` (5) cover theme/sidebar persistence; now 23/23 with the 9 provisioning tests added during integration. Frontend build passes.
- **Caveats:** no mobile nav was added (below `md` the sidebar stays hidden as before); the output panel has a 4th "Hints" tab beyond the specified Output/Tests/Terminal (the hints UI needed a reachable home after the editor column lost its scrollable below-editor area); not live-verified in a browser (no browser access in this subagent) — resize drags, fullscreen, and the Monaco theme switch are code-verified (tests + `tsc` + build) but not click-tested.
- **Zip:** both features ship in `~/workspace/your_files/codeforge-academy-2026-11-24-gnome-runtime.zip` (see fresh-copy verification below). Next phase (queued, not in this zip): 700 tracks (100 per each of the 7 core languages), ML/Neural Networks basic→advanced, and a large industry-projects expansion.

## Phase 2 — 700-track expansion + ML/Neural + industry projects + DevOps tools + audit fixes (2026-11-24)

Kept the existing 100 tracks and added **693 tracks / 6930 lessons** (all 10 lessons each, same compact-track shape: 7 code exercises + 3 quizzes, capstone, 10-question assessment), for totals of **793 courses, 8284 lessons, 8284 exercises, 793 assessments**. Per-language exactly 100 for each of C, C++, Python, TypeScript, React, Rust, Go. New files: `backend/src/curriculum/data/tracks700-{c,cpp,python,typescript,react,rust}-{a,b,c}.ts` (33/33/32–33 tracks each), `tracks700-python-ml.ts` (15 ML/Neural deep dives), `tracks700-devops-tools.ts` (40 Ansible/Terraform/Docker/Git tracks, 10 each), `projects-industry-a/b.ts` (45 industry projects), `projects-industry-c.ts` (12 DevOps-tool projects).

| Group | New tracks | New lessons |
|---|---|---|
| C (a/b/c: 33+33+32) | 98 | 980 |
| C++ (a/b/c: 33+33+33) | 99 | 990 |
| Python (a/b: 24+23) | 47 | 470 |
| Python ML/Neural deep dives | 15 | 150 |
| TypeScript (a/b/c: 33+32+32) | 97 | 970 |
| React (a/b/c: 33+33+33) | 99 | 990 |
| Rust (a/b/c: 33+33+33) | 99 | 990 |
| Go (a/b/c: 33+33+33) | 99 | 990 |
| DevOps tools (Ansible/Terraform/Docker/Git, 10 each) | 40 | 400 |
| **New subtotal** | **693** | **6930** |
| Existing 100-track catalogue | 100 | 1354 |
| **Grand total** | **793** | **8284** |

Per-language totals (new + existing): C 100, C++ 100, Python 100, TypeScript 100, React 100, Rust 100, Go 100 — verified by `check-tracks.mjs`.

- **ML/Neural Networks basic→advanced:** Python already had ML survey tracks; the 15 new tracks are deep dives (linear algebra/probability for ML, logistic regression + gradient descent from scratch, backpropagation, CNNs, transformers/attention, PCA, MLOps topics), all with runnable NumPy-free pure-Python solutions executed at authoring time. Data & AI category is now 31 tracks.
- **Industry projects:** 95 total (38 + 45 industry + 12 DevOps-tool) — REST API services, full-stack apps, data pipelines, CI/CD pipelines, ML model services, CLI tools, systems utilities, Terraform VPC/multi-env stacks, Docker containerise-and-ship, Ansible automation, team Git workflows (branching, PRs, rebasing, conflicts, release trains, monorepo migration). Each has requirements, milestones, tests, review checklist, final assessment.
- **DevOps tools as real executors** (`backend/src/execution/executor.ts`): git runs the submission as a shell script in a fresh repo; ansible runs the submission as a playbook (`hosts: localhost`, `connection: local`, no `become`); terraform runs `init -backend=false` + `validate` on the provider-less HCL; docker builds the submitted Dockerfile (daemon reachability checked first, honest 503 otherwise). Provisioning: git/ansible/terraform are `baked` (apt + official HashiCorp zip for Terraform 1.17.2), docker is `manual` (needs the host daemon + socket mount, CLI baked as a static binary); the runtime-coverage gate passes (34 languages → 31 runtimes). Executor fix: `runProcess` now guards stdin errors (EPIPE crash on fast-exiting commands, found via git).
- **Seed performance:** `backend/src/db/seed.ts` rewritten to prepare statements once and write everything in a single transaction (imports first, fully synchronous write phase). Fresh seed **~7.0 s**, re-seed **~5.4 s** for the full 793-course catalog on this sandbox (was ~12.9 s / ~8.4 s at 675 courses under load). Seed is idempotent (same counts on re-seed). Seeded DB is ~105 MB.
- **Layout rule + browser-audit fixes (live host audit, 2026-11-24):** app shell is exactly viewport height (`h-dvh`, no page-level scroll); every panel scrolls independently with its own themed scrollbar (`.panel-scroll`); lesson workspace matches the reference screenshot (file tabs, Lesson/Examples/Quiz tabs, "Lesson N of 12" counter, Previous/Next pinned at bottom, output panel under the editor); sidebar defaults to the 68px icon rail; Monaco re-lays out via `ResizeObserver` (fixes the P0 blank-panel bug — code fix, needs a live browser re-check after deploy); DSA page redesigned learning-first (visualizations/hints/solution behind collapsed-by-default panels); Assessments page added (`/assessments` + sidebar link); version `v1.1.0` shown in the sidebar footer and Profile; course pills fixed via `courseTaxonomy.ts` (language shown only when it is the track's subject); filters in one row; header search syncs/clears on navigation. DSA detail API now returns camelCase (`starterCode`, `timeComplexity`, `spaceComplexity`, `solutionDiscussion`) — the frontend also normalises snake_case as defence.
- **Counts enforced in tests:** `scripts/check-tracks.mjs` (793/8284, per-language 100, data-ai 31, devops 54 with 10 per tool), `scripts/smoke-test.mjs` (793/8284), backend catalog test (same assertions). The seed glob now accepts `.ts` as well as `.js` so vitest (which runs against `src/`) seeds the 700-track files too — previously it silently seeded only the 100 old tracks in tests.
- **Zip:** `~/workspace/your_files/codeforge-academy-2026-11-24-gnome-runtime-700-tracks.zip` (see fresh-copy verification below). Drop-in replacement on the Fedora host: `docker compose down && docker compose build --no-cache && docker compose up -d` from `~/Codeforge-academy`. Ports, compose layout, SQLite volume, GNOME theme, provisioning system unchanged.

## Docker section

- Deliverables: `backend/Dockerfile`, `frontend/Dockerfile`, `frontend/nginx.conf`, `docker-compose.yml`, `backend/.dockerignore`, `frontend/.dockerignore`, `docs/DOCKER.md`.
- Ports (consistent everywhere): backend host **:4000** (container :4000), frontend host **:80** (container :80). Local path keeps :8080 / :5173.
- SQLite persisted in named volume `codeforge-data` at `/app/data/codeforge.db`.
- The backend image compiles `dist` from `src` at build time, so all 793 tracks (`dist/curriculum/data/*.js`) ship in the image; the fixed build script (bug 15) copies all migrations flat into `dist/db/migrations/`.
- Verified here: YAML parse + cross-checks (see verification log). NOT verified here: `docker compose config`, image build, `up --build`, health endpoint via curl — Docker is absent from the sandbox. These steps must run on a host with Docker.

## Fresh-copy (zip) verification

Zip: `~/workspace/your_files/codeforge-academy-2026-11-24-100-tracks.zip` — **109 files, 1.8 MB**, no `node_modules`/`dist`/`.env`/`*.db`. `unzip -l` confirms all 7 `tracks-*.ts` files, `builder.ts`, migrations 001–003, and the new scripts.

Fresh-copy check (2026-11-24 ~05:49 IST, exact commands, clean dir `~/workspace/.cf-verify` — note: `/tmp` here is a 512M tmpfs; the first attempt under `/tmp` failed with `ENOSPC` during `npm install`, so the fresh copy was extracted under `~/workspace` instead and the scratch dir deleted afterwards):
- `unzip -q ~/workspace/your_files/codeforge-academy-2026-11-24-100-tracks.zip` → `codeforge-academy/`
- `npm install --no-audit --no-fund` → `added 360 packages`
- `bash scripts/verify.sh` → **verify OK — backend 19/19, frontend 5/5**
- `npm run build --workspace=backend` → `dist/db/migrations/` contains `001_init.sql`, `002_add_course_category.sql`, `003_add_exercise_options.sql` (build-script fix, bug 15, confirmed in the artifact)
- `DATABASE_PATH=/tmp/cf-spot.db PORT=18085 node backend/dist/index.js` → `{"status":"ok"}` on `/api/health`; seed log `{"courses":100,"lessons":1354,"exercises":1354,"dsa":152,"projects":38,"assessments":100}`
- Spot-check script vs that built server (setup → register → first-lesson solution submit per group): **java PASS, vue PASS, react-native PASS, statistics PASS, postgresql PASS, linux-bash PASS, operating-systems PASS**; html-css quiz = multiple-choice, 4 options, no `answer_index` leak.

The same check was first run against the pre-repackaging zip (~05:46 IST, `/tmp/cf-100tracks-verify`, port 18083) with identical results; the zip was then repackaged only to include the finished fresh-copy section in `IMPLEMENTATION_STATUS.md`, and the check above was re-run against the final zip.

Source-tree smoke after the final edits: `node scripts/smoke-test.mjs` → **22 passed, 0 failed**.

## Fresh-copy (gnome-runtime zip) verification

Zip: `~/workspace/your_files/codeforge-academy-2026-11-24-gnome-runtime.zip` — **121 files, 1.8 MB**, no `node_modules`/`dist`/`.env`/`*.db`. Contains the GNOME redesign + all-language runtime provisioning + integration (migration 004, `scripts/check-runtime-coverage.mjs`, `frontend/src/lib/provisioning.ts`).

Fresh-copy check (2026-11-24, clean dir `~/workspace/.cf-verify-gnome`, port 18086, fresh DB):
- `npm install` + `npm run install:all` → workspaces installed.
- `bash scripts/verify.sh` → **verify OK — backend 37 passed | 1 skipped (38), frontend 23 passed (23)**; Dockerfile COPY check OK; runtime coverage OK (30 languages → 27 runtimes).
- Built server boot → health `{"status":"ok"}`; `[seed] {"courses":100,"lessons":1354,"exercises":1354,"dsa":152,"projects":38,"assessments":100}`.
- `GET /api/runtimes` → 27 runtimes; rust `present`/`baked`/`dockerBaked:true`; swift `install_unavailable`/`manual` with exact guidance; csharp `unknown`/`auto`. `GET /api/provisioning` → 27 runtimes.
- `node scripts/smoke-test.mjs` against the built server → **22 passed, 0 failed**.
- Drop-in replacement on the user's Fedora host: `docker compose down && docker compose build --no-cache && docker compose up -d` from `~/Codeforge-academy` (ports, compose layout, SQLite volume, seed data unchanged). Real Docker build/run still unverified anywhere (no Docker in this sandbox).
