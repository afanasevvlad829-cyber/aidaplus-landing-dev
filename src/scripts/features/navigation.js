(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function cleanSectionId(id) {
    return String(id || "").replace(/^#/, "");
  }

  function resolveTargetId(cleanId, view) {
    var mobileMap = {
      "section-about": "mobile-section-about",
      "section-journey": "mobile-section-journey",
      "section-programs": "mobile-section-programs",
      "section-photos": "mobile-section-photos",
      "section-videos": "mobile-section-videos",
      "section-reviews": "mobile-section-reviews",
      "section-faq": "mobile-section-faq",
      "section-team": "mobile-section-team",
      "section-stay": "mobile-section-stay",
      "section-contacts": "mobile-section-contacts",
      "section-legal": "mobile-section-docs"
    };

    return view === "mobile" ? mobileMap[cleanId] || cleanId : cleanId;
  }

  function scrollToSection(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var cleanId = cleanSectionId(safeInput.id);
    if (!cleanId) return false;

    var targetId = resolveTargetId(cleanId, safeInput.view);
    var el = document.getElementById(targetId) || document.getElementById(cleanId);
    if (!el) return false;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  function maybeOpenLegalFallback(cleanId, scrollDone) {
    if (scrollDone) return false;
    if (String(cleanId || "") !== "section-legal") return false;
    window.open("legal.html#legal-info", "_blank", "noopener");
    return true;
  }

  function shouldBlockMobileProgramsByAge(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    return (
      safeInput.view === "mobile" &&
      String(safeInput.cleanId || "") === "section-programs" &&
      !Boolean(safeInput.hasSelectedAge)
    );
  }

  function shouldTrackMobileProgramsAfterAge(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    return (
      safeInput.view === "mobile" &&
      String(safeInput.cleanId || "") === "section-programs" &&
      Boolean(safeInput.hasSelectedAge)
    );
  }

  function isCompactMode(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var view = String(safeInput.view || "");
    var desktopMode = String(safeInput.desktopMode || "");
    var mobileMode = String(safeInput.mobileMode || "");
    return (
      (view === "desktop" && desktopMode === "compact") ||
      (view === "mobile" && mobileMode === "compact")
    );
  }

  function buildNavigationPlan(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var cleanId = cleanSectionId(safeInput.id || safeInput.cleanId);
    var hasSelectedAge = Boolean(safeInput.hasSelectedAge);
    var compactMode = isCompactMode(safeInput);
    var hasCompactModalSection = Boolean(safeInput.hasCompactModalSection);

    return {
      cleanId: cleanId,
      blockMobileProgramsByAge: shouldBlockMobileProgramsByAge({
        view: safeInput.view,
        cleanId: cleanId,
        hasSelectedAge: hasSelectedAge
      }),
      trackMobileProgramsAfterAge: shouldTrackMobileProgramsAfterAge({
        view: safeInput.view,
        cleanId: cleanId,
        hasSelectedAge: hasSelectedAge
      }),
      compactMode: compactMode,
      shouldTryCompactModal: compactMode && hasCompactModalSection
    };
  }

  window.AC_FEATURES.navigation = {
    cleanSectionId: cleanSectionId,
    resolveTargetId: resolveTargetId,
    scrollToSection: scrollToSection,
    maybeOpenLegalFallback: maybeOpenLegalFallback,
    shouldBlockMobileProgramsByAge: shouldBlockMobileProgramsByAge,
    shouldTrackMobileProgramsAfterAge: shouldTrackMobileProgramsAfterAge,
    isCompactMode: isCompactMode,
    buildNavigationPlan: buildNavigationPlan
  };
})();
