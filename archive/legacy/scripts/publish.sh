#!/bin/bash
set -euo pipefail

PROJECT_DIR="/var/www/aidaplus-dev"
COMMIT_MSG="${1:-update landing}"

cd "$PROJECT_DIR"

echo "================================="
echo " AIDAPLUS PUBLISH"
echo "================================="

echo
echo "==> Current directory"
pwd

echo
echo "==> Git status before publish"
git status --short || true

echo
echo "==> Adding changes"
git add .

if git diff --cached --quiet; then
  echo "ℹ No staged changes to commit"
else
  echo
  echo "==> Commit"
  git commit -m "$COMMIT_MSG"
fi

echo
echo "==> Push to GitHub"
git push origin main

echo
echo "==> Deploy"
./deploy.sh

echo
echo "==> Publish completed"
echo "================================="
