# Mini Dodo release preparation — 13 October 2026

Changes remain local on `dev`. The owner will commit, push and merge into `main` when ready. No commit, push, merge, deployment, DNS change or account-setting change was performed during this task.

The supported minimum viewport is **320px**, explicitly confirmed by the owner. Widths below 320px are outside scope. The approved CSS/layout, image order and existing public copy were retained, except for the operator/address addition explicitly approved for Contact.

## Completed work

| Item                              | Result                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F04 — screenshot gallery          | `sizes` now follows the actual 14rem mobile / 15rem desktop image cap, 4px borders, container spacing, one/two/three-column track and large-screen root-font scaling. Native lazy-image `auto` sizing has a matching explicit fallback. Width candidates cover mobile DPR 1×/2×/3× and larger screens up to the original 1320px source width.        |
| Mobile poster optimization        | Existing `<picture>` source media conditions and transparent fallback remain unchanged. Neither home nor Baby Phone downloads promotional posters at widths up to 600px in the browser checks.                                                                                                                                                       |
| F06 — documentation               | `SEO.md` says iOS coming soon, without asserting a review status. `MULTILINGUAL.md` says animal names appear as text in the selected language and audio plays animal sounds.                                                                                                                                                                         |
| V01 — hosting                     | Retained canonical `https://minidodoapps.de/`. DNS, trusted HTTPS, `www` → apex 301, HTTP → HTTPS 301 and GitHub alias → custom-domain 301 were verified live. `astro.config.mjs` and CNAME already match. Workflow defaults now match, and invalid origin/base variables fail before artifact upload.                                               |
| V02 — operator/legal coordination | Owner confirmed legal/privacy/store review and approved the store-listed address. Added Danijela Devedlaka and the Stuttgart address to all existing Contact pages, with localized labels/country. Organization schema uses the same address. Policies, governing-law text and dates remain unchanged. Evidence and limits are in `LEGAL_REVIEW.md`. |
| V03 — identity                    | Fixed locale-specific Organization/WebSite IDs and missing root-page WebSite data. All locales and the root entry page now refer to `/#organization` and `/#website` on the canonical domain. Mini Dodo remains the site/brand name. Baby Phone has one stable application ID, linked to the same publisher, with localized descriptive URLs.        |
| Repeatable release checks         | Added `npm run verify:production` to inspect real HTTP responses and server-rendered HTML after release. Expanded build checks for stable identities and operator details. GitHub Actions verifies the build before upload and permits deployment only from `main`.                                                                                  |

F01, F02, F03 and F05 remained with the owner's team; no CSS contrast, focus, existing parent/contact metadata or French wording changes were made.

## Local verification

- `npm run verify` passed: 42 indexable localized pages, seven localized noindex error documents, original routes/fragments, all internal links and image candidates, sitemap, canonicals, schema, crawler references and manifests.
- `node scripts/verify-i18n.mjs` passed: seven complete catalogs, now 446 message IDs each, matching placeholders, Cyrillic Serbian navigation, localized product names and manual middleware behavior.
- Production configuration checks accept the canonical origin/root base and reject a GitHub origin, repository subpath or mismatched `www` canonical host.
- Read-only HTTP/HTML checks on the local production preview passed for all 42 public pages, seven localized error documents, global HTTP 404, six original entry routes, robots, both sitemap files, LLM references and 159 unique assets/internal destinations. Content and schema are available without running JavaScript.
- Gallery: 120 cold-context Chrome cases across 20 viewport widths (240–7680px), DPR 1×/2×/3×, with native `auto` and with it removed to exercise fallback sizing. All image-selection/aspect-ratio/poster checks passed. The unsupported 240/280px cases exposed existing header overflow; the owner confirmed those widths are outside scope. All supported widths passed.
- Pages: all 42 content pages passed at 320, 390, 600, 768, 1440 and 7680px: no horizontal page overflow, missing loaded images, failed responses or JavaScript errors; Nunito remains in use. Additional 240px checks were diagnostic only and are not a supported-width pass.
- Keyboard/manual-language checks passed in all seven languages: language menu open, Home/End/Escape, selected-language storage, equivalent-page/fragment preservation, original contact redirect with query/fragment, mobile navigation, legal/email/store links, FAQ toggle and gallery movement. A harness timing issue was corrected by waiting for the gallery enhancement before exercising handlers; no site-script change was required.
- All seven app pages retain headings, eight screenshots, FAQ and links with JavaScript disabled.
- After the approved address addition, all seven Contact pages passed again at six supported widths from 320px to 8K, including text clipping and console checks.

