import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Safari, safaris as localSafaris } from "@/data/safaris";

export const useSafaris = () => {
  return useQuery({
    queryKey: ["safaris"],
    queryFn: async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await (supabase as any).from("safaris").select("*");
        
        if (error) {
          console.error("Error fetching safaris from Supabase:", error);
          throw error;
        }
        
        // If the table is empty (e.g. user hasn't inserted them yet), fallback to local mock data
        if (!data || data.length === 0) {
          return localSafaris;
        }

        // Map stripe_price_id back to stripePriceId
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.map((item: any) => ({
          ...item,
          stripePriceId: item.stripe_price_id || item.stripePriceId,
        })) as Safari[];
      } catch (err) {
        // Fallback to purely local data so the site doesn't break if SQL isn't run
        return localSafaris;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  });
};

export const useSafari = (id?: string) => {
  return useQuery({
    queryKey: ["safari", id],
    queryFn: async () => {
      if (!id) return null;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await (supabase as any).from("safaris").select("*").eq("id", id).maybeSingle();
        if (data) {
          return {
            ...data,
            stripePriceId: data.stripe_price_id || data.stripePriceId,
          } as Safari;
        }
        // Fallback
        return localSafaris.find((s) => s.id === id) || null;
      } catch (err) {
        return localSafaris.find((s) => s.id === id) || null;
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
