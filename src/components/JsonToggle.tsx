import { useState } from "react";
import { Code, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { IpInfo } from "@/lib/ip-types";

interface JsonToggleProps {
  data: IpInfo | null;
}

const JsonToggle = ({ data }: JsonToggleProps) => {
  const [open, setOpen] = useState(false);

  if (!data) return null;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-xs text-muted-foreground"
        onClick={() => setOpen(!open)}
      >
        <Code className="h-3.5 w-3.5" />
        Raw JSON
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </Button>
      {open && (
        <Card className="mt-2">
          <CardContent className="p-4">
            <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap text-muted-foreground">
              {JSON.stringify(data, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JsonToggle;
