import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useBlog } from "@/hooks/useBlogs";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post } = useBlog(id);

  useEffect(() => {
    if (id && !post) navigate("/blog");
  }, [id, post, navigate]);

  if (!post) return null;

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <section className="relative pt-32 pb-20 bg-white text-foreground">
            <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
              <button
                className="flex items-center gap-2 text-accent font-semibold mb-6 hover:underline"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div className="max-w-3xl mx-auto bg-white">
                <img src={post.image} alt={post.title} className="w-full rounded-3xl mb-6 object-cover max-h-[520px]" />
                <div className="flex items-center gap-3 text-xs mb-2 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </span>
                  {post.readTime && <span>{post.readTime}</span>}
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-4">{post.title}</h1>
                <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>
                <div
                  className="prose prose-lg max-w-none text-foreground prose-headings:font-playfair prose-headings:text-primary prose-a:text-accent prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default BlogDetail;
