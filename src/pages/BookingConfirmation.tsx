import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, Database, LogOut } from "lucide-react";
import { toast } from "sonner";
import Confetti from "react-confetti";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingData {
  bookingId?: string;
  tripId?: string;
  selectedDate?: { startDate: string; endDate: string };
  pricePerPerson?: number;
  groupType?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  totalAmount?: number;
  travelerCount?: number;
  timestamp?: string;
}

const ADMIN_SECRET = "yKAqkrC9Q#'AUy3qT!GlZ{aZ!VIq%biM_K(sa=)b#OF]N";

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [countdown, setCountdown] = useState(15);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  // Load data and setup countdown
  useEffect(() => {
    const finalData = localStorage.getItem("final_booking_data");

    if (!finalData) {
      toast.error("No booking data found. Redirecting to home...");
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    try {
      const parsedData = JSON.parse(finalData);
      setBookingData(parsedData);
      setLoading(false);

      // Mock backend call
      console.log("🔄 Sending booking confirmation to backend...", parsedData);
      setTimeout(() => {
        toast.success("Booking confirmed on server!");
        console.log("✅ Server response received");
      }, 2000);
    } catch (error) {
      console.error("Error parsing booking data:", error);
      toast.error("Invalid booking data. Redirecting to home...");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [navigate]);

  // Countdown timer
  useEffect(() => {
    if (!isAdminAuthenticated && countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown === 0 && !isAdminAuthenticated) {
      // Cleanup and redirect
      localStorage.removeItem("final_booking_data");
      localStorage.removeItem("booking_session_data");
      localStorage.removeItem("checkout_form_draft");
      navigate("/my-bookings");
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [countdown, navigate, isAdminAuthenticated]);

  const handleSkipToBookings = () => {
    localStorage.removeItem("final_booking_data");
    localStorage.removeItem("booking_session_data");
    localStorage.removeItem("checkout_form_draft");
    navigate("/my-bookings");
  };

  const handleAdminVerify = () => {
    if (adminPasswordInput === ADMIN_SECRET) {
      setIsAdminAuthenticated(true);
      setIsAdminOpen(false);
      setAdminPasswordInput("");
      toast.success("Welcome, Admin");
    } else {
      toast.error("Access Denied: Invalid Token");
      setAdminPasswordInput("");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCountdown(15);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin">
            <CheckCircle2 className="h-16 w-16 text-muted-foreground" />
          </div>
          <p className="mt-4 text-lg text-foreground">Verifying booking...</p>
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  if (isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/30 p-4">
        {/* Admin Header */}
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard: Global Bookings</h1>
            <Button variant="outline" onClick={handleAdminLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout Admin
            </Button>
          </div>

          {/* Coming Soon Placeholder */}
          <Card className="mx-auto max-w-2xl">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Database className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">System Under Construction</h2>
              <p className="text-center text-muted-foreground mb-6">
                The centralized booking management system is currently being built. Future updates will list all user bookings here.
              </p>

              {/* Dummy Stat Card */}
              <Card className="w-full max-w-sm bg-card border border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Total Bookings in Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">1</p>
                  <p className="text-sm text-muted-foreground">(Current Session)</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // User Success View
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/40 flex items-center justify-center p-4">
      {/* Confetti - Only show for first 5 seconds */}
      {countdown > 10 && (
        <div ref={confettiRef} className="fixed inset-0 pointer-events-none">
          <Confetti
            width={typeof window !== "undefined" ? window.innerWidth : 0}
            height={typeof window !== "undefined" ? window.innerHeight : 0}
            numberOfPieces={100}
            recycle={false}
            gravity={0.3}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card shadow-elevated border-border/50">
          <CardContent className="pt-8 pb-8 px-8">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-full bg-accent/15 p-4"
              >
                <CheckCircle2 className="h-16 w-16 text-accent" />
              </motion.div>
            </motion.div>

            {/* Message */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">Payment Successful!</h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                Thank you for choosing Rathh! Your journey begins now. We have sent a detailed confirmation email to{" "}
                <span className="font-semibold text-foreground">{bookingData?.email || "your inbox"}</span>.
              </p>
              <p className="text-muted-foreground text-sm mt-3">Get ready for an unforgettable adventure!</p>
            </div>

            {/* Countdown Badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mb-6 inline-block w-full"
            >
              <div className="bg-primary/10 border border-primary/20 rounded-lg py-3 px-4 text-center">
                <p className="text-sm font-medium text-primary">
                  Redirecting in {countdown}s...
                </p>
              </div>
            </motion.div>

            {/* Booking Details */}
            {bookingData && (
              <div className="bg-muted/50 rounded-lg p-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID:</span>
                  <span className="font-mono font-semibold text-foreground">{bookingData.bookingId?.slice(0, 12)}...</span>
                </div>
                {bookingData.travelerCount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Travelers:</span>
                    <span className="font-semibold text-foreground">{bookingData.travelerCount}</span>
                  </div>
                )}
                {bookingData.totalAmount && (
                  <div className="flex justify-between border-t border-border/50 pt-2 mt-2">
                    <span className="text-muted-foreground font-medium">Total Amount:</span>
                    <span className="font-bold text-primary">${bookingData.totalAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <Button onClick={handleSkipToBookings} className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Go to My Bookings
              </Button>
              <button
                onClick={() => window.print()}
                className="w-full text-sm font-medium text-primary hover:underline transition-colors"
              >
                Print Receipt
              </button>
            </div>

            {/* Security Note */}
            <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Your booking is 100% secure
            </div>

            {/* Cancellation Policy */}
            <div className="mt-4 text-xs text-center text-muted-foreground">
              Free cancellation within 24 hours. Read our{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                terms and conditions
              </a>
              .
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Secret Admin Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
        title="Admin Access"
      >
        <Shield className="h-4 w-4 text-muted-foreground" />
      </motion.button>

      {/* Admin Password Modal */}
      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Restricted Access</DialogTitle>
            <DialogDescription>Enter the passkey to access the admin dashboard.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter Passkey"
              value={adminPasswordInput}
              onChange={(e) => setAdminPasswordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdminVerify();
                }
              }}
            />
            <Button
              onClick={handleAdminVerify}
              className="w-full bg-primary hover:bg-primary/90"
              disabled={!adminPasswordInput}
            >
              Verify Access
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
