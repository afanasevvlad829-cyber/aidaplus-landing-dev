(function (global) {
  var ACNext = global.ACNext;

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function createStore(initialState) {
    var state = clone(initialState || {});
    var subscribers = [];

    function getState() {
      return clone(state);
    }

    function subscribe(handler) {
      subscribers.push(handler);
      return function unsubscribe() {
        subscribers = subscribers.filter(function (h) { return h !== handler; });
      };
    }

    function patch(partial, reason) {
      state = Object.assign({}, state, partial || {});
      subscribers.forEach(function (handler) {
        try { handler(getState(), reason || "patch"); } catch (err) { console.error("[ACNext store]", err); }
      });
    }

    return {
      getState: getState,
      subscribe: subscribe,
      patch: patch
    };
  }

  ACNext.core.createStore = createStore;
})(window);
