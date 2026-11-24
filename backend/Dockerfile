# CodeForge Academy — backend image (multi-stage, Node 24)
# Build:  docker build -t codeforge-backend ./backend
# Run:    docker run -p 4000:4000 -v codeforge-data:/app/data -e SESSION_SECRET=... codeforge-backend
#
# RUNTIME COVERAGE — every language used by the tracks, DSA and projects
# is either baked into this image, auto-installable on a local/dev host, or
# explicitly manual-only. See docs/DOCKER.md for the full matrix and
# backend/src/services/provisioning.ts (RUNTIME_CATALOG) for the source of
# truth. The container runs as the non-root `node` user, so runtime installs
# CANNOT happen inside a running container — baking into the image is the
# Docker path; on-demand auto-install is for local/dev deployments only.
#
# Baked into this image (apt on Debian bookworm, + official downloads):
#   python3, gcc, g++ (build-essential: C/C++/asm + headers/libs), golang-go,
#   default-jre-headless (Java single-file launch; no javac needed),
#   perl, rustc + cargo (bookworm ships Rust 1.63 — older than rustup stable
#   but fine for the lessons), php-cli, ruby, lua5.4 (+ `lua` symlink),
#   elixir, r-base-core (Rscript), ghc (Haskell runghc — the big one,
#   ~650 MB installed; kept because completeness beats size here),
#   scala (needs the JRE above), solc (official static binary),
#   kotlinc (official compiler zip; needs the JRE above),
#   git, ansible (DevOps tool tracks), terraform (official release zip),
#   docker CLI only (official static bundle — client binary, NO daemon;
#   the CLI talks to the HOST daemon, so the containerised backend needs
#   the host docker socket mounted for Docker exercises, see docs/DOCKER.md),
#   python3-pip + pip (network-automation Python libraries): jinja2, pyyaml,
#   textfsm, netmiko, nornir, napalm, ncclient, paramiko, pynetbox, requests,
#   xmltodict, pyats; and AI-build Python libraries: numpy, CPU-only torch
#   (from the PyTorch CPU index — the default PyPI wheel is the CUDA
#   bundle), mcp (Python MCP SDK 2.x), pytest, uv.
# Auto-installable on local/dev hosts only (NOT in this image):
#   C# (.NET SDK via dotnet-install), Dart (official SDK zip),
#   Julia (official tarball), Terraform (official zip). See the provisioning service.
# Manual-only everywhere (no unattended install exists):
#   Swift (platform-specific ~700 MB toolchains), Objective-C (Xcode/GNUstep),
#   MongoDB / Redis (services, not code runners — those tracks are quiz-style),
#   Docker Engine daemon (the image ships only the CLI; the daemon is host-side),
#   Batfish (needs a Java server process; its lessons are validation-style,
#   not live queries against a running Batfish server).
# Built-in (no install ever needed): SQL (node:sqlite), HTML (static check).
# Node.js itself (TS/JS/React) is the base image.
#
# Size note: the apt set adds roughly 1.0–1.3 GB over the previous image,
# dominated by ghc (~650 MB), rustc/cargo + LLVM (~200 MB) and R (~150 MB
# with dependencies), plus ~215 MB for the pip-installed network-automation
# Python libraries (netmiko, nornir, napalm, ncclient, pyATS, etc. — the
# pip layer was measured at ~213 MB in the build sandbox), plus ~805 MB
# installed for CPU-only torch (210 MB download; the tiny GPT trains in
# ~136 s on shared CPU in the build sandbox) and ~10 MB for mcp + pytest
# + numpy + uv. That is the
# deliberate cost of covering every track in the image; the sizes are
# estimates from the packages' Installed-Size fields and have NOT been
# measured from a real `docker build` here (no Docker in the build
# sandbox — see docs/DOCKER.md).

FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY tsconfig.json ./
COPY src ./src
RUN npm run build && npm prune --omit=dev

