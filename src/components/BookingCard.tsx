import { useState, useMemo } from "react";
import { Calendar, DollarSign, Users, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export interface BookingData {
  id: string;
  tripTitle: string;
  image: string;
  startDate: string;
  endDate: string;
  price: number;
  participants: number;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  details: {
    travelers: string[];
    payment: string;
    inclusions?: string[];
  };
}

interface BookingCardProps {
  booking: BookingData;
  onViewDetails: (booking: BookingData) => void;
}

const statusStyles: Record<BookingData["status"], string> = {
  Confirmed: "bg-destructive/10 text-destructive border-destructive/20",
  Pending: "bg-muted text-muted-foreground border-border",
  Completed: "bg-muted text-foreground border-border",
  Cancelled: "bg-destructive/5 text-destructive/60 border-destructive/10",
};

function generateTicketId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  let id = "TKT-";
  for (let i = 0; i < 5; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export default function BookingCard({ booking, onViewDetails }: BookingCardProps) {
  const [supportOpen, setSupportOpen] = useState(false);

  const ticketId = useMemo(() => generateTicketId(), [supportOpen]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const guestName = booking.details.travelers[0] || "Guest";

  const emailSubject = encodeURIComponent(
    `Support Request: Ticket #${ticketId} - Booking #${booking.id}`
  );

  const emailBody = encodeURIComponent(
    `Hello Host,

I need support regarding my booking.

-- Booking Details --
Ticket ID: ${ticketId}
Booking Ref: ${booking.id}
Guest Name: ${guestName}
Participants: ${booking.participants}
Date: ${formatDate(booking.startDate)} - ${formatDate(booking.endDate)}

[Please describe your issue here]`
  );

  const mailtoLink = `mailto:support@rathh.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <>
      <Card className="overflow-hidden border border-border bg-card shadow-soft hover:shadow-card transition-shadow duration-300">
        <div className="aspect-video overflow-hidden">
          <img
            src={booking.image}
            alt={booking.tripTitle}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>

        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif font-bold text-foreground text-base leading-tight line-clamp-2">
              {booking.tripTitle}
            </h3>
            <Badge
              variant="outline"
              className={`shrink-0 text-xs font-medium px-2.5 py-0.5 ${statusStyles[booking.status]}`}
            >
              {booking.status}
            </Badge>
          </div>

          <div className="space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0" />
              <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 shrink-0" />
              <span>${booking.price.toLocaleString()} USD</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0" />
              <span>{booking.participants} Participant{booking.participants > 1 ? "s" : ""}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => onViewDetails(booking)}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold"
            >
              View Details
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-sm font-medium"
              onClick={() => setSupportOpen(true)}
            >
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support Options Modal */}
      <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Contact Host</DialogTitle>
            <DialogDescription>
              Choose how you'd like to reach out for booking <span className="font-mono font-medium">{booking.id}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            {/* Call Option */}
            <a
              href="tel:+919876543210"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Call Host</p>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
            </a>

            <Separator />

            {/* Email Option */}
            <a
              href={mailtoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Email Host</p>
                <p className="text-sm text-muted-foreground">Pre-filled with your booking details</p>
              </div>
            </a>

            <div className="bg-muted/50 rounded-lg p-3 mt-2">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Ticket ID:</span> {ticketId}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
