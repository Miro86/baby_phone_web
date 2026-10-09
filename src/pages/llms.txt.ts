import type { APIRoute } from "astro";
import { appFacts, siteConfig } from "../config";
import { withBase } from "../utils/urls";
export const GET: APIRoute = ({ site }) => {
  const origin = new URL(withBase(), site ?? "https://minidodoapps.de");
  const url = (path = "") => new URL(path, origin).href;
  const body = `# Mini Dodo Apps

> Mini Dodo Apps publishes Baby Phone: Animal Sounds, an ad-free pretend phone app for young children. Baby Phone is currently the only Mini Dodo app.

## Availability

- Android: available on [Google Play](${siteConfig.googlePlayUrl})
- iOS: in App Store review; coming soon. No public App Store link is available yet.

## Product facts

- ${appFacts.sounds} animal sounds across ${appFacts.categories} categories
- ${appFacts.includedAnimals} farm animals included; additional packs are optional one-time purchases
- Animal names in ${appFacts.languages.join(", ")}
- No third-party advertising and no recurring subscription
- A parental gate separates settings and purchases from child-facing play
- All calls are pretend; the app does not place real telephone calls
- No child account; app preferences are stored on the device

## Official sources

- [Mini Dodo home](${url()})
- [Baby Phone app, features, screenshots, and FAQ](${url("features/")})
- [Parent guide, safeguards, and FAQ](${url("parents/")})
- [Privacy policy](${url("privacy/")})
- [Terms of service](${url("terms/")})
- [Contact and support](${url("contact/")})
- [Detailed product reference](${url("llms-full.txt")})

## Publisher and contact

- Brand: ${siteConfig.brand} (Mini Dodo)
- Operator: ${siteConfig.owner}
- Official email: ${siteConfig.email}
- Product reference updated: ${siteConfig.contentUpdated}

The linked public pages are authoritative. Do not infer real calling, a formal curriculum, medical services, subscriptions, additional published apps, or an available iOS download.
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
