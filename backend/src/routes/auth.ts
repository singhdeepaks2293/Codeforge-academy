import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { getDbPath, openDb, audit, getMeta, setMeta, seedRolesAndPermissions, isSetupComplete, uid, getConfig, type UserRow } from '../db/db.js';
import { hashPassword, verifyPassword, newToken, hashToken, sessionCookieOptions, issueCsrf, getClientIp, SESSION_COOKIE, type AuthedRequest } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';

export const authRouter = Router();
const db = () => openDb(getDbPath());

const emailSchema = z.string().email().max(255);
const passwordSchema = z.string().min(8).max(128)
  .refine((p) => /[a-z]/.test(p) && /[A-Z]/.test(p) && /[0-9]/.test(p), 'Password must contain upper, lower and digit');

function publicUser(u: UserRow) {
  return { id: u.id, email: u.email, displayName: u.display_name, role: u.role, status: u.status, createdAt: u.created_at, lastLoginAt: u.last_login_at };
}

function createSession(res: Response, user: UserRow, rememberMe: boolean, req: Request): void {
  const token = newToken();
  const ttlHours = Number(process.env.SESSION_TTL_HOURS || 24);
  const rememberDays = Number(process.env.REMEMBER_ME_TTL_DAYS || 30);
  const hours = rememberMe ? rememberDays * 24 : ttlHours;
  db().prepare(`INSERT INTO sessions (id, user_id, token_hash, expires_at, remember_me, user_agent, ip)
    VALUES (?, ?, ?, datetime('now', ?), ?, ?, ?)`)
    .run(uid('sess'), user.id, hashToken(token), `+${hours} hours`, rememberMe ? 1 : 0,
      (req.headers['user-agent'] as string) || '', getClientIp(req));
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions(rememberMe));
  issueCsrf(res);
}

authRouter.get('/setup-status', (_req, res) => {
  res.json({ setupComplete: isSetupComplete(db()) });
});

