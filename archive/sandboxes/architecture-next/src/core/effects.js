(function (global) {
  var ACNext = global.ACNext;

  function createEffects() {
    var intervals = {};
    var timeouts = {};

    function setNamedInterval(name, cb, delay) {
      if (intervals[name]) clearInterval(intervals[name]);
      intervals[name] = setInterval(cb, delay);
      return intervals[name];
    }

    function setNamedTimeout(name, cb, delay) {
      if (timeouts[name]) clearTimeout(timeouts[name]);
      timeouts[name] = setTimeout(cb, delay);
      return timeouts[name];
    }

    function clearAll() {
      Object.keys(intervals).forEach(function (name) { clearInterval(intervals[name]); });
      Object.keys(timeouts).forEach(function (name) { clearTimeout(timeouts[name]); });
      intervals = {};
      timeouts = {};
    }

    return {
      setNamedInterval: setNamedInterval,
      setNamedTimeout: setNamedTimeout,
      clearAll: clearAll
    };
  }

  ACNext.core.createEffects = createEffects;
})(window);
