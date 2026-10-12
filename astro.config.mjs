import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const site = process.env.SITE_URL ?? "https://minidodoapps.de";
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",
  // Custom middleware preserves static locale routes and preference-aware entry pages.
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en", "fr", "it", "es", "hr", "sr"],
    routing: "manual",
  },
  build: { inlineStylesheets: "always" },
  integrations: [
    sitemap({
      filter: (page) => /\/(?:de|en|fr|it|es|hr|sr)\/(?:features\/|parents\/|contact\/|privacy\/|terms\/)?$/.test(new URL(page).pathname),
      i18n: { defaultLocale: "de", locales: { de: "de", en: "en", fr: "fr", it: "it", es: "es", hr: "hr", sr: "sr-Cyrl" } },
      serialize: (entry) => ({ ...entry, links: [...(entry.links ?? []), { lang: "x-default", url: entry.links?.find((link) => link.lang === "de")?.url ?? entry.url }] }),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
