export function renderInitial(renderers) {
  renderers.renderLayout();
  renderers.renderStaticLabels();
  renderers.renderMenu();
  renderers.renderInfoCard();
  renderers.renderFunnel();
  renderers.renderSections();
  renderers.renderFooter();
  renderers.renderOverlays();
}
