import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Mail, Phone, Building2, Factory, MapPin, AlertTriangle, Bell } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import type { Client } from "@/app/clients/page"
import { useState } from "react"

interface ClientCardProps {
  client: Client
  onDelete: () => void
}

export function ClientCard({ client, onDelete }: ClientCardProps) {
  const [showAlertHistory, setShowAlertHistory] = useState(false)

  // Calculate alert statistics
  const alertStats = {
    critical: client.alerts?.filter(a => a.type === 'critical').length || 0,
    warning: client.alerts?.filter(a => a.type === 'warning').length || 0,
    info: client.alerts?.filter(a => a.type === 'info').length || 0,
    total: client.alerts?.length || 0
  }

  // Prepare alert history data (grouped by month)
  const alertHistory = client.alerts?.reduce((acc, alert) => {
    const date = new Date(alert.timestamp)
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`
    
    if (!acc[monthYear]) {
      acc[monthYear] = { critical: 0, warning: 0, info: 0, month: monthYear }
    }
    acc[monthYear][alert.type]++
    return acc
  }, {} as Record<string, any>)

  const alertHistoryData = Object.values(alertHistory || {}).sort((a, b) => 
    new Date(a.month).getTime() - new Date(b.month).getTime()
  )

  return (
    <Card className="bg-gradient-to-br from-slate-50 via-indigo-50/5 to-slate-100/90 dark:from-slate-900 dark:via-indigo-900/5 dark:to-slate-800/90 border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
          {client.name}
        </CardTitle>
        <div className="flex gap-2">
          <Link href={`/clients/edit/${client.id}`}>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="icon"
            onClick={onDelete}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Key Metrics */}
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

          {/* Alert Statistics */}
          <div className="border-t border-border/50 pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Alert Statistics
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAlertHistory(!showAlertHistory)}
              >
                {showAlertHistory ? 'Hide History' : 'Show History'}
              </Button>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Critical</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">{alertStats.critical}</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Warning</p>
                <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{alertStats.warning}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Info</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{alertStats.info}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-lg font-bold">{alertStats.total}</p>
              </div>
            </div>

            {/* Alert History Graph */}
            {showAlertHistory && alertHistoryData.length > 0 && (
              <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={alertHistoryData}>
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="critical" fill="#ef4444" name="Critical" />
                    <Bar dataKey="warning" fill="#eab308" name="Warning" />
                    <Bar dataKey="info" fill="#3b82f6" name="Info" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Recent Alerts */}
          {(client.alerts && client.alerts.length > 0) && (
            <div className="border-t border-border/50 pt-4">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Recent Alerts
              </h3>
              <div className="space-y-2">
                {client.alerts.slice(0, 3).map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-2 rounded-md text-sm ${
                      alert.type === 'critical' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' 
                        : alert.type === 'warning'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>{alert.message}</span>
                      <span className="text-xs opacity-70">
                        {new Date(alert.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
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

          {/* Performance Graph */}
          {client.yearlyData && client.yearlyData.length > 0 && (
            <div className="border-t border-border/50 pt-4">
              <h3 className="text-sm font-medium mb-2">Yearly Performance</h3>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={client.yearlyData}>
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#6366f1" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

