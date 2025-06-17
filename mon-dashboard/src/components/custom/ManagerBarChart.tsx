// src/components/custom/ManagerBarChart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


// Données de démo
const chartData = [
  { manager: "Manager A", value: 1004 },
  { manager: "Manager B", value: 105 },
  { manager: "Manager C", value: 145 },
  { manager: "Manager D", value: 145 },
  { manager: "Manager E", value: 134 },
  { manager: "Manager F", value: 123 },
  { manager: "Manager G", value: 300 },
  { manager: "Manager A", value: 204 },
  { manager: "Manager B", value: 105 },
  { manager: "Manager C", value: 145 },
  { manager: "Manager D", value: 145 },
  { manager: "Manager E", value: 134 },
  { manager: "Manager F", value: 123 },
  { manager: "Manager G", value: 54 },
];

const chartConfig = {
  value: {
    label: "Refus", // On peut rendre ça dynamique plus tard
    color: "hsl(var(--chart-1))",
  },
};

export function ManagerBarChart() {
  // Dans le futur, cet état changera les données affichées
  // const [filter, setFilter] = useState("refus");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Performance par Manager</CardTitle>
          <CardDescription>Données du mois en cours</CardDescription>
        </div>
        <Select defaultValue="refus">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Filtrer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="refus">Refus</SelectItem>
            <SelectItem value="visites">Visites</SelectItem>
            <SelectItem value="contrats">Contrats</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="manager"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill={chartConfig.value.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}