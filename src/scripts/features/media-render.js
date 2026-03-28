(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function selectPhotos(photos, photoFilter) {
    var list = Array.isArray(photos) ? photos : [];
    var filter = String(photoFilter || "all");
    var filtered = [];

    if (filter === "all") {
      filtered = list.slice();
    } else if (filter === "camp") {
      filtered = list.filter(function (item) {
        return item && (item.cat === "camp" || item.cat === "all");
      });
    } else {
      filtered = list.filter(function (item) {
        return item && item.cat === filter;
      });
    }

    if (!filtered.length) {
      filtered = list.filter(function (item) {
        return item && item.cat === "all";
      });
    }
    if (!filtered.length) {
      filtered = list.slice();
    }

    if (filter !== "all" && filter !== "camp") {
      if (filter === "study" && filtered.length > 4) {
        var featuredRightSlot = filtered[filtered.length - 1];
        filtered = [filtered[0], filtered[1], filtered[2], featuredRightSlot];
      } else {
        filtered = filtered.slice(0, 4);
      }
    }

    return filtered;
  }

  window.AC_FEATURES.mediaRender = {
    selectPhotos: selectPhotos
  };
})();
