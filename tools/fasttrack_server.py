#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import URLError, HTTPError
from urllib.request import Request, urlopen


def to_bool(v: str | None) -> bool:
    return str(v or "").strip().lower() in {"1", "true", "yes", "on"}


def get_notify_cfg() -> tuple[str, str]:
    token = (os.getenv("AIDAPLUS_TELEGRAM_BOT_TOKEN") or "").strip()
    chat_id = (os.getenv("AIDAPLUS_TELEGRAM_CHAT_ID") or "").strip()
    return token, chat_id


def format_message(event: str, payload: dict) -> str:
    lines: list[str] = []
    if event == "booking_submitted":
        lines.append("AiDaCamp • Новая бронь")
        lines.append(f"Имя: {payload.get('name') or '—'}")
        lines.append(f"Телефон: {payload.get('phone') or '—'}")
        lines.append(f"Возраст: {payload.get('age') or '—'}")
        lines.append(f"Смена: {payload.get('shift_name') or payload.get('shift_date') or '—'}")
        lines.append(f"Цена: {payload.get('price_text') or '—'}")
        lines.append(f"Код: {payload.get('promo_code') or '—'}")
        lines.append(f"Режим: {payload.get('mode') or '—'}")
        lines.append(f"Отправлено: {payload.get('sent_at_local') or '—'}")
        return "\n".join(lines)
    lines.append(f"AiDaCamp • Event: {event or 'unknown'}")
    if payload:
        compact = {k: payload.get(k) for k in ("name", "phone", "age", "shift_name", "price_text", "mode")}
        lines.append(json.dumps(compact, ensure_ascii=False))
    return "\n".join(lines)


def send_to_telegram(event: str, payload: dict) -> dict:
    token, chat_id = get_notify_cfg()
    if not token or not chat_id:
        return {"ok": False, "delivered": False, "reason": "telegram_not_configured"}
    body = {
        "chat_id": chat_id,
        "text": format_message(event, payload),
        "disable_web_page_preview": True,
    }
    req = Request(
        url=f"https://api.telegram.org/bot{token}/sendMessage",
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(req, timeout=12) as resp:
            ok = resp.status == 200
            return {"ok": ok, "delivered": ok, "status": resp.status}
    except (HTTPError, URLError):
        return {"ok": False, "delivered": False, "reason": "telegram_network_error"}


class Handler(SimpleHTTPRequestHandler):
    server_version = "fasttrack_server/1.0"

    def __init__(self, *args, directory: str, **kwargs):
        super().__init__(*args, directory=directory, **kwargs)

    def _write_json(self, status: int, payload: dict) -> None:
        raw = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        self.end_headers()
        self.wfile.write(raw)

    def do_OPTIONS(self):
        if self.path.startswith("/api/lead"):
            self.send_response(HTTPStatus.NO_CONTENT)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
            self.end_headers()
            return
        super().do_OPTIONS()

    def do_GET(self):
        if self.path == "/health":
            token, chat_id = get_notify_cfg()
            self._write_json(
                HTTPStatus.OK,
                {
                    "ok": True,
                    "service": "fasttrack_server",
                    "hasTelegramToken": bool(token),
                    "hasTelegramChatId": bool(chat_id),
                },
            )
            return
        super().do_GET()

    def do_POST(self):
        if not self.path.startswith("/api/lead"):
            self._write_json(HTTPStatus.NOT_FOUND, {"ok": False, "error": "not_found"})
            return
        length = int(self.headers.get("Content-Length") or "0")
        raw = self.rfile.read(length) if length > 0 else b"{}"
        try:
            data = json.loads(raw.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            self._write_json(HTTPStatus.BAD_REQUEST, {"ok": False, "error": "invalid_json"})
            return
        event = str(data.get("event") or "").strip()
        payload = data.get("payload") if isinstance(data.get("payload"), dict) else {}
        result = send_to_telegram(event, payload)
        if result.get("ok"):
            self._write_json(HTTPStatus.OK, {"ok": True, "delivered": True, "endpoint": "telegram"})
            return
        self._write_json(HTTPStatus.SERVICE_UNAVAILABLE, {"ok": False, "delivered": False, **result})


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=4180)
    parser.add_argument("--root", default=".")
    args = parser.parse_args()

    root = str(Path(args.root).resolve())
    httpd = ThreadingHTTPServer(
        (args.host, args.port),
        lambda *a, **k: Handler(*a, directory=root, **k),
    )
    print(
        json.dumps(
            {
                "ok": True,
                "service": "fasttrack_server",
                "root": root,
                "host": args.host,
                "port": args.port,
            },
            ensure_ascii=False,
        ),
        flush=True,
    )
    httpd.serve_forever()


if __name__ == "__main__":
    main()

