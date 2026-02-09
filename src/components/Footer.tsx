import { useState } from "react";
import { Compass } from "lucide-react";
import SocialLinks from "./SocialLinks";
import footerData from "@/data/footerData.json";

interface FooterLink {
  label: string;
  url: string;
  openInNewTab: boolean;
}

interface NavigationColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

const Footer = () => {
  const [logoError, setLogoError] = useState(false);
  const currentYear = new Date().getFullYear();

  const { socialLinks, navigationColumns } = footerData;

  return (
    <footer className="bg-muted/50 text-foreground">
      {/* Main Footer Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              {logoError ? (
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Compass className="w-6 h-6 text-primary" />
                </div>
              ) : (
                <img
                  src="/assets/pages/footerLog.png"
                  alt="Rathh Logo"
                  className="w-10 h-10 object-contain"
                  onError={() => setLogoError(true)}
                />
              )}
              <span className="font-serif text-xl font-bold text-destructive">
                Rathh
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover the world with curated small-group tours.
            </p>

            {/* Social Media Icons */}
            <SocialLinks links={socialLinks} />
          </div>

          {/* Columns 2-4: Navigation Links */}
          {(navigationColumns as NavigationColumn[]).map((column) => (
            <div key={column.id}>
              <h4 className="font-semibold text-foreground mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target={link.openInNewTab ? "_blank" : "_self"}
                      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar Section */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Rathh In. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
