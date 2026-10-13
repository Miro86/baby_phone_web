# Search implementation and maintenance

The website serves six content pages in seven languages under distinct locale prefixes. Original unprefixed URLs remain as entry redirects; original policy meanings are preserved in translation. It gives search engines and AI search systems a clear, crawlable source for Baby Phone: Animal Sounds, with Mini Dodo as the public brand, Danijela Devedlaka as the responsible operator and only one current app.

## Implemented

- Static, readable HTML for all primary content, with one H1 per page and a logical heading structure.
- Distinct page titles and descriptions covering Baby Phone, animal sounds, pretend phone play, parents, and support.
- Self-referencing canonical URLs for all 42 localized public pages, with working internal links and preserved fragments.
- Organization and WebSite identity with stable JSON-LD identifiers, publisher contact details, and original brand artwork.
- The domain-root entry page includes the same Mini Dodo Organization and WebSite data. IDs stay at `https://minidodoapps.de/#organization` and `https://minidodoapps.de/#website` across all locales. Baby Phone has one stable application ID, while its descriptive URL remains localized. See [Google’s site-name requirements](https://developers.google.com/search/docs/appearance/site-names).
- WebPage / ContactPage metadata and BreadcrumbList data for inner pages.
- MobileApplication data for Baby Phone on the home and app pages, pointing to the official Google Play listing.
- FAQPage data generated from the same records as the visible app and parent questions.
- Correct platform availability: Android is live; iOS is coming soon and is not yet published.
- Open Graph and Twitter metadata with a 1200 × 630 sharing image and descriptive alternative text.
- Reciprocal de, en, fr, it, es, hr, and sr-Cyrl alternate links, plus a German x-default for each page. German is the first-visit default; browser language never selects a locale.
- A generated XML sitemap, crawl-permitting robots.txt, and localized noindex error pages. Entry redirects are noindex with German canonicals.
- Existing llms.txt and llms-full.txt references, updated from shared product facts and FAQs.
- Responsive, compressed artwork; image dimension reservation; prioritized hero imagery; locally hosted Nunito; minimal JavaScript.
- Clear links to the parent guide, official support email, privacy policy, and terms.

The application data deliberately omits fabricated ratings, reviews, download counts, and prices. Basic application markup is still useful descriptive data. Eligibility for a Google software-app rich result depends on real supported offer and review information, as explained in [Google’s software-app documentation](https://developers.google.com/search/docs/appearance/structured-data/software-app). FAQ markup describes the visible answers and does not guarantee an enhanced search display.

## After the owner's production release

1. Check that the active GitHub Pages variables use the intended public domain and base path. Keep the established URL identity.
2. Verify all 42 localized public pages, /robots.txt, and /sitemap-index.xml over HTTPS.
   Run `npm run verify:production` for repeatable public HTTP/HTML checks; the release checklist is in [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md).
3. Submit the sitemap in the owner’s Google Search Console and Bing Webmaster Tools accounts, and inspect the localized home and app URLs.
4. Use Google’s Rich Results Test and Schema.org Validator on the published pages. Fix genuine errors while keeping all claims accurate.
5. Run PageSpeed Insights on the public home, app, and parent pages. Local lab scores do not measure the production host’s response time, cache headers, geographic network conditions, or field Core Web Vitals.
6. Monitor indexing, real search impressions, clicks, and field performance after recrawling. Preserve the localized URLs in future redesigns.
7. When iOS is released, add the real App Store URL and update platform availability in the visible copy, FAQ records, application data, and text references.

No Search Console verification token, webmaster account access, IndexNow key, public app price, or published reviews were supplied. The site does not invent these values.

## AI search

The priority is accurate primary-source content that is accessible to crawlers, clear app identity, specific answers to parent questions, and structured data matching the visible site. Existing text-reference URLs are retained for tools that choose to consume them; they are supplementary references, rather than a promised ranking mechanism.

Google says its established SEO fundamentals also apply to AI features and that there is no special AI markup requirement. See [Google’s AI search guidance](https://developers.google.com/search/docs/appearance/ai-features). Ranking and inclusion in Google, Gemini, ChatGPT, Claude, or other services cannot be guaranteed by a website implementation.

## Hosting considerations

The current GitHub Pages host controls production compression, cache headers, HTTPS redirects, and error responses. The implementation optimizes assets and HTML without adding host-specific header files that GitHub Pages would ignore. Verify those server-level behaviors on the deployed domain before attributing a production audit difference to the site code.

## Localization validation

See [MULTILINGUAL.md](MULTILINGUAL.md). The sitemap contains only the 42 indexable locale pages, with all seven language alternates and German x-default entries. Original artwork, including English text embedded in screenshots, is preserved. No language or availability claims beyond the existing app facts are added.
