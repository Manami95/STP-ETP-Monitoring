'use client'

import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { ClientCard } from "@/components/ClientCard"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Alert } from "@/types/alert"

export type Client = {
  id: string
  name: string
  email: string
  phone: string
  location: string
  totalIndustries: number
  totalPlants: number
  activePlants: number
  alerts: Alert[]
  yearlyData: {
    month: string
    value: number
  }[]
}

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
    alerts: [],
    yearlyData: [],
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
    alerts: [],
    yearlyData: [],
  },
  // Add more mock clients
]

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients)

  useEffect(() => {
    const storedClients = localStorage.getItem('clients')
    if (storedClients) {
      setClients(JSON.parse(storedClients))
    } else {
      localStorage.setItem('clients', JSON.stringify(initialClients))
    }
  }, [])

  const deleteClient = (id: string) => {
    const updatedClients = clients.filter(client => client.id !== id)
    setClients(updatedClients)
    localStorage.setItem('clients', JSON.stringify(updatedClients))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/90 dark:from-slate-950 dark:to-slate-900/90">
      <div className="container mx-auto p-8 space-y-8">
        <div className="flex justify-between items-center bg-white/50 dark:bg-slate-800/50 p-6 rounded-lg backdrop-blur-sm shadow-lg">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              Clients
            </h1>
            <p className="text-muted-foreground mt-1">Manage your client portfolio</p>
          </div>
          <Link href="/clients/new">
            <Button className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-lg transition-all hover:shadow-xl">
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="transform hover:scale-[1.02] transition-all duration-200">
              <ClientCard 
                client={client} 
                onDelete={() => deleteClient(client.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

