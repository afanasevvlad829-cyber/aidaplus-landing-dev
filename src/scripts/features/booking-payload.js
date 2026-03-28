(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function selectedShiftPayload(input) {
    var safeInput = input && typeof input === "object" ? input : {};

    return {
      shift_id: String(safeInput.shiftId || ""),
      shift_title: String(safeInput.shiftTitle || ""),
      shift_dates: String(safeInput.shiftDates || ""),
      shift_days: String(safeInput.shiftDays || ""),
      age: safeInput.age || "",
      price: safeInput.offerPrice || safeInput.basePrice || safeInput.shiftPrice || ""
    };
  }

  window.AC_FEATURES.bookingPayload = {
    selectedShiftPayload: selectedShiftPayload
  };
})();
