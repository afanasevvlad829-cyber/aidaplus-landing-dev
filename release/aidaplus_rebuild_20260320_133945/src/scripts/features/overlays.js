export function isBookingOverlayOpen(state) {
  return !!(state && state.overlays && state.overlays.shifts);
}
