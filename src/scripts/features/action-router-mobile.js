(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function run(handler) {
    return typeof handler === "function" ? handler() : false;
  }

  function handleMobileAction(action, handlers) {
    var safeHandlers = handlers && typeof handlers === "object" ? handlers : {};
    switch (String(action || "")) {
      case "mobile-photo-select": return run(safeHandlers.mobilePhotoSelect);
      case "mobile-video-select": return run(safeHandlers.mobileVideoSelect);
      case "mobile-review-select": return run(safeHandlers.mobileReviewSelect);
      case "mobile-faq-filter": return run(safeHandlers.mobileFaqFilter);
      case "mobile-faq-toggle": return run(safeHandlers.mobileFaqToggle);
      case "mobile-team-prev": return run(safeHandlers.mobileTeamPrev);
      case "mobile-team-next": return run(safeHandlers.mobileTeamNext);
      case "mobile-team-select": return run(safeHandlers.mobileTeamSelect);
      case "mobile-journey-step": return run(safeHandlers.mobileJourneyStep);
      case "mobile-program-select": return run(safeHandlers.mobileProgramSelect);
      case "mobile-docs-toggle": return run(safeHandlers.mobileDocsToggle);
      default: return false;
    }
  }

  window.AC_FEATURES.actionRouterMobile = {
    handleMobileAction: handleMobileAction
  };
})();
