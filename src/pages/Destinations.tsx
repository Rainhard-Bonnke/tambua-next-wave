import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { destinations } from "@/data/destinations";
import { destinationLodges, Lodge } from "@/data/destinations-lodges";
import { ArrowRight, MapPin, Star, X, ChevronLeft, ChevronRight, Bed } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useAuth } from "@/contexts/AuthContext";
import OptimizedImage from "@/components/ui/optimized-image";

// ─────────────────────────────────────────────────────────
// Real destination features + story data
// ─────────────────────────────────────────────────────────
const destinationEnhancements: Record<string, { features: string[]; story: string }> = {
  "masai-mara": {
    features: [
      "The Great Migration: Witness up to 1.5 million wildebeest, zebras, and gazelles crossing the Mara River in the spectacle of nature's most dramatic annual event",
      "Exceptional predator viewing: One of Africa's highest concentrations of lions, leopards, and cheetahs—ideal for photography and wildlife encounters",
      "Pristine ecosystem: Covers 1,510 square kilometers of intact savannah with diverse habitats from riverine forests to open plains",
      "Maasai cultural immersion: Home to the Maasai people, offering authentic visits to traditional warrior bomas and insights into pastoral life",
    ],
    story:
      "Masai Mara stands as the crown jewel of African safaris, where the rhythm of nature beats in thunderous hoofbeats and golden dust clouds. Each year, the phenomenon of the Great Migration transforms the landscape into a living stage where survival hangs in the balance—thousands of wildebeest and zebras navigate crocodile-filled rivers while prides of lions watch from the grasslands. The Mara's amber plains stretch endlessly beneath impossibly vast African skies, where every game drive reveals a new chapter: a cheetah sprint at dawn, a rare leopard in an acacia tree, or a family of elephants moving serenely through the bush.",
  },
  amboseli: {
    features: [
      "Mount Kilimanjaro backdrop: Stunning views of Africa's highest peak (5,895m) framed by elephant herds, creating iconic photography opportunities",
      "Africa's finest elephant viewing: Over 1,600 elephants concentrate around wetlands, providing unparalleled observation experiences",
      "Volcanic geology: Ancient lava flows and ash deposits create the park's distinctive gray landscape and nutrient-rich wetlands",
      "Ol Tukai wetlands: Swampy groundwater-fed oasis supporting dense wildlife concentrations in otherwise arid terrain",
    ],
    story:
      "Amboseli National Park is where Africa's most iconic peak meets Africa's most magnificent giants, creating a landscape of timeless beauty and raw wilderness. The snow-capped crown of Mount Kilimanjaro dominates the horizon, a constant sentinel over fields of red dust where earth-toned elephant herds move with ancient grace.",
  },
  tsavo: {
    features: [
      "Africa's largest park complex: Tsavo East and West combine to create over 20,000 km² of pristine wilderness",
      "Red elephant phenomenon: Famous red dust covers both elephants and landscape, creating striking safari photographs",
      "Ancient volcanic landscape: Chyulu Hills, lava flows, and underground springs create dramatic geological formations",
      "Remote and undisturbed: Far from tourist crowds, offering genuine wilderness experiences",
    ],
    story:
      "Tsavo is the wild Africa that exists in your imagination—vast, untamed, and refreshingly free from the complexities of tourism infrastructure. This colossal park draws you into genuine frontier territory where red dust hangs in the air like an ancient signature, where enormous bull elephants roam freely, and where your game drive might reveal lions that have never seen a tourist vehicle before.",
  },
  samburu: {
    features: [
      "Samburu Special Five: Grevy's zebra, reticulated giraffe, gerenuk, Somali ostrich, and Beisa oryx — all endemic to this region",
      "Ewaso Ng'iro River: Permanent water source creating dense wildlife corridors with crocodile, hippo, and 350+ bird species",
      "Remote northern wilderness: Far fewer visitors than southern parks, delivering authentic encounters",
      "Samburu culture: One of Kenya's most vivid indigenous communities, famed for beadwork, ochre, and warrior traditions",
    ],
    story:
      "Samburu is Kenya's northern secret — a semi-desert landscape where the Ewaso Ng'iro River cuts a ribbon of improbable green through the heat shimmer, and where wildlife evolution has taken its own remarkable path. The animals here exist nowhere else on Earth in the same combination, shaped by millions of years of adaptation to this precise, beautiful harshness.",
  },
  nakuru: {
    features: [
      "Lake Nakuru flamingos: Up to 2 million pink flamingos can ring the lake simultaneously in one of the world's greatest ornithological spectacles",
      "Rhino sanctuary: Both endangered black and southern white rhinos find refuge in the park's protected sanctuary",
      "Rift Valley setting: Set within Africa's Great Rift Valley, surrounded by dramatic escarpment scenery",
      "Rothschild's giraffe: One of Africa's rarest giraffe subspecies thrives in this park",
    ],
    story:
      "Lake Nakuru turns pink at dawn — not from the light, but from the flamingos. Millions of them sometimes ring the lake's edges in an unbroken coral necklace, so dense and so vivid that first-time visitors literally stop breathing. Behind this spectacle, rhinos graze on the hillside above, leopards move between the yellow fever trees, and the Great Rift Valley escarpment frames everything in geological magnificence.",
  },
  naivasha: {
    features: [
      "Freshwater Rift Valley lake: Africa's only major freshwater lake in the Rift Valley, surrounded by papyrus and fever trees",
      "Hell's Gate National Park: Unique cycling-inside-the-park experience through gorges and hot springs",
      "Crescent Island: Walking safari among zebra, giraffe, and wildebeest on an island within the lake",
      "Hippo herds: One of Kenya's densest hippo populations, viewable by boat at close range",
    ],
    story:
      "Lake Naivasha is where the Rift Valley exhales. After the drama of Nakuru's flamingos and the red dust of Tsavo, Naivasha offers the lushness and cool that only 1,800 metres of altitude and a freshwater lake can provide. Hippos graze the lawn at dusk, eagles soar over papyrus beds, and the cycling trail through Hell's Gate — where geothermal steam vents beside a gorge that could swallow a city block — is unlike anything else in Kenya.",
  },
};

