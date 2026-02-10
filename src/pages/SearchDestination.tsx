import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearch } from "@/contexts/SearchContext";
import { format, differenceInDays } from "date-fns";
import {
  MapPin,
  Calendar,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Tag,
  DollarSign,
  Clock,
  ArrowUpDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import TourCard, { type TourData } from "@/components/TourCard";

// --- MOCK BACKEND ---
const ENABLE_BACKEND_API = false;

const MOCK_TOURS: TourData[] = [
  {
    id: "trip_101",
    name: "Hidden Gems of Hyderabad",
    location: "Hyderabad, Telangana",
    price: 1200,
    offer: "10% Off",
    popularityScore: 95,
    bookingCount: 120,
    maxGuests: 15,
    startDate: "2026-03-01",
    endDate: "2026-03-05",
    duration: 5,
    description: "Explore the ancient streets and hidden culinary treasures.",
    pic: "https://images.unsplash.com/photo-1626014903700-1c5c58b44463?w=600&q=80",
    category: "Cultural Immersion",
  },
  {
    id: "trip_102",
    name: "Warangal Heritage Walk",
    location: "Warangal, Telangana",
    price: 800,
    offer: null,
    popularityScore: 80,
    bookingCount: 45,
    maxGuests: 20,
    startDate: "2026-03-10",
    endDate: "2026-03-12",
    duration: 3,
    description: "A journey through the Kakatiya dynasty's architectural marvels.",
    pic: "https://images.unsplash.com/photo-1634225252824-2c06180c5417?w=600&q=80",
    category: "Cultural Immersion",
  },
  {
    id: "trip_103",
    name: "Kerala Backwaters Retreat",
    location: "Alleppey, Kerala",
    price: 3500,
    offer: "Early Bird Deal",
    popularityScore: 98,
    bookingCount: 300,
    maxGuests: 4,
    startDate: "2026-04-05",
    endDate: "2026-04-12",
    duration: 8,
    description: "Relax on a houseboat cruising through serene waters.",
    pic: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    category: "Slow & Scenic",
  },
  {
    id: "trip_104",
    name: "Goa Beach & Party",
    location: "North Goa",
    price: 2800,
    offer: null,
    popularityScore: 92,
    bookingCount: 500,
    maxGuests: 50,
    startDate: "2026-02-28",
    endDate: "2026-03-04",
    duration: 5,
    description: "Experience the vibrant nightlife and sun-kissed beaches.",
    pic: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
    category: "Adventure Trails",
  },
];

type SortOption = "popularity" | "price_asc" | "duration" | "start_date" | "end_date";

interface FilterPayload {
  date: { start: Date | undefined; end: Date | undefined };
  duration: string[];
  categories: string[];
  destination: string[];
  priceRange: [number, number];
}

const performSearch = async (
  _url: string,
  _method: string,
  body: FilterPayload
): Promise<TourData[]> => {
  if (!ENABLE_BACKEND_API) {
    console.log("🔍 Search Payload:", body);
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_TOURS), 500));
  }
  const res = await fetch(_url, {
    method: _method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
};

// --- FILTER OPTIONS ---
const CATEGORY_OPTIONS = [
  { id: "adv", label: "Adventure Trails" },
  { id: "cul", label: "Cultural Immersion" },
  { id: "sce", label: "Slow & Scenic" },
  { id: "nat", label: "Nature & Wildlife" },
  { id: "foo", label: "Food & Wine" },
  { id: "spi", label: "Spiritual & Wellness" },
  { id: "fam", label: "Family Friendly" },
];

const DURATION_OPTIONS = [
  { id: "1-3", label: "1-3 Days" },
  { id: "4-7", label: "4-7 Days" },
  { id: "8-14", label: "8-14 Days" },
  { id: "15+", label: "15+ Days" },
];

const DESTINATION_OPTIONS = [
  { id: "hyd", label: "Hyderabad" },
  { id: "wgl", label: "Warangal" },
  { id: "ker", label: "Kerala" },
  { id: "goa", label: "Goa" },
  { id: "mum", label: "Mumbai" },
  { id: "del", label: "Delhi" },
  { id: "jai", label: "Jaipur" },
  { id: "che", label: "Chennai" },
];

const INITIAL_VISIBLE = 5;
const PRICE_MIN = 0;
const PRICE_MAX = 5000;

// --- Reusable Filter List Component ---
interface FilterOption {
  id: string;
  label: string;
}

interface FilterListProps {
  title: string;
  icon: React.ReactNode;
  options: FilterOption[];
  selected: string[];
  onToggle: (id: string) => void;
  onSelectAll: () => void;
}

const FilterList = ({ title, icon, options, selected, onToggle, onSelectAll }: FilterListProps) => {
  const [expanded, setExpanded] = useState(false);

  const sortedOptions = useMemo(() => {
    const checked = options.filter((o) => selected.includes(o.id));
    const unchecked = options.filter((o) => !selected.includes(o.id));
    return [...checked, ...unchecked];
  }, [options, selected]);

  const visibleOptions = expanded ? sortedOptions : sortedOptions.slice(0, INITIAL_VISIBLE);
  const hasMore = sortedOptions.length > INITIAL_VISIBLE;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          {icon}
          {title}
        </h3>
        {expanded && (
          <button
            onClick={onSelectAll}
            className="text-xs text-primary font-medium hover:underline"
          >
            Select All
          </button>
        )}
      </div>
      <div className="space-y-2">
        {visibleOptions.map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-3 cursor-pointer group py-1"
          >
            <Checkbox
              checked={selected.includes(option.id)}
              onCheckedChange={() => onToggle(option.id)}
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-primary font-medium hover:underline"
        >
          {expanded ? (
            <>
              See Less <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              See More ({sortedOptions.length - INITIAL_VISIBLE} more) <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

// --- MAIN PAGE ---
const SearchDestination = () => {
  const { searchParams } = useSearch();
  const isMobile = useIsMobile();

  // Filter state
  const [startDate, setStartDate] = useState<Date | undefined>(searchParams.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(searchParams.endDate);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (searchParams.category) {
      const match = CATEGORY_OPTIONS.find(
        (c) => c.label.toLowerCase() === searchParams.category?.toLowerCase()
      );
      return match ? [match.id] : [];
    }
    return [];
  });
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(() => {
    if (searchParams.destination) {
      const dest = searchParams.destination.toLowerCase();
      const match = DESTINATION_OPTIONS.find((d) =>
        dest.includes(d.label.toLowerCase())
      );
      return match ? [match.id] : [];
    }
    return [];
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [minPriceInput, setMinPriceInput] = useState(String(PRICE_MIN));
  const [maxPriceInput, setMaxPriceInput] = useState(String(PRICE_MAX));
  const [tours, setTours] = useState<TourData[]>(MOCK_TOURS);
  const [loading, setLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");

  const sortedTours = useMemo(() => {
    const sorted = [...tours];
    switch (sortBy) {
      case "popularity":
        return sorted.sort((a, b) => b.popularityScore - a.popularityScore);
      case "price_asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "duration":
        return sorted.sort((a, b) => a.duration - b.duration);
      case "start_date":
        return sorted.sort((a, b) => a.startDate.localeCompare(b.startDate));
      case "end_date":
        return sorted.sort((a, b) => a.endDate.localeCompare(b.endDate));
      default:
        return sorted;
    }
  }, [tours, sortBy]);

  // Auto-calculate duration from dates
  useEffect(() => {
    if (startDate && endDate) {
      const days = differenceInDays(endDate, startDate);
      let durationId = "";
      if (days >= 1 && days <= 3) durationId = "1-3";
      else if (days >= 4 && days <= 7) durationId = "4-7";
      else if (days >= 8 && days <= 14) durationId = "8-14";
      else if (days >= 15) durationId = "15+";
      if (durationId && !selectedDurations.includes(durationId)) {
        setSelectedDurations((prev) => [...prev, durationId]);
      }
    }
  }, [startDate, endDate]);

  // Sync price slider ↔ inputs
  useEffect(() => {
    setMinPriceInput(String(priceRange[0]));
    setMaxPriceInput(String(priceRange[1]));
  }, [priceRange]);

  const handleMinPriceBlur = () => {
    const val = Math.max(PRICE_MIN, Math.min(Number(minPriceInput) || 0, priceRange[1]));
    setPriceRange([val, priceRange[1]]);
  };

  const handleMaxPriceBlur = () => {
    const val = Math.min(PRICE_MAX, Math.max(Number(maxPriceInput) || 0, priceRange[0]));
    setPriceRange([priceRange[0], val]);
  };

  const toggleFilter = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string[]>>, id: string) => {
      setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    },
    []
  );

  const clearAll = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedCategories([]);
    setSelectedDurations([]);
    setSelectedDestinations([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
  };

  const applyFilters = async () => {
    setLoading(true);
    const payload: FilterPayload = {
      date: { start: startDate, end: endDate },
      duration: selectedDurations,
      categories: selectedCategories,
      destination: selectedDestinations,
      priceRange,
    };
    const results = await performSearch("/api/search", "POST", payload);
    setTours(results);
    setLoading(false);
    if (isMobile) setMobileFiltersOpen(false);
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedDurations.length +
    selectedDestinations.length +
    (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX ? 1 : 0) +
    (startDate ? 1 : 0) +
    (endDate ? 1 : 0);

  // --- Sidebar Content ---
  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Date Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Travel Dates
        </h3>
        <div className="space-y-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-9 text-sm",
                  !startDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Start Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={startDate}
                onSelect={(d) => {
                  setStartDate(d);
                  setEndDate(undefined);
                }}
                disabled={(d) => d < new Date()}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-9 text-sm",
                  !endDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "End Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(d) => d < (startDate || new Date())}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Categories */}
      <FilterList
        title="Travel Styles"
        icon={<Tag className="w-4 h-4 text-primary" />}
        options={CATEGORY_OPTIONS}
        selected={selectedCategories}
        onToggle={(id) => toggleFilter(setSelectedCategories, id)}
        onSelectAll={() => setSelectedCategories(CATEGORY_OPTIONS.map((c) => c.id))}
      />

      <div className="h-px bg-border" />

      {/* Duration */}
      <FilterList
        title="Duration"
        icon={<Clock className="w-4 h-4 text-primary" />}
        options={DURATION_OPTIONS}
        selected={selectedDurations}
        onToggle={(id) => toggleFilter(setSelectedDurations, id)}
        onSelectAll={() => setSelectedDurations(DURATION_OPTIONS.map((d) => d.id))}
      />

      <div className="h-px bg-border" />

      {/* Destinations */}
      <FilterList
        title="Destinations"
        icon={<MapPin className="w-4 h-4 text-primary" />}
        options={DESTINATION_OPTIONS}
        selected={selectedDestinations}
        onToggle={(id) => toggleFilter(setSelectedDestinations, id)}
        onSelectAll={() => setSelectedDestinations(DESTINATION_OPTIONS.map((d) => d.id))}
      />

      <div className="h-px bg-border" />

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          Price Range
        </h3>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">Min ($)</label>
            <Input
              type="number"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              onBlur={handleMinPriceBlur}
              className="h-9 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">Max ($)</label>
            <Input
              type="number"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              onBlur={handleMaxPriceBlur}
              className="h-9 text-sm"
            />
          </div>
        </div>
        <Slider
          value={priceRange}
          onValueChange={(val) => setPriceRange(val as [number, number])}
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={50}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={clearAll}>
          Clear All
        </Button>
        <Button className="flex-1" onClick={applyFilters} disabled={loading}>
          {loading ? "Searching..." : "Apply Filters"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Search Results
              </h1>
              <p className="text-muted-foreground mt-1">
                {tours.length} tours found
                {searchParams.destination && (
                  <span>
                    {" "}
                    for <span className="text-foreground font-medium">{searchParams.destination}</span>
                  </span>
                )}
              </p>
            </div>

            {/* Active Filters Summary */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Active:</span>
                {selectedDestinations.map((id) => {
                  const opt = DESTINATION_OPTIONS.find((d) => d.id === id);
                  return opt ? (
                    <Badge key={id} variant="secondary" className="gap-1">
                      {opt.label}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => toggleFilter(setSelectedDestinations, id)}
                      />
                    </Badge>
                  ) : null;
                })}
                {selectedCategories.map((id) => {
                  const opt = CATEGORY_OPTIONS.find((c) => c.id === id);
                  return opt ? (
                    <Badge key={id} variant="secondary" className="gap-1">
                      {opt.label}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => toggleFilter(setSelectedCategories, id)}
                      />
                    </Badge>
                  ) : null;
                })}
                {activeFilterCount > 2 && (
                  <button onClick={clearAll} className="text-xs text-primary hover:underline">
                    Clear all
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            {!isMobile && (
              <aside className="w-72 shrink-0">
                <div className="sticky top-24 bg-card rounded-xl border border-border p-5">
                  <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-5">
                    <SlidersHorizontal className="w-4 h-4 text-primary" />
                    Filters
                  </h2>
                  <SidebarContent />
                </div>
              </aside>
            )}

            {/* Mobile Filter Button */}
            {isMobile && (
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 shadow-lg gap-2"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-5 mt-4">
                    <SlidersHorizontal className="w-4 h-4 text-primary" />
                    Filters
                  </h2>
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            )}

            {/* Results Grid */}
            <div className="flex-1">
              {/* Sorting Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {sortedTours.length} results
                </p>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                    <SelectTrigger className="w-48 h-9 text-sm">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="price_asc">Price: Low to High</SelectItem>
                      <SelectItem value="duration">Duration (Shortest)</SelectItem>
                      <SelectItem value="start_date">Event Start Date</SelectItem>
                      <SelectItem value="end_date">Event End Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {loading ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="overflow-hidden animate-pulse">
                      <div className="h-48 bg-muted" />
                      <CardContent className="p-4 space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                        <div className="h-3 bg-muted rounded w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : sortedTours.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {sortedTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    No tours found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchDestination;
