import { useState } from "react";
import { MapPin, ChevronDown, Search } from "lucide-react";
import citiesData from "@/data/cities.json";
import eventTagsData from "@/data/eventTags.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface EventFiltersProps {
  selectedCity: string;
  selectedTags: string[];
  searchQuery: string;
  onCityChange: (city: string) => void;
  onTagToggle: (tagId: string) => void;
  onSearchChange: (query: string) => void;
}

const EventFilters = ({
  selectedCity,
  selectedTags,
  searchQuery,
  onCityChange,
  onTagToggle,
  onSearchChange,
}: EventFiltersProps) => {
  return (
    <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-6 shadow-card">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search events, festivals, experiences..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-12 text-base bg-background border-border rounded-xl focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* City Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          <MapPin className="w-4 h-4 inline mr-1 text-primary" />
          Select City
        </label>
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="w-full h-12 bg-background border-border rounded-xl">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <SelectItem value="all">All Cities</SelectItem>
            {citiesData.cities.map((city) => (
              <SelectItem key={city.id} value={city.id}>
                {city.name}, {city.state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tags Filter */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Event Type
        </label>
        <div className="flex flex-wrap gap-2">
          {eventTagsData.tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagToggle(tag.id)}
              className={`filter-chip ${
                selectedTags.includes(tag.id) ? "active" : ""
              }`}
            >
              <span className="mr-1">{tag.icon}</span>
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventFilters;
