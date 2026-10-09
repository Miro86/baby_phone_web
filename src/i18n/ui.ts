/**
 * English is the source locale. Add another top-level locale object and localized
 * routes when translations are ready; components consume keys instead of embedding
 * navigation copy.
 */
export const defaultLocale = "en";
export const supportedLocales = ["en"] as const;

export const ui = {
  en: {
    nav: {
      home: "Home",
      features: "Baby Phone",
      parents: "For parents",
      contact: "Contact",
      privacy: "Privacy",
      terms: "Terms",
    },
    cta: {
      primary: "Get Baby Phone on Google Play",
      secondary: "Explore features",
    },
  },
} as const;

export type Locale = keyof typeof ui;
