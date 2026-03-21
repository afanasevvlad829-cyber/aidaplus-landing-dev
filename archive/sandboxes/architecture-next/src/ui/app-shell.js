(function (global) {
  var ACNext = global.ACNext;

  function fmtRub(v) {
    return new Intl.NumberFormat("ru-RU").format(v || 0) + " ₽";
  }

  function render(root, state, logs, onRebuild) {
    var shifts = state.shifts || [];
    var media = state.media || { photosCount: 0, videosCount: 0, categories: [] };
    var booking = state.booking || {};
    var minPrice = shifts.length ? Math.min.apply(null, shifts.map(function (s) { return s.price; })) : 0;

    root.innerHTML =
      '<div class="ac-next-wrap">' +
      '  <h1 class="ac-next-title">Architecture Next</h1>' +
      '  <p class="ac-next-sub">Модульная разработка в отдельной папке, финальная поставка в один HTML-файл.</p>' +
      '  <div class="ac-next-grid">' +
      '    <article class="ac-next-card">' +
      '      <h2 class="ac-next-card__title">Shifts</h2>' +
      '      <dl class="ac-next-kv">' +
      '        <div><dt>Количество смен</dt><dd>' + shifts.length + "</dd></div>" +
      '        <div><dt>Минимальная цена</dt><dd>' + fmtRub(minPrice) + "</dd></div>" +
      "      </dl>" +
      "    </article>" +
      '    <article class="ac-next-card">' +
      '      <h2 class="ac-next-card__title">Media</h2>' +
      '      <dl class="ac-next-kv">' +
      '        <div><dt>Фото</dt><dd>' + media.photosCount + "</dd></div>" +
      '        <div><dt>Видео</dt><dd>' + media.videosCount + "</dd></div>" +
      '        <div><dt>Категории</dt><dd>' + (media.categories || []).join(", ") + "</dd></div>" +
      "      </dl>" +
      "    </article>" +
      '    <article class="ac-next-card">' +
      '      <h2 class="ac-next-card__title">Booking</h2>' +
      '      <dl class="ac-next-kv">' +
      '        <div><dt>Текущий шаг</dt><dd>' + (booking.funnelStep || 1) + "</dd></div>" +
      '        <div><dt>Выбранная смена</dt><dd>' + (booking.selectedShiftId || "не выбрана") + "</dd></div>" +
      '        <div><dt>Цена зафиксирована</dt><dd>' + (booking.promoLocked ? "да" : "нет") + "</dd></div>" +
      "      </dl>" +
      "    </article>" +
      "  </div>" +
      '  <div class="ac-next-actions">' +
      '    <button class="ac-next-btn" id="ac-next-rebuild" type="button">Перерисовать shell</button>' +
      "  </div>" +
      '  <pre class="ac-next-log" id="ac-next-log"></pre>' +
      "</div>";

    var logEl = root.querySelector("#ac-next-log");
    if (logEl) logEl.textContent = logs.join("\n");

    var rebuildBtn = root.querySelector("#ac-next-rebuild");
    if (rebuildBtn) {
      rebuildBtn.addEventListener("click", function () {
        onRebuild();
      });
    }
  }

  ACNext.ui.renderAppShell = render;
})(window);
