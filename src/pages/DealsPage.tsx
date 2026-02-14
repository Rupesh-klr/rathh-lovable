import ListingPageTemplate, { ListingItem } from "@/components/ListingPageTemplate";

const items: ListingItem[] = [
  { id: "dl1", title: "Bali Beach Bliss", description: "7 nights at a luxury beachfront resort with breakfast included.", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", badges: [{ label: "30% OFF", variant: "destructive" }], priceOld: "$1,400", priceNew: "$980" },
  { id: "dl2", title: "European Highlights", description: "12-day tour covering Paris, Rome, and Barcelona.", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80", badges: [{ label: "25% OFF", variant: "destructive" }], priceOld: "$3,200", priceNew: "$2,400" },
  { id: "dl3", title: "Japan Cherry Blossom", description: "Spring special — guided tour through Kyoto and Tokyo.", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", badges: [{ label: "20% OFF", variant: "destructive" }], priceOld: "$2,800", priceNew: "$2,240" },
  { id: "dl4", title: "Safari Adventure", description: "5-day Kenyan safari with luxury tented camp stays.", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80", badges: [{ label: "15% OFF", variant: "destructive" }], priceOld: "$3,500", priceNew: "$2,975" },
  { id: "dl5", title: "Maldives Escape", description: "4 nights overwater villa with all-inclusive dining.", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", badges: [{ label: "40% OFF", variant: "destructive" }], priceOld: "$5,000", priceNew: "$3,000" },
  { id: "dl6", title: "Iceland Northern Lights", description: "Winter getaway with glacier hike and aurora viewing.", image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=600&q=80", badges: [{ label: "10% OFF", variant: "destructive" }], priceOld: "$2,100", priceNew: "$1,890" },
];

const DealsPage = () => (
  <ListingPageTemplate
    pageTitle="Hot Deals & Offers"
    pageSubtitle="Limited-time travel packages at unbeatable prices. Book before they're gone!"
    searchPlaceholder="Search deals..."
    items={items}
  />
);

export default DealsPage;
