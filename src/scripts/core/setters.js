export function applyMode(state, mode) {
  if (mode !== "compact" && mode !== "full") return false;
  if (state.mode === mode) return false;
  state.mode = mode;
  return true;
}

export function applyActiveTab(state, tabKey, hasTabFn) {
  if (!hasTabFn(tabKey) || tabKey === state.activeTab) return false;
  state.activeTab = tabKey;
  return true;
}

export function applyStep(state, nextStep, max) {
  const prevStep = state.step;
  const safeStep = Math.max(0, Math.min(nextStep, max));
  if (safeStep === state.step) {
    return { changed: false, prevStep, safeStep };
  }
  state.step = safeStep;
  return { changed: true, prevStep, safeStep };
}
