import type { APIRoute } from "astro";
import { appFacts, siteConfig } from "../config";
import { getAppData } from "../data/app";
import { withBase, pagePath } from "../utils/urls";
export const GET: APIRoute = ({ site }) => {
  const { appFaqs, parentFaqs, categories } = getAppData("en");
  const origin = new URL(withBase(), site ?? "https://minidodoapps.de");
  const url = (path: string) => new URL(["", "features/", "parents/", "contact/", "privacy/", "terms/"].includes(path) ? pagePath(path ? path.slice(0, -1) as "features" | "parents" | "contact" | "privacy" | "terms" : "home", "en") : path, origin).href;
  const body = `# Baby Phone: Animal Sounds — official product reference

Product reference updated: ${siteConfig.contentUpdated}
Publisher: ${siteConfig.brandDisplay}
Operator: ${siteConfig.owner}
Contact: ${siteConfig.email}
Official app page: ${url("features/")}

## Identity and availability

Baby Phone: Animal Sounds is currently the only app published by Mini Dodo. It is an ad-free pretend phone app for young children.
Android is available on Google Play: ${siteConfig.googlePlayUrl}
The iOS version is coming soon. A public Apple App Store listing has not been supplied.

## What Baby Phone does

Children tap a colorful pretend-phone keypad or choose an animal in the library. A simulated call presents a friendly animal character, its name, and its sound. The app does not place real telephone calls or connect users. It is educational entertainment for shared discovery, rather than a formal curriculum or substitute for adult supervision.

## Animal content and purchases

The full collection includes ${appFacts.sounds} animal sounds across ${appFacts.categories} categories:
${categories.map((category) => `- ${category.name}: ${category.copy}`).join("\n")}

${appFacts.includedAnimals} farm animals are included. Additional packs are optional one-time in-app purchases. There is no recurring subscription. The app store shows current prices and availability before a grown-up confirms a purchase.

## Languages for animal names

${appFacts.languages.join(", ")}.

## Privacy and parent controls

The child-facing app does not require an account or social profile. Preferences are kept on the device. A parental gate uses a simple arithmetic challenge to separate grown-up settings and purchase choices from play. It complements the device’s family and purchase controls.
The app does not serve third-party advertising. Adult support emails are handled separately; the publisher receives the email address, message, and voluntarily supplied details. Google and Apple independently handle downloads and purchases through their respective stores. The static website has no account system, contact form, advertising pixels, or developer-controlled analytics cookies. Its host may process standard request data to provide the service. A manually selected website language is stored locally in the visitor’s browser; explicit language URLs take precedence.
Full privacy disclosure: ${url("privacy/")}
Terms of service: ${url("terms/")}

## App questions

${appFaqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n")}

## Parent questions

${parentFaqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n")}

## Support

A parent or legal guardian should contact ${siteConfig.email} with only the details needed for help. Avoid sending unnecessary personal information about a child.
Contact page: ${url("contact/")}
Parent guide: ${url("parents/")}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
