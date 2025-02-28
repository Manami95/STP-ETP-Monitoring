"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const parameters = [
  { name: "pH", unit: "", min: 6, max: 9 },
  { name: "COD", unit: "mg/L", min: 0, max: 250 },
  { name: "BOD", unit: "mg/L", min: 0, max: 30 },
  { name: "TSS", unit: "mg/L", min: 0, max: 100 },
  { name: "TDS", unit: "mg/L", min: 0, max: 2100 },
  { name: "DO", unit: "mg/L", min: 4, max: 8 },
  { name: "Flow Rate", unit: "m³/h", min: 0, max: 1000 },
  { name: "Temperature", unit: "°C", min: 0, max: 40 },
  { name: "Color Concentration", unit: "Pt-Co", min: 0, max: 100 },
]

function generateRandomData() {
  return parameters.map((param) => ({
    name: param.name,
    value: Math.random() * (param.max - param.min) + param.min,
  }))
}

export function LiveMonitoring() {
  const [data, setData] = useState(generateRandomData())

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {parameters.map((param) => (
        <Card key={param.name}>
          <CardHeader>
            <CardTitle>{param.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[...Array(10)].map((_, i) => ({
                    time: i,
                    value: Math.random() * (param.max - param.min) + param.min,
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[param.min, param.max]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center text-2xl font-bold">
              {data.find((d) => d.name === param.name)?.value.toFixed(2)} {param.unit}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

