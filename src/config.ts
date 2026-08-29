export const siteConfig = {
  name: "Baby Phone: Animal Sounds",
  shortName: "Baby Phone",
  brand: "Mini Dodo Apps",
  owner: "Danijela Devedlaka",
  email: "minidodoapps@gmail.com",
  locale: "en",
  lastUpdated: "August 29, 2026",
  description:
    "A playful, ad-free animal sound app for children with 67 animal sounds, five categories, and animal names in seven languages.",
} as const;

export const appFacts = {
  sounds: 67,
  categories: 5,
  includedAnimals: 15,
  languages: ["English", "German", "French", "Italian", "Spanish", "Croatian", "Serbian"],
} as const;
