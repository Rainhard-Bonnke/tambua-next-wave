import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import HeroSection from "@/components/home/HeroSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedSafaris from "@/components/home/FeaturedSafaris";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DestinationsSection from "@/components/home/DestinationsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PartnersSection from "@/components/home/PartnersSection";
import FAQSection from "@/components/home/FAQSection";
import BlogPreview from "@/components/home/BlogPreview";
import CTABanner from "@/components/home/CTABanner";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <ActivitiesSection />
          <AboutPreview />
          <FeaturedSafaris />
          <WhyChooseUs />
          <DestinationsSection />
          <TestimonialsSection />
          <PartnersSection />
          <FAQSection />
          <BlogPreview />
          <CTABanner />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
