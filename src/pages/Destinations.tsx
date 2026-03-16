import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { destinations } from "@/data/destinations";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Destinations = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <PageTransition>
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 bg-primary text-primary-foreground">
          <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Explore</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Our Destinations</h1>
            <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto text-lg">
              From sweeping savannahs to tropical coastlines, explore Kenya's most spectacular destinations.
            </p>
          </div>
        </section>

        <section className="section-padding bg-background" ref={ref}>
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest, index) => (
                <div
                  key={dest.id}
                  className={`group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-2xl">{dest.name}</h3>
                    <p className="text-white/70 text-sm mt-2">{dest.description}</p>
                    <Link
                      to="/safaris"
                      className="inline-flex items-center gap-2 mt-3 text-accent text-sm font-semibold hover:gap-3 transition-all"
                    >
                      {dest.safariCount} Safari Packages <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default Destinations;
