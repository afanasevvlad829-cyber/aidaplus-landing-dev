#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

staged_files="$(git diff --cached --name-only)"
staged_added_or_modified="$(git diff --cached --name-only --diff-filter=AM)"

if [[ -z "$staged_files" ]]; then
  exit 0
fi

touches_dist=0
touches_source=0
blocked=0
max_bytes=$((10 * 1024 * 1024))
blocked_paths=(
  "assets/"
  "reports/"
)
blocked_ext=(
  ".tgz"
  ".zip"
  ".mp4"
  ".webp"
  ".jpeg"
)

while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  if [[ "$file" == "gpt.html" || "$file" == "build/gpt.html" ]]; then
    echo "[precommit-guard] FAIL: gpt.html artifacts are deprecated and forbidden: $file"
    blocked=1
  fi
  if [[ "$file" == "dist/index.html" || "$file" == "dist/index.htm" ]]; then
    touches_dist=1
  fi
  if [[ "$file" == "index.html" || "$file" == "src/scripts/main.js" || "$file" == "src/styles/main.css" || "$file" == "build.sh" ]]; then
    touches_source=1
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

if (( touches_dist == 1 && touches_source == 0 )); then
  echo "[precommit-guard] FAIL: dist artifacts staged without source-of-truth changes."
  echo "[precommit-guard] Update source first (index.html/src/**), then regenerate dist via build.sh."
  echo "[precommit-guard] Staged files:"
  echo "$staged_files" | sed 's/^/  - /'
  exit 1
fi

get_effective_file_content() {
  local file_path="$1"
  if git diff --cached --name-only | rg -q "^${file_path}$"; then
    git show ":${file_path}" 2>/dev/null || true
  else
    git show "HEAD:${file_path}" 2>/dev/null || true
  fi
}

extract_build_version() {
  local source_text="$1"
  echo "$source_text" | sed -nE "s/.*BUILD_VERSION_LABEL = 'v([0-9]+\\.[0-9]+\\.[0-9]+).*/\\1/p" | head -n 1
}

version_to_number() {
  local v="$1"
  local a b c
  IFS='.' read -r a b c <<< "$v"
  printf '%d\n' $((10#$a * 1000000 + 10#$b * 1000 + 10#$c))
}

if echo "$staged_files" | rg -q "^dist/index\\.html$"; then
  staged_dist_content="$(git show :dist/index.html 2>/dev/null || true)"
  head_dist_content="$(git show HEAD:dist/index.html 2>/dev/null || true)"

  staged_version="$(extract_build_version "$staged_dist_content")"
  head_version="$(extract_build_version "$head_dist_content")"

  if [[ -z "$staged_version" ]]; then
    echo "[precommit-guard] FAIL: BUILD_VERSION_LABEL not found in staged dist/index.html"
    exit 1
  fi

  if [[ -n "$head_dist_content" ]]; then
    if [[ -z "$head_version" ]]; then
      echo "[precommit-guard] FAIL: BUILD_VERSION_LABEL not found in HEAD dist/index.html"
      exit 1
    fi

    if [[ "$staged_dist_content" != "$head_dist_content" ]]; then
      staged_num="$(version_to_number "$staged_version")"
      head_num="$(version_to_number "$head_version")"
      if (( staged_num <= head_num )); then
        echo "[precommit-guard] FAIL: dist/index.html changed but BUILD_VERSION_LABEL did not increase."
        echo "[precommit-guard] HEAD version: v$head_version"
        echo "[precommit-guard] New  version: v$staged_version"
        echo "[precommit-guard] Bump version before commit."
        exit 1
      fi
    fi
  fi
fi

if echo "$staged_files" | rg -q "^(index\\.html|dist/index\\.html|dist/index\\.htm)$"; then
  effective_index_html="$(get_effective_file_content "index.html")"
  effective_dist_index_html="$(get_effective_file_content "dist/index.html")"
  effective_dist_index_htm="$(get_effective_file_content "dist/index.htm")"

  if [[ -z "$effective_index_html" || -z "$effective_dist_index_html" || -z "$effective_dist_index_htm" ]]; then
    echo "[precommit-guard] FAIL: cannot read one of canonical runtime artifacts (index.html, dist/index.html, dist/index.htm)."
    exit 1
  fi

  if [[ "$effective_dist_index_html" != "$effective_index_html" || "$effective_dist_index_html" != "$effective_dist_index_htm" ]]; then
    echo "[precommit-guard] FAIL: runtime artifacts are out of sync."
    echo "[precommit-guard] Required: index.html == dist/index.html == dist/index.htm"
    echo "[precommit-guard] Fix by syncing from dist/index.html (or re-running build)."
    exit 1
  fi
fi

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
