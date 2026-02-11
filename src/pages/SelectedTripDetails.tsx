import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Star,
  Users,
  Clock,
  Mountain,
  CalendarDays,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// --- Interfaces ---
export interface InclusionItem {
  title: string;
  isHighlighted: boolean;
}

export interface ItineraryDay {
  dayLabel: string;
  title: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  dateGiven: string;
  message: string;
}

export interface AvailableDate {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
}

export interface TripDetailsData {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  metaTags: { label: string; value: string }[];
  pricePerPerson: number;
  itinerary: ItineraryDay[];
  whatsIncluded: InclusionItem[];
  whatsNotIncluded: InclusionItem[];
  reviews: ReviewItem[];
  availableDates: AvailableDate[];
}

// --- Mock Data ---
const MOCK_TRIPS: Record<string, TripDetailsData> = {
  trip_101: {
    id: "trip_101",
    title: "Captivating Morocco: Imperial Cities & Sahara Adventure",
    description:
      "Embark on a mesmerizing journey through Morocco's most iconic destinations. From the bustling medinas of Marrakech to the vast golden dunes of the Sahara, this adventure blends ancient history, vibrant culture, and breathtaking landscapes into an unforgettable experience.",
    heroImage: "https://images.unsplash.com/photo-1626014903700-1c5c58b44463?w=1200&q=80",
    metaTags: [
      { label: "Duration", value: "5 Days" },
      { label: "Difficulty", value: "Moderate" },
      { label: "Group Size", value: "Max 15" },
    ],
    pricePerPerson: 1250,
    itinerary: [
      {
        dayLabel: "Day 1",
        title: "Arrival in Marrakech & Djemaa el-Fna",
        description:
          "Arrive in Marrakech and transfer to your traditional riad. In the evening, immerse yourself in the magical chaos of Djemaa el-Fna square — snake charmers, musicians, and the aroma of spiced street food fill the air. Enjoy a welcome dinner on a rooftop terrace overlooking the medina.",
      },
      {
        dayLabel: "Day 2",
        title: "Marrakech Exploration & Souks",
        description:
          "Discover the historical sites of Marrakech including the stunning Bahia Palace, the Saadian Tombs, and the vibrant Majorelle Garden. Spend the afternoon navigating the labyrinthine souks, haggling for handcrafted leather goods, spices, and ceramics.",
      },
      {
        dayLabel: "Day 3",
        title: "Atlas Mountains & Berber Villages",
        description:
          "Journey through the High Atlas Mountains, stopping at traditional Berber villages nestled in lush valleys. Enjoy a home-cooked Berber lunch and learn about the fascinating culture and traditions of Morocco's indigenous people.",
      },
      {
        dayLabel: "Day 4",
        title: "Sahara Desert Camel Trek & Camp",
        description:
          "Travel to the edge of the Sahara Desert. Mount your camel for a magical trek across the golden dunes of Erg Chebbi. Watch the sunset paint the desert in shades of orange and pink, then spend the night in a luxury desert camp under a canopy of stars.",
      },
      {
        dayLabel: "Day 5",
        title: "Sunrise & Departure",
        description:
          "Wake before dawn to witness an unforgettable Saharan sunrise. After breakfast, transfer back to Marrakech or your departure city. Depart with memories that will last a lifetime.",
      },
    ],
    whatsIncluded: [
      { title: "Airport transfers on arrival and departure", isHighlighted: false },
      { title: "Daily breakfast, 2 lunches, 2 dinners", isHighlighted: true },
      { title: "4 nights accommodation in riads & desert camp", isHighlighted: true },
      { title: "Guided tours with licensed English-speaking guides", isHighlighted: false },
      { title: "Camel trek in the Sahara Desert", isHighlighted: false },
      { title: "All entrance fees to monuments & sites", isHighlighted: true },
    ],
    whatsNotIncluded: [
      { title: "International flights", isHighlighted: false },
      { title: "Travel insurance", isHighlighted: true },
      { title: "Personal expenses & souvenirs", isHighlighted: false },
      { title: "Tips for guides and drivers", isHighlighted: false },
      { title: "Optional activities not mentioned in itinerary", isHighlighted: true },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Alice Johnson",
        userAvatar: "",
        rating: 5,
        dateGiven: "July 15, 2025",
        message:
          "An absolutely incredible journey! The desert camp under the stars was the highlight of my year. Our guide was so knowledgeable and made the history come alive. Highly recommended!",
      },
      {
        id: "r2",
        userName: "Marco Rossi",
        userAvatar: "",
        rating: 4,
        dateGiven: "June 22, 2025",
        message:
          "Great trip overall. The souks were overwhelming in the best way possible, and the Berber lunch was delicious. Only minor complaint was the long drive to the desert, but the destination made up for it.",
      },
      {
        id: "r3",
        userName: "Priya Sharma",
        userAvatar: "",
        rating: 5,
        dateGiven: "August 3, 2025",
        message:
          "This was my first group trip and I couldn't have asked for a better experience. The small group size meant we really got to bond, and every day was a new adventure. The riad accommodations were beautiful!",
      },
    ],
    availableDates: [
      { id: "d1", label: "Mar 01 - 05, 2026", startDate: "2026-03-01", endDate: "2026-03-05" },
      { id: "d2", label: "Mar 15 - 19, 2026", startDate: "2026-03-15", endDate: "2026-03-19" },
      { id: "d3", label: "Apr 10 - 14, 2026", startDate: "2026-04-10", endDate: "2026-04-14" },
      { id: "d4", label: "May 05 - 09, 2026", startDate: "2026-05-05", endDate: "2026-05-09" },
    ],
  },
  trip_102: {
    id: "trip_102",
    title: "Classic Japan: Kyoto to Tokyo",
    description:
      "A journey through ancient traditions and modern marvels. Experience the serene temples of Kyoto, the spiritual trails of Mount Koya, and the electric energy of Tokyo in one unforgettable adventure.",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    metaTags: [
      { label: "Duration", value: "10 Days" },
      { label: "Difficulty", value: "Easy" },
      { label: "Group Size", value: "Max 16" },
    ],
    pricePerPerson: 3200,
    itinerary: [
      {
        dayLabel: "Day 1",
        title: "Arrive in Tokyo",
        description:
          "Transfer to your Shinjuku hotel. Evening orientation walk through the neon-lit streets of Kabukicho and a welcome dinner at a traditional izakaya.",
      },
      {
        dayLabel: "Day 2",
        title: "Tokyo Highlights",
        description:
          "Visit the Meiji Shrine, explore Harajuku's quirky fashion scene, and discover the tranquil East Gardens of the Imperial Palace. Afternoon free for Akihabara or Shibuya.",
      },
      {
        dayLabel: "Day 3",
        title: "Bullet Train to Kyoto",
        description:
          "Board the Shinkansen to Kyoto. Afternoon visit to Fushimi Inari Shrine with its thousands of vermillion torii gates winding up the mountain.",
      },
      {
        dayLabel: "Day 4-5",
        title: "Kyoto Temples & Tea Ceremony",
        description:
          "Explore Kinkaku-ji, Arashiyama Bamboo Grove, and participate in a private tea ceremony with a tea master. Optional morning visit to Nishiki Market.",
      },
    ],
    whatsIncluded: [
      { title: "Bullet train tickets (reserved seating)", isHighlighted: true },
      { title: "Daily breakfast, 3 special dinners", isHighlighted: true },
      { title: "9 nights accommodation in boutique hotels & ryokan", isHighlighted: false },
      { title: "English-speaking guide throughout", isHighlighted: false },
      { title: "Private tea ceremony experience", isHighlighted: true },
      { title: "All temple entrance fees", isHighlighted: false },
    ],
    whatsNotIncluded: [
      { title: "International flights", isHighlighted: false },
      { title: "Lunch and dinner except where noted", isHighlighted: false },
      { title: "Travel insurance", isHighlighted: true },
      { title: "Personal shopping & souvenirs", isHighlighted: false },
    ],
    reviews: [
      {
        id: "jr1",
        userName: "David Chen",
        userAvatar: "",
        rating: 5,
        dateGiven: "September 10, 2025",
        message:
          "Japan exceeded all my expectations. The blend of ancient and modern is mind-blowing. The ryokan stay was magical, and our guide Kenji was phenomenal!",
      },
      {
        id: "jr2",
        userName: "Sarah Williams",
        userAvatar: "",
        rating: 4,
        dateGiven: "October 5, 2025",
        message:
          "Wonderful trip, beautifully organized. The bullet train experience alone was worth it. Would have loved one more day in Kyoto but otherwise perfect.",
      },
    ],
    availableDates: [
      { id: "jd1", label: "Oct 01 - 10, 2026", startDate: "2026-10-01", endDate: "2026-10-10" },
      { id: "jd2", label: "Nov 15 - 24, 2026", startDate: "2026-11-15", endDate: "2026-11-24" },
    ],
  },
};

