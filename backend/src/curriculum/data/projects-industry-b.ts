import type { Project } from '../types.js';

export const PROJECTS_INDUSTRY: Project[] = [
  {
    id: "proj-load-balancer-service",
    slug: "load-balancer-service",
    level: 4,
    title: "Load Balancer Service",
    description: "Build a production-style Layer 7 load balancer in Go that fronts a pool of backend HTTP servers. It distributes traffic with round-robin and least-connections algorithms, removes unhealthy backends automatically, and supports sticky sessions so a client keeps returning to the same server.",
    skills: ["Go", "HTTP reverse proxy", "Load balancing algorithms", "Health checking", "Concurrency", "Metrics", "Graceful shutdown", "Configuration"],
    language: "go",
    functionalRequirements: [
      "Proxy HTTP requests to a configurable pool of backend servers",
      "Support round-robin and least-connections selection strategies",
      "Run active health checks and remove unhealthy backends from rotation",
      "Support cookie-based sticky sessions",
      "Expose a /health endpoint for the balancer itself and a /metrics endpoint",
      "Reload backend configuration without dropping in-flight requests",
      "Log each proxied request with backend, latency and status code",
      "Drain connections gracefully on shutdown"
    ],
    nonFunctionalRequirements: [
      "Adds under 5 ms of latency at p99 on localhost",
      "Handles 1,000 concurrent connections without errors",
      "Never routes to a backend that failed its last two health checks",
      "Recovers automatically when a backend comes back healthy",
      "Configuration is validated at startup with clear errors"
    ],
    architecture: "A single Go process listens on a public port and reverse-proxies to backends using httputil.ReverseProxy. A balancer component holds the backend pool behind a mutex and picks a target per request using the configured strategy, tracking in-flight counts for least-connections. A separate goroutine runs periodic health checks over HTTP and updates each backend's live flag, while a sticky-session layer sets a cookie mapping clients to backends. Metrics are kept in atomic counters and exposed as Prometheus-style text, and configuration is loaded from YAML at startup.",
    databaseSchema: "",
    apis: [
      "GET /health — balancer liveness",
      "GET /metrics — Prometheus-style counters (requests, errors, per-backend latency)",
      "GET /admin/backends — current backend pool and health state",
      "POST /admin/backends — add or remove a backend at runtime",
      "Any other path — proxied to the selected backend"
    ],
    fileStructure: "load-balancer/\n  main.go\n  go.mod\n  config.yaml\n  internal/\n    balancer/balancer.go\n    balancer/strategy.go\n    health/checker.go\n    proxy/proxy.go\n    metrics/metrics.go\n    config/config.go\n  cmd/lb/main.go\n  testdata/backends.go\n  README.md",
    taskBreakdown: [
      "Design the config format and backend pool model",
      "Implement the reverse proxy and round-robin selection",
      "Add least-connections selection with in-flight tracking",
      "Implement active health checks and pool updates",
      "Add cookie-based sticky sessions",
      "Add metrics, admin endpoints and request logging",
      "Add graceful shutdown and config reload",
      "Load-test against three dummy backends and document results"
    ],
    milestones: [
      {
        id: "proj-load-balancer-service-m1", order: 1, title: "Proxy and round-robin",
        objectives: ["Serve as a reverse proxy", "Distribute requests round-robin", "Handle backend errors"],
        instructions: "Build a Go HTTP server that forwards requests to backends listed in config.yaml using httputil.ReverseProxy. Implement round-robin selection with a mutex-protected index so consecutive requests hit different backends. If a backend connection fails, return 502 and log the failure.",
        concepts: ["Reverse proxy", "Round-robin", "Mutexes", "httputil"],
        hints: ["Start with one hardcoded backend, then generalise to a list.", "Guard the round-robin counter with a mutex.", "Use ReverseProxy.ErrorHandler for clean 502 responses."],
        acceptanceCriteria: ["Requests reach backends in rotation", "A dead backend returns 502, not a crash", "Config lists at least three backends"],
        tests: ["Curl the balancer repeatedly and confirm rotation", "Stop one backend and curl again", "Check the log shows the failed backend"]
      },
      {
        id: "proj-load-balancer-service-m2", order: 2, title: "Least-connections and health checks",
        objectives: ["Track in-flight requests per backend", "Implement least-connections", "Remove unhealthy backends"],
        instructions: "Add an in-flight counter per backend, incremented before proxying and decremented when the response finishes, and use it for least-connections selection. Add a health checker goroutine that GETs each backend's /health path every 5 seconds and marks backends dead after two consecutive failures.",
        concepts: ["Least-connections", "Atomic counters", "Goroutines", "Health checking"],
        hints: ["Decrement the counter in a defer so errors still release it.", "Keep health state separate from selection logic.", "Log every health transition."],
        acceptanceCriteria: ["Slow backends receive fewer new requests", "A failed backend leaves rotation within 15 seconds", "A recovered backend re-enters rotation"],
        tests: ["Point one backend at a 3-second delay and observe distribution", "Kill a backend and watch it leave the pool", "Restart it and watch it return"]
      },
      {
        id: "proj-load-balancer-service-m3", order: 3, title: "Sticky sessions",
        objectives: ["Set a routing cookie", "Route returning clients consistently", "Fall back when the pinned backend is down"],
        instructions: "When sticky sessions are enabled, set a cookie naming the chosen backend on the first response and read it on later requests to pin the client. If the pinned backend is unhealthy, pick a healthy one and re-issue the cookie. Make stickiness configurable per deployment.",
        concepts: ["Cookies", "Session affinity", "Fallback routing"],
        hints: ["Hash the cookie value, never trust it blindly — validate it against the pool.", "Set HttpOnly and a sensible Max-Age.", "Test with curl -c / -b to carry cookies."],
        acceptanceCriteria: ["Same cookie always reaches the same backend", "An unknown cookie value gets a fresh backend", "A dead pinned backend triggers re-pinning"],
        tests: ["Curl twice with a cookie jar and compare backends", "Curl with a forged cookie value", "Kill the pinned backend and curl again"]
      },
      {
        id: "proj-load-balancer-service-m4", order: 4, title: "Metrics, admin and graceful shutdown",
        objectives: ["Expose metrics and admin state", "Add request logging", "Shut down gracefully"],
        instructions: "Add /metrics with per-backend request counts, error counts and latency buckets, plus /admin/backends for pool state and a POST to add or remove backends at runtime. Log every request with backend, status and latency, and handle SIGTERM by stopping new accepts and draining in-flight requests before exiting.",
        concepts: ["Prometheus metrics format", "Admin APIs", "Graceful shutdown", "Structured logging"],
        hints: ["Use sync/atomic for counters touched on the hot path.", "Drain with http.Server.Shutdown and a timeout.", "Keep admin endpoints on a separate listener or behind a token."],
        acceptanceCriteria: ["Metrics show real per-backend counts", "Admin add/remove changes routing immediately", "SIGTERM drains without dropping in-flight requests"],
        tests: ["Send 100 requests and read /metrics", "Add a backend via the admin API", "Start a slow request, send SIGTERM, confirm it completes"]
      }
    ],
    reviewChecklist: ["Both strategies distribute as expected under load", "Unhealthy backends are excluded and recover", "Sticky sessions pin and fall back correctly", "Metrics match the request log", "Shutdown never drops in-flight requests", "README documents config and strategies"],
    finalAssessment: ["Demonstrate round-robin rotation across three backends", "Demonstrate least-connections favouring a fast backend", "Kill a backend and show automatic removal and recovery", "Show sticky sessions pinning one client", "Show metrics and a graceful shutdown"]
  },
  {
    id: "proj-cache-server-service",
    slug: "cache-server-service",
    level: 3,
    title: "Cache Server Service",
    description: "Build an in-memory key-value cache server in Rust that speaks a RESP-like text protocol over TCP, similar in spirit to Redis. It supports per-key TTL expiry, LRU eviction under a memory cap, and concurrent clients, with persistence snapshots so data survives a restart.",
    skills: ["Rust", "TCP servers", "In-memory data structures", "TTL expiry", "LRU eviction", "Concurrency", "Protocol design", "Persistence"],
    language: "rust",
    functionalRequirements: [
      "Serve multiple TCP clients concurrently",
      "Support GET, SET, DEL, EXISTS, INCR and EXPIRE commands",
      "Expire keys automatically when their TTL elapses",
      "Evict least-recently-used keys when the memory cap is reached",
      "Support KEYS pattern matching and FLUSHALL",
      "Persist a snapshot to disk and reload it on startup",
      "Return RESP-like responses with clear error messages",
      "Report server stats with an INFO command"
    ],
    nonFunctionalRequirements: [
      "Handles 100 concurrent clients without data races",
      "GET latency under 1 ms on localhost for a warm cache",
      "Eviction keeps memory under the configured cap",
      "Expired keys never return stale values",
      "Snapshot reload restores keys and remaining TTLs"
    ],
    architecture: "A Tokio-based TCP server accepts connections and spawns a task per client, each parsing the line-based protocol into commands. All state lives in a single store behind an RwLock: a HashMap of keys to values with expiry timestamps, plus an LRU list ordered by last access. A background task sweeps expired keys, another enforces the memory cap by evicting from the LRU tail, and snapshots serialise the map to disk on a timer and on shutdown.",
    databaseSchema: "",
    apis: [
      "SET key value [EX seconds] — store a value with optional TTL",
      "GET key — fetch a value or nil",
      "DEL key [key ...] — delete keys, returns count",
      "EXPIRE key seconds / TTL key — manage expiry",
      "INCR key — atomic integer increment",
      "KEYS pattern — glob-style key listing",
      "INFO — key count, memory use, hit rate",
      "SAVE / BGSAVE — write a snapshot to disk"
    ],
    fileStructure: "cache-server/\n  Cargo.toml\n  src/\n    main.rs\n    server.rs\n    protocol.rs\n    store.rs\n    lru.rs\n    snapshot.rs\n  tests/\n    integration_test.rs\n  README.md",
    taskBreakdown: [
      "Design the wire protocol and command set",
      "Implement the TCP server and command parser",
      "Build the store with GET, SET, DEL and EXISTS",
      "Add TTL expiry with a background sweeper",
      "Implement LRU eviction under a memory cap",
      "Add INCR, KEYS and INFO",
      "Add snapshot persistence and reload",
      "Benchmark with concurrent clients and document results"
    ],
    milestones: [
      {
        id: "proj-cache-server-service-m1", order: 1, title: "TCP server and protocol",
        objectives: ["Accept TCP clients", "Parse commands", "Reply in RESP-like format"],
        instructions: "Create a Tokio TCP listener that spawns a task per connection and reads line-delimited commands. Parse SET, GET and DEL, reply with +OK, bulk strings or nil, and return -ERR lines for malformed input. Verify with telnet or netcat before adding storage logic.",
        concepts: ["Tokio tasks", "TCP streams", "Line protocol", "RESP format"],
        hints: ["Split each line on whitespace for the first version.", "Keep the parser pure so it is unit-testable.", "Flush after every reply."],
        acceptanceCriteria: ["Multiple clients can connect at once", "SET then GET returns the value", "Bad commands return an error, not a disconnect"],
        tests: ["SET foo bar then GET foo via netcat", "Connect two clients simultaneously", "Send a malformed command and check the error"]
      },
      {
        id: "proj-cache-server-service-m2", order: 2, title: "Store, TTL and expiry",
        objectives: ["Store keys with values", "Support per-key TTL", "Expire keys on access and in background"],
        instructions: "Implement the store as a HashMap behind an RwLock, with each entry holding a value and an optional expiry instant. SET with EX records the deadline, GET returns nil for expired keys, and a background task sweeps expired keys every second. Add EXPIRE and TTL commands.",
        concepts: ["HashMap", "RwLock", "Expiry timestamps", "Background sweeps"],
        hints: ["Check expiry on read as well as in the sweeper.", "Store expiry as an Instant, not a duration.", "TTL returns -2 for missing keys and -1 for no expiry."],
        acceptanceCriteria: ["A key with EX 1 disappears after a second", "TTL reports remaining seconds", "Expired keys free their memory"],
        tests: ["SET with EX 1, GET immediately, then after 2 seconds", "EXPIRE a key and check TTL", "Set 1,000 expiring keys and watch the sweep"]
      },
      {
        id: "proj-cache-server-service-m3", order: 3, title: "LRU eviction",
        objectives: ["Track recency of access", "Evict least-recently-used keys", "Respect the memory cap"],
        instructions: "Maintain an LRU ordering updated on every GET and SET, and estimate each entry's memory use from key plus value length. When a SET would exceed the configured cap, evict from the least-recently-used end until the store fits. Expose eviction counts in INFO.",
        concepts: ["LRU cache", "Doubly-linked list", "Memory accounting"],
        hints: ["A HashMap plus a linked list is the classic LRU shape.", "Update recency on GET too, not just SET.", "Evict before inserting, never after exceeding the cap by a lot."],
        acceptanceCriteria: ["Recently used keys survive a full cache", "Memory stays under the cap after heavy writes", "INFO reports evictions"],
        tests: ["Fill the cache past the cap and check the oldest key is gone", "Touch an old key, fill again, confirm it survives", "Read INFO after evictions"]
      },
      {
        id: "proj-cache-server-service-m4", order: 4, title: "Extra commands and persistence",
        objectives: ["Add INCR, KEYS and INFO", "Snapshot to disk", "Reload on startup"],
        instructions: "Add INCR with atomic integer parsing, KEYS with glob matching, and INFO with key count, memory estimate, hits and misses. Implement SAVE to serialise keys and remaining TTLs to a snapshot file, and load it at startup so a restart restores data. Add FLUSHALL for tests.",
        concepts: ["Atomic increments", "Glob matching", "Serialisation", "Snapshot recovery"],
        hints: ["Store remaining TTL, not the original, in the snapshot.", "Write the snapshot to a temp file then rename it.", "INCR on a non-integer is an error."],
        acceptanceCriteria: ["INCR works and rejects non-integers", "KEYS user:* lists matching keys", "Restart restores keys with correct remaining TTL"],
        tests: ["INCR a counter five times", "KEYS with a pattern", "SET keys, SAVE, restart, GET them back"]
      }
    ],
    reviewChecklist: ["All commands behave per the protocol spec", "Expired keys never return stale data", "Eviction respects the cap and recency", "Concurrent clients show no races (run with --release and a load test)", "Snapshot round-trips TTLs correctly", "README documents the protocol with examples"],
    finalAssessment: ["Demonstrate SET/GET/DEL over TCP with two clients", "Show a key expiring on schedule", "Fill the cache and show LRU eviction", "Restart the server and show restored data", "Show INFO stats and a concurrent load test"]
  },
  {
    id: "proj-file-sync-tool",
    slug: "file-sync-tool",
    level: 3,
    title: "File Sync Tool",
    description: "Build a command-line file synchronisation tool in Go that watches directories for changes and keeps two folders in sync. It detects creates, modifies and deletes, transfers only changed chunks, resolves conflicts with a clear policy, and respects ignore rules like a .gitignore file.",
    skills: ["Go", "File watching", "Hashing", "Delta sync", "Conflict resolution", "CLI design", "Concurrency", "Ignore patterns"],
    language: "go",
    functionalRequirements: [
      "Watch a source directory recursively and detect file changes",
      "Sync creates, modifications and deletions to a target directory",
      "Transfer only changed blocks using content hashing",
      "Detect conflicts when both sides changed and resolve per policy",
      "Support ignore rules from a .syncignore file",
      "Run a one-shot sync and a continuous watch mode",
      "Keep a sync log and support a dry-run preview",
      "Preserve file modification times where possible"
    ],
    nonFunctionalRequirements: [
      "Detects a change within 1 second of it happening",
      "A 100 MB file with a 1 KB change transfers only the changed blocks",
      "Never deletes a file on both sides during a conflict",
      "Dry-run changes nothing on disk",
      "Handles 10,000 files in a tree without excessive memory"
    ],
    architecture: "The tool scans each tree into a manifest of paths, sizes, modification times and SHA-256 hashes, then diffs the manifests to produce a plan of copies, updates and deletes. A watcher based on fsnotify feeds change events into the same diff pipeline for continuous mode. Files are transferred in fixed-size blocks, comparing block hashes so only changed blocks are written. Conflicts are detected when both sides changed since the last sync and are resolved by keeping both copies with a suffix or by timestamp, according to the configured policy.",
    databaseSchema: "",
    apis: [
      "sync <source> <target> — one-shot synchronisation",
      "sync --watch <source> <target> — continuous mode",
      "sync --dry-run — preview the plan without applying it",
      "sync --conflict keep-both|newer|source — conflict policy",
      "status — show pending differences and last sync state"
    ],
    fileStructure: "file-sync/\n  main.go\n  go.mod\n  internal/\n    scan/scanner.go\n    diff/diff.go\n    transfer/transfer.go\n    watch/watcher.go\n    ignore/ignore.go\n    conflict/conflict.go\n    state/state.go\n  .syncignore\n  README.md",
    taskBreakdown: [
      "Implement tree scanning into a manifest with hashes",
      "Implement manifest diffing into a sync plan",
      "Implement block-based file transfer",
      "Add one-shot sync with dry-run",
      "Add fsnotify watch mode",
      "Add ignore rules and conflict handling",
      "Persist sync state between runs",
      "Test with large files, deletions and conflicts"
    ],
    milestones: [
      {
        id: "proj-file-sync-tool-m1", order: 1, title: "Scanning and manifests",
        objectives: ["Walk a directory tree", "Hash every file", "Produce a manifest"],
        instructions: "Write a scanner that walks a directory recursively, recording each file's relative path, size, modification time and SHA-256 hash in a manifest. Skip directories themselves and handle unreadable files with a warning. Compare two manifests by hand to confirm the format is complete.",
        concepts: ["filepath.WalkDir", "SHA-256", "Manifests"],
        hints: ["Hash in streaming chunks, never load whole files.", "Use relative paths so manifests are portable.", "Sort entries for stable output."],
        acceptanceCriteria: ["Manifest lists every file with a hash", "Two identical trees produce identical manifests", "A changed file changes only its own hash"],
        tests: ["Scan a sample tree and inspect the manifest", "Modify one file and rescan", "Scan a tree with an unreadable file"]
      },
      {
        id: "proj-file-sync-tool-m2", order: 2, title: "Diff and one-shot sync",
        objectives: ["Diff two manifests", "Copy new and changed files", "Delete removed files"],
        instructions: "Diff the source and target manifests into a plan: files only in the source are copies, files with different hashes are updates, and files only in the target are deletes. Implement one-shot sync that applies the plan, creating parent directories as needed, and add a --dry-run flag that prints the plan without touching disk.",
        concepts: ["Set difference", "Sync plans", "Dry-run pattern"],
        hints: ["Build the plan as data first, then execute it.", "Delete only files the manifest knows about.", "Print one line per action in dry-run."],
        acceptanceCriteria: ["A fresh target becomes identical to the source", "Dry-run changes nothing", "Deleting a source file deletes it from the target"],
        tests: ["Sync a fresh tree and diff the results", "Dry-run and confirm no changes", "Delete a file and re-sync"]
      },
      {
        id: "proj-file-sync-tool-m3", order: 3, title: "Block transfer and watch mode",
        objectives: ["Transfer only changed blocks", "Watch for live changes", "Debounce rapid events"],
        instructions: "Split files into 64 KiB blocks, hash each block, and during transfer write only blocks whose hashes differ from the target. Add watch mode using fsnotify: on a change event, wait 200 ms for the write to settle, rescan the affected path, and sync just that file.",
        concepts: ["Block hashing", "fsnotify", "Debouncing"],
        hints: ["Compare block hashes before writing anything.", "Debounce, or an editor save fires many events.", "Handle rename as delete plus create."],
        acceptanceCriteria: ["A 1 KB edit in a large file transfers only changed blocks", "Editing a file in watch mode syncs within a second", "Rapid saves produce one sync, not many"],
        tests: ["Edit 1 KB of a 50 MB file and measure transferred bytes", "Edit a file under watch and check the target", "Save rapidly ten times and count syncs"]
      },
      {
        id: "proj-file-sync-tool-m4", order: 4, title: "Ignore rules, conflicts and state",
        objectives: ["Respect .syncignore patterns", "Detect and resolve conflicts", "Persist sync state"],
        instructions: "Load ignore patterns from .syncignore in gitignore style and skip matching paths in scans. Record the last-synced manifest on disk; on the next run, a file changed on both sides since then is a conflict — resolve it by keeping both copies with a .conflict suffix, or by newest timestamp, per the --conflict flag. Log every sync run.",
        concepts: ["Gitignore patterns", "Conflict detection", "Sync state"],
        hints: ["A conflict needs three manifests: last sync, source now, target now.", "Never silently overwrite the losing side.", "Log conflicts prominently."],
        acceptanceCriteria: ["Ignored files never sync", "A both-sides edit creates a conflict copy", "State survives between runs"],
        tests: ["Add a pattern to .syncignore and sync", "Edit the same file on both sides and sync", "Run sync twice with no changes and confirm no work"]
      }
    ],
    reviewChecklist: ["One-shot and watch mode both converge trees", "Block transfer saves bandwidth on large files", "Conflicts never lose data", "Ignore rules are honoured", "Dry-run is side-effect free", "README documents policies and flags"],
    finalAssessment: ["Sync two trees and prove them identical", "Show a large-file edit transferring only changed blocks", "Demonstrate watch mode syncing a live edit", "Create a conflict and show the resolution", "Show dry-run and the sync log"]
  },
  {
    id: "proj-monitoring-alerting",
    slug: "monitoring-alerting",
    level: 3,
    title: "Monitoring & Alerting System",
    description: "Build a monitoring and alerting system in Python that collects metrics from HTTP endpoints and local system stats, stores them as time series, evaluates threshold rules, and sends notifications when alerts fire. It includes a small dashboard so operators can see service health at a glance.",
    skills: ["Python", "Time-series data", "HTTP polling", "Threshold rules", "Alerting", "Notifications", "Dashboards", "SQLite"],
    language: "python",
    functionalRequirements: [
      "Poll configured HTTP endpoints for metrics on a schedule",
      "Collect local CPU, memory and disk usage",
      "Store metric samples in SQLite with timestamps",
      "Evaluate alert rules (threshold, duration, severity)",
      "Send notifications by email and webhook when alerts fire and resolve",
      "Suppress duplicate alerts while one is already firing",
      "Provide a web dashboard with per-service status and charts",
      "Support silencing an alert for a fixed period"
    ],
    nonFunctionalRequirements: [
      "Polling continues even if one target is down",
      "Alert latency under 30 seconds from threshold breach",
      "Dashboard loads in under 1 second for 24 hours of data",
      "No alert is sent twice for the same incident",
      "Data retention prunes samples older than 30 days"
    ],
    architecture: "A scheduler thread polls each target on its configured interval and writes samples to SQLite, while a collector reads local system stats with psutil. An evaluator runs every 10 seconds, comparing recent samples against alert rules that require a threshold breach sustained for a duration, and an alerter deduplicates by rule and target before sending email via SMTP or a webhook POST. A small Flask dashboard reads the same database to render status pages and simple time-series charts, and silences are stored as rows that the evaluator checks before firing.",
    databaseSchema: "targets(id INTEGER PK, name TEXT, url TEXT, interval_seconds INTEGER); samples(id INTEGER PK, target_id INTEGER, metric TEXT, value REAL, ts TEXT); rules(id INTEGER PK, target_id INTEGER, metric TEXT, threshold REAL, operator TEXT, duration_seconds INTEGER, severity TEXT); alerts(id INTEGER PK, rule_id INTEGER, status TEXT, started_at TEXT, resolved_at TEXT); silences(id INTEGER PK, rule_id INTEGER, until TEXT)",
    apis: [
      "GET / — dashboard with service status",
      "GET /api/targets — list targets and latest values",
      "GET /api/metrics?target=&metric=&hours= — time-series samples",
      "GET /api/alerts — current and historical alerts",
      "POST /api/silence — silence a rule until a given time",
      "POST /api/targets — add a monitoring target"
    ],
    fileStructure: "monitoring/\n  main.py\n  requirements.txt\n  monitor/\n    __init__.py\n    config.py\n    collector.py\n    store.py\n    evaluator.py\n    notifier.py\n    dashboard.py\n  config.yaml\n  tests/\n    test_evaluator.py\n    test_store.py\n  README.md",
    taskBreakdown: [
      "Design the config, schema and polling loop",
      "Implement metric collection and storage",
      "Implement the rule evaluator with durations",
      "Add email and webhook notifications with dedup",
      "Build the dashboard",
      "Add silences and alert history",
      "Add retention pruning",
      "Test with flapping and failing targets"
    ],
    milestones: [
      {
        id: "proj-monitoring-alerting-m1", order: 1, title: "Collection and storage",
        objectives: ["Poll HTTP targets", "Collect system stats", "Store timestamped samples"],
        instructions: "Write a collector that GETs each target's /metrics or health endpoint on its interval and records the response time and status, plus local CPU and memory via psutil. Store every sample in SQLite with target, metric, value and timestamp, and verify the rows accumulate over a minute of polling.",
        concepts: ["Polling", "SQLite", "System metrics", "Timestamps"],
        hints: ["Use a thread per target or a single loop with timeouts.", "Set a short HTTP timeout so a dead target cannot stall polling.", "Index samples by target and timestamp."],
        acceptanceCriteria: ["Samples appear for every target each interval", "A down target records failures, not silence", "System metrics are collected"],
        tests: ["Poll a dummy endpoint for 60 seconds and count rows", "Point at a dead URL and check failure samples", "Query samples for the last hour"]
      },
      {
        id: "proj-monitoring-alerting-m2", order: 2, title: "Alert rules and evaluation",
        objectives: ["Define threshold rules", "Require sustained breaches", "Track alert lifecycle"],
        instructions: "Implement rules with a metric, operator, threshold, sustained duration and severity, stored in the database. The evaluator runs every 10 seconds and fires an alert only when the breach has lasted the full duration, records the alert as firing, and marks it resolved when the metric recovers. Add rules for high latency and error rate.",
        concepts: ["Thresholds", "Sustained conditions", "Alert state machine"],
        hints: ["Evaluate over a window of recent samples, not one point.", "Keep firing, resolved and silenced as distinct states.", "Log every evaluation decision at debug level."],
        acceptanceCriteria: ["A brief spike does not fire", "A sustained breach fires once", "Recovery marks the alert resolved"],
        tests: ["Inject a 5-second spike with a 30-second rule", "Inject a sustained breach and check the alert row", "Recover and check resolution"]
      },
      {
        id: "proj-monitoring-alerting-m3", order: 3, title: "Notifications and dedup",
        objectives: ["Send email and webhook alerts", "Deduplicate per incident", "Notify on resolution"],
        instructions: "Add a notifier that sends an email via SMTP and a JSON webhook POST when an alert fires, and a second message when it resolves. Deduplicate by rule and target so a firing alert sends exactly one notification until it resolves, and make delivery failures retry with backoff without blocking evaluation.",
        concepts: ["SMTP", "Webhooks", "Deduplication", "Retry with backoff"],
        hints: ["Record a notified flag on the alert row.", "Send notifications from a queue, not the evaluator thread.", "Include the metric value and threshold in the message."],
        acceptanceCriteria: ["Firing sends one email and one webhook", "No repeat while still firing", "Resolution sends a recovery message"],
        tests: ["Fire an alert and check the webhook receiver", "Keep it firing and count notifications", "Resolve it and check the recovery message"]
      },
      {
        id: "proj-monitoring-alerting-m4", order: 4, title: "Dashboard, silences and retention",
        objectives: ["Render a status dashboard", "Support silencing", "Prune old data"],
        instructions: "Build a Flask dashboard showing each target's current status, latest values and a 24-hour chart, plus a list of active and past alerts. Add silencing: a rule silenced until a given time never fires or notifies during that window. Add a nightly job that deletes samples older than 30 days.",
        concepts: ["Flask", "Time-series charts", "Silencing", "Retention"],
        hints: ["Downsample chart data to one point per minute.", "Check silences in the evaluator, not the notifier.", "Prune in batches to avoid long locks."],
        acceptanceCriteria: ["Dashboard shows live status and charts", "A silenced rule does not notify", "Old samples are pruned"],
        tests: ["Load the dashboard with 24 hours of data", "Silence a firing rule and confirm no notification", "Insert old samples and run pruning"]
      }
    ],
    reviewChecklist: ["Polling survives dead targets", "Brief spikes do not page anyone", "Each incident notifies exactly once plus recovery", "Dashboard reflects the database accurately", "Silences and pruning work", "README documents rules and setup"],
    finalAssessment: ["Show live collection from three targets", "Trigger a sustained breach and show the notification", "Show a brief spike producing no alert", "Silence a rule and show it suppressed", "Show the dashboard and alert history"]
  },
  {
    id: "proj-fraud-detection",
    slug: "fraud-detection",
    level: 3,
    title: "Fraud Detection Pipeline",
    description: "Build a fraud detection pipeline in Python that scores card transactions in real time. It extracts behavioural features such as velocity and amount deviation, applies a transparent rule engine plus a scoring model, and routes suspicious transactions to a case-review queue for analysts.",
    skills: ["Python", "Feature engineering", "Rule engines", "Scoring models", "Stream processing", "SQLite", "Case management", "Evaluation metrics"],
    language: "python",
    functionalRequirements: [
      "Ingest transactions from a JSON feed or CSV file",
      "Extract features: velocity, amount deviation, geo distance, device change",
      "Score each transaction with rules and a weighted model",
      "Block, review or allow each transaction by score thresholds",
      "Store decisions with reasons in an audit log",
      "Provide a case-review queue with approve and reject actions",
      "Expose precision, recall and false-positive rate on labelled data",
      "Support adding rules without code changes via a rules file"
    ],
    nonFunctionalRequirements: [
      "Scores a transaction in under 50 ms",
      "Every decision is explainable with its contributing rules",
      "No transaction is scored twice or lost",
      "Rules file reloads without restarting the pipeline",
      "Handles 10,000 transactions in a batch run"
    ],
    architecture: "Transactions enter through an ingester that validates and normalises them, then a feature extractor computes velocity counts over rolling windows, z-scores against the cardholder's history, and geo velocity from successive locations. A rule engine evaluates ordered YAML rules and a weighted scorer combines feature contributions into a 0-100 score; thresholds map the score to allow, review or block. Decisions and features are written to SQLite for audit, and a small web UI lists review cases for analysts to approve or reject, feeding labels back into evaluation metrics.",
    databaseSchema: "transactions(id TEXT PK, card_id TEXT, amount REAL, merchant TEXT, country TEXT, ts TEXT, score REAL, decision TEXT); features(transaction_id TEXT, velocity_1h INTEGER, amount_z REAL, geo_km REAL, device_changed INTEGER); cases(id INTEGER PK, transaction_id TEXT, status TEXT, reviewer TEXT, note TEXT, decided_at TEXT); rules are stored in rules.yaml, not the DB",
    apis: [
      "POST /api/score — score one transaction, returns score, decision and reasons",
      "POST /api/transactions/batch — score a CSV/JSON batch",
      "GET /api/cases — review queue, filterable by status",
      "POST /api/cases/:id/decide — approve or reject with a note",
      "GET /api/metrics — precision, recall, false-positive rate on labelled data",
      "GET /api/rules — current rule set"
    ],
    fileStructure: "fraud-detection/\n  main.py\n  requirements.txt\n  fraud/\n    __init__.py\n    ingest.py\n    features.py\n    rules.py\n    scorer.py\n    store.py\n    review.py\n  rules.yaml\n  data/sample_transactions.csv\n  tests/\n    test_features.py\n    test_rules.py\n    test_scorer.py\n  README.md",
    taskBreakdown: [
      "Design the transaction model and feature set",
      "Implement ingestion and validation",
      "Implement feature extraction with rolling windows",
      "Build the YAML rule engine",
      "Implement the weighted scorer and thresholds",
      "Add the audit store and case-review UI",
      "Add evaluation metrics on labelled data",
      "Tune thresholds and document the trade-offs"
    ],
    milestones: [
      {
        id: "proj-fraud-detection-m1", order: 1, title: "Ingestion and features",
        objectives: ["Ingest transactions", "Compute velocity features", "Compute amount deviation"],
        instructions: "Build an ingester that reads transactions from JSON or CSV, validates required fields, and normalises amounts and timestamps. Implement feature extraction: count transactions per card in the last hour and day, compute the z-score of the amount against the card's history, and flag device or country changes. Store features alongside each transaction.",
        concepts: ["Feature engineering", "Rolling windows", "Z-scores", "Data validation"],
        hints: ["Keep a per-card history in memory for the batch, backed by SQLite.", "Velocity needs timestamps, so parse them strictly.", "Write unit tests with hand-computed z-scores."],
        acceptanceCriteria: ["Velocity counts match hand counts", "Amount z-score is correct for a known history", "Invalid rows are rejected with a reason"],
        tests: ["Score a card with 5 transactions in an hour", "Check the z-score of an outlier amount", "Feed a malformed row and check the error"]
      },
      {
        id: "proj-fraud-detection-m2", order: 2, title: "Rule engine and scorer",
        objectives: ["Load rules from YAML", "Evaluate rules in order", "Combine into a score"],
        instructions: "Implement a rule engine that loads rules from rules.yaml — each with a condition, points and a reason — and evaluates them in order, short-circuiting on a block rule. Combine rule points and weighted feature contributions into a 0-100 score, then map it to allow, review or block using configurable thresholds. Every decision must list the rules that fired.",
        concepts: ["Rule engines", "Weighted scoring", "Thresholds", "Explainability"],
        hints: ["Keep rules data-driven so analysts can edit them.", "Cap the score at 100.", "Return reasons in the API response, not just the score."],
        acceptanceCriteria: ["A rule edit changes scoring without a restart", "High-velocity transactions score above the review threshold", "Every decision lists its reasons"],
        tests: ["Score a transaction that trips two rules", "Edit rules.yaml and rescore", "Score a normal transaction and confirm allow"]
      },
      {
        id: "proj-fraud-detection-m3", order: 3, title: "Case review queue",
        objectives: ["Queue review decisions", "Let analysts decide cases", "Audit every action"],
        instructions: "Persist every review decision as a case with the transaction, score and reasons, and build a small web UI listing open cases sorted by score. Analysts can approve or reject with a note; the decision, reviewer and timestamp are recorded, and the transaction's final status updates. Rejected cases are recorded as confirmed fraud labels.",
        concepts: ["Case management", "Audit trails", "Web UI"],
        hints: ["Never delete a case — status changes only.", "Sort the queue highest score first.", "Require a note on reject."],
        acceptanceCriteria: ["Review transactions appear in the queue", "A decision is recorded with reviewer and note", "Decided cases leave the open queue"],
        tests: ["Score a suspicious batch and open the queue", "Approve one case and reject another", "Check the audit log for both decisions"]
      },
      {
        id: "proj-fraud-detection-m4", order: 4, title: "Evaluation and tuning",
        objectives: ["Measure precision and recall", "Tune thresholds", "Document trade-offs"],
        instructions: "Using the labelled sample data, compute precision, recall and false-positive rate at several thresholds and plot the trade-off. Choose thresholds that keep false positives under 2% while catching at least 80% of labelled fraud, document the chosen values and their cost, and add a regression test that fails if a threshold change drops recall below the target.",
        concepts: ["Precision and recall", "Confusion matrix", "Threshold tuning"],
        hints: ["Evaluate on held-out labels, not the data you tuned on.", "False positives cost analyst time — quantify them.", "Record the evaluation in the README."],
        acceptanceCriteria: ["Metrics are computed correctly on labelled data", "Chosen thresholds meet the stated targets", "A regression test guards recall"],
        tests: ["Run evaluation on the sample set", "Move a threshold and watch metrics change", "Run the regression test suite"]
      }
    ],
    reviewChecklist: ["Features match hand-computed values", "Every decision is explainable", "Rules reload without a restart", "Case decisions are fully audited", "Evaluation metrics are honest and reproducible", "README explains thresholds and trade-offs"],
    finalAssessment: ["Score a mixed batch and explain three decisions", "Show a rule edit changing a score live", "Walk through the case-review queue", "Present precision, recall and false-positive rate", "Show the audit log for a decided case"]
  },
  {
    id: "proj-sentiment-analysis",
    slug: "sentiment-analysis",
    level: 3,
    title: "Sentiment Analysis Service",
    description: "Build a sentiment analysis service in Python using only the standard library, so every part of the pipeline is visible and understandable. It trains a Naive Bayes classifier on labelled text, serves predictions over an HTTP API, processes batches from files, and reports accuracy on a held-out test set.",
    skills: ["Python", "Text classification", "Naive Bayes", "Tokenization", "HTTP APIs", "Batch processing", "Evaluation", "Stdlib only"],
    language: "python",
    functionalRequirements: [
      "Train a Naive Bayes classifier on a labelled CSV dataset",
      "Classify single texts via an HTTP API with confidence scores",
      "Process a batch file of texts and write predictions to CSV",
      "Report accuracy, precision, recall and F1 on a test set",
      "Support positive, negative and neutral labels",
      "Handle unseen words with smoothing",
      "Persist the trained model to disk and reload it",
      "Expose a word-level explanation of each prediction"
    ],
    nonFunctionalRequirements: [
      "Uses only the Python standard library",
      "Classifies a single text in under 10 ms after loading",
      "Accuracy above 75% on the provided test set",
      "Batch of 10,000 texts completes in under 30 seconds",
      "Model file loads without retraining"
    ],
    architecture: "Text is lowercased, tokenised on non-letters, and stripped of a small stopword list before training. The trainer counts word occurrences per class with Laplace smoothing and stores log-priors and log-likelihoods in a JSON model file. The predictor sums log probabilities per class and converts them to a confidence via softmax, and a contribution list shows which words pushed the decision. A stdlib http.server wrapper exposes the classifier, and a batch runner streams a CSV through the same predict function.",
    databaseSchema: "",
    apis: [
      "POST /classify {text} — returns label, confidence and top contributing words",
      "POST /classify/batch — classify a list of texts",
      "GET /model/info — classes, vocabulary size, training accuracy",
      "POST /train — retrain from the dataset file",
      "CLI: sentiment train | serve | batch input.csv output.csv | evaluate"
    ],
    fileStructure: "sentiment/\n  main.py\n  sentiment/\n    __init__.py\n    tokenizer.py\n    classifier.py\n    trainer.py\n    evaluate.py\n    server.py\n  data/train.csv\n  data/test.csv\n  model.json\n  tests/\n    test_tokenizer.py\n    test_classifier.py\n  README.md",
    taskBreakdown: [
      "Prepare and inspect the labelled dataset",
      "Implement tokenization and vocabulary building",
      "Implement Naive Bayes training with smoothing",
      "Implement prediction with confidence and explanations",
      "Add evaluation metrics",
      "Build the HTTP API",
      "Add batch processing and model persistence",
      "Tune smoothing and document accuracy"
    ],
    milestones: [
      {
        id: "proj-sentiment-analysis-m1", order: 1, title: "Tokenizer and dataset",
        objectives: ["Load labelled data", "Tokenize text", "Build a vocabulary"],
        instructions: "Load train.csv with text and label columns, split it into train and test sets, and write a tokenizer that lowercases, splits on non-letters and removes stopwords. Build the vocabulary from training words only and report its size and the class balance of the data.",
        concepts: ["Tokenization", "Stopwords", "Train-test split", "Class balance"],
        hints: ["Never build the vocabulary from test data.", "Keep tokenization identical in training and prediction.", "Inspect a few tokenized examples by eye."],
        acceptanceCriteria: ["Tokenizer output is sensible on sample text", "Vocabulary comes from training data only", "Class balance is reported"],
        tests: ["Tokenize 'I LOVE this!!!' and check output", "Count vocabulary size", "Check the test split has no training rows"]
      },
      {
        id: "proj-sentiment-analysis-m2", order: 2, title: "Naive Bayes training",
        objectives: ["Count words per class", "Apply Laplace smoothing", "Store log probabilities"],
        instructions: "Count word occurrences per class, add Laplace smoothing so unseen words get a small probability, and store log-priors and log-likelihoods in a JSON model file. Verify the probabilities sum sensibly and that the model file reloads to identical predictions.",
        concepts: ["Naive Bayes", "Laplace smoothing", "Log probabilities", "Model persistence"],
        hints: ["Work in log space to avoid underflow.", "Smoothing alpha of 1 is a good default.", "Test reload equality explicitly."],
        acceptanceCriteria: ["Model trains without errors", "Reloaded model gives identical predictions", "Unseen words do not crash prediction"],
        tests: ["Train and inspect model.json", "Predict before and after reload", "Predict a sentence of entirely unseen words"]
      },
      {
        id: "proj-sentiment-analysis-m3", order: 3, title: "Prediction and explanation",
        objectives: ["Predict with confidence", "Explain word contributions", "Handle neutral texts"],
        instructions: "Implement prediction by summing log probabilities per class and converting to confidence with softmax. Return the top contributing words with their log-likelihood differences so a user can see why a text was labelled positive or negative. Neutral should win when positive and negative evidence are close.",
        concepts: ["Softmax", "Feature contributions", "Confidence calibration"],
        hints: ["Contributions are per-word log-likelihood differences.", "Sort contributions by absolute value.", "Test with clearly positive and clearly negative sentences."],
        acceptanceCriteria: ["Positive and negative examples classify correctly", "Confidence is higher for clearer text", "Explanations list the deciding words"],
        tests: ["Classify 'I love this product' and 'This is terrible'", "Classify a mixed sentence and check confidence", "Check explanations name the key words"]
      },
      {
        id: "proj-sentiment-analysis-m4", order: 4, title: "API, batch and evaluation",
        objectives: ["Serve predictions over HTTP", "Batch-process files", "Report accuracy and F1"],
        instructions: "Wrap the classifier in a stdlib HTTP server with /classify and /model/info endpoints, add a batch command that streams an input CSV and writes predictions, and implement evaluation that reports accuracy, per-class precision, recall and F1 on the test set. Tune the smoothing parameter and record the best result.",
        concepts: ["http.server", "Batch processing", "Precision, recall, F1"],
        hints: ["Load the model once at server startup.", "Stream batch rows, never load the whole file.", "Report per-class metrics, not just accuracy."],
        acceptanceCriteria: ["API returns predictions with confidence", "Batch of 10,000 rows finishes in time", "Test accuracy exceeds 75%"],
        tests: ["Curl /classify with a sample text", "Batch-process the test file", "Run evaluation and read the metrics"]
      }
    ],
    reviewChecklist: ["Stdlib only — no ML libraries", "Train/test separation is clean", "Predictions are explainable", "Accuracy target is met and reproducible", "API and batch paths share one predict function", "README explains the math and the tuning"],
    finalAssessment: ["Classify five varied texts live and explain two", "Show the API handling a request", "Run batch processing on a file", "Present accuracy, precision, recall and F1", "Show the model reloading from disk"]
  },
  {
    id: "proj-document-management",
    slug: "document-management",
    level: 3,
    title: "Document Management System",
    description: "Build a document management system in TypeScript where users upload files, track every version, search full text, and share documents with fine-grained access control. It is the kind of internal tool a company uses to stop important files living only in someone's inbox.",
    skills: ["TypeScript", "File uploads", "Versioning", "Full-text search", "Access control", "Express", "SQLite", "REST APIs"],
    language: "typescript",
    functionalRequirements: [
      "Upload documents with metadata (title, tags, owner)",
      "Store a new version on every re-upload, keeping history",
      "Full-text search across titles, tags and extracted text",
      "Share documents with specific users as viewer or editor",
      "Enforce access control on every read, write and share",
      "Download any previous version",
      "Show an activity log of uploads, edits and shares",
      "Delete documents with a soft-delete and restore option"
    ],
    nonFunctionalRequirements: [
      "Uploads up to 50 MB are accepted",
      "Search returns in under 500 ms for 10,000 documents",
      "A user never sees a document they have no access to",
      "Version history is never lost by an upload",
      "All file content is stored outside the web root"
    ],
    architecture: "An Express API in TypeScript handles uploads with multer, storing files on disk under content-addressed names while metadata lives in SQLite. A text extractor pulls searchable text from plain text, Markdown and PDF-lite sources into an FTS5 virtual table, so search is a single indexed query. Versions are rows linked to a document, each pointing at its stored file, and sharing is a permission table checked by middleware on every route. The frontend is a small React-free server-rendered UI plus a JSON API, keeping the project focused on the backend.",
    databaseSchema: "users(id INTEGER PK, email TEXT UNIQUE, name TEXT); documents(id INTEGER PK, title TEXT, owner_id INTEGER, created_at TEXT, deleted_at TEXT); versions(id INTEGER PK, document_id INTEGER, version_number INTEGER, file_path TEXT, size INTEGER, checksum TEXT, created_at TEXT); permissions(document_id INTEGER, user_id INTEGER, role TEXT); tags(document_id INTEGER, tag TEXT); activity(id INTEGER PK, document_id INTEGER, user_id INTEGER, action TEXT, ts TEXT)",
    apis: [
      "POST /api/documents — upload a document (multipart)",
      "GET /api/documents — list accessible documents with search ?q=",
      "GET /api/documents/:id — metadata and version list",
      "POST /api/documents/:id/versions — upload a new version",
      "GET /api/documents/:id/versions/:v/download — download a version",
      "POST /api/documents/:id/share — grant viewer/editor to a user",
      "GET /api/documents/:id/activity — activity log"
    ],
    fileStructure: "document-management/\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    db.ts\n    auth.ts\n    permissions.ts\n    documents.ts\n    versions.ts\n    search.ts\n    storage.ts\n    extract.ts\n  uploads/\n  tests/\n    documents.test.ts\n    permissions.test.ts\n  README.md",
    taskBreakdown: [
      "Design the schema and storage layout",
      "Implement auth and the upload endpoint",
      "Implement versioning",
      "Build full-text search with FTS5",
      "Implement sharing and permission middleware",
      "Add activity logging and soft-delete",
      "Add download of any version",
      "Test access control thoroughly"
    ],
    milestones: [
      {
        id: "proj-document-management-m1", order: 1, title: "Uploads and metadata",
        objectives: ["Accept file uploads", "Store metadata", "List documents"],
        instructions: "Set up the Express server with SQLite and an upload endpoint that accepts multipart files up to 50 MB, stores them under a content-addressed filename, and records title, owner, size and checksum. Add a list endpoint returning the caller's documents with pagination.",
        concepts: ["Multipart uploads", "Content-addressed storage", "Pagination"],
        hints: ["Hash the file to name it — identical content stores once.", "Validate file size before writing.", "Never trust the client-supplied filename as a path."],
        acceptanceCriteria: ["Upload returns metadata with an id", "Listing shows the uploaded document", "Oversized uploads are rejected"],
        tests: ["Upload a text file and list it", "Upload the same file twice", "Upload a 60 MB file and check rejection"]
      },
      {
        id: "proj-document-management-m2", order: 2, title: "Versioning",
        objectives: ["Create versions on re-upload", "List version history", "Download old versions"],
        instructions: "When a document is re-uploaded, create a new version row with an incremented number instead of overwriting, keeping every previous file on disk. Add endpoints to list versions and download any version by number, and show the current version in the document metadata.",
        concepts: ["Version history", "Immutable versions", "Checksums"],
        hints: ["Versions are append-only — never update a version row.", "Store the checksum to detect corruption.", "Download sets the original filename in the header."],
        acceptanceCriteria: ["Three uploads produce versions 1, 2 and 3", "Downloading version 1 returns the original content", "Current version is always the latest"],
        tests: ["Upload v1, v2, v3 and list versions", "Download v1 and compare bytes", "Check the checksum matches"]
      },
      {
        id: "proj-document-management-m3", order: 3, title: "Search and sharing",
        objectives: ["Index document text", "Search by keyword", "Share with roles"],
        instructions: "Extract text from uploaded files and index it in an FTS5 table alongside titles and tags, so GET /api/documents?q= finds matches ranked by relevance. Add sharing: an owner can grant viewer or editor to another user, stored in the permissions table, and every document route checks it.",
        concepts: ["FTS5 full-text search", "Ranking", "Role-based access"],
        hints: ["Index on upload and on new versions.", "Search must only return documents the caller can see.", "Editors can upload versions; viewers cannot."],
        acceptanceCriteria: ["Search finds text inside a document", "A shared viewer can read but not upload", "An unshared user gets 403"],
        tests: ["Upload a doc containing 'quarterly budget' and search it", "Share as viewer and try to upload", "Search as an unshared user"]
      },
      {
        id: "proj-document-management-m4", order: 4, title: "Activity, delete and polish",
        objectives: ["Log activity", "Soft-delete and restore", "Test access control"],
        instructions: "Log every upload, version, share and delete to the activity table and expose it per document. Implement soft-delete that hides a document from lists but keeps its files, plus a restore endpoint. Write tests that enumerate every route as owner, viewer, editor and stranger, and fix any leak.",
        concepts: ["Audit logs", "Soft delete", "Authorization testing"],
        hints: ["Test the negative cases — they are where leaks hide.", "Soft-delete must also hide the document from search.", "Log the actor, not just the action."],
        acceptanceCriteria: ["Activity shows the full history", "Deleted documents disappear but restore", "No route leaks to unauthorized users"],
        tests: ["Delete then restore a document", "Read the activity log", "Run the full authorization test matrix"]
      }
    ],
    reviewChecklist: ["Uploads are validated and safely stored", "Version history is complete and downloadable", "Search is fast and permission-aware", "No endpoint leaks documents", "Soft-delete and restore work", "README documents the API"],
    finalAssessment: ["Upload and version a document three times", "Download version 1 and show it differs from version 3", "Search for text inside a document", "Share as viewer and demonstrate the permission boundary", "Show the activity log"]
  },
  {
    id: "proj-job-board",
    slug: "job-board",
    level: 3,
    title: "Job Board Platform",
    description: "Build a job board platform in TypeScript with listings, search and filters, applications, an employer dashboard, and email alerts for job seekers. It covers both sides of a two-sided marketplace: candidates applying and employers managing their pipeline.",
    skills: ["TypeScript", "REST APIs", "Search and filtering", "Authentication", "Email alerts", "Dashboards", "SQLite", "Pagination"],
    language: "typescript",
    functionalRequirements: [
      "Employers post jobs with title, description, location, salary and tags",
      "Job seekers search by keyword, location, type and salary range",
      "Candidates apply with a CV upload and cover note",
      "Employers view applications and change their status",
      "Users save jobs and receive email alerts for matching new jobs",
      "Employers see dashboard stats: views, applications, conversion",
      "Jobs expire automatically after their closing date",
      "Admins can moderate listings"
    ],
    nonFunctionalRequirements: [
      "Search returns in under 300 ms for 5,000 jobs",
      "Application uploads are limited to 5 MB and PDF only",
      "A seeker never sees another seeker's applications",
      "Expired jobs never appear in search",
      "Email alerts are sent at most once per day per user"
    ],
    architecture: "An Express and TypeScript API serves the platform with SQLite storage, using indexed queries for search filters and FTS5 for keyword search. Authentication is session-based with hashed passwords, and roles separate seekers, employers and admins. Applications are rows linked to jobs and users with a status history, CVs are stored on disk, and a daily job matches saved searches against new listings and queues alert emails. The employer dashboard aggregates views and application counts with simple SQL group-by queries.",
    databaseSchema: "users(id INTEGER PK, email TEXT UNIQUE, role TEXT, password_hash TEXT); jobs(id INTEGER PK, employer_id INTEGER, title TEXT, description TEXT, location TEXT, salary_min INTEGER, salary_max INTEGER, type TEXT, status TEXT, closes_at TEXT); applications(id INTEGER PK, job_id INTEGER, seeker_id INTEGER, cv_path TEXT, note TEXT, status TEXT, created_at TEXT); saved_searches(id INTEGER PK, user_id INTEGER, query TEXT, location TEXT); job_views(job_id INTEGER, viewed_at TEXT)",
    apis: [
      "GET /api/jobs?q=&location=&type=&minSalary= — search with filters",
      "POST /api/jobs — employer creates a listing",
      "GET /api/jobs/:id — job detail, records a view",
      "POST /api/jobs/:id/apply — apply with CV upload",
      "GET /api/employer/applications — pipeline by job and status",
      "PATCH /api/applications/:id — change status",
      "POST /api/saved-searches — create an alert search",
      "GET /api/employer/dashboard — views and application stats"
    ],
    fileStructure: "job-board/\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    db.ts\n    auth.ts\n    jobs.ts\n    applications.ts\n    alerts.ts\n    dashboard.ts\n    mail.ts\n  tests/\n    jobs.test.ts\n    applications.test.ts\n  README.md",
    taskBreakdown: [
      "Design the schema and roles",
      "Implement auth and job posting",
      "Implement search with filters and FTS",
      "Implement applications with CV upload",
      "Build the employer pipeline and dashboard",
      "Add saved searches and daily alerts",
      "Add expiry and moderation",
      "Test both sides of the marketplace"
    ],
    milestones: [
      {
        id: "proj-job-board-m1", order: 1, title: "Auth, jobs and search",
        objectives: ["Register and log in users", "Post jobs", "Search with filters"],
        instructions: "Implement registration and login with hashed passwords and roles for seeker and employer. Employers can create jobs with title, location, salary range and type, and seekers can search by keyword using FTS5 plus filters for location, type and minimum salary, with pagination.",
        concepts: ["Password hashing", "Roles", "FTS5", "Pagination"],
        hints: ["Hash with bcrypt or scrypt, never plain text.", "Index the filter columns.", "Return total counts with paginated results."],
        acceptanceCriteria: ["An employer can post a job", "Keyword search finds it", "Filters narrow results correctly"],
        tests: ["Register both roles and post a job", "Search by keyword and by location", "Check page 2 returns different jobs"]
      },
      {
        id: "proj-job-board-m2", order: 2, title: "Applications",
        objectives: ["Apply with a CV", "Track application status", "Protect applicant privacy"],
        instructions: "Add an apply endpoint that accepts a PDF CV up to 5 MB and a cover note, creating an application in applied status. Employers can list applications per job and move them through reviewed, interview, offered and rejected, with each change recorded. Seekers see only their own applications.",
        concepts: ["File upload validation", "Status workflows", "Privacy by role"],
        hints: ["Validate the PDF magic bytes, not just the extension.", "One application per seeker per job.", "Record a status history, not just the current status."],
        acceptanceCriteria: ["Applying creates an application", "Duplicate applications are rejected", "A seeker cannot view another's application"],
        tests: ["Apply with a PDF CV", "Apply twice to the same job", "Fetch an application as a different seeker"]
      },
      {
        id: "proj-job-board-m3", order: 3, title: "Employer dashboard",
        objectives: ["Show views and applications", "Show conversion", "List jobs by performance"],
        instructions: "Record a view each time a job detail is fetched, then build the employer dashboard aggregating views, applications and application-to-view conversion per job. Sort jobs by performance and show totals for the last 30 days, using SQL aggregation rather than in-memory loops.",
        concepts: ["Aggregation", "Conversion metrics", "SQL GROUP BY"],
        hints: ["Count views in the database, not in memory.", "Conversion is applications divided by views.", "Guard against division by zero."],
        acceptanceCriteria: ["Dashboard shows correct counts after views and applies", "Conversion is computed per job", "Jobs sort by applications"],
        tests: ["View a job 10 times and apply twice", "Check the dashboard numbers", "Check a job with zero views shows no conversion"]
      },
      {
        id: "proj-job-board-m4", order: 4, title: "Alerts, expiry and moderation",
        objectives: ["Send saved-search alerts", "Expire old jobs", "Moderate listings"],
        instructions: "Let seekers save a search, and run a daily job that matches new jobs against saved searches and sends at most one digest email per user per day. Automatically expire jobs past their closing date so they leave search results, and let admins hide listings pending review.",
        concepts: ["Saved searches", "Digest emails", "Scheduled jobs", "Moderation"],
        hints: ["Match only jobs posted since the last alert run.", "Expiry is a query condition, not a delete.", "Log every alert sent."],
        acceptanceCriteria: ["A matching new job triggers an alert", "No second alert the same day", "Expired jobs disappear from search"],
        tests: ["Save a search, post a matching job, run alerts", "Run alerts twice and count emails", "Expire a job and search for it"]
      }
    ],
    reviewChecklist: ["Search is fast and correctly filtered", "Applications enforce privacy and one-per-job", "Dashboard numbers match raw counts", "Alerts are daily digests, not spam", "Expired and moderated jobs stay hidden", "README documents both user journeys"],
    finalAssessment: ["Post a job as an employer and find it as a seeker", "Apply and move the application through the pipeline", "Show the employer dashboard after views and applies", "Demonstrate a saved-search alert", "Show an expired job leaving search"]
  },
  {
    id: "proj-ride-sharing-backend",
    slug: "ride-sharing-backend",
    level: 3,
    title: "Ride-Sharing Backend",
    description: "Build a ride-sharing backend in Go that matches riders with nearby drivers, prices trips with surge, tracks the trip lifecycle from request to completion, and collects ratings. It models the real-time matching and state machine at the heart of services like Uber.",
    skills: ["Go", "Geospatial matching", "State machines", "Pricing", "REST APIs", "PostgreSQL", "Concurrency", "WebSockets"],
    language: "go",
    functionalRequirements: [
      "Register drivers with location updates and riders with accounts",
      "Match a ride request to the nearest available driver",
      "Price trips from distance, time and surge multiplier",
      "Track trip lifecycle: requested, accepted, arrived, started, completed, cancelled",
      "Support rider and driver cancellation with rules",
      "Collect ratings after completed trips",
      "Broadcast driver locations and trip updates over WebSockets",
      "Provide trip history and earnings summaries"
    ],
    nonFunctionalRequirements: [
      "Matching completes in under 500 ms for 1,000 online drivers",
      "A trip can only move through valid state transitions",
      "Pricing is deterministic for the same inputs",
      "Location updates are processed without blocking matching",
      "No driver is matched to two trips at once"
    ],
    architecture: "A Go service with a PostgreSQL store holds users, drivers, trips and ratings, while driver locations live in an in-memory spatial index updated by a WebSocket and HTTP endpoint. Matching queries the index for the nearest available drivers within a radius, locks the chosen driver with a database transaction, and creates the trip in requested state. A state machine validates every transition, pricing is a pure function of distance, duration and surge, and trip updates are pushed to riders and drivers over WebSockets.",
    databaseSchema: "users(id UUID PK, name TEXT, role TEXT, phone TEXT); drivers(id UUID PK, user_id UUID, vehicle TEXT, status TEXT, lat DOUBLE, lng DOUBLE, updated_at TIMESTAMPTZ); trips(id UUID PK, rider_id UUID, driver_id UUID, pickup_lat DOUBLE, pickup_lng DOUBLE, dropoff_lat DOUBLE, dropoff_lng DOUBLE, status TEXT, price_cents INTEGER, surge REAL, created_at TIMESTAMPTZ); ratings(id UUID PK, trip_id UUID, rater_id UUID, stars INTEGER, comment TEXT)",
    apis: [
      "POST /api/rides — request a ride, returns matched driver and price estimate",
      "POST /api/rides/:id/accept | /arrive | /start | /complete | /cancel",
      "POST /api/drivers/location — update driver location",
      "POST /api/drivers/availability — go online or offline",
      "GET /api/rides/:id — trip detail and status",
      "POST /api/rides/:id/rate — rate the other party",
      "WS /ws — live driver locations and trip updates",
      "GET /api/drivers/:id/earnings — earnings summary"
    ],
    fileStructure: "ride-sharing/\n  go.mod\n  cmd/server/main.go\n  internal/\n    matching/matcher.go\n    pricing/pricing.go\n    trips/statemachine.go\n    trips/service.go\n    drivers/store.go\n    geo/index.go\n    ws/hub.go\n  migrations/001_init.sql\n  README.md",
    taskBreakdown: [
      "Design the schema and trip state machine",
      "Implement driver registration and location index",
      "Implement nearest-driver matching",
      "Implement pricing with surge",
      "Implement the trip lifecycle endpoints",
      "Add ratings and earnings",
      "Add WebSocket live updates",
      "Test matching under load and invalid transitions"
    ],
    milestones: [
      {
        id: "proj-ride-sharing-backend-m1", order: 1, title: "Drivers, locations and state machine",
        objectives: ["Register drivers", "Track locations", "Enforce trip transitions"],
        instructions: "Create the schema and endpoints for driver registration, availability and location updates, storing locations in an in-memory index keyed by driver. Implement the trip state machine as a table of allowed transitions and a function that rejects anything else with a clear error, then write tests for every transition.",
        concepts: ["State machines", "In-memory indexes", "Haversine distance"],
        hints: ["Validate transitions in one place, never in each handler.", "Use haversine for distance, not flat subtraction.", "Expire stale locations after 60 seconds."],
        acceptanceCriteria: ["Drivers can go online and update location", "Invalid transitions are rejected", "Stale drivers are not matchable"],
        tests: ["Move a trip requested to completed directly and check rejection", "Update a location and query nearby drivers", "Wait 60 seconds and check expiry"]
      },
      {
        id: "proj-ride-sharing-backend-m2", order: 2, title: "Matching and pricing",
        objectives: ["Find the nearest driver", "Prevent double matching", "Price deterministically"],
        instructions: "Implement matching that finds the nearest available driver within 5 km, locks that driver in a transaction so two requests cannot take the same driver, and creates the trip. Implement pricing as a pure function: base fare plus per-km and per-minute rates times a surge multiplier derived from the ratio of requests to available drivers.",
        concepts: ["Nearest-neighbour search", "Row locking", "Surge pricing"],
        hints: ["Lock the driver row with SELECT FOR UPDATE.", "Make pricing pure so tests are deterministic.", "Return an honest no-drivers-available error when the radius is empty."],
        acceptanceCriteria: ["The nearest driver is matched", "Two simultaneous requests never share a driver", "Same inputs give the same price"],
        tests: ["Place three drivers at known distances and request a ride", "Fire two requests concurrently for one driver", "Price the same trip twice"]
      },
      {
        id: "proj-ride-sharing-backend-m3", order: 3, title: "Trip lifecycle and cancellation",
        objectives: ["Drive trips through states", "Handle cancellations", "Record timestamps"],
        instructions: "Implement accept, arrive, start, complete and cancel endpoints, each validating the current state and the caller's role, and record a timestamp for every transition. Cancellation before acceptance is free; after acceptance it records a cancellation fee and frees the driver. Completed trips lock their final price.",
        concepts: ["Role checks", "Lifecycle timestamps", "Cancellation policy"],
        hints: ["Only the assigned driver can accept or start.", "Free the driver on every terminal state.", "Store the transition history, not just the current status."],
        acceptanceCriteria: ["A full trip flows requested to completed", "Cancelling after acceptance charges a fee", "A completed trip cannot change state"],
        tests: ["Run a full trip end to end", "Cancel after acceptance and check the fee", "Try to complete a cancelled trip"]
      },
      {
        id: "proj-ride-sharing-backend-m4", order: 4, title: "Ratings, earnings and live updates",
        objectives: ["Collect ratings", "Summarise earnings", "Push live updates"],
        instructions: "Add ratings of 1 to 5 stars with an optional comment, allowed once per party per completed trip, and compute each driver's average rating and earnings from completed trips. Add a WebSocket hub that pushes trip status changes and nearby driver positions to connected riders and drivers.",
        concepts: ["Ratings aggregation", "WebSockets", "Event broadcasting"],
        hints: ["One rating per rater per trip — enforce with a unique constraint.", "Earnings are a SUM over completed trips.", "Broadcast only to the trip's participants."],
        acceptanceCriteria: ["Ratings average correctly", "Earnings match completed trips", "A rider sees live status updates"],
        tests: ["Rate a trip twice and check rejection", "Complete three trips and check earnings", "Connect a WebSocket and watch a trip update"]
      }
    ],
    reviewChecklist: ["Matching is nearest-first and race-free", "State machine rejects every invalid transition", "Pricing is deterministic and documented", "Cancellations free drivers and charge correctly", "Ratings and earnings aggregate correctly", "README explains surge and matching"],
    finalAssessment: ["Request a ride and show the nearest driver matched", "Run a full trip lifecycle live", "Demonstrate a rejected invalid transition", "Show surge pricing changing with demand", "Show ratings and earnings for a driver"]
  },
  {
    id: "proj-food-delivery-api",
    slug: "food-delivery-api",
    level: 3,
    title: "Food Delivery API",
    description: "Build a food delivery API in Python that covers restaurants, menus, orders, couriers, live tracking and payments. It models the full order lifecycle from a customer placing an order to a courier marking it delivered, with a simulated payment step.",
    skills: ["Python", "REST APIs", "Order lifecycle", "Payments", "Live tracking", "SQLite", "Authentication", "Background jobs"],
    language: "python",
    functionalRequirements: [
      "Restaurants manage menus with items, prices and availability",
      "Customers browse restaurants and place orders",
      "Orders move through placed, confirmed, preparing, picked up, delivered",
      "Couriers accept deliveries and update their location",
      "Customers track order status and courier position live",
      "Payments are simulated with card validation and receipts",
      "Restaurants confirm or reject orders with a reason",
      "Order history and ratings are available per user"
    ],
    nonFunctionalRequirements: [
      "An order total is computed exactly to the cent",
      "An order cannot skip lifecycle states",
      "A courier handles one active delivery at a time",
      "Menu changes never alter already-placed orders",
      "API responds in under 200 ms for reads"
    ],
    architecture: "A Flask API with SQLite stores restaurants, menus, orders, order items, couriers and payments, with order items snapshotting the price at order time so later menu edits cannot change history. The order state machine validates every transition by role, a dispatcher assigns the nearest available courier, and location updates are stored per delivery for live tracking. Payments go through a simulated gateway module with card validation and an idempotency key so retries never double-charge.",
    databaseSchema: "restaurants(id INTEGER PK, name TEXT, cuisine TEXT, delivery_fee_cents INTEGER); menu_items(id INTEGER PK, restaurant_id INTEGER, name TEXT, price_cents INTEGER, available INTEGER); orders(id INTEGER PK, customer_id INTEGER, restaurant_id INTEGER, courier_id INTEGER, status TEXT, total_cents INTEGER, created_at TEXT); order_items(id INTEGER PK, order_id INTEGER, name TEXT, price_cents INTEGER, qty INTEGER); couriers(id INTEGER PK, name TEXT, status TEXT, lat REAL, lng REAL); payments(id INTEGER PK, order_id INTEGER, amount_cents INTEGER, status TEXT, idempotency_key TEXT UNIQUE)",
    apis: [
      "GET /api/restaurants — list with cuisine filter",
      "GET /api/restaurants/:id/menu — menu items",
      "POST /api/orders — place an order with items",
      "POST /api/orders/:id/confirm | /reject — restaurant actions",
      "POST /api/deliveries/:id/accept | /pickup | /deliver — courier actions",
      "GET /api/orders/:id/track — status and courier location",
      "POST /api/orders/:id/pay — simulated payment",
      "GET /api/orders — order history for the caller"
    ],
    fileStructure: "food-delivery/\n  main.py\n  requirements.txt\n  delivery/\n    __init__.py\n    db.py\n    menus.py\n    orders.py\n    dispatch.py\n    payments.py\n    tracking.py\n  tests/\n    test_orders.py\n    test_payments.py\n  README.md",
    taskBreakdown: [
      "Design the schema and order state machine",
      "Implement restaurants and menus",
      "Implement order placement with price snapshots",
      "Implement restaurant confirm and reject",
      "Implement courier dispatch and delivery steps",
      "Add simulated payments with idempotency",
      "Add live tracking",
      "Test the full lifecycle and edge cases"
    ],
    milestones: [
      {
        id: "proj-food-delivery-api-m1", order: 1, title: "Restaurants, menus and ordering",
        objectives: ["Manage menus", "Place orders", "Snapshot prices"],
        instructions: "Build restaurant and menu endpoints with availability flags, then order placement that validates items belong to one restaurant, snapshots each item's name and price into order_items, and computes the total in integer cents including the delivery fee. An order starts in placed status.",
        concepts: ["Price snapshots", "Integer cents", "Validation"],
        hints: ["Snapshot prices — never read the menu at receipt time.", "Reject orders with items from two restaurants.", "Validate quantities are positive."],
        acceptanceCriteria: ["Ordering computes the correct total", "Changing a menu price leaves old orders unchanged", "Unavailable items cannot be ordered"],
        tests: ["Place an order and check the total", "Change a menu price and re-read the order", "Order an unavailable item"]
      },
      {
        id: "proj-food-delivery-api-m2", order: 2, title: "Order lifecycle and dispatch",
        objectives: ["Confirm and reject orders", "Assign a courier", "Enforce state order"],
        instructions: "Implement the state machine for placed, confirmed, preparing, picked up and delivered, with restaurant confirm and reject and a reason on rejection. On confirmation, dispatch assigns the nearest available courier, who must accept before pickup; a courier with an active delivery cannot be assigned another.",
        concepts: ["State machines", "Dispatch", "Role checks"],
        hints: ["Validate every transition in one function.", "Rejecting frees the order and notifies the customer.", "Store a status history with timestamps."],
        acceptanceCriteria: ["Orders flow through every state in order", "Skipped states are rejected", "A busy courier is never double-assigned"],
        tests: ["Run a full order lifecycle", "Try to mark delivered before pickup", "Assign two orders to one courier"]
      },
      {
        id: "proj-food-delivery-api-m3", order: 3, title: "Payments",
        objectives: ["Validate cards", "Charge once per order", "Issue receipts"],
        instructions: "Add a simulated payment gateway that validates card numbers with the Luhn check, expiry and CVC format, then records a payment linked to the order. Use an idempotency key supplied by the client so retrying the same payment returns the original result instead of charging twice, and expose a receipt endpoint.",
        concepts: ["Luhn check", "Idempotency keys", "Simulated gateways"],
        hints: ["Never store full card numbers — last four digits only.", "Idempotency is a UNIQUE constraint plus a lookup.", "A failed payment leaves the order payable."],
        acceptanceCriteria: ["Valid cards succeed and invalid cards fail", "Retrying with the same key charges once", "Receipt shows the correct amount"],
        tests: ["Pay with a valid test card", "Pay with a failing Luhn number", "Pay twice with the same idempotency key"]
      },
      {
        id: "proj-food-delivery-api-m4", order: 4, title: "Tracking, history and ratings",
        objectives: ["Track orders live", "Show order history", "Rate deliveries"],
        instructions: "Add courier location updates during a delivery and a tracking endpoint returning the order status, courier position and estimated arrival. Add order history per customer and restaurant, and ratings for the restaurant and courier after delivery, aggregated into averages shown on listings.",
        concepts: ["Live tracking", "ETA estimation", "Rating aggregation"],
        hints: ["ETA is distance divided by an assumed speed.", "Only the ordering customer can rate.", "Average ratings update on each new rating."],
        acceptanceCriteria: ["Tracking shows live courier position", "History lists past orders correctly", "Ratings change the displayed average"],
        tests: ["Update a courier location and read tracking", "List order history", "Rate a delivered order twice"]
      }
    ],
    reviewChecklist: ["Totals are exact and prices are snapshotted", "Lifecycle states cannot be skipped", "Payments are idempotent and cards are not stored", "Couriers are never double-booked", "Tracking and ratings work end to end", "README documents the API and test cards"],
    finalAssessment: ["Place an order and walk it to delivered", "Show a menu change leaving an old order untouched", "Demonstrate an idempotent payment retry", "Show live tracking during a delivery", "Show order history and ratings"]
  },
  {
    id: "proj-healthcare-appointments",
    slug: "healthcare-appointments",
    level: 3,
    title: "Healthcare Appointment System",
    description: "Build a healthcare appointment system in TypeScript where patients book slots with doctors, receive reminders, and keep a record of visits. It handles the real constraints of a clinic: doctors' working hours, no double-bookings, cancellations, and patient privacy.",
    skills: ["TypeScript", "Scheduling", "Slot generation", "Reminders", "Access control", "Express", "SQLite", "Email"],
    language: "typescript",
    functionalRequirements: [
      "Doctors define weekly working hours and exceptions",
      "Slots are generated from working hours and slot length",
      "Patients book an available slot with a reason for visit",
      "No slot can be double-booked",
      "Patients and doctors can cancel with a reason",
      "Reminders are sent 24 hours and 1 hour before the visit",
      "Doctors see their daily schedule and patient visit history",
      "Patient records are visible only to the patient and their doctors"
    ],
    nonFunctionalRequirements: [
      "Booking a slot is atomic — concurrent bookings cannot collide",
      "Reminders are sent at most once per appointment per window",
      "Past slots never appear as bookable",
      "Patient data is never exposed to other patients",
      "The schedule loads in under 300 ms for a week view"
    ],
    architecture: "An Express and TypeScript API with SQLite stores doctors, schedules, slots, appointments and reminders. Slots are generated from weekly working hours minus exceptions and existing bookings, and booking uses a database transaction with a unique constraint on the slot so concurrent requests cannot double-book. A reminder worker runs every 15 minutes, finds appointments in the 24-hour and 1-hour windows without a sent reminder, and queues emails. Access control middleware ensures patients see only their own appointments and doctors only theirs.",
    databaseSchema: "users(id INTEGER PK, name TEXT, email TEXT, role TEXT); doctors(id INTEGER PK, user_id INTEGER, specialty TEXT, slot_minutes INTEGER); schedules(id INTEGER PK, doctor_id INTEGER, weekday INTEGER, start_time TEXT, end_time TEXT); appointments(id INTEGER PK, doctor_id INTEGER, patient_id INTEGER, starts_at TEXT, reason TEXT, status TEXT, cancelled_reason TEXT); reminders(id INTEGER PK, appointment_id INTEGER, window TEXT, sent_at TEXT)",
    apis: [
      "GET /api/doctors — list doctors with specialty filter",
      "GET /api/doctors/:id/slots?date= — available slots for a day",
      "POST /api/appointments — book a slot",
      "POST /api/appointments/:id/cancel — cancel with a reason",
      "GET /api/appointments/mine — caller's appointments",
      "GET /api/doctors/:id/schedule?date= — doctor's day view",
      "GET /api/patients/:id/history — visit history for authorised callers",
      "POST /api/doctors/:id/schedule — set working hours"
    ],
    fileStructure: "healthcare-appointments/\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    db.ts\n    auth.ts\n    slots.ts\n    appointments.ts\n    reminders.ts\n    mail.ts\n  tests/\n    slots.test.ts\n    appointments.test.ts\n  README.md",
    taskBreakdown: [
      "Design the schema and slot model",
      "Implement doctor schedules and slot generation",
      "Implement atomic booking",
      "Implement cancellation rules",
      "Add the reminder worker",
      "Add doctor schedule and patient history views",
      "Add access-control tests",
      "Test concurrent booking"
    ],
    milestones: [
      {
        id: "proj-healthcare-appointments-m1", order: 1, title: "Schedules and slot generation",
        objectives: ["Store working hours", "Generate slots", "Exclude past slots"],
        instructions: "Let doctors set weekly working hours with a slot length, then generate slots for a given day by slicing each working window and excluding past times, exceptions and already-booked slots. Return slots as ISO timestamps with a booked flag so the frontend can render a day view.",
        concepts: ["Time slicing", "Weekly schedules", "Timezones"],
        hints: ["Store times in UTC and convert at the edges.", "Generate slots on demand, do not pre-create thousands of rows.", "A 30-minute slot length is a good default."],
        acceptanceCriteria: ["Slots match the doctor's working hours", "Past slots are not bookable", "Booked slots show as unavailable"],
        tests: ["Generate slots for a working day", "Generate slots for a Sunday with no hours", "Check a past slot is excluded"]
      },
      {
        id: "proj-healthcare-appointments-m2", order: 2, title: "Atomic booking",
        objectives: ["Book a slot", "Prevent double-booking", "Validate the reason"],
        instructions: "Implement booking inside a transaction that inserts the appointment only if no appointment exists for that doctor and start time, enforced by a UNIQUE constraint. Return 409 when the slot is taken, require a reason for the visit, and confirm the booking with the doctor, time and a reference number.",
        concepts: ["Database transactions", "Unique constraints", "409 Conflict"],
        hints: ["Let the database enforce uniqueness — do not check-then-insert.", "Handle the constraint error and map it to 409.", "Test with two concurrent requests."],
        acceptanceCriteria: ["Booking succeeds for a free slot", "A second booking of the same slot fails", "Concurrent bookings produce exactly one success"],
        tests: ["Book a slot, then book it again", "Fire ten concurrent bookings for one slot", "Book without a reason"]
      },
      {
        id: "proj-healthcare-appointments-m3", order: 3, title: "Cancellation and history",
        objectives: ["Cancel with a reason", "Free the slot", "Show visit history"],
        instructions: "Add cancellation by patient or doctor with a required reason, which marks the appointment cancelled and frees the slot for rebooking. Add a patient history view showing past and upcoming appointments, visible only to the patient and doctors they have seen, and a doctor day view listing their appointments in order.",
        concepts: ["Cancellation policy", "Access control", "History views"],
        hints: ["Keep cancelled rows — never delete appointments.", "A cancelled slot becomes bookable again immediately.", "History is sorted newest first."],
        acceptanceCriteria: ["Cancelling frees the slot", "History shows cancelled and completed visits", "Another patient cannot view the history"],
        tests: ["Book, cancel, then rebook the same slot", "View history as the patient", "View history as a different patient"]
      },
      {
        id: "proj-healthcare-appointments-m4", order: 4, title: "Reminders",
        objectives: ["Send 24-hour reminders", "Send 1-hour reminders", "Never send duplicates"],
        instructions: "Build a reminder worker that runs every 15 minutes, finds appointments starting in the next 24 hours or the next hour, and sends an email for each window that has not been sent yet, recording it in the reminders table. Cancelled appointments never receive reminders, and the worker is idempotent if it runs twice.",
        concepts: ["Scheduled workers", "Idempotency", "Email templates"],
        hints: ["Record the reminder before sending, or use a transaction.", "Query by a time window, not exact equality.", "Include the doctor, time and cancellation link."],
        acceptanceCriteria: ["A 24-hour reminder is sent once", "A 1-hour reminder is sent once", "Cancelled appointments get no reminder"],
        tests: ["Create an appointment in 23 hours and run the worker", "Run the worker twice and count emails", "Cancel then run the worker"]
      }
    ],
    reviewChecklist: ["Slots match working hours exactly", "Concurrent booking cannot double-book", "Cancellations free slots and are audited", "Reminders are exactly once per window", "Patient data is properly isolated", "README documents booking rules"],
    finalAssessment: ["Show slot generation for a doctor's week", "Book a slot and demonstrate a concurrent double-booking failing", "Cancel and rebook the same slot", "Trigger both reminder windows", "Show the doctor's day view and patient history"]
  },
  {
    id: "proj-banking-transactions",
    slug: "banking-transactions",
    level: 3,
    title: "Banking Transaction System",
    description: "Build a banking transaction system in Python with accounts, transfers, a double-entry ledger, statements and a full audit trail. It enforces the invariants real banks rely on: money is never created or destroyed by a transfer, and every cent is traceable.",
    skills: ["Python", "Double-entry ledger", "Transactions", "ACID", "Audit trails", "Statements", "SQLite", "Decimal arithmetic"],
    language: "python",
    functionalRequirements: [
      "Create accounts with an owner, type and opening balance",
      "Transfer money between accounts with a reference",
      "Record every transfer as balanced double-entry ledger entries",
      "Reject transfers that would overdraw an account",
      "Generate monthly statements with opening and closing balances",
      "Support deposits and withdrawals with an audit record",
      "Freeze and unfreeze accounts",
      "Expose an audit log of every balance-changing event"
    ],
    nonFunctionalRequirements: [
      "All money uses Decimal, never float",
      "Every transfer is atomic — it fully succeeds or fully fails",
      "The ledger always balances to zero across all entries",
      "A frozen account cannot send or receive money",
      "Concurrent transfers never lose or duplicate money"
    ],
    architecture: "A Python service with SQLite stores accounts and a ledger table where every transfer writes two entries — a debit from the source and a credit to the destination — inside a single database transaction, so the books always balance. Balances are derived from the ledger rather than stored separately, and every operation writes an audit row with the actor, amount and resulting balance. Statements are generated by summing ledger entries in a date range, and concurrency is handled with SQLite transactions in immediate mode.",
    databaseSchema: "accounts(id INTEGER PK, owner TEXT, type TEXT, status TEXT, created_at TEXT); ledger(id INTEGER PK, account_id INTEGER, transaction_id TEXT, entry_type TEXT, amount_cents INTEGER, balance_after_cents INTEGER, description TEXT, created_at TEXT); audit(id INTEGER PK, account_id INTEGER, action TEXT, amount_cents INTEGER, actor TEXT, ts TEXT)",
    apis: [
      "POST /api/accounts — create an account",
      "GET /api/accounts/:id — account with derived balance",
      "POST /api/transfers — transfer between accounts",
      "POST /api/accounts/:id/deposit | /withdraw",
      "GET /api/accounts/:id/statement?month= — monthly statement",
      "POST /api/accounts/:id/freeze | /unfreeze",
      "GET /api/accounts/:id/audit — audit log",
      "GET /api/ledger/verify — check the ledger balances"
    ],
    fileStructure: "banking/\n  main.py\n  requirements.txt\n  banking/\n    __init__.py\n    db.py\n    accounts.py\n    ledger.py\n    transfers.py\n    statements.py\n    audit.py\n  tests/\n    test_transfers.py\n    test_ledger.py\n  README.md",
    taskBreakdown: [
      "Design the ledger schema and invariants",
      "Implement accounts and deposits",
      "Implement transfers as balanced double entries",
      "Add overdraft and frozen-account guards",
      "Implement statements",
      "Add the audit log and ledger verification",
      "Test concurrency with parallel transfers",
      "Document the invariants"
    ],
    milestones: [
      {
        id: "proj-banking-transactions-m1", order: 1, title: "Accounts and ledger basics",
        objectives: ["Create accounts", "Record deposits as ledger entries", "Derive balances from the ledger"],
        instructions: "Create accounts with an opening deposit recorded as a ledger credit, and compute every balance by summing ledger entries rather than storing a balance column. Add a verification endpoint that sums all ledger entries and confirms the total is zero, proving the books balance.",
        concepts: ["Double-entry bookkeeping", "Derived balances", "Ledger invariants"],
        hints: ["Store amounts in integer cents.", "A deposit is a credit; a withdrawal is a debit.", "Never update a balance column directly."],
        acceptanceCriteria: ["Opening balances are correct", "Ledger total is always zero", "Balances match the sum of entries"],
        tests: ["Create an account with 100.00 and check the balance", "Deposit and withdraw and verify the ledger", "Call /ledger/verify"]
      },
      {
        id: "proj-banking-transactions-m2", order: 2, title: "Transfers",
        objectives: ["Transfer between accounts", "Keep transfers atomic", "Reject overdrafts"],
        instructions: "Implement transfers that write a debit and a credit with the same transaction id inside one database transaction, updating both balance_after values. Reject transfers that would take the source below zero with a clear error and no ledger entries, and require a positive amount and a reference.",
        concepts: ["Atomic transactions", "Overdraft protection", "Transaction ids"],
        hints: ["Use BEGIN IMMEDIATE so concurrent transfers serialise.", "Check the balance inside the transaction.", "A failed transfer must leave zero trace."],
        acceptanceCriteria: ["A transfer moves money exactly", "An overdraft is rejected with no entries", "A transfer is all or nothing"],
        tests: ["Transfer 50.00 between two accounts", "Transfer more than the balance", "Transfer zero and negative amounts"]
      },
      {
        id: "proj-banking-transactions-m3", order: 3, title: "Statements and freezing",
        objectives: ["Generate monthly statements", "Freeze accounts", "Block frozen transfers"],
        instructions: "Generate statements by summing ledger entries for a month, showing opening balance, each transaction and closing balance. Add freeze and unfreeze: a frozen account cannot send or receive money, and attempts fail with a clear error while the account remains readable.",
        concepts: ["Statements", "Account status", "Guard clauses"],
        hints: ["Opening balance is the sum of entries before the month.", "Check frozen status inside the transfer transaction.", "Statements must reconcile to the derived balance."],
        acceptanceCriteria: ["Statement opening plus activity equals closing", "Frozen accounts reject transfers both ways", "Unfreezing restores normal use"],
        tests: ["Generate a statement and reconcile it by hand", "Freeze an account and try a transfer in and out", "Unfreeze and transfer again"]
      },
      {
        id: "proj-banking-transactions-m4", order: 4, title: "Audit and concurrency",
        objectives: ["Audit every change", "Verify under concurrency", "Prove no money is lost"],
        instructions: "Write an audit row for every balance-changing event with actor, action, amount and resulting balance, and expose it per account. Run a concurrency test firing 100 parallel transfers between accounts and verify afterwards that total money is unchanged, every ledger entry is balanced, and the audit log is complete.",
        concepts: ["Audit trails", "Concurrency testing", "Money conservation"],
        hints: ["Audit inside the same transaction as the transfer.", "Total money across accounts must be invariant.", "Use threads, not just sequential tests."],
        acceptanceCriteria: ["Audit log is complete for every transfer", "100 parallel transfers conserve total money", "Ledger still verifies after the load test"],
        tests: ["Run the 100-transfer concurrency test", "Check total money before and after", "Spot-check audit rows against ledger rows"]
      }
    ],
    reviewChecklist: ["Ledger always balances to zero", "Money is conserved under concurrency", "Overdrafts and frozen accounts are blocked", "Statements reconcile exactly", "Audit log is complete", "No float arithmetic anywhere in money code"],
    finalAssessment: ["Create two accounts and transfer between them", "Show the ledger entries for the transfer", "Attempt an overdraft and a frozen transfer", "Generate a statement and reconcile it", "Run the concurrency test and verify the ledger"]
  },
  {
    id: "proj-airline-reservation",
    slug: "airline-reservation",
    level: 3,
    title: "Airline Reservation System",
    description: "Build an airline reservation system in Python with flight search, seat maps, bookings, dynamic pricing, check-in and cancellations. It handles the core inventory problem of airlines: a seat can only be sold once, even when many customers book at the same time.",
    skills: ["Python", "Seat inventory", "Pricing", "Bookings", "Check-in", "Concurrency", "SQLite", "REST APIs"],
    language: "python",
    functionalRequirements: [
      "Search flights by origin, destination and date",
      "Show a seat map with available, booked and blocked seats",
      "Book seats for one or more passengers",
      "Price fares by cabin, demand and booking time",
      "Check in passengers and assign boarding passes",
      "Cancel bookings with a refund policy by fare class",
      "Support waitlists when a flight is full",
      "Send booking confirmations with a reference code"
    ],
    nonFunctionalRequirements: [
      "A seat is never double-booked, even under concurrency",
      "Search returns in under 300 ms for 1,000 flights",
      "Pricing is deterministic for the same flight and time",
      "Cancelled seats return to inventory immediately",
      "Booking references are unique and unguessable"
    ],
    architecture: "A Flask API with SQLite stores flights, seats, bookings and passengers, with seat assignment enforced by a UNIQUE constraint on flight plus seat number inside a transaction. Pricing is a pure function of base fare, cabin multiplier, days to departure and load factor, computed at booking time and stored on the booking. Check-in moves a booking to checked-in status and issues a seat assignment and boarding-pass code, while cancellations refund according to fare class and free the seats in the same transaction.",
    databaseSchema: "flights(id INTEGER PK, number TEXT, origin TEXT, destination TEXT, departs_at TEXT, arrives_at TEXT, aircraft TEXT); seats(id INTEGER PK, flight_id INTEGER, seat_number TEXT, cabin TEXT, status TEXT); bookings(id INTEGER PK, reference TEXT UNIQUE, flight_id INTEGER, passenger_name TEXT, cabin TEXT, total_cents INTEGER, status TEXT); passengers(id INTEGER PK, booking_id INTEGER, name TEXT, seat_number TEXT, checked_in INTEGER)",
    apis: [
      "GET /api/flights?from=&to=&date= — search flights",
      "GET /api/flights/:id/seats — seat map",
      "POST /api/bookings — book seats for passengers",
      "GET /api/bookings/:reference — booking detail",
      "POST /api/bookings/:reference/checkin — check in",
      "POST /api/bookings/:reference/cancel — cancel with refund",
      "POST /api/flights/:id/waitlist — join the waitlist",
      "GET /api/flights/:id/pricing — fare breakdown"
    ],
    fileStructure: "airline/\n  main.py\n  requirements.txt\n  airline/\n    __init__.py\n    db.py\n    flights.py\n    pricing.py\n    bookings.py\n    checkin.py\n    refunds.py\n  data/seed_flights.py\n  tests/\n    test_bookings.py\n    test_pricing.py\n  README.md",
    taskBreakdown: [
      "Design the schema and seed flights",
      "Implement flight search and seat maps",
      "Implement pricing",
      "Implement atomic booking",
      "Implement check-in and boarding passes",
      "Implement cancellations and refunds",
      "Add waitlists",
      "Test concurrency on the last seat"
    ],
    milestones: [
      {
        id: "proj-airline-reservation-m1", order: 1, title: "Flights, search and seat maps",
        objectives: ["Seed flights", "Search by route and date", "Render a seat map"],
        instructions: "Seed flights with realistic routes, times and aircraft, generating a seat map per flight with economy, premium and business cabins. Implement search by origin, destination and date, and a seat-map endpoint showing each seat's status. Index the search columns for speed.",
        concepts: ["Seed data", "Indexed search", "Seat maps"],
        hints: ["Generate seats from the aircraft layout, not by hand.", "Search by date range, not exact timestamp.", "Return seats grouped by cabin."],
        acceptanceCriteria: ["Search finds flights for a route and date", "Seat map shows all seats with status", "Search is fast on seeded data"],
        tests: ["Search a known route", "Fetch a seat map and count seats", "Search a route with no flights"]
      },
      {
        id: "proj-airline-reservation-m2", order: 2, title: "Pricing and booking",
        objectives: ["Price fares deterministically", "Book seats atomically", "Issue references"],
        instructions: "Implement pricing from base fare, cabin multiplier, days-to-departure factor and load factor, and store the computed total on the booking. Booking inserts passengers and marks seats booked inside one transaction, guarded by the unique seat constraint, and returns a random six-character reference code.",
        concepts: ["Dynamic pricing", "Atomic booking", "Reference codes"],
        hints: ["Compute price in a pure function for testability.", "Let the unique constraint catch double-booking.", "Use secrets for reference codes."],
        acceptanceCriteria: ["Same flight and time gives the same price", "Booking marks seats as booked", "Two bookings cannot take the same seat"],
        tests: ["Price the same flight twice", "Book a seat, then book it again", "Book three passengers together"]
      },
      {
        id: "proj-airline-reservation-m3", order: 3, title: "Check-in and cancellations",
        objectives: ["Check in passengers", "Issue boarding passes", "Cancel with refunds"],
        instructions: "Add check-in that marks passengers checked in and returns a boarding-pass code with seat and gate information, only for bookings in confirmed status. Add cancellation that refunds by fare class — refundable fares return the full amount, non-refundable fares return taxes only — and frees the seats in the same transaction.",
        concepts: ["Check-in flow", "Boarding passes", "Refund policy"],
        hints: ["Check-in closes 45 minutes before departure.", "Refund rules belong in one function.", "Free seats before notifying the waitlist."],
        acceptanceCriteria: ["Check-in issues a boarding pass", "Check-in after cutoff is rejected", "Cancellation refunds the correct amount and frees seats"],
        tests: ["Check in a booking and read the pass", "Cancel a refundable and a non-refundable booking", "Rebook a freed seat"]
      },
      {
        id: "proj-airline-reservation-m4", order: 4, title: "Waitlist and concurrency",
        objectives: ["Waitlist full flights", "Promote on cancellation", "Prove no double-booking"],
        instructions: "When a flight is full, let passengers join a waitlist in order; on cancellation, promote the first waitlisted passenger and notify them. Run a concurrency test with 50 parallel requests for the last seat and prove exactly one succeeds, then document the result.",
        concepts: ["Waitlists", "Promotion", "Concurrency testing"],
        hints: ["Waitlist order is first-come, first-served.", "Promotion is a booking, so reuse the booking code.", "Count successes in the concurrency test — it must be exactly one."],
        acceptanceCriteria: ["Full flights accept waitlist entries", "A cancellation promotes the first waitlisted passenger", "50 concurrent requests yield one booking"],
        tests: ["Fill a flight and join the waitlist", "Cancel and check promotion", "Run the last-seat concurrency test"]
      }
    ],
    reviewChecklist: ["Seats are never double-booked", "Pricing is deterministic and documented", "Check-in and refund rules are enforced", "Waitlist promotion works in order", "Concurrency test passes", "README explains fare classes and policies"],
    finalAssessment: ["Search and book a flight for two passengers", "Show the seat map before and after booking", "Check in and show the boarding pass", "Cancel and show the refund and freed seat", "Run the last-seat concurrency test"]
  },
  {
    id: "proj-library-management",
    slug: "library-management",
    level: 2,
    title: "Library Management System",
    description: "Build a library management system in C++ that manages a catalog of books, members, loans, fines, reservations and reports. It is a classic data-modelling project that teaches classes, file persistence and business rules in a typed language.",
    skills: ["C++", "Object-oriented design", "File persistence", "Data modelling", "Business rules", "CLI design", "Unit testing", "STL"],
    language: "cpp",
    functionalRequirements: [
      "Add, edit and remove books in the catalog",
      "Register members with a borrowing limit",
      "Issue loans with a due date 14 days out",
      "Return books and compute overdue fines",
      "Reserve a book that is currently on loan",
      "Search the catalog by title, author or ISBN",
      "Generate reports: most borrowed books, overdue loans, fines owed",
      "Persist all data to files between runs"
    ],
    nonFunctionalRequirements: [
      "Data survives restarts without loss",
      "A member cannot borrow beyond their limit",
      "Fines are computed exactly to the cent",
      "Search works across 10,000 books quickly",
      "Invalid input never crashes the program"
    ],
    architecture: "The system is organised around Book, Member and Loan classes, with a Library class holding the catalog, members and loans in vectors and maps, and enforcing the borrowing rules. Persistence is a simple text or JSON-lines format: the library saves its state to files on exit and loads it on startup. A command-line interface parses commands and calls the library, and reports are computed by iterating the collections with STL algorithms.",
    databaseSchema: "",
    apis: [
      "CLI: add-book, list-books, search <query>",
      "CLI: add-member, list-members",
      "CLI: borrow <member> <book> — issue a loan",
      "CLI: return <member> <book> — return and show any fine",
      "CLI: reserve <member> <book>",
      "CLI: report overdue | popular | fines",
      "CLI: save, load — persistence commands"
    ],
    fileStructure: "library/\n  CMakeLists.txt\n  src/\n    main.cpp\n    book.h\n    book.cpp\n    member.h\n    member.cpp\n    loan.h\n    loan.cpp\n    library.h\n    library.cpp\n    storage.h\n    storage.cpp\n  data/books.txt\n  data/members.txt\n  tests/test_library.cpp\n  README.md",
    taskBreakdown: [
      "Design the Book, Member and Loan classes",
      "Implement the catalog with search",
      "Implement members and borrowing limits",
      "Implement loans, returns and fines",
      "Implement reservations",
      "Add file persistence",
      "Add reports",
      "Write tests and polish the CLI"
    ],
    milestones: [
      {
        id: "proj-library-management-m1", order: 1, title: "Catalog and search",
        objectives: ["Model books", "Add and list books", "Search by title, author or ISBN"],
        instructions: "Create a Book class with title, author, ISBN, copies and available count, and a Library class holding the catalog in a vector. Implement add, edit and remove, plus search that matches a query against title, author or ISBN case-insensitively, and list the catalog sorted by title.",
        concepts: ["Classes", "Vectors", "String search", "Sorting"],
        hints: ["Use std::find_if for searches.", "ISBN is the unique key — reject duplicates.", "Keep the CLI thin and put logic in Library."],
        acceptanceCriteria: ["Books can be added and listed", "Search finds by author and ISBN", "Duplicate ISBNs are rejected"],
        tests: ["Add five books and list them", "Search by partial title", "Add a duplicate ISBN"]
      },
      {
        id: "proj-library-management-m2", order: 2, title: "Members and loans",
        objectives: ["Register members", "Issue loans", "Enforce borrowing limits"],
        instructions: "Add a Member class with a borrowing limit of 5 books, and a Loan class recording member, book, issue date and due date 14 days later. Borrowing checks the member exists, is under their limit, and a copy is available, then decrements availability. Returning a book restores availability.",
        concepts: ["Associations", "Borrowing limits", "Date arithmetic"],
        hints: ["Use std::chrono for dates.", "Check all rules before changing any state.", "A loan is active until it is returned."],
        acceptanceCriteria: ["A member can borrow up to 5 books", "The sixth borrow is refused", "Returning restores availability"],
        tests: ["Borrow 5 books, try a sixth", "Return one and borrow again", "Borrow a book with no copies left"]
      },
      {
        id: "proj-library-management-m3", order: 3, title: "Fines and reservations",
        objectives: ["Compute overdue fines", "Reserve loaned books", "Notify on availability"],
        instructions: "On return, compute the fine as 0.50 per day overdue, rounded to the cent, and record it on the member's account. Add reservations: a member can reserve a book with no available copies, and when a copy is returned the first reserver is notified and the book is held for them for 3 days.",
        concepts: ["Fine calculation", "Queues", "Reservation holds"],
        hints: ["Fines are integer cents internally.", "Reservations are a FIFO queue per book.", "A held book is not available to others."],
        acceptanceCriteria: ["A 4-day overdue return fines 2.00", "Reservations queue in order", "A held book cannot be borrowed by others"],
        tests: ["Return a book 4 days late", "Reserve a loaned book, return it, check the hold", "Borrow a held book as another member"]
      },
      {
        id: "proj-library-management-m4", order: 4, title: "Persistence and reports",
        objectives: ["Save and load state", "Report overdue loans", "Report popular books and fines"],
        instructions: "Persist books, members, loans, reservations and fines to files on exit and reload them on startup, verifying a restart loses nothing. Add reports: overdue loans with days late, most-borrowed books, and total fines owed per member, each printable from the CLI.",
        concepts: ["File I/O", "Serialisation", "Reporting"],
        hints: ["Write to a temp file then rename for atomic saves.", "Count loans per book for popularity.", "Test persistence by restarting."],
        acceptanceCriteria: ["Data survives a restart", "Overdue report lists late loans", "Popular-books report is correct"],
        tests: ["Add data, quit, restart, list everything", "Generate each report", "Corrupt a data file and check the error"]
      }
    ],
    reviewChecklist: ["Borrowing limits and availability are enforced", "Fines are exact", "Reservations queue fairly", "Persistence survives restarts", "Reports match the data", "README documents every command"],
    finalAssessment: ["Add books and members, then borrow and return", "Show an overdue fine being computed", "Reserve a loaned book and show the hold", "Restart and show data intact", "Generate all three reports"]
  },
  {
    id: "proj-hospital-management",
    slug: "hospital-management",
    level: 4,
    title: "Hospital Management System",
    description: "Build a hospital management system in TypeScript covering patients, admissions, staff scheduling, billing, pharmacy stock and reporting. It is a capstone-scale project that ties together scheduling, inventory, money and role-based access in one coherent system.",
    skills: ["TypeScript", "Role-based access", "Scheduling", "Billing", "Inventory", "Reporting", "Express", "PostgreSQL"],
    language: "typescript",
    functionalRequirements: [
      "Register patients with demographics and medical history",
      "Admit patients to wards and beds, and discharge them",
      "Schedule doctors and nurses on shifts",
      "Record consultations, diagnoses and prescriptions",
      "Bill patients for services, room charges and pharmacy items",
      "Manage pharmacy stock with low-stock alerts",
      "Generate reports: occupancy, revenue, admissions by department",
      "Enforce role-based access for admin, doctor, nurse and billing staff"
    ],
    nonFunctionalRequirements: [
      "A bed is never assigned to two patients at once",
      "Billing totals are exact to the cent",
      "Patient records are visible only to authorised roles",
      "Pharmacy stock never goes negative",
      "The system handles 500 concurrent users in a ward view"
    ],
    architecture: "An Express and TypeScript API backed by PostgreSQL models patients, admissions, beds, staff, shifts, consultations, prescriptions, bills and pharmacy stock as separate modules sharing one database pool. Bed assignment and pharmacy dispensing run inside transactions with row locks so inventory can never double-book or go negative. Billing is a pure calculation over an admission's services, room days and dispensed items, and every module checks the caller's role through middleware before touching data. Reports are SQL aggregations over the same tables.",
    databaseSchema: "patients(id UUID PK, name TEXT, dob DATE, blood_group TEXT, allergies TEXT); beds(id UUID PK, ward TEXT, bed_number TEXT, status TEXT); admissions(id UUID PK, patient_id UUID, bed_id UUID, admitted_at TIMESTAMPTZ, discharged_at TIMESTAMPTZ, department TEXT); staff(id UUID PK, name TEXT, role TEXT, department TEXT); shifts(id UUID PK, staff_id UUID, starts_at TIMESTAMPTZ, ends_at TIMESTAMPTZ); consultations(id UUID PK, admission_id UUID, doctor_id UUID, diagnosis TEXT, notes TEXT); prescriptions(id UUID PK, consultation_id UUID, drug TEXT, qty INTEGER); bills(id UUID PK, admission_id UUID, total_cents INTEGER, status TEXT); pharmacy(id UUID PK, drug TEXT, stock INTEGER, reorder_level INTEGER)",
    apis: [
      "POST /api/patients — register a patient",
      "POST /api/admissions — admit to a bed",
      "POST /api/admissions/:id/discharge — discharge and finalise the bill",
      "POST /api/consultations — record a consultation",
      "POST /api/prescriptions — prescribe and dispense from pharmacy",
      "GET /api/bills/:admissionId — itemised bill",
      "GET /api/pharmacy — stock levels and low-stock alerts",
      "GET /api/reports/occupancy | /revenue | /admissions",
      "POST /api/shifts — schedule staff"
    ],
    fileStructure: "hospital/\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    db.ts\n    auth.ts\n    patients.ts\n    admissions.ts\n    beds.ts\n    staff.ts\n    billing.ts\n    pharmacy.ts\n    reports.ts\n  migrations/001_init.sql\n  tests/\n    admissions.test.ts\n    billing.test.ts\n  README.md",
    taskBreakdown: [
      "Design the schema and roles",
      "Implement patients and bed management",
      "Implement admissions and discharge",
      "Implement staff shifts",
      "Implement consultations and prescriptions",
      "Implement pharmacy stock control",
      "Implement billing",
      "Add reports and access-control tests"
    ],
    milestones: [
      {
        id: "proj-hospital-management-m1", order: 1, title: "Patients, beds and admissions",
        objectives: ["Register patients", "Manage beds", "Admit and discharge"],
        instructions: "Build patient registration with demographics and allergies, and a bed inventory per ward with status. Admission assigns a free bed inside a transaction with a row lock, records the department and time, and discharge frees the bed and stamps the discharge time. A bed in use cannot be assigned again.",
        concepts: ["Row locking", "Transactions", "Bed inventory"],
        hints: ["Lock the bed row with SELECT FOR UPDATE.", "Admission and bed status change in one transaction.", "Discharge must free the bed even if billing fails — handle it carefully."],
        acceptanceCriteria: ["A patient can be admitted to a free bed", "The same bed cannot be double-assigned", "Discharge frees the bed"],
        tests: ["Admit two patients to the same bed concurrently", "Discharge and re-admit to the freed bed", "Admit to a non-existent bed"]
      },
      {
        id: "proj-hospital-management-m2", order: 2, title: "Staff shifts and consultations",
        objectives: ["Schedule shifts", "Record consultations", "Prevent shift overlaps"],
        instructions: "Add staff with roles and departments, and shift scheduling that rejects overlapping shifts for the same person. Doctors record consultations against an admission with diagnosis and notes, and nurses can view but not edit a doctor's consultation. Only staff on shift can record a consultation.",
        concepts: ["Shift scheduling", "Overlap detection", "Role checks"],
        hints: ["Overlap is start < other end AND end > other start.", "Check the doctor is on shift at the consultation time.", "Consultations are append-only."],
        acceptanceCriteria: ["Overlapping shifts are rejected", "A consultation records correctly", "A nurse cannot edit a consultation"],
        tests: ["Schedule overlapping shifts", "Record a consultation off-shift", "Edit a consultation as a nurse"]
      },
      {
        id: "proj-hospital-management-m3", order: 3, title: "Pharmacy and prescriptions",
        objectives: ["Track drug stock", "Dispense on prescription", "Alert on low stock"],
        instructions: "Implement the pharmacy inventory with stock levels and reorder points, and dispensing that decrements stock inside a transaction, refusing when stock would go negative. Prescriptions link a consultation to a drug and quantity, and a low-stock report lists every drug at or below its reorder level.",
        concepts: ["Inventory control", "Stock transactions", "Reorder levels"],
        hints: ["Decrement with a guarded UPDATE ... WHERE stock >= qty.", "Check the affected row count to detect insufficient stock.", "Log every dispensing."],
        acceptanceCriteria: ["Dispensing reduces stock correctly", "Dispensing more than stock is refused", "Low-stock drugs appear in the report"],
        tests: ["Dispense 5 of 10 units", "Dispense 20 of 10 units", "Check the low-stock report"]
      },
      {
        id: "proj-hospital-management-m4", order: 4, title: "Billing and reports",
        objectives: ["Bill admissions item by item", "Generate reports", "Enforce role access"],
        instructions: "Build billing as a pure calculation over an admission: room charges per day, consultation fees and dispensed pharmacy items, summed in integer cents into an itemised bill on discharge. Add reports for ward occupancy, revenue by department and admissions over time, and write an access-control test matrix covering admin, doctor, nurse and billing roles on every route.",
        concepts: ["Itemised billing", "SQL aggregation", "Authorization matrix"],
        hints: ["Room days are ceil of the stay length.", "Compute the bill from source rows, never from a stored total alone.", "Test every role on every route."],
        acceptanceCriteria: ["A bill matches hand-computed charges", "Occupancy report matches bed state", "No role can access data outside its scope"],
        tests: ["Admit, consult, dispense, discharge and reconcile the bill", "Check occupancy after admissions", "Run the role matrix tests"]
      }
    ],
    reviewChecklist: ["Beds are never double-assigned", "Pharmacy stock never goes negative", "Bills reconcile to source charges", "Shift overlaps are impossible", "Role access is enforced everywhere", "Reports match the underlying data"],
    finalAssessment: ["Admit a patient and show the bed assigned", "Record a consultation and dispense a prescription", "Discharge and reconcile the itemised bill", "Show pharmacy low-stock alerts", "Show occupancy and revenue reports"]
  },
  {
    id: "proj-elearning-platform",
    slug: "elearning-platform",
    level: 3,
    title: "E-Learning Platform",
    description: "Build an e-learning platform in TypeScript with courses, lessons, quizzes, progress tracking, certificates and instructor tools. It covers the learner journey from enrolment to a verifiable certificate, and the instructor side of publishing and grading.",
    skills: ["TypeScript", "Course design", "Quizzes", "Progress tracking", "Certificates", "Authentication", "Express", "SQLite"],
    language: "typescript",
    functionalRequirements: [
      "Instructors create courses with lessons and quizzes",
      "Learners enrol and track progress per lesson",
      "Quizzes auto-grade with immediate feedback",
      "Certificates are issued on course completion",
      "Instructors see enrolment and completion analytics",
      "Learners can leave reviews and ratings",
      "Courses support draft and published states",
      "Learners resume exactly where they left off"
    ],
    nonFunctionalRequirements: [
      "Progress updates are idempotent",
      "A certificate is issued only when all requirements are met",
      "Quiz grading is deterministic",
      "Draft courses are invisible to learners",
      "The course page loads in under 500 ms"
    ],
    architecture: "An Express and TypeScript API with SQLite stores users, courses, lessons, quizzes, enrolments, progress, attempts and certificates. Progress is a row per learner per lesson, updated idempotently, and completion is derived from progress plus quiz pass marks rather than a stored flag. Certificates are generated as signed records with a verification code when completion is detected, and instructor analytics are SQL aggregations over enrolments and attempts.",
    databaseSchema: "users(id INTEGER PK, name TEXT, email TEXT UNIQUE, role TEXT); courses(id INTEGER PK, instructor_id INTEGER, title TEXT, description TEXT, status TEXT); lessons(id INTEGER PK, course_id INTEGER, title TEXT, content TEXT, order_index INTEGER); quizzes(id INTEGER PK, lesson_id INTEGER, pass_mark INTEGER); questions(id INTEGER PK, quiz_id INTEGER, text TEXT, options TEXT, answer INTEGER); enrolments(id INTEGER PK, user_id INTEGER, course_id INTEGER, enrolled_at TEXT); progress(id INTEGER PK, user_id INTEGER, lesson_id INTEGER, completed INTEGER, updated_at TEXT); certificates(id INTEGER PK, user_id INTEGER, course_id INTEGER, code TEXT UNIQUE, issued_at TEXT)",
    apis: [
      "POST /api/courses — instructor creates a course",
      "POST /api/courses/:id/publish — publish a draft",
      "GET /api/courses — browse published courses",
      "POST /api/courses/:id/enrol — enrol as a learner",
      "POST /api/lessons/:id/complete — mark a lesson complete",
      "POST /api/quizzes/:id/attempt — submit answers, get a score",
      "GET /api/courses/:id/progress — learner progress",
      "GET /api/certificates/:code — verify a certificate",
      "GET /api/instructor/analytics — enrolment and completion stats"
    ],
    fileStructure: "elearning/\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    db.ts\n    auth.ts\n    courses.ts\n    lessons.ts\n    quizzes.ts\n    progress.ts\n    certificates.ts\n    analytics.ts\n  tests/\n    quizzes.test.ts\n    progress.test.ts\n  README.md",
    taskBreakdown: [
      "Design the schema and roles",
      "Implement course and lesson authoring",
      "Implement enrolment and progress",
      "Implement quizzes with auto-grading",
      "Implement completion and certificates",
      "Add reviews and ratings",
      "Build instructor analytics",
      "Test the full learner journey"
    ],
    milestones: [
      {
        id: "proj-elearning-platform-m1", order: 1, title: "Courses and lessons",
        objectives: ["Author courses", "Order lessons", "Publish and draft"],
        instructions: "Implement course creation with title and description, lessons with ordered content, and a draft-to-published workflow. Learners can browse only published courses, while instructors see their drafts. Lesson content is stored as Markdown and rendered on the course page.",
        concepts: ["Content modelling", "Ordering", "Publish workflow"],
        hints: ["Order lessons with an explicit order_index.", "Draft courses return 404 for learners.", "Validate that a course has at least one lesson before publishing."],
        acceptanceCriteria: ["A draft is invisible to learners", "Publishing makes it browsable", "Lessons appear in order"],
        tests: ["Create a draft and browse as a learner", "Publish and browse again", "Reorder two lessons"]
      },
      {
        id: "proj-elearning-platform-m2", order: 2, title: "Enrolment and progress",
        objectives: ["Enrol learners", "Track lesson completion", "Resume where left off"],
        instructions: "Add enrolment with one row per learner per course, and progress rows per lesson that are set idempotently — marking a lesson complete twice changes nothing. The course page returns the learner's next incomplete lesson so they can resume, and progress percentage is derived from completed over total lessons.",
        concepts: ["Idempotent updates", "Derived progress", "Resume position"],
        hints: ["Use INSERT OR IGNORE for progress rows.", "Progress percent is computed, not stored.", "Enrolment is required before any progress."],
        acceptanceCriteria: ["Enrolling twice creates one enrolment", "Completing a lesson twice is a no-op", "Resume points at the next lesson"],
        tests: ["Enrol twice", "Complete the same lesson twice", "Complete half the lessons and check percent"]
      },
      {
        id: "proj-elearning-platform-m3", order: 3, title: "Quizzes and grading",
        objectives: ["Author quiz questions", "Auto-grade attempts", "Enforce pass marks"],
        instructions: "Let instructors attach a quiz with multiple-choice questions and a pass mark to a lesson. Attempts submit answers, are graded deterministically against stored answers, and return the score with per-question feedback. A lesson with a quiz counts as complete only when an attempt passes.",
        concepts: ["Auto-grading", "Pass marks", "Feedback"],
        hints: ["Never send correct answers to the client before submission.", "Store attempts for analytics.", "Allow retakes but keep the best score."],
        acceptanceCriteria: ["A perfect attempt scores 100%", "A failing attempt does not complete the lesson", "Feedback names the wrong questions"],
        tests: ["Submit all correct answers", "Submit all wrong answers", "Retake and check the best score is kept"]
      },
      {
        id: "proj-elearning-platform-m4", order: 4, title: "Certificates, reviews and analytics",
        objectives: ["Issue certificates on completion", "Verify certificates", "Show instructor analytics"],
        instructions: "When a learner completes every lesson and passes every quiz, issue a certificate with a unique verification code and an issued date. Add a public verification endpoint that resolves a code to the learner, course and date. Add reviews with ratings, and an instructor analytics page with enrolments, completion rate and average quiz scores.",
        concepts: ["Certificates", "Verification codes", "Analytics"],
        hints: ["Generate codes with a random, unguessable format.", "Completion is checked at issue time, not assumed.", "Completion rate is completers over enrolments."],
        acceptanceCriteria: ["A certificate appears only after full completion", "Verification resolves the code", "Analytics match the raw data"],
        tests: ["Complete a course and check for a certificate", "Verify the code publicly", "Check analytics after several enrolments"]
      }
    ],
    reviewChecklist: ["Drafts stay hidden from learners", "Progress is idempotent and derived", "Quizzes grade deterministically", "Certificates require full completion", "Verification works publicly", "README documents the learner and instructor journeys"],
    finalAssessment: ["Create and publish a course as an instructor", "Enrol, complete lessons and pass a quiz as a learner", "Show resume working mid-course", "Issue and verify a certificate", "Show instructor analytics"]
  },
  {
    id: "proj-code-review-tool",
    slug: "code-review-tool",
    level: 3,
    title: "Code Review Automation Tool",
    description: "Build a code review automation tool in Python that analyses diffs, runs style checks, posts review comments like a bot, and tracks review metrics. It gives a team the first pass of review automatically, so human reviewers spend their time on design, not formatting.",
    skills: ["Python", "Diff parsing", "Static analysis", "Style checks", "Git", "Webhooks", "Metrics", "SQLite"],
    language: "python",
    functionalRequirements: [
      "Parse unified diffs into files, hunks and changed lines",
      "Run style checks: line length, naming, unused imports",
      "Detect common issues: hardcoded secrets, TODOs, large functions",
      "Post inline comments on changed lines",
      "Approve or request changes based on severity",
      "Track review metrics: time to first review, comment counts",
      "Receive pull-request webhooks and review automatically",
      "Support a configuration file for rules and thresholds"
    ],
    nonFunctionalRequirements: [
      "Reviews a 500-line diff in under 10 seconds",
      "Never comments on unchanged lines",
      "Secrets detection has no false negatives on test fixtures",
      "Configuration reloads without a restart",
      "All findings include file, line and a suggested fix"
    ],
    architecture: "The tool parses unified diffs into a structured model of files and hunks, then runs a pipeline of checkers — style, complexity, secrets and custom rules from a YAML config — each producing findings with file, line, severity and message. A reporter formats findings as inline review comments and a summary verdict, posting them through a simulated Git hosting API, while a webhook receiver triggers reviews on pull-request events. Metrics are stored in SQLite and aggregated into a dashboard of review turnaround and finding counts.",
    databaseSchema: "reviews(id INTEGER PK, pr_number INTEGER, repo TEXT, verdict TEXT, created_at TEXT); findings(id INTEGER PK, review_id INTEGER, file TEXT, line INTEGER, severity TEXT, rule TEXT, message TEXT); metrics are derived from reviews and findings",
    apis: [
      "POST /api/review — review a diff, returns findings and verdict",
      "POST /webhooks/pull-request — trigger a review on PR events",
      "GET /api/reviews/:id — review detail with findings",
      "GET /api/metrics — time to first review, findings by rule",
      "GET /api/rules — configured rules",
      "CLI: review diff.patch [--config rules.yaml]"
    ],
    fileStructure: "code-review/\n  main.py\n  requirements.txt\n  review/\n    __init__.py\n    diff_parser.py\n    checks.py\n    secrets.py\n    complexity.py\n    reporter.py\n    webhooks.py\n    store.py\n    metrics.py\n  rules.yaml\n  tests/\n    test_diff_parser.py\n    test_checks.py\n    test_secrets.py\n  README.md",
    taskBreakdown: [
      "Implement unified diff parsing",
      "Implement style checks",
      "Implement secrets and complexity checks",
      "Build the reporter and verdict logic",
      "Add the webhook receiver",
      "Add metrics and storage",
      "Add YAML rule configuration",
      "Test on real diffs"
    ],
    milestones: [
      {
        id: "proj-code-review-tool-m1", order: 1, title: "Diff parsing",
        objectives: ["Parse unified diffs", "Map findings to lines", "Handle new and deleted files"],
        instructions: "Write a parser for unified diffs that produces files, hunks and added lines with their new-file line numbers, handling new files, deleted files and renames. Verify it against real git diff output and confirm every added line maps to the correct line number.",
        concepts: ["Unified diff format", "Hunk headers", "Line mapping"],
        hints: ["Parse @@ headers for the starting line.", "Only added lines get comments.", "Test with a diff that adds, removes and modifies."],
        acceptanceCriteria: ["A real git diff parses correctly", "Added lines map to correct numbers", "New and deleted files are handled"],
        tests: ["Parse a sample diff and print the model", "Check line numbers against the file", "Parse a diff with a new file"]
      },
      {
        id: "proj-code-review-tool-m2", order: 2, title: "Style and complexity checks",
        objectives: ["Check line length and naming", "Measure function complexity", "Flag large functions"],
        instructions: "Implement style checks for line length over 100 characters, non-snake_case function names and unused imports, plus a complexity check that counts branches per function and flags anything over 10. Each finding records file, line, rule and a suggested fix, and checks run only on added lines.",
        concepts: ["AST parsing", "Cyclomatic complexity", "Style rules"],
        hints: ["Use Python's ast module for real analysis.", "Skip generated files by path.", "Keep each checker independent and testable."],
        acceptanceCriteria: ["A long line is flagged on the right line", "A complex function is flagged", "Unchanged lines produce no findings"],
        tests: ["Review a diff with a 120-character line", "Review a function with 12 branches", "Review a clean diff"]
      },
      {
        id: "proj-code-review-tool-m3", order: 3, title: "Secrets, verdicts and comments",
        objectives: ["Detect hardcoded secrets", "Post inline comments", "Decide a verdict"],
        instructions: "Add secrets detection with patterns for API keys, passwords and tokens, plus TODO and FIXME comments, and combine all findings into a verdict: request changes if any high-severity finding exists, comment otherwise, approve when clean. Format findings as inline comments with file, line and message, and post them through the simulated hosting API.",
        concepts: ["Regex patterns", "Severity", "Review verdicts"],
        hints: ["Test secrets detection against known fixtures.", "High severity blocks; low severity only comments.", "Include a fix suggestion in every comment."],
        acceptanceCriteria: ["A hardcoded key is flagged as high severity", "A clean diff is approved", "Comments land on the right lines"],
        tests: ["Review a diff containing an API key", "Review a clean diff", "Check comment placement"]
      },
      {
        id: "proj-code-review-tool-m4", order: 4, title: "Webhooks, config and metrics",
        objectives: ["Review on webhook", "Load rules from YAML", "Report review metrics"],
        instructions: "Add a webhook endpoint that validates the payload, fetches the PR diff and runs a review automatically, storing the result. Load rule thresholds from rules.yaml with reload on change, and build a metrics page showing time to first review, findings by rule and verdict distribution over the last 30 days.",
        concepts: ["Webhooks", "Configuration", "Review metrics"],
        hints: ["Verify the webhook signature if one is configured.", "Log every webhook delivery.", "Metrics are SQL aggregations."],
        acceptanceCriteria: ["A webhook triggers a review", "Editing rules.yaml changes behaviour", "Metrics match stored reviews"],
        tests: ["Send a PR webhook and check the review", "Change a threshold and re-review", "Check metrics after several reviews"]
      }
    ],
    reviewChecklist: ["Diff parsing is correct on real diffs", "Findings map to the right lines", "Secrets detection catches fixtures", "Verdicts follow severity rules", "Webhooks trigger reviews end to end", "README documents rules and configuration"],
    finalAssessment: ["Review a messy diff and explain the findings", "Show a secret being caught", "Show a clean diff being approved", "Trigger a review via webhook", "Show review metrics"]
  },
  {
    id: "proj-container-orchestrator",
    slug: "container-orchestrator",
    level: 4,
    title: "Container Orchestrator Lite",
    description: "Build a miniature container orchestrator in Go that schedules containers across nodes, health-checks them, restarts failures, provides service discovery and exposes a CLI. It is a hands-on way to learn the core ideas behind Kubernetes without the scale.",
    skills: ["Go", "Scheduling", "Health checking", "Service discovery", "CLI design", "Docker API", "State machines", "Concurrency"],
    language: "go",
    functionalRequirements: [
      "Accept service definitions with image, replicas and ports",
      "Schedule containers onto nodes by available CPU and memory",
      "Health-check containers and restart failed ones",
      "Provide DNS-style service discovery for service names",
      "Scale a service up or down on demand",
      "Roll out a new image version with a rolling update",
      "Expose service status and logs through a CLI",
      "Persist desired state so it survives a restart"
    ],
    nonFunctionalRequirements: [
      "A failed container restarts within 10 seconds",
      "Scheduling never over-commits a node",
      "Rolling updates never drop below one healthy replica",
      "Service discovery updates within 5 seconds of a change",
      "The CLI works against a local or remote control plane"
    ],
    architecture: "A Go control plane holds desired state in a JSON file and actual state in memory, reconciling the two in a loop: a scheduler assigns pending containers to the node with the most free resources, a worker on each node runs containers through the Docker API, and a health checker probes each container and marks failures for restart. Service discovery is a small DNS-like registry mapping service names to healthy container addresses, and a rolling update replaces replicas one at a time, waiting for each new container to become healthy before stopping the old one.",
    databaseSchema: "",
    apis: [
      "CLI: orch apply -f service.yaml — declare a service",
      "CLI: orch scale <service> <replicas>",
      "CLI: orch rollout <service> --image <tag>",
      "CLI: orch status — services, replicas, node usage",
      "CLI: orch logs <service> — container logs",
      "HTTP: GET /services — desired and actual state",
      "HTTP: GET /discovery/:service — healthy endpoints"
    ],
    fileStructure: "orchestrator/\n  go.mod\n  cmd/orch/main.go\n  cmd/agent/main.go\n  internal/\n    state/store.go\n    scheduler/scheduler.go\n    health/checker.go\n    discovery/registry.go\n    docker/runner.go\n    api/server.go\n  examples/web.yaml\n  README.md",
    taskBreakdown: [
      "Design the service spec and state model",
      "Implement the Docker runner",
      "Implement the scheduler",
      "Implement health checks and restarts",
      "Implement service discovery",
      "Implement scaling and rolling updates",
      "Build the CLI and API",
      "Test failure recovery end to end"
    ],
    milestones: [
      {
        id: "proj-container-orchestrator-m1", order: 1, title: "Service spec and Docker runner",
        objectives: ["Parse service specs", "Run containers via Docker", "Track container state"],
        instructions: "Define a service spec in YAML with image, replicas, ports and resource requests, and a runner that starts and stops containers through the Docker API, recording their ids and state. Verify you can apply a spec and see the container running with docker ps, then stop it cleanly.",
        concepts: ["Docker API", "Service specs", "Container lifecycle"],
        hints: ["Use the official Docker Go client.", "Label containers so the orchestrator can find its own.", "Handle Docker being unavailable with a clear error."],
        acceptanceCriteria: ["A spec starts the requested container", "Stopping removes it", "State records the container id"],
        tests: ["Apply a one-replica nginx spec", "Check docker ps", "Stop the service and confirm removal"]
      },
      {
        id: "proj-container-orchestrator-m2", order: 2, title: "Scheduler and scaling",
        objectives: ["Schedule by free resources", "Scale services", "Never over-commit"],
        instructions: "Implement a scheduler that places each replica on the node with the most free CPU and memory after its requests, refusing to schedule when no node fits. Add scaling: increasing replicas schedules more containers, decreasing stops the newest ones first. Persist desired state to disk.",
        concepts: ["Bin packing", "Resource requests", "Desired state"],
        hints: ["Track allocated resources per node in memory.", "Scaling down stops the youngest replica.", "Reconcile actual state towards desired state in a loop."],
        acceptanceCriteria: ["Replicas spread across nodes by capacity", "An oversized request is refused", "Scaling up and down works"],
        tests: ["Apply a 3-replica service on two nodes", "Request more CPU than any node has", "Scale from 1 to 4 and back to 2"]
      },
      {
        id: "proj-container-orchestrator-m3", order: 3, title: "Health checks and restarts",
        objectives: ["Probe container health", "Restart failures", "Back off on repeated failure"],
        instructions: "Add HTTP and TCP health checks per service, probed every 5 seconds, with a container marked unhealthy after three failures. Unhealthy containers are stopped and rescheduled, with exponential backoff between restarts so a crashing image does not loop forever, and restarts are logged.",
        concepts: ["Health probes", "Restart policy", "Exponential backoff"],
        hints: ["Health checks run in the control plane, not the container.", "Backoff caps at 60 seconds.", "A container that never becomes healthy stays in a failed state."],
        acceptanceCriteria: ["Killing a container triggers a restart within 10 seconds", "A crashing image backs off", "Health state is visible in status"],
        tests: ["Kill a running container and watch it return", "Run an image that exits immediately", "Check status shows the restart count"]
      },
      {
        id: "proj-container-orchestrator-m4", order: 4, title: "Discovery, rolling updates and CLI",
        objectives: ["Resolve service names", "Roll out new images", "Operate via CLI"],
        instructions: "Build a discovery registry mapping each service name to its healthy container addresses, updated on every state change, and a rolling update that replaces replicas one at a time, waiting for each new container to pass health checks before stopping the old one. Finish the CLI with apply, scale, rollout, status and logs commands.",
        concepts: ["Service discovery", "Rolling updates", "CLI design"],
        hints: ["Discovery must exclude unhealthy containers.", "Abort a rollout if the new image never becomes healthy.", "Logs stream from the Docker API."],
        acceptanceCriteria: ["Discovery returns only healthy endpoints", "A rollout keeps at least one healthy replica", "A bad image aborts the rollout"],
        tests: ["Query discovery during a rollout", "Roll out a new image version", "Roll out a broken image and check the old version still serves"]
      }
    ],
    reviewChecklist: ["Scheduling respects node capacity", "Failed containers restart with backoff", "Discovery is always current", "Rolling updates are safe", "Desired state survives a restart", "README explains the architecture and limits"],
    finalAssessment: ["Apply a service and show it running", "Kill a container and show recovery", "Scale the service and show placement", "Roll out a new image without downtime", "Show discovery and logs via the CLI"]
  },
  {
    id: "proj-blockchain-voting",
    slug: "blockchain-voting",
    level: 4,
    title: "Blockchain Voting System",
    description: "Build a blockchain-based voting system in Rust where votes are transactions in blocks linked by hashes, a simple consensus stub validates the chain, and anyone can audit the tally. It teaches hashing, chaining, validation and tamper-evidence through a concrete, meaningful application.",
    skills: ["Rust", "Hashing", "Blockchain", "Cryptography", "Consensus", "Data integrity", "CLI design", "Testing"],
    language: "rust",
    functionalRequirements: [
      "Register voters with a unique id and eligibility check",
      "Cast a vote as a signed transaction",
      "Append votes to blocks linked by previous hash",
      "Validate the full chain and detect tampering",
      "Prevent double voting",
      "Tally votes per candidate with an audit trail",
      "Support a simple proof-of-work consensus stub",
      "Export the chain and tally for independent verification"
    ],
    nonFunctionalRequirements: [
      "A tampered block is always detected by validation",
      "A voter can vote exactly once",
      "Votes are anonymous in the tally but verifiable as cast",
      "Chain validation runs in linear time",
      "No vote is lost when a block is added"
    ],
    architecture: "A Rust binary models transactions as votes with voter id, candidate and a signature, grouped into blocks that store a timestamp, transactions, previous hash and a nonce. Block hashes are SHA-256 over the serialised contents, and a proof-of-work stub requires the hash to start with a configurable number of zeroes. The chain is held in memory and persisted to a JSON file, validation recomputes every hash and link, and the tally counts votes per candidate while rejecting any vote from a voter who already appears in the chain.",
    databaseSchema: "",
    apis: [
      "CLI: vote register <voter-id> — register an eligible voter",
      "CLI: vote cast <voter-id> <candidate> — cast a vote",
      "CLI: vote mine — seal pending votes into a block",
      "CLI: vote tally — count votes per candidate",
      "CLI: vote validate — verify the whole chain",
      "CLI: vote export — write the chain to JSON",
      "HTTP: GET /chain, GET /tally, POST /vote (optional API)"
    ],
    fileStructure: "blockchain-voting/\n  Cargo.toml\n  src/\n    main.rs\n    block.rs\n    chain.rs\n    transaction.rs\n    wallet.rs\n    consensus.rs\n    store.rs\n  tests/\n    chain_test.rs\n  README.md",
    taskBreakdown: [
      "Design the block and transaction models",
      "Implement hashing and chaining",
      "Implement voter registration and double-vote prevention",
      "Implement mining with proof-of-work",
      "Implement chain validation",
      "Implement tallying and export",
      "Add the CLI",
      "Test tampering detection"
    ],
    milestones: [
      {
        id: "proj-blockchain-voting-m1", order: 1, title: "Blocks, hashes and chaining",
        objectives: ["Model blocks", "Hash block contents", "Link blocks by hash"],
        instructions: "Create Block and Transaction types in Rust, with each block holding a timestamp, transactions, previous hash and nonce. Compute the block hash as SHA-256 over the serialised block contents, and build a chain where each block's previous hash equals the prior block's hash, starting from a genesis block.",
        concepts: ["SHA-256", "Hash chaining", "Genesis block", "Serialisation"],
        hints: ["Use the sha2 crate.", "Hash a deterministic serialisation, not debug output.", "The genesis block has a previous hash of all zeroes."],
        acceptanceCriteria: ["Blocks link correctly", "Changing a block changes its hash", "The genesis block exists"],
        tests: ["Create three blocks and check the links", "Modify a block and check the hash changes", "Serialise and reload the chain"]
      },
      {
        id: "proj-blockchain-voting-m2", order: 2, title: "Voting and double-vote prevention",
        objectives: ["Register voters", "Cast votes", "Reject double votes"],
        instructions: "Add voter registration with unique ids, and vote casting that creates a signed transaction — a hash of voter id plus candidate signed with a simple key — held in a pending pool. Before accepting a vote, check the voter has no vote in the chain or the pending pool, and reject duplicates with a clear error.",
        concepts: ["Digital signatures", "Pending pool", "Double-spend prevention"],
        hints: ["Check both the chain and the pending pool.", "A vote is a transaction, not a direct tally increment.", "Keep voter ids separate from the public tally."],
        acceptanceCriteria: ["A registered voter can vote once", "A second vote is rejected", "Unregistered voters cannot vote"],
        tests: ["Register and vote", "Vote twice with the same id", "Vote with an unknown id"]
      },
      {
        id: "proj-blockchain-voting-m3", order: 3, title: "Mining and validation",
        objectives: ["Mine blocks with proof-of-work", "Validate the chain", "Detect tampering"],
        instructions: "Implement mining: a miner takes pending votes, builds a block and searches for a nonce whose hash starts with the required number of zeroes, then appends it. Implement full validation that recomputes every hash, checks every link, verifies the proof-of-work and confirms no voter appears twice, returning the first invalid block on failure.",
        concepts: ["Proof-of-work", "Nonce search", "Chain validation"],
        hints: ["Start with a low difficulty for fast tests.", "Validation must recompute, never trust stored hashes.", "Test tampering by editing a stored block."],
        acceptanceCriteria: ["Mining seals pending votes into a block", "A valid chain validates", "Editing any block fails validation"],
        tests: ["Mine a block and validate", "Tamper with a vote and validate", "Tamper with a previous hash and validate"]
      },
      {
        id: "proj-blockchain-voting-m4", order: 4, title: "Tally, audit and export",
        objectives: ["Tally votes per candidate", "Export the chain", "Allow independent verification"],
        instructions: "Implement tallying that counts votes per candidate from the validated chain only, and export the chain to JSON so anyone can re-run validation and tallying independently. Add a CLI that runs register, cast, mine, tally and validate end to end, and document how an auditor verifies the result.",
        concepts: ["Tallying", "Auditability", "Export formats"],
        hints: ["Tally only after validation passes.", "Export includes all hashes and signatures.", "Document the verification steps in the README."],
        acceptanceCriteria: ["Tally matches hand-counted votes", "Exported chain validates independently", "The CLI runs the full election"],
        tests: ["Run a 10-voter election and tally", "Export, reload and re-validate", "Follow the README audit steps"]
      }
    ],
    reviewChecklist: ["Hashes chain correctly", "Double voting is impossible", "Tampering is always detected", "Tally is derived from the validated chain", "Proof-of-work difficulty is configurable", "README explains the audit process"],
    finalAssessment: ["Register voters and cast votes", "Mine blocks and show the chain", "Tamper with a block and show validation failing", "Tally the election and export the chain", "Verify the exported chain independently"]
  },
  {
    id: "proj-game-leaderboard",
    slug: "game-leaderboard",
    level: 2,
    title: "Game Leaderboard Service",
    description: "Build a game leaderboard service in Go that records scores, ranks players, runs seasons, applies basic anti-cheat checks and serves player profiles. It is a fast, focused backend service of the kind every multiplayer game needs.",
    skills: ["Go", "Sorted sets", "Rankings", "REST APIs", "Anti-cheat", "Redis", "Caching", "Testing"],
    language: "go",
    functionalRequirements: [
      "Submit a score for a player and game mode",
      "Return the top N players with ranks",
      "Return a player's rank and neighbours",
      "Support seasons with start and end dates",
      "Apply anti-cheat checks: score caps, rate limits, replay detection",
      "Serve player profiles with stats and history",
      "Reset and archive a season",
      "Expose score submission with an API key"
    ],
    nonFunctionalRequirements: [
      "Leaderboard reads return in under 50 ms for 100,000 players",
      "Score submission is idempotent per match id",
      "Impossible scores are rejected, never stored",
      "Ranks are consistent during concurrent submissions",
      "Season rollover preserves history"
    ],
    architecture: "A Go service stores scores in Redis sorted sets — one per game mode and season — so top-N and rank lookups are single commands, with player profiles and score history in PostgreSQL. Score submission validates the API key, checks the score against per-mode caps and a per-player rate limit, and rejects duplicate match ids before writing. Seasons are a configuration table; rollover archives the old sorted set and starts a fresh one, and the API serves ranks from Redis with profile data joined from the database.",
    databaseSchema: "players(id UUID PK, username TEXT UNIQUE, created_at TIMESTAMPTZ); scores(id UUID PK, player_id UUID, mode TEXT, season TEXT, score INTEGER, match_id TEXT UNIQUE, created_at TIMESTAMPTZ); seasons(id TEXT PK, starts_at TIMESTAMPTZ, ends_at TIMESTAMPTZ, archived INTEGER)",
    apis: [
      "POST /api/scores — submit a score (API key, match id)",
      "GET /api/leaderboard?mode=&season=&limit= — top players",
      "GET /api/players/:id/rank?mode= — rank and neighbours",
      "GET /api/players/:id — profile with stats and history",
      "POST /api/seasons — create a season",
      "POST /api/seasons/:id/archive — archive and roll over",
      "GET /api/seasons/current — current season"
    ],
    fileStructure: "game-leaderboard/\n  go.mod\n  cmd/server/main.go\n  internal/\n    scores/service.go\n    scores/anticheat.go\n    leaderboard/leaderboard.go\n    players/store.go\n    seasons/seasons.go\n    api/handlers.go\n  migrations/001_init.sql\n  README.md",
    taskBreakdown: [
      "Design the schema and Redis layout",
      "Implement score submission with validation",
      "Implement leaderboard reads from sorted sets",
      "Add player rank and profiles",
      "Implement seasons and rollover",
      "Add anti-cheat checks",
      "Add API-key auth",
      "Load-test the leaderboard"
    ],
    milestones: [
      {
        id: "proj-game-leaderboard-m1", order: 1, title: "Scores and leaderboard",
        objectives: ["Submit scores", "Rank players", "Return top N"],
        instructions: "Set up Redis sorted sets keyed by mode and season, and implement score submission that adds the player's best score for the mode. Add a top-N endpoint using ZREVRANGE with scores, and verify ranking order with a handful of known players.",
        concepts: ["Redis sorted sets", "ZREVRANGE", "Best score"],
        hints: ["Use ZADD with the score as the member score.", "Keep only the best score per player per mode.", "Test with 100 players to see ordering."],
        acceptanceCriteria: ["Top N returns players in score order", "A better score replaces a worse one", "A worse score does not lower the rank"],
        tests: ["Submit scores for five players and read the board", "Improve one score and check the new order", "Submit a worse score and confirm no change"]
      },
      {
        id: "proj-game-leaderboard-m2", order: 2, title: "Ranks and profiles",
        objectives: ["Return a player's rank", "Show neighbours", "Serve profiles"],
        instructions: "Add a rank endpoint using ZREVRANK plus a window of neighbours above and below the player, and a profile endpoint joining the player's rank, best scores per mode and recent match history from PostgreSQL. Handle players who have never played with a clear not-ranked response.",
        concepts: ["ZREVRANK", "Neighbour windows", "Profile aggregation"],
        hints: ["Ranks are 1-based for display, 0-based in Redis.", "Neighbours are a range around the rank.", "Cache profiles briefly, not ranks."],
        acceptanceCriteria: ["Rank is correct for a known player", "Neighbours are the right players", "An unranked player gets a clear response"],
        tests: ["Check the rank of the 3rd player", "Check neighbours of a mid-table player", "Fetch a profile for a new player"]
      },
      {
        id: "proj-game-leaderboard-m3", order: 3, title: "Seasons",
        objectives: ["Create seasons", "Scope boards by season", "Archive and roll over"],
        instructions: "Add seasons with start and end dates, scope every sorted set by season, and implement rollover: archiving copies the final board to PostgreSQL, then a new season starts empty. The current-season endpoint returns the active season, and old seasons remain readable.",
        concepts: ["Season scoping", "Archiving", "Rollover"],
        hints: ["Key sorted sets with the season id.", "Archive before starting the new season.", "Reject submissions to an archived season."],
        acceptanceCriteria: ["Boards differ per season", "Rollover preserves the old board", "New season starts empty"],
        tests: ["Submit scores in season 1, roll over, check season 2 is empty", "Read the archived season 1 board", "Submit to the archived season"]
      },
      {
        id: "proj-game-leaderboard-m4", order: 4, title: "Anti-cheat and auth",
        objectives: ["Cap impossible scores", "Rate-limit submissions", "Reject duplicate matches"],
        instructions: "Add anti-cheat: reject scores above a per-mode cap, rate-limit each player to 10 submissions per minute, and reject a match id that was already submitted. Require an API key per game client, log every rejection with a reason, and expose a simple admin view of rejected submissions.",
        concepts: ["Score caps", "Rate limiting", "Idempotency", "API keys"],
        hints: ["Caps are per mode, configured in code.", "Use the match id unique constraint for idempotency.", "Log rejections — they are your audit trail."],
        acceptanceCriteria: ["An impossible score is rejected", "Rapid submissions are rate-limited", "A duplicate match id is rejected"],
        tests: ["Submit a score above the cap", "Submit 20 scores in a minute", "Submit the same match id twice"]
      }
    ],
    reviewChecklist: ["Rankings are correct and fast", "Seasons isolate and archive correctly", "Anti-cheat rejects bad scores", "Duplicate submissions are idempotent", "Profiles show correct stats", "README documents modes, caps and seasons"],
    finalAssessment: ["Submit scores and show the leaderboard", "Show a player's rank and neighbours", "Roll over a season and show the archive", "Demonstrate an anti-cheat rejection", "Show a player profile"]
  },
  {
    id: "proj-email-marketing",
    slug: "email-marketing",
    level: 3,
    title: "Email Marketing Platform",
    description: "Build an email marketing platform in Python with subscriber lists, campaigns, templates, open and click tracking, bounce handling and analytics. It covers the full lifecycle of an email campaign from list building to measuring what worked.",
    skills: ["Python", "Email", "Templates", "Tracking", "Analytics", "Segmentation", "SMTP", "SQLite"],
    language: "python",
    functionalRequirements: [
      "Manage subscriber lists with signup and unsubscribe",
      "Segment subscribers by tags and fields",
      "Create campaigns from templates with variables",
      "Send campaigns in batches with rate limiting",
      "Track opens and clicks per subscriber",
      "Handle bounces and suppress bounced addresses",
      "Show campaign analytics: sent, opened, clicked, bounced",
      "Support A/B testing of subject lines"
    ],
    nonFunctionalRequirements: [
      "Unsubscribed addresses never receive mail again",
      "Each subscriber receives a campaign at most once",
      "Sending is rate-limited to 100 emails per minute",
      "Tracking pixels and links are unique per recipient",
      "Analytics match the underlying event log"
    ],
    architecture: "A Flask API with SQLite stores lists, subscribers, segments, templates, campaigns and events, while a sender worker pulls queued sends in batches, renders each template with subscriber variables, and delivers through SMTP or a simulated provider. Opens are tracked with a unique pixel URL per recipient and clicks with a redirect endpoint that logs the click before forwarding. Bounces are recorded from provider webhooks and add the address to a suppression list that the sender checks before every send, and analytics are SQL aggregations over the event log.",
    databaseSchema: "lists(id INTEGER PK, name TEXT); subscribers(id INTEGER PK, list_id INTEGER, email TEXT UNIQUE, status TEXT, tags TEXT); campaigns(id INTEGER PK, list_id INTEGER, subject TEXT, template_id INTEGER, status TEXT, sent_at TEXT); sends(id INTEGER PK, campaign_id INTEGER, subscriber_id INTEGER, status TEXT); events(id INTEGER PK, send_id INTEGER, type TEXT, url TEXT, ts TEXT); suppressions(email TEXT PK, reason TEXT, ts TEXT)",
    apis: [
      "POST /api/lists/:id/subscribers — add a subscriber",
      "POST /api/subscribers/:id/unsubscribe — unsubscribe",
      "POST /api/campaigns — create a campaign from a template",
      "POST /api/campaigns/:id/send — queue the campaign",
      "GET /api/campaigns/:id/analytics — sent, opened, clicked, bounced",
      "GET /track/open/:token — tracking pixel",
      "GET /track/click/:token?url= — click redirect",
      "POST /webhooks/bounce — record a bounce",
      "POST /api/campaigns/:id/ab — A/B test two subjects"
    ],
    fileStructure: "email-marketing/\n  main.py\n  requirements.txt\n  emailer/\n    __init__.py\n    db.py\n    lists.py\n    templates.py\n    campaigns.py\n    sender.py\n    tracking.py\n    analytics.py\n  templates/welcome.html\n  tests/\n    test_campaigns.py\n    test_tracking.py\n  README.md",
    taskBreakdown: [
      "Design the schema and subscriber model",
      "Implement lists, segments and unsubscribe",
      "Implement templates with variables",
      "Implement campaign creation and sending",
      "Add open and click tracking",
      "Add bounce handling and suppression",
      "Add analytics and A/B testing",
      "Test the full campaign lifecycle"
    ],
    milestones: [
      {
        id: "proj-email-marketing-m1", order: 1, title: "Lists and subscribers",
        objectives: ["Manage lists", "Add subscribers", "Handle unsubscribe"],
        instructions: "Build list and subscriber management with email validation, duplicate prevention per list, tags for segmentation, and unsubscribe that sets status and records the time. An unsubscribed address must never be mailed again, even if re-added to the list.",
        concepts: ["Email validation", "Segmentation", "Unsubscribe handling"],
        hints: ["Validate with a simple regex plus a domain check.", "Unsubscribe is a status, not a delete.", "Segments are tag filters over subscribers."],
        acceptanceCriteria: ["Subscribers can be added and tagged", "Duplicates are rejected", "Unsubscribed addresses stay unsubscribed"],
        tests: ["Add a subscriber twice", "Unsubscribe then re-add", "Filter subscribers by tag"]
      },
      {
        id: "proj-email-marketing-m2", order: 2, title: "Templates and campaigns",
        objectives: ["Author templates", "Render variables", "Create campaigns"],
        instructions: "Add templates with {{name}} style variables rendered per subscriber, and campaign creation that picks a list, a template and a subject. Preview rendering for a sample subscriber before sending, and store the campaign in draft status until it is queued.",
        concepts: ["Template rendering", "Variables", "Draft workflow"],
        hints: ["Escape subscriber data in HTML.", "Preview with a real subscriber record.", "A campaign targets a segment, not just a whole list."],
        acceptanceCriteria: ["Variables render per subscriber", "Preview shows the rendered email", "Drafts are not sent"],
        tests: ["Render a template for two subscribers", "Preview a campaign", "Send a draft without queueing"]
      },
      {
        id: "proj-email-marketing-m3", order: 3, title: "Sending and tracking",
        objectives: ["Send in batches", "Track opens and clicks", "Rate-limit sends"],
        instructions: "Implement a sender worker that processes queued sends in batches of 50 at most 100 per minute, recording a send row per recipient so nobody receives a campaign twice. Embed a unique tracking pixel and rewrite links through a click endpoint that logs the click before redirecting, and verify events land in the log.",
        concepts: ["Batch sending", "Tracking pixels", "Click redirects", "Rate limiting"],
        hints: ["One send row per recipient is your dedup guarantee.", "Tokens must be unguessable.", "Rate-limit with a token bucket or a sleep."],
        acceptanceCriteria: ["Each subscriber receives the campaign once", "Opening records an open event", "Clicking records a click and redirects"],
        tests: ["Send a campaign to 10 subscribers", "Fetch the pixel and check the event", "Click a tracked link and check the event"]
      },
      {
        id: "proj-email-marketing-m4", order: 4, title: "Bounces, analytics and A/B tests",
        objectives: ["Suppress bounces", "Report analytics", "Run A/B tests"],
        instructions: "Add a bounce webhook that records the bounce and adds the address to the suppression list, which the sender checks before every send. Build campaign analytics from the event log — sent, delivered, opened, clicked and bounced rates — and add A/B testing that splits recipients between two subjects and reports the winner by open rate.",
        concepts: ["Suppression lists", "Funnel analytics", "A/B testing"],
        hints: ["A bounce suppresses future sends, not just this campaign.", "Rates are events over sends.", "A/B splits must be deterministic per subscriber."],
        acceptanceCriteria: ["A bounced address receives nothing further", "Analytics match the event log", "A/B results show a clear winner"],
        tests: ["Bounce an address then send again", "Check analytics after opens and clicks", "Run an A/B campaign and read the result"]
      }
    ],
    reviewChecklist: ["Unsubscribes and suppressions are honoured", "No duplicate sends", "Tracking events are accurate", "Analytics reconcile with the event log", "A/B tests split deterministically", "README documents the campaign lifecycle"],
    finalAssessment: ["Build a list and segment it", "Create and preview a campaign", "Send it and show delivery", "Open and click, then show the analytics", "Bounce an address and show suppression"]
  },
  {
    id: "proj-devops-dashboard",
    slug: "devops-dashboard",
    level: 3,
    title: "DevOps Dashboard",
    description: "Build a DevOps dashboard in TypeScript that shows CI/CD pipelines, deploy history, service health, incidents and on-call rotations in one place. It aggregates data from simulated providers into the single pane of glass an on-call engineer checks first.",
    skills: ["TypeScript", "Dashboards", "CI/CD", "Service health", "Incident management", "On-call", "Express", "WebSockets"],
    language: "typescript",
    functionalRequirements: [
      "Show pipeline runs with status, duration and commit",
      "Show deploy history per service with rollback",
      "Show service health from checks with uptime",
      "Track incidents with severity, status and timeline",
      "Show the current on-call rotation and schedule",
      "Alert the on-call engineer when an incident opens",
      "Filter everything by service and time range",
      "Provide a live view that updates without refresh"
    ],
    nonFunctionalRequirements: [
      "Dashboard loads in under 1 second",
      "Live updates arrive within 5 seconds of a change",
      "Incident timelines are append-only",
      "A rollback restores the previous deploy",
      "Health data is retained for 30 days"
    ],
    architecture: "An Express and TypeScript API aggregates simulated CI, deploy and health providers into a single SQLite store, with a WebSocket hub pushing updates to connected dashboards. Pipelines, deploys and incidents are separate modules sharing the store, health checks run on a schedule and feed uptime calculations, and on-call rotations are computed from a weekly schedule table. Rollback is a deploy record pointing back at the previous version, and incident timelines are append-only event rows.",
    databaseSchema: "services(id INTEGER PK, name TEXT, repo TEXT); pipelines(id INTEGER PK, service_id INTEGER, commit TEXT, status TEXT, duration_seconds INTEGER, started_at TEXT); deploys(id INTEGER PK, service_id INTEGER, version TEXT, status TEXT, deployed_at TEXT, rolled_back INTEGER); incidents(id INTEGER PK, service_id INTEGER, title TEXT, severity TEXT, status TEXT, opened_at TEXT, resolved_at TEXT); incident_events(id INTEGER PK, incident_id INTEGER, actor TEXT, message TEXT, ts TEXT); oncall(id INTEGER PK, engineer TEXT, starts_at TEXT, ends_at TEXT)",
    apis: [
      "GET /api/pipelines?service=&status= — pipeline runs",
      "GET /api/services/:id/deploys — deploy history",
      "POST /api/services/:id/rollback — roll back to the previous deploy",
      "GET /api/services/health — health and uptime per service",
      "POST /api/incidents — open an incident",
      "POST /api/incidents/:id/events — add a timeline entry",
      "POST /api/incidents/:id/resolve — resolve",
      "GET /api/oncall/current — who is on call now",
      "WS /ws — live pipeline, deploy and incident updates"
    ],
    fileStructure: "devops-dashboard/\n  package.json\n  tsconfig.json\n  src/\n    index.ts\n    db.ts\n    pipelines.ts\n    deploys.ts\n    health.ts\n    incidents.ts\n    oncall.ts\n    ws.ts\n    providers/simulated.ts\n  tests/\n    incidents.test.ts\n    deploys.test.ts\n  README.md",
    taskBreakdown: [
      "Design the schema and simulated providers",
      "Implement pipelines and deploy history",
      "Implement service health and uptime",
      "Implement incidents with timelines",
      "Implement on-call rotations",
      "Add rollback",
      "Add the live WebSocket view",
      "Test the incident flow end to end"
    ],
    milestones: [
      {
        id: "proj-devops-dashboard-m1", order: 1, title: "Pipelines and deploys",
        objectives: ["Ingest pipeline runs", "Record deploys", "Show history per service"],
        instructions: "Build a simulated CI provider that emits pipeline runs with commit, status and duration, and store them alongside deploy records per service with version and time. Add endpoints listing pipelines filterable by service and status, and deploy history per service in reverse chronological order.",
        concepts: ["CI data modelling", "Filtering", "Simulated providers"],
        hints: ["Keep the provider behind an interface so a real one can replace it.", "Store durations, not just statuses.", "Paginate the history."],
        acceptanceCriteria: ["Pipeline runs appear with correct status", "Deploy history lists versions in order", "Filters narrow the results"],
        tests: ["Ingest ten pipeline runs and list them", "Filter by failed status", "Check deploy history order"]
      },
      {
        id: "proj-devops-dashboard-m2", order: 2, title: "Health and uptime",
        objectives: ["Run health checks", "Compute uptime", "Show service status"],
        instructions: "Add scheduled health checks per service that record success or failure with latency, and compute uptime over 24 hours and 30 days from the check history. The health endpoint returns each service's current status, last check time and uptime percentages, with a degraded state when checks are slow but passing.",
        concepts: ["Health checks", "Uptime calculation", "Degraded state"],
        hints: ["Uptime is successful checks over total checks.", "Slow means latency above a threshold.", "Prune checks older than 30 days."],
        acceptanceCriteria: ["Health reflects recent checks", "Uptime matches hand-computed values", "A failing service shows as down"],
        tests: ["Run checks against a healthy and a dead service", "Compute uptime from known check data", "Check the degraded threshold"]
      },
      {
        id: "proj-devops-dashboard-m3", order: 3, title: "Incidents and on-call",
        objectives: ["Open incidents", "Keep a timeline", "Resolve and notify on-call"],
        instructions: "Implement incidents with severity and status, an append-only timeline of events with actor and message, and resolution that stamps the resolved time. On-call is a weekly rotation table; opening a high-severity incident notifies the current on-call engineer, and the dashboard shows who is on call now and next.",
        concepts: ["Incident lifecycle", "Append-only timelines", "On-call rotation"],
        hints: ["Never edit timeline events — append corrections.", "Resolve requires a summary message.", "Compute the current on-call from the schedule, not a stored flag."],
        acceptanceCriteria: ["An incident opens with a timeline", "Events append in order", "The current on-call engineer is shown"],
        tests: ["Open an incident and add three events", "Resolve it and check the timestamp", "Check on-call for a known date"]
      },
      {
        id: "proj-devops-dashboard-m4", order: 4, title: "Rollback and live updates",
        objectives: ["Roll back deploys", "Push live updates", "Filter by service and time"],
        instructions: "Add rollback that marks the current deploy rolled back and records a new deploy of the previous version, and a WebSocket hub that pushes pipeline completions, deploy events and incident changes to connected dashboards within 5 seconds. Add service and time-range filters across the dashboard views.",
        concepts: ["Rollback", "WebSockets", "Live updates"],
        hints: ["Rollback is a new deploy record, not a delete.", "Broadcast to all connected clients.", "Filters apply server-side."],
        acceptanceCriteria: ["Rollback restores the previous version", "A pipeline completion appears live", "Filters work across views"],
        tests: ["Deploy v2, roll back, check v1 is live", "Connect a WebSocket and trigger a pipeline", "Filter the dashboard by service"]
      }
    ],
    reviewChecklist: ["Pipeline and deploy data is accurate", "Uptime matches check history", "Incident timelines are complete and append-only", "Rollback works correctly", "Live updates arrive promptly", "README documents providers and the on-call model"],
    finalAssessment: ["Show pipelines and deploy history for a service", "Show service health and uptime", "Open an incident, add timeline events and resolve it", "Roll back a deploy", "Demonstrate the live dashboard updating"]
  },
];
