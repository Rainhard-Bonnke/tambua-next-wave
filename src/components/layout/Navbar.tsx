import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Safaris", path: "/safaris" },
  { label: "Destinations", path: "/destinations" },
  { label: "Gallery", path: "/gallery" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-white/90 p-1 rounded-xl backdrop-blur-sm shadow-sm transition-transform hover:scale-105">
              <img 
                src="/tambua-logo.png" 
                alt="Tambua Africa" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? isScrolled
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/20 text-white"
                    : isScrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? "hover:bg-muted text-foreground" : "hover:bg-white/10 text-white"
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <Button
                asChild
                className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              >
                <Link to="/dashboard">
                  <User className="w-4 h-4 mr-2" /> My Bookings
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              >
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" /> Sign In
                </Link>
              </Button>
            )}

            <Button
              asChild
              className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              <Link to="/safaris">Book Now</Link>
            </Button>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "hover:bg-muted text-foreground" : "hover:bg-white/10 text-white"
              }`}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-md border-t border-border animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Button asChild className="w-full mt-3 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                <Link to="/dashboard">
                  <User className="w-4 h-4 mr-2" /> My Bookings
                </Link>
              </Button>
            ) : (
              <Button asChild className="w-full mt-3 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" /> Sign In
                </Link>
              </Button>
            )}
            <Button asChild className="w-full mt-3 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/safaris">Book Now</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
