import type { APIRoute } from "astro";
import { siteConfig } from "../config";
import { withBase } from "../utils/urls";
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: siteConfig.brandDisplay,
      short_name: siteConfig.brandDisplay,
      description: siteConfig.description,
      start_url: withBase(),
      scope: withBase(),
      display: "browser",
      background_color: "#ffffff",
      theme_color: "#103b78",
      lang: "en",
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
