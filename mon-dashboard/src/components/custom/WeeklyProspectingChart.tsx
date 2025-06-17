// src/components/custom/WeeklyProspectingChart.tsx
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// 1. Importer ChartContainer, qui est le fournisseur de contexte
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

type ChartData = {
  day: string;
  value: number;
};

type WeeklyProspectingChartProps = {
  data: ChartData[];
  weekDescription: string;
};

const chartConfig = {
  value: { label: "Portes", color: "hsl(var(--foreground))" },
};

export function WeeklyProspectingChart({ data, weekDescription }: WeeklyProspectingChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistique Portes</CardTitle>
        <CardDescription>{weekDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* 2. Envelopper le graphique avec ChartContainer et lui passer la config */}
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          {/* ResponsiveContainer doit être à l'intérieur de ChartContainer */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={60}
              />
              {/* Maintenant, ChartTooltipContent peut trouver son contexte ! */}
              <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill={chartConfig.value.color} radius={4} barSize={20}>
                {/* Bonus : Ajoutons le label directement sur la barre pour correspondre à la maquette */}
                <LabelList dataKey="value" position="right" offset={8} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}