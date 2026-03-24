#!/usr/bin/env bash
set -Eeuo pipefail

REMOTE_HOST="kv145@dev.aidaplus.ru"
REMOTE_DIR="/var/www/aidaplus-dev"
BRANCH="main"

MSG="${*:-deploy update}"

echo "=== BUILD LOCAL ==="
bash build.sh

echo
echo "=== GIT PUSH ==="
git add .
git commit -m "$MSG" || true
git push origin "$BRANCH"

echo
echo "=== REMOTE DEPLOY ==="
ssh "$REMOTE_HOST" "
set -Eeuo pipefail
cd '$REMOTE_DIR'
git fetch origin
git reset --hard origin/$BRANCH
bash build.sh
./deploy.sh
git log -1 --oneline
"

echo
echo "=== DONE ==="
echo "https://dev.aidaplus.ru"