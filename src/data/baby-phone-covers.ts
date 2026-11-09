import type { ImageMetadata } from "astro";
import type { Locale } from "../i18n/ui";
import de from "../../assets/baby-phone/covers/de-cover.png";
import en from "../../assets/baby-phone/covers/en-cover.png";
import fr from "../../assets/baby-phone/covers/fr-cover.png";
import it from "../../assets/baby-phone/covers/it-cover.png";
import es from "../../assets/baby-phone/covers/es-cover.png";
import hr from "../../assets/baby-phone/covers/hr-cover.png";
import sr from "../../assets/baby-phone/covers/sr-cover.png";

export const babyPhoneCovers = {
  de,
  en,
  fr,
  it,
  es,
  hr,
  sr,
} satisfies Record<Locale, ImageMetadata>;
