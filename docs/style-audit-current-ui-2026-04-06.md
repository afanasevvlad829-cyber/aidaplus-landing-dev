# Детальный аудит стилей текущего интерфейса (факт по рантайму)

Дата: 2026-04-06  
Среда: локальный рендер `dist/index.html`

## Что проверено
- HTML рантайм: `dist/index.html` (подключения, inline-style, inline-script, структура блоков).
- CSS рантайм: `src/styles/main.css` + импорт `src/styles/features/hero-v3-simple.css`.
- JS рантайм, влияющий на визуал: `src/scripts/main.js`, `cdn/app.bundle.js`.

## Что найдено (ключевое)
- Source of truth раздвоен: базовый визуал в `main.css`, но hero/topbar/booking в desktop фактически переопределяются `hero-v3-simple.css`.
- Часть визуала/геометрии задаётся не CSS-файлом, а JS на рантайме через `style.setProperty(...)` и динамические классы.
- В `dist/index.html` есть inline-style и inline-debug-style, влияющие на видимость/артефакты.
- В коде одновременно живут `legacy` и `simple` ветки (стили, DOM, runtime markup).

## Что изменено
- Только отчёт. Код/стили не менялись.

## 1) Header / top bar

1. Название блока
- `Header / top bar`

2. Source of truth
- Файлы:
- `dist/index.html` (структура: `.hero-topbar`, `.hero-menu-primary`, `.hero-menu-wrap`, `.hero-phone-wrap`).
- `src/styles/main.css` (база: `.hero-topbar` ~697+, `.hero-menu`/`.menu-pill` ~1041+, desktop-ветка ~1128+).
- `src/styles/features/hero-v3-simple.css` (фактический приоритет для hero3: `.hero-topbar` ~100+, forced overrides ~317+).
- `dist/index.html` inline-script dropdown toggle (~1206+).
- Inline styles: нет в самом topbar, но есть inline у соседних узлов hero.

3. Реальные стили, формирующие визуал
- background: transparent для topbar в simple (`hero-v3-simple.css:100+`), кнопки: `rgba(12,18,29,.56)`.
- border: pills/toggles `1px solid rgba(255,255,255,.24)`.
- border-radius: topbar controls `999px`.
- box-shadow: в simple почти без тени; в main есть hover-shadows для `.menu-pill`.
- spacing: `gap:10px`, `padding:8px 22px`, `margin-top:4px` у menu/phone wrappers.
- typography: menu/phone `14px`, weight `700`.
- width/max-width: nowrap и `min-width:max-content` через forced rules.
- layout: flex, order (left-tools=1, menu=2, dots=3, phone=4), `overflow:visible`.
- states: dropdown open через `.is-open`, trigger `aria-expanded` (inline script).

4. Повторы
- Радиусы `999px` повторяются на pills/toggles/phone.
- Полупрозрачный тёмный фон повторяется для всех top controls.
- Паттерн border rgba(255,255,255,0.24/0.16/0.15) в menu/phone dropdown.

5. Конфликты/хаос
- `main.css` принудительно разворачивает `#desktopView #serviceMenu` в `display:flex !important` (`~1092+`), а simple-ветка обратно прячет и показывает только `.is-open` (`hero-v3-simple.css:272-295`).
- Дубли семантически одной зоны: `.hero-menu` и `#serviceMenu` контролируются двумя файлами.
- Наличие `!important` в обеих ветках повышает хрупкость.

6. Legacy
- Поддержка старой desktop-логики меню в `main.css` (`#desktopView #serviceMenu[hidden]{display:flex !important;}`).

7. Новая ветка
- `hero-v3-simple.css` фиксирует порядок, nowrap и dropdown-поведение именно для hero3.

8. Можно оставить
- Текущий flex-order и split `menu + dots + phone`, если цель сохранить текущий layout 1:1.

9. Нормализация в токены
- Токены: `--topbar-pill-height`, `--topbar-pill-bg`, `--topbar-pill-border`, `--topbar-pill-radius`, `--topbar-gap`.

10. Мусор/кандидат на удаление
- Ветка `#desktopView #serviceMenu{display:flex !important}` для режима, где dropdown уже управляется simple-веткой.

11. Риск
- `high` (много каскадных `!important`, легко сломать desktop header).

12. Рекомендация
- `объединить` правила desktop menu в один режимный контракт: либо legacy-flex, либо simple-dropdown.

## 2) Hero

1. Название блока
- `Hero`

