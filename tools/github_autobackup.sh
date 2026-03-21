#!/bin/zsh
set -euo pipefail

SRC="/Users/vladimirafanasev/aidaplus-dev"
MIRROR="/Users/vladimirafanasev/Backups/aidaplus-dev/github-mirror"
REMOTE="https://github.com/afanasevvlad829-cyber/aidaplus-landing-dev.git"
BRANCH="codex/autobackup-full"
LOG="/Users/vladimirafanasev/Backups/aidaplus-dev/logs/github_autobackup.log"
JOURNAL_RU="/Users/vladimirafanasev/Backups/aidaplus-dev/logs/github_autobackup_journal_ru.md"

mkdir -p /Users/vladimirafanasev/Backups/aidaplus-dev/logs

if [[ ! -f "$JOURNAL_RU" ]]; then
  cat > "$JOURNAL_RU" <<'MD'
# Журнал GitHub-выгрузок (авто)

Этот журнал ведется автоматически каждые 10 минут.

MD
fi

if [[ ! -d "$MIRROR/.git" ]]; then
  git clone "$REMOTE" "$MIRROR" >/dev/null 2>&1
fi

cd "$MIRROR"
git fetch origin --prune >/dev/null 2>&1 || true

if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  git checkout "$BRANCH" >/dev/null 2>&1
elif git show-ref --verify --quiet "refs/remotes/origin/$BRANCH"; then
  git checkout -B "$BRANCH" "origin/$BRANCH" >/dev/null 2>&1
else
  git checkout -B "$BRANCH" >/dev/null 2>&1
fi

# Mirror source tree into dedicated backup clone
rsync -a --delete \
  --exclude '.git' \
  "$SRC/" "$MIRROR/"

git add -A
if git diff --cached --quiet; then
  echo "$(date '+%Y-%m-%d %H:%M:%S %Z') no changes, skip" >> "$LOG"
  {
    echo "## $(date '+%Y-%m-%d %H:%M:%S %Z')"
    echo "- Статус: изменений не обнаружено, выгрузка в GitHub не требовалась."
    echo "- Ветка бэкапа: \`$BRANCH\`"
    echo
  } >> "$JOURNAL_RU"
  exit 0
fi

TS_HUMAN="$(date '+%Y-%m-%d %H:%M:%S %Z')"
TS_SHORT="$(date '+%Y%m%d_%H%M%S')"

CHANGED_TOTAL="$(git diff --cached --name-only | wc -l | tr -d ' ')"
CHANGED_LIST="$(mktemp)"
git diff --cached --name-status | head -n 40 > "$CHANGED_LIST"

AREAS_SUMMARY="$(git diff --cached --name-only \
  | awk -F'/' '{print $1}' \
  | sort \
  | uniq -c \
  | sort -nr \
  | awk '{printf("%s:%s ", $2, $1)}')"

git commit -m "autobackup: full snapshot $TS_SHORT" >/dev/null 2>&1 || true
git push -u origin "$BRANCH" >/dev/null 2>&1

COMMIT_SHA="$(git rev-parse --short HEAD)"
COMMIT_URL="https://github.com/afanasevvlad829-cyber/aidaplus-landing-dev/commit/$(git rev-parse HEAD)"

echo "$TS_HUMAN pushed snapshot to $BRANCH" >> "$LOG"

{
  echo "## $TS_HUMAN"
  echo "- Статус: выполнена полная выгрузка в GitHub."
  echo "- Ветка бэкапа: \`$BRANCH\`"
  echo "- Коммит: \`$COMMIT_SHA\`"
  echo "- Ссылка: $COMMIT_URL"
  echo "- Изменено файлов: $CHANGED_TOTAL"
  if [[ -n "$AREAS_SUMMARY" ]]; then
    echo "- Области изменений: $AREAS_SUMMARY"
  fi
  echo "- Примеры измененных файлов (до 40):"
  echo '```'
  cat "$CHANGED_LIST"
  echo '```'
  echo
} >> "$JOURNAL_RU"

rm -f "$CHANGED_LIST"
