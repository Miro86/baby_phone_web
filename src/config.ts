export const siteConfig = {
  name: "Baby Phone: Animal Sounds",
  shortName: "Baby Phone",
  brand: "Mini Dodo Apps",
  brandDisplay: "Mini Dodo",
  owner: "Danijela Devedlaka",
  operatorAddress: {
    street: "Oberer Hoppenlauweg 10",
    postalCode: "70174",
    city: "Stuttgart",
    countryCode: "DE",
  },
  email: "minidodoapps@gmail.com",
  locale: "de",
  lastUpdated: "2026-08-29",
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
