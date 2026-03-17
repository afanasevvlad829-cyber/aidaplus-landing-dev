# AidaCamp icon replacement map for Codex

Inspect only these files:
- index.html
- src/scripts/main.js
- src/styles/main.css

Do not rescan the whole repository.

## 1. index.html — replace directly in live markup

### Controls
- `✕` → `/assets/icons/close.svg`
- `←` → `/assets/icons/chevron-left.svg`
- `→` → `/assets/icons/chevron-right.svg`
- `▶` → `/assets/icons/play.svg`

### Content/UI icons
- `🤖` → `/assets/icons/robot.svg`
- `🏊` → `/assets/icons/pool.svg`
- `🍽️` → `/assets/icons/food.svg`
- `🏥` → `/assets/icons/med.svg`
- `🔍` → `/assets/icons/search.svg`
- `📋` → `/assets/icons/clipboard.svg`
- `🔄` → `/assets/icons/refresh.svg`
- `🔥` → `/assets/icons/fire-hit.svg`
- `✨` → `/assets/icons/sparkle.svg`
- `💰` → `/assets/icons/money.svg`
- `🔒` → `/assets/icons/lock.svg`
- `✅` → `/assets/icons/check.svg`

### Embedded assets
- Move remaining base64/logo assets to `/assets/logo-*.svg`

## 2. src/scripts/main.js — replace runtime-inserted icons only

### Exact places already known
- `acReviewsPrevMod`: `←` → `/assets/icons/chevron-left.svg`
- `acReviewsNextMod`: `→` → `/assets/icons/chevron-right.svg`
- `acBookInfoClose`: `✕` → `/assets/icons/close.svg`
- `.ac-left-video-item__play`: `▶` → `/assets/icons/play.svg`

### Runtime emoji/icon blocks
Replace any UI emoji inserted via template strings / innerHTML using the same mapping above.

## 3. src/styles/main.css — normalize rendering only
Add:
- base `.ac-icon` rules
- nested sizing for close/nav/review/video/team/calendar buttons
Reuse existing good containers:
- `.ac-feature__icon`
- `.ac-left-tab`
- `.ac-shift__cal-icon`

## 4. HTML replacement pattern

Use:
`<img class="ac-icon" src="/assets/icons/close.svg" alt="" aria-hidden="true">`

For buttons:
`<button ...><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true"></button>`

## 5. Constraints
- Do not rewrite whole files
- Do not change business logic
- Do not touch deploy/build/nginx
- Keep plain narrative text intact if symbol is not functioning as a UI icon