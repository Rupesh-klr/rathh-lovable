import heroCultural from "@/assets/hero-cultural.jpg";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
}

const HeroSection = ({ onExploreClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroCultural} 
          alt="Indian Cultural Celebration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/50 to-foreground/80" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gold/20 blur-xl animate-float" />
      <div className="absolute bottom-32 right-16 w-32 h-32 rounded-full bg-saffron/20 blur-2xl animate-float-delayed" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-accent/20 blur-xl animate-float" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-md border border-card/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-sm text-card font-medium">Discover India's Rich Heritage</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-card mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="block">Culture</span>
          <span className="block text-gradient-gold">&</span>
          <span className="block">Tradition</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-card/80 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Experience authentic Indian festivals, rituals, and celebrations. 
          Book unique cultural experiences across 20+ cities.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button 
            onClick={onExploreClick}
            size="lg"
            className="btn-saffron text-lg px-8 h-14"
          >
            Explore Events
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="bg-card/10 backdrop-blur-sm border-card/30 text-card hover:bg-card/20 text-lg px-8 h-14"
          >
            How It Works
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "20+", label: "Cities" },
            { value: "500+", label: "Events" },
            { value: "50K+", label: "Travelers" },
            { value: "4.9★", label: "Rating" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-card">{stat.value}</div>
              <div className="text-sm text-card/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={onExploreClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-card/60 hover:text-card transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default HeroSection;
