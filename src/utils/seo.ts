import { appFacts, siteConfig } from "../config";
import type { FAQ } from "../data/app";

export function faqSchema(items: FAQ[], pageUrl: string) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function appSchema(siteUrl: URL) {
  const url = (path = "") => new URL(path, siteUrl).href;
  return {
    "@type": "MobileApplication",
    "@id": url("features/#baby-phone"),
    name: siteConfig.name,
    url: url("features/"),
    description: siteConfig.description,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Android",
    inLanguage: ["en", "de", "fr", "it", "es", "hr", "sr"],
    installUrl: siteConfig.googlePlayUrl,
    sameAs: [siteConfig.googlePlayUrl],
    publisher: { "@id": url("#organization") },
    author: { "@type": "Person", name: siteConfig.owner },
    audience: {
      "@type": "PeopleAudience",
      audienceType: "Young children, parents, and caregivers",
    },
    featureList: [
      `${appFacts.sounds} animal sounds across ${appFacts.categories} categories`,
      `${appFacts.includedAnimals} included farm animals`,
      "Animal names in seven languages",
      "Pretend phone calls",
      "No third-party advertising",
      "Parental gate",
      "No recurring subscription",
    ],
  };
}
