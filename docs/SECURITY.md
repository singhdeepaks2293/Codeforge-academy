# Security — code execution model and limits

## The honest summary

Student code is **untrusted code running on the same machine as the platform**. This build executes it in a **restricted subprocess**, not in a container and not in the main application process. That is a meaningful reduction in risk, but it is **not** a full sandbox, and this document says so plainly.

## What the execution engine does

- One fresh temp workspace per run (`mkdtemp` under the OS temp dir), deleted in `finally` **after** the child exits.
- `child_process.spawn` with **no shell** (no shell interpolation or injection via the command line).
- **Scrubbed environment**: a minimal `PATH`, `HOME` pointed at the temp workspace, `LANG`/`LC_ALL` set; `RUSTUP_HOME`/`CARGO_HOME` are passed through only so the `rustc` shim can find its toolchain.
- **Working directory restricted** to the temp workspace; the process is started there.
- **Hard timeout** (default 10s, configurable, max 60s) enforced by `spawn` timeout + `SIGKILL` + an additional timer.
- **Output cap** (256 KiB, truncated with a notice).
- **Exit code, stdout, stderr and timeout status** are returned; compile errors are surfaced, not hidden.
- **No Docker socket, no host filesystem access beyond the temp dir by design** — but see the limits below.
- **React** is transpiled and rendered to a string in Node (SSR smoke test), not executed in a browser DOM.

## What it does NOT claim

- A process timeout alone does **not** make arbitrary code execution safe. A determined student program running as the same OS user as the backend could still read files readable by that user, consume CPU/memory within the timeout window, or attempt network access. The engine does not set CPU/memory cgroup limits, seccomp filters, user namespaces, or filesystem mounts.
- There is **no container isolation** in the local path or in the provided Docker image: the backend container itself runs the student code as the `node` user inside the container, which still shares the container filesystem and (through the mounted volume) the SQLite directory.
- Do not expose this platform to untrusted users on a shared host without adding container-based execution (one throwaway container per run, no privileges, no Docker socket, read-only rootfs, CPU/memory limits, no network) — that is a documented future option, not something this build pretends to have.

## Deployment guidance

- Run it for yourself, your classroom, or a trusted LAN (the intended use).
- Keep `SESSION_SECRET` long and random; change the Docker compose default before sharing the host.
- Run the backend as a non-root user (the Docker image does; locally, do not run as root).
- Keep the SQLite file and `.env` out of the image and out of git (`.dockerignore` + `.gitignore` cover this).
- If you add internet access to student code, assume it can reach the network — the engine does not block egress.

## Other security properties

- Passwords: bcryptjs cost 12; sessions: hashed tokens, HttpOnly cookies, revocation, lockout.
- CSRF: double-submit token on mutating API calls.
- RBAC: permission middleware on all admin/mutating routes (see [IAM.md](IAM.md)).
- Hidden tests: the API strips hidden test cases from lesson/problem payloads and never returns hidden expected outputs in submission results.
- Assessment answers are stripped from the GET response; grading happens server-side.
