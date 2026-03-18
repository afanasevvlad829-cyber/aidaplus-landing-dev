#!/bin/bash

# Остановить выполнение при любой ошибке
set -e

# Путь к проекту на сервере
REPO_DIR="/var/www/aidaplus-dev"

# Ветка GitHub
BRANCH="main"

# Сообщение коммита
COMMIT_MESSAGE="sync: current server state"

# Метка времени для backup
STAMP=$(date +%Y%m%d_%H%M%S)

# Переходим в папку проекта
cd "$REPO_DIR" || exit 1

echo "=== STEP 1: Проверяем текущее состояние ==="
git status --short || true

echo
echo "=== STEP 2: Делаем backup-ветку и тег ==="
git branch "backup-before-push-$STAMP" || true
git tag "backup-before-push-$STAMP" || true

echo
echo "=== STEP 3: Добавляем все изменения ==="
git add -A

echo
echo "=== STEP 4: Проверяем, есть ли что коммитить ==="
if git diff --cached --quiet; then
  echo "Нет новых изменений для коммита."
else
  echo "=== STEP 5: Создаём коммит ==="
  git commit -m "$COMMIT_MESSAGE"
fi

echo
echo "=== STEP 6: Получаем последние изменения с GitHub ==="
git fetch origin

echo
echo "=== STEP 7: Убеждаемся, что мы на ветке $BRANCH ==="
git checkout "$BRANCH"

echo
echo "=== STEP 8: Делаем rebase поверх origin/$BRANCH ==="
git pull --rebase origin "$BRANCH"

echo
echo "=== STEP 9: Пушим текущую серверную версию на GitHub ==="
git push origin "$BRANCH"

echo
echo "=== STEP 10: Итоговое состояние ==="
git rev-parse HEAD
git log -1 --oneline

echo
echo "DONE"
echo "Текущая версия сервера отправлена в GitHub, ветка: $BRANCH"
echo "Backup branch/tag: backup-before-push-$STAMP"

