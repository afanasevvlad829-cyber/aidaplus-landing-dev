# Чистая рабочая сборка сайта

Этот пакет содержит только рабочие файлы сайта.
Служебный audit-режим и метки отключены.

## Состав
- index.html
- assets/
- src/scripts/
- src/styles/
- docs/WORKING_MODULES_RU.md

## Быстрый запуск
1. Откройте папку пакета в терминале.
2. Запустите локальный сервер, например:
   python3 -m http.server 4173
3. Откройте:
   http://localhost:4173/index.html

## Комментарий по уведомлениям
Настройки уведомлений находятся в `window.AC_NOTIFY_CONFIG` в `index.html`.
