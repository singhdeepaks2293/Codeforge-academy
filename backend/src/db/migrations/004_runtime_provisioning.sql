-- 004_runtime_provisioning.sql — persistent provisioning state for language runtimes.
-- One row per runtime id (see backend/src/services/provisioning.ts RUNTIME_CATALOG).
-- Survives backend restarts so a finished/failed install is not re-triggered.
-- install_path records where an on-demand install put the runtime binary so
-- the backend can restore it onto PATH at startup (see restoreProvisionedPaths).
CREATE TABLE IF NOT EXISTS runtime_provisioning (
  runtime TEXT PRIMARY KEY,
  state TEXT NOT NULL DEFAULT 'unknown',
  reason TEXT NOT NULL DEFAULT '',
  guidance TEXT NOT NULL DEFAULT '',
  install_method TEXT NOT NULL DEFAULT '',
  install_path TEXT NOT NULL DEFAULT '',
  attempts INTEGER NOT NULL DEFAULT 0,
  last_attempt_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
