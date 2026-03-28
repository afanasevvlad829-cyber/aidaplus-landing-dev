(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function formatRemaining(diff) {
    var safeDiff = Number(diff || 0);
    if (safeDiff <= 0) return "";
    var totalSeconds = Math.max(0, Math.floor(safeDiff / 1000));
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    var dayPart = days > 0
      ? String(days) + " " + (days === 1 ? "день" : (days >= 2 && days <= 4 ? "дня" : "дней")) + ", "
      : "";
    var hourPart = String(hours) + " " + (hours === 1 ? "час" : (hours >= 2 && hours <= 4 ? "часа" : "часов"));
    var minutePart = String(minutes) + " " + (minutes === 1 ? "минута" : (minutes >= 2 && minutes <= 4 ? "минуты" : "минут"));
    var secondPart = String(seconds) + " " + (seconds === 1 ? "секунда" : (seconds >= 2 && seconds <= 4 ? "секунды" : "секунд"));
    return "Осталось " + dayPart + hourPart + ", " + minutePart + ", " + secondPart;
  }

  function formatRemainingCompact(diff) {
    var safeDiff = Number(diff || 0);
    if (safeDiff <= 0) return "";
    var totalSeconds = Math.max(0, Math.floor(safeDiff / 1000));
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    var dayPart = days > 0 ? String(days) + "д " : "";
    var hourPart = String(hours).padStart(2, "0");
    var minutePart = String(minutes).padStart(2, "0");
    var secondPart = String(seconds).padStart(2, "0");
    return "Осталось " + dayPart + hourPart + "ч " + minutePart + "м " + secondPart + "с";
  }

  function generateCode() {
    return "AC-" + Math.random().toString(36).slice(2, 6).toUpperCase();
  }

  function buildOfferState(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var basePrice = Number(safeInput.basePrice || 0);
    var discountFactor = Number(safeInput.discountFactor || 1);
    var now = Number(safeInput.now || Date.now());
    var ttlHours = Number(safeInput.ttlHours || 72);

    return {
      offerPrice: Math.round(basePrice * discountFactor),
      expiresAt: now + ttlHours * 60 * 60 * 1000,
      offerStage: 1
    };
  }

  function isOfferActive(expiresAt, now) {
    var safeExpiresAt = Number(expiresAt || 0);
    var safeNow = Number(now || Date.now());
    return Boolean(safeExpiresAt && safeNow < safeExpiresAt);
  }

  function getVisiblePrice(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    return safeInput.offerPrice || safeInput.basePrice || safeInput.shiftPrice || null;
  }

  window.AC_FEATURES.offerUtils = {
    formatRemaining: formatRemaining,
    formatRemainingCompact: formatRemainingCompact,
    generateCode: generateCode,
    buildOfferState: buildOfferState,
    isOfferActive: isOfferActive,
    getVisiblePrice: getVisiblePrice
  };
})();
