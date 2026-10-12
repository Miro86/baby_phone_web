import { siteConfig } from "../config";
import en from "./locales/en.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import it from "./locales/it.json";
import es from "./locales/es.json";
import hr from "./locales/hr.json";
import sr from "./locales/sr.json";

export const defaultLocale = siteConfig.locale;
export const supportedLocales = ["de", "en", "fr", "it", "es", "hr", "sr"] as const;
export type Locale = (typeof supportedLocales)[number];
export type MessageKey = keyof typeof en;
export const languages = {
  de: { name: "Deutsch", htmlLang: "de", ogLocale: "de_DE" },
  en: { name: "English", htmlLang: "en", ogLocale: "en_GB" },
  fr: { name: "Français", htmlLang: "fr", ogLocale: "fr_FR" },
  it: { name: "Italiano", htmlLang: "it", ogLocale: "it_IT" },
  es: { name: "Español", htmlLang: "es", ogLocale: "es_ES" },
  hr: { name: "Hrvatski", htmlLang: "hr", ogLocale: "hr_HR" },
  sr: { name: "Српски", htmlLang: "sr-Cyrl", ogLocale: "sr_RS" },
} as const;
export const languageNames = {
  de: { de: "Deutsch", en: "Englisch", fr: "Französisch", it: "Italienisch", es: "Spanisch", hr: "Kroatisch", sr: "Serbisch" },
  en: { de: "German", en: "English", fr: "French", it: "Italian", es: "Spanish", hr: "Croatian", sr: "Serbian" },
  fr: { de: "Allemand", en: "Anglais", fr: "Français", it: "Italien", es: "Espagnol", hr: "Croate", sr: "Serbe" },
  it: { de: "Tedesco", en: "Inglese", fr: "Francese", it: "Italiano", es: "Spagnolo", hr: "Croato", sr: "Serbo" },
  es: { de: "Alemán", en: "Inglés", fr: "Francés", it: "Italiano", es: "Español", hr: "Croata", sr: "Serbio" },
  hr: { de: "Njemački", en: "Engleski", fr: "Francuski", it: "Talijanski", es: "Španjolski", hr: "Hrvatski", sr: "Srpski" },
  sr: { de: "Немачки", en: "Енглески", fr: "Француски", it: "Италијански", es: "Шпански", hr: "Хрватски", sr: "Српски" },
} as const satisfies Record<Locale, Record<Locale, string>>;
const catalogs = { de, en, fr, it, es, hr, sr } as Record<Locale, Record<MessageKey, string>>;
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && supportedLocales.some((locale) => locale === value);
}
export function getLocale(url: URL): Locale {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "") + "/";
  const pathname = url.pathname.startsWith(base) ? url.pathname.slice(base.length) : url.pathname.slice(1);
  const segment = pathname.split("/")[0];
  return isLocale(segment) ? segment : defaultLocale;
}
export function createTranslator(locale: Locale) {
  return (key: MessageKey, values: Record<string, string | number> = {}) => {
    const message = catalogs[locale][key];
    if (typeof message !== "string") throw new Error("Missing " + locale + " translation: " + key);
    return message.replace(/\{(\w+)\}/g, (_placeholder, name: string) => {
      if (!(name in values)) throw new Error("Missing translation value: " + key + "." + name);
      return String(values[name]);
    });
  };
}
export function navigationLabels(locale: Locale) {
  const t = createTranslator(locale);
  return { home: t("m135"), features: t("m415"), parents: t("m136"), contact: t("m231") };
}
export function productName(locale: Locale) {
  return `${siteConfig.shortName}: ${createTranslator(locale)("m202")}`;
}
export function legalDate(locale: Locale) {
  return new Intl.DateTimeFormat(languages[locale].htmlLang, {
    year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
  }).format(new Date(siteConfig.lastUpdated + "T12:00:00Z"));
}
