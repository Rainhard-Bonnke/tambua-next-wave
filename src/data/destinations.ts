export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  images?: string[];
  safariCount: number;
}

export const destinations: Destination[] = [
  {
    id: "tsavo",
    name: "Tsavo National Park",
    country: "Kenya",
    description:
      "A vast red-earth wilderness comprising Tsavo East and West, famous for its 'red elephants', the Mzima Springs, and rugged volcanic landscapes.",
    image: "/images/ad_images-mammal-3218712_1920.webp",
    images: [
      "/images/ad_images-mammal-3218712_1920.webp",
      "/images/herd-zebras-standing-savanna-field.webp",
      "/images/pexels-ross-green-2159326053-36048575.webp",
    ],
    safariCount: 5,
  },
  {
    id: "masai-mara",
    name: "Maasai Mara",
    country: "Kenya",
    description:
      "The world-renowned home of the Great Migration, offering the highest density of predators and breath-taking savannah vistas.",
    image: "/images/maasai-mara-real.webp",
    images: [
      "/images/maasai-mara-real.webp",
      "/images/maasai-mara-authentic.webp",
      "/images/maasai-ceremony.webp",
    ],
    safariCount: 6,
  },
  {
    id: "samburu",
    name: "Samburu National Reserve",
    country: "Kenya",
    description:
      "A rugged northern frontier known for rare wildlife species, the Ewaso Ng'iro River, and the vibrant Samburu culture.",
    image: "/images/herd-zebras-standing-savanna-field.webp",
    images: [
      "/images/herd-zebras-standing-savanna-field.webp",
      "/images/pexels-andname-5536965.webp",
      "/images/pexels-marri-shyam-366418-7463697.webp",
    ],
    safariCount: 4,
  },
  {
    id: "nakuru",
    name: "Lake Nakuru National Park",
    country: "Kenya",
    description:
      "A sanctuary for rhinos and flamingos set against the backdrop of the Great Rift Valley, featuring dramatic escarpments and acacia woodlands.",
    image: "/images/beautiful-shot-three-cute-giraffes-field-with-trees-blue-sky.webp",
    images: [
      "/images/beautiful-shot-three-cute-giraffes-field-with-trees-blue-sky.webp",
      "/images/pexels-taryn-elliott-5214036.webp",
      "/images/pexels-sulimansallehi-1586662.webp",
    ],
    safariCount: 5,
  },
  {
    id: "naivasha",
    name: "Lake Naivasha",
    country: "Kenya",
    description:
      "A beautiful freshwater lake in the Rift Valley, perfect for boat safaris, birdwatching, and exploring Crescent Island.",
    image: "/images/olga-budko-bFmjyv5uiAU-unsplash.webp",
    images: [
      "/images/olga-budko-bFmjyv5uiAU-unsplash.webp",
      "/images/alex-ning-0OI3i8bqjkk-unsplash.webp",
      "/images/mauro-lima-TN4KWAupi44-unsplash.webp",
    ],
    safariCount: 4,
  },
  {
    id: "amboseli",
    name: "Amboseli National Park",
    country: "Kenya",
    description:
      "Famous for its large elephant herds and the most iconic views of Mount Kilimanjaro towering over the plains.",
    image: "/images/amboseli-real.webp",
    images: [
      "/images/amboseli-real.webp",
      "/images/amboseli-final.webp",
      "/images/mount-kenya.webp",
    ],
    safariCount: 5,
  },
];
