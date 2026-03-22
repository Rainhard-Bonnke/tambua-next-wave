import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  // Wildlife
  { src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80", alt: "Elephants in Masai Mara", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=800&q=80", alt: "Wildebeest migration", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1504598318550-17eba1008a68?auto=format&fit=crop&w=800&q=80", alt: "Lion pride resting", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=800&q=80", alt: "Giraffe at sunrise", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80", alt: "Zebras on the savannah", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=800&q=80", alt: "Leopard in a tree", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?auto=format&fit=crop&w=800&q=80", alt: "Hippos in the river", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80", alt: "Cheetah on the hunt", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1611602132416-da82f09da0e9?auto=format&fit=crop&w=800&q=80", alt: "Elephants with Mt. Kilimanjaro", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", alt: "Flamingos at Lake Nakuru", category: "Wildlife" },

  // Beach
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", alt: "Tropical beach paradise", category: "Beach" },
  { src: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80", alt: "Zanzibar coast", category: "Beach" },
  { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80", alt: "Crystal clear waters", category: "Beach" },
  { src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80", alt: "Sunset on the Indian Ocean", category: "Beach" },

  // Landscape
  { src: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80", alt: "Tsavo landscape", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=800&q=80", alt: "Kilimanjaro at dawn", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80", alt: "Mountain peaks at sunrise", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", alt: "African lake at golden hour", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1432405972618-c6b0cfba8673?auto=format&fit=crop&w=800&q=80", alt: "Dramatic waterfall", category: "Landscape" },

  // Safari
  { src: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&w=800&q=80", alt: "Safari jeep at sunset", category: "Safari" },
  { src: "https://images.unsplash.com/photo-1612891130437-82e4e3d974a4?auto=format&fit=crop&w=800&q=80", alt: "Game drive experience", category: "Safari" },
  { src: "https://images.unsplash.com/photo-1534177616064-ef1fc0283e42?auto=format&fit=crop&w=800&q=80", alt: "Open safari vehicle", category: "Safari" },

  // Culture
  { src: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?auto=format&fit=crop&w=800&q=80", alt: "Swahili architecture", category: "Culture" },
  { src: "https://images.unsplash.com/photo-1580746738099-1d1489f59a82?auto=format&fit=crop&w=800&q=80", alt: "Ethiopian heritage site", category: "Culture" },
  { src: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80", alt: "Cape Town cityscape", category: "Culture" },

  // Gorilla
  { src: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80", alt: "Mountain gorilla in Bwindi", category: "Gorilla" },
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
              A glimpse into the breathtaking experiences that await you across East Africa.
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
              src={filtered[lightbox].src.replace("w=800", "w=1400")}
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
