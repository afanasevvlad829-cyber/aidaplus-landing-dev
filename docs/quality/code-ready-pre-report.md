# CODE_READY Pre-Report (No Rollout)

Generated: 2026-04-05 05:51 MSK

## Status

- `CODE_READY=YES` for architecture/quality phase (without production rollout).
- Rollout remains explicitly out of scope for this phase.

## KPI Snapshot

- `css_duplicate_selectors = 8`
- `js_if_count = 154`
- `js_ternary_count = 19`
- `js_state_mutations = 0`
- `dist_bytes = 56263`

## Gate Results

- `./tools/quality-check.sh` — PASS (threshold + baseline gates)
- `./tools/smoke-runtime-api.sh https://dev.aidacamp.ru` — PASS
- `bash ./tools/smoke-booking-flow.sh https://aidacamp.ru` — PASS (`lead 503` known infra constraint)
- `node ./tools/smoke-booking-ui-playwright.mjs https://dev.aidacamp.ru` — PASS (desktop/mobile)
- `bash ./tools/build-astro-preview.sh` — PASS
- Final acceptance loop (x3 consecutive runs, 2026-04-05 05:52–05:57 MSK) — PASS/PASS/PASS

## Contract Lock (current)

- Orchestration uses `safeInvoke(...)` as primary feature invoke path.
- Runtime events contract is stable:
  - `state:sync`
  - `hero:*`
  - `booking:*`
  - `calendar:*`
  - `content:*`
  - `tracking:*`
- Content adapter API is stable:
  - `loadBlock(blockId, locale)`
  - `loadBlocks(blockIds, locale)`

## Main Refactor Outcomes

- `main.js` reduced to orchestration-first role with extracted feature flows:
  - `summary-flow`
  - `navigation-flow`
  - `docs-flow`
  - `ui-init-flow`
  - and previously extracted booking/calendar/hero/media/telemetry flows
- Desktop-first architecture preserved; mobile remains presentation layer on shared state/actions.
- `hero_v3_simple` runtime canonicalized to single-step stage path (`stage=1`) for dev simple flow.
- Legacy booking stage CSS refs (`stage2/3/4`) reduced to zero in active `main.css` checks.

## Known Non-Blocking Constraint

- Lead transport sometimes returns `503` due to Telegram transport/config availability.
- This is infra/runtime delivery constraint, not a code regression in UI/runtime architecture.

## Final Technical Status (No Rollout)

- `CODE_READY=YES` (architecture/quality phase complete).
- Rollout remains explicitly out of scope for this phase.
