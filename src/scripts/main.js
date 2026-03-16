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

  function enhanceShifts() {
    var list = $("#acShiftsList");
    if (!list) return;
    if (list._enhanceInProgress) return;
    list._enhanceInProgress = true;
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
    list._enhanceInProgress = false;
  }

  function setupAgePersistenceAndReset() {
    var key = "acSelectedAgeV1";
    var age = $("#acAge");
    var slider = $("#acSlider");
    if (!age || !slider) return;

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
    }

    function blockInteractionUntilAge(e) {
      if (isAgeChosen()) return;
      var t = e.target;
      if (t && t.closest && t.closest("#acAge")) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
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

  function init() {
    ensureLogoStatic();
    ensureGalleryAltAndVideo();
    // Prefer build-time manifest; fallback to runtime parser.
    if (!loadMediaFromManifest()) loadMediaByCaption();
    enhanceShifts();
    setupAgePersistenceAndReset();

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
    setTimeout(setupAgePersistenceAndReset, 600);
    setTimeout(setupAgePersistenceAndReset, 1800);

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

