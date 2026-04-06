#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

staged_files="$(git diff --cached --name-only)"
staged_added_or_modified="$(git diff --cached --name-only --diff-filter=AM)"

if [[ -z "$staged_files" ]]; then
  exit 0
fi

check_forbidden_new_entities_in_main_entrypoints() {
  local file="$1"
  local mode="$2"
  local diff
  diff="$(git diff --cached --unified=0 -- "$file" || true)"
  [[ -z "$diff" ]] && return 0

  local added
  added="$(printf '%s\n' "$diff" | rg '^\+[^+]' || true)"
  [[ -z "$added" ]] && return 0

  if [[ "$mode" == "js" ]]; then
    local offenders
    offenders="$(printf '%s\n' "$added" | rg -n '^\+\s*(function\s+[A-Za-z_$][A-Za-z0-9_$]*\s*\(|(const|let|var)\s+[A-Za-z_$][A-Za-z0-9_$]*\s*=|class\s+[A-Za-z_$][A-Za-z0-9_$]*\b)' || true)"
    if [[ -n "$offenders" ]]; then
      echo "[precommit-guard] FAIL: new JS entities are forbidden in $file (fast-track rule)."
      echo "$offenders" | sed 's/^/[precommit-guard]   /'
      blocked=1
    fi
    return 0
  fi

  if [[ "$mode" == "css" ]]; then
    local selectors
    selectors="$(printf '%s\n' "$added" | rg -n '^\+\s*[^@/{][^{]*\{' || true)"
    if [[ -n "$selectors" ]]; then
      echo "[precommit-guard] FAIL: new CSS selectors are forbidden in $file (fast-track rule)."
      echo "$selectors" | sed 's/^/[precommit-guard]   /'
      blocked=1
    fi
    return 0
  fi
}

blocked=0
max_bytes=$((10 * 1024 * 1024))

# Non-source files are blocked in normal commits. Use explicit override only for controlled release jobs.
allow_generated_stage="${AC_ALLOW_GENERATED_STAGE:-0}"
generated_blocked_prefixes=(
  "dist/"
  "build/"
  "cdn/"
  ".runtime/"
  ".tmp/"
  "test-results/"
)
generated_blocked_files=(
  "legal.html"
)

blocked_paths=(
  "assets/"
  "reports/"
)
blocked_ext=(
  ".tgz"
  ".zip"
  ".mp4"
)

while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  is_added_or_modified=0
  if echo "$staged_added_or_modified" | rg -q "^${file}$"; then
    is_added_or_modified=1
  fi

  if (( is_added_or_modified == 1 )) && [[ "$file" == "gpt.html" || "$file" == "build/gpt.html" ]]; then
    echo "[precommit-guard] FAIL: gpt.html artifacts are deprecated and forbidden: $file"
    blocked=1
  fi

  if [[ "$allow_generated_stage" != "1" ]]; then
    for prefix in "${generated_blocked_prefixes[@]}"; do
      if [[ "$file" == "$prefix"* ]]; then
        echo "[precommit-guard] FAIL: generated/runtime artifact is staged: $file"
        echo "[precommit-guard]       Edit source-of-truth files (src/**, src/pages/**, docs/**, tools/**) and rebuild."
        echo "[precommit-guard]       Temporary override (controlled only): AC_ALLOW_GENERATED_STAGE=1 git commit ..."
        blocked=1
      fi
    done
    for exact_file in "${generated_blocked_files[@]}"; do
      if [[ "$file" == "$exact_file" ]]; then
        echo "[precommit-guard] FAIL: generated runtime file is staged: $file"
        blocked=1
      fi
    done
  fi

  for prefix in "${blocked_paths[@]}"; do
    if [[ "$file" == "$prefix"* ]]; then
      echo "[precommit-guard] FAIL: blocked path staged: $file"
      blocked=1
    fi
  done

  for ext in "${blocked_ext[@]}"; do
    if [[ "$file" == *"$ext" ]]; then
      echo "[precommit-guard] FAIL: blocked extension staged: $file"
      blocked=1
    fi
  done
done <<< "$staged_files"

# Fast-track policy: no new entities/selectors in monolith entrypoints.
check_forbidden_new_entities_in_main_entrypoints "src/scripts/main.js" "js"
check_forbidden_new_entities_in_main_entrypoints "src/styles/main.css" "css"

while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  size="$(git cat-file -s ":$file" 2>/dev/null || echo 0)"
  if (( size > max_bytes )); then
    echo "[precommit-guard] FAIL: large staged file (>10MB): $file ($(awk -v s="$size" 'BEGIN {printf "%.2f", s/1024/1024}') MB)"
    blocked=1
  fi
done <<< "$staged_added_or_modified"

if (( blocked == 1 )); then
  echo "[precommit-guard] Remove blocked/large files from index before commit."
  echo "[precommit-guard] Use: git reset HEAD -- <path>"
  exit 1
fi

echo "[precommit-guard] OK"
