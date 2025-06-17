// src/components/custom/StatCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
};

export function StatCard({ title, value }: StatCardProps) {
  return (
    // --- C'est ici que nous ajoutons nos classes pour l'animation ---
    <Card className="transition-all duration-200 ease-in-out hover:scale-[1.03] hover:shadow-xl cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Check className="h-4 w-4 text-green-500" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}