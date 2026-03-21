export const MODE_KEY = "ac:mode";

export function getInitialMode() {
  try {
    return localStorage.getItem(MODE_KEY) === "full" ? "full" : "compact";
  } catch (_err) {
    return "compact";
  }
}

export function persistMode(mode) {
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch (_err) {
    // ignore storage errors
  }
}

export function getStoredMode() {
  try {
    const storedMode = localStorage.getItem(MODE_KEY);
    if (storedMode === "full" || storedMode === "compact") {
      return storedMode;
    }
    return null;
  } catch (_err) {
    return null;
  }
}

export function createInitialState(initialShift) {
  return {
    mode: getInitialMode(),
    activeTab: "info",
    step: 0,
    direction: initialShift.direction,
    age: 9,
    shiftView: "list",
    selectedShiftId: initialShift.id,
    overlays: {
      contact: false,
      shifts: false
    },
    photoCategory: "all",
    photoPage: 0,
    photoLightboxIndex: -1,
    videoPage: 0,
    reviewPage: 0,
    teamPage: 0,
    faqCategory: "medicine"
  };
}

export function createUiRuntimeState() {
  return {
    ageSelectionConfirmed: false,
    ageGateNudge: false,
    ageGateHintDismissed: false,
    priceSearchByShift: {},
    priceSearchTimer: null,
    priceDoneAnimatedByShift: {},
    priceDoneRaf: null,
    fixedReservation: null,
    promoTicker: null,
    heroSlideTimer: null,
    heroSlideIndex: 0,
    shiftsShowAll: false,
    shiftCalendar: {
      open: false,
      shiftId: null
    }
  };
}
