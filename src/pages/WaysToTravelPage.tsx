import { Plane, Train, Ship, Car, Bike, Footprints } from "lucide-react";
import ListingPageTemplate, { ListingItem } from "@/components/ListingPageTemplate";

const items: ListingItem[] = [
  { id: "w1", title: "Flights", description: "The fastest way to reach far-flung destinations worldwide.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&q=80", meta: [{ icon: <Plane className="w-4 h-4" />, text: "Avg Price: $350" }] },
  { id: "w2", title: "Train Journeys", description: "Scenic rail routes that turn the journey into the destination.", image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80", meta: [{ icon: <Train className="w-4 h-4" />, text: "Avg Price: $120" }] },
  { id: "w3", title: "Cruises", description: "Luxury voyages across oceans with world-class amenities.", image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80", meta: [{ icon: <Ship className="w-4 h-4" />, text: "Avg Price: $900" }] },
  { id: "w4", title: "Road Trips", description: "Hit the open road and explore at your own pace.", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80", meta: [{ icon: <Car className="w-4 h-4" />, text: "Avg Price: $80/day" }] },
  { id: "w5", title: "Cycling Tours", description: "Eco-friendly adventures through countryside and coastal paths.", image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&q=80", meta: [{ icon: <Bike className="w-4 h-4" />, text: "Avg Price: $60/day" }] },
  { id: "w6", title: "Hiking & Trekking", description: "Explore remote trails and summit breathtaking peaks on foot.", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80", meta: [{ icon: <Footprints className="w-4 h-4" />, text: "Avg Price: $45/day" }] },
];

const WaysToTravelPage = () => (
  <ListingPageTemplate
    pageTitle="Ways to Travel"
    pageSubtitle="Choose your perfect mode of transport for every kind of adventure."
    searchPlaceholder="Search travel modes..."
    items={items}
  />
);

export default WaysToTravelPage;
