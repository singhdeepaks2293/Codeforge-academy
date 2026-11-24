# API reference

Base URL (local): `http://127.0.0.1:8080/api`. All responses are JSON. Mutating requests require the `X-CSRF-Token` header matching the `cf_csrf` cookie (fetch it from `GET /api/auth/csrf`); requests without a session cookie get 401 from `requireAuth` before CSRF is checked.

## Health

- `GET /api/health` → `{ status: "ok", version, time }` (no auth)

## Auth — `/api/auth`

| Method | Route | Notes |
|---|---|---|
| GET | `/setup-status` | `{ setupComplete }` |
| POST | `/setup` | First-run admin creation; 409 once complete |
| POST | `/register` | `{ email, password, displayName }` → 201 + session cookie |
| POST | `/login` | `{ email, password, rememberMe? }`; 401 bad creds, 423 locked |
| POST | `/logout` | Revokes the current session |
| GET | `/me` | Current user + permissions |
| GET | `/csrf` | `{ csrfToken }` (also sets the cookie) |
| POST | `/change-password` | Requires current password; revokes other sessions |
| POST | `/forgot-password` | Returns a reset token in local deployments (no mail server) |
| POST | `/reset-password` | `{ token, newPassword }` |
| GET | `/sessions` | Own sessions |
| POST | `/sessions/:id/revoke` | Revoke one session |
| DELETE | `/account` | Deactivate own account |

## Courses — `/api/courses`

- `GET /` — catalog (filters: `language`, `q`); each course includes `totalLessons`
- `GET /search?q=` — courses, lessons, DSA problems, projects
- `GET /:slug` — course + modules + lesson lists
- `GET /:slug/lessons/:lessonId` — full lesson content + exercises (hidden tests stripped)
- `POST /:slug/enroll` — enrol (auth)
- `POST /:slug/lessons/:lessonId/complete` — complete, enforcing unlock order (auth)
- `GET /:slug/progress` — completed/unlocked/next lesson + percent (auth)
- `POST /` (`courses.create`), `PATCH /:slug` (`courses.update`), `DELETE /:slug` (`courses.delete`)
- `POST /:slug/modules` (`lessons.manage`), `POST /lessons/:lessonId/exercises` (`lessons.manage`)

## Execution — `/api/execute` (auth)

- `GET /runtimes` — detected runtimes with `available` + `installHint`
- `POST /run` — `{ language, code, stdin?, timeoutMs? }` → `{ success, stdout, stderr, exitCode, timedOut, durationMs }`; 503 + `runtimeUnavailable` when the runtime is missing
- `POST /exercises/:id/submit` — runs visible + hidden tests; response never exposes hidden test inputs/expected outputs
- `GET /exercises/:id/hints/:level` — hint levels 1–5

Languages: `python`, `c`, `cpp`, `javascript`, `typescript`, `react`, `go`, `rust`.

## DSA — `/api/dsa` (auth)

- `GET /gate` — mastery gate status
- `GET /problems` — list (filters: `difficulty`, `topic`, `q`), each with `solved`
- `GET /problems/:slug` — detail (hidden tests stripped)
- `POST /problems/:slug/submit` — `{ code, language, hintsUsed? }` → pass/fail + per-test results

## Projects — `/api/projects` (auth)

- `GET /` — list (filter `level`)
- `GET /:slug` — detail + milestones + own progress
- `POST /:slug/milestones/:milestoneId/complete` — awards XP, updates status
- `POST /:slug/submit` — submit for instructor review

## Assessments — `/api/assessments` (auth)

- `GET /:courseSlug` — questions (answers stripped), programming exercises, capstone, previous attempts
- `POST /:courseSlug/submit` — `{ answers, programming, timeSeconds }` → `{ scorePercent, passed, weakTopics, feedback }`; passing sets `mastery_passed` and unlocks DSA

## Progress — `/api/progress` (auth)

- `GET /dashboard` — XP, streak, daily goal, courses, recent lessons, 14-day activity, achievements, DSA counts, weak topics
- `GET /profile`, `PATCH /profile` — display name

## Admin — `/api/admin` (auth + permission)

- `GET /stats` (`system.settings`)
- `GET /users`, `GET /users/:id`, `POST /users` (`users.create`), `PATCH /users/:id` (`users.update`), `DELETE /users/:id` (`users.delete`)
- `GET /roles`, `POST /roles`, `PATCH /roles/:id`, `DELETE /roles/:id` (`roles.manage`)
- `GET /audit-logs` (`system.settings`, filter `action`)
- `GET /config`, `PATCH /config` (`system.settings`)
- `GET /submissions`, `POST /submissions/:id/review` (`submissions.review`)

## Errors

`{ "error": "message" }` with HTTP status: 400 validation, 401 unauthenticated, 403 forbidden / invalid CSRF, 404 not found, 409 conflict, 423 locked, 503 runtime unavailable.
