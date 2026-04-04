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
  // Kenya
  {
    id: "masai-mara",
    name: "Masai Mara",
    country: "Kenya",
    description: "Kenya's legendary wildlife reserve — home to the Great Migration, magnificent lions, and sprawling golden savannah landscapes.",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg",
    images: [
      "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg",
      "https://images.pexels.com/photos/2862070/pexels-photo-2862070.jpeg"
    ],
    safariCount: 12,
  },
  {
    id: "amboseli",
    name: "Amboseli National Park",
    country: "Kenya",
    description: "Dramatic Kilimanjaro views meet massive African elephant herds wandering through this incredibly photogenic iconic park.",
    image: "https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg",
    images: [
      "https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg",
      "https://images.pexels.com/photos/2615535/pexels-photo-2615535.jpeg"
    ],
    safariCount: 8,
  },
  {
    id: "lamu",
    name: "Lamu Archipelago",
    country: "Kenya",
    description: "Kenya's Swahili coast escape — heritage towns, dhow culture, and laid-back island charm.",
    image: "/images/ancient-ceramic-pots-found-ruins-building-pompeii-italy.jpg",
    safariCount: 6,
  },
  {
    id: "tsavo",
    name: "Tsavo National Park",
    country: "Kenya",
    description: "Kenya's largest park — red elephants, ancient lava flows, and raw wilderness far from the crowds.",
    image: "/images/pile-stones-with-city-background.jpg",
    safariCount: 7,
  },
  {
    id: "diani",
    name: "Diani Beach",
    country: "Kenya",
    description: "White sand, turquoise waters, and coral reefs along Kenya's stunning southern coast.",
    image: "/images/pexels-abelalemseged-17272121.jpg",
    safariCount: 5,
  },

  // Tanzania
  {
    id: "serengeti",
    name: "Serengeti",
    country: "Tanzania",
    description: "Vast golden plains — front-row access to the Great Migration, big cats, and world-class game viewing.",
    image: "/images/pexels-alexandra-karnasopoulos-1962842-4017572.jpg",
    safariCount: 14,
  },
  {
    id: "ngorongoro",
    name: "Ngorongoro Crater",
    country: "Tanzania",
    description: "The world's largest intact volcanic caldera — a natural wildlife amphitheater teeming with animals.",
    image: "/images/pexels-andname-5536965.jpg",
    safariCount: 9,
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    description: "Spice island magic — Indian Ocean beaches, Stone Town heritage, and barefoot luxury.",
    image: "/images/pexels-joaoaguiar-7731450.jpg",
    safariCount: 8,
  },
  {
    id: "kilimanjaro",
    name: "Mount Kilimanjaro",
    country: "Tanzania",
    description: "Africa's highest peak — conquer the roof of the continent through five distinct climate zones.",
    image: "/images/pexels-kureng-workx-2546437-4314681.jpg",
    safariCount: 6,
  },
  {
    id: "tarangire",
    name: "Tarangire National Park",
    country: "Tanzania",
    description: "Baobab-studded plains, massive elephant herds, and quiet game drives away from the tourist trail.",
    image: "/images/pexels-kureng-workx-2546437-7637401.jpg",
    safariCount: 7,
  },

  // Uganda
  {
    id: "bwindi",
    name: "Bwindi Impenetrable Forest",
    country: "Uganda",
    description: "Uganda's emerald rainforest — home to half the world's mountain gorillas and deeply immersive trekking.",
    image: "/images/pexels-lan-yao-324969-20879645.jpg",
    safariCount: 6,
  },
  {
    id: "queen-elizabeth",
    name: "Queen Elizabeth National Park",
    country: "Uganda",
    description: "Tree-climbing lions, Kazinga Channel boat cruises, and stunning Rift Valley scenery.",
    image: "/images/pexels-marri-shyam-366418-7463697.jpg",
    safariCount: 5,
  },
  {
    id: "murchison-falls",
    name: "Murchison Falls",
    country: "Uganda",
    description: "The Nile's most dramatic moment — thundering through a 7-meter gap surrounded by pristine savannah.",
    image: "/images/pexels-ross-green-2159326053-36048575.jpg",
    safariCount: 4,
  },

  // Rwanda
  {
    id: "volcanoes-rwanda",
    name: "Volcanoes National Park",
    country: "Rwanda",
    description: "Misty volcanic slopes — golden monkey treks, gorilla encounters, and luxury eco-lodges in the clouds.",
    image: "/images/pexels-sulimansallehi-1586662.jpg",
    safariCount: 5,
  },
  {
    id: "akagera",
    name: "Akagera National Park",
    country: "Rwanda",
    description: "Rwanda's Big Five park — savannah, wetlands, and lakes in a stunning conservation success story.",
    image: "/images/pexels-taryn-elliott-5214036.jpg",
    safariCount: 4,
  },
  {
    id: "lake-kivu",
    name: "Lake Kivu",
    country: "Rwanda",
    description: "Emerald waters nestled between volcanic peaks — kayaking, cycling, and lakeside serenity.",
    image: "/images/beautiful-shot-three-cute-giraffes-field-with-trees-blue-sky.jpg",
    safariCount: 3,
  },

  // Ethiopia
  {
    id: "simien-mountains",
    name: "Simien Mountains",
    country: "Ethiopia",
    description: "Dramatic escarpments, endemic gelada baboons, and some of Africa's most spectacular trekking.",
    image: "/images/pexels-maasai-magic-3752887-5574091.jpg",
    safariCount: 4,
  },
  {
    id: "lalibela",
    name: "Lalibela",
    country: "Ethiopia",
    description: "Ancient rock-hewn churches carved from living stone — a spiritual and architectural wonder of the world.",
    image: "/images/ancient-ceramic-pots-found-ruins-building-pompeii-italy.jpg",
    safariCount: 3,
  },

  // South Africa
  {
    id: "kruger",
    name: "Kruger National Park",
    country: "South Africa",
    description: "Africa's most famous Big Five destination — world-class lodges and unmatched wildlife diversity.",
    image: "/images/pile-stones-with-city-background.jpg",
    safariCount: 10,
  },
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    description: "Where mountains meet ocean — Table Mountain, Cape Point, and vibrant culture at Africa's southern tip.",
    image: "/images/pexels-abelalemseged-17272121.jpg",
    safariCount: 6,
  },

  // Premium Hotels & Lounges
  {
    id: "mara-safari-club",
    name: "Mara Safari Lodge & Lounge",
    country: "Premium Hotels & Lounges",
    description: "Experience absolute luxury in the wild. A truly authentic safari lodge featuring opulent accommodations, a world-class outdoor lounge, and exquisite dining with uninterrupted views of the majestic plains.",
    image: "https://images.pexels.com/photos/8968154/pexels-photo-8968154.jpeg",
    images: [
      "https://images.pexels.com/photos/8968154/pexels-photo-8968154.jpeg",
      "https://images.pexels.com/photos/1565326/pexels-photo-1565326.jpeg"
    ],
    safariCount: 1,
  },
  {
    id: "zanzibar-beach-resort",
    name: "Serengeti Oasis Lodge",
    country: "Premium Hotels & Lounges",
    description: "A breathtaking exclusive bush retreat. Features beautiful rustic-chic lodges, an incredible evening campfire lounge under the stars, and an elevated vantage point over the wilderness.",
    image: "https://images.pexels.com/photos/35074968/pexels-photo-35074968.jpeg",
    images: [
      "https://images.pexels.com/photos/35074968/pexels-photo-35074968.jpeg",
      "https://images.pexels.com/photos/7163685/pexels-photo-7163685.jpeg"
    ],
    safariCount: 1,
  },
];
