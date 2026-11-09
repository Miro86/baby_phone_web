import type { ImageMetadata } from "astro";
import type { Locale } from "../i18n/ui";
import deDialer from "../../assets/baby-phone/screenshots/de (1).png";
import deLibrary from "../../assets/baby-phone/screenshots/de (3).png";
import deDogCall from "../../assets/baby-phone/screenshots/de (2).png";
import deLanguages from "../../assets/baby-phone/screenshots/de (4).png";
import deTigerCall from "../../assets/baby-phone/screenshots/de (8).png";
import deSeagullCall from "../../assets/baby-phone/screenshots/de (5).png";
import deParentGate from "../../assets/baby-phone/screenshots/de (6).png";
import dePacks from "../../assets/baby-phone/screenshots/de (7).png";
import enDialer from "../../assets/baby-phone/screenshots/en (1).png";
import enLibrary from "../../assets/baby-phone/screenshots/en (3).png";
import enDogCall from "../../assets/baby-phone/screenshots/en (2).png";
import enLanguages from "../../assets/baby-phone/screenshots/en (4).png";
import enTigerCall from "../../assets/baby-phone/screenshots/en (8).png";
import enSeagullCall from "../../assets/baby-phone/screenshots/en (5).png";
import enParentGate from "../../assets/baby-phone/screenshots/en (6).png";
import enPacks from "../../assets/baby-phone/screenshots/en (7).png";
import frDialer from "../../assets/baby-phone/screenshots/fr (1).png";
import frLibrary from "../../assets/baby-phone/screenshots/fr (3).png";
import frDogCall from "../../assets/baby-phone/screenshots/fr (2).png";
import frLanguages from "../../assets/baby-phone/screenshots/fr (4).png";
import frTigerCall from "../../assets/baby-phone/screenshots/fr (8).png";
import frSeagullCall from "../../assets/baby-phone/screenshots/fr (5).png";
import frParentGate from "../../assets/baby-phone/screenshots/fr (6).png";
import frPacks from "../../assets/baby-phone/screenshots/fr (7).png";
import itDialer from "../../assets/baby-phone/screenshots/it (1).png";
import itLibrary from "../../assets/baby-phone/screenshots/it (3).png";
import itDogCall from "../../assets/baby-phone/screenshots/it (2).png";
import itLanguages from "../../assets/baby-phone/screenshots/it (4).png";
import itTigerCall from "../../assets/baby-phone/screenshots/it (8).png";
import itSeagullCall from "../../assets/baby-phone/screenshots/it (5).png";
import itParentGate from "../../assets/baby-phone/screenshots/it (6).png";
import itPacks from "../../assets/baby-phone/screenshots/it (7).png";
import esDialer from "../../assets/baby-phone/screenshots/es (1).png";
import esLibrary from "../../assets/baby-phone/screenshots/es (3).png";
import esDogCall from "../../assets/baby-phone/screenshots/es (2).png";
import esLanguages from "../../assets/baby-phone/screenshots/es (4).png";
import esTigerCall from "../../assets/baby-phone/screenshots/es (8).png";
import esSeagullCall from "../../assets/baby-phone/screenshots/es (5).png";
import esParentGate from "../../assets/baby-phone/screenshots/es (6).png";
import esPacks from "../../assets/baby-phone/screenshots/es (7).png";
import hrDialer from "../../assets/baby-phone/screenshots/hr (1).png";
import hrLibrary from "../../assets/baby-phone/screenshots/hr (3).png";
import hrDogCall from "../../assets/baby-phone/screenshots/hr (2).png";
import hrLanguages from "../../assets/baby-phone/screenshots/hr (4).png";
import hrTigerCall from "../../assets/baby-phone/screenshots/hr (8).png";
import hrSeagullCall from "../../assets/baby-phone/screenshots/hr (5).png";
import hrParentGate from "../../assets/baby-phone/screenshots/hr (6).png";
import hrPacks from "../../assets/baby-phone/screenshots/hr (7).png";
import srDialer from "../../assets/baby-phone/screenshots/sr (1).png";
import srLibrary from "../../assets/baby-phone/screenshots/sr (3).png";
import srDogCall from "../../assets/baby-phone/screenshots/sr (2).png";
import srLanguages from "../../assets/baby-phone/screenshots/sr (4).png";
import srTigerCall from "../../assets/baby-phone/screenshots/sr (8).png";
import srSeagullCall from "../../assets/baby-phone/screenshots/sr (5).png";
import srParentGate from "../../assets/baby-phone/screenshots/sr (6).png";
import srPacks from "../../assets/baby-phone/screenshots/sr (7).png";

// Mapped by inspected image contents, in the gallery's approved subject order.
export const babyPhoneScreenshots = {
  de: {
    dialer: deDialer,
    library: deLibrary,
    dogCall: deDogCall,
    languages: deLanguages,
    tigerCall: deTigerCall,
    seagullCall: deSeagullCall,
    parentGate: deParentGate,
    packs: dePacks,
  },
  en: {
    dialer: enDialer,
    library: enLibrary,
    dogCall: enDogCall,
    languages: enLanguages,
    tigerCall: enTigerCall,
    seagullCall: enSeagullCall,
    parentGate: enParentGate,
    packs: enPacks,
  },
  fr: {
    dialer: frDialer,
    library: frLibrary,
    dogCall: frDogCall,
    languages: frLanguages,
    tigerCall: frTigerCall,
    seagullCall: frSeagullCall,
    parentGate: frParentGate,
    packs: frPacks,
  },
  it: {
    dialer: itDialer,
    library: itLibrary,
    dogCall: itDogCall,
    languages: itLanguages,
    tigerCall: itTigerCall,
    seagullCall: itSeagullCall,
    parentGate: itParentGate,
    packs: itPacks,
  },
  es: {
    dialer: esDialer,
    library: esLibrary,
    dogCall: esDogCall,
    languages: esLanguages,
    tigerCall: esTigerCall,
    seagullCall: esSeagullCall,
    parentGate: esParentGate,
    packs: esPacks,
  },
  hr: {
    dialer: hrDialer,
    library: hrLibrary,
    dogCall: hrDogCall,
    languages: hrLanguages,
    tigerCall: hrTigerCall,
    seagullCall: hrSeagullCall,
    parentGate: hrParentGate,
    packs: hrPacks,
  },
  sr: {
    dialer: srDialer,
    library: srLibrary,
    dogCall: srDogCall,
    languages: srLanguages,
    tigerCall: srTigerCall,
    seagullCall: srSeagullCall,
    parentGate: srParentGate,
    packs: srPacks,
  },
} satisfies Record<Locale, Record<
  "dialer" | "library" | "dogCall" | "languages" | "tigerCall" | "seagullCall" | "parentGate" | "packs",
  ImageMetadata
>>;

