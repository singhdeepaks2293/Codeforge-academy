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

## Remaining / next steps
- [ ] **Docker verification on a host with Docker**: `docker compose config`, `docker compose up --build -d`, `curl http://localhost:4000/api/health`, open http://localhost/, complete setup wizard, run a Python exercise. Record results in IMPLEMENTATION_STATUS.md.
- [ ] **More Hard DSA problems**: only 7 of 152 are Hard; add ~20 Hard problems across Graphs/DP/Trees to reach the intended mix.
- [ ] **Live browser click-through** of the frontend (lesson workspace, admin pages, catalog category filter) — needs a browser-capable agent.
- [ ] **Go on the local path**: install Go on the dev host if Go lessons must run locally (Docker image already ships Go).
- [ ] **Container-per-run execution** (future hardening): replace/augment the subprocess engine with throwaway containers; see docs/SECURITY.md.
- [ ] **Toolchain installs for full local execution**: C#/Kotlin/Swift/PHP/Ruby/Dart/Scala/Haskell/Elixir/Lua/R/Julia/Solidity (80 code exercises currently 503 honestly).

## How to resume
```bash
cd ~/workspace/codeforge-academy
npm run verify        # full gate: backend tests + build, frontend tests + build
node scripts/check-tracks.mjs   # curriculum counts + schema (100 / 1354 / 1354)
node scripts/verify-solutions.mjs  # every stored solution vs its tests (~6 min)
# start backend (fresh DB): DATABASE_PATH=/tmp/cf.db PORT=8080 npx tsx src/index.ts  (from backend/)
# production-style: npm run build && npm run start --workspace=backend
# smoke: node scripts/smoke-test.mjs http://127.0.0.1:8080
# zip: bash scripts/package.sh ~/workspace/your_files/codeforge-academy-2026-11-24-100-tracks.zip
```
