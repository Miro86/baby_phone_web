# Safari 15.8 responsive fix — 13 October 2026

The owner reported the desktop navigation and narrow two-column hero on an iPhone 7 running iOS 15.8.8. The supplied screenshot shows the public `minidodoapps.de` website.

## Cause

The authored CSS used conventional `@media (max-width: 800px)` breakpoints. The production minifier converted them into range syntax such as `@media (width <= 800px)`. The public HTML also contains these queries. Safari 15.8 ignores them, leaving desktop navigation, grid columns and spacing active at phone widths. The viewport meta tag is present and correct; switching navigation layouts is controlled by CSS.

[WebKit introduced media-query range syntax in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/). [Tailwind 4's documented browser baseline starts at Safari 16.4](https://tailwindcss.com/docs/compatibility), so its defaults alone do not establish iOS 15 compatibility.

## Local changes

- `astro.config.mjs` sets both Vite `build.target` and `build.cssTarget` to `safari15.4`. The final minification stage now retains `max-width`/`min-width` media syntax. [Vite documents the CSS minification target separately](https://vite.dev/config/build-options.html#build-csstarget).
- Home/app promotional `<source>` elements use conventional `min-width` syntax too. HTML `media` attributes are not lowered by CSS minification. Promotional images remain excluded at widths up to 600px.
- Dodo's speech-bubble positioning uses percentage-based margin/padding when container units are unsupported, retaining the same overlap relative to the illustration width. Narrow fallback layouts cover phone/tablet and error-page illustrations. Current browsers keep the existing container rules.
- `scripts/verify-build.mjs` rejects range syntax in built CSS media queries and HTML media conditions, preventing the same production regression.

Nunito, approved copy, routes, gallery order/dimensions and current-browser design are retained. No framework, polyfill or client dependency was added. Text balancing remains a progressive enhancement; Safari 15 uses ordinary wrapping.

## Verification

| 375px viewport, unsupported CSS features disabled | Before | After |
| --- | --- | --- |
| Desktop navigation | Visible | Hidden |
| Mobile navigation | Hidden | Visible |
| Page scroll width | 553px | 375px |
| Hero columns | Two | One |

- `npm run verify`, localization validation and production-configuration validation passed.
- The new build guard was tested against the previous generated CSS and previous picture-media conditions; both defective fixtures were rejected for the intended reason.
- 630 page checks passed: all 42 localized pages at 320, 375, 768, 1440 and 7680px in current WebKit and Chrome, plus a WebKit fallback profile. No horizontal page overflow, missing loaded images, failed responses or JavaScript errors; Nunito remained active.
- The fallback profile removes range queries, container queries/units, property registration and text balancing, and activates the older-browser positioning rules. It exercises those fallback paths in current WebKit; it does not emulate the complete Safari 15.8 engine.
- 21 language/engine/profile interaction checks passed for mobile navigation, Escape dismissal, contact navigation, language switching, FAQ expansion and gallery movement.
- Navigation switches correctly at 800/801px. Poster checks passed at 600/601px. Gallery images remained sufficiently sharp at 375px with DPR 1×, 2× and 3×, including explicit `sizes` fallback behavior.
- Mobile Lighthouse on the local production build scored **100** for performance, accessibility, best practices and SEO on `/de/` and `/de/features/`. LCP was 1.80s and 1.88s respectively; both recorded CLS 0 and TBT 0ms. These are local lab results.

The browser checks use current Playwright WebKit 27.2 and installed Chrome. Actual iOS 15.8.8 hardware is not available in this environment. Compilation targeting Safari 15.4 and the tested fallbacks cover the site's current implementation; they do not make every future Tailwind 4 feature compatible with Safari 15.

## Owner verification

All changes remain local; no commit, push, merge or deployment was performed. To test the actual optimized output locally, run:

```sh
npm run verify
npm run preview -- --host 0.0.0.0
```

Open the displayed LAN address on the iPhone while it is on the same network. After the owner releases the changes, refresh the public site and confirm the mobile header and stacked hero on iOS 15.8.8. Repeat menu/language/FAQ/gallery interactions there. The public website will continue to serve the previous CSS until that release and cache refresh.
