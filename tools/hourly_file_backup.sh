#!/bin/zsh
set -euo pipefail

SRC="/Users/vladimirafanasev/aidaplus-dev"
DEST="/Users/vladimirafanasev/Backups/aidaplus-dev"
LOG="${DEST}/logs/hourly_file_backup.log"
JOURNAL_RU="${DEST}/logs/file_backup_journal_ru.md"

mkdir -p "${DEST}/files" "${DEST}/git" "${DEST}/logs"

if [[ ! -f "$JOURNAL_RU" ]]; then
  cat > "$JOURNAL_RU" <<'MD'
# Журнал файловых бэкапов (авто)

Этот журнал ведется автоматически раз в час.

MD
fi

TS_HUMAN="$(date '+%Y-%m-%d %H:%M:%S %Z')"
TS_SHORT="$(date '+%Y%m%d_%H%M%S')"

FILE_ARCHIVE="${DEST}/files/aidaplus_files_${TS_SHORT}.tar.gz"
GIT_BUNDLE="${DEST}/git/aidaplus_git_${TS_SHORT}.bundle"

cd "$SRC"
git bundle create "$GIT_BUNDLE" --all >/dev/null 2>&1 || true

tar -czf "$FILE_ARCHIVE" \
  --exclude='.git' \
  -C /Users/vladimirafanasev aidaplus-dev

FILE_SIZE="$(stat -f%z "$FILE_ARCHIVE" 2>/dev/null || echo 0)"
BUNDLE_SIZE="$(stat -f%z "$GIT_BUNDLE" 2>/dev/null || echo 0)"

human() {
  awk -v x="$1" 'function h(v){s="B KiB MiB GiB TiB";split(s,a," ");i=1;while(v>=1024&&i<5){v/=1024;i++}printf "%.1f %s",v,a[i]} BEGIN{h(x)}'
}

echo "$TS_HUMAN created file backup: $FILE_ARCHIVE" >> "$LOG"

{
  echo "## $TS_HUMAN"
  echo "- Статус: выполнен полный файловый бэкап."
  echo "- Архив проекта: \\`$FILE_ARCHIVE\\` ($(human "$FILE_SIZE"))"
  echo "- Git bundle: \\`$GIT_BUNDLE\\` ($(human "$BUNDLE_SIZE"))"
  echo
} >> "$JOURNAL_RU"
