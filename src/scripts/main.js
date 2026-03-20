import { CONTENT_MAP, TABS, AGE_PROFILES, SHIFTS, DIRECTIONS, TAB_TO_SECTION, AGE_SLIDER_POINTS } from "./data/content-map.js";
import { ICON_MAP } from "./data/icon-map.js";
import { FAQ_DATA } from "./data/faq-data.js";
import { track } from "./features/analytics.js";
import { createAuditRuntime, setupAuditToggleButton } from "./features/audit.js";
import { clamp, hasOwn } from "./core/dom.js";
import { createInitialState, createUiRuntimeState, getStoredMode, persistMode } from "./core/state.js";
import { applyMode, applyActiveTab, applyStep } from "./core/setters.js";
import { renderInitial } from "./core/render.js";
import { getNextMode } from "./features/toggle.js";
import { resolveTabKey } from "./features/menu.js";
import { isBookingOverlayOpen } from "./features/overlays.js";
import { bindGlobalEvents } from "./features/events.js";

"use strict";

var PROMO_STORAGE_KEY = "acPromoV1";
var HERO_BOOKING_FORM_KEY = "ac:hero-booking-form";
var AGE_STORAGE_KEY = "ac:age";
var BUILD_TAG = "TECH v2026.03.20-07";
var HERO_SUBTITLE_STATIC = "Для детей 7–14 лет: свои IT‑проекты, бассейн и спорт каждый день, внутренняя экономика с лагерной валютой.";
var TOPNAV_LUCIDE_ICONS = {
  info: "/assets/aida-logo-small.png",
  aiprogram: "/assets/icons/lucide/sparkles.svg",
  location: "/assets/icons/lucide/map-pinned.svg",
  photo: "/assets/icons/lucide/images.svg",
  video: "/assets/icons/lucide/circle-play.svg",
  faq: "/assets/icons/lucide/clipboard-list.svg",
  reviews: "/assets/icons/lucide/message-square-quote.svg",
  team: "/assets/icons/lucide/users.svg"
};
var HERO_LUCIDE_ICONS = {
  code: "/assets/icons/lucide/sparkles.svg",
  economy: "/assets/icons/lucide/coins.svg",
  pool: "/assets/icons/lucide/waves.svg",
  chevronRight: "/assets/icons/lucide/chevron-right.svg"
};
var SHIFT_SCHEDULE = [
  {
    period: "1–13 ИЮН",
    days: "13 дн.",
    badge: "ХИТ",
    price: "79 000 ₽",
    seatsLeft: 4,
    monthLabel: "Июнь 2026",
    monthIndex: 5,
    year: 2026,
    startDay: 1,
    endDay: 13,
    helper: "Нажмите — найдём персональную цену",
    primaryCta: "Показать мою цену",
    secondaryCta: "Подробнее о смене"
  },
  { period: "15–27 ИЮН", days: "13 дн.", price: "95 000 ₽", seatsLeft: 8, monthLabel: "Июнь 2026", monthIndex: 5, year: 2026, startDay: 15, endDay: 27, helper: "Нажмите — найдём персональную цену", primaryCta: "Показать мою цену", secondaryCta: "Подробнее о смене" },
  { period: "1–13 АВГ", days: "13 дн.", price: "75 000 ₽", seatsLeft: 10, monthLabel: "Август 2026", monthIndex: 7, year: 2026, startDay: 1, endDay: 13, helper: "Нажмите — найдём персональную цену", primaryCta: "Показать мою цену", secondaryCta: "Подробнее о смене" },
  { period: "17–26 АВГ", days: "10 дн.", price: "79 000 ₽", seatsLeft: 6, monthLabel: "Август 2026", monthIndex: 7, year: 2026, startDay: 17, endDay: 26, helper: "Нажмите — найдём персональную цену", primaryCta: "Показать мою цену", secondaryCta: "Подробнее о смене" }
];
var PRICE_SEARCH_STAGES = [
  "Смотрим текущие бронирования...",
  "Ищем свободные места...",
  "Проверяем заполненность смены..."
];
var PRICE_SEARCH_STAGE_INTERVAL_MS = 1350;
var PRICE_DONE_KPI_DURATION_MS = 1400;
var PRICE_SEARCH_CFG = {
  initialMarkup: 0.2,
  firstClickDiscMin: 0.04,
  firstClickDiscMax: 0.05,
  secondClickDiscMin: 0.02,
  secondClickDiscMax: 0.03,
  promoCodePrefix: "AIDA-",
  promoCodeTtl: "70:02:00",
  totalSeats: 45
};
var REVIEW_EXCLUDE_NAME_PATTERNS = [
  /владимир\s+афанасьев/i,
  /vladimir\s+afanasev/i
];

