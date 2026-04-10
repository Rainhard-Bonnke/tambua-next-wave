import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: "/images/beautiful-shot-three-cute-giraffes-field-with-trees-blue-sky.webp", alt: "Giraffes in the wild", category: "Wildlife" },
  { src: "/images/pexels-maasai-magic-3752887-5574091.webp", alt: "Maasai Magic", category: "Culture" },
  { src: "/images/ancient-ceramic-pots-found-ruins-building-pompeii-italy.webp", alt: "Ancient Ruins", category: "Culture" },
  { src: "/images/pile-stones-with-city-background.webp", alt: "Cityscape Stones", category: "Landscape" },
  { src: "/images/pexels-abelalemseged-17272121.webp", alt: "African Scenery", category: "Landscape" },
  { src: "/images/pexels-alexandra-karnasopoulos-1962842-4017572.webp", alt: "Safari Adventure", category: "Safari" },
  { src: "/images/pexels-andname-5536965.webp", alt: "Scenic Views", category: "Landscape" },
  { src: "/images/pexels-joaoaguiar-7731450.webp", alt: "Wildlife Moments", category: "Wildlife" },
  { src: "/images/pexels-kureng-workx-2546437-4314681.webp", alt: "Safari Highlights", category: "Safari" },
  { src: "/images/pexels-kureng-workx-2546437-7637401.webp", alt: "Safari Expedition", category: "Safari" },
  { src: "/images/pexels-lan-yao-324969-20879645.webp", alt: "Nature Detail", category: "Landscape" },
  { src: "/images/pexels-marri-shyam-366418-7463697.webp", alt: "Beautiful Horizon", category: "Landscape" },
  { src: "/images/pexels-ross-green-2159326053-36048575.webp", alt: "Cultural Portrait", category: "Culture" },
  { src: "/images/pexels-sulimansallehi-1586662.webp", alt: "Animal Sightings", category: "Wildlife" },
  { src: "/images/pexels-taryn-elliott-5214036.webp", alt: "Beach Retreat", category: "Beach" },
];

const categories = ["All", "Wildlife", "Beach", "Landscape", "Safari", "Culture", "Gorilla"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory);

  const navigateLightbox = (dir: 1 | -1) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + filtered.length) % filtered.length);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 bg-primary text-primary-foreground">
          <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Gallery</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Safari Moments</h1>
            <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto text-lg">
              A glimpse into the breathtaking experiences that await you across Kenya.
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
                  transition={{ duration: 0.4, delay: i * 0.03 }}
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

      {/* Lightbox with navigation */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white z-10" onClick={() => setLightbox(null)}>
              <X className="w-8 h-8" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 p-2"
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 p-2"
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <motion.img
              key={filtered[lightbox].src}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 text-white/70 text-sm">
              {lightbox + 1} / {filtered.length} — {filtered[lightbox].alt}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
