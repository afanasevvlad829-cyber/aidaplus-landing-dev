# PATCH 49 — Big Bundle Report

## 1. Что сделано
- **Compact desktop menu**: в `desktop + compact` пункты меню открывают `sectionModal` (контент берётся из существующих секций, без ручного дублирования).
- **Video modal polish**: добавлен vertical/horizontal режим (`.video-inner.vertical`, `.video-frame.vertical`) с автоопределением по URL, закрытие по крестику/бекдропу/Esc сохранено.
- **Map embed**: заглушка карты заменена на iframe (`#locationMapFrame`), кнопка «Открыть карту» оставлена.
- **Legal footer + legal page**: в футере добавлены ссылки на `legal.html`, добавлена отдельная страница `src/pages/legal.html`, сборка копирует её в `dist/legal.html` и `legal.html`.
- **Booking UX cleanup**:
  - CTA теперь всегда показывает следующий шаг (`Выберите возраст` → `Выберите смену` → `Оформить заявку`).
  - Hint сделан persistent до исправления шага (`showHint(..., requiredStep)` + `syncBookingHints()`).
- **Hero gap cleanup**: уменьшен верхний отступ у `.body-sections` для плотного стыка hero → первый section.

## 2. Где изменения
- `/Users/vladimirafanasev/aidaplus-dev/index.html`
- `/Users/vladimirafanasev/aidaplus-dev/src/styles/main.css`
- `/Users/vladimirafanasev/aidaplus-dev/src/scripts/main.js`
- `/Users/vladimirafanasev/aidaplus-dev/build.sh`
- `/Users/vladimirafanasev/aidaplus-dev/src/pages/legal.html` (new)
- build artifacts:
  - `/Users/vladimirafanasev/aidaplus-dev/gpt.html`
  - `/Users/vladimirafanasev/aidaplus-dev/legal.html`

## 3. Smoke check
- **Desktop full**: menu scroll работает; карта встроена; footer legal ссылки видны.
- **Desktop compact**: меню открывает modal секций (`Фото` проверено).
- **Mobile**: переход `compact -> full` при nav остаётся рабочим (регрессии по логике не зафиксированы).
- **Video**:
  - vertical режим: отображение как reels/story.
  - horizontal режим: wide-контейнер применяется.
  - закрытие: крестик + backdrop + Esc.
- **Map**: iframe карты рендерится; кнопка «Открыть карту» ведёт в Яндекс.
- **Legal**: `legal.html` открывается, якоря `#legal-info` / `#org-info` присутствуют.
- **Booking UX**:
  - CTA текст соответствует шагу.
  - hint появляется на ошибочном действии и скрывается после исправления шага.

## 4. Что не делал
- Не менял архитектуру и не переписывал флоу offer/form/success.
- Не менял маркетинговые тексты по секциям.
- Не трогал календарь смен (кроме совместимости с общим UI).
- Не внедрял тяжёлые map/video API.

## 5. Риски / что проверить вручную
- На стороне браузера может быть предупреждение по embed-источникам (в тесте критичных JS-ошибок не обнаружено, кроме 404 `favicon.ico`).
- Для `legal.html` сейчас стоят placeholder реквизиты (`ИНН/ОГРН`), их нужно заменить на фактические данные перед публичным релизом.
- В section modal контент рендерится из clone секции; если понадобятся интерактивные фильтры внутри modal с live-обновлением, можно добавить отдельную синхронизацию состояния.
