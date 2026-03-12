export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  safariCount: number;
}

export const destinations: Destination[] = [
  {
    id: "masai-mara",
    name: "Masai Mara",
    description: "Kenya's most iconic wildlife reserve, home to the Great Migration.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    safariCount: 12,
  },
  {
    id: "amboseli",
    name: "Amboseli",
    description: "Famous for large elephant herds and stunning views of Mount Kilimanjaro.",
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    safariCount: 8,
  },
  {
    id: "diani-beach",
    name: "Diani Beach",
    description: "Award-winning white sand beaches on Kenya's stunning south coast.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    safariCount: 6,
  },
  {
    id: "tsavo",
    name: "Tsavo",
    description: "Kenya's largest park, known for red elephants and vast wilderness.",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    safariCount: 10,
  },
  {
    id: "lake-nakuru",
    name: "Lake Nakuru",
    description: "A flamingo paradise and rhino sanctuary in the Great Rift Valley.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    safariCount: 5,
  },
  {
    id: "lamu",
    name: "Lamu Island",
    description: "A UNESCO World Heritage Site with rich Swahili culture and architecture.",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    safariCount: 4,
  },
];
