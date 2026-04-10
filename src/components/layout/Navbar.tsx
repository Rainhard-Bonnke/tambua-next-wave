import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Safaris", path: "/safaris", dropdown: [
    { label: "Kenya Safaris", path: "/safaris/kenya" },
  ]},
  { label: "Destination", path: "/destinations" },
  { label: "Travel Info", path: "/travel-info", dropdown: [
    { label: "About Us", path: "/about" },
    { label: "Gallery Page", path: "/gallery" },
  ]},
  { label: "Accommodation", path: "/accommodation" },
  { label: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("Navbar: User logged in", user.email, "isAdmin:", isAdmin);
    }
  }, [user, isAdmin]);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary ${
        isScrolled ? "shadow-lg border-b-2 border-primary/20" : ""
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-white p-2 rounded-lg transition-all duration-300">
              <img 
                src="/tambua-logo.png" 
                alt="Tambua Africa" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <span className="font-bold text-lg sm:text-xl text-white">
              Tambua Africa Tours & Safaris Ltd.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-white/20 text-white"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Auth Buttons */}
            {!user ? (
              <Button
                asChild
                className={"bg-white text-primary hover:bg-white/90 font-semibold"}
              >
                <Link to="/login">Sign In / Create Account</Link>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Button
                    asChild
                    variant="outline"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold border-none hidden sm:flex"
                  >
                    <Link to="/admin">Admin Dashboard</Link>
                  </Button>
                )}
                <Button
                  asChild
                  className={"bg-transparent text-white hover:bg-white/10 font-semibold border-2 border-white"}
                >
                  <Link to="/dashboard">My Bookings</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-white/10 text-white"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t-2 border-primary">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-4 py-3 rounded-lg text-sm font-bold bg-accent text-accent-foreground transition-colors"
              >
                Admin Dashboard
              </Link>
            )}
            <Button asChild className="w-full mt-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              <Link to="/safaris">Let's Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
