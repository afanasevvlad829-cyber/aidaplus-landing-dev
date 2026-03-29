# Technical Debt Register

Use this log for every non-trivial UI/code change.

| Date | Area | Type | Risk | Created By | Fix Plan | Target Iteration | Status |
|---|---|---|---|---|---|---|---|
| 2026-03-29 | Build/runtime split (`dist` vs source) | Structural debt | High | codex | Complete source alignment to prevent runtime/source drift | Iteration 4 | Open |
| 2026-03-29 | Booking flow branching (`compact/full`, desktop/mobile states) | Logic complexity | Medium | codex | Consolidate state transitions into single action pipeline | Iteration 4 | Open |
| 2026-03-29 | CSS selector duplication in `main.css` | Maintainability | Medium | codex | Zone-by-zone cleanup with snapshots and no-regression checks | Iteration 3 | Open |
