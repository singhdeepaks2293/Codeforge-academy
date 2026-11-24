// Runtime auto-provisioning — CodeForge Academy.
//
// When a learner enrols in a course (or opens a lesson) whose primary
// runtime is missing, the backend kicks off a background install instead of
// leaving the learner with a bare 503. Execution itself NEVER changes:
// runCode() still returns an honest `runtime_unavailable` 503 while a
// runtime is missing — provisioning only changes whether it is missing.
//
// Two deployment realities (see docs/DOCKER.md):
//  - Local/dev: the backend usually runs as a user who can install software
//    (root, or sudo without a password). Package managers (apt/dnf/brew/
//    choco) and official installers (rustup, dotnet-install, Dart/Julia/
//    Kotlin/solc downloads) are used here.
//  - Docker: the backend runs as the non-root `node` user inside the
//    container, so runtime installs cannot work there. In a container,
//    provisioning reports `install_unavailable` honestly; the Docker path
//    is baking runtimes into the image (backend/Dockerfile).
//
// Safety: installers are an allow-listed table below — fixed commands and
// fixed package names only. No user input ever reaches a shell: commands
// run via execFile with an argv array, never via `sh -c` with interpolation.
// A runtime id that is not in RUNTIME_CATALOG cannot be installed at all.
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir, tmpdir } from 'node:os';
import { detectRuntimes, which, type RuntimeInfo } from '../execution/executor.js';
import type { Db } from '../db/db.js';

export type ProvisionState =
  | 'unknown'           // never checked / no attempt yet
  | 'present'           // detected on this host (not installed by us)
  | 'installing'        // an install is running right now
  | 'ready'             // installed by provisioning and re-detected
  | 'failed'            // an install attempt failed (see reason)
  | 'install_unavailable'; // cannot be auto-installed here (see reason)

export type ProvisionKind = 'builtin' | 'baked' | 'auto' | 'manual';
export type InstallerId = 'none' | 'rustup' | 'dotnet' | 'dart' | 'julia' | 'kotlin' | 'solc' | 'terraform';

export interface RuntimeDef {
  id: string;
  name: string;
  /** Binary the executor looks for ('' for builtins with no binary). */
  binary: string;
  versionArgs: string[];
  /** builtin: no install needed · baked: in the Docker image · auto: on-demand install · manual: human only */
  kind: ProvisionKind;
  /** True when backend/Dockerfile bakes this runtime in. */
  dockerBaked: boolean;
  /** Allow-listed package names per package manager (null = not available there). */
  aptPackages: string[] | null;
  dnfPackages: string[] | null;
  brewFormula: string | null;
  chocoPackage: string | null;
  /** Official-installer fallback when no package manager covers this runtime. */
  installer: InstallerId;
  /** Short hint shown in GET /api/runtimes. */
  installHint: string;
  /** Exact manual steps, shown when auto-install is impossible. */
  manualSteps: string;
  /** Course `language` ids served by this runtime. */
  serves: string[];
}

const H = (s: string) => s; // readability helper for long hint strings

