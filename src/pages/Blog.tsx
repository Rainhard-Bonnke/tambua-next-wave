import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { Calendar, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import { posts } from "@/data/blogPosts";

const Blog = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <section className="relative pt-32 pb-20 bg-primary text-primary-foreground">
            <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Our Blog
              </span>
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
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
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
    </PageTransition>
  );
};

export default Blog;
