# Migration Inventory (Old Site -> New Rebirth)

Source analyzed: `https://dev.aidaplus.ru/?v=hotfix_rollback_1308`
Date: 2026-03-19

## 1) Content inventory

### 1.1 Sections (old site)

1. `#hero` — Главный экран (hero, инфо-блок + воронка)
2. `#program` — Программа по возрастам
3. `#format` — Формат и условия
4. `#ai` — AI-программы
5. `#location` — Локация
6. `#photos` — Фото лагеря
7. `#video` — Видео
8. `#reviews` — Отзывы родителей
9. `#team` — Команда
10. `#faq` — FAQ
11. Overlay block — Смены и цены (бронирование)
12. Overlay block — Связаться с нами

### 1.2 Headings (old site)

- `AiDaCamp: IT‑лагерь без телефонов в Подмосковье`
- `Программа по возрастам`
- `7–9 лет`
- `10–12 лет`
- `13–14 лет`
- `Формат и условия`
- `Что внутри смены`
- `Безопасность и условия`
- `Бронирование и цены`
- `AI-программы`
- `Локация`
- `Где проходит смена`
- `Что рядом и внутри`
- `Фото лагеря`
- `Видео`
- `Отзывы родителей`
- `Команда`
- `FAQ`

### 1.3 Menu labels (old site)

- `О лагере`
- `Программа`
- `Формат`
- `AI-программы`
- `AI программы`
- `Локация`
- `Фото`
- `Видео`
- `Отзывы`
- `Команда`
- `FAQ`
- `Бронирование`
- `Главный экран`

### 1.4 Button labels (old site)

Core UI labels:

- `Выбрать возраст заново`
- `Перейти к бронированию`
- `Смотреть смены и цены`
- `Посмотреть другие смены`
- `Выбрать эту смену`
- `📩 Отправить заявку`
- `Зафиксировать мою цену`
- `Зафиксировать цену`
- `К бронированию`
- `Позже`
- `Закрыть`
- `ВКонтакте`
- `Telegram`
- `WhatsApp`
- `Отлично, понял! →`
- `Всё равно уйти`

Filter/selector labels:

- `Все`
- `Еда`
- `Спорт`
- `Бассейн`
- `Учёба`
- `Медицина`
- `Безопасность`
- `Питание`
- `Проживание`
- `Организация`
- `Другое`

Aux/dev labels found in old build:

- `Очистить лог`
- `Сбросить как первый визит`
- `Скрыть`
- `Сценарий подсказок`

## 2) Asset inventory

### 2.1 Icons used (old site)

Detected from inline JS + rendered DOM:

- `/assets/icons/robot.svg`
- `/assets/icons/sparkle.svg`
- `/assets/icons/pool.svg`
- `/assets/icons/search.svg`
- `/assets/icons/play.svg`
- `/assets/icons/clipboard.svg`
- `/assets/icons/fire-hit.svg`
- `/assets/icons/check.svg`
- `/assets/icons/money.svg`
- `/assets/icons/med.svg`
- `/assets/icons/lock.svg`
- `/assets/icons/food.svg`
- `/assets/icons/refresh.svg`
- `/assets/icons/close.svg`
- `/assets/icons/chevron-left.svg`
- `/assets/icons/chevron-right.svg`

### 2.2 Logos used (old site)

- `/assets/aida-logo-small.png`
- Rendered runtime data-url logo (base64 variant, generated in old runtime)

### 2.3 Images used (old site)

Static content images (tildacdn/thb):

