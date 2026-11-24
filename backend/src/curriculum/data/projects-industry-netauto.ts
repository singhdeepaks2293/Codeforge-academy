import type { Project } from '../types.js';

export const PROJECTS_INDUSTRY: Project[] = [
  {
    "id": "proj-netauto-campus-netbox",
    "slug": "netauto-campus-netbox",
    "level": 3,
    "title": "Automate a Campus Network from NetBox",
    "description": "Build a campus network automation pipeline that treats NetBox as the single source of truth: sites, devices, IP prefixes and VLANs live in NetBox, and Python scripts pull that data, render device configurations with Jinja2, and push them out through a controlled workflow. Every change is validated before it is applied, and the rendered configs are stored in Git so any change is reviewable and reversible. Done means a new access switch can be provisioned end to end from a NetBox entry alone — inventory, addressing, VLANs and a rendered, validated config — without hand-editing a device config.",
    "skills": ["NetBox", "Python", "Jinja2 templating", "REST APIs", "IP address management", "VLAN design", "Config validation", "GitOps"],
    "language": "python",
    "functionalRequirements": [
      "Model a campus site in NetBox: site, racks, devices, interfaces, VLANs and IP prefixes",
      "Fetch the full device inventory and IPAM data from NetBox over its REST API",
      "Render per-device switch configs from Jinja2 templates driven by NetBox data",
      "Validate every rendered config locally (syntax checks, VLAN existence, IP uniqueness) before any push",
      "Generate an intent diff between the desired config and the current running config on file",
      "Store rendered configs in Git with one commit per change and a readable diff",
      "Support adding a new access switch by creating its NetBox records and re-rendering only",
      "Produce a provisioning report listing each device, its management IP and its VLANs"
    ],
    "nonFunctionalRequirements": [
      "No device is touched until the config passes all local validation checks",
      "Re-rendering unchanged data produces byte-identical configs (idempotent)",
      "NetBox credentials are read from environment variables, never hardcoded",
      "A failed validation stops the pipeline before any push step runs",
      "The whole pipeline runs locally against a NetBox instance or a local JSON export of it"
    ],
    "architecture": "NetBox is the source of truth and nothing else is: a Python client (pynetbox or plain requests against the REST API) pulls devices, interfaces, VLANs and prefixes into a typed inventory model, Jinja2 templates render one config per device, and a validation layer checks the output against the same NetBox data (every VLAN referenced must exist, every management IP must be unique and inside its prefix). Rendered configs are committed to a Git repo as the audit trail; a separate push step — clearly labelled as lab-only — applies configs to real or Containerlab devices with NAPALM or Netmiko, and only after validation passes.",
    "databaseSchema": "",
    "apis": [
      "NetBox REST API: /api/dcim/devices/, /api/dcim/interfaces/, /api/ipam/prefixes/, /api/ipam/vlans/",
      "CLI: python netbox_sync.py, python render.py, python validate.py, python diff.py",
      "Git: rendered configs committed under configs/<site>/<device>.cfg"
    ],
    "fileStructure": "campus-netbox/\n  src/\n    netbox_client.py\n    inventory.py\n    render.py\n    validate.py\n    diff.py\n  templates/\n    access_switch.j2\n    distribution_switch.j2\n  data/\n    netbox_export.json\n  configs/\n    campus-a/\n  tests/\n    test_validate.py\n    test_render.py\n  .env.example\n  README.md",
    "taskBreakdown": [
      "Model the campus site, devices, VLANs and prefixes in NetBox (or a local JSON export)",
      "Build the NetBox client and the typed inventory model",
      "Write Jinja2 templates for access and distribution switches",
      "Implement local validation: VLAN existence, IP uniqueness, syntax checks",
      "Build the intent diff against the current running config on file",
      "Wire the render-validate-commit pipeline and the Git workflow",
      "Provision a new access switch from NetBox records alone",
      "Document the runbook and the lab-only push step"
    ],
    "milestones": [
      {
        "id": "proj-netauto-campus-netbox-m1",
        "order": 1,
        "title": "Model the campus in NetBox",
        "objectives": ["Create the site, device and VLAN model", "Connect to NetBox from Python", "Export a local inventory snapshot"],
        "instructions": "Create a site in NetBox with two distribution switches and four access switches, the VLANs they serve (data, voice, guest, management), and the management and user prefixes they use. Write netbox_client.py using pynetbox or requests with a token from an environment variable, and pull devices, interfaces, VLANs and prefixes into a local JSON snapshot so the rest of the pipeline can run even without a live NetBox instance. If you have no NetBox server, build the same snapshot by hand in data/netbox_export.json with the exact shape the API returns, and document that substitution clearly.",
        "concepts": ["Source of truth", "NetBox data model", "REST API authentication"],
        "hints": ["Start from the JSON snapshot so rendering works before any API call.", "A token in an environment variable beats one pasted into code.", "One VLAN per purpose keeps the model readable."],
        "acceptanceCriteria": ["The NetBox model (or export) covers all six switches and four VLANs", "The Python client fetches devices, VLANs and prefixes successfully", "The local snapshot is valid JSON with the expected keys", "No credential appears in code or in the snapshot"],
        "tests": ["Run the client and print the device count", "Validate the snapshot JSON with python -m json.tool", "Grep the repo for the API token"]
      },
      {
        "id": "proj-netauto-campus-netbox-m2",
        "order": 2,
        "title": "Render configs from Jinja2 templates",
        "objectives": ["Write switch templates", "Render one config per device", "Keep rendering deterministic"],
        "instructions": "Write templates/access_switch.j2 and templates/distribution_switch.j2 covering hostname, management interface and default route, VLAN definitions, access and trunk ports, and spanning-tree settings, all driven by loops over the inventory model. Implement render.py to produce one file per device under configs/<site>/, then render twice and confirm the outputs are byte-identical. Inspect a rendered config by hand and check every VLAN and IP against the NetBox model before moving on.",
        "concepts": ["Jinja2 templating", "Data-driven configuration", "Deterministic rendering"],
        "hints": ["Loops over inventory data beat one template per device.", "Render twice and diff — nondeterminism is a bug.", "Read one rendered config end to end before trusting the rest."],
        "acceptanceCriteria": ["A config is rendered for every device in the inventory", "Every VLAN and IP in a config matches the NetBox model", "Two consecutive renders are byte-identical", "No template contains a hardcoded device name or IP"],
        "tests": ["Render and count the output files", "Render twice and run diff -r on the output directory", "Grep a rendered config for a VLAN that should not be there"]
      },
      {
        "id": "proj-netauto-campus-netbox-m3",
        "order": 3,
        "title": "Validate and diff before any push",
        "objectives": ["Validate VLAN and IP correctness", "Diff desired vs current config", "Gate the pipeline on validation"],
        "instructions": "Write validate.py to check each rendered config: every referenced VLAN exists in NetBox, every management IP is unique and inside its declared prefix, no interface is both access and trunk, and the config parses cleanly (use a simple structural parser or a lint pass). Write diff.py to compare the desired config against the current running config stored on file and produce a unified diff plus a summary of added, removed and changed lines. Wire render, validate and diff into a single pipeline script that stops with a non-zero exit code when any check fails, so nothing can proceed to a push step on bad output.",
        "concepts": ["Config validation", "Intent diff", "Fail-fast pipelines"],
        "hints": ["Validate against NetBox data, not against the template.", "A diff summary is what a reviewer actually reads.", "Exit non-zero on failure so CI and scripts can gate on it."],
        "acceptanceCriteria": ["Validation catches a deliberately broken config (unknown VLAN)", "Validation catches a duplicate management IP", "The diff shows exactly the lines that would change", "A failed validation stops the pipeline with a non-zero exit"],
        "tests": ["Inject an unknown VLAN and run validate.py", "Duplicate an IP and run validate.py", "Run the pipeline on a clean tree and on a broken one"]
      },
      {
        "id": "proj-netauto-campus-netbox-m4",
        "order": 4,
        "title": "Provision a new switch and document the lab push",
        "objectives": ["Provision a switch from NetBox records alone", "Commit configs to Git with a reviewable diff", "Document the lab-only push step"],
        "instructions": "Add a fifth access switch to NetBox (or the JSON export) with its interfaces, VLAN assignments and management IP, then run the pipeline: render, validate, diff and commit the new config to Git with a message naming the device and the change. Write the push step as a separate, clearly labelled lab-only script that applies a config to a Containerlab or real device with NAPALM or Netmiko only after validation passes — and record in the README that this step requires a lab and is never run against production from this project. Finish with a provisioning report listing every device, its management IP and its VLANs, generated from the inventory.",
        "concepts": ["End-to-end provisioning", "Git as audit trail", "Lab-only device access"],
        "hints": ["If the pipeline is right, a new device is just new data.", "The Git diff is the change review.", "Label the push step lab-only in the code and the README."],
        "acceptanceCriteria": ["A new switch is provisioned by adding NetBox records only", "The rendered config is committed with a clear message", "The push script refuses to run when validation has not passed", "The provisioning report matches the NetBox model"],
        "tests": ["Add the switch, run the pipeline and inspect the Git diff", "Run the push script with a failing validation and confirm it refuses", "Generate the report and cross-check one device by hand"]
      }
    ],
    "reviewChecklist": [
      "NetBox is the only source of truth; no device data is hardcoded in templates",
      "Rendering is deterministic and every config passes validation",
      "The diff clearly shows what would change before anything is pushed",
      "Configs are committed to Git with reviewable messages",
      "The device push step is labelled lab-only and gated on validation"
    ],
    "finalAssessment": [
      "Add a new switch in NetBox and show its rendered, validated config",
      "Inject a bad VLAN and show validation stopping the pipeline",
      "Show the intent diff for a VLAN change and explain each line",
      "Walk through the Git history of one device's config",
      "Explain what the lab push step does and why it is not run against production here"
    ]
  },
  {
    "id": "proj-netauto-ztp-pipeline",
    "slug": "netauto-ztp-pipeline",
    "level": 4,
    "title": "Zero-Touch Provisioning Pipeline",
    "description": "Build a zero-touch provisioning pipeline for new switches: a device boots, identifies itself, and receives the right day-0 config, firmware and licence assignment without anyone logging into it. The pipeline covers device identity and onboarding, template rendering per device role, a DHCP/TFTP-style bootstrap file service, and post-boot verification that proves the device came up correctly. Done means a factory-default switch described only in the inventory boots into its intended role with the correct config and passes its post-boot checks — locally simulated end to end, with the real-device steps labelled as lab-only.",
    "skills": ["Zero-touch provisioning", "DHCP option 43", "Jinja2 templating", "Device onboarding", "Firmware management", "Post-boot verification", "Python", "Network automation"],
    "language": "python",
    "functionalRequirements": [
      "Maintain an onboarding inventory mapping device serial/MAC to site, role and template",
      "Render a day-0 config per device from its role template and inventory data",
      "Serve bootstrap files (config and firmware pointers) over a local file/HTTP service",
      "Implement the DHCP option 43 / PnP-style bootstrap response for a requesting device",
      "Verify a booted device's identity, software version and config against the intended state",
      "Record every onboarding event with timestamp, device identity and outcome",
      "Support a device that fails verification by quarantining it and flagging the failure",
      "Roll back a device to its previous known-good config on a failed verification"
    ],
    "nonFunctionalRequirements": [
      "A device with no inventory entry is never provisioned — it is quarantined",
      "The same inventory entry always renders the same day-0 config",
      "No credential or secret appears in a day-0 config or bootstrap file",
      "Verification runs automatically after every provisioning, not on request",
      "The full flow is testable locally with a simulated device boot"
    ],
    "architecture": "An onboarding inventory (YAML) maps each device's serial number and MAC address to its site, role and template. A Python pipeline renders day-0 configs from Jinja2 role templates, serves them from a small local HTTP/file service, and answers bootstrap requests with the correct config URL per device identity — including a DHCP option 43 encoder for PnP-style onboarding. After boot, a verification step compares the device's reported identity, software version and running config against the intended state (locally, against a simulated device transcript; against a real device only in a lab), records the result in an onboarding log, and quarantines anything that fails.",
    "databaseSchema": "",
    "apis": [
      "CLI: python onboard.py, python render_day0.py, python bootstrap_server.py, python verify.py",
      "HTTP: GET /bootstrap/<serial> returns the day-0 config for that device",
      "DHCP option 43 encoder for PnP-style bootstrap responses"
    ],
    "fileStructure": "ztp-pipeline/\n  inventory/\n    onboarding.yaml\n  templates/\n    access_day0.j2\n    distribution_day0.j2\n  src/\n    onboard.py\n    render_day0.py\n    bootstrap_server.py\n    verify.py\n    option43.py\n  simulated_devices/\n    sw-new-01_boot.log\n  logs/\n    onboarding.log\n  tests/\n    test_render.py\n    test_verify.py\n  README.md",
    "taskBreakdown": [
      "Design the onboarding inventory schema and the device roles",
      "Write the day-0 Jinja2 templates per role",
      "Build the renderer and the bootstrap file service",
      "Implement device identity lookup and the option 43 encoder",
      "Build the post-boot verification step",
      "Simulate a full boot end to end with a fake device transcript",
      "Add quarantine and rollback for failed verifications",
      "Document the lab steps for a real switch"
    ],
    "milestones": [
      {
        "id": "proj-netauto-ztp-pipeline-m1",
        "order": 1,
        "title": "Onboarding inventory and day-0 templates",
        "objectives": ["Define the inventory schema", "Write role-based day-0 templates", "Render a config per device"],
        "instructions": "Write inventory/onboarding.yaml with three devices — two access switches and one distribution switch — each with serial, MAC, site, role, management IP and firmware version. Write day-0 Jinja2 templates per role covering hostname, management interface, DNS/NTP, SSH, and a minimal VLAN set, then render one config per device and read each one end to end. Confirm no template contains a hardcoded serial, MAC or IP.",
        "concepts": ["Day-0 configuration", "Device identity", "Role-based templates"],
        "hints": ["Identity (serial/MAC) is the key — the config follows from it.", "Day-0 configs should be minimal; the full config comes later.", "Render for every inventory entry, not just one."],
        "acceptanceCriteria": ["The inventory covers three devices with unique serials and MACs", "Each device renders a distinct, correct day-0 config", "No secret appears in any rendered config", "Rendering is deterministic across runs"],
        "tests": ["Render all configs and inspect them", "Render twice and diff the outputs", "Grep rendered configs for passwords or tokens"]
      },
      {
        "id": "proj-netauto-ztp-pipeline-m2",
        "order": 2,
        "title": "Bootstrap service and identity lookup",
        "objectives": ["Serve configs over HTTP per device", "Resolve a device to its config by identity", "Encode DHCP option 43"],
        "instructions": "Build bootstrap_server.py: a small HTTP service that takes a device serial (or MAC) and returns that device's day-0 config, returning 404 for any unknown identity. Implement option43.py to encode the bootstrap server URL into DHCP option 43 bytes and decode it back, proving the round trip locally. Test the service with curl for a known device and for an unknown one, and confirm the unknown device gets nothing.",
        "concepts": ["Bootstrap services", "DHCP option 43", "Identity-based provisioning"],
        "hints": ["404 for unknown devices is a feature, not an error.", "Encode and decode option 43 in a unit test.", "The server must never serve a config to the wrong device."],
        "acceptanceCriteria": ["A known serial returns its own day-0 config", "An unknown serial gets a 404 and no config", "Option 43 encodes and decodes back to the same URL", "Two devices never receive each other's configs"],
        "tests": ["curl the service for a known and an unknown serial", "Run the option 43 round-trip test", "Request one device's config with another's serial"]
      },
      {
        "id": "proj-netauto-ztp-pipeline-m3",
        "order": 3,
        "title": "Simulated boot and post-boot verification",
        "objectives": ["Simulate a device boot end to end", "Verify identity, version and config after boot", "Log every onboarding event"],
        "instructions": "Write a simulated device boot: a script that plays the role of a factory-default switch, requests its bootstrap config from your service, and writes a boot transcript (identity, software version, applied config hash) to simulated_devices/. Then write verify.py to compare that transcript against the intended state — serial matches the inventory, firmware version matches, config hash matches the rendered day-0 config — and append the result to logs/onboarding.log. Run the happy path and a tampered path (wrong firmware version in the transcript) and confirm the second fails verification.",
        "concepts": ["Post-boot verification", "Intended vs actual state", "Simulated devices"],
        "hints": ["The transcript is the device's word — verify it, don't trust it.", "A hash comparison catches config drift cheaply.", "Log successes too; the log is the audit trail."],
        "acceptanceCriteria": ["A correct simulated boot passes verification", "A wrong firmware version fails verification", "Every onboarding attempt is logged with outcome", "The config hash in the transcript matches the rendered config"],
        "tests": ["Run the simulated boot and verify it", "Tamper the firmware version and verify it fails", "Read the onboarding log after both runs"]
      },
      {
        "id": "proj-netauto-ztp-pipeline-m4",
        "order": 4,
        "title": "Quarantine, rollback and the lab runbook",
        "objectives": ["Quarantine failed devices", "Roll back to a known-good config", "Document the real-device lab steps"],
        "instructions": "Extend verify.py so a failed verification moves the device into a quarantine list (no further configs served to it until an operator clears it) and records the reason. Add a rollback path: keep the previous known-good config per device and serve that instead of the new day-0 config when a rollback is requested. Run the full flow once more — onboard, verify, fail one device, quarantine it, roll it back — and write the README runbook for doing the same steps against a real switch in a Containerlab or physical lab, labelling each device-touching step as lab-only.",
        "concepts": ["Quarantine", "Rollback", "Safe failure modes"],
        "hints": ["A failed device must fail closed, not retry forever.", "Keep the known-good config before you overwrite it.", "The runbook is what makes this usable on real hardware."],
        "acceptanceCriteria": ["A failed device is quarantined and served no further configs", "Rollback serves the previous known-good config", "The full onboard-verify-fail-quarantine-rollback flow runs locally", "The README labels every real-device step as lab-only"],
        "tests": ["Fail a device and confirm the bootstrap service refuses it", "Request a rollback and check the served config", "Run the whole flow end to end and review the log"]
      }
    ],
    "reviewChecklist": [
      "Unknown devices are never provisioned",
      "Each device receives only its own config",
      "Verification runs after every boot and is logged",
      "Failed devices are quarantined, not retried blindly",
      "Rollback to a known-good config works",
      "Real-device steps are labelled lab-only"
    ],
    "finalAssessment": [
      "Onboard a new simulated device from inventory entry to verified boot",
      "Show an unknown device being refused a config",
      "Tamper a boot transcript and show verification catching it",
      "Quarantine a failed device and roll it back",
      "Explain how the lab steps differ from the local simulation"
    ]
  },
  {
    "id": "proj-netauto-drift-detector",
    "slug": "netauto-drift-detector",
    "level": 3,
    "title": "Config Drift Detector",
    "description": "Build a drift detector that compares what a network device is actually running against the intended configuration stored in Git, and reports every difference with its severity. It parses configs into structured data, ignores cosmetic noise, flags real changes, and produces a report a network engineer can act on — plus a scheduled check that alerts when new drift appears. Done means running the detector over a set of device configs produces a report that correctly separates real drift from harmless formatting differences, and a deliberately introduced change is caught and classified.",
    "skills": ["Config parsing", "Diff algorithms", "Drift detection", "Python", "Git", "Reporting", "Scheduling", "Network operations"],
    "language": "python",
    "functionalRequirements": [
      "Parse device configs into structured sections (interfaces, VLANs, routing, ACLs)",
      "Compare running configs on file against intended configs from Git",
      "Ignore cosmetic differences (ordering, whitespace, comments, timestamps)",
      "Classify each drift item by severity: critical, warning or informational",
      "Produce a per-device drift report in text and JSON formats",
      "Track drift history over time in a local SQLite database",
      "Support a scheduled check mode that exits non-zero when new critical drift appears",
      "Allow an approved exception list so known, accepted differences are not re-reported"
    ],
    "nonFunctionalRequirements": [
      "The detector runs entirely on local files — no device access is required",
      "Identical configs produce an empty report every time",
      "A report is produced in under 10 seconds for 50 device configs",
      "Drift history is retained so trends can be shown",
      "No credential or secret from a config is copied into the report"
    ],
    "architecture": "Configs are parsed into a canonical structured form (ordered sections normalised, comments and timestamps stripped) so that only semantic differences survive. A differ compares the running config against the intended config from Git and emits typed drift items with a severity classifier — an ACL change is critical, a description change is informational. Results are written to a SQLite drift history and rendered as a human-readable text report and a machine-readable JSON report; a scheduler mode wraps the same check and exits non-zero on new critical drift so it can gate CI or alerting.",
    "databaseSchema": "drift_events: id INTEGER PK, device TEXT, detected_at TIMESTAMPTZ, section TEXT, severity TEXT, detail TEXT, acknowledged INTEGER; runs: id INTEGER PK, run_at TIMESTAMPTZ, devices_checked INTEGER, critical_count INTEGER",
    "apis": [
      "CLI: python drift.py check --intended configs/intended --running configs/running",
      "CLI: python drift.py report --device sw-01, python drift.py history --days 7",
      "Output: drift_report.txt and drift_report.json per run"
    ],
    "fileStructure": "drift-detector/\n  src/\n    parser.py\n    canonical.py\n    differ.py\n    severity.py\n    report.py\n    store.py\n  configs/\n    intended/\n    running/\n  exceptions.yaml\n  drift.db\n  tests/\n    test_parser.py\n    test_differ.py\n  README.md",
    "taskBreakdown": [
      "Collect sample intended and running configs for several devices",
      "Write the config parser and the canonicaliser",
      "Build the differ with severity classification",
      "Add the text and JSON report generators",
      "Add SQLite drift history and the exception list",
      "Add scheduled-check mode with a non-zero exit on critical drift",
      "Test with deliberately introduced drift of each severity",
      "Document the runbook and the lab step for pulling live configs"
    ],
    "milestones": [
      {
        "id": "proj-netauto-drift-detector-m1",
        "order": 1,
        "title": "Parse and canonicalise configs",
        "objectives": ["Parse configs into sections", "Normalise away cosmetic noise", "Prove identical configs compare equal"],
        "instructions": "Write parser.py to split a switch config into sections (hostname, interfaces, VLANs, routing, ACLs, misc) and canonical.py to normalise each section: sort unordered lists, strip comments, timestamps and blank lines, and normalise whitespace. Build a small fixture set — an intended config and a running config that differ only in comment text and line order — and prove the canonical forms are identical. Then add a fixture with one real change and confirm the canonical forms differ exactly there.",
        "concepts": ["Config parsing", "Canonicalisation", "Semantic vs cosmetic differences"],
        "hints": ["Sort before you compare — device output order is not meaningful.", "Strip timestamps first; they change on every save.", "Test with fixtures, not with a live device."],
        "acceptanceCriteria": ["Cosmetically different configs canonicalise to the same form", "One real change produces exactly one canonical difference", "The parser handles all five section types", "Parsing never crashes on an unexpected line — it goes to misc"],
        "tests": ["Canonicalise the cosmetic-only pair and compare", "Canonicalise the one-change pair and inspect the diff", "Parse a config with an unknown stanza"]
      },
      {
        "id": "proj-netauto-drift-detector-m2",
        "order": 2,
        "title": "Differ and severity classification",
        "objectives": ["Diff canonical configs", "Classify drift by severity", "Emit typed drift items"],
        "instructions": "Write differ.py to compare the canonical intended and running configs section by section and emit drift items naming the device, section, the intended line and the actual line. Write severity.py with explicit rules: ACL, routing and management-access changes are critical; VLAN membership and interface description changes are warnings; banner, logging and NTP changes are informational. Run the differ over fixtures containing one drift item of each severity and confirm each is classified correctly.",
        "concepts": ["Diff algorithms", "Severity classification", "Drift taxonomy"],
        "hints": ["Severity rules belong in one place so they can be reviewed.", "An ACL change is never informational.", "Name the exact lines, not just the section."],
        "acceptanceCriteria": ["Each drift item names device, section and both lines", "An ACL change is classified critical", "A description change is classified warning", "A banner change is classified informational"],
        "tests": ["Diff fixtures with one item per severity", "Diff identical configs and confirm zero items", "Add a new severity rule and re-run"]
      },
      {
        "id": "proj-netauto-drift-detector-m3",
        "order": 3,
        "title": "Reports, history and exceptions",
        "objectives": ["Generate text and JSON reports", "Record drift history in SQLite", "Support an approved exception list"],
        "instructions": "Write report.py to render a per-device drift report in readable text and in JSON, with a summary line of counts per severity and no secrets copied from the configs. Write store.py to record each run and each drift event in SQLite, and add a history command that shows drift per device over the last 7 days. Add exceptions.yaml for approved differences (for example a locally set banner) and confirm an excepted item is recorded as acknowledged rather than reported as fresh drift.",
        "concepts": ["Reporting", "Drift history", "Approved exceptions"],
        "hints": ["Redact anything that looks like a secret before it reaches a report.", "History turns one-off checks into a trend.", "Exceptions need an owner and an expiry, even locally."],
        "acceptanceCriteria": ["Text and JSON reports agree on counts", "Drift history shows the same event across runs", "An excepted item is acknowledged, not re-reported as new", "No secret appears in either report"],
        "tests": ["Generate both reports and compare counts", "Run twice and query the history", "Add an exception and re-run"]
      },
      {
        "id": "proj-netauto-drift-detector-m4",
        "order": 4,
        "title": "Scheduled checks and the live-collection runbook",
        "objectives": ["Add scheduled-check mode with exit codes", "Demonstrate catching injected drift", "Document live config collection as lab-only"],
        "instructions": "Add a scheduled-check mode (a cron entry plus a --check flag) that runs the detector and exits non-zero when any new critical drift appears, so it can gate CI or trigger an alert. Run a full end-to-end demonstration: take a clean fixture set, inject three changes (one critical ACL change, one warning VLAN change, one cosmetic change), and show the report catching exactly the first two. Write the README runbook explaining how to collect live running configs into configs/running/ from a lab (Containerlab or real devices with Netmiko/NAPALM), labelled as lab-only, since this project itself works entirely on local files.",
        "concepts": ["Scheduled checks", "Exit codes as contracts", "Lab-only collection"],
        "hints": ["Exit codes are how schedulers and CI know a check failed.", "Inject drift deliberately — it is the only way to prove detection.", "The detector never needs a device; collection does."],
        "acceptanceCriteria": ["Scheduled mode exits non-zero on new critical drift and zero otherwise", "Injected critical and warning drift are both caught; cosmetic drift is not", "The end-to-end run completes in under 10 seconds for the fixture set", "The README labels live collection as lab-only"],
        "tests": ["Run scheduled mode on clean fixtures (exit 0)", "Inject critical drift and run it (exit non-zero)", "Time the full run over the fixture set"]
      }
    ],
    "reviewChecklist": [
      "Cosmetic differences never appear as drift",
      "Severity classification matches the documented rules",
      "Reports are accurate in both text and JSON",
      "Drift history and exceptions work across runs",
      "Scheduled mode exits correctly on critical drift",
      "Live collection is documented as lab-only"
    ],
    "finalAssessment": [
      "Run the detector over a clean set and show an empty report",
      "Inject one drift item per severity and show the classifications",
      "Show the 7-day history for a device",
      "Add an exception and show it acknowledged",
      "Explain how the lab collection step would feed this detector"
    ]
  },
  {
    "id": "proj-netauto-bgp-generator",
    "slug": "netauto-bgp-generator",
    "level": 3,
    "title": "BGP Config Generator from YAML",
    "description": "Build a BGP configuration generator that turns a small YAML description of an autonomous system — its routers, neighbours, address families, route policies and prefix lists — into correct, consistent per-router BGP configs. The generator validates the model first (no duplicate AS numbers, no neighbour without a matching remote AS, no overlapping prefix lists), renders with Jinja2, and checks the output against a set of routing invariants before it is ever used. Done means changing one YAML file regenerates every router's BGP config, validation catches a bad neighbour definition, and the rendered configs pass an invariant check for a small three-router topology.",
    "skills": ["BGP", "YAML data modelling", "Jinja2 templating", "Config validation", "Route policies", "Prefix lists", "Python", "Routing invariants"],
    "language": "python",
    "functionalRequirements": [
      "Model an AS in YAML: routers, loopbacks, iBGP mesh, eBGP neighbours, address families",
      "Render per-router BGP configs from Jinja2 templates for at least two vendor syntaxes",
      "Validate the model before rendering: unique router-ids, matching remote AS, valid prefixes",
      "Generate prefix lists and route maps from the policy section of the YAML",
      "Check routing invariants on the output: full iBGP mesh, no AS loops, consistent policies",
      "Support both IPv4 unicast and IPv6 unicast address families",
      "Produce a topology summary showing every peering session and its intended state",
      "Diff regenerated configs against the previous generation to show exactly what changed"
    ],
    "nonFunctionalRequirements": [
      "An invalid model fails validation with a message naming the offending entry",
      "Re-rendering an unchanged model produces byte-identical configs",
      "No router config references a neighbour that does not exist in the model",
      "The generator runs entirely locally with no device access",
      "A three-router topology renders in under 5 seconds"
    ],
    "architecture": "A YAML model file is the single source of truth for the whole AS. A Python loader validates it against a schema and a set of cross-references, then a Jinja2 renderer produces one BGP config per router using vendor-specific templates (Cisco IOS-style and a second syntax such as Arista EOS-style). A separate invariant checker parses the rendered output and verifies the full iBGP mesh, the absence of AS loops in the policy, and that every advertised prefix is covered by a prefix list. A diff step compares each generation against the previous one, and a summary command prints the peering matrix.",
    "databaseSchema": "",
    "apis": [
      "CLI: python bgp_gen.py validate topology.yaml, python bgp_gen.py render topology.yaml",
      "CLI: python bgp_gen.py check output/, python bgp_gen.py summary topology.yaml",
      "Input: YAML model with routers, neighbours, policies and prefix lists"
    ],
    "fileStructure": "bgp-generator/\n  topology.yaml\n  src/\n    model.py\n    validate.py\n    render.py\n    invariants.py\n    summary.py\n  templates/\n    bgp_ios.j2\n    bgp_eos.j2\n  output/\n  tests/\n    test_validate.py\n    test_invariants.py\n    fixtures/\n      bad_neighbour.yaml\n  README.md",
    "taskBreakdown": [
      "Design the YAML model for a three-router AS with one eBGP peer",
      "Write the model loader and validation rules",
      "Write the Jinja2 templates for two vendor syntaxes",
      "Implement the invariant checker on rendered output",
      "Add the peering summary and the generation diff",
      "Test validation against deliberately broken models",
      "Render, check and review a full three-router topology",
      "Document how the configs would be applied in a lab"
    ],
    "milestones": [
      {
        "id": "proj-netauto-bgp-generator-m1",
        "order": 1,
        "title": "Model the AS in YAML",
        "objectives": ["Design the YAML schema", "Model three routers and one eBGP peer", "Load and validate the model"],
        "instructions": "Write topology.yaml for AS 65001 with three routers (R1, R2, R3) in a full iBGP mesh, each with a loopback, plus one eBGP neighbour to AS 65002 on R1. Include an IPv4 and an IPv6 address family and a small policy section with one prefix list and one route map. Write model.py to load the YAML and validate.py to check router-id uniqueness, that every neighbour's remote AS is declared, and that every prefix is valid CIDR. Run validate on the good model and confirm it passes.",
        "concepts": ["BGP autonomous systems", "iBGP vs eBGP", "YAML data modelling"],
        "hints": ["The model is the truth; the configs are just views of it.", "Validate before rendering, never after.", "A full iBGP mesh for three routers is three sessions."],
        "acceptanceCriteria": ["The YAML models three routers, a full iBGP mesh and one eBGP peer", "Validation passes on the good model", "Every prefix in the model is valid CIDR", "Both address families are present"],
        "tests": ["Run validate on the good model", "Load the YAML and print the router count", "Check the peering count by hand"]
      },
      {
        "id": "proj-netauto-bgp-generator-m2",
        "order": 2,
        "title": "Render configs for two vendor syntaxes",
        "objectives": ["Write IOS and EOS BGP templates", "Render one config per router", "Prove rendering is deterministic"],
        "instructions": "Write templates/bgp_ios.j2 and templates/bgp_eos.j2 covering router bgp with the local AS, neighbour statements with remote AS and update-source loopback, address-family blocks for IPv4 and IPv6, and the generated prefix lists and route maps. Render the three-router topology in both syntaxes, read one rendered config of each syntax end to end, and render twice to prove byte-identical output.",
        "concepts": ["Jinja2 templating", "Vendor syntax differences", "Deterministic rendering"],
        "hints": ["Keep the model vendor-neutral; only the template knows the syntax.", "Read one output of each syntax before trusting the rest.", "Update-source loopback is what makes iBGP stable."],
        "acceptanceCriteria": ["Each router renders in both syntaxes", "Every neighbour in the model appears in every relevant config", "No config references an undeclared neighbour", "Two renders are byte-identical"],
        "tests": ["Render both syntaxes and count output files", "Render twice and diff", "Grep a rendered config for the eBGP neighbour"]
      },
      {
        "id": "proj-netauto-bgp-generator-m3",
        "order": 3,
        "title": "Validation and invariant checks",
        "objectives": ["Reject broken models with clear errors", "Check the iBGP mesh on rendered output", "Check policies and prefix coverage"],
        "instructions": "Extend validate.py so a neighbour pointing at an undeclared AS, a duplicate router-id, and an invalid prefix each fail with a message naming the offending entry — test all three with fixture files. Write invariants.py to parse the rendered configs and verify the full iBGP mesh (every router peers with every other), that no route map creates an AS loop, and that every advertised prefix is covered by a prefix list. Run the checker on the good topology and on a deliberately broken render, and confirm it passes the first and fails the second.",
        "concepts": ["Model validation", "Routing invariants", "Fail-fast checks"],
        "hints": ["A validator that cannot name the bad entry is not helpful.", "Check the output, not just the input — templates can break invariants.", "One fixture per failure mode."],
        "acceptanceCriteria": ["Each of the three broken models fails with a named error", "The invariant checker passes the good topology", "The checker fails a render missing one iBGP session", "Every advertised prefix is covered by a prefix list"],
        "tests": ["Validate the three bad fixtures", "Run invariants on the good output", "Delete one iBGP session from a render and re-check"]
      },
      {
        "id": "proj-netauto-bgp-generator-m4",
        "order": 4,
        "title": "Summary, diff and the lab runbook",
        "objectives": ["Print a peering summary", "Diff generations", "Document lab application"],
        "instructions": "Write summary.py to print the peering matrix — every session, its local and remote AS, address families and intended state — from the model. Add a generation diff: render into output/, keep the previous generation, and show exactly which lines changed when you add a new prefix list to the model. Finally, write the README runbook for applying the configs in a Containerlab topology with three routers, labelling the device steps as lab-only and noting that the generator itself needs no device at all.",
        "concepts": ["Peering matrices", "Generation diffs", "Lab-only application"],
        "hints": ["The summary is what a reviewer reads before any config.", "A diff proves a small model change makes a small config change.", "Lab steps belong in the README, not in the generator."],
        "acceptanceCriteria": ["The summary lists all four peering sessions correctly", "Adding one prefix list changes only the expected lines", "Rendering the three-router topology takes under 5 seconds", "The README labels device steps as lab-only"],
        "tests": ["Print the summary and count the sessions", "Add a prefix list, re-render and inspect the diff", "Time a full render"]
      }
    ],
    "reviewChecklist": [
      "The YAML model is the only source of truth",
      "Both vendor syntaxes render correctly for every router",
      "Broken models fail with named errors",
      "Invariants hold on the rendered output",
      "A small model change produces a small, reviewable diff"
    ],
    "finalAssessment": [
      "Add a fourth router to the model and show its rendered configs",
      "Break a neighbour definition and show validation catching it",
      "Show the peering summary and explain each session",
      "Remove an iBGP session from a render and show the invariant check failing",
      "Explain how the configs would be applied in a Containerlab lab"
    ]
  },
  {
    "id": "proj-netauto-firewall-panos",
    "slug": "netauto-firewall-panos",
    "level": 3,
    "title": "Firewall Policy Automation: Palo Alto",
    "description": "Automate Palo Alto firewall policy with Ansible: security rules, address objects, address groups and NAT rules are defined once in YAML, rendered into a playbook, and applied idempotently through the PAN-OS API — with a dry-run diff and a commit check before anything goes live. Every rule carries a business owner, an expiry and a ticket reference, so stale rules can be found and removed instead of accumulating forever. Done means a new application onboarding (objects, group, security rule, NAT) ships from one YAML change, a second playbook run reports zero changes, and an expired rule is flagged by the audit report.",
    "skills": ["Ansible", "Palo Alto PAN-OS", "Firewall policy", "Address objects", "NAT rules", "Security zones", "Policy lifecycle", "Idempotency"],
    "language": "ansible",
    "functionalRequirements": [
      "Define address objects, address groups and service objects in YAML variables",
      "Create security rules with source/destination zones, addresses, applications and actions",
      "Create NAT rules for outbound and inbound application publishing",
      "Apply policy idempotently via the PAN-OS API modules (paloaltonetworks.panos)",
      "Show a diff in check mode before any commit",
      "Commit only after the diff is reviewed, and verify the commit job succeeds",
      "Enforce rule metadata: owner, ticket reference and expiry date on every rule",
      "Produce an audit report listing expired, unused and overly broad rules"
    ],
    "nonFunctionalRequirements": [
      "A second playbook run reports zero changes",
      "No rule is created without an owner, ticket and expiry",
      "No commit happens in check mode",
      "API credentials come from Ansible Vault, never plaintext",
      "A failed commit leaves the previous committed policy intact"
    ],
    "architecture": "Policy is data, not playbook code: YAML variables define objects, groups, security rules and NAT rules, each with owner, ticket and expiry metadata. Ansible roles (objects, security, nat, audit) consume that data through the paloaltonetworks.panos collection and talk to the firewall over its API, with check mode producing a diff for review before a separate commit task runs. An audit role reads the live rulebase back and compares it against the intended YAML, flagging expired, unused and overly broad rules. Against a real firewall this runs in a lab; without one, the same playbooks run against a local PAN-OS API stub or in check mode with recorded API responses.",
    "databaseSchema": "",
    "apis": [
      "CLI: ansible-playbook site.yml --check, ansible-playbook site.yml, ansible-playbook audit.yml",
      "PAN-OS API via paloaltonetworks.panos collection (panos_address_object, panos_security_rule, panos_nat_rule, panos_commit)",
      "Ansible Vault: ansible-vault create/edit for firewall credentials"
    ],
    "fileStructure": "firewall-panos/\n  site.yml\n  audit.yml\n  inventory/\n    hosts.ini\n  group_vars/\n    panos.yml\n    vault.yml\n  roles/\n    objects/\n      tasks/main.yml\n    security/\n      tasks/main.yml\n    nat/\n      tasks/main.yml\n    audit/\n      tasks/main.yml\n  vars/\n    policy.yaml\n  README.md",
    "taskBreakdown": [
      "Design the zone model and the policy data schema in YAML",
      "Set up the inventory, Vault credentials and the panos collection",
      "Build the objects role (addresses, groups, services)",
      "Build the security and NAT roles",
      "Add check-mode diff and the gated commit step",
      "Build the audit role for expired, unused and broad rules",
      "Onboard a new application end to end from one YAML change",
      "Document the lab firewall setup and the rollback path"
    ],
    "milestones": [
      {
        "id": "proj-netauto-firewall-panos-m1",
        "order": 1,
        "title": "Policy data model and connectivity",
        "objectives": ["Design the zone and object model", "Connect Ansible to the firewall", "Validate the policy YAML"],
        "instructions": "Design three zones (trust, untrust, dmz) and write vars/policy.yaml with address objects, one address group, and two service objects, each rule entry carrying owner, ticket and expiry. Set up inventory/hosts.ini, store the firewall credentials in Ansible Vault, and install the paloaltonetworks.panos collection. Prove connectivity with a read-only facts/playbook task that lists the firewall's zones — or, without a lab firewall, with a documented local API stub that returns recorded responses — and validate the YAML schema locally so a rule missing an owner or expiry fails fast.",
        "concepts": ["PAN-OS zones", "Ansible Vault", "Policy as data"],
        "hints": ["Start read-only: list before you create.", "Vault encrypts the credential file, not the whole repo.", "Schema validation catches a missing owner before the firewall does."],
        "acceptanceCriteria": ["The YAML models three zones, objects and a group", "Ansible reaches the firewall (or the documented stub) read-only", "A rule missing owner or expiry fails validation", "No credential appears in plaintext anywhere"],
        "tests": ["Run the read-only facts task", "Validate the policy YAML", "Remove an expiry from a rule and re-validate"]
      },
      {
        "id": "proj-netauto-firewall-panos-m2",
        "order": 2,
        "title": "Objects, security rules and NAT",
        "objectives": ["Create address and service objects", "Create security rules", "Create NAT rules"],
        "instructions": "Build the objects role to create address objects, address groups and services from vars/policy.yaml, then the security role to create rules with source/destination zones, addresses, applications and actions, and the nat role for one outbound NAT rule and one inbound destination NAT rule for a DMZ web server. Run the whole playbook in check mode first and read the diff, then apply it (lab firewall only) and confirm the rules exist via a read-back task.",
        "concepts": ["Security rules", "NAT rules", "Check mode"],
        "hints": ["Check mode first, every time — the diff is the review.", "Objects before rules; rules reference objects by name.", "One application per rule keeps audits readable."],
        "acceptanceCriteria": ["All objects, groups and services exist as defined", "Security rules match the YAML exactly", "Both NAT rules are present with correct translations", "Check mode shows the full diff before any change"],
        "tests": ["Run in check mode and read the diff", "Apply and read back the rulebase", "Run the playbook a second time and confirm zero changes"]
      },
      {
        "id": "proj-netauto-firewall-panos-m3",
        "order": 3,
        "title": "Gated commit and idempotency",
        "objectives": ["Commit only after review", "Verify the commit job", "Prove a second run is a no-op"],
        "instructions": "Split the playbook so the commit is a separate, explicitly invoked step: site.yml applies the candidate config, and a commit task (or a separate commit.yml) runs only when you pass an extra variable confirming review. After committing, query the commit job status and fail the playbook if the commit did not succeed. Prove idempotency by running the full playbook a second time and confirming it reports zero changes, and prove the guard by running the commit step without the confirmation variable and watching it refuse.",
        "concepts": ["Candidate vs committed config", "Commit jobs", "Idempotency"],
        "hints": ["A commit is a deployment — gate it like one.", "Check the job status; a submitted commit is not a successful one.", "Zero changes on re-run is the idempotency proof."],
        "acceptanceCriteria": ["The commit runs only with explicit confirmation", "A failed commit is detected from the job status", "A second full run reports zero changes", "The candidate config matches the committed config after commit"],
        "tests": ["Run the commit step without confirmation", "Apply, commit and check the job status", "Run the playbook twice and compare the change counts"]
      },
      {
        "id": "proj-netauto-firewall-panos-m4",
        "order": 4,
        "title": "Policy audit and application onboarding",
        "objectives": ["Audit for expired, unused and broad rules", "Onboard a new application from YAML", "Document rollback"],
        "instructions": "Build the audit role: read the live rulebase back, compare it with vars/policy.yaml, and report rules that are expired, rules with no matching traffic in the (locally supplied or lab) hit-count data, and rules broader than /24 or using any/any. Then onboard a new application end to end: add its objects, group, security rule and NAT rule to the YAML only, run check mode, review the diff, apply, commit with confirmation, and re-run the audit to show the new rules present and no rule expired. Document the rollback path (remove the YAML entries, re-run, commit) and the lab setup in the README.",
        "concepts": ["Policy lifecycle", "Rule audit", "Rollback"],
        "hints": ["Expired rules are the easiest audit win — start there.", "Onboarding from YAML only proves the data model works.", "Rollback is the same pipeline in reverse."],
        "acceptanceCriteria": ["The audit flags an expired rule in the fixture data", "The audit flags an any/any rule as overly broad", "A new application is onboarded from a YAML change alone", "Rollback by removing the YAML entries restores the prior rulebase"],
        "tests": ["Run the audit against fixture data with an expired rule", "Onboard the application and re-run the audit", "Remove the entries, re-run and confirm the rules are gone"]
      }
    ],
    "reviewChecklist": [
      "Every rule has an owner, ticket and expiry",
      "Check mode shows a reviewable diff before any commit",
      "Commits are gated on explicit confirmation and verified",
      "A second run reports zero changes",
      "The audit finds expired, unused and overly broad rules",
      "No credential is stored in plaintext"
    ],
    "finalAssessment": [
      "Onboard a new application from a YAML change and show the diff",
      "Show a second run reporting zero changes",
      "Demonstrate the commit gate refusing an unconfirmed commit",
      "Run the audit and explain each flagged rule",
      "Roll back an application onboarding and show the rulebase restored"
    ]
  },
  {
    "id": "proj-netauto-firewall-fortios",
    "slug": "netauto-firewall-fortios",
    "level": 3,
    "title": "Firewall Policy Automation: Fortinet",
    "description": "Automate a FortiGate firewall with Ansible: address objects, address groups, firewall policies and NAT are declared in YAML and applied through the FortiOS API using the fortinet.fortios collection, with check-mode diffs and a strict ordering model (policies are ordered, and order is policy). The project also covers backup-before-change and a restore path, so a bad policy push is recoverable in minutes. Done means a new service ships from one YAML change, a second run reports zero changes, a backup exists for every change, and the audit flags expired or shadowed policies.",
    "skills": ["Ansible", "FortiOS", "FortiGate", "Firewall policies", "NAT", "Address objects", "Backup and restore", "Policy ordering"],
    "language": "ansible",
    "functionalRequirements": [
      "Define address objects, address groups and service objects in YAML",
      "Create firewall policies with source/destination interfaces, addresses, services and actions",
      "Order policies explicitly so a new policy lands in the intended position",
      "Create NAT rules (SNAT for outbound, DNAT/VIP for published services)",
      "Take a configuration backup before every change and store it versioned",
      "Show a diff in check mode before applying",
      "Enforce owner, ticket and expiry metadata on every policy",
      "Audit for expired, shadowed and unused policies"
    ],
    "nonFunctionalRequirements": [
      "A second playbook run reports zero changes",
      "No change is applied without a fresh backup",
      "Policy order is explicit in the data, never implicit in task order",
      "Credentials come from Ansible Vault, never plaintext",
      "A restore from backup returns the firewall to the previous policy set"
    ],
    "architecture": "Policy is YAML data consumed by Ansible roles (objects, policies, nat, backup, audit) through the fortinet.fortios collection against the FortiOS API. A backup role snapshots the running config to a versioned file before any change; the policy role applies address objects, services, policies and VIPs with an explicit policyid and ordering, and check mode produces the diff for review. An audit role reads the policy table back and flags expired policies, policies shadowed by an earlier broader policy, and policies with no hit count in the supplied traffic data. Without a lab FortiGate, the playbooks run against a local FortiOS API stub with recorded responses.",
    "databaseSchema": "",
    "apis": [
      "CLI: ansible-playbook site.yml --check, ansible-playbook site.yml, ansible-playbook audit.yml, ansible-playbook restore.yml",
      "FortiOS API via fortinet.fortios collection (fortios_firewall_policy, fortios_firewall_address, fortios_firewall_vip)",
      "Ansible Vault: ansible-vault create/edit for firewall credentials"
    ],
    "fileStructure": "firewall-fortios/\n  site.yml\n  audit.yml\n  restore.yml\n  inventory/\n    hosts.ini\n  group_vars/\n    fortios.yml\n    vault.yml\n  roles/\n    backup/\n      tasks/main.yml\n    objects/\n      tasks/main.yml\n    policies/\n      tasks/main.yml\n    nat/\n      tasks/main.yml\n    audit/\n      tasks/main.yml\n  vars/\n    policy.yaml\n  backups/\n  README.md",
    "taskBreakdown": [
      "Design the interface/zone model and the policy data schema",
      "Set up inventory, Vault and the fortios collection",
      "Build the backup role and the objects role",
      "Build the policies role with explicit ordering",
      "Build the NAT/VIP role",
      "Add the audit role for expired, shadowed and unused policies",
      "Publish a new service end to end from one YAML change",
      "Practise restore from backup and document the runbook"
    ],
    "milestones": [
      {
        "id": "proj-netauto-firewall-fortios-m1",
        "order": 1,
        "title": "Model, connectivity and backup",
        "objectives": ["Design the interface and object model", "Connect Ansible to FortiOS", "Take a versioned backup"],
        "instructions": "Design the interfaces (port1 WAN, port2 LAN, port3 DMZ) and write vars/policy.yaml with address objects, one group and two services, each policy entry carrying owner, ticket and expiry. Set up the inventory and Vault credentials, install the fortinet.fortios collection, and prove read-only connectivity by listing firewall policies. Build the backup role to snapshot the running config into backups/ with a timestamped filename, and confirm a backup file is created before any change is attempted.",
        "concepts": ["FortiOS interfaces", "Ansible Vault", "Backup before change"],
        "hints": ["Backup first is a rule, not a suggestion.", "Read-only facts prove connectivity without risk.", "A timestamped backup name is its own audit trail."],
        "acceptanceCriteria": ["The YAML models three interfaces, objects and a group", "Ansible lists policies read-only from the firewall (or the documented stub)", "A timestamped backup exists in backups/", "A policy missing owner or expiry fails validation"],
        "tests": ["Run the read-only policy list", "Run the backup role and list backups/", "Remove an expiry and re-validate"]
      },
      {
        "id": "proj-netauto-firewall-fortios-m2",
        "order": 2,
        "title": "Objects, policies and ordering",
        "objectives": ["Create address and service objects", "Create ordered firewall policies", "Prove policy order is explicit"],
        "instructions": "Build the objects role and the policies role: policies carry an explicit policyid and an order field, and the role applies them in that order rather than in task order. Create a LAN-to-WAN allow policy, a LAN-to-DMZ policy and a deny-all policy last, then read the policy table back and confirm the order matches the YAML. Run in check mode first and read the diff, then apply (lab only).",
        "concepts": ["Firewall policy order", "Policy IDs", "Check mode"],
        "hints": ["Order is policy — a misplaced allow can shadow a deny.", "Deny-all goes last, always.", "Read the table back; never assume the order applied."],
        "acceptanceCriteria": ["All objects and policies exist as defined", "The live policy order matches the YAML order", "Deny-all is the last policy", "Check mode shows the diff before any change"],
        "tests": ["Run in check mode and read the diff", "Apply and read back the policy table", "Reorder two policies in YAML and confirm the table follows"]
      },
      {
        "id": "proj-netauto-firewall-fortios-m3",
        "order": 3,
        "title": "NAT, VIPs and idempotency",
        "objectives": ["Create SNAT and DNAT/VIP rules", "Prove a second run is a no-op", "Verify the backup gate"],
        "instructions": "Build the nat role: SNAT for LAN-to-WAN outbound traffic and a VIP (DNAT) publishing a DMZ web server on port 443, with the matching firewall policy referencing the VIP. Apply the full playbook, then run it a second time and confirm zero changes. Prove the backup gate by deleting the latest backup and confirming the playbook refuses to apply changes until a fresh backup exists.",
        "concepts": ["SNAT and DNAT", "Virtual IPs", "Idempotency"],
        "hints": ["A VIP without its policy publishes nothing.", "Zero changes on re-run is the proof.", "The backup gate must fail closed."],
        "acceptanceCriteria": ["SNAT and the VIP exist with correct translations", "The VIP policy allows traffic to the published service", "A second full run reports zero changes", "The playbook refuses to change anything without a fresh backup"],
        "tests": ["Apply and read back NAT and VIP tables", "Run the playbook twice and compare change counts", "Delete the backup and re-run"]
      },
      {
        "id": "proj-netauto-firewall-fortios-m4",
        "order": 4,
        "title": "Audit, publish and restore",
        "objectives": ["Audit for expired, shadowed and unused policies", "Publish a new service from YAML", "Restore from backup"],
        "instructions": "Build the audit role: read the policy table back and flag expired policies, policies shadowed by an earlier broader policy (a later specific allow hidden behind an earlier any/any), and policies with zero hits in the supplied traffic data. Publish a new service end to end from a YAML change alone — objects, VIP, policy — then run the audit to show it clean. Finally, practise restore: apply a deliberately wrong policy change, run restore.yml against the last backup, and confirm the policy table matches the pre-change state.",
        "concepts": ["Shadowed policies", "Policy audit", "Restore from backup"],
        "hints": ["A shadowed policy is a policy that can never match.", "Audit with real hit-count data when the lab provides it.", "Practise restore before you need it for real."],
        "acceptanceCriteria": ["The audit flags a shadowed policy in fixture data", "The audit flags an expired policy", "A new service is published from a YAML change alone", "Restore returns the policy table to its pre-change state"],
        "tests": ["Run the audit on shadowed-policy fixtures", "Publish the service and re-run the audit", "Break a policy, restore, and compare the tables"]
      }
    ],
    "reviewChecklist": [
      "A fresh backup exists before every change",
      "Policy order in the firewall matches the YAML order",
      "Every policy has owner, ticket and expiry",
      "A second run reports zero changes",
      "The audit finds expired, shadowed and unused policies",
      "Restore from backup is practised and works"
    ],
    "finalAssessment": [
      "Publish a new service from a YAML change and show the diff",
      "Show a second run reporting zero changes",
      "Run the audit and explain a shadowed policy",
      "Delete the backup and show the playbook refusing to change anything",
      "Restore from backup after a bad change and show the table recovered"
    ]
  },
  {
    "id": "proj-netauto-network-cicd",
    "slug": "netauto-network-cicd",
    "level": 4,
    "title": "Network CI/CD Pipeline with Pre/Post Checks",
    "description": "Build a full CI/CD pipeline for network changes: a proposed config change is rendered and validated in CI, pre-change health checks capture a baseline, the change is deployed to a lab in waves, post-change checks prove the network still works, and any failure triggers an automatic rollback. The pipeline treats network changes like software releases — reviewed, tested, deployed in stages, and reversible. Done means a bad change is caught by CI before deployment, a good change deploys in waves with passing post-checks, and a failing post-check rolls the lab back automatically.",
    "skills": ["CI/CD pipelines", "Pre/post change checks", "Network validation", "Canary deployments", "Automatic rollback", "Python", "GitHub Actions", "Change management"],
    "language": "python",
    "functionalRequirements": [
      "Render and validate a proposed config change in CI on every pull request",
      "Run pre-change health checks (reachability, BGP sessions, interface status) and store a baseline",
      "Deploy changes to a lab in waves: one device, then a group, then the rest",
      "Run post-change checks after each wave and compare against the baseline",
      "Roll back automatically when a post-check fails, and report the rollback",
      "Block deployment when the baseline itself is unhealthy",
      "Require an approval step before the production-wave equivalent runs",
      "Record every pipeline run with the change, checks, deploy outcome and rollback if any"
    ],
    "nonFunctionalRequirements": [
      "No change reaches a device without passing CI validation",
      "A failing post-check rolls back within 5 minutes",
      "The baseline is captured fresh for every run, never reused from an old run",
      "Pipeline secrets are stored as CI secrets, never in the repo",
      "Every run is traceable from a commit to a deploy outcome"
    ],
    "architecture": "The pipeline is a GitHub Actions workflow plus a Python check library: the CI job renders the proposed configs from the repo's data and templates and runs validation and linting on every pull request, posting the diff as a PR comment. The deploy job runs pre-change checks (ping, BGP session state, interface errors) against the lab inventory and stores the baseline as a JSON artifact; it then deploys in waves with a pause and a post-check after each wave, comparing live results against the baseline, and rolls back by re-applying the previous committed configs when a check fails. Locally the whole pipeline runs against simulated device transcripts and a Containerlab inventory; real devices are lab-only.",
    "databaseSchema": "",
    "apis": [
      "CI: GitHub Actions workflows ci.yml and deploy.yml",
      "CLI: python checks.py pre --inventory lab.yaml, python checks.py post --baseline baseline.json",
      "CLI: python deploy.py --wave 1, python rollback.py --to <commit>"
    ],
    "fileStructure": "network-cicd/\n  .github/\n    workflows/\n      ci.yml\n      deploy.yml\n  src/\n    render.py\n    validate.py\n    checks.py\n    deploy.py\n    rollback.py\n  inventory/\n    lab.yaml\n  changes/\n    change-001/\n  simulated_devices/\n  runs/\n  README.md",
    "taskBreakdown": [
      "Define the lab inventory and the change format",
      "Build the render and validation step for CI",
      "Write the pre-change and post-change check library",
      "Build the wave deployer and the rollback script",
      "Wire the CI workflow with plan comments",
      "Wire the deploy workflow with approval and waves",
      "Test a good change, a bad change and a failing post-check",
      "Document the runbook and the approval model"
    ],
    "milestones": [
      {
        "id": "proj-netauto-network-cicd-m1",
        "order": 1,
        "title": "CI validation and change format",
        "objectives": ["Define the change format", "Render and validate in CI", "Post the diff as a PR comment"],
        "instructions": "Define a change as a directory under changes/ with a YAML intent file and the rendered configs it produces, and write render.py plus validate.py to render and check it locally. Write .github/workflows/ci.yml to run rendering, validation and linting on every pull request and post the config diff as a PR comment. Open a PR with a good change and one with a broken change (an unknown VLAN) and confirm the first gets a green check with its diff and the second fails before any deploy step could run.",
        "concepts": ["CI gates", "Change as code", "Plan as review artifact"],
        "hints": ["CI must fail before deployment, not during it.", "The diff comment is what the reviewer approves.", "Validate locally first — CI should never be the first check."],
        "acceptanceCriteria": ["A good change passes CI with its diff posted", "A broken change fails CI with a named error", "No deploy step runs for a failed CI run", "Validation runs identically locally and in CI"],
        "tests": ["Run render and validate locally on both changes", "Open the two PRs and read the CI results", "Break a second thing and confirm CI still fails"]
      },
      {
        "id": "proj-netauto-network-cicd-m2",
        "order": 2,
        "title": "Pre-change checks and baselines",
        "objectives": ["Write the health check library", "Capture a fresh baseline per run", "Block deploys on an unhealthy baseline"],
        "instructions": "Write checks.py with pre-change checks — reachability per device, BGP session state, interface error counters — that run against the lab inventory and, locally, against simulated device transcripts in simulated_devices/. The deploy job runs the pre-checks first and stores the baseline as a JSON artifact; if any baseline check fails, the run stops before deploying anything. Test with a healthy fixture set and with a fixture where one BGP session is down, and confirm the second blocks the deploy.",
        "concepts": ["Health baselines", "Pre-change checks", "Fail closed"],
        "hints": ["A baseline from last week is not a baseline.", "Check the thing you are about to change first.", "Simulated transcripts make this testable without a lab."],
        "acceptanceCriteria": ["Pre-checks cover reachability, BGP and interface errors", "A fresh baseline artifact is stored per run", "An unhealthy baseline blocks the deploy", "Checks run locally against simulated transcripts"],
        "tests": ["Run pre-checks on healthy fixtures", "Run pre-checks with a down BGP session", "Inspect a stored baseline artifact"]
      },
      {
        "id": "proj-netauto-network-cicd-m3",
        "order": 3,
        "title": "Wave deploys and post-change checks",
        "objectives": ["Deploy in waves", "Run post-checks after each wave", "Compare post-checks against the baseline"],
        "instructions": "Write deploy.py to apply a change in waves — wave 1 is one device, wave 2 is half the remaining devices, wave 3 is the rest — with a post-check after each wave comparing live results against the stored baseline (same BGP sessions up, no new interface errors, reachability intact). Locally, the deployer applies configs to the simulated devices and the post-checks read their updated transcripts; in a lab it uses Netmiko/NAPALM. Run a good change through all three waves and confirm every post-check passes.",
        "concepts": ["Canary deployments", "Wave rollouts", "Post-change verification"],
        "hints": ["Wave 1 is the canary — keep it small.", "Post-checks compare against the baseline, not against hope.", "Pause between waves so a human can stop the run."],
        "acceptanceCriteria": ["The change deploys in three waves in order", "Post-checks run after every wave", "Post-checks compare against the stored baseline", "A good change passes all waves with no errors"],
        "tests": ["Deploy a good change and read the per-wave results", "Check the wave order in the run log", "Verify post-check output references the baseline"]
      },
      {
        "id": "proj-netauto-network-cicd-m4",
        "order": 4,
        "title": "Automatic rollback and approvals",
        "objectives": ["Roll back automatically on a failed post-check", "Require approval before the final wave", "Record every run"],
        "instructions": "Write rollback.py to re-apply the previous committed configs for the affected devices and re-run the post-checks to prove recovery. Wire the deploy workflow so a failed post-check in any wave triggers rollback automatically and records the outcome in runs/, and so the final wave requires an explicit approval (a GitHub environment approval or a manual confirm flag locally). Test the failure path with a change whose post-check fails in wave 2 — confirm the rollback runs, the devices return to their previous configs, and the run record shows the failure and the rollback. Finish the README with the approval model and the rollback runbook.",
        "concepts": ["Automatic rollback", "Approval gates", "Run records"],
        "hints": ["Rollback must be tested, not just written.", "The approval gate belongs before the biggest blast radius.", "The run record is the audit trail."],
        "acceptanceCriteria": ["A failing post-check triggers automatic rollback", "Rollback restores the previous configs and post-checks pass", "The final wave requires explicit approval", "Every run is recorded with change, checks and outcome"],
        "tests": ["Deploy a change that fails in wave 2 and watch the rollback", "Verify the configs after rollback match the previous commit", "Attempt the final wave without approval"]
      }
    ],
    "reviewChecklist": [
      "CI catches bad changes before any deploy",
      "A fresh baseline is captured for every run",
      "Deploys happen in waves with post-checks after each",
      "A failed post-check rolls back automatically",
      "The final wave needs explicit approval",
      "Every run is recorded and traceable to a commit"
    ],
    "finalAssessment": [
      "Open a bad PR and show CI stopping it",
      "Run a good change through all three waves",
      "Inject a post-check failure and show automatic rollback",
      "Show the run record for the failed and the successful run",
      "Explain where the approval gate sits and why"
    ]
  },
  {
    "id": "proj-netauto-telemetry",
    "slug": "netauto-telemetry",
    "level": 3,
    "title": "Streaming Telemetry Pipeline",
    "description": "Build a streaming telemetry pipeline that collects interface counters, BGP state and device health from network devices, stores the time series locally, and turns it into dashboards and alerts. The collector speaks gNMI/gRPC where available and falls back to a documented local SNMP/CLI sample feed, so the whole pipeline is buildable and testable without a device. Done means a live dashboard shows per-interface throughput and errors over time, an alert fires when an interface error rate crosses a threshold, and the data survives a restart.",
    "skills": ["Streaming telemetry", "gNMI", "gRPC", "Time-series data", "SNMP", "Dashboards", "Alerting", "Python"],
    "language": "python",
    "functionalRequirements": [
      "Collect interface counters (in/out octets, errors, discards) on a regular poll interval",
      "Collect BGP session state and device CPU/memory health",
      "Store samples in a local time-series store (SQLite) with timestamps",
      "Support a gNMI subscription path and a local sample-feed fallback for testing",
      "Render a dashboard showing throughput and errors per interface over time",
      "Alert when an interface error rate or CPU crosses a configurable threshold",
      "Retain at least 7 days of samples with a documented retention policy",
      "Export samples as CSV for offline analysis"
    ],
    "nonFunctionalRequirements": [
      "The pipeline runs entirely locally without a live device",
      "A collector restart loses no stored samples",
      "Samples are timestamped at collection time, never at insert time",
      "The dashboard renders for 20 interfaces without noticeable lag",
      "Alert thresholds are configurable, not hardcoded"
    ],
    "architecture": "A Python collector polls or subscribes to devices — gNMI over gRPC for real devices in a lab, and a local sample-feed generator that emits realistic counter streams for development — normalises each sample into (device, interface, metric, value, timestamp) rows and writes them to SQLite. A small query layer aggregates samples into per-interface throughput and error rates, a dashboard (a local HTML page generated from the data, or Grafana against the same SQLite via a documented setup) renders the time series, and an alerting loop evaluates thresholds on each collection cycle and writes alerts to a log and a JSON file.",
    "databaseSchema": "samples: id INTEGER PK, device TEXT, interface TEXT, metric TEXT, value REAL, collected_at TIMESTAMPTZ; alerts: id INTEGER PK, device TEXT, interface TEXT, metric TEXT, threshold REAL, observed REAL, fired_at TIMESTAMPTZ, cleared_at TIMESTAMPTZ",
    "apis": [
      "CLI: python collector.py --feed sample, python collector.py --gnmi lab.yaml",
      "CLI: python dashboard.py --out dashboard.html, python alerts.py --check",
      "Export: python export.py --device sw-01 --format csv"
    ],
    "fileStructure": "telemetry/\n  src/\n    collector.py\n    sample_feed.py\n    store.py\n    queries.py\n    dashboard.py\n    alerts.py\n    export.py\n  config/\n    thresholds.yaml\n    devices.yaml\n  telemetry.db\n  tests/\n    test_queries.py\n    test_alerts.py\n  README.md",
    "taskBreakdown": [
      "Design the sample schema and the thresholds config",
      "Build the sample feed and the collector",
      "Implement the SQLite store and the query layer",
      "Build the dashboard generator",
      "Build the alerting loop with configurable thresholds",
      "Add CSV export and the retention policy",
      "Test alerts with injected error bursts",
      "Document the gNMI lab setup for real devices"
    ],
    "milestones": [
      {
        "id": "proj-netauto-telemetry-m1",
        "order": 1,
        "title": "Collector and sample feed",
        "objectives": ["Design the metric schema", "Build the sample feed", "Collect and store samples"],
        "instructions": "Define the metrics (interface in/out octets, errors, discards; BGP session state; CPU and memory) and write sample_feed.py to emit realistic counter streams for three devices with five interfaces each, including a slow error creep on one interface. Write collector.py to read the feed on a 10-second interval, timestamp each sample at collection time, and store it in SQLite via store.py. Run the collector for two minutes and query the database to confirm samples are landing with correct timestamps.",
        "concepts": ["Telemetry metrics", "Time-series storage", "Collection intervals"],
        "hints": ["Timestamp at collection, never at insert.", "A sample feed makes the whole pipeline testable offline.", "Counters are cumulative — rates come from differences."],
        "acceptanceCriteria": ["Samples land in SQLite for all three devices", "Every sample has a collection-time timestamp", "The error-creep interface shows rising errors over time", "The collector survives a restart without losing stored samples"],
        "tests": ["Run the collector for two minutes and count rows", "Query the error-creep interface over time", "Restart the collector and confirm old rows remain"]
      },
      {
        "id": "proj-netauto-telemetry-m2",
        "order": 2,
        "title": "Queries and dashboard",
        "objectives": ["Compute throughput and error rates", "Generate a dashboard", "Support per-interface views"],
        "instructions": "Write queries.py to compute per-interface throughput (octet deltas over time) and error rates from the raw counters, handling counter resets safely. Write dashboard.py to generate a local HTML dashboard from the query results: one throughput chart and one error chart per interface, plus a BGP session state table and a device health panel. Generate the dashboard from two minutes of collected data and open it to confirm every interface appears with sensible numbers.",
        "concepts": ["Counter deltas", "Throughput calculation", "Time-series visualisation"],
        "hints": ["A counter that goes down is a reset, not negative traffic.", "Rates need two samples — one sample is a point, not a rate.", "The dashboard is generated data, not a live server."],
        "acceptanceCriteria": ["Throughput is computed correctly from counter deltas", "The dashboard shows all interfaces with throughput and errors", "BGP state and device health are visible", "A counter reset does not produce a negative rate"],
        "tests": ["Compute throughput by hand for one interface and compare", "Generate the dashboard and check every interface is present", "Inject a counter reset and re-run the query"]
      },
      {
        "id": "proj-netauto-telemetry-m3",
        "order": 3,
        "title": "Alerting on thresholds",
        "objectives": ["Make thresholds configurable", "Fire alerts on breaches", "Record and clear alerts"],
        "instructions": "Write config/thresholds.yaml with thresholds for interface error rate, CPU and memory, and alerts.py to evaluate them on each collection cycle: when a metric crosses its threshold, record an alert in the alerts table and append it to alerts.json; when it drops back below, record a cleared time. Test with the error-creep interface (it should fire) and with a healthy interface (it should not), and confirm the alert record names the device, interface, metric, threshold and observed value.",
        "concepts": ["Threshold alerting", "Alert lifecycle", "Config-driven thresholds"],
        "hints": ["An alert must name the threshold and the observed value.", "Clearing matters as much as firing.", "Thresholds in config, not in code."],
        "acceptanceCriteria": ["The error-creep interface fires an alert", "Healthy interfaces fire no alerts", "Alerts record threshold and observed values", "A recovered metric records a cleared time"],
        "tests": ["Run alerts against the collected data", "Lower a threshold and confirm more alerts fire", "Recover the metric and check the cleared time"]
      },
      {
        "id": "proj-netauto-telemetry-m4",
        "order": 4,
        "title": "Export, retention and the gNMI lab runbook",
        "objectives": ["Export samples as CSV", "Enforce the retention policy", "Document gNMI against real devices"],
        "instructions": "Write export.py to dump samples for a device and time range as CSV, and add a retention job that deletes samples older than 7 days (keeping alert records). Run the full pipeline end to end — collect, dashboard, alert, export — and time the dashboard generation for 20 interfaces. Write the README runbook for pointing the collector at real devices over gNMI in a lab (Containerlab or physical devices with gNMI enabled), labelling that step lab-only and noting the sample feed is the offline substitute.",
        "concepts": ["Data export", "Retention policies", "gNMI subscriptions"],
        "hints": ["Retention keeps the database small and honest.", "CSV export is what an engineer actually analyses.", "The lab runbook is the bridge to real devices."],
        "acceptanceCriteria": ["CSV export contains the requested device and range", "Samples older than 7 days are pruned, alerts are kept", "The dashboard generates for 20 interfaces without lag", "The README labels gNMI device steps as lab-only"],
        "tests": ["Export a device range and inspect the CSV", "Insert an old sample and run retention", "Generate the dashboard for 20 interfaces and time it"]
      }
    ],
    "reviewChecklist": [
      "Samples are stored with collection-time timestamps",
      "Throughput and error rates are computed correctly",
      "The dashboard covers every interface",
      "Alerts fire and clear with full context",
      "Retention and export work as documented",
      "Real-device gNMI steps are labelled lab-only"
    ],
    "finalAssessment": [
      "Run the collector and show samples landing in the database",
      "Show the dashboard and explain one interface's throughput",
      "Trigger an alert with an error burst and show the alert record",
      "Export a device's samples as CSV",
      "Explain how the collector would switch from the sample feed to gNMI"
    ]
  },
  {
    "id": "proj-netauto-vxlan-fabric",
    "slug": "netauto-vxlan-fabric",
    "level": 4,
    "title": "VXLAN/EVPN Fabric Automation",
    "description": "Automate a VXLAN/EVPN data-centre fabric from a single YAML model: leaf and spine switches, VTEPs, VNIs, EVPN route targets and BGP underlay/overlay sessions are generated per device, validated against fabric invariants, and checked for consistency across the whole fabric. The project covers the underlay first, then the EVPN overlay, then tenant VNIs, so each layer is proven before the next is built on it. Done means a four-leaf, two-spine fabric renders from one YAML file, the invariant checker proves the underlay and overlay are consistent, and adding a tenant VNI touches only the intended devices — all verified locally, with lab deployment labelled as a separate step.",
    "skills": ["VXLAN", "EVPN", "BGP", "Data-centre fabrics", "VTEP", "VNI", "Route targets", "Python"],
    "language": "python",
    "functionalRequirements": [
      "Model a fabric in YAML: spines, leaves, VTEPs, loopbacks, VNIs and tenants",
      "Render per-device underlay configs (loopbacks, underlay BGP or OSPF, MTU)",
      "Render per-device EVPN overlay configs (BGP EVPN address family, route targets)",
      "Generate VNI-to-VLAN mappings and tenant L2/L3 VNI assignments",
      "Validate the model: unique VNIs, unique loopbacks, consistent route targets per tenant",
      "Check fabric invariants on the output: full leaf-spine underlay mesh, EVPN sessions to route reflectors",
      "Produce a fabric map showing every VTEP, VNI and tenant placement",
      "Diff a fabric generation to show exactly which devices change when a tenant is added"
    ],
    "nonFunctionalRequirements": [
      "An invalid model fails with a message naming the offending entry",
      "Re-rendering an unchanged model produces byte-identical configs",
      "No two tenants share a VNI or a route target",
      "The generator runs entirely locally with no device access",
      "A six-device fabric renders in under 10 seconds"
    ],
    "architecture": "One YAML fabric model drives everything: a Python loader validates it, then Jinja2 templates render underlay and overlay configs per device, with a separate tenant module for VNI and VLAN mappings. An invariant checker parses the rendered output and verifies the leaf-spine underlay mesh, that every leaf peers with the EVPN route reflectors, that VNIs and route targets are unique per tenant, and that every VNI referenced on a leaf exists in the model. A fabric-map generator prints the VTEP/VNI/tenant placement, and a diff step compares generations. Deployment to a Containerlab EVPN lab is a separate, labelled lab step.",
    "databaseSchema": "",
    "apis": [
      "CLI: python fabric_gen.py validate fabric.yaml, python fabric_gen.py render fabric.yaml",
      "CLI: python fabric_gen.py check output/, python fabric_gen.py map fabric.yaml",
      "Input: YAML model with spines, leaves, VTEPs, VNIs and tenants"
    ],
    "fileStructure": "vxlan-fabric/\n  fabric.yaml\n  src/\n    model.py\n    validate.py\n    render.py\n    invariants.py\n    fabric_map.py\n  templates/\n    underlay.j2\n    evpn_overlay.j2\n    tenant_vni.j2\n  output/\n  tests/\n    test_validate.py\n    test_invariants.py\n    fixtures/\n  README.md",
    "taskBreakdown": [
      "Design the fabric model: 2 spines, 4 leaves, tenants and VNIs",
      "Write the model loader and validation rules",
      "Render the underlay configs and check the mesh",
      "Render the EVPN overlay and route targets",
      "Add tenant VNIs and VNI-to-VLAN mappings",
      "Build the fabric map and the generation diff",
      "Test validation against broken models",
      "Document the Containerlab lab deployment"
    ],
    "milestones": [
      {
        "id": "proj-netauto-vxlan-fabric-m1",
        "order": 1,
        "title": "Model the fabric and validate it",
        "objectives": ["Design the YAML fabric model", "Model spines, leaves and VTEPs", "Validate uniqueness and consistency"],
        "instructions": "Write fabric.yaml for a fabric with two spines, four leaves, one loopback per device, and two tenants (tenant-a with one L2 VNI and one L3 VNI, tenant-b with one L2 VNI). Write model.py and validate.py to check loopback uniqueness, VNI uniqueness, that every leaf's VTEP address is its own loopback, and that route targets are consistent per tenant. Run validation on the good model and confirm it passes.",
        "concepts": ["Leaf-spine fabrics", "VTEPs and VNIs", "Route targets"],
        "hints": ["The fabric model is the truth; configs are views of it.", "A VNI is unique per tenant, not per device.", "Validate before rendering, always."],
        "acceptanceCriteria": ["The model covers 2 spines, 4 leaves and 2 tenants", "Loopbacks and VNIs are unique", "Every leaf VTEP matches its loopback", "Validation passes on the good model"],
        "tests": ["Run validate on the good model", "Duplicate a VNI and re-validate", "Duplicate a loopback and re-validate"]
      },
      {
        "id": "proj-netauto-vxlan-fabric-m2",
        "order": 2,
        "title": "Underlay rendering and mesh check",
        "objectives": ["Render underlay configs", "Verify the leaf-spine mesh", "Check MTU and loopback consistency"],
        "instructions": "Write templates/underlay.j2 covering loopback interfaces, underlay BGP sessions from each leaf to both spines, and jumbo MTU on fabric links. Render the underlay for all six devices, then write the underlay half of invariants.py to parse the output and verify every leaf peers with both spines, every spine peers with every leaf, and every loopback in a config matches the model. Read one leaf and one spine config end to end.",
        "concepts": ["Underlay routing", "BGP mesh", "Jumbo MTU"],
        "hints": ["The underlay must work before the overlay can.", "Every leaf to every spine — count the sessions.", "MTU must be consistent on both ends of a link."],
        "acceptanceCriteria": ["Underlay configs render for all six devices", "Every leaf peers with both spines in the output", "Loopbacks in configs match the model", "MTU is set consistently on fabric links"],
        "tests": ["Render the underlay and count sessions per leaf", "Run the mesh check on the output", "Remove one spine session and re-check"]
      },
      {
        "id": "proj-netauto-vxlan-fabric-m3",
        "order": 3,
        "title": "EVPN overlay and tenant VNIs",
        "objectives": ["Render the EVPN overlay", "Add tenant VNI mappings", "Check overlay invariants"],
        "instructions": "Write templates/evpn_overlay.j2 for the BGP EVPN address family with route-reflector sessions (spines as reflectors) and per-tenant route targets, and templates/tenant_vni.j2 for VNI-to-VLAN mappings and L3 VNI SVIs. Render the full fabric, then extend invariants.py to verify every leaf has an EVPN session to both reflectors, every VNI on a leaf exists in the model, and no two tenants share a VNI or route target. Add a third tenant to the model, re-render, and confirm only the intended leaves change.",
        "concepts": ["EVPN control plane", "Route reflectors", "L2 and L3 VNIs"],
        "hints": ["Route targets are what keep tenants apart.", "An L3 VNI needs an SVI; an L2 VNI needs a VLAN.", "A new tenant should be a small, reviewable diff."],
        "acceptanceCriteria": ["Every leaf peers EVPN with both route reflectors", "Every VNI in the output exists in the model", "No two tenants share a VNI or route target", "Adding a tenant changes only the intended devices"],
        "tests": ["Render the full fabric and run the overlay checks", "Add a tenant, re-render and inspect the diff", "Duplicate a route target and re-validate"]
      },
      {
        "id": "proj-netauto-vxlan-fabric-m4",
        "order": 4,
        "title": "Fabric map, diff and lab runbook",
        "objectives": ["Generate the fabric map", "Diff fabric generations", "Document the lab deployment"],
        "instructions": "Write fabric_map.py to print a map of the fabric: every device, its VTEP address, its VNIs and which tenants live where. Add a generation diff comparing the current output with the previous generation, and demonstrate it by adding a VLAN to an existing tenant. Time a full render of the six-device fabric. Finally, write the README runbook for deploying the configs to a Containerlab EVPN lab (with the caveat that this needs lab switches that support VXLAN/EVPN), labelling every device step as lab-only.",
        "concepts": ["Fabric maps", "Generation diffs", "Lab-only deployment"],
        "hints": ["The map is what an operator reads during an incident.", "A diff proves a small change stays small.", "Name the lab requirements honestly — not every switch does EVPN."],
        "acceptanceCriteria": ["The fabric map lists every VTEP, VNI and tenant placement", "Adding a VLAN changes only the expected lines", "A full render takes under 10 seconds", "The README labels device deployment as lab-only with requirements"],
        "tests": ["Generate the map and verify one tenant by hand", "Add a VLAN, re-render and inspect the diff", "Time a full render"]
      }
    ],
    "reviewChecklist": [
      "The underlay mesh is complete in the rendered output",
      "EVPN sessions reach both route reflectors from every leaf",
      "VNIs and route targets are unique per tenant",
      "A new tenant produces a small, reviewable diff",
      "The fabric map matches the model",
      "Lab deployment is documented as a separate, lab-only step"
    ],
    "finalAssessment": [
      "Add a tenant to the model and show the diff",
      "Show the fabric map and explain one tenant's placement",
      "Break a VNI assignment and show validation catching it",
      "Remove a spine session from a render and show the mesh check failing",
      "Explain the underlay/overlay split and why the order matters"
    ]
  },
  {
    "id": "proj-netauto-ansible-network",
    "slug": "netauto-ansible-network",
    "level": 3,
    "title": "Multi-Vendor Ansible Network Automation",
    "description": "Build one Ansible codebase that manages a multi-vendor network — Cisco IOS, Arista EOS and Juniper Junos devices — from a single inventory, with vendor differences isolated in group variables and roles so the same playbook configures VLANs, interfaces and NTP everywhere. The project proves the abstraction works: one playbook, three vendors, identical intended state, and check mode showing exactly what would change on each device. Done means a VLAN added once in the variables appears correctly on all three vendors, a second run reports zero changes everywhere, and a vendor-specific quirk is handled in one place, not scattered through the playbooks.",
    "skills": ["Ansible", "Multi-vendor networking", "Cisco IOS", "Arista EOS", "Juniper Junos", "Network modules", "Group variables", "Idempotency"],
    "language": "ansible",
    "functionalRequirements": [
      "Maintain one inventory with ios, eos and junos device groups",
      "Configure VLANs identically across all three vendors from one variable set",
      "Configure access and trunk interfaces per vendor from the same data",
      "Configure NTP servers and hostnames on every device",
      "Gather facts from all vendors and produce a single inventory report",
      "Run the whole playbook in check mode and show per-device diffs",
      "Handle one vendor quirk per vendor in group variables, not in playbook logic",
      "Support adding a new VLAN across all vendors from a single variable change"
    ],
    "nonFunctionalRequirements": [
      "One playbook serves all vendors; no per-vendor playbook copies",
      "A second run reports zero changes on every device",
      "Vendor differences live in group_vars, not in task conditionals scattered through roles",
      "Credentials come from Ansible Vault",
      "The playbook runs locally against recorded facts when no lab devices exist"
    ],
    "architecture": "A single inventory groups devices by vendor (ios, eos, junos) and by role. Group variables hold the shared intended state (VLANs, NTP, interfaces) while per-vendor group variables hold the quirks (module names, interface naming, Junos commit behaviour). Roles are written once per concern (vlans, interfaces, system) and use the vendor network modules (ios_vlans, eos_vlans, junos_vlans and friends) selected through variables, so the playbook itself is vendor-neutral. A facts role gathers and reports inventory data, and check mode provides the per-device diff. Against real devices this runs in a Containerlab multi-vendor lab; without one, the same playbooks run in check mode against recorded facts and a local stub inventory.",
    "databaseSchema": "",
    "apis": [
      "CLI: ansible-playbook site.yml --check, ansible-playbook site.yml, ansible-inventory --graph",
      "CLI: ansible all -m ios_facts/eos_facts/junos_facts (via the facts role)",
      "Ansible Vault: ansible-vault create/edit for device credentials"
    ],
    "fileStructure": "ansible-network/\n  site.yml\n  facts.yml\n  inventory/\n    hosts.ini\n  group_vars/\n    all.yml\n    ios.yml\n    eos.yml\n    junos.yml\n    vault.yml\n  roles/\n    vlans/\n      tasks/main.yml\n    interfaces/\n      tasks/main.yml\n    system/\n      tasks/main.yml\n    facts/\n      tasks/main.yml\n  README.md",
    "taskBreakdown": [
      "Design the inventory: three vendors, two roles each",
      "Write the shared variables and the per-vendor quirks",
      "Build the facts role and the inventory report",
      "Build the VLANs role across all three vendors",
      "Build the interfaces and system roles",
      "Prove idempotency with a second run",
      "Add a VLAN across all vendors from one variable change",
      "Document the multi-vendor lab setup"
    ],
    "milestones": [
      {
        "id": "proj-netauto-ansible-network-m1",
        "order": 1,
        "title": "Inventory, variables and facts",
        "objectives": ["Build the multi-vendor inventory", "Separate shared state from vendor quirks", "Gather facts from every device"],
        "instructions": "Write inventory/hosts.ini with six devices — two per vendor (ios, eos, junos) — and group_vars/all.yml with the shared VLAN list, NTP servers and hostnames, plus per-vendor files holding each vendor's quirks (interface naming, module choices, Junos commit handling). Store credentials in Vault. Build the facts role to gather facts from every device — or from recorded facts locally when no lab exists — and produce an inventory report listing each device, vendor, OS version and interface count.",
        "concepts": ["Ansible inventory groups", "Group variables", "Network facts"],
        "hints": ["Shared state in all.yml, quirks in the vendor file.", "Facts first — you cannot automate what you cannot see.", "Recorded facts let you develop without a lab."],
        "acceptanceCriteria": ["The inventory lists six devices in three vendor groups", "Shared variables contain no vendor-specific values", "The facts report covers every device", "No credential appears in plaintext"],
        "tests": ["Run ansible-inventory --graph", "Run the facts role and read the report", "Grep group_vars/all.yml for vendor names"]
      },
      {
        "id": "proj-netauto-ansible-network-m2",
        "order": 2,
        "title": "VLANs across three vendors",
        "objectives": ["Create VLANs from one variable set", "Use the right module per vendor", "Verify the result per device"],
        "instructions": "Build the vlans role to create the VLANs from group_vars/all.yml using ios_vlans, eos_vlans and junos_vlans, selected through a per-vendor variable rather than a chain of conditionals in the tasks. Run in check mode first and read the per-device diff, then apply (lab only) and read the VLAN table back from each device to confirm the same VLANs exist everywhere. Keep the role logic identical for all vendors — only the module name and its arguments differ.",
        "concepts": ["Vendor network modules", "VLAN configuration", "Check mode diffs"],
        "hints": ["One variable set, three modules — that is the whole trick.", "Read the VLAN table back on every vendor.", "Check mode first, on every vendor."],
        "acceptanceCriteria": ["The same VLANs exist on all six devices", "The role uses one variable set for all vendors", "Check mode shows the per-device diff", "No per-vendor playbook copy exists"],
        "tests": ["Run in check mode and read the diffs", "Apply and read back VLAN tables per vendor", "Count the VLANs on one device of each vendor"]
      },
      {
        "id": "proj-netauto-ansible-network-m3",
        "order": 3,
        "title": "Interfaces, system settings and idempotency",
        "objectives": ["Configure interfaces per vendor", "Set hostnames and NTP everywhere", "Prove a second run is a no-op"],
        "instructions": "Build the interfaces role (access ports for the data VLAN, trunks between switches, descriptions from the variable data) and the system role (hostname, NTP servers, DNS) using the per-vendor modules. Apply the full site.yml, then run it a second time and confirm it reports zero changes on every device — if a vendor module reports a spurious change, fix it in the vendor's group variables, not by adding a conditional to the role. Record the per-device change counts from both runs.",
        "concepts": ["Interface configuration", "System settings", "Idempotency"],
        "hints": ["A spurious change on re-run is a bug in your variables.", "Descriptions come from the data, not from the task.", "Record both runs — the comparison is the proof."],
        "acceptanceCriteria": ["Interfaces, hostnames and NTP match the variables on all devices", "A second full run reports zero changes on every device", "Vendor quirks are handled in group_vars only", "Change counts from both runs are recorded"],
        "tests": ["Run the playbook twice and compare change counts", "Read back NTP on one device per vendor", "Grep roles for vendor conditionals"]
      },
      {
        "id": "proj-netauto-ansible-network-m4",
        "order": 4,
        "title": "One VLAN everywhere and the lab runbook",
        "objectives": ["Add a VLAN across all vendors from one change", "Handle a vendor quirk in one place", "Document the lab"],
        "instructions": "Add a new VLAN (guest, VLAN 40) to group_vars/all.yml only, run in check mode, and confirm the diff shows the VLAN being added on all six devices and nowhere else. Apply it and read the VLAN tables back. Then document one real vendor quirk you handled — for example Junos commit behaviour or EOS interface naming — in the README, showing it lives in exactly one group_vars file. Finish the README with the Containerlab multi-vendor lab setup (cEOS, vIOS/vQFX images where available) labelled as lab-only, and the offline alternative using recorded facts.",
        "concepts": ["Single source of truth", "Vendor quirks", "Lab-only device steps"],
        "hints": ["One variable change, six devices — that is the payoff.", "A quirk documented in one place stays fixed.", "Name the lab image requirements honestly."],
        "acceptanceCriteria": ["One variable change adds the VLAN on all six devices", "The check-mode diff shows only the new VLAN", "The quirk is documented and lives in one file", "The README labels device steps as lab-only"],
        "tests": ["Add the VLAN, run check mode and read the diffs", "Apply and read back VLAN tables", "Verify the quirk fix touches one file only"]
      }
    ],
    "reviewChecklist": [
      "One playbook and one variable set serve all three vendors",
      "The same VLANs exist on every device",
      "A second run reports zero changes everywhere",
      "Vendor quirks live in group_vars, not in role logic",
      "The inventory report covers every device",
      "Lab steps are documented as lab-only with an offline alternative"
    ],
    "finalAssessment": [
      "Add a VLAN in one place and show it on all three vendors",
      "Show a second run reporting zero changes on every device",
      "Explain one vendor quirk and where it is handled",
      "Show the facts report and explain what it proves",
      "Walk through the check-mode diff for a new interface change"
    ]
  },
  {
    "id": "proj-netauto-compliance",
    "slug": "netauto-compliance",
    "level": 2,
    "title": "Compliance-as-Code Audit",
    "description": "Build a compliance-as-code audit that checks every device config in a repo against a written set of rules — no Telnet, SSH only from the management network, NTP configured, logging enabled, no default passwords — and produces a pass/fail report per device with a score. Rules live in YAML so a new standard is a data change, not a code change, and the audit runs in CI so a non-compliant config can never be merged. Done means the audit correctly passes a compliant config, fails a config with three planted violations naming each one, and runs green in CI on the clean set.",
    "skills": ["Compliance as code", "Policy rules", "Config auditing", "YAML", "Python", "CI integration", "Reporting", "Network security baselines"],
    "language": "python",
    "functionalRequirements": [
      "Define compliance rules in YAML with id, description, severity and check logic",
      "Check device configs on file against every rule",
      "Report per-device pass/fail with a compliance score",
      "Name each failed rule and the exact config lines involved",
      "Support rule exceptions with owner, reason and expiry",
      "Run in CI and fail the build when a critical rule fails",
      "Track compliance scores over time in a local SQLite database",
      "Generate a summary report for the whole fleet"
    ],
    "nonFunctionalRequirements": [
      "Adding a rule is a YAML change, never a code change",
      "A compliant config scores 100 and produces zero findings",
      "The audit runs entirely on local files — no device access needed",
      "The full audit of 50 configs completes in under 10 seconds",
      "No secret from a config is copied into a report"
    ],
    "architecture": "Rules are YAML data: each rule has an id, a description, a severity and a check expressed as a small pattern (required line, forbidden line, or a Python predicate named in the rule). A Python audit engine loads the rules, parses each config into sections, evaluates every rule against every device, and emits findings naming the rule, the device and the offending lines. Scores are computed per device and stored in SQLite for trend reporting; exceptions are a separate YAML file with owner, reason and expiry, and expired exceptions stop applying. A CI workflow runs the audit on every pull request and fails on any critical finding.",
    "databaseSchema": "audit_runs: id INTEGER PK, run_at TIMESTAMPTZ, devices_checked INTEGER, findings INTEGER; findings: id INTEGER PK, run_id INTEGER, device TEXT, rule_id TEXT, severity TEXT, detail TEXT; scores: id INTEGER PK, run_id INTEGER, device TEXT, score REAL",
    "apis": [
      "CLI: python audit.py --configs configs/ --rules rules.yaml",
      "CLI: python audit.py --device sw-01 --format json, python audit.py trend --days 30",
      "CI: GitHub Actions workflow audit.yml runs the audit on every PR"
    ],
    "fileStructure": "compliance-audit/\n  rules.yaml\n  exceptions.yaml\n  src/\n    rules.py\n    engine.py\n    report.py\n    store.py\n  configs/\n    compliant/\n    violating/\n  .github/\n    workflows/\n      audit.yml\n  compliance.db\n  tests/\n    test_engine.py\n  README.md",
    "taskBreakdown": [
      "Write the baseline standard as ten rules in YAML",
      "Build the rule loader and the audit engine",
      "Create compliant and violating fixture configs",
      "Build the per-device and fleet reports",
      "Add exceptions with expiry and the score history",
      "Wire the audit into CI",
      "Test with planted violations of each severity",
      "Document the standard and the exception process"
    ],
    "milestones": [
      {
        "id": "proj-netauto-compliance-m1",
        "order": 1,
        "title": "Write the standard as rules",
        "objectives": ["Define ten baseline rules in YAML", "Cover access, NTP, logging and passwords", "Make rules data, not code"],
        "instructions": "Write rules.yaml with ten rules: no Telnet server, SSH version 2 only, SSH restricted to the management network, NTP configured with at least two servers, logging enabled to a syslog server, no default or empty passwords, enable secret set, banner configured, SNMP community not set to public, and unused interfaces shut down. Each rule carries an id, description, severity and its check pattern. Write rules.py to load and validate the YAML — a rule missing a severity or a check must fail loading with a named error.",
        "concepts": ["Compliance baselines", "Rules as data", "Severity levels"],
        "hints": ["A rule is data: id, description, severity, check.", "Ten rules is enough to be real and small enough to test.", "Validate the rules file itself — bad rules give bad audits."],
        "acceptanceCriteria": ["Ten rules exist covering all five areas", "Every rule has id, description, severity and a check", "A malformed rule fails loading with a named error", "No rule logic lives in Python code"],
        "tests": ["Load the rules and count them", "Remove a severity and reload", "List the rules by severity"]
      },
      {
        "id": "proj-netauto-compliance-m2",
        "order": 2,
        "title": "Build the audit engine",
        "objectives": ["Parse configs into sections", "Evaluate every rule per device", "Name failures precisely"],
        "instructions": "Write engine.py to parse a config into sections and evaluate every rule against it, emitting findings that name the device, the rule id, the severity and the exact config lines involved. Build two fixture sets: configs/compliant with a config that passes all ten rules, and configs/violating with a config carrying three planted violations (Telnet enabled, one NTP server, public SNMP community). Run the engine on both and confirm the compliant set scores 100 with zero findings and the violating set reports exactly the three planted violations.",
        "concepts": ["Rule evaluation", "Config parsing", "Findings"],
        "hints": ["A finding must name the rule and the lines.", "Fixtures prove the engine — one clean, one dirty.", "Score 100 means zero findings, not 'close enough'."],
        "acceptanceCriteria": ["The compliant config scores 100 with zero findings", "The violating config reports exactly the three planted violations", "Each finding names rule, device and lines", "The engine runs on local files only"],
        "tests": ["Audit the compliant set", "Audit the violating set and count findings", "Check each finding names its lines"]
      },
      {
        "id": "proj-netauto-compliance-m3",
        "order": 3,
        "title": "Reports, exceptions and score history",
        "objectives": ["Generate per-device and fleet reports", "Support expiring exceptions", "Track scores over time"],
        "instructions": "Write report.py to produce a per-device report (score, passed and failed rules) and a fleet summary (average score, worst devices, findings by severity), in text and JSON, with no secrets copied from configs. Add exceptions.yaml for approved deviations with owner, reason and expiry, and confirm an excepted finding is reported as excepted rather than failed — and that an expired exception stops applying. Write store.py to record each run's scores in SQLite and add a trend command showing a device's score over the last 30 days.",
        "concepts": ["Compliance reporting", "Approved exceptions", "Score trends"],
        "hints": ["Exceptions need an expiry or they become permanent.", "A trend shows whether the fleet is improving.", "Redact secrets before they reach a report."],
        "acceptanceCriteria": ["Per-device and fleet reports agree on counts", "An active exception is reported as excepted, not failed", "An expired exception is enforced again", "The trend shows a device's score history"],
        "tests": ["Generate both reports and compare counts", "Add an exception and re-audit", "Expire the exception and re-audit"]
      },
      {
        "id": "proj-netauto-compliance-m4",
        "order": 4,
        "title": "CI gate and the fleet run",
        "objectives": ["Fail CI on critical findings", "Audit the full fixture fleet", "Document the standard"],
        "instructions": "Write .github/workflows/audit.yml to run the audit on every pull request and fail the build when any critical rule fails (warnings may pass with a note). Run the audit over a 20-device fixture fleet, confirm it completes in under 10 seconds, and review the fleet summary. Write the README documenting the ten-rule standard, how to add a rule (YAML only), how to request an exception, and how the CI gate works — plus the lab note that collecting live configs into configs/ requires a lab and is never part of the audit itself.",
        "concepts": ["CI gates", "Fleet auditing", "Standards documentation"],
        "hints": ["Critical findings fail the build; warnings get a note.", "Time the fleet run — slow audits get skipped.", "The README is the standard's home."],
        "acceptanceCriteria": ["CI fails on a PR with a critical violation", "CI passes on the clean set", "A 20-device audit completes in under 10 seconds", "The README documents rules, exceptions and the CI gate"],
        "tests": ["Open a PR with a critical violation", "Open a PR with a clean config", "Time the 20-device audit"]
      }
    ],
    "reviewChecklist": [
      "All ten rules are data in YAML, not code",
      "A compliant config scores 100 with zero findings",
      "Every finding names its rule, device and lines",
      "Exceptions expire and are enforced again afterwards",
      "CI fails on critical findings",
      "No secret appears in any report"
    ],
    "finalAssessment": [
      "Audit the compliant set and show a 100 score",
      "Plant three violations and show the audit naming each one",
      "Add a new rule in YAML only and show it enforced",
      "Add an exception, expire it, and show enforcement returning",
      "Open a violating PR and show CI failing it"
    ]
  },
  {
    "id": "proj-netauto-ospf-migration",
    "slug": "netauto-ospf-migration",
    "level": 3,
    "title": "OSPF Migration Automation",
    "description": "Automate a migration from static routing (or a legacy protocol) to OSPF across a small network: generate per-router OSPF configs from a YAML model, validate the design before touching anything, migrate in waves with a health check after each router, and prove the new OSPF routes match the old static routes before the old ones are removed. The migration is reversible at every step — each router keeps its previous config until the whole network is proven. Done means all routers run OSPF with the intended areas and adjacencies, the route tables match the pre-migration baseline, and a rollback to static routing is demonstrated on one router.",
    "skills": ["OSPF", "Routing migration", "YAML modelling", "Jinja2 templating", "Route validation", "Wave rollouts", "Rollback", "Python"],
    "language": "python",
    "functionalRequirements": [
      "Model the network in YAML: routers, links, areas, router-ids and networks",
      "Generate per-router OSPF configs from Jinja2 templates",
      "Validate the design: unique router-ids, contiguous areas, no overlapping networks",
      "Capture a pre-migration route-table baseline per router",
      "Migrate routers in waves with a health check after each wave",
      "Verify OSPF adjacencies and that OSPF routes match the baseline routes",
      "Remove static routes only after OSPF is proven on that router",
      "Roll back a single router to its previous config on demand"
    ],
    "nonFunctionalRequirements": [
      "No router loses connectivity during its migration wave",
      "The route table after migration matches the baseline (same destinations, same next hops where expected)",
      "An invalid design fails validation before any config is generated",
      "Every step is reversible until the final confirmation",
      "The whole migration is rehearsed locally on files before any lab step"
    ],
    "architecture": "A YAML network model is the design: routers, links, OSPF areas and the networks each router advertises. A Python generator validates the model (unique router-ids, area contiguity, no overlapping networks) and renders per-router OSPF configs with Jinja2. A baseline tool captures each router's route table from local files (or a lab) before migration; a migration runner applies configs in waves, checks OSPF adjacency state and compares the post-migration route table against the baseline after each wave, and only then removes the static routes. A rollback script restores a router's saved previous config. Device steps run in a Containerlab lab; everything else runs locally on files.",
    "databaseSchema": "",
    "apis": [
      "CLI: python ospf_gen.py validate network.yaml, python ospf_gen.py render network.yaml",
      "CLI: python migrate.py baseline, python migrate.py wave 1, python migrate.py verify",
      "CLI: python rollback.py --router R2"
    ],
    "fileStructure": "ospf-migration/\n  network.yaml\n  src/\n    model.py\n    validate.py\n    render.py\n    baseline.py\n    migrate.py\n    verify.py\n    rollback.py\n  templates/\n    ospf.j2\n  baselines/\n  simulated_routers/\n  tests/\n    test_validate.py\n    test_verify.py\n  README.md",
    "taskBreakdown": [
      "Model the five-router network and its OSPF areas in YAML",
      "Build the validator and the OSPF config generator",
      "Capture pre-migration route baselines",
      "Rehearse the migration locally on simulated routers",
      "Migrate in waves with verification after each",
      "Compare post-migration routes against the baseline",
      "Remove static routes and demonstrate a rollback",
      "Document the lab migration runbook"
    ],
    "milestones": [
      {
        "id": "proj-netauto-ospf-migration-m1",
        "order": 1,
        "title": "Model the network and design OSPF",
        "objectives": ["Model five routers and their links", "Assign areas and router-ids", "Validate the design"],
        "instructions": "Write network.yaml for five routers: area 0 backbone with R1 and R2, area 1 with R3 and R4, and R5 as an ABR between them, each with a unique router-id and the networks it will advertise. Write model.py and validate.py to check router-id uniqueness, that every area connects to area 0, and that no two routers advertise overlapping networks. Run validation on the good design and confirm it passes, then break one router-id and confirm it fails with a named error.",
        "concepts": ["OSPF areas", "Router IDs", "ABRs"],
        "hints": ["Every area must touch area 0 — directly or via an ABR.", "Router-ids are unique, always.", "Validate the design before generating a single config."],
        "acceptanceCriteria": ["The model covers five routers across two areas", "Router-ids are unique and areas connect to area 0", "No overlapping advertised networks", "A duplicate router-id fails with a named error"],
        "tests": ["Run validate on the good model", "Duplicate a router-id and re-validate", "Check area connectivity by hand"]
      },
      {
        "id": "proj-netauto-ospf-migration-m2",
        "order": 2,
        "title": "Generate OSPF configs and capture baselines",
        "objectives": ["Render per-router OSPF configs", "Capture route-table baselines", "Prove rendering is deterministic"],
        "instructions": "Write templates/ospf.j2 covering router ospf with the process id, router-id, network statements per area, and passive interfaces for LAN links, then render one config per router and read one end to end. Write baseline.py to capture each router's current route table (from local files in simulated_routers/ for the rehearsal, or from a lab) into baselines/, listing every destination, next hop and protocol. Render twice and confirm byte-identical output.",
        "concepts": ["OSPF configuration", "Route-table baselines", "Deterministic rendering"],
        "hints": ["The baseline is the proof — capture it before changing anything.", "Passive interfaces stop OSPF hellos on LANs.", "Read one rendered config fully before trusting the rest."],
        "acceptanceCriteria": ["OSPF configs render for all five routers", "Baselines exist for every router with destinations and next hops", "Two renders are byte-identical", "Every network statement matches the model"],
        "tests": ["Render and count the configs", "Capture baselines and inspect one", "Render twice and diff"]
      },
      {
        "id": "proj-netauto-ospf-migration-m3",
        "order": 3,
        "title": "Migrate in waves with verification",
        "objectives": ["Migrate one wave at a time", "Verify adjacencies after each wave", "Compare routes against the baseline"],
        "instructions": "Write migrate.py to apply the OSPF configs in waves — wave 1 is R1 alone, wave 2 is R2 and R3, wave 3 is R4 and R5 — and write verify.py to check after each wave that the expected OSPF adjacencies are up and that the router's route table still contains every baseline destination. Rehearse the whole migration locally against the simulated routers, where each simulated router's transcript is updated by the migration step; confirm every wave passes verification before the next starts, and that a wave with a deliberately broken adjacency stops the migration.",
        "concepts": ["Wave migrations", "OSPF adjacencies", "Route verification"],
        "hints": ["One router first — the canary wave.", "Verify after every wave, not at the end.", "A failed wave stops the migration, it does not continue."],
        "acceptanceCriteria": ["Migration runs in three waves in order", "Adjacencies are verified after every wave", "Post-migration routes match the baseline destinations", "A broken adjacency stops the migration"],
        "tests": ["Rehearse the migration locally and read the per-wave results", "Break an adjacency in the simulation and re-run", "Compare a post-migration table with its baseline"]
      },
      {
        "id": "proj-netauto-ospf-migration-m4",
        "order": 4,
        "title": "Remove statics, roll back and document",
        "objectives": ["Remove static routes only after proof", "Demonstrate a single-router rollback", "Document the lab runbook"],
        "instructions": "Once every wave has passed verification, remove the static routes router by router — only after that router's OSPF routes are proven — and re-verify the route table after each removal. Then demonstrate rollback: restore R2's saved previous config with rollback.py, verify its static routes return and its OSPF adjacency drops cleanly, then re-migrate R2 to complete the network. Write the README runbook for the same migration in a Containerlab lab, labelling every device step as lab-only and noting the rehearsal you already ran locally.",
        "concepts": ["Static route removal", "Rollback", "Migration runbooks"],
        "hints": ["Remove statics only after OSPF is proven on that router.", "Rollback is a rehearsed step, not an improvisation.", "The runbook turns a rehearsal into a repeatable migration."],
        "acceptanceCriteria": ["Static routes are removed only after OSPF proof per router", "Rollback restores R2's previous routes and config", "R2 re-migrates cleanly after rollback", "The README labels device steps as lab-only"],
        "tests": ["Remove statics and re-verify each router", "Roll back R2 and check its route table", "Re-migrate R2 and verify the final state"]
      }
    ],
    "reviewChecklist": [
      "The OSPF design validates before any config is generated",
      "Migration runs in waves with verification after each",
      "Post-migration routes match the pre-migration baseline",
      "Static routes are removed only after OSPF proof",
      "Rollback is demonstrated on one router",
      "Lab steps are documented as lab-only"
    ],
    "finalAssessment": [
      "Add a sixth router to the model and show its generated config",
      "Show the baseline and the post-migration table for one router",
      "Break an adjacency in rehearsal and show the migration stopping",
      "Roll back one router and re-migrate it",
      "Explain why areas exist and what the ABR does"
    ]
  },
  {
    "id": "proj-netauto-mpls-backbone",
    "slug": "netauto-mpls-backbone",
    "level": 4,
    "title": "MPLS Backbone Provisioning",
    "description": "Provision an MPLS backbone from a YAML model: provider routers, label distribution with LDP, MPLS VPNs (L3VPN) for two customers, and route targets that keep their traffic separate. The generator validates the design, renders per-router configs, and checks backbone invariants — full LDP mesh, consistent route distinguishers and targets, and end-to-end VPN reachability in the model — before anything is deployed. Done means a four-router backbone with two isolated customer VPNs renders from one YAML file, the invariant checker proves the VPNs are isolated, and adding a customer site touches only the intended PE routers — verified locally, with lab deployment as a labelled separate step.",
    "skills": ["MPLS", "LDP", "L3VPN", "Route distinguishers", "Route targets", "BGP", "VRF", "Python"],
    "language": "python",
    "functionalRequirements": [
      "Model a backbone in YAML: P and PE routers, links, LDP, VRFs and customer sites",
      "Render per-router MPLS configs: LDP, MPLS forwarding, BGP VPNv4 sessions",
      "Generate VRF definitions with route distinguishers and import/export route targets",
      "Validate the model: unique RDs, consistent route targets per VPN, unique loopbacks",
      "Check backbone invariants: full LDP mesh, PE route-reflector sessions, VPN isolation",
      "Produce a VPN map showing every customer, site, PE and route target",
      "Support adding a customer site from a YAML change alone",
      "Diff generations to show exactly which routers change when a site is added"
    ],
    "nonFunctionalRequirements": [
      "An invalid model fails with a message naming the offending entry",
      "No two VPNs share a route target or a route distinguisher",
      "Re-rendering an unchanged model produces byte-identical configs",
      "The generator runs entirely locally with no device access",
      "A four-router backbone renders in under 10 seconds"
    ],
    "architecture": "One YAML backbone model drives the whole build: a Python loader validates it (unique loopbacks, unique RDs, route-target consistency per VPN), Jinja2 templates render per-router configs for the MPLS core (LDP, label forwarding, IGP), the BGP VPNv4 overlay (PE to route reflector), and the VRF sections per customer site. An invariant checker parses the rendered output and verifies the LDP mesh, that every PE peers VPNv4 with the reflectors, and that no route target leaks between VPNs. A VPN-map generator prints customers, sites, PEs and targets, and a diff step compares generations. Deployment to a Containerlab MPLS lab is a separate, labelled lab step.",
    "databaseSchema": "",
    "apis": [
      "CLI: python mpls_gen.py validate backbone.yaml, python mpls_gen.py render backbone.yaml",
      "CLI: python mpls_gen.py check output/, python mpls_gen.py vpnmap backbone.yaml",
      "Input: YAML model with P/PE routers, VRFs, RDs, route targets and customer sites"
    ],
    "fileStructure": "mpls-backbone/\n  backbone.yaml\n  src/\n    model.py\n    validate.py\n    render.py\n    invariants.py\n    vpnmap.py\n  templates/\n    mpls_core.j2\n    bgp_vpnv4.j2\n    vrf.j2\n  output/\n  tests/\n    test_validate.py\n    test_invariants.py\n    fixtures/\n  README.md",
    "taskBreakdown": [
      "Design the backbone model: 2 P routers, 2 PE routers, 2 customer VPNs",
      "Write the model loader and validation rules",
      "Render the MPLS core configs and check the LDP mesh",
      "Render the BGP VPNv4 overlay and VRFs",
      "Build the VPN map and the generation diff",
      "Test validation against broken models",
      "Add a customer site from a YAML change alone",
      "Document the lab deployment runbook"
    ],
    "milestones": [
      {
        "id": "proj-netauto-mpls-backbone-m1",
        "order": 1,
        "title": "Model the backbone and its VPNs",
        "objectives": ["Design the YAML backbone model", "Model P/PE routers and two VPNs", "Validate RDs and route targets"],
        "instructions": "Write backbone.yaml for four routers — P1 and P2 in the core, PE1 and PE2 at the edge — with unique loopbacks, and two customer VPNs: customer-a with sites on PE1 and PE2, customer-b with a site on PE1 only. Give each VRF a unique route distinguisher and import/export route targets, and write model.py plus validate.py to check loopback uniqueness, RD uniqueness, and that each VPN's route targets are consistent across its sites. Run validation on the good model and confirm it passes.",
        "concepts": ["MPLS roles (P and PE)", "VRFs", "Route distinguishers and targets"],
        "hints": ["The RD makes a prefix unique; the route target decides who imports it.", "One VPN, one set of targets — shared targets leak traffic.", "Validate before rendering, always."],
        "acceptanceCriteria": ["The model covers 2 P and 2 PE routers and 2 VPNs", "Loopbacks and RDs are unique", "Route targets are consistent within each VPN", "Validation passes on the good model"],
        "tests": ["Run validate on the good model", "Duplicate an RD and re-validate", "Mismatch a route target and re-validate"]
      },
      {
        "id": "proj-netauto-mpls-backbone-m2",
        "order": 2,
        "title": "MPLS core and LDP mesh",
        "objectives": ["Render the MPLS core configs", "Verify the LDP mesh", "Check label forwarding settings"],
        "instructions": "Write templates/mpls_core.j2 covering the IGP, LDP on every core-facing interface, MPLS forwarding and the loopback used as the LDP router-id, then render the core configs for all four routers. Write the core half of invariants.py to parse the output and verify every router has LDP enabled on every core link, every router's LDP router-id matches its loopback, and the LDP mesh is complete (each router peers with each neighbour). Read one P and one PE config end to end.",
        "concepts": ["LDP", "Label forwarding", "MPLS core"],
        "hints": ["LDP on every core link — a missing one breaks the mesh.", "The LDP router-id is the loopback.", "Read one config of each role before trusting the rest."],
        "acceptanceCriteria": ["Core configs render for all four routers", "LDP is enabled on every core link", "LDP router-ids match the loopbacks", "The LDP mesh is complete in the output"],
        "tests": ["Render the core and count LDP sessions", "Run the mesh check on the output", "Remove LDP from one link and re-check"]
      },
      {
        "id": "proj-netauto-mpls-backbone-m3",
        "order": 3,
        "title": "BGP VPNv4 overlay and VRFs",
        "objectives": ["Render the VPNv4 overlay", "Generate VRFs per customer site", "Prove VPN isolation"],
        "instructions": "Write templates/bgp_vpnv4.j2 for PE-to-route-reflector VPNv4 sessions and templates/vrf.j2 for the per-site VRF definitions with RDs, route targets and the customer-facing interfaces. Render the full backbone, then extend invariants.py to verify every PE peers VPNv4 with the reflectors, every VRF's RD is unique, and no route target is shared between the two VPNs. Add a second site for customer-b on PE2 in the YAML, re-render, and confirm only PE2's config changes.",
        "concepts": ["VPNv4", "Route reflectors", "VPN isolation"],
        "hints": ["VPNv4 carries the customer routes; the core never sees them.", "Isolation is proven by disjoint route targets.", "A new site should change only its PE."],
        "acceptanceCriteria": ["Every PE peers VPNv4 with the reflectors", "Every VRF has a unique RD", "No route target is shared between VPNs", "Adding a customer-b site changes only PE2"],
        "tests": ["Render the full backbone and run the overlay checks", "Add the site, re-render and inspect the diff", "Share a route target between VPNs and re-validate"]
      },
      {
        "id": "proj-netauto-mpls-backbone-m4",
        "order": 4,
        "title": "VPN map, diff and lab runbook",
        "objectives": ["Generate the VPN map", "Diff backbone generations", "Document the lab deployment"],
        "instructions": "Write vpnmap.py to print a map of the backbone: every customer, its sites, the PE each site attaches to, its RD and its route targets. Add a generation diff and demonstrate it by adding a new customer site. Time a full render of the four-router backbone. Finally, write the README runbook for deploying the configs to a Containerlab MPLS lab (noting the lab needs routers that support MPLS/LDP), labelling every device step as lab-only and explaining that the generator and all checks run locally without a device.",
        "concepts": ["VPN maps", "Generation diffs", "Lab-only deployment"],
        "hints": ["The VPN map is what proves isolation to a reviewer.", "A diff proves a small change stays small.", "Name the lab requirements honestly."],
        "acceptanceCriteria": ["The VPN map lists every customer, site, PE, RD and target", "Adding a site changes only the expected router", "A full render takes under 10 seconds", "The README labels device deployment as lab-only with requirements"],
        "tests": ["Generate the VPN map and verify one customer by hand", "Add a site, re-render and inspect the diff", "Time a full render"]
      }
    ],
    "reviewChecklist": [
      "The LDP mesh is complete in the rendered output",
      "Every PE peers VPNv4 with the route reflectors",
      "RDs are unique and route targets are disjoint per VPN",
      "A new customer site changes only its PE router",
      "The VPN map matches the model",
      "Lab deployment is documented as a separate, lab-only step"
    ],
    "finalAssessment": [
      "Add a customer site and show the diff touching one router",
      "Show the VPN map and explain how isolation is proven",
      "Share a route target between VPNs and show validation catching it",
      "Remove LDP from a link and show the mesh check failing",
      "Explain the P/PE split and what the core never sees"
    ]
  }
]

