# Checklist — Task 1

- [x] Проверены секции: `#ai`, `#location`, `#photos`, `#video`, `#reviews`, `#team`, `#faq`.
- [x] У каждой секции контент находится внутри центрирующего `inner-container`.
- [x] Для full-mode применён тот же container/layout pattern, что у базовых секций.
- [x] Ширина ограничена не только у `section head`, но и у `section body/content`.
- [x] Проверено, что контент не растягивается на всю ширину экрана.
- [x] Не изменялись:
  - booking logic
  - compact mode
  - hero business logic
  - data sources
- [x] Diff оставлен минимальным.

---

# Checklist — Task 2

- [x] Проверены секции: `#ai`, `#location`, `#photos`, `#video`, `#reviews`, `#team`.
- [x] Стиль карточек соответствует требуемому:
  - [x] `border-radius: 22px`
  - [x] `padding: 22px`
  - [x] `background: #fff`
  - [x] `border: 1px solid rgba(17,24,39,.04)`
  - [x] `box-shadow: 0 16px 40px rgba(15,23,42,.08)`
- [x] Grid обычных full-mode секций: 3 колонки, `gap: 18px`.
- [x] Grid media/reviews/team: 4 колонки, `gap: 14px`.
- [x] Не изменялись:
  - booking logic
  - compact mode
  - hero logic
  - data sources
- [x] Diff оставлен минимальным.

---

# Checklist — Task 3

- [x] Проверены full-mode секции `#photos` и `#video`.
- [x] `#photos` центрирована и использует container-ширину как у верхних секций.
- [x] Для фото есть toolbar фильтров:
  - [x] Все
  - [x] Еда
  - [x] Спорт
  - [x] Бассейн
  - [x] Учёба
- [x] Фильтры реализованы chip-стилем (`.media-chip`, `.media-chip.is-active`).
- [x] Фото остаются в отдельном media-grid, а не в потоковом списке.
- [x] `#video` оформлена как отдельный grid из 4 карточек (`repeat(4, minmax(0,1fr))`, `gap: 14px`).
- [x] Сохранена существующая логика открытия:
  - [x] фото: `openMediaLightbox`
  - [x] видео: `openRutubeVideoLightbox` / `openMediaLightbox`
- [x] Не изменялись:
  - booking logic
  - compact mode
  - hero business logic
  - data sources / media datasets
- [x] Diff оставлен минимальным.

---

# Checklist — Task 4

- [x] Проверены full-mode секции `#reviews` и `#team`.
- [x] `#reviews`:
  - [x] Используется существующий dataset `AC_REVIEWS_DATA`.
  - [x] В full-mode выводится ровно 4 карточки (`slice(0, 4)`).
  - [x] Карточки имеют аккуратный card-style (radius/shadow/padding/spacing) и не растягиваются в текстовые блоки.
- [x] `#team`:
  - [x] Используется существующий источник (`window.__acTeamCards`, fallback из текущих team cards).
  - [x] В full-mode выводится ровно 4 карточки (`slice(0, 4)`).
  - [x] Карточки отображаются как отдельные person cards в grid.
- [x] Hero polish:
  - [x] Compact/full toggle размещён в строке табов справа (`ac-view-switch--in-tabs`) и сделан компактным.
  - [x] Age block (`Выберите возраст` + `Возраст: ...`) собирается в одну строку на desktop.
  - [x] На mobile есть аккуратный перенос (`@media (max-width: 760px)` для `.ac-age__topline`).
  - [x] Age socials добавляются реальными SVG-иконками (VK/IG/TG/WA/FB/Messenger).
  - [x] Contact card есть в правой hero-card, слева сверху, со стеклянным стилем, закрыта по умолчанию и раскрывается по кнопке.
- [x] Не изменялись:
  - booking flow
  - compact mode
  - hero business logic
  - data sources
- [x] Diff оставлен минимальным.

---

# Checklist — Task 5

- [x] Hero verification:
  - [x] `Кратко / Подробно` switch на месте (`#acViewSwitchWrap`, `#acViewToggle`).
  - [x] age block/topline (`.ac-age__topline`) корректно оформлен.
  - [x] contact card (`#acHeroContactCard`) присутствует, closed state по умолчанию.
  - [x] socials (`.ac-age__socials`) присутствуют.
