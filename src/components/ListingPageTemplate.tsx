import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export interface ListingItem {
  id: string;
  title: string;
  description: string;
  image: string;
  badges?: { label: string; variant?: "default" | "secondary" | "destructive" | "outline" }[];
  meta?: { icon?: React.ReactNode; text: string }[];
  priceOld?: string;
  priceNew?: string;
  link?: string;
}

interface ListingPageTemplateProps {
  pageTitle: string;
  pageSubtitle: string;
  searchPlaceholder: string;
  items: ListingItem[];
  renderCardExtras?: (item: ListingItem) => React.ReactNode;
}

const ListingPageTemplate = ({
  pageTitle,
  pageSubtitle,
  searchPlaceholder,
  items,
  renderCardExtras,
}: ListingPageTemplateProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [items, searchQuery]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {pageTitle}
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              {pageSubtitle}
            </p>
            <div className="max-w-lg mx-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <p className="text-muted-foreground mb-6">
              Showing <span className="font-medium text-foreground">{filtered.length}</span> results
            </p>
            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item) => (
                  <div key={item.id} className="card-cultural overflow-hidden group">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 space-y-3">
                      {item.badges && item.badges.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.badges.map((b, i) => (
                            <Badge key={i} variant={b.variant || "default"} className="text-xs">
                              {b.label}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                      {item.meta && (
                        <div className="space-y-1">
                          {item.meta.map((m, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              {m.icon}
                              <span>{m.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.priceOld && item.priceNew && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm line-through text-muted-foreground">{item.priceOld}</span>
                          <span className="font-bold text-primary">{item.priceNew}</span>
                        </div>
                      )}
                      {renderCardExtras?.(item)}
                      <Link
                        to={item.link || "#"}
                        className="inline-block mt-2"
                      >
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">Try a different search term</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ListingPageTemplate;
