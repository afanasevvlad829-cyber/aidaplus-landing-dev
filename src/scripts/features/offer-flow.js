(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function clearOfferTimeout(timeoutIds) {
    var safeIds = Array.isArray(timeoutIds) ? timeoutIds : [];
    if (!safeIds.length) return [];
    safeIds.forEach(function (id) {
      clearTimeout(id);
    });
    return [];
  }

  function resetOfferState(state, options) {
    if (!state || typeof state !== "object") return state;
    var safeOptions = options && typeof options === "object" ? options : {};
    var preserveShift = safeOptions.preserveShift !== false;

    state.offerStage = 0;
    state.offerPrice = null;
    state.code = null;
    state.expiresAt = null;
    state.offerSearching = false;

    if (!preserveShift) {
      state.shiftId = null;
      state.basePrice = null;
    }

    return state;
  }

  window.AC_FEATURES.offerFlow = {
    clearOfferTimeout: clearOfferTimeout,
    resetOfferState: resetOfferState
  };
})();
