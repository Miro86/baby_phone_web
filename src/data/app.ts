import { appFacts } from "../config";

export interface FAQ {
  question: string;
  answer: string;
}

export const appFaqs: FAQ[] = [
  {
    question: "What is Baby Phone: Animal Sounds?",
    answer:
      "Baby Phone: Animal Sounds is an ad-free pretend phone app for young children by Mini Dodo Apps. Children tap the colorful keypad or choose an animal, then hear its name and sound during a playful simulated call.",
  },
  {
    question: "Can children make real phone calls?",
    answer:
      "No. All calls are pretend play inside the app. Baby Phone does not make telephone calls or connect children with other people.",
  },
  {
    question: "How many animals are included?",
    answer: `${appFacts.includedAnimals} farm animals are included. The full collection has ${appFacts.sounds} animal sounds across ${appFacts.categories} categories, with additional animal packs available as optional one-time purchases.`,
  },
  {
    question: "Which languages can we choose?",
    answer: `Animal names are available in ${appFacts.languages.join(", ")}. A grown-up can choose languages in the app’s settings.`,
  },
  {
    question: "Are there ads or a subscription?",
    answer:
      "There are no third-party ads and no recurring subscription. Additional animal packs are optional one-time in-app purchases, handled by your app store.",
  },
  {
    question: "Where can I download Baby Phone?",
    answer:
      "Baby Phone: Animal Sounds is available on Google Play for Android. The iOS version is in App Store review and is coming soon. Use the Google Play links on this website for the official Android listing.",
  },
];

export const parentFaqs: FAQ[] = [
  {
    question: "Does Baby Phone include third-party ads?",
    answer:
      "No. Baby Phone: Animal Sounds does not display third-party advertising, so play is not interrupted by ad-network prompts.",
  },
  {
    question: "Does my child need an account?",
    answer:
      "No. The app does not require a child account, social profile, name, email address, photograph, or voice recording. App preferences are stored on the device. See our Privacy Policy for details about store purchases, hosting, and adult support emails.",
  },
  {
    question: "How does the parental gate work?",
    answer:
      "A grown-up must complete a simple arithmetic challenge before opening settings and purchase areas. This separates those choices from child-facing play. Parents should also use their device’s purchase approval and family controls.",
  },
  {
    question: "Are there subscriptions or in-app purchases?",
    answer:
      "There is no recurring subscription. Fifteen farm animals are included, and grown-ups can choose optional additional animal packs as one-time purchases. The app store shows the price and asks for confirmation before payment.",
  },
  {
    question: "Is Baby Phone a language-learning course?",
    answer:
      "Baby Phone offers playful exposure to animal names and sounds in seven languages. It is educational entertainment, rather than a formal curriculum, and works well alongside conversation and shared discovery with a grown-up.",
  },
  {
    question: "What if I have a privacy or support question?",
    answer:
      "A parent or guardian can email minidodoapps@gmail.com for help with Baby Phone, purchases, or privacy requests. Please include only what is needed to answer your question and avoid sending unnecessary personal information about a child.",
  },
];

export const categories = [
  {
    icon: "farm",
    name: "Farm Animals",
    copy: "15 farm friends included. Meet the dog, cat, cow, sheep, and more.",
    included: true,
  },
  {
    icon: "sun",
    name: "Safari & Wild",
    copy: "Discover animal voices from grasslands and the wild.",
  },
  {
    icon: "leaf",
    name: "Forest & Backyard",
    copy: "Listen to woodland animals and familiar backyard visitors.",
  },
  {
    icon: "water",
    name: "Water & Polar",
    copy: "Explore animals from watery worlds and icy habitats.",
  },
  {
    icon: "sparkles",
    name: "Exotic & Fun Favorites",
    copy: "Meet a colorful collection of memorable animal characters.",
  },
];
