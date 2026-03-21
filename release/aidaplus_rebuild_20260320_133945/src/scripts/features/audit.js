export function createAuditRuntime() {
  return {
    active: false,
    allowUiActions: false,
    allowDrag: true,
    snapGrid: 4,
    normalizeToParent: true,
    lockUntilAge: true,
    ageSelected: false,
    stageSync: null
  };
}

export function setupAuditToggleButton() {
  var existing = document.getElementById("acAuditToggle");
  if (existing) return;

  var button = document.createElement("button");
  button.id = "acAuditToggle";
  button.className = "ac-audit-toggle-btn";
  button.type = "button";
  button.setAttribute("aria-label", "Переключить audit режим");

  var isAudit = false;
  try {
    isAudit = (window.location.search || "").indexOf("audit=1") !== -1;
  } catch (_err) {
    isAudit = false;
  }

  button.textContent = isAudit ? "Audit OFF" : "Audit ON";

  button.addEventListener("click", function () {
    var url;
    try {
      url = new URL(window.location.href);
    } catch (_err) {
      return;
    }

    if (url.searchParams.get("audit") === "1") {
      url.searchParams.delete("audit");
    } else {
      url.searchParams.set("audit", "1");
    }

    window.location.href = url.toString();
  });

  document.body.appendChild(button);
}
