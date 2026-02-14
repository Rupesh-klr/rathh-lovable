import { Star, BarChart3 } from "lucide-react";
import ListingPageTemplate, { ListingItem } from "@/components/ListingPageTemplate";

const items: ListingItem[] = [
  { id: "a1", title: "Scuba Diving", description: "Explore vibrant coral reefs and encounter marine wildlife up close.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", badges: [{ label: "Medium", variant: "secondary" }], meta: [{ icon: <Star className="w-4 h-4 text-primary" />, text: "4.8 / 5" }] },
  { id: "a2", title: "Hot Air Balloon Ride", description: "Soar above breathtaking landscapes at sunrise.", image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=600&q=80", badges: [{ label: "Easy" }], meta: [{ icon: <Star className="w-4 h-4 text-primary" />, text: "4.9 / 5" }] },
  { id: "a3", title: "Rock Climbing", description: "Scale natural rock faces with expert guides and safety gear.", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80", badges: [{ label: "Hard", variant: "destructive" }], meta: [{ icon: <Star className="w-4 h-4 text-primary" />, text: "4.7 / 5" }] },
  { id: "a4", title: "Cooking Class", description: "Learn authentic local recipes from master chefs in their kitchens.", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80", badges: [{ label: "Easy" }], meta: [{ icon: <Star className="w-4 h-4 text-primary" />, text: "4.9 / 5" }] },
  { id: "a5", title: "White Water Rafting", description: "Navigate thrilling rapids on some of the world's best rivers.", image: "https://images.unsplash.com/photo-1530866495561-507c58b06925?w=600&q=80", badges: [{ label: "Hard", variant: "destructive" }], meta: [{ icon: <Star className="w-4 h-4 text-primary" />, text: "4.6 / 5" }] },
  { id: "a6", title: "Wine Tasting Tour", description: "Visit renowned vineyards and sample award-winning wines.", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80", badges: [{ label: "Easy" }], meta: [{ icon: <Star className="w-4 h-4 text-primary" />, text: "4.8 / 5" }] },
];

const ActivitiesPage = () => (
  <ListingPageTemplate
    pageTitle="Activities & Experiences"
    pageSubtitle="Thrilling adventures and enriching experiences for every traveler."
    searchPlaceholder="Search activities..."
    items={items}
  />
);

export default ActivitiesPage;
