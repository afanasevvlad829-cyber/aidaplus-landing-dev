(function () {
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function ensureLogoStatic() {
    var wrap = $("#acCardLogo");
    if (!wrap) return;
    wrap.classList.remove("is-blink");
    if (wrap._modBlinkTimer) {
      clearInterval(wrap._modBlinkTimer);
      wrap._modBlinkTimer = null;
    }
    wrap.innerHTML =
      '<img class="ac-logo-img ac-logo-img--side" src="/assets/aida-logo-small.png" alt="AidaCamp logo">' +
      '<div class="ac-card-logo-side__text">Мы не играем<br>в игры —<br>мы их создаём</div>';
  }

  function ensureYandexReviewsTab() {
    var host = $("#acLtReviews");
    if (!host) return;

    var reviews = [
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
      }
    ];

    host.innerHTML = '' +
      '<div class="ac-reviews-modern">' +
      '  <div class="ac-reviews-modern__viewport">' +
      '    <div class="ac-reviews-modern__track" id="acReviewsTrackMod"></div>' +
      "  </div>" +
      '  <div class="ac-reviews-modern__nav">' +
      '    <button class="ac-reviews-ya__arrow" id="acReviewsPrevMod" type="button" aria-label="Назад">←</button>' +
      '    <div class="ac-reviews-ya__dots" id="acReviewsDotsMod"></div>' +
      '    <button class="ac-reviews-ya__arrow" id="acReviewsNextMod" type="button" aria-label="Вперёд">→</button>' +
      "  </div>" +
      '  <div style="margin-top:10px;text-align:center;">' +
      '    <a href="https://yandex.ru/maps/org/aydakemp/35558479035/reviews/?ll=38.874756%2C55.531232&z=7" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#4b5563;text-decoration:underline;">Смотреть отзывы на Яндекс Картах</a>' +
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
          var stars = "★★★★★";
          card.innerHTML =
            '<img class="ac-review-modern-card__avatar" src="' + r.avatar + '" alt="' + r.name + '">' +
            '<div class="ac-review-modern-card__quote">“ ' + r.text + ' ”</div>' +
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
      '<a href="https://aidacamp.ru/media#teams" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#4b5563;text-decoration:underline;">Смотреть команду на сайте</a>';
  }

  function ensureTeamCarousel() {
    var host = $("#acLtTeam");
    if (!host) return;

    var cards = $$(".ac-team-live__card", host).map(function (card) {
      var img = $("img", card);
      var nameEl = $(".ac-team-live__name", card);
      var roleEl = $(".ac-team-live__role", card);
      return {
        img: img ? (img.getAttribute("src") || "") : "",
        name: nameEl ? (nameEl.textContent || "").trim() : "",
        role: roleEl ? (roleEl.textContent || "").trim() : ""
      };
    }).filter(function (x) {
      return x.img && x.name;
    });

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
      '    <button class="ac-team-slider__arrow" id="acTeamPrevMod" type="button" aria-label="Назад">←</button>' +
      '    <button class="ac-team-slider__arrow" id="acTeamNextMod" type="button" aria-label="Вперёд">→</button>' +
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
          card.innerHTML =
            '<img class="ac-team-slider__img" src="' + p.img + '" alt="' + (p.name || "Команда AidaCamp") + '">' +
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
      '<button class="ac-media-lightbox__close" aria-label="Закрыть">✕</button>' +
      '<button class="ac-media-lightbox__nav ac-media-lightbox__nav--prev" aria-label="Назад">←</button>' +
      '<div class="ac-media-lightbox__stage"></div>' +
      '<button class="ac-media-lightbox__nav ac-media-lightbox__nav--next" aria-label="Вперед">→</button>';
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
          '<img src="' + item.src + '" alt="' + (item.caption || "AidaCamp media") + '">' +
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

    if (!videoGrid && videoHost) {
      videoHost.innerHTML = '<h3 style="margin:0 0 8px;font-size:14px">🎬 Видео из лагеря</h3><div style="font-size:12px;color:#9ca3af">Видео скоро появятся</div>';
    } else if (videoGrid && !videos.length) {
      videoGrid.innerHTML =
        '<div class="ac-left-video-ph"><div class="ac-left-video-ph__icon">▶</div><div class="ac-left-video-ph__text">Скоро</div></div>' +
        '<div class="ac-left-video-ph"><div class="ac-left-video-ph__icon">▶</div><div class="ac-left-video-ph__text">Скоро</div></div>' +
        '<div class="ac-left-video-ph"><div class="ac-left-video-ph__icon">▶</div><div class="ac-left-video-ph__text">Скоро</div></div>';
    }

    applyHeroBackgroundRotation(mediaMap.hero || []);

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

  function ensureFallbackCalendarModal() {
    if ($("#acModCalendar")) return;
    var root = document.createElement("div");
    root.id = "acModCalendar";
    root.style.cssText = "display:none;position:fixed;inset:0;z-index:100000;background:rgba(15,23,42,.55);align-items:center;justify-content:center;padding:16px;";
    root.innerHTML =
      '<div style="width:min(100%,380px);background:#fff;border-radius:16px;padding:16px;box-shadow:0 20px 40px rgba(0,0,0,.28)">' +
      '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">' +
      '    <strong id="acModCalTitle">Календарь смены</strong>' +
      '    <button id="acModCalClose" style="border:none;background:#f3f4f6;border-radius:8px;padding:4px 8px;cursor:pointer">✕</button>' +
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

  function enforceShiftsFrameHard() {
    var step3 = $("#acStep3");
    var title = $("#acShiftsTitle");
    var list = $("#acShiftsList");
    var bookBtn = $("#acBookBtn");
    if (!step3 || !list) return;

    // Lock stable geometry so legacy CSS cannot collapse/shift block.
    step3.style.display = "grid";
    step3.style.gridTemplateRows = "auto 1fr auto";
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

    list.style.setProperty("width", "100%", "important");
    list.style.setProperty("min-width", "100%", "important");
    list.style.setProperty("max-width", "none", "important");
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
      shift.style.setProperty("width", "100%", "important");
      shift.style.setProperty("min-width", "100%", "important");
      shift.style.setProperty("max-width", "none", "important");
      shift.style.marginLeft = "0";
      shift.style.marginRight = "0";
      shift.style.boxSizing = "border-box";
      shift.style.setProperty("align-self", "stretch", "important");

      var right = $(".ac-shift__right", shift);
      if (right) {
        // Neutralize legacy 136/150/182 px rules that visually squeeze cards.
        right.style.setProperty("min-width", "96px", "important");
        right.style.setProperty("width", "96px", "important");
        right.style.setProperty("max-width", "96px", "important");
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

      // Remove empty leftovers in action area.
      $$(".ac-shift__actions", shift).forEach(function (row) {
        var hasVisibleControl = Array.prototype.some.call(row.children, function (c) {
          return (c.textContent || "").trim().length > 0 || c.querySelector("svg");
        });
        if (!hasVisibleControl) row.remove();
      });
    });

    syncPriceVisibility();
    enforceShiftsFrameHard();
    scheduleShiftsHardLock("enhanceShifts");
    list._enhanceInProgress = false;
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
    startShiftsDiagnostics();
    ensureYandexReviewsTab();
    ensureTeamCarousel();
    ensureLeftTabsRouting();
    ensureGalleryAltAndVideo();
    // Prefer build-time manifest; fallback to runtime parser.
    if (!loadMediaFromManifest()) loadMediaByCaption();
    enhanceShifts();
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
    }, 800);
    // Legacy patch scripts apply delayed !important rules; re-assert for a few seconds.
    [1400, 2200, 3200, 4600, 6200].forEach(function (ms) {
      setTimeout(function () {
        enforceShiftsFrameHard();
        enhanceShifts();
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
    setTimeout(ensureLeftTabsRouting, 500);

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
      t.textContent = age ? ("Смены для " + age + " лет") : "Смены";
    }

    updateShiftTitleByAge();
    setInterval(updateShiftTitleByAge, 1200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

