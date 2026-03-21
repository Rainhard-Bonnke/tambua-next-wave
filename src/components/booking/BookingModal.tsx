import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Users, MapPin, Send, Loader2, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { safaris } from "@/data/safaris";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { submitInquiry } from "@/lib/inquiry";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedSafari?: string;
}

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  safari: "",
  guests: "2",
  notes: "",
};

const BookingModal = ({ open, onOpenChange, preselectedSafari }: BookingModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    ...emptyForm,
    safari: preselectedSafari || "",
  });

  useEffect(() => {
    if (preselectedSafari) {
      setForm((current) => ({ ...current, safari: preselectedSafari }));
    }
  }, [preselectedSafari]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedSafari = safaris.find((safari) => safari.id === form.safari);
    if (!selectedSafari) { toast.error("Please select a safari package."); return; }
    if (!date) { toast.error("Please choose your preferred travel date."); return; }

    setIsSubmitting(true);

    try {
      // If user is logged in, create a booking and redirect to Stripe checkout
      if (user) {
        const { data, error } = await supabase.functions.invoke("create-checkout", {
          body: {
            safariId: selectedSafari.id,
            safariTitle: selectedSafari.title,
            priceId: selectedSafari.stripePriceId,
            guests: form.guests,
            preferredDate: format(date, "yyyy-MM-dd"),
            notes: form.notes,
          },
        });

        if (error || data?.error) throw new Error(data?.error || error?.message || "Checkout failed");

        // Also sync to Google Sheets
        try {
          await submitInquiry({
            inquiryType: "booking",
            fullName: form.name || user.user_metadata?.full_name || "",
            email: user.email || "",
            phone: form.phone,
            safariId: selectedSafari.id,
            safariTitle: selectedSafari.title,
            preferredDate: format(date, "yyyy-MM-dd"),
            guests: form.guests,
            message: form.notes,
          });
        } catch {
          // Non-critical: sheet sync can fail silently
        }

        onOpenChange(false);
        // Redirect to Stripe checkout
        if (data?.url) window.location.href = data.url;
      } else {
        // Guest: just submit inquiry (no payment)
        const result = await submitInquiry({
          inquiryType: "booking",
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          safariId: selectedSafari.id,
          safariTitle: selectedSafari.title,
          preferredDate: format(date, "yyyy-MM-dd"),
          guests: form.guests,
          message: form.notes,
        });

        toast.success(
          result.googleSheetsSynced
            ? "Booking inquiry sent! We'll contact you within 24 hours."
            : "Booking inquiry sent! Our team will follow up shortly."
        );
        onOpenChange(false);
        setForm(emptyForm);
        setDate(undefined);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not process your booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">Book Your Safari</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {user
              ? "Select your safari and proceed to secure checkout."
              : "Share your travel details and we'll confirm availability within 24 hours. Sign in for instant booking with secure payment."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {!user && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Full Name *</label>
                <Input placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Email *</label>
                <Input type="email" placeholder="john@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>
          )}

          {!user && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Phone</label>
              <Input placeholder="+254 700 000 000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-accent" /> Safari Package *
            </label>
            <Select value={form.safari} onValueChange={(v) => setForm({ ...form, safari: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a safari package" />
              </SelectTrigger>
              <SelectContent>
                {safaris.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.title} — ${s.price}/person
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-accent" /> Preferred Date *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Users className="w-4 h-4 text-accent" /> Guests *
              </label>
              <Select value={form.guests} onValueChange={(v) => setForm({ ...form, guests: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </SelectItem>
                  ))}
                  <SelectItem value="10+">10+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Special Requests</label>
            <Textarea placeholder="Any special requirements..." rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>

          {user && (
            <div className="bg-muted/50 rounded-xl p-3 flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="w-4 h-4 text-accent" />
              You'll be redirected to secure Stripe checkout after submitting.
            </div>
          )}

          {!user && (
            <div className="bg-muted/50 rounded-xl p-3 text-sm text-muted-foreground text-center">
              <button type="button" onClick={() => { onOpenChange(false); navigate("/login"); }} className="text-accent font-medium hover:underline">
                Sign in
              </button>
              {" "}for instant booking with secure payment.
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl py-5 text-base font-semibold disabled:opacity-70">
            {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : user ? <CreditCard className="w-5 h-5 mr-2" /> : <Send className="w-5 h-5 mr-2" />}
            {user ? "Proceed to Payment" : "Submit Booking Inquiry"}
          </Button>

          {!user && (
            <p className="text-xs text-muted-foreground text-center">
              No payment required now. We'll confirm availability and send you a quote.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
