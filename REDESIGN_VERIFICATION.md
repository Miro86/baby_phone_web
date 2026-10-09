# Redesign verification — October 9, 2026

The entire website follows the supplied Mini Dodo design and uses locally hosted Nunito. Baby Phone is the only app presented. Android download links point to the live Google Play listing; the App Store is marked coming soon.

## Production build and URL contract

`npm run verify` passes with zero Astro errors, warnings, or hints. A separate GitHub Pages build with `SITE_URL=https://miro86.github.io` and `BASE_PATH=/baby_phone_web` also passes the generated-site verification.

The checks cover all six original public page URLs, the 404, internal links, assets and responsive source sets, page canonicals, JSON-LD, sitemap, robots.txt, both existing text references, and the manifest. The original home and app download fragments and parent privacy/download fragments remain available. The privacy and terms source text is unchanged.

## Responsive and browser checks

Headless Chrome / Playwright tested all six public pages and the 404 at 21 widths: 240, 280, 320, 360, 375, 390, 414, 480, 600, 768, 800, 820, 900, 1024, 1280, 1440, 1920, 2560, 3840, 5120, and 7680 pixels.

- 147 page/width checks: no horizontal overflow or off-screen content failures.
- Nunito loaded successfully on every tested page and width.
- Exactly one H1 per page.
- Axe checks at 375px and 1440px: no WCAG 2 A/AA or WCAG 2.1 AA violations.
- Additional visible-label / accessible-name checks pass on all three pages with store buttons.
- No browser JavaScript errors.
- Mobile menu opening and Escape dismissal, FAQ expansion, and gallery arrow scrolling pass.
- Core navigation, FAQ, store links, and page content remain available with JavaScript disabled.

These are automated Chromium checks at the stated widths, supported by visual review of mobile and desktop screenshots; they are not a claim that every possible browser and device has been physically tested.

## Lighthouse results

Lighthouse 13.5.0 audited the built static website on a local preview server using standard mobile and desktop presets.

| Page | Mobile performance | Desktop performance | Accessibility / Best practices / SEO | Mobile LCP |
| --- | ---: | ---: | --- | --- |
| / | 100 | 100 | 100 / 100 / 100 | 1.7 s |
| /features/ | 99 | 100 | 100 / 100 / 100 | 2.0 s |
| /parents/ | 100 | 100 | 100 / 100 / 100 | 1.5 s |
| /contact/ | 100 | 100 | 100 / 100 / 100 | 1.6 s |
| /privacy/ | 100 | 100 | 100 / 100 / 100 | 1.4 s |
| /terms/ | 100 | 100 | 100 / 100 / 100 | 1.4 s |

Accessibility, Best practices, and SEO also score 100 on all desktop audits. All twelve audits measured **0 layout shift (CLS)** and **0 ms total blocking time**. Mobile first contentful paint was 0.6–0.8 seconds; desktop was 0.2 seconds.

The mobile app page’s remaining performance point comes from its illustrated hero’s measured largest contentful paint. Its useful artwork is retained with responsive, compressed variants and high fetch priority.

These are local lab measurements. Published PageSpeed Insights scores can vary with hosting response time, cache headers, network conditions, and the test environment. Recheck the live domain after the existing deployment workflow publishes the changes.

## Search work

See [SEO.md](SEO.md) for implemented metadata, structured data, crawler access, AI-readable references, and owner-side indexing steps after deployment. Search visibility and rankings are not guaranteed by Lighthouse’s SEO score.

The existing deployment configuration is preserved. No repository push or live deployment was performed.
