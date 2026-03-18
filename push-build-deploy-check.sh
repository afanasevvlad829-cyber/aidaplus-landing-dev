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
  COMMIT_MSG="full mode update"
fi

echo
echo "=== GIT ADD ==="
git add index.html src/scripts/main.js src/styles/main.css dist/index.html || true

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

echo "=== GREP NEW FULL MODE SECTIONS IN FILES ==="
grep -n 'id=\"ai\"\\|id=\"location\"\\|id=\"photos\"\\|id=\"video\"\\|id=\"reviews\"\\|id=\"team\"' index.html dist/index.html || true
echo

echo "=== GREP NAV ANCHORS IN FILES ==="
grep -n 'href=\"#ai\"\\|href=\"#location\"\\|href=\"#photos\"\\|href=\"#video\"\\|href=\"#reviews\"\\|href=\"#team\"' index.html dist/index.html || true
echo

echo "=== LIVE CHECK ==="
curl -s https://dev.aidaplus.ru | grep -o 'id=\"ai\"\\|id=\"location\"\\|id=\"photos\"\\|id=\"video\"\\|id=\"reviews\"\\|id=\"team\"\\|href=\"#ai\"\\|href=\"#location\"\\|href=\"#photos\"\\|href=\"#video\"\\|href=\"#reviews\"\\|href=\"#team\"' | sort | uniq || true
REMOTE_EOF

echo
echo "=== DONE ==="
echo "Open:"
echo "https://dev.aidaplus.ru"
echo
echo "Manual check:"
echo "1. Переключить в 'Подробно'"
echo "2. Проверить новые секции ниже hero"
echo "3. Проверить якоря верхнего меню"
echo "4. Проверить фото / видео / отзывы / команду"
