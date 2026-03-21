#!/usr/bin/env bash
set -euo pipefail

cd /var/www/aidaplus-dev

echo "==> Build"
bash build.sh

echo "==> Publish dist/index.html -> index.html"
cp dist/index.html index.html

echo "==> Reload nginx"
if command -v systemctl >/dev/null 2>&1; then
  if command -v sudo >/dev/null 2>&1; then
    sudo systemctl reload nginx || systemctl reload nginx || true
  else
    systemctl reload nginx || true
  fi
fi

echo "==> Deploy done"