2. Source of truth
- Файлы:
- `dist/index.html`: `.hero-shell`, `.hero-bg`, `.hero-content--target`, `.hero-meta-row`, `.hero-title`, `.hero-chip-row`, `.hero-rule-card`, `.hero-bottom-facts`.
- `src/styles/features/hero-v3-simple.css`: основная геометрия и типографика hero3 (`~71+`, `~436+`, `~802+`).
- `src/styles/main.css`: базовые hero-правила (`~680+`, `~1315+`, contrast-режимы `~1470+`).
- `src/scripts/main.js`: runtime debug-guides overlay (`~1791+`).
- Inline styles: `heroBg1/heroBg2` background-image в HTML.

3. Реальные стили
- background: shell `#0f141d`, bg overlay — gradient + repeating-lines (`hero-v3-simple.css:83+`).
- border: shell без борта, booking/footer внутри hero имеют собственные границы.
- border-radius: shell/bg `22px`, content glow blobs `34px`.
- box-shadow: в hero3 у booking-card отключён (`none !important`), у title/meta используется text-shadow.
- spacing: topbar `8 22`, content-left `padding-left:22`, `margin-top:-64`, hero-bottom-facts `padding:0 22`.
- typography: title `66px` desktop, meta `11px`, trust `10px`, chips `10px`.
- width/max-width: content max `540`, title max `520`, hero min-height `560`.
- layout: absolute booking card справа-снизу; bottom facts absolute внизу.
- states: media query <=1100 уменьшает/перекомпонует hero (title 62, booking width 368, facts wrap).

4. Повторы
- Цветовая логика hero text-shadow повторяется в нескольких селекторах.
- Паттерн «pill + translucent dark bg + light border» повторяется в chips.

5. Конфликты/хаос
- В `main.css` есть альтернативные hero-contrast режимы с псевдо-подложками (`~1515+`), конкурируют с simple-mode идеей «убрать тени/подложки». 
- Debug overlays: и CSS (`#hero-blocks-debug-style` в HTML), и runtime lines (`.hero-debug-guides` из JS).

6. Legacy
- Общие hero режимы `hero-contrast-*` в `main.css`.

7. Новая ветка
- `hero-v3-simple.css` полностью задаёт hero3 композицию.

8. Можно оставить
- Геометрию hero3 (22px shell, content/book card/bottom-facts) как стабильную основу.

9. Нормализация в токены
- `--hero-shell-radius`, `--hero-content-left-pad`, `--hero-title-size-desktop`, `--hero-bottom-facts-height`, `--hero-overlay-gradient`.

10. Мусор/кандидат на удаление
- Постоянно подключённый inline debug style блок `#hero-blocks-debug-style` в `dist/index.html`.

11. Риск
- `medium-high`.

12. Рекомендация
- `вынести в токены` (геометрия/типографика hero3) и `удалить позже` постоянные debug-слои.

## 3) CTA buttons

1. Название блока
- `CTA buttons`

2. Source of truth
- `src/styles/main.css`: `.cta-main` (`~5596+`), hover/focus/disabled.
- `src/styles/features/hero-v3-simple.css`: `.hero-simple-submit` (desktop/mobile).
- `dist/index.html`: inline style у summary CTA (`style="width:auto;padding:14px 18px;"`).

3. Реальные стили
- background: gradient `var(--accent) -> var(--accent-2)`.
- border: `none`.
- border-radius: 16 (global), 12/15 (варианты), 12 для hero-simple-submit.
- shadow: от `0 10px 24px` до `0 18px 40px`, hover до `0 22px 55px`.
- spacing: padding 17x16 (global), 10x16 compact, inline 14x18 в summary.
- typography: 14/15/16px, weight 800.
- layout: full-width по умолчанию.
- states: hover translate+scale; disabled opacity + no-shadow.

4. Повторы
- Одинаковый gradient и weight 800 в нескольких классах.

5. Конфликты/хаос
- Разные radius/padding для визуально одного CTA-паттерна.
- Inline CTA style в HTML обходит токены/классы.

6. Legacy
- Много booking-stage CTA-переменных в main.css (legacy этапы формы).

7. Новая ветка
- Hero simple submit как отдельный стиль, но визуально почти тот же CTA.

8. Можно оставить
- Глобальный `.cta-main` как базовый компонент.

9. Нормализация в токены
- `--cta-radius`, `--cta-pad-y`, `--cta-pad-x`, `--cta-shadow`, `--cta-shadow-hover`.

