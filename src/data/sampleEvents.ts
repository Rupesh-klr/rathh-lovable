export interface Event {
  id: string;
  title: string;
  description: string;
  city: string;
  tags: string[];
  date: string;
  time: string;
  price: number;
  discountCode?: string;
  discountPercent?: number;
  maxSeats: number;
  bookedSeats: number;
  image: string;
  host: {
    name: string;
    avatar: string;
    bio: string;
  };
  isOnline: boolean;
  venue?: string;
}

export const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Bonalu Jathara Festival Experience",
    description: "Immerse yourself in the vibrant Bonalu festival, a traditional Hindu celebration dedicated to Goddess Mahakali. Witness colorful processions, traditional music, and authentic Telugu culture.",
    city: "hyderabad",
    tags: ["jathara", "religious", "festival"],
    date: "2026-02-15",
    time: "09:00",
    price: 1500,
    discountCode: "BONALU25",
    discountPercent: 25,
    maxSeats: 50,
    bookedSeats: 32,
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800",
    host: {
      name: "Lakshmi Devi",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100",
      bio: "Cultural historian with 15+ years experience in Telugu traditions"
    },
    isOnline: false,
    venue: "Old City, Hyderabad"
  },
  {
    id: "2",
    title: "Royal Rajasthani Food Festival",
    description: "A culinary journey through the royal kitchens of Rajasthan. Learn to prepare authentic Dal Baati Churma, Laal Maas, and more from master chefs.",
    city: "jaipur",
    tags: ["food-party", "cooking"],
    date: "2026-02-20",
    time: "18:00",
    price: 2500,
    maxSeats: 30,
    bookedSeats: 28,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
    host: {
      name: "Chef Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      bio: "Royal chef trained in the traditions of Rajput cuisine"
    },
    isOnline: false,
    venue: "Nahargarh Fort, Jaipur"
  },
  {
    id: "3",
    title: "Warli Tribal Art Workshop",
    description: "Learn the ancient Warli art form from tribal artists. Create your own Warli paintings using traditional techniques passed down through generations.",
    city: "mumbai",
    tags: ["tribal", "art"],
    date: "2026-02-18",
    time: "10:00",
    price: 1800,
    discountCode: "TRIBAL20",
    discountPercent: 20,
    maxSeats: 20,
    bookedSeats: 12,
    image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800",
    host: {
      name: "Jivya Soma Mashe",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
      bio: "Warli artist and cultural ambassador"
    },
    isOnline: false,
    venue: "Kala Ghoda Arts District, Mumbai"
  },
  {
    id: "4",
    title: "Kathakali Dance Performance & Workshop",
    description: "Experience the mesmerizing art of Kathakali - classical Indian dance-drama. Watch a live performance followed by an interactive workshop on makeup and movements.",
    city: "kochi",
    tags: ["music", "art", "heritage"],
    date: "2026-02-22",
    time: "17:00",
    price: 2000,
    maxSeats: 40,
    bookedSeats: 25,
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
    host: {
      name: "Kalamandalam Gopi",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      bio: "Kathakali maestro with international recognition"
    },
    isOnline: false,
    venue: "Kerala Kalamandalam, Kochi"
  },
  {
    id: "5",
    title: "Ganga Aarti Evening Ceremony",
    description: "Participate in the sacred Ganga Aarti at the famous Dashashwamedh Ghat. An unforgettable spiritual experience on the banks of the holy Ganges.",
    city: "varanasi",
    tags: ["religious", "heritage"],
    date: "2026-02-25",
    time: "18:30",
    price: 800,
    maxSeats: 100,
    bookedSeats: 67,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
    host: {
      name: "Pandit Rajan Mishra",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      bio: "Spiritual guide and Ganga heritage expert"
    },
    isOnline: false,
    venue: "Dashashwamedh Ghat, Varanasi"
  },
  {
    id: "6",
    title: "Bihu Festival Celebration",
    description: "Join the joyous Bihu celebration featuring traditional Assamese music, Bihu dance, and authentic cuisine from the Northeast.",
    city: "guwahati",
    tags: ["festival", "music", "food-party"],
    date: "2026-04-14",
    time: "16:00",
    price: 1200,
    discountCode: "BIHU50",
    discountPercent: 15,
    maxSeats: 80,
    bookedSeats: 45,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    host: {
      name: "Priyanka Bharali",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      bio: "Bihu dancer and Northeast cultural promoter"
    },
    isOnline: false,
    venue: "Srimanta Sankaradeva Kalakshetra, Guwahati"
  }
];
