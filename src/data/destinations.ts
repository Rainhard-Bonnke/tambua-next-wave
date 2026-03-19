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
    description: "Kenya's legendary wildlife reserve and one of East Africa's most iconic safari landscapes.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    safariCount: 12,
  },
  {
    id: "serengeti",
    name: "Serengeti",
    description: "Tanzania's vast plains deliver world-class game viewing and front-row access to the Great Migration.",
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    safariCount: 10,
  },
  {
    id: "bwindi",
    name: "Bwindi Forest",
    description: "Uganda's emerald rainforest is home to mountain gorillas and deeply immersive trekking adventures.",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    safariCount: 5,
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    description: "Tanzania's spice island blends Indian Ocean beaches, historic Stone Town, and barefoot luxury.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    safariCount: 7,
  },
  {
    id: "volcanoes-rwanda",
    name: "Volcanoes National Park",
    description: "Rwanda's misty volcanic slopes offer primate encounters, scenic trails, and luxury eco-lodges.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    safariCount: 4,
  },
  {
    id: "lamu",
    name: "Lamu Archipelago",
    description: "Kenya's Swahili coast escape brings together heritage towns, dhow culture, and laid-back island charm.",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    safariCount: 6,
  },
];
