export function track(eventName, payload) {
  const safePayload = payload && typeof payload === "object" ? payload : {};

  try {
    if (window.analytics && typeof window.analytics.track === "function") {
      window.analytics.track(eventName, safePayload);
      return;
    }
  } catch (_err) {
    // fallback to console
  }

  try {
    console.log("[analytics]", eventName, safePayload);
  } catch (_err2) {
    // noop
  }
}
