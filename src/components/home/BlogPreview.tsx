import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "Top 10 Safari Experiences in Kenya for 2026",
    excerpt: "Discover the most breathtaking safari destinations and experiences that Kenya has to offer this year.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80",
    date: "Mar 8, 2026",
    category: "Travel Guide",
  },
  {
    title: "The Great Migration: When & Where to See It",
    excerpt: "Planning your trip around the Great Migration? Here's everything you need to know about timing and locations.",
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=600&q=80",
    date: "Mar 1, 2026",
    category: "Wildlife",
  },
  {
    title: "Sustainable Safari Tourism in East Africa",
    excerpt: "How eco-friendly tourism practices are preserving Africa's wildlife and empowering local communities.",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&q=80",
    date: "Feb 22, 2026",
    category: "Sustainability",
  },
];

const BlogPreview = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-wide mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Blog</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Latest News & Stories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <article
              key={post.title}
              className={`group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
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
  );
};

export default BlogPreview;
