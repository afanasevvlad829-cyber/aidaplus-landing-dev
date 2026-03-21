#!/bin/zsh
set -euo pipefail

SRC="/Users/vladimirafanasev/aidaplus-dev"
MIRROR="/Users/vladimirafanasev/Backups/aidaplus-dev/github-mirror"
REMOTE="https://github.com/afanasevvlad829-cyber/aidaplus-landing-dev.git"
BRANCH="codex/autobackup-full"
LOG="/Users/vladimirafanasev/Backups/aidaplus-dev/logs/github_autobackup.log"

mkdir -p /Users/vladimirafanasev/Backups/aidaplus-dev/logs

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
  exit 0
fi

TS_HUMAN="$(date '+%Y-%m-%d %H:%M:%S %Z')"
TS_SHORT="$(date '+%Y%m%d_%H%M%S')"

git commit -m "autobackup: full snapshot $TS_SHORT" >/dev/null 2>&1 || true
git push -u origin "$BRANCH" >/dev/null 2>&1

echo "$TS_HUMAN pushed snapshot to $BRANCH" >> "$LOG"
