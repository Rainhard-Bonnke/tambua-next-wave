import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const posts = [
  {
    id: "1",
    title: "Top 10 Safari Experiences in Kenya for 2026",
    excerpt: "Discover the most breathtaking safari destinations and experiences that Kenya has to offer this year. From the iconic Masai Mara to hidden gems.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    date: "Mar 8, 2026",
    category: "Travel Guide",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "The Great Migration: When & Where to See It",
    excerpt: "Planning your trip around the Great Migration? Here's everything you need to know about timing, locations, and what to expect.",
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    date: "Mar 1, 2026",
    category: "Wildlife",
    readTime: "7 min read",
  },
  {
    id: "3",
    title: "Sustainable Safari Tourism in East Africa",
    excerpt: "How eco-friendly tourism practices are preserving Africa's wildlife and empowering local communities for future generations.",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    date: "Feb 22, 2026",
    category: "Sustainability",
    readTime: "4 min read",
  },
  {
    id: "4",
    title: "Best Time to Visit Kenya: A Month-by-Month Guide",
    excerpt: "Kenya offers incredible experiences year-round, but timing your visit right can make all the difference. Here's our expert guide.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    date: "Feb 15, 2026",
    category: "Travel Tips",
    readTime: "6 min read",
  },
  {
    id: "5",
    title: "Photography Tips for Your African Safari",
    excerpt: "Capture stunning wildlife photos on your next safari adventure with these professional photography tips and techniques.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    date: "Feb 8, 2026",
    category: "Photography",
    readTime: "5 min read",
  },
  {
    id: "6",
    title: "Diani Beach: Kenya's Best Kept Secret",
    excerpt: "Discover why Diani Beach has been voted Africa's leading beach destination year after year and what makes it so special.",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    date: "Jan 30, 2026",
    category: "Destinations",
    readTime: "4 min read",
  },
];

const Blog = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 bg-primary text-primary-foreground">
          <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Blog</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">News & Stories</h1>
            <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto text-lg">
              Travel tips, safari stories, and the latest news from Tambua Africa.
            </p>
          </div>
        </section>

        <section className="section-padding bg-background" ref={ref}>
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className={`group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">{post.category}</div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</div>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
                    <button className="flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
