import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { IndexLayout, Page } from '../components/Layout';

interface Runtime {
  id: string; name: string; available: boolean; version?: string; installHint: string;
}

// CodeForge's own documentation, written from the repo's docs/ —
// docs/INSTALL.md (local path), docs/DOCKER.md (container path) and the
// learning-path structure the app itself teaches. Nothing here is copied
// from another platform's docs; where a value is live (runtime status) it
// is fetched, not hardcoded.
const SECTIONS = [
  { id: 'how-to-learn', label: 'How to learn' },
  { id: 'runtimes', label: 'Runtimes on this machine' },
  { id: 'local-setup', label: 'Local setup' },
  { id: 'docker', label: 'Docker setup' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
];

const PATH_STAGES = [
  'Foundations — choose a language and complete the beginner modules.',
  'Intermediate — complete beginner lessons, exercises and the level assessment.',
  'Advanced — complete intermediate lessons and assessment.',
  'Language Mastery — complete the advanced curriculum and pass the mastery assessment (80%+).',
  'DSA — unlocked after a mastery assessment.',
  'DSA Mastery — complete DSA modules and problem-solving assessments.',
  'Industry Projects — build projects from beginner to advanced.',
  'Capstone — build an industry-grade project of your own.',
];

export function DocsPage() {
  const [runtimes, setRuntimes] = useState<Runtime[] | null>(null);
  const [runtimeError, setRuntimeError] = useState('');

  useEffect(() => {
    api<{ runtimes: Runtime[] }>('/api/execute/runtimes')
      .then((d) => setRuntimes(d.runtimes))
      .catch((e) => setRuntimeError(e.message));
  }, []);

  return (
    <Page title="Documentation" subtitle="How CodeForge Academy works, how to run it, and how to learn with it.">
      <IndexLayout
        rail={(
          <nav aria-label="Documentation sections" className="space-y-1">
            <h2 className="text-sm font-bold">On this page</h2>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block rounded-lg px-2 py-1.5 text-sm text-muted hover:bg-elevated hover:text-ink">{s.label}</a>
            ))}
          </nav>
        )}
      >
        <div className="space-y-6">
          <section id="how-to-learn" className="card scroll-mt-24 p-5">
            <h2 className="text-lg font-bold">How to learn</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Every track follows the same loop: Learn → Understand → Practice → Debug → Master → DSA → Build Projects → Become Industry Ready.
              A lesson teaches one concept, then an exercise makes you write the code; hints go from a nudge to a full outline across five levels.
              Each track ends in a mastery assessment (80%+ to pass) — passing unlocks DSA, and DSA unlocks the industry projects.
            </p>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
              {PATH_STAGES.map((s) => <li key={s}>{s}</li>)}
            </ol>
            <p className="mt-3 text-sm text-muted">
              Your progress, XP and streak are yours on this machine — see <Link className="font-semibold text-accent-600" to="/progress">Skills tracking</Link> for the XP chart.
            </p>
          </section>

          <section id="runtimes" className="card scroll-mt-24 p-5">
            <h2 className="text-lg font-bold">Runtimes on this machine</h2>
            <p className="mt-2 text-sm text-muted">
              Code runs locally. If a runtime is missing, the platform reports it honestly and shows how to install it — it never pretends code ran.
              This table is live: it comes from the same endpoint the Settings page reads.
            </p>
            {runtimeError && <p role="alert" className="mt-3 text-sm text-danger">Could not load live runtime status: {runtimeError}</p>}
            {runtimes === null && !runtimeError && <p className="mt-3 text-sm text-muted">Loading runtimes…</p>}
            {runtimes !== null && (
              <ul className="mt-3 space-y-2">
                {runtimes.map((r) => (
                  <li key={r.id} className="rounded-lg border border-line p-3 text-sm">
                    <strong>{r.name}</strong> — {r.available ? `✓ Available (${r.version || ''})` : '✗ Not installed'}
                    {!r.available && <span className="block text-muted">{r.installHint}</span>}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section id="local-setup" className="card scroll-mt-24 p-5">
            <h2 className="text-lg font-bold">Local setup (no Docker)</h2>
            <p className="mt-2 text-sm">Requirements: Node.js 20+ (developed on Node 24), npm 10+, Python 3.10+, GCC/G++ 11+. Go, Rust, Java, Perl and Bash are optional — if missing, those languages report <code>runtime_unavailable</code> honestly and everything else still works. SQL runs in-process via Node&apos;s built-in SQLite.</p>
            <pre className="mt-3 overflow-auto rounded bg-code p-3 text-xs text-success">{`npm install
npm run dev`}</pre>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              <li>Backend: http://127.0.0.1:8080 — API, <code>/api/health</code></li>
              <li>Frontend: http://127.0.0.1:5173 — Vite dev server, proxies <code>/api</code> to the backend</li>
              <li>First visit: the setup wizard creates the initial administrator (no default credentials).</li>
              <li>The backend creates <code>./data/codeforge.db</code> (SQLite) on first start and seeds the curriculum.</li>
            </ul>
            <h3 className="mt-4 font-semibold">Environment</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
              <li><code>PORT</code> — default 8080 (backend listen port, local).</li>
              <li><code>HOST</code> — default 127.0.0.1; set <code>BIND_LAN=1</code> to listen on 0.0.0.0.</li>
              <li><code>DATABASE_PATH</code> — default <code>./data/codeforge.db</code>.</li>
              <li><code>SESSION_SECRET</code> — long random string, min 32 chars; must be set for real use.</li>
              <li><code>RUN_TIMEOUT_MS</code> — per-run execution timeout, default 10000 (max 60000).</li>
            </ul>
            <p className="mt-3 text-sm text-muted">Reset the local environment: <code>rm -rf data/</code> deletes users, progress and the setup flag; <code>npm run dev</code> brings the setup wizard back.</p>
          </section>

          <section id="docker" className="card scroll-mt-24 p-5">
            <h2 className="text-lg font-bold">Docker setup</h2>
            <p className="mt-2 text-sm">The containerised path: a Node 24 backend and an nginx frontend, with SQLite in a named volume.</p>
            <pre className="mt-3 overflow-auto rounded bg-code p-3 text-xs text-success">{`docker compose up --build -d
docker compose ps
docker compose logs -f backend`}</pre>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              <li>Frontend: http://localhost/ (nginx, host port 80).</li>
              <li>Backend: http://localhost:4000 — check http://localhost:4000/api/health.</li>
              <li>Data lives in the named volume <code>codeforge-data</code>, mounted at <code>/app/data</code> in the backend container.</li>
              <li><code>docker compose down</code> stops and keeps the volume (users + progress survive); <code>docker compose down -v</code> deletes it — all users, progress and data are gone.</li>
              <li>The Docker image ships Python, GCC/G++, Go, Java (JRE), Perl and Bash baked in, and runs as the non-root <code>node</code> user.</li>
            </ul>
          </section>

          <section id="troubleshooting" className="card scroll-mt-24 p-5">
            <h2 className="text-lg font-bold">Troubleshooting</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              <li><code>EADDRINUSE</code> on :8080 or :5173: another process owns the port — stop it or set <code>PORT</code> / use <code>vite --port</code>.</li>
              <li>Python/C lessons report <code>runtime_unavailable</code>: install the runtime and restart the backend (<code>GET /api/execute/runtimes</code> shows install hints).</li>
              <li><code>node:sqlite</code> errors: you are on Node &lt; 22.5 — upgrade Node.</li>
              <li>Frontend shows a blank page: check the backend is running (<code>curl http://127.0.0.1:8080/api/health</code>) and the browser console for errors.</li>
            </ul>
          </section>
        </div>
      </IndexLayout>
    </Page>
  );
}
