(function () {
  "use strict";

  var MODE_KEY = "ac:mode";
  var TECH_BADGE_DISMISSED_KEY = "ac:tech-badge-dismissed";
  var BUILD_TAG = "TECH v2026.03.20-07";
  var HERO_SUBTITLE_STATIC = "Для детей 7–14 лет: свои IT‑проекты, бассейн и спорт каждый день, внутренняя экономика с лагерной валютой.";
  var ageSelectionConfirmed = false;
  var ageGateNudge = false;
  var auditRuntime = (window.AC_FEATURES && window.AC_FEATURES.auditRuntime) || {
    active: false,
    allowUiActions: false,
    allowDrag: true,
    snapGrid: 4,
    normalizeToParent: true,
    lockUntilAge: true,
    ageSelected: false,
    stageSync: null
  };

  var data = window.AC_DATA || {};
  var ICON_MAP = data.ICON_MAP || {};
  var CONTENT_MAP = data.CONTENT_MAP || {};
  var TABS = data.TABS || CONTENT_MAP.menu || [];
  var AGE_PROFILES = data.AGE_PROFILES || [];
  var SHIFTS = data.SHIFTS || [];
  var DIRECTIONS = data.DIRECTIONS || [];
  var TAB_TO_SECTION = data.TAB_TO_SECTION || {};
  var AGE_SLIDER_POINTS = data.AGE_SLIDER_POINTS || [9, 11, 13];
  var initialShift = SHIFTS[0] || { id: "shift-1", direction: "base" };


  var state = {
    mode: getInitialMode(),
    activeTab: "info",
    step: 0,
    direction: initialShift.direction,
    age: 9,
    shiftView: "list",
    selectedShiftId: initialShift.id,
    overlays: {
      contact: false,
      shifts: false
    },
    photoCategory: "all",
    photoPage: 0,
    photoLightboxIndex: -1,
    videoPage: 0,
    reviewPage: 0,
    teamPage: 0,
    faqCategory: "medicine"
  };

  function getInitialMode() {
    try {
      return localStorage.getItem(MODE_KEY) === "full" ? "full" : "compact";
    } catch (_err) {
      return "compact";
    }
  }

  function persistMode(mode) {
    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch (_err) {
      // ignore storage errors
    }
  }

  function getStoredMode() {
    try {
      var storedMode = localStorage.getItem(MODE_KEY);
      if (storedMode === "full" || storedMode === "compact") {
        return storedMode;
      }
      return null;
    } catch (_err) {
      return null;
    }
  }

  var track = (window.AC_FEATURES && window.AC_FEATURES.track) || function () {};

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  function isAgeGateLocked() {
    return !ageSelectionConfirmed;
  }

  function nudgeAgeSelection() {
    if (!isAgeGateLocked()) return;
    ageGateNudge = true;
    renderInfoCard();
    renderFunnel();
  }

  function findProfileByAge(age) {
    for (var i = 0; i < AGE_PROFILES.length; i += 1) {
      var profile = AGE_PROFILES[i];
      if (age >= profile.min && age <= profile.max) {
        return profile;
      }
    }
    return AGE_PROFILES[0];
  }

  function sliderValueToAge(sliderValue) {
    var index = clamp(Math.round(sliderValue), 0, AGE_SLIDER_POINTS.length - 1);
    return AGE_SLIDER_POINTS[index];
  }

  function ageToSliderValue(age) {
    if (age <= 9) return 0;
    if (age <= 12) return 1;
    return 2;
  }

  function findShiftById(shiftId) {
    for (var i = 0; i < SHIFTS.length; i += 1) {
      if (SHIFTS[i].id === shiftId) {
        return SHIFTS[i];
      }
    }
    return SHIFTS[0];
  }

  function getCurrentShift() {
    var safeStep = clamp(state.step, 0, SHIFTS.length - 1);
    return SHIFTS[safeStep];
  }

  function getHeroBenefits() {
    var profile = findProfileByAge(state.age);
    if (state.step === 0) {
      return profile.benefits;
    }
    var shift = getCurrentShift();
    if (shift && shift.benefits && shift.benefits.length) {
      return shift.benefits;
    }
    return profile.benefits;
  }

  function hasTab(tabKey) {
    for (var i = 0; i < TABS.length; i += 1) {
      if (TABS[i].key === tabKey) {
        return true;
      }
    }
    return false;
  }

  function setMode(mode) {
    if (mode !== "compact" && mode !== "full") return;
    if (state.mode === mode) return;

    state.mode = mode;
    persistMode(mode);

    renderLayout();
    renderMenu();
    renderSections();

    track("mode_changed", {
      mode: state.mode
    });

    if (auditRuntime.active && typeof auditRuntime.stageSync === "function") {
      auditRuntime.stageSync();
    }
  }

  function setActiveTab(tabKey) {
    if (!hasTab(tabKey) || tabKey === state.activeTab) return;

    state.activeTab = tabKey;

    renderMenu();
    renderSections();

    track("tab_changed", {
      tab: state.activeTab,
      mode: state.mode
    });
  }

  function applyStepTransition(nextStep, withFunnelStartTracking) {
    var prevStep = state.step;
    var safeStep = clamp(nextStep, 0, SHIFTS.length - 1);
    if (safeStep === state.step) return false;

    state.step = safeStep;
    var shift = getCurrentShift();
    state.selectedShiftId = shift.id;
    state.direction = shift.direction;

    renderInfoCard();
    renderFunnel();

    if (withFunnelStartTracking && prevStep === 0 && safeStep > 0) {
      track("funnel_started", {
        from_step: prevStep + 1,
        to_step: safeStep + 1,
        mode: state.mode
      });
    }

    track("step_changed", {
      step: state.step + 1,
      total_steps: SHIFTS.length,
      direction: state.direction,
      shift_id: state.selectedShiftId
    });

    return true;
  }

  function setStep(nextStep) {
    var changed = applyStepTransition(nextStep, true);
    if (changed && auditRuntime.active && typeof auditRuntime.stageSync === "function") {
      auditRuntime.stageSync();
    }
  }

  function setAge(nextAge) {
    var wasLocked = isAgeGateLocked();
    var safeAge = clamp(nextAge, 7, 14);
    if (safeAge === state.age && !wasLocked) return;

    state.age = safeAge;
    ageSelectionConfirmed = true;
    ageGateNudge = false;
    if (auditRuntime.active) {
      auditRuntime.ageSelected = true;
    }

    renderInfoCard();
    renderFunnel();

    track("age_selected", {
      age: state.age,
      profile_id: findProfileByAge(state.age).id
    });

    if (wasLocked && state.step === 0) {
      applyStepTransition(1, true);
    }

    if (auditRuntime.active && typeof auditRuntime.stageSync === "function") {
      auditRuntime.stageSync();
    }
  }

  function setShiftView(view) {
    if (view !== "list" && view !== "grid") return;
    if (state.shiftView === view) return;

    state.shiftView = view;

    renderOverlays();

    track("shift_view_changed", {
      shift_view: state.shiftView
    });
  }

  function setSelectedShift(shiftId) {
    var shift = findShiftById(shiftId);
    var targetStep = SHIFTS.indexOf(shift);
    var changed = false;

    if (state.selectedShiftId !== shift.id) {
      state.selectedShiftId = shift.id;
      state.direction = shift.direction;
      changed = true;
    }

    if (targetStep !== state.step) {
      applyStepTransition(targetStep, false);
      changed = true;
    }

    if (!changed) return;

    renderOverlays();

    track("shift_selected", {
      shift_id: state.selectedShiftId,
      direction: state.direction,
      step: state.step + 1
    });
  }

  function setDirection(directionId) {
    if (state.direction === directionId) return;

    state.direction = directionId;

    renderOverlays();

    track("direction_selected", {
      direction: state.direction
    });
  }

  function setOverlay(name, isOpen) {
    if (!hasOwn(state.overlays, name)) return;

    var changed = false;

    if (isOpen) {
      if (state.photoLightboxIndex >= 0) {
        state.photoLightboxIndex = -1;
        changed = true;
      }
      for (var key in state.overlays) {
        if (!hasOwn(state.overlays, key)) continue;
        if (state.overlays[key]) {
          state.overlays[key] = false;
          changed = true;
        }
      }
    }

    if (state.overlays[name] !== isOpen) {
      state.overlays[name] = isOpen;
      changed = true;
    }

    if (changed) {
      renderOverlays();

      if (name === "shifts" && isOpen) {
        track("booking_opened", {
          step: state.step + 1,
          shift_id: state.selectedShiftId,
          direction: state.direction
        });
      }
    }
  }

  function closeAllOverlays() {
    var changed = false;

    if (state.photoLightboxIndex >= 0) {
      state.photoLightboxIndex = -1;
      changed = true;
    }

    for (var key in state.overlays) {
      if (!hasOwn(state.overlays, key)) continue;
      if (state.overlays[key]) {
        state.overlays[key] = false;
        changed = true;
      }
    }

    if (changed) {
      renderOverlays();
    }
  }

  function setPhotoCategory(categoryId) {
    var exists = false;
    for (var i = 0; i < CONTENT_MAP.photoCategories.length; i += 1) {
      if (CONTENT_MAP.photoCategories[i].id === categoryId) {
        exists = true;
        break;
      }
    }
    if (!exists || state.photoCategory === categoryId) return;

    state.photoCategory = categoryId;
    state.photoPage = 0;
    renderSections();
  }

  function setPhotoPage(nextPage) {
    var items = getFilteredPhotos();
    var maxPage = Math.max(0, Math.ceil(items.length / 4) - 1);
    var safePage = clamp(nextPage, 0, maxPage);
    if (safePage === state.photoPage) return;

    state.photoPage = safePage;
    renderSections();
  }

  function setPhotoLightbox(index) {
    if (index < 0) {
      state.photoLightboxIndex = -1;
      renderOverlays();
      return;
    }

    var items = getFilteredPhotos();
    if (!items.length) return;

    var safeIndex = clamp(index, 0, items.length - 1);
    if (state.photoLightboxIndex === safeIndex) return;
    state.photoLightboxIndex = safeIndex;
    renderOverlays();
  }

  function setVideoPage(nextPage) {
    var maxPage = Math.max(0, Math.ceil(CONTENT_MAP.videos.length / 3) - 1);
    var safePage = clamp(nextPage, 0, maxPage);
    if (safePage === state.videoPage) return;

    state.videoPage = safePage;
    renderSections();
  }

  function setReviewPage(nextPage) {
    var maxPage = Math.max(0, Math.ceil(CONTENT_MAP.reviews.length / 4) - 1);
    var safePage = clamp(nextPage, 0, maxPage);
    if (safePage === state.reviewPage) return;

    state.reviewPage = safePage;
    renderSections();
  }

  function setTeamPage(nextPage) {
    var maxPage = Math.max(0, Math.ceil(CONTENT_MAP.team.length / 4) - 1);
    var safePage = clamp(nextPage, 0, maxPage);
    if (safePage === state.teamPage) return;

    state.teamPage = safePage;
    renderSections();
  }

  function setFaqCategory(categoryId) {
    if (!hasOwn(CONTENT_MAP.faqItems, categoryId) || state.faqCategory === categoryId) return;

    state.faqCategory = categoryId;
    renderSections();
  }

  function renderLayout() {
    var body = document.body;
    var toggle = document.getElementById("acViewToggle");

    if (body) {
      body.setAttribute("data-mode", state.mode);
    }

    if (toggle) {
      toggle.setAttribute("aria-pressed", String(state.mode === "full"));
    }
  }

  function buildMenuItems(variant) {
    var items = "";

    for (var i = 0; i < TABS.length; i += 1) {
      var tab = TABS[i];
      var isActive = tab.key === state.activeTab;
      var activeClass = isActive ? " is-active" : "";

      if (variant === "compact") {
        items +=
          '<a class="ac-menu-item--compact' +
          activeClass +
          '" href="' +
          tab.href +
          '" data-action="tab" data-tab="' +
          tab.key +
          '" title="' +
          tab.label +
          '" aria-label="' +
          tab.label +
          '">' +
          '<img class="ac-icon" src="' +
          tab.icon +
          '" alt="" aria-hidden="true">' +
          "</a>";
      } else {
        items +=
          '<a class="ac-menu-item--full' +
          activeClass +
          '" href="' +
          tab.href +
          '" data-action="tab" data-tab="' +
          tab.key +
          '">' +
          '<img class="ac-icon ac-icon--sm" src="' +
          tab.icon +
          '" alt="" aria-hidden="true">' +
          "<span>" +
          tab.label +
          "</span>" +
          "</a>";
      }
    }

    var toggleMarkup =
      '<button id="acViewToggle" class="ac-mode-toggle" type="button" data-action="toggle-mode" aria-label="Режим просмотра" aria-pressed="' +
      String(state.mode === "full") +
      '">' +
      '<span class="ac-mode-toggle__label">' +
      CONTENT_MAP.ui.modeCompactLabel +
      "</span>" +
      '<span class="ac-mode-toggle__track" aria-hidden="true"><span class="ac-mode-toggle__thumb"></span></span>' +
      '<span class="ac-mode-toggle__label">' +
      CONTENT_MAP.ui.modeFullLabel +
      "</span>" +
      "</button>";

    return (
      '<div class="ac-menu-shell ac-menu-shell--' +
      variant +
      '">' +
      '<div class="ac-menu ac-menu--' +
      variant +
      '">' +
      items +
      toggleMarkup +
      "</div>" +
      "</div>"
    );
  }

  function renderMenu() {
    var topNav = document.getElementById("acTopNav");
    var compactNav = document.getElementById("acCompactNav");

    if (!topNav || !compactNav) return;

    if (state.mode === "full") {
      topNav.innerHTML = '<div class="ac-container">' + buildMenuItems("full") + "</div>";
      compactNav.innerHTML = "";
      return;
    }

    compactNav.innerHTML = buildMenuItems("compact");
    topNav.innerHTML = "";
  }

  function renderInfoCard() {
    var profile = findProfileByAge(state.age);
    var heroBenefits = getHeroBenefits();

    var title = document.getElementById("acHeroTitle");
    var subtitle = document.getElementById("acHeroSubtitle");
    var progress = document.getElementById("acHeroProgress");
    var benefits = document.getElementById("acHeroBenefits");
    var ageLabel = document.getElementById("acAgeLabel");
    var ageText = document.getElementById("acAgeText");
    var ageInput = document.getElementById("acAgeInput");
    var ageBlock = document.querySelector(".ac-age-block");

    if (title) title.textContent = profile.title;
    if (subtitle) subtitle.textContent = HERO_SUBTITLE_STATIC;
    if (progress) progress.textContent = profile.progress;
    if (ageText) {
      ageText.textContent = profile.ageText;
      ageText.style.display = ageSelectionConfirmed ? "none" : "";
    }
    if (ageLabel) {
      ageLabel.textContent = ageSelectionConfirmed ? profile.ageText : CONTENT_MAP.ui.ageLabel;
    }
    if (ageBlock) {
      ageBlock.classList.toggle("is-attention", isAgeGateLocked() || ageGateNudge);
    }
    var sliderValue = ageToSliderValue(state.age);
    if (ageInput && Number(ageInput.value) !== sliderValue) {
      ageInput.value = String(sliderValue);
    }

    if (benefits) {
      var benefitHtml = "";
      for (var i = 0; i < heroBenefits.length; i += 1) {
        var benefit = heroBenefits[i];
        benefitHtml +=
          "<li>" +
          '<span class="ac-benefit-icon">' +
          '<img class="ac-icon ac-icon--sm" src="' +
          benefit.icon +
          '" alt="" aria-hidden="true">' +
          "</span>" +
          "<span>" +
          benefit.text +
          "</span>" +
          "</li>";
      }
      benefits.innerHTML = benefitHtml;
    }
  }

  function renderFunnel() {
    var shift = getCurrentShift();
    var isIntroStep = state.step === 0;
    var gateLocked = isAgeGateLocked();
    var profile = findProfileByAge(state.age);

    var overlayTitle = document.getElementById("acHeroOverlayTitle");
    var line = document.getElementById("acProgramLine");
    var summary = document.getElementById("acProgramSummary");
    var status = document.getElementById("acStepStatus");
    var nextBtn = document.getElementById("acStepNextBtn");
    var prevBtn = document.querySelector('[data-action="step-prev"]');
    var overlay = document.querySelector(".ac-hero-overlay");
    var heroRight = document.querySelector(".ac-hero-right");

    if (overlay) {
      overlay.classList.toggle("is-intro", isIntroStep);
    }
    if (heroRight) {
      heroRight.classList.toggle("is-intro", isIntroStep && state.mode === "compact");
    }

    if (isIntroStep) {
      if (overlayTitle) overlayTitle.textContent = gateLocked ? "Выберите возраст ребёнка" : profile.ageText;
      if (line) line.textContent = gateLocked ? "Передвиньте слайдер на карточке слева" : "Описание смены";
      if (summary) {
        summary.textContent = gateLocked
          ? "Нажмите подходящий возраст, чтобы открыть шаг 2 и доступ к остальным действиям."
          : profile.subtitle;
      }
    } else {
      if (overlayTitle) overlayTitle.textContent = CONTENT_MAP.ui.heroOverlayTitle;
      if (line) line.textContent = shift.line;
      if (summary) summary.textContent = shift.summary;
    }

    if (status) {
      var visualTotalSteps = 2;
      var visualStep = state.step === 0 ? 1 : 2;
      status.textContent =
        CONTENT_MAP.ui.stepLabel + " " + String(visualStep) + " " + CONTENT_MAP.ui.stepLabelDelimiter + " " + String(visualTotalSteps);
    }

    if (nextBtn) {
      nextBtn.disabled = gateLocked;
      nextBtn.setAttribute("aria-disabled", String(gateLocked));
      if (isIntroStep) {
        nextBtn.classList.add("ac-primary-btn--intro");
        nextBtn.classList.remove("ac-primary-btn--cta");
        nextBtn.innerHTML =
          '<img class="ac-icon ac-icon--sm" src="' +
          ICON_MAP.chevronRight +
          '" alt="" aria-hidden="true">';
        nextBtn.setAttribute("aria-label", "Следующий шаг");
      } else if (state.step >= SHIFTS.length - 1) {
        nextBtn.classList.remove("ac-primary-btn--intro");
        nextBtn.classList.add("ac-primary-btn--cta");
        nextBtn.innerHTML =
          '<span>' +
          CONTENT_MAP.ui.finalBookingCta +
          '</span><img class="ac-icon ac-icon--sm" src="' +
          ICON_MAP.chevronRight +
          '" alt="" aria-hidden="true">';
        nextBtn.removeAttribute("aria-label");
      } else {
        nextBtn.classList.remove("ac-primary-btn--intro");
        nextBtn.classList.remove("ac-primary-btn--cta");
        nextBtn.textContent = shift.nextCta;
        nextBtn.removeAttribute("aria-label");
      }
    }

    if (prevBtn) {
      var prevLocked = gateLocked || state.step === 0;
      prevBtn.disabled = prevLocked;
      prevBtn.setAttribute("aria-disabled", String(prevLocked));
    }
  }

  function getFilteredPhotos() {
    if (state.photoCategory === "all") {
      return CONTENT_MAP.photos;
    }

    var result = [];
    for (var i = 0; i < CONTENT_MAP.photos.length; i += 1) {
      var photo = CONTENT_MAP.photos[i];
      if (photo.cat === state.photoCategory) {
        result.push(photo);
      }
    }
    return result;
  }

  function renderProgramSectionMarkup() {
    var cards = "";
    for (var i = 0; i < CONTENT_MAP.programCards.length; i += 1) {
      var card = CONTENT_MAP.programCards[i];
      cards += '<article class="ac-card"><h3>' + card.title + "</h3><p>" + card.text + "</p></article>";
    }

    return '<h2>' + CONTENT_MAP.sectionTitles.program + '</h2><div class="ac-grid ac-grid--3">' + cards + "</div>";
  }

  function renderFormatSectionMarkup() {
    var cards = "";

    for (var i = 0; i < CONTENT_MAP.formatCards.length; i += 1) {
      var card = CONTENT_MAP.formatCards[i];
      if (card.list) {
        var list = "";
        for (var j = 0; j < card.list.length; j += 1) {
          list += "<li>" + card.list[j] + "</li>";
        }
        cards += '<article class="ac-card"><h3>' + card.title + "</h3><ul>" + list + "</ul></article>";
      } else {
        cards += '<article class="ac-card"><h3>' + card.title + "</h3><p>" + card.text + "</p></article>";
      }
    }

    return '<h2>' + CONTENT_MAP.sectionTitles.format + '</h2><div class="ac-grid ac-grid--3">' + cards + "</div>";
  }

  function renderAiSectionMarkup() {
    var statCards =
      '<article class="ac-card ac-ai-stat-card"><div class="ac-ai-big">' +
      CONTENT_MAP.aiStats[0].value +
      '</div><div class="ac-ai-label">' +
      CONTENT_MAP.aiStats[0].label +
      '</div><p>' +
      CONTENT_MAP.aiStats[0].text +
      "</p></article>";

    var mini = "";
    for (var i = 1; i < CONTENT_MAP.aiStats.length; i += 1) {
      mini +=
        '<div class="ac-ai-mini"><div class="ac-ai-mini__value">' +
        CONTENT_MAP.aiStats[i].value +
        '</div><div class="ac-ai-mini__label">' +
        CONTENT_MAP.aiStats[i].label +
        "</div></div>";
    }

    statCards += '<article class="ac-card ac-ai-mini-grid">' + mini + "</article>";

    var copy = "";
    for (var j = 0; j < CONTENT_MAP.aiCopy.length; j += 1) {
      copy += "<p>" + CONTENT_MAP.aiCopy[j] + "</p>";
    }

    statCards += '<article class="ac-card ac-ai-copy">' + copy + "</article>";

    return '<h2>' + CONTENT_MAP.sectionTitles.ai + '</h2><div class="ac-grid ac-grid--3">' + statCards + "</div>";
  }

  function renderLocationSectionMarkup() {
    var whereList = "";
    for (var i = 0; i < CONTENT_MAP.location.where.length; i += 1) {
      whereList += "<p>" + CONTENT_MAP.location.where[i] + "</p>";
    }

    var nearby = "";
    for (var j = 0; j < CONTENT_MAP.location.nearby.length; j += 1) {
      nearby += "<p>" + CONTENT_MAP.location.nearby[j] + "</p>";
    }

    return (
      '<h2>' +
      CONTENT_MAP.sectionTitles.location +
      '</h2><div class="ac-grid ac-grid--3">' +
      '<article class="ac-card"><h3>' + CONTENT_MAP.ui.locationWhereTitle + "</h3>" +
      whereList +
      "</article>" +
      '<article class="ac-card ac-card--map"><iframe class="ac-map-frame" loading="lazy" src="' +
      CONTENT_MAP.location.mapUrl +
      '" title="map frame"></iframe></article>' +
      '<article class="ac-card"><h3>' + CONTENT_MAP.ui.locationNearbyTitle + "</h3>" +
      nearby +
      "</article></div>"
    );
  }

  function renderPhotosSectionMarkup() {
    var categories = "";
    for (var i = 0; i < CONTENT_MAP.photoCategories.length; i += 1) {
      var category = CONTENT_MAP.photoCategories[i];
      categories +=
        '<button class="ac-filter-chip' +
        (state.photoCategory === category.id ? " is-active" : "") +
        '" type="button" data-action="photo-cat" data-photo-cat="' +
        category.id +
        '">' +
        category.label +
        "</button>";
    }

    var photos = getFilteredPhotos();
    var start = state.photoPage * 4;
    var pageItems = photos.slice(start, start + 4);
    var maxPage = Math.max(0, Math.ceil(photos.length / 4) - 1);

    var images = "";
    for (var j = 0; j < pageItems.length; j += 1) {
      images +=
        '<button class="ac-photo-thumb" type="button" data-action="photo-open" data-photo-index="' +
        String(start + j) +
        '" aria-label="Открыть фото">' +
        '<img src="' +
        pageItems[j].src +
        '" alt="' +
        pageItems[j].alt +
        '">' +
        "</button>";
    }

    return (
      '<h2>' +
      CONTENT_MAP.sectionTitles.photos +
      '</h2><div class="ac-media-toolbar ac-media-toolbar--filters">' +
      categories +
      '</div><div class="ac-media-row">' +
      '<button class="ac-nav-btn" type="button" data-action="photo-prev" ' +
      (state.photoPage <= 0 ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.prev +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronLeft +
      '" alt="" aria-hidden="true"></button>' +
      '<div class="ac-photo-strip">' +
      images +
      '</div>' +
      '<button class="ac-nav-btn" type="button" data-action="photo-next" ' +
      (state.photoPage >= maxPage ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.next +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronRight +
      '" alt="" aria-hidden="true"></button></div>'
    );
  }

  function rutubeVideoId(url) {
    var match = String(url || "").match(/rutube\.ru\/(?:video|shorts)\/([a-z0-9]+)/i);
    return match ? match[1] : "";
  }

  function rutubeEmbedUrl(url) {
    var id = rutubeVideoId(url);
    return id ? "https://rutube.ru/play/embed/" + id : "";
  }

  function renderVideosSectionMarkup() {
    var start = state.videoPage * 3;
    var items = CONTENT_MAP.videos.slice(start, start + 3);
    var maxPage = Math.max(0, Math.ceil(CONTENT_MAP.videos.length / 3) - 1);
    var cards = "";

    for (var i = 0; i < items.length; i += 1) {
      var embedUrl = rutubeEmbedUrl(items[i].url);
      var mediaMarkup = embedUrl
        ? '<iframe class="ac-video-card__frame" src="' +
          embedUrl +
          '" title="' +
          items[i].title +
          '" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>'
        : '<img class="ac-video-card__poster" src="' +
          items[i].poster +
          '" alt="' +
          items[i].title +
          '"><button class="ac-video-card__play" type="button" aria-label="' +
          CONTENT_MAP.ui.watchVideoLabel +
          '"><img class="ac-icon ac-icon--sm" src="' +
          ICON_MAP.play +
          '" alt="" aria-hidden="true"></button>';
      cards +=
        '<article class="ac-video-card">' +
        mediaMarkup +
        '<p class="ac-video-card__caption">' +
        items[i].title +
        "</p></article>";
    }

    return (
      '<h2>' +
      CONTENT_MAP.sectionTitles.video +
      '</h2><div class="ac-media-row">' +
      '<button class="ac-nav-btn" type="button" data-action="video-prev" ' +
      (state.videoPage <= 0 ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.prev +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronLeft +
      '" alt="" aria-hidden="true"></button><div class="ac-grid ac-grid--3 ac-video-grid">' +
      cards +
      '</div><button class="ac-nav-btn" type="button" data-action="video-next" ' +
      (state.videoPage >= maxPage ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.next +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronRight +
      '" alt="" aria-hidden="true"></button></div>'
    );
  }

  function renderReviewsSectionMarkup() {
    var start = state.reviewPage * 4;
    var items = CONTENT_MAP.reviews.slice(start, start + 4);
    var maxPage = Math.max(0, Math.ceil(CONTENT_MAP.reviews.length / 4) - 1);
    var cards = "";

    for (var i = 0; i < items.length; i += 1) {
      cards +=
        '<article class="ac-card ac-review-card ac-card--team"><img class="ac-review-card__avatar" src="' +
        items[i].avatar +
        '" alt="' +
        items[i].name +
        '"><p class="ac-review-card__quote">“' +
        items[i].quote +
        '”</p><div class="ac-review-card__name">' +
        items[i].name +
        '</div><div class="ac-review-card__meta">' +
        items[i].meta +
        '</div><div class="ac-review-card__stars">★★★★★</div></article>';
    }

    return (
      '<h2>' +
      CONTENT_MAP.sectionTitles.reviews +
      '</h2><div class="ac-media-row">' +
      '<button class="ac-nav-btn" type="button" data-action="reviews-prev" ' +
      (state.reviewPage <= 0 ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.prev +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronLeft +
      '" alt="" aria-hidden="true"></button><div class="ac-grid ac-grid--4">' +
      cards +
      '</div><button class="ac-nav-btn" type="button" data-action="reviews-next" ' +
      (state.reviewPage >= maxPage ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.next +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronRight +
      '" alt="" aria-hidden="true"></button></div>'
    );
  }

  function renderTeamSectionMarkup() {
    var start = state.teamPage * 4;
    var items = CONTENT_MAP.team.slice(start, start + 4);
    var maxPage = Math.max(0, Math.ceil(CONTENT_MAP.team.length / 4) - 1);
    var cards = "";

    for (var i = 0; i < items.length; i += 1) {
      cards +=
        '<article class="ac-card ac-team-card"><img class="ac-team-card__avatar" src="' +
        items[i].avatar +
        '" alt="' +
        items[i].name +
        '"><h3>' +
        items[i].name +
        '</h3><p class="ac-team-card__role">' +
        items[i].role +
        '</p><p>' +
        items[i].bio +
        "</p></article>";
    }

    return (
      '<h2>' +
      CONTENT_MAP.sectionTitles.team +
      '</h2><div class="ac-media-row">' +
      '<button class="ac-nav-btn" type="button" data-action="team-prev" ' +
      (state.teamPage <= 0 ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.prev +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronLeft +
      '" alt="" aria-hidden="true"></button><div class="ac-grid ac-grid--4">' +
      cards +
      '</div><button class="ac-nav-btn" type="button" data-action="team-next" ' +
      (state.teamPage >= maxPage ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.next +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronRight +
      '" alt="" aria-hidden="true"></button></div>'
    );
  }

  function renderFaqSectionMarkup() {
    var tabs = "";
    for (var i = 0; i < CONTENT_MAP.faqTabs.length; i += 1) {
      var tab = CONTENT_MAP.faqTabs[i];
      tabs +=
        '<button class="ac-filter-chip' +
        (state.faqCategory === tab.id ? " is-active" : "") +
        '" type="button" data-action="faq-cat" data-faq-cat="' +
        tab.id +
        '">' +
        tab.label +
        "</button>";
    }

    var items = CONTENT_MAP.faqItems[state.faqCategory] || CONTENT_MAP.faqItems.medicine;
    var list = "";
    for (var j = 0; j < items.length; j += 1) {
      list += '<details class="ac-faq-item"><summary>' + items[j] + "</summary></details>";
    }

    return (
      '<h2>' +
      CONTENT_MAP.sectionTitles.faq +
      '</h2><div class="ac-media-toolbar ac-media-toolbar--filters">' +
      tabs +
      '</div><div class="ac-faq-list">' +
      list +
      "</div>"
    );
  }

  function renderContentSections() {
    var program = document.getElementById("acSectionProgram");
    var format = document.getElementById("acSectionFormat");
    var ai = document.getElementById("acSectionAi");
    var location = document.getElementById("acSectionLocation");
    var photos = document.getElementById("acSectionPhotos");
    var video = document.getElementById("acSectionVideo");
    var reviews = document.getElementById("acSectionReviews");
    var team = document.getElementById("acSectionTeam");
    var faq = document.getElementById("acSectionFaq");

    if (program) program.innerHTML = renderProgramSectionMarkup();
    if (format) format.innerHTML = renderFormatSectionMarkup();
    if (ai) ai.innerHTML = renderAiSectionMarkup();
    if (location) location.innerHTML = renderLocationSectionMarkup();
    if (photos) photos.innerHTML = renderPhotosSectionMarkup();
    if (video) video.innerHTML = renderVideosSectionMarkup();
    if (reviews) reviews.innerHTML = renderReviewsSectionMarkup();
    if (team) team.innerHTML = renderTeamSectionMarkup();
    if (faq) faq.innerHTML = renderFaqSectionMarkup();
  }

  function renderSections() {
    renderContentSections();

    var sections = document.querySelectorAll(".ac-section");
    for (var i = 0; i < sections.length; i += 1) {
      sections[i].classList.remove("ac-section--focus");
    }

    var targetId = TAB_TO_SECTION[state.activeTab];
    if (!targetId) return;

    var targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add("ac-section--focus");
    }
  }

  function renderFooter() {
    var brand = document.getElementById("acFooterBrand");
    var tagline = document.getElementById("acFooterTagline");

    if (brand) {
      brand.textContent = CONTENT_MAP.footer.brand;
    }
    if (tagline) {
      tagline.textContent = CONTENT_MAP.footer.tagline;
    }
  }

  function renderStaticLabels() {
    var techBadge = document.getElementById("acTechBadge");
    if (techBadge) {
      var dismissed = false;
      try {
        dismissed = localStorage.getItem(TECH_BADGE_DISMISSED_KEY) === "1";
      } catch (_errDismiss) {
        dismissed = false;
      }

      var now = new Date();
      var hh = String(now.getHours()).padStart(2, "0");
      var mm = String(now.getMinutes()).padStart(2, "0");
      var timeLabel = hh + ":" + mm;

      techBadge.innerHTML =
        '<span class="ac-tech-badge__text">' +
        BUILD_TAG +
        " · " +
        timeLabel +
        "</span>" +
        '<button class="ac-tech-badge__close" type="button" data-action="tech-badge-close" aria-label="Скрыть метку сборки">' +
        '<img class="ac-icon ac-icon--sm" src="' +
        ICON_MAP.close +
        '" alt="" aria-hidden="true">' +
        "</button>";
      techBadge.hidden = dismissed;
    }

    var assignments = [
      ["acBrandSub", CONTENT_MAP.ui.brandSub],
      ["acAgeLabel", CONTENT_MAP.ui.ageLabel],
      ["acHeroContactLabel", CONTENT_MAP.ui.heroContactLabel],
      ["acHeroCampaignLabel", CONTENT_MAP.ui.heroCampaignLabel],
      ["acHeroOverlayTitle", CONTENT_MAP.ui.heroOverlayTitle],
      ["acHeroSafetyMedTitle", CONTENT_MAP.ui.heroSafetyMedTitle],
      ["acHeroSafetyMedDesc", CONTENT_MAP.ui.heroSafetyMedDesc],
      ["acHeroSafetyLockTitle", CONTENT_MAP.ui.heroSafetyLockTitle],
      ["acHeroSafetyLockDesc", CONTENT_MAP.ui.heroSafetyLockDesc],
      ["acHeroSafetyFoodTitle", CONTENT_MAP.ui.heroSafetyFoodTitle],
      ["acHeroSafetyFoodDesc", CONTENT_MAP.ui.heroSafetyFoodDesc],
      ["acHeroSafetyPoolTitle", CONTENT_MAP.ui.heroSafetyPoolTitle],
      ["acHeroSafetyPoolDesc", CONTENT_MAP.ui.heroSafetyPoolDesc]
    ];

    for (var i = 0; i < assignments.length; i += 1) {
      var element = document.getElementById(assignments[i][0]);
      if (element) {
        element.textContent = assignments[i][1];
      }
    }
  }

  function renderContactOverlay() {
    return (
      '<div class="ac-overlay-backdrop" data-action="overlay-backdrop">' +
      '<article class="ac-overlay-card" role="dialog" aria-modal="true" aria-label="' +
      CONTENT_MAP.ui.contactTitle +
      '">' +
      '<div class="ac-overlay-head">' +
      '<h3 class="ac-overlay-title">' +
      CONTENT_MAP.ui.contactTitle +
      '</h3>' +
      '<button class="ac-overlay-close" type="button" data-action="overlay-close" aria-label="' + CONTENT_MAP.ui.closeAria + '">' +
      '<img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.close +
      '" alt="" aria-hidden="true">' +
      "</button>" +
      "</div>" +
      '<p class="ac-overlay-meta">' + CONTENT_MAP.ui.contactMeta + "</p>" +
      '<details class="ac-contact-dropdown" open>' +
      '<summary>Каналы связи</summary>' +
      '<div class="ac-contact-list">' +
      '<a class="ac-contact-item" href="tel:+74951234567"><span class="ac-contact-item__dot">•</span><span><strong>Городской телефон</strong><small>+7 (495) 123-45-67</small></span></a>' +
      '<a class="ac-contact-item" href="tel:+79688086455"><span class="ac-contact-item__dot">•</span><span><strong>Мобильный телефон</strong><small>+7 (968) 808-64-55</small></span></a>' +
      '<a class="ac-contact-item" href="https://t.me/aidacodit" target="_blank" rel="noopener"><span class="ac-contact-item__dot">•</span><span><strong>Telegram</strong><small>@aidacodit</small></span></a>' +
      '<a class="ac-contact-item" href="https://wa.me/79688086455" target="_blank" rel="noopener"><span class="ac-contact-item__dot">•</span><span><strong>WhatsApp</strong><small>Написать в WhatsApp</small></span></a>' +
      "</div>" +
      "</details>" +
      '<div class="ac-overlay-actions"><button class="ac-btn-soft" type="button" data-action="overlay-close">' +
      CONTENT_MAP.ui.close +
      "</button></div>" +
      "</article>" +
      "</div>"
    );
  }

  function renderShiftOverlay() {
    var filtered = [];

    for (var i = 0; i < SHIFTS.length; i += 1) {
      if (state.direction === SHIFTS[i].direction || state.direction === "all") {
        filtered.push(SHIFTS[i]);
      }
    }

    if (!filtered.length) {
      filtered = SHIFTS.slice();
    }

    var directionHtml =
      '<button class="ac-direction-btn' +
      (state.direction === "all" ? " is-active" : "") +
      '" type="button" data-action="set-direction" data-direction="all">' +
      CONTENT_MAP.ui.all +
      "</button>";

    for (var j = 0; j < DIRECTIONS.length; j += 1) {
      var direction = DIRECTIONS[j];
      directionHtml +=
        '<button class="ac-direction-btn' +
        (state.direction === direction.id ? " is-active" : "") +
        '" type="button" data-action="set-direction" data-direction="' +
        direction.id +
        '">' +
        direction.label +
        "</button>";
    }

    var listHtml = "";
    for (var k = 0; k < filtered.length; k += 1) {
      var shift = filtered[k];
      listHtml +=
        '<button class="ac-shift-item' +
        (state.selectedShiftId === shift.id ? " is-active" : "") +
        '" type="button" data-action="select-shift" data-shift-id="' +
        shift.id +
        '">' +
        '<div><div class="ac-shift-item__name">' +
        shift.line +
        '</div><div class="ac-shift-item__meta">' +
        shift.summary +
        "</div></div>" +
        '<div class="ac-shift-item__price">' + CONTENT_MAP.ui.shiftPriceFrom + "</div>" +
        "</button>";
    }

    var listClass = state.shiftView === "grid" ? " ac-shift-list--grid" : "";

    return (
      '<div class="ac-overlay-backdrop" data-action="overlay-backdrop">' +
      '<article class="ac-overlay-card" role="dialog" aria-modal="true" aria-label="' +
      CONTENT_MAP.ui.shiftsTitle +
      '">' +
      '<div class="ac-overlay-head">' +
      '<h3 class="ac-overlay-title">' +
      CONTENT_MAP.ui.shiftsTitle +
      '</h3>' +
      '<button class="ac-overlay-close" type="button" data-action="overlay-close" aria-label="' + CONTENT_MAP.ui.closeAria + '">' +
      '<img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.close +
      '" alt="" aria-hidden="true">' +
      "</button>" +
      "</div>" +
      '<div class="ac-direction-row">' +
      directionHtml +
      "</div>" +
      '<div class="ac-shift-toolbar">' +
      '<div class="ac-overlay-meta">' +
      CONTENT_MAP.ui.shiftsMeta +
      '</div>' +
      '<button class="ac-shift-toggle" type="button" data-action="set-shift-view" data-shift-view="' +
      (state.shiftView === "list" ? "grid" : "list") +
      '">' +
      (state.shiftView === "list" ? CONTENT_MAP.ui.grid : CONTENT_MAP.ui.list) +
      "</button>" +
      "</div>" +
      '<div class="ac-shift-list' +
      listClass +
      '">' +
      listHtml +
      "</div>" +
      '<div class="ac-overlay-actions"><button class="ac-primary-btn" type="button" data-action="overlay-close">' +
      CONTENT_MAP.ui.confirm +
      "</button></div>" +
      "</article>" +
      "</div>"
    );
  }

  function renderPhotoOverlay() {
    var photos = getFilteredPhotos();
    if (!photos.length) {
      return "";
    }
    var current = clamp(state.photoLightboxIndex, 0, photos.length - 1);
    var item = photos[current];
    var disablePrev = current <= 0;
    var disableNext = current >= photos.length - 1;

    return (
      '<div class="ac-overlay-backdrop" data-action="overlay-backdrop">' +
      '<article class="ac-overlay-card ac-overlay-card--photo" role="dialog" aria-modal="true" aria-label="Просмотр фото">' +
      '<div class="ac-overlay-head">' +
      '<h3 class="ac-overlay-title">' + CONTENT_MAP.sectionTitles.photos + "</h3>" +
      '<button class="ac-overlay-close" type="button" data-action="overlay-close" aria-label="' +
      CONTENT_MAP.ui.closeAria +
      '">' +
      '<img class="ac-icon ac-icon--sm" src="' + ICON_MAP.close + '" alt="" aria-hidden="true">' +
      "</button>" +
      "</div>" +
      '<div class="ac-photo-lightbox">' +
      '<button class="ac-nav-btn" type="button" data-action="photo-lightbox-prev" ' +
      (disablePrev ? "disabled" : "") +
      ' aria-label="' + CONTENT_MAP.ui.prev + '">' +
      '<img class="ac-icon ac-icon--sm" src="' + ICON_MAP.chevronLeft + '" alt="" aria-hidden="true"></button>' +
      '<img class="ac-photo-lightbox__image" src="' + item.src + '" alt="' + item.alt + '">' +
      '<button class="ac-nav-btn" type="button" data-action="photo-lightbox-next" ' +
      (disableNext ? "disabled" : "") +
      ' aria-label="' + CONTENT_MAP.ui.next + '">' +
      '<img class="ac-icon ac-icon--sm" src="' + ICON_MAP.chevronRight + '" alt="" aria-hidden="true"></button>' +
      "</div>" +
      "</article>" +
      "</div>"
    );
  }

  function renderOverlays() {
    var overlayRoot = document.getElementById("acOverlayRoot");
    if (!overlayRoot) return;

    if (state.photoLightboxIndex >= 0) {
      overlayRoot.style.pointerEvents = "auto";
      overlayRoot.innerHTML = renderPhotoOverlay();
      return;
    }

    if (state.overlays.contact) {
      overlayRoot.style.pointerEvents = "auto";
      overlayRoot.innerHTML = renderContactOverlay();
      return;
    }

    if (state.overlays.shifts) {
      overlayRoot.style.pointerEvents = "auto";
      overlayRoot.innerHTML = renderShiftOverlay();
      return;
    }

    overlayRoot.style.pointerEvents = "none";
    overlayRoot.innerHTML = "";
  }

  function openTabTarget(tabElement) {
    var href = tabElement.getAttribute("href");
    if (!href || href.charAt(0) !== "#") return;
    if (state.mode !== "full") return;

    var target = document.querySelector(href);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleClick(event) {
    var techBadgeClose = event.target.closest('[data-action="tech-badge-close"]');
    if (techBadgeClose) {
      var techBadge = document.getElementById("acTechBadge");
      if (techBadge) {
        techBadge.hidden = true;
      }
      try {
        localStorage.setItem(TECH_BADGE_DISMISSED_KEY, "1");
      } catch (_errTechBadge) {
        // ignore storage errors
      }
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (auditRuntime.active && !auditRuntime.allowUiActions) {
      var inAuditControls = event.target.closest(".ac-audit-panel, .ac-audit-control-panel, .ac-audit-stage-panel");
      var auditBadge = event.target.closest(".ac-audit-badge");
      var inTopAuditControl = event.target.closest("#acAuditToggle");
      if (auditBadge || (!inAuditControls && !inTopAuditControl)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }

    if (auditRuntime.active && auditRuntime.allowUiActions && auditRuntime.lockUntilAge && !auditRuntime.ageSelected) {
      var inAuditPanels = event.target.closest(".ac-audit-panel, .ac-audit-control-panel, .ac-audit-stage-panel");
      if (!inAuditPanels) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }

    if (isAgeGateLocked()) {
      var inAgeInput = event.target.closest("#acAgeInput, .ac-age-input");
      var inAuditPanelsForGate = event.target.closest(".ac-audit-panel, .ac-audit-control-panel, .ac-audit-stage-panel");
      if (!inAgeInput && !inAuditPanelsForGate) {
        event.preventDefault();
        event.stopPropagation();
        nudgeAgeSelection();
        return;
      }
    }

    var toggle = event.target.closest('[data-action="toggle-mode"]');
    if (toggle) {
      setMode(state.mode === "full" ? "compact" : "full");
      return;
    }

    var tab = event.target.closest('[data-action="tab"]');
    if (tab) {
      event.preventDefault();
      setActiveTab(tab.dataset.tab || "info");
      openTabTarget(tab);
      return;
    }

    var contactButton = event.target.closest('[data-action="open-contact"]');
    if (contactButton) {
      setOverlay("contact", true);
      return;
    }

    var prevStep = event.target.closest('[data-action="step-prev"]');
    if (prevStep) {
      setStep(state.step - 1);
      return;
    }

    var nextStep = event.target.closest('[data-action="step-next"]');
    if (nextStep) {
      if (state.step >= SHIFTS.length - 1) {
        if (state.overlays.shifts) {
          return;
        }

        track("booking_clicked", {
          step: state.step + 1,
          shift_id: state.selectedShiftId,
          direction: state.direction
        });
        setOverlay("shifts", true);
      } else {
        setStep(state.step + 1);
      }
      return;
    }

    var closeOverlay = event.target.closest('[data-action="overlay-close"]');
    if (closeOverlay) {
      closeAllOverlays();
      return;
    }

    var backdrop = event.target.closest('[data-action="overlay-backdrop"]');
    if (backdrop && event.target === backdrop) {
      closeAllOverlays();
      return;
    }

    var directionButton = event.target.closest('[data-action="set-direction"]');
    if (directionButton) {
      setDirection(directionButton.dataset.direction || "all");
      return;
    }

    var shiftViewButton = event.target.closest('[data-action="set-shift-view"]');
    if (shiftViewButton) {
      setShiftView(shiftViewButton.dataset.shiftView || "list");
      return;
    }

    var shiftButton = event.target.closest('[data-action="select-shift"]');
    if (shiftButton) {
      setSelectedShift(shiftButton.dataset.shiftId || SHIFTS[0].id);
      return;
    }

    var photoCategoryButton = event.target.closest('[data-action="photo-cat"]');
    if (photoCategoryButton) {
      setPhotoCategory(photoCategoryButton.dataset.photoCat || "all");
      return;
    }

    if (event.target.closest('[data-action="photo-prev"]')) {
      setPhotoPage(state.photoPage - 1);
      return;
    }

    if (event.target.closest('[data-action="photo-next"]')) {
      setPhotoPage(state.photoPage + 1);
      return;
    }

    var photoOpen = event.target.closest('[data-action="photo-open"]');
    if (photoOpen) {
      setPhotoLightbox(Number(photoOpen.dataset.photoIndex || 0));
      return;
    }

    if (event.target.closest('[data-action="photo-lightbox-prev"]')) {
      setPhotoLightbox(state.photoLightboxIndex - 1);
      return;
    }

    if (event.target.closest('[data-action="photo-lightbox-next"]')) {
      setPhotoLightbox(state.photoLightboxIndex + 1);
      return;
    }

    if (event.target.closest('[data-action="video-prev"]')) {
      setVideoPage(state.videoPage - 1);
      return;
    }

    if (event.target.closest('[data-action="video-next"]')) {
      setVideoPage(state.videoPage + 1);
      return;
    }

    if (event.target.closest('[data-action="reviews-prev"]')) {
      setReviewPage(state.reviewPage - 1);
      return;
    }

    if (event.target.closest('[data-action="reviews-next"]')) {
      setReviewPage(state.reviewPage + 1);
      return;
    }

    if (event.target.closest('[data-action="team-prev"]')) {
      setTeamPage(state.teamPage - 1);
      return;
    }

    if (event.target.closest('[data-action="team-next"]')) {
      setTeamPage(state.teamPage + 1);
      return;
    }

    var faqCategory = event.target.closest('[data-action="faq-cat"]');
    if (faqCategory) {
      setFaqCategory(faqCategory.dataset.faqCat || "medicine");
    }
  }

  function handleInput(event) {
    if (auditRuntime.active && !auditRuntime.allowUiActions) {
      var inAuditControls = event.target.closest(".ac-audit-panel, .ac-audit-control-panel, .ac-audit-stage-panel");
      if (!inAuditControls) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }

    var ageInput = event.target.closest("#acAgeInput");
    if (!ageInput) return;

    setAge(sliderValueToAge(Number(ageInput.value)));
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeAllOverlays();
    }
  }

  function setupAuditToggleButton() {
    var existing = document.getElementById("acAuditToggle");
    if (existing) return;

    var button = document.createElement("button");
    button.id = "acAuditToggle";
    button.className = "ac-audit-toggle-btn";
    button.type = "button";
    button.setAttribute("aria-label", "Переключить audit режим");

    var isAudit = false;
    try {
      isAudit = (window.location.search || "").indexOf("audit=1") !== -1;
    } catch (_err) {
      isAudit = false;
    }

    button.textContent = isAudit ? "Audit OFF" : "Audit ON";

    button.addEventListener("click", function () {
      var url;
      try {
        url = new URL(window.location.href);
      } catch (_err) {
        return;
      }

      if (url.searchParams.get("audit") === "1") {
        url.searchParams.delete("audit");
      } else {
        url.searchParams.set("audit", "1");
      }

      window.location.href = url.toString();
    });

    document.body.appendChild(button);
  }

  function enableAuditMode() {
    var search = "";
    try {
      search = window.location.search || "";
    } catch (_err) {
      return;
    }

    if (search.indexOf("audit=1") === -1) return;

    var auditGroups = [
      { id: "topnav", label: "TopNav" },
      { id: "hero", label: "Hero" },
      { id: "funnel", label: "Funnel" },
      { id: "program", label: "Программа" },
      { id: "format", label: "Формат" },
      { id: "ai", label: "AI" },
      { id: "location", label: "Локация" },
      { id: "photos", label: "Фото" },
      { id: "video", label: "Видео" },
      { id: "reviews", label: "Отзывы" },
      { id: "team", label: "Команда" },
      { id: "faq", label: "FAQ" },
      { id: "footer", label: "Footer" }
    ];

    var auditTargets = [
      { group: "topnav", selector: "#acViewToggle", label: "Toggle: Режим кратко/подробно" },
      { group: "topnav", selector: "#acTopNav", label: "TopNav: контейнер" },
      { group: "topnav", selector: "#acTopNav [data-action='tab']", label: "TopNav: пункт меню", all: true },

      { group: "hero", selector: ".ac-compact-nav", label: "Hero: компактное меню" },
      { group: "hero", selector: ".ac-compact-nav [data-action='tab']", label: "Hero: иконка меню", all: true },
      { group: "hero", selector: ".ac-hero-left", label: "Hero Left: контейнер" },
      { group: "hero", selector: "#acHeroTitle", label: "Hero Left: главный заголовок" },
      { group: "hero", selector: "#acHeroSubtitle", label: "Hero Left: подзаголовок" },
      { group: "hero", selector: "#acHeroProgress", label: "Hero Left: прогресс" },
      { group: "hero", selector: "#acHeroBenefits li", label: "Hero Left: пункт преимуществ", all: true },
      { group: "hero", selector: "#acAgeLabel", label: "Hero Left: лейбл возраста" },
      { group: "hero", selector: "#acAgeText", label: "Hero Left: текст возраста" },
      { group: "hero", selector: ".ac-age-bar", label: "Hero Left: контейнер слайдера" },
      { group: "hero", selector: "#acAgeInput", label: "Hero Left: возраст слайдер" },
      { group: "hero", selector: ".ac-age-marks", label: "Hero Left: шкала возрастов" },
      { group: "hero", selector: ".ac-social-row a", label: "Hero Left: соцкнопка", all: true },
      { group: "hero", selector: ".ac-hero-right", label: "Hero Right: контейнер" },
      { group: "hero", selector: ".ac-hero-pill--left", label: "Hero Right: кнопка Связаться" },
      { group: "hero", selector: ".ac-hero-pill--right", label: "Hero Right: плашка AI-программы" },

      { group: "funnel", selector: ".ac-hero-overlay", label: "Funnel: контейнер" },
      { group: "funnel", selector: ".ac-hero-right__bg", label: "Funnel: слой фона" },
      { group: "funnel", selector: ".ac-hero-right__scrim", label: "Funnel: слой затемнения" },
      { group: "funnel", selector: ".ac-funnel-body", label: "Funnel: слой контента" },
      { group: "funnel", selector: ".ac-hero-grid", label: "Funnel: слой сетки" },
      { group: "funnel", selector: ".ac-funnel-controls", label: "Funnel: слой контролов" },
      { group: "funnel", selector: "#acHeroOverlayTitle", label: "Funnel: заголовок" },
      { group: "funnel", selector: "#acProgramLine", label: "Funnel: строка программы" },
      { group: "funnel", selector: "#acProgramSummary", label: "Funnel: описание" },
      { group: "funnel", selector: ".ac-hero-grid__item", label: "Funnel: карточка безопасности", all: true },
      { group: "funnel", selector: ".ac-funnel-controls [data-action='step-prev']", label: "Funnel: кнопка назад" },
      { group: "funnel", selector: "#acStepStatus", label: "Funnel: статус шага" },
      { group: "funnel", selector: ".ac-funnel-controls [data-action='step-next']", label: "Funnel: кнопка далее/цены" },

      { group: "program", selector: "#program", label: "Программа: секция" },
      { group: "program", selector: "#program h2", label: "Программа: заголовок" },
      { group: "program", selector: "#program .ac-card", label: "Программа: карточка", all: true },

      { group: "format", selector: "#format", label: "Формат: секция" },
      { group: "format", selector: "#format h2", label: "Формат: заголовок" },
      { group: "format", selector: "#format .ac-card", label: "Формат: карточка", all: true },

      { group: "ai", selector: "#ai", label: "AI: секция" },
      { group: "ai", selector: "#ai h2", label: "AI: заголовок" },
      { group: "ai", selector: "#ai .ac-card", label: "AI: карточка", all: true },

      { group: "location", selector: "#location", label: "Локация: секция" },
      { group: "location", selector: "#location h2", label: "Локация: заголовок" },
      { group: "location", selector: "#location .ac-card", label: "Локация: карточка", all: true },

      { group: "photos", selector: "#photos", label: "Фото: секция" },
      { group: "photos", selector: "#photos h2", label: "Фото: заголовок" },
      { group: "photos", selector: "#photos .ac-filter-chip", label: "Фото: фильтр", all: true },
      { group: "photos", selector: "#photos [data-action='photo-prev'], #photos [data-action='photo-next']", label: "Фото: навигация", all: true },
      { group: "photos", selector: "#photos .ac-photo-strip img", label: "Фото: изображение", all: true },

      { group: "video", selector: "#video", label: "Видео: секция" },
      { group: "video", selector: "#video h2", label: "Видео: заголовок" },
      { group: "video", selector: "#video .ac-video-card", label: "Видео: карточка", all: true },
      { group: "video", selector: "#video [data-action='video-prev'], #video [data-action='video-next']", label: "Видео: навигация", all: true },

      { group: "reviews", selector: "#reviews", label: "Отзывы: секция" },
      { group: "reviews", selector: "#reviews h2", label: "Отзывы: заголовок" },
      { group: "reviews", selector: "#reviews .ac-review-card", label: "Отзывы: карточка", all: true },
      { group: "reviews", selector: "#reviews [data-action='reviews-prev'], #reviews [data-action='reviews-next']", label: "Отзывы: навигация", all: true },

      { group: "team", selector: "#team", label: "Команда: секция" },
      { group: "team", selector: "#team h2", label: "Команда: заголовок" },
      { group: "team", selector: "#team .ac-team-card", label: "Команда: карточка", all: true },
      { group: "team", selector: "#team [data-action='team-prev'], #team [data-action='team-next']", label: "Команда: навигация", all: true },

      { group: "faq", selector: "#faq", label: "FAQ: секция" },
      { group: "faq", selector: "#faq h2", label: "FAQ: заголовок" },
      { group: "faq", selector: "#faq .ac-faq-tab", label: "FAQ: таб", all: true },
      { group: "faq", selector: "#faq .ac-faq-item", label: "FAQ: пункт", all: true },

      { group: "footer", selector: ".ac-footer", label: "Footer: контейнер" },
      { group: "footer", selector: "#acFooterBrand, #acFooterTagline", label: "Footer: текст", all: true }
    ];

    var nodes = [];
    var order = 1;

    for (var i = 0; i < auditTargets.length; i += 1) {
      var target = auditTargets[i];
        if (target.all) {
          var many = document.querySelectorAll(target.selector);
          for (var k = 0; k < many.length; k += 1) {
            var elMany = many[k];
            if (!elMany) continue;
            elMany.classList.add("ac-audit-target");
            var posMany = "";
            try {
              posMany = window.getComputedStyle(elMany).position || "";
            } catch (_errPosMany) {
              posMany = "";
            }
            if (posMany === "static" || !posMany) {
              elMany.classList.add("ac-audit-target--relative");
            }
            elMany.setAttribute("data-audit-index", String(order));
            elMany.setAttribute("data-audit-label", target.label + " #" + String(k + 1));
            elMany.setAttribute("data-audit-group", target.group);
          elMany.style.setProperty("--ac-audit-badge-x", String(3 + ((order - 1) % 3) * 24) + "px");
          elMany.style.setProperty("--ac-audit-badge-y", String(3 + Math.floor(((order - 1) % 6) / 3) * 24) + "px");
          var badgeMany = document.createElement("button");
          badgeMany.type = "button";
          badgeMany.className = "ac-audit-badge";
          badgeMany.setAttribute("aria-label", "Блок " + String(order));
          badgeMany.textContent = String(order);
          elMany.appendChild(badgeMany);
          nodes.push({
            index: order,
            label: target.label + " #" + String(k + 1),
            group: target.group,
            node: elMany,
            badge: badgeMany
          });
          order += 1;
        }
      } else {
        var el = document.querySelector(target.selector);
        if (!el) continue;
        el.classList.add("ac-audit-target");
        var pos = "";
        try {
          pos = window.getComputedStyle(el).position || "";
        } catch (_errPos) {
          pos = "";
        }
        if (pos === "static" || !pos) {
          el.classList.add("ac-audit-target--relative");
        }
        el.setAttribute("data-audit-index", String(order));
        el.setAttribute("data-audit-label", target.label);
        el.setAttribute("data-audit-group", target.group);
        el.style.setProperty("--ac-audit-badge-x", String(3 + ((order - 1) % 3) * 24) + "px");
        el.style.setProperty("--ac-audit-badge-y", String(3 + Math.floor(((order - 1) % 6) / 3) * 24) + "px");
        if (target.selector === ".ac-age-bar") {
          el.style.setProperty("--ac-audit-badge-x", "6px");
          el.style.setProperty("--ac-audit-badge-y", "-12px");
        }
        if (target.selector === "#acAgeInput") {
          el.style.setProperty("--ac-audit-badge-x", "2px");
          el.style.setProperty("--ac-audit-badge-y", "-18px");
        }
        var badge = document.createElement("button");
        badge.type = "button";
        badge.className = "ac-audit-badge";
        badge.setAttribute("aria-label", "Блок " + String(order));
        badge.textContent = String(order);
        el.appendChild(badge);
        nodes.push({
          index: order,
          label: target.label,
          group: target.group,
          node: el,
          badge: badge
        });
        order += 1;
      }
    }

    for (var c = 0; c < nodes.length; c += 1) {
      var maybeContainer = nodes[c].node;
      var descendants = maybeContainer.querySelectorAll(".ac-audit-target");
      var hasNestedTargets = false;
      for (var d = 0; d < descendants.length; d += 1) {
        if (descendants[d] !== maybeContainer) {
          hasNestedTargets = true;
          break;
        }
      }
      if (hasNestedTargets) {
        maybeContainer.classList.add("ac-audit-target--container");
      }
    }

    document.body.classList.add("ac-audit-mode");
    auditRuntime.active = true;
    auditRuntime.allowUiActions = false;
    auditRuntime.allowDrag = true;
    auditRuntime.snapGrid = 4;
    auditRuntime.normalizeToParent = true;
    auditRuntime.lockUntilAge = true;
    auditRuntime.ageSelected = false;

    var panel = document.createElement("aside");
    panel.className = "ac-audit-panel";
    panel.innerHTML =
      '<div class="ac-audit-panel__toolbar">' +
      '<div class="ac-audit-panel__head">Hero Audit Map</div>' +
      '<button class="ac-audit-panel__toggle" type="button" aria-label="Сбросить позиции блоков" data-action="audit-reset-pos">Сброс</button>' +
      '<button class="ac-audit-panel__toggle" type="button" aria-label="Развернуть панель" data-action="audit-toggle">Развернуть</button>' +
      "</div>" +
      '<div class="ac-audit-panel__sub">Глобальная нумерация всех значимых блоков сайта</div>' +
      '<div class="ac-audit-groups"></div>' +
      '<ol class="ac-audit-panel__list"></ol>';

    var controlPanel = document.createElement("aside");
    controlPanel.className = "ac-audit-control-panel";
    controlPanel.innerHTML =
      '<div class="ac-audit-control-panel__toolbar">' +
      '<div class="ac-audit-control-panel__head">Audit Actions</div>' +
      '<button class="ac-audit-panel__toggle" type="button" data-action="audit-control-toggle" aria-label="Развернуть панель действий">Развернуть</button>' +
      "</div>" +
      '<div class="ac-audit-control-panel__statuses">' +
      '<button class="ac-audit-status is-on" type="button" data-action="audit-ui-toggle">UI OFF</button>' +
      '<button class="ac-audit-status is-on" type="button" data-action="audit-drag-toggle">DRAG ON</button>' +
      '<button class="ac-audit-status is-on" type="button" data-action="audit-snap-toggle">SNAP 4PX</button>' +
      '<button class="ac-audit-status is-on" type="button" data-action="audit-normalize-toggle">NORM PARENT ON</button>' +
      '<button class="ac-audit-status" type="button" data-action="audit-apply-confirmed">APPLY CONFIRMED</button>' +
      '<button class="ac-audit-status" type="button" data-action="audit-log-clear">CLEAR LOG</button>' +
      "</div>" +
      '<div class="ac-audit-control-panel__sub">Перетащите бейдж блока, затем отметьте статус привязки.</div>' +
      '<ol class="ac-audit-control-panel__moved"></ol>' +
      '<pre class="ac-audit-control-panel__apply-log">Нет подтвержденных правок</pre>' +
      '<ol class="ac-audit-control-panel__journal"><li class="ac-audit-control-panel__empty">Журнал пуст</li></ol>';

    var stagePanel = document.createElement("aside");
    stagePanel.className = "ac-audit-stage-panel";
    stagePanel.innerHTML =
      '<div class="ac-audit-stage-panel__toolbar">' +
      '<div class="ac-audit-stage-panel__head">Site Stages</div>' +
      '<button class="ac-audit-panel__toggle" type="button" data-action="audit-stage-toggle" aria-label="Развернуть стадии">Развернуть</button>' +
      "</div>" +
      '<div class="ac-audit-stage-panel__statuses">' +
      '<button class="ac-audit-status is-on" type="button" data-action="audit-stage-lock-toggle">LOCK UNTIL AGE ON</button>' +
      '<button class="ac-audit-status" type="button" data-action="audit-stage-reset">RESET STAGES</button>' +
      "</div>" +
      '<ol class="ac-audit-stage-panel__list"></ol>';

    var groupsState = {};
    for (var g = 0; g < auditGroups.length; g += 1) {
      groupsState[auditGroups[g].id] = true;
    }

    var groupsWrap = panel.querySelector(".ac-audit-groups");
    if (groupsWrap) {
      var groupsHtml = "";
      groupsHtml += '<button class="ac-audit-group is-on" type="button" data-action="audit-group-all-on">Все ON</button>';
      groupsHtml += '<button class="ac-audit-group" type="button" data-action="audit-group-all-off">Все OFF</button>';
      for (var gg = 0; gg < auditGroups.length; gg += 1) {
        groupsHtml +=
          '<button class="ac-audit-group is-on" type="button" data-action="audit-group-toggle" data-group="' +
          auditGroups[gg].id +
          '">' +
          auditGroups[gg].label +
          "</button>";
      }
      groupsWrap.innerHTML = groupsHtml;
    }

    var list = panel.querySelector(".ac-audit-panel__list");
    if (list) {
      for (var j = 0; j < nodes.length; j += 1) {
        var item = nodes[j];
        var li = document.createElement("li");
        li.className = "ac-audit-panel__item";
        li.setAttribute("data-group", item.group);
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "ac-audit-jump";
        btn.setAttribute("data-index", String(item.index));
        btn.setAttribute("data-group", item.group);
        btn.textContent = String(item.index) + ". " + item.label;
        li.appendChild(btn);
        list.appendChild(li);
        item.listItem = li;
      }
    }

    var movedOrder = [];
    var movedMap = {};
    var statusFlow = ["draft", "aligned", "fixed"];
    var changeLog = [];

    function toPercent(value, total) {
      if (!total) return "0.00%";
      return (Math.round((value / total) * 10000) / 100).toFixed(2) + "%";
    }

    function readAnchor(item) {
      var rect = item.node.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var anchorX = centerX <= window.innerWidth / 2 ? "left" : "right";
      var anchorY = centerY <= window.innerHeight / 2 ? "top" : "bottom";
      var offsetX = anchorX === "left" ? rect.left : window.innerWidth - rect.right;
      var offsetY = anchorY === "top" ? rect.top : window.innerHeight - rect.bottom;
      return {
        anchorX: anchorX,
        anchorY: anchorY,
        offsetX: Math.round(offsetX),
        offsetY: Math.round(offsetY),
        normX: toPercent(offsetX, window.innerWidth),
        normY: toPercent(offsetY, window.innerHeight)
      };
    }

    function getNodeSelector(node) {
      if (!node) return "unknown";
      if (node.id) return "#" + node.id;
      if (node.classList && node.classList.length) return "." + node.classList[0];
      return String(node.tagName || "node").toLowerCase();
    }

    function readParentAnchor(item) {
      var nodeRect = item.node.getBoundingClientRect();
      var parent = item.node.parentElement;
      if (!parent) {
        return {
          parentSelector: "document",
          anchorX: "left",
          anchorY: "top",
          left: Math.round(nodeRect.left),
          top: Math.round(nodeRect.top),
          right: Math.round(window.innerWidth - nodeRect.right),
          bottom: Math.round(window.innerHeight - nodeRect.bottom),
          offsetX: Math.round(nodeRect.left),
          offsetY: Math.round(nodeRect.top),
          normX: toPercent(nodeRect.left, window.innerWidth),
          normY: toPercent(nodeRect.top, window.innerHeight)
        };
      }
      var parentRect = parent.getBoundingClientRect();
      var relLeft = nodeRect.left - parentRect.left;
      var relTop = nodeRect.top - parentRect.top;
      var relRight = parentRect.right - nodeRect.right;
      var relBottom = parentRect.bottom - nodeRect.bottom;
      return {
        parentSelector: getNodeSelector(parent),
        anchorX: "left",
        anchorY: "top",
        left: Math.round(relLeft),
        top: Math.round(relTop),
        right: Math.round(relRight),
        bottom: Math.round(relBottom),
        offsetX: Math.round(relLeft),
        offsetY: Math.round(relTop),
        normX: toPercent(relLeft, parentRect.width || 1),
        normY: toPercent(relTop, parentRect.height || 1)
      };
    }

    function normalizeToGrid(value) {
      var grid = auditRuntime.snapGrid || 0;
      if (!grid || grid < 1) return value;
      return Math.round(value / grid) * grid;
    }

    function syncControlPanelState() {
      var uiBtn = controlPanel.querySelector('[data-action="audit-ui-toggle"]');
      var dragBtn = controlPanel.querySelector('[data-action="audit-drag-toggle"]');
      var snapBtn = controlPanel.querySelector('[data-action="audit-snap-toggle"]');
      var normalizeBtn = controlPanel.querySelector('[data-action="audit-normalize-toggle"]');

      if (uiBtn) {
        uiBtn.classList.toggle("is-on", !auditRuntime.allowUiActions);
        uiBtn.textContent = auditRuntime.allowUiActions ? "UI ON" : "UI OFF";
      }

      if (dragBtn) {
        dragBtn.classList.toggle("is-on", auditRuntime.allowDrag);
        dragBtn.textContent = auditRuntime.allowDrag ? "DRAG ON" : "DRAG OFF";
      }

      if (snapBtn) {
        var snapOn = !!auditRuntime.snapGrid;
        snapBtn.classList.toggle("is-on", snapOn);
        snapBtn.textContent = snapOn ? "SNAP " + String(auditRuntime.snapGrid) + "PX" : "SNAP OFF";
      }

      if (normalizeBtn) {
        normalizeBtn.classList.toggle("is-on", auditRuntime.normalizeToParent);
        normalizeBtn.textContent = auditRuntime.normalizeToParent ? "NORM PARENT ON" : "NORM PARENT OFF";
      }
    }

    function renderStagePanel() {
      var stageList = stagePanel.querySelector(".ac-audit-stage-panel__list");
      var lockBtn = stagePanel.querySelector('[data-action="audit-stage-lock-toggle"]');
      if (!stageList) return;

      if (lockBtn) {
        lockBtn.classList.toggle("is-on", auditRuntime.lockUntilAge);
        lockBtn.textContent = auditRuntime.lockUntilAge ? "LOCK UNTIL AGE ON" : "LOCK UNTIL AGE OFF";
      }

      var isCompact = state.mode === "compact";
      var stepNumber = state.step + 1;
      var introStep = state.step === 0;
      var ageReady = auditRuntime.ageSelected;
      var lockActive = auditRuntime.lockUntilAge && !ageReady;
      var lineText = "";
      var lineNode = document.getElementById("acProgramLine");
      if (lineNode) {
        var lineClone = lineNode.cloneNode(true);
        var badges = lineClone.querySelectorAll(".ac-audit-badge");
        for (var bi = 0; bi < badges.length; bi += 1) {
          if (badges[bi] && badges[bi].parentNode) {
            badges[bi].parentNode.removeChild(badges[bi]);
          }
        }
        lineText = (lineClone.textContent || "").trim();
      }

      var stages = [
        { code: "S1", title: "Первый вход", meta: isCompact ? "Режим: Кратко" : "Режим: Подробно", active: true, done: isCompact },
        {
          code: "S2",
          title: "Ожидание выбора возраста",
          meta: introStep ? "Правый блок: " + (lineText || "Выберите возраст ребёнка") : "Этап интро пройден",
          active: introStep,
          done: ageReady
        },
        {
          code: "S3",
          title: "Разблокировка сценария",
          meta: lockActive ? "Кнопки заблокированы до выбора возраста" : "Кнопки разблокированы",
          active: !lockActive,
          done: ageReady
        },
        {
          code: "S4",
          title: "Воронка шаги 1-4",
          meta: "Текущий шаг: " + String(stepNumber) + " из 4",
          active: ageReady,
          done: stepNumber >= 4
        }
      ];

      var html = "";
      for (var si = 0; si < stages.length; si += 1) {
        var stage = stages[si];
        var cls = "ac-audit-stage";
        if (stage.done) cls += " is-done";
        else if (stage.active) cls += " is-active";
        html +=
          '<li class="' +
          cls +
          '">' +
          '<div class="ac-audit-stage__row">' +
          '<span class="ac-audit-stage__code">' +
          stage.code +
          "</span>" +
          '<strong class="ac-audit-stage__title">' +
          stage.title +
          "</strong>" +
          "</div>" +
          '<div class="ac-audit-stage__meta">' +
          stage.meta +
          "</div>" +
          "</li>";
      }

      stageList.innerHTML = html;
    }

    function renderMovedList() {
      var movedList = controlPanel.querySelector(".ac-audit-control-panel__moved");
      if (!movedList) return;

      if (!movedOrder.length) {
        movedList.innerHTML = '<li class="ac-audit-control-panel__empty">Пока нет перетаскиваний</li>';
        return;
      }

      var html = "";
      for (var mm = 0; mm < movedOrder.length; mm += 1) {
        var idx = movedOrder[mm];
        var record = movedMap[idx];
        if (!record) continue;
        html +=
          '<li class="ac-audit-moved-item">' +
          '<div class="ac-audit-moved-item__title">#' +
          String(record.index) +
          " " +
          record.label +
          "</div>" +
          '<div class="ac-audit-moved-item__meta">dx ' +
          String(record.dx) +
          "px · dy " +
          String(record.dy) +
          "px · " +
          (auditRuntime.normalizeToParent ? "parent " + record.parentSelector : "viewport") +
          " · " +
          record.anchorX +
          ":" +
          String(record.offsetX) +
          "px · " +
          record.anchorY +
          ":" +
          String(record.offsetY) +
          "px · " +
          record.normX +
          " / " +
          record.normY +
          "</div>" +
          '<div class="ac-audit-moved-item__actions">' +
          '<button class="ac-audit-status ac-audit-status--row' +
          (record.status === "fixed" ? " is-fixed" : "") +
          '" type="button" data-action="audit-item-status" data-index="' +
          String(record.index) +
          '">' +
          "STATUS: " +
          String(record.status).toUpperCase() +
          "</button>" +
          '<button class="ac-audit-status ac-audit-status--row' +
          (record.decision === "accept" ? " is-on" : "") +
          '" type="button" data-action="audit-item-decision" data-index="' +
          String(record.index) +
          '" data-decision="accept">ACCEPT</button>' +
          '<button class="ac-audit-status ac-audit-status--row' +
          (record.decision === "hold" ? " is-on" : "") +
          '" type="button" data-action="audit-item-decision" data-index="' +
          String(record.index) +
          '" data-decision="hold">HOLD</button>' +
          '<button class="ac-audit-status ac-audit-status--row' +
          (record.decision === "reject" ? " is-on" : "") +
          '" type="button" data-action="audit-item-decision" data-index="' +
          String(record.index) +
          '" data-decision="reject">REJECT</button>' +
          '<button class="ac-audit-status ac-audit-status--row" type="button" data-action="audit-item-undo" data-index="' +
          String(record.index) +
          '"' +
          ((record.history && record.history.length) ? "" : " disabled") +
          '>UNDO (' +
          String((record.history && record.history.length) || 0) +
          ")</button>" +
          "</div>" +
          '<input class="ac-audit-comment" type="text" data-action="audit-item-comment" data-index="' +
          String(record.index) +
          '" placeholder="Комментарий для внедрения" value="' +
          String(record.comment || "").replace(/\"/g, "&quot;") +
          '">' +
          "</li>";
      }

      movedList.innerHTML = html;
    }

    function applyConfirmedChanges() {
      var accepted = [];
      for (var ai = 0; ai < movedOrder.length; ai += 1) {
        var idx = movedOrder[ai];
        var record = movedMap[idx];
        if (!record) continue;
        if (record.status === "fixed" && record.decision === "accept") {
          accepted.push(record);
        }
      }

      var logNode = controlPanel.querySelector(".ac-audit-control-panel__apply-log");
      if (!logNode) return;

      if (!accepted.length) {
        logNode.textContent = "Нет подтвержденных правок";
        return;
      }

      var lines = [];
      for (var ri = 0; ri < accepted.length; ri += 1) {
        var r = accepted[ri];
        lines.push(
          "#" +
            String(r.index) +
            " " +
            r.label +
            " | parent=" +
            r.parentSelector +
            " | dx=" +
            String(r.dx) +
            " dy=" +
            String(r.dy) +
            " | " +
            r.anchorX +
            ":" +
            String(r.offsetX) +
            " " +
            r.anchorY +
            ":" +
            String(r.offsetY) +
            " | " +
            r.normX +
            "/" +
            r.normY +
            (r.comment ? " | note: " + r.comment : "")
        );
      }
      logNode.textContent = lines.join("\n");
    }

    function findItemByIndex(index) {
      for (var fi = 0; fi < nodes.length; fi += 1) {
        if (nodes[fi].index === index) return nodes[fi];
      }
      return null;
    }

    function renderChangeLog() {
      var journal = controlPanel.querySelector(".ac-audit-control-panel__journal");
      if (!journal) return;
      if (!changeLog.length) {
        journal.innerHTML = '<li class="ac-audit-control-panel__empty">Журнал пуст</li>';
        return;
      }

      var html = "";
      for (var li = changeLog.length - 1; li >= 0; li -= 1) {
        var row = changeLog[li];
        html +=
          '<li class="ac-audit-log-item">#' +
          String(row.index) +
          " " +
          row.label +
          " · " +
          row.kind +
          " · " +
          row.from +
          " -> " +
          row.to +
          " · " +
          row.parent +
          "</li>";
      }
      journal.innerHTML = html;
    }

    function pushChangeLog(entry) {
      changeLog.push(entry);
      if (changeLog.length > 120) {
        changeLog.shift();
      }
      renderChangeLog();
    }

    function upsertMovedRecord(item, options) {
      var opts = options || {};
      var recordHistory = opts.recordHistory === true;
      var anchor = auditRuntime.normalizeToParent ? readParentAnchor(item) : readAnchor(item);
      var index = item.index;
      if (!movedMap[index]) {
        movedOrder.push(index);
      }
      var prev = movedMap[index] || {};
      var history = prev.history ? prev.history.slice() : [];
      var prevDx = Math.round(prev.dx || 0);
      var prevDy = Math.round(prev.dy || 0);
      var nextDx = Math.round(item.offsetX || 0);
      var nextDy = Math.round(item.offsetY || 0);
      if (recordHistory && (nextDx !== prevDx || nextDy !== prevDy)) {
        history.push({
          dx: prevDx,
          dy: prevDy,
          parentSelector: prev.parentSelector || "viewport",
          anchorX: prev.anchorX || "left",
          anchorY: prev.anchorY || "top",
          offsetX: Math.round(prev.offsetX || 0),
          offsetY: Math.round(prev.offsetY || 0),
          normX: prev.normX || "0.00%",
          normY: prev.normY || "0.00%"
        });
        if (history.length > 30) {
          history.shift();
        }
        pushChangeLog({
          index: index,
          label: item.label,
          kind: "move",
          from: String(prevDx) + "," + String(prevDy),
          to: String(nextDx) + "," + String(nextDy),
          parent: anchor.parentSelector || "viewport"
        });
      }
      movedMap[index] = {
        index: index,
        label: item.label,
        dx: nextDx,
        dy: nextDy,
        status: prev.status || "draft",
        decision: prev.decision || "hold",
        comment: prev.comment || "",
        history: history,
        parentSelector: anchor.parentSelector || "viewport",
        anchorX: anchor.anchorX,
        anchorY: anchor.anchorY,
        offsetX: anchor.offsetX,
        offsetY: anchor.offsetY,
        normX: anchor.normX,
        normY: anchor.normY
      };
      renderMovedList();
    }

    function syncGroupFilters() {
      for (var n = 0; n < nodes.length; n += 1) {
        var visible = groupsState[nodes[n].group] !== false;
        nodes[n].node.classList.toggle("ac-audit-target--hidden", !visible);
        if (nodes[n].listItem) {
          nodes[n].listItem.classList.toggle("ac-audit-panel__item--hidden", !visible);
        }
      }

      var groupButtons = panel.querySelectorAll('[data-action="audit-group-toggle"]');
      for (var b = 0; b < groupButtons.length; b += 1) {
        var groupId = groupButtons[b].getAttribute("data-group");
        var isOn = groupsState[groupId] !== false;
        groupButtons[b].classList.toggle("is-on", isOn);
      }
    }

    function setActiveNode(targetNode) {
      for (var q = 0; q < nodes.length; q += 1) {
        nodes[q].node.classList.remove("ac-audit-target--active");
      }
      if (targetNode) {
        targetNode.classList.add("ac-audit-target--active");
      }
    }

    function setNodeOffset(item, dx, dy) {
      item.offsetX = dx;
      item.offsetY = dy;
      item.node.style.setProperty("--ac-audit-dx", String(dx) + "px");
      item.node.style.setProperty("--ac-audit-dy", String(dy) + "px");
    }

    var dragState = null;

    function startDrag(event, item) {
      if (!item || !item.node) return;
      if (!auditRuntime.allowDrag) return;
      if (event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();

      dragState = {
        item: item,
        startX: event.clientX,
        startY: event.clientY,
        baseX: item.offsetX || 0,
        baseY: item.offsetY || 0,
        rect: item.node.getBoundingClientRect()
      };

      item.node.classList.add("ac-audit-target--dragging");
      setActiveNode(item.node);
    }

    document.addEventListener("mousemove", function (event) {
      if (!dragState) return;
      var margin = 4;
      var nextX = dragState.baseX + (event.clientX - dragState.startX);
      var nextY = dragState.baseY + (event.clientY - dragState.startY);
      var projectedLeft = dragState.rect.left + (nextX - dragState.baseX);
      var projectedRight = dragState.rect.right + (nextX - dragState.baseX);
      var projectedTop = dragState.rect.top + (nextY - dragState.baseY);
      var projectedBottom = dragState.rect.bottom + (nextY - dragState.baseY);

      if (projectedLeft < margin) {
        nextX += margin - projectedLeft;
      }
      if (projectedRight > window.innerWidth - margin) {
        nextX -= projectedRight - (window.innerWidth - margin);
      }
      if (projectedTop < margin) {
        nextY += margin - projectedTop;
      }
      if (projectedBottom > window.innerHeight - margin) {
        nextY -= projectedBottom - (window.innerHeight - margin);
      }

      nextX = normalizeToGrid(nextX);
      nextY = normalizeToGrid(nextY);
      setNodeOffset(dragState.item, nextX, nextY);
    });

    document.addEventListener("mouseup", function () {
      if (!dragState) return;
      dragState.item.node.classList.remove("ac-audit-target--dragging");
      upsertMovedRecord(dragState.item, { recordHistory: true });
      dragState = null;
    });

    panel.addEventListener("click", function (event) {
      var toggleButton = event.target.closest('[data-action="audit-toggle"]');
      if (toggleButton) {
        var collapsed = panel.classList.toggle("ac-audit-panel--collapsed");
        toggleButton.textContent = collapsed ? "Развернуть" : "Свернуть";
        toggleButton.setAttribute("aria-label", collapsed ? "Развернуть панель" : "Свернуть панель");
        return;
      }

      if (event.target.closest('[data-action="audit-reset-pos"]')) {
        for (var rr = 0; rr < nodes.length; rr += 1) {
          setNodeOffset(nodes[rr], 0, 0);
          nodes[rr].node.classList.remove("ac-audit-target--active");
        }
        movedOrder = [];
        movedMap = {};
        changeLog = [];
        renderMovedList();
        renderChangeLog();
        applyConfirmedChanges();
        return;
      }

      if (event.target.closest('[data-action="audit-group-all-on"]')) {
        for (var z = 0; z < auditGroups.length; z += 1) {
          groupsState[auditGroups[z].id] = true;
        }
        syncGroupFilters();
        return;
      }

      if (event.target.closest('[data-action="audit-group-all-off"]')) {
        for (var zz = 0; zz < auditGroups.length; zz += 1) {
          groupsState[auditGroups[zz].id] = false;
        }
        syncGroupFilters();
        return;
      }

      var groupToggle = event.target.closest('[data-action="audit-group-toggle"]');
      if (groupToggle) {
        var targetGroup = groupToggle.getAttribute("data-group");
        if (targetGroup && hasOwn(groupsState, targetGroup)) {
          groupsState[targetGroup] = !groupsState[targetGroup];
          syncGroupFilters();
        }
        return;
      }

      var btn = event.target.closest(".ac-audit-jump");
      if (!btn) return;
      var idx = Number(btn.getAttribute("data-index"));
      if (!idx) return;
      var targetNode = null;
      for (var p = 0; p < nodes.length; p += 1) {
        if (nodes[p].index === idx) {
          targetNode = nodes[p].node;
          break;
        }
      }
      if (!targetNode) return;
      targetNode.scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveNode(targetNode);
    });

    controlPanel.addEventListener("click", function (event) {
      var toggleControls = event.target.closest('[data-action="audit-control-toggle"]');
      if (toggleControls) {
        var collapsed = controlPanel.classList.toggle("ac-audit-control-panel--collapsed");
        toggleControls.textContent = collapsed ? "Развернуть" : "Свернуть";
        toggleControls.setAttribute("aria-label", collapsed ? "Развернуть панель действий" : "Свернуть панель действий");
        return;
      }

      if (event.target.closest('[data-action="audit-ui-toggle"]')) {
        auditRuntime.allowUiActions = !auditRuntime.allowUiActions;
        syncControlPanelState();
        return;
      }

      if (event.target.closest('[data-action="audit-drag-toggle"]')) {
        auditRuntime.allowDrag = !auditRuntime.allowDrag;
        syncControlPanelState();
        return;
      }

      if (event.target.closest('[data-action="audit-snap-toggle"]')) {
        auditRuntime.snapGrid = auditRuntime.snapGrid ? 0 : 4;
        syncControlPanelState();
        return;
      }

      if (event.target.closest('[data-action="audit-normalize-toggle"]')) {
        auditRuntime.normalizeToParent = !auditRuntime.normalizeToParent;
        for (var rn = 0; rn < movedOrder.length; rn += 1) {
          var index = movedOrder[rn];
          for (var nn = 0; nn < nodes.length; nn += 1) {
            if (nodes[nn].index === index) {
              upsertMovedRecord(nodes[nn]);
              break;
            }
          }
        }
        syncControlPanelState();
        renderMovedList();
        return;
      }

      if (event.target.closest('[data-action="audit-apply-confirmed"]')) {
        applyConfirmedChanges();
        return;
      }

      if (event.target.closest('[data-action="audit-log-clear"]')) {
        changeLog = [];
        renderChangeLog();
        return;
      }

      var statusBtn = event.target.closest('[data-action="audit-item-status"]');
      if (statusBtn) {
        var itemIndex = Number(statusBtn.getAttribute("data-index"));
        if (!itemIndex || !movedMap[itemIndex]) return;
        var current = movedMap[itemIndex].status || "draft";
        var currentIdx = 0;
        for (var sf = 0; sf < statusFlow.length; sf += 1) {
          if (statusFlow[sf] === current) {
            currentIdx = sf;
            break;
          }
        }
        movedMap[itemIndex].status = statusFlow[(currentIdx + 1) % statusFlow.length];
        renderMovedList();
        return;
      }

      var decisionBtn = event.target.closest('[data-action="audit-item-decision"]');
      if (decisionBtn) {
        var decisionIndex = Number(decisionBtn.getAttribute("data-index"));
        var decision = decisionBtn.getAttribute("data-decision") || "hold";
        if (!decisionIndex || !movedMap[decisionIndex]) return;
        movedMap[decisionIndex].decision = decision;
        renderMovedList();
        return;
      }

      var undoBtn = event.target.closest('[data-action="audit-item-undo"]');
      if (undoBtn) {
        var undoIndex = Number(undoBtn.getAttribute("data-index"));
        var undoRecord = movedMap[undoIndex];
        if (!undoIndex || !undoRecord || !undoRecord.history || !undoRecord.history.length) return;
        var prevState = undoRecord.history.pop();
        var targetItem = findItemByIndex(undoIndex);
        if (!targetItem) return;
        setNodeOffset(targetItem, prevState.dx, prevState.dy);
        upsertMovedRecord(targetItem, { recordHistory: false });
        movedMap[undoIndex].history = undoRecord.history;
        pushChangeLog({
          index: undoIndex,
          label: targetItem.label,
          kind: "undo",
          from: String(undoRecord.dx) + "," + String(undoRecord.dy),
          to: String(prevState.dx) + "," + String(prevState.dy),
          parent: movedMap[undoIndex].parentSelector || "viewport"
        });
        renderMovedList();
      }
    });

    controlPanel.addEventListener("input", function (event) {
      var commentInput = event.target.closest('[data-action="audit-item-comment"]');
      if (!commentInput) return;
      var itemIndex = Number(commentInput.getAttribute("data-index"));
      if (!itemIndex || !movedMap[itemIndex]) return;
      movedMap[itemIndex].comment = commentInput.value || "";
    });

    stagePanel.addEventListener("click", function (event) {
      var toggleStages = event.target.closest('[data-action="audit-stage-toggle"]');
      if (toggleStages) {
        var collapsed = stagePanel.classList.toggle("ac-audit-stage-panel--collapsed");
        toggleStages.textContent = collapsed ? "Развернуть" : "Свернуть";
        toggleStages.setAttribute("aria-label", collapsed ? "Развернуть стадии" : "Свернуть стадии");
        return;
      }

      if (event.target.closest('[data-action="audit-stage-lock-toggle"]')) {
        auditRuntime.lockUntilAge = !auditRuntime.lockUntilAge;
        renderStagePanel();
        return;
      }

      if (event.target.closest('[data-action="audit-stage-reset"]')) {
        auditRuntime.ageSelected = false;
        setStep(0);
        renderStagePanel();
      }
    });

    for (var h = 0; h < nodes.length; h += 1) {
      (function (item) {
        if (item.badge) {
          item.badge.addEventListener("mouseenter", function () {
            setActiveNode(item.node);
          });
          item.badge.addEventListener("focus", function () {
            setActiveNode(item.node);
          });
          item.badge.addEventListener("mousedown", function (event) {
            startDrag(event, item);
          });
        }

        if (item.listItem) {
          item.listItem.addEventListener("mouseenter", function () {
            setActiveNode(item.node);
          });
        }
      })(nodes[h]);
    }

    panel.classList.add("ac-audit-panel--collapsed");
    controlPanel.classList.add("ac-audit-control-panel--collapsed");
    stagePanel.classList.add("ac-audit-stage-panel--collapsed");

    document.body.appendChild(panel);
    document.body.appendChild(controlPanel);
    document.body.appendChild(stagePanel);
    syncGroupFilters();
    syncControlPanelState();
    renderMovedList();
    renderChangeLog();
    auditRuntime.stageSync = renderStagePanel;
    renderStagePanel();

    window.addEventListener("resize", function () {
      if (!movedOrder.length) return;
      for (var mr = 0; mr < movedOrder.length; mr += 1) {
        var movedItemIndex = movedOrder[mr];
        for (var mn = 0; mn < nodes.length; mn += 1) {
          if (nodes[mn].index === movedItemIndex) {
            upsertMovedRecord(nodes[mn]);
            break;
          }
        }
      }
      renderStagePanel();
    });
  }

  function bootstrap() {
    renderLayout();
    renderStaticLabels();
    renderMenu();
    renderInfoCard();
    renderFunnel();
    renderSections();
    renderFooter();
    renderOverlays();

    var storedMode = getStoredMode();
    track("page_loaded", {
      mode: state.mode,
      active_tab: state.activeTab,
      step: state.step + 1
    });

    if (storedMode) {
      track("reload_restored_mode", {
        mode: state.mode,
        stored_mode: storedMode
      });
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("input", handleInput);
    document.addEventListener("keydown", handleKeydown);

    setupAuditToggleButton();
    enableAuditMode();
  }

  bootstrap();
})();
