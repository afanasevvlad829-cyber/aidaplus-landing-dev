#!/bin/bash

set -Eeuo pipefail

PROJECT_DIR="/Users/vladimirafanasev/aidaplus-dev"
SERVER_HOST="kv145@dev.aidaplus.ru"
SERVER_DIR="/var/www/aidaplus-dev"
BRANCH="main"
SITE_URL="https://dev.aidaplus.ru"

echo "======================================"
echo " AIDAPLUS PUSH + DEPLOY"
echo "======================================"

cd "$PROJECT_DIR"

if [ ! -d ".git" ]; then
  echo "ERROR: not a git repository"
  exit 1
fi

echo
echo "=== GIT STATUS ==="
git status --short || true

echo
read -rp "Commit message: " COMMIT_MSG

if [ -z "${COMMIT_MSG// }" ]; then
  echo "ERROR: commit message cannot be empty"
  exit 1
fi

echo
echo "=== GIT ADD ==="
git add .

echo
echo "=== GIT COMMIT ==="
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "$COMMIT_MSG"
fi

echo
echo "=== GIT PUSH ==="
git push origin "$BRANCH"

LOCAL_HEAD="$(git rev-parse --short HEAD)"

echo
echo "=== REMOTE DEPLOY ==="

ssh "$SERVER_HOST" <<ENDSSH
set -Eeuo pipefail
cd "$SERVER_DIR"

echo "--- FETCH ---"
git fetch origin

echo "--- RESET ---"
git reset --hard origin/$BRANCH

echo "--- SERVER HEAD ---"
git rev-parse --short HEAD

echo "--- BUILD ---"
if [ -f "build.sh" ]; then
  bash build.sh
fi

echo "--- DEPLOY ---"
if [ -f "deploy.sh" ]; then
  chmod +x deploy.sh
  ./deploy.sh
fi
ENDSSH

echo
echo "=== VERIFY LIVE SITE ==="
curl -s "$SITE_URL" | grep -o "Кратко\|Подробно\|Компактный\|Полный" | sort | uniq || true

echo
echo "=== DONE ==="
echo "Local HEAD: $LOCAL_HEAD"
echo "Open: $SITE_URL"

