import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Search, Users, Calendar, DollarSign, BarChart3, LogOut } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

interface AdminBooking {
  id: string;
  safari_title: string;
  preferred_date: string;
  guests: number;
  total_amount: number;
  status: string;
  created_at: string;
  user_id: string;
}

interface AdminProfile {
  id: string;
  full_name: string;
  phone: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const Admin = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [profiles, setProfiles] = useState<Record<string, AdminProfile>>({});
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!authLoading && !user) { navigate("/login"); return; }
    if (user) checkAdminAndLoad();
  }, [user, authLoading]);

  const checkAdminAndLoad = async () => {
    // Check admin status via profile
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user!.id).single();
    if (!profile || profile.role !== "admin") {
      toast.error("You don't have admin access");
      navigate("/dashboard");
      return;
    }
    setIsAdmin(true);

    // Load bookings
    const { data: bookingsData } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (bookingsData) {
      setBookings(bookingsData as AdminBooking[]);

      // Load profiles for all users
      const userIds = [...new Set(bookingsData.map((b: any) => b.user_id))];
      if (userIds.length > 0) {
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, full_name, phone")
          .in("id", userIds);
        if (profilesData) {
          const map: Record<string, AdminProfile> = {};
          profilesData.forEach((p: any) => { map[p.id] = p; });
          setProfiles(map);
        }
      }
    }
    setLoading(false);
  };

  const updateStatus = async (bookingId: string, newStatus: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus as any, updated_at: new Date().toISOString() })
      .eq("id", bookingId);

    if (error) toast.error("Could not update status");
    else {
      toast.success(`Booking ${newStatus}`);
      setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status: newStatus } : b));
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = b.safari_title.toLowerCase().includes(search.toLowerCase()) ||
      (profiles[b.user_id]?.full_name || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    revenue: bookings.filter((b) => b.status === "confirmed").reduce((sum, b) => sum + b.total_amount, 0),
    pending: bookings.filter((b) => b.status === "pending").length,
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

  if (!isAdmin) return null;

  return (
    <PageTransition>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <Button variant="outline" onClick={async () => { await signOut(); navigate("/"); }} className="rounded-xl">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.confirmed}</p>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">${(stats.revenue / 100).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search bookings..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-xl" />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookings Table */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Safari</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Guests</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-border hover:bg-muted/20">
                      <td className="p-4">
                        <p className="text-sm font-medium text-foreground">{profiles[booking.user_id]?.full_name || "Unknown"}</p>
                        <p className="text-xs text-muted-foreground">{profiles[booking.user_id]?.phone || ""}</p>
                      </td>
                      <td className="p-4 text-sm text-foreground">{booking.safari_title}</td>
                      <td className="p-4 text-sm text-muted-foreground">{booking.preferred_date}</td>
                      <td className="p-4 text-sm text-muted-foreground">{booking.guests}</td>
                      <td className="p-4 text-sm text-foreground">{booking.total_amount > 0 ? `$${(booking.total_amount / 100).toLocaleString()}` : "—"}</td>
                      <td className="p-4">
                        <Badge className={statusColors[booking.status] || "bg-muted text-muted-foreground"}>
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Select value={booking.status} onValueChange={(v) => updateStatus(booking.id, v)}>
                          <SelectTrigger className="w-[130px] h-8 text-xs rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredBookings.length === 0 && (
                <div className="p-12 text-center text-muted-foreground">No bookings found</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Admin;
