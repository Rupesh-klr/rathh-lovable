import { MapPin, Calendar, Clock, Users, Tag } from "lucide-react";
import { Event } from "@/data/sampleEvents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import eventTagsData from "@/data/eventTags.json";

interface EventCardProps {
  event: Event;
  onBookClick: (event: Event) => void;
}

const EventCard = ({ event, onBookClick }: EventCardProps) => {
  const seatsLeft = event.maxSeats - event.bookedSeats;
  const isAlmostFull = seatsLeft <= 5;
  
  const getTagInfo = (tagId: string) => {
    return eventTagsData.tags.find(t => t.id === tagId);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="card-cultural overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="font-semibold text-primary">₹{event.price.toLocaleString()}</span>
            {event.discountPercent && (
              <span className="ml-1 text-xs text-accent">-{event.discountPercent}%</span>
            )}
          </div>
        </div>

        {/* Online/Offline Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={event.isOnline ? "secondary" : "default"} className="text-xs">
            {event.isOnline ? "🌐 Online" : "📍 In Person"}
          </Badge>
        </div>

        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          {event.tags.slice(0, 2).map(tagId => {
            const tag = getTagInfo(tagId);
            return tag ? (
              <span key={tagId} className="text-xs bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full">
                {tag.icon} {tag.name}
              </span>
            ) : null;
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{formatDate(event.date)}</span>
            <Clock className="w-4 h-4 text-primary ml-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className={isAlmostFull ? "text-destructive font-medium" : "text-muted-foreground"}>
              {seatsLeft} seats left
            </span>
            {isAlmostFull && (
              <Badge variant="destructive" className="text-xs ml-auto">
                Almost Full!
              </Badge>
            )}
          </div>
        </div>

        {/* Host Info */}
        <div className="flex items-center gap-3 py-3 border-t border-border">
          <img 
            src={event.host.avatar} 
            alt={event.host.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{event.host.name}</p>
            <p className="text-xs text-muted-foreground truncate">{event.host.bio}</p>
          </div>
        </div>

        {/* Book Button */}
        <Button 
          onClick={() => onBookClick(event)}
          className="w-full mt-4 btn-saffron"
          disabled={seatsLeft === 0}
        >
          {seatsLeft === 0 ? "Sold Out" : "Reserve Seat"}
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
