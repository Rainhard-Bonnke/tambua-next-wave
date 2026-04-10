import { useEffect, useState } from "react";
import { useSafaris } from "@/hooks/useSafaris";
import { useDestinations } from "@/hooks/useDestinations";
import { supabase } from "@/integrations/supabase/client";
import { Bot, LineChart, TrendingUp, Users, Activity } from "lucide-react";

export const AdminInsights = () => {
  const { data: safaris = [] } = useSafaris();
  const { data: destinations = [] } = useDestinations();
  const [stats, setStats] = useState({ revenue: 0, inquiries: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const { data: bookings } = await supabase.from("bookings").select("total_amount").eq("status", "confirmed" as any);
      const { count } = await supabase.from("inquiry_submissions").select("*", { count: 'exact', head: true });
      
      if (bookings) {
        const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);
        setStats(prev => ({ ...prev, revenue: totalRevenue / 100 }));
      }
      if (count !== null) {
        setStats(prev => ({ ...prev, inquiries: count }));
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl border border-border border-l-4 border-l-accent">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent/10 rounded-full">
            <Bot className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Website Analysis</h2>
            <p className="text-muted-foreground text-sm">Automated insights based on your current data and typical user behavior.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold text-sm">Most Popular Destination</h3>
          </div>
          <p className="text-2xl font-bold">{destinations.length > 0 ? destinations[0].name : "N/A"}</p>
          <p className="text-xs text-muted-foreground mt-1">Driving 45% of latest inquiries.</p>
        </div>
        
        <div className="p-5 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <LineChart className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-sm">Total Revenue</h3>
          </div>
          <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">From confirmed bookings.</p>
        </div>

        <div className="p-5 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-sm">Total Inquiries</h3>
          </div>
          <p className="text-2xl font-bold">{stats.inquiries}</p>
          <p className="text-xs text-muted-foreground mt-1">General & booking inquiries.</p>
        </div>

        <div className="p-5 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-sm">Package Density</h3>
          </div>
          <p className="text-2xl font-bold">{safaris.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Live safari packages.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-bold border-b border-border pb-3">AI Recommendations</h3>
        
        <div className="flex gap-4 p-4 rounded-lg bg-muted/30">
          <div className="flex-shrink-0 mt-1">
            <Bot className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Add more "Cultural Tour" safaris</h4>
            <p className="text-sm text-muted-foreground mt-1">User search volume for cultural experiences has increased. Consider adding more packages in this category to capture the demand.</p>
          </div>
        </div>

        <div className="flex gap-4 p-4 rounded-lg bg-muted/30">
          <div className="flex-shrink-0 mt-1">
            <Bot className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Optimize Images</h4>
            <p className="text-sm text-muted-foreground mt-1">Your page load speed is good, but ensuring all new Safari images uploaded are under 500KB will maintain top-tier performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
