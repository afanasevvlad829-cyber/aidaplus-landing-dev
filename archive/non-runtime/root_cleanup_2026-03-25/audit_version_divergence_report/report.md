# AUDIT — VERSION DIVERGENCE / CUT CONTENT / SYNCHRONIZATION

## 1) Что проверено
- Исходники: `index.html`, `src/scripts/main.js`, `src/styles/main.css`.
- Собранный артефакт: `gpt.html`.
- Синхронность build: `dist/index.html` == `gpt.html` (byte-to-byte `cmp=0`).
- Ручная проверка routing через Playwright для 4 режимов:
  - desktop full
  - desktop compact
  - mobile full
  - mobile compact

## 2) Главный вывод
Текущие версии **не эквивалентны по пользовательскому опыту**:
- `desktop full` = базовая полная версия.
- `desktop compact` = full-контент через modal clone.
- `mobile full` = смешанная модель (есть урезанные inline-секции, но top-nav открывает full modal-клоны).
- `mobile compact` = почти полностью modal-only.

Критичный срез:
- Footer/legal отсутствует в 3/4 режимах.
- Journey недоступен в 3/4 режимах.
- Mobile full теряет rich content (programs/reviews/team/contacts-map) в inline-потоке.

## 3) Таблицы
Полные таблицы:
- `tables/content-divergence.csv`
- `tables/logic-divergence.csv`
- `tables/cut-content.csv`
- `tables/sync-plan.csv`

## 4) Ключевые подтверждённые расхождения (из runtime)
- `desktop full`: видимы `section-about, section-journey, section-programs, section-photos, section-videos, section-reviews, section-faq, section-stay, section-team, section-contacts`.
- `desktop compact`: `.body-sections` скрыт, контент только через `#sectionModal`.
- `mobile full`: видимы только `mobile-section-*` (8 секций), но nav по клику открывает `#sectionModal` с clone desktop section.
- `mobile compact`: `.mobile-body-sections` скрыт, контент только modal.

## 5) Hidden dependencies / side effects
- `openSectionModal()` клонирует desktop-секции и удаляет `id` у вложенных узлов; часть logic/events работает через делегирование, часть id-bound tracking не переносится.
- В `mobile full` nav принудительно modal (`if(navEl.closest('.mobile-hero-nav')) openSectionModal(...)`) и обходит scroll-паттерн full-режима.
- Overlay может перехватывать клики верхнего переключателя до закрытия (операционный UX-эффект, не crash).

## 6) Карта синхронизации (кратко)
Обязательно синхронизировать:
1. Menu policy (`full=scroll`, `compact=modal`).
2. Footer/legal доступность во всех режимах.
3. Journey доступность во всех режимах.
4. Mobile full content depth для Programs/Reviews/Team/Contacts(Map).

Можно оставить разным:
1. Hero density desktop vs mobile.
2. Компактность карточек media в mobile.
3. Скрытие summary bar в desktop compact (если осознанно).

Упростить глобально:
1. Единый принцип entry в media (избежать смешения inline-lite + modal-full в одном режиме).
2. Единый policy routing по mode (не по типу nav-контейнера).

## 7) Что не делалось
- Код не изменялся.
- Патчи/рефакторинг не вносились.
- Новые фичи не добавлялись.

## 8) Артефакты
- Таблицы: `tables/*.csv`
- Сниппеты: `snippets/*.txt`
- Скриншоты: `screens/*.png`
