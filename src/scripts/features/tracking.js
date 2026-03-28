(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function trackOnce(trackFn, seenStore, event, params) {
    var safeTrack = typeof trackFn === "function" ? trackFn : function () {};
    var safeSeen = seenStore && typeof seenStore.has === "function" ? seenStore : new Set();
    var safeParams = params && typeof params === "object" ? params : {};
    var key = String(event || "") + ":" + JSON.stringify(safeParams);
    if (safeSeen.has(key)) return;
    safeSeen.add(key);
    safeTrack(event, safeParams);
  }

  function trackOncePerSession(trackFn, event, sessionKey, params) {
    var safeTrack = typeof trackFn === "function" ? trackFn : function () {};
    try {
      if (window.sessionStorage && window.sessionStorage.getItem(sessionKey)) return;
      if (window.sessionStorage) {
        window.sessionStorage.setItem(sessionKey, "1");
      }
    } catch (_err) {
      // ignore and still track
    }
    safeTrack(event, params && typeof params === "object" ? params : {});
  }

  function initScrollTracking(trackFn, scrollMarks) {
    var safeTrack = typeof trackFn === "function" ? trackFn : function () {};
    var marks = scrollMarks && typeof scrollMarks === "object" ? scrollMarks : {};
    window.addEventListener("scroll", function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      if (max <= 0) return;
      var scrolled = (h.scrollTop / max) * 100;
      [25, 50, 75, 90].forEach(function (p) {
        if (scrolled >= p && !marks[p]) {
          marks[p] = true;
          safeTrack("scroll_" + p);
        }
      });
    }, { passive: true });
  }

  function initSectionViewTracking(trackFn, trackOnceFn) {
    var safeTrack = typeof trackFn === "function" ? trackFn : function () {};
    var safeTrackOnce = typeof trackOnceFn === "function"
      ? trackOnceFn
      : function (event, params) { safeTrack(event, params || {}); };

    var targets = [
      { id: "section-stay", event: "stay_view" },
      { id: "section-reviews", event: "reviews_view" },
      { id: "section-team", event: "team_view" }
    ];

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var found = targets.find(function (t) { return t.id === entry.target.id; });
        if (found) safeTrackOnce(found.event);
      });
    }, { threshold: 0.35 });

    targets.forEach(function (t) {
      var el = document.getElementById(t.id);
      if (el) io.observe(el);
    });
  }

  window.AC_FEATURES.tracking = {
    trackOnce: trackOnce,
    trackOncePerSession: trackOncePerSession,
    initScrollTracking: initScrollTracking,
    initSectionViewTracking: initSectionViewTracking
  };
})();
