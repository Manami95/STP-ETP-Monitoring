import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Factory, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Client = {
  id: string
  name: string
  email: string
  phone: string
  location: string
  totalIndustries: number
  totalPlants: number
  activePlants: number
}

export function ClientCard({ client }: { client: Client }) {
  return (
    <Card className="bg-gradient-to-br from-slate-50 via-indigo-50/5 to-slate-100/90 dark:from-slate-900 dark:via-indigo-900/5 dark:to-slate-800/90 border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
          {client.name}
        </CardTitle>
        <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80 hover:bg-primary/10">
          <Link href={`/clients/${client.id}`}>View Details</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Industries</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                <Factory className="h-5 w-5 text-primary" />
                {client.totalIndustries}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Active Plants</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent flex items-center gap-2">
                <Building2 className="h-5 w-5 text-violet-500" />
                {client.activePlants}/{client.totalPlants}
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm border-t border-border/50 pt-4">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary/80 transition-colors">
              <MapPin className="h-4 w-4" />
              {client.location}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary/80 transition-colors">
              <Phone className="h-4 w-4" />
              {client.phone}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary/80 transition-colors">
              <Mail className="h-4 w-4" />
              {client.email}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

