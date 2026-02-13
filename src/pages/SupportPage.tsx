import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Menu, Send, HelpCircle, FileText, Phone, Shield, ScrollText } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sections = [
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "cancellation", label: "Cancellation Policy", icon: FileText },
  { id: "contact", label: "Contact Us", icon: Phone },
  { id: "privacy", label: "Privacy Policy", icon: Shield },
  { id: "terms", label: "Terms & Conditions", icon: ScrollText },
];

const faqItems = [
  { q: "How do I cancel my booking?", a: "You can cancel any booking within 24 hours of purchase for a full refund. After 24 hours, our standard cancellation policy applies. Visit 'My Bookings' and click the booking you wish to cancel." },
  { q: "Is my payment secure?", a: "Absolutely. We use industry-standard SSL encryption and partner with trusted payment processors. Your card details are never stored on our servers." },
  { q: "Can I modify my trip dates?", a: "Yes! Date changes are free up to 14 days before departure, subject to availability. Contact our support team or use the 'Modify Booking' option in your dashboard." },
  { q: "What's included in the tour price?", a: "All tours include accommodation, guided activities, local transportation, and specified meals. Flights, travel insurance, and personal expenses are not included unless stated." },
  { q: "Do I need travel insurance?", a: "While not mandatory, we strongly recommend comprehensive travel insurance. We can suggest trusted providers during checkout." },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const SidebarNav = ({ activeSection, onNavigate }: { activeSection: string; onNavigate?: () => void }) => (
  <nav className="space-y-1">
    {sections.map((s) => (
      <a
        key={s.id}
        href={`#${s.id}`}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
          onNavigate?.();
        }}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
          activeSection === s.id
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
      >
        <s.icon className="w-4 h-4" />
        {s.label}
      </a>
    ))}
  </nav>
);

const SupportPage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("faq");

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const onSubmit = (data: ContactForm) => {
    console.log("Contact form submitted:", data);
    toast.success("Message sent! We'll get back to you within 24 hours.");
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">Support & Legal</h1>
          <p className="text-muted-foreground mb-10 max-w-xl">Everything you need to know about travelling with Rathh.</p>

          <div className="flex gap-10">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <SidebarNav activeSection={activeSection} />
              </div>
            </aside>

            {/* Mobile sidebar */}
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" className="rounded-full shadow-elevated bg-primary text-primary-foreground">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 pt-12">
                  <h3 className="font-serif text-lg font-semibold mb-4 px-4">Sections</h3>
                  <SidebarNav activeSection={activeSection} onNavigate={() => {}} />
                </SheetContent>
              </Sheet>
            </div>

            {/* Content */}
            <main className="flex-1 max-w-3xl space-y-16">
              {/* FAQ */}
              <section id="faq">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqItems.map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* Cancellation */}
              <section id="cancellation">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Cancellation Policy</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                  <p><strong className="text-foreground">Free Cancellation (within 24 hours):</strong> Cancel any booking within 24 hours of purchase for a full refund, no questions asked.</p>
                  <p><strong className="text-foreground">Standard Cancellation:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>More than 30 days before departure: 90% refund</li>
                    <li>15–30 days before departure: 50% refund</li>
                    <li>Less than 15 days before departure: No refund</li>
                  </ul>
                  <p><strong className="text-foreground">Force Majeure:</strong> In cases of natural disasters, pandemics, or government-imposed restrictions, we offer a full credit for future bookings or a complete refund.</p>
                  <p>Refunds are processed within 7–10 business days to the original payment method.</p>
                </div>
              </section>

              {/* Contact */}
              <section id="contact">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Contact Us</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl><Textarea placeholder="How can we help?" rows={5} {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Send className="w-4 h-4" /> Send Message
                      </Button>
                    </form>
                  </Form>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Office Address</h4>
                      <p>Rathh Travel Pvt. Ltd.<br />42 Heritage Lane, Banjara Hills<br />Hyderabad, Telangana 500034</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                      <p>+91 40 1234 5678</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Email</h4>
                      <p>support@rathh.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Hours</h4>
                      <p>Mon–Sat: 9:00 AM – 7:00 PM IST</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Privacy */}
              <section id="privacy">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Privacy Policy</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                  <p>Last updated: February 2026</p>
                  <h3 className="text-foreground font-semibold text-base">1. Information We Collect</h3>
                  <p>We collect personal information you provide directly, including your name, email address, phone number, payment details, and travel preferences when you create an account or make a booking.</p>
                  <h3 className="text-foreground font-semibold text-base">2. How We Use Your Information</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Process and manage your bookings</li>
                    <li>Send booking confirmations and travel updates</li>
                    <li>Improve our services and user experience</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                  <h3 className="text-foreground font-semibold text-base">3. Data Protection</h3>
                  <p>We implement industry-standard security measures including SSL encryption, secure data storage, and regular security audits to protect your personal information.</p>
                  <h3 className="text-foreground font-semibold text-base">4. Your Rights</h3>
                  <p>You have the right to access, correct, or delete your personal data at any time. Contact us at privacy@rathh.com to exercise these rights.</p>
                </div>
              </section>

              {/* Terms */}
              <section id="terms">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Terms & Conditions</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                  <p>Last updated: February 2026</p>
                  <h3 className="text-foreground font-semibold text-base">1. Acceptance of Terms</h3>
                  <p>By accessing or using Rathh's services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
                  <h3 className="text-foreground font-semibold text-base">2. Booking & Payment</h3>
                  <p>All bookings are subject to availability. Prices are quoted in USD and include applicable taxes unless stated otherwise. Full payment is required at the time of booking.</p>
                  <h3 className="text-foreground font-semibold text-base">3. Traveler Responsibilities</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Ensure valid travel documents (passport, visa, etc.)</li>
                    <li>Arrive at departure points on time</li>
                    <li>Follow local laws and customs</li>
                    <li>Maintain appropriate travel insurance</li>
                  </ul>
                  <h3 className="text-foreground font-semibold text-base">4. Limitation of Liability</h3>
                  <p>Rathh acts as an intermediary between travelers and service providers. We are not liable for any loss, damage, or injury arising from third-party services, natural events, or circumstances beyond our control.</p>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupportPage;