The source screenshots are 1320px wide. Mobile and ordinary desktop DPR 1×/2×/3× have sufficient candidates. At the extreme 592 CSS-pixel gallery size on an 8K display with DPR 3×, a true 1776px image would require higher-resolution source artwork; the implementation serves the original maximum rather than upscaling and inventing detail. The gallery's approved dimensions were retained.

## Local Lighthouse lab measurements

Chrome, Lighthouse 13.5.0, local production preview; measured 13 October 2026. No public CDN/network measurements or field INP conclusions are implied.

| Page            | Mode    | Performance | Accessibility | Best practices | SEO | LCP    | CLS | TBT  |
| --------------- | ------- | ----------- | ------------- | -------------- | --- | ------ | --- | ---- |
| `/de/`          | Mobile  | 100         | 100           | 100            | 100 | 1.80 s | 0   | 0 ms |
| `/de/features/` | Mobile  | 100         | 100           | 100            | 100 | 1.88 s | 0   | 0 ms |
| `/de/`          | Desktop | 100         | 100           | 100            | 100 | 0.38 s | 0   | 0 ms |
| `/de/features/` | Desktop | 100         | 100           | 100            | 100 | 0.42 s | 0   | 0 ms |

Small remaining image-delivery suggestions estimated 5 KiB on mobile and 17–18 KiB on desktop; no targeted change was justified by the measured scores. INP requires real interaction/field data and is not established by zero lab TBT. Scores can change with Chrome/Lighthouse versions, device conditions and production hosting.

## Public checks completed against the older release

The current live site is the August release; its localized routes are absent. Live checks confirmed DNS/redirect/TLS configuration and a genuine 404 response. HTML is compressed with gzip and cached with `max-age=600`. The trusted certificate covers apex and `www` and currently expires on 28 November 2026.

The sampled HTML response did not include CSP, HSTS, X-Content-Type-Options or Referrer-Policy headers. GitHub Pages controls these headers; static `_headers` files would not apply them. Recheck after release. Any requirement for custom response headers needs a separate supported hosting/CDN configuration, rather than a cosmetic source-file change.

The active Google Play listing uses Mini Dodo, identifies Danijela Devedlaka and the confirmed Stuttgart address, and describes animal-name text in seven languages, animal sounds, no third-party ads and optional one-time packs. It currently declares no data collection or sharing. These are publisher declarations, corroborated by limited read-only app-source inspection, not an independent privacy/runtime certification.

Private GitHub Pages settings and Actions variable values could not be read through the unauthenticated API. No Search Console property/access/verification token was confirmed, and no sitemap was submitted.

## Required checks after the owner's release

1. Confirm the GitHub Actions run on `main` completed and the new version is served at the custom-domain root. Verify the repository variables and HTTPS setting described in `DEPLOYMENT.md`.
2. Run `npm run verify:production` against the actual canonical domain. Allow old CDN responses to expire before interpreting version mismatches. Confirm no indexable duplicate remains on `www`, HTTP or the GitHub repository URL.
3. Use the [Schema.org Validator](https://validator.schema.org/) and [Google Rich Results Test](https://search.google.com/test/rich-results) on the domain root and localized home/app/contact pages. Root WebSite data targets site-name identity; site-name validation is not a Rich Results Test feature. Do not fabricate offers or ratings to force a software-app rich result.
4. In the owner's [Google Search Console](https://search.google.com/search-console), verify the domain property, submit `https://minidodoapps.de/sitemap-index.xml`, and inspect representative URLs in all seven languages. A 42-URL sitemap is not proof that all 42 URLs are indexed; inspect coverage and recrawl results.
5. Measure the actual `/de/` and `/de/features/` pages with [PageSpeed Insights](https://pagespeed.web.dev/) and mobile/desktop Lighthouse. Record production LCP/CLS and field INP/CrUX availability, plus transfer sizes, font/image/CSS/JS delivery, cache/compression and security headers. A new/small site may have no field data yet.
6. Repeat browser checks on the public release: navigation, all language equivalents/manual preferences, support email, privacy/terms/contact, Android download, iOS coming-soon state, FAQ, gallery, 320px minimum, 600/601px poster boundary, tablet/desktop/large screens, keyboard navigation, broken assets and console errors.
7. Monitor indexing and real search performance. `llms.txt`, schema and crawlable HTML support accurate retrieval; they do not guarantee rankings in Google, Gemini, ChatGPT, Claude or other search systems.

These post-release items remain pending because the owner explicitly reserved publication. They were not replaced with claims about the local build.
