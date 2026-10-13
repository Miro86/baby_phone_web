# Mini Dodo / Baby Phone website

A static Astro website for Mini Dodo and its first app, **Baby Phone: Animal Sounds**. The redesign follows the artwork, section layouts, and brand guide supplied in `design/`.

## Localized URLs

The six content pages are available under each locale prefix: /de/, /en/, /fr/, /it/, /es/, /hr/, and /sr/. German is the first-visit default; Serbian copy uses Cyrillic.

- /{lang}/ — Home
- /{lang}/features/ — Baby Phone details, screenshots, languages, and FAQ
- /{lang}/parents/ — parent guide, safeguards, privacy summary, and FAQ
- /{lang}/contact/ — contact and support
- /{lang}/privacy/ and /{lang}/terms/ — localized legal pages
- /{lang}/404/ — localized, non-indexable error page

The original unprefixed entry URLs remain as static language redirects, with German canonicals and a German no-JavaScript fallback. A manually selected language is remembered on those entry URLs; explicit localized URLs always take precedence. The shared header switches to the equivalent page and retains the fragment.

The existing home and app #download, and parent #privacy / #download fragments remain. Global robots, sitemap and machine-readable references retain their original URLs. Each locale has its own site.webmanifest.

See [MULTILINGUAL.md](MULTILINGUAL.md) for architecture, translation maintenance, validation limits, and the exact file inventory.

## Local development and verification

```sh
npm install
npm run dev
```

Lightweight localization validation (no server or build):

```sh
node scripts/verify-i18n.mjs
```

Production build and local validation:

```sh
npm run verify
npm run preview
```

After the owner releases `dev` into `main`, check the actual public website with:

```sh
npm run verify:production
```

The canonical production origin is `https://minidodoapps.de/` with `BASE_PATH=/`; `www` permanently redirects to the apex host. See [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md) and [DEPLOYMENT.md](DEPLOYMENT.md) for completed checks, repository variables and pending public validation. Supported layouts start at 320px.

`verify` runs Astro's type checks, builds the static website, and checks the published route contract, internal links and fragments, image dimensions, canonical URLs, JSON-LD, sitemap, crawler references, and manifest.

To check repository-path deployment without replacing the main build:

```sh
SITE_URL=https://miro86.github.io BASE_PATH=/baby_phone_web npm run build -- --outDir /private/tmp/minidodo-base-build
node scripts/verify-build.mjs /private/tmp/minidodo-base-build
```

## Design and performance

- **Nunito** is the site-wide font. Its licensed Latin, Latin extended, and Cyrillic variable WOFF2 files are hosted locally; the license is in `public/fonts/OFL.txt`.
- Supplied brand artwork is in `assets/brand/`. Source colors and proportions are preserved; transparent padding was trimmed for layout.
- Astro generates responsive image variants. The main brand illustration uses AVIF with a WebP fallback; app artwork and screenshots use WebP.
- Hero imagery has high fetch priority. Images below the first screen are lazy-loaded and reserve their dimensions.
- Small compiled styles are inlined. There is no client framework, third-party font service, analytics, tracking, video embed, or automatic slideshow.
- Navigation and FAQs work without JavaScript. JavaScript adds gallery arrows, menu dismissal, language preference storage, and entry redirects. Localized pages do not depend on client-side translation.
- Layouts stack on small screens and use bounded, readable content widths on large displays. Above 2000px, rem-based spacing and typography scale up, with a 40px root-size cap.
- Production JavaScript/CSS compilation targets Safari 15.4 to retain mobile breakpoints on iOS 15.8. Mascot positioning has a percentage-based fallback for browsers without container units. See [BROWSER_COMPATIBILITY.md](BROWSER_COMPATIBILITY.md) for the diagnosis, checks and device-testing limits.
- Keyboard focus, reduced motion, a skip link, descriptive image text, and accessible contrast are included.

See `REDESIGN_VERIFICATION.md` for browser and performance results, and `SEO.md` for search implementation and deployment follow-up.

## App availability and facts

Android is live at:

https://play.google.com/store/apps/details?id=de.minidodoapps.babyphone

The iOS app is **Coming soon** and is not yet published. The App Store badge becomes a link when `siteConfig.appStoreUrl` is supplied. At iOS launch, also update the availability copy in the hero, CTA, FAQ data, and machine-readable references.

Product counts and language names are in `src/config.ts`. App and parent FAQs share `src/data/app.ts` with their structured data and product references. Update visible copy and policy disclosures together whenever product facts change.

## Search and structured data

Pages render their complete content in HTML. Page-specific metadata includes canonical URLs, social sharing images, and seven reciprocal language alternates and a German x-default. Connected JSON-LD describes the organization, website, page, breadcrumbs, app, and visible FAQs.

The XML sitemap contains the 42 indexable localized pages; the 404 page is marked noindex. `robots.txt` permits crawlers. Existing AI-readable reference URLs remain available, with accurate Android and iOS availability.

## Deployment

GitHub Pages publishes from `main` on the existing custom domain. The workflow validates the production origin/root base, language catalogs and static build before upload; only `main` can deploy. See [DEPLOYMENT.md](DEPLOYMENT.md) for the required repository variables and hosting checks.

Changes are prepared locally. Commits, pushes, merges and publication remain under the owner's control.
