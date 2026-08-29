import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const base = import.meta.env.BASE_URL;
  return new Response(
    JSON.stringify({
      name: "Baby Phone: Animal Sounds",
      short_name: "Baby Phone",
      description: "A playful, ad-free animal sound app for children.",
      start_url: base,
      scope: base,
      display: "standalone",
      background_color: "#fffaf2",
      theme_color: "#fffaf2",
      lang: "en",
    }),
    { headers: { "Content-Type": "application/manifest+json; charset=utf-8" } },
  );
};