- `https://static.tildacdn.com/tild3130-3234-4630-b533-343030653636/photo_2024-02-04_171.jpeg`
- `https://static.tildacdn.com/tild3865-3066-4131-b036-323163393864/photo_2024-02-04_161.jpeg`
- `https://static.tildacdn.com/tild3031-3662-4930-b463-353632336564/img_DZVzy7hiSoR0c1MR.png`
- `https://static.tildacdn.com/tild3931-6630-4534-b239-373333393430/ChatGPT_Image_18__20.png`
- `https://thb.tildacdn.com/tild6365-6534-4638-b239-383931316134/-/resize/504x/noroot.png`
- `https://static.tildacdn.com/tild3633-3838-4462-a338-336166376565/photo.png`
- `https://static.tildacdn.com/tild3830-6337-4038-b634-333236613738/photo.png`
- `https://static.tildacdn.com/tild3639-3337-4636-a233-306337633035/photo.png`
- `https://static.tildacdn.com/tild3737-3334-4538-a139-656430373836/photo.png`
- `https://static.tildacdn.com/tild3263-3537-4961-b536-363837386238/IMG_1543.JPG`
- `https://static.tildacdn.com/tild3066-3464-4137-a537-626336356335/photo_2025-06-14_08-.jpg`
- `https://static.tildacdn.com/tild3637-6139-4636-b261-386434323832/photo_2025-06-14_08-.jpg`
- `https://static.tildacdn.com/tild6135-3464-4332-b565-386630323830/photo_2025-06-14_08-.jpg`
- `https://static.tildacdn.com/tild3632-6563-4432-b438-346535383038/photo_2025-06-14_08-.jpg`
- `https://static.tildacdn.com/tild6436-6337-4466-b637-623363613935/photo.jpg`
- `https://static.tildacdn.com/tild6666-3333-4534-a639-386666343634/photo_2025-06-14_08-.jpg`
- `https://static.tildacdn.com/tild6336-6536-4238-a436-303937666565/photo_2025-06-17_13-.jpg`
- `https://static.tildacdn.com/tild6330-6330-4664-b762-666363643137/photo_2025-06-14_08-.jpg`
- `https://static.tildacdn.com/tild3864-3738-4763-b633-303434303665/photo_2025-06-14_08-.jpg`
- `https://static.tildacdn.com/tild3134-3366-4638-b331-366662396639/photo.jpg`
- `https://static.tildacdn.com/tild6266-6134-4235-b166-393766376531/photo_2025-06-14_08-.jpg`
- `https://static.tildacdn.com/tild3238-6633-4862-a535-373731303734/photo_2025-06-14_08-.jpg`
- `https://static.tildacdn.com/tild3932-3632-4530-b038-613561623337/photo_2025-06-14_08-.jpg`
- `https://static.tildacdn.com/tild3639-3532-4334-b035-316562666439/photo.jpg`
- `https://static.tildacdn.com/tild3963-3938-4335-b335-656531616265/photo_2025-06-14_07-.jpg`
- `https://static.tildacdn.com/tild6538-6438-4432-b737-313138346237/photo_2025-06-14_08-.jpg`

Review avatars (unsplash):

- `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80`
- `https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80`
- `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80`
- `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80`
- `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80`
- `https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=300&q=80`

Video preview thumbnails observed in DOM:

- `https://rutube.ru/api/video/f1538387b19f82f0305f7ae7222bf57d/thumbnail/?redirect=1`
- `https://rutube.ru/api/video/01ca8a077f86db0b95bb0adfebd8ebce/thumbnail/?redirect=1`
- `https://rutube.ru/api/video/41bbae1d1b167cd49c7aad94cc76b133/thumbnail/?redirect=1`

## 3) Mapping

### 3.1 Old content block -> new component

| Old block (old site) | New component (Rebirth) |
|---|---|
| `#acFullNavZone`, old top menu system | `#acTopNav` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:35)) |
| old compact tabs (`#acLeftTabs`) | `#acCompactNav` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:41)) |
| `#hero` left info card | `.ac-card.ac-card--hero` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:43)) |
| `#hero` funnel/right promo panel | `.ac-hero-right` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:71)) |
| old age selector block | `.ac-age-block` + `#acAgeInput` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:50)) |
| old "Программа по возрастам" | `section#program` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:106)) |
| old "Формат и условия" | `section#format` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:117)) |
| old "AI-программы" | `section#ai` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:128)) |
| old "Локация" | `section#location` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:139)) |
| old "Фото лагеря" | `section#photos` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:150)) |
| old "Видео" | `section#video` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:162)) |
| old "Отзывы родителей" | `section#reviews` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:173)) |
| old "Команда" | `section#team` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:185)) |
| old "FAQ" | `section#faq` ([index.html](/Users/vladimirafanasev/aidaplus-dev/index.html:197)) |
| old contact modal | `#acOverlayRoot` + `renderContactOverlay()` ([main.js](/Users/vladimirafanasev/aidaplus-dev/src/scripts/main.js:499)) |
| old booking/shifts modal | `#acOverlayRoot` + `renderShiftOverlay()` ([main.js](/Users/vladimirafanasev/aidaplus-dev/src/scripts/main.js:521)) |

