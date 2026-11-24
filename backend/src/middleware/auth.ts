import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import bcrypt from 'bcryptjs';
import type { Request, Response, NextFunction } from 'express';
import { getDbPath, openDb, userPermissions, type UserRow } from '../db/db.js';

export interface AuthedRequest extends Request {
  user?: UserRow;
  permissions?: string[];
}

export const SESSION_COOKIE = 'cf_session';
export const CSRF_COOKIE = 'cf_csrf';

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}
export function newToken(): string {
  return randomBytes(32).toString('hex');
}
export function hashPassword(pw: string): string {
  return bcrypt.hashSync(pw, 12);
}
export function verifyPassword(pw: string, hash: string): boolean {
  return bcrypt.compareSync(pw, hash);
}
export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a); const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function sessionCookieOptions(rememberMe: boolean): { maxAge: number; httpOnly: boolean; sameSite: 'lax' | 'strict'; secure: boolean; path: string } {
  const ttlHours = Number(process.env.SESSION_TTL_HOURS || 24);
  const rememberDays = Number(process.env.REMEMBER_ME_TTL_DAYS || 30);
  return {
    maxAge: (rememberMe ? rememberDays * 24 : ttlHours) * 3600 * 1000,
    httpOnly: true, sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' && process.env.TRUST_PROXY !== '1' ? false : false,
    path: '/',
  };
}

export function getClientIp(req: Request): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || '';
}

/** Load session from HttpOnly cookie; attach user + permissions. */
export function loadSession(req: AuthedRequest, _res: Response, next: NextFunction): void {
  const db = openDb(getDbPath());
  const token = req.cookies?.[SESSION_COOKIE];
  if (!token) return next();
  const row = db.prepare(
    `SELECT s.*, u.* FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = ? AND s.revoked = 0 AND s.expires_at > datetime('now')`).get(hashToken(token)) as (UserRow & { session_id?: string; expires_at: string; remember_me: number }) | undefined;
  if (!row) return next();
  // Sliding renewal: extend expiry while active
  const ttlHours = Number(process.env.SESSION_TTL_HOURS || 24);
  const rememberDays = Number(process.env.REMEMBER_ME_TTL_DAYS || 30);
  const hours = row.remember_me ? rememberDays * 24 : ttlHours;
  db.prepare('UPDATE sessions SET expires_at = datetime(\'now\', ? ) WHERE token_hash = ?').run(`+${hours} hours`, hashToken(token));
  req.user = row;
  req.permissions = userPermissions(db, row.id, row.role);
  next();
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): void {
  if (!req.user) { res.status(401).json({ error: 'authentication required' }); return; }
  if (req.user.status !== 'active') { res.status(403).json({ error: 'account is not active' }); return; }
  next();
}

export function requirePermission(perm: string) {
  return (req: AuthedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) { res.status(401).json({ error: 'authentication required' }); return; }
    if (req.user.role === 'super-admin') return next();
    if (!req.permissions?.includes(perm)) {
      res.status(403).json({ error: `forbidden: missing permission ${perm}` });
      return;
    }
    next();
  };
}

export function requireRole(...roles: string[]) {
  return (req: AuthedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) { res.status(401).json({ error: 'authentication required' }); return; }
    if (!roles.includes(req.user.role) && req.user.role !== 'super-admin') {
      res.status(403).json({ error: 'forbidden: insufficient role' });
      return;
    }
    next();
  };
}

/** Double-submit CSRF: cookie token must match X-CSRF-Token header on mutating requests. */
export function csrfProtect(req: AuthedRequest, res: Response, next: NextFunction): void {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  // No session cookie: nothing to forge against — let requireAuth answer 401.
  if (!req.cookies?.[SESSION_COOKIE]) return next();
  const cookie = req.cookies?.[CSRF_COOKIE];
  const header = req.headers['x-csrf-token'] as string | undefined;
  if (!cookie || !header || !safeEqual(cookie, header)) {
    res.status(403).json({ error: 'invalid CSRF token' });
    return;
  }
  next();
}

export function issueCsrf(res: Response): string {
  const token = newToken();
  res.cookie(CSRF_COOKIE, token, { httpOnly: false, sameSite: 'lax', path: '/' });
  return token;
}
