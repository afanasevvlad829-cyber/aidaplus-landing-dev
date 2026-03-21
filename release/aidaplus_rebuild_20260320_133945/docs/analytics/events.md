# События аналитики

## page_loaded
- Short description: страница загружена и готова к взаимодействию.
- Payload: `{ mode, active_tab, step }`
- Where triggered (function name): `bootstrap`
- Scenario(s): Быстрое ознакомление, Вход в воронку, Контент -> покупка

## mode_changed
- Short description: пользователь переключил режим отображения страницы.
- Payload: `{ mode }`
- Where triggered (function name): `setMode`
- Scenario(s): Предпочтение режима

## tab_changed
- Short description: пользователь переключил раздел в меню.
- Payload: `{ tab, mode }`
- Where triggered (function name): `setActiveTab`
- Scenario(s): Быстрое ознакомление, Контент -> покупка

## funnel_started
- Short description: пользователь впервые вышел из первого шага и вошел в прохождение воронки.
- Payload: `{ from_step, to_step, mode }`
- Where triggered (function name): `setStep`
- Scenario(s): Вход в воронку, Контент -> покупка

## step_changed
- Short description: изменился шаг воронки.
- Payload: `{ step, total_steps, direction, shift_id }`
- Where triggered (function name): `setStep`, `setSelectedShift`
- Scenario(s): Вход в воронку, Прохождение воронки, Контент -> покупка

## direction_selected
- Short description: пользователь выбрал направление в блоке смен.
- Payload: `{ direction }`
- Where triggered (function name): `setDirection`
- Scenario(s): Прохождение воронки

## age_selected
- Short description: пользователь выбрал возраст ребенка.
- Payload: `{ age, profile_id }`
- Where triggered (function name): `setAge`
- Scenario(s): Прохождение воронки

## shift_view_changed
- Short description: пользователь переключил вид отображения смен.
- Payload: `{ shift_view }`
- Where triggered (function name): `setShiftView`
- Scenario(s): Прохождение воронки

## shift_selected
- Short description: пользователь выбрал конкретную смену.
- Payload: `{ shift_id, direction, step }`
- Where triggered (function name): `setSelectedShift`
- Scenario(s): Прохождение воронки, Намерение купить

## booking_opened
- Short description: открыт слой со сменами и ценами.
- Payload: `{ step, shift_id, direction }`
- Where triggered (function name): `setOverlay`
- Scenario(s): Намерение купить, Контент -> покупка

## booking_clicked
- Short description: пользователь нажал финальный CTA для перехода к выбору смен.
- Payload: `{ step, shift_id, direction }`
- Where triggered (function name): `handleClick`
- Scenario(s): Намерение купить, Контент -> покупка

## reload_restored_mode
- Short description: после перезагрузки восстановлен ранее сохраненный режим.
- Payload: `{ mode, stored_mode }`
- Where triggered (function name): `bootstrap`
- Scenario(s): Предпочтение режима
