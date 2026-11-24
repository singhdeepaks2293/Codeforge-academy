// Provisioning API — runtime status + manual install/retry.
//
// Auth mirrors the existing runtime surface: GETs are public, exactly like
// GET /api/execute/runtimes (anyone can see which runtimes are ready);
// POST /install requires a signed-in user (requireAuth) and goes through
// the global CSRF check like every other mutating /api route.
import { Router, type Request, type Response } from 'express';
import { getDbPath, openDb } from '../db/db.js';
import { requireAuth, type AuthedRequest } from '../middleware/auth.js';
import {
  RUNTIME_BY_ID, buildRuntimesPayload, ensureRuntime, getProvisionStatus,
  listProvisionStatuses,
} from '../services/provisioning.js';

export const provisioningRouter = Router();
const db = () => openDb(getDbPath());

// GET /api/runtimes (alias) — same payload as GET /api/execute/runtimes.
// The executor's 503 message used to point at /api/runtimes, which did not
// exist; it now does, as an alias of the /api/execute/runtimes payload.
export async function runtimesHandler(_req: Request, res: Response): Promise<void> {
  const payload = await buildRuntimesPayload(db());
  res.json(payload);
}

provisioningRouter.get('/', async (_req, res) => {
  const statuses = await listProvisionStatuses(db());
  res.json({ runtimes: statuses });
});

provisioningRouter.get('/:runtime', async (req, res) => {
  const runtime = String(req.params.runtime);
  if (!RUNTIME_BY_ID.has(runtime)) { res.status(404).json({ error: 'unknown runtime' }); return; }
  const status = await getProvisionStatus(db(), runtime);
  res.json({ runtime: status });
});

provisioningRouter.post('/:runtime/install', requireAuth, async (req: AuthedRequest, res) => {
  const runtime = String(req.params.runtime);
  if (!RUNTIME_BY_ID.has(runtime)) { res.status(404).json({ error: 'unknown runtime' }); return; }
  const before = await getProvisionStatus(db(), runtime);
  const status = await ensureRuntime(db(), runtime);
  // 202 = a new background install was started; 200 = already present /
  // already installing / install unavailable (the state body says which).
  const started = before?.state !== 'installing' && status.state === 'installing';
  res.status(started ? 202 : 200).json({ runtime: status });
  void req;
});