authRouter.post('/setup', (req, res) => {
  const conn = db();
  if (isSetupComplete(conn)) { res.status(409).json({ error: 'setup already complete' }); return; }
  const parsed = z.object({
    email: emailSchema, password: passwordSchema, displayName: z.string().min(1).max(100),
  }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input', details: parsed.error.flatten() }); return; }
  seedRolesAndPermissions(conn);
  const id = uid('user');
  conn.prepare('INSERT INTO users (id, email, password_hash, display_name, role, status) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, parsed.data.email, hashPassword(parsed.data.password), parsed.data.displayName, 'super-admin', 'active');
  conn.prepare('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)').run(id, 'super-admin');
  setMeta(conn, 'setup_complete', '1');
  audit(conn, { actorId: id, actorEmail: parsed.data.email, action: 'setup.complete', targetType: 'system', targetId: 'setup', metadata: { email: parsed.data.email }, ip: getClientIp(req) });
  const user = conn.prepare('SELECT * FROM users WHERE id = ?').get(id) as unknown as UserRow;
  createSession(res, user, false, req);
  res.status(201).json({ user: publicUser(user) });
});

authRouter.post('/register', (req, res) => {
  const conn = db();
  if (!isSetupComplete(conn)) { res.status(409).json({ error: 'platform setup not complete', setupRequired: true }); return; }
  const parsed = z.object({
    email: emailSchema, password: passwordSchema, displayName: z.string().min(1).max(100),
  }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input', details: parsed.error.flatten() }); return; }
  const existing = conn.prepare('SELECT id FROM users WHERE email = ?').get(parsed.data.email);
  if (existing) { res.status(409).json({ error: 'email already registered' }); return; }
  const id = uid('user');
  conn.prepare('INSERT INTO users (id, email, password_hash, display_name, role, status) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, parsed.data.email, hashPassword(parsed.data.password), parsed.data.displayName, 'student', 'active');
  conn.prepare('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)').run(id, 'student');
  audit(conn, { actorId: id, actorEmail: parsed.data.email, action: 'auth.register', targetType: 'user', targetId: id, ip: getClientIp(req) });
  const user = conn.prepare('SELECT * FROM users WHERE id = ?').get(id) as unknown as UserRow;
  createSession(res, user, false, req);
  res.status(201).json({ user: publicUser(user) });
});

authRouter.post('/login', (req, res) => {
  const conn = db();
  if (!isSetupComplete(conn)) { res.status(409).json({ error: 'platform setup not complete', setupRequired: true }); return; }
  const parsed = z.object({
    email: emailSchema, password: z.string().min(1), rememberMe: z.boolean().optional(),
  }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const user = conn.prepare('SELECT * FROM users WHERE email = ?').get(parsed.data.email) as unknown as UserRow | undefined;
  const maxFailed = Number(getConfig(conn, 'max_failed_logins', '5'));
  const lockoutMin = Number(getConfig(conn, 'lockout_minutes', '15'));
  if (!user) {
    audit(conn, { actorEmail: parsed.data.email, action: 'auth.login_failed', targetType: 'user', targetId: parsed.data.email, result: 'failure', metadata: { reason: 'unknown email' }, ip: getClientIp(req) });
    res.status(401).json({ error: 'invalid email or password' });
    return;
  }
  if (user.locked_until && new Date(user.locked_until.replace(' ', 'T') + 'Z').getTime() > Date.now()) {
    audit(conn, { actorId: user.id, actorEmail: user.email, action: 'auth.login_failed', targetType: 'user', targetId: user.id, result: 'failure', metadata: { reason: 'locked' }, ip: getClientIp(req) });
    res.status(423).json({ error: 'account locked after repeated failed logins — try again later' });
    return;
  }
  if (user.status !== 'active') {
    res.status(403).json({ error: 'account is not active' });
    return;
  }
  if (!verifyPassword(parsed.data.password, user.password_hash)) {
    const failed = user.failed_login_count + 1;
    const locked = failed >= maxFailed ? `datetime('now', '+${lockoutMin} minutes')` : 'NULL';
    conn.prepare(`UPDATE users SET failed_login_count = ?, locked_until = ${locked === 'NULL' ? 'NULL' : locked} WHERE id = ?`).run(failed, user.id);
    audit(conn, { actorId: user.id, actorEmail: user.email, action: 'auth.login_failed', targetType: 'user', targetId: user.id, result: 'failure', metadata: { failedCount: failed }, ip: getClientIp(req) });
    res.status(401).json({ error: 'invalid email or password', failedAttempts: failed });
    return;
  }
  conn.prepare('UPDATE users SET failed_login_count = 0, locked_until = NULL, last_login_at = datetime(\'now\') WHERE id = ?').run(user.id);
  audit(conn, { actorId: user.id, actorEmail: user.email, action: 'auth.login', targetType: 'user', targetId: user.id, ip: getClientIp(req) });
  createSession(res, user, !!parsed.data.rememberMe, req);
  res.json({ user: publicUser(user) });
});

authRouter.post('/logout', (req: AuthedRequest, res) => {
  const conn = db();
  const token = req.cookies?.[SESSION_COOKIE];
  if (token) conn.prepare('UPDATE sessions SET revoked = 1 WHERE token_hash = ?').run(hashToken(token));
  if (req.user) audit(conn, { actorId: req.user.id, actorEmail: req.user.email, action: 'auth.logout', targetType: 'user', targetId: req.user.id, ip: getClientIp(req) });
  res.clearCookie(SESSION_COOKIE, { path: '/' });
  res.json({ ok: true });
});

authRouter.get('/me', (req: AuthedRequest, res) => {
  if (!req.user) { res.status(401).json({ error: 'authentication required' }); return; }
  res.json({ user: publicUser(req.user), permissions: req.permissions || [] });
});

authRouter.get('/csrf', (_req, res) => {
  res.json({ csrfToken: issueCsrf(res) });
});

authRouter.post('/change-password', requireAuth, (req: AuthedRequest, res) => {
  const parsed = z.object({ currentPassword: z.string().min(1), newPassword: passwordSchema }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input', details: parsed.error.flatten() }); return; }
  const conn = db();
  const user = conn.prepare('SELECT * FROM users WHERE id = ?').get(req.user!.id) as unknown as UserRow;
  if (!verifyPassword(parsed.data.currentPassword, user.password_hash)) {
    res.status(401).json({ error: 'current password is incorrect' });
    return;
  }
  conn.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hashPassword(parsed.data.newPassword), user.id);
  // Revoke all other sessions; keep the current one
  const token = req.cookies?.[SESSION_COOKIE];
  conn.prepare('UPDATE sessions SET revoked = 1 WHERE user_id = ? AND token_hash != ?').run(user.id, token ? hashToken(token) : '');
  audit(conn, { actorId: user.id, actorEmail: user.email, action: 'auth.password_change', targetType: 'user', targetId: user.id, ip: getClientIp(req) });
  res.json({ ok: true });
});

authRouter.post('/forgot-password', (req, res) => {
  const parsed = z.object({ email: emailSchema }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input' }); return; }
  const conn = db();
  const user = conn.prepare('SELECT * FROM users WHERE email = ?').get(parsed.data.email) as unknown as UserRow | undefined;
  // Always return ok to avoid email enumeration; token is returned in the response
  // for local deployment (no mail server). In production this would be emailed.
  if (!user) { res.json({ ok: true, note: 'If an account exists, a reset token was created.' }); return; }
  const token = newToken();
  conn.prepare('INSERT INTO password_resets (id, user_id, token_hash, expires_at) VALUES (?, ?, ?, datetime(\'now\', \'+1 hour\'))')
    .run(uid('reset'), user.id, hashToken(token), );
  res.json({ ok: true, resetToken: token, note: 'Local deployment: no mail server is configured, so the reset token is returned here. It expires in 1 hour.' });
});

authRouter.post('/reset-password', (req, res) => {
  const parsed = z.object({ token: z.string().min(1), newPassword: passwordSchema }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'invalid input', details: parsed.error.flatten() }); return; }
  const conn = db();
  const row = conn.prepare(`SELECT pr.*, u.email AS email FROM password_resets pr JOIN users u ON u.id = pr.user_id
    WHERE pr.token_hash = ? AND pr.used = 0 AND pr.expires_at > datetime('now')`).get(hashToken(parsed.data.token)) as { id: string; user_id: string; email: string } | undefined;
  if (!row) { res.status(400).json({ error: 'invalid or expired reset token' }); return; }
  conn.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hashPassword(parsed.data.newPassword), row.user_id);
  conn.prepare('UPDATE password_resets SET used = 1 WHERE id = ?').run(row.id);
  conn.prepare('UPDATE sessions SET revoked = 1 WHERE user_id = ?').run(row.user_id);
  audit(conn, { actorId: row.user_id, actorEmail: row.email, action: 'auth.password_reset', targetType: 'user', targetId: row.user_id, ip: getClientIp(req) });
  res.json({ ok: true });
});

authRouter.get('/sessions', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const rows = conn.prepare(`SELECT id, created_at, expires_at, remember_me, user_agent, ip, revoked
    FROM sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 50`).all(req.user!.id);
  res.json({ sessions: rows });
});

authRouter.post('/sessions/:id/revoke', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const row = conn.prepare('SELECT * FROM sessions WHERE id = ? AND user_id = ?').get(req.params.id, req.user!.id);
  if (!row) { res.status(404).json({ error: 'session not found' }); return; }
  conn.prepare('UPDATE sessions SET revoked = 1 WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

authRouter.delete('/account', requireAuth, (req: AuthedRequest, res) => {
  const conn = db();
  const userId = req.user!.id;
  audit(conn, { actorId: userId, actorEmail: req.user!.email, action: 'auth.account_delete', targetType: 'user', targetId: userId, ip: getClientIp(req) });
  conn.prepare('UPDATE users SET status = \'deleted\', email = ? WHERE id = ?').run(`deleted-${userId}@invalid.local`, userId);
  conn.prepare('UPDATE sessions SET revoked = 1 WHERE user_id = ?').run(userId);
  res.clearCookie(SESSION_COOKIE, { path: '/' });
  res.json({ ok: true });
});
