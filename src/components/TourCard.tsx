import { MapPin, Eye, ExternalLink, Users, CalendarDays, Percent, TicketCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface TourData {
  id: string;
  name: string;
  location: string;
  price: number;
  offer: string | null;
  popularityScore: number;
  bookingCount: number;
  maxGuests: number;
  startDate: string;
  endDate: string;
  duration: number;
  description: string;
  pic: string;
  category?: string;
}

const TRIP_HISTORY_KEY = "TRIP_HISTORY_CACHE";
const STORAGE_LIMIT = 100;
const CLEANUP_AMOUNT = 70;

const handleViewDetails = (trip: TourData) => {
  try {
    const raw = localStorage.getItem(TRIP_HISTORY_KEY);
    const history: TourData[] = raw ? JSON.parse(raw) : [];
    history.push(trip);

    if (history.length > STORAGE_LIMIT) {
      const kept = history.slice(history.length - (STORAGE_LIMIT - CLEANUP_AMOUNT));
      localStorage.setItem(TRIP_HISTORY_KEY, JSON.stringify(kept));
    } else {
      localStorage.setItem(TRIP_HISTORY_KEY, JSON.stringify(history));
    }
  } catch (e) {
    console.warn("Failed to update trip history cache:", e);
  }

  const url = `/selected-trip-details?tripId=${trip.id}`;
  window.open(url, "_blank");
};

interface TourCardProps {
  tour: TourData;
}

const TourCard = ({ tour }: TourCardProps) => {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour.pic}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        {tour.category && (
          <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm">
            {tour.category}
          </Badge>
        )}
        {tour.offer && (
          <Badge variant="destructive" className="absolute top-3 right-12 backdrop-blur-sm">
            {tour.offer}
          </Badge>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <button className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background z-10">
              <Eye className="w-4 h-4 text-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 z-50" side="left" align="start">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-foreground">{tour.name}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-primary" />
                  <span>{tour.startDate} → {tour.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TicketCheck className="w-3.5 h-3.5 text-primary" />
                  <span>{tour.duration} Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  <span>Max {tour.maxGuests} Guests</span>
                </div>
                {tour.offer && (
                  <div className="flex items-center gap-2">
                    <Percent className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary font-medium">{tour.offer}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <TicketCheck className="w-3.5 h-3.5 text-primary" />
                  <span>{tour.bookingCount} Bookings</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <CardContent className="p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
          {tour.name}
        </h3>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
          <MapPin className="w-3.5 h-3.5" />
          {tour.location}
        </p>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {tour.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">
            ${tour.price.toLocaleString()}
          </span>
          <Button size="sm" className="gap-1" onClick={() => handleViewDetails(tour)}>
            <ExternalLink className="w-4 h-4" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TourCard;
