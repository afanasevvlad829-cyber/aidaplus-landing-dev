#!/bin/zsh
set -euo pipefail

SRC="/Users/vladimirafanasev/aidaplus-dev"
DEST="/Users/vladimirafanasev/Backups/aidaplus-dev"
LOG="${DEST}/logs/hourly_file_backup.log"
JOURNAL_RU="${DEST}/logs/file_backup_journal_ru.md"
KEEP_LAST_FILES=2

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

cd "$SRC"

tar -czf "$FILE_ARCHIVE" \
  --exclude='.git' \
  -C /Users/vladimirafanasev aidaplus-dev

FILE_SIZE="$(stat -f%z "$FILE_ARCHIVE" 2>/dev/null || echo 0)"

# Keep only the newest N file archives to cap growth.
ls -1t "${DEST}"/files/aidaplus_files_*.tar.gz 2>/dev/null | tail -n +"$((KEEP_LAST_FILES + 1))" | xargs -I{} rm -f "{}" || true

human() {
  awk -v x="$1" 'function h(v){s="B KiB MiB GiB TiB";split(s,a," ");i=1;while(v>=1024&&i<5){v/=1024;i++}printf "%.1f %s",v,a[i]} BEGIN{h(x)}'
}

echo "$TS_HUMAN created file backup: $FILE_ARCHIVE" >> "$LOG"

{
  echo "## $TS_HUMAN"
  echo "- Статус: выполнен полный файловый бэкап."
  echo "- Архив проекта: \`$FILE_ARCHIVE\` ($(human "$FILE_SIZE"))"
  echo "- Git bundle: пропущен (делается отдельной ежедневной задачей)."
  echo "- Retention: хранить последние ${KEEP_LAST_FILES} файловых архива."
  echo
} >> "$JOURNAL_RU"
