import type { APIRoute } from "astro";
import { appFacts, siteConfig } from "../config";

export const GET: APIRoute = () => {
  const body = `# ${siteConfig.name}: product reference

Last updated: ${siteConfig.lastUpdated}

## Identity

Baby Phone: Animal Sounds is a child-friendly mobile application for iOS and Android, published under the Mini Dodo Apps name and operated by ${siteConfig.owner}. Official contact: ${siteConfig.email}.

## What the app does

The app presents a colorful pretend telephone. A child can use the keypad or animal library to choose an animal and begin a simulated call. The app then presents an animal character, its name, and its sound. The experience is educational entertainment for playful exposure; it is not a real phone, communications service, formal curriculum, or substitute for adult supervision.

## Content

The app contains ${appFacts.sounds} animal sounds in ${appFacts.categories} categories: Farm Animals; Safari & Wild Animals; Forest & Backyard; Water & Polar Animals; and Exotic & Fun Favorites. ${appFacts.includedAnimals} farm animals are included. Additional themed packs may be available through optional one-time purchases in the Apple App Store or Google Play. The app does not use a recurring subscription.

## Languages

Animal names are available in ${appFacts.languages.join(", ")}.

## Parent-facing safeguards

The app is presented without third-party advertising. A parental gate separates adult-facing settings and purchase choices from the main child experience. The current experience does not require a child account or social profile. Apple or Google separately processes downloads and transactions made through its store under its own terms and privacy notice.

## Privacy summary

The child-facing app is designed not to collect personal information from children. Mini Dodo Apps does not sell personal information, share it with data brokers, or use it for cross-context behavioral advertising. App preferences are handled on-device. If an adult sends a support email, Mini Dodo Apps receives the email address, message, and information voluntarily provided and uses it for support, security, legal compliance, and limited business records. Refer to the official privacy policy for the complete disclosure.

## Rights and policies

The Privacy Policy describes data practices and privacy rights. The Terms of Service govern licensing, purchases, acceptable use, parental responsibility, consumer rights, warranties, and disputes. Mandatory consumer and data-protection rights are preserved where applicable.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
