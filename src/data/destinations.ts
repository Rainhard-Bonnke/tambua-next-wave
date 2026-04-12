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
    image: "/images/destiations/Tsavo/voi safari lodge4.webp",
    images: [
      "/images/destiations/Tsavo/voi safari lodge4.webp",
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
    image: "/images/destiations/Samburu/Saruni.webp",
    images: [
      "/images/destiations/Samburu/Saruni.webp",
      "/images/destiations/Samburu/Sopa lodge.webp",
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
    image: "/images/destiations/Lake Nakuru/Ziwa bush lodge rooms.webp",
    images: [
      "/images/destiations/Lake Nakuru/Ziwa bush lodge rooms.webp",
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
  {
    id: "diani",
    name: "Diani Beach",
    country: "Kenya",
    description:
      "Voted regularly as Africa's leading beach destination, Diani Beach is a stunning tropical paradise boasting endless stretches of powdery white sand, swaying palms, and warm, crystal-clear turquoise waters. Dive into vibrant coral reefs, indulge in rich Swahili culture, and unwind in world-class resorts along the spectacular Kenyan coast.",
    image: "/images/diani-beach-coast.webp",
    images: [
      "/images/diani-beach-coast.webp",
      "/images/diani-beach.webp",
      "/images/destiations/Diani/diani-beach-new.webp",
      "/images/destiations/Diani/diani-beach-sunset.webp",
      "/images/destiations/Diani/diani-beach-resort.webp",
    ],
    safariCount: 2,
  },
  {
    id: "chale-island",
    name: "Chale Island",
    country: "Kenya",
    description:
      "A breathtaking private coral island rising from the turquoise Indian Ocean off Diani Beach — Kenya's most exclusive island escape, accessible only by boat.",
    image: "/images/Chale Island.jpg",
    images: [
      "/images/Chale Island.jpg",
      "/images/chale Hotel.jpg",
      "/images/chale-extra-1.png",
      "/images/chale-extra-2.png",
      "/images/chale-extra-3.png",
    ],
    safariCount: 1,
  },
  {
    id: "watamu",
    name: "Watamu",
    country: "Kenya",
    description:
      "A pristine coastal paradise north of Mombasa, where the Indian Ocean meets Kenya's most spectacular marine park — famous for coral reefs, sea turtles, world-class game fishing, and warm turquoise waters.",
    image: "/images/watamu-beach.png",
    images: [
      "/images/watamu-beach.png",
      "/images/watamu-hotel.png",
      "/images/watamu-bay.png",
    ],
    safariCount: 1,
  },
  {
    id: "wasini",
    name: "Wasini Island",
    country: "Kenya",
    description:
      "A serene, vehicle-free coral island off Kenya's southern coast. Gateway to Kisite Mpunguti Marine Park, offering spectacular dolphin spotting, pristine snorkeling, and authentic Swahili culture.",
    image: "/images/diani-beach.webp",
    images: [
      "/images/diani-beach.webp",
      "/images/wasini-island-1.png",
      "/images/wasini-island-2.png",
    ],
    safariCount: 1,
  },
  {
    id: "mombasa-north-coast",
    name: "Mombasa North Coast",
    country: "Kenya",
    description:
      "A vibrant stretch of white sandy beaches along the Indian Ocean, featuring lively resorts, historical sites like Fort Jesus, and excellent warm-water marine life.",
    image: "/images/wasini-island-1.png",
    images: [
      "/images/wasini-island-1.png",
      "/images/mombasa-north-1.png",
      "/images/mombasa-north-2.png",
      "/images/mombasa-north-3.png",
    ],
    safariCount: 1,
  },
];
