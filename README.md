# Baby Phone: Animal Sounds website

SEO-focused Astro + Tailwind landing site for the Baby Phone: Animal Sounds mobile app by Mini Dodo Apps.

## Pages

- `/` — main product landing page
- `/features/` — searchable feature and screenshot landing page
- `/parents/` — parent guide and safety overview
- `/privacy/` — privacy policy
- `/terms/` — terms of service
- `/contact/` — official contact information
- `/llms.txt` and `/llms-full.txt` — concise machine-readable product references

## Local development

```sh
npm install
npm run dev
```

Production check:

```sh
npm run build
npm run preview
```

## GitHub Pages

The included workflow deploys every push to `main`. In the GitHub repository, open **Settings → Pages** and select **GitHub Actions** as the source.

The production URL is configured as `https://minidodoapps.de`, and `public/CNAME` contains the apex domain. The domain must also be saved under **Repository Settings → Pages → Custom domain**, with the corresponding DNS records configured at Namecheap.

See `DEPLOYMENT.md` for the complete deployment and custom-domain procedure.

## Localization workflow

English source UI strings are centralized in `src/i18n/ui.ts`. Add each locale there, create locale-prefixed routes such as `/de/`, translate metadata and structured data as well as visible copy, and update `supportedLocales` and `hreflang` entries.

## Store launch

The primary CTA intentionally says “Coming soon.” When the listings are live, replace it with verified Apple App Store and Google Play links and add those URLs to the SoftwareApplication structured data.

## Asset names

Original supplied artwork remains in `assets/` with descriptive names. Astro generates responsive WebP variants during the build; do not manually compress the source files.
