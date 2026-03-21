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
