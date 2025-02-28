import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Industry } from "@/types"
import { Building2, Factory } from "lucide-react"

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Factory className="h-5 w-5 text-primary" />
          {industry.name}
        </CardTitle>
        <span className="text-sm text-muted-foreground">{industry.type}</span>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Plants</p>
            <p className="text-2xl font-bold text-primary">{industry.totalPlants}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Active Plants</p>
            <p className="text-2xl font-bold text-secondary">{industry.activePlants}</p>
          </div>
          <div className="col-span-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            {industry.location}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

