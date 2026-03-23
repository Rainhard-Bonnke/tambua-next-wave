import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/beautiful-shot-three-cute-giraffes-field-with-trees-blue-sky.jpg')",
        }}
      >
        <img 
          src="/images/beautiful-shot-three-cute-giraffes-field-with-trees-blue-sky.jpg" 
          className="hidden" 
          alt="" 
          fetchpriority="high" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Explore <span className="font-display italic text-accent">Africa</span> Through the
            Heart of the East
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Discover tailor-made adventures across Kenya, Tanzania, Uganda, Rwanda, and the Indian Ocean coast — from migration safaris to gorilla treks and beach escapes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 py-6 rounded-xl font-semibold"
            >
              <Link to="/safaris">
                Explore Safaris <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 text-base px-8 py-6 rounded-xl bg-transparent"
            >
              <Play className="w-5 h-5 mr-2" /> Watch Our Story
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-12 max-w-lg mx-auto">
            {[
              { value: "500+", label: "Happy Clients" },
              { value: "20+", label: "Regional Routes" },
              { value: "16+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
