import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const sessionId = params.get("session_id");
    const bookingId = params.get("booking_id");
    if (!sessionId) { setStatus("error"); return; }

    supabase.functions.invoke("verify-payment", {
      body: { session_id: sessionId, booking_id: bookingId },
    }).then(({ data, error }) => {
      if (error || data?.error) setStatus("error");
      else if (data?.status === "paid") setStatus("success");
      else setStatus("error");
    });
  }, [params]);

  return (
    <PageTransition>
      <Navbar />
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-24 pb-12">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-12 text-center max-w-md">
          {status === "loading" && (
            <>
              <Loader2 className="w-16 h-16 text-accent mx-auto animate-spin" />
              <h1 className="text-2xl font-bold text-foreground mt-6">Verifying Payment...</h1>
              <p className="text-muted-foreground mt-2">Please wait while we confirm your payment.</p>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h1 className="text-2xl font-bold text-foreground mt-6">Booking Confirmed!</h1>
              <p className="text-muted-foreground mt-2">Your safari booking has been confirmed. You'll receive a confirmation email shortly.</p>
              <div className="flex gap-3 justify-center mt-8">
                <Button asChild className="bg-primary text-primary-foreground rounded-xl">
                  <Link to="/dashboard">View My Bookings</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/safaris">Browse More</Link>
                </Button>
              </div>
            </>
          )}
          {status === "error" && (
            <>
              <XCircle className="w-16 h-16 text-destructive mx-auto" />
              <h1 className="text-2xl font-bold text-foreground mt-6">Payment Issue</h1>
              <p className="text-muted-foreground mt-2">We couldn't verify your payment. Please contact us or check your dashboard.</p>
              <Button asChild className="mt-8 bg-primary text-primary-foreground rounded-xl">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default PaymentSuccess;
