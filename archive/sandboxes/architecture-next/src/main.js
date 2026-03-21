(function (global) {
  function run() {
    if (!global.ACNext || !global.ACNext.core || typeof global.ACNext.core.bootstrap !== "function") {
      console.error("[ACNext] bootstrap is not available");
      return;
    }
    global.ACNext.core.bootstrap();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})(window);