### 3.2 Old icon -> new icon slot

| Old icon | New slot(s) |
|---|---|
| `/assets/icons/robot.svg` | hero/benefits + menu item `О лагере` (`TABS.info`) |
| `/assets/icons/sparkle.svg` | menu item `AI программы` (`TABS.aiprogram`) |
| `/assets/icons/pool.svg` | menu item `Локация` + hero safety/benefits |
| `/assets/icons/search.svg` | menu item `Фото` |
| `/assets/icons/play.svg` | menu item `Видео` |
| `/assets/icons/clipboard.svg` | menu item `FAQ` |
| `/assets/icons/fire-hit.svg` | menu item `Отзывы` |
| `/assets/icons/check.svg` | menu item `Команда` |
| `/assets/icons/money.svg` | benefits list in info card |
| `/assets/icons/med.svg` | hero safety grid item `Медик 24/7` |
| `/assets/icons/lock.svg` | hero safety grid item `Охрана` |
| `/assets/icons/food.svg` | hero safety grid item `Питание` |
| `/assets/icons/close.svg` | overlay close buttons |
| `/assets/icons/chevron-left.svg` | funnel prev/slider prev controls |
| `/assets/icons/chevron-right.svg` | next/CTA arrow controls |
| `/assets/icons/refresh.svg` | service/debug controls (not core landing UI) |

### 3.3 Old image -> new asset path (planned target mapping)

Target folder convention (planned):
- `/assets/images/hero/*`
- `/assets/images/program/*`
- `/assets/images/location/*`
- `/assets/images/gallery/*`
- `/assets/images/video/*`
- `/assets/images/reviews/*`
- `/assets/images/team/*`
- `/assets/images/book/*`

Representative mapping table:

| Old image URL | Planned new asset path |
|---|---|
| `.../photo_2024-02-04_171.jpeg` | `/assets/images/hero/hero-main.jpeg` |
| `.../photo_2024-02-04_161.jpeg` | `/assets/images/location/location-map.jpeg` |
| `.../img_DZVzy7hiSoR0c1MR.png` | `/assets/images/program/program-card-01.png` |
| `.../ChatGPT_Image_18__20.png` | `/assets/images/ai/ai-card-01.png` |
| `.../noroot.png` (book cover) | `/assets/images/book/python-book-cover.png` |
| `.../photo.png` (team 1) | `/assets/images/team/team-01.png` |
| `.../photo.png` (team 2) | `/assets/images/team/team-02.png` |
| `.../photo.png` (team 3) | `/assets/images/team/team-03.png` |
| `.../photo.png` (team 4) | `/assets/images/team/team-04.png` |
| `.../IMG_1543.JPG` | `/assets/images/gallery/gallery-01.jpg` |
| `.../photo_2025-06-14_08-.jpg` (1) | `/assets/images/gallery/gallery-02.jpg` |
| `.../photo_2025-06-14_08-.jpg` (2) | `/assets/images/gallery/gallery-03.jpg` |
| `.../photo_2025-06-14_08-.jpg` (3) | `/assets/images/gallery/gallery-04.jpg` |
| `.../photo_2025-06-17_13-.jpg` | `/assets/images/gallery/gallery-05.jpg` |
| `.../photo_2025-06-14_07-.jpg` | `/assets/images/gallery/gallery-06.jpg` |
| `unsplash ...150064876...` | `/assets/images/reviews/review-avatar-01.jpg` |
| `unsplash ...148741272...` | `/assets/images/reviews/review-avatar-02.jpg` |
| `unsplash ...154400531...` | `/assets/images/reviews/review-avatar-03.jpg` |
| `unsplash ...143876168...` | `/assets/images/reviews/review-avatar-04.jpg` |
| `unsplash ...149479010...` | `/assets/images/reviews/review-avatar-05.jpg` |
| `unsplash ...154742526...` | `/assets/images/reviews/review-avatar-06.jpg` |
| `rutube ...f153.../thumbnail` | `/assets/images/video/video-thumb-01.jpg` |
| `rutube ...01ca.../thumbnail` | `/assets/images/video/video-thumb-02.jpg` |
| `rutube ...41bb.../thumbnail` | `/assets/images/video/video-thumb-03.jpg` |

---

Status: inventory completed. Migration not started.
