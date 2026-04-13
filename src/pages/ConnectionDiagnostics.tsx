import { ConnectionStatus } from "@/components/ui/connection-status";

export const ConnectionDiagnostics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4 pt-24">
      <ConnectionStatus />
    </div>
  );
};

export default ConnectionDiagnostics;
