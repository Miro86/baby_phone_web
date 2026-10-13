# Mini Dodo production deployment

The canonical origin is **https://minidodoapps.de/**. The public brand is **Mini Dodo**. The existing `www.minidodoapps.de` address remains supported through a permanent redirect to the apex domain. Keep this host choice consistent rather than changing established URLs.

## Verified public configuration — 13 October 2026

- Apex DNS returns all four GitHub Pages IPv4 addresses: 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153.
- `www` is a CNAME to `miro86.github.io`.
- Both HTTPS names have a trusted Let's Encrypt certificate, valid until 28 November 2026 at the time of the check. Certificate renewal remains the hosting provider's responsibility.
- HTTPS `www` redirects to HTTPS apex with HTTP 301, retaining path and query.
- HTTP apex redirects to HTTPS apex with HTTP 301, retaining path and query.
- `https://miro86.github.io/baby_phone_web/…` redirects to the matching custom-domain path with HTTP 301.
- The GitHub Pages domain-verification TXT record is present. Repository Pages settings could not be read without authenticated account access; the successful live responses confirm the current public connection, not every private setting.
- Public HTML uses gzip compression and `Cache-Control: max-age=600`. GitHub Pages controls response headers, CDN caching and compression. Do not add a `_headers` file expecting GitHub Pages to apply it.
- The live site is the older August release. The new localized pages are not deployed and `/de/features/` currently returns 404. This is expected until the owner releases `dev` to `main`.

Reference: [GitHub custom-domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Build configuration and safeguards

`astro.config.mjs` defaults to `SITE_URL=https://minidodoapps.de` and `BASE_PATH=/`. `public/CNAME` contains `minidodoapps.de`. No source-level domain change was necessary.

`.github/workflows/deploy.yml` now uses the same defaults. If repository Actions variables exist, set them to:

| Variable    | Required production value |
| ----------- | ------------------------- |
| `SITE_URL`  | `https://minidodoapps.de` |
| `BASE_PATH` | `/`                       |

Private repository variables were not accessible through the unauthenticated API; their actual saved values are **not verified**. The workflow runs `node scripts/verify-production-config.mjs` before building. A stale GitHub origin, `www` origin or repository subpath now fails before artifact upload instead of publishing broken navigation and canonical URLs.

The workflow installs the lockfile with `npm ci`, then runs `npm run verify`. All generated pages, links, image candidates, localized canonicals, sitemap entries and stable schema IDs must pass before the artifact is uploaded. Only a workflow running on `main` can execute the deployment job, including manual workflow runs.

## Owner-controlled release

Work is prepared locally on `dev`. The owner controls commits, pushes and the merge into `main`. No commit, push, merge or deployment was performed for the release-preparation task.

Before merging:

1. Confirm Pages uses **GitHub Actions**, custom domain `minidodoapps.de`, and **Enforce HTTPS**.
2. Check the repository variables above. Leave the current DNS records and domain-verification TXT record in place.
3. Run `node scripts/verify-production-config.mjs` and `npm run verify` locally.
4. Review the open findings in [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md) and the operator-information question in [LEGAL_REVIEW.md](LEGAL_REVIEW.md).
5. Commit and push the approved changes yourself, then merge `dev` into `main` when ready.
6. Wait for **Deploy to GitHub Pages** build and deployment jobs to succeed. CDN responses may briefly retain the previous version; the observed cache lifetime is ten minutes.

## Checks after the owner's release

Run the read-only public-site check from the checkout:

```sh
npm run verify:production
```

It checks the actual public HTML and HTTP responses for all 42 indexable localized pages, reciprocal canonical/hreflang links, root-level Mini Dodo identity, application identity, social metadata, sitemap, robots and LLM reference files, internal assets/anchors, original entry routes, domain redirects and 404 responses. It does not execute JavaScript and cannot prove that search engines have indexed a URL.

For a local production preview, the same script can fetch local responses while checking production canonical URLs:

```sh
npm run preview -- --host 127.0.0.1 --port 4321
npm run verify:production -- http://127.0.0.1:4321/
npm run preview -- stop
```

Also complete the public browser, official-validator, Search Console and PageSpeed checklist in [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md). Search Console ownership verification and sitemap submission require the owner's Google account. Do not invent a verification token or claim submission without a successful account response.

## URL compatibility

All original entry paths remain: `/`, `/features/`, `/parents/`, `/contact/`, `/privacy/` and `/terms/`, including established fragments. They keep the approved preference-aware static redirect behavior and `noindex, follow`, leading to the corresponding localized page. These content redirects are HTML/JavaScript redirects with a no-JavaScript fallback, not host-level HTTP 301 responses. Explicit localized URLs never redirect according to stored preferences.

The indexable URLs are the six page types under each of `/de/`, `/en/`, `/fr/`, `/it/`, `/es/`, `/hr/` and `/sr/`. Domain aliases use HTTP 301; entry pages and localized error documents are excluded from the sitemap and marked noindex. Do not move the production build under `/baby_phone_web/`.
