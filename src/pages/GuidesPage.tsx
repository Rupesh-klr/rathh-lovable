import { User, Clock } from "lucide-react";
import ListingPageTemplate, { ListingItem } from "@/components/ListingPageTemplate";

const items: ListingItem[] = [
  { id: "g1", title: "First-Timer's Guide to Southeast Asia", description: "Everything you need to know before your first backpacking trip.", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80", meta: [{ icon: <User className="w-4 h-4" />, text: "Priya Sharma" }, { icon: <Clock className="w-4 h-4" />, text: "8 min read" }] },
  { id: "g2", title: "Budget Travel Hacks for 2026", description: "Save money without sacrificing comfort on your next trip.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", meta: [{ icon: <User className="w-4 h-4" />, text: "Arjun Mehta" }, { icon: <Clock className="w-4 h-4" />, text: "5 min read" }] },
  { id: "g3", title: "How to Pack for Any Climate", description: "A versatile packing system that works from tropical to arctic.", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80", meta: [{ icon: <User className="w-4 h-4" />, text: "Meera Nair" }, { icon: <Clock className="w-4 h-4" />, text: "6 min read" }] },
  { id: "g4", title: "Navigating Travel Insurance", description: "What to look for, what to avoid, and when you really need it.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80", meta: [{ icon: <User className="w-4 h-4" />, text: "Ravi Teja" }, { icon: <Clock className="w-4 h-4" />, text: "7 min read" }] },
  { id: "g5", title: "Solo Female Travel: Safety & Joy", description: "Empowering tips from seasoned solo women travelers.", image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80", meta: [{ icon: <User className="w-4 h-4" />, text: "Ananya Rao" }, { icon: <Clock className="w-4 h-4" />, text: "10 min read" }] },
  { id: "g6", title: "Photography Tips for Travelers", description: "Capture stunning travel photos with just your smartphone.", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80", meta: [{ icon: <User className="w-4 h-4" />, text: "Karan Patel" }, { icon: <Clock className="w-4 h-4" />, text: "4 min read" }] },
];

const GuidesPage = () => (
  <ListingPageTemplate
    pageTitle="Travel Guides"
    pageSubtitle="Expert advice and insider tips to make every trip smoother."
    searchPlaceholder="Search guides..."
    items={items}
  />
);

export default GuidesPage;
