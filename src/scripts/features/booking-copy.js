(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function getShiftContextLine(ctx) {
    var safeCtx = ctx && typeof ctx === "object" ? ctx : {};
    var shiftId = String(safeCtx.shiftId || "");
    var hasSelectedAge = Boolean(safeCtx.hasSelectedAge);
    var age = String(safeCtx.age || "");

    if (!shiftId || !hasSelectedAge) return "";

    if (shiftId === "shift-1") return "Подходит для " + age + " · часто выбирают ближайшую короткую смену.";
    if (shiftId === "shift-2") return "Подходит для " + age + " · хороший входной формат без длинной адаптации.";
    if (shiftId === "shift-3") return "Подходит для " + age + " · чаще выбирают ради AI-практики и проектной защиты.";
    if (shiftId === "shift-4") return "Подходит для " + age + " · длинная смена для более глубокого погружения.";
    return "Подходит для " + age + ".";
  }

  window.AC_FEATURES.bookingCopy = {
    getShiftContextLine: getShiftContextLine
  };
})();
