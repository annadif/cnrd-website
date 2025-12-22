# Copilot Instructions for CNRD WebSite

This repository is a static website based on the “Labsky – Laboratory HTML Website Template” by HTML Codex. It customizes Bootstrap CSS, uses jQuery-driven UI behaviors, and includes multiple standalone HTML pages for different sections (e.g., Toumaï, Articles, Series A/B/C, Directions).

## Architecture & Key Files
- **Static pages:** Top-level `.html` files are individual views. Examples:
  - `index.html` (home), `documentation.html`, `testimonial.html`, `revue-scientifique.html`
  - Content-specific: `toumai_view.html`, `toumai_add.html`, `toumai-action.html`, `articles_view.html`, `articles_add.html`
- **Client assets:**
  - CSS: `css/bootstrap.min.css` (vendor), `css/style.css` (project customizations)
  - JS: `js/main.js` (site interactions)
  - Images: `img/`
- **Styles source:** `scss/` contains Bootstrap SCSS source (unmodified vendor tree + `bootstrap.scss`). Current site CSS appears prebuilt; SCSS changes require a Sass toolchain outside this repo.
- **Tools:** `tools/archive_old_files.ps1` for archiving outdated or temporary files.
- **Template metadata:** `READ-ME.txt` and `LICENSE.txt` (upstream template details).

## Runtime Behavior (js/main.js)
- **Spinner hide:** Removes `#spinner.show` after a short delay.
- **WOW.js animations:** `new WOW().init()` requires WOW.js to be included in pages.
- **Sticky navbar:** Toggles `bg-white shadow-sm` and `top` based on scroll.
- **Counters:** `data-toggle="counter-up"` elements animate with CounterUp.
- **Progress bars:** When `.experience` enters viewport, sets `.progress-bar` width from `aria-valuenow`.
- **Back to top:** Shows/hides `.back-to-top` and smooth-scrolls with `easeInOutExpo`.
- **Modal video:** Reads `data-src` from `.btn-play` and sets `#video` iframe source while Bootstrap modal is shown/hidden.
- **Testimonials:** Initializes `.testimonial-carousel` via OwlCarousel.

Ensure pages include the corresponding vendor scripts/styles for WOW.js, CounterUp, Waypoints, OwlCarousel, jQuery, Bootstrap, and easing.

## CSS Conventions (css/style.css)
- **Navbar behavior:** Uses `.sticky-top` with transitions; desktop hover menus, nested dropdowns for multi-level menu (e.g., “Revue Scientifique”).
- **Utility classes:** Customizes `.btn*`, `.icon-box-*`, `.back-to-top`, and leverages Bootstrap CSS variables (e.g., `var(--bs-primary)`).
- **Progress bars:** Width driven by `aria-valuenow` and animated on waypoint.

When editing navbar/menu structure, match the existing class patterns and hover-driven dropdowns in `style.css`.

## Developer Workflows
- **No build step required:** Pages are static. Modify `.html`, `css/style.css`, and `js/main.js` directly. Open `index.html` in a browser to verify.
- **SCSS (optional):** If you choose to edit Bootstrap SCSS under `scss/`, you must compile it yourself to `css/bootstrap.min.css` using your local Sass toolchain; the repo does not include build scripts.
- **Archive helper:** Use PowerShell script to move older or temporary files into timestamped archives.
  - Preview:
    - `pwsh tools/archive_old_files.ps1 -WhatIfMode`
  - Execute:
    - `pwsh tools/archive_old_files.ps1`
  - Patterns default to `toumai_add.html`, `articles_add.html`, `old_*.*`, `*.bak`, `*.tmp`.

## Patterns & Examples
- **Section pages:** Follow the existing naming and layout approach. Example additions for Articles:
  - `articles_view.html` lists or displays content.
  - `articles_add.html` provides add/submit UI (static form or link to action page).
  - `articles_action.html` (if added) would mirror `toumai-action.html` for inter-page flow.
- **Interactive elements:**
  - Counters: `<h3 data-toggle="counter-up">123</h3>`
  - Progress bars: `<div class="progress"><div class="progress-bar" aria-valuenow="75"></div></div>`
  - Video modal trigger: `<button class="btn-play" data-src="https://www.youtube.com/embed/...">Play</button>` with a `#videoModal` and `#video` iframe.
- **Nested dropdowns:** For multi-level menus (e.g., scientific series) use `.navbar .dropdown-menu .nav-item.dropdown` structure consistent with `style.css`.

## External Dependencies (expected on pages)
- jQuery, Bootstrap (CSS/JS), WOW.js, CounterUp, Waypoints, OwlCarousel, jQuery Easing (`easeInOutExpo`). Ensure the appropriate `<link>` and `<script>` tags are present and ordered correctly before `js/main.js`.

## Scope for AI Changes
- Safe edits: content updates in `.html`, styling in `css/style.css`, behavior in `js/main.js`.
- Be cautious with SCSS tree: it mirrors upstream Bootstrap; avoid editing vendor files unless you will recompile.
- Keep class names and data attributes aligned with existing JS expectations.

## Review Checklist for Changes
- Page includes all required vendor scripts/styles used by `js/main.js`.
- Navbar and dropdown structure remains consistent across pages.
- Interactive components (counters, progress, carousels, modal video) rendered with expected attributes/classes.
- If SCSS changed, verify compiled CSS is updated and committed in `css/`.
