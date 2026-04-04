import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { destinations } from "@/data/destinations";
import { ArrowRight, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ImageSlider = ({ images, name }: { images: string[], name: string }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${name} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      ))}
    </>
  );
};

const Destinations = () => {
  const { ref, isVisible } = useScrollAnimation();

  // Group destinations by country
  const countries = [...new Set(destinations.map((d) => d.country))];
  const grouped = countries.map((country) => ({
    country,
    items: destinations.filter((d) => d.country === country),
  }));

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <section className="relative pt-32 pb-20 bg-primary text-primary-foreground">
            <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Explore Africa</span>
              <h1 className="text-4xl sm:text-5xl font-bold mt-3">Our Destinations</h1>
              <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto text-lg">
                From Kenya's savannahs to Ethiopia's ancient highlands — discover East Africa and beyond through unforgettable safari, cultural, and coastal experiences.
              </p>
            </div>
          </section>

          <section className="section-padding bg-background" ref={ref}>
            <div className="container-wide mx-auto">
              {grouped.map((group, gi) => (
                <div key={group.country} className="mb-16 last:mb-0">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-5 h-5 text-accent" />
                    <h2 className="text-2xl font-bold text-foreground">{group.country}</h2>
                    <span className="text-sm text-muted-foreground">({group.items.length} destinations)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.items.map((dest, index) => (
                      <div
                        key={dest.id}
                        className={`group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-500 ${
                          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: `${(gi * 3 + index) * 80}ms` }}
                      >
                        <ImageSlider images={dest.images || [dest.image]} name={dest.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-white font-bold text-xl">{dest.name}</h3>
                          <p className="text-white/70 text-sm mt-2 line-clamp-2">{dest.description}</p>
                          <div className="flex items-center gap-2 mt-3 text-accent text-sm font-semibold">
                            {dest.safariCount} Hotels & Lounges
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Destinations;
