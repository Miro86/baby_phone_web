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
  build: { inlineStylesheets: "always" },
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/(404\/?|llms(?:-full)?\.txt\/?|robots\.txt\/?|site\.webmanifest\/?)$/.test(
          page,
        ),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
