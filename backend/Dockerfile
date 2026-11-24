# CodeForge Academy — backend image (multi-stage, Node 24)
# Build:  docker build -t codeforge-backend ./backend
# Run:    docker run -p 4000:4000 -v codeforge-data:/app/data -e SESSION_SECRET=... codeforge-backend
# The image ships the real execution runtimes for Python, C, C++, Go, Java
# (JRE — single-file source launch needs no javac), Perl and Bash/SQLite.
# Rust is NOT installed in this image (rustup toolchains are ~1 GB); the API
# reports rust as runtime_unavailable with install instructions until it is added.
# See docs/DOCKER.md for the optional Rust layer.

FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY tsconfig.json ./
COPY src ./src
RUN npm run build && npm prune --omit=dev

FROM node:24-bookworm-slim AS runtime
ENV NODE_ENV=production
# Real code-execution runtimes + tini for signal handling.
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 gcc g++ golang-go default-jre-headless perl tini ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && mkdir -p /app/data /app/dist \
  && chown -R node:node /app
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
