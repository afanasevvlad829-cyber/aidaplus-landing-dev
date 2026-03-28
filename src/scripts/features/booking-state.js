(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function getPrimaryActionState(ctx) {
    var safeCtx = ctx && typeof ctx === "object" ? ctx : {};
    var hasSelectedAge = Boolean(safeCtx.hasSelectedAge);
    var hasShift = Boolean(safeCtx.hasShift);
    var offerStage = Number(safeCtx.offerStage || 0);

    if (!hasSelectedAge) {
      return { text: "Выберите возраст", disabled: true, hint: "" };
    }
    if (!hasShift) {
      return { text: "Показать смены", disabled: true, hint: "" };
    }
    if (offerStage === 0) {
      return { text: "Уточнить цену", disabled: false, hint: "" };
    }
    return { text: "Оформить заявку", disabled: false, hint: "" };
  }

  function getStepState(ctx) {
    var safeCtx = ctx && typeof ctx === "object" ? ctx : {};
    var hasSelectedAge = Boolean(safeCtx.hasSelectedAge);
    var hasShift = Boolean(safeCtx.shiftId);
    var offerStage = Number(safeCtx.offerStage || 0);

    if (!hasSelectedAge) return 1;
    if (hasSelectedAge && !hasShift) return 2;
    if (hasShift && offerStage === 0) return 3;
    if (offerStage >= 1 && !safeCtx.code) return 4;
    if (offerStage >= 1) return 4;
    return 1;
  }

  function getBookingStage(stepState) {
    var safeStep = Number(stepState || 1);
    return Math.min(Math.max(safeStep, 1), 4);
  }

  window.AC_FEATURES.bookingState = {
    getPrimaryActionState: getPrimaryActionState,
    getStepState: getStepState,
    getBookingStage: getBookingStage
  };
})();
