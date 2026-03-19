import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/data/destinations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const DestinationsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-wide mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Destinations</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Explore East Africa</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            From Kenya's savannahs to Uganda's rainforests and Tanzania's island coast, discover a richer East Africa travel map.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {destinations.map((dest, index) => (
            <Link
              key={dest.id}
              to="/destinations"
              className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                index === 0 ? "col-span-2 lg:col-span-1 row-span-2 aspect-square" : "aspect-[4/3]"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h3 className="text-white font-bold text-lg sm:text-xl">{dest.name}</h3>
                <p className="text-white/70 text-xs sm:text-sm mt-1 hidden sm:block">{dest.description}</p>
                <div className="flex items-center gap-2 mt-2 text-accent text-sm font-medium">
                  {dest.safariCount} Safaris <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