var uiRuntime = createUiRuntimeState();
var auditRuntime = createAuditRuntime();
var initialShift = SHIFTS[0] || { id: "shift-1", direction: "base" };
var state = createInitialState(initialShift);
var compactPanelScrollBound = false;
var heroContactAutoCloseTimer = null;
var HERO_SLIDESHOW_INTERVAL_MS = 4200;

  function isMobileViewport() {
    try {
      return window.innerWidth <= 768;
    } catch (_err) {
      return false;
    }
  }

  function getPhotoItemsPerPage() {
    return isMobileViewport() ? 3 : 4;
  }

  function getVideoItemsPerPage() {
    return isMobileViewport() ? 1 : 3;
  }

  function getReviewItemsPerPage() {
    return isMobileViewport() ? 1 : 4;
  }

  function getTeamItemsPerPage() {
    return isMobileViewport() ? 1 : 4;
  }

  function getVisibleReviews() {
    var list = CONTENT_MAP.reviews || [];
    return list.filter(function (review) {
      var name = String((review && review.name) || "");
      for (var i = 0; i < REVIEW_EXCLUDE_NAME_PATTERNS.length; i += 1) {
        if (REVIEW_EXCLUDE_NAME_PATTERNS[i].test(name)) {
          return false;
        }
      }
      return true;
    });
  }

  function getCompactTabPreview() {
    return {
      title: "Выберите возраст ребёнка",
      line: "Передвиньте слайдер на карточке слева",
      summary: "Нажмите подходящий возраст, чтобы открыть шаг 2 и доступ к остальным действиям."
    };
  }

  function renderCompactPanelDefault(title, subtitle, list) {
    var items = "";
    for (var i = 0; i < list.length; i += 1) {
      items += '<li><span>' + list[i] + "</span></li>";
    }
    return (
      '<article class="ac-compact-panel-card">' +
      '<h3 class="ac-compact-panel-title">' + title + "</h3>" +
      '<p class="ac-compact-panel-subtitle">' + subtitle + "</p>" +
      '<ul class="ac-compact-panel-list">' + items + "</ul>" +
      "</article>"
    );
  }

  function renderCompactLocationPanel() {
    var wherePrimary = CONTENT_MAP.location.where[0] || "";
    var whereSecondary = CONTENT_MAP.location.where[1] || "";
    var nearby = CONTENT_MAP.location.nearby.slice(0, 4);
    var nearbyItems = "";
    var nearbyIcons = [
      "/assets/icons/lucide/car.svg",
      "/assets/icons/lucide/bus.svg",
      "/assets/icons/lucide/trees.svg",
      "/assets/icons/lucide/waves.svg"
    ];

    for (var i = 0; i < nearby.length; i += 1) {
      var nearbyIcon = nearbyIcons[i] || "/assets/icons/lucide/map-pinned.svg";
      nearbyItems += '<li><img class="ac-icon ac-icon--sm" src="' + nearbyIcon + '" alt="" aria-hidden="true"><span>' + nearby[i] + "</span></li>";
    }

    return (
      '<article class="ac-compact-location">' +
      '<div class="ac-compact-location__head">' +
      '<p class="ac-compact-location__line"><img class="ac-icon ac-icon--sm" src="/assets/icons/lucide/map-pinned.svg" alt="" aria-hidden="true"><span>' + wherePrimary + "</span></p>" +
      '<p class="ac-compact-location__sub">' + whereSecondary + "</p>" +
      "</div>" +
      '<div class="ac-compact-location__map-wrap">' +
      '<iframe class="ac-compact-location__map" loading="lazy" src="' + CONTENT_MAP.location.mapUrl + '" title="Локация лагеря"></iframe>' +
      '<a class="ac-compact-location__map-link" href="' + CONTENT_MAP.location.mapUrl + '" target="_blank" rel="noopener noreferrer">Открыть в Яндекс Картах</a>' +
      "</div>" +
      '<ul class="ac-compact-location__nearby">' + nearbyItems + "</ul>" +
      "</article>"
    );
  }

  function renderCompactPhotoPanel() {
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
    var compactItemsPerPage = 9;
    var start = state.photoPage * compactItemsPerPage;
    var pageItems = photos.slice(start, start + compactItemsPerPage);
    var maxPage = Math.max(0, Math.ceil(photos.length / compactItemsPerPage) - 1);

    var grid = "";
    for (var j = 0; j < pageItems.length; j += 1) {
      grid +=
        '<button class="ac-compact-photo-thumb" type="button" data-action="photo-open" data-photo-index="' +
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
      '<article class="ac-compact-photo">' +
      '<div class="ac-media-toolbar ac-media-toolbar--filters">' +
      categories +
      "</div>" +
      '<div class="ac-compact-photo-grid">' +
      grid +
      "</div>" +
      '<div class="ac-compact-photo-nav">' +
      '<button class="ac-nav-btn" type="button" data-action="photo-prev" ' +
      (state.photoPage <= 0 ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.prev +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronLeft +
      '" alt="" aria-hidden="true"></button>' +
      '<span class="ac-step-status">' +
      (state.photoPage + 1) +
      " / " +
      (maxPage + 1) +
      "</span>" +
      '<button class="ac-nav-btn" type="button" data-action="photo-next" ' +
      (state.photoPage >= maxPage ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.next +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronRight +
      '" alt="" aria-hidden="true"></button>' +
      "</div>" +
      "</article>"
    );
  }

  function renderCompactVideoPanel() {
    var compactItemsPerPage = 2;
    var start = state.videoPage * compactItemsPerPage;
    var items = CONTENT_MAP.videos.slice(start, start + compactItemsPerPage);
    var maxPage = Math.max(0, Math.ceil(CONTENT_MAP.videos.length / compactItemsPerPage) - 1);
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
        '<article class="ac-video-card ac-compact-video-card">' +
        mediaMarkup +
        '<p class="ac-video-card__caption">' +
        items[i].title +
        "</p></article>";
    }

    return (
      '<article class="ac-compact-video">' +
      '<div class="ac-compact-video__row">' +
      cards +
      "</div>" +
      '<div class="ac-compact-video__nav">' +
      '<button class="ac-nav-btn" type="button" data-action="video-prev" ' +
      (state.videoPage <= 0 ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.prev +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronLeft +
      '" alt="" aria-hidden="true"></button>' +
      '<span class="ac-step-status">' +
      (state.videoPage + 1) +
      " / " +
      (maxPage + 1) +
      "</span>" +
      '<button class="ac-nav-btn" type="button" data-action="video-next" ' +
      (state.videoPage >= maxPage ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.next +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronRight +
      '" alt="" aria-hidden="true"></button>' +
      "</div>" +
      "</article>"
    );
  }

  function renderCompactFaqPanel() {
    var html = '<article class="ac-compact-faq">';

    for (var i = 0; i < FAQ_DATA.length; i += 1) {
      var group = FAQ_DATA[i];
      html += '<section class="ac-compact-faq-group">';
      html += '<h3 class="ac-compact-faq-group__title">';
      if (group.icon) {
        html += '<img class="ac-icon ac-icon--sm" src="' + group.icon + '" alt="" aria-hidden="true"> ';
      }
      html += String(group.group || "").toUpperCase();
      html += "</h3>";

      for (var j = 0; j < group.items.length; j += 1) {
        var item = group.items[j];
        var isFirstOpen = i === 0 && j === 0;
        html +=
          '<details class="ac-compact-faq-item"' + (isFirstOpen ? " open" : "") + ">" +
          '<summary class="ac-compact-faq-item__q">' + item.q + "</summary>" +
          '<div class="ac-compact-faq-item__a">' + item.a + "</div>" +
          "</details>";
      }

      html += "</section>";
    }

    html += "</article>";
    return html;
  }

  function renderCompactReviewsPanel() {
    var compactItemsPerPage = 3;
    var reviews = getVisibleReviews();
    var start = state.reviewPage * compactItemsPerPage;
    var items = reviews.slice(start, start + compactItemsPerPage);
    var maxPage = Math.max(0, Math.ceil(reviews.length / compactItemsPerPage) - 1);
    var cards = "";

    for (var i = 0; i < items.length; i += 1) {
      cards +=
        '<article class="ac-card ac-review-card ac-card--team">' +
        '<img class="ac-review-card__avatar" src="' +
        items[i].avatar +
        '" alt="' +
        items[i].name +
        '">' +
        '<p class="ac-review-card__quote">“' +
        items[i].quote +
        '”</p>' +
        '<div class="ac-review-card__name">' +
        items[i].name +
        '</div>' +
        '<div class="ac-review-card__meta">' +
        items[i].meta +
        '</div>' +
        '<div class="ac-review-card__stars">★★★★★</div>' +
        "</article>";
    }

    return (
      '<article class="ac-compact-reviews">' +
      '<div class="ac-compact-reviews__grid">' +
      cards +
      "</div>" +
      '<div class="ac-compact-reviews__nav">' +
      '<button class="ac-nav-btn" type="button" data-action="reviews-prev" ' +
      (state.reviewPage <= 0 ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.prev +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronLeft +
      '" alt="" aria-hidden="true"></button>' +
      '<span class="ac-step-status">' +
      (state.reviewPage + 1) +
      " / " +
      (maxPage + 1) +
      "</span>" +
      '<button class="ac-nav-btn" type="button" data-action="reviews-next" ' +
      (state.reviewPage >= maxPage ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.next +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronRight +
      '" alt="" aria-hidden="true"></button>' +
      "</div>" +
      '<a class="ac-compact-reviews__yandex-link" href="' +
      CONTENT_MAP.ui.reviewsYandexUrl +
      '" target="_blank" rel="noopener noreferrer">Отзывы на Яндексе</a>' +
      "</article>"
    );
  }

  function renderCompactTeamPanel() {
    var compactItemsPerPage = 3;
    var start = state.teamPage * compactItemsPerPage;
    var items = CONTENT_MAP.team.slice(start, start + compactItemsPerPage);
    var maxPage = Math.max(0, Math.ceil(CONTENT_MAP.team.length / compactItemsPerPage) - 1);
    var cards = "";

    for (var i = 0; i < items.length; i += 1) {
      cards +=
        '<article class="ac-card ac-team-card">' +
        '<img class="ac-team-card__avatar" src="' +
        items[i].avatar +
        '" alt="' +
        items[i].name +
        '">' +
        "<h3>" +
        items[i].name +
        "</h3>" +
        '<p class="ac-team-card__role">' +
        items[i].role +
        "</p>" +
        "<p>" +
        items[i].bio +
        "</p>" +
        "</article>";
    }

    return (
      '<article class="ac-compact-team">' +
      '<div class="ac-compact-team__grid">' +
      cards +
      "</div>" +
      '<div class="ac-compact-team__nav">' +
      '<button class="ac-nav-btn" type="button" data-action="team-prev" ' +
      (state.teamPage <= 0 ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.prev +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronLeft +
      '" alt="" aria-hidden="true"></button>' +
      '<span class="ac-step-status">' +
      (state.teamPage + 1) +
      " / " +
      (maxPage + 1) +
      "</span>" +
      '<button class="ac-nav-btn" type="button" data-action="team-next" ' +
      (state.teamPage >= maxPage ? "disabled" : "") +
      ' aria-label="' +
      CONTENT_MAP.ui.next +
      '"><img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.chevronRight +
      '" alt="" aria-hidden="true"></button>' +
      "</div>" +
      '<a class="ac-compact-team__book-link" href="https://www.codims.ru/python-book" target="_blank" rel="noopener noreferrer">Учебник по программированию</a>' +
      "</article>"
    );
  }

  function buildCompactTabPanelMarkup() {
    if (state.activeTab === "aiprogram") {
      var lead = CONTENT_MAP.aiStats[0] || { value: "", label: "", text: "" };
      var statCards = "";
      for (var i = 1; i < 5; i += 1) {
        var stat = CONTENT_MAP.aiStats[i] || { value: "", label: "" };
        statCards +=
          '<article class="ac-compact-ai-stat">' +
          '<div class="ac-compact-ai-stat__value">' + stat.value + "</div>" +
          '<div class="ac-compact-ai-stat__label">' + stat.label + "</div>" +
          "</article>";
      }
      return (
        '<article class="ac-compact-ai">' +
        '<div class="ac-compact-ai-lead">' +
        '<div class="ac-compact-ai-lead__value">' + lead.value + "</div>" +
        '<div class="ac-compact-ai-lead__label">' + lead.label + "</div>" +
        '<p class="ac-compact-ai-lead__text">' + lead.text + "</p>" +
        "</div>" +
        '<div class="ac-compact-ai-grid">' + statCards + "</div>" +
        '<div class="ac-compact-ai-copy">' +
        "<p><strong>" + (CONTENT_MAP.aiCopy[0] || "") + "</strong></p>" +
        "<p>" + (CONTENT_MAP.aiCopy[1] || "") + "</p>" +
        "<p>" + (CONTENT_MAP.aiCopy[2] || "") + "</p>" +
        "</div>" +
        "</article>"
      );
    }

    if (state.activeTab === "location") {
      return renderCompactLocationPanel();
    }

    if (state.activeTab === "photo") {
      return renderCompactPhotoPanel();
    }

    if (state.activeTab === "video") {
      return renderCompactVideoPanel();
    }

    if (state.activeTab === "faq") {
      return renderCompactFaqPanel();
    }

    if (state.activeTab === "reviews") {
      return renderCompactReviewsPanel();
    }

    if (state.activeTab === "team") {
      return renderCompactTeamPanel();
    }

    return "";
  }

  function isAgeGateLocked() {
    return !uiRuntime.ageSelectionConfirmed;
  }

  function getHeroSlideSources() {
    var fallback = "https://static.tildacdn.com/tild3130-3234-4630-b533-343030653636/photo_2024-02-04_171.jpeg";
    var unique = {};
    var list = [];

    function pushUrl(url) {
      if (!url || unique[url]) return;
      unique[url] = true;
      list.push(url);
    }

    pushUrl(fallback);
    var photos = (CONTENT_MAP && CONTENT_MAP.photos) || [];
    for (var i = 0; i < photos.length; i += 1) {
      pushUrl(photos[i] && photos[i].src);
    }
    return list;
  }

  function setHeroRightBackground(url) {
    var bg = document.querySelector(".ac-hero-right__bg");
    if (!bg) return;
    if (!url) {
      bg.style.removeProperty("background-image");
      return;
    }
    bg.style.backgroundImage = 'url("' + String(url).replace(/"/g, "%22") + '")';
  }

  function stopHeroRightSlideshow() {
    if (uiRuntime.heroSlideTimer) {
      clearInterval(uiRuntime.heroSlideTimer);
      uiRuntime.heroSlideTimer = null;
    }
    uiRuntime.heroSlideIndex = 0;
    setHeroRightBackground("");
  }

  function startHeroRightSlideshow() {
    var slides = getHeroSlideSources();
    if (!slides.length) return;
    if (uiRuntime.heroSlideIndex >= slides.length) {
      uiRuntime.heroSlideIndex = 0;
    }
    setHeroRightBackground(slides[uiRuntime.heroSlideIndex]);
    if (uiRuntime.heroSlideTimer) return;
    uiRuntime.heroSlideTimer = window.setInterval(function () {
      if (!isAgeGateLocked()) return;
      uiRuntime.heroSlideIndex = (uiRuntime.heroSlideIndex + 1) % slides.length;
      setHeroRightBackground(slides[uiRuntime.heroSlideIndex]);
    }, HERO_SLIDESHOW_INTERVAL_MS);
  }

  function syncHeroRightAgeLockedState(gateLocked) {
    var heroRight = document.querySelector(".ac-hero-right");
    if (!heroRight) return;
    heroRight.classList.toggle("is-age-locked", gateLocked);
    if (gateLocked) {
      closeHeroContactDropdown();
      startHeroRightSlideshow();
      return;
    }
    stopHeroRightSlideshow();
  }

  function nudgeAgeSelection() {
    if (!isAgeGateLocked()) return;
    uiRuntime.ageGateNudge = true;
    renderInfoCard();
    renderFunnel();
    showAgeGateHint();
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
    var index = clamp(Math.round(sliderValue) - 1, 0, AGE_SLIDER_POINTS.length - 1);
    return AGE_SLIDER_POINTS[index];
  }

  function ageToSliderValue(age) {
    if (!uiRuntime.ageSelectionConfirmed) return 0;
    if (age <= 9) return 1;
    if (age <= 12) return 2;
    return 3;
  }

  function hideAgeGateHint() {
    var hint = document.getElementById("acAgeGateHint");
    if (!hint) return;
    hint.classList.remove("is-visible");
    hint.setAttribute("hidden", "");
  }

  function ensureAgeGateHint(ageBlock) {
    var hint = document.getElementById("acAgeGateHint");
    if (hint) return hint;

    hint = document.createElement("div");
    hint.id = "acAgeGateHint";
    hint.className = "ac-age-gate-hint";
    hint.setAttribute("hidden", "");
    hint.innerHTML =
      '<button class="ac-age-gate-hint__close" type="button" data-action="age-gate-hint-close" aria-label="Закрыть подсказку">×</button>' +
      '<strong>Сначала выберите возраст</strong>' +
      "<span>Передвиньте слайдер в блоке возраста, чтобы открыть остальные действия.</span>";
    ageBlock.appendChild(hint);
    return hint;
  }

  function showAgeGateHint() {
    if (!isAgeGateLocked()) return;
    if (uiRuntime.ageGateHintDismissed) return;
    var ageBlock = document.querySelector(".ac-age-block");
    if (!ageBlock) return;

    var hint = ensureAgeGateHint(ageBlock);
    hint.removeAttribute("hidden");
    hint.classList.add("is-visible");
  }

  function ensureAgeResetButton(ageHead) {
    var existing = document.getElementById("acAgeResetBtn");
    if (existing) return existing;
    var button = document.createElement("button");
    button.id = "acAgeResetBtn";
    button.className = "ac-age-reset";
    button.type = "button";
    button.setAttribute("data-action", "reset-age");
    button.setAttribute("aria-label", "Сбросить выбор возраста");
    button.textContent = "×";
    ageHead.appendChild(button);
    return button;
  }

  function persistAge(ageValue) {
    try {
      localStorage.setItem(AGE_STORAGE_KEY, String(ageValue));
    } catch (_err) {
      // ignore storage errors
    }
  }

  function clearStoredAge() {
    try {
      localStorage.removeItem(AGE_STORAGE_KEY);
    } catch (_err) {
      // ignore storage errors
    }
  }

  function hydrateStoredAge() {
    var raw = null;
    try {
      raw = localStorage.getItem(AGE_STORAGE_KEY);
    } catch (_err) {
      raw = null;
    }
    if (!raw) return;

    var storedAge = Number(raw);
    if (!Number.isFinite(storedAge)) return;
    var safeAge = clamp(storedAge, 7, 14);
    state.age = safeAge;
    uiRuntime.ageSelectionConfirmed = true;
    uiRuntime.ageGateNudge = false;
    uiRuntime.ageGateHintDismissed = true;
    if (auditRuntime.active) {
      auditRuntime.ageSelected = true;
    }
  }

  function resetAgeSelection() {
    if (!uiRuntime.ageSelectionConfirmed) return;
    uiRuntime.ageSelectionConfirmed = false;
    uiRuntime.ageGateNudge = false;
    uiRuntime.ageGateHintDismissed = false;
    clearStoredAge();
    if (auditRuntime.active) {
      auditRuntime.ageSelected = false;
    }
    if (state.step !== 0) {
      state.step = 0;
    }
    closeAllOverlays();
    renderInfoCard();
    renderFunnel();
    renderSections();
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

  function formatPrice(price) {
    var safe = Math.max(0, Math.round(Number(price) || 0));
    return safe.toLocaleString("ru-RU") + " ₽";
  }

  function parseShiftPrice(priceText) {
    return Number(String(priceText || "").replace(/[^\d]/g, "")) || 0;
  }

  function getShiftScheduleMeta(index, shift) {
    var base = SHIFT_SCHEDULE[index] || {};
    return {
      period: base.period || shift.line,
      days: base.days || "",
      badge: base.badge || "",
      price: base.price || "79 000 ₽",
      seatsLeft: Number(base.seatsLeft || 4),
      monthLabel: base.monthLabel || "Июнь 2026",
      monthIndex: Number(base.monthIndex || 5),
      year: Number(base.year || 2026),
      startDay: Number(base.startDay || 1),
      endDay: Number(base.endDay || 13),
      helper: base.helper || "Нажмите — найдём персональную цену",
      primaryCta: base.primaryCta || "Показать мою цену",
      secondaryCta: base.secondaryCta || "Подробнее о смене"
    };
  }

  function parseHmsToMs(hmsText) {
    var raw = String(hmsText || "").trim();
    var parts = raw.split(":");
    if (parts.length !== 3) return 0;
    var hours = Number(parts[0]) || 0;
    var minutes = Number(parts[1]) || 0;
    var seconds = Number(parts[2]) || 0;
    return ((hours * 60 + minutes) * 60 + seconds) * 1000;
  }

  function formatRemainingTtl(ms) {
    var safe = Math.max(0, Math.floor((Number(ms) || 0) / 1000));
    var hours = Math.floor(safe / 3600);
    var minutes = Math.floor((safe % 3600) / 60);
    var seconds = safe % 60;
    var hh = String(hours);
    var mm = String(minutes).padStart(2, "0");
    var ss = String(seconds).padStart(2, "0");
    return hh + ":" + mm + ":" + ss;
  }

  function seatWord(count) {
    var n = Math.abs(Number(count) || 0) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) return "мест";
    if (n1 > 1 && n1 < 5) return "места";
    if (n1 === 1) return "место";
    return "мест";
  }

  function getShiftMetaById(shiftId) {
    var allShifts = SHIFTS.slice(0, 4);
    for (var i = 0; i < allShifts.length; i += 1) {
      if (allShifts[i].id === shiftId) {
        return {
          shift: allShifts[i],
          schedule: getShiftScheduleMeta(i, allShifts[i])
        };
      }
    }
    return null;
  }

  function getPromoRemainingMs(promoRecord) {
    if (!promoRecord) return 0;
    var expiresAt = Number(promoRecord.expiresAt || 0);
    if (!expiresAt && promoRecord.activatedAt && promoRecord.holdHours) {
      expiresAt = Number(promoRecord.activatedAt) + Number(promoRecord.holdHours) * 3600000;
    }
    if (!expiresAt) return 0;
    return Math.max(0, expiresAt - Date.now());
  }

  function hasPromoCountdown() {
    for (var key in uiRuntime.priceSearchByShift) {
      if (!hasOwn(uiRuntime.priceSearchByShift, key)) continue;
      var item = uiRuntime.priceSearchByShift[key];
      if (item && item.expiresAt && getPromoRemainingMs(item) > 0) {
        return true;
      }
    }
    return false;
  }

  function stopPromoTicker() {
    if (!uiRuntime.promoTicker) return;
    clearInterval(uiRuntime.promoTicker);
    uiRuntime.promoTicker = null;
  }

  function startPromoTicker() {
    if (uiRuntime.promoTicker || !state.overlays.shifts || !hasPromoCountdown()) return;
    uiRuntime.promoTicker = setInterval(function () {
      var changed = false;
      for (var key in uiRuntime.priceSearchByShift) {
        if (!hasOwn(uiRuntime.priceSearchByShift, key)) continue;
        var item = uiRuntime.priceSearchByShift[key];
        if (!item || !item.expiresAt) continue;
        var left = getPromoRemainingMs(item);
        var ttl = formatRemainingTtl(left);
        if (item.promoTtl !== ttl) {
          item.promoTtl = ttl;
          changed = true;
        }
        if (left <= 0) {
          item.promoTtl = "00:00:00";
          changed = true;
        }
      }
      if (changed && state.overlays.shifts) {
        renderOverlays();
      }
      if (!state.overlays.shifts || !hasPromoCountdown()) {
        stopPromoTicker();
      }
    }, 1000);
  }

  function clearStoredPromo() {
    uiRuntime.fixedReservation = null;
    try {
      localStorage.removeItem(PROMO_STORAGE_KEY);
    } catch (_err) {
      // ignore storage errors
    }
  }

  function saveFixedPromoToStorage(shiftId, fixedState) {
    if (!shiftId || !fixedState) return null;
    var shiftMeta = getShiftMetaById(shiftId);
    if (!shiftMeta) return null;

    var holdMs = parseHmsToMs(fixedState.promoTtl || PRICE_SEARCH_CFG.promoCodeTtl);
    var nowTs = Date.now();
    var record = {
      shiftId: shiftId,
      shiftName: shiftMeta.shift.title || shiftMeta.shift.summary || "Смена",
      shiftPeriod: shiftMeta.schedule.period || "",
      shiftDays: shiftMeta.schedule.days || "",
      shiftSeatsLeft: Number(shiftMeta.schedule.seatsLeft || 0),
      shiftSummary: shiftMeta.shift.summary || "",
      finalPrice: Math.max(0, Math.round(Number(fixedState.confirmedPrice) || 0)),
      code: fixedState.promoCode || buildShiftPromoCode(shiftId),
      phone: fixedState.phoneMasked || "",
      holdHours: holdMs > 0 ? Math.round(holdMs / 3600000) : 0,
      activatedAt: nowTs,
      expiresAt: holdMs > 0 ? nowTs + holdMs : 0,
      status: "active",
      priceStage: 2
    };

    try {
      localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(record));
    } catch (_err) {
      // ignore storage errors
    }
    uiRuntime.fixedReservation = record;
    return record;
  }

  function hydrateFixedPromoFromStorage() {
    var raw = null;
    try {
      raw = localStorage.getItem(PROMO_STORAGE_KEY);
    } catch (_err) {
      raw = null;
    }
    if (!raw) {
      uiRuntime.fixedReservation = null;
      return;
    }

    var parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (_err) {
      parsed = null;
    }

    if (!parsed || parsed.status !== "active" || !parsed.shiftId) {
      clearStoredPromo();
      return;
    }

    var remainingMs = getPromoRemainingMs(parsed);
    if (remainingMs <= 0) {
      clearStoredPromo();
      return;
    }

    uiRuntime.fixedReservation = parsed;
    uiRuntime.priceSearchByShift[parsed.shiftId] = {
      status: "done",
      round: 2,
      progress: 100,
      confirmedPrice: Number(parsed.finalPrice) || 0,
      promoCode: parsed.code || buildShiftPromoCode(parsed.shiftId),
      promoTtl: formatRemainingTtl(remainingMs),
      expiresAt: Number(parsed.expiresAt || 0),
      phoneMasked: String(parsed.phone || ""),
      phoneValid: !!parsed.phone,
      fixedConfirmed: true,
      bookingPrompt: false
    };
    applyPromoToBookingForm(parsed.code || buildShiftPromoCode(parsed.shiftId));
  }

  function buildHeroReservationMarkup(promoRecord) {
    if (!promoRecord || promoRecord.status !== "active") return "";
    var remainingMs = getPromoRemainingMs(promoRecord);
    if (remainingMs <= 0) return "";

    var dates = promoRecord.shiftPeriod || "—";
    if (promoRecord.shiftDays) {
      dates += " • " + promoRecord.shiftDays;
    }

    return (
      '<article class="ac-hero-reservation__card">' +
      '<div class="ac-hero-reservation__title">Цена зафиксирована</div>' +
      '<div class="ac-hero-reservation__line">' + (promoRecord.shiftName || "Смена") + "</div>" +
      '<div class="ac-hero-reservation__meta">' + dates + "</div>" +
      '<div class="ac-hero-reservation__row">' +
      '<span>Цена: <strong>' + formatPrice(promoRecord.finalPrice) + "</strong></span>" +
      '<span>Промокод: <strong>' + (promoRecord.code || "—") + "</strong></span>" +
      "</div>" +
      '<div class="ac-hero-reservation__ttl">Осталось: ' + formatRemainingTtl(remainingMs) + "</div>" +
      '<button class="ac-primary-btn ac-hero-reservation__btn" type="button" data-action="booking-open-fixed">Перейти к бронированию</button>' +
      "</article>"
    );
  }

  function loadHeroBookingDraft() {
    try {
      var raw = localStorage.getItem(HERO_BOOKING_FORM_KEY);
      if (!raw) return { name: "", phone: "" };
      var parsed = JSON.parse(raw);
      return {
        name: String((parsed && parsed.name) || ""),
        phone: String((parsed && parsed.phone) || "")
      };
    } catch (_err) {
      return { name: "", phone: "" };
    }
  }

  function saveHeroBookingDraft(name, phone) {
    try {
      localStorage.setItem(
        HERO_BOOKING_FORM_KEY,
        JSON.stringify({
          name: String(name || ""),
          phone: String(phone || "")
        })
      );
    } catch (_err) {
      // ignore storage errors
    }
  }

  function getHeroBookingShiftText() {
    var fixed = uiRuntime.fixedReservation;
    if (fixed && fixed.shiftPeriod) {
      var tail = fixed.shiftDays ? " • " + fixed.shiftDays : "";
      var seats = Number(fixed.shiftSeatsLeft || 0);
      var seatsText = seats > 0 ? " • " + seats + " " + seatWord(seats) : "";
      return fixed.shiftPeriod + tail + seatsText;
    }
    var meta = getShiftMetaById(state.selectedShiftId);
    if (!meta) return "—";
    var seatsNow = Number(meta.schedule.seatsLeft || 0);
    var seatsNowText = seatsNow > 0 ? " • " + seatsNow + " " + seatWord(seatsNow) : "";
    return meta.schedule.period + (meta.schedule.days ? " • " + meta.schedule.days : "") + seatsNowText;
  }

  function buildHeroBookingMarkup() {
    var draft = loadHeroBookingDraft();
    var fixed = uiRuntime.fixedReservation;
    var promoCode = fixed && fixed.code ? fixed.code : (uiRuntime.bookingPromoCode || "");
    var shiftLine = getHeroBookingShiftText();

    return (
      '<section class="ac-hero-booking__card">' +
      '<h3 class="ac-hero-booking__title"><img class="ac-icon ac-icon--sm" src="/assets/icons/lucide/clipboard-list.svg" alt="" aria-hidden="true">Оставьте заявку — мы перезвоним</h3>' +
      '<label class="ac-hero-booking__field">' +
      '<span class="ac-hero-booking__label">Как к вам обращаться</span>' +
      '<input id="acHeroBookName" class="ac-hero-booking__input" type="text" placeholder="Например, Саша" value="' + draft.name.replace(/"/g, "&quot;") + '">' +
      "</label>" +
      '<label class="ac-hero-booking__field">' +
      '<span class="ac-hero-booking__label">Ваш телефон</span>' +
      '<input id="acHeroBookPhone" class="ac-hero-booking__input" type="tel" placeholder="+7 (___) ___-__-__" value="' + draft.phone.replace(/"/g, "&quot;") + '">' +
      "</label>" +
      '<label class="ac-hero-booking__field">' +
      '<span class="ac-hero-booking__label">Выбранная смена</span>' +
      '<input class="ac-hero-booking__input" type="text" value="' + shiftLine.replace(/"/g, "&quot;") + '" readonly>' +
      "</label>" +
      '<label class="ac-hero-booking__field">' +
      '<span class="ac-hero-booking__label">Промокод</span>' +
      '<input id="acHeroBookPromo" class="ac-hero-booking__input" type="text" value="' + promoCode.replace(/"/g, "&quot;") + '" readonly>' +
      "</label>" +
      '<button class="ac-primary-btn ac-hero-booking__submit" type="button" data-action="booking-submit-inline"><img class="ac-icon ac-icon--sm" src="/assets/icons/lucide/briefcase-business.svg" alt="" aria-hidden="true">Отправить заявку</button>' +
      '<p id="acHeroBookStatus" class="ac-hero-booking__status" aria-live="polite"></p>' +
      "</section>"
    );
  }

  function refreshFixedReservationState() {
    var promoRecord = uiRuntime.fixedReservation;
    if (!promoRecord || promoRecord.status !== "active") return;

    var remainingMs = getPromoRemainingMs(promoRecord);
    if (remainingMs <= 0) {
      clearStoredPromo();
      return;
    }

    var fixedShiftState = uiRuntime.priceSearchByShift[promoRecord.shiftId];
    if (fixedShiftState && fixedShiftState.status === "fixed") {
      fixedShiftState.promoTtl = formatRemainingTtl(remainingMs);
    }
  }

  function buildShiftCalendarMarkup(schedule, shiftId) {
    var weekdayLabels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    var monthStart = new Date(schedule.year, schedule.monthIndex, 1);
    var monthDays = new Date(schedule.year, schedule.monthIndex + 1, 0).getDate();
    var startWeekday = monthStart.getDay();
    var mondayFirstOffset = startWeekday === 0 ? 6 : startWeekday - 1;
    var cells = "";

    for (var i = 0; i < mondayFirstOffset; i += 1) {
      cells += '<span class="ac-shift-calendar__day ac-shift-calendar__day--empty"></span>';
    }

    for (var day = 1; day <= monthDays; day += 1) {
      var classes = "ac-shift-calendar__day";
      if (day > schedule.startDay && day < schedule.endDay) {
        classes += " is-range";
      }
      if (day === schedule.startDay || day === schedule.endDay) {
        classes += " is-edge";
      }
      cells += '<span class="' + classes + '">' + String(day) + "</span>";
    }

    var weekdaysHtml = "";
    for (var w = 0; w < weekdayLabels.length; w += 1) {
      weekdaysHtml += "<span>" + weekdayLabels[w] + "</span>";
    }

    return (
      '<div class="ac-shift-calendar" role="dialog" aria-label="Календарь смены">' +
      '<div class="ac-shift-calendar__head">' +
      '<strong>Календарь смены</strong>' +
      '<button class="ac-shift-calendar__close" type="button" data-action="shift-calendar-close" data-shift-id="' + shiftId + '" aria-label="Закрыть календарь">×</button>' +
      "</div>" +
      '<div class="ac-shift-calendar__month">' + schedule.monthLabel + "</div>" +
      '<div class="ac-shift-calendar__weekdays">' + weekdaysHtml + "</div>" +
      '<div class="ac-shift-calendar__grid">' + cells + "</div>" +
      "</div>"
    );
  }

  function setShiftCalendarState(isOpen, shiftId) {
    uiRuntime.shiftCalendar.open = !!isOpen;
    uiRuntime.shiftCalendar.shiftId = isOpen ? shiftId : null;
    renderOverlays();
  }

  function openShiftCalendar(shiftId) {
    setSelectedShift(shiftId);
    if (state.shiftView !== "grid") {
      state.shiftView = "grid";
    }
    setShiftCalendarState(true, shiftId);
  }

  function clearPriceSearchTimer() {
    if (!uiRuntime.priceSearchTimer) return;
    clearInterval(uiRuntime.priceSearchTimer);
    uiRuntime.priceSearchTimer = null;
  }

  function getPriceSearchState(shiftId) {
    return uiRuntime.priceSearchByShift[shiftId] || null;
  }

  function setPriceSearchState(shiftId, patch) {
    var prev = uiRuntime.priceSearchByShift[shiftId] || {};
    uiRuntime.priceSearchByShift[shiftId] = Object.assign({}, prev, patch);
    renderOverlays();
  }

  function applyPromoToBookingForm(promoCode) {
    if (!promoCode) return;
    uiRuntime.bookingPromoCode = promoCode;
    var inputs = document.querySelectorAll(
      'input[name="promo"], input[name*="promo"], input[id*="promo"], input[data-field="promo"]'
    );
    for (var i = 0; i < inputs.length; i += 1) {
      inputs[i].value = promoCode;
      inputs[i].setAttribute("value", promoCode);
      inputs[i].dispatchEvent(new Event("input", { bubbles: true }));
      inputs[i].dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  function buildShiftPromoCode() {
    var n = Math.floor(1000 + Math.random() * 9000);
    return PRICE_SEARCH_CFG.promoCodePrefix + String(n);
  }

  function normalizePhoneDigits(value) {
    var digits = String(value || "").replace(/\D/g, "");
    if (!digits) return "";
    if (digits.charAt(0) === "8") digits = "7" + digits.slice(1);
    if (digits.charAt(0) !== "7") digits = "7" + digits;
    return digits.slice(0, 11);
  }

  function formatPhoneMask(value) {
    var digits = normalizePhoneDigits(value);
    if (!digits) return "+7";
    var rest = digits.slice(1);
    var p1 = rest.slice(0, 3);
    var p2 = rest.slice(3, 6);
    var p3 = rest.slice(6, 8);
    var p4 = rest.slice(8, 10);
    var out = "+7";
    if (p1) out += " (" + p1 + (p1.length < 3 ? "" : ")");
    if (p2) out += " " + p2;
    if (p3) out += "-" + p3;
    if (p4) out += "-" + p4;
    return out;
  }

  function isPhoneValid(value) {
    return normalizePhoneDigits(value).length === 11;
  }

  function startShiftPriceSearch(shiftId, options) {
    var allShifts = SHIFTS.slice(0, 4);
    var index = -1;
    for (var i = 0; i < allShifts.length; i += 1) {
      if (allShifts[i].id === shiftId) {
        index = i;
        break;
      }
    }
    if (index < 0) return;

    var shift = allShifts[index];
    var meta = getShiftScheduleMeta(index, shift);
    var current = getPriceSearchState(shiftId);
    var requestedRound = options && Number(options.round);
    var round = requestedRound || Math.min(2, ((current && Number(current.round)) || 0) + 1);
    if (current && current.status === "searching") return;
    if (
      current &&
      current.status === "done" &&
      !(requestedRound && requestedRound > Number(current.round || 0))
    ) {
      return;
    }
    if (current && current.status === "fixed") return;
    if (round < 1 || round > 2) return;

    clearPriceSearchTimer();
    uiRuntime.priceDoneAnimatedByShift[shiftId] = false;
    if (uiRuntime.priceDoneRaf) {
      cancelAnimationFrame(uiRuntime.priceDoneRaf);
      uiRuntime.priceDoneRaf = null;
    }

    var basePrice = parseShiftPrice(meta.price);
    var firstDiscount = PRICE_SEARCH_CFG.firstClickDiscMin + (PRICE_SEARCH_CFG.firstClickDiscMax - PRICE_SEARCH_CFG.firstClickDiscMin) * 0.65;
    var firstRoundPrice = Math.round(basePrice * (1 - firstDiscount));
    var secondDiscount = PRICE_SEARCH_CFG.secondClickDiscMin + (PRICE_SEARCH_CFG.secondClickDiscMax - PRICE_SEARCH_CFG.secondClickDiscMin) * 0.65;
    var confirmedPrice = round === 1 ? firstRoundPrice : Math.round(firstRoundPrice * (1 - secondDiscount));
    var totalSeats = PRICE_SEARCH_CFG.totalSeats;
    var takenSeats = Math.max(0, totalSeats - meta.seatsLeft);
    var occupancyPercent = Math.max(0, Math.min(100, Math.round((takenSeats / totalSeats) * 100)));
    var promoCode = (current && current.promoCode) || buildShiftPromoCode();
    var ttlMs = parseHmsToMs(PRICE_SEARCH_CFG.promoCodeTtl);
    var expiresAt = (current && Number(current.expiresAt)) || (Date.now() + ttlMs);
    var phoneMasked = (current && current.phoneMasked) || "";
    var phoneValid = !!(current && current.phoneValid);
    var fixedConfirmed = !!(current && current.fixedConfirmed);
    var bookingPrompt = !!(current && current.bookingPrompt);

    setPriceSearchState(shiftId, {
      status: "searching",
      progress: 10,
      stageText: PRICE_SEARCH_STAGES[0],
      round: round,
      confirmedPrice: confirmedPrice,
      occupancyPercent: occupancyPercent,
      occupancyLine: takenSeats + " из " + totalSeats + " мест",
      promoCode: promoCode,
      promoTtl: formatRemainingTtl(Math.max(0, expiresAt - Date.now())),
      expiresAt: expiresAt,
      phoneMasked: phoneMasked,
      phoneValid: phoneValid,
      fixedConfirmed: fixedConfirmed,
      bookingPrompt: bookingPrompt,
      basePrice: Math.round(basePrice * (1 + PRICE_SEARCH_CFG.initialMarkup))
    });

    var stageIndex = 0;
    uiRuntime.priceSearchTimer = setInterval(function () {
      stageIndex += 1;
      if (stageIndex < PRICE_SEARCH_STAGES.length) {
        setPriceSearchState(shiftId, {
          status: "searching",
          progress: Math.min(90, Math.round(((stageIndex + 1) / PRICE_SEARCH_STAGES.length) * 90)),
          stageText: PRICE_SEARCH_STAGES[stageIndex]
        });
        return;
      }

      clearPriceSearchTimer();
      setPriceSearchState(shiftId, {
        status: "done",
        progress: 100,
        stageText: PRICE_SEARCH_STAGES[PRICE_SEARCH_STAGES.length - 1],
        round: round
      });
    }, PRICE_SEARCH_STAGE_INTERVAL_MS);
  }

  function animateDonePriceKpi() {
    if (!state.overlays.shifts) return;
    var shiftId = state.selectedShiftId;
    var priceState = getPriceSearchState(shiftId);
    if (!priceState || priceState.status !== "done") return;
    if (uiRuntime.priceDoneAnimatedByShift[shiftId]) return;

    var valueEl = document.querySelector('[data-price-kpi="value"][data-shift-id="' + shiftId + '"]');
    var barEl = document.querySelector('[data-price-kpi="bar"][data-shift-id="' + shiftId + '"]');
    if (!valueEl || !barEl) return;

    var target = Number(valueEl.getAttribute("data-target")) || 0;
    var duration = PRICE_DONE_KPI_DURATION_MS;
    var startTs = null;

    var statusEl = document.querySelector('[data-price-kpi="status"][data-shift-id="' + shiftId + '"]');
    valueEl.textContent = "0%";
    barEl.style.width = "0%";
    if (statusEl) {
      statusEl.textContent = "Проверяем заполненность смены...";
    }

    function frame(ts) {
      if (startTs === null) startTs = ts;
      var t = Math.min(1, (ts - startTs) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      var current = Math.round(target * eased);
      valueEl.textContent = String(current) + "%";
      barEl.style.width = String(current) + "%";
      if (t < 1) {
        uiRuntime.priceDoneRaf = requestAnimationFrame(frame);
      } else {
        if (statusEl) {
          statusEl.textContent = "Смена заполнена";
        }
        uiRuntime.priceDoneAnimatedByShift[shiftId] = true;
        uiRuntime.priceDoneRaf = null;
      }
    }

    if (uiRuntime.priceDoneRaf) {
      cancelAnimationFrame(uiRuntime.priceDoneRaf);
      uiRuntime.priceDoneRaf = null;
    }
    uiRuntime.priceDoneRaf = requestAnimationFrame(frame);
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
    if (!applyMode(state, mode)) return;
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
    if (!applyActiveTab(state, tabKey, hasTab)) return;

    renderMenu();
    renderInfoCard();
    renderFunnel();
    renderSections();

    track("tab_changed", {
      tab: state.activeTab,
      mode: state.mode
    });
  }

  function applyStepTransition(nextStep, withFunnelStartTracking) {
    var stepUpdate = applyStep(state, nextStep, SHIFTS.length - 1);
    var prevStep = stepUpdate.prevStep;
    var safeStep = stepUpdate.safeStep;
    if (!stepUpdate.changed) return false;

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
    persistAge(safeAge);
    uiRuntime.ageSelectionConfirmed = true;
    uiRuntime.ageGateNudge = false;
    uiRuntime.ageGateHintDismissed = true;
    hideAgeGateHint();
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
    var targetStep = state.step === 0 ? 1 : state.step;
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
      if (name === "shifts" && isOpen) {
        uiRuntime.shiftsShowAll = false;
      }
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
      clearPriceSearchTimer();
      if (uiRuntime.priceDoneRaf) {
        cancelAnimationFrame(uiRuntime.priceDoneRaf);
        uiRuntime.priceDoneRaf = null;
      }
      uiRuntime.shiftsShowAll = false;
      uiRuntime.shiftCalendar.open = false;
      uiRuntime.shiftCalendar.shiftId = null;
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
    var maxPage = Math.max(0, Math.ceil(items.length / getPhotoItemsPerPage()) - 1);
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
    var maxPage = Math.max(0, Math.ceil(CONTENT_MAP.videos.length / getVideoItemsPerPage()) - 1);
    var safePage = clamp(nextPage, 0, maxPage);
    if (safePage === state.videoPage) return;

    state.videoPage = safePage;
    renderSections();
  }

  function setReviewPage(nextPage) {
    var reviews = getVisibleReviews();
    var maxPage = Math.max(0, Math.ceil(reviews.length / getReviewItemsPerPage()) - 1);
    var safePage = clamp(nextPage, 0, maxPage);
    if (safePage === state.reviewPage) return;

    state.reviewPage = safePage;
    renderSections();
  }

  function setTeamPage(nextPage) {
    var maxPage = Math.max(0, Math.ceil(CONTENT_MAP.team.length / getTeamItemsPerPage()) - 1);
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
      var tabIcon = TOPNAV_LUCIDE_ICONS[tab.key] || tab.icon;

      if (variant === "compact") {
        var compactIconClass = tab.key === "info" ? "ac-icon ac-nav-brand-icon" : "ac-icon";
        items +=
          '<a class="ac-menu-item--compact' +
          activeClass +
          '" href="' +
          tab.href +
          '" data-action="tab" data-tab="' +
          tab.key +
          '" data-tooltip="' +
          tab.label +
          '" title="' +
          tab.label +
          '" aria-label="' +
          tab.label +
          '">' +
          '<img class="' +
          compactIconClass +
          '" src="' +
          tabIcon +
          '" alt="" aria-hidden="true">' +
          "</a>";
      } else {
        var fullIconClass = tab.key === "info" ? "ac-icon ac-icon--sm ac-nav-brand-icon" : "ac-icon ac-icon--sm";
        items +=
          '<a class="ac-menu-item--full' +
          activeClass +
          '" href="' +
          tab.href +
          '" data-action="tab" data-tab="' +
          tab.key +
          '">' +
          '<img class="' +
          fullIconClass +
          '" src="' +
          tabIcon +
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

  function resolveHeroBenefitIcon(benefit, index) {
    var text = String((benefit && benefit.text) || "").toLowerCase();
    if (
      text.indexOf("бассейн") !== -1 ||
      text.indexOf("спорт") !== -1 ||
      text.indexOf("вода") !== -1
    ) {
      return HERO_LUCIDE_ICONS.pool;
    }
    if (
      text.indexOf("эконом") !== -1 ||
      text.indexOf("валют") !== -1 ||
      text.indexOf("бюджет") !== -1 ||
      text.indexOf("деньг") !== -1 ||
      text.indexOf("токен") !== -1
    ) {
      return HERO_LUCIDE_ICONS.economy;
    }
    if (
      text.indexOf("it") !== -1 ||
      text.indexOf("проект") !== -1 ||
      text.indexOf("python") !== -1 ||
      text.indexOf("код") !== -1 ||
      text.indexOf("программ") !== -1
    ) {
      return HERO_LUCIDE_ICONS.code;
    }

    if (index % 3 === 1) return HERO_LUCIDE_ICONS.economy;
    if (index % 3 === 2) return HERO_LUCIDE_ICONS.pool;
    return HERO_LUCIDE_ICONS.code;
  }

  function renderMenu() {
    var topNav = document.getElementById("acTopNav");
    var compactNav = document.getElementById("acCompactNav");

    if (!topNav || !compactNav) return;
    topNav.innerHTML = '<div class="ac-container">' + buildMenuItems("full") + "</div>";
    compactNav.innerHTML = "";
  }

  function renderInfoCard() {
    refreshFixedReservationState();
    var profile = findProfileByAge(state.age);
    var heroBenefits = getHeroBenefits();
    var compactPanel = document.getElementById("acCompactTabPanel");
    var isCompactTab = state.mode === "compact" && state.activeTab !== "info";

    var title = document.getElementById("acHeroTitle");
    var subtitle = document.getElementById("acHeroSubtitle");
    var progress = document.getElementById("acHeroProgress");
    var reservation = document.getElementById("acHeroReservation");
    var benefits = document.getElementById("acHeroBenefits");
    var benefitsRow = document.querySelector(".ac-hero-benefits-row");
    var heroGridWrap = document.querySelector(".ac-hero__grid");
    var ageLabel = document.getElementById("acAgeLabel");
    var ageText = document.getElementById("acAgeText");
    var ageInput = document.getElementById("acAgeInput");
    var ageBlock = document.querySelector(".ac-age-block");
    var ageHead = document.querySelector(".ac-age-block__head");
    var isCompactWide = isCompactTab && !isMobileViewport();

    if (heroGridWrap) {
      heroGridWrap.classList.toggle("is-compact-wide", isCompactWide);
    }

    if (title) {
      title.textContent = profile.title;
      title.style.display = isCompactTab ? "none" : "";
    }
    if (subtitle) {
      subtitle.textContent = HERO_SUBTITLE_STATIC;
      subtitle.style.display = isCompactTab ? "none" : "";
    }
    if (progress) {
      progress.textContent = profile.progress;
      progress.style.display = isCompactTab ? "none" : "";
    }
    if (reservation) {
      if (isCompactTab) {
        reservation.hidden = true;
        reservation.innerHTML = "";
      } else {
        var reservationMarkup = buildHeroReservationMarkup(uiRuntime.fixedReservation);
        reservation.hidden = !reservationMarkup;
        reservation.innerHTML = reservationMarkup;
      }
    }
    if (ageText) {
      ageText.textContent = uiRuntime.ageSelectionConfirmed ? profile.ageText : "Возраст пока не выбран";
      ageText.style.display = uiRuntime.ageSelectionConfirmed ? "none" : "";
    }
    if (ageLabel) {
      ageLabel.textContent = uiRuntime.ageSelectionConfirmed ? profile.ageText : CONTENT_MAP.ui.ageLabel;
    }
    if (ageHead) {
      var resetButton = ensureAgeResetButton(ageHead);
      resetButton.hidden = !uiRuntime.ageSelectionConfirmed || isCompactTab;
    }
    if (ageBlock) {
      ageBlock.classList.toggle("is-attention", isAgeGateLocked() || uiRuntime.ageGateNudge);
      ageBlock.style.display = isCompactTab ? "none" : "";
      if (isCompactTab || !isAgeGateLocked()) {
        hideAgeGateHint();
      }
    }
    var ageMarks = document.querySelector(".ac-age-marks");
    if (ageMarks) {
      var marksHtml = "<span>—</span>";
      for (var m = 0; m < AGE_PROFILES.length; m += 1) {
        marksHtml += "<span>" + AGE_PROFILES[m].min + "-" + AGE_PROFILES[m].max + "</span>";
      }
      if (ageMarks.innerHTML !== marksHtml) {
        ageMarks.innerHTML = marksHtml;
      }
    }
    if (benefitsRow) {
      benefitsRow.style.display = isCompactTab ? "none" : "";
    }
    if (compactPanel) {
      if (isCompactTab) {
        compactPanel.hidden = false;
        compactPanel.innerHTML = buildCompactTabPanelMarkup();
      } else {
        compactPanel.hidden = true;
        compactPanel.innerHTML = "";
      }
    }
    var heroCard = document.querySelector(".ac-card--hero");
    if (heroCard) {
      heroCard.classList.toggle("is-compact-panel", isCompactTab);
    }
    var sliderValue = ageToSliderValue(state.age);
    if (ageInput) {
      ageInput.min = "0";
      ageInput.max = String(AGE_SLIDER_POINTS.length);
      ageInput.step = "1";
      if (Number(ageInput.value) !== sliderValue) {
        ageInput.value = String(sliderValue);
      }
    }

    if (benefits) {
      var benefitHtml = "";
      for (var i = 0; i < heroBenefits.length; i += 1) {
        var benefit = heroBenefits[i];
        var benefitIcon = resolveHeroBenefitIcon(benefit, i);
        benefitHtml +=
          "<li>" +
          '<span class="ac-benefit-icon">' +
          '<img class="ac-icon ac-icon--sm" src="' +
          benefitIcon +
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
    var isBookingInlineStep = !isIntroStep && (state.step >= 3 || !!uiRuntime.fixedReservation);
    var profile = findProfileByAge(state.age);

    var overlayTitle = document.getElementById("acHeroOverlayTitle");
    var line = document.getElementById("acProgramLine");
    var summary = document.getElementById("acProgramSummary");
    var status = document.getElementById("acStepStatus");
    var nextBtn = document.getElementById("acStepNextBtn");
    var prevBtn = document.querySelector('[data-action="step-prev"]');
    var heroGrid = document.querySelector(".ac-hero-grid");
    var booking = document.getElementById("acHeroBooking");
    var funnelControls = document.querySelector(".ac-funnel-controls");
    var overlay = document.querySelector(".ac-hero-overlay");
    var heroRight = document.querySelector(".ac-hero-right");

    syncHeroRightAgeLockedState(gateLocked);

    if (overlay) {
      overlay.classList.toggle("is-intro", isIntroStep);
    }
    if (heroRight) {
      heroRight.classList.toggle("is-intro", isIntroStep && state.mode === "compact");
    }

    if (isIntroStep) {
      var introPreview = getCompactTabPreview();
      if (overlayTitle) overlayTitle.textContent = gateLocked ? introPreview.title : profile.ageText;
      if (line) line.textContent = gateLocked ? introPreview.line : "Описание смены";
      if (summary) {
        summary.textContent = gateLocked
          ? introPreview.summary
          : profile.subtitle;
      }
    } else {
      if (overlayTitle) overlayTitle.textContent = CONTENT_MAP.ui.heroOverlayTitle;
      if (line) line.textContent = shift.line;
      if (summary) summary.textContent = shift.summary;
    }

    if (isBookingInlineStep) {
      if (overlayTitle) overlayTitle.textContent = "Бронирование";
      if (line) line.textContent = "Оставьте заявку — мы перезвоним";
      if (summary) {
        summary.textContent = "Промокод и смена подставляются автоматически.";
      }
    }

    if (heroGrid) {
      heroGrid.style.display = isBookingInlineStep ? "none" : "";
    }
    if (booking) {
      booking.hidden = !isBookingInlineStep;
      booking.innerHTML = isBookingInlineStep ? buildHeroBookingMarkup() : "";
    }

    if (status) {
      if (gateLocked) {
        status.textContent = "";
      } else {
        var visualTotalSteps = isBookingInlineStep ? 2 : 1;
        var visualStep = isBookingInlineStep ? 2 : 1;
        status.textContent =
          CONTENT_MAP.ui.stepLabel + " " + String(visualStep) + " " + CONTENT_MAP.ui.stepLabelDelimiter + " " + String(visualTotalSteps);
      }
    }

    if (nextBtn) {
      nextBtn.hidden = !!isBookingInlineStep;
      nextBtn.disabled = gateLocked;
      nextBtn.setAttribute("aria-disabled", String(gateLocked));
      if (isBookingInlineStep) {
        nextBtn.classList.remove("ac-primary-btn--intro");
        nextBtn.classList.remove("ac-primary-btn--cta");
        nextBtn.innerHTML = "";
      } else if (isIntroStep) {
        nextBtn.classList.add("ac-primary-btn--intro");
        nextBtn.classList.remove("ac-primary-btn--cta");
        nextBtn.innerHTML =
          '<img class="ac-icon ac-icon--sm" src="' +
          HERO_LUCIDE_ICONS.chevronRight +
          '" alt="" aria-hidden="true">';
        nextBtn.setAttribute("aria-label", "Следующий шаг");
      } else {
        nextBtn.classList.remove("ac-primary-btn--intro");
        nextBtn.classList.add("ac-primary-btn--cta");
        nextBtn.innerHTML =
          '<span>' +
          CONTENT_MAP.ui.finalBookingCta +
          '</span><img class="ac-icon ac-icon--sm" src="' +
          HERO_LUCIDE_ICONS.chevronRight +
          '" alt="" aria-hidden="true">';
        nextBtn.removeAttribute("aria-label");
      }
    }

    if (prevBtn) {
      var prevLocked = gateLocked || state.step === 0 || isBookingInlineStep;
      prevBtn.disabled = prevLocked;
      prevBtn.setAttribute("aria-disabled", String(prevLocked));
    }
    if (funnelControls) {
      funnelControls.classList.toggle("is-booking-inline", isBookingInlineStep);
      funnelControls.hidden = gateLocked;
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
    var whereIcons = [
      "/assets/icons/lucide/map-pinned.svg",
      "/assets/icons/lucide/house.svg"
    ];
    for (var i = 0; i < CONTENT_MAP.location.where.length; i += 1) {
      var whereIcon = whereIcons[i] || "/assets/icons/lucide/map-pinned.svg";
      whereList += '<p><img class="ac-icon ac-icon--sm" src="' + whereIcon + '" alt="" aria-hidden="true"> <span>' + CONTENT_MAP.location.where[i] + "</span></p>";
    }

    var nearby = "";
    var nearbyIcons = [
      "/assets/icons/lucide/car.svg",
      "/assets/icons/lucide/bus.svg",
      "/assets/icons/lucide/trees.svg",
      "/assets/icons/lucide/waves.svg"
    ];
    for (var j = 0; j < CONTENT_MAP.location.nearby.length; j += 1) {
      var nearbyIcon = nearbyIcons[j] || "/assets/icons/lucide/map-pinned.svg";
      nearby += '<p><img class="ac-icon ac-icon--sm" src="' + nearbyIcon + '" alt="" aria-hidden="true"> <span>' + CONTENT_MAP.location.nearby[j] + "</span></p>";
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
    var photoItemsPerPage = getPhotoItemsPerPage();
    var start = state.photoPage * photoItemsPerPage;
    var pageItems = photos.slice(start, start + photoItemsPerPage);
    var maxPage = Math.max(0, Math.ceil(photos.length / photoItemsPerPage) - 1);

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
    var videoItemsPerPage = getVideoItemsPerPage();
    var start = state.videoPage * videoItemsPerPage;
    var items = CONTENT_MAP.videos.slice(start, start + videoItemsPerPage);
    var maxPage = Math.max(0, Math.ceil(CONTENT_MAP.videos.length / videoItemsPerPage) - 1);
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
    var reviewItemsPerPage = getReviewItemsPerPage();
    var reviews = getVisibleReviews();
    var start = state.reviewPage * reviewItemsPerPage;
    var items = reviews.slice(start, start + reviewItemsPerPage);
    var maxPage = Math.max(0, Math.ceil(reviews.length / reviewItemsPerPage) - 1);
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
    var teamItemsPerPage = getTeamItemsPerPage();
    var start = state.teamPage * teamItemsPerPage;
    var items = CONTENT_MAP.team.slice(start, start + teamItemsPerPage);
    var maxPage = Math.max(0, Math.ceil(CONTENT_MAP.team.length / teamItemsPerPage) - 1);
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

  function renderFaqOverlay(container) {
    if (!container) return;

    var html = "";
    for (var i = 0; i < FAQ_DATA.length; i += 1) {
      var group = FAQ_DATA[i];
      html += '<div class="ac-left-faq__gt">';
      if (group.icon) {
        html +=
          '<img class="ac-icon ac-icon--sm" src="' +
          group.icon +
          '" alt="" aria-hidden="true"> ';
      }
      html += group.group + "</div>";

      for (var j = 0; j < group.items.length; j += 1) {
        var item = group.items[j];
        html +=
          '<div class="ac-left-faq__item">' +
          '<div class="ac-left-faq__q">' +
          item.q +
          "</div>" +
          '<div class="ac-left-faq__a">' +
          item.a +
          "</div>" +
          "</div>";
      }
    }

    container.innerHTML = html;
  }

  function renderLegacyFaqOverlay() {
    var faqContainer = document.getElementById("faqContainer");
    if (faqContainer) {
      renderFaqOverlay(faqContainer);
      return;
    }

    var legacyOverlay = document.getElementById("acLtFaq");
    if (!legacyOverlay) return;

    legacyOverlay.innerHTML = '<div class="ac-left-faq" id="faqContainer"></div>';
    var mounted = document.getElementById("faqContainer");
    if (!mounted) return;
    renderFaqOverlay(mounted);
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
    renderLegacyFaqOverlay();
  }

  function renderSections() {
    renderContentSections();

    var sections = document.querySelectorAll(".ac-section");
    for (var i = 0; i < sections.length; i += 1) {
      sections[i].classList.remove("ac-section--focus");
    }

    var targetId = TAB_TO_SECTION[state.activeTab];
    var isCompact = state.mode === "compact";

    for (var j = 0; j < sections.length; j += 1) {
      var section = sections[j];
      if (!isCompact) {
        section.hidden = false;
        continue;
      }
      section.hidden = !targetId || section.id !== targetId;
    }

    if (targetId) {
      var targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("ac-section--focus");
      }
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
      techBadge.hidden = false;

      var closeBtn = techBadge.querySelector('[data-action="tech-badge-close"]');
      if (closeBtn && closeBtn.dataset.bound !== "1") {
        closeBtn.dataset.bound = "1";
        closeBtn.addEventListener("click", function () {
          techBadge.hidden = true;
        });
        closeBtn.addEventListener("touchend", function () {
          techBadge.hidden = true;
        }, { passive: true });
      }
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

  function closeHeroContactDropdown(immediate) {
    var dropdown = document.getElementById("acHeroContactDropdown");
    var trigger = document.querySelector('[data-action="open-contact-toggle"]');
    if (heroContactAutoCloseTimer) {
      clearTimeout(heroContactAutoCloseTimer);
      heroContactAutoCloseTimer = null;
    }
    if (trigger) {
      trigger.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }
    if (!dropdown) return;
    if (dropdown.hidden) return;

    if (immediate) {
      dropdown.classList.remove("is-open");
      dropdown.hidden = true;
      return;
    }

    dropdown.classList.remove("is-open");
    var onCloseTransitionEnd = function (event) {
      if (event.target !== dropdown) return;
      dropdown.hidden = true;
      dropdown.removeEventListener("transitionend", onCloseTransitionEnd);
    };
    dropdown.addEventListener("transitionend", onCloseTransitionEnd);
  }

  function toggleHeroContactDropdown() {
    var dropdown = document.getElementById("acHeroContactDropdown");
    var trigger = document.querySelector('[data-action="open-contact-toggle"]');
    if (!dropdown || !trigger) return;
    if (heroContactAutoCloseTimer) {
      clearTimeout(heroContactAutoCloseTimer);
      heroContactAutoCloseTimer = null;
    }
    var willOpen = dropdown.hidden;
    if (willOpen) {
      dropdown.hidden = false;
      dropdown.classList.remove("is-open");
      dropdown.getBoundingClientRect();
      dropdown.classList.add("is-open");
      trigger.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      return;
    }
    closeHeroContactDropdown();
  }

  function scheduleHeroContactAutoClose() {
    var dropdown = document.getElementById("acHeroContactDropdown");
    if (!dropdown || dropdown.hidden) return;
    if (heroContactAutoCloseTimer) {
      clearTimeout(heroContactAutoCloseTimer);
    }
    heroContactAutoCloseTimer = setTimeout(function () {
      closeHeroContactDropdown();
    }, 1000);
  }

  function setupHeroContactAutoClose() {
    var contactRoot = document.querySelector(".ac-hero-contact");
    if (!contactRoot || contactRoot.dataset.autocloseBound === "1") return;
    contactRoot.dataset.autocloseBound = "1";

    contactRoot.addEventListener("mouseenter", function () {
      if (heroContactAutoCloseTimer) {
        clearTimeout(heroContactAutoCloseTimer);
        heroContactAutoCloseTimer = null;
      }
    });

    contactRoot.addEventListener("mouseleave", function () {
      scheduleHeroContactAutoClose();
    });

    contactRoot.addEventListener("focusin", function () {
      if (heroContactAutoCloseTimer) {
        clearTimeout(heroContactAutoCloseTimer);
        heroContactAutoCloseTimer = null;
      }
    });

    contactRoot.addEventListener("focusout", function (event) {
      if (contactRoot.contains(event.relatedTarget)) return;
      scheduleHeroContactAutoClose();
    });
  }

  function renderShiftOverlay() {
    refreshFixedReservationState();
    var allShifts = SHIFTS.slice(0, 4);
    var isExpanded = state.shiftView === "grid";
    var visibleCount = Math.min(2, allShifts.length);
    var showAllShifts = !!uiRuntime.shiftsShowAll;
    var visibleShifts = showAllShifts ? allShifts : allShifts.slice(0, visibleCount);
    var profile = findProfileByAge(state.age);
    var ageTitle = "СМЕНЫ ДЛЯ " + profile.min + "-" + profile.max + " ЛЕТ";
    var featuredShiftId = state.selectedShiftId;
    var featuredIndex = -1;
    for (var f = 0; f < visibleShifts.length; f += 1) {
      if (visibleShifts[f].id === featuredShiftId) {
        featuredIndex = f;
        break;
      }
    }
    if (featuredIndex < 0) {
      featuredIndex = 0;
      featuredShiftId = visibleShifts[0] ? visibleShifts[0].id : "";
    }

    function renderCompactShiftItem(shift, schedule) {
      return (
        '<button class="ac-shift-item' +
        (state.selectedShiftId === shift.id ? " is-active" : "") +
        '" type="button" data-action="select-shift" data-shift-id="' +
        shift.id +
        '">' +
        '<div class="ac-shift-item__body">' +
        (schedule.badge ? '<span class="ac-shift-item__badge">' + schedule.badge + "</span>" : "") +
        '<div class="ac-shift-item__line">' +
        '<span class="ac-shift-item__name">' + schedule.period + "</span>" +
        (schedule.days ? '<span class="ac-shift-item__days">' + schedule.days + "</span>" : "") +
        '<span class="ac-shift-item__date-icon" role="button" tabindex="0" data-action="shift-calendar-toggle" data-shift-id="' + shift.id + '">' +
        '<img class="ac-icon ac-icon--sm" src="' +
        ICON_MAP.clipboard +
        '" alt="" aria-hidden="true"></span>' +
        "</div>" +
        '<div class="ac-shift-item__meta">' +
        shift.summary +
        "</div>" +
        "</div>" +
        "</button>"
      );
    }

    var listHtml = "";
    for (var i = 0; i < visibleShifts.length; i += 1) {
      var shift = visibleShifts[i];
      var schedule = getShiftScheduleMeta(allShifts.indexOf(shift), shift);
      listHtml += renderCompactShiftItem(shift, schedule);
    }

    var expandedHtml = "";
    if (isExpanded && visibleShifts.length) {
      for (var e = 0; e < visibleShifts.length; e += 1) {
        var currentShift = visibleShifts[e];
        var sourceIndex = allShifts.indexOf(currentShift);
        var currentSchedule = getShiftScheduleMeta(sourceIndex, currentShift);

        if (e !== featuredIndex) {
          expandedHtml += renderCompactShiftItem(currentShift, currentSchedule);
          continue;
        }

        var priceSearchState = getPriceSearchState(currentShift.id);
        var renderedPrice = priceSearchState && (priceSearchState.status === "applied" || priceSearchState.status === "fixed")
          ? formatPrice(priceSearchState.confirmedPrice)
          : (currentSchedule.price || CONTENT_MAP.ui.shiftPriceFrom);

        if (priceSearchState && (priceSearchState.status === "searching" || priceSearchState.status === "done")) {
          var isPriceDone = priceSearchState.status === "done";
          var stageMarkup = priceSearchState.status === "done"
            ? ""
            : '<div class="ac-price-search__stage">' + (priceSearchState.stageText || PRICE_SEARCH_STAGES[0]) + "</div>";
          var searchIconMarkup = isPriceDone
            ? ""
            : '<div class="ac-price-search__icon"><img class="ac-icon ac-icon--md" src="' + ICON_MAP.search + '" alt="" aria-hidden="true"></div>';
          if (isPriceDone) {
            var isRoundTwo = Number(priceSearchState.round || 1) >= 2;
            var needsPhoneBind = isRoundTwo && !priceSearchState.fixedConfirmed;
            var phoneHintMarkup = "";
            var leftExtraMarkup =
              '<div class="ac-price-search-done__result">' +
              '<div class="ac-price-search-done__fill-title" data-price-kpi="status" data-shift-id="' + currentShift.id + '">Проверяем заполненность смены...</div>' +
              '<div class="ac-price-search-done__kpi">' +
              '<div class="ac-price-search-done__fill-main" data-price-kpi="value" data-shift-id="' + currentShift.id + '" data-target="' + (priceSearchState.occupancyPercent || 0) + '">0%</div>' +
              '<div class="ac-price-search-done__fill-bar"><span data-price-kpi="bar" data-shift-id="' + currentShift.id + '" style="width:0%;"></span></div>' +
              "</div>" +
              '<div class="ac-price-search-done__fill-sub">забронировано ' + (priceSearchState.occupancyLine || "") + "</div>" +
              "</div>";

            if (needsPhoneBind) {
              var phoneText = priceSearchState.phoneMasked || "+7";
              phoneHintMarkup =
                '<div class="ac-price-search-phone">' +
                '<div class="ac-price-search-phone__title">Для фиксации цены и привязки промокода введите номер телефона</div>' +
                '<input class="ac-price-search-phone__input" type="tel" inputmode="tel" autocomplete="tel" value="' + phoneText.replace(/"/g, "&quot;") + '" data-action="shift-price-phone" data-shift-id="' + currentShift.id + '" placeholder="+7 (___) ___-__-__">' +
                "</div>";
              leftExtraMarkup = phoneHintMarkup;
            }

            var rightActionsMarkup = "";
            if (isRoundTwo) {
              if (priceSearchState.fixedConfirmed) {
                rightActionsMarkup =
                  (priceSearchState.bookingPrompt
                    ? (
                      '<div class="ac-price-search-booking-prompt">' +
                      '<div class="ac-price-search-booking-prompt__title">Хотите сейчас оформить бронирование?</div>' +
                      '<div class="ac-price-search-booking-prompt__actions">' +
                      '<button class="ac-primary-btn ac-price-search-booking-prompt__yes" type="button" data-action="shift-booking-now" data-shift-id="' + currentShift.id + '">Да, хочу</button>' +
                      '<button class="ac-btn-soft ac-price-search-booking-prompt__later" type="button" data-action="shift-booking-later" data-shift-id="' + currentShift.id + '">Позже</button>' +
                      "</div>" +
                      "</div>"
                    )
                    : '<button class="ac-primary-btn ac-price-search__ok ac-price-search__fix is-fixed" type="button" disabled>Зафиксировано</button>');
              } else {
                rightActionsMarkup =
                  '<button class="ac-primary-btn ac-price-search__ok ac-price-search__fix" type="button" data-action="shift-price-fix" data-shift-id="' + currentShift.id + '"' +
                  (priceSearchState.phoneValid ? "" : " disabled") +
                  ">" +
                  (priceSearchState.phoneValid ? "Зафиксировать" : "Зафиксировать цену") +
                  "</button>";
              }
            } else {
              rightActionsMarkup = '<button class="ac-primary-btn ac-price-search__ok ac-price-search__upgrade" type="button" data-action="shift-price-upgrade" data-shift-id="' + currentShift.id + '">Улучшить цену</button>';
            }

            expandedHtml +=
              '<article class="ac-shift-item ac-shift-item--featured ac-shift-item--price-search-done">' +
              '<div class="ac-shift-item--featured__left ac-price-search-done__left">' +
              '<div class="ac-shift-item__line">' +
              '<span class="ac-shift-item__name">' + currentSchedule.period + "</span>" +
              (currentSchedule.days ? '<span class="ac-shift-item__days">' + currentSchedule.days + "</span>" : "") +
              '<button class="ac-shift-item__date-icon" type="button" data-action="shift-calendar-toggle" data-shift-id="' + currentShift.id + '" aria-label="Открыть календарь смены">' +
              '<img class="ac-icon ac-icon--sm" src="' + ICON_MAP.clipboard + '" alt="" aria-hidden="true"></button>' +
              "</div>" +
              '<div class="ac-shift-item__meta">' + currentShift.summary + "</div>" +
              leftExtraMarkup +
              "</div>" +
              '<div class="ac-shift-item--featured__right ac-price-search-done__right">' +
              '<div class="ac-price-search-done__confirmed">Цена подтверждена для вас</div>' +
              '<div class="ac-price-search-done__price">' + formatPrice(priceSearchState.confirmedPrice || 0) + "</div>" +
              '<div class="ac-price-search-done__promo">' +
              '<div class="ac-price-search-done__promo-code">' + (priceSearchState.promoCode || buildShiftPromoCode()) + "</div>" +
              '<div class="ac-price-search-done__promo-ttl">Действует: ' + (priceSearchState.promoTtl || PRICE_SEARCH_CFG.promoCodeTtl) + "</div>" +
              "</div>" +
              rightActionsMarkup +
              "</div>" +
              "</article>";
            continue;
          }
          expandedHtml +=
            '<article class="ac-shift-item ac-shift-item--featured ac-shift-item--price-search">' +
            '<div class="ac-price-search' + (isPriceDone ? " is-done" : "") + '">' +
            searchIconMarkup +
            '<h4 class="ac-price-search__title">Ищем лучшую цену</h4>' +
            '<div class="ac-price-search__bar"><span style="width:' + Math.max(0, Math.min(100, priceSearchState.progress || 0)) + '%;"></span></div>' +
            stageMarkup +
            "</div>" +
            "</article>";
          continue;
        }

        expandedHtml +=
          '<article class="ac-shift-item ac-shift-item--featured">' +
          '<div class="ac-shift-item--featured__left">' +
          (currentSchedule.badge ? '<span class="ac-shift-item__badge">' + currentSchedule.badge + "</span>" : "") +
          '<div class="ac-shift-item__line">' +
          '<span class="ac-shift-item__name">' + currentSchedule.period + "</span>" +
          (currentSchedule.days ? '<span class="ac-shift-item__days">' + currentSchedule.days + "</span>" : "") +
          '<button class="ac-shift-item__date-icon" type="button" data-action="shift-calendar-toggle" data-shift-id="' + currentShift.id + '" aria-label="Открыть календарь смены">' +
          '<img class="ac-icon ac-icon--sm" src="' +
          ICON_MAP.clipboard +
          '" alt="" aria-hidden="true"></button>' +
          "</div>" +
          '<div class="ac-shift-item__meta">' + currentShift.summary + "</div>" +
          '<div class="ac-shift-item__helper">' + currentSchedule.helper + "</div>" +
          '<div class="ac-shift-item__actions">' +
          '<button class="ac-btn-soft ac-btn-soft--shift" type="button" data-action="shift-price-preview">' +
          currentSchedule.primaryCta +
          "</button>" +
          '<button class="ac-primary-btn ac-primary-btn--shift" type="button" data-action="shift-details-preview">' +
          currentSchedule.secondaryCta +
          "</button>" +
          "</div>" +
          "</div>" +
          '<div class="ac-shift-item--featured__right">' +
          '<div class="ac-shift-item__price-large">' + renderedPrice + "</div>" +
          (uiRuntime.shiftCalendar.open && uiRuntime.shiftCalendar.shiftId === currentShift.id
            ? buildShiftCalendarMarkup(currentSchedule, currentShift.id)
            : "") +
          "</div>" +
          "</article>";
      }
    }

    var showMoreBtn =
      !showAllShifts && allShifts.length > 2
        ? '<button class="ac-primary-btn ac-shifts-more-btn" type="button" data-action="set-shift-view" data-shift-view="grid">Показать ещё 2 смены →</button>'
        : "";

    return (
      '<div class="ac-overlay-backdrop" data-action="overlay-backdrop">' +
      '<article class="ac-overlay-card ac-overlay-card--shifts" role="dialog" aria-modal="true" aria-label="' +
      CONTENT_MAP.ui.shiftsTitle +
      '">' +
      '<div class="ac-overlay-head">' +
      '<h3 class="ac-overlay-title ac-overlay-title--shifts">' +
      ageTitle +
      '</h3>' +
      '<button class="ac-overlay-close" type="button" data-action="overlay-close" aria-label="' + CONTENT_MAP.ui.closeAria + '">' +
      '<img class="ac-icon ac-icon--sm" src="' +
      ICON_MAP.close +
      '" alt="" aria-hidden="true">' +
      "</button>" +
      "</div>" +
      '<div class="ac-shift-list ac-shift-list--compact">' +
      (isExpanded ? expandedHtml : listHtml) +
      "</div>" +
      '<div class="ac-overlay-actions ac-overlay-actions--shifts">' +
      showMoreBtn +
      "</div>" +
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

    if (state.overlays.shifts) {
      overlayRoot.style.pointerEvents = "auto";
      overlayRoot.innerHTML = renderShiftOverlay();
      animateDonePriceKpi();
      startPromoTicker();
      return;
    }

    stopPromoTicker();
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
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    var ageGateHintClose = event.target.closest('[data-action="age-gate-hint-close"]');
    if (ageGateHintClose) {
      event.preventDefault();
      event.stopPropagation();
      uiRuntime.ageGateHintDismissed = true;
      hideAgeGateHint();
      return;
    }

    var resetAge = event.target.closest('[data-action="reset-age"]');
    if (resetAge) {
      event.preventDefault();
      event.stopPropagation();
      resetAgeSelection();
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

    var tabCandidate = event.target.closest('[data-action="tab"]');
    var contactToggle = event.target.closest('[data-action="open-contact-toggle"]');
    var aiProgramsToggle = event.target.closest('[data-action="open-ai-programs"]');
    var inHeroContactDropdown = event.target.closest("#acHeroContactDropdown");

    if (contactToggle) {
      event.preventDefault();
      event.stopPropagation();
      toggleHeroContactDropdown();
      return;
    }

    if (aiProgramsToggle) {
      event.preventDefault();
      event.stopPropagation();
      var aiTabKey = resolveTabKey("aiprogram");
      setActiveTab(aiTabKey);
      if (state.mode === "full") {
        var aiTarget = document.querySelector("#ai");
        if (aiTarget) {
          aiTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      return;
    }

    if (!inHeroContactDropdown) {
      closeHeroContactDropdown();
    }

    if (isAgeGateLocked()) {
      var inAgeInput = event.target.closest("#acAgeInput, .ac-age-input");
      var inAuditPanelsForGate = event.target.closest(".ac-audit-panel, .ac-audit-control-panel, .ac-audit-stage-panel");
      var inAllowedGateArea = event.target.closest('[data-action="open-contact-toggle"], #acHeroContactDropdown, [data-action="open-ai-programs"]');
      if (!inAgeInput && !inAuditPanelsForGate && !inAllowedGateArea) {
        event.preventDefault();
        event.stopPropagation();
        nudgeAgeSelection();
        return;
      }
    }

    var toggle = event.target.closest('[data-action="toggle-mode"]');
    if (toggle) {
      setMode(getNextMode(state.mode));
      return;
    }

    var tab = tabCandidate;
    if (tab) {
      event.preventDefault();
      setActiveTab(resolveTabKey(tab.dataset.tab));
      openTabTarget(tab);
      return;
    }

    var prevStep = event.target.closest('[data-action="step-prev"]');
    if (prevStep) {
      setStep(state.step - 1);
      return;
    }

    var nextStep = event.target.closest('[data-action="step-next"]');
    if (nextStep) {
      if (state.step === 0) {
        setStep(state.step + 1);
        return;
      }

      if (isBookingOverlayOpen(state)) {
        return;
      }

      track("booking_clicked", {
        step: state.step + 1,
        shift_id: state.selectedShiftId,
        direction: state.direction
      });
      setOverlay("shifts", true);
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
      var targetView = shiftViewButton.dataset.shiftView || "list";
      var prevShowAll = !!uiRuntime.shiftsShowAll;
      if (targetView === "grid") {
        uiRuntime.shiftsShowAll = true;
      } else {
        uiRuntime.shiftsShowAll = false;
      }
      if (targetView === state.shiftView && prevShowAll !== uiRuntime.shiftsShowAll) {
        renderOverlays();
        return;
      }
      setShiftView(targetView);
      return;
    }

    var shiftCalendarToggle = event.target.closest('[data-action="shift-calendar-toggle"]');
    if (shiftCalendarToggle) {
      event.preventDefault();
      event.stopPropagation();
      openShiftCalendar(shiftCalendarToggle.dataset.shiftId || state.selectedShiftId);
      return;
    }

    var shiftCalendarClose = event.target.closest('[data-action="shift-calendar-close"]');
    if (shiftCalendarClose) {
      event.preventDefault();
      event.stopPropagation();
      setShiftCalendarState(false, null);
      return;
    }

    var shiftPricePreview = event.target.closest('[data-action="shift-price-preview"]');
    if (shiftPricePreview) {
      event.preventDefault();
      event.stopPropagation();
      startShiftPriceSearch(state.selectedShiftId);
      return;
    }

    var shiftPriceUpgrade = event.target.closest('[data-action="shift-price-upgrade"]');
    if (shiftPriceUpgrade) {
      event.preventDefault();
      event.stopPropagation();
      var shiftIdForUpgrade = shiftPriceUpgrade.dataset.shiftId || state.selectedShiftId;
      startShiftPriceSearch(shiftIdForUpgrade, { round: 2 });
      return;
    }

    var shiftPriceFix = event.target.closest('[data-action="shift-price-fix"]');
    if (shiftPriceFix) {
      event.preventDefault();
      event.stopPropagation();
      var shiftIdForFix = shiftPriceFix.dataset.shiftId || state.selectedShiftId;
      var fixedState = getPriceSearchState(shiftIdForFix);
      if (fixedState && fixedState.status === "done" && fixedState.phoneValid) {
        var savedPromo = saveFixedPromoToStorage(shiftIdForFix, fixedState);
        setPriceSearchState(shiftIdForFix, {
          status: "done",
          progress: 100,
          fixedConfirmed: true,
          bookingPrompt: true,
          promoTtl: savedPromo ? formatRemainingTtl(getPromoRemainingMs(savedPromo)) : fixedState.promoTtl
        });
        applyPromoToBookingForm(fixedState.promoCode || buildShiftPromoCode(shiftIdForFix));
        renderInfoCard();
      }
      return;
    }

    var shiftBookingNow = event.target.closest('[data-action="shift-booking-now"]');
    if (shiftBookingNow) {
      event.preventDefault();
      event.stopPropagation();
      var shiftIdForNow = shiftBookingNow.dataset.shiftId || state.selectedShiftId;
      var targetShift = findShiftById(shiftIdForNow);
      if (targetShift) {
        state.selectedShiftId = targetShift.id;
        state.direction = targetShift.direction;
      }
      setStep(3);
      setOverlay("shifts", false);
      return;
    }

    var shiftBookingLater = event.target.closest('[data-action="shift-booking-later"]');
    if (shiftBookingLater) {
      event.preventDefault();
      event.stopPropagation();
      var shiftIdForLater = shiftBookingLater.dataset.shiftId || state.selectedShiftId;
      var laterState = getPriceSearchState(shiftIdForLater);
      if (laterState) {
        setPriceSearchState(shiftIdForLater, {
          bookingPrompt: false
        });
      }
      return;
    }

    var bookingFixed = event.target.closest('[data-action="booking-open-fixed"]');
    if (bookingFixed) {
      event.preventDefault();
      event.stopPropagation();
      if (uiRuntime.fixedReservation && uiRuntime.fixedReservation.shiftId) {
        var reservedShift = findShiftById(uiRuntime.fixedReservation.shiftId);
        if (reservedShift) {
          state.selectedShiftId = reservedShift.id;
          state.direction = reservedShift.direction;
        }
      }
      if (!isBookingOverlayOpen(state)) {
        track("booking_clicked", {
          step: state.step + 1,
          shift_id: state.selectedShiftId,
          direction: state.direction
        });
        setOverlay("shifts", true);
      }
      return;
    }

    var bookingInlineSubmit = event.target.closest('[data-action="booking-submit-inline"]');
    if (bookingInlineSubmit) {
      event.preventDefault();
      event.stopPropagation();
      var nameInput = document.getElementById("acHeroBookName");
      var phoneInput = document.getElementById("acHeroBookPhone");
      var promoInput = document.getElementById("acHeroBookPromo");
      var statusLine = document.getElementById("acHeroBookStatus");
      var nameValue = (nameInput && nameInput.value || "").trim();
      var phoneValue = (phoneInput && phoneInput.value || "").trim();
      var promoValue = (promoInput && promoInput.value || "").trim();

      if (!nameValue || !phoneValue) {
        if (statusLine) {
          statusLine.textContent = "Заполните имя и телефон.";
        }
        return;
      }

      saveHeroBookingDraft(nameValue, phoneValue);
      if (promoValue) {
        applyPromoToBookingForm(promoValue);
      }

      track("booking_clicked", {
        step: state.step + 1,
        shift_id: state.selectedShiftId,
        direction: state.direction
      });

      if (statusLine) {
        statusLine.textContent = "Заявка отправлена. Мы свяжемся с вами.";
      }
      return;
    }

    var shiftPriceOk = event.target.closest('[data-action="shift-price-ok"]');
    if (shiftPriceOk) {
      event.preventDefault();
      event.stopPropagation();
      var shiftIdForDone = shiftPriceOk.dataset.shiftId || state.selectedShiftId;
      var doneState = getPriceSearchState(shiftIdForDone);
      if (doneState && doneState.status === "done") {
        setPriceSearchState(shiftIdForDone, {
          status: "applied",
          progress: 100
        });
      }
      return;
    }

    var shiftButton = event.target.closest('[data-action="select-shift"]');
    if (shiftButton) {
      setSelectedShift(shiftButton.dataset.shiftId || SHIFTS[0].id);
      if (state.overlays.shifts && state.shiftView !== "grid") {
        setShiftView("grid");
      }
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

    var faqOverlayItem = event.target.closest(".ac-left-faq__item");
    if (faqOverlayItem) {
      var faqScope = faqOverlayItem.closest(".ac-left-faq");
      if (faqScope) {
        var items = faqScope.querySelectorAll(".ac-left-faq__item");
        for (var i = 0; i < items.length; i += 1) {
          if (items[i] !== faqOverlayItem) {
            items[i].classList.remove("is-open");
          }
        }
      }
      faqOverlayItem.classList.toggle("is-open");
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

    var shiftPhoneInput = event.target.closest('[data-action="shift-price-phone"]');
    if (shiftPhoneInput) {
      var shiftId = shiftPhoneInput.dataset.shiftId || state.selectedShiftId;
      var prev = getPriceSearchState(shiftId);
      if (!prev) return;
      var masked = formatPhoneMask(shiftPhoneInput.value);
      setPriceSearchState(shiftId, {
        phoneMasked: masked,
        phoneValid: isPhoneValid(masked)
      });
      return;
    }

    var ageInput = event.target.closest("#acAgeInput");
    if (!ageInput) return;
    var sliderRaw = Number(ageInput.value);
    if (sliderRaw <= 0) {
      if (isAgeGateLocked()) {
        nudgeAgeSelection();
      } else {
        ageInput.value = String(ageToSliderValue(state.age));
      }
      return;
    }
    setAge(sliderValueToAge(sliderRaw));
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeAllOverlays();
    }
  }

  function setupCompactPanelSmoothScroll() {
    if (compactPanelScrollBound) return;
    compactPanelScrollBound = true;

    document.addEventListener(
      "wheel",
      function (event) {
        var panel = event.target && event.target.closest ? event.target.closest("#acCompactTabPanel") : null;
        if (!panel || panel.hidden) return;
        if (state.mode !== "compact" || state.activeTab === "info") return;
        if (panel.scrollHeight <= panel.clientHeight) return;

        event.preventDefault();
        var delta = event.deltaY || 0;
        var target = clamp(panel.scrollTop + delta, 0, panel.scrollHeight - panel.clientHeight);
        panel.scrollTo({
          top: target,
          behavior: "smooth"
        });
      },
      { passive: false }
    );
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
    hydrateStoredAge();
    hydrateFixedPromoFromStorage();

    renderInitial({
      renderLayout: renderLayout,
      renderStaticLabels: renderStaticLabels,
      renderMenu: renderMenu,
      renderInfoCard: renderInfoCard,
      renderFunnel: renderFunnel,
      renderSections: renderSections,
      renderFooter: renderFooter,
      renderOverlays: renderOverlays
    });

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

    bindGlobalEvents({
      click: handleClick,
      input: handleInput,
      keydown: handleKeydown
    });
    setupHeroContactAutoClose();
    setupCompactPanelSmoothScroll();

    setupAuditToggleButton();
    enableAuditMode();
  }

export function initApp() {
  bootstrap();
}
