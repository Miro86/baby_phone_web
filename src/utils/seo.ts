import { appFacts, siteConfig } from "../config";
import { createTranslator, defaultLocale, productName, type Locale } from "../i18n/ui";
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

export function appSchema(siteUrl: URL, locale: Locale = defaultLocale) {
  const t = createTranslator(locale);
  const url = (path = "") => new URL(path, siteUrl).href;
  return {
    "@type": "MobileApplication",
    "@id": url("features/#baby-phone"),
    name: productName(locale),
    url: url("features/"),
    description: t("m297"),
    applicationCategory: "EducationalApplication",
    operatingSystem: "Android",
    inLanguage: ["en", "de", "fr", "it", "es", "hr", "sr"],
    installUrl: siteConfig.googlePlayUrl,
    sameAs: [siteConfig.googlePlayUrl],
    publisher: { "@id": url("#organization") },
    author: { "@type": "Person", name: siteConfig.owner },
    audience: {
      "@type": "PeopleAudience",
      audienceType: t("m407"),
    },
    featureList: [
      t("m408", { sounds: appFacts.sounds, categories: appFacts.categories }),
      t("m409", { animals: appFacts.includedAnimals }),
      t("m403"),
      t("m404"),
      t("m405"),
      t("m144"),
      t("m406"),
    ],
  };
}
