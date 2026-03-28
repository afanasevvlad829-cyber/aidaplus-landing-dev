(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function buildBookingSummaryHtml(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var shiftTitle = String(safeInput.shiftTitle || "");
    var shiftDates = String(safeInput.shiftDates || "");
    var shiftDays = String(safeInput.shiftDays || "");
    var ageLabel = String(safeInput.ageLabel || "");
    var priceText = String(safeInput.priceText || "");
    var code = String(safeInput.code || "—");

    return (
      "<strong>Что мы сейчас фиксируем за вами</strong>" +
      '<div class="booking-summary-list">' +
      "<div>Смена: " + shiftTitle + "</div>" +
      "<div>Даты: " + shiftDates + "</div>" +
      "<div>Длительность: " + shiftDays + "</div>" +
      "<div>Возраст: " + ageLabel + "</div>" +
      "<div>Цена: " + priceText + "</div>" +
      "<div>Код бронирования: " + code + "</div>" +
      "</div>" +
      '<div class="micro-note">Без предоплаты. Мы сначала подтверждаем бронь вручную.</div>'
    );
  }

  window.AC_FEATURES.bookingSummary = {
    buildBookingSummaryHtml: buildBookingSummaryHtml
  };
})();
