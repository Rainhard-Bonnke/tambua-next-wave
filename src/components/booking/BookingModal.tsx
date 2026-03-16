import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Users, MapPin, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { safaris } from "@/data/safaris";
import { toast } from "sonner";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedSafari?: string;
}

const BookingModal = ({ open, onOpenChange, preselectedSafari }: BookingModalProps) => {
  const [date, setDate] = useState<Date>();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    safari: preselectedSafari || "",
    guests: "2",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Booking inquiry sent! We'll confirm your safari within 24 hours.");
    onOpenChange(false);
    setForm({ name: "", email: "", phone: "", safari: "", guests: "2", notes: "" });
    setDate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">Book Your Safari</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Fill in your details and we'll get back to you within 24 hours with a confirmed itinerary.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
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

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Phone</label>
            <Input placeholder="+254 700 000 000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>

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
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Users className="w-4 h-4 text-accent" /> Guests *
              </label>
              <Select value={form.guests} onValueChange={(v) => setForm({ ...form, guests: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
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
            <Textarea placeholder="Any special requirements, dietary needs, or preferences..." rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>

          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl py-5 text-base font-semibold">
            <Send className="w-5 h-5 mr-2" /> Submit Booking Inquiry
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            No payment required now. We'll confirm availability and send you a detailed quote.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
