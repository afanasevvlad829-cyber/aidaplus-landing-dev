#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

OUT_FILE="${1:-reports/$(date +%F)_function_index.md}"
mkdir -p "$(dirname "$OUT_FILE")"

TMP_FILE="$(mktemp)"
trap 'rm -f "$TMP_FILE"' EXIT

{
  echo "# Function Index"
  echo
  echo "Generated: $(date '+%Y-%m-%d %H:%M:%S %Z')"
  echo
  echo "Scope: \`src/scripts/**/*.js\`"
  echo
  echo "| File | Functions |"
  echo "|---|---:|"
} > "$OUT_FILE"

total=0
while IFS= read -r file; do
  perl -0777 -ne '
    while (/function\s+([A-Za-z_\$][A-Za-z0-9_\$]*)\s*\(/g) { print "$1\n"; }
    while (/(?:const|let|var)\s+([A-Za-z_\$][A-Za-z0-9_\$]*)\s*=\s*(?:async\s*)?function\b/g) { print "$1\n"; }
    while (/(?:const|let|var)\s+([A-Za-z_\$][A-Za-z0-9_\$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g) { print "$1\n"; }
  ' "$file" | sort -u > "$TMP_FILE"

  count="$(wc -l < "$TMP_FILE" | tr -d ' ')"
  total=$((total + count))
  echo "| \`$file\` | $count |" >> "$OUT_FILE"

  if [ "$count" -gt 0 ]; then
    echo >> "$OUT_FILE"
    echo "## \`$file\`" >> "$OUT_FILE"
    sed 's/^/- `/' "$TMP_FILE" | sed 's/$/`/' >> "$OUT_FILE"
  fi
  echo >> "$OUT_FILE"
done < <(rg --files src/scripts -g '*.js' | sort)

{
  echo "## Summary"
  echo
  echo "- Total indexed functions: **$total**"
  echo "- Output file: \`$OUT_FILE\`"
} >> "$OUT_FILE"

echo "Generated function index: $OUT_FILE"
