export function bindGlobalEvents(handlers) {
  var click = handlers && handlers.click;
  var input = handlers && handlers.input;
  var keydown = handlers && handlers.keydown;

  if (typeof click === "function") {
    document.addEventListener("click", click);
  }
  if (typeof input === "function") {
    document.addEventListener("input", input);
  }
  if (typeof keydown === "function") {
    document.addEventListener("keydown", keydown);
  }

  return function unbind() {
    if (typeof click === "function") {
      document.removeEventListener("click", click);
    }
    if (typeof input === "function") {
      document.removeEventListener("input", input);
    }
    if (typeof keydown === "function") {
      document.removeEventListener("keydown", keydown);
    }
  };
}
