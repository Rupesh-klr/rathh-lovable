import { Clock, Users } from "lucide-react";
import ListingPageTemplate, { ListingItem } from "@/components/ListingPageTemplate";

const items: ListingItem[] = [
  { id: "t1", title: "Hidden Gems of Rome", description: "Skip the crowds and discover Rome's secret courtyards and trattorias.", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80", meta: [{ icon: <Clock className="w-4 h-4" />, text: "5 Days" }, { icon: <Users className="w-4 h-4" />, text: "Max 12 people" }] },
  { id: "t2", title: "Rajasthan Royal Trail", description: "Palaces, forts, and desert camps across India's royal state.", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80", meta: [{ icon: <Clock className="w-4 h-4" />, text: "8 Days" }, { icon: <Users className="w-4 h-4" />, text: "Max 10 people" }] },
  { id: "t3", title: "Patagonia Explorer", description: "Trek through glaciers and pristine wilderness at the edge of the world.", image: "https://images.unsplash.com/photo-1518182170546-0766ce6fec56?w=600&q=80", meta: [{ icon: <Clock className="w-4 h-4" />, text: "10 Days" }, { icon: <Users className="w-4 h-4" />, text: "Max 8 people" }] },
  { id: "t4", title: "Morocco Desert & Medinas", description: "Sahara camel treks, vibrant souks, and Berber hospitality.", image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80", meta: [{ icon: <Clock className="w-4 h-4" />, text: "7 Days" }, { icon: <Users className="w-4 h-4" />, text: "Max 15 people" }] },
  { id: "t5", title: "New Zealand Adventure", description: "Fjords, volcanoes, and Hobbiton — Middle-earth brought to life.", image: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80", meta: [{ icon: <Clock className="w-4 h-4" />, text: "12 Days" }, { icon: <Users className="w-4 h-4" />, text: "Max 10 people" }] },
  { id: "t6", title: "Vietnam North to South", description: "Hanoi street food, Ha Long Bay, and Mekong Delta boat rides.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", meta: [{ icon: <Clock className="w-4 h-4" />, text: "14 Days" }, { icon: <Users className="w-4 h-4" />, text: "Max 12 people" }] },
];

const ToursPage = () => (
  <ListingPageTemplate
    pageTitle="Curated Tours"
    pageSubtitle="Expert-led group tours designed for authentic, immersive travel."
    searchPlaceholder="Search tours..."
    items={items}
  />
);

export default ToursPage;
