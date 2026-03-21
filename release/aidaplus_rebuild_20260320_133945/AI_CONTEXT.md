# AidaPlus / AidaCamp project context

## Project type
Static landing page with modular JS/CSS.

## Main files
- index.html — main page
- src/scripts/main.js — runtime UI logic
- src/styles/main.css — main overrides and UI styles

## Current task focus
Icon migration to unified SVG system.

## Icon source
All new icons are stored in:
- /assets/icons/

## Files allowed for current task
- index.html
- src/scripts/main.js
- src/styles/main.css

Do not scan the whole repository unless explicitly requested.

## Known runtime icon locations in main.js
- acReviewsPrevMod
- acReviewsNextMod
- acBookInfoClose
- .ac-left-video-item__play

## Replacement rules
Replace UI symbols only:
- ✕ -> close.svg
- ← -> chevron-left.svg
- → -> chevron-right.svg
- ▶ -> play.svg
- 🤖 -> robot.svg
- 🏊 -> pool.svg
- 🍽 -> food.svg
- 🏥 -> med.svg
- 🔍 -> search.svg
- 📋 -> clipboard.svg
- 🔄 -> refresh.svg
- 🔥 -> fire-hit.svg
- ✨ -> sparkle.svg
- 💰 -> money.svg
- 🔒 -> lock.svg
- ✅ -> check.svg

## Output expectations
- minimal targeted edits
- no full file rewrites
- no infrastructure changes
- preserve existing business logic
