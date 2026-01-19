import { useState } from "react";
import { Menu, X, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron to-burgundy flex items-center justify-center">
              <span className="text-xl">🏠</span>
            </div>
            <span className="font-serif text-xl font-bold text-foreground">
              Travel<span className="text-primary">Trip</span>Home
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#events" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Events
            </a>
            <a href="#destinations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Destinations
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <Calendar className="w-4 h-4" />
              My Bookings
            </Button>
            <Button size="sm" className="btn-saffron">
              <User className="w-4 h-4 mr-1" />
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <a href="#events" className="block py-2 text-foreground font-medium">Events</a>
            <a href="#destinations" className="block py-2 text-foreground font-medium">Destinations</a>
            <a href="#about" className="block py-2 text-foreground font-medium">About</a>
            <hr className="border-border" />
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Calendar className="w-4 h-4" />
              My Bookings
            </Button>
            <Button className="w-full btn-saffron">
              <User className="w-4 h-4 mr-1" />
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
