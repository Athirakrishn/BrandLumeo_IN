import os

css_path = r'e:\WORK @ BRANDLUMEO\brandlumeo\brandlumeo_web\static\css\style.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

mobile_overrides = """
/* ============================================================
   GLOBAL MOBILE-FIRST RESPONSIVENESS OVERRIDES (< 480px)
   ============================================================ */
@media (max-width: 480px) {
    /* Force rigid grids to 1 column */
    .ab-squad-grid, 
    .ab-journey-grid, 
    .sv-grid, 
    .pf-results-grid, 
    .pf-grid, 
    .cn-grid, 
    .ab-values-grid, 
    .footer-grid, 
    .footer-meta {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
    }

    /* Remove fixed heights on hero sections to prevent content cut-off */
    .ab-hero, 
    .sv-hero, 
    .pf-hero, 
    .cn-hero,
    .blog-hero {
        height: auto !important;
        min-height: 100vh !important;
        padding-top: 100px !important;
        padding-bottom: 60px !important;
    }

    /* Universally scale down massive paddings for mobile viewports */
    section[class*="-section"], 
    div[class*="-section"], 
    .ab-cta, 
    .ab-squad-section, 
    .ab-values-section, 
    .ab-journey-section,
    .sv-overview {
        padding-top: 60px !important;
        padding-bottom: 60px !important;
    }

    /* Prevent any horizontal overflow */
    body, html {
        overflow-x: hidden;
        width: 100%;
    }
    
    .container {
        width: 92% !important;
        max-width: 100% !important;
        margin: 0 auto;
        padding: 0 16px;
    }
}
"""

if 'GLOBAL MOBILE-FIRST RESPONSIVENESS OVERRIDES' not in css:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write(mobile_overrides)

print('Added mobile overrides to style.css.')
