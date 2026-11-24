# CodeForge Academy

A locally hosted, interactive programming learning platform — inspired by Codecademy and freeCodeCamp, built as original software with its own branding. Learn 100 tracks from absolute beginner to advanced — programming languages, web, mobile, data & AI, databases, DevOps & cloud, and CS foundations — master data structures and algorithms, and build industry-style projects — all with real code execution on your own machine.

**Learn → Understand → Practice → Debug → Master → DSA → Build Projects → Become Industry Ready**

## What it is

- **100 tracks, 1354 lessons** — the original 7 language tracks (C, C++, Python, TypeScript, React, Rust, Go) plus 93 more across Languages, Web & Frontend, Mobile, Data/AI/ML, Databases & Backend, DevOps/Cloud/Systems, and CS Foundations & Career. The 7 original tracks end in a full mastery assessment (40 questions + 5 programming exercises + capstone, pass 80%); each new track ends in a short assessment (10 questions + 1 programming exercise + capstone, pass 80%).
- **Interactive learning workspace** — three-panel layout: curriculum nav, lesson content, Monaco editor with Run / Reset / Submit, real compiler output, test results and a 5-level progressive hint system. Quiz-style exercises (multiple-choice / predict-output) are graded by answer on the server — no code is pretended to run.
- **Real code execution** — Python (CPython), C/C++ (gcc/g++), TypeScript/JavaScript (Node + bundled TypeScript), Go, Rust (rustc), Java (single-file launch, JDK 11+), Bash, Perl, SQL (in-process SQLite), x86-64 Assembly (gcc), HTML (static tag validation), React (TSX transpile + server-render smoke test). Missing runtimes are reported honestly with install instructions — a run is never faked. See [docs/CURRICULUM.md](docs/CURRICULUM.md) for per-track runtime support.
- **Runtime auto-provisioning** — every language used by the 100 tracks, DSA and projects has a defined path: baked into the Docker image, auto-installed in the background when you start a course on a local/dev host, or explicitly manual-only with exact steps (Swift, Objective-C, MongoDB/Redis). Enrolling or opening a lesson kicks off a missing runtime's install without blocking you; `GET /api/runtimes` shows each runtime's state (`present` / `installing` / `ready` / `failed` / `install_unavailable`). Full matrix: [docs/DOCKER.md](docs/DOCKER.md#runtimes-in-the-docker-image).
- **DSA platform** — 10-level curriculum, interactive visualizations (merge/quick sort, binary search, stack, queue, BST, graph BFS, DP table) with play/pause/step/speed controls, and a 150+ problem library with visible + hidden tests.
- **Project Academy** — 38 guided projects in 4 levels, from CLI tools to industry simulations (production REST API, full-stack SaaS, distributed job processing, compiler/interpreter, mini database, capstone), with milestones, acceptance criteria, code-review checklists and instructor review.
- **IAM** — registration, bcrypt password hashing, HttpOnly SameSite session cookies, CSRF protection, login throttling + 15-minute lockout, password reset (local token flow), session revocation, first-run setup wizard (no default admin credentials), RBAC (student / instructor / admin / super-admin) with 14 permission strings enforced in the backend, and a full audit log.
- **Gamification & analytics** — XP, daily streaks, daily goals, 18 achievements, weekly activity charts, and weak-topic recommendations computed from your real submission data.
- **Local-first** — SQLite file database, no cloud account, no paid API, no mandatory internet.

## Two ways to run

### Option A — Local (no Docker, default)

```bash
npm install
npm run dev
```

- Backend: http://127.0.0.1:8080 (API + `/api/health`)
- Frontend: http://127.0.0.1:5173 (Vite dev server, proxies `/api` to the backend)

One-command production build: `npm run build`, then `npm run start --workspace=backend` (serves the API and the built frontend from one port).

Full local instructions: [docs/INSTALL.md](docs/INSTALL.md).

### Option B — Docker (backend + frontend containerised)

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f
```

- Frontend: http://localhost/ (host :80)
- Backend: http://localhost:4000 (host :4000, `/api/health`)
- SQLite persists in the named volume `codeforge-data` (`/app/data/codeforge.db`).

```bash
docker compose down      # stop, keep data
docker compose down -v   # stop AND DELETE all users, progress and data
```

Full Docker instructions, port changes and the runtime matrix: [docs/DOCKER.md](docs/DOCKER.md).

| Path | Frontend | Backend | Database |
|---|---|---|---|
| Local dev | http://127.0.0.1:5173 | http://127.0.0.1:8080 | `./data/codeforge.db` (backend working dir) |
| Docker | http://localhost/ (:80) | http://localhost:4000 | named volume `codeforge-data` |

## First run

1. Open the frontend. The **setup wizard** asks you to create the initial administrator account.
2. There are **no default admin credentials**. The wizard disables itself after setup. To reset the local environment, delete `data/codeforge.db` (local) or run `docker compose down -v` (Docker) and start again.
3. Register a student account, enrol in a course, and run your first program.

## Verify it works

```bash
npm run verify   # backend tests + backend build + frontend tests + frontend build
node scripts/smoke-test.mjs   # end-to-end smoke against a running backend
```

See [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) for the verification log, exact test numbers, curriculum counts and honest limitations.

## Documentation

- [docs/INSTALL.md](docs/INSTALL.md) — local setup, runtimes, troubleshooting
- [docs/DOCKER.md](docs/DOCKER.md) — Docker run path, ports, volumes, runtime matrix
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — system design, module map
- [docs/API.md](docs/API.md) — REST API reference
- [docs/IAM.md](docs/IAM.md) — authentication, roles, permissions, audit
- [docs/SECURITY.md](docs/SECURITY.md) — execution sandbox model and limits
- [docs/CURRICULUM.md](docs/CURRICULUM.md) — curriculum structure and counts

## Project layout

```
codeforge-academy/
  backend/            Node 20+ / TypeScript / Express / SQLite (node:sqlite)
    src/db/           migrations, seed, roles/permissions
    src/routes/       auth, admin, courses, execute, learn (dsa/projects/assessments/progress)
    src/execution/    real local code execution engine
    src/curriculum/   types + data (courses, DSA problems, projects) seeded into the DB
    Dockerfile        multi-stage Node 24 image
  frontend/           React 18 + TypeScript + Vite + Tailwind + Monaco
    src/pages/        dashboard, courses, lesson workspace, DSA, projects, admin, ...
    src/components/   layout, toasts, DSA visualizations
    Dockerfile        Node build -> nginx (proxies /api to backend)
  docker-compose.yml  backend :4000 + frontend :80, SQLite in a named volume
  scripts/            verify.sh, smoke-test.mjs
  docs/               install, docker, architecture, api, iam, security, curriculum
```

## License

MIT — see [LICENSE](LICENSE) (add your own if distributing).
