(function (global) {
  var ACNext = global.ACNext;

  function initMedia(ctx) {
    var mediaState = {
      photosCount: 24,
      videosCount: 8,
      categories: ["all", "food", "pool", "ai"]
    };

    ctx.store.patch({ media: mediaState }, "media:init");
    ctx.log("media:init -> photos=" + mediaState.photosCount + ", videos=" + mediaState.videosCount);
  }

  ACNext.features.initMedia = initMedia;
})(window);
