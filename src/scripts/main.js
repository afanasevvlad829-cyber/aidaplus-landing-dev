(function () {
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  // DEV switches. Disable before shipping final static production version.
  var AC_DEV_REMOTE_TEAM_REFRESH_ENABLED = true;
  var AC_DEV_RUTUBE_VIDEO_FEED_ENABLED = true;
  var AC_DEV_RUTUBE_VIDEOS = [
    {
      url: "https://rutube.ru/shorts/f1538387b19f82f0305f7ae7222bf57d/",
      title: "За неделю в лагере ребёнок меняется больше, чем за год дома"
    },
    {
      url: "https://rutube.ru/shorts/01ca8a077f86db0b95bb0adfebd8ebce/",
      title: "Зачем детям копить деньги в лагере? Узнай ответ!"
    },
    {
      url: "https://rutube.ru/shorts/41bbae1d1b167cd49c7aad94cc76b133/",
      title: "Ребенок сам откажется от телефона за 3 дня?! лагерь АйДаКемп"
    }
  ];

  function ensureLogoStatic() {
    var wrap = $("#acCardLogo");
    if (!wrap) return;
    wrap.classList.remove("is-blink");
    if (wrap._modBlinkTimer) {
      clearInterval(wrap._modBlinkTimer);
      wrap._modBlinkTimer = null;
    }
    wrap.innerHTML =
      '<img class="ac-logo-img ac-logo-img--side" src="/assets/aida-logo-small.png" alt="AidaCamp logo" width="96" height="96" loading="eager" decoding="sync" fetchpriority="high">' +
      '<div class="ac-card-logo-side__text">Мы не играем<br>в игры —<br>мы их создаём</div>';
  }

  var AC_REVIEWS_DATA = [
    {
      name: "Сергей Найденов",
      sub: "папа участника, 13 лет",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
      text: "Сын вернулся из лагеря более собранным и уверенным. Очень зашло, что учеба была через проекты, а не через сухую теорию. Для нас это был лучший формат каникул.",
      stars: 5
    },
    {
      name: "Natalia Savenkova",
      sub: "мама участницы, 11 лет",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80",
      text: "Это был первый выездной лагерь для дочери, и всё прошло спокойно. Вожатые всегда на связи, программа насыщенная, ребёнок просится обратно уже на следующую смену.",
      stars: 5
    },
    {
      name: "Виктория",
      sub: "мама участника, 12 лет",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
      text: "Сильное место и по атмосфере, и по содержанию. Ребёнок не просто отдохнул, а действительно прокачался в IT и стал намного самостоятельнее в бытовых вопросах.",
      stars: 5
    },
    {
      name: "Отзыв родителя",
      sub: "из Яндекс Карт",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
      text: "Для нас было важно, чтобы лагерь дал результат, а не просто занял время. Итог: готовые мини-проекты, новые друзья и заметно выросшая мотивация к учебе.",
      stars: 5
    },
    {
      name: "Отзыв родителя",
      sub: "из Яндекс Карт",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
      text: "Очень понравился баланс между технологиями, спортом и отдыхом. Организация чёткая, питание хорошее, а главное - ребёнок всё время был вовлечён и доволен.",
      stars: 5
    },
    {
      name: "Екатерина Л.",
      sub: "мама участника, 10 лет",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=300&q=80",
      text: "Спасибо команде лагеря за внимание к детям и понятную обратную связь для родителей. Ребёнок приехал с идеями для собственных проектов и впервые сам попросил записать его на следующую смену.",
      stars: 5
    }
  ];

  function ensureYandexReviewsTab() {
    var host = $("#acLtReviews");
    if (!host) return;

    var reviews = AC_REVIEWS_DATA.slice();

    host.innerHTML = '' +
      '<div class="ac-reviews-modern">' +
      '  <div class="ac-reviews-modern__viewport">' +
      '    <div class="ac-reviews-modern__track" id="acReviewsTrackMod"></div>' +
      "  </div>" +
      '  <div class="ac-reviews-modern__nav">' +
      '    <div class="ac-reviews-modern__nav-main">' +
      '      <button class="ac-reviews-ya__arrow" id="acReviewsPrevMod" type="button" aria-label="Назад"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true"></button>' +
      '      <div class="ac-reviews-ya__dots" id="acReviewsDotsMod"></div>' +
      '      <button class="ac-reviews-ya__arrow" id="acReviewsNextMod" type="button" aria-label="Вперёд"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true"></button>' +
      '    </div>' +
      '    <a class="ac-reviews-modern__source-link" href="https://yandex.ru/maps/org/aydakemp/35558479035/reviews/?ll=38.874756%2C55.531232&z=7" target="_blank" rel="noopener noreferrer">Смотреть на Яндекс Картах</a>' +
      "  </div>" +
      "</div>";

    var track = $("#acReviewsTrackMod", host);
    var dots = $("#acReviewsDotsMod", host);
    var prev = $("#acReviewsPrevMod", host);
    var next = $("#acReviewsNextMod", host);
    if (!track || !dots || !prev || !next) return;

    var index = 0;
    var total = 1;
    var allDots = [];
    var resizeTimer = null;

    function getCardsPerSlide() {
      var w = window.innerWidth || 1280;
      if (w >= 1200) return 3;
      if (w >= 760) return 2;
      return 1;
    }

    function chunk(arr, size) {
      var out = [];
      for (var i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
      return out;
    }

    function renderSlides() {
      var perSlide = getCardsPerSlide();
      var slides = chunk(reviews, perSlide);
      track.innerHTML = "";
      dots.innerHTML = "";

      slides.forEach(function (group, idx) {
        var slide = document.createElement("div");
        slide.className = "ac-reviews-modern__slide";
        group.forEach(function (r) {
          var card = document.createElement("div");
          card.className = "ac-review-modern-card";
          var quoteClass = "ac-review-modern-card__quote";
          var len = (r.text || "").length;
          if (len > 210) quoteClass += " is-xl";
          else if (len > 165) quoteClass += " is-lg";
          var stars = "★★★★★";
          card.innerHTML =
            '<img class="ac-review-modern-card__avatar" src="' + r.avatar + '" alt="' + r.name + '" width="72" height="72" loading="lazy" decoding="async">' +
            '<div class="' + quoteClass + '">“ ' + r.text + ' ”</div>' +
            '<div class="ac-review-modern-card__divider"></div>' +
            '<div class="ac-review-modern-card__name">' + r.name + '</div>' +
            '<div class="ac-review-modern-card__sub">' + r.sub + '</div>' +
            '<div class="ac-review-modern-card__stars">' + stars + "</div>";
          slide.appendChild(card);
        });
        track.appendChild(slide);
        var dot = document.createElement("span");
        dot.className = "ac-reviews-ya__dot" + (idx === 0 ? " is-active" : "");
        dots.appendChild(dot);
      });

      total = Math.max(1, slides.length);
      if (index >= total) index = total - 1;
      allDots = $$(".ac-reviews-ya__dot", dots);
      update();
    }

    function update() {
      track.style.transform = "translateX(" + (-100 * index) + "%)";
      allDots.forEach(function (d, i) { d.classList.toggle("is-active", i === index); });
    }

    prev.onclick = function () { index = (index - 1 + total) % total; update(); };
    next.onclick = function () { index = (index + 1) % total; update(); };
    renderSlides();

    if (!host._reviewsResizeBound) {
      host._reviewsResizeBound = true;
      window.addEventListener("resize", function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(renderSlides, 120);
      });
    }
  }

  var AC_BOOK_INFO = {
    title: "Python для детей. Играем, чтобы программировать",
    subtitle: "Книга команды #АйДаКодить на основе реального опыта обучения детей программированию.",
    cover: "https://thb.tildacdn.com/tild6365-6534-4638-b239-383931316134/-/resize/504x/noroot.png",
    pageUrl: "https://www.codims.ru/python-book",
    ozonUrl: "https://www.ozon.ru/product/python-dlya-detey-igraem-chtoby-programmirovat-afanasev-vladimir-vladimirovich-3487599843/?utm_campaign=vendor_org_107021_bomboraru&utm_medium=r5&utm_source=bomboraru",
    litresUrl: "https://www.litres.ru/search/?q=Python%20%D0%B4%D0%BB%D1%8F%20%D0%B4%D0%B5%D1%82%D0%B5%D0%B9%20%D0%98%D0%B3%D1%80%D0%B0%D0%B5%D0%BC%2C%20%D1%87%D1%82%D0%BE%D0%B1%D1%8B%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C",
    facts: [
      "Для детей, которые хотят начать изучать Python и сделать первую игру.",
      "Тираж: 2000 экземпляров.",
      "Формат: печатная и электронная версия."
    ],
    authors: [
      "Владимир Афанасьев",
      "Никита Брагин",
      "Александр Ташкин",
      "Мухаммет Идрисов"
    ]
  };

  function ensureBookInfoCard(host) {
    var card = $("#acBookInfoCard", host);
    if (card) return card;
    card = document.createElement("div");
    card.id = "acBookInfoCard";
    card.className = "ac-book-card";
    card.style.display = "none";
    card.innerHTML =
      '<div class="ac-book-card__dialog">' +
      '  <button type="button" class="ac-book-card__close" id="acBookInfoClose" aria-label="Закрыть карточку книги"><img class="ac-icon ac-icon--sm" src="/assets/icons/close.svg" alt="" aria-hidden="true"></button>' +
      '  <div class="ac-book-card__media">' +
      '    <img class="ac-book-card__cover" src="' + AC_BOOK_INFO.cover + '" alt="' + AC_BOOK_INFO.title + '" loading="lazy" decoding="async" width="504" height="680" referrerpolicy="strict-origin-when-cross-origin">' +
      "  </div>" +
      '  <div class="ac-book-card__body">' +
      '    <div class="ac-book-card__eyebrow">Учебник по программированию</div>' +
      '    <div class="ac-book-card__title">' + AC_BOOK_INFO.title + "</div>" +
      '    <div class="ac-book-card__text">' + AC_BOOK_INFO.subtitle + "</div>" +
      '    <ul class="ac-book-card__facts">' +
      AC_BOOK_INFO.facts.map(function (fact) { return '<li>' + fact + "</li>"; }).join("") +
      "    </ul>" +
      '    <div class="ac-book-card__authors-title">Авторы</div>' +
      '    <div class="ac-book-card__authors">' + AC_BOOK_INFO.authors.join(" · ") + "</div>" +
      '    <div class="ac-book-card__actions">' +
      '      <a class="ac-book-card__btn is-primary" href="' + AC_BOOK_INFO.ozonUrl + '" target="_blank" rel="noopener noreferrer">Купить на Ozon</a>' +
      '      <a class="ac-book-card__btn" href="' + AC_BOOK_INFO.litresUrl + '" target="_blank" rel="noopener noreferrer">Искать на ЛитРес</a>' +
      '      <a class="ac-book-card__btn" href="' + AC_BOOK_INFO.pageUrl + '" target="_blank" rel="noopener noreferrer">Подробнее</a>' +
      "    </div>" +
      "  </div>" +
      "</div>";
    host.appendChild(card);
    card.addEventListener("click", function (e) {
      if (e.target === card) card.style.display = "none";
    });
    var closeBtn = $("#acBookInfoClose", card);
    if (closeBtn) closeBtn.onclick = function () { card.style.display = "none"; };
    return card;
  }

  function ensureTeamTabLink() {
    var host = $("#acLtTeam");
    if (!host) return;
    var wrap = $("#acTeamSourceLinkWrap", host);
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "acTeamSourceLinkWrap";
      host.appendChild(wrap);
    }
    wrap.style.cssText = "margin-top:10px;text-align:center;";
    wrap.innerHTML =
      '<button type="button" id="acBookInfoOpen" style="font-family:\'Comfortaa\',sans-serif;font-size:12px;color:#4b5563;text-decoration:underline;background:none;border:none;padding:0;cursor:pointer;">Учебник по программированию</button>';
    var card = ensureBookInfoCard(host);
    var openBtn = $("#acBookInfoOpen", wrap);
    if (openBtn) {
      openBtn.onclick = function () {
        if (card) card.style.display = "flex";
      };
    }
  }

  function cloneOverlayContentToSection(sourceId, targetId) {
    var source = document.getElementById(sourceId);
    var target = document.getElementById(targetId);
    if (!source || !target) return;
    var clone = source.cloneNode(true);
    clone.removeAttribute("id");
    clone.style.display = "flex";
    clone.classList.add("ac-full-overlay-copy");
    $$("[id]", clone).forEach(function (el) { el.removeAttribute("id"); });
    target.innerHTML = "";
    target.appendChild(clone);
  }

  function renderFullModeAiSection() {
    var source = document.getElementById("acLtAiprogram");
    var host = document.getElementById("acFullAi");
    if (!source || !host) return;
    var stat = source.querySelector(".ac-ai-stat-card");
    var grid = source.querySelector(".ac-ai-stat-grid");
    var manifesto = source.querySelector(".ac-ai-manifesto");
    host.innerHTML =
      '<div class="ac-section-grid">' +
      '  <article class="ac-section-card">' + (stat ? stat.outerHTML : "") + "</article>" +
      '  <article class="ac-section-card">' + (grid ? grid.outerHTML : "") + "</article>" +
      '  <article class="ac-section-card"><div class="ac-section-card__text">' + (manifesto ? manifesto.innerHTML : "") + "</div></article>" +
      "</div>";
  }

  function renderFullModeLocationSection() {
    var source = document.getElementById("acLtPlace");
    var host = document.getElementById("acFullLocation");
    if (!source || !host) return;
    var title = source.querySelector(":scope > div:nth-child(1)");
    var sub = source.querySelector(":scope > div:nth-child(2)");
    var map = source.querySelector(".ac-left-map");
    var facts = source.querySelector(".ac-left-facts");
    host.innerHTML =
      '<div class="ac-section-grid">' +
      '  <article class="ac-section-card"><h3>Где проходит смена</h3><div class="ac-section-card__text">' + (title ? title.innerHTML : "") + (sub ? ('<div style="margin-top:6px">' + sub.innerHTML + "</div>") : "") + "</div></article>" +
      '  <article class="ac-section-card">' + (map ? map.outerHTML : "") + "</article>" +
      '  <article class="ac-section-card"><h3>Что рядом и внутри</h3>' + (facts ? facts.outerHTML : "") + "</article>" +
      "</div>";
  }

  function renderFullModeReviewsSection() {
    var host = document.getElementById("acFullReviews");
    if (!host) return;
    var reviews = AC_REVIEWS_DATA.slice();
    var prevId = "acFullReviewsPrev";
    var nextId = "acFullReviewsNext";
    var trackId = "acFullReviewsTrack";
    host.innerHTML =
      '<div class="ac-full-cards-slider">' +
      '  <button class="ac-full-cards-slider__arrow" id="' + prevId + '" type="button" aria-label="Назад"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true"></button>' +
      '  <div class="ac-full-cards-slider__viewport">' +
      '    <div class="ac-full-cards-slider__track" id="' + trackId + '"></div>' +
      "  </div>" +
      '  <button class="ac-full-cards-slider__arrow" id="' + nextId + '" type="button" aria-label="Вперёд"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true"></button>' +
      "</div>";
    var track = document.getElementById(trackId);
    var prev = document.getElementById(prevId);
    var next = document.getElementById(nextId);
    if (!track || !prev || !next) return;
    var index = 0;
    var total = 1;
    var resizeTimer = null;
    function getPerSlide() {
      var w = window.innerWidth || 1280;
      if (w >= 1100) return 4;
      if (w >= 760) return 2;
      return 1;
    }
    function chunk(arr, size) {
      var out = [];
      for (var i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
      return out;
    }
    function renderSlides() {
      var perSlide = getPerSlide();
      var slides = chunk(reviews, perSlide);
      track.innerHTML = "";
      slides.forEach(function (group) {
        var slide = document.createElement("div");
        slide.className = "ac-full-cards-slider__slide";
        slide.style.display = "grid";
        slide.style.gap = "14px";
        slide.style.gridTemplateColumns = "repeat(" + perSlide + ", minmax(0,1fr))";
        group.forEach(function (r) {
          var quoteClass = "ac-review-modern-card__quote";
          var len = (r.text || "").length;
          if (len > 210) quoteClass += " is-xl";
          else if (len > 165) quoteClass += " is-lg";
          var card = document.createElement("article");
          card.className = "ac-review-modern-card";
          card.innerHTML =
            '<img class="ac-review-modern-card__avatar" src="' + r.avatar + '" alt="' + r.name + '" width="72" height="72" loading="lazy" decoding="async">' +
            '<div class="' + quoteClass + '">“ ' + r.text + ' ”</div>' +
            '<div class="ac-review-modern-card__divider"></div>' +
            '<div class="ac-review-modern-card__name">' + r.name + "</div>" +
            '<div class="ac-review-modern-card__sub">' + r.sub + "</div>" +
            '<div class="ac-review-modern-card__stars">★★★★★</div>';
          slide.appendChild(card);
        });
        track.appendChild(slide);
      });
      total = Math.max(1, slides.length);
      if (index >= total) index = total - 1;
      update();
    }
    function update() {
      track.style.transform = "translateX(" + (-100 * index) + "%)";
      var hideNav = total < 2;
      prev.style.visibility = hideNav ? "hidden" : "visible";
      next.style.visibility = hideNav ? "hidden" : "visible";
    }
    prev.onclick = function () { index = (index - 1 + total) % total; update(); };
    next.onclick = function () { index = (index + 1) % total; update(); };
    renderSlides();
    if (!host._fullReviewsResizeBound) {
      host._fullReviewsResizeBound = true;
      window.addEventListener("resize", function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(renderSlides, 120);
      });
    }
  }

  function renderFullModeTeamSection() {
    var host = document.getElementById("acFullTeam");
    if (!host) return;
    var cards = [];
    if (Array.isArray(window.__acTeamCards) && window.__acTeamCards.length) {
      cards = window.__acTeamCards.slice();
    } else {
      cards = $$(".ac-team-slider__card", document).map(function (card) {
        var img = $(".ac-team-slider__img", card);
        var nameEl = $(".ac-team-slider__name", card);
        var roleEl = $(".ac-team-slider__role", card);
        return {
          img: img ? (img.getAttribute("src") || "") : "",
          name: nameEl ? (nameEl.textContent || "").trim() : "",
          role: roleEl ? (roleEl.textContent || "").trim() : ""
        };
      }).filter(function (x) { return x.name; });
    }
    if (!cards.length) return;

    var prevId = "acFullTeamPrev";
    var nextId = "acFullTeamNext";
    var trackId = "acFullTeamTrack";
    host.innerHTML =
      '<div class="ac-full-cards-slider">' +
      '  <button class="ac-full-cards-slider__arrow" id="' + prevId + '" type="button" aria-label="Назад"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true"></button>' +
      '  <div class="ac-full-cards-slider__viewport">' +
      '    <div class="ac-full-cards-slider__track" id="' + trackId + '"></div>' +
      "  </div>" +
      '  <button class="ac-full-cards-slider__arrow" id="' + nextId + '" type="button" aria-label="Вперёд"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true"></button>' +
      "</div>";
    var track = document.getElementById(trackId);
    var prev = document.getElementById(prevId);
    var next = document.getElementById(nextId);
    if (!track || !prev || !next) return;
    var index = 0;
    var total = 1;
    var resizeTimer = null;
    function getPerSlide() {
      var w = window.innerWidth || 1280;
      if (w >= 1100) return 4;
      if (w >= 760) return 2;
      return 1;
    }
    function chunk(arr, size) {
      var out = [];
      for (var i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
      return out;
    }
    function renderSlides() {
      var perSlide = getPerSlide();
      var slides = chunk(cards, perSlide);
      track.innerHTML = "";
      slides.forEach(function (group) {
        var slide = document.createElement("div");
        slide.className = "ac-full-cards-slider__slide";
        slide.style.display = "grid";
        slide.style.gap = "14px";
        slide.style.gridTemplateColumns = "repeat(" + perSlide + ", minmax(0,1fr))";
        group.forEach(function (p) {
          var mediaHtml = p.img
            ? '<img class="ac-team-slider__img" src="' + p.img + '" alt="' + (p.name || "Команда AidaCamp") + '" width="320" height="320" loading="lazy" decoding="async">'
            : '<div class="ac-team-slider__img ac-team-slider__img--placeholder">' + getTeamCardInitials(p.name) + "</div>";
          var card = document.createElement("article");
          card.className = "ac-team-slider__card";
          card.innerHTML =
            mediaHtml +
            '<div class="ac-team-slider__name">' + (p.name || "Команда AidaCamp") + "</div>" +
            '<div class="ac-team-slider__role">' + (p.role || "Преподаватель") + "</div>";
          slide.appendChild(card);
        });
        track.appendChild(slide);
      });
      total = Math.max(1, slides.length);
      if (index >= total) index = total - 1;
      update();
    }
    function update() {
      track.style.transform = "translateX(" + (-100 * index) + "%)";
      var hideNav = total < 2;
      prev.style.visibility = hideNav ? "hidden" : "visible";
      next.style.visibility = hideNav ? "hidden" : "visible";
    }
    prev.onclick = function () { index = (index - 1 + total) % total; update(); };
    next.onclick = function () { index = (index + 1) % total; update(); };
    renderSlides();
    if (!host._fullTeamResizeBound) {
      host._fullTeamResizeBound = true;
      window.addEventListener("resize", function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(renderSlides, 120);
      });
    }
  }

  function renderFullModePhotosSection() {
    var host = document.getElementById("acFullPhotos");
    var mediaMap = window.__acMediaMap;
    if (!host || !mediaMap || !mediaMap.photos) return;
    var prevId = "acFullPhotosPrev";
    var nextId = "acFullPhotosNext";
    var trackId = "acFullPhotosTrack";
    host.innerHTML =
      '<div class="ac-full-media-toolbar ac-full-photo-cats"></div>' +
      '<div class="ac-full-cards-slider">' +
      '  <button class="ac-full-cards-slider__arrow" id="' + prevId + '" type="button" aria-label="Назад"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true"></button>' +
      '  <div class="ac-full-cards-slider__viewport">' +
      '    <div class="ac-full-photo-grid ac-full-cards-slider__track" id="' + trackId + '"></div>' +
      "  </div>" +
      '  <button class="ac-full-cards-slider__arrow" id="' + nextId + '" type="button" aria-label="Вперёд"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true"></button>' +
      "</div>";
    var cats = $(".ac-full-photo-cats", host);
    var track = document.getElementById(trackId);
    var prev = document.getElementById(prevId);
    var next = document.getElementById(nextId);
    if (!cats || !track || !prev || !next) return;
    var catList = [
      { key: "all", label: "Все" },
      { key: "food", label: "Еда" },
      { key: "sport", label: "Спорт" },
      { key: "pool", label: "Бассейн" },
      { key: "study", label: "Учёба" }
    ];
    cats.innerHTML = catList.map(function (c, i) {
      return '<button class="media-chip ac-full-photo-cat' + (i === 0 ? " is-active" : "") + '" data-lcat="' + c.key + '">' + c.label + "</button>";
    }).join("");

    var index = 0;
    var total = 1;
    var currentList = [];
    var resizeTimer = null;

    function getPerSlide() {
      var w = window.innerWidth || 1280;
      if (w >= 1200) return 4;
      if (w >= 760) return 2;
      return 1;
    }

    function chunk(arr, size) {
      var out = [];
      for (var i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
      return out;
    }

    function renderSlides() {
      var perSlide = getPerSlide();
      var slides = chunk(currentList, perSlide);
      track.innerHTML = "";
      slides.forEach(function (group, slideIdx) {
        var slide = document.createElement("div");
        slide.className = "ac-full-photo-slide ac-full-cards-slider__slide";
        slide.style.gridTemplateColumns = "repeat(" + perSlide + ", minmax(0,1fr))";
        group.forEach(function (item, localIdx) {
          var photoIdx = slideIdx * perSlide + localIdx;
          var card = document.createElement("div");
          card.className = "ac-left-photo-item";
          card.setAttribute("data-photo-index", String(photoIdx));
          card.innerHTML = '<img src="' + item.src + '" alt="' + (item.caption || "AidaCamp media") + '" loading="lazy" decoding="async" width="800" height="800">';
          slide.appendChild(card);
        });
        track.appendChild(slide);
      });
      total = Math.max(1, slides.length);
      if (index >= total) index = total - 1;
      update();
    }

    function update() {
      track.style.transform = "translateX(" + (-100 * index) + "%)";
      var hideNav = total < 2;
      prev.style.visibility = hideNav ? "hidden" : "visible";
      next.style.visibility = hideNav ? "hidden" : "visible";
    }

    prev.onclick = function () { index = (index - 1 + total) % total; update(); };
    next.onclick = function () { index = (index + 1) % total; update(); };

    function render(cat) {
      currentList = mediaMap.photos[cat] || [];
      index = 0;
      renderSlides();
      $$(".ac-full-photo-cat", cats).forEach(function (btn) { btn.classList.toggle("is-active", btn.dataset.lcat === cat); });
    }

    track.onclick = function (e) {
      var item = e.target.closest(".ac-left-photo-item");
      if (!item) return;
      var i = Number(item.getAttribute("data-photo-index") || "0");
      openMediaLightbox(currentList, i);
    };

    cats.onclick = function (e) {
      var btn = e.target.closest(".ac-full-photo-cat");
      if (!btn) return;
      render(btn.getAttribute("data-lcat") || "all");
    };
    render("all");
    if (!host._fullPhotosResizeBound) {
      host._fullPhotosResizeBound = true;
      window.addEventListener("resize", function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(renderSlides, 120);
      });
    }
  }

  function renderFullModeVideoSection() {
    var host = document.getElementById("acFullVideo");
    if (!host) return;
    function readManifestVideos() {
      var el = document.getElementById("ac-build-media-manifest");
      if (!el) return [];
      try {
        var data = JSON.parse(el.textContent || "[]");
        if (!Array.isArray(data)) return [];
        return data.filter(function (x) { return x && x.type === "video" && x.src; }).map(function (x) {
          return { type: "video", src: x.src, caption: x.caption || "Видео" };
        });
      } catch (e) {
        return [];
      }
    }
    var rutubeItems = AC_DEV_RUTUBE_VIDEO_FEED_ENABLED
      ? AC_DEV_RUTUBE_VIDEOS.filter(function (item) { return rutubeEmbedUrl(item.url); })
      : [];
    var mediaVideos = (window.__acMediaMap && window.__acMediaMap.videos) ? window.__acMediaMap.videos.slice() : [];
    if (!mediaVideos.length) mediaVideos = readManifestVideos();
    var useRutube = !mediaVideos.length && rutubeItems.length > 0;
    var items = mediaVideos.length ? mediaVideos : rutubeItems;
    if (!items.length) return;

    host.innerHTML =
      '<div class="ac-left-video-grid ac-full-video-grid"></div>';
    var grid = $(".ac-full-video-grid", host);
    if (!grid) return;

    if (useRutube) {
      grid.innerHTML = items.slice(0, 4).map(function (item, i) {
        var poster = rutubeThumbnailUrl(item.url);
        return '' +
          '<button type="button" class="ac-left-video-item ac-left-video-item--rutube" data-video-index="' + i + '">' +
          '  <div class="ac-left-video-item__poster">' +
          (poster ? '<img class="ac-left-video-item__poster-img" src="' + poster + '" alt="' + (item.title || "Видео") + '" loading="lazy" decoding="async" width="720" height="1280" referrerpolicy="strict-origin-when-cross-origin">' : "") +
          '    <div class="ac-left-video-item__poster-shade"></div>' +
          '    <div class="ac-left-video-item__play"><img class="ac-icon ac-icon--lg" src="/assets/icons/play.svg" alt="" aria-hidden="true"></div>' +
          '    <div class="ac-left-video-item__caption">' + (item.title || "Видео") + "</div>" +
          "  </div>" +
          "</button>";
      }).join("");
      grid.onclick = function (e) {
        var item = e.target.closest(".ac-left-video-item");
        if (!item) return;
        var i = Number(item.getAttribute("data-video-index") || "0");
        openRutubeVideoLightbox(items, i);
      };
      return;
    }

    grid.innerHTML = items.slice(0, 4).map(function (item, i) {
      return '<div class="ac-left-video-item" data-video-index="' + i + '"><video src="' + item.src + '" muted loop playsinline preload="metadata" controls aria-label="Видео: ' + (item.caption || "AidaCamp") + '"></video></div>';
    }).join("");
    grid.onclick = function (e) {
      var item = e.target.closest(".ac-left-video-item");
      if (!item) return;
      var i = Number(item.getAttribute("data-video-index") || "0");
      openMediaLightbox(items, i);
    };
  }

  function renderFullModeFaqSection() {
    cloneOverlayContentToSection("acLtFaq", "acFullFaq");
    var host = document.getElementById("acFullFaq");
    if (!host) return;
    $$(".ac-left-faq__gt, .ac-left-faq__group-title, .ac-left-faq h4, .ac-left-faq h5", host).forEach(function (el) {
      el.style.display = "none";
    });
    var items = $$(".ac-left-faq__item, .ac-mini-faq details", host);
    if (!items.length) return;

    function detect(text) {
      var t = (text || "").toLowerCase();
      if (/мед|врач|здоров/.test(t)) return "med";
      if (/безопас|охран|кпп|закрыт/.test(t)) return "safe";
      if (/питан|еда|корм/.test(t)) return "food";
      if (/бассейн|плав/.test(t)) return "pool";
      if (/прожив|корпус|комнат|услов/.test(t)) return "live";
      if (/организац|режим|распис|чат|звон/.test(t)) return "org";
      if (/взять|вещ|документ|чемодан/.test(t)) return "pack";
      return "other";
    }

    var tabs = [
      { key: "med", label: "Медицина" },
      { key: "safe", label: "Безопасность" },
      { key: "food", label: "Питание" },
      { key: "pool", label: "Бассейн" },
      { key: "live", label: "Проживание" },
      { key: "org", label: "Организация" },
      { key: "pack", label: "Что взять с собой" },
      { key: "other", label: "Другое" }
    ];

    var present = {};
    items.forEach(function (item) {
      var cat = detect(item.textContent || "");
      item.setAttribute("data-faq-cat", cat);
      item.classList.add("ac-full-faq-item");
      present[cat] = true;
    });

    tabs = tabs.filter(function (t) { return !!present[t.key]; });
    if (!tabs.length) return;

    var toolbar = document.createElement("div");
    toolbar.className = "ac-full-media-toolbar ac-full-faq-tabs";
    toolbar.innerHTML = tabs.map(function (tab, i) {
      return '<button class="media-chip ac-full-faq-tab' + (i === 0 ? " is-active" : "") + '" data-fcat="' + tab.key + '">' + tab.label + "</button>";
    }).join("");
    host.insertBefore(toolbar, host.firstChild);

    function apply(cat) {
      items.forEach(function (item) {
        item.style.display = item.getAttribute("data-faq-cat") === cat ? "" : "none";
      });
      $$(".ac-full-faq-tab", toolbar).forEach(function (btn) {
        btn.classList.toggle("is-active", btn.getAttribute("data-fcat") === cat);
      });
    }

    toolbar.onclick = function (e) {
      var btn = e.target.closest(".ac-full-faq-tab");
      if (!btn) return;
      apply(btn.getAttribute("data-fcat"));
    };
    var initial = tabs.some(function (t) { return t.key === "med"; }) ? "med" : tabs[0].key;
    apply(initial);
  }

  function bootstrapIcon(name) {
    var map = {
      vk: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8.7 11.6h1c.3 0 .4-.2.4-.4v-1.4c0-.3.1-.4.3-.1l1.2 1.6c.2.2.3.3.6.3h1.8c.4 0 .5-.2.4-.5-.3-.7-1.7-2-1.8-2.2-.2-.3-.1-.4 0-.6 0 0 1.4-2 1.6-2.7.1-.3 0-.4-.3-.4h-2c-.2 0-.3.1-.4.3-.2.6-.9 1.8-1.1 2.1-.2.2-.2.3-.3.3-.1 0-.1-.1-.1-.3V5.4c0-.2-.1-.3-.4-.3H8.3c-.2 0-.3.1-.3.2 0 .2.3.2.3.7v1.7c0 .4-.1.5-.2.5-.3 0-.9-1.5-1.2-2.1-.1-.2-.2-.3-.4-.3H4.4c-.2 0-.3.1-.3.3.1.4.5 1.8 1.5 3 .6.8 1.5 1.2 2.4 1.2z"/></svg>',
      instagram: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.3c2.2 0 2.4 0 3.3.1.8 0 1.2.2 1.5.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.3.7.3 1.5.1.9.1 1.1.1 3.3s0 2.4-.1 3.3c0 .8-.2 1.2-.3 1.5-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.7.3-1.5.3-.9.1-1.1.1-3.3.1s-2.4 0-3.3-.1c-.8 0-1.2-.2-1.5-.3-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.1-.3-.3-.7-.3-1.5C1.3 10.4 1.3 10.2 1.3 8s0-2.4.1-3.3c0-.8.2-1.2.3-1.5.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.7-.3 1.5-.3.9-.1 1.1-.1 3.3-.1m0 1.2c-2.2 0-2.4 0-3.3.1-.7 0-1 .2-1.2.2-.3.1-.5.2-.7.4-.2.2-.3.4-.4.7-.1.2-.2.5-.2 1.2C2 5.9 2 6.1 2 8s0 2.1.1 2.9c0 .7.2 1 .2 1.2.1.3.2.5.4.7.2.2.4.3.7.4.2.1.5.2 1.2.2.8.1 1 .1 2.9.1s2.1 0 2.9-.1c.7 0 1-.2 1.2-.2.3-.1.5-.2.7-.4.2-.2.3-.4.4-.7.1-.2.2-.5.2-1.2.1-.8.1-1 .1-2.9s0-2.1-.1-2.9c0-.7-.2-1-.2-1.2a1.8 1.8 0 0 0-1.1-1.1c-.2-.1-.5-.2-1.2-.2-.8-.1-1-.1-2.9-.1z"/><path d="M8 4.5A3.5 3.5 0 1 1 8 11.5 3.5 3.5 0 0 1 8 4.5m0 1.2A2.3 2.3 0 1 0 8 10.3 2.3 2.3 0 0 0 8 5.7m3.6-1.3a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6"/></svg>',
      telegram: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M3.904 7.226c1.274-.555 2.123-.921 2.548-1.099 1.214-.505 1.467-.593 1.632-.596.036 0 .116.008.168.05a.18.18 0 0 1 .061.115c.006.046.014.149.008.23-.07.936-.475 3.207-.681 4.255-.087.443-.258.592-.424.607-.361.033-.635-.239-.985-.468-.548-.359-.858-.582-1.39-.932-.614-.404-.216-.626.134-.99.092-.096 1.698-1.556 1.73-1.688.004-.017.007-.08-.03-.113-.036-.034-.09-.022-.13-.013-.057.013-.966.614-2.728 1.804-.258.177-.492.263-.703.258-.232-.005-.678-.131-1.01-.239-.408-.133-.732-.204-.704-.43.015-.118.177-.239.504-.37"/></svg>',
      whatsapp: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M13.601 2.326A7.85 7.85 0 0 0 8.03.02C3.79.02.335 3.476.335 7.72c0 1.356.355 2.68 1.028 3.85L.24 15.98l4.52-1.184a7.7 7.7 0 0 0 3.27.726h.003c4.238 0 7.696-3.456 7.698-7.702a7.64 7.64 0 0 0-2.13-5.494M8.034 14.1h-.002a6.3 6.3 0 0 1-3.21-.88l-.23-.137-2.68.702.715-2.611-.15-.239a6.3 6.3 0 0 1-.97-3.355c.002-3.484 2.84-6.32 6.33-6.32a6.29 6.29 0 0 1 4.496 1.86 6.28 6.28 0 0 1 1.85 4.465c-.002 3.49-2.84 6.326-6.329 6.326m3.466-4.73c-.19-.095-1.13-.558-1.305-.621-.175-.063-.302-.095-.43.095-.127.19-.492.622-.603.75-.11.127-.222.143-.413.047-.19-.095-.804-.296-1.532-.944-.566-.504-.948-1.126-1.06-1.317-.111-.19-.012-.293.084-.388.086-.085.19-.222.286-.334.095-.111.127-.19.19-.318.064-.127.032-.238-.015-.334-.048-.095-.43-1.036-.588-1.42-.155-.372-.313-.321-.43-.327l-.366-.006a.7.7 0 0 0-.509.238c-.175.19-.667.653-.667 1.593s.683 1.847.778 1.974c.095.127 1.344 2.06 3.258 2.888.455.196.81.313 1.087.4.457.145.873.124 1.202.075.366-.055 1.13-.462 1.29-.91.159-.446.159-.829.111-.91-.047-.079-.174-.127-.365-.222"/></svg>',
      facebook: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M16 8A8 8 0 1 0 6.8 15.9v-5.6H4.8V8h2V6.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3V8h2.2l-.4 2.3H9.3V16A8 8 0 0 0 16 8"/></svg>',
      messenger: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1C4.1 1 1 3.9 1 7.5c0 2 1 3.8 2.7 5l-.5 2.6 2.6-1.4c.7.2 1.4.3 2.2.3 3.9 0 7-2.9 7-6.5S11.9 1 8 1m.7 8.7L6.9 7.8 3.6 9.7 7.2 6l1.8 1.9L12.4 6z"/></svg>',
      viber: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M11.18 1.754c1.63.69 2.74 2.27 2.93 4.08.14 1.33-.13 2.72-.88 3.82-.67 1-1.7 1.74-2.87 2.05-.28.08-.54.2-.78.37l-2.04 1.48c-.24.17-.54.2-.8.07-.26-.12-.44-.37-.48-.66l-.22-1.48a1.05 1.05 0 0 0-.39-.68 5.9 5.9 0 0 1-2.36-4.73c0-1.6.62-3.1 1.75-4.23A6.1 6.1 0 0 1 9.1.72c.72.07 1.43.25 2.08.53M9.2 2.3a4.8 4.8 0 0 0-3.42 1.42A4.8 4.8 0 0 0 4.36 7.1c0 1.3.56 2.53 1.54 3.37.41.35.68.83.75 1.36l.1.66 1.22-.88c.38-.28.82-.49 1.28-.61 1.74-.47 3.01-2.05 3.01-3.84 0-2.35-1.83-4.31-4.16-4.5z"/></svg>',
      phone: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M3.654 1.328a.68.68 0 0 1 .737-.171l2.522 1.01c.294.118.473.415.438.73l-.2 1.83a.68.68 0 0 1-.41.55l-1.23.53a11.5 11.5 0 0 0 4.64 4.64l.53-1.23a.68.68 0 0 1 .55-.41l1.83-.2a.68.68 0 0 1 .73.438l1.01 2.522a.68.68 0 0 1-.17.737l-1.27 1.27c-.74.74-1.83 1.03-2.84.77-2.3-.59-4.42-1.8-6.14-3.52S1.59 6.36 1 4.06c-.26-1.01.03-2.1.77-2.84z"/></svg>'
    };
    return map[name] || "";
  }

  function ensureHeroFullModePolish() {
    var tabs = document.getElementById("acLeftTabs");
    var sw = document.getElementById("acViewSwitchWrap");
    if (tabs && sw && sw.parentElement !== tabs) {
      tabs.appendChild(sw);
    }
    if (sw) {
      sw.classList.remove("ac-view-switch--dock");
      sw.classList.add("ac-view-switch--in-tabs");
    }

    var age = document.getElementById("acAge");
    var ageLabel = age ? age.querySelector(".ac-age__label") : null;
    var ageHint = document.getElementById("acAgeHint");
    if (age && ageLabel && ageHint) {
      var topLine = age.querySelector(".ac-age__topline");
      if (!topLine) {
        topLine = document.createElement("div");
        topLine.className = "ac-age__topline";
        age.insertBefore(topLine, age.firstChild);
      }
      if (ageLabel.parentElement !== topLine) topLine.appendChild(ageLabel);
      if (ageHint.parentElement !== topLine) topLine.appendChild(ageHint);
    }

    var programAge = document.getElementById("acProgramAge");
    if (ageHint && programAge) {
      var raw = (programAge.textContent || "").trim();
      if (raw) ageHint.textContent = /^Возраст:/.test(raw) ? raw : ("Возраст: " + raw);
    }

    if (age && !age.querySelector(".ac-age__socials")) {
      var socials = document.createElement("div");
      socials.className = "ac-age__socials";
      socials.innerHTML = '' +
        '<a class="ac-age__social ac-age__social--vk" href="https://vk.com/" target="_blank" rel="noopener noreferrer" aria-label="VK">' + bootstrapIcon("vk") + "</a>" +
        '<a class="ac-age__social ac-age__social--ig" href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">' + bootstrapIcon("instagram") + "</a>" +
        '<a class="ac-age__social ac-age__social--tg" href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram">' + bootstrapIcon("telegram") + "</a>" +
        '<a class="ac-age__social ac-age__social--wa" href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">' + bootstrapIcon("whatsapp") + "</a>" +
        '<a class="ac-age__social ac-age__social--fb" href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">' + bootstrapIcon("facebook") + "</a>" +
        '<a class="ac-age__social ac-age__social--ms" href="https://messenger.com/" target="_blank" rel="noopener noreferrer" aria-label="Messenger">' + bootstrapIcon("messenger") + "</a>";
      age.appendChild(socials);
    }

    var rightCard = document.querySelector(".ac-right");
    if (rightCard && !document.getElementById("acHeroContactCard")) {
      var box = document.createElement("div");
      box.id = "acHeroContactCard";
      box.className = "ac-hero-contact-card";
      box.innerHTML = '' +
        '<div class="ac-hero-contact-card__head">' +
        '  <div>' +
        '    <div class="ac-hero-contact-card__title">Связаться с нами</div>' +
        "  </div>" +
        '  <button type="button" class="ac-hero-contact-card__toggle" aria-expanded="false" aria-label="Показать контакты"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true"></button>' +
        "</div>" +
        '<div class="ac-hero-contact-card__body">' +
        '  <a class="ac-hero-contact-card__item" href="tel:+79991234567">' + bootstrapIcon("phone") + "<span>Телефон</span></a>" +
        '  <a class="ac-hero-contact-card__item" href="https://t.me/" target="_blank" rel="noopener noreferrer">' + bootstrapIcon("telegram") + "<span>Telegram</span></a>" +
        '  <a class="ac-hero-contact-card__item" href="https://wa.me/" target="_blank" rel="noopener noreferrer">' + bootstrapIcon("whatsapp") + "<span>WhatsApp</span></a>" +
        '  <a class="ac-hero-contact-card__item" href="https://messenger.com/" target="_blank" rel="noopener noreferrer">' + bootstrapIcon("messenger") + "<span>Max</span></a>" +
        "</div>";
      rightCard.appendChild(box);
      var toggle = box.querySelector(".ac-hero-contact-card__toggle");
      if (toggle) {
        toggle.onclick = function () {
          var opened = box.classList.toggle("is-open");
          toggle.setAttribute("aria-expanded", opened ? "true" : "false");
        };
      }
    }
  }

  function ensureHeroMenuLabels(menu) {
    if (!menu) return;
    var labels = {
      info: "Программа",
      aiprogram: "AI программы",
      place: "Локация",
      photo: "Фото",
      video: "Видео",
      reviews: "Отзывы",
      team: "Команда",
      faq: "FAQ"
    };
    $$(".ac-left-tab[data-ltab]", menu).forEach(function (btn) {
      var key = btn.getAttribute("data-ltab") || "";
      var label = labels[key] || (btn.getAttribute("title") || btn.getAttribute("data-tip") || "").trim();
      if (!label) return;
      btn.setAttribute("data-nav-label", label);
      Array.prototype.slice.call(btn.childNodes).forEach(function (node) {
        if (node && node.nodeType === 3 && /\S/.test(node.nodeValue || "")) btn.removeChild(node);
      });
      var textNode = btn.querySelector(".ac-left-tab__text");
      if (!textNode) {
        textNode = document.createElement("span");
        textNode.className = "ac-left-tab__text";
        btn.appendChild(textNode);
      }
      textNode.textContent = label;
    });
  }

  function animateHeroMenuFlip(node, first, last) {
    if (!node || !first || !last) return;
    var dx = first.left - last.left;
    var dy = first.top - last.top;
    var sx = first.width > 0 && last.width > 0 ? first.width / last.width : 1;
    var sy = first.height > 0 && last.height > 0 ? first.height / last.height : 1;
    node.classList.add("is-flip-animating");
    var anim = node.animate(
      [
        { transformOrigin: "top left", transform: "translate(" + dx + "px," + dy + "px) scale(" + sx + "," + sy + ")" },
        { transformOrigin: "top left", transform: "translate(" + (dx * 0.08) + "px," + (dy * 0.08) + "px) scale(1.04)" },
        { transformOrigin: "top left", transform: "translate(0,0) scale(1)" }
      ],
      {
        duration: 520,
        easing: "cubic-bezier(0.2, 0.85, 0.2, 1)",
        fill: "both"
      }
    );
    anim.onfinish = function () { node.classList.remove("is-flip-animating"); };
    anim.oncancel = function () { node.classList.remove("is-flip-animating"); };
  }

  function ensureFloatingHeroNav() {
    if (window.__acHeroNavBridgeBound) return;
    window.__acHeroNavBridgeBound = true;

    var state = { parent: null, next: null };

    function move(mode) {
      var menu = document.getElementById("acLeftTabs");
      var body = document.body;
      var slot = document.getElementById("acHeaderHeroMenuSlot");
      if (!menu || !body || !slot) return;

      ensureHeroMenuLabels(menu);

      if (!state.parent && menu.parentNode) {
        state.parent = menu.parentNode;
        state.next = menu.nextSibling;
      }
      if (!state.parent) return;

      var target = mode === "full" ? slot : state.parent;
      var first = menu.getBoundingClientRect();
      if (mode === "full") {
        if (menu.parentNode !== slot) slot.appendChild(menu);
      } else if (menu.parentNode !== state.parent) {
        if (state.next && state.next.parentNode === state.parent) state.parent.insertBefore(menu, state.next);
        else state.parent.appendChild(menu);
      }
      menu.classList.toggle("ac-left-tabs--header-mode", mode === "full");
      var last = menu.getBoundingClientRect();
      if (first.width && last.width && menu.parentNode === target) animateHeroMenuFlip(menu, first, last);
    }

    function syncFromBody() {
      var compact = document.body.classList.contains("ac-compact-mode");
      document.body.classList.toggle("mode-compact", compact);
      document.body.classList.toggle("mode-full", !compact);
      move(compact ? "compact" : "full");
    }

    syncFromBody();

    var mo = new MutationObserver(function () { syncFromBody(); });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("ac:view-mode-change", function (e) {
      var mode = e && e.detail && e.detail.mode === "full" ? "full" : "compact";
      move(mode);
    });
  }

  function renderFullModeExtension() {
    renderFullModeAiSection();
    renderFullModeLocationSection();
    renderFullModePhotosSection();
    renderFullModeVideoSection();
    renderFullModeReviewsSection();
    renderFullModeTeamSection();
    renderFullModeFaqSection();
    ensureHeroFullModePolish();
    ensureFloatingHeroNav();
  }

  function getSectionFromAnchor(doc, names) {
    var all = Array.prototype.slice.call(doc.querySelectorAll("[id], a[name]"));
    return all.find(function (el) {
      var key = ((el.id || "") + " " + (el.getAttribute("name") || "") + " " + (el.textContent || "")).toLowerCase();
      return names.some(function (n) { return key.indexOf(n) !== -1; });
    });
  }

  function extractTextBits(el) {
    if (!el || !el.querySelectorAll) return [];
    var bits = Array.prototype.slice.call(el.querySelectorAll("h1,h2,h3,h4,h5,strong,b,p,div,span")).map(function (n) {
      return (n.textContent || "").replace(/\s+/g, " ").trim();
    }).filter(function (t) {
      return t && t.length > 1 && t.length < 120 && !/^all$|^food$|^sport$|^study$|^pool$|^hero$/i.test(t);
    });
    return Array.from(new Set(bits));
  }

  function loadTeamFromManifest() {
    var el = document.getElementById("ac-build-team-manifest");
    if (!el) return false;
    try {
      var entries = JSON.parse(el.textContent || "[]");
      if (!Array.isArray(entries) || !entries.length) return false;
      window.__acTeamCards = entries.filter(function (item) {
        return item && (item.name || item.role || item.img);
      }).map(function (item) {
        return {
          img: item.img || "",
          name: (item.name || "").trim(),
          role: (item.role || "").trim()
        };
      }).filter(function (item) {
        return item.name;
      });
      if (!window.__acTeamCards.length) return false;
      window.__acTeamSignature = teamCardsSignature(window.__acTeamCards);
      return true;
    } catch (e) {
      console.warn("Team manifest parse failed:", e);
      return false;
    }
  }

  function parseTeamCardsFromDoc(doc, baseUrl) {
    var root = getSectionFromAnchor(doc, ["team", "teams", "команда"]);
    var seen = new Set();
    var cards = [];
    if (!root) return cards;

    var scopeNodes = [];
    var current = (root.closest("div,section") || root);
    for (var i = 0; i < 6 && current; i++) {
      scopeNodes.push(current);
      current = current.nextElementSibling;
      if (current) {
        var stopKey = ((current.id || "") + " " + (current.getAttribute("name") || "") + " " + (current.textContent || "").slice(0, 60)).toLowerCase();
        if (/(photo|фото|video|видео|review|отзыв|faq|вопрос)/.test(stopKey)) break;
      }
    }

    var candidates = [];
    scopeNodes.forEach(function (node) {
      if (!node || !node.querySelectorAll) return;
      candidates = candidates.concat(Array.prototype.slice.call(node.querySelectorAll(
        ".t524__itemwrapper, .ac-team-live__card, li, article"
      )));
    });

    candidates.forEach(function (card) {
      if (!card || cards.length >= 12) return;
      var imgEl = card.querySelector("img[src]");
      var metaImg = card.querySelector('meta[itemprop="image"][content]');
      var bgImg = card.querySelector("[data-original]");
      var rawSrc = "";
      if (imgEl) rawSrc = imgEl.getAttribute("src") || "";
      else if (metaImg) rawSrc = metaImg.getAttribute("content") || "";
      else if (bgImg) rawSrc = bgImg.getAttribute("data-original") || "";

      var nameEl = card.querySelector(".t524__persname, .ac-team-live__name, [field*='persname']");
      var roleEl = card.querySelector(".t524__persdescr, .ac-team-live__role, [field*='persdescr']");
      var bits = extractTextBits(card);
      var name = nameEl ? (nameEl.textContent || "").replace(/\s+/g, " ").trim() : "";
      var role = roleEl ? (roleEl.textContent || "").replace(/\s+/g, " ").trim() : "";
      if (!name) {
        name = bits.find(function (t) {
          return /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё\-]+(?:\s+[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё\-]+){0,2}$/.test(t);
        }) || bits[0] || "";
      }
      if (!role) {
        role = bits.find(function (t) { return t !== name; }) || "Преподаватель / вожатый";
      }
      if (!name) return;

      var src = rawSrc ? toAbs(baseUrl, rawSrc) : "";
      var key = (name + "|" + role + "|" + src).toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      cards.push({
        img: src,
        name: name,
        role: role
      });
    });
    return cards;
  }

  function teamCardsSignature(cards) {
    return (cards || []).map(function (x) {
      return [x.img || "", x.name || "", x.role || ""].join("|");
    }).join("||");
  }

  function getTeamCardInitials(name) {
    var parts = String(name || "").trim().split(/\s+/).filter(Boolean).slice(0, 2);
    if (!parts.length) return "AI";
    return parts.map(function (part) { return part.charAt(0).toUpperCase(); }).join("");
  }

  function rutubeVideoId(url) {
    var m = String(url || "").match(/\/shorts\/([a-z0-9]+)\//i) || String(url || "").match(/\/video\/([a-z0-9]+)\//i);
    return m ? m[1] : "";
  }

  function rutubeEmbedUrl(url) {
    var id = rutubeVideoId(url);
    return id ? ("https://rutube.ru/play/embed/" + id) : "";
  }

  function rutubeThumbnailUrl(url) {
    var id = rutubeVideoId(url);
    return id ? ("https://rutube.ru/api/video/" + id + "/thumbnail/?redirect=1") : "";
  }

  function openRutubeVideoLightbox(items, startIndex) {
    if (!items || !items.length) return;
    var lb = ensureMediaLightbox();
    var stage = $(".ac-media-lightbox__stage", lb);
    var closeBtn = $(".ac-media-lightbox__close", lb);
    var prevBtn = $(".ac-media-lightbox__nav--prev", lb);
    var nextBtn = $(".ac-media-lightbox__nav--next", lb);
    var idx = Math.max(0, Math.min(startIndex || 0, items.length - 1));

    function render() {
      var item = items[idx];
      if (!item) return;
      var embed = rutubeEmbedUrl(item.url);
      if (!embed) return;
      stage.innerHTML =
        '<div class="ac-media-lightbox__rutube-wrap">' +
        '  <iframe class="ac-media-lightbox__rutube" src="' + embed + '" title="' + (item.title || "Rutube video") + '" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>' +
        (item.title ? '<div class="ac-media-lightbox__caption">' + item.title + "</div>" : "") +
        "</div>";
      var hideNav = items.length < 2;
      prevBtn.style.display = hideNav ? "none" : "";
      nextBtn.style.display = hideNav ? "none" : "";
    }

    function go(step) {
      idx = (idx + step + items.length) % items.length;
      render();
    }

    lb.classList.add("is-open");
    render();
    lb.onclick = function (e) {
      if (e.target === lb) lb.classList.remove("is-open");
    };
    closeBtn.onclick = function () { lb.classList.remove("is-open"); };
    prevBtn.onclick = function () { go(-1); };
    nextBtn.onclick = function () { go(1); };
    document.onkeydown = function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") lb.classList.remove("is-open");
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
  }

  function renderRutubeVideos() {
    if (!AC_DEV_RUTUBE_VIDEO_FEED_ENABLED) return false;
    var videoHost = $("#acLtVideo");
    if (!videoHost) return false;
    var videoGrid = $(".ac-left-video-grid", videoHost);
    if (!videoGrid) {
      videoGrid = document.createElement("div");
      videoGrid.className = "ac-left-video-grid";
      videoHost.appendChild(videoGrid);
    }
    var items = AC_DEV_RUTUBE_VIDEOS.filter(function (item) { return rutubeEmbedUrl(item.url); });
    var slides = [];
    for (var i = 0; i < items.length; i += 2) slides.push(items.slice(i, i + 2));

    videoGrid.innerHTML =
      '<div class="ac-left-video-carousel">' +
      '  <div class="ac-left-video-carousel__viewport">' +
      '    <div class="ac-left-video-carousel__track" id="acRutubeTrack"></div>' +
      "  </div>" +
      '  <div class="ac-left-video-carousel__nav">' +
      '    <button class="ac-left-video-carousel__arrow" id="acRutubePrev" type="button" aria-label="Назад"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true"></button>' +
      '    <div class="ac-left-video-carousel__dots" id="acRutubeDots"></div>' +
      '    <button class="ac-left-video-carousel__arrow" id="acRutubeNext" type="button" aria-label="Вперёд"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true"></button>' +
      "  </div>" +
      "</div>";

    var track = $("#acRutubeTrack", videoGrid);
    var dots = $("#acRutubeDots", videoGrid);
    var prev = $("#acRutubePrev", videoGrid);
    var next = $("#acRutubeNext", videoGrid);
    if (!track || !dots || !prev || !next) return false;

    track.innerHTML = "";
    dots.innerHTML = "";
    slides.forEach(function (group, slideIdx) {
      var slide = document.createElement("div");
      slide.className = "ac-left-video-carousel__slide";
      group.forEach(function (item) {
        var card = document.createElement("button");
        card.type = "button";
        card.className = "ac-left-video-item ac-left-video-item--rutube";
        card.setAttribute("data-rutube-url", item.url);
        var poster = rutubeThumbnailUrl(item.url);
        card.innerHTML =
          '<div class="ac-left-video-item__poster">' +
          (poster ? '  <img class="ac-left-video-item__poster-img" src="' + poster + '" alt="' + (item.title || "Видео") + '" loading="lazy" decoding="async" width="720" height="1280" referrerpolicy="strict-origin-when-cross-origin">' : "") +
          '  <div class="ac-left-video-item__poster-shade"></div>' +
          '  <div class="ac-left-video-item__play"><img class="ac-icon ac-icon--lg" src="/assets/icons/play.svg" alt="" aria-hidden="true"></div>' +
          '  <div class="ac-left-video-item__caption">' + (item.title || "Видео") + "</div>" +
          "</div>" +
          "";
        card.addEventListener("click", function () {
          openRutubeVideoLightbox(items, items.indexOf(item));
        });
        slide.appendChild(card);
      });
      track.appendChild(slide);

      var dot = document.createElement("span");
      dot.className = "ac-reviews-ya__dot" + (slideIdx === 0 ? " is-active" : "");
      dots.appendChild(dot);
    });

    var index = 0;
    var allDots = $$(".ac-reviews-ya__dot", dots);
    function update() {
      track.style.transform = "translateX(" + (-100 * index) + "%)";
      allDots.forEach(function (d, i) { d.classList.toggle("is-active", i === index); });
    }
    prev.onclick = function () { index = (index - 1 + slides.length) % slides.length; update(); };
    next.onclick = function () { index = (index + 1) % slides.length; update(); };
    update();
    videoHost.style.display = "";
    return true;
  }

  async function refreshTeamFromRemote(force) {
    if (!AC_DEV_REMOTE_TEAM_REFRESH_ENABLED) return;
    if (window.__acTeamRefreshInFlight) return;
    window.__acTeamRefreshInFlight = true;
    var url = "https://aidacamp.ru/media";
    try {
      var res = await fetch(url, { credentials: "omit", cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      var html = await res.text();
      var doc = new DOMParser().parseFromString(html, "text/html");
      var cards = parseTeamCardsFromDoc(doc, url);
      if (!cards.length) return;
      var sig = teamCardsSignature(cards);
      if (!force && sig === window.__acTeamSignature) return;
      window.__acTeamSignature = sig;
      window.__acTeamCards = cards;
      ensureTeamCarousel();
    } catch (e) {
      console.warn("Team refresh failed:", e);
    } finally {
      window.__acTeamRefreshInFlight = false;
    }
  }

  function ensureTeamCarousel() {
    var host = $("#acLtTeam");
    if (!host) return;

    var cards = [];
    if (Array.isArray(window.__acTeamCards) && window.__acTeamCards.length) {
      cards = window.__acTeamCards.slice();
    } else if (loadTeamFromManifest() && Array.isArray(window.__acTeamCards) && window.__acTeamCards.length) {
      cards = window.__acTeamCards.slice();
    } else {
      cards = $$(".ac-team-live__card", host).map(function (card) {
        var img = $("img", card);
        var nameEl = $(".ac-team-live__name", card);
        var roleEl = $(".ac-team-live__role", card);
        return {
          img: img ? (img.getAttribute("src") || "") : "",
          name: nameEl ? (nameEl.textContent || "").trim() : "",
          role: roleEl ? (roleEl.textContent || "").trim() : ""
        };
      }).filter(function (x) {
        return x.name;
      });
    }

    if (!cards.length) {
      cards = [
        { img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80", name: "Алексей", role: "Python · AI" },
        { img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80", name: "Анна", role: "Старший вожатый" },
        { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", name: "Дмитрий", role: "ML-инженер" }
      ];
    }

    host.innerHTML = '' +
      '<div class="ac-team-slider">' +
      '  <div class="ac-team-slider__viewport">' +
      '    <div class="ac-team-slider__track" id="acTeamTrackMod"></div>' +
      "  </div>" +
      '  <div class="ac-team-slider__nav">' +
      '    <button class="ac-team-slider__arrow" id="acTeamPrevMod" type="button" aria-label="Назад"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true"></button>' +
      '    <button class="ac-team-slider__arrow" id="acTeamNextMod" type="button" aria-label="Вперёд"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true"></button>' +
      "  </div>" +
      "</div>";

    var track = $("#acTeamTrackMod", host);
    var prev = $("#acTeamPrevMod", host);
    var next = $("#acTeamNextMod", host);
    if (!track || !prev || !next) return;

    var index = 0;
    var total = 1;
    var resizeTimer = null;

    function getCardsPerSlide() {
      var w = window.innerWidth || 1280;
      if (w >= 1200) return 3;
      if (w >= 760) return 2;
      return 1;
    }

    function chunk(arr, size) {
      var out = [];
      for (var i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
      return out;
    }

    function renderSlides() {
      var perSlide = getCardsPerSlide();
      var slides = chunk(cards, perSlide);
      track.innerHTML = "";

      slides.forEach(function (group) {
        var slide = document.createElement("div");
        slide.className = "ac-team-slider__slide";
        group.forEach(function (p) {
          var card = document.createElement("article");
          card.className = "ac-team-slider__card";
          var mediaHtml = p.img
            ? '<img class="ac-team-slider__img" src="' + p.img + '" alt="' + (p.name || "Команда AidaCamp") + '" width="320" height="320" loading="lazy" decoding="async">'
            : '<div class="ac-team-slider__img ac-team-slider__img--placeholder">' + getTeamCardInitials(p.name) + "</div>";
          card.innerHTML =
            mediaHtml +
            '<div class="ac-team-slider__name">' + (p.name || "Команда AidaCamp") + "</div>" +
            '<div class="ac-team-slider__role">' + (p.role || "Преподаватель") + "</div>";
          slide.appendChild(card);
        });
        track.appendChild(slide);
      });

      total = Math.max(1, slides.length);
      if (index >= total) index = total - 1;
      update();
    }

    function update() {
      track.style.transform = "translateX(" + (-100 * index) + "%)";
    }
    prev.onclick = function () { index = (index - 1 + total) % total; update(); };
    next.onclick = function () { index = (index + 1) % total; update(); };
    renderSlides();

    if (!host._teamResizeBound) {
      host._teamResizeBound = true;
      window.addEventListener("resize", function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(renderSlides, 120);
      });
    }

    ensureTeamTabLink();
  }

  function ensureLeftTabsRouting() {
    if (window.__acLeftTabsRoutingBound) return;
    window.__acLeftTabsRoutingBound = true;

    var INFO_IDS = [".ac-card__sub", ".ac-card__proof", ".ac-features", ".ac-age", ".ac-result-banner", ".ac-guarantee"];
    var OVERLAY_MAP = {
      place: "acLtPlace",
      photo: "acLtPhoto",
      video: "acLtVideo",
      faq: "acLtFaq",
      aiprogram: "acLtAiprogram",
      reviews: "acLtReviews",
      team: "acLtTeam"
    };
    var mainTitle = $(".ac-card__title");

    function syncMainTitleVisibility(activeKey) {
      if (!mainTitle) return;
      mainTitle.style.display = activeKey === "info" ? "" : "none";
    }

    function hideAllOverlays() {
      Object.keys(OVERLAY_MAP).forEach(function (k) {
        var el = document.getElementById(OVERLAY_MAP[k]);
        if (!el) return;
        el.style.display = "none";
        el.classList.remove("is-open");
      });
    }

    function showInfo() {
      INFO_IDS.forEach(function (sel) {
        $$(sel).forEach(function (el) { el.style.display = ""; });
      });
      var logo = $("#acCardLogo");
      if (logo) logo.style.display = "";
      hideAllOverlays();
      syncMainTitleVisibility("info");
    }

    function showOverlay(key) {
      INFO_IDS.forEach(function (sel) {
        $$(sel).forEach(function (el) { el.style.display = "none"; });
      });
      var logo = $("#acCardLogo");
      if (logo) logo.style.display = "none";
      hideAllOverlays();
      var id = OVERLAY_MAP[key];
      var target = id ? document.getElementById(id) : null;
      if (target) {
        target.style.display = "flex";
        target.classList.add("is-open");
      }
      syncMainTitleVisibility(key);
    }

    document.addEventListener("click", function (e) {
      var tab = e.target.closest(".ac-left-tab[data-ltab]");
      if (!tab) return;
      if (document.body.classList.contains("ac-age-gate-on")) {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        return;
      }
      var key = tab.getAttribute("data-ltab") || "info";
      var tabs = $$(".ac-left-tab[data-ltab]");
      tabs.forEach(function (t) { t.classList.remove("is-active"); });
      tab.classList.add("is-active");
      if (key === "info") showInfo();
      else showOverlay(key);
    }, true);

    // Initial sync on first bind.
    var active = $(".ac-left-tab.is-active[data-ltab]");
    syncMainTitleVisibility(active ? (active.getAttribute("data-ltab") || "info") : "info");
  }

  function ensureGalleryAltAndVideo() {
    // Alt texts are required.
    $$("img").forEach(function (img, idx) {
      var alt = (img.getAttribute("alt") || "").trim();
      if (!alt) {
        img.setAttribute("alt", "AidaCamp media " + (idx + 1));
      }
    });

    // Convert direct video links in gallery grid to <video>.
    $$(".ac-left-photo-item").forEach(function (item) {
      if ($("video", item)) return;
      var link = $("a[href$='.mp4'],a[href$='.webm']", item);
      if (!link) return;
      var src = link.getAttribute("href");
      if (!src) return;

      var video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      video.setAttribute("aria-label", "Видео из галереи AidaCamp");
      link.replaceWith(video);
    });
  }

  function applyImagePerformanceHints(root) {
    var scope = root || document;
    $$("img", scope).forEach(function (img) {
      var cls = img.classList || { contains: function () { return false; } };
      var isHero = !!(img.closest && img.closest("#hero"));
      var isIcon = cls.contains("ac-icon");

      if (!img.hasAttribute("loading")) {
        img.setAttribute("loading", isHero ? "eager" : "lazy");
      }
      if (!img.hasAttribute("decoding")) {
        img.setAttribute("decoding", isHero ? "sync" : "async");
      }
      if (isHero && !isIcon && !img.hasAttribute("fetchpriority")) {
        img.setAttribute("fetchpriority", "high");
      }

      if (img.hasAttribute("width") && img.hasAttribute("height")) return;

      var w = 800;
      var h = 600;
      if (cls.contains("ac-icon")) {
        w = cls.contains("ac-icon--lg") ? 24 : (cls.contains("ac-icon--sm") ? 16 : 20);
        h = w;
      } else if (cls.contains("ac-review-modern-card__avatar")) {
        w = 72; h = 72;
      } else if (cls.contains("ac-team-slider__img")) {
        w = 320; h = 320;
      } else if (cls.contains("ac-left-video-item__poster-img")) {
        w = 720; h = 1280;
      } else if (cls.contains("ac-book-card__cover")) {
        w = 504; h = 680;
      } else if (cls.contains("ac-logo-img--side")) {
        w = 96; h = 96;
      } else if (cls.contains("ac-site-brand__logo")) {
        w = 56; h = 56;
      } else if (img.closest && img.closest(".ac-left-photo-item")) {
        w = 800; h = 800;
      }

      img.setAttribute("width", String(w));
      img.setAttribute("height", String(h));
    });
  }

  function toAbs(base, src) {
    if (!src) return "";
    if (/^https?:\/\//i.test(src)) return src;
    if (src.startsWith("//")) return "https:" + src;
    try { return new URL(src, base).toString(); } catch (e) { return src; }
  }

  function classifyCaption(caption) {
    var c = (caption || "").toLowerCase();
    var tags = [];
    ["hero", "all", "food", "sport", "study", "pool"].forEach(function (k) {
      if (new RegExp("\\b" + k + "\\b", "i").test(c)) tags.push(k);
    });
    return tags;
  }

  function hasTag(item, key, rx) {
    if (item.tags && item.tags.indexOf(key) !== -1) return true;
    return rx.test((item.caption || "").toLowerCase());
  }

  function buildMediaMap(entries) {
    var photos = entries.filter(function (e) { return e.type === "image"; });
    var videos = entries.filter(function (e) { return e.type === "video"; });
    var map = {
      hero: photos.filter(function (e) { return hasTag(e, "hero", /\bhero\b|подлож|фон/i); }),
      photos: {
        all: photos.slice(),
        food: photos.filter(function (e) { return hasTag(e, "food", /\bfood\b|еда/i); }),
        sport: photos.filter(function (e) { return hasTag(e, "sport", /\bsport\b|спорт/i); }),
        pool: photos.filter(function (e) { return hasTag(e, "pool", /\bpool\b|бассейн/i); }),
        study: photos.filter(function (e) { return hasTag(e, "study", /\bstudy\b|учеб|учёб/i); })
      },
      videos: videos
    };
    // Guarantee "all" has all photos even if tags are sparse.
    map.photos.all = photos.slice();
    if (!map.hero.length) map.hero = photos.slice(0, 3);
    return map;
  }

  function applyHeroBackgroundRotation(heroItems) {
    var bg = $(".ac-right__bg");
    if (!bg) return;
    var list = (heroItems || []).slice(0, 3).map(function (x) { return x.src; }).filter(Boolean);
    if (!list.length) return;
    var i = 0;
    bg.style.backgroundImage = 'url("' + list[0] + '")';
    if (bg._heroTimer) clearInterval(bg._heroTimer);
    if (list.length > 1) {
      bg._heroTimer = setInterval(function () {
        i = (i + 1) % list.length;
        bg.style.backgroundImage = 'url("' + list[i] + '")';
      }, 6000);
    }
  }

  function ensureMediaLightbox() {
    if ($("#acMediaLightbox")) return $("#acMediaLightbox");
    var el = document.createElement("div");
    el.id = "acMediaLightbox";
    el.className = "ac-media-lightbox";
    el.innerHTML =
      '<button class="ac-media-lightbox__close" aria-label="Закрыть"><img class="ac-icon ac-icon--sm" src="/assets/icons/close.svg" alt="" aria-hidden="true"></button>' +
      '<button class="ac-media-lightbox__nav ac-media-lightbox__nav--prev" aria-label="Назад"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true"></button>' +
      '<div class="ac-media-lightbox__stage"></div>' +
      '<button class="ac-media-lightbox__nav ac-media-lightbox__nav--next" aria-label="Вперед"><img class="ac-icon ac-icon--sm" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true"></button>';
    document.body.appendChild(el);
    return el;
  }

  function openMediaLightbox(items, startIndex) {
    if (!items || !items.length) return;
    var lb = ensureMediaLightbox();
    var stage = $(".ac-media-lightbox__stage", lb);
    var closeBtn = $(".ac-media-lightbox__close", lb);
    var prevBtn = $(".ac-media-lightbox__nav--prev", lb);
    var nextBtn = $(".ac-media-lightbox__nav--next", lb);
    var idx = Math.max(0, Math.min(startIndex || 0, items.length - 1));

    function render() {
      var item = items[idx];
      if (!item) return;
      if (item.type === "video") {
        stage.innerHTML = '<video class="ac-media-lightbox__media" src="' + item.src + '" controls autoplay playsinline></video>';
      } else {
        stage.innerHTML = '<img class="ac-media-lightbox__media" src="' + item.src + '" alt="' + (item.caption || "AidaCamp media") + '">';
      }
      var hideNav = items.length < 2;
      prevBtn.style.display = hideNav ? "none" : "";
      nextBtn.style.display = hideNav ? "none" : "";
    }

    function go(step) {
      idx = (idx + step + items.length) % items.length;
      render();
    }

    lb.classList.add("is-open");
    render();

    lb.onclick = function (e) {
      if (e.target === lb) lb.classList.remove("is-open");
    };
    closeBtn.onclick = function () { lb.classList.remove("is-open"); };
    prevBtn.onclick = function () { go(-1); };
    nextBtn.onclick = function () { go(1); };

    document.onkeydown = function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") lb.classList.remove("is-open");
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
  }

  function renderGalleryFromMap(mediaMap) {
    window.__acMediaMap = mediaMap;
    var photoGrid = $(".ac-left-photo-grid");
    var catWrap = $(".ac-left-photo-cats");
    if (!photoGrid || !catWrap) return false;
    var videoHost = $("#acLtVideo");
    var videoGrid = videoHost ? $(".ac-left-video-grid", videoHost) : null;
    if (videoHost && !videoGrid) {
      videoGrid = document.createElement("div");
      videoGrid.className = "ac-left-video-grid";
      videoHost.appendChild(videoGrid);
    }

    // Legacy code may inject video section under photo tab; remove it to keep videos only in video tab.
    var legacyInlineVideoSection = $(".ac-left-video-section");
    if (legacyInlineVideoSection && legacyInlineVideoSection.parentNode) {
      legacyInlineVideoSection.parentNode.removeChild(legacyInlineVideoSection);
    }

    function render(cat) {
      var list = (mediaMap.photos && mediaMap.photos[cat]) ? mediaMap.photos[cat] : [];
      photoGrid.innerHTML = list.map(function (item, i) {
        return (
          '<div class="ac-left-photo-item" data-photo-index="' + i + '">' +
          '<img src="' + item.src + '" alt="' + (item.caption || "AidaCamp media") + '" loading="lazy" decoding="async" width="800" height="800">' +
          "</div>"
        );
      }).join("");
      $$(".ac-left-photo-cat", catWrap).forEach(function (btn) {
        btn.classList.toggle("is-active", btn.dataset.lcat === cat);
      });
      catWrap.setAttribute("data-active-cat", cat);

      // Click to zoom photos with arrows.
      photoGrid.onclick = function (e) {
        var item = e.target.closest(".ac-left-photo-item");
        if (!item) return;
        var i = Number(item.getAttribute("data-photo-index") || "0");
        openMediaLightbox(list, i);
      };
    }

    catWrap.innerHTML = '' +
      '<button class="ac-left-photo-cat is-active" data-lcat="all">Все</button>' +
      '<button class="ac-left-photo-cat" data-lcat="food">Еда</button>' +
      '<button class="ac-left-photo-cat" data-lcat="sport">Спорт</button>' +
      '<button class="ac-left-photo-cat" data-lcat="pool">Бассейн</button>' +
      '<button class="ac-left-photo-cat" data-lcat="study">Учёба</button>' +
      '';

    catWrap.onclick = function (e) {
      var btn = e.target.closest(".ac-left-photo-cat");
      if (!btn) return;
      render(btn.dataset.lcat);
    };

    // Expose stable renderer for delegated handler (survives legacy overwrites).
    window.__acRenderCategory = render;

    render("all");

    var videos = mediaMap.videos || [];
    if (videoGrid) {
      if (AC_DEV_RUTUBE_VIDEO_FEED_ENABLED) {
        renderRutubeVideos();
      } else {
        videoGrid.innerHTML = videos.map(function (item, i) {
          return (
            '<div class="ac-left-video-item" data-video-index="' + i + '">' +
            '<video src="' + item.src + '" muted loop playsinline preload="metadata" controls aria-label="Видео: ' + (item.caption || "AidaCamp") + '"></video>' +
            "</div>"
          );
        }).join("");

        videoGrid.onclick = function (e) {
          var item = e.target.closest(".ac-left-video-item");
          if (!item) return;
          var i = Number(item.getAttribute("data-video-index") || "0");
          openMediaLightbox(videos, i);
        };
      }
    }

    // Force videos to stay only inside #acLtVideo.
    $$(".ac-left-video-item").forEach(function (item) {
      if (!item.closest("#acLtVideo")) item.remove();
    });
    $$(".ac-left-video-grid").forEach(function (grid) {
      if (!grid.closest("#acLtVideo")) grid.innerHTML = "";
    });

    if (videoHost) {
      videoHost.style.display = videos.length ? "" : "none";
    }

    if (AC_DEV_RUTUBE_VIDEO_FEED_ENABLED) {
      renderRutubeVideos();
    } else if (!videoGrid && videoHost) {
      videoHost.innerHTML = '<h3 style="margin:0 0 8px;font-size:14px">🎬 Видео из лагеря</h3><div style="font-size:12px;color:#9ca3af">Видео скоро появятся</div>';
    } else if (videoGrid && !videos.length) {
      videoGrid.innerHTML =
        '<div class="ac-left-video-ph"><div class="ac-left-video-ph__icon"><img class="ac-icon ac-icon--lg" src="/assets/icons/play.svg" alt="" aria-hidden="true"></div><div class="ac-left-video-ph__text">Скоро</div></div>' +
        '<div class="ac-left-video-ph"><div class="ac-left-video-ph__icon"><img class="ac-icon ac-icon--lg" src="/assets/icons/play.svg" alt="" aria-hidden="true"></div><div class="ac-left-video-ph__text">Скоро</div></div>' +
        '<div class="ac-left-video-ph"><div class="ac-left-video-ph__icon"><img class="ac-icon ac-icon--lg" src="/assets/icons/play.svg" alt="" aria-hidden="true"></div><div class="ac-left-video-ph__text">Скоро</div></div>';
    }

    applyHeroBackgroundRotation(mediaMap.hero || []);
    renderFullModeVideoSection();

    window.__acMediaRendered = true;
    return true;
  }

  function loadMediaFromManifest() {
    var el = document.getElementById("ac-build-media-manifest");
    if (!el) return false;
    try {
      var entries = JSON.parse(el.textContent || "[]");
      if (!Array.isArray(entries) || !entries.length) return false;
      var mediaMap = buildMediaMap(entries);
      return renderGalleryFromMap(mediaMap);
    } catch (e) {
      console.warn("Media manifest parse failed:", e);
      return false;
    }
  }

  function extractMediaFromContainer(node) {
    if (!node || !node.querySelector) return null;

    var wrapVideo = node.querySelector(".t1035__video-wrapper_mp4[data-video-id], [data-video-id$='.mp4'], [data-video-id$='.webm']");
    if (wrapVideo) {
      var vsrc = wrapVideo.getAttribute("data-video-id") || "";
      if (vsrc) return { type: "video", src: vsrc };
    }

    var source = node.querySelector("video source[src], source[src]");
    if (source) return { type: "video", src: source.getAttribute("src") || "" };

    var video = node.querySelector("video[src]");
    if (video) return { type: "video", src: video.getAttribute("src") || "" };

    var img = node.querySelector("img[src]");
    if (img) return { type: "image", src: img.getAttribute("src") || "" };

    return null;
  }

  async function loadMediaByCaption() {
    var url = "https://aidacamp.ru/media";
    if (window.__acMediaRendered) return;

    try {
      var res = await fetch(url, { credentials: "omit" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      var html = await res.text();
      var doc = new DOMParser().parseFromString(html, "text/html");

      var entries = [];
      var seen = new Set();
      var metas = Array.prototype.slice.call(doc.querySelectorAll("meta[itemprop='caption']"));

      metas.forEach(function (meta) {
        var caption = (meta.getAttribute("content") || "").trim().toLowerCase();
        if (!caption) return;

        var host = meta.parentElement;
        var media = null;
        var depth = 0;
        while (host && depth < 8 && !media) {
          media = extractMediaFromContainer(host);
          host = host.parentElement;
          depth += 1;
        }
        if (!media || !media.src) return;

        var absSrc = toAbs(url, media.src);
        if (!absSrc || seen.has(absSrc)) return;
        seen.add(absSrc);

        entries.push({
          src: absSrc,
          type: media.type,
          caption: caption,
          tags: classifyCaption(caption)
        });
      });

      // Fallback: if no caption-linked media, do not break existing gallery.
      if (!entries.length) return;

      var mediaMap = buildMediaMap(entries);
      renderGalleryFromMap(mediaMap);
    } catch (e) {
      console.warn("Media by caption failed:", e);
    }
  }

  function parseRangeFromShiftText(text) {
    if (!text) return null;
    var m = text.match(/(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?\s*[-–]\s*(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?/);
    if (m) {
      var year = new Date().getFullYear();
      var y1 = m[3] ? Number(m[3].length === 2 ? ("20" + m[3]) : m[3]) : year;
      var y2 = m[6] ? Number(m[6].length === 2 ? ("20" + m[6]) : m[6]) : y1;
      return {
        start: new Date(y1, Number(m[2]) - 1, Number(m[1])),
        end: new Date(y2, Number(m[5]) - 1, Number(m[4]))
      };
    }

    // Format like: "1–13 ИЮН", "15-27 ИЮЛ"
    var m2 = text.match(/(\d{1,2})\s*[-–]\s*(\d{1,2})\s*([А-ЯЁA-Z]{3,})/i);
    if (!m2) return null;
    var monthMap = {
      "ЯНВ": 0, "ФЕВ": 1, "МАР": 2, "АПР": 3, "МАЙ": 4, "ИЮН": 5,
      "ИЮЛ": 6, "АВГ": 7, "СЕН": 8, "ОКТ": 9, "НОЯ": 10, "ДЕК": 11
    };
    var monKey = (m2[3] || "").toUpperCase().slice(0, 3);
    if (monthMap[monKey] == null) return null;
    var y = new Date().getFullYear();
    return {
      start: new Date(y, monthMap[monKey], Number(m2[1])),
      end: new Date(y, monthMap[monKey], Number(m2[2]))
    };
  }

  function normalizeShiftDateLabel(label) {
    var txt = (label || "").split("•")[0].replace(/\s+/g, " ").trim();
    var monthMap = {
      "ЯНВ": "января",
      "ФЕВ": "февраля",
      "МАР": "марта",
      "АПР": "апреля",
      "МАЙ": "мая",
      "ИЮН": "июня",
      "ИЮЛ": "июля",
      "АВГ": "августа",
      "СЕН": "сентября",
      "ОКТ": "октября",
      "НОЯ": "ноября",
      "ДЕК": "декабря"
    };
    return txt.replace(/\b(ЯНВ|ФЕВ|МАР|АПР|МАЙ|ИЮН|ИЮЛ|АВГ|СЕН|ОКТ|НОЯ|ДЕК)\b/gi, function (m) {
      var key = (m || "").toUpperCase();
      return monthMap[key] || m.toLowerCase();
    });
  }

  window.normalizeShiftDateLabel = normalizeShiftDateLabel;

  function ensureFallbackCalendarModal() {
    if ($("#acModCalendar")) return;
    var root = document.createElement("div");
    root.id = "acModCalendar";
    root.style.cssText = "display:none;position:fixed;inset:0;z-index:100000;background:rgba(15,23,42,.55);align-items:center;justify-content:center;padding:16px;";
    root.innerHTML =
      '<div style="width:min(100%,380px);background:#fff;border-radius:16px;padding:16px;box-shadow:0 20px 40px rgba(0,0,0,.28)">' +
      '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">' +
      '    <strong id="acModCalTitle">Календарь смены</strong>' +
      '    <button id="acModCalClose" style="border:none;background:#f3f4f6;border-radius:8px;padding:4px 8px;cursor:pointer"><img class="ac-icon ac-icon--sm" src="/assets/icons/close.svg" alt="" aria-hidden="true"></button>' +
      "  </div>" +
      '  <div id="acModCalMonth" style="font-size:12px;color:#ff7700;font-weight:700;margin-bottom:8px"></div>' +
      '  <div id="acModCalGrid" style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px"></div>' +
      "</div>";
    document.body.appendChild(root);
    root.addEventListener("click", function (e) {
      if (e.target === root || e.target.id === "acModCalClose") root.style.display = "none";
    });
  }

  function openFallbackCalendar(shiftEl) {
    ensureFallbackCalendarModal();
    var txt = (shiftEl.textContent || "").replace(/\s+/g, " ");
    var range = parseRangeFromShiftText(txt);
    if (!range) return;

    var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    var m = range.start.getMonth();
    var y = range.start.getFullYear();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var firstWeekday = (new Date(y, m, 1).getDay() + 6) % 7;
    var grid = $("#acModCalGrid");
    grid.innerHTML = "";
    $("#acModCalMonth").textContent = monthNames[m] + " " + y;

    ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].forEach(function (d) {
      var el = document.createElement("div");
      el.textContent = d;
      el.style.cssText = "font-size:10px;color:#9ca3af;text-align:center";
      grid.appendChild(el);
    });

    for (var i = 0; i < firstWeekday; i++) {
      var blank = document.createElement("div");
      grid.appendChild(blank);
    }
    for (var day = 1; day <= daysInMonth; day++) {
      var date = new Date(y, m, day);
      var inRange = date >= range.start && date <= range.end;
      var edge = date.getTime() === range.start.getTime() || date.getTime() === range.end.getTime();
      var d = document.createElement("div");
      d.textContent = String(day);
      d.style.cssText = "text-align:center;padding:7px 0;border-radius:8px;border:1px solid #eef2f7;font-size:12px;";
      if (inRange) {
        d.style.background = edge ? "#ff7700" : "#fff3e7";
        d.style.color = edge ? "#fff" : "#ff7700";
        d.style.borderColor = edge ? "#ff7700" : "rgba(255,119,0,.2)";
        d.style.fontWeight = "700";
      }
      grid.appendChild(d);
    }
    $("#acModCalendar").style.display = "flex";
  }

  function getCurrentShiftsData() {
    if (!window.AC || !AC.allShifts || !AC.state) return [];
    return AC.allShifts[AC.state.currentAge] || AC.allShifts[0] || [];
  }

  function ensureShiftsCalendarView() {
    var step3 = $("#acStep3");
    if (!step3) return null;
    var view = $("#acShiftsCalendarView", step3);
    if (view) return view;
    view = document.createElement("div");
    view.id = "acShiftsCalendarView";
    view.className = "ac-shifts-calendar";
    view.style.display = "none";
    var bookBtn = $("#acBookBtn", step3);
    if (bookBtn && bookBtn.parentNode === step3) step3.insertBefore(view, bookBtn);
    else step3.appendChild(view);
    return view;
  }

  function syncShiftsCalendarMode() {
    var list = $("#acShiftsList");
    var view = ensureShiftsCalendarView();
    var bookBtn = $("#acBookBtn");
    var titleBtn = $("#acShiftsCalendarToggle");
    var titleHint = $("#acShiftsCalendarHint");
    var isCalendar = window.__acShiftsMode === "calendar";
    if (list) list.style.display = isCalendar ? "none" : "";
    if (view) view.style.display = isCalendar ? "flex" : "none";
    if (bookBtn) bookBtn.style.display = isCalendar ? "none" : "";
    if (titleBtn) {
      titleBtn.classList.toggle("is-active", isCalendar);
      titleBtn.setAttribute("aria-pressed", isCalendar ? "true" : "false");
      titleBtn.setAttribute("aria-label", isCalendar ? "Показать карточки смен" : "Показать календарь смен");
    }
    if (titleHint && isCalendar) titleHint.classList.remove("is-show");
    if (isCalendar) renderShiftsCalendarView();
  }

  function closeShiftsCalendarMode() {
    window.__acShiftsMode = "list";
    syncShiftsCalendarMode();
  }

  function selectShiftCardByIndex(idx) {
    var list = $("#acShiftsList");
    var bookBtn = $("#acBookBtn");
    if (!list) return false;
    var card = $('.ac-shift[data-shift-idx="' + idx + '"]', list);
    if (!card) return false;
    if (window.AC && AC.state) AC.state.selectedIdx = idx;
    $$(".ac-shift", list).forEach(function (el) {
      el.classList.remove("is-selected");
      el.classList.remove("has-price-visible");
    });
    card.classList.add("is-selected");
    card.classList.add("has-price-visible");
    if (bookBtn) bookBtn.classList.add("is-visible");
    if (typeof card.scrollIntoView === "function") {
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    setTimeout(function () {
      card.classList.add("is-selected");
      card.classList.add("has-price-visible");
    }, 40);
    return true;
  }

  function openShiftFromCalendar(idx) {
    closeShiftsCalendarMode();
    if (!window.AC || typeof AC.renderShifts !== "function") return;
    AC.renderShifts();
    setTimeout(function () {
      enhanceShifts();
      selectShiftCardByIndex(idx);
      scheduleShiftsHardLock("calendar-select");
    }, 70);
  }

  function renderShiftsCalendarView() {
    var view = ensureShiftsCalendarView();
    if (!view) return;
    var shifts = getCurrentShiftsData();
    if (!shifts.length) {
      view.innerHTML = '<div class="ac-shifts-calendar__empty">Календарь смен скоро появится</div>';
      return;
    }

    var items = shifts.map(function (shift, idx) {
      var range = parseRangeFromShiftText(shift.bookingOptionLabel || "");
      if (!range) return null;
      return { idx: idx, shift: shift, range: range };
    }).filter(Boolean);
    if (!items.length) {
      view.innerHTML = '<div class="ac-shifts-calendar__empty">Не удалось построить календарь смен</div>';
      return;
    }

    items.sort(function (a, b) { return a.range.start - b.range.start; });
    var monthKeys = [];
    items.forEach(function (item) {
      var key = item.range.start.getFullYear() + "-" + item.range.start.getMonth();
      if (monthKeys.indexOf(key) === -1) monthKeys.push(key);
    });

    var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    view.innerHTML =
      '<div class="ac-shifts-calendar__toolbar">' +
      '  <div class="ac-shifts-calendar__toolbar-title">Календарь смен</div>' +
      '  <button type="button" class="ac-shifts-calendar__close" id="acShiftsCalendarClose" aria-label="Вернуться к карточкам смен"><img class="ac-icon ac-icon--sm" src="/assets/icons/close.svg" alt="" aria-hidden="true"></button>' +
      "</div>";
    var closeBtn = $("#acShiftsCalendarClose", view);
    if (closeBtn) {
      closeBtn.onclick = function () {
        closeShiftsCalendarMode();
      };
    }
    monthKeys.forEach(function (key) {
      var parts = key.split("-");
      var year = Number(parts[0]);
      var month = Number(parts[1]);
      var daysInMonth = new Date(year, month + 1, 0).getDate();
      var firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
      var monthItems = items.filter(function (item) {
        return item.range.start.getFullYear() === year && item.range.start.getMonth() === month;
      });

      var card = document.createElement("section");
      card.className = "ac-shifts-calendar__month";
      card.innerHTML =
        '<div class="ac-shifts-calendar__month-title">' + monthNames[month] + " " + year + "</div>" +
        '<div class="ac-shifts-calendar__weekdays"></div>' +
        '<div class="ac-shifts-calendar__grid"></div>' +
        '<div class="ac-shifts-calendar__legend"></div>';
      view.appendChild(card);

      var weekdays = $(".ac-shifts-calendar__weekdays", card);
      var grid = $(".ac-shifts-calendar__grid", card);
      var legend = $(".ac-shifts-calendar__legend", card);
      ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].forEach(function (d) {
        var el = document.createElement("div");
        el.className = "ac-shifts-calendar__weekday";
        el.textContent = d;
        weekdays.appendChild(el);
      });

      for (var i = 0; i < firstWeekday; i++) {
        var blank = document.createElement("div");
        blank.className = "ac-shifts-calendar__cell is-empty";
        grid.appendChild(blank);
      }

      for (var day = 1; day <= daysInMonth; day++) {
        var date = new Date(year, month, day);
        var match = monthItems.find(function (item) {
          return date >= item.range.start && date <= item.range.end;
        });
        var cell = document.createElement(match ? "button" : "div");
        cell.className = "ac-shifts-calendar__cell" + (match ? " is-shift" : "");
        cell.textContent = String(day);
        if (match) {
          cell.type = "button";
          cell.classList.add("is-range");
          if (date.getTime() === match.range.start.getTime()) cell.classList.add("is-start");
          else if (date.getTime() === match.range.end.getTime()) cell.classList.add("is-end");
          else cell.classList.add("is-middle");
          cell.setAttribute("aria-label", (match.shift.name || "Смена") + ": " + normalizeShiftDateLabel(match.shift.bookingOptionLabel || ""));
          cell.addEventListener("click", function (shiftIdx) {
            return function () { openShiftFromCalendar(shiftIdx); };
          }(match.idx));
        }
        grid.appendChild(cell);
      }

      monthItems.forEach(function (item) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "ac-shifts-calendar__legend-item";
        chip.innerHTML =
          '<span class="ac-shifts-calendar__legend-dot"></span>' +
          '<span class="ac-shifts-calendar__legend-text">' + normalizeShiftDateLabel(item.shift.bookingOptionLabel || "") + "</span>";
        chip.addEventListener("click", function () {
          openShiftFromCalendar(item.idx);
        });
        legend.appendChild(chip);
      });
    });
  }

  function ensureShiftsTitleCalendarToggle() {
    var title = $("#acShiftsTitle");
    if (!title) return;
    var text = (title.textContent || "").trim();
    var textSpan = $(".ac-shifts__title-text", title);
    if (!textSpan) {
      title.textContent = "";
      textSpan = document.createElement("span");
      textSpan.className = "ac-shifts__title-text";
      textSpan.textContent = text || "Смены";
      title.appendChild(textSpan);
    }
    var btn = $("#acShiftsCalendarToggle", title);
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.id = "acShiftsCalendarToggle";
      btn.className = "ac-shifts__title-cal-btn";
      btn.setAttribute("aria-label", "Показать календарь смен");
      btn.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<rect x="3" y="5" width="18" height="16" rx="4" stroke="currentColor" stroke-width="1.8"/>' +
        '<path d="M3 9.5h18" stroke="currentColor" stroke-width="1.8"/>' +
        '<path d="M8 3.5v4M16 3.5v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
        "</svg>";
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.__acShiftsMode = window.__acShiftsMode === "calendar" ? "list" : "calendar";
        syncShiftsCalendarMode();
      });
      title.appendChild(btn);
    }
    var hint = $("#acShiftsCalendarHint", title);
    if (!hint) {
      hint = document.createElement("div");
      hint.id = "acShiftsCalendarHint";
      hint.className = "ac-shifts__title-cal-hint";
      hint.textContent = "Посмотреть в виде календаря";
      title.appendChild(hint);
    }
    if (!window.__acShiftsCalendarHintShown && window.__acShiftsMode !== "calendar") {
      window.__acShiftsCalendarHintShown = true;
      setTimeout(function () { hint.classList.add("is-show"); }, 900);
      setTimeout(function () { hint.classList.remove("is-show"); }, 3700);
    }
    syncShiftsCalendarMode();
  }

  function enforceShiftsFrameHard() {
    var step3 = $("#acStep3");
    var title = $("#acShiftsTitle");
    var list = $("#acShiftsList");
    var bookBtn = $("#acBookBtn");
    if (!step3 || !list) return;

    // Lock stable geometry so legacy CSS cannot collapse/shift block.
    step3.style.display = "grid";
    step3.style.gridTemplateRows = "auto 1fr auto";
    step3.style.setProperty("justify-items", "stretch", "important");
    step3.style.setProperty("align-items", "stretch", "important");
    step3.style.height = "100%";
    step3.style.minHeight = "0";
    step3.style.overflow = "hidden";
    step3.style.paddingTop = "78px";
    step3.style.paddingRight = "20px";
    step3.style.paddingBottom = "84px";
    step3.style.paddingLeft = "20px";
    step3.style.gap = "8px";

    if (title) {
      title.style.display = "block";
      title.style.position = "relative";
      title.style.margin = "0 0 6px 0";
      title.style.textAlign = "left";
      title.style.zIndex = "9";
    }
    var hint = $("#acShiftsHint");
    if (hint) hint.style.display = "none";
    if (bookBtn) bookBtn.style.marginTop = "6px";

    var st = window.getComputedStyle(step3);
    var padL = parseFloat(st.paddingLeft || "0") || 0;
    var padR = parseFloat(st.paddingRight || "0") || 0;
    // Use visual width (rect) instead of clientWidth to avoid browser zoom/scale inconsistencies.
    var stepRect = step3.getBoundingClientRect ? step3.getBoundingClientRect() : null;
    var stepRectW = stepRect ? stepRect.width : 0;
    var frameW = Math.max(0, Math.round(stepRectW - padL - padR));
    var listW = frameW > 220 ? frameW : 0;
    var shiftW = frameW > 220 ? Math.max(0, frameW - 6) : 0; // account for list right padding/scrollbar

    if (listW > 0) {
      list.style.setProperty("width", listW + "px", "important");
      list.style.setProperty("min-width", listW + "px", "important");
      list.style.setProperty("max-width", listW + "px", "important");
    } else {
      list.style.setProperty("width", "100%", "important");
      list.style.setProperty("min-width", "100%", "important");
      list.style.setProperty("max-width", "none", "important");
    }
    list.style.setProperty("justify-self", "stretch", "important");
    list.style.setProperty("align-self", "stretch", "important");
    list.style.minHeight = "0";
    list.style.height = "auto";
    list.style.maxHeight = "100%";
    list.style.overflowY = "auto";
    list.style.overflowX = "hidden";
    list.style.paddingTop = "2px";
    list.style.paddingRight = "6px";
    list.style.margin = "0";
    list.style.display = "flex";
    list.style.flexDirection = "column";
    list.style.alignItems = "stretch";
    list.style.justifyContent = "flex-start";

    $$(".ac-shift", list).forEach(function (shift) {
      if (shiftW > 0) {
        shift.style.setProperty("width", shiftW + "px", "important");
        shift.style.setProperty("min-width", shiftW + "px", "important");
        shift.style.setProperty("max-width", shiftW + "px", "important");
      } else {
        shift.style.setProperty("width", "100%", "important");
        shift.style.setProperty("min-width", "100%", "important");
        shift.style.setProperty("max-width", "none", "important");
      }
      shift.style.marginLeft = "0";
      shift.style.marginRight = "0";
      shift.style.boxSizing = "border-box";
      shift.style.setProperty("align-self", "stretch", "important");
      shift.style.setProperty("flex", "0 0 auto", "important");

      var right = $(".ac-shift__right", shift);
      if (right) {
        // Stable right column width avoids text overlap and "jumping" price block.
        right.style.setProperty("min-width", "220px", "important");
        right.style.setProperty("width", "220px", "important");
        right.style.setProperty("max-width", "220px", "important");
      }
    });
  }

  function scheduleShiftsHardLock(label) {
    var marks = [0, 16, 60, 140, 280, 520, 900, 1400, 2200];
    marks.forEach(function (ms) {
      setTimeout(function () {
        enforceShiftsFrameHard();
        var list = $("#acShiftsList");
        var step3 = $("#acStep3");
        if (list && step3 && list.getBoundingClientRect && step3.getBoundingClientRect) {
          var lw = list.getBoundingClientRect().width || 0;
          var sw = step3.getBoundingClientRect().width || 0;
          // If list is suspiciously narrow relative to container, hard re-apply again.
          if (sw > 0 && lw > 0 && lw < sw * 0.62) {
            enforceShiftsFrameHard();
            $$(".ac-shift", list).forEach(function (shift) {
              shift.style.setProperty("width", "100%", "important");
              shift.style.setProperty("min-width", "100%", "important");
              shift.style.setProperty("max-width", "none", "important");
            });
            if (window.__acShiftDiag && typeof window.__acShiftDiag.log === "function") {
              window.__acShiftDiag.log("hard-lock-recover", "label=" + (label || "unknown") + " list=" + Math.round(lw) + " step3=" + Math.round(sw));
            }
          }
        }
      }, ms);
    });
  }

  function enhanceShifts() {
    var list = $("#acShiftsList");
    if (!list) return;
    if (list._enhanceInProgress) return;
    list._enhanceInProgress = true;
    enforceShiftsFrameHard();
    list.style.width = "100%";
    list.style.maxWidth = "none";
    list.style.alignSelf = "stretch";
    list.style.justifySelf = "stretch";
    var prevCount = Number(list.getAttribute("data-prev-count") || "0");
    var curCount = $$(".ac-shift", list).length;
    if (curCount > prevCount) list.scrollTop = 0;
    list.setAttribute("data-prev-count", String(curCount));


    function syncPriceVisibility() {
      $$(".ac-shift", list).forEach(function (s) {
        var shouldShow = s.classList.contains("is-selected");
        var hasShown = s.classList.contains("has-price-visible");
        if (shouldShow && !hasShown) s.classList.add("has-price-visible");
        if (!shouldShow && hasShown) s.classList.remove("has-price-visible");
      });
    }

    $$(".ac-shift", list).forEach(function (shift) {
      shift.style.width = "100%";
      shift.style.maxWidth = "none";
      shift.style.marginLeft = "0";
      shift.style.marginRight = "0";
      shift.style.boxSizing = "border-box";

      // Remove legacy calendar controls/buttons in shift cards.
      $$(".ac-shift__calendar-link", shift).forEach(function (el) { el.remove(); });
      $$(".ac-shift__promo-logo-icon", shift).forEach(function (el) { el.remove(); });
      $$("button,a", shift).forEach(function (el) {
        if (/календар/i.test((el.textContent || "").trim())) el.remove();
      });
      $$(".ac-show-price-btn", shift).forEach(function (el) { el.remove(); });

      // Add compact calendar icon near date line (open only on icon click).
      var dateLine = $(".ac-shift__dateline", shift) || $(".ac-shift__left", shift);
      if (dateLine && !$(".ac-shift__cal-icon", shift)) {
        var iconBtn = document.createElement("button");
        iconBtn.type = "button";
        iconBtn.className = "ac-shift__cal-icon";
        iconBtn.setAttribute("aria-label", "Открыть календарь смены");
        iconBtn.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<rect x="3" y="5" width="18" height="16" rx="4" stroke="currentColor" stroke-width="1.8"/>' +
          '<path d="M3 9.5h18" stroke="currentColor" stroke-width="1.8"/>' +
          '<path d="M8 3.5v4M16 3.5v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
          "</svg>";
        iconBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          openFallbackCalendar(shift);
        });
        dateLine.appendChild(iconBtn);
      }

      if (!shift._priceSelectBound) {
        shift._priceSelectBound = true;
        shift.addEventListener("click", function () {
          setTimeout(syncPriceVisibility, 30);
        });
      }

      // Keep legacy CTA icon inside button text.

      // Remove empty leftovers in action area.
      $$(".ac-shift__actions", shift).forEach(function (row) {
        var hasVisibleControl = Array.prototype.some.call(row.children, function (c) {
          return (c.textContent || "").trim().length > 0 || c.querySelector("svg");
        });
        if (!hasVisibleControl) row.remove();
      });
    });

    syncPriceVisibility();
    if (typeof window.__acApplyShiftOccupancy === "function") {
      window.__acApplyShiftOccupancy();
    }
    ensureShiftsTitleCalendarToggle();
    syncShiftsCalendarMode();
    enforceShiftsFrameHard();
    scheduleShiftsHardLock("enhanceShifts");
    list._enhanceInProgress = false;
  }

  function recoverEmptyShifts(reason) {
    var step3 = $("#acStep3");
    var list = $("#acShiftsList");
    if (!step3 || !list || !window.AC || typeof window.AC.renderShifts !== "function") return false;
    if (!step3.classList.contains("is-active")) return false;
    if ($$(".ac-shift", list).length) return false;
    try {
      window.AC.renderShifts();
      enhanceShifts();
      scheduleShiftsHardLock(reason || "recover-empty-shifts");
      return true;
    } catch (e) {
      console.warn("Empty shifts recovery failed:", e);
      return false;
    }
  }

  function setupAgePersistenceAndReset() {
    var key = "acSelectedAgeV1";
    var age = $("#acAge");
    var slider = $("#acSlider");
    if (!age || !slider) return;
    var hintTimer = null;
    var hintEl = null;

    function readSavedAge() {
      try {
        var raw = localStorage.getItem(key);
        var n = Number(raw);
        if (!raw || !isFinite(n)) return 0;
        if (n < 1 || n > 3) return 0;
        return n;
      } catch (e) {
        return 0;
      }
    }

    function saveAge(v) {
      try {
        if (v > 0) localStorage.setItem(key, String(v));
        else localStorage.removeItem(key);
      } catch (e) {}
    }

    function dispatchAgeEvents() {
      slider.dispatchEvent(new Event("input", { bubbles: true }));
      slider.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function isAgeChosen() {
      return Number(slider.value || "0") > 0;
    }

    function syncAgeInteractionGate() {
      document.body.classList.toggle("ac-age-gate-on", !isAgeChosen());
      if (isAgeChosen() && hintEl) hintEl.classList.remove("is-show");
    }

    function ensureAgeGateHint() {
      if (hintEl && hintEl.isConnected) return hintEl;
      hintEl = document.createElement("div");
      hintEl.id = "acAgeGateHint";
      hintEl.innerHTML =
        '<div class="ac-age-gate-hint__text">Сначала выберите возраст</div>' +
        '<div class="ac-age-gate-hint__arrow">↙</div>';
      document.body.appendChild(hintEl);
      return hintEl;
    }

    function positionAgeGateHint() {
      if (!hintEl || !age) return;
      var r = age.getBoundingClientRect();
      var x = Math.max(10, Math.min(window.innerWidth - 250, r.left));
      var y = r.top - 52;
      if (y < 12) y = r.bottom + 10;
      hintEl.style.left = Math.round(x) + "px";
      hintEl.style.top = Math.round(y) + "px";
    }

    function flashAgeGateHint() {
      if (isAgeChosen()) return;
      ensureAgeGateHint();
      positionAgeGateHint();
      hintEl.classList.add("is-show");
      if (hintTimer) clearTimeout(hintTimer);
      hintTimer = setTimeout(function () {
        if (hintEl) hintEl.classList.remove("is-show");
      }, 1500);
    }

    function blockInteractionUntilAge(e) {
      if (isAgeChosen()) return;
      var t = e.target;
      if (t && t.closest && t.closest("#acAge")) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      flashAgeGateHint();
    }

    function unlockAge() {
      age.classList.remove("is-locked");
      slider.disabled = false;
    }

    function lockAgeIfChosen() {
      var v = Number(slider.value || "0");
      if (v > 0) {
        age.classList.add("is-locked");
        slider.disabled = true;
        saveAge(v);
      }
      syncAgeInteractionGate();
    }

    function resetAgeSelection() {
      saveAge(0);
      unlockAge();
      slider.value = "0";
      dispatchAgeEvents();
      syncAgeInteractionGate();
      if (window.AC && typeof window.AC.goToStep === "function") {
        window.AC.goToStep(1);
      }
    }

    var btn = age.querySelector(".ac-age__reset");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ac-age__reset";
      btn.textContent = "Выбрать возраст заново";
      age.appendChild(btn);
    } else {
      btn.textContent = "Выбрать возраст заново";
    }

    if (!btn._acPersistResetBound) {
      btn._acPersistResetBound = true;
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        resetAgeSelection();
      }, true);
    }

    if (!slider._acPersistBound) {
      slider._acPersistBound = true;
      slider.addEventListener("change", lockAgeIfChosen);
      slider.addEventListener("mouseup", lockAgeIfChosen);
      slider.addEventListener("touchend", lockAgeIfChosen);
      slider.addEventListener("input", syncAgeInteractionGate);
    }

    if (!age._acPersistMarksBound) {
      age._acPersistMarksBound = true;
      $$(".ac-age__marks span[data-value]", age).forEach(function (mark) {
        mark.addEventListener("click", function () {
          setTimeout(lockAgeIfChosen, 0);
        });
      });
    }

    if (!document._acAgeGateBound) {
      document._acAgeGateBound = true;
      document.addEventListener("pointerdown", blockInteractionUntilAge, true);
      document.addEventListener("click", blockInteractionUntilAge, true);
      document.addEventListener("touchstart", blockInteractionUntilAge, true);
      window.addEventListener("resize", function () {
        if (hintEl && hintEl.classList.contains("is-show")) positionAgeGateHint();
      });
      window.addEventListener("scroll", function () {
        if (hintEl && hintEl.classList.contains("is-show")) positionAgeGateHint();
      }, true);
    }

    var saved = readSavedAge();
    if (saved > 0) {
      unlockAge();
      slider.value = String(saved);
      dispatchAgeEvents();
      setTimeout(lockAgeIfChosen, 0);
    } else {
      syncAgeInteractionGate();
    }
  }

  function bindSearchResultToShiftCard() {
    if (window.__acSearchToCardBound) return;
    window.__acSearchToCardBound = true;
    var OCC_KEY = "acShiftOccupancyV2";

    function saveState(state) {
      window.__acShiftOccupancy = state || null;
      try {
        if (state) localStorage.setItem(OCC_KEY, JSON.stringify(state));
        else localStorage.removeItem(OCC_KEY);
      } catch (e) {}
    }

    function readState() {
      if (window.__acShiftOccupancy) return window.__acShiftOccupancy;
      try {
        var raw = localStorage.getItem(OCC_KEY);
        if (!raw) return null;
        var parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return null;
        window.__acShiftOccupancy = parsed;
        return parsed;
      } catch (e) {
        return null;
      }
    }

    function applyStateToSelectedShift() {
      var state = readState();
      if (!state) return;
      var shift = $(".ac-shift.is-selected");
      if (!shift) return;
      var sc = $(".ac-shift__seats-check", shift);
      var sp = $(".ac-shift__seats-prog", shift);
      var spl = $(".ac-shift__seats-prog-lbl", shift);
      var spf = $(".ac-shift__seats-prog-fill", shift);
      if (!sc || !sp || !spl || !spf) return;
      sc.textContent = state.title || "Смена заполнена";
      spl.innerHTML = state.html || state.label || "";
      sc.classList.add("is-vis");
      sp.classList.add("is-vis");
      var num = Number(state.pct || 0) || 0;
      spf.style.width = Math.max(0, Math.min(100, num)) + "%";
    }

    window.__acApplyShiftOccupancy = applyStateToSelectedShift;

    document.addEventListener("click", function (e) {
      var ok = e.target.closest("#acSearchOk");
      if (!ok) return;

      // Wait until legacy handler closes modal and runs drum.
      setTimeout(function () {
        var shift = $(".ac-shift.is-selected");
        if (!shift) return;

        var pctEl = $("#acSearchPct");
        var seatsEl = $("#acSearchSeats");
        var pct = pctEl ? (pctEl.textContent || "").trim() : "";
        if (!pct) return;

        var sc = $(".ac-shift__seats-check", shift);
        var sp = $(".ac-shift__seats-prog", shift);
        var spl = $(".ac-shift__seats-prog-lbl", shift);
        var spf = $(".ac-shift__seats-prog-fill", shift);
        if (!sc || !sp || !spl || !spf) return;

        var seatsText = seatsEl ? (seatsEl.textContent || "").replace(/\s+/g, " ").trim() : "";
        var seatsMatch = seatsText.match(/(\d+)\s+из\s+(\d+)\s+мест/i);
        var seatsLine = seatsMatch ? (seatsMatch[1] + " из " + seatsMatch[2] + " мест") : seatsText;
        sc.textContent = "Смена заполнена";
        spl.innerHTML = '<span class="ac-shift__seats-prog-main">' + pct + '</span> • забронировано' +
          (seatsLine ? ('<br><span class="ac-shift__seats-prog-sub">' + seatsLine + "</span>") : "");
        sc.classList.add("is-vis");
        sp.classList.add("is-vis");
        var num = Number(String(pct).replace(/[^\d]/g, "")) || 0;
        spf.style.width = Math.max(0, Math.min(100, num)) + "%";
        saveState({
          title: "Смена заполнена",
          html: spl.innerHTML,
          pct: num,
          ts: Date.now()
        });
      }, 30);
    }, true);
  }

  function startShiftsDiagnostics() {
    if (window.__acShiftsDiagStarted) return;
    window.__acShiftsDiagStarted = true;

    var logs = [];
    var maxLogs = 50;
    var panel = null;
    var pre = null;
    var startedAt = Date.now();

    function t() {
      return ((Date.now() - startedAt) / 1000).toFixed(2) + "s";
    }

    function rectWidth(el) {
      if (!el || !el.getBoundingClientRect) return 0;
      return Math.round(el.getBoundingClientRect().width || 0);
    }

    function computed(el, prop) {
      if (!el) return "";
      try {
        return (window.getComputedStyle(el).getPropertyValue(prop) || "").trim();
      } catch (e) {
        return "";
      }
    }

    function geometry() {
      var step3 = $("#acStep3");
      var list = $("#acShiftsList");
      var first = list ? $(".ac-shift", list) : null;
      var right = first ? $(".ac-shift__right", first) : null;
      var title = $("#acShiftsTitle");
      return {
        ww: Math.round(window.innerWidth || 0),
        step3: rectWidth(step3),
        list: rectWidth(list),
        shift: rectWidth(first),
        right: rectWidth(right),
        rightDisplay: computed(right, "display"),
        rightMin: computed(right, "min-width"),
        rightWidth: computed(right, "width"),
        shiftGap: computed(first, "gap"),
        titleMt: computed(title, "margin-top"),
        stepPadTop: computed(step3, "padding-top"),
        listAlign: computed(list, "align-items")
      };
    }

    function log(event, extra) {
      var g = geometry();
      var line =
        "[" + t() + "] " + event +
        " | ww=" + g.ww +
        " step3=" + g.step3 +
        " list=" + g.list +
        " shift=" + g.shift +
        " right=" + g.right +
        " rightDisplay=" + g.rightDisplay +
        " rightMin=" + g.rightMin +
        " rightW=" + g.rightWidth +
        " gap=" + g.shiftGap +
        " titleMt=" + g.titleMt +
        " stepPadTop=" + g.stepPadTop +
        (extra ? " | " + extra : "");
      logs.push(line);
      if (logs.length > maxLogs) logs.shift();
      if (pre) pre.textContent = logs.join("\n");
      if (window.console && console.debug) console.debug("[AC SHIFT DIAG]", line);
    }

    function collectShiftRules() {
      var out = [];
      Array.prototype.slice.call(document.styleSheets || []).forEach(function (ss) {
        var rules;
        try {
          rules = ss.cssRules || ss.rules;
        } catch (e) {
          return;
        }
        if (!rules) return;
        Array.prototype.slice.call(rules).forEach(function (r) {
          if (!r || !r.selectorText || !r.style) return;
          var sel = r.selectorText;
          var isShiftRule =
            sel.indexOf(".ac-shift__right") !== -1 ||
            sel.indexOf(".ac-shift") !== -1 ||
            sel.indexOf("#acStep3 .ac-shifts__title") !== -1;
          if (!isShiftRule) return;

          var width = r.style.getPropertyValue("width");
          var minWidth = r.style.getPropertyValue("min-width");
          var maxWidth = r.style.getPropertyValue("max-width");
          var marginTop = r.style.getPropertyValue("margin-top");
          if (!width && !minWidth && !maxWidth && !marginTop) return;

          out.push({
            selector: sel,
            width: width || "",
            minWidth: minWidth || "",
            maxWidth: maxWidth || "",
            marginTop: marginTop || "",
            important:
              (width && r.style.getPropertyPriority("width") === "important") ||
              (minWidth && r.style.getPropertyPriority("min-width") === "important") ||
              (maxWidth && r.style.getPropertyPriority("max-width") === "important") ||
              (marginTop && r.style.getPropertyPriority("margin-top") === "important")
          });
        });
      });
      return out;
    }

    function ensurePanel() {
      if (panel && panel.isConnected) return;
      panel = document.createElement("details");
      panel.id = "acShiftDiagPanel";
      panel.open = true;
      panel.style.cssText =
        "position:fixed;right:12px;bottom:12px;z-index:100180;width:min(560px,calc(100vw - 24px));" +
        "max-height:min(52vh,460px);overflow:auto;background:rgba(15,23,42,.92);color:#fff;" +
        "border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:8px 10px;font:11px/1.35 monospace;";
      panel.innerHTML =
        '<summary style="cursor:pointer;font:700 11px/1.2 sans-serif;color:#ffb06a">Shift diagnostics</summary>' +
        '<div id="acShiftDiagRules" style="margin:6px 0 8px;font:11px/1.3 monospace;color:#ffd8b2"></div>' +
        '<pre id="acShiftDiagPre" style="margin:0;white-space:pre-wrap;"></pre>';
      document.body.appendChild(panel);
      pre = $("#acShiftDiagPre", panel);
      var rulesHost = $("#acShiftDiagRules", panel);
      var rules = collectShiftRules();
      var bad = rules.filter(function (r) {
        return r.selector.indexOf(".ac-shift__right") !== -1 && (r.width || r.minWidth);
      });
      rulesHost.textContent =
        "rules(ac-shift/ac-shift__right/title): " + rules.length +
        ", width/min-width on .ac-shift__right: " + bad.length;
      window.__acShiftRules = rules;
    }

    function observeWhenReady() {
      var list = $("#acShiftsList");
      var step3 = $("#acStep3");
      if (!list || !step3) return false;

      var mo = new MutationObserver(function (muts) {
        for (var i = 0; i < muts.length; i++) {
          var m = muts[i];
          if (m.type === "attributes") {
            var id = (m.target && m.target.id) || "";
            var cls = (m.target && m.target.className) || "";
            log("mutation:attr", "id=" + id + " cls=" + String(cls).slice(0, 60) + " attr=" + m.attributeName);
            return;
          }
          if (m.type === "childList") {
            log("mutation:childList", "added=" + m.addedNodes.length + " removed=" + m.removedNodes.length);
            return;
          }
        }
      });

      mo.observe(step3, { attributes: true, attributeFilter: ["style", "class"] });
      mo.observe(list, { attributes: true, childList: true, subtree: true, attributeFilter: ["style", "class"] });
      log("observer:ready");
      return true;
    }

    ensurePanel();
    log("diag:start");

    // Capture render cycles from legacy engine.
    var wrapRenderTimer = setInterval(function () {
      if (!window.AC || typeof window.AC.renderShifts !== "function") return;
      clearInterval(wrapRenderTimer);
      if (window.AC._acDiagRenderWrapped) return;
      var old = window.AC.renderShifts;
      window.AC.renderShifts = function () {
        log("AC.renderShifts:before");
        var out = old.apply(this, arguments);
        setTimeout(function () { log("AC.renderShifts:+30ms"); }, 30);
        setTimeout(function () { log("AC.renderShifts:+300ms"); }, 300);
        setTimeout(function () { log("AC.renderShifts:+1500ms"); }, 1500);
        return out;
      };
      window.AC._acDiagRenderWrapped = true;
      log("AC.renderShifts:wrapped");
    }, 150);

    // Keep short polling during initial "jump" window.
    var polls = 0;
    var pollTimer = setInterval(function () {
      polls += 1;
      log("poll#" + polls);
      if (polls >= 40) clearInterval(pollTimer);
    }, 250);

    var obsPolls = 0;
    var obsTimer = setInterval(function () {
      obsPolls += 1;
      if (observeWhenReady() || obsPolls > 40) clearInterval(obsTimer);
    }, 200);

    window.__acShiftDiag = {
      getLogs: function () { return logs.slice(); },
      getRules: function () { return (window.__acShiftRules || []).slice(); },
      log: log
    };
  }

  function init() {
    ensureLogoStatic();
    setupAgePersistenceAndReset();
    bindSearchResultToShiftCard();
    loadTeamFromManifest();
    // startShiftsDiagnostics();
    ensureYandexReviewsTab();
    ensureTeamCarousel();
    refreshTeamFromRemote(true);
    ensureLeftTabsRouting();
    ensureGalleryAltAndVideo();
    applyImagePerformanceHints(document);
    // Prefer build-time manifest; fallback to runtime parser.
    if (!loadMediaFromManifest()) loadMediaByCaption();
    renderFullModeExtension();
    enhanceShifts();
    recoverEmptyShifts("init");
    scheduleShiftsHardLock("init");

    var shiftsList = $("#acShiftsList");
    if (shiftsList && !shiftsList._modObserver) {
      var scheduled = false;
      shiftsList._modObserver = new MutationObserver(function () {
        if (scheduled) return;
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          enhanceShifts();
        }, 50);
      });
      // Observe only structure changes; class observation can create feedback loops.
      shiftsList._modObserver.observe(shiftsList, { childList: true, subtree: true });
    }

    // Re-apply after legacy loaders to prevent overwrite.
    setTimeout(function () {
      if (loadMediaFromManifest()) return;
      loadMediaByCaption();
    }, 1600);
    setTimeout(function () {
      if (loadMediaFromManifest()) return;
      loadMediaByCaption();
    }, 3600);
    setTimeout(function () {
      enhanceShifts();
      recoverEmptyShifts("t+800");
    }, 800);
    // Legacy patch scripts apply delayed !important rules; re-assert for a few seconds.
    [1400, 2200, 3200, 4600, 6200].forEach(function (ms) {
      setTimeout(function () {
        enforceShiftsFrameHard();
        enhanceShifts();
        recoverEmptyShifts("reapply-" + ms);
      }, ms);
    });

    // Final post-wrapper lock: run after legacy V7/V8 wrappers and keep geometry stable.
    var wrapTimer = setInterval(function () {
      if (!window.AC || typeof window.AC.renderShifts !== "function") return;
      clearInterval(wrapTimer);
      if (window.AC._acFinalShiftsLockWrapped) return;
      var oldRender = window.AC.renderShifts;
      window.AC.renderShifts = function () {
        var out = oldRender.apply(this, arguments);
        scheduleShiftsHardLock("AC.renderShifts");
        setTimeout(function () { recoverEmptyShifts("after-render"); }, 40);
        return out;
      };
      window.AC._acFinalShiftsLockWrapped = true;
      scheduleShiftsHardLock("wrap-ready");
    }, 120);
    setTimeout(setupAgePersistenceAndReset, 600);
    setTimeout(setupAgePersistenceAndReset, 1800);
    setTimeout(ensureYandexReviewsTab, 900);
    setTimeout(ensureYandexReviewsTab, 2200);
    setTimeout(ensureTeamCarousel, 1000);
    setTimeout(ensureTeamCarousel, 2400);
    setTimeout(renderFullModeExtension, 1000);
    setTimeout(renderFullModeExtension, 2400);
    setTimeout(function () { applyImagePerformanceHints(document); }, 600);
    setTimeout(function () { applyImagePerformanceHints(document); }, 1800);
    setTimeout(function () { applyImagePerformanceHints(document); }, 3600);
    if (AC_DEV_REMOTE_TEAM_REFRESH_ENABLED) {
      setTimeout(function () { refreshTeamFromRemote(true); }, 1500);
      setTimeout(function () { refreshTeamFromRemote(true); }, 5000);
      setTimeout(function () { refreshTeamFromRemote(true); }, 12000);
      setInterval(function () { refreshTeamFromRemote(false); }, 60000);
    }
    if (AC_DEV_RUTUBE_VIDEO_FEED_ENABLED) {
      setTimeout(renderRutubeVideos, 400);
      setTimeout(renderRutubeVideos, 1600);
      setTimeout(renderFullModeExtension, 1800);
    }
    setTimeout(ensureLeftTabsRouting, 500);
    setTimeout(function () { recoverEmptyShifts("t+500"); }, 500);
    setTimeout(function () { recoverEmptyShifts("t+1600"); }, 1600);
    setTimeout(function () { recoverEmptyShifts("t+3600"); }, 3600);

    // Force category tabs to use current renderer, even if legacy scripts overwrite onclick.
    if (!window.__acCatDelegatedBound) {
      window.__acCatDelegatedBound = true;
      document.addEventListener("click", function (e) {
        var btn = e.target.closest(".ac-left-photo-cat");
        if (!btn) return;
        if (typeof window.__acRenderCategory !== "function") return;
        var cat = btn.getAttribute("data-lcat") || "all";
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        window.__acRenderCategory(cat);
      }, true);
    }

    function resolveAgeLabel() {
      var pa = $("#acProgramAge");
      var txt = pa ? (pa.textContent || "").trim() : "";
      var m = txt.match(/(\d{1,2}\s*[-–]\s*\d{1,2}|\d{1,2})/);
      if (m) return m[1].replace(/\s+/g, "");
      var active = $(".ac-age__marks span.is-active");
      if (active) return (active.textContent || "").trim();
      var range = $(".ac-age input[type='range']");
      if (range && range.value) return range.value;
      return "";
    }

    function updateShiftTitleByAge() {
      var t = $("#acShiftsTitle");
      if (!t) return;
      var age = resolveAgeLabel();
      var text = age ? ("Смены для " + age + " лет") : "Смены";
      var textSpan = $(".ac-shifts__title-text", t);
      if (textSpan) textSpan.textContent = text;
      else t.textContent = text;
      ensureShiftsTitleCalendarToggle();
    }

    updateShiftTitleByAge();
    setInterval(updateShiftTitleByAge, 1200);
    window.addEventListener("resize", function () {
      enforceShiftsFrameHard();
      scheduleShiftsHardLock("resize");
      recoverEmptyShifts("resize");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
