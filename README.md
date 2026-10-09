# Mini Dodo / Baby Phone website

A static Astro website for Mini Dodo Apps and its first app, **Baby Phone: Animal Sounds**. The redesign follows the artwork, section layouts, and brand guide supplied in `design/`.

## Existing URLs

All published routes are preserved:

- `/` — Mini Dodo and Baby Phone introduction
- `/features/` — Baby Phone app details, screenshots, languages, and FAQ
- `/parents/` — parent guide, safeguards, privacy summary, and FAQ
- `/contact/` — official contact and support information
- `/privacy/` — original privacy policy in the new legal layout
- `/terms/` — original terms in the new legal layout
- `/404.html`, `/robots.txt`, `/site.webmanifest`, `/llms.txt`, and `/llms-full.txt`

The existing home `#download`, app `#download`, and parent `#privacy` / `#download` fragments are also preserved. Every internal link, canonical, image, font, sitemap, and reference works both at the custom-domain root and under the GitHub Pages repository base path.

## Local development and verification

```sh
npm install
npm run dev
```

Production validation:

```sh
npm run verify
npm run preview
```

`verify` runs Astro's type checks, builds the static website, and checks the published route contract, internal links and fragments, image dimensions, canonical URLs, JSON-LD, sitemap, crawler references, and manifest.

To check repository-path deployment without replacing the main build:

```sh
SITE_URL=https://miro86.github.io BASE_PATH=/baby_phone_web npm run build -- --outDir /private/tmp/minidodo-base-build
node scripts/verify-build.mjs /private/tmp/minidodo-base-build
```

## Design and performance

- **Nunito** is the site-wide font. Its licensed Latin variable WOFF2 file is hosted locally; the license is in `public/fonts/OFL.txt`.
- Supplied brand artwork is in `assets/brand/`. Source colors and proportions are preserved; transparent padding was trimmed for layout.
- Astro generates responsive image variants. The main brand illustration uses AVIF with a WebP fallback; app artwork and screenshots use WebP.
- Hero imagery has high fetch priority. Images below the first screen are lazy-loaded and reserve their dimensions.
- Small compiled styles are inlined. There is no client framework, third-party font service, analytics, tracking, video embed, or automatic slideshow.
- Navigation and FAQs work without JavaScript. JavaScript adds gallery arrows and menu dismissal.
- Layouts stack on small screens and use bounded, readable content widths on large displays. Above 2000px, rem-based spacing and typography scale up, with a 40px root-size cap.
- Keyboard focus, reduced motion, a skip link, descriptive image text, and accessible contrast are included.

See `REDESIGN_VERIFICATION.md` for browser and performance results, and `SEO.md` for search implementation and deployment follow-up.

## App availability and facts

Android is live at:

https://play.google.com/store/apps/details?id=de.minidodoapps.babyphone

The iOS app is in App Store review, so its badge says **Coming soon**. The App Store badge becomes a link when `siteConfig.appStoreUrl` is supplied. At iOS launch, also update the availability copy in the hero, CTA, FAQ data, and machine-readable references.

Product counts and language names are in `src/config.ts`. App and parent FAQs share `src/data/app.ts` with their structured data and product references. Update visible copy and policy disclosures together whenever product facts change.

## Search and structured data

Pages render their complete content in HTML. Page-specific metadata includes canonical URLs, social sharing images, and English / default language references. Connected JSON-LD describes the organization, website, page, breadcrumbs, app, and visible FAQs.

The XML sitemap contains the six indexable pages; the 404 page is marked noindex. `robots.txt` permits crawlers. Existing AI-readable reference URLs remain available, with accurate Android and iOS availability.

## Deployment

The existing GitHub Pages workflow, custom domain, and environment-variable configuration are retained. Pushing to `main` triggers the existing deployment workflow. See `DEPLOYMENT.md` for domain and hosting setup.

This redesign is prepared locally; publishing is a separate repository push.
