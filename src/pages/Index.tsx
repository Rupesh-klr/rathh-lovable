import { useState, useRef, useMemo } from "react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import HomeMainContent from "@/components/HomeMainContent";
import EventFilters from "@/components/EventFilters";
import EventCard from "@/components/EventCard";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import { sampleEvents, Event } from "@/data/sampleEvents";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const eventsRef = useRef<HTMLDivElement>(null);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  const handleBookClick = (event: Event) => {
    setSelectedEvent(event);
    setIsBookingOpen(true);
  };

  const filteredEvents = useMemo(() => {
    return sampleEvents.filter(event => {
      // City filter
      if (selectedCity !== "all" && event.city !== selectedCity) {
        return false;
      }

      // Tags filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => event.tags.includes(tag))) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.venue?.toLowerCase().includes(query) ||
          event.host.name.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [selectedCity, selectedTags, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <Navbar />
      
      {/* Hero Carousel with Search */}
      <HeroCarousel />

      {/* Main Content Section */}
      <div className="mt-24">
        <HomeMainContent />
      </div>

      {/* Events Section */}
      <section 
        ref={eventsRef} 
        id="events" 
        className="py-20 scroll-mt-16"
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Upcoming Cultural Experiences
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover authentic festivals, traditional ceremonies, and unique cultural events across India
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <EventFilters
                  selectedCity={selectedCity}
                  selectedTags={selectedTags}
                  searchQuery={searchQuery}
                  onCityChange={setSelectedCity}
                  onTagToggle={handleTagToggle}
                  onSearchChange={setSearchQuery}
                />
              </div>
            </div>

            {/* Events Grid */}
            <div className="lg:col-span-3">
              {filteredEvents.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-muted-foreground">
                      Showing <span className="text-foreground font-medium">{filteredEvents.length}</span> events
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredEvents.map(event => (
                      <EventCard 
                        key={event.id} 
                        event={event} 
                        onBookClick={handleBookClick}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    No events found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedCity("all");
                      setSelectedTags([]);
                      setSearchQuery("");
                    }}
                    className="text-primary font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        event={selectedEvent}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default Index;
