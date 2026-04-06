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
import HomeFeatureHero from "@/components/home/HomeFeatureHero";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          
          {/* Feature Hero Section 1: Wildlife & Nature */}
          <HomeFeatureHero 
            slogan="Experience the Wild"
            title="Witness the Great Migration"
            description="Embark on an unforgettable journey through Africa's most iconic landscapes, where nature's greatest spectacles unfold before your eyes."
            images={[
              "/images/pexels-abelalemseged-17272121.jpg",
              "/images/pexels-joaoaguiar-7731450.jpg",
              "/images/beautiful-shot-three-cute-giraffes-field-with-trees-blue-sky.jpg"
            ]}
            align="left"
          />

          {/* Feature Hero Section 2: Heritage & Culture */}
          <HomeFeatureHero 
            slogan="Our Cultural Heritage"
            title="Connect with Local Roots"
            description="Immerse yourself in the vibrant traditions and hospitality of East Africa. Meet the people who call this land home and share in their stories."
            images={[
              "/images/pexels-maasai-magic-3752887-5574091.jpg",
              "/images/pexels-taryn-elliott-5214036.jpg",
              "/images/pexels-andname-5536965.jpg"
            ]}
            interval={6000}
            align="right"
          />

          {/* Feature Hero Section 3: Luxury & Adventure */}
          <HomeFeatureHero 
            slogan="Luxury Reimagined"
            title="Premium Safari Lodging"
            description="Experience the perfect blend of wild adventure and modern luxury. Boutique stays in the heart of the savannah, tailored just for you."
            images={[
              "/images/pexels-lan-yao-324969-20879645.jpg",
              "/images/pexels-ross-green-2159326053-36048575.jpg",
              "/images/pexels-marri-shyam-366418-7463697.jpg"
            ]}
            interval={7000}
            align="left"
          />

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
