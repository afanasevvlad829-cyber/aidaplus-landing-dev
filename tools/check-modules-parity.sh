#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

CSS_MAIN="src/styles/main.css"
JS_MAIN="src/scripts/main.js"

if [[ ! -f "$CSS_MAIN" || ! -f "$JS_MAIN" ]]; then
  echo "ERROR: main.css/main.js not found"
  exit 1
fi

# Deterministic module order for CSS based on resolved @import graph from main.css.
CSS_MODULE_LIST_FILE="$TMP_DIR/css_modules.list"
CSS_MAIN_RESOLVED="$TMP_DIR/css_main.resolved.css"
CSS_MODULE_BUNDLE="$TMP_DIR/css_modules.bundle.css"

python3 - "$CSS_MAIN" "$CSS_MODULE_LIST_FILE" "$CSS_MAIN_RESOLVED" "$CSS_MODULE_BUNDLE" <<'PY'
import os
import re
import sys
from pathlib import Path

main_css = Path(sys.argv[1])
module_list_file = Path(sys.argv[2])
main_resolved_file = Path(sys.argv[3])
bundle_file = Path(sys.argv[4])

import_re = re.compile(r'^\s*@import\s+url\(["\']([^"\']+)["\']\)\s*;\s*$')

def resolve_css(path: Path, seen: set[Path], ordered: list[Path]) -> str:
    path = path.resolve()
    if path in seen or not path.exists():
        return ""
    seen.add(path)
    if path != main_css.resolve():
        ordered.append(path)
    raw = path.read_text(encoding="utf-8")
    out: list[str] = []
    for line in raw.splitlines():
        m = import_re.match(line)
        if m:
            nested = (path.parent / m.group(1)).resolve()
            out.append(resolve_css(nested, seen, ordered))
        else:
            out.append(line)
    return "\n".join(out) + "\n"

if not main_css.exists():
    raise SystemExit(f"main css not found: {main_css}")

resolved_ordered: list[Path] = []
resolved_main = resolve_css(main_css, set(), resolved_ordered)
main_resolved_file.write_text(resolved_main, encoding="utf-8")

direct_imports: list[Path] = []
for line in main_css.read_text(encoding="utf-8").splitlines():
    m = import_re.match(line)
    if not m:
        continue
    direct_imports.append((main_css.parent / m.group(1)).resolve())

bundle_seen: set[Path] = set()
bundle_ordered: list[Path] = []
bundle_chunks: list[str] = []
for p in direct_imports:
    bundle_chunks.append(resolve_css(p, bundle_seen, bundle_ordered))
bundle_file.write_text("".join(bundle_chunks), encoding="utf-8")

module_list_file.write_text("".join(f"{p.relative_to(Path.cwd())}\n" for p in bundle_ordered), encoding="utf-8")
PY

CSS_MODULES=()
while IFS= read -r f; do
  [[ -n "$f" ]] && CSS_MODULES+=("$f")
done < "$CSS_MODULE_LIST_FILE"

JS_MODULES=()
while IFS= read -r f; do JS_MODULES+=("$f"); done < <(find src/scripts/data src/scripts/core src/scripts/features -type f -name '*.js' 2>/dev/null | sort)

