import { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const CookieConsent = forwardRef<HTMLDivElement>((_, ref) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  return (
    <div ref={ref}>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
          >
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Cookie className="w-8 h-8 text-accent shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm">We use cookies</h4>
                <p className="text-muted-foreground text-xs mt-1">
                  We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={decline} className="rounded-lg text-xs">
                  Decline
                </Button>
                <Button size="sm" onClick={accept} className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-xs">
                  Accept
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

CookieConsent.displayName = "CookieConsent";

export default CookieConsent;
