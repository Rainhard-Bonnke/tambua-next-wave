import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { X } from "lucide-react";

const photos = [
  { src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80", alt: "Elephants in Masai Mara", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80", alt: "Wildebeest migration", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80", alt: "Diani Beach sunset", category: "Beach" },
  { src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80", alt: "Flamingos at Lake Nakuru", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80", alt: "Tsavo landscape", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80", alt: "Lamu architecture", category: "Culture" },
  { src: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80", alt: "Safari jeep at sunset", category: "Safari" },
  { src: "https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=800&q=80", alt: "Lion pride resting", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80", alt: "Giraffe at sunrise", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=800&q=80", alt: "Tropical beach", category: "Beach" },
  { src: "https://images.unsplash.com/photo-1612690669207-fed642192c40?w=800&q=80", alt: "Hot air balloon safari", category: "Safari" },
  { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80", alt: "African sunset", category: "Landscape" },
];

const categories = ["All", "Wildlife", "Beach", "Landscape", "Safari", "Culture"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 bg-primary text-primary-foreground">
          <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Gallery</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Safari Moments</h1>
            <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto text-lg">
              A glimpse into the breathtaking experiences that await you in East Africa.
            </p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-wide mx-auto">
            <div className="flex items-center gap-2 mb-8 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => setLightbox(i)}
                >
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                      <span className="text-white text-sm font-medium p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        {photo.alt}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={() => setLightbox(null)}>
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={filtered[lightbox].src.replace("w=800", "w=1400")}
              alt={filtered[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
