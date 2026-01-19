import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-card py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron to-burgundy flex items-center justify-center">
                <span className="text-xl">🏠</span>
              </div>
              <span className="font-serif text-xl font-bold">
                TravelTripHome
              </span>
            </div>
            <p className="text-card/70 text-sm">
              Connecting travelers with authentic Indian cultural experiences since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-card/70">
              <li><a href="#" className="hover:text-card transition-colors">All Events</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Festivals</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Food Experiences</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Heritage Walks</a></li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-semibold mb-4">Top Destinations</h4>
            <ul className="space-y-2 text-sm text-card/70">
              <li><a href="#" className="hover:text-card transition-colors">Jaipur</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Varanasi</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Kochi</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Hyderabad</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-card/70">
              <li><a href="#" className="hover:text-card transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-card/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-card/60">
            © 2026 TravelTripHome. All rights reserved.
          </p>
          <p className="text-sm text-card/60 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
