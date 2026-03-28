(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function resolveSummaryPrice(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    return safeInput.offerPrice || safeInput.basePrice || safeInput.shiftPrice || null;
  }

  function buildSummaryViewModel(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var ageLabel = String(safeInput.ageLabel || "");
    var shiftTitle = String(safeInput.shiftTitle || "");
    var shiftDates = String(safeInput.shiftDates || "");
    var code = String(safeInput.code || "");
    var priceText = String(safeInput.priceText || "");

    return {
      main: ageLabel + " · " + shiftTitle,
      meta: shiftDates + (code ? " · Код " + code : ""),
      price: priceText
    };
  }

  window.AC_FEATURES.summaryUtils = {
    resolveSummaryPrice: resolveSummaryPrice,
    buildSummaryViewModel: buildSummaryViewModel
  };
})();
