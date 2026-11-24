# Architecture

## Overview

```
┌──────────────────┐   same-origin /api   ┌──────────────────────────┐
│  Frontend        │ ───────────────────► │  Backend (Express)     │
│  React 18 + TS   │  HttpOnly cookie     │  TypeScript, Node 24   │
│  Vite + Tailwind │  + CSRF token        │  SQLite (node:sqlite)  │
│  Monaco editor   │                      │  Execution engine      │
└──────────────────┘                      └──────────────────────────┘
```

Monorepo with npm workspaces: `backend/`, `frontend/`, root scripts.

## Backend module map

| Path | Responsibility |
|---|---|
| `src/index.ts` | Express app, route mounting, static frontend serving in production, startup seeding |
| `src/db/db.ts` | `node:sqlite` open/migrate, roles + permissions seed, config, audit helper |
| `src/db/migrations/001_init.sql` | Full schema (users, roles, permissions, sessions, audit, courses/modules/lessons/exercises, DSA, assessments, projects, progress, achievements, activity, config) |
| `src/db/seed.ts` | Seeds curriculum data files into the DB (idempotent upserts) |
| `src/middleware/auth.ts` | Session loading, `requireAuth`, `requirePermission`, `requireRole`, double-submit CSRF, cookie options |
| `src/routes/auth.ts` | Setup wizard, register/login/logout, password change/reset, sessions, account deletion |
| `src/routes/admin.ts` | User/role/permission management, audit logs, runtime config, submission review |
| `src/routes/courses.ts` | Catalog, course detail, lesson fetch, enrol, complete (unlock order), progress, mastery gate, curriculum CRUD |
| `src/routes/execute.ts` | `/runtimes`, `/run`, exercise submit (visible+hidden tests), hint levels |
| `src/routes/learn.ts` | DSA list/detail/submit, projects + milestones + submissions, assessments, dashboard/analytics/profile |
| `src/execution/executor.ts` | Runtime detection + restricted subprocess execution per language |
| `src/services/gamification.ts` | XP, streaks, achievements, weak-topic recommendations |
| `src/curriculum/types.ts` | Content types (Course/Module/Lesson/Exercise/DSA/Project/Assessment) |
| `src/curriculum/data/*.ts` | Authored content: 100 tracks (7 original + 93 in `tracks-*.ts`), DSA problems, projects — seeded, never hardcoded in the frontend |
| `src/curriculum/builder.ts` | Compact `LessonSpec` → full `Lesson` builder for the 93 new tracks (1 exercise/lesson, exactly 5 hints, ≥2 quiz questions, short assessments) |

## Key design decisions

- **SQLite via `node:sqlite`** (Node built-in) instead of `better-sqlite3`: no native compilation step, works identically in dev and in the Docker image.
- **No ORM**: plain SQL + numbered migration files, applied in order at startup.
- **Content as data**: curriculum lives in typed TS files, seeded into the DB. The admin curriculum editor can CRUD courses/modules/exercises; the frontend never hardcodes lesson text.
- **Auth**: server-side sessions in SQLite, token hashed (SHA-256) at rest, HttpOnly SameSite=Lax cookie, sliding expiry, remember-me long-lived sessions, revocation. No tokens in localStorage. CSRF via double-submit cookie+header on all mutating `/api` routes.
- **Authorization**: permission strings checked in Express middleware on every mutating/admin route; UI hiding is cosmetic only.
- **Execution**: one temp workspace per run (`mkdtemp`), scrubbed env, no shell, hard timeout, output cap, cleanup in `finally` after the child exits. See [SECURITY.md](SECURITY.md).
- **Progression**: lesson unlock order enforced server-side (previous lesson must be complete); mastery assessment gates DSA (configurable); XP/streaks/achievements derived from real activity rows.

## Frontend module map

| Path | Responsibility |
|---|---|
| `src/lib/api.ts` | fetch wrapper (credentials, CSRF refresh + retry), language mapping |
| `src/context/AuthContext.tsx` | session user + permissions |
| `src/components/Layout.tsx` | sidebar nav (student + admin sections), theme toggle, search |
| `src/components/Visualizations.tsx` | DSA visualizations with play/pause/step/speed + pseudocode |
| `src/pages/` | Dashboard, Courses, LessonWorkspace (Monaco), Dsa, Projects, Assessment, Admin, LearnPages, AuthPages |
| `src/App.tsx` | routes + auth guard |

## Ports

| Path | Frontend | Backend |
|---|---|---|
| Local dev | 5173 | 8080 |
| Local prod build | 8080 (served by backend) | 8080 |
| Docker | 80 | 4000 |
