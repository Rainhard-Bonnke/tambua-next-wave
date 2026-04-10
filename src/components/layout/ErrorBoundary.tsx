import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    
    // Automatically recover from chunk loading errors (caused by new deployments)
    const isChunkError = error.message.includes("Failed to fetch dynamically imported module") ||
                        error.message.includes("Loading chunk") ||
                        error.message.includes("Unexpected token '<'") ||
                        error.message.includes("Network error");

    if (isChunkError) {
      console.warn("Chunk loading error detected. Forcing reload to fetch new site version...");
      // Add a small delay to avoid infinite reload loops
      const lastReload = sessionStorage.getItem('last-reload');
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload) > 5000) {
        sessionStorage.setItem('last-reload', now.toString());
        window.location.reload();
      }
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
              <p className="text-muted-foreground">
                We encountered an unexpected error. Please try refreshing the page or contact support if the issue persists.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
              >
                Refresh Page
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = "/"}
                className="rounded-xl border-border hover:bg-muted"
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
