(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function createMarkup() {
    return (
      '<div class="offer-headline">' +
      '<h3>Ищем лучшую цену</h3>' +
      '<button class="form-close offer-close-btn" type="button" data-action="close-offer" aria-label="Закрыть">×</button>' +
      "</div>" +
      '<p id="offerProgressLead">Проверяем остаток мест и доступные условия для выбранной смены.</p>' +
      '<div class="offer-progress-track">' +
      '<div class="offer-progress-fill" id="offerProgressFillLine"></div>' +
      "</div>" +
      '<div class="offer-progress-steps">' +
      '<div class="offer-progress-step active" id="offerStepA">Проверяем смену</div>' +
      '<div class="offer-progress-step" id="offerStepB">Сверяем цену</div>' +
      '<div class="offer-progress-step" id="offerStepC">Генерируем код</div>' +
      "</div>"
    );
  }

  function getProgressSteps() {
    return [
      {
        delay: 1200,
        width: "44%",
        lead: "Сверяем цену и проверяем, можно ли зафиксировать условия."
      },
      {
        delay: 2500,
        width: "76%",
        lead: "Готовим персональный код бронирования и закрепляем цену."
      },
      {
        delay: 3300,
        width: "100%"
      }
    ];
  }

  window.AC_FEATURES.offerProgress = {
    createMarkup: createMarkup,
    getProgressSteps: getProgressSteps
  };
})();
