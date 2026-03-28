(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function run(handler) {
    return typeof handler === "function" ? handler() : false;
  }

  function handleCommonAction(action, handlers) {
    var safeHandlers = handlers && typeof handlers === "object" ? handlers : {};
    switch (String(action || "")) {
      case "close-offer": return run(safeHandlers.closeOffer);
      case "save-on-device": return run(safeHandlers.saveOnDevice);
      case "apply-offer": return run(safeHandlers.applyOffer);
      case "close-form": return run(safeHandlers.closeForm);
      case "submit-form": return run(safeHandlers.submitForm);
      case "close-success": return run(safeHandlers.closeSuccess);
      case "close-calendar": return run(safeHandlers.closeCalendar);
      case "close-section-modal": return run(safeHandlers.closeSectionModal);
      case "close-video-modal": return run(safeHandlers.closeVideoModal);
      case "debug-reset-booking": return run(safeHandlers.debugResetBooking);
      case "close-debug-controls": return run(safeHandlers.closeDebugControls);
      default: return false;
    }
  }

  window.AC_FEATURES.actionRouter = {
    handleCommonAction: handleCommonAction
  };
})();
