import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Destination, destinations as localDestinations } from "@/data/destinations";

export const useDestinations = () => {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      try {
        const fetchDestinations = async () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data, error } = await (supabase as any).from("destinations").select("*");
          if (error) throw error;
          return data;
        };

        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Supabase Timeout")), 5000));
        
        const data = await Promise.race([fetchDestinations(), timeout]) as any[];
        
        if (!data || data.length === 0) {
          return localDestinations;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.map((item: any) => ({
          ...item,
          safariCount: item.safari_count || item.safariCount,
        })) as Destination[];
      } catch (err) {
        console.warn("Supabase fetch failed or timed out. Falling back to local Destinations data.");
        return localDestinations;
      }
    },
    staleTime: 1000 * 60 * 30, // Increase to 30 mins for instant navigation
    gcTime: 1000 * 60 * 60,   // Keep in memory for 1 hour
  });
};
