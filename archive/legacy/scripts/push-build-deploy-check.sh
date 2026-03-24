#!/usr/bin/env bash
set -Eeuo pipefail

REMOTE_HOST="kv145@dev.aidaplus.ru"
REMOTE_DIR="/var/www/aidaplus-dev"
BRANCH="main"

echo "======================================"
echo " AIDACAMP PUSH + BUILD + DEPLOY + CHECK"
echo "======================================"
echo

echo "=== LOCAL STATUS ==="
git status --short
echo

echo "=== LOCAL HEAD ==="
git rev-parse --short HEAD || true
git log -1 --oneline || true
echo

read -r -p "Commit message: " COMMIT_MSG
if [[ -z "${COMMIT_MSG}" ]]; then
  COMMIT_MSG="обновление лендинга"
fi

echo
echo "=== GIT ADD ==="
git add .

echo
echo "=== GIT COMMIT ==="
git commit -m "${COMMIT_MSG}" || true

echo
echo "=== GIT PUSH ==="
git push origin "${BRANCH}"

echo
echo "=== REMOTE DEPLOY ==="
ssh "${REMOTE_HOST}" <<REMOTE_EOF
set -Eeuo pipefail

cd "${REMOTE_DIR}"

echo "=== REMOTE HEAD BEFORE ==="
git rev-parse --short HEAD
git log -1 --oneline
echo

echo "=== FETCH + RESET ==="
git fetch origin
git reset --hard origin/${BRANCH}
echo

echo "=== REMOTE HEAD AFTER ==="
git rev-parse --short HEAD
git log -1 --oneline
echo

echo "=== BUILD ==="
bash build.sh
echo

echo "=== DEPLOY ==="
./deploy.sh
echo

echo "=== LIVE CHECK ==="
curl -s https://dev.aidaplus.ru | head -40 || true
REMOTE_EOF

echo
echo "=== DONE ==="
echo "Open:"
echo "https://dev.aidaplus.ru"
