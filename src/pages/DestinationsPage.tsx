import { MapPin, TrendingUp } from "lucide-react";
import ListingPageTemplate, { ListingItem } from "@/components/ListingPageTemplate";

const items: ListingItem[] = [
  { id: "d1", title: "Paris, France", description: "The City of Light — art, cuisine, and romance at every corner.", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", badges: [{ label: "🔥 Trending", variant: "destructive" }], meta: [{ icon: <MapPin className="w-4 h-4" />, text: "120+ Tours Available" }] },
  { id: "d2", title: "Bali, Indonesia", description: "Tropical paradise with sacred temples and emerald rice terraces.", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", badges: [{ label: "Popular", variant: "secondary" }], meta: [{ icon: <MapPin className="w-4 h-4" />, text: "85+ Tours Available" }] },
  { id: "d3", title: "Tokyo, Japan", description: "A thrilling blend of ultra-modern and centuries-old traditions.", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", badges: [{ label: "🔥 Trending", variant: "destructive" }], meta: [{ icon: <TrendingUp className="w-4 h-4" />, text: "95+ Tours Available" }] },
  { id: "d4", title: "Santorini, Greece", description: "Iconic white-washed buildings perched above a deep-blue caldera.", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80", badges: [{ label: "Popular", variant: "secondary" }], meta: [{ icon: <MapPin className="w-4 h-4" />, text: "60+ Tours Available" }] },
  { id: "d5", title: "Cusco, Peru", description: "Gateway to Machu Picchu and the heart of the Inca Empire.", image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80", badges: [{ label: "Adventure", variant: "outline" }], meta: [{ icon: <MapPin className="w-4 h-4" />, text: "40+ Tours Available" }] },
  { id: "d6", title: "Cape Town, South Africa", description: "Stunning landscapes from Table Mountain to the Cape of Good Hope.", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80", badges: [{ label: "Hidden Gem" }], meta: [{ icon: <MapPin className="w-4 h-4" />, text: "35+ Tours Available" }] },
];

const DestinationsPage = () => (
  <ListingPageTemplate
    pageTitle="Explore Destinations"
    pageSubtitle="Discover breathtaking places around the world handpicked for unforgettable experiences."
    searchPlaceholder="Search destinations..."
    items={items}
  />
);

export default DestinationsPage;
