"use client"

import { useState, useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

const CPCB_LIMITS = {
  pH: { min: 6, max: 9 },
  COD: { min: 0, max: 250 },
  BOD: { min: 0, max: 30 },
  TSS: { min: 0, max: 100 },
  TDS: { min: 0, max: 2100 },
  DO: { min: 4, max: 8 },
  "Flow Rate": { min: 0, max: 1000 },
  Temperature: { min: 0, max: 40 },
  "Color Concentration": { min: 0, max: 100 },
}

type ParameterName = keyof typeof CPCB_LIMITS;

interface DataItem {
  name: ParameterName;
  value: number
}

export function AlertSystem({ data }: { data: DataItem[] }) {
  const [alerts, setAlerts] = useState<DataItem[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const newAlerts = data.filter((item) => {
      const limit = CPCB_LIMITS[item.name]
      return item.value < limit.min || item.value > limit.max
    })

    setAlerts(newAlerts)

    newAlerts.forEach((alert) => {
      toast({
        title: `${alert.name} Limit Exceeded`,
        description: `Current value: ${alert.value}`,
        variant: "destructive",
      })
    })
  }, [data, toast])

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <Alert key={index} variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{alert.name} Limit Exceeded</AlertTitle>
          <AlertDescription>Current value: {alert.value.toFixed(2)}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

