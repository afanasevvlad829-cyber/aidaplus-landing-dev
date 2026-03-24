#!/usr/bin/env bash
set -euo pipefail

cd /var/www/aidaplus-dev

echo "==> Build"
bash build.sh

echo "==> Publish canonical artifact dist/index.html -> index.html"
cp dist/index.html index.html
if [ -f dist/legal.html ]; then
  cp dist/legal.html legal.html
  echo "==> Publish canonical artifact dist/legal.html -> legal.html"
fi

echo "==> Reload nginx"
if command -v systemctl >/dev/null 2>&1; then
  if command -v sudo >/dev/null 2>&1; then
    sudo systemctl reload nginx || systemctl reload nginx || true
  else
    systemctl reload nginx || true
  fi
fi

echo "==> Deploy done"