10. Мусор/кандидат
- Inline-style у CTA в `dist/index.html:928`.

11. Риск
- `medium`.

12. Рекомендация
- `объединить` CTA-варианты через токены, сохранить только модификаторы размеров.

## 4) Cards / shift cards

1. Название блока
- `Cards / shift cards`

2. Source of truth
- `src/styles/main.css`: `.section-card` (`~6732+`), `.photo-card` (`~7245+`), shift-option/booking cards и множество stage-правил.
- `src/styles/features/hero-v3-simple.css`: карточка booking-simple (`~588+`) + debug contour для section cards (`~843+`).
- JS runtime: класс-стейты `booking-stage-*`, `booking-completed`.

3. Реальные стили
- section-card: `background:#fff`, `border:1px solid var(--line)`, `radius:24`, `shadow:var(--shadow)`, `padding:18`.
- photo-card: `radius:20`, `border:1px solid var(--line)`, `shadow:var(--shadow)`, hover-lift.
- booking-simple-card: `radius:16`, `border:#d8dee8`, `background:#f5f6f8`, `padding:13/13/12`, fixed width 336.
- shift options: сильно завязаны на booking CSS vars и stage-классы.

4. Повторы
- Белая карточка + border line + shadow повторяются в десятках блоков.

5. Конфликты/хаос
- Радиусы: 12/14/16/18/20/22/24/26/28/30/34/36/38/999.
- Тени: множество уникальных значений вместо scale.
- В hero-v3 добавлены debug outlines для `.section-card::after`, ломают реальный прод-визуал при активном режиме.

6. Legacy
- `booking-stage-two-legacy`, `booking-stage-three-legacy`, `booking-stage-four-legacy`.

7. Новая ветка
- `hero-booking-card--simple` и упрощённый flow.

8. Можно оставить
- `section-card` + `photo-card` базовый паттерн.

9. Нормализация
- Token scale для radii (`sm/md/lg/xl/pill`) и elevation (`e1/e2/e3`).

10. Мусор/кандидат
- Debug контуры секций в simple CSS (`outline` + dashed `::after`).

11. Риск
- `high` (booking stages + cards тесно связаны).

12. Рекомендация
- `вынести в токены` (radii/shadow/border), `удалить позже` debug-контуры.

## 5) Forms / inputs / checkboxes

1. Название блока
- `Forms / inputs / checkboxes`

2. Source of truth
- `src/styles/main.css`: `.input-box` (`~11128+`), `.check-row`, `.inline-lead-check input[type="checkbox"]` (`~11245+`).
- `src/styles/features/hero-v3-simple.css`: `.hero-simple-lead-input`, `.hero-simple-consent`, `.hero-simple-submit`.
- `dist/index.html`: inline `#formLead` paragraph style.

3. Реальные стили
- input-box: min-height 46, radius 14, border line, focus ring rgba accent.
- hero simple input: min-height 34 desktop / 44 mobile, radius 10.
- checkbox: в general 24x24 + `transform:translateX(20%)`; в hero-simple 14x14.
- typography: 11/12/13/14/15.
- states: `.input-error`, `:focus`, disabled submit.

4. Повторы
- border color `#d4dae4` / `var(--line)` / `#d8dee8` близкие значения.

5. Конфликты/хаос
- Размер и поведение checkbox радикально отличаются между общим и hero-simple.
- Два input-паттерна (global vs hero-simple) без общего токен-контракта.

6. Legacy
- Form-panel, overlay form, booking legacy stages.

7. Новая ветка
- Hero simple lead form.

8. Можно оставить
- Focus/error states в `main.css` как база доступности.

9. Нормализация
- `--input-radius`, `--input-height-{sm,md,lg}`, `--input-border`, `--input-focus-ring`, `--check-size`.

10. Мусор/кандидат
- `transform:translateX(20%)` у чекбокса как локальный костыль.

11. Риск
- `medium`.

12. Рекомендация
- `объединить` форму через size-модификаторы, не меняя визуал.

## 6) Popups / modals

1. Название блока
- `Popups / modals`

2. Source of truth
- `dist/index.html`: `#sectionModal`, `#videoModal`, `#calendarModal`, `#offerOverlay`, `#noticeOverlay`.
- `src/styles/main.css`: `.overlay`, `.overlay-card`, `.section-modal-*`, `.video-modal`, `.calendar-modal`.
- `cdn/app.bundle.js`: runtime сборка markup для offer-flow и открытие/закрытие модалок.

