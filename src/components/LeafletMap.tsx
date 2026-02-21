import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  isLoading: boolean;
}

const LeafletMap = ({ latitude, longitude, isLoading }: LeafletMapProps) => {
  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[280px] w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  if (!latitude && !longitude) return null;

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.05},${latitude - 0.05},${longitude + 0.05},${latitude + 0.05}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] rounded-lg overflow-hidden border border-border">
          <iframe
            src={mapUrl}
            className="h-full w-full border-0"
            loading="lazy"
            title="IP Location Map"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LeafletMap;
