# Current Design Order Flow Sandbox

Изолированная копия flow на текущем визуальном языке сайта (`/src/styles/main.css`).

## Что внутри
- Полный сценарий: выбор смены -> first offer 72ч -> final offer 24ч -> booking completed.
- Данные смен и цен синхронизированы с актуальными значениями проекта.
- Hero-блоки и Event log (payload preview под Telegram).
- Отдельное хранение state: `localStorage` ключ `cwf:sandbox:v1`.

## Важно
- Production страница и production-скрипты не изменяются.
- Это отдельный sandbox в `ui-sandbox/current-design-flow/`.

## Запуск

```bash
python3 -m http.server 4173
```

Открыть:

- `http://127.0.0.1:4173/ui-sandbox/current-design-flow/`

## Telegram webhook (опционально)

```html
<script>
  window.ORDER_FLOW_CONFIG = {
    telegramWebhookUrl: "https://example.com/webhook"
  };
</script>
```

Если webhook не указан, события остаются в локальном Event log.
