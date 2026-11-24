import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDbPath, openDb, seedRolesAndPermissions } from './db/db.js';
import { seedCurriculum } from './db/seed.js';
import { loadSession, csrfProtect } from './middleware/auth.js';
import { authRouter } from './routes/auth.js';
import { coursesRouter } from './routes/courses.js';
import { executeRouter } from './routes/execute.js';
import { adminRouter } from './routes/admin.js';
import { provisioningRouter, runtimesHandler } from './routes/provisioning.js';
import { restoreProvisionedPaths } from './services/provisioning.js';
import { dsaRouter, projectsRouter, assessmentsRouter, progressRouter } from './routes/learn.js';

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(loadSession);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', version: '1.0.0', time: new Date().toISOString() });
});

// Auth routes (login/register/setup are exempt from CSRF — they issue the CSRF cookie)
app.use('/api/auth', authRouter);
// /api/runtimes is the alias the executor's 503 message points at; the same
// payload also lives at /api/execute/runtimes.
app.get('/api/runtimes', runtimesHandler);
// Mutating API routes require a valid double-submit CSRF token
app.use('/api', csrfProtect);
app.use('/api/courses', coursesRouter);
app.use('/api/execute', executeRouter);
app.use('/api/provisioning', provisioningRouter);
app.use('/api/admin', adminRouter);
app.use('/api/dsa', dsaRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/assessments', assessmentsRouter);
app.use('/api/progress', progressRouter);

// Serve the built frontend in production
// Resolved from this file's location, not the working directory, so the
// built frontend is found whether started from the repo root
// (`node backend/dist/index.js`) or from backend/ (`npm start`).
const frontendDist = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'frontend', 'dist');
if (existsSync(join(frontendDist, 'index.html'))) {
  app.use(express.static(frontendDist));
  app.get('*', (_req, res) => res.sendFile(join(frontendDist, 'index.html')));
}

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'internal server error' });
});

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.BIND_LAN === '1' ? '0.0.0.0' : (process.env.HOST || '127.0.0.1');

async function main() {
  const db = openDb(getDbPath());
  seedRolesAndPermissions(db);
  // Re-add install dirs recorded by earlier provisioning runs to PATH so
  // the executor keeps finding on-demand runtimes after a restart.
  restoreProvisionedPaths(db);
  try {
    const counts = await seedCurriculum(db);
    console.log('[seed]', JSON.stringify(counts));
  } catch (e) {
    console.error('[seed] FAILED (server still starting; catalog may be partial):', e);
  }
  app.listen(PORT, HOST, () => {
    console.log(`CodeForge Academy API listening on http://${HOST}:${PORT}`);
    console.log(`Runtimes: detected at startup via /api/runtimes; missing ones reported honestly as runtime_unavailable.`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  main().catch((e) => { console.error(e); process.exit(1); });
}
export default app;
export { openDb };
