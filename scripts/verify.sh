#!/usr/bin/env bash
# make verify — backend tests + frontend tests + frontend build + backend build
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
echo "== Dockerfile COPY check =="
node scripts/check-dockerfiles.mjs
echo "== backend tests =="
npm run test --workspace=backend
echo "== backend build =="
npm run build --workspace=backend
echo "== frontend tests =="
npm run test --workspace=frontend
echo "== frontend build =="
npm run build --workspace=frontend
echo "== verify OK =="
