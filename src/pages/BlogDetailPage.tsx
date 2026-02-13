import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Send, User, Calendar } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BLOG_POSTS } from "./BlogListPage";

interface Comment {
  name: string;
  text: string;
  rating: number;
  date: string;
}

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find((p) => p.id === id);

  const storageKey = `blog_comments_${id}`;
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setComments(JSON.parse(saved));
    } catch { /* ignore */ }
  }, [storageKey]);

  const avgRating = useMemo(() => {
    if (comments.length === 0) return 0;
    return comments.reduce((sum, c) => sum + c.rating, 0) / comments.length;
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) {
      toast.error("Please fill in all fields and select a rating.");
      return;
    }
    const newComment: Comment = { name: name.trim(), text: text.trim(), rating, date: new Date().toISOString().split("T")[0] };
    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setName("");
    setText("");
    setRating(0);
    toast.success("Comment posted!");
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
              {avgRating > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  {avgRating.toFixed(1)} ({comments.length})
                </span>
              )}
            </div>

            <img src={post.image} alt={post.title} className="w-full rounded-xl mb-10 aspect-video object-cover" />

            <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line leading-relaxed mb-16">
              {post.content}
            </div>

            {/* Comments & Rating */}
            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Reviews & Comments</h2>

              {/* Add Comment */}
              <form onSubmit={handleSubmit} className="bg-muted/50 rounded-xl p-6 mb-8 space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Your Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="mt-1" maxLength={100} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Rating</label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-0.5"
                      >
                        <Star className={`w-6 h-6 transition-colors ${s <= (hoverRating || rating) ? "fill-primary text-primary" : "text-border"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Comment</label>
                  <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Share your thoughts…" rows={3} className="mt-1" maxLength={1000} />
                </div>
                <Button type="submit" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="w-4 h-4" /> Post Comment
                </Button>
              </form>

              {/* Comments List */}
              {comments.length === 0 ? (
                <p className="text-muted-foreground text-sm">No comments yet. Be the first!</p>
              ) : (
                <div className="space-y-4">
                  {comments.map((c, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground text-sm">{c.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`w-3 h-3 ${s <= c.rating ? "fill-primary text-primary" : "text-border"}`} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{c.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{c.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
