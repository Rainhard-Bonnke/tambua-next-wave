import React from "react";
import { Loader2 } from "lucide-react";

const SuspenseFallback = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-primary/20" />
          <Loader2 className="w-16 h-16 text-primary animate-spin absolute top-0 left-0" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Loading your adventure...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuspenseFallback;
