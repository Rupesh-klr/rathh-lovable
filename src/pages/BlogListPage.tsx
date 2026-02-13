import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const BLOG_POSTS = [
  {
    id: "hidden-gems-kerala",
    title: "5 Hidden Gems in Kerala You've Never Heard Of",
    excerpt: "Beyond the backwaters — discover secret waterfalls, untouched villages, and cliff-top temples that most tourists miss.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    author: "Priya Sharma",
    date: "2026-01-20",
    content: `Kerala, often called "God's Own Country," has plenty of well-known attractions. But venture off the beaten path and you'll discover a completely different side of this lush state.\n\n**1. Gavi** — A pristine eco-tourism spot nestled in the Western Ghats with cardamom plantations and rare wildlife.\n\n**2. Athirappilly Falls** — Often compared to Niagara, this thundering cascade is surrounded by dense tropical forest.\n\n**3. Kumarakom Bird Sanctuary** — A hidden paradise for birdwatchers, especially during winter migration season.\n\n**4. Bekal Fort** — An ancient laterite fort overlooking the Arabian Sea, far quieter than its famous counterparts.\n\n**5. Wayanad Caves** — Prehistoric Edakkal Caves feature Neolithic-era petroglyphs dating back 6,000 years.\n\nEach of these destinations offers a unique perspective on Kerala's incredible diversity.`,
  },
  {
    id: "packing-light-2-weeks",
    title: "Packing Light for a 2-Week Adventure",
    excerpt: "A minimalist packing guide that'll save your back and your sanity. Everything fits in a single carry-on.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    author: "Arjun Mehta",
    date: "2026-01-10",
    content: `Packing light is an art, and after dozens of trips, I've perfected my carry-on-only system for 2-week adventures.\n\n**The Core Wardrobe:** 4 tops, 2 bottoms, 1 light jacket. Choose fabrics that dry quickly and resist wrinkles.\n\n**Shoes:** Maximum 2 pairs — comfortable walking shoes and lightweight sandals.\n\n**Tech Essentials:** Phone, charger, universal adapter, and a compact power bank. Leave the laptop behind.\n\n**Toiletries:** Solid shampoo bars, a multi-purpose soap, and decanted sunscreen. Most things can be bought locally.\n\n**The Golden Rule:** If you're debating whether to pack something, leave it behind. You'll never regret packing less.`,
  },
  {
    id: "solo-travel-safety",
    title: "Solo Travel Safety: A Complete Guide",
    excerpt: "Practical tips and real advice for staying safe while exploring the world on your own terms.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
    author: "Meera Nair",
    date: "2025-12-28",
    content: `Solo travel is one of the most rewarding experiences you can have, but safety should always come first.\n\n**Before You Go:** Share your itinerary with a trusted contact. Register with your country's embassy if traveling internationally.\n\n**Accommodation:** Choose well-reviewed hostels or hotels in central locations. Avoid ground-floor rooms.\n\n**On the Ground:** Keep copies of your documents in cloud storage. Use a money belt for cash and cards.\n\n**Trust Your Instincts:** If something feels off, remove yourself from the situation. No photo or experience is worth your safety.\n\n**Connect with Others:** Join walking tours, cooking classes, or hostel events. Solo doesn't have to mean lonely.`,
  },
  {
    id: "foodie-guide-hyderabad",
    title: "The Ultimate Foodie Guide to Hyderabad",
    excerpt: "From legendary biryani to street-side chai — a local's guide to eating your way through the City of Pearls.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
    author: "Ravi Teja",
    date: "2025-12-15",
    content: `Hyderabad's food scene is legendary, and for good reason. This city lives and breathes flavor.\n\n**Biryani:** Start at Paradise or Bawarchi for the classic Hyderabadi dum biryani — layers of fragrant rice and tender meat.\n\n**Haleem:** Available year-round but best during Ramadan. Pista House is the gold standard.\n\n**Irani Chai & Osmania Biscuits:** Head to any Irani cafe in the Old City for this iconic pairing.\n\n**Street Food:** Charminar's lanes are packed with kebabs, lukhmi (stuffed pastries), and double ka meetha.\n\n**Modern Dining:** For contemporary takes, try Farzi Cafe or Olive Bistro for fusion dishes that honor local flavors.\n\nCome hungry, leave happy. That's the Hyderabad promise.`,
  },
];

const BlogListPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Travel Stories & Tips</h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">Insights, guides, and inspiration from fellow travelers.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {BLOG_POSTS.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="group card-cultural overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
);

export default BlogListPage;
