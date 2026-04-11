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
    image: "/images/destiations/Tsavo/Chilling kilaguni serena lodge.webp",
    images: [
      "/images/destiations/Tsavo/Chilling kilaguni serena lodge.webp",
      "/images/destiations/Tsavo/Kilaguni serena safari lodge food sfood.webp",
      "/images/destiations/Tsavo/Kilaguni lodge.webp",
    ],
    safariCount: 5,
  },
  {
    id: "masai-mara",
    name: "Maasai Mara",
    country: "Kenya",
    description:
      "The world-renowned home of the Great Migration, offering the highest density of predators and breath-taking savannah vistas.",
    image: "/images/destiations/Maasai Mara/masai mara sopa lodge.webp",
    images: [
      "/images/destiations/Maasai Mara/masai mara sopa lodge.webp",
      "/images/destiations/Maasai Mara/bonfire marariver.webp",
      "/images/destiations/Maasai Mara/Mara river standard lodge.webp",
    ],
    safariCount: 6,
  },
  {
    id: "samburu",
    name: "Samburu National Reserve",
    country: "Kenya",
    description:
      "A rugged northern frontier known for rare wildlife species, the Ewaso Ng'iro River, and the vibrant Samburu culture.",
    image: "/images/destiations/Samburu/Saruni Bonfire.webp",
    images: [
      "/images/destiations/Samburu/Saruni Bonfire.webp",
      "/images/destiations/Samburu/Sopa resort.webp",
      "/images/destiations/Samburu/Game drive samburu lodge river side.webp",
    ],
    safariCount: 4,
  },
  {
    id: "nakuru",
    name: "Lake Nakuru National Park",
    country: "Kenya",
    description:
      "A sanctuary for rhinos and flamingos set against the backdrop of the Great Rift Valley, featuring dramatic escarpments and acacia woodlands.",
    image: "/images/destiations/Lake Nakuru/Lake Nakutu lodge.webp",
    images: [
      "/images/destiations/Lake Nakuru/Lake Nakutu lodge.webp",
      "/images/destiations/Lake Nakuru/ziwa lodge ambience.webp",
      "/images/destiations/Lake Nakuru/Ziwa bush lodge night view.webp",
    ],
    safariCount: 5,
  },
  {
    id: "naivasha",
    name: "Lake Naivasha",
    country: "Kenya",
    description:
      "A beautiful freshwater lake in the Rift Valley, perfect for boat safaris, birdwatching, and exploring Crescent Island.",
    image: "/images/destiations/Lake Naivash/Sopa resort.webp",
    images: [
      "/images/destiations/Lake Naivash/Sopa resort.webp",
      "/images/destiations/Lake Naivash/Sopa boat rides.webp",
      "/images/destiations/Lake Naivash/Kongoni lodge.webp",
    ],
    safariCount: 4,
  },
  {
    id: "amboseli",
    name: "Amboseli National Park",
    country: "Kenya",
    description:
      "Famous for its large elephant herds and the most iconic views of Mount Kilimanjaro towering over the plains.",
    image: "/images/destiations/Ambosel/Tawi lodge.webp",
    images: [
      "/images/destiations/Ambosel/Tawi lodge.webp",
      "/images/destiations/Ambosel/Oloitukai.webp",
      "/images/destiations/Ambosel/kibo.webp",
    ],
    safariCount: 5,
  },
];
