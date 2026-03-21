#!/bin/zsh
set -euo pipefail

DEST="/Users/vladimirafanasev/Backups/aidaplus-dev"
LOG_DIR="${DEST}/logs"
REPORT_FILE="${LOG_DIR}/backup_daily_report_ru.md"

mkdir -p "$LOG_DIR" "${DEST}/files" "${DEST}/git"

TS_HUMAN="$(date '+%Y-%m-%d %H:%M:%S %Z')"

count_files=$(find "${DEST}/files" -maxdepth 1 -type f -name 'aidaplus_files_*.tar.gz' | wc -l | tr -d ' ')
count_bundles=$(find "${DEST}/git" -maxdepth 1 -type f -name 'aidaplus_git_*.bundle' | wc -l | tr -d ' ')

sum_bytes() {
  dir="$1"
  pattern="$2"
  find "$dir" -maxdepth 1 -type f -name "$pattern" -exec stat -f%z {} \; | awk '{s+=$1} END{printf "%.0f", s+0}'
}

human() {
  awk -v x="$1" 'function h(v){s="B KiB MiB GiB TiB";split(s,a," ");i=1;while(v>=1024&&i<5){v/=1024;i++}printf "%.1f %s",v,a[i]} BEGIN{h(x)}'
}

bytes_files=$(sum_bytes "${DEST}/files" 'aidaplus_files_*.tar.gz')
bytes_bundles=$(sum_bytes "${DEST}/git" 'aidaplus_git_*.bundle')
bytes_total=$((bytes_files + bytes_bundles))

old_candidates=$(find "${DEST}/files" -maxdepth 1 -type f -name 'aidaplus_files_*.tar.gz' -mtime +14 | sort | head -n 20)
large_candidates=$(find "${DEST}/files" -maxdepth 1 -type f -name 'aidaplus_files_*.tar.gz' -exec stat -f '%z %N' {} \; | sort -nr | head -n 10)

{
  echo "## Ежедневный отчёт по бэкапам — $TS_HUMAN"
  echo
  echo "- Файловых архивов: $count_files"
  echo "- Git bundle: $count_bundles"
  echo "- Объём файловых архивов: $(human "$bytes_files")"
  echo "- Объём git bundle: $(human "$bytes_bundles")"
  echo "- Общий объём: $(human "$bytes_total")"
  echo
  echo "### Что можно почистить (автоматически НЕ удаляется)"
  echo "Архивы старше 14 дней (до 20):"
  echo '```'
  if [[ -n "$old_candidates" ]]; then
    echo "$old_candidates"
  else
    echo "Нет кандидатов старше 14 дней"
  fi
  echo '```'
  echo
  echo "Самые крупные файловые архивы (топ-10):"
  echo '```'
  if [[ -n "$large_candidates" ]]; then
    echo "$large_candidates"
  else
    echo "Файловые архивы не найдены"
  fi
  echo '```'
  echo
} >> "$REPORT_FILE"

/usr/bin/osascript -e 'display notification "Ежедневный отчёт по бэкапам сформирован" with title "AidaPlus Backup" subtitle "Откройте backup_daily_report_ru.md"' >/dev/null 2>&1 || true
