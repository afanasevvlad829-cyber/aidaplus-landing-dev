(function () {
  const consoleEl = document.getElementById("dev-console");

  function log(message) {
    const now = new Date().toLocaleTimeString("ru-RU");
    consoleEl.textContent += `\n[${now}] ${message}`;
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function runBootInfo() {
    setText("domain-value", window.location.host || "unknown");
    setText("ua-value", navigator.userAgent);
    setText("time-value", new Date().toLocaleString("ru-RU"));
    consoleEl.textContent = "Готово к проверкам…";
    log("Dev sandbox загружен.");
  }

  async function checkLocalStorage() {
    try {
      const key = "aidaplus-dev-check";
      localStorage.setItem(key, String(Date.now()));
      const value = localStorage.getItem(key);
      if (!value) throw new Error("Значение не сохранилось.");
      log("localStorage работает.");
    } catch (error) {
      log(`Ошибка localStorage: ${error.message}`);
    }
  }

  async function checkMediaFetch() {
    try {
      log("Проверяю /media …");
      const response = await fetch("https://aidacamp.ru/media", { credentials: "omit" });
      log(`HTTP статус: ${response.status}`);
      if (!response.ok) {
        throw new Error(`Неуспешный ответ: ${response.status}`);
      }
      const html = await response.text();
      const hasImg = html.includes("<img");
      const hasTeam = html.toLowerCase().includes("team") || html.toLowerCase().includes("команда");
      log(`Страница /media загружена. Есть картинки: ${hasImg ? "да" : "нет"}. Есть следы команды: ${hasTeam ? "да" : "нет"}.`);
    } catch (error) {
      log(`Ошибка fetch /media: ${error.message}`);
      log("Если это dev на домене — смотрим CORS, доступность страницы и консоль браузера.");
    }
  }

  function clearDevState() {
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith("aidacamp") || key.startsWith("aidaplus"))
        .forEach((key) => localStorage.removeItem(key));
      log("Dev-state очищен. Все aidacamp/aidaplus ключи удалены.");
    } catch (error) {
      log(`Ошибка очистки localStorage: ${error.message}`);
    }
  }

  document.getElementById("btn-localstorage")?.addEventListener("click", checkLocalStorage);
  document.getElementById("btn-fetch-media")?.addEventListener("click", checkMediaFetch);
  document.getElementById("btn-clear")?.addEventListener("click", clearDevState);

  runBootInfo();
})();
