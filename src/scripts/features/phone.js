(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function onlyDigits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function normalizeDigits(value) {
    var digits = onlyDigits(value);
    if (!digits) return "";
    if (digits[0] === "8") digits = "7" + digits.slice(1);
    if (digits[0] === "9") digits = "7" + digits;
    if (digits[0] !== "7") digits = "7" + digits;
    return digits.slice(0, 11);
  }

  function formatPhoneInput(value) {
    var digits = normalizeDigits(value);
    if (!digits) return "";

    var out = "+7";
    if (digits.length > 1) out += " (" + digits.slice(1, 4);
    if (digits.length >= 4) out += ")";
    if (digits.length > 4) out += " " + digits.slice(4, 7);
    if (digits.length > 7) out += "-" + digits.slice(7, 9);
    if (digits.length > 9) out += "-" + digits.slice(9, 11);
    return out;
  }

  function normalizePhone(value) {
    var digits = normalizeDigits(value);
    return digits.length === 11 ? "+" + digits : "";
  }

  function isValidPhone(value) {
    return Boolean(normalizePhone(value));
  }

  window.AC_FEATURES.phone = {
    onlyDigits: onlyDigits,
    formatPhoneInput: formatPhoneInput,
    normalizePhone: normalizePhone,
    isValidPhone: isValidPhone
  };
})();
