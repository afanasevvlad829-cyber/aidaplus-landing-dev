const CONFIG = {
    landingPath: '/',
    recId: 'rec1204280451',
    bookingFormId: 'form1204280551',
    bookingAnchor: '#booking',
    mobileBookingRecId: '#rec1663516001',
    storageKey: 'aidacampPromoStateV251',

    telegram: {
      enabled: true,
      botToken: '8663835446:AAFjp_M44xaBBZF2WhjVuVK_-bRxr2FiqEs',
      chatId: '-1003827680494'
    },

    yandexMetrika: {
      enabled: true,
      counterId: 96499295
    },

    promo: {
      prefix: 'AIDACAMP',
      holdHours: 72,
      draftLifetimeHours: 72,
      initialMarkup: 0.20,
      firstClickDiscountMin: 0.04,
      firstClickDiscountMax: 0.05,
      secondClickDiscount: 0
    },

    reminders: {
      maxShows: 3,
      firstBarDelayMs: 30000,
      revisitPopupDelayMs: 4000
    },

    thresholds: {
      lowSeats: 8,
      hotSeats: 5
    },

    texts: {
      returnBadge: '63% детей возвращаются',
      firstClickBtn: 'Показать цену для меня',
      secondClickBtn: 'Попробовать ещё раз',
      fixedTitle: 'Ваша цена закреплена',
      fixedTimerPrefix: 'Действует ещё',
      bookingDraftTitle: 'Вы выбрали цену',
      bookingActiveTitle: 'Цена зафиксирована'
    },

    shifts: [
      {
        id: 'shift1',
        name: '1 смена (30 мая - 8 июня)',
        bookingOptionLabel: '1 смена',
        priceField: 'li_price__1659455364916',
        descrField: 'li_descr__1659455364916',
        finalPrice: 79000,
        seats: 3,
        days: 8,
        bookingText: 'предварительная бронь и фиксация стоимости - 50%',
        seatLabel: 'очень мало мест',
        showReturnBadge: true,
        promoEnabled: true,
        promoCodePrefix: 'AIDA1',
        priorityLabel: 'Самая популярная смена'
      },
      {
        id: 'shift2',
        name: '2 смена (10 июня - 16 июня)',
        bookingOptionLabel: '2 смена',
        priceField: 'li_price__1715244437234',
        descrField: 'li_descr__1715244437234',
        finalPrice: 48000,
        seats: 8,
        days: 6,
        bookingText: 'предварительная бронь и фиксация стоимости - 50%',
        seatLabel: 'идёт активная запись',
        showReturnBadge: false,
        promoEnabled: true,
        promoCodePrefix: 'AIDA2',
        priorityLabel: ''
      },
      {
        id: 'shift3',
        name: '3 смена (16 июня - 23 июня)',
        bookingOptionLabel: '3 смена',
        priceField: 'li_price__1715244517759',
        descrField: 'li_descr__1715244517759',
        finalPrice: 65000,
        seats: 5,
        days: 7,
        bookingText: 'предварительная бронь и фиксация стоимости - 50%',
        seatLabel: 'идёт активная запись',
        showReturnBadge: false,
        promoEnabled: true,
        promoCodePrefix: 'AIDA3',
        priorityLabel: ''
      },
      {
        id: 'shift4',
        name: '4 смена (10 июня — 23 июня)',
        bookingOptionLabel: '4 смена',
        priceField: 'li_price__1708678980667',
        descrField: 'li_descr__1708678980667',
        finalPrice: 95000,
        seats: 4,
        days: 13,
        bookingText: 'предварительная бронь и фиксация стоимости - 50%',
        seatLabel: 'очень мало мест',
        showReturnBadge: true,
        promoEnabled: true,
        promoCodePrefix: 'AIDA4',
        priorityLabel: 'Приоритетная смена'
      },
      {
        id: 'shift5',
        name: '5 смена (3 августа — 15 августа)',
        bookingOptionLabel: '5 смена',
        priceField: 'li_price__1749463357045',
        descrField: 'li_descr__1749463357045',
        finalPrice: 89400,
        seats: 7,
        days: 12,
        bookingText: 'предварительная бронь и фиксация стоимости - 50%',
        seatLabel: 'идёт активная запись',
        showReturnBadge: false,
        promoEnabled: true,
        promoCodePrefix: 'AIDA5',
        priorityLabel: ''
      },
      {
        id: 'shift6',
        name: '6 смена (17 августа — 26 августа)',
        bookingOptionLabel: '6 смена',
        priceField: 'li_price__1756956407903',
        descrField: 'li_descr__1756956407903',
        finalPrice: 69600,
        seats: 15,
        days: 9,
        bookingText: 'предварительная бронь и фиксация стоимости - 50%',
        seatLabel: '',
        showReturnBadge: false,
        promoEnabled: true,
        promoCodePrefix: 'AIDA6',
        priorityLabel: ''
      }
    ]
  };

  const YANDEX_METRIKA_ID = CONFIG.yandexMetrika.counterId;

  function safeParse(json, fallback) {
    try { return JSON.parse(json); } catch (e) { return fallback; }
  }

  function nowTs() { return Date.now(); }
  function currentDevice() { return window.innerWidth <= 640 ? 'mobile' : 'desktop'; }

  function reachMetrikaGoal(goalName, params = {}) {
    if (!CONFIG.yandexMetrika.enabled) return;
    try {
      if (typeof ym === 'function') {
        ym(YANDEX_METRIKA_ID, 'reachGoal', goalName, params);
      }
    } catch (e) {
      console.warn('Metrika goal error:', goalName, e);
    }
  }

  function formatPrice(value) {
    return new Intl.NumberFormat('ru-RU').format(Math.round(value)) + ' ₽';
  }

  function pluralDays(n) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return 'день';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'дня';
    return 'дней';
  }

  function pluralSeats(n) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return 'место';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'места';
    return 'мест';
  }

  function formatRemaining(ms) {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    if (days > 0) return `${days} д ${hours} ч`;
    if (hours > 0) return `${hours} ч ${mins} мин`;
    return `${mins} мин`;
  }

  function getSeatsClass(seats) {
    if (seats <= CONFIG.thresholds.hotSeats) return 'aidacamp-seats-hot';
    if (seats <= CONFIG.thresholds.lowSeats) return 'aidacamp-seats-soft';
    return '';
  }

  function animateNumber({ from, to, duration, onUpdate, onComplete }) {
    const start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = from + (to - from) * eased;
      onUpdate(value, progress);
      if (progress < 1) requestAnimationFrame(frame);
      else if (onComplete) onComplete();
    }
    requestAnimationFrame(frame);
  }

  function createPromoCode(prefix) {
    return `${prefix}-${Math.floor(Math.random() * 9000 + 1000)}`;
  }

  function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'));
  }

  function normalizePhone(phone) {
    let digits = phone.replace(/\D/g, '');
    if (!digits) return '';
    if (digits[0] === '8') digits = '7' + digits.slice(1);
    if (digits[0] !== '7') digits = '7' + digits;
    return digits.slice(0, 11);
  }

  function formatPhoneMask(phone) {
    const digits = normalizePhone(phone);
    let result = '+7';
    if (digits.length > 1) result += ' (' + digits.slice(1, 4);
    if (digits.length >= 4) result += ') ' + digits.slice(4, 7);
    if (digits.length >= 7) result += '-' + digits.slice(7, 9);
    if (digits.length >= 9) result += '-' + digits.slice(9, 11);
    return result;
  }

  function formatPhoneVisible(phone) {
    const digits = normalizePhone(phone);
    if (!digits || digits.length < 11) return '';
    return `(${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7,9)}-${digits.slice(9,11)}`;
  }

  function getShiftById(id) {
    return CONFIG.shifts.find(s => s.id === id) || null;
  }

  function isLandingPage() {
    return location.pathname === CONFIG.landingPath;
  }

  function isBookingPage() {
    return !!document.getElementById(CONFIG.bookingFormId);
  }

  function defaultState() {
    return {
      promo: null,
      reminders: {
        shows: 0,
        barShown: false,
        revisitShown: false,
        exitShown: false,
        lastShownAt: 0
      }
    };
  }

  function loadState() {
    return safeParse(localStorage.getItem(CONFIG.storageKey) || 'null', null) || defaultState();
  }

  function saveState(state) {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
  }

  function clearState() {
    localStorage.removeItem(CONFIG.storageKey);
  }

  function getPromo() {
    return loadState().promo;
  }

  function getActiveExpiresAt(promo) {
    const baseTime = promo.activatedAt ? new Date(promo.activatedAt).getTime() : new Date(promo.createdAt).getTime();
    return new Date(baseTime + promo.holdHours * 3600000);
  }

  function isDraftAlive(promo) {
    if (!promo || promo.status !== 'draft') return false;
    const expires = new Date(new Date(promo.createdAt).getTime() + CONFIG.promo.draftLifetimeHours * 3600000);
    return expires.getTime() > nowTs();
  }

  function isActiveAlive(promo) {
    if (!promo || promo.status !== 'active') return false;
    return getActiveExpiresAt(promo).getTime() > nowTs();
  }

  function cleanupState() {
    const state = loadState();
    if (!state.promo) return;
    if (state.promo.status === 'draft' && !isDraftAlive(state.promo)) {
      clearState();
      return;
    }
    if (state.promo.status === 'active' && !isActiveAlive(state.promo)) {
      clearState();
    }
  }

  function setPromo(promo) {
    const state = loadState();
    state.promo = promo;
    saveState(state);

    window.dispatchEvent(new CustomEvent('aidacampPromoUpdated', {
      detail: { promo }
    }));

    if (window.AIDACAMP_BOOKING_ENGINE && typeof window.AIDACAMP_BOOKING_ENGINE.forceRefresh === 'function') {
      window.AIDACAMP_BOOKING_ENGINE.forceRefresh();
    }
  }

  async function sendTelegramLead(payload) {
    if (!CONFIG.telegram.enabled) return;
    if (!CONFIG.telegram.botToken || CONFIG.telegram.botToken.includes('PASTE_')) return;
    if (!CONFIG.telegram.chatId || CONFIG.telegram.chatId.includes('PASTE_')) return;

    const text =
`Новый лид АйДаКемп

Телефон: ${payload.phone}
Смена: ${payload.shiftName}
Промокод: ${payload.code}
Цена: ${formatPrice(payload.finalPrice)}
Фиксация: ${payload.holdHours} ч
Время: ${new Date().toLocaleString()}`;

    try {
      await fetch(`https://api.telegram.org/bot${CONFIG.telegram.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CONFIG.telegram.chatId,
          text: text
        })
      });
    } catch (e) {
      console.warn('Telegram send error', e);
    }
  }

  const LandingEngine = {
    preparedCards: [],
    modalNodes: {},
    reminderNodes: {},
    currentPromoShift: null,
    currentGeneratedCode: null,

    init() {
      if (!isLandingPage()) return;
      cleanupState();
      this.createPromoModal();
      this.createReminderUI();
      this.prepareCards();
      this.initCardObserver();
      this.startActivePromoTimersOnCards();
      this.initReminderFlows();
    },

    buildDescriptionHTML(shift) {
      const seatsClass = getSeatsClass(shift.seats);
      return `
        ${shift.name} ${shift.bookingText} /
        <strong>${shift.days} ${pluralDays(shift.days)}</strong> /
        <strong class="${seatsClass}">${shift.seats} ${pluralSeats(shift.seats)}</strong>
      `;
    },

    addBadges(cardCell, shift) {
      if (cardCell.querySelector('.aidacamp-badges')) return;

      const wrap = document.createElement('div');
      wrap.className = 'aidacamp-badges';

      if (shift.priorityLabel) {
        const badge = document.createElement('div');
        badge.className = 'aidacamp-badge';
        badge.textContent = shift.priorityLabel;
        wrap.appendChild(badge);
      }

      if (shift.seatLabel) {
        const seatBadge = document.createElement('div');
        seatBadge.className = 'aidacamp-badge aidacamp-badge--soft';
        seatBadge.textContent = shift.seatLabel;
        wrap.appendChild(seatBadge);
      }

      if (shift.showReturnBadge) {
        const returnBadge = document.createElement('div');
        returnBadge.className = 'aidacamp-badge aidacamp-badge--dark';
        returnBadge.textContent = CONFIG.texts.returnBadge;
        wrap.appendChild(returnBadge);
      }

      if (wrap.children.length) {
        cardCell.insertBefore(wrap, cardCell.firstChild);
      }
    },

    applyCardState(cardCol, shift) {
      if (shift.seats <= CONFIG.thresholds.hotSeats) {
        cardCol.classList.add('aidacamp-card-hot');
      } else if (shift.seats <= CONFIG.thresholds.lowSeats) {
        cardCol.classList.add('aidacamp-card-soft');
      }
    },

    ensureMetaAndContainers(cardCell) {
      let meta = cardCell.querySelector('.aidacamp-meta');
      if (!meta) {
        meta = document.createElement('div');
        meta.className = 'aidacamp-meta';
        cardCell.appendChild(meta);
      }

      let primaryPromoBtn = cardCell.querySelector('.aidacamp-primary-promo-btn');
      if (!primaryPromoBtn) {
        primaryPromoBtn = document.createElement('a');
        primaryPromoBtn.href = 'javascript:void(0)';
        primaryPromoBtn.className = 'aidacamp-primary-promo-btn';
        cardCell.appendChild(primaryPromoBtn);
      }

      let fixedBox = cardCell.querySelector('.aidacamp-fixed-box');
      if (!fixedBox) {
        fixedBox = document.createElement('div');
        fixedBox.className = 'aidacamp-fixed-box';
        fixedBox.style.display = 'none';
        fixedBox.innerHTML = `
          <div class="aidacamp-fixed-box__title">${CONFIG.texts.fixedTitle}</div> <div class="aidacamp-fixed-box__price"></div> <div class="aidacamp-fixed-box__code"></div> <div class="aidacamp-fixed-box__timer"></div>
        `;
        cardCell.appendChild(fixedBox);
      }

      return { meta, primaryPromoBtn, fixedBox };
    },

    getInitialShownPrice(basePrice) {
      return Math.round(basePrice * (1 + CONFIG.promo.initialMarkup));
    },

    getFirstClickPrice(basePrice) {
      const discount = CONFIG.promo.firstClickDiscountMin +
        Math.random() * (CONFIG.promo.firstClickDiscountMax - CONFIG.promo.firstClickDiscountMin);
      return Math.round(basePrice * (1 - discount));
    },

    getSecondClickPrice(basePrice) {
      return Math.round(basePrice * (1 - CONFIG.promo.secondClickDiscount));
    },

    createFreshPromoForShift(shift) {
      return {
        shiftId: shift.id,
        shiftName: shift.name,
        finalPrice: shift.finalPrice,
        code: createPromoCode(shift.promoCodePrefix || CONFIG.promo.prefix),
        phone: '',
        holdHours: CONFIG.promo.holdHours,
        createdAt: new Date().toISOString(),
        activatedAt: null,
        status: 'draft',
        priceStage: 0
      };
    },

    renderPromoState(prepared) {
      const { shift, cardCell } = prepared;
      const promo = getPromo();
      const { meta, primaryPromoBtn, fixedBox } = this.ensureMetaAndContainers(cardCell);

      const bookingBtn = cardCell.querySelector('.t-card__btn');
      if (bookingBtn) {
        bookingBtn.classList.add('aidacamp-secondary-booking-btn');
        bookingBtn.textContent = 'Бронирую';
        bookingBtn.href = '/#booking';
      }

      primaryPromoBtn.classList.remove('aidacamp-stage-1', 'aidacamp-stage-2');

      const relevantPromo = promo && promo.shiftId === shift.id ? promo : null;

      if (relevantPromo && relevantPromo.status === 'active' && isActiveAlive(relevantPromo)) {
        const expiresAt = getActiveExpiresAt(relevantPromo);
        const left = expiresAt.getTime() - nowTs();

        primaryPromoBtn.style.display = 'none';
        fixedBox.style.display = 'block';
        fixedBox.querySelector('.aidacamp-fixed-box__price').textContent = formatPrice(relevantPromo.finalPrice);
        fixedBox.querySelector('.aidacamp-fixed-box__code').textContent = `Код: ${relevantPromo.code}`;
        fixedBox.querySelector('.aidacamp-fixed-box__timer').textContent =
          `${CONFIG.texts.fixedTimerPrefix} ${formatRemaining(left)}`;
        meta.innerHTML = `Промокод активирован и привязан к номеру телефона.`;
        prepared.priceEl.textContent = formatPrice(relevantPromo.finalPrice);
        return;
      }

      fixedBox.style.display = 'none';
      primaryPromoBtn.style.display = shift.promoEnabled ? 'inline-flex' : 'none';

      if (relevantPromo && relevantPromo.status === 'draft' && isDraftAlive(relevantPromo)) {
        if (relevantPromo.priceStage >= 2) {
          primaryPromoBtn.textContent = 'Зафиксировать цену на 72 часа';
          primaryPromoBtn.classList.add('aidacamp-stage-2');
          primaryPromoBtn.onclick = () => this.openPromoModal(shift, relevantPromo);
          meta.innerHTML = `Нашли лучшую цену <strong>${formatPrice(relevantPromo.finalPrice)}</strong>. Можно зафиксировать её на 72 часа.`;
          prepared.priceEl.textContent = formatPrice(relevantPromo.finalPrice);
        } else if (relevantPromo.priceStage === 1) {
          primaryPromoBtn.textContent = CONFIG.texts.secondClickBtn;
          primaryPromoBtn.classList.add('aidacamp-stage-1');
          primaryPromoBtn.onclick = () => this.handlePriceClick(prepared);
          meta.innerHTML = `Нашли персональную цену <strong>${formatPrice(relevantPromo.finalPrice)}</strong>. <strong>Осталась 1 попытка</strong> получить лучшую цену.`;
          prepared.priceEl.textContent = formatPrice(relevantPromo.finalPrice);
        } else {
          primaryPromoBtn.textContent = CONFIG.texts.firstClickBtn;
          primaryPromoBtn.onclick = () => this.handlePriceClick(prepared);
          meta.innerHTML = `Нажмите <strong>"Показать цену для меня"</strong>, чтобы проверить персональную стоимость.`;
          prepared.priceEl.textContent = formatPrice(this.getInitialShownPrice(shift.finalPrice));
        }
      } else {
        primaryPromoBtn.textContent = CONFIG.texts.firstClickBtn;
        primaryPromoBtn.onclick = () => this.handlePriceClick(prepared);
        meta.innerHTML = `Нажмите <strong>"Показать цену для меня"</strong>, чтобы проверить персональную стоимость.`;
        prepared.priceEl.textContent = formatPrice(this.getInitialShownPrice(shift.finalPrice));
      }
    },

    handlePriceClick(prepared) {
      const { shift, priceEl, cardCell } = prepared;
      const currentPromo = getPromo();

      if (currentPromo && currentPromo.shiftId !== shift.id) {
        setPromo(this.createFreshPromoForShift(shift));
      }

      let promo = getPromo();
      if (!promo || promo.shiftId !== shift.id) {
        promo = this.createFreshPromoForShift(shift);
        setPromo(promo);
      }

      const initialPrice = this.getInitialShownPrice(shift.finalPrice);

      if (!promo.priceStage || promo.priceStage === 0) {
        const firstClickPrice = this.getFirstClickPrice(shift.finalPrice);
        promo.priceStage = 1;
        promo.finalPrice = firstClickPrice;
        promo.createdAt = new Date().toISOString();
        setPromo(promo);

        reachMetrikaGoal('show_price_click_1', {
          shift_id: shift.id,
          shift_name: shift.name,
          device: currentDevice()
        });

        priceEl.classList.add('aidacamp-value-updating');

        animateNumber({
          from: initialPrice,
          to: firstClickPrice,
          duration: 1000,
          onUpdate(v) {
            priceEl.textContent = formatPrice(v);
          },
          onComplete: () => {
            priceEl.textContent = formatPrice(firstClickPrice);
            priceEl.classList.remove('aidacamp-value-updating');
            cardCell.querySelector('.aidacamp-meta').innerHTML =
              `Нашли персональную цену <strong>${formatPrice(firstClickPrice)}</strong>. <strong>Осталась 1 попытка</strong> получить лучшую цену.`;
            this.refreshAllCards();

            if (window.AIDACAMP_BOOKING_ENGINE && typeof window.AIDACAMP_BOOKING_ENGINE.forceRefresh === 'function') {
              window.AIDACAMP_BOOKING_ENGINE.forceRefresh();
            }
          }
        });
        return;
      }

      if (promo.priceStage === 1) {
        const fromPrice = promo.finalPrice;
        const secondClickPrice = this.getSecondClickPrice(shift.finalPrice);
        promo.priceStage = 2;
        promo.finalPrice = secondClickPrice;
        promo.createdAt = new Date().toISOString();
        setPromo(promo);

        reachMetrikaGoal('show_price_click_2', {
          shift_id: shift.id,
          shift_name: shift.name,
          device: currentDevice()
        });

        priceEl.classList.add('aidacamp-value-updating');

        animateNumber({
          from: fromPrice,
          to: secondClickPrice,
          duration: 1200,
          onUpdate(v) {
            priceEl.textContent = formatPrice(v);
          },
          onComplete: () => {
            priceEl.textContent = formatPrice(secondClickPrice);
            priceEl.classList.remove('aidacamp-value-updating');
            cardCell.querySelector('.aidacamp-meta').innerHTML =
              `Нашли лучшую цену <strong>${formatPrice(secondClickPrice)}</strong>.`;
            this.refreshAllCards();

            if (window.AIDACAMP_BOOKING_ENGINE && typeof window.AIDACAMP_BOOKING_ENGINE.forceRefresh === 'function') {
              window.AIDACAMP_BOOKING_ENGINE.forceRefresh();
            }

            setTimeout(() => this.openPromoModal(shift, promo), 500);
          }
        });
      }
    },

    prepareCards() {
      const rec = document.getElementById(CONFIG.recId);
      if (!rec) return;

      CONFIG.shifts.forEach(shift => {
        const priceEl = document.querySelector(`[field="${shift.priceField}"]`);
        const descrEl = document.querySelector(`[field="${shift.descrField}"]`);
        if (!priceEl || !descrEl) return;

        const cardCol = priceEl.closest('.t1067__col');
        const cardCell = priceEl.closest('.t-cell');
        if (!cardCol || !cardCell) return;

        priceEl.textContent = formatPrice(this.getInitialShownPrice(shift.finalPrice));
        descrEl.innerHTML = this.buildDescriptionHTML(shift);
        this.addBadges(cardCell, shift);
        this.applyCardState(cardCol, shift);

        const prepared = { shift, cardCol, cardCell, priceEl, descrEl };
        this.renderPromoState(prepared);
        this.preparedCards.push(prepared);
      });
    },

    initCardObserver() {
      if (!this.preparedCards.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('aidacamp-visible');
        });
      }, {
        threshold: 0.22,
        rootMargin: '0px 0px -40px 0px'
      });

      this.preparedCards.forEach(item => observer.observe(item.cardCol));
    },

    refreshAllCards() {
      this.preparedCards.forEach(item => this.renderPromoState(item));
    },

    startActivePromoTimersOnCards() {
      setInterval(() => {
        const promo = getPromo();

        if (!promo || promo.status !== 'active' || !isActiveAlive(promo)) {
          this.refreshAllCards();
          return;
        }

        this.preparedCards.forEach(item => {
          if (item.shift.id !== promo.shiftId) return;
          const fixedBox = item.cardCell.querySelector('.aidacamp-fixed-box');
          if (!fixedBox) return;

          const left = getActiveExpiresAt(promo).getTime() - nowTs();
          if (left > 0) {
            fixedBox.querySelector('.aidacamp-fixed-box__timer').textContent =
              `${CONFIG.texts.fixedTimerPrefix} ${formatRemaining(left)}`;
          } else {
            clearState();
            this.refreshAllCards();
          }
        });
      }, 60000);
    },

    createPromoModal() {
      const modal = document.createElement('div');
      modal.className = 'aidacamp-modal-backdrop';
      modal.innerHTML = `
        <div class="aidacamp-modal"> <button class="aidacamp-modal__close" type="button">×</button> <div class="aidacamp-modal__top"> <h3 class="aidacamp-modal__title">Зафиксировать цену</h3> <div class="aidacamp-modal__subtitle">Можно сейчас получить и зафиксировать цену, а о бронировании подумать позже.</div> </div> <div class="aidacamp-modal__body"> <div class="aidacamp-modal__promo-preview"> <div class="aidacamp-modal__promo-label">Ваш промокод</div> <div class="aidacamp-modal__promo-code" id="aidacamp-modal-code-preview">AIDA-0000</div> <div class="aidacamp-modal__promo-note" id="aidacamp-modal-note"></div> </div> <div id="aidacamp-modal-form"> <div class="aidacamp-modal__label">Телефон</div> <input type="tel" class="aidacamp-modal__input" id="aidacamp-phone-input" placeholder="+7 (999) 123-45-67" /> <div class="aidacamp-modal__hint">Чтобы код начал действовать, укажите номер телефона. Мы привяжем его к вашему бронированию.</div> <div class="aidacamp-modal__actions"> <button type="button" class="aidacamp-modal__btn aidacamp-modal__btn--primary" id="aidacamp-get-code-btn">Активировать промокод</button> <button type="button" class="aidacamp-modal__btn aidacamp-modal__btn--secondary" id="aidacamp-cancel-btn">Подумать позже</button> </div> </div> <div class="aidacamp-modal__success" id="aidacamp-modal-success"> <div><strong>Промокод активирован</strong></div> <div class="aidacamp-modal__success-code" id="aidacamp-success-code">AIDA-0000</div> <div class="aidacamp-modal__success-text" id="aidacamp-success-text"></div> <a href="/#booking" class="aidacamp-modal__go-booking">Перейти к бронированию</a> </div> </div> </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = modal.querySelector('.aidacamp-modal__close');
      const cancelBtn = modal.querySelector('#aidacamp-cancel-btn');
      const getCodeBtn = modal.querySelector('#aidacamp-get-code-btn');
      const phoneInput = modal.querySelector('#aidacamp-phone-input');
      const codePreview = modal.querySelector('#aidacamp-modal-code-preview');
      const note = modal.querySelector('#aidacamp-modal-note');
      const success = modal.querySelector('#aidacamp-modal-success');
      const successCode = modal.querySelector('#aidacamp-success-code');
      const successText = modal.querySelector('#aidacamp-success-text');
      const formWrap = modal.querySelector('#aidacamp-modal-form');

      phoneInput.addEventListener('focus', function () {
        if (!this.value) this.value = '+7';
      });

      phoneInput.addEventListener('input', function () {
        this.value = formatPhoneMask(this.value);
      });

      phoneInput.addEventListener('keydown', function (e) {
        if ((e.key === 'Backspace' || e.key === 'Delete') && this.value.length <= 2) {
          e.preventDefault();
        }
      });

      closeBtn.addEventListener('click', () => this.closePromoModal());
      cancelBtn.addEventListener('click', () => this.closePromoModal());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closePromoModal();
      });

      getCodeBtn.addEventListener('click', async () => {
        if (!this.currentPromoShift || !this.currentGeneratedCode) return;

        const rawPhone = phoneInput.value.trim();
        const normalizedPhone = normalizePhone(rawPhone);

        if (!isValidPhone(rawPhone)) {
          phoneInput.focus();
          phoneInput.style.borderColor = '#ff5a1f';
          setTimeout(() => { phoneInput.style.borderColor = '#ddd'; }, 1200);
          return;
        }

        const draft = getPromo();
        const payload = Object.assign({}, draft || {}, {
          shiftId: this.currentPromoShift.id,
          shiftName: this.currentPromoShift.name,
          finalPrice: draft && draft.finalPrice ? draft.finalPrice : this.currentPromoShift.finalPrice,
          code: this.currentGeneratedCode,
          phone: normalizedPhone,
          holdHours: CONFIG.promo.holdHours,
          activatedAt: new Date().toISOString(),
          status: 'active'
        });

        setPromo(payload);

        if (window.AIDACAMP_BOOKING_ENGINE && typeof window.AIDACAMP_BOOKING_ENGINE.forceRefresh === 'function') {
          window.AIDACAMP_BOOKING_ENGINE.forceRefresh();
        }

        reachMetrikaGoal('promo_phone_activation', {
          shift_id: payload.shiftId,
          shift_name: payload.shiftName,
          has_phone: !!payload.phone,
          device: currentDevice()
        });

        await sendTelegramLead(payload);

        successCode.textContent = this.currentGeneratedCode;
        successText.textContent = `Цена ${formatPrice(payload.finalPrice)} закреплена за вами на ${CONFIG.promo.holdHours} часа. Можно бронировать позже.`;
        formWrap.style.display = 'none';
        success.classList.add('aidacamp-show');
        this.refreshAllCards();
      });

      this.modalNodes = { root: modal, phoneInput, codePreview, note, success, successCode, successText, formWrap };
    },

    openPromoModal(shift, existingPromo) {
      this.currentPromoShift = shift;
      const promo = existingPromo || this.createFreshPromoForShift(shift);
      this.currentGeneratedCode = promo.code;
      setPromo(promo);

      const m = this.modalNodes;
      m.root.classList.add('aidacamp-show');
      m.phoneInput.value = '+7';
      m.success.classList.remove('aidacamp-show');
      m.formWrap.style.display = 'block';
      m.codePreview.textContent = promo.code;
      m.note.textContent = `Этот код сохранит цену ${formatPrice(promo.finalPrice)} на ${CONFIG.promo.holdHours} часа после активации по телефону.`;
      setTimeout(() => m.phoneInput.focus(), 100);
    },

    closePromoModal() {
      this.modalNodes.root.classList.remove('aidacamp-show');
      this.currentPromoShift = null;
    },

    createReminderUI() {
      const bar = document.createElement('div');
      bar.className = 'aidacamp-reminder-bar';
      bar.innerHTML = `
        <div class="aidacamp-reminder-bar__text" id="aidacampReminderBarText"></div> <div class="aidacamp-reminder-bar__actions"> <button class="aidacamp-reminder-bar__btn aidacamp-reminder-bar__btn--primary" id="aidacampReminderActivate">
            Активировать код
          </button> <button class="aidacamp-reminder-bar__btn aidacamp-reminder-bar__btn--secondary" id="aidacampReminderClose">
            Позже
          </button> </div>
      `;
      document.body.appendChild(bar);

      const modal = document.createElement('div');
      modal.className = 'aidacamp-reminder-modal-backdrop';
      modal.innerHTML = `
        <div class="aidacamp-reminder-modal"> <button class="aidacamp-reminder-modal__close" type="button">×</button> <div class="aidacamp-reminder-modal__top"> <h3 class="aidacamp-reminder-modal__title">Вы уже открывали фиксацию цены</h3> </div> <div class="aidacamp-reminder-modal__body"> <div id="aidacampReminderModalText"></div> <div class="aidacamp-reminder-modal__code" id="aidacampReminderModalCode"></div> <div class="aidacamp-reminder-modal__actions"> <button class="aidacamp-reminder-modal__btn aidacamp-reminder-modal__btn--primary" id="aidacampReminderModalActivate">
                Активировать код
              </button> <button class="aidacamp-reminder-modal__btn aidacamp-reminder-modal__btn--secondary" id="aidacampReminderModalLater">
                Продолжить просмотр
              </button> </div> </div> </div>
      `;
      document.body.appendChild(modal);

      this.reminderNodes = {
        bar,
        barText: bar.querySelector('#aidacampReminderBarText'),
        barActivate: bar.querySelector('#aidacampReminderActivate'),
        barClose: bar.querySelector('#aidacampReminderClose'),
        modal,
        modalText: modal.querySelector('#aidacampReminderModalText'),
        modalCode: modal.querySelector('#aidacampReminderModalCode'),
        modalActivate: modal.querySelector('#aidacampReminderModalActivate'),
        modalLater: modal.querySelector('#aidacampReminderModalLater'),
        modalClose: modal.querySelector('.aidacamp-reminder-modal__close')
      };

      this.reminderNodes.barActivate.addEventListener('click', () => this.activateDraftFromReminder());
      this.reminderNodes.barClose.addEventListener('click', () => this.hideReminderBar());
      this.reminderNodes.modalActivate.addEventListener('click', () => this.activateDraftFromReminder());
      this.reminderNodes.modalLater.addEventListener('click', () => this.hideReminderModal());
      this.reminderNodes.modalClose.addEventListener('click', () => this.hideReminderModal());
      this.reminderNodes.modal.addEventListener('click', (e) => {
        if (e.target === this.reminderNodes.modal) this.hideReminderModal();
      });
    },

    hideReminderBar() {
      this.reminderNodes.bar.classList.remove('aidacamp-show');
    },

    hideReminderModal() {
      this.reminderNodes.modal.classList.remove('aidacamp-show');
    },

    showReminderBar(promo) {
      const state = loadState();
      if ((state.reminders.shows || 0) >= CONFIG.reminders.maxShows) return;

      this.reminderNodes.barText.innerHTML = `
        Вы уже смотрели промокод <strong>${promo.code}</strong> для смены <strong>${promo.shiftName}</strong>.<br>
        Цена для вас: <strong>${formatPrice(promo.finalPrice)}</strong>.
      `;
      this.reminderNodes.bar.classList.add('aidacamp-show');

      state.reminders.barShown = true;
      state.reminders.shows += 1;
      state.reminders.lastShownAt = nowTs();
      saveState(state);
    },

    showReminderModal(promo, reason) {
      const state = loadState();
      if ((state.reminders.shows || 0) >= CONFIG.reminders.maxShows) return;

      this.reminderNodes.modalText.innerHTML = `
        Для смены <strong>${promo.shiftName}</strong> у вас уже есть персональная цена
        <strong>${formatPrice(promo.finalPrice)}</strong>.<br><br>
        Чтобы код начал действовать и закрепил цену на 72 часа, укажите телефон.
      `;
      this.reminderNodes.modalCode.textContent = promo.code;
      this.reminderNodes.modal.classList.add('aidacamp-show');

      if (reason === 'exit') state.reminders.exitShown = true;
      if (reason === 'revisit') state.reminders.revisitShown = true;

      state.reminders.shows += 1;
      state.reminders.lastShownAt = nowTs();
      saveState(state);
    },

    activateDraftFromReminder() {
      const promo = getPromo();
      if (!promo || promo.status !== 'draft' || !isDraftAlive(promo)) return;
      this.hideReminderBar();
      this.hideReminderModal();
      const shift = getShiftById(promo.shiftId);
      if (!shift) return;
      this.openPromoModal(shift, promo);
    },

    initReminderFlows() {
      const promo = getPromo();
      if (!promo || promo.status !== 'draft' || !isDraftAlive(promo) || promo.priceStage < 2) return;

      const state = loadState();
      if ((state.reminders.shows || 0) >= CONFIG.reminders.maxShows) return;

      if (!state.reminders.revisitShown) {
        setTimeout(() => {
          const fresh = getPromo();
          if (fresh && fresh.status === 'draft' && isDraftAlive(fresh) && fresh.priceStage >= 2) {
            this.showReminderModal(fresh, 'revisit');
          }
        }, CONFIG.reminders.revisitPopupDelayMs);
      }

      if (!state.reminders.barShown) {
        setTimeout(() => {
          const fresh = getPromo();
          const freshState = loadState();
          if (fresh && fresh.status === 'draft' && isDraftAlive(fresh) && fresh.priceStage >= 2 && (freshState.reminders.shows || 0) < CONFIG.reminders.maxShows) {
            this.showReminderBar(fresh);
          }
        }, CONFIG.reminders.firstBarDelayMs);
      }

      let exitTriggered = false;
      document.addEventListener('mouseout', (e) => {
        if (exitTriggered) return;
        const fresh = getPromo();
        const freshState = loadState();
        if (!fresh || fresh.status !== 'draft' || !isDraftAlive(fresh) || fresh.priceStage < 2) return;
        if (freshState.reminders.exitShown) return;
        if ((freshState.reminders.shows || 0) >= CONFIG.reminders.maxShows) return;
        if (e.clientY <= 0) {
          exitTriggered = true;
          this.showReminderModal(fresh, 'exit');
        }
      });
    }
  };

  const BookingEngine = {
    _timerInterval: null,
    _fillObserver: null,
    _refreshTimer: null,

    init() {
      cleanupState();

      const promo = getPromo();
      if (!promo) return;

      reachMetrikaGoal('booking_form_opened', {
        shift_id: promo.shiftId,
        shift_name: promo.shiftName,
        promo_status: promo.status,
        device: currentDevice()
      });

      this.renderCurrentState();

      window.addEventListener('aidacampPromoUpdated', () => {
        this.forceRefresh();
      });

      window.addEventListener('storage', (e) => {
        if (e.key === CONFIG.storageKey) {
          this.forceRefresh();
        }
      });
    },

    forceRefresh() {
      const tryRender = () => {
        const form = document.getElementById(CONFIG.bookingFormId);
        if (!form) return false;
        this.renderCurrentState();
        return true;
      };

      if (tryRender()) return;

      if (this._refreshTimer) {
        clearInterval(this._refreshTimer);
      }

      let attempts = 0;
      this._refreshTimer = setInterval(() => {
        attempts += 1;
        if (tryRender() || attempts > 20) {
          clearInterval(this._refreshTimer);
          this._refreshTimer = null;
        }
      }, 250);
    },

    renderCurrentState() {
      cleanupState();

      const promo = getPromo();
      if (!promo) return;

      const form = document.getElementById(CONFIG.bookingFormId);
      if (!form) return;

      this.removeOldBanners();
      this.renderBanner(form, promo);
      this.fillAllForms(promo);
      this.startTimer();
      this.scrollToAnchor();
    },

    removeOldBanners() {
      document.querySelectorAll('.aidacamp-booking-fixed').forEach(el => el.remove());

      const mobileRec = document.querySelector(CONFIG.mobileBookingRecId);
      if (mobileRec) {
        mobileRec.querySelectorAll('.aidacamp-mobile-promo-box').forEach(el => el.remove());
      }
    },

    renderBanner(form, promo) {
      const title = promo.status === 'active'
        ? CONFIG.texts.bookingActiveTitle
        : CONFIG.texts.bookingDraftTitle;

      const phoneLineDesktop = promo.phone
        ? `Телефон: <strong>${formatPhoneMask(promo.phone)}</strong><br>`
        : '';

      const timerDesktop =
        promo.status === 'active' && isActiveAlive(promo)
          ? `<div class="aidacamp-booking-fixed__timer" id="aidacampBookingTimer">
              ${CONFIG.texts.fixedTimerPrefix} ${formatRemaining(getActiveExpiresAt(promo).getTime() - nowTs())}
            </div>`
          : `<div class="aidacamp-booking-fixed__timer">
              Чтобы закрепить цену на 72 часа, укажите телефон в форме.
            </div>`;

      const banner = document.createElement('div');
      banner.className = 'aidacamp-booking-fixed';
      banner.innerHTML = `
        <div class="aidacamp-booking-fixed__title">${title}</div> <div class="aidacamp-booking-fixed__meta">
          Смена: <strong>${promo.shiftName}</strong><br>
          Цена: <strong>${formatPrice(promo.finalPrice)}</strong><br>
          Промокод: <strong>${promo.code}</strong><br>
          ${phoneLineDesktop}
        </div>
        ${timerDesktop}
      `;

      form.parentNode.insertBefore(banner, form);

      const mobileRec = document.querySelector(CONFIG.mobileBookingRecId);
      if (mobileRec) {
        const phoneLineMobile = promo.phone
          ? `Телефон: <strong>${formatPhoneMask(promo.phone)}</strong><br>`
          : '';

        const mobileBox = document.createElement('div');
        mobileBox.className = 'aidacamp-mobile-promo-box';
        mobileBox.innerHTML = `
          <div class="aidacamp-mobile-promo-box__title">${title}</div> <div class="aidacamp-mobile-promo-box__meta">
            Смена: <strong>${promo.shiftName}</strong><br>
            Цена: <strong>${formatPrice(promo.finalPrice)}</strong><br>
            Промокод: <strong>${promo.code}</strong><br>
            ${phoneLineMobile}
          </div>
          ${
            promo.status === 'active' && isActiveAlive(promo)
              ? `<div class="aidacamp-mobile-promo-box__timer" id="aidacampMobileBookingTimer">
                   ${CONFIG.texts.fixedTimerPrefix} ${formatRemaining(getActiveExpiresAt(promo).getTime() - nowTs())}
                 </div>`
              : `<div class="aidacamp-mobile-promo-box__timer">
                   Чтобы закрепить цену на 72 часа, укажите телефон в форме.
                 </div>`
          }
        `;

        mobileRec.prepend(mobileBox);
      }
    },

    fillAllForms(promo) {
      const fillField = (field, value) => {
        if (!field) return;
        field.value = value;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        field.dispatchEvent(new Event('keyup', { bubbles: true }));
        field.dispatchEvent(new Event('blur', { bubbles: true }));
      };

      const fillOnce = () => {
        const visiblePhones = Array.from(document.querySelectorAll(
          'input[name="tildaspec-phone-part[]"], input.t-input-phonemask'
        ));

        const hiddenPhones = Array.from(document.querySelectorAll(
          'input[name="Phone"], input[name="phone"], input[data-tilda-rule="phone"]'
        ));

        const promoInputs = Array.from(document.querySelectorAll(
          'input[name="promo"], input[name="Input"], input[placeholder*="ромокод"], input[placeholder*="Промокод"]'
        ));

        const shiftSelects = Array.from(document.querySelectorAll(
          'select[name="note"], select[name*="shift"], select[id*="note"]'
        ));

        if (promo.phone) {
          visiblePhones.forEach(el => fillField(el, formatPhoneVisible(promo.phone)));
          hiddenPhones.forEach(el => fillField(el, formatPhoneMask(promo.phone)));
        }

        promoInputs.forEach(el => fillField(el, promo.code));

        const shift = getShiftById(promo.shiftId);
        const label = shift ? shift.bookingOptionLabel : '';

        if (label) {
          shiftSelects.forEach(select => {
            const options = Array.from(select.options || []);
            const match = options.find(opt => opt.textContent.trim().startsWith(label));
            if (match) {
              select.value = match.value;
              select.dispatchEvent(new Event('change', { bubbles: true }));
              select.dispatchEvent(new Event('input', { bubbles: true }));
              select.dispatchEvent(new Event('blur', { bubbles: true }));
            }
          });
        }
      };

      fillOnce();
      setTimeout(fillOnce, 300);
      setTimeout(fillOnce, 800);
      setTimeout(fillOnce, 1500);
      setTimeout(fillOnce, 2500);
      setTimeout(fillOnce, 4000);
      setTimeout(fillOnce, 6000);

      if (this._fillObserver) {
        this._fillObserver.disconnect();
      }

      this._fillObserver = new MutationObserver(() => {
        fillOnce();
      });

      this._fillObserver.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        if (this._fillObserver) {
          this._fillObserver.disconnect();
        }
      }, 7000);
    },

    startTimer() {
      const timerEl = document.getElementById('aidacampBookingTimer');
      const mobileTimerEl = document.getElementById('aidacampMobileBookingTimer');

      if (!timerEl && !mobileTimerEl) return;

      if (this._timerInterval) {
        clearInterval(this._timerInterval);
      }

      const update = () => {
        const promo = getPromo();

        if (!promo || promo.status !== 'active') {
          if (timerEl) timerEl.textContent = 'Срок фиксации цены закончился';
          if (mobileTimerEl) mobileTimerEl.textContent = 'Срок фиксации цены закончился';
          return;
        }

        if (!isActiveAlive(promo)) {
          clearState();
          if (timerEl) timerEl.textContent = 'Срок фиксации цены закончился';
          if (mobileTimerEl) mobileTimerEl.textContent = 'Срок фиксации цены закончился';
          return;
        }

        const text = `${CONFIG.texts.fixedTimerPrefix} ${formatRemaining(getActiveExpiresAt(promo).getTime() - nowTs())}`;

        if (timerEl) timerEl.textContent = text;
        if (mobileTimerEl) mobileTimerEl.textContent = text;
      };

      update();
      this._timerInterval = setInterval(update, 60000);
    },

    scrollToAnchor() {
      function scrollToBooking() {
        const el = document.querySelector(CONFIG.bookingAnchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      setTimeout(scrollToBooking, 400);
      setTimeout(scrollToBooking, 900);
    }
  };

  window.AIDACAMP_BOOKING_ENGINE = BookingEngine;

  function delayedInit() {
    cleanupState();

    if (isLandingPage()) {
      let tries = 0;
      const timer = setInterval(() => {
        tries++;
        const rec = document.getElementById(CONFIG.recId);
        if (rec && rec.querySelector('.t1067__col')) {
          clearInterval(timer);
          LandingEngine.init();
        }
        if (tries > 20) clearInterval(timer);
      }, 300);
    }

    if (isBookingPage()) {
      let tries = 0;
      const timer = setInterval(() => {
        tries++;
        const form = document.getElementById(CONFIG.bookingFormId);
        if (form) {
          clearInterval(timer);
          BookingEngine.init();
        }
        if (tries > 20) clearInterval(timer);
      }, 300);
    }
  }

  if (document.readyState !== 'loading') delayedInit();
  else document.addEventListener('DOMContentLoaded', delayedInit);
})();
