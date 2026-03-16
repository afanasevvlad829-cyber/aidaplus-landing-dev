#!/bin/bash
set -euo pipefail

PROJECT_DIR="/var/www/aidaplus-dev"
TARGET_FILE="index.html"
URL_HTTP="http://dev.aidaplus.ru"
URL_HTTPS="https://dev.aidaplus.ru"

echo "================================="
echo " AIDAPLUS AUTO DEPLOY"
echo "================================="

cd "$PROJECT_DIR"

echo
echo "==> Current directory"
pwd

echo
echo "==> Git status"
git status --short || true

echo
echo "==> Detecting build source"

SOURCE_FILE=""

if [ -f "dist/index.html" ]; then
  SOURCE_FILE="dist/index.html"
fi

if [ -z "$SOURCE_FILE" ] && [ -f "build/index.html" ]; then
  SOURCE_FILE="build/index.html"
fi

if [ -z "$SOURCE_FILE" ] && [ -f "index-final.html" ]; then
  SOURCE_FILE="index-final.html"
fi

if [ -z "$SOURCE_FILE" ]; then
  LATEST_FINAL="$(ls -t index-aidacamp-final-*.html 2>/dev/null | head -n 1 || true)"
  if [ -n "${LATEST_FINAL:-}" ] && [ -f "$LATEST_FINAL" ]; then
    SOURCE_FILE="$LATEST_FINAL"
  fi
fi

if [ -z "$SOURCE_FILE" ]; then
  LATEST_INDEX="$(find . -maxdepth 1 -type f -name 'index-*.html' \
    ! -name 'index.html' \
    ! -name '*backup*' \
    ! -name '*sandbox*' | sed 's#^\./##' | xargs -r ls -t | head -n 1 || true)"
  if [ -n "${LATEST_INDEX:-}" ] && [ -f "$LATEST_INDEX" ]; then
    SOURCE_FILE="$LATEST_INDEX"
  fi
fi

if [ -z "$SOURCE_FILE" ]; then
  if [ -f "$TARGET_FILE" ]; then
    SOURCE_FILE="$TARGET_FILE"
    echo "⚠ No dedicated build file found, using existing $TARGET_FILE"
  else
    echo "✖ No deployable HTML file found"
    exit 1
  fi
fi

echo "✔ Selected source: $SOURCE_FILE"

echo
echo "==> Creating backup of current index.html"
if [ -f "$TARGET_FILE" ]; then
  cp "$TARGET_FILE" "index.backup.$(date +%Y%m%d_%H%M%S).html"
  echo "✔ Backup created"
else
  echo "⚠ No existing index.html to back up"
fi

echo
echo "==> Copying selected build to index.html"
if [ "$SOURCE_FILE" != "$TARGET_FILE" ]; then
  cp "$SOURCE_FILE" "$TARGET_FILE"
  echo "✔ $SOURCE_FILE -> $TARGET_FILE"
else
  echo "ℹ Source already is $TARGET_FILE, copy skipped"
fi

echo
echo "==> Reloading nginx"
sudo systemctl reload nginx
echo "✔ nginx reloaded"

echo
echo "==> Smoke test (HTTP)"
curl -fsSI "$URL_HTTP" | head -n 1 || true

echo
echo "==> Smoke test (HTTPS)"
curl -fsSI "$URL_HTTPS" | head -n 1 || true

echo
echo "==> Final active file preview"
ls -lh "$TARGET_FILE" || true

echo
echo "==> Deploy completed"
echo "HTTP : $URL_HTTP"
echo "HTTPS: $URL_HTTPS"
echo "Source used: $SOURCE_FILE"
echo "================================="
