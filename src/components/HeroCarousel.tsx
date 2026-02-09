import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useSearch } from "@/contexts/SearchContext";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import heroCultural from "@/assets/hero-cultural.jpg";

const heroImages = [
  heroCultural,
  "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1920&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&q=80",
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const navigate = useNavigate();
  const { setSearchParams } = useSearch();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleSearch = () => {
    setSearchParams({
      destination,
      startDate,
      endDate,
    });
    navigate("/search-destination");
  };

  return (
    <section className="relative pt-16">
      {/* Carousel Container */}
      <div className="relative h-[70vh] md:h-[80vh] mx-4 md:mx-8 mt-4 rounded-3xl overflow-hidden">
        {/* Background Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Hero slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/30 to-foreground/60" />
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/40 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/40 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-background"
                  : "bg-background/50 hover:bg-background/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-background max-w-4xl leading-tight">
            Travel Beyond Sight.
            <br />
            <span className="text-background/90">Experience the Story.</span>
          </h1>
        </div>
      </div>

      {/* Search Bar - Overlapping */}
      <div className="relative -mt-10 mx-4 md:mx-auto md:max-w-5xl z-10">
        <div className="bg-background rounded-2xl shadow-xl border border-border p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Where to */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Where to?
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Start Date
              </label>
               <Popover>
                 <PopoverTrigger asChild>
                   <Button
                     variant="outline"
                     className={cn(
                       "w-full h-12 justify-start text-left font-normal",
                       !startDate && "text-muted-foreground"
                     )}
                   >
                     <Calendar className="mr-2 h-5 w-5" />
                     {startDate ? format(startDate, "PPP") : "Pick a date"}
                   </Button>
                 </PopoverTrigger>
                 <PopoverContent className="w-auto p-0" align="start">
                   <CalendarComponent
                     mode="single"
                     selected={startDate}
                     onSelect={(date) => {
                       setStartDate(date);
                       setEndDate(undefined);
                     }}
                     initialFocus
                     className="pointer-events-auto"
                     disabled={(date) => date < new Date()}
                   />
                 </PopoverContent>
               </Popover>
            </div>

            {/* End Date */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                End Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="pointer-events-auto"
                    disabled={(date) => date < (startDate || new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="w-full md:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
