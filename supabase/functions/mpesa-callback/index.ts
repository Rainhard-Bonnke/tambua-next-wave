import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

serve(async (req) => {
  try {
    const callbackData = await req.json();
    console.log("M-Pesa Callback Received:", JSON.stringify(callbackData));
    
    if (!callbackData.Body || !callbackData.Body.stkCallback) {
      return new Response("Invalid request", { status: 400 });
    }

    const { ResultCode, ResultDesc, CallbackMetadata, CheckoutRequestID } = callbackData.Body.stkCallback;
    
    // ResultCode 0 means Success
    if (ResultCode === 0 && CallbackMetadata) {
      // Payment Successful
      const metadata = CallbackMetadata.Item;
      const mpesaReceiptNumber = metadata.find((m: any) => m.Name === "MpesaReceiptNumber")?.Value;
      
      const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Find the booking that has this CheckoutRequestID
      const { data: booking, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .eq('stripe_payment_intent_id', CheckoutRequestID)
        .single();
        
      if (booking && !fetchError) {
        // Mark booking as confirmed
        await supabase
          .from('bookings')
          .update({ 
            status: 'confirmed',
            currency: 'KES',
            notes: `${booking.notes ? booking.notes + '\n\n' : ''}M-Pesa Receipt: ${mpesaReceiptNumber}`,
            updated_at: new Date().toISOString()
          })
          .eq('id', booking.id);
      }
    } else {
      // Payment Failed or Cancelled by User
      console.error(`M-Pesa STK Push Failed: ${ResultDesc}`);
      const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // We could optionally update the status to "failed" or leave it "pending"
      const { data: booking } = await supabase
        .from('bookings')
        .select('*')
        .eq('stripe_payment_intent_id', CheckoutRequestID)
        .single();
        
      if (booking) {
        await supabase
          .from('bookings')
          .update({ 
            notes: `${booking.notes ? booking.notes + '\n\n' : ''}M-Pesa attempt failed: ${ResultDesc}`,
            updated_at: new Date().toISOString()
          })
          .eq('id', booking.id);
      }
    }

    // Always return 200 OK back to Safaricom so they stop retrying
    return new Response(JSON.stringify({ "ResultCode": 0, "ResultDesc": "Success" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Callback processing error:", error);
    return new Response(JSON.stringify({ "ResultCode": 1, "ResultDesc": "Failed" }), {
      status: 500,
    });
  }
});
