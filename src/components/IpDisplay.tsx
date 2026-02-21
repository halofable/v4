import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { countryCodeToFlag } from "@/lib/ip-api";
import { toast } from "sonner";

interface IpDisplayProps {
  ip: string | null;
  countryCode?: string;
  source?: string;
  isLoading: boolean;
}

const IpDisplay = ({ ip, countryCode, source, isLoading }: IpDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!ip) return;
    await navigator.clipboard.writeText(ip);
    setCopied(true);
    toast.success("IP copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="text-center space-y-3">
        <Skeleton className="h-5 w-32 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-4 w-24 mx-auto" />
      </div>
    );
  }

  if (!ip) return null;

  const flag = countryCode ? countryCodeToFlag(countryCode) : "";

  return (
    <div className="text-center space-y-2">
      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Your IP Address</p>
      <div className="flex items-center justify-center gap-3">
        {flag && <span className="text-3xl">{flag}</span>}
        <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight">{ip}</span>
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      {source && (
        <p className="text-xs text-muted-foreground">
          Source: <span className="font-medium">{source}</span>
        </p>
      )}
    </div>
  );
};

export default IpDisplay;
