import os

css_path = r'e:\WORK @ BRANDLUMEO\brandlumeo\brandlumeo_web\static\css\style.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

tablet_overrides = """
/* ============================================================
   GLOBAL TABLET RESPONSIVENESS OVERRIDES (< 900px)
   ============================================================ */
@media (max-width: 900px) {
    /* Stack 2/3/4 column inline grids in about and services */
    .ab-story-grid, 
    .ab-mv-grid, 
    .ab-culture__grid, 
    .ab-squad-grid, 
    .ab-journey-grid,
    .ab-values-grid,
    .sv-grid,
    .sv-package-grid,
    .pf-results-grid {
        grid-template-columns: 1fr !important;
        grid-template-rows: auto !important;
        gap: 32px !important;
    }

    .ab-culture__media, .ab-culture__content {
        grid-column: span 1 !important;
        grid-row: auto !important;
    }
}
"""

if 'GLOBAL TABLET RESPONSIVENESS OVERRIDES' not in css:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write(tablet_overrides)
    print('Added tablet overrides to style.css.')
else:
    print('Tablet overrides already exist.')
