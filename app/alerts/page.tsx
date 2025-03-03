'use client'

import { AlertSystem } from "@/components/AlertSystem"
import { Alert } from "@/types/alert"
import type { Client } from "@/app/clients/page"
import { Bell } from "lucide-react"

const initialClients: Client[] = [
  {
    id: "1",
    name: "Sunshine Group",
    email: "contact@sunshinegroup.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    totalIndustries: 3,
    totalPlants: 15,
    activePlants: 12,
    alerts: [
      { id: "1", type: "warning", message: "Maintenance due for Plant A", timestamp: new Date().toISOString() },
      { id: "2", type: "critical", message: "Emergency shutdown in Plant B", timestamp: new Date().toISOString() }
    ],
    yearlyData: [
      { month: "Jan", value: 65 },
      { month: "Feb", value: 70 },
      { month: "Mar", value: 75 },
      { month: "Apr", value: 72 },
      { month: "May", value: 80 },
      { month: "Jun", value: 85 },
      { month: "Jul", value: 82 },
      { month: "Aug", value: 88 },
      { month: "Sep", value: 87 },
      { month: "Oct", value: 85 },
      { month: "Nov", value: 90 },
      { month: "Dec", value: 92 }
    ]
  },
  {
    id: "2",
    name: "Green Valley Corp",
    email: "info@greenvalley.com",
    phone: "+91 98765 43211",
    location: "Bangalore, Karnataka",
    totalIndustries: 2,
    totalPlants: 8,
    activePlants: 7,
    alerts: [
      { id: "3", type: "info", message: "Scheduled maintenance completed", timestamp: new Date().toISOString() }
    ],
    yearlyData: [
      { month: "Jan", value: 45 },
      { month: "Feb", value: 52 },
      { month: "Mar", value: 55 },
      { month: "Apr", value: 58 },
      { month: "May", value: 62 },
      { month: "Jun", value: 65 },
      { month: "Jul", value: 68 },
      { month: "Aug", value: 72 },
      { month: "Sep", value: 75 },
      { month: "Oct", value: 78 },
      { month: "Nov", value: 82 },
      { month: "Dec", value: 85 }
    ]
  },
]

export default function AlertsPage() {
  const allAlerts = initialClients.flatMap(client => 
    client.alerts.map(alert => ({
      ...alert,
      clientName: client.name,
      clientId: client.id
    }))
  )

  return (
    <div className="container mx-auto py-8 px-4 max-w-2000px">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Bell className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Alerts Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage alerts across all clients</p>
        </div>
      </div>
      <AlertSystem data={allAlerts} />
    </div>
  )
}

