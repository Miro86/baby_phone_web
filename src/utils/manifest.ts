import { siteConfig } from "../config";
import { withBase, pagePath } from "./urls";
import { createTranslator, languages, type Locale } from "../i18n/ui";
export const languageManifest = (locale: Locale) =>
  new Response(
    JSON.stringify({
      name: siteConfig.brandDisplay,
      short_name: siteConfig.brandDisplay,
      description: createTranslator(locale)("m297"),
      start_url: pagePath("home", locale),
      scope: withBase(),
      display: "browser",
      background_color: "#ffffff",
      theme_color: "#103b78",
      lang: languages[locale].htmlLang,
      icons: [
        {
          src: withBase("icon-192.png"),
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: withBase("icon-512.png"),
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
      ],
    }),
    { headers: { "Content-Type": "application/manifest+json; charset=utf-8" } },
  );
