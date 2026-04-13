import { useEffect, useState } from "react";
import { testConnections, type ConnectionTestResult } from "@/lib/connection-test";
import { AlertCircle, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ConnectionStatus = () => {
  const [results, setResults] = useState<ConnectionTestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRun, setLastRun] = useState<string>();

  const runTests = async () => {
    setLoading(true);
    const testResults = await testConnections();
    setResults(testResults);
    setLastRun(new Date().toLocaleTimeString());
    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusIcon = (status: ConnectionTestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: ConnectionTestResult["status"]) => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50";
      case "failed":
        return "border-red-200 bg-red-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
    }
  };

  const successCount = results.filter((r) => r.status === "success").length;
  const failedCount = results.filter((r) => r.status === "failed").length;
  const warningCount = results.filter((r) => r.status === "warning").length;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Frontend-Backend Connection Status</CardTitle>
          <CardDescription>
            Real-time diagnostics for all microservices and integrations
            {lastRun && <span className="block mt-2">Last run: {lastRun}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{successCount}</div>
              <div className="text-sm text-green-700">Connected</div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
              <div className="text-sm text-yellow-700">Warnings</div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{failedCount}</div>
              <div className="text-sm text-red-700">Failed</div>
            </div>
          </div>

          <Button onClick={runTests} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Tests...
              </>
            ) : (
              "Re-run Tests"
            )}
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({results.length})</TabsTrigger>
          <TabsTrigger value="success">✅ Success ({successCount})</TabsTrigger>
          <TabsTrigger value="warning">⚠️ Warnings ({warningCount})</TabsTrigger>
          <TabsTrigger value="failed">❌ Failed ({failedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {results.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No tests run yet</p>
          ) : (
            results.map((result, idx) => (
              <Card key={idx} className={`border-2 ${getStatusColor(result.status)}`}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="mt-1">{getStatusIcon(result.status)}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{result.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{result.timestamp}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="success" className="space-y-3 mt-4">
          {results
            .filter((r) => r.status === "success")
            .map((result, idx) => (
              <Card key={idx} className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-4 flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{result.name}</h4>
                    <p className="text-sm text-green-700 mt-1">{result.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="warning" className="space-y-3 mt-4">
          {results
            .filter((r) => r.status === "warning")
            .map((result, idx) => (
              <Card key={idx} className="border-2 border-yellow-200 bg-yellow-50">
                <CardContent className="p-4 flex items-start gap-4">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{result.name}</h4>
                    <p className="text-sm text-yellow-700 mt-1">{result.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="failed" className="space-y-3 mt-4">
          {results
            .filter((r) => r.status === "failed")
            .map((result, idx) => (
              <Card key={idx} className="border-2 border-red-200 bg-red-50">
                <CardContent className="p-4 flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{result.name}</h4>
                    <p className="text-sm text-red-700 mt-1">{result.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      {failedCount > 0 && (
        <Card className="border-2 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Connection Issues Detected
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-red-700">
            <p>
              Some backend services are not responding. Please check:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Supabase project is running</li>
              <li>Edge functions are deployed</li>
              <li>Database tables exist and are initialized</li>
              <li>Storage buckets are created</li>
              <li>Environment variables are correctly set</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
