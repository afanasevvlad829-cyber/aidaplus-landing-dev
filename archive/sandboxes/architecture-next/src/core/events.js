(function (global) {
  var ACNext = global.ACNext;

  function createEvents() {
    var listeners = {};

    function on(eventName, handler) {
      if (!listeners[eventName]) listeners[eventName] = [];
      listeners[eventName].push(handler);
      return function off() {
        listeners[eventName] = (listeners[eventName] || []).filter(function (h) { return h !== handler; });
      };
    }

    function emit(eventName, payload) {
      (listeners[eventName] || []).forEach(function (handler) {
        try { handler(payload); } catch (err) { console.error("[ACNext events]", err); }
      });
    }

    return { on: on, emit: emit };
  }

  ACNext.core.createEvents = createEvents;
})(window);
