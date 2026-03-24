# План представления информации по старому сайту (aidacamp.ru)

Дата фиксации: 2026-03-23 (Europe/Moscow)
Источник: https://aidacamp.ru/

## 1) Что уже собрали

- HTML слепок страницы:
  - `/Users/vladimirafanasev/aidaplus-dev/audit/old-site-2026-03-23/aidacamp-home.html`
- Выделенный кастомный JS с промо/бронью:
  - `/Users/vladimirafanasev/aidaplus-dev/audit/old-site-2026-03-23/promo-config-snippet.js`
- Машиночитаемый инвентарь (контент + механики + ссылки):
  - `/Users/vladimirafanasev/aidaplus-dev/audit/old-site-2026-03-23/old-site-inventory.json`
- Desktop screenshot pack (1440x900):
  - `/Users/vladimirafanasev/aidaplus-dev/audit/old-site-2026-03-23/screens-desktop/`

## 2) Структура данных для переноса (единый формат)

Подготовить итоговый JSON `legacy-export.json` со следующими секциями:

1. `meta`
- title
- description
- canonical

2. `sections`
- якоря и порядок секций (`pool`, `program`, `price`, `smeny`, `faq`, `booking` и т.д.)

3. `shifts`
- id
- name
- bookingOptionLabel
- finalPrice
- seats
- days
- bookingText
- promoEnabled
- promoCodePrefix
- priorityLabel

4. `pricing_mechanics`
- storageKey
- holdHours
- initialMarkup
- firstClickDiscountRange
- secondClickDiscount
- stage flow (`0 -> 1 -> 2 -> active`)

5. `engagement_mechanics`
- reminder bar (delay, max shows)
- revisit popup
- exit intent popup
- card badges / seat thresholds

6. `booking_mechanics`
- booking banner (draft/active)
- autofill формы (phone/promo/shift)
- timer on fixed price

7. `analytics`
- yandex metrika counter id
- goals (show_price_click_1, show_price_click_2, promo_phone_activation, booking_form_opened)

8. `notifications`
- telegram enabled flag
- payload contract (phone, shiftName, code, finalPrice, holdHours, timestamp)

9. `media`
- videos (URLs)
- photo assets sample
- social links
- map links / coordinates

10. `docs_links`
- privacy / docs / requisites / cookie

## 3) План проверки механик на старом сайте (без оценки качества)

Шаг A. Механика цены
- Проверить stage 0 (показать цену)
- Проверить stage 1 (повторная попытка)
- Проверить stage 2 (предложение фиксации)
- Проверить активацию по телефону
- Проверить перевод в статус `active` и таймер

Шаг B. Напоминания
- Проверить `revisit` popup
- Проверить reminder bar (таймерная задержка)
- Проверить `exit intent`

Шаг C. Бронирование
- Проверить автоподстановку телефона
- Проверить автоподстановку промокода
- Проверить автоподстановку смены
- Проверить верхний banner draft/active на booking

Шаг D. Интеграции
- Проверить firing Metrika goals
- Проверить отправку Telegram payload

## 4) Screenshot-представление для команды

Использовать уже снятый пакет:
- `00-fullpage-1440x900.png`
- `01-home-viewport.png`
- `02-pool.png`
- `03-format.png`
- `04-camp_feature.png`
- `05-timetable.png`
- `06-program.png`
- `07-conditions.png`
- `08-security.png`
- `09-photo.png`
- `10-video.png`
- `11-price.png`
- `12-smeny.png`
- `13-priceformat.png`
- `14-price_scroll.png`
- `15-vychet.png`
- `16-faq.png`
- `17-zapis.png`
- `18-booking.png`

## 5) Что отдельно перепроверить (из вашего запроса)

1. Подмена заголовков/офферов по поисковому запросу:
- В кастомном JS (`promo-config-snippet.js`) явной логики `URLSearchParams/utm_term/yclid` не найдено.
- Следующий шаг: проверить серверные/внешние скрипты и возможные page-variants на стороне Tilda.

2. Фото/видео как контентные источники:
- Уже выделены source links для видео и image sample.
- Следующий шаг: собрать полный media-manifest (название блока -> URL ассетов).

3. Контакты и соцсети:
- Уже извлечены ссылки telegram/whatsapp/vk/maps/docs.
- Следующий шаг: нормализовать и дедуплицировать для нового проекта.

## 6) Финальная форма передачи

Собрать 3 файла:
1. `legacy-export.json` (все данные и механики)
2. `legacy-mechanics.md` (читаемое описание flow)
3. `legacy-screens/` (desktop скринпак)

Это даст полную основу для переноса 1:1 без потери механик.
