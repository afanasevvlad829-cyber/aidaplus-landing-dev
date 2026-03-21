# UI Contracts

## State Contract
Runtime state is owned in `src/scripts/main.js` and includes:
`mode, activeTab, step, direction, age, shiftView, selectedShiftId, overlays, photoCategory, photoPage, videoPage, reviewPage, teamPage, faqCategory`.

## Render Contract
Render entry points remain:
- `renderLayout()`
- `renderMenu()`
- `renderInfoCard()`
- `renderFunnel()`
- `renderSections()`
- `renderOverlays()`
- `renderFooter()`

No tracking is emitted from render functions.

## Compact / Full Contract
- `setMode("compact"|"full")` is the mode owner.
- Mode persists in localStorage key `ac:mode`.
- Compact: menu in hero (`#acCompactNav`).
- Full: top nav (`#acTopNav`).

## Funnel Contract
- Step source: `state.step`.
- Navigation: `setStep(next)` and shift selection.
- Final CTA opens shifts overlay (booking flow).

## Overlay Contract
- Overlay source: `state.overlays`.
- Open/close only via `setOverlay(name, bool)` and close helpers.
- No observer/timer-based synchronization.
