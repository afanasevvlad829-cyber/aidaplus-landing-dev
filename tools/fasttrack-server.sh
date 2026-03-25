#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${FASTTRACK_PORT:-4180}"
HOST="${FASTTRACK_HOST:-0.0.0.0}"
PID_FILE="$ROOT_DIR/.runtime/fasttrack-server.pid"
LOG_FILE="$ROOT_DIR/.runtime/fasttrack-server.log"

is_running() {
  if [[ -f "$PID_FILE" ]]; then
    local pid
    pid="$(cat "$PID_FILE" 2>/dev/null || true)"
    if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
      return 0
    fi
  fi
  return 1
}

start_server() {
  if is_running; then
    echo "already running: pid=$(cat "$PID_FILE") port=$PORT"
    return 0
  fi
  mkdir -p "$ROOT_DIR/.runtime"
  local runner
  if command -v caffeinate >/dev/null 2>&1; then
    runner="caffeinate -dimsu python3 -m http.server '$PORT' --bind '$HOST'"
  else
    runner="python3 -m http.server '$PORT' --bind '$HOST'"
  fi
  nohup sh -c "cd '$ROOT_DIR' && exec $runner" >"$LOG_FILE" 2>&1 &
  local pid=$!
  echo "$pid" > "$PID_FILE"
  sleep 0.8
  if kill -0 "$pid" 2>/dev/null; then
    echo "started: pid=$pid url=http://127.0.0.1:$PORT/dist/index.html"
    if command -v caffeinate >/dev/null 2>&1; then
      echo "sleep protection: enabled (caffeinate)"
    else
      echo "sleep protection: unavailable (caffeinate not found)"
    fi
  else
    echo "failed to start server" >&2
    exit 1
  fi
}

stop_server() {
  if ! is_running; then
    echo "not running"
    rm -f "$PID_FILE"
    return 0
  fi
  local pid
  pid="$(cat "$PID_FILE")"
  kill "$pid" 2>/dev/null || true
  sleep 0.5
  if kill -0 "$pid" 2>/dev/null; then
    kill -9 "$pid" 2>/dev/null || true
  fi
  rm -f "$PID_FILE"
  echo "stopped"
}

status_server() {
  if is_running; then
    local pid
    pid="$(cat "$PID_FILE")"
    echo "running: pid=$pid port=$PORT"
    lsof -nP -iTCP:"$PORT" -sTCP:LISTEN || true
    return 0
  fi
  echo "not running"
  return 1
}

restart_server() {
  stop_server
  start_server
}

healthcheck() {
  curl -sS -I "http://127.0.0.1:$PORT/dist/index.html" | sed -n '1,5p'
}

cmd="${1:-status}"
case "$cmd" in
  start) start_server ;;
  stop) stop_server ;;
  restart) restart_server ;;
  status) status_server ;;
  health) healthcheck ;;
  *)
    echo "usage: $0 {start|stop|restart|status|health}" >&2
    exit 2
    ;;
esac
