export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  safariCount: number;
}

export const destinations: Destination[] = [
  // Kenya
  {
    id: "masai-mara",
    name: "Masai Mara",
    country: "Kenya",
    description: "Kenya's legendary wildlife reserve — home to the Great Migration and one of Africa's most iconic safari landscapes.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    safariCount: 12,
  },
  {
    id: "amboseli",
    name: "Amboseli National Park",
    country: "Kenya",
    description: "Dramatic Kilimanjaro views meet large elephant herds in one of Kenya's most photogenic parks.",
    image: "https://images.unsplash.com/photo-1612891130437-82e4e3d974a4?w=800&q=80",
    safariCount: 8,
  },
  {
    id: "lamu",
    name: "Lamu Archipelago",
    country: "Kenya",
    description: "Kenya's Swahili coast escape — heritage towns, dhow culture, and laid-back island charm.",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    safariCount: 6,
  },
  {
    id: "tsavo",
    name: "Tsavo National Park",
    country: "Kenya",
    description: "Kenya's largest park — red elephants, ancient lava flows, and raw wilderness far from the crowds.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    safariCount: 7,
  },
  {
    id: "diani",
    name: "Diani Beach",
    country: "Kenya",
    description: "White sand, turquoise waters, and coral reefs along Kenya's stunning southern coast.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    safariCount: 5,
  },

  // Tanzania
  {
    id: "serengeti",
    name: "Serengeti",
    country: "Tanzania",
    description: "Vast golden plains — front-row access to the Great Migration, big cats, and world-class game viewing.",
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    safariCount: 14,
  },
  {
    id: "ngorongoro",
    name: "Ngorongoro Crater",
    country: "Tanzania",
    description: "The world's largest intact volcanic caldera — a natural wildlife amphitheater teeming with animals.",
    image: "https://images.unsplash.com/photo-1621414050946-1b936a78426f?w=800&q=80",
    safariCount: 9,
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    description: "Spice island magic — Indian Ocean beaches, Stone Town heritage, and barefoot luxury.",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80",
    safariCount: 8,
  },
  {
    id: "kilimanjaro",
    name: "Mount Kilimanjaro",
    country: "Tanzania",
    description: "Africa's highest peak — conquer the roof of the continent through five distinct climate zones.",
    image: "https://images.unsplash.com/photo-1621414050945-18be31bab874?w=800&q=80",
    safariCount: 6,
  },
  {
    id: "tarangire",
    name: "Tarangire National Park",
    country: "Tanzania",
    description: "Baobab-studded plains, massive elephant herds, and quiet game drives away from the tourist trail.",
    image: "https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=800&q=80",
    safariCount: 7,
  },

  // Uganda
  {
    id: "bwindi",
    name: "Bwindi Impenetrable Forest",
    country: "Uganda",
    description: "Uganda's emerald rainforest — home to half the world's mountain gorillas and deeply immersive trekking.",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    safariCount: 6,
  },
  {
    id: "queen-elizabeth",
    name: "Queen Elizabeth National Park",
    country: "Uganda",
    description: "Tree-climbing lions, Kazinga Channel boat cruises, and stunning Rift Valley scenery.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    safariCount: 5,
  },
  {
    id: "murchison-falls",
    name: "Murchison Falls",
    country: "Uganda",
    description: "The Nile's most dramatic moment — thundering through a 7-meter gap surrounded by pristine savannah.",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80",
    safariCount: 4,
  },

  // Rwanda
  {
    id: "volcanoes-rwanda",
    name: "Volcanoes National Park",
    country: "Rwanda",
    description: "Misty volcanic slopes — golden monkey treks, gorilla encounters, and luxury eco-lodges in the clouds.",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
    safariCount: 5,
  },
  {
    id: "akagera",
    name: "Akagera National Park",
    country: "Rwanda",
    description: "Rwanda's Big Five park — savannah, wetlands, and lakes in a stunning conservation success story.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    safariCount: 4,
  },
  {
    id: "lake-kivu",
    name: "Lake Kivu",
    country: "Rwanda",
    description: "Emerald waters nestled between volcanic peaks — kayaking, cycling, and lakeside serenity.",
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=80",
    safariCount: 3,
  },

  // Ethiopia
  {
    id: "simien-mountains",
    name: "Simien Mountains",
    country: "Ethiopia",
    description: "Dramatic escarpments, endemic gelada baboons, and some of Africa's most spectacular trekking.",
    image: "https://images.unsplash.com/photo-1580746738099-1d1489f59a82?w=800&q=80",
    safariCount: 4,
  },
  {
    id: "lalibela",
    name: "Lalibela",
    country: "Ethiopia",
    description: "Ancient rock-hewn churches carved from living stone — a spiritual and architectural wonder of the world.",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    safariCount: 3,
  },

  // South Africa (bonus pan-African)
  {
    id: "kruger",
    name: "Kruger National Park",
    country: "South Africa",
    description: "Africa's most famous Big Five destination — world-class lodges and unmatched wildlife diversity.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    safariCount: 10,
  },
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    description: "Where mountains meet ocean — Table Mountain, Cape Point, and vibrant culture at Africa's southern tip.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
    safariCount: 6,
  },
];
