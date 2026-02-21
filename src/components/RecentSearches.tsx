import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { countryCodeToFlag, getRecentSearches } from "@/lib/ip-api";
import type { RecentSearch } from "@/lib/ip-types";

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelect: (ip: string) => void;
}

const RecentSearches = ({ searches, onSelect }: RecentSearchesProps) => {
  if (searches.length === 0) return null;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Recent</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((s) => (
          <Button
            key={s.ip}
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => onSelect(s.ip)}
          >
            {s.countryCode && <span>{countryCodeToFlag(s.countryCode)}</span>}
            <span className="font-mono">{s.ip}</span>
            {s.city && <span className="text-muted-foreground">· {s.city}</span>}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
