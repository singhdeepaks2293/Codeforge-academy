# CodeForge Academy — Progress checklist (for continuation sessions)

## Done
- [x] Phase 1 — Foundation: scaffold, SQLite + migrations, auth/IAM, setup wizard, dashboard shell
- [x] Phase 2 — Learning platform: catalog, modules/lessons, workspace, progress, unlocking, search
- [x] Phase 3 — Execution engine: Python/C/C++/TS/React/Rust real runs, Go 503 honesty, timeout/errors, runtime detection
- [x] Phase 4 — Exercises/hints: visible+hidden tests, 5-level hints + tracking
- [x] Phase 5 — Curricula: 7 tracks, 354 lessons, 354 exercises (seed-verified)
- [x] Phase 6 — Mastery assessments: 7 assessments, 40 questions each + 5 programming + capstone
- [x] Phase 7 — DSA: visualizations + 152 problems
- [x] Phase 8 — Projects: routes/UI/milestones/submission/review implemented; content file pending (see below)
- [x] Phase 9 — Analytics/gamification/admin curriculum editor
- [x] Phase 10 — Quality: backend 14/14, frontend 5/5, smoke 16/16, docs, README
- [x] Docker deliverables: both Dockerfiles, nginx.conf, docker-compose.yml, .dockerignore files, docs/DOCKER.md (YAML-validated; Docker run NOT verified — no Docker in sandbox)
- [x] Zip built: `~/workspace/your_files/codeforge-academy-2026-11-24.zip` — 96 files, 790 KB, no node_modules/dist/.env/.db; extracted copy passes `npm run verify` cleanly (14/14 backend, 5/5 frontend). Packaging script: `scripts/package.sh` (note: an early rsync `--exclude 'data'` wrongly dropped `backend/src/curriculum/data/` — fixed to `/data`, root-anchored).
- [x] **Projects content**: `backend/src/curriculum/data/projects.ts` (38 projects, 261 milestones) — landed, seeded, API-verified.
- [x] **100-track expansion (2026-11-24)**: 93 new tracks / 1000 lessons — totals 100 courses, 1354 lessons, 1354 exercises, 100 assessments. Files: `backend/src/curriculum/data/tracks-{languages,web,mobile,data,databases,devops,cs}.ts` + `backend/src/curriculum/builder.ts`; migrations 002 (category) + 003 (quiz options/answer_index); executor extended (Java/Bash/Perl/SQL/Assembly/HTML + PHP/Ruby/Lua/Elixir/R/Julia/Swift/Scala/Haskell/Dart runners, honest 503s); JS ESM/CJS sniffing; SQL duplicate-column fallback; quiz grading by answer. Verified: checker exit 0, batch solutions 968 passed / 258 quiz / 128 unavailable / 0 failed, `npm run verify` 19/19 backend + 5/5 frontend, smoke 22/22, per-group spot-checks 7/7 PASS + Kotlin 503. Zip: `~/workspace/your_files/codeforge-academy-2026-11-24-100-tracks.zip` (fresh-copy verified — see IMPLEMENTATION_STATUS.md).
- [x] **Build-script migration bug fixed**: `cp -r src/db/migrations dist/db/migrations` nested the dir on rebuilds, so migrations 002/003 never reached `dist` and the built server seeded 0 courses. Fixed to `mkdir -p dist/db/migrations && cp src/db/migrations/*.sql dist/db/migrations/`.
- [x] **Host rebuild CONFIRMED (2026-11-24)**: user screenshot shows the Rust "What is Rust?" lesson running on the Fedora host with output "Program ran successfully! message = Ferris" — seed/catalog fix fully resolved on the host.
- [x] **Runtime auto-provisioning, all languages (2026-11-24)**: enrol + first-lesson triggers, background allow-listed installs, persisted state (migration 004), `GET /api/runtimes` + `GET/POST /api/provisioning/*`; 30 languages → 27 runtimes: 19 baked into the Docker image (incl. rustc/cargo, php, ruby, lua, elixir, R, ghc, scala, solc, kotlin), 3 auto-installable local-only (C#, Dart, Julia), 4 manual-only (Swift, ObjC, MongoDB, Redis). Coverage gate `scripts/check-runtime-coverage.mjs` runs in verify (fails if any track language is unhandled). Live Lua apt install verified end-to-end (7.5 s, re-detected 5.4.6, real run OK). Backend tests 37 passed / 1 skipped (38). Docker image size concern: +~1.0–1.3 GB estimated (ghc dominates) — measure on first real `docker build`.
- [x] **Ubuntu GNOME redesign (2026-11-24)**: warm `#242129` dark + warm off-white light themes with persisted toggle, collapsible 210/68px sidebar, resizable/collapsible lesson panel (default 35%), dominant editor with warm Monaco themes, output panel with Output/Tests/Terminal/Hints tabs, muted violet/orange buttons, Inter/JetBrains Mono stacks, 150–250ms motion. All functionality preserved; frontend tests 14/14 at delivery.
- [x] **Provisioning UI integration (coordinator, 2026-11-24)**: `frontend/src/lib/provisioning.ts` + 9 tests; lesson workspace shows installing/ready/failed/unavailable states + guidance banner + retry; admin `/admin/runtimes` page. Full verify green (backend 37/1 skipped, frontend 23/23). Zip: `~/workspace/your_files/codeforge-academy-2026-11-24-gnome-runtime.zip` — fresh-copy verified (see IMPLEMENTATION_STATUS.md).
- [ ] **Catalog expansion (queued next)**: 700 tracks (100 per each of C, C++, Python, TypeScript, React, Rust, Go), ML/Neural Networks basic→advanced, industry projects grown well past 38. Then one final renamed zip.

## Remaining / next steps
- [x] **Docker COPY bug fixed (2026-11-24)**: frontend Dockerfile referenced `postcss.config.js`, but the file is `postcss.config.cjs` — fixed, plus dropped the non-existent `package-lock.json*` from both Dockerfiles; new `scripts/check-dockerfiles.mjs` guard runs in `npm run verify` (old Dockerfile fails it, fixed one passes). Fresh dockerfix zip verified (19/19 + 5/5 + smoke 22/22).
- [x] **Docker seed bug fixed (2026-11-24)**: live host showed 0 tracks — backend `.dockerignore` bare `data` line excluded `src/curriculum/data/` from the image, so the seed imported nothing. Fixed by anchoring to `/data`; checker now walks copied dirs recursively (old file fails it with all 17 data entries, fixed passes); Docker build stage simulated (context + npm install + build → all 16 data .js files in dist, seed 100/1354). Dockerfix zip repackaged (110 files) and fresh-verified (19/19 + 5/5 + smoke 22/22).
- [ ] **Docker run on a host with Docker**: `docker compose up --build -d` still never run anywhere (no Docker in sandbox) — re-run it from the repackaged dockerfix zip on a host with Docker (user's dir is `~/Codeforge-academy`, capital C), then confirm `[seed]` shows 100 courses, `curl http://localhost:4000/api/courses` is non-empty, open http://10.232.189.24/courses. Record results in IMPLEMENTATION_STATUS.md.
- [ ] **More Hard DSA problems**: only 7 of 152 are Hard; add ~20 Hard problems across Graphs/DP/Trees to reach the intended mix.
- [ ] **Live browser click-through** of the frontend (lesson workspace, admin pages, catalog category filter) — needs a browser-capable agent.
- [ ] **Go on the local path**: install Go on the dev host if Go lessons must run locally (Docker image already ships Go).
- [ ] **Container-per-run execution** (future hardening): replace/augment the subprocess engine with throwaway containers; see docs/SECURITY.md.
- [x] **Toolchain installs for full local execution**: covered by runtime auto-provisioning (2026-11-24) — all 30 languages have a path (baked / auto / manual); only Swift, Objective-C, MongoDB, Redis remain manual-only with exact steps.

## How to resume
```bash
cd ~/workspace/codeforge-academy
npm run verify        # full gate: backend tests + build, frontend tests + build
node scripts/check-tracks.mjs   # curriculum counts + schema (100 / 1354 / 1354)
node scripts/verify-solutions.mjs  # every stored solution vs its tests (~6 min)
# start backend (fresh DB): DATABASE_PATH=/tmp/cf.db PORT=8080 npx tsx src/index.ts  (from backend/)
# production-style: npm run build && npm run start --workspace=backend
# smoke: node scripts/smoke-test.mjs http://127.0.0.1:8080
# zip: bash scripts/package.sh ~/workspace/your_files/codeforge-academy-2026-11-24-gnome-runtime.zip
```
