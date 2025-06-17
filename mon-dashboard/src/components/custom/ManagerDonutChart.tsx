// src/components/custom/ManagerDonutChart.tsx
"use client"

import * as React from "react"
import { Pie, PieChart, Tooltip, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Données et Configuration
const chartData = [
  { manager: "managerX", value: 50, color: "hsl(var(--chart-1))" },
  { manager: "managerY", value: 35, color: "hsl(var(--chart-3))" },
  { manager: "managerZ", value: 15, color: "hsl(var(--chart-2))" },
]

const chartConfig = {
  value: { label: "Value" },
  managerX: { label: "Manager X", color: "hsl(var(--chart-1))" },
  managerY: { label: "Manager Y", color: "hsl(var(--chart-3))" },
  managerZ: { label: "Manager Z", color: "hsl(var(--chart-2))" },
}

export function ManagerDonutChart() {
  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition des managers (Top 3)</CardTitle>
        <CardDescription>Performance sur la période en cours</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center gap-8 p-6">
        {/* Colonne du graphique, rendu plus petit pour un meilleur équilibre */}
        <div className="w-1/2">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[160px]"
          >
            <PieChart>
              <Tooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="manager"
                innerRadius={45} // Rayon intérieur ajusté
                outerRadius={65} // Rayon extérieur réduit pour éviter tout clipping
                strokeWidth={5}
                // 1. On supprime complètement les labels du graphique pour l'épurer
                label={false} 
                labelLine={false}
              >
                {chartData.map((entry) => (
                  <Cell key={`cell-${entry.manager}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>

        {/* Colonne de la légende personnalisée, avec un layout amélioré */}
        <div className="flex w-1/2 flex-col gap-4 text-sm">
          {chartData.map((entry) => {
            const percentage = ((entry.value / totalValue) * 100).toFixed(0);
            return (
              // 2. On utilise `justify-between` sur le conteneur principal de l'item
              // pour un espacement parfait et contrôlé.
              <div key={entry.manager} className="flex items-center justify-between">
                {/* Groupe pour le point de couleur et le nom */}
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-muted-foreground">
                    {chartConfig[entry.manager as keyof typeof chartConfig].label}
                  </span>
                </div>
                {/* Pourcentage aligné à droite par justify-between */}
                <span className="font-bold">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  )
}