// ---------------------------------------------------------------------------
// Catalogue — every language used by any of the 100 tracks, DSA or projects.
// Course languages (30): asm bash c cpp csharp dart elixir go haskell html java
// javascript julia kotlin lua mongodb objc perl php python r react redis ruby
// rust scala solidity sql swift typescript. DSA adds nothing new
// (python, javascript); projects add nothing new (go, python, rust, typescript).
// Each one maps to exactly one runtime below; nothing is left unhandled.
// ---------------------------------------------------------------------------
export const RUNTIME_CATALOG: RuntimeDef[] = [
  { id: 'python', name: 'Python 3', binary: 'python3', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['python3'], dnfPackages: ['python3'], brewFormula: 'python', chocoPackage: 'python', installer: 'none',
    installHint: H('Install CPython 3.10+ and ensure `python3` is on PATH (https://www.python.org/downloads/). The Docker image also bakes in the network-automation libraries (jinja2, pyyaml, textfsm, netmiko, nornir, napalm, ncclient, paramiko, pynetbox, requests, xmltodict, pyats); locally install them with `pip install jinja2 pyyaml textfsm netmiko nornir napalm ncclient paramiko pynetbox requests xmltodict pyats`. For the AI-build projects, also install numpy, CPU-only PyTorch (`pip install torch --index-url https://download.pytorch.org/whl/cpu` — the default PyPI wheel is the CUDA bundle), the MCP Python SDK, pytest and uv (`pip install mcp pytest numpy uv`); all of these are baked into the Docker image too.'),
    manualSteps: 'Install Python 3.10+ from https://www.python.org/downloads/ (Windows: tick "Add python to PATH"), then restart the backend. For the network-automation tracks, also install the libraries: `pip install jinja2 pyyaml textfsm netmiko nornir napalm ncclient paramiko pynetbox requests xmltodict pyats` (these are baked into the Docker image, so no manual step is needed there). For the AI-build projects, also install: `pip install torch --index-url https://download.pytorch.org/whl/cpu` then `pip install mcp pytest numpy uv` (also baked into the Docker image). On PEP 668 systems (Debian/Ubuntu) use a venv — `python3 -m venv .venv` — because `pip install --user` is invisible to the executor, which runs `python3 -I`.',
    serves: ['python'] },
  { id: 'c', name: 'C (GCC)', binary: 'gcc', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['gcc'], dnfPackages: ['gcc'], brewFormula: 'gcc', chocoPackage: 'mingw', installer: 'none',
    installHint: H('Install GCC: `sudo apt install build-essential` (Debian/Ubuntu) or Xcode CLT (macOS).'),
    manualSteps: 'Debian/Ubuntu: `sudo apt install build-essential`. macOS: `xcode-select --install`. Windows: install MinGW via `choco install mingw`.',
    serves: ['c', 'asm'] },
  { id: 'cpp', name: 'C++ (G++)', binary: 'g++', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['g++'], dnfPackages: ['gcc-c++'], brewFormula: 'gcc', chocoPackage: 'mingw', installer: 'none',
    installHint: H('Install G++: `sudo apt install build-essential` (Debian/Ubuntu) or Xcode CLT (macOS).'),
    manualSteps: 'Debian/Ubuntu: `sudo apt install build-essential`. macOS: `xcode-select --install`. Windows: install MinGW via `choco install mingw`.',
    serves: ['cpp'] },
  { id: 'node', name: 'JavaScript / TypeScript (Node.js)', binary: 'node', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['nodejs'], dnfPackages: ['nodejs'], brewFormula: 'node', chocoPackage: 'nodejs', installer: 'none',
    installHint: H('Install Node.js 20+ from https://nodejs.org/.'),
    manualSteps: 'Install Node.js 20+ from https://nodejs.org/ (the backend itself needs Node, so this is normally already present). Debian/Ubuntu: `sudo apt install nodejs` ships an older Node — prefer the NodeSource setup or nodejs.org.',
    serves: ['javascript', 'typescript', 'react'] },
  { id: 'go', name: 'Go', binary: 'go', versionArgs: ['version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['golang-go'], dnfPackages: ['golang'], brewFormula: 'go', chocoPackage: 'golang', installer: 'none',
    installHint: H('Install Go from https://go.dev/dl/ and ensure `go` is on PATH.'),
    manualSteps: 'Install Go from https://go.dev/dl/ and ensure `go` is on PATH, then restart the backend.',
    serves: ['go'] },
  { id: 'rust', name: 'Rust (rustc)', binary: 'rustc', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['rustc', 'cargo'], dnfPackages: ['rust', 'cargo'], brewFormula: 'rust', chocoPackage: 'rustup', installer: 'rustup',
    installHint: H('Install Rust via rustup: `curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh`.'),
    manualSteps: 'Install Rust via rustup: `curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh` (then `source ~/.cargo/env`), or `sudo apt install rustc cargo` on Debian/Ubuntu.',
    serves: ['rust'] },
  { id: 'java', name: 'Java (single-file launch)', binary: 'java', versionArgs: ['-version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['default-jre-headless'], dnfPackages: ['java-17-openjdk-headless'], brewFormula: 'openjdk@17', chocoPackage: 'openjdk17', installer: 'none',
    installHint: H('Install a JDK 11+ (single-file source launch needs java, not javac): `sudo apt install default-jre` (Debian/Ubuntu) or a JDK from https://adoptium.net/.'),
    manualSteps: 'Install a JRE/JDK 11+: Debian/Ubuntu `sudo apt install default-jre-headless`, or download from https://adoptium.net/. Single-file launch needs `java` only — no `javac` required.',
    serves: ['java'] },
  { id: 'bash', name: 'Bash', binary: 'bash', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['bash'], dnfPackages: ['bash'], brewFormula: 'bash', chocoPackage: 'git', installer: 'none',
    installHint: H('Bash is part of Linux/macOS; on Windows use Git Bash or WSL.'),
    manualSteps: 'Bash ships with Linux/macOS. On Windows install Git for Windows (`choco install git`) and use Git Bash, or use WSL.',
    serves: ['bash'] },
  { id: 'perl', name: 'Perl', binary: 'perl', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['perl'], dnfPackages: ['perl'], brewFormula: 'perl', chocoPackage: 'strawberryperl', installer: 'none',
    installHint: H('Install Perl: `sudo apt install perl` (Debian/Ubuntu) or https://www.perl.org/get.html.'),
    manualSteps: 'Debian/Ubuntu: `sudo apt install perl`. Windows: Strawberry Perl from https://strawberryperl.com/ (`choco install strawberryperl`).',
    serves: ['perl'] },
  { id: 'sql', name: 'SQL (SQLite, in-process)', binary: '', versionArgs: [], kind: 'builtin', dockerBaked: true,
    aptPackages: null, dnfPackages: null, brewFormula: null, chocoPackage: null, installer: 'none',
    installHint: H('SQL runs in-process via Node\'s built-in SQLite — no install needed.'),
    manualSteps: 'No install needed: SQL runs in-process via Node\'s built-in SQLite.',
    serves: ['sql'] },
  { id: 'html', name: 'HTML (static validation)', binary: '', versionArgs: [], kind: 'builtin', dockerBaked: true,
    aptPackages: null, dnfPackages: null, brewFormula: null, chocoPackage: null, installer: 'none',
    installHint: H('HTML is checked by static tag-balance validation in the backend — no browser or install needed.'),
    manualSteps: 'No install needed: HTML exercises are statically validated, not rendered in a browser.',
    serves: ['html'] },
  { id: 'php', name: 'PHP', binary: 'php', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['php-cli'], dnfPackages: ['php-cli'], brewFormula: 'php', chocoPackage: 'php', installer: 'none',
    installHint: H('Install PHP: `sudo apt install php-cli` (Debian/Ubuntu) or https://www.php.net/downloads.'),
    manualSteps: 'Debian/Ubuntu: `sudo apt install php-cli`. macOS: `brew install php`. Windows: `choco install php`.',
    serves: ['php'] },
  { id: 'ruby', name: 'Ruby', binary: 'ruby', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['ruby'], dnfPackages: ['ruby'], brewFormula: 'ruby', chocoPackage: 'ruby', installer: 'none',
    installHint: H('Install Ruby: `sudo apt install ruby` (Debian/Ubuntu) or https://www.ruby-lang.org/en/downloads/.'),
    manualSteps: 'Debian/Ubuntu: `sudo apt install ruby`. macOS: `brew install ruby`. Windows: `choco install ruby`.',
    serves: ['ruby'] },
  { id: 'lua', name: 'Lua', binary: 'lua', versionArgs: ['-v'], kind: 'baked', dockerBaked: true,
    aptPackages: ['lua5.4'], dnfPackages: ['lua'], brewFormula: 'lua', chocoPackage: 'lua', installer: 'none',
    installHint: H('Install Lua: `sudo apt install lua5.4` (Debian/Ubuntu) or https://www.lua.org/download.html.'),
    manualSteps: 'Debian/Ubuntu: `sudo apt install lua5.4` then `sudo ln -sf /usr/bin/lua5.4 /usr/local/bin/lua`. macOS: `brew install lua`. Windows: `choco install lua`.',
    serves: ['lua'] },
  { id: 'elixir', name: 'Elixir', binary: 'elixir', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['elixir'], dnfPackages: ['elixir'], brewFormula: 'elixir', chocoPackage: 'elixir', installer: 'none',
    installHint: H('Install Elixir from https://elixir-lang.org/install.html.'),
    manualSteps: 'Debian/Ubuntu: `sudo apt install elixir`. macOS: `brew install elixir`. Windows: `choco install elixir`. Elixir needs Erlang, which the package manager pulls in automatically.',
    serves: ['elixir'] },
  { id: 'r', name: 'R', binary: 'Rscript', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['r-base-core'], dnfPackages: ['R'], brewFormula: 'r', chocoPackage: 'r.project', installer: 'none',
    installHint: H('Install R from https://cran.r-project.org/.'),
    manualSteps: 'Debian/Ubuntu: `sudo apt install r-base-core`. macOS: `brew install r`. Windows: `choco install r.project`.',
    serves: ['r'] },
  { id: 'haskell', name: 'Haskell (runghc)', binary: 'runghc', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['ghc'], dnfPackages: ['ghc'], brewFormula: 'ghc', chocoPackage: 'ghc', installer: 'none',
    installHint: H('Install GHCup from https://www.haskell.org/ghcup/ (`ghcup install ghc`).'),
    manualSteps: 'Debian/Ubuntu: `sudo apt install ghc` (large, ~650 MB). Or GHCup: `curl --proto \'=https\' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh`, then `ghcup install ghc` and add `~/.ghcup/bin` to PATH.',
    serves: ['haskell'] },
  { id: 'scala', name: 'Scala', binary: 'scala', versionArgs: ['-version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['scala'], dnfPackages: null, brewFormula: 'scala', chocoPackage: 'scala', installer: 'none',
    installHint: H('Install Scala via Coursier (`cs setup`) or https://www.scala-lang.org/download/.'),
    manualSteps: 'Debian/Ubuntu: `sudo apt install scala` (needs Java, pulled in automatically). Or Coursier: `curl -fL https://github.com/coursier/launchers/raw/master/cs-x86_64-pc-linux.gz | gzip -d > cs && chmod +x cs && ./cs setup`.',
    serves: ['scala'] },
  { id: 'solidity', name: 'Solidity (solc)', binary: 'solc', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: null, dnfPackages: null, brewFormula: null, chocoPackage: null, installer: 'solc',
    installHint: H('Install solc from https://docs.soliditylang.org/en/latest/installing-solidity.html.'),
    manualSteps: 'Linux: download the official static binary from https://github.com/ethereum/solidity/releases (solc-static-linux), `chmod +x` it and put it on PATH as `solc`. macOS: `brew install solidity`. Or `npm install -g solc`.',
    serves: ['solidity'] },
  { id: 'kotlin', name: 'Kotlin', binary: 'kotlinc', versionArgs: ['-version'], kind: 'baked', dockerBaked: true,
    aptPackages: null, dnfPackages: null, brewFormula: 'kotlin', chocoPackage: 'kotlin', installer: 'kotlin',
    installHint: H('Install Kotlin via SDKMAN (`sdk install kotlin`) or https://kotlinlang.org/docs/command-line.html.'),
    manualSteps: 'Download the official compiler zip from https://github.com/JetBrains/kotlin/releases, unzip it, and put its `bin/` directory (kotlinc) on PATH. Kotlin needs a Java runtime. Or SDKMAN: `sdk install kotlin`.',
    serves: ['kotlin'] },
  { id: 'csharp', name: 'C# (.NET)', binary: 'dotnet', versionArgs: ['--version'], kind: 'auto', dockerBaked: false,
    aptPackages: null, dnfPackages: null, brewFormula: 'dotnet', chocoPackage: 'dotnet-sdk', installer: 'dotnet',
    installHint: H('Install the .NET SDK from https://dotnet.microsoft.com/download.'),
    manualSteps: 'Install the .NET 8 SDK from https://dotnet.microsoft.com/download (Linux: the dotnet-install script; Windows: `choco install dotnet-sdk`; macOS: `brew install dotnet`). The executor reports C# unavailable until `dotnet` is on PATH — single-file C# programs are not run; the track is quiz-graded until the SDK is present.',
    serves: ['csharp'] },
  { id: 'dart', name: 'Dart', binary: 'dart', versionArgs: ['--version'], kind: 'auto', dockerBaked: false,
    aptPackages: null, dnfPackages: null, brewFormula: 'dart', chocoPackage: 'dart-sdk', installer: 'dart',
    installHint: H('Install Dart from https://dart.dev/get-dart.'),
    manualSteps: 'Download the official Dart SDK zip from https://dart.dev/get-dart, unzip it, and put its `bin/` directory (dart) on PATH. macOS: `brew install dart`. Windows: `choco install dart-sdk`.',
    serves: ['dart'] },
  { id: 'julia', name: 'Julia', binary: 'julia', versionArgs: ['--version'], kind: 'auto', dockerBaked: false,
    aptPackages: null, dnfPackages: null, brewFormula: 'julia', chocoPackage: 'julia', installer: 'julia',
    installHint: H('Install Julia from https://julialang.org/downloads/.'),
    manualSteps: 'Download the official Julia tarball for your platform from https://julialang.org/downloads/, extract it, and put its `bin/` directory (julia) on PATH. macOS: `brew install julia`. Windows: `choco install julia`.',
    serves: ['julia'] },
  { id: 'swift', name: 'Swift', binary: 'swift', versionArgs: ['--version'], kind: 'manual', dockerBaked: false,
    aptPackages: null, dnfPackages: null, brewFormula: null, chocoPackage: null, installer: 'none',
    installHint: H('Install Swift from https://www.swift.org/download/ (Linux) or Xcode (macOS).'),
    manualSteps: 'Manual install only: Swift toolchains are platform-specific (~700 MB) with no stable unattended installer across distros, so CodeForge does not auto-install Swift. macOS: install Xcode (or `xcode-select --install`) — `swift` is included. Linux: download the toolchain matching your distro from https://www.swift.org/download/, extract it, and add its `usr/bin` to PATH. Docker: rebuild the image with a Swift toolchain layer.',
    serves: ['swift'] },
  { id: 'objc', name: 'Objective-C', binary: 'clang', versionArgs: ['--version'], kind: 'manual', dockerBaked: false,
    aptPackages: null, dnfPackages: null, brewFormula: null, chocoPackage: null, installer: 'none',
    installHint: H('Objective-C needs Xcode (macOS) or GNUstep (Linux); there is no single unattended install.'),
    manualSteps: 'Manual install only: macOS: install Xcode — `clang` with the Objective-C runtime is included. Linux: install GNUstep (`sudo apt install gnustep-devel clang libobjc-11-dev`) and compile with `clang -fobjc-runtime=gnustep-2.0 -I/usr/include/GNUstep`. The executor has no single-file ObjC runner, so this track stays quiz-graded until a runner exists — installing the toolchain alone does not make ObjC exercises runnable.',
    serves: ['objc'] },
  { id: 'mongodb', name: 'MongoDB (service)', binary: 'mongod', versionArgs: ['--version'], kind: 'manual', dockerBaked: false,
    aptPackages: null, dnfPackages: null, brewFormula: null, chocoPackage: null, installer: 'none',
    installHint: H('MongoDB is a database service, not a code runtime — the track is quiz-style; install mongod to explore it locally.'),
    manualSteps: 'Manual only: MongoDB is a server, not a code runner — the track is quiz-style and never executes code against a database. To explore locally: install MongoDB Community Server from https://www.mongodb.com/try/download/community and run `mongod` (Docker: `docker run -d -p 27017:27017 mongo`).',
    serves: ['mongodb'] },
  { id: 'redis', name: 'Redis (service)', binary: 'redis-server', versionArgs: ['--version'], kind: 'manual', dockerBaked: false,
    aptPackages: null, dnfPackages: null, brewFormula: null, chocoPackage: null, installer: 'none',
    installHint: H('Redis is a service, not a code runtime — the track is quiz-style; install redis-server to explore it locally.'),
    manualSteps: 'Manual only: Redis is a server, not a code runner — the track is quiz-style and never executes code against it. To explore locally: Debian/Ubuntu `sudo apt install redis-server`, macOS `brew install redis`, or Docker: `docker run -d -p 6379:6379 redis`.',
    serves: ['redis'] },
  { id: 'git', name: 'Git', binary: 'git', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['git'], dnfPackages: ['git'], brewFormula: 'git', chocoPackage: 'git', installer: 'none',
    installHint: H('Install Git: `sudo apt install git` (Debian/Ubuntu) or https://git-scm.com/downloads.'),
    manualSteps: 'Debian/Ubuntu: `sudo apt install git`. macOS: `brew install git` (or Xcode CLT). Windows: `choco install git` or https://git-scm.com/download/win.',
    serves: ['git'] },
  { id: 'ansible', name: 'Ansible', binary: 'ansible-playbook', versionArgs: ['--version'], kind: 'baked', dockerBaked: true,
    aptPackages: ['ansible'], dnfPackages: ['ansible'], brewFormula: 'ansible', chocoPackage: 'ansible', installer: 'none',
    installHint: H('Install Ansible: `sudo apt install ansible` (Debian/Ubuntu) or `pip install ansible`.'),
    manualSteps: 'Debian/Ubuntu: `sudo apt install ansible`. macOS: `brew install ansible`. Windows: use WSL, then `sudo apt install ansible`. Or `pip install ansible` (needs Python 3.10+).',
    serves: ['ansible'] },
  { id: 'terraform', name: 'Terraform', binary: 'terraform', versionArgs: ['version'], kind: 'baked', dockerBaked: true,
    aptPackages: null, dnfPackages: null, brewFormula: 'hashicorp/tap/terraform', chocoPackage: 'terraform', installer: 'terraform',
    installHint: H('Install Terraform 1.17+ from https://releases.hashicorp.com/terraform/ (unzip the binary onto PATH).'),
    manualSteps: 'Download the Terraform 1.17.2 zip for your platform from https://releases.hashicorp.com/terraform/1.17.2/, unzip it, and put the `terraform` binary on PATH. Debian/Ubuntu (HashiCorp apt repo): add https://apt.releases.hashicorp.com, then `sudo apt install terraform`. macOS: `brew tap hashicorp/tap && brew install hashicorp/tap/terraform`. Windows: `choco install terraform`.',
    serves: ['terraform'] },
  { id: 'docker', name: 'Docker (CLI + daemon)', binary: 'docker', versionArgs: ['--version'], kind: 'manual', dockerBaked: true,
    aptPackages: null, dnfPackages: null, brewFormula: 'docker', chocoPackage: 'docker', installer: 'none',
    installHint: H('Docker needs the Engine daemon, not just the CLI — install Docker Engine and make sure the daemon is running.'),
    manualSteps: 'Manual only: install Docker Engine from https://docs.docker.com/engine/install/ (Debian/Ubuntu: `sudo apt install docker.io` or the official docker-ce repo; macOS/Windows: Docker Desktop) and start the daemon. The backend image ships only the Docker CLI: for the containerised backend, also mount the host Docker socket into the backend container (see docs/DOCKER.md) — without it, Docker exercises report runtime_unavailable honestly. Running the backend locally (npm run dev) with Docker installed on the same host works directly.',
    serves: ['docker'] },
];

export const RUNTIME_BY_ID = new Map(RUNTIME_CATALOG.map((r) => [r.id, r]));

/** Course `language` id -> runtime id. Covers all 34 course languages. */
export const LANGUAGE_TO_RUNTIME: Record<string, string> = {};
for (const def of RUNTIME_CATALOG) for (const lang of def.serves) LANGUAGE_TO_RUNTIME[lang] = def.id;

export const INSTALL_TIMEOUT_MS = Number(process.env.PROVISION_TIMEOUT_MS || 300000);

// ---------------------------------------------------------------------------
// Command runner (injectable so unit tests can mock the spawn layer —
// tests must NEVER run a real install).
// ---------------------------------------------------------------------------
export interface RunCommandResult { code: number | null; stdout: string; stderr: string; timedOut: boolean; }
export interface CommandRunner {
  run(cmd: string, args: string[], opts?: { timeoutMs?: number; env?: NodeJS.ProcessEnv }): Promise<RunCommandResult>;
}

export const defaultRunner: CommandRunner = {
  run(cmd, args, opts) {
    return new Promise((resolve) => {
      let stdout = '', stderr = '';
      const child = execFile(cmd, args, { timeout: opts?.timeoutMs ?? INSTALL_TIMEOUT_MS, env: { ...process.env, ...opts?.env } }, (err, out, errOut) => {
        stdout = out?.toString() ?? '';
        stderr = errOut?.toString() ?? '';
        const code = err ? (typeof (err as { code?: unknown }).code === 'number' ? (err as { code: number }).code : 1) : 0;
        const timedOut = !!(err as { killed?: boolean } | null)?.killed;
        resolve({ code, stdout, stderr, timedOut });
      });
      void child;
    });
  },
};

// ---------------------------------------------------------------------------
// Environment detection
// ---------------------------------------------------------------------------
export type PackageManager = 'apt' | 'dnf' | 'brew' | 'choco';
export interface InstallEnv {
  platform: NodeJS.Platform;
  isRoot: boolean;
  hasSudo: boolean;
  packageManager: PackageManager | null;
  inContainer: boolean;
}

export interface ProvisionDeps {
  runner?: CommandRunner;
  /** Defaults to executor.detectRuntimes. */
  detector?: () => Promise<RuntimeInfo[]>;
  whichFn?: (bin: string) => Promise<string | null>;
  envOverride?: Partial<InstallEnv>;
  homeDir?: string;
}

function depsOf(opts?: ProvisionDeps): Required<Pick<ProvisionDeps, 'runner' | 'detector' | 'whichFn'>> & { homeDir: string } {
  return {
    runner: opts?.runner ?? defaultRunner,
    detector: opts?.detector ?? detectRuntimes,
    whichFn: opts?.whichFn ?? which,
    homeDir: opts?.homeDir ?? homedir(),
  };
}

export async function detectInstallEnv(opts?: ProvisionDeps): Promise<InstallEnv> {
  const d = depsOf(opts);
  if (opts?.envOverride) {
    return {
      platform: process.platform,
      isRoot: false, hasSudo: false, packageManager: null, inContainer: false,
      ...opts.envOverride,
    };
  }
  const isRoot = typeof process.getuid === 'function' ? process.getuid() === 0 : false;
  let hasSudo = false;
  if (!isRoot) {
    try { const r = await d.runner.run('sudo', ['-n', 'true'], { timeoutMs: 5000 }); hasSudo = r.code === 0; } catch { hasSudo = false; }
  }
  let packageManager: PackageManager | null = null;
  for (const [bin, pm] of [['apt-get', 'apt'], ['dnf', 'dnf'], ['brew', 'brew'], ['choco', 'choco']] as const) {
    if (await d.whichFn(bin)) { packageManager = pm; break; }
  }
  const inContainer = existsSync('/.dockerenv') || process.env.CODEFORGE_CONTAINER === '1';
  return { platform: process.platform, isRoot, hasSudo, packageManager, inContainer };
}

// ---------------------------------------------------------------------------
// Persistence (migration 004)
// ---------------------------------------------------------------------------
export interface ProvisionRow {
  runtime: string; state: string; reason: string; guidance: string;
  install_method: string; install_path: string; attempts: number;
  last_attempt_at: string | null; updated_at: string;
}

export function getProvisionRow(conn: Db, runtime: string): ProvisionRow | undefined {
  try {
    return conn.prepare('SELECT * FROM runtime_provisioning WHERE runtime = ?').get(runtime) as ProvisionRow | undefined;
  } catch { return undefined; } // table missing (pre-004 DB that has not migrated yet)
}

export function upsertProvision(conn: Db, row: Partial<ProvisionRow> & { runtime: string }): void {
  const prev = getProvisionRow(conn, row.runtime);
  const merged: ProvisionRow = {
    runtime: row.runtime,
    state: row.state ?? prev?.state ?? 'unknown',
    reason: row.reason ?? prev?.reason ?? '',
    guidance: row.guidance ?? prev?.guidance ?? '',
    install_method: row.install_method ?? prev?.install_method ?? '',
    install_path: row.install_path ?? prev?.install_path ?? '',
    attempts: row.attempts ?? prev?.attempts ?? 0,
    last_attempt_at: row.last_attempt_at ?? prev?.last_attempt_at ?? null,
    updated_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };
  conn.prepare(`INSERT INTO runtime_provisioning (runtime, state, reason, guidance, install_method, install_path, attempts, last_attempt_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(runtime) DO UPDATE SET state=excluded.state, reason=excluded.reason, guidance=excluded.guidance,
      install_method=excluded.install_method, install_path=excluded.install_path, attempts=excluded.attempts,
      last_attempt_at=excluded.last_attempt_at, updated_at=excluded.updated_at`)
    .run(merged.runtime, merged.state, merged.reason, merged.guidance, merged.install_method, merged.install_path, merged.attempts, merged.last_attempt_at, merged.updated_at);
}

/** Restore install dirs recorded by earlier provisioning runs onto PATH so
 *  the executor's `command -v` fallback keeps finding them after a restart. */
export function restoreProvisionedPaths(conn: Db): void {
  let rows: ProvisionRow[] = [];
  try { rows = conn.prepare(`SELECT * FROM runtime_provisioning WHERE install_path != '' AND state IN ('ready', 'present')`).all() as unknown as ProvisionRow[]; } catch { return; }
  for (const row of rows) {
    const dir = row.install_path;
    if (!dir || !existsSync(dir)) continue;
    const path = process.env.PATH || '';
    if (!path.split(':').includes(dir)) {
      process.env.PATH = `${dir}:${path}`;
      console.log(`[provisioning] restored PATH for ${row.runtime}: ${dir}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Detection (shared with the executor: a runtime is "available" only when
// the executor itself can find it, so `ready` never lies about Run working).
// ---------------------------------------------------------------------------
export interface Availability { available: boolean; version?: string }

async function detectAll(opts?: ProvisionDeps): Promise<Map<string, Availability>> {
  const d = depsOf(opts);
  const map = new Map<string, Availability>();
  let detected: RuntimeInfo[] = [];
  try { detected = await d.detector(); } catch { detected = []; }
  for (const r of detected) map.set(r.id, { available: r.available, version: r.version });
  // Runtimes the executor does not list: builtins + services + objc.
  map.set('sql', { available: true, version: 'node:sqlite (built-in)' });
  map.set('html', { available: true, version: 'static validation (built-in)' });
  for (const [id, bin] of [['mongodb', 'mongod'], ['redis', 'redis-server']] as const) {
    if (!map.has(id)) map.set(id, { available: !!(await d.whichFn(bin)) });
  }
  if (!map.has('objc')) {
    const found = process.platform === 'darwin'
      ? !!(await d.whichFn('clang'))
      : !!(await d.whichFn('gnustep-config'));
    map.set('objc', { available: found });
  }
  return map;
}

async function detectOne(id: string, cached?: Map<string, Availability>, opts?: ProvisionDeps): Promise<Availability> {
  const map = cached ?? (await detectAll(opts));
  return map.get(id) ?? { available: false };
}

// ---------------------------------------------------------------------------
// Status
// ---------------------------------------------------------------------------
export interface ProvisionStatus {
  runtime: string;
  name: string;
  state: ProvisionState;
  available: boolean;
  version?: string;
  kind: ProvisionKind;
  dockerBaked: boolean;
  installMethod: string;
  reason?: string;
  guidance: string;
  attempts: number;
  updatedAt?: string;
  lastAttemptAt?: string | null;
}

export async function getProvisionStatus(conn: Db, runtimeId: string, opts?: ProvisionDeps & { cached?: Map<string, Availability> }): Promise<ProvisionStatus | null> {
  const def = RUNTIME_BY_ID.get(runtimeId);
  if (!def) return null;
  const avail = await detectOne(runtimeId, opts?.cached, opts);
  const row = getProvisionRow(conn, runtimeId);
  const inContainer = existsSync('/.dockerenv') || process.env.CODEFORGE_CONTAINER === '1';
  let state: ProvisionState;
  let reason = row?.reason || undefined;
  let guidance = row?.guidance || def.installHint;
  if (avail.available) state = row?.state === 'ready' ? 'ready' : 'present';
  else if (row && (row.state === 'installing' || row.state === 'failed' || row.state === 'install_unavailable')) state = row.state as ProvisionState;
  else if (def.kind === 'manual') {
    // Manual runtimes can never auto-install, so their steady state is
    // install_unavailable even before anyone attempts anything.
    state = 'install_unavailable';
    reason = `${def.name} cannot be auto-installed — manual install required`;
    guidance = def.manualSteps;
  } else if (inContainer && def.kind === 'auto') {
    state = 'install_unavailable';
    reason = 'running inside a Docker container as a non-root user: runtime installs cannot work here — the runtime must be baked into the image';
    guidance = def.manualSteps;
  } else state = 'unknown';
  return {
    runtime: def.id, name: def.name, state,
    available: avail.available, version: avail.version,
    kind: def.kind, dockerBaked: def.dockerBaked,
    installMethod: def.installer !== 'none' ? def.installer : (def.aptPackages ? 'package-manager' : 'none'),
    reason,
    guidance,
    attempts: row?.attempts ?? 0,
    updatedAt: row?.updated_at, lastAttemptAt: row?.last_attempt_at,
  };
}

export async function listProvisionStatuses(conn: Db, opts?: ProvisionDeps): Promise<ProvisionStatus[]> {
  const cached = await detectAll(opts);
  const out: ProvisionStatus[] = [];
  for (const def of RUNTIME_CATALOG) {
    const s = await getProvisionStatus(conn, def.id, { ...opts, cached });
    if (s) out.push(s);
  }
  return out;
}

/** Payload for GET /api/runtimes and GET /api/execute/runtimes: every catalog
 *  runtime (not just the ones detectRuntimes lists) with provisioning state. */
export async function buildRuntimesPayload(conn: Db, opts?: ProvisionDeps): Promise<{ runtimes: Record<string, unknown>[]; languageToRuntime: Record<string, string> }> {
  const statuses = await listProvisionStatuses(conn, opts);
  const runtimes = statuses.map((s) => {
    const def = RUNTIME_BY_ID.get(s.runtime)!;
    return {
      id: s.runtime, name: s.name, available: s.available, version: s.version,
      installHint: def.installHint,
      provisioning: {
        state: s.state, kind: s.kind, dockerBaked: s.dockerBaked,
        installMethod: s.installMethod,
        reason: s.reason ?? null, guidance: s.guidance,
      },
    };
  });
  return { runtimes, languageToRuntime: { ...LANGUAGE_TO_RUNTIME } };
}

// ---------------------------------------------------------------------------
// Install plans — allow-listed commands only, argv arrays, no shell.
// ---------------------------------------------------------------------------
interface PlannedCommand { cmd: string; args: string[]; env?: NodeJS.ProcessEnv }
type Plan =
  | { ok: true; method: string; commands: PlannedCommand[]; binDir?: string }
  | { ok: false; reason: string; guidance: string };

function prefixed(env: InstallEnv, cmd: string, args: string[]): PlannedCommand {
  if (env.isRoot) return { cmd, args };
  return { cmd: 'sudo', args: ['-n', cmd, ...args] };
}

async function planInstall(def: RuntimeDef, env: InstallEnv, opts: ProvisionDeps): Promise<Plan> {
  const d = depsOf(opts);
  const home = d.homeDir;
  const runtimesDir = join(home, '.codeforge', 'runtimes');
  const privileged = env.isRoot || env.hasSudo;
  const pm = env.packageManager;

  // 1. Package manager first when it carries the runtime (cheapest, and the
  //    only path that also pulls in the runtime's system dependencies).
  //    brew is user-level and needs no privilege; apt/dnf/choco do.
  if (pm) {
    const pkgs = pm === 'apt' ? def.aptPackages
      : pm === 'dnf' ? def.dnfPackages
      : pm === 'brew' ? (def.brewFormula ? [def.brewFormula] : null)
      : (def.chocoPackage ? [def.chocoPackage] : null);
    const needsPrivilege = pm !== 'brew';
    if (pkgs && (!needsPrivilege || privileged)) {
      const cmds: PlannedCommand[] = [];
      if (pm === 'apt') {
        cmds.push(prefixed(env, 'apt-get', ['update']));
        cmds.push(prefixed(env, 'apt-get', ['install', '-y', '--no-install-recommends', ...pkgs]));
        if (def.id === 'lua') cmds.push(prefixed(env, 'ln', ['-sf', '/usr/bin/lua5.4', '/usr/local/bin/lua']));
      } else if (pm === 'dnf') {
        cmds.push(prefixed(env, 'dnf', ['install', '-y', ...pkgs]));
      } else if (pm === 'brew') {
        cmds.push({ cmd: 'brew', args: ['install', ...pkgs] });
      } else {
        cmds.push({ cmd: 'choco', args: ['install', '-y', ...pkgs] });
      }
      return { ok: true, method: pm, commands: cmds };
    }
  }

  // 2. Official-installer fallback (per-user, no privilege needed except for
  //    the optional /usr/local/bin symlink).
  if (def.installer === 'rustup') {
    if (env.platform === 'win32') return { ok: false, reason: 'rustup auto-install is not implemented on Windows', guidance: def.manualSteps };
    const tmp = join(tmpdir(), 'codeforge-rustup-init');
    return {
      ok: true, method: 'rustup',
      commands: [
        { cmd: 'curl', args: ['--proto', '=https', '--tlsv1.2', '-sSf', 'https://sh.rustup.rs', '-o', tmp] },
        { cmd: 'chmod', args: ['+x', tmp] },
        { cmd: tmp, args: ['-y', '--default-toolchain', 'stable', '--profile', 'minimal'] },
      ],
      binDir: join(home, '.cargo', 'bin'),
    };
  }
  if (def.installer === 'dotnet') {
    if (env.platform === 'win32') return { ok: false, reason: 'dotnet auto-install on Windows needs the .NET SDK installer', guidance: def.manualSteps };
    const script = join(tmpdir(), 'codeforge-dotnet-install.sh');
    const installDir = join(home, '.dotnet');
    const cmds: PlannedCommand[] = [
      { cmd: 'curl', args: ['-sSfL', 'https://dot.net/v1/dotnet-install.sh', '-o', script] },
      { cmd: 'chmod', args: ['+x', script] },
      { cmd: 'bash', args: [script, '--channel', '8.0', '--install-dir', installDir] },
    ];
    if (privileged) cmds.push(prefixed(env, 'ln', ['-sf', join(installDir, 'dotnet'), '/usr/local/bin/dotnet']));
    return { ok: true, method: 'dotnet-install', commands: cmds, binDir: installDir };
  }
  if (def.installer === 'dart' || def.installer === 'julia' || def.installer === 'kotlin') {
    if (env.platform === 'win32') return { ok: false, reason: `${def.name} auto-install is not implemented on Windows`, guidance: def.manualSteps };
    const cmds: PlannedCommand[] = [];
    let binDir: string;
    if (def.installer === 'dart') {
      const version = '3.5.4';
      const arch = env.platform === 'darwin' ? 'macos-x64' : 'linux-x64';
      const zip = join(tmpdir(), `codeforge-dart-${version}.zip`);
      cmds.push({ cmd: 'curl', args: ['-sSfL', `https://storage.googleapis.com/dart-archive/channels/stable/release/${version}/sdk/dartsdk-${arch}-release.zip`, '-o', zip] });
      if (!(await d.whichFn('unzip'))) cmds.push(...(await unzipInstallCommands(env, opts)));
      cmds.push({ cmd: 'mkdir', args: ['-p', runtimesDir] });
      cmds.push({ cmd: 'unzip', args: ['-q', '-o', zip, '-d', runtimesDir] });
      binDir = join(runtimesDir, 'dart-sdk', 'bin');
    } else if (def.installer === 'julia') {
      if (env.platform !== 'linux') return { ok: false, reason: 'Julia auto-install via tarball is Linux-only here', guidance: def.manualSteps };
      const version = '1.10.5';
      const tar = join(tmpdir(), `codeforge-julia-${version}.tar.gz`);
      cmds.push({ cmd: 'curl', args: ['-sSfL', `https://julialang-s3.julialang.org/bin/linux/x64/1.10/julia-${version}-linux-x86_64.tar.gz`, '-o', tar] });
      cmds.push({ cmd: 'mkdir', args: ['-p', runtimesDir] });
      cmds.push({ cmd: 'tar', args: ['-xzf', tar, '-C', runtimesDir] });
      binDir = join(runtimesDir, `julia-${version}`, 'bin');
    } else {
      const version = '1.9.24';
      const zip = join(tmpdir(), `codeforge-kotlin-${version}.zip`);
      cmds.push({ cmd: 'curl', args: ['-sSfL', `https://github.com/JetBrains/kotlin/releases/download/v${version}/kotlin-compiler-${version}.zip`, '-o', zip] });
      if (!(await d.whichFn('unzip'))) cmds.push(...(await unzipInstallCommands(env, opts)));
      cmds.push({ cmd: 'mkdir', args: ['-p', runtimesDir] });
      cmds.push({ cmd: 'unzip', args: ['-q', '-o', zip, '-d', runtimesDir] });
      binDir = join(runtimesDir, 'kotlinc', 'bin');
    }
    if (privileged) cmds.push(prefixed(env, 'ln', ['-sf', join(binDir, def.binary), join('/usr/local/bin', def.binary)]));
    return { ok: true, method: def.installer, commands: cmds, binDir };
  }
  if (def.installer === 'solc') {
    if (env.platform !== 'linux') return { ok: false, reason: 'solc static-binary auto-install is Linux-only here', guidance: def.manualSteps };
    const tmp = join(tmpdir(), 'codeforge-solc');
    const binDir = join(runtimesDir, 'bin');
    const cmds: PlannedCommand[] = [
      { cmd: 'curl', args: ['-sSfL', 'https://github.com/ethereum/solidity/releases/download/v0.8.26/solc-static-linux', '-o', tmp] },
      { cmd: 'chmod', args: ['+x', tmp] },
      { cmd: 'mkdir', args: ['-p', binDir] },
      { cmd: 'cp', args: [tmp, join(binDir, 'solc')] },
    ];
    if (privileged) cmds.push(prefixed(env, 'ln', ['-sf', join(binDir, 'solc'), '/usr/local/bin/solc']));
    return { ok: true, method: 'solc-static-binary', commands: cmds, binDir };
  }
  if (def.installer === 'terraform') {
    if (env.platform !== 'linux') return { ok: false, reason: 'Terraform zip auto-install is Linux-only here', guidance: def.manualSteps };
    const version = '1.17.2';
    const zip = join(tmpdir(), `codeforge-terraform-${version}.zip`);
    const binDir = join(runtimesDir, 'bin');
    const cmds: PlannedCommand[] = [
      { cmd: 'curl', args: ['-sSfL', `https://releases.hashicorp.com/terraform/${version}/terraform_${version}_linux_amd64.zip`, '-o', zip] },
    ];
    if (!(await d.whichFn('unzip'))) cmds.push(...(await unzipInstallCommands(env, opts)));
    cmds.push({ cmd: 'mkdir', args: ['-p', binDir] });
    cmds.push({ cmd: 'unzip', args: ['-q', '-o', zip, '-d', binDir] });
    cmds.push({ cmd: 'chmod', args: ['+x', join(binDir, 'terraform')] });
    if (privileged) cmds.push(prefixed(env, 'ln', ['-sf', join(binDir, 'terraform'), '/usr/local/bin/terraform']));
    return { ok: true, method: 'terraform', commands: cmds, binDir };
  }

  // 3. Nothing applies — say exactly why.
  if (!pm) return { ok: false, reason: 'no supported package manager found (apt/dnf/brew/choco) and no official installer applies', guidance: def.manualSteps };
  if (!privileged && pm !== 'brew') return { ok: false, reason: `no package-manager access: not root and passwordless sudo is unavailable (package manager: ${pm})`, guidance: def.manualSteps };
  return { ok: false, reason: `${def.name} is not available via ${pm}`, guidance: def.manualSteps };
}

async function unzipInstallCommands(env: InstallEnv, opts: ProvisionDeps): Promise<PlannedCommand[]> {
  if (env.packageManager === 'apt') return [prefixed(env, 'apt-get', ['update']), prefixed(env, 'apt-get', ['install', '-y', '--no-install-recommends', 'unzip'])];
  if (env.packageManager === 'dnf') return [prefixed(env, 'dnf', ['install', '-y', 'unzip'])];
  if (env.packageManager === 'brew') return [{ cmd: 'brew', args: ['install', 'unzip'] }];
  return [];
}

// ---------------------------------------------------------------------------
// Install state machine
// ---------------------------------------------------------------------------
const inFlight = new Map<string, Promise<ProvisionStatus>>();
const log = (...a: unknown[]) => console.log('[provisioning]', ...a);

async function runInstall(conn: Db, def: RuntimeDef, plan: Extract<Plan, { ok: true }>, opts: ProvisionDeps): Promise<ProvisionStatus> {
  const d = depsOf(opts);
  const started = Date.now();
  const deadline = started + INSTALL_TIMEOUT_MS;
  for (const [i, c] of plan.commands.entries()) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) {
      const reason = `install timed out after ${Math.round(INSTALL_TIMEOUT_MS / 1000)}s`;
      upsertProvision(conn, { runtime: def.id, state: 'failed', reason, guidance: def.manualSteps });
      log(`${def.id}: ${reason}`);
      return (await getProvisionStatus(conn, def.id, opts))!;
    }
    log(`${def.id}: running (${i + 1}/${plan.commands.length}) ${c.cmd} ${c.args.join(' ')}`);
    let r: RunCommandResult;
    try {
      r = await d.runner.run(c.cmd, c.args, { timeoutMs: remaining, env: c.env });
    } catch (e) {
      const reason = `installer crashed: ${String((e as Error).message || e)}`;
      upsertProvision(conn, { runtime: def.id, state: 'failed', reason, guidance: def.manualSteps });
      return (await getProvisionStatus(conn, def.id, opts))!;
    }
    if (r.timedOut || r.code !== 0) {
      const tail = (r.stderr || r.stdout || '').trim().split('\n').slice(-5).join('\n').slice(0, 500);
      const reason = r.timedOut
        ? `install timed out during \`${c.cmd}\``
        : `installer failed: \`${c.cmd}\` exited with code ${r.code}${tail ? ` — ${tail}` : ''}`;
      upsertProvision(conn, { runtime: def.id, state: 'failed', reason, guidance: def.manualSteps });
      log(`${def.id}: ${reason}`);
      return (await getProvisionStatus(conn, def.id, opts))!;
    }
  }
  // Re-detect with the executor's own detection — `ready` must mean Run works.
  const avail = await detectOne(def.id, undefined, opts);
  if (!avail.available) {
    const reason = 'install commands succeeded but the runtime is still not detected on PATH — see the install guidance';
    upsertProvision(conn, { runtime: def.id, state: 'failed', reason, guidance: def.manualSteps });
    log(`${def.id}: ${reason}`);
    return (await getProvisionStatus(conn, def.id, opts))!;
  }
  // Make the install dir visible to the executor in this process and after restarts.
  let installPath = '';
  if (plan.binDir && existsSync(join(plan.binDir, def.binary))) {
    installPath = plan.binDir;
    const path = process.env.PATH || '';
    if (!path.split(':').includes(plan.binDir)) process.env.PATH = `${plan.binDir}:${path}`;
  }
  upsertProvision(conn, {
    runtime: def.id, state: 'ready', reason: '', guidance: def.installHint,
    install_method: plan.method, install_path: installPath,
  });
  log(`${def.id}: installed via ${plan.method} in ${Date.now() - started}ms, re-detected OK (${avail.version ?? 'no version'})`);
  return (await getProvisionStatus(conn, def.id, opts))!;
}

/**
 * Ensure a runtime is available, kicking off a background install when it is
 * missing and installable. NEVER blocks: returns the current status at once
 * (installing / ready / present / install_unavailable / failed).
 */
// Synchronous claim set: ensureRuntime is async, so two concurrent calls
// could both pass the in-flight check before either sets it. The claim is
// taken synchronously on entry (before the first await) and released when
// the inner call returns — by then the in-flight entry is already set.
const claimed = new Set<string>();

export async function ensureRuntime(conn: Db, runtimeId: string, opts?: ProvisionDeps & { enabled?: boolean }): Promise<ProvisionStatus> {
  if (inFlight.has(runtimeId) || claimed.has(runtimeId)) {
    return (await getProvisionStatus(conn, runtimeId, opts))!;
  }
  claimed.add(runtimeId);
  try {
    return await ensureRuntimeInner(conn, runtimeId, opts);
  } finally {
    claimed.delete(runtimeId);
  }
}

async function ensureRuntimeInner(conn: Db, runtimeId: string, opts?: ProvisionDeps & { enabled?: boolean }): Promise<ProvisionStatus> {
  const def = RUNTIME_BY_ID.get(runtimeId);
  if (!def) throw new Error(`unknown runtime: ${runtimeId}`);
  const avail = await detectOne(runtimeId, undefined, opts);
  if (avail.available) {
    const row = getProvisionRow(conn, runtimeId);
    if (row?.state !== 'ready' && row?.state !== 'present') {
      upsertProvision(conn, { runtime: runtimeId, state: row?.state === 'ready' ? 'ready' : 'present', reason: '', guidance: def.installHint });
    }
    return (await getProvisionStatus(conn, runtimeId, opts))!;
  }
  const enabled = opts?.enabled ?? process.env.CODEFORGE_PROVISIONING_ENABLED !== '0';
  if (!enabled) {
    upsertProvision(conn, { runtime: runtimeId, state: 'install_unavailable', reason: 'auto-provisioning is disabled (CODEFORGE_PROVISIONING_ENABLED=0)', guidance: def.manualSteps });
    return (await getProvisionStatus(conn, runtimeId, opts))!;
  }
  const existing = inFlight.get(runtimeId);
  if (existing) {
    log(`${runtimeId}: install already in flight, returning current status`);
    return (await getProvisionStatus(conn, runtimeId, opts))!;
  }
  if (def.kind === 'builtin') {
    // Builtins are always available; reaching here means detection is broken.
    upsertProvision(conn, { runtime: runtimeId, state: 'failed', reason: 'built-in runtime was not detected — this is a bug, not a missing install', guidance: def.manualSteps });
    return (await getProvisionStatus(conn, runtimeId, opts))!;
  }
  if (def.kind === 'manual') {
    upsertProvision(conn, { runtime: runtimeId, state: 'install_unavailable', reason: `${def.name} cannot be auto-installed — manual install required`, guidance: def.manualSteps });
    return (await getProvisionStatus(conn, runtimeId, opts))!;
  }
  const env = await detectInstallEnv(opts);
  if (env.inContainer) {
    const reason = 'running inside a Docker container as a non-root user: runtime installs cannot work here — the runtime must be baked into the image (see backend/Dockerfile)';
    upsertProvision(conn, { runtime: runtimeId, state: 'install_unavailable', reason, guidance: def.manualSteps });
    log(`${runtimeId}: ${reason}`);
    return (await getProvisionStatus(conn, runtimeId, opts))!;
  }
  if (!env.isRoot && !env.hasSudo && !env.packageManager && def.installer === 'none') {
    const reason = 'no install capability: not root, no passwordless sudo, and no package manager found';
    upsertProvision(conn, { runtime: runtimeId, state: 'install_unavailable', reason, guidance: def.manualSteps });
    return (await getProvisionStatus(conn, runtimeId, opts))!;
  }
  const plan = await planInstall(def, env, opts ?? {});
  if (!plan.ok) {
    upsertProvision(conn, { runtime: runtimeId, state: 'install_unavailable', reason: plan.reason, guidance: plan.guidance });
    log(`${runtimeId}: install unavailable — ${plan.reason}`);
    return (await getProvisionStatus(conn, runtimeId, opts))!;
  }
  const row = getProvisionRow(conn, runtimeId);
  upsertProvision(conn, {
    runtime: runtimeId, state: 'installing', reason: '', guidance: def.installHint,
    install_method: plan.method, attempts: (row?.attempts ?? 0) + 1,
    last_attempt_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
  });
  log(`${runtimeId}: starting background install via ${plan.method} (triggered install, attempt ${(row?.attempts ?? 0) + 1})`);
  const bg = runInstall(conn, def, plan, opts ?? {}).catch(async (e) => {
    upsertProvision(conn, { runtime: runtimeId, state: 'failed', reason: `installer crashed: ${String((e as Error).message || e)}`, guidance: def.manualSteps });
    return (await getProvisionStatus(conn, runtimeId, opts))!;
  });
  inFlight.set(runtimeId, bg);
  void bg.finally(() => { if (inFlight.get(runtimeId) === bg) inFlight.delete(runtimeId); });
  return (await getProvisionStatus(conn, runtimeId, opts))!;
}

/** Map a course `language` to its runtime and ensure it (fire-and-forget safe). */
export async function ensureRuntimeForLanguage(conn: Db, language: string, opts?: ProvisionDeps): Promise<ProvisionStatus | null> {
  const runtimeId = LANGUAGE_TO_RUNTIME[language];
  if (!runtimeId) { log(`no runtime mapping for course language ${JSON.stringify(language)}`); return null; }
  try {
    return await ensureRuntime(conn, runtimeId, opts);
  } catch (e) {
    log(`provisioning for language ${language} failed to start:`, String((e as Error).message || e));
    return null;
  }
}

/** For tests: clear the in-process install locks. */
export function __clearInFlightForTests(): void { inFlight.clear(); claimed.clear(); }
