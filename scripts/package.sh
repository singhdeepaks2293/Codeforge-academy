#!/usr/bin/env bash
# Package CodeForge Academy into a clean zip (no node_modules, dist, data, .env, *.db).
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$HOME/workspace/your_files/codeforge-academy-2026-11-24.zip}"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
mkdir -p "$STAGE/codeforge-academy"
cd "$ROOT"
# Copy everything except build artefacts, dependencies, databases and secrets.
rsync -a --delete \
  --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude '/data' \
  --exclude '.env' \
  --exclude '*.db' \
  --exclude '*.db-journal' \
  --exclude '*.db-shm' \
  --exclude '*.db-wal' \
  --exclude 'coverage' \
  --exclude '.git' \
  --exclude '.DS_Store' \
  ./ "$STAGE/codeforge-academy/"
cd "$STAGE"
zip -qr "$OUT" codeforge-academy
echo "Wrote $OUT"
unzip -l "$OUT" | tail -3
du -h "$OUT"
