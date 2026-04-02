import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSafaris } from "@/hooks/useSafaris";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export const AIAgentChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Jambo! I'm your Tambua Safari Assistant. How can I help you plan your perfect adventure today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuth();
  const { data: safaris } = useSafaris();
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // AI Simulation logic
    setTimeout(() => {
      let response = "That sounds amazing! I can certainly help you with that. Are you looking for a specific destination or type of safari?";
      
      const lowerInput = userMsg.content.toLowerCase();
      
      // Admin specific logic
      if (user?.role === "admin" && lowerInput.includes("analyze")) {
        response = "Analyzing... The website has robust traffic today. Most users are viewing the 'Masai Mara' packages. Booking conversion rate is up 12% this week.";
      } 
      // Client suggestion logic
      else if (lowerInput.includes("suggest") || lowerInput.includes("recommend")) {
        if (safaris && safaris.length > 0) {
          response = `Based on current season trends, I highly recommend our ${safaris[0].title}. It's a fantastic choice right now and offers incredible sightings!`;
        } else {
          response = "I highly recommend checking out our Featured Wildlife Safaris on the Safaris page. We have some fantastic packages available right now!";
        }
      } else if (lowerInput.includes("price") || lowerInput.includes("cost")) {
        response = "Our safari prices vary depending on duration and luxury level. They typically start from $1,200 per person. You can find detailed pricing on each package's specific page.";
      } else if (lowerInput.includes("book") || lowerInput.includes("reserve")) {
        response = "To book, simply click the 'Book Now' button on any safari package. You can also contact us directly via WhatsApp from the Contact page!";
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: response };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  if (location.pathname.startsWith("/admin") && user?.role !== "admin") {
    return null; // Don't show on admin routes unless actually admin
  }

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-accent text-accent-foreground shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-primary/5 p-4 border-b border-border flex items-center gap-3">
            <div className="bg-accent/20 p-2 rounded-full">
              <Bot className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Tambua AI Assistant</h3>
              <p className="text-xs text-muted-foreground">{user?.role === "admin" ? "Admin Mode Active" : "Online and ready to help"}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="max-w-[75%] rounded-2xl px-4 py-2 text-sm bg-muted text-foreground rounded-tl-sm flex items-center gap-2">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-border bg-card">
            <div className="relative flex items-center">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="pr-12 rounded-full border-border bg-muted/50 focus-visible:ring-1"
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-1 w-8 h-8 rounded-full hover:bg-transparent text-accent"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
