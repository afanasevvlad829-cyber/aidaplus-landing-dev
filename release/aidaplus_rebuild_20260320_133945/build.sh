#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

DIST_DIR="$ROOT_DIR/dist"

rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

# Single source of truth: copy source assets and modules as-is.
cp "$ROOT_DIR/index.html" "$DIST_DIR/index.html"
cp -R "$ROOT_DIR/src" "$DIST_DIR/src"
cp -R "$ROOT_DIR/assets" "$DIST_DIR/assets"

# Make dist index self-contained for static preview from dist root.
python3 - <<'PY'
from pathlib import Path
p = Path('dist/index.html')
s = p.read_text(encoding='utf-8')
s = s.replace('href="/src/', 'href="./src/')
s = s.replace('src="/src/', 'src="./src/')
s = s.replace('href="/assets/', 'href="./assets/')
s = s.replace('src="/assets/', 'src="./assets/')
p.write_text(s, encoding='utf-8')
PY

echo "Build completed: dist/ (clean copy, no inline runtime)"