FROM node:24-bookworm-slim AS runtime
ENV NODE_ENV=production
# Real code-execution runtimes + tini for signal handling + curl/unzip for
# the official toolchain downloads below. git + ansible are the DevOps tool
# tracks' CLIs (apt on bookworm); terraform + the docker CLI come as
# official downloads below (no apt package).
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    python3 python3-pip gcc g++ build-essential golang-go default-jre-headless perl tini \
    ca-certificates curl unzip git ansible \
    rustc cargo php-cli ruby lua5.4 elixir r-base-core ghc scala \
  && rm -rf /var/lib/apt/lists/* \
  && ln -sf /usr/bin/lua5.4 /usr/local/bin/lua \
  && mkdir -p /app/data /app/dist \
  && chown -R node:node /app
# Network-automation Python libraries (pip — no apt packages on bookworm):
# jinja2, pyyaml, textfsm, netmiko, nornir, napalm, ncclient, paramiko,
# pynetbox, requests, xmltodict, pyats. Installed as root here, before
# USER node; the executor runs `python3 -I`, which still sees system
# site-packages, so netauto exercises run for real in the image.
RUN pip3 install --break-system-packages \
    jinja2 pyyaml textfsm netmiko nornir napalm ncclient paramiko pynetbox requests xmltodict pyats
# AI-build Python libraries: CPU-only torch for the build-your-own-GPT
# project (from the PyTorch CPU index — the default PyPI wheel is the CUDA
# bundle), plus the MCP Python SDK, pytest, numpy and uv for the MCP/evals
# projects. Installed as root here, before USER node; the executor runs
# `python3 -I`, which still sees system site-packages, so the AI-build
# projects run for real in the image. (mcp 2.x: the server class is
# MCPServer from mcp.server.mcpserver — older guides call it FastMCP.)
RUN pip3 install --break-system-packages --no-cache-dir --index-url https://download.pytorch.org/whl/cpu torch \
  && pip3 install --break-system-packages --no-cache-dir mcp pytest numpy uv
# Solidity: official static binary (no apt package on bookworm).
RUN curl -fsSL https://github.com/ethereum/solidity/releases/download/v0.8.26/solc-static-linux \
    -o /usr/local/bin/solc \
  && chmod +x /usr/local/bin/solc
# Kotlin: official compiler zip (no apt package on bookworm; needs the JRE above).
RUN curl -fsSL https://github.com/JetBrains/kotlin/releases/download/v1.9.24/kotlin-compiler-1.9.24.zip \
    -o /tmp/kotlin-compiler.zip \
  && unzip -q /tmp/kotlin-compiler.zip -d /usr/local \
  && ln -sf /usr/local/kotlinc/bin/kotlinc /usr/local/bin/kotlinc \
  && ln -sf /usr/local/kotlinc/bin/kotlin /usr/local/bin/kotlin \
  && rm /tmp/kotlin-compiler.zip
# Terraform: official release binary (no apt package on bookworm).
RUN curl -fsSL https://releases.hashicorp.com/terraform/1.17.2/terraform_1.17.2_linux_amd64.zip \
    -o /tmp/terraform.zip \
  && unzip -q /tmp/terraform.zip -d /usr/local/bin \
  && chmod +x /usr/local/bin/terraform \
  && rm /tmp/terraform.zip
# Docker CLI only (client binary from the official static bundle — no
# daemon in this image). The CLI talks to the HOST daemon: the
# containerised backend needs the host docker socket mounted (see
# docs/DOCKER.md); without it, Docker exercises honestly report
# runtime_unavailable.
RUN curl -fsSL https://download.docker.com/linux/static/stable/x86_64/docker-28.1.0.tgz \
    -o /tmp/docker.tgz \
  && tar -xzf /tmp/docker.tgz -C /tmp docker/docker \
  && mv /tmp/docker/docker /usr/local/bin/docker \
  && chmod +x /usr/local/bin/docker \
  && rm -rf /tmp/docker.tgz /tmp/docker
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
# The compiled seed code dynamic-imports dist/curriculum/data/*.js — it is
# part of dist, so no extra copy step is needed.
USER node
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:4000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "dist/index.js"]
