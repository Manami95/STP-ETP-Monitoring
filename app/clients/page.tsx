import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ClientCard } from "@/components/ClientCard"

const mockClients = [
  {
    id: "1",
    name: "Sunshine Group",
    email: "contact@sunshinegroup.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    totalIndustries: 3,
    totalPlants: 15,
    activePlants: 12,
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
  },
  // Add more mock clients
]

export default function ClientsPage() {
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
          <Button className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-lg transition-all hover:shadow-xl">
            <Plus className="h-4 w-4 mr-2" />
            Add New Client
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClients.map((client) => (
            <div key={client.id} className="transform hover:scale-[1.02] transition-all duration-200">
              <ClientCard key={client.id} client={client} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

