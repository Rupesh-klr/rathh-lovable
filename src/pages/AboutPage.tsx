import { Globe, Users, Star, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { icon: Users, value: "10k+", label: "Happy Travelers" },
  { icon: MapPin, value: "50+", label: "Destinations" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Globe, value: "15+", label: "Countries" },
];

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative pt-16 overflow-hidden">
      <div className="h-[50vh] min-h-[360px] bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary-foreground mb-4">Our Journey</h1>
          <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto">Curating unforgettable travel experiences since 2019</p>
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">We believe in travel that changes you.</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          At Rathh, we don't just plan trips — we craft stories. Every itinerary is designed to immerse you in local cultures,
          connect you with communities, and leave you with memories that last a lifetime. We partner with local guides who know
          their homeland intimately, ensuring every experience is authentic and meaningful.
        </p>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="font-serif text-3xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* History */}
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-6 text-center">Our Story</h2>
        <div className="text-muted-foreground space-y-4 leading-relaxed">
          <p>
            Rathh was founded in 2019 in Hyderabad by a group of passionate travelers who believed that the best journeys
            are the ones that bring you closer to the world's diverse cultures. What started as a small operation offering
            heritage walks in Telangana has grown into a platform connecting thousands of travelers with curated experiences
            across India and beyond.
          </p>
          <p>
            Our name, "Rathh," draws inspiration from the ancient Sanskrit word for "chariot" — a vehicle of discovery.
            Today, we continue that tradition by being the chariot that carries our travelers to new horizons, one
            unforgettable experience at a time.
          </p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default AboutPage;
