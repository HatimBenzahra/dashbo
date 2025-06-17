// src/components/custom/SalesLineChart.tsx
"use client" // Nécessaire pour les composants Recharts car ils utilisent des hooks React

import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts"
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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

// Données de démo qui ressemblent à la maquette
const chartData = [
  { month: "Jan", visites: 50, rdv: 10, refus: 20 },
  { month: "Feb", visites: -10, rdv: -5, refus: -15 },
  { month: "Mar", visites: 35, rdv: 5, refus: 25 },
  { month: "Apr", visites: 18, rdv: 20, refus: -10 },
  { month: "Mai", visites: 25, rdv: -15, refus: -5 },
  { month: "Jun", visites: -22, rdv: 10, refus: 40 },
]

const chartConfig = {
  visites: {
    label: "Visites",
    color: "hsl(var(--chart-1))", // Bleu
  },
  rdv: {
    label: "RDV",
    color: "hsl(var(--chart-2))", // Rose
  },
  refus: {
    label: "Refus",
    color: "hsl(var(--chart-3))", // Violet
  },
}

export function SalesLineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portes tapées</CardTitle>
        <CardDescription>Évolution sur les 6 derniers mois</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
             <Legend content={<ChartLegendContent />} />
            <Line
              dataKey="visites"
              type="monotone"
              stroke={chartConfig.visites.color}
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="rdv"
              type="monotone"
              stroke={chartConfig.rdv.color}
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="refus"
              type="monotone"
              stroke={chartConfig.refus.color}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}