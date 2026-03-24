# Telegram Integration Handoff (AidaCamp)

## 1) Цель

Подключить сторонний проект к существующей системе lead-уведомлений сайта, чтобы получать события бронирования в Telegram или через webhook.

## 2) Production-конфиг (основной сайт)

Сайт читает объект `window.AC_NOTIFY_CONFIG`.

Минимальный формат:

```html
<script>
  window.AC_NOTIFY_CONFIG = {
    all: "",                  // общий webhook для всех событий (опционально)
    promo_fixed: "",          // webhook для promo_fixed (опционально)
    booking_submitted: "",    // webhook для booking_submitted (опционально)
    booking_draft_saved: "",  // webhook для черновика (опционально)
    promo_cancelled: "",      // webhook для отмены (опционально)
    telegramBotToken: "",     // токен Telegram-бота (fallback или основной канал)
    telegramChatId: ""        // chat_id канала/чата
  };
</script>
```

Логика доставки:

1. Если для события задан URL (`eventName` key) -> `POST` туда.
2. Если URL события не задан, но задан `all` -> `POST` в `all`.
3. Если webhook отсутствует или вернул ошибку -> fallback в Telegram Bot API (`sendMessage`).

## 3) Webhook контракт (production)

Метод: `POST`

Тело:

```json
{
  "event": "booking_submitted",
  "payload": {
    "app": "aidacamp-landing",
    "mode": "compact",
    "active_tab": "info",
    "step": 7,
    "sent_at_ts": 1760000000000,
    "sent_at_iso": "2026-03-22T17:00:00.000Z",
    "sent_at_local": "22.03.2026, 20:00:00",
    "user_agent": "..."
  }
}
```

### Базовые поля в `payload` (добавляются всегда)

- `app`, `mode`, `active_tab`, `step`
- `sent_at_ts`, `sent_at_iso`, `sent_at_local`
- `user_agent`
- при доступности гео: `ip`, `city`, `region`, `country`, `timezone`

### События, которые реально отправляются

- `promo_fixed` — фиксация промо на 72 часа
- `booking_submitted` — финальная отправка заявки
- `booking_draft_saved` — сохранён черновик при закрытии overlay
- `promo_cancelled` — отмена брони/промо

### Ключевые поля по событиям

`promo_fixed`:
- `lead_type=pre_fixation_72h`, `status=preliminary`
- `phone`, `shift_id`, `shift_name`, `shift_direction`
- `shift_date`, `shift_days`, `price_final`
- `promo_code`, `promo_expires_at_ts`, `promo_expires_at_local`

`booking_submitted`:
- `lead_type=booking_final`, `status=final`
- `phone`, `name`, `shift_id`, `shift_name`, `shift_direction`
- `shift_text`, `shift_date`, `shift_days`
- `price_text`, `promo_code`, `promo_status`
- `promo_expires_at_ts`, `promo_expires_at_local`, `consent`

`booking_draft_saved`:
- `lead_type=booking_draft`, `status=draft`
- `phone`, `name`, `shift_id`, `shift_text`
- `shift_date`, `shift_days`
- `price_text`, `price_base`, `price_final`, `discount_value`
- `promo_code`, `age`, `source=overlay_close`

`promo_cancelled`:
- `lead_type=booking_cancelled`, `status=cancelled`
- `phone`, `name`, `shift_id`, `shift_name`
- `shift_date`, `shift_days`, `price_final`
- `promo_code`, `promo_expires_at_ts`, `promo_expires_at_local`

## 4) Telegram direct fallback

Если webhook недоступен, сайт шлёт в Telegram:

`POST https://api.telegram.org/bot<telegramBotToken>/sendMessage`

Тело:

```json
{
  "chat_id": "<telegramChatId>",
  "text": "AidaCamp lead event\nТип: booking_submitted\n...",
  "disable_web_page_preview": true
}
```

## 5) Sandbox-конфиг (изолированный flow)

Для sandbox (`ui-sandbox/current-design-flow`) используется отдельный конфиг:

```html
<script>
  window.ORDER_FLOW_CONFIG = {
    telegramWebhookUrl: "https://example.com/webhook"
  };
</script>
```

Контракт sandbox webhook: `POST` сырым payload события.

События sandbox:
- `offer_created_with_phone`
- `offer_created_no_phone`
- `booking_completed`

Поля payload sandbox:
- `offerId`, `phone`, `deviceId`
- `shiftId`, `shiftTitle`, `dates.start`, `dates.end`
- `offerType`, `basePrice`, `improvedPrice`, `expiresAt`
- `action`, `createdAt`

## 6) Что передать стороне интеграции (чеклист)

1. URL webhook(ов): `all` или отдельно по событиям.
2. `telegramBotToken`.
3. `telegramChatId`.
4. Подтверждение, какие события обрабатываются: минимум `promo_fixed`, `booking_submitted`.
5. Формат хранения payload на стороне: raw JSON + timestamp.

## 7) Безопасность

- Не хранить токены в публичном репозитории.
- Ограничить доступ к webhook (IP allowlist / secret header).
- Логировать 4xx/5xx и таймауты webhook.
- Для production использовать отдельного Telegram-бота, не общий тестовый.
