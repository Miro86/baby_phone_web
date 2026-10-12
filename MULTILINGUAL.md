# Mini Dodo multilingual implementation

The website has seven static locales: German (de, the first-visit default), English (en), French (fr), Italian (it), Spanish (es), Croatian (hr), and Serbian Cyrillic (sr URLs, sr-Cyrl HTML/hreflang).

## Routes and SEO

Astro 7 manual routing is registered through src/middleware.ts using defineMiddleware. The middleware lets the existing static routes and LocaleRedirect make routing decisions, and annotates HTML responses with the URL-derived Content-Language. It does not negotiate browser languages or redirect entry pages before browser localStorage can be read. Non-HTML responses are unchanged. On static hosting, HTML lang and SEO metadata remain the language signals; custom runtime headers depend on the host.

The shared route src/pages/[lang]/[...page].astro emits the six content pages for every locale: home, features, parents, contact, privacy, and terms. Seven localized noindex error pages are also available. Content templates live in src/views; layouts and visual components remain shared.

Each of the 42 indexable pages has a self-referencing canonical and reciprocal alternates for all seven languages, plus German x-default. The sitemap excludes unprefixed redirects, manifests, reference endpoints, and errors. Sitemap entries also have seven locale alternates and German x-default. SITE_URL and BASE_PATH retain their existing hosting roles; paths work at the domain root and under a repository base path.

The original /, /features/, /parents/, /contact/, /privacy/, and /terms/ URLs are static entry redirects. They have noindex/follow and German canonicals. With JavaScript, they use location.replace to avoid adding a redirect to browser history, retain query/fragment, and honor a saved manual preference. Without JavaScript, a noscript meta refresh and visible German link lead to the equivalent German page. These are static redirects, not HTTP 301/302 responses; the existing hosting workflow has not been changed.

An explicit locale URL is never redirected by preference or browser language. Browser language is never consulted. Unsupported/blocked stored preferences fall back to German. The global host error document remains German, while locale-specific error pages can be linked directly.