3. Реальные стили
- overlay: fixed inset 0, gradient dark backdrop, z-index var(--z-overlay).
- overlay-card: white card, radius 26, border, shadow 0 25 55.
- section-modal-compact: fixed runtime positioning через CSS variables.
- video/calendar modals: отдельные блоки с собственными inner контейнерами.
- transitions: `fade-in`, `modal-up`, `drawer-up`.

4. Повторы
- Повторяющиеся ряды radius/box-shadow у разных модалок.

5. Конфликты/хаос
- Много режимов модалок (default, compact, mobile, dark, success) с частичным дублированием.
- Размеры offer/form завязаны на runtime vars + отдельные mobile vars.

6. Legacy
- `offer-state-shell--search-legacy`, `offer-legacy-*` markup генерируется JS (`app.bundle.js ~11340+`).

7. Новая ветка
- Не отдельная ветка, но simple-flow использует эти модалки через runtime.

8. Можно оставить
- Runtime-позиционирование compact modal (работает по фактическому viewport).

9. Нормализация
- Токены: `--modal-radius`, `--modal-shadow`, `--overlay-bg`, `--modal-padding`.

10. Мусор/кандидат
- Legacy offer markup ветка при отсутствии бизнес-необходимости.

11. Риск
- `high`.

12. Рекомендация
- `объединить` геометрию модалок в одну токен-шкалу, legacy-ветку вынести на последующее удаление.

## 7) Menus / dropdowns

1. Название блока
- `Menus / dropdowns`

2. Source of truth
- `dist/index.html`: service/phone dropdown DOM + inline click handler script (`~1206+`).
- `src/styles/main.css`: `.hero-menu`, `.menu-pill`, desktop overrides.
- `src/styles/features/hero-v3-simple.css`: строгая видимость/позиционирование dropdown в hero3.

3. Реальные стили
- dropdown panel: absolute top+8, right 0, radius 14, dark translucent bg, border, shadow.
- items: `.menu-pill` / `.hero-phone-item` с hover и active.
- visibility: через `hidden` и `.is-open`.

4. Повторы
- Почти одинаковая карточка dropdown для menu и phone.

5. Конфликты/хаос
- Дублирование open/hidden логики CSS (main + simple + inline JS).
- В main есть forced `display:flex !important` для desktop serviceMenu, что противоречит dropdown-режиму.

6. Legacy
- Старый desktop «serviceMenu всегда открыт как pills».

7. Новая ветка
- Hero simple dropdown-only для `...` и phone.

8. Можно оставить
- Единую JS-функцию `setDropdownOpen/closeAllDropdowns` в HTML inline script.

9. Нормализация
- `--dropdown-radius`, `--dropdown-bg`, `--dropdown-border`, `--dropdown-shadow`, `--dropdown-item-height`.

10. Мусор/кандидат
- Конфликтующие desktop overrides для `#serviceMenu` в main.

11. Риск
- `high`.

12. Рекомендация
- `объединить` в один режим открытия dropdown для desktop hero3.

## 8) Footer

1. Название блока
- `Footer`

2. Source of truth
- `dist/index.html`: `<footer id="section-legal">`.
- `src/styles/main.css`: `footer`, `.footer-legal-links`, `.footer-org-meta`, `.footer-copyright-mini`.

3. Реальные стили
- background white, border line, radius 24, grid 3 columns, padding 18, gap 20.
- typography 11/12/13/14, muted palette.
- dashed separators in legal/meta rows.

4. Повторы
- Card-like pattern (white + border + radius 24) как у section-card.

5. Конфликты/хаос
- Footer использует собственные размеры/steps, частично не совпадают с card typography scale.

6. Legacy
- Явного legacy-ответвления нет.

7. Новая ветка
- Не затрагивался hero simple напрямую.

8. Можно оставить
- Текущую структуру footer-grid.

9. Нормализация
- Подключить footer к общей card/token шкале spacing + typography.

10. Мусор/кандидат
- Нет явного мусора.

11. Риск
- `low`.

12. Рекомендация
- `оставить`, затем `вынести в токены` размеры текста/отступы.

## 9) Utility / shared classes

1. Название блока
- `Utility / shared classes`

2. Source of truth
- `src/styles/main.css`: `:root` tokens, `.hidden`, общие анимации, utility-кнопки и сервисные блоки.
- `dist/index.html`: inline-style и debug-style.
- `src/scripts/main.js` / `cdn/app.bundle.js`: runtime class toggles + CSS variable writes.

