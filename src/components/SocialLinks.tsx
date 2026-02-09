import { Facebook, Twitter, Instagram, Linkedin, LucideIcon } from "lucide-react";

interface SocialLink {
  id: string;
  icon: string;
  url: string;
  label: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

const iconMap: Record<string, LucideIcon> = {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn: Linkedin,
};

const SocialLinks = ({ links }: SocialLinksProps) => {
  return (
    <div className="flex items-center gap-3">
      {links.map((link) => {
        const IconComponent = iconMap[link.icon];
        if (!IconComponent) return null;

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <IconComponent className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
