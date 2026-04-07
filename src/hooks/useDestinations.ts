import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Destination, destinations as localDestinations } from "@/data/destinations";

export const useDestinations = () => {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await (supabase as any).from("destinations").select("*");
        
        if (error) {
          console.error("Error fetching destinations from Supabase:", error);
          throw error;
        }
        
        if (!data || data.length === 0) {
          return localDestinations;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.map((item: any) => ({
          ...item,
          safariCount: item.safari_count || item.safariCount,
        })) as Destination[];
      } catch (err) {
        return localDestinations;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};
