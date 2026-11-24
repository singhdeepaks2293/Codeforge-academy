# Install — local (no Docker) path

## Requirements

- Node.js 20+ (developed and verified on Node 24.22.1; `node:sqlite` needs Node 22.5+)
- npm 10+
- Python 3.10+ (`python3` on PATH) — for Python lessons
- GCC/G++ 11+ — for C/C++ lessons
- Optional: Go (`go`), Rust (`rustc` via rustup, incl. `~/.cargo/bin` on PATH), Java 11+ JRE (`java` — single-file launch, no `javac` needed), Perl, Bash — if missing, those languages report `runtime_unavailable` honestly; everything else still works. SQL runs in-process via `node:sqlite` (no install needed).
- SQLite CLI is not required (the backend uses Node's built-in `node:sqlite`)

Check what you have:

```bash
node -v; npm -v; python3 --version; gcc --version | head -1; g++ --version | head -1
which go rustc cargo java perl bash   # empty output = those runtimes are unavailable
```

All 100 tracks and 1354 lessons seed on first start (takes a few seconds); `GET /api/execute/runtimes` shows live runtime availability with install hints.

## Start

```bash
npm install
npm run dev
```

- Backend: http://127.0.0.1:8080 — API, `/api/health`
- Frontend: http://127.0.0.1:5173 — Vite dev server, proxies `/api` to the backend

The backend creates `./data/codeforge.db` on first start (SQLite file, gitignored) and seeds the curriculum. First visit: the setup wizard creates the initial administrator.

## Production-style local run

```bash
npm run build
npm run start --workspace=backend   # serves API + built frontend on :8080
```

## Environment

Copy `.env.example` to `.env` and adjust. Key variables:

| Variable | Default | Notes |
|---|---|---|
| `PORT` | 8080 | Backend listen port (local) |
| `HOST` | 127.0.0.1 | Set `BIND_LAN=1` to listen on 0.0.0.0 |
| `DATABASE_PATH` | `./data/codeforge.db` | SQLite file |
| `SESSION_SECRET` | (must set for real use) | Long random string, min 32 chars |
| `RUN_TIMEOUT_MS` | 10000 | Per-run execution timeout (max 60000) |
| `RUNTIME_EXTRA_PATHS` | — | Colon-separated dirs searched for runtimes (e.g. `~/.cargo/bin`) |

## Reset the local environment

```bash
rm -rf data/          # deletes users, progress and the setup flag
npm run dev           # setup wizard appears again
```

## Troubleshooting

- `EADDRINUSE` on :8080 or :5173: another process owns the port — stop it or set `PORT` / use `vite --port`.
- Python/C lessons report `runtime_unavailable`: install the runtime and restart the backend (`GET /api/execute/runtimes` shows install hints).
- `node:sqlite` errors: you are on Node < 22.5 — upgrade Node.
- Frontend shows a blank page: check the backend is running (`curl http://127.0.0.1:8080/api/health`) and the browser console for errors.