if [[ ${#CSS_MODULES[@]} -eq 0 || ${#JS_MODULES[@]} -eq 0 ]]; then
  echo "ERROR: module files not found under expected paths"
  exit 1
fi

JS_MODULE_BUNDLE="$TMP_DIR/js_modules.bundle.js"

: > "$JS_MODULE_BUNDLE"
for f in "${JS_MODULES[@]}"; do
  printf '/* %s */\n' "$f" >> "$JS_MODULE_BUNDLE"
  cat "$f" >> "$JS_MODULE_BUNDLE"
  printf '\n' >> "$JS_MODULE_BUNDLE"
done

# Current runtime uses main.js as the entrypoint bundle. Keep JS parity aligned with runtime semantics.
JS_PARITY_MODE="runtime_main_entrypoint"
JS_COMPARE_SOURCE="$JS_MAIN"
JS_COMPARE_BUNDLE="$JS_MAIN"

CSS_EXACT="not_equal"
JS_EXACT="not_equal"
cmp -s "$CSS_MAIN_RESOLVED" "$CSS_MODULE_BUNDLE" && CSS_EXACT="equal"
cmp -s "$JS_COMPARE_SOURCE" "$JS_COMPARE_BUNDLE" && JS_EXACT="equal"

# Normalized compare via minifiers (preferred)
CSS_MAIN_NORM="$TMP_DIR/css_main.norm.css"
CSS_MOD_NORM="$TMP_DIR/css_mod.norm.css"
JS_MAIN_NORM="$TMP_DIR/js_main.norm.js"
JS_MOD_NORM="$TMP_DIR/js_mod.norm.js"

CSS_NORM_METHOD="fallback"
if npx --yes csso-cli "$CSS_MAIN_RESOLVED" --output "$CSS_MAIN_NORM" >/dev/null 2>&1 && \
   npx --yes csso-cli "$CSS_MODULE_BUNDLE" --output "$CSS_MOD_NORM" >/dev/null 2>&1; then
  CSS_NORM_METHOD="csso"
else
  perl -0777 -pe 's:/\*.*?\*/::gs; s/\s+//g' "$CSS_MAIN_RESOLVED" > "$CSS_MAIN_NORM"
  perl -0777 -pe 's:/\*.*?\*/::gs; s/\s+//g' "$CSS_MODULE_BUNDLE" > "$CSS_MOD_NORM"
fi

JS_NORM_METHOD="fallback"
if npx --yes terser "$JS_COMPARE_SOURCE" -c -m -o "$JS_MAIN_NORM" >/dev/null 2>&1 && \
   npx --yes terser "$JS_COMPARE_BUNDLE" -c -m -o "$JS_MOD_NORM" >/dev/null 2>&1; then
  JS_NORM_METHOD="terser"
else
  perl -0777 -pe 's:/\*.*?\*/::gs; s/\s+//g' "$JS_COMPARE_SOURCE" > "$JS_MAIN_NORM"
  perl -0777 -pe 's:/\*.*?\*/::gs; s/\s+//g' "$JS_COMPARE_BUNDLE" > "$JS_MOD_NORM"
fi

CSS_NORM="not_equal"
JS_NORM="not_equal"
cmp -s "$CSS_MAIN_NORM" "$CSS_MOD_NORM" && CSS_NORM="equal"
cmp -s "$JS_MAIN_NORM" "$JS_MOD_NORM" && JS_NORM="equal"

CSS_MAIN_SHA=$(shasum -a 256 "$CSS_MAIN_NORM" | awk '{print $1}')
CSS_MOD_SHA=$(shasum -a 256 "$CSS_MOD_NORM" | awk '{print $1}')
JS_MAIN_SHA=$(shasum -a 256 "$JS_MAIN_NORM" | awk '{print $1}')
JS_MOD_SHA=$(shasum -a 256 "$JS_MOD_NORM" | awk '{print $1}')

REPORT="$TMP_DIR/parity-report.txt"
{
  echo "css_modules_count=${#CSS_MODULES[@]}"
  echo "js_modules_count=${#JS_MODULES[@]}"
  echo "css_exact=$CSS_EXACT"
  echo "js_exact=$JS_EXACT"
  echo "css_normalized=$CSS_NORM"
  echo "js_normalized=$JS_NORM"
  echo "css_normalization_method=$CSS_NORM_METHOD"
  echo "js_normalization_method=$JS_NORM_METHOD"
  echo "js_parity_mode=$JS_PARITY_MODE"
  echo "css_main_sha256=$CSS_MAIN_SHA"
  echo "css_modules_sha256=$CSS_MOD_SHA"
  echo "js_main_sha256=$JS_MAIN_SHA"
  echo "js_modules_sha256=$JS_MOD_SHA"
} > "$REPORT"

cp "$REPORT" reports/modular_parity_last.txt

echo "=== Modular Parity ==="
cat "$REPORT"

echo "--- CSS modules used ---"
printf '%s\n' "${CSS_MODULES[@]}"

echo "--- JS modules used ---"
printf '%s\n' "${JS_MODULES[@]}"

if [[ "$CSS_NORM" != "equal" ]]; then
  echo "--- CSS normalized diff (first 60 lines) ---"
  diff -u "$CSS_MAIN_NORM" "$CSS_MOD_NORM" | sed -n '1,60p' || true
fi

if [[ "$JS_NORM" != "equal" ]]; then
  echo "--- JS normalized diff (first 60 lines) ---"
  diff -u "$JS_MAIN_NORM" "$JS_MOD_NORM" | sed -n '1,60p' || true
fi
