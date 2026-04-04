# Technical Debt Register

Use this log for every non-trivial UI/code change.

| Date | Area | Type | Risk | Created By | Fix Plan | Target Iteration | Status |
|---|---|---|---|---|---|---|---|
| 2026-03-29 | Build/runtime split (`dist` vs source) | Structural debt | High | codex | Complete source alignment to prevent runtime/source drift | Iteration 4 | Open |
| 2026-03-29 | Booking flow branching (`compact/full`, desktop/mobile states) | Logic complexity | Medium | codex | Consolidate state transitions into single action pipeline | Iteration 4 | Open |
| 2026-03-29 | CSS selector duplication in `main.css` | Maintainability | Medium | codex | Zone-by-zone cleanup with snapshots and no-regression checks | Iteration 3 | Open |
| 2026-04-04 | Batch 1 entry stabilization (`main.js`) | Debt burn-down | Medium | codex | Introduce `safeInvoke` for guarded module calls, move non-critical bootstrap steps (debug panel, contacts widget, scroll/section tracking, video refresh, quality pipeline) to deferred init, keep hot-path focused on render-critical setup | Iteration 11 | In Progress |
| 2026-04-04 | Batch 2 modular bridges (`telemetry/hero-variant/booking-debug`) | Monolith reduction | Medium | codex | Replace inline business-heavy helpers in `main.js` with module bridge calls (`window.AC_FEATURES.*.create` + `safeInvoke`), keep fallback-only wrappers in orchestration layer | Iteration 11 | In Progress |
| 2026-04-04 | Batch 3/4 flow split (`calendar/navigation/video-meta`) | Monolith reduction | Medium | codex | Route calendar state derivation/render/open-close and navigation/video-meta orchestration through dedicated feature modules; keep `main.js` as bridge/wiring layer | Iteration 11 | In Progress |
| 2026-04-04 | Batch 5/6 media+trust-panel split + CSS dedup A | Monolith + CSS cleanup | Medium | codex | Delegate compact trust-panel renderer to `mediaFlowTrustPanel`, remove duplicated runtime branch in `main.js`, merge repeated offer/modal selectors in `main.css` without UX changes | Iteration 11 | In Progress |
| 2026-04-04 | Batch 7 media-sections split | Monolith reduction | Medium | codex | Move heavy media sections renderer from `main.js` to `mediaSectionsFlow` bridge; keep state/data wiring in orchestration layer only | Iteration 11 | In Progress |
