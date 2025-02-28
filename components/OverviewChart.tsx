"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

interface OverviewData {
  date: string;
  efficiency: number;
  downtime: number;
  maintenance: number;
}

export default function OverviewChart({ data }: { data: OverviewData[] }) {
  return (
    <LineChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700/50" />
      <XAxis 
        dataKey="date" 
        stroke="hsl(var(--foreground))"
        fontSize={12}
        tickLine={false}
      />
      <YAxis 
        stroke="hsl(var(--foreground))"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <Tooltip 
        contentStyle={{
          backgroundColor: "hsl(var(--background))",
          borderColor: "hsl(var(--border))",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "8px 12px"
        }}
        labelStyle={{
          color: "hsl(var(--foreground))",
          fontWeight: "500",
          marginBottom: "4px"
        }}
      />
      <Legend 
        verticalAlign="top" 
        height={36}
        iconType="circle"
        iconSize={6}
      />
      <Line 
        type="monotone" 
        dataKey="efficiency" 
        name="Efficiency %" 
        stroke="hsl(199, 89%, 48%)" // Bright cyan
        strokeWidth={1.5}
        dot={{ r: 3 }}
        activeDot={{ r: 4 }}
      />
      <Line 
        type="monotone" 
        dataKey="downtime" 
        name="Downtime %" 
        stroke="hsl(333, 71%, 51%)" // Bright fuchsia
        strokeWidth={1.5}
        dot={{ r: 3 }}
        activeDot={{ r: 4 }}
      />
      <Line 
        type="monotone" 
        dataKey="maintenance" 
        name="Maintenance %" 
        stroke="hsl(262, 83%, 58%)" // Bright indigo
        strokeWidth={1.5}
        dot={{ r: 3 }}
        activeDot={{ r: 4 }}
      />
    </LineChart>
  )
}