// ─────────────────────────────────────────────────────────
// Image slider
// ─────────────────────────────────────────────────────────
const ImageSlider = ({ images, name }: { images: string[]; name: string }) => {
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
        <OptimizedImage
          key={i}
          src={src}
          alt={`${name} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onError={(e) => {
            // Fallback for broken images
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800";
          }}
        />
      ))}
    </>
  );
};


// ─────────────────────────────────────────────────────────
// Lodge card inside destination modal
// ─────────────────────────────────────────────────────────
const LodgeCard = ({
  lodge,
  onClick,
}: {
  lodge: Lodge;
  onClick: () => void;
}) => (
  <div
    className="group cursor-pointer rounded-xl overflow-hidden border border-border bg-background hover:shadow-lg transition-all duration-300"
    onClick={onClick}
  >
    <div className="relative h-48 overflow-hidden">
      <OptimizedImage
        src={lodge.image}
        alt={lodge.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
    <div className="p-4">
      <h4 className="font-bold text-foreground text-base mb-1">{lodge.name}</h4>
      <p className="text-muted-foreground text-sm line-clamp-2">{lodge.description}</p>
      <div className="flex items-center gap-1 mt-3 text-accent text-sm font-semibold">
        <span>View Details</span>
        <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
// Lodge detail modal
// ─────────────────────────────────────────────────────────
const LodgeModal = ({
  lodge,
  destinationName,
  onClose,
  onBooking,
}: {
  lodge: Lodge;
  destinationName: string;
  onClose: () => void;
  onBooking: (destinationName: string, lodgeName?: string) => void;
}) => {
  const { user } = useAuth();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-64 rounded-t-2xl overflow-hidden">
          <OptimizedImage
            src={lodge.image}
            alt={lodge.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h3 className="text-2xl font-bold text-foreground">{lodge.name}</h3>
          </div>
          <p className="text-accent font-semibold text-sm mb-4 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {destinationName}, Kenya
          </p>

          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {lodge.description}
          </p>

          {/* Story */}
          <div className="bg-muted/40 rounded-xl p-4 mb-5">
            <p className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
              The Experience
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed italic">
              "{lodge.story}"
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Highlights
            </p>
            <ul className="space-y-2">
              {lodge.features.map((f, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground/80">
                  <span className="text-accent mt-0.5 shrink-0">✦</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <button
              onClick={() => onBooking(destinationName, lodge.name)}
              className="flex-1 bg-accent text-white font-semibold px-5 py-3 rounded-lg text-center hover:bg-accent/90 transition text-sm"
            >
              {user ? 'Book This Lodge' : 'Contact About This Lodge'}
            </button>
            {lodge.website && (
              <a
                href={lodge.website}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-accent text-accent font-semibold px-5 py-3 rounded-lg hover:bg-accent/10 transition text-sm"
              >
                Official Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Destination card + expanded modal with lodges
// ─────────────────────────────────────────────────────────
const DestinationModal = ({
  dest,
  onClose,
}: {
  dest: any;
  onClose: () => void;
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedLodge, setSelectedLodge] = useState<Lodge | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<Lodge["category"] | "all">("all");

  const enhancement = destinationEnhancements[dest.id];
  const lodgeData = destinationLodges.find((d) => d.destinationId === dest.id);
  const lodges = lodgeData?.lodges ?? [];

  const filtered =
    categoryFilter === "all"
      ? lodges
      : lodges.filter((l) => l.category === categoryFilter);

  const categories = Array.from(new Set(lodges.map((l) => l.category)));

  const handleBooking = (destinationName: string, lodgeName?: string) => {
    if (user) {
      // User is logged in, go to booking page
      const bookingParams = new URLSearchParams({ destination: destinationName });
      if (lodgeName) bookingParams.set('lodge', lodgeName);
      navigate(`/booking?${bookingParams.toString()}`);
    } else {
      // User is not logged in, go to contact page
      const contactParams = new URLSearchParams({ 
        inquiry: 'booking',
        destination: destinationName,
        ...(lodgeName && { lodge: lodgeName })
      });
      navigate(`/contact?${contactParams.toString()}`);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !selectedLodge) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, selectedLodge]);

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col overflow-auto"
        onClick={onClose}
      >
        <div
          className="min-h-screen w-full flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header image */}
          <div className="relative h-72 md:h-96 shrink-0">
            <img
              src={dest.images?.[0] || dest.image}
              alt={dest.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
            <button
              onClick={onClose}
              className="absolute top-6 right-6 bg-black/50 hover:bg-black/70 text-white rounded-full p-2.5 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">{dest.name}</h2>
              <p className="text-white/80 mt-1 flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4" />
                {dest.country}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="bg-background flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-6">{dest.description}</p>

            {/* Features */}
            {enhancement && (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-3">Why Visit</h3>
                  <ul className="space-y-2">
                    {enhancement.features.map((f, i) => (
                      <li key={i} className="flex gap-2 text-sm text-foreground/80">
                        <span className="text-accent shrink-0 mt-0.5">✦</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted/40 rounded-xl p-5 mb-8">
                  <p className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                    The Story
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    "{enhancement.story}"
                  </p>
                </div>
              </>
            )}

            {/* Lodges section */}
            {lodges.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Bed className="w-5 h-5 text-accent" />
                    Hotels & Lodges ({lodges.length})
                  </h3>
                  {/* Filter buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      className={`text-xs font-semibold px-3 py-1 rounded-full border transition ${
                        categoryFilter === "all"
                          ? "bg-accent text-white border-accent"
                          : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                      }`}
                      onClick={() => setCategoryFilter("all")}
                    >
                      All
                    </button>
                    {(["luxury", "mid-range", "budget", "camp"] as const)
                      .filter((c) => categories.includes(c))
                      .map((c) => (
                        <button
                          key={c}
                          className={`text-xs font-semibold px-3 py-1 rounded-full border transition capitalize ${
                            categoryFilter === c
                              ? "bg-accent text-white border-accent"
                              : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                          }`}
                          onClick={() => setCategoryFilter(c)}
                        >
                          {c === "mid-range" ? "Mid-Range" : c.charAt(0).toUpperCase() + c.slice(1)}
                        </button>
                      ))}
                  </div>
                </div>

                {filtered.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No lodges in this category for {dest.name}.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filtered.map((lodge) => (
                      <LodgeCard
                        key={lodge.id}
                        lodge={lodge}
                        onClick={() => setSelectedLodge(lodge)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => handleBooking(dest.name)}
                className="bg-accent text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-accent/90 transition"
              >
                {user ? 'Book This Destination' : 'Contact Us About This Destination'}
              </button>
              <button
                className="border border-accent text-accent font-semibold px-6 py-3 rounded-lg hover:bg-accent/10 transition"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lodge detail modal stacked on top */}
      {selectedLodge && (
        <LodgeModal
          lodge={selectedLodge}
          destinationName={dest.name}
          onClose={() => setSelectedLodge(null)}
          onBooking={handleBooking}
        />
      )}
    </>
  );
};

// ─────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────
const Destinations = () => {
  const { user } = useAuth();
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState<any>(null);

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-primary text-primary-foreground">
            <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span className="text-white font-semibold text-sm uppercase tracking-wider">
                Ready to Travel With Real Adventure and Enjoy Natural
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mt-3">Destinations</h1>
              <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto text-lg">
                Explore Kenya's premier safari destinations
              </p>
            </div>
          </section>

          {/* Kenya Destinations */}
          <section className="section-padding bg-background" ref={ref}>
            <div className="container-wide mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.filter(dest => dest.country === 'Kenya').map((dest, index) => {
                  const lodgeCount =
                    destinationLodges.find((d) => d.destinationId === dest.id)?.lodges.length ?? 0;

                  return (
                    <div
                      key={dest.id}
                      className={`group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-500 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: `${index * 80}ms` }}
                      onClick={() => setSelected(dest)}
                    >
                      <ImageSlider images={dest.images || [dest.image]} name={dest.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white font-bold text-xl">{dest.name}</h3>
                        <p className="text-white/70 text-sm mt-2 line-clamp-2">
                          {dest.description}
                        </p>
                        <div className="flex items-center gap-2 mt-3 text-accent text-sm font-semibold">
                          <Bed className="w-4 h-4" />
                          {lodgeCount > 0
                            ? `${lodgeCount} Hotels & Lodges`
                            : dest.safariCount
                            ? `${dest.safariCount} Hotels & Lodges`
                            : "View Lodges"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>


        </main>
        <Footer />
      </div>

      {/* Destination + lodge modal */}
      {selected && (
        <DestinationModal dest={selected} onClose={() => setSelected(null)} />
      )}
    </PageTransition>
  );
};

export default Destinations;
