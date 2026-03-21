#!/bin/zsh
set -euo pipefail

BASE="/Users/vladimirafanasev/aidaplus-dev"
DEST="/Users/vladimirafanasev/Backups/aidaplus-dev"
STATE_FILE="$DEST/.last_signature"
LOG_FILE="$DEST/logs/auto_backup.log"

mkdir -p "$DEST/git" "$DEST/files" "$DEST/logs"

signature() {
  find "$BASE" -type f \
    ! -path "$BASE/.git/*" \
    -print0 \
  | xargs -0 stat -f '%N|%m|%z' \
  | shasum -a 256 \
  | awk '{print $1}'
}

SIG_NOW="$(signature)"
SIG_LAST=""
[[ -f "$STATE_FILE" ]] && SIG_LAST="$(cat "$STATE_FILE")"

if [[ "$SIG_NOW" == "$SIG_LAST" ]]; then
  echo "$(date '+%Y-%m-%d %H:%M:%S %Z') no changes, skip" >> "$LOG_FILE"
  exit 0
fi

TS="$(date +%Y%m%d_%H%M%S)"
cd "$BASE"

git bundle create "$DEST/git/aidaplus_git_${TS}.bundle" --all

tar -czf "$DEST/files/aidaplus_files_${TS}.tar.gz" \
  --exclude='.git' \
  -C /Users/vladimirafanasev aidaplus-dev

echo "$SIG_NOW" > "$STATE_FILE"
echo "$(date '+%Y-%m-%d %H:%M:%S %Z') backup created: $TS" >> "$LOG_FILE"
