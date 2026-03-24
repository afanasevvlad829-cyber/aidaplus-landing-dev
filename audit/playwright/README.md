# Playwright Audit Foundation (Stage 1)

Изолированный foundation-слой для browser-аудита сайта.

## Что уже реализовано

- Изолированный tooling-модуль в `audit/playwright`
- Playwright (Chromium)
- Базовый runner `audit:screenshot`
- Сохранение артефактов:
  - PNG screenshot
  - JSON report (url, finalUrl, timestamp, viewport, title, статус ответа)
  - diagnostics (console/network errors) как задел на следующий этап

## Структура

```text
audit/playwright
  playwright.config.js
  package.json
  README.md
  helpers/
    args.js
    paths.js
    time.js
  runners/
    screenshot.runner.js
  artifacts/
    .gitignore
    screenshots/
    reports/
```

## Установка

```bash
npm --prefix audit/playwright install
npm --prefix audit/playwright run audit:install-browsers
```

## Запуск первого runner

```bash
npm --prefix audit/playwright run audit:screenshot -- --url https://example.com
```

Дополнительно:

```bash
# preset viewport
npm --prefix audit/playwright run audit:screenshot -- --url https://example.com --viewport-preset desktop

# custom viewport
npm --prefix audit/playwright run audit:screenshot -- --url https://example.com --viewport 1600x1000

# headed run
npm --prefix audit/playwright run audit:screenshot -- --url https://example.com --headed
```

## Полуавтомат: вставка отчёта в конкретный диалог ChatGPT

Команда вставляет текст отчёта в поле ввода выбранного диалога.

```bash
npm --prefix audit/playwright run audit:chatgpt:push -- \
  --chat-url https://chatgpt.com/c/<dialog-id> \
  --report /absolute/path/to/report.md
```

По умолчанию:
- открывает Chromium в `headed` режиме;
- вставляет текст в prompt;
- **не отправляет** сообщение.

Чтобы отправлять сразу:

```bash
npm --prefix audit/playwright run audit:chatgpt:push -- \
  --chat-url https://chatgpt.com/c/<dialog-id> \
  --report /absolute/path/to/report.md \
  --send
```

Полезные флаги:
- `--profile-dir <path>`: путь к persistent profile (для сохранения логина).
- `--keep-open-ms <ms>`: держать окно открытым после вставки.
- `--headless` / `--headed`.

## Куда складываются артефакты

Папки на каждый запуск:

- `audit/playwright/artifacts/screenshots/<run-id>/...png`
- `audit/playwright/artifacts/reports/<run-id>/...json`

`run-id` формат: `YYYY-MM-DD_HH-mm-ss`

## Что заложено под следующий этап

- URL list (runner уже готов к расширению через args/config)
- viewport presets desktop/mobile
- заготовка diagnostics (console/network)
- конфиг `safety` для будущих safe-rules:
  - dangerous selectors
  - same-domain ограничение
  - whitelist/blacklist селекторов

## Что НЕ делает Stage 1

- не обходит сайт как crawler
- не кликает интерактивные элементы
- не отправляет формы
- не делает destructive actions
