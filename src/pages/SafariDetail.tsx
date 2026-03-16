import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { safaris } from "@/data/safaris";
import BookingModal from "@/components/booking/BookingModal";
import { Star, MapPin, Clock, CheckCircle2, ArrowLeft, Users, Calendar, Shield } from "lucide-react";

const itineraries: Record<string, string[]> = {
  "masai-mara-classic": [
    "Day 1: Depart Nairobi → Arrive Masai Mara → Afternoon game drive",
    "Day 2: Full-day game drive across the Mara plains → Sundowner drinks",
    "Day 3: Sunrise hot-air balloon safari → Maasai village visit → Game drive",
    "Day 4: Morning game drive → Depart to Nairobi",
  ],
  "amboseli-elephant": [
    "Day 1: Nairobi → Amboseli National Park → Afternoon game drive with Kilimanjaro views",
    "Day 2: Full-day game drive → Visit Observation Hill → Sunset at camp",
    "Day 3: Early morning game drive → Depart to Nairobi",
  ],
  "diani-beach-escape": [
    "Day 1: Transfer to Diani Beach → Resort check-in → Beach relaxation",
    "Day 2: Snorkeling trip to Kisite-Mpunguti Marine Park",
    "Day 3: Dhow sailing & mangrove exploration",
    "Day 4: Free day — spa, water sports, or explore Diani",
    "Day 5: Breakfast → Transfer to Mombasa airport",
  ],
  "lake-nakuru-flamingo": [
    "Day 1: Nairobi → Lake Nakuru → Afternoon game drive → Baboon Cliff viewpoint",
    "Day 2: Full-day game drive → Rhino sanctuary → Return to Nairobi",
  ],
  "tsavo-adventure": [
    "Day 1: Nairobi → Tsavo East → Aruba Dam game drive",
    "Day 2: Full-day game drive → Mudanda Rock → Lugard Falls",
    "Day 3: Cross to Tsavo West → Mzima Springs → Shetani Lava Flow",
    "Day 4: Morning game drive → Return to Nairobi",
  ],
  "lamu-cultural": [
    "Day 1: Flight to Lamu → Old Town walking tour → Lamu Fort & Museum",
    "Day 2: Dhow cruise → Shela Beach → Swahili cooking class",
    "Day 3: Manda Island excursion → Return flight to Nairobi",
  ],
};

const included = ["Park entry fees", "Accommodation", "Meals as specified", "Professional guide", "4x4 safari vehicle", "Airport transfers", "Drinking water"];
const excluded = ["International flights", "Visa fees", "Travel insurance", "Tips & gratuities", "Personal items", "Alcoholic beverages"];

const SafariDetail = () => {
  const { id } = useParams();
  const [bookingOpen, setBookingOpen] = useState(false);
  const safari = safaris.find((s) => s.id === id);

  if (!safari) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold text-foreground">Safari not found</h1>
          <Button asChild className="mt-6"><Link to="/safaris">Back to Safaris</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const days = itineraries[safari.id] || ["Contact us for a detailed itinerary."];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px]">
          <img src={safari.image} alt={safari.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <div className="container-wide mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Link to="/safaris" className="inline-flex items-center gap-2 text-white/70 text-sm mb-4 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to Safaris
                </Link>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">{safari.category}</span>
                  <div className="flex items-center gap-1 text-accent text-sm">
                    <Star className="w-4 h-4 fill-current" /> {safari.rating}
                    <span className="text-white/60">({safari.reviews} reviews)</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{safari.title}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-white/70 text-sm">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{safari.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{safari.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" />Max 12 guests</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-background">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">{safari.description}</p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    This carefully curated experience takes you through some of Kenya's most spectacular landscapes, offering incredible wildlife encounters and cultural experiences that will create memories to last a lifetime.
                  </p>
                </motion.div>

                {/* Highlights */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {safari.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                        <span className="text-foreground text-sm font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Itinerary */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-accent" /> Itinerary
                  </h2>
                  <div className="space-y-3">
                    {days.map((day, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <span className="text-accent font-bold text-sm">{i + 1}</span>
                        </div>
                        <p className="text-foreground text-sm leading-relaxed">{day}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Included / Excluded */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-3">What's Included</h3>
                    <ul className="space-y-2">
                      {included.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-3">Not Included</h3>
                    <ul className="space-y-2">
                      {excluded.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-4 h-4 flex items-center justify-center shrink-0 text-muted-foreground">✕</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar - Booking Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-card rounded-2xl border border-border p-6 shadow-lg space-y-5">
                  <div>
                    <span className="text-xs text-muted-foreground">From</span>
                    <div className="text-3xl font-bold text-primary">${safari.price}<span className="text-base text-muted-foreground font-normal">/person</span></div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="text-foreground font-medium">{safari.duration}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Location</span>
                      <span className="text-foreground font-medium">{safari.location}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Group Size</span>
                      <span className="text-foreground font-medium">Max 12</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="flex items-center gap-1 text-foreground font-medium">
                        <Star className="w-4 h-4 text-accent fill-current" /> {safari.rating}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setBookingOpen(true)}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl py-5 text-base font-semibold"
                  >
                    Book This Safari
                  </Button>

                  <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                    <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Free cancellation</span> up to 30 days before departure. Best price guaranteed.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} preselectedSafari={safari.id} />
    </div>
  );
};

export default SafariDetail;
