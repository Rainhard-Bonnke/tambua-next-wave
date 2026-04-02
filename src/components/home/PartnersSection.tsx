import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const partners = [
  { name: "Kenya Wildlife Service", logo: "/images/logos/kws.png" },
  { name: "Magical Kenya", logo: "/images/logos/magical-kenya.png" },
  { name: "KATO", logo: "/images/logos/kato.png" },
  { name: "TripAdvisor", logo: "/images/logos/tripadvisor.svg" },
  { name: "Safari Bookings", logo: "/images/logos/safaribookings.png" },
  { name: "Eco Tourism Kenya", logo: "/images/logos/ecotourism.png" },
  { name: "IATA", logo: "/images/logos/iata.svg" },
  { name: "UN Tourism", logo: "/images/logos/un-tourism.svg" },
];

const PartnersSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 bg-card border-y border-border" ref={ref}>
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Trusted By</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">Our Partners & Affiliations</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 w-full object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
