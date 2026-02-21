import { Gauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SpeedTest = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <Card className="max-w-md w-full">
        <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Gauge className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold">Speed Test</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Internet speed testing is coming soon. This feature will use LibreSpeed for accurate, 
            privacy-friendly bandwidth measurements.
          </p>
          <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Coming Soon
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeedTest;
