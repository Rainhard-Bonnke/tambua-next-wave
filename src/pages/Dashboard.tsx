import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar, Users, MapPin, LogOut, Loader2, CreditCard, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

interface Booking {
  id: string;
  safari_id: string;
  safari_title: string;
  preferred_date: string;
  guests: number;
  total_amount: number;
  currency: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const Dashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }
    if (user) fetchBookings();
  }, [user, authLoading]);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setBookings(data as Booking[]);
    setLoading(false);
  };

  const cancelBooking = async (id: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" as any, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) toast.error("Could not cancel booking");
    else {
      toast.success("Booking cancelled");
      fetchBookings();
    }
  };

  const downloadReceipt = async (bookingId: string) => {
    setDownloadingId(bookingId);
    try {
      const { data, error } = await supabase.functions.invoke("generate-receipt", {
        body: { booking_id: bookingId },
      });

      if (error) throw error;

      // data is already an ArrayBuffer or Blob from the edge function
      const blob = data instanceof Blob ? data : new Blob([data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${bookingId.slice(0, 8)}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Receipt downloaded");
    } catch (err) {
      console.error("Receipt download error:", err);
      toast.error("Could not download receipt");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <PageTransition>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="rounded-xl">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-card rounded-2xl border border-border p-12 text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground">No Bookings Yet</h2>
              <p className="text-muted-foreground mt-2">Start your adventure by booking a safari package.</p>
              <Button onClick={() => navigate("/safaris")} className="mt-6 bg-accent text-accent-foreground rounded-xl">
                Browse Safaris
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-card rounded-2xl border border-border p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">{booking.safari_title}</h3>
                      <Badge className={statusColors[booking.status] || "bg-muted text-muted-foreground"}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {booking.preferred_date}</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {booking.guests} guest{booking.guests !== 1 ? "s" : ""}</span>
                      {booking.total_amount > 0 && (
                        <span className="flex items-center gap-1"><CreditCard className="w-4 h-4" /> ${(booking.total_amount / 100).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {(booking.status === "confirmed" || booking.status === "completed") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadReceipt(booking.id)}
                        disabled={downloadingId === booking.id}
                        className="rounded-xl"
                      >
                        {downloadingId === booking.id ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-1" />
                        ) : (
                          <Download className="w-4 h-4 mr-1" />
                        )}
                        Receipt
                      </Button>
                    )}
                    {booking.status === "pending" && (
                      <Button variant="destructive" size="sm" onClick={() => cancelBooking(booking.id)} className="rounded-xl">
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Dashboard;
