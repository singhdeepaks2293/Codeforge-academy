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

Every language used by the tracks, DSA and projects has a defined provisioning path — baked into the image, auto-installable on a local/dev host, or explicitly manual-only. Nothing is silently missing. The source of truth is `backend/src/services/provisioning.ts` (`RUNTIME_CATALOG` + `LANGUAGE_TO_RUNTIME`); `scripts/check-runtime-coverage.mjs` (run by `make verify`) fails the build if any track language has no path.

| Language / track | Runtime | Docker image | Local/dev host | Notes |
|---|---|---|---|---|
| Python 3 | `python3` | **Baked** (`python3`) | present | |
| C / Assembly | `gcc` | **Baked** (`gcc`, `build-essential`) | apt/dnf/brew/choco | asm is assembled + linked by gcc |
| C++ | `g++` | **Baked** (`g++`, `build-essential`) | apt/dnf/brew/choco | |
| TypeScript / JavaScript / React | `node` | **Baked** (base image) | present (backend needs Node) | React = TSX transpile + SSR smoke test |
| Go | `go` | **Baked** (`golang-go`) | apt/dnf/brew/choco | |
| Rust | `rustc` | **Baked** (`rustc`, `cargo`) | apt `rustc cargo`, else rustup | Bookworm ships Rust 1.63; rustup gets stable on local hosts |
| Java | `java` | **Baked** (`default-jre-headless`) | apt/dnf/brew/choco | Single-file launch — no `javac` needed |
| Bash | `bash` | **Baked** (base image) | present | |
| Perl | `perl` | **Baked** (`perl`) | apt/dnf/brew/choco | |
| SQL | in-process | **Built-in** (`node:sqlite`) | — | No install ever needed |
| HTML | static check | **Built-in** | — | Tag-balance validation, not a browser render |
| PHP | `php` | **Baked** (`php-cli`) | apt/dnf/brew/choco | |
| Ruby | `ruby` | **Baked** (`ruby`) | apt/dnf/brew/choco | |
| Lua | `lua` | **Baked** (`lua5.4` + `lua` symlink) | apt/dnf/brew/choco | |
| Elixir | `elixir` | **Baked** (`elixir`) | apt/dnf/brew/choco | Erlang pulled in by the package manager |
| R | `Rscript` | **Baked** (`r-base-core`) | apt/dnf/brew/choco | |
| Haskell | `runghc` | **Baked** (`ghc`) | apt/dnf/brew/choco | The big one: ghc is ~650 MB installed |
| Scala | `scala` | **Baked** (`scala`) | apt/brew/choco (no dnf package) | Needs the JRE above |
| Solidity | `solc` | **Baked** (official static binary) | static-binary download | No apt package on bookworm |
| Kotlin | `kotlinc` | **Baked** (official compiler zip) | compiler-zip download | Needs the JRE above |
| C# | `dotnet` | Not in image | **Auto** (dotnet-install script) | Needs .NET 8 SDK; no apt package on bookworm |
| Dart | `dart` | Not in image | **Auto** (official SDK zip) | |
| Julia | `julia` | Not in image | **Auto** (official tarball, Linux) | |
| Swift | `swift` | Not in image | **Manual only** | Platform-specific ~700 MB toolchains, no stable unattended installer; macOS: Xcode; Linux: swift.org toolchain for your distro |
| Objective-C | `clang` | Not in image | **Manual only** | macOS: Xcode; Linux: GNUstep. No single-file ObjC runner exists yet, so the track stays quiz-graded even with a toolchain |
| MongoDB | `mongod` | Not in image | **Manual only** | A database service, not a code runner — the track is quiz-style |
| Redis | `redis-server` | Not in image | **Manual only** | A service, not a code runner — the track is quiz-style |
| Git | `git` | **Baked** (`git`) | apt/dnf/brew/choco | Exercises are shell scripts run in a fresh repo (executor does `git init` + identity) |
| Ansible | `ansible-playbook` | **Baked** (`ansible`) | apt/dnf/brew, `pip install ansible` | Submitted code IS a playbook: syntax-check, then a real run against localhost (`-c local`); no `become`, no remote hosts |
| Terraform | `terraform` | **Baked** (official 1.17.2 zip) | **Auto** (official zip, Linux) | `terraform init -backend=false` then `terraform validate`; configs are provider-less (variables/locals/outputs) so init works offline |
| Docker | `docker` | **CLI baked** (official static binary) | **Manual only** (needs the Engine daemon) | The image ships only the CLI — see "Docker exercises need the host daemon" below |