3. Реальные стили
- Токены: `--bg`, `--line`, `--text`, `--muted`, `--accent`, `--accent-2`, `--shadow`, overlay/bookings vars.
- Runtime writes: `--booking-card-fixed-height`, `--booking-card-min-height`, `--booking-card-mobile-overlap`, `--booking-stage2-*` (`main.js ~1757+, ~1890+`).
- Utility classes: `.hidden`, focus-visible pattern, animation keyframes.

4. Повторы
- Множество однотипных `transition` и `box-shadow` по файлу.

5. Конфликты/хаос
- Основной CSS файл очень большой (`12848` строк), utility и feature стили перемешаны.
- Runtime-стили и CSS-константы живут одновременно, часть геометрии неочевидна без JS.

6. Legacy
- Большой пласт `booking-stage-*-legacy` + legacy offer-flow markup.

7. Новая ветка
- `hero-v3-simple.css` как feature-layer + inline dropdown script в HTML.

8. Можно оставить
- `:root` как базовый контейнер токенов.

9. Нормализация
- Выделить минимальный слой tokens + layer для components + layer для feature overrides.

10. Мусор/кандидат
- Inline debug style блок в HTML и отладочные runtime-слои при постоянной загрузке.

11. Риск
- `medium-high`.

12. Рекомендация
- `вынести в токены` + `удалить позже` debug/legacy хвосты после поэтапной проверки.

---

## Inline styles (отдельно)
- `dist/index.html:205,206` — tracking noscript images with inline positioning.
- `dist/index.html:208+` — `#version-badge` inline style.
- `dist/index.html:240,241` — inline `background-image` для hero backgrounds.
- `dist/index.html:753` — inline grid/padding у `.mobile-body-sections`.
- `dist/index.html:849,883` — inline typography у текстов в форме/success.
- `dist/index.html:928` — inline CTA width/padding.

## Если source of truth неочевиден (важно)
- Для hero/menu/booking source of truth не только CSS:
- `src/scripts/main.js` и `cdn/app.bundle.js` выставляют runtime CSS variables и классы стадий.
- `dist/index.html` содержит inline scripts, которые управляют dropdown visibility и photo grid render.
- Следовательно, «реальный визуал» частично в runtime-логике, а не только в `main.css`.

---

## A. Повторяющиеся токенизируемые значения

Радиусы:
- `999px` (pill/buttons/chips/dropdowns).
- `10px`, `12px`, `14px`, `16px`, `18px`, `20px`, `22px`, `24px`, `26px`, `28px`.

Тени:
- Базовая `var(--shadow): 0 18px 40px rgba(20,29,45,.08)`.
- Частые вариации hover/card/modal: `0 12/14/18/22/25px ...`.
- Accent CTA тени: `rgba(255,122,0,...)` несколько уровней.

Отступы:
- `8`, `10`, `12`, `14`, `16`, `18`, `22`, `24` повторяются по всему UI.

Transitions:
- `.15s`, `.16s`, `.18s`, `.22s` c `ease` в схожих интеракциях.

Цвета:
- Accent: `var(--accent)`/`var(--accent-2)` и их градиент.
- Line-family: `var(--line)` + близкие hardcoded (`#d4dae4`, `#d8dee8`, `#edf0f5`).
- Text-muted family: `var(--muted)` + близкие hardcoded (`#69758a`, `#7b8598`, `#8a95a9`).

## B. Самые проблемные места (top 10)

1. Конфликт `#serviceMenu` между main.css (always flex) и hero-v3-simple.css (dropdown hidden/open).
2. Повсеместные `!important` в конфликтующих ветках hero/menu.
3. Inline debug style `#hero-blocks-debug-style` в production HTML.
4. Runtime debug guides (`.hero-debug-guides`) создаются JS и могут оставлять визуальные артефакты.
5. Дубли логики dropdown в CSS + inline JS + feature JS.
6. Смешение legacy/simple booking стадий в одном CSS.
7. Огромный монолит `main.css` (12848 строк), feature и utility смешаны.
8. Непоследовательная шкала радиусов/теней.
9. Inline styles в HTML для layout/CTA, обходящие систему классов.
10. Legacy offer-flow markup генерируется в runtime рядом с новой веткой.

## C. План минимальной нормализации (без смены визуала)

