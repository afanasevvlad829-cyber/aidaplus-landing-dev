### Compact Desktop Menu Router
- `navigateToSection()` now opens section modal in desktop compact mode for key content sections.
- Reuses existing section DOM via `openSectionModal(sectionId)` clone.

Key points:
- `COMPACT_MODAL_SECTIONS` set
- `openSectionModal()` / `closeSectionModal()`
- `data-action="close-section-modal"`
