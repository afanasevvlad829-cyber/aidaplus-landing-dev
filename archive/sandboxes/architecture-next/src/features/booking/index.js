(function (global) {
  var ACNext = global.ACNext;

  function initBooking(ctx) {
    var booking = {
      selectedShiftId: null,
      promoLocked: false,
      funnelStep: 1
    };
    ctx.store.patch({ booking: booking }, "booking:init");
    ctx.log("booking:init -> step=" + booking.funnelStep);
  }

  ACNext.features.initBooking = initBooking;
})(window);