- [x] Layout verification:
  - [x] full-mode секции центрированы через container width.
  - [x] карточки имеют radius/shadow/padding.
  - [x] grid-раскладки для секций присутствуют и адаптивны.
- [x] Media verification:
  - [x] photos grid есть (`.ac-full-photo-grid`).
  - [x] photo filters есть (`.media-chip`).
  - [x] video grid есть (`.ac-full-video-grid`).
  - [x] lightbox/open behavior сохранён (`openMediaLightbox`, `openRutubeVideoLightbox`).
- [x] Content verification:
  - [x] reviews = 4 карточки (`AC_REVIEWS_DATA.slice(0, 4)`).
  - [x] team = 4 карточки (`cards.slice(0, 4)`).
  - [x] FAQ full-mode секция отображается (`#acFullFaq`).
- [x] Menu verification:
  - [x] anchors в меню присутствуют.
  - [x] соответствующие `id` секций присутствуют.
- [x] Debug-clean verification:
  - [x] `block-id` не найден.
  - [x] `data-block` не найден.
  - [x] debug labels/annotations не найдены.
- [x] Build:
  - [x] Выполнен `bash build.sh`.
  - [x] `dist/index.html` обновлён.
- [ ] Deploy:
  - [ ] `./deploy.sh` не выполнен на этом окружении (нет пути `/var/www/aidaplus-dev`).

---

# Checklist — Task 6

- [x] Images:
  - [x] Для runtime-изображений добавлены `width` и `height` (logo/reviews/team/photos/video poster/book cover).
  - [x] Изображения вне hero получают `loading="lazy"`.
  - [x] Hero-изображения получают eager-загрузку.
  - [x] Добавлен дополнительный runtime-pass `applyImagePerformanceHints(...)` для стабилизации late-rendered контента.
- [x] Media grid:
  - [x] Видео-карточки получили фиксированный `aspect-ratio: 9 / 16`.
  - [x] Высота видео стабилизирована (`height: 100%`) без post-load прыжков.
- [x] Video:
  - [x] iframe не рендерится в карточках заранее.
  - [x] iframe создаётся только в lightbox при клике.
- [x] Fonts:
  - [x] `display=swap` уже используется в webfont import.
- [x] Buttons/hover:
  - [x] В рамках правок не добавлено hover-изменений, меняющих layout.
- [x] Hero/Layout stability:
  - [x] Внесённые правки направлены на снижение CLS без изменения бизнес-логики.
- [x] Ограничения соблюдены:
  - [x] booking logic не изменён.
  - [x] compact mode не изменён.
  - [x] hero business logic не изменён.
  - [x] data sources не изменены.
- [x] Diff оставлен минимальным.
- [ ] Ручная browser-проверка (desktop/mobile) в рамках task-6 не проводилась.
- [ ] Локальная проверка синтаксиса `node --check` не выполнена (`node` не установлен в окружении).

---

# Checklist — Task 7

- [x] Видео в `#video` full mode рендерится из существующих источников:
  - [x] primary: Rutube feed (при валидных URL),
  - [x] fallback: `window.__acMediaMap.videos`.
- [x] Для видео сохранена текущая логика открытия через lightbox.
- [x] Удалены служебные/технические подписи в full mode секциях:
  - [x] `#program`
  - [x] `#format`
  - [x] `#ai`
  - [x] `#location`
  - [x] `#photos`
  - [x] `#video`
  - [x] `#reviews`
  - [x] `#team`
  - [x] `#faq`
- [x] Единый container pattern применён ко всем указанным full mode секциям.
- [x] Фото-фильтры в `#photos` работают без перезагрузки:
  - [x] устранён конфликт обработчиков (full mode использует `.ac-full-photo-cat`);
  - [x] active-state переключается.
- [x] Фото в full mode по клику открываются в существующем fullscreen/lightbox с навигацией.
- [x] Compact mode не изменён.
- [x] Hero не изменён.
- [x] Booking logic не изменён.
- [x] Data sources не изменены.
- [x] Выполнен `bash build.sh`.
- [x] `dist/index.html` синхронизирован.
