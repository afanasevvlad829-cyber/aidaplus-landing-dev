#!/usr/bin/env python3
import argparse
import json
import os
import subprocess
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib import error, request


def resolve_env(name_list):
    for name in name_list:
        value = os.getenv(name, "").strip()
        if value:
            return value
    return ""


def build_telegram_message(event_name, payload):
    lines = ["AiDaCamp lead", f"Event: {event_name or '-'}"]
    if isinstance(payload, dict):
        ordered = [
            "name",
            "phone",
            "age",
            "shift_name",
            "shift_date",
            "price_text",
            "promo_code",
            "promo_status",
            "mode",
            "ts",
            "tz",
            "url",
        ]
        for key in ordered:
            value = payload.get(key)
            if value is not None and str(value).strip():
                lines.append(f"{key}: {value}")
        for key, value in payload.items():
            if key in ordered:
                continue
            if value is not None and str(value).strip():
                lines.append(f"{key}: {value}")
    return "\n".join(lines)


def send_telegram_message(event_name, payload):
    token = resolve_env(
        [
            "AIDAPLUS_TELEGRAM_BOT_TOKEN",
            "TELEGRAM_BOT_TOKEN",
            "AIDACAMP_TG_TOKEN",
            "TG_BOT_TOKEN",
        ]
    )
    chat_id = resolve_env(
        [
            "AIDAPLUS_TELEGRAM_CHAT_ID",
            "TELEGRAM_CHAT_ID",
            "AIDACAMP_TG_CHAT_ID",
            "TG_CHAT_ID",
        ]
    )
    if not token or not chat_id:
        return False, "telegram_env_missing"

    body = json.dumps(
        {
            "chat_id": chat_id,
            "text": build_telegram_message(event_name, payload),
            "disable_web_page_preview": True,
        }
    ).encode("utf-8")
    req = request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                return True, "ok"
            return False, f"telegram_http_{response.status}"
    except error.HTTPError as exc:
        return False, f"telegram_http_{exc.code}"
    except Exception:
        pass

    # Fallback to system curl. This avoids local Python TLS/cert edge cases.
    try:
        curl_proc = subprocess.run(
            [
                "curl",
                "-sS",
                "--max-time",
                "10",
                "-X",
                "POST",
                f"https://api.telegram.org/bot{token}/sendMessage",
                "-H",
                "Content-Type: application/json",
                "-d",
                json.dumps(
                    {
                        "chat_id": chat_id,
                        "text": build_telegram_message(event_name, payload),
                        "disable_web_page_preview": True,
                    }
                ),
            ],
            capture_output=True,
            text=True,
            check=False,
        )
        if curl_proc.returncode != 0:
            return False, "telegram_network_error"
        parsed = json.loads((curl_proc.stdout or "").strip() or "{}")
        if parsed.get("ok") is True:
            return True, "ok"
        err_code = parsed.get("error_code")
        if err_code:
            return False, f"telegram_http_{err_code}"
        return False, "telegram_network_error"
    except Exception:
        return False, "telegram_network_error"


class FasttrackHandler(SimpleHTTPRequestHandler):
    server_version = "AidaFasttrack/1.0"

    def _send_json(self, status, payload):
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path == "/health":
            self._send_json(
                HTTPStatus.OK,
                {
                    "ok": True,
                    "service": "fasttrack_server",
                    "hasTelegramToken": bool(
                        resolve_env(
                            [
                                "AIDAPLUS_TELEGRAM_BOT_TOKEN",
                                "TELEGRAM_BOT_TOKEN",
                                "AIDACAMP_TG_TOKEN",
                                "TG_BOT_TOKEN",
                            ]
                        )
                    ),
                    "hasTelegramChatId": bool(
                        resolve_env(
                            [
                                "AIDAPLUS_TELEGRAM_CHAT_ID",
                                "TELEGRAM_CHAT_ID",
                                "AIDACAMP_TG_CHAT_ID",
                                "TG_CHAT_ID",
                            ]
                        )
                    ),
                },
            )
            return
        super().do_GET()

    def do_POST(self):
        if self.path.rstrip("/") != "/api/lead":
            self._send_json(HTTPStatus.NOT_FOUND, {"ok": False, "reason": "not_found"})
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            length = 0
        raw = self.rfile.read(length) if length > 0 else b"{}"

        try:
            data = json.loads(raw.decode("utf-8"))
        except Exception:
            self._send_json(HTTPStatus.BAD_REQUEST, {"ok": False, "reason": "invalid_json"})
            return

        event_name = str(data.get("event", "")).strip()
        payload = data.get("payload", {})
        if not isinstance(payload, dict):
            payload = {}

        delivered, reason = send_telegram_message(event_name, payload)
        if delivered:
            self._send_json(
                HTTPStatus.OK,
                {"ok": True, "delivered": True, "endpoint": "telegram_bot"},
            )
            return

        self._send_json(
            HTTPStatus.SERVICE_UNAVAILABLE,
            {"ok": False, "delivered": False, "reason": reason},
        )


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=4180)
    parser.add_argument("--root", default=".")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    os.chdir(root)

    server = ThreadingHTTPServer((args.host, args.port), FasttrackHandler)
    print(f"fasttrack server started at http://127.0.0.1:{args.port}/dist/index.html")
    print("api endpoint: /api/lead")
    server.serve_forever()


if __name__ == "__main__":
    main()
