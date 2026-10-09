export const siteConfig = {
  name: "Baby Phone: Animal Sounds",
  shortName: "Baby Phone",
  brand: "Mini Dodo Apps",
  brandDisplay: "Mini Dodo",
  owner: "Danijela Devedlaka",
  email: "minidodoapps@gmail.com",
  locale: "en",
  lastUpdated: "August 29, 2026",
  contentUpdated: "October 9, 2026",
  googlePlayUrl:
    "https://play.google.com/store/apps/details?id=de.minidodoapps.babyphone",
  appStoreUrl: "",
  description:
    "Discover Baby Phone: Animal Sounds by Mini Dodo. An ad-free pretend phone app for young children, with 67 animal sounds and names in seven languages.",
} as const;

export const appFacts = {
  sounds: 67,
  categories: 5,
  includedAnimals: 15,
  languages: [
    "English",
    "German",
    "French",
    "Italian",
    "Spanish",
    "Croatian",
    "Serbian",
  ],
} as const;
