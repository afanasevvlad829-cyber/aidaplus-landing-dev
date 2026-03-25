### Booking CTA / Hint Cleanup
- `getPrimaryActionState()` simplified:
  - no age → `Выберите возраст`
  - no shift → `Выберите смену`
  - ready → `Оформить заявку`
- `showHint(message, requiredStep)` now persistent until step is fixed.
- `syncBookingHints()` hides hint after correction.
