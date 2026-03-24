(function () {
  "use strict";

  var STORAGE_KEY = "cwf:sandbox:v1";
  var TOAST_MS = 5200;
  var TOTAL_SEATS = 45;

  var SHIFTS = [
    {
      id: "shift-1",
      title: "1 смена",
      dateLabel: "30 мая - 8 июня",
      start: "2026-05-30",
      end: "2026-06-08",
      days: 8,
      ageRange: "7-14",
      location: "Подмосковье",
      summary: "Визуальное программирование, первые игры, логика.",
      basePrice: 85000,
      anchorPrice: 79000,
      seatsLeft: 12
    },
    {
      id: "shift-2",
      title: "2 смена",
      dateLabel: "10 июня - 16 июня",
      start: "2026-06-10",
      end: "2026-06-16",
      days: 6,
      ageRange: "7-14",
      location: "Подмосковье",
      summary: "Python, веб-проекты и командные мини-спринты.",
      basePrice: 58000,
      anchorPrice: 48000,
      seatsLeft: 8
    },
    {
      id: "shift-3",
      title: "3 смена",
      dateLabel: "16 июня - 23 июня",
      start: "2026-06-16",
      end: "2026-06-23",
      days: 7,
      ageRange: "7-14",
      location: "Подмосковье",
      summary: "AI-практика, анализ данных, проектная защита.",
      basePrice: 69000,
      anchorPrice: 65000,
      seatsLeft: 5
    },
    {
      id: "shift-4",
      title: "4 смена",
      dateLabel: "10 июня - 23 июня",
      start: "2026-06-10",
      end: "2026-06-23",
      days: 13,
      ageRange: "7-14",
      location: "Подмосковье",
      summary: "Длинная смена: полный цикл обучения и проектной практики.",
      basePrice: 111000,
      anchorPrice: 95000,
      seatsLeft: 14
    },
    {
      id: "shift-5",
      title: "5 смена",
      dateLabel: "3 августа - 15 августа",
      start: "2026-08-03",
      end: "2026-08-15",
      days: 12,
      ageRange: "7-14",
      location: "Подмосковье",
      summary: "Летний интенсив: проекты, командные задачи, защита результатов.",
      basePrice: 98000,
      anchorPrice: 89400,
      seatsLeft: 7
    },
    {
      id: "shift-6",
      title: "6 смена",
      dateLabel: "17 августа - 26 августа",
      start: "2026-08-17",
      end: "2026-08-26",
      days: 9,
      ageRange: "7-14",
      location: "Подмосковье",
      summary: "Финальная августовская смена с практическими IT-кейсами.",
      basePrice: 79000,
      anchorPrice: 69600,
      seatsLeft: 15
    }
  ];

  var PROGRESS_STEPS = {
    first_72h: [
      "Проверяем доступные места...",
      "Смотрим возможные отмены и спец-условия...",
      "Подбираем лучшую цену для вашего бронирования..."
    ],
    final_24h: [
      "Проверяем доступность мест...",
      "Ищем финальные спец-условия..."
    ]
  };

  var AGE_OPTIONS = ["", "7-9", "10-12", "13-14"];

  var SHIFT_SUMMARY_BY_AGE = {
    "shift-1": {
      "7-9": "Визуальное программирование, первые игры, логика.",
      "10-12": "Python и веб-проекты, первые командные мини-спринты.",
      "13-14": "AI-практика, анализ данных и защита мини-проекта."
    },
    "shift-2": {
      "7-9": "Scratch и визуальные проекты: алгоритмы, игровые механики, логика.",
      "10-12": "Python, веб-проекты и командные мини-спринты.",
      "13-14": "AI-инструменты, продуктовые задачи и командная разработка."
    },
    "shift-3": {
      "7-9": "Игровые IT-проекты, логика, первые презентации результатов.",
      "10-12": "AI-практика, анализ данных, проектная защита.",
      "13-14": "AI-интенсив, хакатоны и проектная защита."
    },
    "shift-4": {
      "7-9": "Длинная смена: визуальные IT-проекты и командная практика.",
      "10-12": "Длинная смена: полный цикл обучения и проектной практики.",
      "13-14": "Длинная смена: AI-кейсы, командные проекты и защита."
    },
    "shift-5": {
      "7-9": "Летний интенсив: игровые проекты, логика и командные задачи.",
      "10-12": "Летний интенсив: проекты, командные задачи, защита результатов.",
      "13-14": "Летний интенсив: AI-проекты, аналитика и защита результатов."
    },
    "shift-6": {
      "7-9": "Финальная смена: закрепление навыков через игровые IT-кейсы.",
      "10-12": "Финальная августовская смена с практическими IT-кейсами.",
      "13-14": "Финальная смена: AI-кейсы, проектная практика и презентация."
    }
  };

  var state = {
    userContext: null,
    events: [],
    ui: {
      entryStarted: false,
      showAllShifts: false,
      modal: null,
      modalToken: 0,
      toast: "",
      toastTimer: null,
      bookingOpen: false,
      bookingError: "",
      bookingSuccess: null,
      bookingForm: {
        childName: "",
        childAge: "",
        parentName: "",
        phone: "",
        email: "",
        consent: false
      }
    }
  };

  var dom = {
    entryCta: document.getElementById("ofEntryCta"),
    entryHint: document.getElementById("ofEntryHint"),
    ageBlock: document.getElementById("ofAgeBlock"),
    ageInput: document.getElementById("ofAgeInput"),
    ageText: document.getElementById("ofAgeText"),
    ageReset: document.getElementById("ofAgeReset"),
    resetState: document.getElementById("ofResetState"),
    clearEvents: document.getElementById("ofClearEvents"),
    toggleShifts: document.getElementById("ofToggleShifts"),
    shiftList: document.getElementById("ofShiftList"),
    shiftCard: document.getElementById("ofShiftCard"),
    bookingBlock: document.getElementById("ofBookingBlock"),
    successBlock: document.getElementById("ofSuccessBlock"),
    heroLeft: document.getElementById("ofHeroLeft"),
    heroRight: document.getElementById("ofHeroRight"),
    events: document.getElementById("ofEvents"),
    modalRoot: document.getElementById("ofModalRoot"),
    toast: document.getElementById("ofToast")
  };

  init();

  function init() {
    hydrateState();
    bindEvents();
    startTick();
    render();
  }

  function bindEvents() {
    dom.ageInput.addEventListener("input", function () {
      setSelectedAge(AGE_OPTIONS[Number(dom.ageInput.value) || 0] || null);
    });

    dom.ageReset.addEventListener("click", function () {
      setSelectedAge(null);
    });

    dom.entryCta.addEventListener("click", function () {
      if (!state.userContext.selectedAge) {
        showToast("Сначала выберите возраст ребенка.");
        renderAgeGate();
        return;
      }
      state.ui.entryStarted = true;
      state.ui.bookingOpen = false;
      state.ui.bookingSuccess = null;
      if (!state.userContext.currentShiftId) {
        state.userContext.currentShiftId = getNearestShifts(1)[0].id;
      }
      if (!state.userContext.heroState.heroLeft) {
        syncHeroFromShift(getShiftById(state.userContext.currentShiftId));
      }
      persistState();
      render();
    });

    dom.resetState.addEventListener("click", function () {
      localStorage.removeItem(STORAGE_KEY);
      hydrateState();
      render();
    });

    dom.clearEvents.addEventListener("click", function () {
      state.events = [];
      persistState();
      renderEvents();
    });

    dom.toggleShifts.addEventListener("click", function () {
      state.ui.showAllShifts = !state.ui.showAllShifts;
      renderShiftList();
    });

    dom.shiftList.addEventListener("click", function (event) {
      var shiftButton = event.target.closest('[data-action="select-shift"]');
      if (!shiftButton) return;
      var shift = getShiftById(shiftButton.getAttribute("data-shift-id"));
      if (!shift) return;
      state.userContext.currentShiftId = shift.id;
      state.ui.bookingOpen = false;
      state.ui.bookingSuccess = null;
      syncHeroFromShift(shift);
      persistState();
      render();
    });

    dom.shiftCard.addEventListener("click", function (event) {
      var cta = event.target.closest('[data-action="open-main-cta"]');
      if (cta) {
        handleMainCta();
        return;
      }

      var clearHero = event.target.closest('[data-action="clear-hero"]');
      if (clearHero) {
        clearHeroState();
        return;
      }

      var expireOffer = event.target.closest('[data-action="sandbox-expire-offer"]');
      if (expireOffer) {
        expireActiveOfferForSandbox();
      }
    });

    dom.bookingBlock.addEventListener("input", function (event) {
      var input = event.target;
      var field = input.getAttribute("name");
      if (!field || !Object.prototype.hasOwnProperty.call(state.ui.bookingForm, field)) return;
      if (field === "phone") {
        state.ui.bookingForm.phone = normalizePhone(input.value);
      } else if (field === "consent") {
        state.ui.bookingForm.consent = !!input.checked;
      } else {
        state.ui.bookingForm[field] = String(input.value || "");
      }
      state.ui.bookingError = "";
      renderBooking();
    });

    dom.bookingBlock.addEventListener("click", function (event) {
      var submit = event.target.closest('[data-action="submit-booking"]');
      if (submit) {
        submitBooking();
      }
    });

    dom.modalRoot.addEventListener("click", function (event) {
      var close = event.target.closest('[data-action="modal-close"]');
      if (close || event.target === dom.modalRoot) {
        closeModalWithDefaultAction();
        return;
      }

      var saveBrowser = event.target.closest('[data-action="offer-save-browser"]');
      if (saveBrowser) {
        commitModalOfferWithoutPhone();
        return;
      }

      var confirm = event.target.closest('[data-action="offer-confirm"]');
      if (confirm) {
        commitModalOfferWithAction();
      }
    });

    dom.modalRoot.addEventListener("input", function (event) {
      if (!state.ui.modal || state.ui.modal.phase !== "result") return;
      var phoneField = event.target.closest('[name="modal-phone"]');
      if (phoneField) {
        state.ui.modal.phoneInput = normalizePhone(phoneField.value);
      }
      var consent = event.target.closest('[name="modal-consent"]');
      if (consent) {
        state.ui.modal.consent = !!consent.checked;
      }
      state.ui.modal.error = "";
      renderModal();
    });
  }

  function hydrateState() {
    var snapshot = null;
    try {
      snapshot = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch (_err) {
      snapshot = null;
    }

    var fallbackDeviceId = createDeviceId();
    state.userContext = {
      deviceId: fallbackDeviceId,
      phone: null,
      selectedAge: null,
      currentShiftId: null,
      activeOffer: null,
      offerHistory: [],
      heroState: {
        heroLeft: null,
        heroRight: null
      }
    };

    state.events = [];

    if (snapshot && snapshot.userContext && typeof snapshot.userContext === "object") {
      var incoming = snapshot.userContext;
      state.userContext.deviceId = String(incoming.deviceId || fallbackDeviceId);
      state.userContext.phone = incoming.phone ? normalizePhone(incoming.phone) : null;
      state.userContext.selectedAge = normalizeAge(incoming.selectedAge);
      state.userContext.currentShiftId = incoming.currentShiftId || null;
      state.userContext.activeOffer = normalizeOffer(incoming.activeOffer);
      state.userContext.offerHistory = normalizeOfferHistory(incoming.offerHistory);
      state.userContext.heroState = normalizeHeroState(incoming.heroState);
      state.events = Array.isArray(snapshot.events) ? snapshot.events.slice(0, 30) : [];
    }

    if (!state.userContext.currentShiftId) {
      state.userContext.currentShiftId = getNearestShifts(1)[0].id;
    }

    refreshOfferStatus();
    persistState();
  }

  function persistState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      userContext: state.userContext,
      events: state.events.slice(0, 30)
    }));
  }

  function normalizeOffer(offer) {
    if (!offer || typeof offer !== "object") return null;
    if (!offer.shiftId || !offer.type) return null;
    return {
      offerId: String(offer.offerId || makeOfferId()),
      shiftId: String(offer.shiftId),
      type: offer.type === "final_24h" ? "final_24h" : "first_72h",
      basePrice: toPrice(offer.basePrice),
      improvedPrice: toPrice(offer.improvedPrice),
      createdAt: Number(offer.createdAt || Date.now()),
      expiresAt: Number(offer.expiresAt || Date.now()),
      boundTo: {
        phone: offer.boundTo && offer.boundTo.phone ? normalizePhone(offer.boundTo.phone) : null,
        deviceId: offer.boundTo && offer.boundTo.deviceId ? String(offer.boundTo.deviceId) : state.userContext.deviceId
      },
      status: normalizeOfferStatus(offer.status)
    };
  }

  function normalizeOfferHistory(items) {
    if (!Array.isArray(items)) return [];
    var output = [];
    for (var i = 0; i < items.length; i += 1) {
      var safe = normalizeOffer(items[i]);
      if (safe) output.push(safe);
      if (output.length >= 40) break;
    }
    return output;
  }

  function normalizeHeroState(heroState) {
    var defaultState = { heroLeft: null, heroRight: null };
    if (!heroState || typeof heroState !== "object") return defaultState;
    return {
      heroLeft: heroState.heroLeft && typeof heroState.heroLeft === "object" ? heroState.heroLeft : null,
      heroRight: heroState.heroRight && typeof heroState.heroRight === "object" ? heroState.heroRight : null
    };
  }

  function normalizeAge(value) {
    var safe = String(value || "").trim();
    return AGE_OPTIONS.indexOf(safe) > 0 ? safe : null;
  }

  function ageToInputValue(age) {
    var normalized = normalizeAge(age);
    if (!normalized) return 0;
    var index = AGE_OPTIONS.indexOf(normalized);
    return index > 0 ? index : 0;
  }

  function setSelectedAge(age) {
    var normalized = normalizeAge(age);
    state.userContext.selectedAge = normalized;
    state.ui.entryStarted = false;
    state.ui.showAllShifts = false;
    state.ui.bookingOpen = false;
    state.ui.bookingSuccess = null;
    state.ui.modal = null;
    state.ui.modalToken += 1;
    state.userContext.activeOffer = null;
    state.userContext.heroState.heroRight = null;
    var currentShift = getCurrentShift();
    if (currentShift) {
      syncHeroFromShift(currentShift);
    } else {
      state.userContext.heroState.heroLeft = null;
    }
    persistState();
    render();
  }

  function normalizeOfferStatus(status) {
    if (status === "active" || status === "expired" || status === "used") return status;
    return "active";
  }

  function createDeviceId() {
    return "device-" + Math.random().toString(36).slice(2, 10) + "-" + Date.now().toString(36);
  }

  function startTick() {
    setInterval(function () {
      if (refreshOfferStatus()) {
        persistState();
        render();
      } else {
        renderHeroBlocks();
        renderShiftCard();
      }
    }, 1000);
  }

  function refreshOfferStatus() {
    var changed = false;
    var active = state.userContext.activeOffer;
    if (active && active.status === "active" && Number(active.expiresAt || 0) <= Date.now()) {
      active.status = "expired";
      state.userContext.offerHistory.unshift(active);
      state.userContext.activeOffer = null;
      changed = true;
    }
    return changed;
  }

  function render() {
    refreshOfferStatus();
    renderAgeGate();
    renderShiftList();
    renderShiftCard();
    renderBooking();
    renderSuccess();
    renderHeroBlocks();
    renderEvents();
    renderModal();
    renderToast();
  }

  function renderAgeGate() {
    var selectedAge = state.userContext.selectedAge;
    var hasAge = !!selectedAge;

    dom.ageInput.value = String(ageToInputValue(selectedAge));
    dom.ageText.textContent = hasAge ? ("Возраст: " + selectedAge + " лет") : "—";
    dom.ageReset.hidden = !hasAge;
    dom.ageBlock.classList.toggle("is-attention", !hasAge);
    dom.entryCta.disabled = !hasAge;
    dom.entryCta.setAttribute("aria-disabled", hasAge ? "false" : "true");
    dom.entryHint.textContent = hasAge
      ? ("Возраст выбран: " + selectedAge + ". Теперь откройте список смен.")
      : "Сначала выберите возраст, затем откройте смены и цены.";
  }

  function renderShiftList() {
    if (!state.userContext.selectedAge) {
      dom.shiftList.innerHTML = '<p class="cwf-help">Сначала выберите возраст ребенка.</p>';
      dom.toggleShifts.hidden = true;
      return;
    }

    if (!state.ui.entryStarted) {
      dom.shiftList.innerHTML = '<p class="cwf-help">Нажмите «Выбрать смену и цену», чтобы открыть список смен.</p>';
      dom.toggleShifts.hidden = true;
      return;
    }

    var nearest = getNearestShifts(2);
    var list = state.ui.showAllShifts ? SHIFTS.slice() : nearest;
    dom.toggleShifts.hidden = SHIFTS.length <= 2;
    dom.toggleShifts.textContent = state.ui.showAllShifts ? "Скрыть дополнительные смены" : "Показать другие смены";

    dom.shiftList.innerHTML = list.map(function (shift) {
      var occupancy = getOccupancy(shift);
      var badge = getStatusBadge(occupancy);
      var summary = getShiftSummary(shift);
      return (
        '<div class="cwf-shift-item">' +
          '<div class="cwf-shift-item__top">' +
            '<div>' +
              '<div class="cwf-shift-item__title">' + escapeHtml(shift.title + " • " + shift.dateLabel) + '</div>' +
              '<div class="cwf-mini">Возраст: ' + escapeHtml(shift.ageRange) + ' • ' + escapeHtml(shift.location) + '</div>' +
            '</div>' +
            '<span class="cwf-badge ' + badge.className + '">' + badge.text + '</span>' +
          '</div>' +
          '<div class="cwf-help">' + escapeHtml(summary) + '</div>' +
          '<div class="cwf-mini">Заполнено ' + occupancy + '% мест</div>' +
          '<button class="cwf-action-btn" type="button" data-action="select-shift" data-shift-id="' + shift.id + '">Открыть карточку смены</button>' +
        '</div>'
      );
    }).join("");
  }

  function renderShiftCard() {
    var shift = getCurrentShift();
    if (!state.ui.entryStarted || !shift) {
      dom.shiftCard.hidden = true;
      return;
    }

    dom.shiftCard.hidden = false;

    var occupancy = getOccupancy(shift);
    var badge = getStatusBadge(occupancy);
    var activeOffer = getActiveOfferForShift(shift.id);
    var canFinal = canRequestFinalOffer(shift.id);
    var selectedAge = state.userContext.selectedAge;
    var summary = getShiftSummary(shift);

    var priceBlock = '';
    var ctaLabel = "Забронировать смену";
    var helper = "При бронировании мы автоматически поищем для вас лучшие доступные условия.";

    if (activeOffer) {
      var label = activeOffer.type === "final_24h" ? "Ваша финальная цена" : "Ваша зафиксированная цена";
      priceBlock = (
        '<div class="cwf-price-box">' +
          '<div class="cwf-mini">' + label + '</div>' +
          '<div class="cwf-price-main">' + formatPrice(activeOffer.improvedPrice) + '</div>' +
          '<div class="cwf-mini">Действует до ' + formatLocalDateTime(activeOffer.expiresAt) + '</div>' +
        '</div>'
      );
      ctaLabel = activeOffer.type === "final_24h"
        ? "Забронировать по финальной цене"
        : "Забронировать по зафиксированной цене";
      helper = activeOffer.boundTo.phone
        ? "Цена привязана к вашему телефону и доступна с любого устройства до окончания срока."
        : "Цена сохранена для текущего браузера. При привязке телефона станет доступна на любом устройстве.";
    } else if (canFinal) {
      priceBlock = (
        '<div class="cwf-price-box">' +
          '<div class="cwf-mini">Стоимость</div>' +
          '<div class="cwf-price-main">' + formatPrice(shift.basePrice) + '</div>' +
        '</div>'
      );
      ctaLabel = "Получить финальную цену";
      helper = "Первые 72 часа истекли. Можно запросить финальное улучшение цены на 24 часа.";
    } else {
      priceBlock = (
        '<div class="cwf-price-box">' +
          '<div class="cwf-mini">Стоимость</div>' +
          '<div class="cwf-price-main">' + formatPrice(shift.basePrice) + '</div>' +
        '</div>'
      );
    }

    var expireDebug = activeOffer
      ? '<button class="cwf-link-btn" type="button" data-action="sandbox-expire-offer">sandbox: завершить текущий offer</button>'
      : "";

    dom.shiftCard.innerHTML = (
      '<div class="cwf-head-row">' +
        '<h2>' + escapeHtml(shift.title + " • " + shift.dateLabel) + '</h2>' +
        '<span class="cwf-badge ' + badge.className + '">' + badge.text + '</span>' +
      '</div>' +
      '<p class="cwf-help">' + escapeHtml(summary) + '</p>' +
      '<div class="cwf-mini">Возрастная группа: ' + escapeHtml(selectedAge || shift.ageRange) + ' • Локация: ' + escapeHtml(shift.location) + '</div>' +
      '<div class="cwf-mini">Заполнено ' + occupancy + '% мест</div>' +
      priceBlock +
      '<button class="ac-primary-btn" type="button" data-action="open-main-cta">' + ctaLabel + '</button>' +
      '<p class="cwf-help">' + escapeHtml(helper) + '</p>' +
      '<div class="cwf-head-row">' +
        '<button class="cwf-link-btn" type="button" data-action="clear-hero">Очистить Hero-блоки</button>' +
        expireDebug +
      '</div>'
    );
  }

  function renderBooking() {
    if (!state.ui.bookingOpen) {
      dom.bookingBlock.hidden = true;
      return;
    }

    var shift = getCurrentShift();
    if (!shift) {
      dom.bookingBlock.hidden = true;
      return;
    }

    var activeOffer = getActiveOfferForShift(shift.id);
    var priceText = activeOffer ? formatPrice(activeOffer.improvedPrice) : formatPrice(shift.basePrice);
    var offerText = activeOffer
      ? ('Вы бронируете место без оплаты. ' +
        (activeOffer.type === "final_24h" ? "Финальная" : "Улучшенная") +
        ' цена ' + priceText + ' сохранится за вами до ' + formatLocalDateTime(activeOffer.expiresAt) + '.')
      : ('Вы бронируете место без оплаты по стандартной цене ' + priceText + '.');

    dom.bookingBlock.hidden = false;
    dom.bookingBlock.innerHTML = (
      '<h2>Форма бронирования</h2>' +
      '<p class="cwf-help">' + escapeHtml(offerText) + '</p>' +
      (state.ui.bookingError ? ('<div class="cwf-alert">' + escapeHtml(state.ui.bookingError) + '</div>') : "") +
      '<div class="cwf-grid-2">' +
        fieldHtml("Имя ребёнка", "childName", state.ui.bookingForm.childName) +
        fieldHtml("Возраст ребёнка", "childAge", state.ui.bookingForm.childAge, "number") +
        fieldHtml("Имя родителя", "parentName", state.ui.bookingForm.parentName) +
        fieldHtml("Телефон", "phone", state.ui.bookingForm.phone, "tel") +
        fieldHtml("Email (опционально)", "email", state.ui.bookingForm.email, "email") +
      '</div>' +
      '<label class="cwf-consent">' +
        '<input type="checkbox" name="consent" ' + (state.ui.bookingForm.consent ? "checked" : "") + '>' +
        '<span>Согласен(на) на обработку персональных данных</span>' +
      '</label>' +
      '<button class="ac-primary-btn" type="button" data-action="submit-booking">Подтвердить бронь</button>'
    );
  }

  function renderSuccess() {
    if (!state.ui.bookingSuccess) {
      dom.successBlock.hidden = true;
      return;
    }

    var success = state.ui.bookingSuccess;
    dom.successBlock.hidden = false;
    dom.successBlock.innerHTML = (
      '<h2>Бронь оформлена</h2>' +
      '<p class="cwf-success">Заявка принята. Менеджер свяжется с вами для подтверждения.</p>' +
      '<p class="cwf-help">Смена: ' + escapeHtml(success.shiftTitle) + '</p>' +
      '<p class="cwf-help">Цена фиксации: ' + formatPrice(success.price) + '</p>' +
      '<p class="cwf-help">Тип: ' + escapeHtml(success.offerType) + '</p>'
    );
  }

  function renderHeroBlocks() {
    renderHeroSlot(dom.heroLeft, state.userContext.heroState.heroLeft, "Левый");
    renderHeroSlot(dom.heroRight, state.userContext.heroState.heroRight, "Правый");
  }

  function renderHeroSlot(node, data, sideLabel) {
    if (!data) {
      node.innerHTML = '<span class="cwf-mini">Слот пуст</span>';
      return;
    }

    var ttlLine = data.expiresAt ? ('<div class="cwf-mini">до ' + formatLocalDateTime(data.expiresAt) + '</div>') : "";
    node.innerHTML = (
      '<div class="cwf-head-row">' +
        '<strong>' + sideLabel + ' Hero</strong>' +
        '<button class="cwf-link-btn" type="button" data-action="clear-hero">Очистить</button>' +
      '</div>' +
      '<div>' + escapeHtml(data.title || "") + '</div>' +
      '<div class="cwf-mini">' + escapeHtml(data.dateLabel || "") + '</div>' +
      (data.price ? ('<div class="cwf-price-main" style="font-size:18px">' + formatPrice(data.price) + '</div>') : "") +
      ttlLine
    );

    var clearBtn = node.querySelector('[data-action="clear-hero"]');
    if (clearBtn) {
      clearBtn.onclick = clearHeroState;
    }
  }

  function renderEvents() {
    if (!state.events.length) {
      dom.events.textContent = "[]";
      return;
    }
    dom.events.textContent = JSON.stringify(state.events.slice(0, 12), null, 2);
  }

  function renderModal() {
    var modal = state.ui.modal;
    if (!modal) {
      dom.modalRoot.hidden = true;
      dom.modalRoot.innerHTML = "";
      return;
    }

    dom.modalRoot.hidden = false;

    if (modal.phase === "progress") {
      renderProgressModal(modal);
      return;
    }

    renderResultModal(modal);
  }

  function renderProgressModal(modal) {
    var steps = PROGRESS_STEPS[modal.type] || [];
    var progress = steps.length ? Math.round((modal.progressIndex / steps.length) * 100) : 0;

    dom.modalRoot.innerHTML = (
      '<section class="cwf-modal" role="dialog" aria-modal="true">' +
        '<div class="cwf-modal__head">' +
          '<h3>' + escapeHtml(modal.type === "final_24h" ? "Пробуем найти для вас финальную цену" : "Ищем для вас лучшую цену") + '</h3>' +
          '<button class="cwf-action-btn" type="button" data-action="modal-close">Закрыть</button>' +
        '</div>' +
        '<div class="cwf-progress"><div class="cwf-progress__bar" style="width:' + progress + '%"></div></div>' +
        '<ol class="cwf-step-list">' +
          steps.map(function (step, index) {
            return '<li class="' + (index < modal.progressIndex ? "is-active" : "") + '">' + escapeHtml(step) + '</li>';
          }).join("") +
        '</ol>' +
      '</section>'
    );
  }

  function renderResultModal(modal) {
    var offer = modal.offerDraft;
    var knownPhone = !!state.userContext.phone;
    var isFinal = modal.type === "final_24h";
    var canUseKnownPhone = isFinal && knownPhone;

    var phoneSection = "";
    if (!canUseKnownPhone) {
      var optionalText = isFinal
        ? "Укажите телефон, чтобы сохранить финальную цену на любых устройствах. Если не укажете, сохраним только в этом браузере."
        : "Укажите телефон, чтобы сохранить цену на любых устройствах. Без телефона цена сохранится только в этом браузере.";

      phoneSection = (
        '<div class="cwf-field">' +
          '<label>Телефон</label>' +
          '<input class="cwf-input" name="modal-phone" type="tel" inputmode="tel" value="' + escapeHtml(modal.phoneInput || "") + '" placeholder="79991234567">' +
        '</div>' +
        '<label class="cwf-consent">' +
          '<input type="checkbox" name="modal-consent" ' + (modal.consent ? "checked" : "") + '>' +
          '<span>Согласен(на) на обработку персональных данных</span>' +
        '</label>' +
        '<p class="cwf-help">' + escapeHtml(optionalText) + '</p>'
      );
    }

    dom.modalRoot.innerHTML = (
      '<section class="cwf-modal" role="dialog" aria-modal="true">' +
        '<div class="cwf-modal__head">' +
          '<h3>' + escapeHtml(isFinal ? "Финальная цена найдена" : "Найдена улучшенная цена") + '</h3>' +
          '<button class="cwf-action-btn" type="button" data-action="modal-close">Закрыть</button>' +
        '</div>' +
        '<div class="cwf-price-box">' +
          '<div class="cwf-price-old">' + formatPrice(offer.basePrice) + '</div>' +
          '<div class="cwf-price-main">' + formatPrice(offer.improvedPrice) + '</div>' +
          '<div class="cwf-mini">Действует до ' + formatLocalDateTime(offer.expiresAt) + '</div>' +
        '</div>' +
        '<p class="cwf-help">' + escapeHtml(isFinal
          ? "Это финальное улучшение цены. Зафиксируем на 24 часа."
          : "Эту цену можно зафиксировать за вами на 72 часа.") + '</p>' +
        phoneSection +
        (modal.error ? ('<div class="cwf-alert">' + escapeHtml(modal.error) + '</div>') : "") +
        '<div class="cwf-modal-actions">' +
          '<button class="ac-primary-btn" type="button" data-action="offer-confirm">' +
            (canUseKnownPhone
              ? "Зафиксировать финальную цену и продолжить бронь"
              : (isFinal ? "Зафиксировать финальную цену" : "Зафиксировать цену и продолжить бронь")) +
          '</button>' +
          '<button class="cwf-action-btn" type="button" data-action="offer-save-browser">Сохранить только в браузере</button>' +
        '</div>' +
      '</section>'
    );
  }

  function renderToast() {
    if (!state.ui.toast) {
      dom.toast.hidden = true;
      dom.toast.textContent = "";
      return;
    }
    dom.toast.hidden = false;
    dom.toast.textContent = state.ui.toast;
  }

  function handleMainCta() {
    var shift = getCurrentShift();
    if (!shift) return;

    var activeOffer = getActiveOfferForShift(shift.id);
    if (activeOffer) {
      openBookingForm();
      return;
    }

    if (canRequestFinalOffer(shift.id)) {
      openOfferModal("final_24h", shift);
      return;
    }

    openOfferModal("first_72h", shift);
  }

  function openOfferModal(type, shift) {
    state.ui.modalToken += 1;
    state.ui.modal = {
      type: type,
      shiftId: shift.id,
      phase: "progress",
      progressIndex: 0,
      offerDraft: null,
      phoneInput: state.userContext.phone || "",
      consent: false,
      error: ""
    };
    renderModal();
    runProgressFlow(state.ui.modalToken, type, shift);
  }

  async function runProgressFlow(token, type, shift) {
    var steps = PROGRESS_STEPS[type] || [];
    for (var i = 0; i < steps.length; i += 1) {
      if (token !== state.ui.modalToken || !state.ui.modal) return;
      state.ui.modal.progressIndex = i + 1;
      renderModal();
      await wait(900);
    }

    if (token !== state.ui.modalToken || !state.ui.modal) return;

    var offer = buildOfferDraft(type, shift);
    state.ui.modal.phase = "result";
    state.ui.modal.offerDraft = offer;
    renderModal();
  }

  function buildOfferDraft(type, shift) {
    var now = Date.now();
    var firstPrice = computeFirstOfferPrice(shift);
    var improvedPrice = type === "final_24h"
      ? computeFinalOfferPrice(shift, getReferenceFirstPrice(shift.id))
      : firstPrice;

    return {
      offerId: makeOfferId(),
      shiftId: shift.id,
      type: type,
      basePrice: shift.basePrice,
      improvedPrice: improvedPrice,
      createdAt: now,
      expiresAt: now + (type === "final_24h" ? 24 : 72) * 3600000,
      boundTo: {
        phone: null,
        deviceId: state.userContext.deviceId
      },
      status: "active"
    };
  }

  function commitModalOfferWithAction() {
    var modal = state.ui.modal;
    if (!modal || modal.phase !== "result" || !modal.offerDraft) return;

    var useKnownPhone = modal.type === "final_24h" && !!state.userContext.phone;
    var inputPhone = normalizePhone(modal.phoneInput || "");

    if (useKnownPhone) {
      finalizeOffer(modal.offerDraft, state.userContext.phone, "offer_created_with_phone", true);
      closeModal(false);
      return;
    }

    if (isValidPhone(inputPhone)) {
      if (!modal.consent) {
        modal.error = "Для фиксации с телефоном нужно подтвердить согласие.";
        renderModal();
        return;
      }
      finalizeOffer(modal.offerDraft, inputPhone, "offer_created_with_phone", true);
      closeModal(false);
      return;
    }

    modal.error = "Введите телефон для фиксации с переходом к бронированию или нажмите «Сохранить только в браузере».";
    renderModal();
  }

  function commitModalOfferWithoutPhone() {
    var modal = state.ui.modal;
    if (!modal || modal.phase !== "result" || !modal.offerDraft) return;
    finalizeOffer(modal.offerDraft, null, "offer_created_no_phone", false);
    closeModal(true);
  }

  function closeModalWithDefaultAction() {
    var modal = state.ui.modal;
    if (!modal) return;

    if (modal.phase === "result" && modal.offerDraft) {
      var phone = normalizePhone(modal.phoneInput || "");
      if (!isValidPhone(phone)) {
        finalizeOffer(modal.offerDraft, null, "offer_created_no_phone", false);
      }
    }

    closeModal(true);
  }

  function closeModal(showSavedToast) {
    state.ui.modal = null;
    state.ui.modalToken += 1;
    renderModal();
    if (showSavedToast) {
      showToast("Цена сохранена для этого браузера. Вернитесь в течение срока действия оффера.");
    }
  }

  function finalizeOffer(offerDraft, phone, eventType, openBooking) {
    var shift = getShiftById(offerDraft.shiftId);
    if (!shift) return;

    var offer = clone(offerDraft);
    offer.boundTo.deviceId = state.userContext.deviceId;
    offer.boundTo.phone = phone ? normalizePhone(phone) : null;

    state.userContext.activeOffer = offer;
    if (offer.boundTo.phone) {
      state.userContext.phone = offer.boundTo.phone;
    }

    if (offer.type === "first_72h") {
      state.userContext.heroState.heroLeft = makeHeroPayload(shift, offer);
    } else {
      state.userContext.heroState.heroRight = makeHeroPayload(shift, offer);
    }

    emitPromoEvent(eventType, shift, offer, {
      phone: offer.boundTo.phone,
      deviceId: state.userContext.deviceId
    });

    persistState();
    render();

    if (openBooking) {
      openBookingForm();
    }
  }

  function openBookingForm() {
    var shift = getCurrentShift();
    if (!shift) return;

    state.ui.bookingOpen = true;
    state.ui.bookingSuccess = null;
    state.ui.bookingError = "";

    var activeOffer = getActiveOfferForShift(shift.id);
    state.ui.bookingForm = {
      childName: "",
      childAge: state.userContext.selectedAge
        ? String(state.userContext.selectedAge.split("-")[0] || "")
        : "",
      parentName: "",
      phone: activeOffer && activeOffer.boundTo.phone
        ? activeOffer.boundTo.phone
        : (state.userContext.phone || ""),
      email: "",
      consent: false
    };

    renderBooking();
  }

  function submitBooking() {
    var shift = getCurrentShift();
    if (!shift) return;

    var form = state.ui.bookingForm;
    var phone = normalizePhone(form.phone);

    if (!String(form.childName || "").trim()) {
      state.ui.bookingError = "Укажите имя ребёнка.";
      renderBooking();
      return;
    }
    if (!String(form.childAge || "").trim()) {
      state.ui.bookingError = "Укажите возраст ребёнка.";
      renderBooking();
      return;
    }
    if (!String(form.parentName || "").trim()) {
      state.ui.bookingError = "Укажите имя родителя.";
      renderBooking();
      return;
    }
    if (!isValidPhone(phone)) {
      state.ui.bookingError = "Укажите корректный телефон в формате 7XXXXXXXXXX.";
      renderBooking();
      return;
    }
    if (!form.consent) {
      state.ui.bookingError = "Подтвердите согласие на обработку персональных данных.";
      renderBooking();
      return;
    }

    var activeOffer = getActiveOfferForShift(shift.id);
    var bookingPrice = activeOffer ? activeOffer.improvedPrice : shift.basePrice;

    if (activeOffer) {
      activeOffer.status = "used";
      if (!activeOffer.boundTo.phone) {
        activeOffer.boundTo.phone = phone;
      }
      state.userContext.offerHistory.unshift(activeOffer);
      state.userContext.activeOffer = null;
    }

    state.userContext.phone = phone;
    state.ui.bookingOpen = false;
    state.ui.bookingSuccess = {
      shiftId: shift.id,
      shiftTitle: shift.title + " • " + shift.dateLabel,
      price: bookingPrice,
      offerType: activeOffer ? activeOffer.type : "base"
    };

    emitPromoEvent("booking_completed", shift, activeOffer, {
      phone: phone,
      deviceId: state.userContext.deviceId,
      bookingPrice: bookingPrice
    });

    persistState();
    render();
  }

  function emitPromoEvent(action, shift, offer, extra) {
    var payload = {
      offerId: offer ? offer.offerId : "",
      phone: extra.phone || null,
      deviceId: extra.deviceId || state.userContext.deviceId,
      shiftId: shift.id,
      shiftTitle: shift.title,
      dates: {
        start: shift.start,
        end: shift.end
      },
      offerType: offer ? offer.type : "",
      basePrice: offer ? offer.basePrice : shift.basePrice,
      improvedPrice: offer ? offer.improvedPrice : (extra.bookingPrice || shift.basePrice),
      expiresAt: offer ? new Date(offer.expiresAt).toISOString() : "",
      action: action,
      createdAt: new Date().toISOString()
    };

    state.events.unshift(payload);
    state.events = state.events.slice(0, 30);

    var cfg = window.ORDER_FLOW_CONFIG || {};
    if (cfg.telegramWebhookUrl) {
      window.fetch(cfg.telegramWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(function () {
        // Keep sandbox silent on network failures.
      });
    }
  }

  function clearHeroState() {
    state.userContext.heroState.heroLeft = null;
    state.userContext.heroState.heroRight = null;
    state.userContext.activeOffer = null;
    persistState();
    render();
  }

  function expireActiveOfferForSandbox() {
    var active = state.userContext.activeOffer;
    if (!active) return;
    active.expiresAt = Date.now() - 1000;
    refreshOfferStatus();
    persistState();
    render();
  }

  function canRequestFinalOffer(shiftId) {
    var active = getActiveOfferForShift(shiftId);
    if (active && active.type === "final_24h") return false;

    var hasExpiredFirst = false;
    var hasFinalEver = false;

    var items = state.userContext.offerHistory;
    for (var i = 0; i < items.length; i += 1) {
      var offer = items[i];
      if (offer.shiftId !== shiftId) continue;
      if (offer.type === "first_72h" && offer.status === "expired") {
        hasExpiredFirst = true;
      }
      if (offer.type === "final_24h") {
        hasFinalEver = true;
      }
    }

    return hasExpiredFirst && !hasFinalEver;
  }

  function getReferenceFirstPrice(shiftId) {
    var items = state.userContext.offerHistory;
    for (var i = 0; i < items.length; i += 1) {
      var offer = items[i];
      if (offer.shiftId === shiftId && offer.type === "first_72h") {
        return toPrice(offer.improvedPrice);
      }
    }
    return computeFirstOfferPrice(getShiftById(shiftId));
  }

  function getActiveOfferForShift(shiftId) {
    var active = state.userContext.activeOffer;
    if (!active) return null;
    if (active.shiftId !== shiftId || active.status !== "active") return null;
    return active;
  }

  function getCurrentShift() {
    return getShiftById(state.userContext.currentShiftId);
  }

  function getShiftSummary(shift) {
    if (!shift) return "";
    var byAge = SHIFT_SUMMARY_BY_AGE[shift.id];
    var selectedAge = state.userContext.selectedAge;
    if (byAge && selectedAge && byAge[selectedAge]) {
      return byAge[selectedAge];
    }
    return shift.summary;
  }

  function getShiftById(shiftId) {
    if (!shiftId) return null;
    for (var i = 0; i < SHIFTS.length; i += 1) {
      if (SHIFTS[i].id === shiftId) return SHIFTS[i];
    }
    return null;
  }

  function getNearestShifts(limit) {
    var sorted = SHIFTS.slice().sort(function (a, b) {
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    });
    return sorted.slice(0, Math.max(1, limit));
  }

  function getOccupancy(shift) {
    var left = Math.max(0, Number(shift.seatsLeft || 0));
    var reserved = Math.max(0, TOTAL_SEATS - left);
    return Math.round((reserved / TOTAL_SEATS) * 100);
  }

  function getStatusBadge(occupancyPercent) {
    if (occupancyPercent >= 90) {
      return { text: "Почти нет мест", className: "cwf-badge--danger" };
    }
    if (occupancyPercent >= 80) {
      return { text: "Мест почти нет", className: "cwf-badge--warn" };
    }
    return { text: "Места есть", className: "" };
  }

  function computeFirstOfferPrice(shift) {
    var safeShift = shift || SHIFTS[0];
    var idx = getShiftIndex(safeShift.id);
    var firstDisc = idx % 2 === 0 ? 0.045 : 0.04;
    return Math.max(1, Math.round(safeShift.anchorPrice * (1 - firstDisc)));
  }

  function computeFinalOfferPrice(shift, firstPrice) {
    var safeShift = shift || SHIFTS[0];
    var idx = getShiftIndex(safeShift.id);
    var secondDisc = idx % 2 === 0 ? 0.03 : 0.025;
    var reduced = Math.round(toPrice(firstPrice) * (1 - secondDisc));
    var floor = Math.round(safeShift.anchorPrice * 0.88);
    return Math.max(reduced, floor);
  }

  function getShiftIndex(shiftId) {
    for (var i = 0; i < SHIFTS.length; i += 1) {
      if (SHIFTS[i].id === shiftId) return i;
    }
    return 0;
  }

  function syncHeroFromShift(shift) {
    if (!shift) return;
    var activeOffer = getActiveOfferForShift(shift.id);
    state.userContext.heroState.heroLeft = makeHeroPayload(shift, activeOffer);
  }

  function makeHeroPayload(shift, offer) {
    return {
      shiftId: shift.id,
      title: shift.title,
      dateLabel: shift.dateLabel,
      price: offer ? offer.improvedPrice : shift.basePrice,
      expiresAt: offer ? offer.expiresAt : 0
    };
  }

  function showToast(text) {
    state.ui.toast = String(text || "");
    if (state.ui.toastTimer) {
      clearTimeout(state.ui.toastTimer);
    }
    state.ui.toastTimer = setTimeout(function () {
      state.ui.toast = "";
      renderToast();
    }, TOAST_MS);
    renderToast();
  }

  function fieldHtml(label, name, value, type) {
    var safeType = type || "text";
    return (
      '<div class="cwf-field">' +
        '<label>' + escapeHtml(label) + '</label>' +
        '<input class="cwf-input" name="' + name + '" type="' + safeType + '" value="' + escapeHtml(value || "") + '">' +
      '</div>'
    );
  }

  function makeOfferId() {
    return "offer-" + Math.random().toString(36).slice(2, 10) + "-" + Date.now().toString(36);
  }

  function formatPrice(value) {
    return new Intl.NumberFormat("ru-RU").format(toPrice(value)) + " ₽";
  }

  function formatLocalDateTime(ts) {
    if (!ts) return "";
    return new Date(ts).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function normalizePhone(raw) {
    var digits = String(raw || "").replace(/\D/g, "");
    if (digits.charAt(0) === "8") {
      digits = "7" + digits.slice(1);
    }
    if (digits.length === 10) {
      digits = "7" + digits;
    }
    return digits.slice(0, 11);
  }

  function isValidPhone(raw) {
    var digits = normalizePhone(raw);
    return digits.length === 11 && digits.charAt(0) === "7";
  }

  function toPrice(value) {
    var parsed = Number(value || 0);
    return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed)) : 0;
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }
})();
