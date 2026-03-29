#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

staged_files="$(git diff --cached --name-only)"

if [[ -z "$staged_files" ]]; then
  exit 0
fi

touches_dist=0
touches_source=0

while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  if [[ "$file" == "dist/index.html" || "$file" == "dist/index.htm" || "$file" == "gpt.html" || "$file" == "build/gpt.html" ]]; then
    touches_dist=1
  fi
  if [[ "$file" == "index.html" || "$file" == "src/scripts/main.js" || "$file" == "src/styles/main.css" || "$file" == "build.sh" ]]; then
    touches_source=1
  fi
done <<< "$staged_files"

if (( touches_dist == 1 && touches_source == 0 )); then
  echo "[precommit-guard] FAIL: dist artifacts staged without source-of-truth changes."
  echo "[precommit-guard] Update source first (index.html/src/**), then regenerate dist via build.sh."
  echo "[precommit-guard] Staged files:"
  echo "$staged_files" | sed 's/^/  - /'
  exit 1
fi

echo "[precommit-guard] OK"