// Fallback for unknown trip IDs
const FALLBACK_TRIP = MOCK_TRIPS["trip_101"];

// --- Inclusion List Component ---
const InclusionList = ({
  items,
  type,
}: {
  items: InclusionItem[];
  type: "included" | "excluded";
}) => {
  const Icon = type === "included" ? CheckCircle2 : XCircle;
  const iconColor = type === "included" ? "text-green-600" : "text-destructive";

  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm">
          <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", iconColor)} />
          <span
            className={cn(
              "text-muted-foreground",
              item.isHighlighted && "text-foreground font-medium"
            )}
          >
            {item.title}
          </span>
        </li>
      ))}
    </ul>
  );
};

// --- Star Rating Component ---
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < rating ? "fill-primary text-primary" : "text-muted-foreground/30"
        )}
      />
    ))}
  </div>
);

// --- Main Page ---
const SelectedTripDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const tripId = searchParams.get("tripId") || "";

  const trip: TripDetailsData = useMemo(() => {
    // Try mock data first
    if (MOCK_TRIPS[tripId]) return MOCK_TRIPS[tripId];

    // Try localStorage cache
    try {
      const raw = localStorage.getItem("TRIP_HISTORY_CACHE");
      if (raw) {
        const history = JSON.parse(raw);
        const found = history.find((t: any) => t.id === tripId);
        if (found) {
          return {
            ...FALLBACK_TRIP,
            id: found.id,
            title: found.name || FALLBACK_TRIP.title,
            description: found.description || FALLBACK_TRIP.description,
            pricePerPerson: found.price || FALLBACK_TRIP.pricePerPerson,
            heroImage: found.pic || FALLBACK_TRIP.heroImage,
          };
        }
      }
    } catch {}

    return FALLBACK_TRIP;
  }, [tripId]);

  // Sidebar state
  const [selectedDateId, setSelectedDateId] = useState<string>("");
  const [groupType, setGroupType] = useState<string>("");

  // Pre-select date from previous page if stored
  useEffect(() => {
    try {
      const raw = localStorage.getItem("booking_session_data");
      if (raw) {
        const session = JSON.parse(raw);
        if (session.tripId === tripId && session.selectedDateId) {
          setSelectedDateId(session.selectedDateId);
        }
      }
    } catch {}
  }, [tripId]);

  const averageRating = useMemo(() => {
    if (!trip.reviews.length) return 0;
    return trip.reviews.reduce((acc, r) => acc + r.rating, 0) / trip.reviews.length;
  }, [trip.reviews]);

  const handleBookNow = () => {
    if (!selectedDateId) {
      toast({ title: "Please select a date", variant: "destructive" });
      return;
    }
    if (!groupType) {
      toast({ title: "Please select a group type", variant: "destructive" });
      return;
    }

    const selectedDate = trip.availableDates.find((d) => d.id === selectedDateId);

    const session = {
      tripId: trip.id,
      selectedDate: selectedDate
        ? { start: selectedDate.startDate, end: selectedDate.endDate }
        : null,
      selectedDateId,
      pricePerPerson: trip.pricePerPerson,
      groupType,
    };

    try {
      localStorage.setItem("booking_session_data", JSON.stringify(session));
    } catch (e) {
      console.warn("Failed to save booking session:", e);
    }

    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={trip.heroImage}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                {trip.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed">{trip.description}</p>
              <div className="flex flex-wrap gap-2">
                {trip.metaTags.map((tag) => (
                  <Badge
                    key={tag.label}
                    variant="secondary"
                    className="flex items-center gap-1.5 px-3 py-1.5"
                  >
                    {tag.label === "Duration" && <Clock className="w-3.5 h-3.5" />}
                    {tag.label === "Difficulty" && <Mountain className="w-3.5 h-3.5" />}
                    {tag.label === "Group Size" && <Users className="w-3.5 h-3.5" />}
                    {tag.label}: {tag.value}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Detailed Itinerary */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Detailed Itinerary
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {trip.itinerary.map((day, i) => (
                  <AccordionItem
                    key={i}
                    value={`day-${i}`}
                    className="border rounded-lg px-4 bg-card"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                          {day.dayLabel}
                        </span>
                        <span className="font-medium text-foreground">{day.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                      {day.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* What's Included / Not Included */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                What's Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-green-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Included
                  </h3>
                  <InclusionList items={trip.whatsIncluded} type="included" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-destructive flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Not Included
                  </h3>
                  <InclusionList items={trip.whatsNotIncluded} type="excluded" />
                </div>
              </div>
            </section>

            {/* Traveler Reviews */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  Traveler Reviews
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-semibold text-foreground">
                    {averageRating.toFixed(1)}
                  </span>
                  <span>({trip.reviews.length} reviews)</span>
                </div>
              </div>
              <div className="space-y-4">
                {trip.reviews.map((review) => (
                  <Card key={review.id} className="bg-card">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10 shrink-0">
                          <AvatarImage src={review.userAvatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                            {review.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <h4 className="font-semibold text-foreground text-sm">
                              {review.userName}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {review.dateGiven}
                            </span>
                          </div>
                          <StarRating rating={review.rating} />
                          <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                            {review.message}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sticky Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-lg border-primary/10">
                <CardContent className="p-6 space-y-6">
                  {/* Price */}
                  <div>
                    <span className="text-3xl font-bold text-foreground">
                      ${trip.pricePerPerson.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">per person</span>
                  </div>

                  {/* Available Dates */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-primary" />
                      Available Dates
                    </h3>
                    <div className="space-y-2">
                      {trip.availableDates.map((date) => (
                        <button
                          key={date.id}
                          onClick={() => setSelectedDateId(date.id)}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all",
                            selectedDateId === date.id
                              ? "border-primary bg-primary/10 text-primary font-medium"
                              : "border-border hover:border-primary/50 text-muted-foreground hover:bg-muted/50"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span>{date.label}</span>
                            {selectedDateId === date.id && (
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Group Type */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Group Type
                    </h3>
                    <Select value={groupType} onValueChange={setGroupType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select group type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small Group (up to 8)</SelectItem>
                        <SelectItem value="large">Large Group (9-20)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Book Now */}
                  <Button
                    onClick={handleBookNow}
                    className="w-full h-12 text-base font-semibold gap-2"
                    size="lg"
                  >
                    Book Now
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    No payment required now. Reserve your spot!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SelectedTripDetails;
