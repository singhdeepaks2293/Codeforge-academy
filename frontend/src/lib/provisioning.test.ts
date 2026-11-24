import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  provisioningStatusText,
  canInstall,
  anyInstalling,
  kindLabel,
  fetchRuntimes,
  installRuntime,
  type RuntimeInfo,
} from './provisioning';

const base = (over: Partial<RuntimeInfo> = {}): RuntimeInfo => ({
  id: 'rust',
  name: 'Rust (rustc)',
  available: false,
  installHint: 'Install Rust via rustup.',
  provisioning: { state: 'unknown', kind: 'auto', dockerBaked: true },
  ...over,
});

describe('provisioningStatusText', () => {
  it('reports ready with the detected version when available', () => {
    expect(provisioningStatusText(base({ available: true, version: 'rustc 1.100.0' }))).toEqual({
      tone: 'ok',
      text: '✓ rustc 1.100.0',
    });
  });

  it('reports installing while a background install runs', () => {
    expect(
      provisioningStatusText(base({ provisioning: { state: 'installing', kind: 'auto', dockerBaked: false } })),
    ).toEqual({ tone: 'busy', text: 'Setting up Rust (rustc)…' });
  });

  it('reports failed and install_unavailable honestly, never as ready', () => {
    expect(
      provisioningStatusText(base({ provisioning: { state: 'failed', kind: 'auto', dockerBaked: false, reason: 'apt failed' } })).tone,
    ).toBe('error');
    const un = provisioningStatusText(
      base({ provisioning: { state: 'install_unavailable', kind: 'manual', dockerBaked: false } }),
    );
    expect(un.tone).toBe('warn');
    expect(un.text).toContain("isn't installed");
  });

  it('falls back to an unavailable message when the backend has no provisioning data', () => {
    const rt = base();
    delete rt.provisioning;
    expect(provisioningStatusText(rt).tone).toBe('error');
  });
});

describe('canInstall', () => {
  it('allows retry only for auto runtimes that are missing and not already installing', () => {
    expect(canInstall(base())).toBe(true);
    expect(canInstall(base({ provisioning: { state: 'installing', kind: 'auto', dockerBaked: false } }))).toBe(false);
    expect(canInstall(base({ provisioning: { state: 'failed', kind: 'manual', dockerBaked: false } }))).toBe(false);
    expect(canInstall(base({ provisioning: { state: 'install_unavailable', kind: 'baked', dockerBaked: true } }))).toBe(false);
    expect(canInstall(base({ available: true, provisioning: { state: 'present', kind: 'auto', dockerBaked: true } }))).toBe(false);
  });
});

describe('anyInstalling / kindLabel', () => {
  it('detects an in-flight install', () => {
    expect(anyInstalling([base()])).toBe(false);
    expect(
      anyInstalling([base({ provisioning: { state: 'installing', kind: 'auto', dockerBaked: false } })]),
    ).toBe(true);
  });

  it('labels every provisioning kind', () => {
    expect(kindLabel('baked')).toContain('Docker');
    expect(kindLabel('auto')).toContain('Auto-install');
    expect(kindLabel('manual')).toContain('Manual');
    expect(kindLabel('builtin')).toContain('Built in');
  });
});

describe('fetchRuntimes / installRuntime', () => {
  const realFetch = globalThis.fetch;
  beforeEach(() => { vi.restoreAllMocks(); });
  afterEach(() => { globalThis.fetch = realFetch; });

  const mockFetch = (payload: unknown) => {
    globalThis.fetch = vi.fn(async (url: string) => {
      const isCsrf = String(url).includes('/api/auth/csrf');
      const body = isCsrf ? { csrfToken: 'test-csrf' } : payload;
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify(body),
        json: async () => body,
      };
    }) as unknown as typeof fetch;
  };

  it('fetchRuntimes hits /api/runtimes and returns the payload', async () => {
    const payload = { runtimes: [base({ available: true })], languageToRuntime: { rust: 'rust' } };
    mockFetch(payload);
    const d = await fetchRuntimes();
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/runtimes', expect.objectContaining({ method: 'GET' }));
    expect(d.runtimes).toHaveLength(1);
    expect(d.languageToRuntime.rust).toBe('rust');
  });

  it('installRuntime POSTs to the install endpoint', async () => {
    mockFetch({ runtime: base({ provisioning: { state: 'installing', kind: 'auto', dockerBaked: false } }) });
    const d = await installRuntime('rust');
    const calls = (globalThis.fetch as unknown as { mock: { calls: unknown[][] } }).mock.calls;
    const post = calls.find((c) => String(c[0]).includes('/api/provisioning/rust/install'));
    expect(post).toBeDefined();
    expect((post![1] as { method: string }).method).toBe('POST');
    expect(d.runtime.provisioning?.state).toBe('installing');
  });
});
