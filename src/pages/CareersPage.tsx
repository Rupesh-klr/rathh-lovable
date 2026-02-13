import { useState } from "react";
import { Wifi, CreditCard, HeartPulse, MapPin, Briefcase } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const perks = [
  { icon: Wifi, title: "Remote Friendly", desc: "Work from anywhere in the world." },
  { icon: CreditCard, title: "Travel Credits", desc: "₹50,000 annual travel allowance." },
  { icon: HeartPulse, title: "Health Benefits", desc: "Comprehensive health & dental coverage." },
];

const jobs = [
  { id: 1, title: "Senior React Developer", dept: "Engineering", location: "Remote" },
  { id: 2, title: "Travel Operations Manager", dept: "Operations", location: "Hyderabad" },
  { id: 3, title: "UX/UI Designer", dept: "Design", location: "Remote" },
  { id: 4, title: "Content Marketing Lead", dept: "Marketing", location: "Remote" },
  { id: 5, title: "Customer Success Associate", dept: "Support", location: "Hyderabad" },
  { id: 6, title: "Data Analyst", dept: "Engineering", location: "Remote" },
];

const CareersPage = () => {
  const [applyJob, setApplyJob] = useState<typeof jobs[0] | null>(null);

  const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(`Application submitted for ${applyJob?.title}!`);
    setApplyJob(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Join the Rathh Team</h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">Help us shape the future of travel.</p>
          </div>
        </section>

        {/* Perks */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-10">Why Join Us</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {perks.map((p) => (
                <div key={p.title} className="bg-card rounded-xl border border-border p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <p.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Positions */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-10">Open Positions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {jobs.map((job) => (
                <div key={job.id} className="bg-card rounded-xl border border-border p-6 flex flex-col">
                  <h3 className="font-semibold text-foreground text-lg mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="gap-1"><Briefcase className="w-3 h-3" />{job.dept}</Badge>
                    <Badge variant="outline" className="gap-1"><MapPin className="w-3 h-3" />{job.location}</Badge>
                  </div>
                  <div className="mt-auto">
                    <Button onClick={() => setApplyJob(job)} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Apply Modal */}
      <Dialog open={!!applyJob} onOpenChange={(open) => !open && setApplyJob(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif">Apply: {applyJob?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input required placeholder="Your name" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input required type="email" placeholder="you@example.com" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Resume</label>
              <Input type="file" accept=".pdf,.doc,.docx" className="mt-1" />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Submit Application
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CareersPage;
