import { appFacts, siteConfig } from "../config";
import {
  createTranslator,
  defaultLocale,
  productName,
  languages,
  supportedLocales,
  type Locale,
} from "../i18n/ui";
import { withBase } from "./urls";
import type { FAQ } from "../data/app";

export function siteIdentitySchema(siteUrl: URL, logoUrl: string) {
  const root = new URL(withBase(), siteUrl);
  const id = (fragment: string) => new URL(fragment, root).href;
  return [
    {
      "@type": "Organization",
      "@id": id("#organization"),
      name: siteConfig.brandDisplay,
      alternateName: siteConfig.brandDisplay,
      url: root.href,
      logo: { "@type": "ImageObject", url: logoUrl },
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.operatorAddress.street,
        postalCode: siteConfig.operatorAddress.postalCode,
        addressLocality: siteConfig.operatorAddress.city,
        addressCountry: siteConfig.operatorAddress.countryCode,
      },
      founder: { "@type": "Person", name: siteConfig.owner },
      contactPoint: {
        "@type": "ContactPoint",
        email: siteConfig.email,
        contactType: "customer support",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": id("#website"),
      name: siteConfig.brandDisplay,
      alternateName: siteConfig.brandDisplay,
      url: root.href,
      inLanguage: supportedLocales.map((locale) => languages[locale].htmlLang),
      publisher: { "@id": id("#organization") },
    },
  ];
}

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
  const root = new URL(withBase(), siteUrl);
  return {
    "@type": "MobileApplication",
    "@id": new URL("features/#baby-phone", root).href,
    name: productName(locale),
    url: url("features/"),
    description: t("m297"),
    applicationCategory: "EducationalApplication",
    operatingSystem: "Android",
    inLanguage: ["en", "de", "fr", "it", "es", "hr", "sr"],
    installUrl: siteConfig.googlePlayUrl,
    sameAs: [siteConfig.googlePlayUrl],
    publisher: { "@id": new URL("#organization", root).href },
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
