import { appFacts } from "../config";
import { createTranslator, type Locale } from "../i18n/ui";

export interface FAQ {
  question: string;
  answer: string;
}

export function getAppData(locale: Locale) {
  const t = createTranslator(locale);
  const appFaqs: FAQ[] = [
    {
      question: t("m265"),
      answer: t("m266"),
    },
    {
      question: t("m267"),
      answer: t("m268"),
    },
    {
      question: t("m269"),
      answer: t("m413", { animals: appFacts.includedAnimals, sounds: appFacts.sounds }),
    },
    {
      question: t("m432"),
      answer: t("m433"),
    },
    {
      question: t("m270"),
      answer: t("m414"),
    },
    {
      question: t("m271"),
      answer: t("m272"),
    },
    {
      question: t("m434"),
      answer: t("m435"),
    },
    {
      question: t("m273"),
      answer: t("m274"),
    },
  ];

  const parentFaqs: FAQ[] = [
    {
      question: t("m275"),
      answer: t("m276"),
    },
    {
      question: t("m277"),
      answer: t("m278"),
    },
    {
      question: t("m279"),
      answer: t("m280"),
    },
    {
      question: t("m281"),
      answer: t("m282"),
    },
    {
      question: t("m283"),
      answer: t("m284"),
    },
    {
      question: t("m285"),
      answer: t("m286"),
    },
    {
      question: t("m438"),
      answer: t("m439"),
    },
    {
      question: t("m440"),
      answer: t("m441"),
    },
  ];

  const categories = [
    {
      icon: "farm",
      name: t("m287"),
      copy: t("m288"),
      included: true,
    },
    {
      icon: "sun",
      name: t("m289"),
      copy: t("m290"),
    },
    {
      icon: "leaf",
      name: t("m291"),
      copy: t("m292"),
    },
    {
      icon: "water",
      name: t("m293"),
      copy: t("m294"),
    },
    {
      icon: "sparkles",
      name: t("m295"),
      copy: t("m296"),
    },
  ];

  return { appFaqs, parentFaqs, categories };
}
