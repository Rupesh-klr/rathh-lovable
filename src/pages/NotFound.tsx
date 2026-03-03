import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPinOff, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-md space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPinOff className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h1 className="font-serif text-5xl font-bold text-foreground">404</h1>

          <p className="text-lg text-muted-foreground">
            Oops! The page you are looking for does not exist.
          </p>

          <div className="bg-muted rounded-lg px-6 py-4 space-y-1">
            <p className="text-sm text-muted-foreground">
              Redirecting you to the homepage in
            </p>
            <p className="text-3xl font-bold font-mono text-primary">
              {countdown}<span className="text-base font-normal text-muted-foreground ml-1">s</span>
            </p>
          </div>

          <Button
            onClick={() => navigate("/")}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            <Home className="w-4 h-4" />
            Go Home Now
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
