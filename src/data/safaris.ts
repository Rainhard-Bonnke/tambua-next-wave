export interface Safari {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  highlights: string[];
  category: string;
  stripePriceId: string;
}

export const safaris: Safari[] = [
  {
    id: "masai-mara-serengeti-circuit",
    title: "Masai Mara & Serengeti Circuit",
    location: "Kenya & Tanzania",
    duration: "7 Days / 6 Nights",
    price: 2890,
    rating: 4.9,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    description: "Track the Great Migration across two iconic ecosystems with big-cat sightings, dramatic river crossings, and unforgettable savannah sunsets.",
    highlights: ["Great Migration Route", "Big Five Game Drives", "Cross-Border Safari"],
    category: "Wildlife Safari",
    stripePriceId: "price_1TDSADDpOZ9uljPIUswwk5k6",
  },
  {
    id: "amboseli-tarangire-trails",
    title: "Amboseli & Tarangire Elephant Trails",
    location: "Kenya & Tanzania",
    duration: "5 Days / 4 Nights",
    price: 1840,
    rating: 4.8,
    reviews: 214,
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    description: "Pair Amboseli's Kilimanjaro panoramas with Tarangire's baobab-studded plains for a classic elephant-focused adventure.",
    highlights: ["Kilimanjaro Views", "Large Elephant Herds", "Baobab Landscapes"],
    category: "Wildlife Safari",
    stripePriceId: "price_1TDSAgDpOZ9uljPIufzHnnB1",
  },
  {
    id: "uganda-gorilla-escape",
    title: "Uganda Gorilla Escape",
    location: "Bwindi, Uganda",
    duration: "4 Days / 3 Nights",
    price: 2390,
    rating: 4.9,
    reviews: 176,
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    description: "Journey into Bwindi Impenetrable Forest for a once-in-a-lifetime gorilla trekking experience with rich rainforest scenery.",
    highlights: ["Gorilla Trekking", "Rainforest Lodge Stay", "Community Visit"],
    category: "Wildlife Safari",
    stripePriceId: "price_1TDSAmDpOZ9uljPIU1VEn7wW",
  },
  {
    id: "zanzibar-bush-beach",
    title: "Zanzibar Bush to Beach Escape",
    location: "Tanzania",
    duration: "6 Days / 5 Nights",
    price: 1980,
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    description: "Blend a short northern Tanzania safari with turquoise-water downtime on Zanzibar's spice-scented coast.",
    highlights: ["Stone Town Tour", "Indian Ocean Beaches", "Safari Extension"],
    category: "Beach Holiday",
    stripePriceId: "price_1TDSAnDpOZ9uljPI0qMCYgD7",
  },
  {
    id: "rwanda-primates-culture",
    title: "Rwanda Primates & Culture Journey",
    location: "Rwanda",
    duration: "5 Days / 4 Nights",
    price: 2640,
    rating: 4.8,
    reviews: 133,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    description: "Explore Rwanda through primate encounters, lake scenery, and immersive cultural experiences anchored by premium local hospitality.",
    highlights: ["Volcanoes National Park", "Kigali City Tour", "Lake Kivu Retreat"],
    category: "Cultural Tour",
    stripePriceId: "price_1TDSApDpOZ9uljPI7dMRcShK",
  },
  {
    id: "lamu-swahili-coastline",
    title: "Lamu & Swahili Coastline Retreat",
    location: "Kenya",
    duration: "4 Days / 3 Nights",
    price: 920,
    rating: 4.8,
    reviews: 151,
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    description: "Slow down on Kenya's historic coast with dhow cruises, Swahili architecture, and barefoot island relaxation.",
    highlights: ["UNESCO Heritage Walk", "Sunset Dhow Cruise", "Swahili Cuisine"],
    category: "Beach Holiday",
    stripePriceId: "price_1TDSAqDpOZ9uljPIxcWH53hR",
  },
];
