import { useState } from "react";
import { X, Calendar, Clock, MapPin, Users, Tag, CheckCircle2, AlertCircle } from "lucide-react";
import { Event } from "@/data/sampleEvents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface BookingModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ event, isOpen, onClose }: BookingModalProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [seats, setSeats] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!event) return null;

  const seatsLeft = event.maxSeats - event.bookedSeats;
  
  // Check if booking is disabled (after 10 PM IST for today's events)
  const isBookingDisabled = () => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const nowIST = new Date(now.getTime() + istOffset);
    const eventDateOnly = new Date(eventDate.toDateString());
    const todayIST = new Date(new Date(nowIST.toDateString()).getTime());
    
    const isToday = eventDateOnly.getTime() === todayIST.getTime();
    const hour = nowIST.getHours();
    
    return isToday && hour >= 22;
  };

  const bookingDisabled = isBookingDisabled();

  const applyCoupon = () => {
    if (event.discountCode && couponCode.toUpperCase() === event.discountCode.toUpperCase()) {
      setCouponApplied(true);
      toast.success(`Coupon applied! ${event.discountPercent}% off`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const calculateTotal = () => {
    let total = event.price * seats;
    if (couponApplied && event.discountPercent) {
      total = total * (1 - event.discountPercent / 100);
    }
    return total;
  };

  const handleBooking = async () => {
    setIsBooking(true);
    // Simulate booking API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsBooking(false);
    setBookingSuccess(true);
  };

  const handleClose = () => {
    setCouponCode("");
    setCouponApplied(false);
    setSeats(1);
    setBookingSuccess(false);
    onClose();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (bookingSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your seats for <span className="text-foreground font-medium">{event.title}</span> have been reserved.
            </p>
            <div className="bg-muted/50 rounded-xl p-4 text-left mb-6">
              <div className="flex items-center gap-2 text-sm mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-primary" />
                <span>{seats} seat(s) reserved</span>
              </div>
            </div>
            <Button onClick={handleClose} className="btn-saffron w-full">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Reserve Your Seat</DialogTitle>
        </DialogHeader>

        {/* Event Summary */}
        <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-serif font-semibold text-foreground line-clamp-2 mb-1">
              {event.title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Booking Disabled Warning */}
        {bookingDisabled && (
          <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">Booking Closed</p>
              <p className="text-sm text-muted-foreground">
                Same-day bookings are closed after 10:00 PM IST. Please book for a future date.
              </p>
            </div>
          </div>
        )}

        {!bookingDisabled && (
          <>
            {/* Number of Seats */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Number of Seats
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSeats(Math.max(1, seats - 1))}
                  disabled={seats <= 1}
                >
                  -
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{seats}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSeats(Math.min(seatsLeft, seats + 1))}
                  disabled={seats >= seatsLeft}
                >
                  +
                </Button>
                <span className="text-sm text-muted-foreground ml-2">
                  ({seatsLeft} available)
                </span>
              </div>
            </div>

            {/* Coupon Code */}
            {event.discountCode && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Have a coupon?
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    onClick={applyCoupon}
                    disabled={couponApplied || !couponCode}
                  >
                    {couponApplied ? "Applied ✓" : "Apply"}
                  </Button>
                </div>
                {couponApplied && (
                  <p className="text-sm text-accent mt-1">
                    {event.discountPercent}% discount applied!
                  </p>
                )}
              </div>
            )}

            {/* Price Breakdown */}
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price per seat</span>
                <span>₹{event.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Seats</span>
                <span>× {seats}</span>
              </div>
              {couponApplied && event.discountPercent && (
                <div className="flex justify-between text-sm text-accent">
                  <span>Discount ({event.discountPercent}%)</span>
                  <span>-₹{((event.price * seats * event.discountPercent) / 100).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            {/* Book Button */}
            <Button 
              onClick={handleBooking}
              className="w-full btn-saffron h-12 text-base"
              disabled={isBooking}
            >
              {isBooking ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                `Confirm Booking • ₹${calculateTotal().toLocaleString()}`
              )}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
