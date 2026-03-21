(function (global) {
  var ACNext = global.ACNext;

  function bootstrap() {
    var events = ACNext.core.createEvents();
    var effects = ACNext.core.createEffects();
    var store = ACNext.core.createStore({
      shifts: [],
      media: null,
      booking: null
    });

    var logs = [];
    function log(msg) {
      logs.push(new Date().toISOString() + " " + msg);
      if (logs.length > 80) logs.shift();
    }

    var root = document.getElementById("ac-next-root");
    if (!root) return;

    function render(reason) {
      ACNext.ui.renderAppShell(root, store.getState(), logs, function () {
        log("ui:manual-rebuild");
        render("manual-rebuild");
      });
      if (reason) log("ui:render -> " + reason);
    }

    store.subscribe(function (_state, reason) {
      render(reason || "state");
    });

    var ctx = {
      events: events,
      effects: effects,
      store: store,
      log: log
    };

    ACNext.features.initShifts(ctx);
    ACNext.features.initMedia(ctx);
    ACNext.features.initBooking(ctx);

    effects.setNamedInterval("heartbeat", function () {
      log("heartbeat");
      render("heartbeat");
    }, 12000);

    render("bootstrap");
  }

  ACNext.core.bootstrap = bootstrap;
})(window);