### Docker exercises need the host daemon

The backend image ships only the Docker **CLI** — there is no Docker Engine daemon inside the container, and a daemon cannot run usefully there. Docker exercises (`docker build`) therefore need the CLI to reach a daemon:

- **Containerised backend (opt-in):** mount the host Docker socket into the backend container. In `deployments/compose/docker-compose.yml`, add to the `api` service (and `worker`, if it runs Docker exercises):
  ```yaml
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
  ```
  **Security warning:** the Docker socket is effectively host root — a container with socket access can start privileged containers and read host files. Only enable this on a trusted local/learning host, never on a shared or internet-exposed one. This mount is NOT in the default compose file for exactly that reason.
- **Without the socket mount** (the default), Docker exercises honestly return 503 `runtime_unavailable` with an explanation — they are never faked as passing.
- **Local/dev backend (`npm run dev`):** no mount needed — the backend runs on the host, so the CLI talks to the host daemon directly once Docker Engine is installed and running.

### Two deployment realities

- **Docker:** the backend runs as the non-root `node` user, so runtime installs *cannot* work inside a running container. Provisioning there reports `install_unavailable` honestly; the Docker path is baking runtimes into the image (above). To add a runtime to Docker, extend `backend/Dockerfile` and rebuild.
- **Local/dev:** when a learner enrols in a course (or opens a lesson) whose runtime is missing, the backend starts a background install (package manager first, official installer as fallback) and records `installing` → `ready` / `failed` / `install_unavailable` in SQLite (`runtime_provisioning` table), so a restart never re-triggers it. The lesson/enrol response never waits for the install. Auto-install can be disabled with `CODEFORGE_PROVISIONING_ENABLED=0` (then missing runtimes stay honestly unavailable). A run is never faked: while a runtime is missing, `POST /api/execute/run` still returns 503 `runtime_unavailable`.

### Runtime status API

- `GET /api/runtimes` (alias of `GET /api/execute/runtimes`) — every runtime with `available`, `version`, `installHint` and `provisioning: { state, kind, dockerBaked, reason, guidance }`. States: `unknown` / `present` / `installing` / `ready` / `failed` / `install_unavailable`.
- `GET /api/provisioning` — the same statuses as a list; `GET /api/provisioning/:runtime` — one runtime.
- `POST /api/provisioning/:runtime/install` (signed-in users only) — starts (or retries) an install in the background; 202 when a new install starts, 200 otherwise, with the current status in the body.

### Size note

The baked apt set adds roughly 1.0–1.3 GB over the previous image, dominated by ghc (~650 MB installed), rustc/cargo + LLVM (~200 MB) and R (~150 MB with dependencies). That is the deliberate cost of covering every track in the image; the numbers are estimates from the packages' Installed-Size fields and have **not** been measured from a real `docker build` here (no Docker in the build sandbox).

## Troubleshooting

- `docker compose ps` shows `backend` unhealthy: `docker compose logs backend` — the most common cause is a bad `SESSION_SECRET` or a corrupt volume; `docker compose down -v` resets to a clean database (data loss — see above).
- Port 80 already in use: change the frontend host port (e.g. `"8080:80"`) and open http://localhost:8080/.
- Port 4000 already in use: change the backend host port (e.g. `"4001:4000"`).
- The frontend shows the app but API calls fail: check `docker compose logs frontend` and confirm the backend is healthy (`curl http://localhost:4000/api/health`).

## Verification status

- `docker compose config` could **not** be run in the build sandbox — Docker is not installed there. The compose file was validated with a YAML parser and cross-checked (service names, ports, env, volume, healthcheck, nginx proxy target `backend:4000`, brace balance, SPA fallback) — see `IMPLEMENTATION_STATUS.md`.
- **Docker build/run verification remains to be done on a host with Docker**: run `docker compose up --build -d`, then `curl http://localhost:4000/api/health` and open http://localhost/ and complete the setup wizard. Do not claim this step is done until it has actually run.