1. Шаг
- Зафиксировать единый режим header dropdown для hero3.
- Что меняем: убрать конфликт `#serviceMenu` в desktop main-ветке для `body.hero-v3-simple-enabled`.
- Где: `src/styles/main.css` + `src/styles/features/hero-v3-simple.css`.
- Риск: high.
- Эффект: стабильная работа `...` и phone dropdown, меньше каскадных конфликтов.

2. Шаг
- Вынести scale-токены radii/shadow/spacing без изменения значений.
- Где: `:root` в `src/styles/main.css`, заменить literal значения по блокам.
- Риск: medium.
- Эффект: управляемость и снижение дублей.

3. Шаг
- Убрать inline style у CTA/mobile-body-sections/version-badge в классы.
- Где: `dist/index.html` + соответствующие CSS блоки.
- Риск: low-medium.
- Эффект: исчезновение точечных «необъяснимых» переопределений.

4. Шаг
- Ограничить debug-слои только debug-режимом сборки.
- Где: `dist/index.html` (`#hero-blocks-debug-style`), `src/scripts/main.js` (hero-debug-guides gate).
- Риск: low.
- Эффект: уход артефактов контуров/линий.

5. Шаг
- Сжать дубли в формах (input/check variants) в size-модификаторы.
- Где: `main.css` + `hero-v3-simple.css`.
- Риск: medium.
- Эффект: единая система форм при сохранении текущего визуала.

6. Шаг
- Пометить и изолировать legacy booking/offer ветку в отдельный scoped layer без удаления.
- Где: `main.css`, `cdn/app.bundle.js`.
- Риск: high.
- Эффект: снижение регрессионного риска и ясный путь к чистке.

---

## Таблица: Block / Source of truth / Main selectors / Problems / Recommendation

| Block | Source of truth | Main selectors | Problems | Recommendation |
|---|---|---|---|---|
| Header / top bar | `dist/index.html`, `main.css`, `hero-v3-simple.css`, inline dropdown script | `.hero-topbar`, `.hero-menu-primary`, `.hero-menu-wrap`, `#serviceMenu`, `.hero-phone-wrap` | Конфликт flex-vs-dropdown, много `!important` | Объединить режим hero3 dropdown |
| Hero | `hero-v3-simple.css` + `main.css` + `main.js` runtime | `.hero-shell`, `.hero-bg`, `.hero-content--target`, `.hero-title`, `.hero-meta-row`, `.hero-bottom-facts` | Смешение contrast/simple/debug слоёв | Вынести геометрию/типографику в токены, debug увести из рантайма |
| CTA buttons | `main.css`, `hero-v3-simple.css`, inline style в HTML | `.cta-main`, `.hero-simple-submit` | Несогласованные radius/padding, inline override | Объединить в токены + size-моды |
| Cards / shift cards | `main.css` + `hero-v3-simple.css` + runtime class stages | `.section-card`, `.photo-card`, `.hero-booking-card--simple`, `.shift-option*` | Разнобой radii/shadow, debug contours, legacy stages | Токенизировать scale, debug убрать позже |
| Forms / inputs / checkboxes | `main.css` + `hero-v3-simple.css` | `.input-box`, `.hero-simple-lead-input`, `.inline-lead-check input[type=checkbox]`, `.hero-simple-consent` | Несоответствие паттернов input/checkbox | Объединить через size tokens |
| Popups / modals | `main.css`, `dist/index.html`, `app.bundle.js` | `.overlay`, `.overlay-card`, `.section-modal-*`, `.video-modal`, `.calendar-modal` | Много режимов и дубли геометрии | Токенизировать modal geometry, legacy isolate |
| Menus / dropdowns | `dist/index.html` + `main.css` + `hero-v3-simple.css` + inline JS | `.hero-menu`, `.menu-pill`, `.hero-phone-dropdown`, `.hero-phone-item` | Дубли логики open/hidden, каскадные конфликты | Объединить открытие/позиционирование в один контракт |
| Footer | `main.css` + `dist/index.html` | `footer`, `.footer-legal-links`, `.footer-org-meta` | Небольшой дрейф scale от card-system | Оставить, потом токенизировать spacing/typography |
| Utility / shared | `main.css`, `main.js`, `app.bundle.js`, `dist/index.html` | `:root`, `.hidden`, keyframes, runtime `style.setProperty(...)` | Монолит, смешение feature/debug/legacy | Минимальная декомпозиция на tokens/components/feature layers |

