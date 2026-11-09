# SEO, AI search and performance audit — 9 November 2026

Changes are local. No commit, push, merge, deployment or account-setting change was performed. Existing localized URLs, original entry URLs, canonical host, stable entity IDs, legal policies and Nunito font files are retained.

## Search improvements

- Homepage titles now identify Mini Dodo and its one app directly, rather than using only the studio slogan. App titles are shorter; app, home, parent and contact descriptions are specific and translated across all seven languages. Open Graph and Twitter metadata use the same titles/descriptions and a correctly typed sharing image.
- The English name is **Baby Phone: Animal Sounds**. Every language retains **Baby Phone** and translates **Animal Sounds**. Existing store URLs remain unchanged.
- Application structured data now uses EntertainmentApplication, matching both official store categories. The app page identifies its application as its main entity. App/home/parent pages reference the same stable app identity; FAQ nodes link to their containing pages. No ratings, reviews, dates or prices were invented.
- `llms.txt` links to all seven localized app pages and operator details. Both text references distinguish displayed animal-name text from animal-sound audio and retain both official store links.
- Build verification checks matching, nonduplicated title/description/social metadata, real image fallbacks, app/FAQ relationships, category consistency and internal links in the text references. The existing Safari 15 media-query regression guard remains active.
- Current documentation now reflects 49 indexable pages: seven page types across seven languages, including Impressum. Historical release reports retain their original dated measurements.

| Language | App name |
| --- | --- |
| English | Baby Phone: Animal Sounds |
| German | Baby Phone: Tiergeräusche |
| French | Baby Phone: Sons d'animaux |
| Italian | Baby Phone: Versi degli animali |
| Spanish | Baby Phone: Sonidos de animales |
| Croatian | Baby Phone: Zvukovi životinja |
| Serbian | Baby Phone: Звукови животиња |

## Images, fonts and accessibility

The owner subsequently requested that promotional covers be hidden again on phones up to 600px wide. Both the home app card and app-page cover are hidden at that breakpoint, with an inline placeholder source that prevents downloading the cover on phones. Tablet and desktop covers, the mascot illustrations and the screenshot gallery remain visible.

The covers have AVIF sources and WebP fallbacks, real fallback URLs, reserved dimensions and additional small variants. Their `sizes` account for phone padding, tablet columns, desktop grid ratios and large-screen root-font scaling. Below-fold home artwork remains lazy-loaded; the app's hero cover remains prioritized. The existing gallery layout and order are unchanged.

After hiding phone covers, 120 Chrome/WebKit cases passed across all seven languages, including the 600/601px boundary and DPR 1×/2×/3×. All 60 phone cases made zero cover-image requests; larger viewports displayed and downloaded the responsive covers. The eight gallery images remain present. Build, route, metadata and localization verification also passed.

Wordmarks also use AVIF with WebP fallbacks. The Latin and extended-Latin Nunito ranges no longer overlap for ı/Œ/œ: French text can use the existing Latin font without downloading an unnecessary extended subset. Croatian and Serbian preload their required subsets together with Latin to avoid late font replacement. Font files, weights and license are unchanged.

Accessible menu names now include their visible labels, fixing the label/name mismatch Lighthouse reported even while its weighted accessibility score was already 100. The eager Contact/Parents illustration has a high fetch priority.

## Measurements and verification

The machine-readable results are in [reports/seo-lighthouse-2026-11-09.json](reports/seo-lighthouse-2026-11-09.json). They distinguish local measurements, initial samples and the currently published site. These measurements preceded the subsequent request to hide phone covers and include the restored phone artwork.

| Final local measurement | Result |
| --- | --- |
| Lighthouse audits | 21: 19 mobile, 2 desktop |
| Performance | 99–100 |
| Accessibility / Best practices / SEO | 100 / 100 / 100 on all samples |
| CLS | 0 on all samples |
| Responsive page checks | 245 passed, covering all 49 pages at five widths |
| Automated accessibility audits | 49 passed, no reported WCAG 2/2.1 A/AA violations |
| Poster-selection cases | 192 passed, with AVIF and WebP at DPR 1×/2×/3× |
| Menu, language, FAQ, gallery, no-JavaScript and WebP checks | Passed in all seven languages |

Lighthouse 13.6.0 uses the installed Chrome and standard mobile/desktop presets. Coverage includes home and app pages in all seven languages, the five other German page types and desktop German home/app. These are lab samples, not field INP measurements or a guarantee of a fixed future score. Exact scores, transfer sizes, LCP, CLS and TBT are recorded per URL in the JSON report.

Repeatable source checks:

```sh
npm run verify
node scripts/verify-i18n.mjs
node scripts/verify-production-config.mjs
```

The HTTP checker also ran against the local production preview. It checks all 49 localized pages, seven localized noindex errors, original entry URLs, global HTTP 404, robots, sitemap, text references, assets and internal destinations without executing JavaScript.

Automated browser verification covers 320, 375, 768, 1440 and 7680px, with accessibility checks on all 49 pages at 375px. Separate cases exercise native menus, language switching, FAQ toggles, gallery arrows, no-JavaScript content, WebP fallbacks and poster selection at DPR 1×/2×/3×. Poster checks use isolated contexts so a larger image cached from another page does not distort candidate selection. Actual Safari 15.8.8 hardware was unavailable; compatible generated CSS and native WebP fallback paths are checked.

## Published-site findings and owner follow-up

The live site returned valid localized pages and scored 100 in all four Lighthouse categories on the sampled German home/app/parent URLs. Those samples still contain the older menu-label and image/cache diagnostics. A high Lighthouse SEO score does not verify every product fact or prove indexing.

The read-only public checker reported 16 content discrepancies against the current source: 14 home/app schemas describe Android only, and both published text references omit the App Store link. Both store links are already present in the local source. These discrepancies require the owner's release, followed by another `npm run verify:production` run.

GitHub Pages currently uses a ten-minute cache lifetime. Hosting controls response headers and compression; changing a static `_headers` file would not change GitHub Pages behavior. The audit does not claim to have changed CDN caching or security headers.

After release, rerun public verification and Lighthouse, validate the public URLs with Schema.org Validator/Google Rich Results Test, and inspect or submit the 49-URL sitemap in the owner's Search Console and Bing Webmaster Tools accounts. No account access or verification token was supplied, and nothing was submitted. Field INP and indexing coverage require the corresponding production data.

[Google's AI-search guidance](https://developers.google.com/search/docs/appearance/ai-features) emphasizes crawlable, useful content and matching structured data; it requires no special AI file or schema. Existing wildcard robots rules allow crawling, including [OAI-SearchBot](https://developers.openai.com/api/docs/bots) and [Claude-SearchBot](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler). The text references are supplementary. Rankings, indexing and AI citations cannot be guaranteed by metadata or a Lighthouse score.
