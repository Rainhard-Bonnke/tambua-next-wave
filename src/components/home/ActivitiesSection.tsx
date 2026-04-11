import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Compass, Palmtree, Binoculars, Mountain, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const activities = [
  {
    icon: Compass,
    title: "Cultural Tours",
    description: "Immerse yourself in the rich traditions and heritage of East African communities.",
    images: [
      "/images/popular%20activities/culture%20tours.webp",
      "/images/popular%20activities/culture%20tours%20(2).webp",
      "/images/culture%20tours.webp",
    ],
  },
  {
    icon: Palmtree,
    title: "Beach Holidays",
    description: "Relax on pristine white sand beaches along the beautiful Kenyan coastline.",
    images: [
      "/images/deckchair-beach.webp",
      "/images/zanzibar-final.webp",
    ],
    hideArrows: true,
  },
  {
    icon: Binoculars,
    title: "Game Drives",
    description: "Experience thrilling wildlife encounters in Kenya's world-renowned national parks.",
    images: [
      "/images/popular%20activities/game%20drives.webp",
      "/images/popular%20activities/game%20drives1.webp",
      "/images/maasai-mara-real.webp",
    ],
  },
  {
    icon: Mountain,
    title: "Hiking",
    description: "Trek through breathtaking landscapes, from Mount Kenya's peaks to the Great Rift Valley.",
    images: [
      "/images/Hike.jpg",
      "/images/Hiking%20(2).jpg",
      "/images/Hiking.jpg",
    ],
  },
  {
    icon: Zap,
    title: "Bungee & Jumping",
    description: "Get your adrenaline pumping with thrilling bungee jumps and high-flying adventure experiences.",
    images: [
      "/images/Jumping%20(2).jpg",
      "/images/Jumping.jpg",
      "/images/Bangee%20and%20Jumping.jpg",
    ],
  },
];

type Activity = (typeof activities)[0];

const ActivityCard = ({
  activity,
  index,
  isVisible,
}: {
  activity: Activity;
  index: number;
  isVisible: boolean;
}) => {
  const [current, setCurrent] = useState(0);
  const hasMultiple = activity.images.length > 1;
  const showArrows = hasMultiple && !activity.hideArrows;

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + activity.images.length) % activity.images.length);
  }, [activity.images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % activity.images.length);
  }, [activity.images.length]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (!hasMultiple) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [hasMultiple, next]);

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Cross-fade images — all absolutely positioned to fill the card */}
      {activity.images.map((image, i) => (
        <img
          key={image}
          src={image}
          alt={`${activity.title} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            i === current
              ? "opacity-100 scale-110"
              : "opacity-0 scale-100"
          }`}
          loading="lazy"
        />
      ))}

      {/* Prev / Next buttons — visible on hover */}
      {showArrows && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow"
          >
            <ChevronLeft className="w-4 h-4 text-gray-800" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow"
          >
            <ChevronRight className="w-4 h-4 text-gray-800" />
          </button>

          {/* Dot indicators */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {activity.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-white w-4" : "bg-white/50 w-1.5"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <div className="w-12 h-12 rounded-xl bg-accent/90 flex items-center justify-center mb-3">
          <activity.icon className="w-6 h-6 text-accent-foreground" />
        </div>
        <h3 className="text-xl font-bold">{activity.title}</h3>
        <p className="text-white/70 text-sm mt-1 leading-relaxed">{activity.description}</p>
      </div>
    </div>
  );
};

const ActivitiesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-wide mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Popular Activities</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Choose from our most popular adventure categories and create memories that last a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {activities.map((activity, index) => (
            <ActivityCard
              key={activity.title}
              activity={activity}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
