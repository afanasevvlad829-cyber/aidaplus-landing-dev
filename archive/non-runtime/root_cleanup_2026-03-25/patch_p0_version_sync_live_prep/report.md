1. Что сделано
- Зафиксирована единая policy навигации: full = scroll-first, compact = modal-first.
- Добавлен `journey` в навигацию и доступность всех режимов.
- Добавлен `legal`-раздел и доступность legal/footer во всех режимах.
- Пересобраны артефакты `gpt.html` и `legal.html`.

2. Как зафиксирована policy full/compact
- `navigateToSection()`:
  - full (`desktop full` + `mobile full`) всегда идёт в `scrollToSection()`.
  - compact (`desktop compact` + `mobile compact`) сначала открывает `sectionModal` через `openSectionModal()`.
- Удалён конфликтующий branch, где mobile top-nav мог открывать modal в full-режиме.

3. Как возвращён legal/footer
- Desktop full: сохранён footer + добавлен inline `section-legal`.
- Desktop compact: добавлен пункт меню `Документы`, открывает modal (modal-first).
- Mobile full: добавлен `mobile-section-legal` (scroll-first).
- Mobile compact: добавлен пункт `Документы`, открывает modal (modal-first).

4. Как возвращён journey
- Desktop full: используется inline `section-journey`.
- Desktop compact: добавлен пункт меню `Как проходит` с modal-open.
- Mobile full: добавлен inline `mobile-section-journey`.
- Mobile compact: `Как проходит` открывается через modal.

5. Что не делал
- Не трогал booking-flow/offer logic.
- Не менял аналитику и API-контракты.
- Не делал широкий UI-рефакторинг вне P0-синхронизации.

6. Что осталось на final polish
- При необходимости можно визуально поджать mobile top-nav (текущий P0 функционально стабилен).
- При необходимости можно выделить отдельную иконку для journey вместо текстовой кнопки в mobile.

Smoke check
- Desktop full: scroll-first подтверждён.
- Desktop compact: modal-first подтверждён.
- Mobile full: scroll-first подтверждён.
- Mobile compact: modal-first подтверждён.
- Legal/footer: доступны во всех 4 режимах.
- Journey: доступен во всех 4 режимах.
