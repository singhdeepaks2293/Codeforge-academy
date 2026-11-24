# IAM — Identity and Access Management

## Authentication

- **Registration**: email + password (min 8 chars, upper + lower + digit, validated with zod) + display name. Passwords are hashed with **bcryptjs** (cost 12). Plaintext passwords are never stored or logged.
- **Sessions**: server-side rows in `sessions`; the cookie holds a random 32-byte token, only its SHA-256 hash is stored. Cookie is `HttpOnly`, `SameSite=Lax`, `Path=/`. Default TTL 24h, sliding renewal on each authenticated request; **remember-me** issues a 30-day session.
- **CSRF**: double-submit — `cf_csrf` cookie + `X-CSRF-Token` header on every mutating `/api` call. Requests with no session cookie skip CSRF and get 401 from auth instead.
- **Lockout**: 5 failed logins → account locked for 15 minutes (configurable via `max_failed_logins` / `lockout_minutes`). Failures are audit-logged.
- **Password reset (local)**: `POST /api/auth/forgot-password` creates a 1-hour token (hashed in DB); with no mail server configured the token is returned in the response — see the endpoint note in [API.md](API.md). Resetting revokes all sessions.
- **Change password**: requires the current password; revokes all other sessions.
- **Session management**: users can list and revoke their own sessions (Profile page); suspending a user revokes all of theirs.
- **Account deletion**: deactivates the account (status `deleted`, email anonymised) and revokes sessions.
- **First run**: the setup wizard creates the initial **super-admin** and then disables itself (409 afterwards). There are no default credentials anywhere. Reset: delete the SQLite file (local) or `docker compose down -v` (Docker).

## Roles and permissions

| Role | Permissions |
|---|---|
| student | `courses.read` |
| instructor | `courses.read/create/update`, `lessons.manage`, `projects.manage`, `submissions.review`, `users.read` |
| admin | `users.read/create/update/delete`, `roles.read`, `courses.*`, `lessons.manage`, `projects.manage`, `submissions.review`, `system.settings` |
| super-admin | all 14 permissions |

Permission strings: `users.read`, `users.create`, `users.update`, `users.delete`, `roles.read`, `roles.manage`, `courses.read`, `courses.create`, `courses.update`, `courses.delete`, `lessons.manage`, `projects.manage`, `submissions.review`, `system.settings`.

Enforcement is in Express middleware (`requirePermission`) on every mutating/admin route — the UI only hides navigation. Tests assert: a student gets 403 on `/api/admin/users`, and cannot create courses; an instructor cannot perform super-admin-only actions (e.g. modifying admin accounts).

Roles are stored in `roles` + `role_permissions`; admins can create custom roles, edit their permission sets, and delete roles that are not system roles and not assigned to any user. Assigning the `super-admin` role, or modifying an admin/super-admin account, requires super-admin.

## Audit logs

Every sensitive action is written to `audit_logs` with actor, actor email, action, target type/id, result, metadata and timestamp: login, logout, failed login, password change/reset, registration, setup, user create/role assignment/suspend/delete, role create/permissions change/delete, course create/update/delete, submission review, system config change. Viewable at Admin → Audit Logs (filterable by action).
