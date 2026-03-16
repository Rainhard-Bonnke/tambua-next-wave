import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const partners = [
  { name: "Kenya Wildlife Service", initials: "KWS" },
  { name: "Kenya Tourism Board", initials: "KTB" },
  { name: "KATO", initials: "KATO" },
  { name: "TripAdvisor", initials: "TA" },
  { name: "Safari Bookings", initials: "SB" },
  { name: "Eco Tourism Kenya", initials: "ETK" },
  { name: "IATA", initials: "IATA" },
  { name: "UN Tourism", initials: "UNT" },
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

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-background border border-border hover:shadow-md hover:border-accent/30 transition-all cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <span className="text-primary font-bold text-sm">{partner.initials}</span>
              </div>
              <span className="text-xs text-muted-foreground text-center font-medium leading-tight">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
