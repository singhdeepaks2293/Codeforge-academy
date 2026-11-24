import { api } from './api';

export type ProvisionState =
  | 'unknown'
  | 'present'
  | 'installing'
  | 'ready'
  | 'failed'
  | 'install_unavailable';

export type ProvisionKind = 'baked' | 'auto' | 'manual' | 'builtin';

export interface RuntimeProvisioning {
  state: ProvisionState;
  kind: ProvisionKind;
  dockerBaked: boolean;
  installMethod?: string | null;
  reason?: string | null;
  guidance?: string | null;
}

export interface RuntimeInfo {
  id: string;
  name: string;
  available: boolean;
  version?: string;
  installHint: string;
  provisioning?: RuntimeProvisioning;
}

export async function fetchRuntimes(): Promise<{
  runtimes: RuntimeInfo[];
  languageToRuntime: Record<string, string>;
}> {
  return api('/api/runtimes');
}

export async function installRuntime(
  id: string,
): Promise<{ runtime: RuntimeInfo }> {
  return api(`/api/provisioning/${encodeURIComponent(id)}/install`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
}

export type StatusTone = 'ok' | 'busy' | 'warn' | 'error' | 'muted';

/** Human-readable provisioning state for one runtime (never claims a missing runtime is ready). */
export function provisioningStatusText(rt: RuntimeInfo): { tone: StatusTone; text: string } {
  if (rt.available) return { tone: 'ok', text: `✓ ${rt.version || 'ready'}` };
  const state = rt.provisioning?.state ?? 'unknown';
  switch (state) {
    case 'installing':
      return { tone: 'busy', text: `Setting up ${rt.name}…` };
    case 'failed':
      return { tone: 'error', text: `${rt.name} setup failed` };
    case 'install_unavailable':
      return { tone: 'warn', text: `${rt.name} isn't installed here` };
    case 'ready':
    case 'present':
      return { tone: 'muted', text: `${rt.name} — checking…` };
    default:
      return { tone: 'error', text: `Runtime unavailable: ${rt.name}` };
  }
}

/** Whether a manual install/retry can be attempted for this runtime. */
export function canInstall(rt: RuntimeInfo): boolean {
  return (
    !rt.available &&
    rt.provisioning?.kind === 'auto' &&
    rt.provisioning.state !== 'installing'
  );
}

export function anyInstalling(runtimes: RuntimeInfo[]): boolean {
  return runtimes.some((r) => r.provisioning?.state === 'installing');
}

export function kindLabel(kind: ProvisionKind): string {
  switch (kind) {
    case 'baked':
      return 'Baked into Docker image';
    case 'auto':
      return 'Auto-installs on demand';
    case 'manual':
      return 'Manual install';
    case 'builtin':
      return 'Built in';
    default:
      return kind;
  }
}
