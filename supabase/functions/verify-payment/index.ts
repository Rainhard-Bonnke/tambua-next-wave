import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.99.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Content-Type": "application/json",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { session_id, booking_id } = await req.json();
    if (!session_id) throw new Error("Missing session_id");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.retrieve(session_id);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    if (session.payment_status === "paid") {
      // Update payment
      await supabase
        .from("payments")
        .update({
          status: "succeeded",
          amount: session.amount_total || 0,
          currency: session.currency || "usd",
          stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_session_id", session_id);

      // Confirm booking
      if (booking_id) {
        await supabase
          .from("bookings")
          .update({
            status: "confirmed",
            total_amount: session.amount_total || 0,
            updated_at: new Date().toISOString(),
          })
          .eq("id", booking_id);
      }

      return new Response(JSON.stringify({ status: "paid", amount: session.amount_total, currency: session.currency }), {
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ status: session.payment_status }), {
      headers: corsHeaders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
