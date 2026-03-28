# Telegram ENV (server-side)

## Current source of production values

- GitHub Actions secrets:
  - `AIDAPLUS_TELEGRAM_BOT_TOKEN`
  - `AIDAPLUS_TELEGRAM_CHAT_ID`
- During deploy workflow, these values are written to:
  - `/var/www/aidaplus-dev/.runtime/server.env`

## Local development

- Create local file:
  - `/Users/vladimirafanasev/aidaplus-dev/.runtime/server.env`
- Example content:

```bash
AIDAPLUS_TELEGRAM_BOT_TOKEN=123456:ABCDEF...
AIDAPLUS_TELEGRAM_CHAT_ID=-1001234567890
```

- Start local server:

```bash
/Users/vladimirafanasev/aidaplus-dev/tools/fasttrack-server.sh restart
```

- Check status:

```bash
/Users/vladimirafanasev/aidaplus-dev/tools/fasttrack-server.sh health
```

## Notes

- Frontend should post leads to `/api/lead`.
- Bot token and chat id are not required in browser runtime config when server endpoint is available.
