(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function run(handler) {
    return typeof handler === "function" ? handler() : false;
  }

  function handleMediaAction(action, handlers) {
    var safeHandlers = handlers && typeof handlers === "object" ? handlers : {};
    switch (String(action || "")) {
      case "open-photo": return run(safeHandlers.openPhoto);
      case "open-stay-photo": return run(safeHandlers.openStayPhoto);
      case "open-book-photo": return run(safeHandlers.openBookPhoto);
      case "open-video": return run(safeHandlers.openVideo);
      case "video-carousel-prev": return run(safeHandlers.videoCarouselPrev);
      case "video-carousel-next": return run(safeHandlers.videoCarouselNext);
      case "toggle-shift-about": return run(safeHandlers.toggleShiftAbout);
      case "toggle-shift-calendar-inline": return run(safeHandlers.toggleShiftCalendarInline);
      case "open-all-shifts": return run(safeHandlers.openAllShifts);
      case "team-carousel-prev": return run(safeHandlers.teamCarouselPrev);
      case "team-carousel-next": return run(safeHandlers.teamCarouselNext);
      case "open-calendar": return run(safeHandlers.openCalendar);
      case "primary-cta": return run(safeHandlers.primaryCta);
      case "mobile-focus-age": return run(safeHandlers.mobileFocusAge);
      case "reset-age-selection": return run(safeHandlers.resetAgeSelection);
      case "reset-shift-selection": return run(safeHandlers.resetShiftSelection);
      default: return false;
    }
  }

  window.AC_FEATURES.actionRouterMedia = {
    handleMediaAction: handleMediaAction
  };
})();
