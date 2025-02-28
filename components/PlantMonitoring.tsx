"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Plant } from "@/types"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ChartComponent = dynamic(() => import('./Chart'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
      Loading chart...
    </div>
  )
})

const parameterColors = {
  pH: "#06b6d4",
  COD: "#0ea5e9",
  BOD: "#14b8a6",
  TSS: "#10b981",
  TDS: "#059669",
  DO: "#0d9488",
  flowRate: "#0891b2",
  temperature: "#0284c7",
  colorConcentration: "#0369a1",
}

type ChartDataPoint = {
  time: string;
  pH: number;
  COD: number;
  BOD: number;
  TSS: number;
  TDS: number;
  DO: number;
  flowRate: number;
  temperature: number;
  colorConcentration: number;
}

export function PlantMonitoring({ plant }: { plant: Plant }) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    const data = Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      pH: 7 + (Math.random() - 0.5) * 2,
      COD: 150 + (Math.random() - 0.5) * 50,
      BOD: 30 + (Math.random() - 0.5) * 10,
      TSS: 100 + (Math.random() - 0.5) * 30,
      TDS: 500 + (Math.random() - 0.5) * 100,
      DO: 6 + (Math.random() - 0.5) * 2,
      flowRate: 200 + (Math.random() - 0.5) * 50,
      temperature: 25 + (Math.random() - 0.5) * 5,
      colorConcentration: 50 + (Math.random() - 0.5) * 20,
    }));
    setChartData(data);
  }, []);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">{plant.name}</h2>
          <p className="text-muted-foreground">Last updated: {plant.lastUpdated}</p>
        </div>
        <Badge variant={plant.status === "active" ? "default" : "destructive"}>
          {plant.status === "active" ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Live Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartComponent data={chartData} colors={parameterColors} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plant Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {plant.location && (
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${plant.location.lng-0.01},${plant.location.lat-0.01},${plant.location.lng+0.01},${plant.location.lat+0.01}&layer=mapnik&marker=${plant.location.lat},${plant.location.lng}`}
                  allowFullScreen
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(parameterColors).map(([key, color]) => {
                const value = chartData[chartData.length - 1]?.[key as keyof ChartDataPoint];
                return (
                  <div key={key} className="space-y-1">
                    <p className="text-sm text-muted-foreground">{key}</p>
                    <p className="text-xl font-bold" style={{ color }}>
                      {typeof value === 'number' ? value.toFixed(2) : '---'}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

