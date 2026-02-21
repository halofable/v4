import { useState } from "react";
import { Search, AlertCircle, Locate } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidIp } from "@/lib/ip-validation";

interface IpSearchProps {
  onSearch: (ip: string) => void;
  onMyIp: () => void;
  isLoading: boolean;
}

const IpSearch = ({ onSearch, onMyIp, isLoading }: IpSearchProps) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Please enter an IP address");
      return;
    }
    if (!isValidIp(trimmed)) {
      setError("Invalid IP address");
      return;
    }
    setError("");
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter IP address (e.g. 8.8.8.8)"
            className={`h-11 pl-4 pr-4 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="h-11 px-5 gap-2">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Lookup</span>
        </Button>
        <Button type="button" variant="outline" disabled={isLoading} className="h-11 px-4 gap-2" onClick={onMyIp}>
          <Locate className="h-4 w-4" />
          <span className="hidden sm:inline">My IP</span>
        </Button>
      </div>
      {error && (
        <div className="flex items-center gap-1.5 mt-2 text-sm text-destructive">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </div>
      )}
    </form>
  );
};

export default IpSearch;
