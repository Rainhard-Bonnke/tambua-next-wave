import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-wide mx-auto section-padding py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Stay Updated</h3>
              <p className="text-primary-foreground/70 mt-1">Get the latest safari deals and travel tips</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 w-full md:w-72"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
                <Send className="w-4 h-4 mr-2" /> Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide mx-auto section-padding py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">T</span>
              </div>
              <div>
                <span className="font-bold text-lg block leading-tight">Tambua Africa</span>
                <span className="text-xs text-primary-foreground/60">Tours & Safaris</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              With over 16 years of experience, we craft unforgettable safari experiences across East Africa. Let us show you the magic of the wild.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Safari Packages", path: "/safaris" },
                { label: "Destinations", path: "/destinations" },
                { label: "Blog", path: "/blog" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Safaris */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Popular Safaris</h4>
            <ul className="space-y-2">
              {["Masai Mara Safari", "Amboseli Safari", "Diani Beach Holiday", "Tsavo Adventure", "Lake Nakuru Tour", "Lamu Cultural Tour"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/safaris"
                      className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                <span>Plainsview Road, Off Mombasa Road, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 shrink-0 text-accent" />
                <span>+254 722 000 000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 shrink-0 text-accent" />
                <span>info@tambuaafrica.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Tambua Africa Tours & Safaris. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