The architecture follows [Astro’s static localization recipe](https://v6.docs.astro.build/en/recipes/i18n/) and [Google’s localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).

## Content and language selector

src/i18n/locales/en.json is the source catalog; the other six JSON catalogs contain complete translations of the same 418 stable message IDs. Use the English source text to locate an ID, update every locale when changing its meaning, and retain parameter names in braces. createTranslator rejects missing messages and interpolation values. App facts stay centralized in src/config.ts; FAQ data is created per locale and shared by visible FAQ and schema output.

Localized coverage includes page titles, descriptions, navigation, footer, headings, buttons, cards, categories, FAQ answers, image descriptions, speech bubbles, accessibility labels, structured-data text, policy text, dates, and web-manifest descriptions. Serbian prose and navigation use Cyrillic. Proper brand/product/platform names, operator identity, addresses, standard technical/legal abbreviations, and the explicitly requested two-letter language codes keep their established form.

LanguageSelector uses native details/summary with equivalent-page links. Native language names, current-page indication, arrow/Home/End navigation, Escape, Tab, outside-click dismissal, and mutual exclusion with the mobile menu are supported. The chosen code is stored under mini-dodo-language in localStorage, only after manual selection. Storage failures do not prevent the links from working. The current fragment is retained.

The selector sits beside desktop navigation and beside Menu on mobile. Navigation uses its menu mode at 800px and below to accommodate translated labels; existing header heights remain 6rem on desktop/tablet and 5.25rem at 600px and below. A narrow-screen dropdown is anchored to the header container. Heading words may wrap when necessary to prevent overflow. Original fonts, colors, sticky behavior/shadow, cards, carousel and mascot layout remain.

Nunito Latin extended and Cyrillic WOFF2 subsets are hosted locally alongside the original Latin font, under the existing SIL Open Font License. They were retrieved from Google Fonts (Nunito v32). Font-face unicode ranges select the appropriate subset. No external font service or client translation dependency is used by the website.

Original logos, illustrations and screenshots are unchanged. English words embedded in those image assets remain. llms.txt and llms-full.txt remain English machine-readable references, with corrected English-page URLs and website-language information. Existing English support-language metadata is preserved; translations do not promise support in seven languages.

## Review before publication

All translated Privacy Policy and Terms of Service pages need qualified human legal and native-language review before publication. Review the localStorage preference disclosure, consumer rights, liability limits, Serbia governing law, privacy/children rules, store responsibilities and support retention. The existing effective/updated date of 29 August 2026 was retained in localized form; confirm the publication date as part of review. See [LEGAL_REVIEW.md](LEGAL_REVIEW.md). No deployment has been performed.

## Validation

Run the repeatable lightweight check without a server or build:

~~~sh
node scripts/verify-i18n.mjs
~~~

Completed checks:

- All seven catalogs have 418 nonempty entries with matching placeholders; Serbian navigation is Cyrillic.
- Native Astro compiler diagnostics, TypeScript syntax/type checks, CSS parsing, and whitespace validation passed.
- Isolated template checks rendered all 49 localized routes, including canonicals, HTML language tags, metadata, page equivalents and translations. Responsive asset components were stubbed to preserve source artwork without running Astro’s image pipeline.
- Sitemap generation functions were checked directly: 42 indexable URLs with eight alternate links each, at root and subdirectory bases.
- 36 entry-redirect scenarios passed: German default, valid stored choices, invalid preference, blocked storage, and retained query/fragment.
- Headless local fixtures checked all 49 pages at 320, 375, 390, 430, 768, 1024 and 1440px, plus 28 header-boundary/manual-preference cases at 801, 820, 900 and 960px, and 28 final header-height/full-keyboard cases at 600, 601, 768 and 800px. No horizontal overflow, header collision, dropdown clipping or mascot-bubble overlap remained; keyboard controls, sticky behavior and mobile menu passed. Fixtures used source CSS and original artwork; production Tailwind/image output was not built.

scripts/verify-build.mjs has been updated for the localized route contract, for use only when a future build is authorized. No dev server, build, deployment, commit or push was run for this task.

## Exact file inventory

59 files added or modified:

- LEGAL_REVIEW.md
- MULTILINGUAL.md
- README.md
- SEO.md
- astro.config.mjs
- public/fonts/nunito-cyrillic.woff2
- public/fonts/nunito-latin-ext.woff2
- scripts/verify-build.mjs
- scripts/verify-i18n.mjs
- src/components/AppCard.astro
- src/components/AppMark.astro
- src/components/CallToAction.astro
- src/components/DodoVisual.astro
- src/components/FAQ.astro
- src/components/FeatureGrid.astro
- src/components/Footer.astro
- src/components/Header.astro
- src/components/Hero.astro
- src/components/LanguageSelector.astro
- src/components/LocaleRedirect.astro
- src/components/ParentPromises.astro
- src/components/ScreenshotGallery.astro
- src/components/StoreLinks.astro
- src/config.ts
- src/data/app.ts
- src/i18n/locales/de.json
- src/i18n/locales/en.json
- src/i18n/locales/es.json
- src/i18n/locales/fr.json
- src/i18n/locales/hr.json
- src/i18n/locales/it.json
- src/i18n/locales/sr.json
- src/i18n/ui.ts
- src/middleware.ts
- src/layouts/BaseLayout.astro
- src/layouts/LegalLayout.astro
- src/pages/404.astro
- src/pages/[lang]/[...page].astro
- src/pages/[lang]/site.webmanifest.ts
- src/pages/contact.astro
- src/pages/features.astro
- src/pages/index.astro
- src/pages/llms-full.txt.ts
- src/pages/llms.txt.ts
- src/pages/parents.astro
- src/pages/privacy.astro
- src/pages/site.webmanifest.ts
- src/pages/terms.astro
- src/styles/global.css
- src/utils/manifest.ts
- src/utils/seo.ts
- src/utils/urls.ts
- src/views/404.astro
- src/views/contact.astro
- src/views/features.astro
- src/views/index.astro
- src/views/parents.astro
- src/views/privacy.astro
- src/views/terms.astro

## Astro 7 runtime follow-up

The interrupted implementation configured i18n.routing as manual but omitted the required custom middleware file. Astro 7 therefore returned MissingMiddlewareForInternationalization before serving page content. The earlier isolated template checks did not exercise this framework registration requirement. See [Astro’s error reference](https://docs.astro.build/en/reference/errors/missing-middleware-for-internationalization/).

Added src/middleware.ts and retained routing: manual, German default, all locale prefixes, preference-aware static entry pages, canonicals and sitemap behavior. astro.config.mjs received an explanatory comment; its existing dev watcher reloaded the configuration and registered the middleware. No additional dev server was started. scripts/verify-i18n.mjs now checks middleware registration and its HTML/non-HTML, explicit-locale, base-path and German-default behavior.

Completed against the already-running Astro 7 server:

- All 49 localized pages returned HTTP 200, with matching HTML language and Content-Language, self canonicals, reciprocal hreflang/x-default entries, one H1, and correct indexing rules. Standalone localized error pages remain noindex.
- Every localized internal link and fragment resolved to an existing page/anchor.
- All seven 418-entry catalogs, placeholders, Cyrillic navigation, source syntax and TypeScript checks passed.
- All 343 real-page browser cases passed at 320, 375, 390, 430, 768, 1024 and 1440px, using the actual dev CSS, image components and browser scripts. Checks included overflow, keyboard navigation, dropdown placement, original header heights/stickiness, card highlight patterns, heading/section/CTA colors and mascot bubbles.
- Seventeen real-browser language scenarios passed: first visit, selecting and remembering all seven languages, equivalent-page/hash preservation, explicit URL precedence, and invalid-preference German fallback. Browser language was en-US; first visit still selected German.
- Thirty-six scenarios using the real entry-page scripts passed, including blocked storage, German fallback, valid preferences and query/hash preservation.
- Sitemap integration functions produced 42 URLs with eight alternates each, at root and repository base paths. Seven localized manifests and robots.txt passed. Sitemap output files are build-generated and were not built.
- Repository-independent whitespace validation and git diff --no-index --check passed. Temporary browser harness and check files were removed.

Files changed in this continuation: src/middleware.ts (new), astro.config.mjs (comment only), scripts/verify-i18n.mjs (middleware regression coverage), and MULTILINGUAL.md (runtime validation and inventory). All previous multilingual/styling work remains intact. Human legal/native-language review and future authorized production-build/deployment checks remain outside this task’s completed checks.
