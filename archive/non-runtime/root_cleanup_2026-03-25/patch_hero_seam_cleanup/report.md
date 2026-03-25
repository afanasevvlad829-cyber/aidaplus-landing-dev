1. Что сделано
- Выполнен точечный seam-cleanup стыка `hero -> section-about` на desktop.
- Сохранён controlled overlap у `hero-booking-card` (без изменения его текущих параметров).

2. Где изменения
- `/Users/vladimirafanasev/aidaplus-dev/src/styles/main.css`
  - блок `.body-sections`
  - новый селектор `.body-sections > .section-card:first-child`

3. Как очищен seam
- Для контейнера секций добавлен управляемый слой (`position: relative; z-index: 2`), чтобы исключить визуальные артефакты на стыке.
- Первый белый блок растянут до краёв контентной области на стыке (`margin: -1px -18px 0`) и убраны верхние боковые скругления/боковые границы.
- Убраны «углы/уши» слева и справа в зоне перехода.

4. Как сохранён overlap
- Параметры `hero-booking-card` не менялись:
  - `margin-bottom: -32px`
  - `transform: translateY(-12px)`
- Визуальный вылет карточки сохранён.

5. Что не делал
- Не трогал mobile-верстку.
- Не менял высоту hero, логику booking flow и другие блоки страницы.
