# CodeForge Academy — Docker run path

This is the containerised way to run CodeForge Academy. The local (no-Docker) path is the default and is documented in [INSTALL.md](INSTALL.md) and the [README](../README.md).

## Architecture in Docker

```
browser ──► frontend (nginx:alpine, :80) ──► /api ──► backend (node:24, :4000)
                                                              │
                                                     SQLite /app/data/codeforge.db
                                                     (named volume codeforge-data)
```

- `backend` — multi-stage Node 24 image (`backend/Dockerfile`). Production build, runs as the non-root `node` user, `HEALTHCHECK` on `/api/health` (Node `fetch`, no curl needed). Ships real execution runtimes: **python3, gcc, g++, go, Java (JRE, single-file launch), perl, bash**. The compiled seed code dynamic-imports `dist/curriculum/data/*.js` — all 100 tracks are part of `dist`, so they ship in the image with no extra copy step (see `backend/Dockerfile`).
- `frontend` — Node build stage, then `nginx:1.27-alpine` serving the Vite build (`frontend/Dockerfile` + `frontend/nginx.conf`). `/api` is proxied to `http://backend:4000` so the browser stays same-origin (session cookie + CSRF keep working). SPA fallback serves `index.html` for all routes.

## Quick start

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f backend
```

- Frontend: http://localhost/
- Backend: http://localhost:4000 — check http://localhost:4000/api/health
- First run: the setup wizard in the browser creates the initial administrator (no default credentials).

```bash
docker compose down      # stop, keep the SQLite volume (users + progress survive)
docker compose down -v   # stop AND DELETE the volume — all users, progress and data are gone
```

## Ports

| Service | Host port | Container port | Change it |
|---|---|---|---|
| frontend | 80 | 80 | edit `ports:` under `frontend` in `docker-compose.yml` |
| backend | 4000 | 4000 | edit `ports:` under `backend` **and** the `PORT` env (they must match); also update the nginx `proxy_pass` target if you change the container port |

Local (no-Docker) defaults are intentionally different: backend :8080, frontend :5173. Do not confuse the two paths.

## Data and environment

- SQLite lives in the named volume `codeforge-data`, mounted at `/app/data` in the backend container (`DATABASE_PATH=/app/data/codeforge.db`). Inspect it with:
  ```bash
  docker compose exec backend ls -la /app/data
  ```
- Environment is set in `docker-compose.yml`. `SESSION_SECRET` can be overridden from a local `.env` file (compose reads `.env` automatically):
  ```bash
  SESSION_SECRET=a-long-random-secret-at-least-32-chars
  ```
  The compose default (`dev-only-change-me-before-sharing-this-host`) is for local use only — change it before exposing the stack beyond localhost.
- No `.env` file and no database are ever baked into the images (see `.dockerignore` in `backend/` and `frontend/`).

## Runtimes in the Docker image

| Language | In the image? | Notes |
|---|---|---|
| Python 3 | Yes (`python3`) | |
| C / C++ | Yes (`gcc`, `g++`) | |
| TypeScript / JavaScript | Yes (Node + bundled `typescript`) | |
| React | Yes (TSX transpile + server-render smoke test) | Same scope as local: SSR smoke test, not a browser DOM run |
| Go | Yes (`golang-go` from Debian) | |
| Java | Yes (`default-jre-headless`, single-file launch) | No `javac` — source files run via `java Main.java` |
| Bash / Perl | Yes (`bash`, `perl`) | |
| SQL | Yes (in-process `node:sqlite`) | No install needed |
| Assembly (x86-64) | Yes (`gcc` as assembler/linker) | |
| Rust | **No** | The API reports `runtime_unavailable` with install instructions. Rust toolchains via rustup are ~1 GB; to add Rust, extend `backend/Dockerfile` with a rustup install (see note below) or run the local path where `~/.cargo/bin/rustc` is detected. |
| C# / Kotlin / Swift / Ruby / PHP / Dart / Scala / Haskell / Elixir / Lua / R / Julia / Solidity | **No** | Those tracks' code exercises return honest 503 `runtime_unavailable`; their quiz exercises still grade by answer. |

Optional Rust layer (unverified here — Docker is not available in the build sandbox):

```dockerfile
# in backend/Dockerfile, runtime stage, as root before USER node:
# RUN apt-get update && apt-get install -y --no-install-recommends curl \
#  && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable \
#  && rm -rf /var/lib/apt/lists/* /root/.rustup/tmp
# ENV PATH="/root/.cargo/bin:${PATH}"
```

## Troubleshooting

- `docker compose ps` shows `backend` unhealthy: `docker compose logs backend` — the most common cause is a bad `SESSION_SECRET` or a corrupt volume; `docker compose down -v` resets to a clean database (data loss — see above).
- Port 80 already in use: change the frontend host port (e.g. `"8080:80"`) and open http://localhost:8080/.
- Port 4000 already in use: change the backend host port (e.g. `"4001:4000"`).
- The frontend shows the app but API calls fail: check `docker compose logs frontend` and confirm the backend is healthy (`curl http://localhost:4000/api/health`).

## Verification status

- `docker compose config` could **not** be run in the build sandbox — Docker is not installed there. The compose file was validated with a YAML parser and cross-checked (service names, ports, env, volume, healthcheck, nginx proxy target `backend:4000`, brace balance, SPA fallback) — see `IMPLEMENTATION_STATUS.md`.
- **Docker build/run verification remains to be done on a host with Docker**: run `docker compose up --build -d`, then `curl http://localhost:4000/api/health` and open http://localhost/ and complete the setup wizard. Do not claim this step is done until it has actually run.
