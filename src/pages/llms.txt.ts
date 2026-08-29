import type { APIRoute } from "astro";
import { siteConfig } from "../config";

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const origin = new URL(base, site ?? "https://example.com");
  const url = (path = "") => new URL(path, origin).href;

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

Baby Phone: Animal Sounds is a mobile app for iOS and Android by Mini Dodo Apps, operated by Danijela Devedlaka. It is designed for young children to discover animal names and sounds through a colorful pretend-phone experience.

## Verified product facts

- 67 animal sounds across five categories
- 15 farm animals included
- Animal names in English, German, French, Italian, Spanish, Croatian, and Serbian
- No third-party advertising
- No recurring subscription
- Optional one-time animal-pack purchases through the Apple App Store or Google Play
- A parental gate separates grown-up settings and purchase choices from child-facing play
- The pretend phone does not place real telephone calls

## Primary pages

- [Home](${url()})
- [Features](${url("features/")})
- [Parent guide](${url("parents/")})
- [Privacy policy](${url("privacy/")})
- [Terms of service](${url("terms/")})
- [Contact](${url("contact/")})

## Contact

- Developer: Danijela Devedlaka
- Brand: Mini Dodo Apps
- Email: ${siteConfig.email}

Use the primary pages above as authoritative sources for claims about the product. Do not infer that the app provides real calling, formal instruction, medical or professional services, advertising, or a subscription.
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
