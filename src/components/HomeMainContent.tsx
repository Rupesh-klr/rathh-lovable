import { useNavigate } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

// Image imports for destination cards
import hyderabadImg from "@/assets/destinations/hyderabad-charminar.jpg";
import warangalImg from "@/assets/destinations/warangal-fort.jpg";
import rangaReddyImg from "@/assets/destinations/ranga-reddy.jpg";
import tirupatiImg from "@/assets/destinations/tirupati-temple.jpg";
import godavariImg from "@/assets/destinations/godavari-river.jpg";
import krishnaImg from "@/assets/destinations/krishna-barrage.jpg";
import safariImg from "@/assets/destinations/wildlife-safari.jpg";
import tribalImg from "@/assets/destinations/tribal-traditions.jpg";
import culturalImg from "@/assets/destinations/cultural-celebration.jpg";
import festivalImg from "@/assets/destinations/festival-colors.jpg";
import nightlifeImg from "@/assets/destinations/nightlife-party.jpg";
import gatheringImg from "@/assets/destinations/public-gathering.jpg";

// Data structures
const DESTINATION_DATA = [
  { id: 1, label: "Hyderabad", destinationName: "Hyderabad, Telangana", imageAlt: "Charminar Hyderabad", image: hyderabadImg },
  { id: 2, label: "Warangal", destinationName: "Warangal, Telangana", imageAlt: "Warangal Fort Arch", image: warangalImg },
  { id: 3, label: "Ranga Reddy", destinationName: "Ranga Reddy District", imageAlt: "Ranga Reddy landscape", image: rangaReddyImg },
  { id: 4, label: "Tirupati (Chittoor)", destinationName: "Tirupati, Chittoor", imageAlt: "Tirumala Temple", image: tirupatiImg },
  { id: 5, label: "East Godavari", destinationName: "East Godavari, AP", imageAlt: "Godavari River boat", image: godavariImg },
  { id: 6, label: "Krishna", destinationName: "Krishna District, AP", imageAlt: "Prakasam Barrage", image: krishnaImg },
  { id: 7, label: "Wildlife Safari", destinationName: "category:wildlife", imageAlt: "Jeep safari animals", image: safariImg },
  { id: 8, label: "Tribal Traditions", destinationName: "category:tribal", imageAlt: "Tribal dance ceremony", image: tribalImg },
  { id: 9, label: "Cultural Celebrations", destinationName: "category:culture", imageAlt: "Traditional indian celebration", image: culturalImg },
  { id: 10, label: "Major Festivals", destinationName: "category:festival", imageAlt: "Holi or Diwali festival colors", image: festivalImg },
  { id: 11, label: "Nightlife & Parties", destinationName: "category:nightlife", imageAlt: "City party nightlife", image: nightlifeImg },
  { id: 12, label: "Public Gatherings", destinationName: "category:gathering", imageAlt: "Large public square gathering", image: gatheringImg },
];

const CATEGORY_DATA = [
  {
    id: "cat_adv",
    iconName: "MountainSnow" as const,
    label: "Adventure Trails",
    description: "Explore rugged landscapes and exhilarating trails.",
    enableNavigation: true
  },
  {
    id: "cat_cult",
    iconName: "Globe" as const,
    label: "Cultural Immersion",
    description: "Dive deep into local traditions and heritage.",
    enableNavigation: true
  },
  {
    id: "cat_relax",
    iconName: "HeartHandshake" as const,
    label: "Slow & Scenic",
    description: "Unwind in serene settings and luxurious stays.",
    enableNavigation: false
  },
  {
    id: "cat_nature",
    iconName: "Leaf" as const,
    label: "Nature & Wildlife",
    description: "Encounter diverse wildlife in their natural habitats.",
    enableNavigation: true
  }
];

const FEATURES_DATA = [
  {
    id: "feat_1",
    iconName: "Users" as const,
    title: "Local Storytellers",
    description: "Benefit from the knowledge and passion of seasoned local experts who bring destinations to life."
  },
  {
    id: "feat_2",
    iconName: "Star" as const,
    title: "Intimate Group Travel",
    description: "Enjoy intimate experiences with like-minded travelers, fostering genuine connections."
  },
  {
    id: "feat_3",
    iconName: "ShieldCheck" as const,
    title: "Responsible Tourism",
    description: "We are committed to responsible tourism that respects local cultures and environments."
  }
];

const DISPLAY_LIMIT = 12;

// Helper function to get icon component by name
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    MountainSnow: Icons.MountainSnow,
    Globe: Icons.Globe,
    HeartHandshake: Icons.HeartHandshake,
    Leaf: Icons.Leaf,
    Users: Icons.Users,
    Star: Icons.Star,
    ShieldCheck: Icons.ShieldCheck,
  };
  return iconMap[iconName] || Icons.MapPin;
};

const HomeMainContent = () => {
  const navigate = useNavigate();
  const { setSearchParams } = useSearch();

  // Section 2.1: Discover Button
  const handleDiscoverClick = () => {
    navigate("/search-destination");
  };

  // Section 2.2: Destination Card Click
  const handleDestinationClick = (destinationName: string) => {
    setSearchParams({
      destination: destinationName,
      startDate: undefined,
      endDate: undefined,
      category: undefined
    });
    navigate("/search-destination");
  };

  // Section 2.3: Category Card Click
  const handleCategoryClick = (category: any) => {
    if (category.enableNavigation) {
      setSearchParams({
        destination: "",
        startDate: undefined,
        endDate: undefined,
        category: category.label
      });
      navigate("/search-destination");
    }
  };

  return (
    <div className="w-full">
      {/* Section 2.1: Discover Button */}
      <div className="flex justify-center py-8">
        <Button
          onClick={handleDiscoverClick}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-3 text-lg rounded-lg"
        >
          Discover experiences
        </Button>
      </div>

      {/* Section 2.2: Handpicked Cultural Journeys */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Handpicked Cultural Journeys
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATION_DATA.slice(0, DISPLAY_LIMIT).map((destination) => (
            <button
              key={destination.id}
              onClick={() => handleDestinationClick(destination.destinationName)}
              className="group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="rounded-lg overflow-hidden bg-white shadow-lg">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={destination.image}
                    alt={destination.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-white">
                  <p className="font-semibold text-center text-foreground">
                    {destination.label}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Section 2.3: Choose How You Want to Experience */}
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-muted/30">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Choose How You Want to Experience
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_DATA.map((category) => {
            const IconComponent = getIconComponent(category.iconName);
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                disabled={!category.enableNavigation}
                className={cn(
                  "p-6 rounded-lg border transition-all duration-300",
                  category.enableNavigation
                    ? "bg-white border-border shadow-sm hover:shadow-md cursor-pointer hover:border-primary"
                    : "bg-muted border-muted-foreground/20 opacity-60 cursor-not-allowed"
                )}
              >
                <div className="flex flex-col items-center text-center">
                  <IconComponent className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    {category.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  {!category.enableNavigation && (
                    <p className="text-xs text-muted-foreground mt-2 italic">Coming Soon</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Section 2.4: Why Travelers Choose Rathh */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Why Travelers Choose Rathh
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature) => {
            const IconComponent = getIconComponent(feature.iconName);
            return (
              <div key={feature.id} className="flex flex-col items-center md:items-start text-center md:text-left">
                <IconComponent className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomeMainContent;
