import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { toast } from "sonner";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 bg-primary text-primary-foreground">
          <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Contact Us</h1>
            <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto text-lg">
              Ready to plan your dream safari? We'd love to hear from you.
            </p>
          </div>
        </section>

        <section className="section-padding bg-background" ref={ref}>
          <div className="container-wide mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}>
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
                  <p className="text-muted-foreground">
                    Have questions about our safaris? Want a custom itinerary? Reach out and our team will respond within 24 hours.
                  </p>
                </div>

                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: "Address", value: "Plainsview Road, Off Mombasa Road, Nairobi, Kenya" },
                    { icon: Phone, label: "Phone", value: "+254 722 000 000" },
                    { icon: Mail, label: "Email", value: "info@tambuaafrica.com" },
                    { icon: Clock, label: "Working Hours", value: "Mon - Sat: 8:00 AM - 6:00 PM" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">{item.label}</div>
                        <div className="text-muted-foreground text-sm">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-primary text-primary-foreground">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" /> Why Book With Us?
                  </h3>
                  <ul className="space-y-2 text-sm text-primary-foreground/80">
                    <li>• No booking fees or hidden charges</li>
                    <li>• Free cancellation up to 7 days before</li>
                    <li>• 24/7 customer support during your trip</li>
                    <li>• Best price guarantee</li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-5">
                  <h3 className="text-xl font-bold text-foreground">Send us a Message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <Input placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone</label>
                      <Input placeholder="+254 700 000 000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Subject</label>
                      <Input placeholder="Safari Inquiry" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Message</label>
                    <Textarea placeholder="Tell us about your dream safari..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                  </div>
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl py-6 text-base font-semibold">
                    <Send className="w-5 h-5 mr-2" /> Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
