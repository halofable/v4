import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type LucideIcon } from "lucide-react";

interface InfoItem {
  label: string;
  value: string;
}

interface InfoCardProps {
  title: string;
  icon: LucideIcon;
  items: InfoItem[];
  isLoading: boolean;
}

const InfoCard = ({ title, icon: Icon, items, isLoading }: InfoCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))
          : items
              .filter((item) => item.value)
              .map((item) => (
                <div key={item.label} className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground shrink-0">{item.label}</span>
                  <span className="font-medium text-right truncate">{item.value}</span>
                </div>
              ))}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
