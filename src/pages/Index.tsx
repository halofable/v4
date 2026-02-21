import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { MapPin, Wifi, Info } from "lucide-react";
import Header from "@/components/Header";
import IpSearch from "@/components/IpSearch";
import IpDisplay from "@/components/IpDisplay";
import InfoCard from "@/components/InfoCard";
import LeafletMap from "@/components/LeafletMap";
import RecentSearches from "@/components/RecentSearches";

import SpeedTest from "@/components/SpeedTest";
import FaqSection from "@/components/FaqSection";
import GlossarySection from "@/components/GlossarySection";
import { fetchPublicIp, lookupIp, addRecentSearch, getRecentSearches, countryCodeToFlag } from "@/lib/ip-api";
import type { IpInfo, RecentSearch } from "@/lib/ip-types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeTab, setActiveTab] = useState("ip-info");
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  const doLookup = useCallback(async (ip: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const info = await lookupIp(ip, (sourceName) => {
        toast.info(`Trying backup source: ${sourceName}...`);
      });
      setIpInfo(info);
      addRecentSearch(info);
      setRecentSearches(getRecentSearches());
    } catch (err: any) {
      setError(err.message || "All services failed");
      toast.error("All IP lookup services failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (ipInfo) {
      document.title = `IP Lookup: ${ipInfo.ip} (${ipInfo.city}, ${ipInfo.country}) — IP Looker`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", `Instantly find details for IP ${ipInfo.ip}. Geolocation: ${ipInfo.city}, ${ipInfo.country}. ISP: ${ipInfo.isp}. Free IP lookup tool with interactive map.`);
      }

      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute("href", `https://ip-looker.lovable.app/?ip=${ipInfo.ip}`);
      }
    } else {
      document.title = "IP Looker — Free IP Address Lookup & Geolocation Tool";
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", "Instantly look up any IP address to find geolocation, ISP, ASN, timezone, and more. Free tool with interactive map, multi-source fallback, and dark mode.");
      }
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute("href", "https://ip-looker.lovable.app/");
      }
    }
  }, [ipInfo]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
    (async () => {
      try {
        const ip = await fetchPublicIp();
        await doLookup(ip);
      } catch {
        setIsLoading(false);
        setError("Could not detect your IP address");
      }
    })();
  }, [doLookup]);

  const locationItems = ipInfo
    ? [
      { label: "Country", value: `${countryCodeToFlag(ipInfo.countryCode)} ${ipInfo.country}` },
      { label: "Region", value: ipInfo.region },
      { label: "City", value: ipInfo.city },
      { label: "Postal Code", value: ipInfo.postalCode },
      { label: "Timezone", value: ipInfo.timezone },
      { label: "Currency", value: ipInfo.currency },
    ]
    : [];

  const networkItems = ipInfo
    ? [
      { label: "ISP", value: ipInfo.isp },
      { label: "Organization", value: ipInfo.org },
      { label: "ASN", value: ipInfo.asn },
    ]
    : [];

  const extraItems = ipInfo
    ? [
      { label: "Continent", value: ipInfo.continent },
      { label: "Languages", value: ipInfo.languages },
      { label: "Connection", value: ipInfo.connectionType },
      { label: "Coordinates", value: ipInfo.latitude ? `${ipInfo.latitude.toFixed(4)}, ${ipInfo.longitude.toFixed(4)}` : "" },
    ]
    : [];

  return (
    <div className="min-h-screen bg-background text-foreground">

      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-8">
        {activeTab === "ip-info" ? (
          <>
            <IpDisplay
              ip={ipInfo?.ip || null}
              countryCode={ipInfo?.countryCode}
              source={ipInfo?.source}
              isLoading={isLoading}
            />

            <IpSearch onSearch={doLookup} onMyIp={async () => {
              try {
                const ip = await fetchPublicIp();
                await doLookup(ip);
              } catch {
                toast.error("Could not detect your IP address");
              }
            }} isLoading={isLoading} />

            <RecentSearches searches={recentSearches} onSelect={doLookup} />

            {error && (
              <Alert variant="destructive" className="max-w-xl mx-auto">
                <AlertDescription className="flex items-center justify-between">
                  <span>{error}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (ipInfo?.ip) doLookup(ipInfo.ip);
                    }}
                  >
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {!error && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard title="Location" icon={MapPin} items={locationItems} isLoading={isLoading} />
                <InfoCard title="Network" icon={Wifi} items={networkItems} isLoading={isLoading} />
                <LeafletMap
                  latitude={ipInfo?.latitude || 0}
                  longitude={ipInfo?.longitude || 0}
                  isLoading={isLoading}
                />
                <InfoCard title="Extra Info" icon={Info} items={extraItems} isLoading={isLoading} />
              </div>
            )}


            <FaqSection />
            <GlossarySection />
          </>
        ) : (
          <SpeedTest />
        )}
      </main>
    </div>
  );
};

export default Index;
