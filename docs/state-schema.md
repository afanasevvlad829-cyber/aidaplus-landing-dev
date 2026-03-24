# Approved State Schema

```js
{
  mode: "compact" | "full",
  activeTab: string,
  step: number,
  direction: string,
  age: number,
  shiftView: "list" | "grid",
  selectedShiftId: string,
  overlays: {
    contact: boolean,
    shifts: boolean
  },
  photoCategory: string,
  photoPage: number,
  videoPage: number,
  reviewPage: number,
  teamPage: number,
  faqCategory: string
}
```

Source of truth: `src/scripts/main.js`.
Runtime host: `src/scripts/features/events.js` (main orchestrator is `src/scripts/main.js`).
Validation helpers: `src/scripts/core/state.js`.
