import type { APIRoute } from "astro";
import { withBase } from "../utils/urls";
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(
    withBase("sitemap-index.xml"),
    site ?? "https://minidodoapps.de",
  );
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
