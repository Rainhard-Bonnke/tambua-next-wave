export interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Odilliah Mwangi",
    title: "Medical Professional, Nairobi",
    quote: "Tambua Africa gave us an unforgettable family safari experience. The attention to detail and knowledge of the guides was exceptional. We saw the Big Five in just two days!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
  },
  {
    id: "2",
    name: "Dr. Marco Palca",
    title: "Wildlife Researcher, Italy",
    quote: "As a wildlife researcher, I've worked with many tour operators across Africa. Tambua stands out for their deep respect for nature and commitment to sustainable tourism.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    rating: 5,
  },
  {
    id: "3",
    name: "Eng. Briscan Odhiambo",
    title: "Engineer, Mombasa",
    quote: "The beach holiday package was absolutely perfect. From the moment we arrived in Diani, everything was taken care of. Professional service from start to finish.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
  },
  {
    id: "4",
    name: "Dr. Amos Kimutai",
    title: "University Lecturer, Eldoret",
    quote: "I've booked three different safaris with Tambua Africa over the past five years. Each experience has been unique and memorable. They truly understand what makes Kenya special.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    rating: 5,
  },
];
