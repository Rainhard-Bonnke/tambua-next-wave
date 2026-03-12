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
}

export const safaris: Safari[] = [
  {
    id: "masai-mara-classic",
    title: "Masai Mara Classic Safari",
    location: "Masai Mara, Kenya",
    duration: "4 Days / 3 Nights",
    price: 1250,
    rating: 4.9,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    description: "Experience the iconic Masai Mara with game drives, cultural visits, and breathtaking landscapes.",
    highlights: ["Big Five Game Drives", "Maasai Village Visit", "Sunrise Balloon Safari"],
    category: "Wildlife Safari",
  },
  {
    id: "amboseli-elephant",
    title: "Amboseli Elephant Experience",
    location: "Amboseli, Kenya",
    duration: "3 Days / 2 Nights",
    price: 890,
    rating: 4.8,
    reviews: 218,
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    description: "Get up close with Africa's gentle giants against the backdrop of Mount Kilimanjaro.",
    highlights: ["Elephant Herds", "Mt. Kilimanjaro Views", "Observation Hill"],
    category: "Wildlife Safari",
  },
  {
    id: "diani-beach-escape",
    title: "Diani Beach Tropical Escape",
    location: "Diani Beach, Kenya",
    duration: "5 Days / 4 Nights",
    price: 1100,
    rating: 4.7,
    reviews: 186,
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    description: "Relax on white sandy beaches with crystal-clear waters on the Kenyan coast.",
    highlights: ["Snorkeling", "Dhow Sailing", "Marine Park Visit"],
    category: "Beach Holiday",
  },
  {
    id: "lake-nakuru-flamingo",
    title: "Lake Nakuru Flamingo Safari",
    location: "Lake Nakuru, Kenya",
    duration: "2 Days / 1 Night",
    price: 480,
    rating: 4.6,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    description: "Witness millions of flamingos and rare rhinos at this stunning Rift Valley lake.",
    highlights: ["Flamingo Flocks", "Rhino Sanctuary", "Baboon Cliff"],
    category: "Wildlife Safari",
  },
  {
    id: "tsavo-adventure",
    title: "Tsavo East & West Adventure",
    location: "Tsavo, Kenya",
    duration: "4 Days / 3 Nights",
    price: 950,
    rating: 4.7,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    description: "Explore Kenya's largest national park with its famous red elephants and diverse wildlife.",
    highlights: ["Red Elephants", "Mzima Springs", "Lugard Falls"],
    category: "Wildlife Safari",
  },
  {
    id: "lamu-cultural",
    title: "Lamu Cultural Heritage Tour",
    location: "Lamu Island, Kenya",
    duration: "3 Days / 2 Nights",
    price: 720,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    description: "Discover the rich Swahili culture and UNESCO World Heritage architecture of Lamu.",
    highlights: ["Old Town Walking Tour", "Dhow Cruise", "Swahili Cooking Class"],
    category: "Cultural Tour",
  },
];
