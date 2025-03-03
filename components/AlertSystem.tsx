"use client"

import { Alert as AlertType } from "@/types/alert"
import { useState, useMemo } from "react"
import { Search,  SortDesc, AlertTriangle, Bell, Info } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface AlertWithClient extends AlertType {
  clientName: string
  clientId: string
  formattedDate?: string
}

interface AlertSystemProps {
  data: AlertWithClient[]
}

type TimeRange = "24h" | "7d" | "30d" | "1y"

export function AlertSystem({ data }: AlertSystemProps) {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedCompany, setSelectedCompany] = useState<string>("all")
  const [timeRange, setTimeRange] = useState<TimeRange>("7d")

  // Get unique companies
  const companies = useMemo(() => {
    const uniqueCompanies = new Set(data.map(alert => alert.clientName))
    return Array.from(uniqueCompanies)
  }, [data])

  // Process alerts data without date formatting
  const filteredAlerts = useMemo(() => {
    return data
      .filter(alert => 
        (typeFilter === "all" || alert.type === typeFilter) &&
        (search === "" || 
          alert.message.toLowerCase().includes(search.toLowerCase()) ||
          alert.clientName.toLowerCase().includes(search.toLowerCase())) &&
        (selectedCompany === "all" || alert.clientName === selectedCompany)
      )
      .sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime()
        const dateB = new Date(b.timestamp).getTime()
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB
      })
  }, [data, typeFilter, search, sortOrder, selectedCompany])

  // Calculate statistics for selected company
  const stats = useMemo(() => {
    const filteredData = selectedCompany === "all" ? data : data.filter(alert => alert.clientName === selectedCompany)
    return filteredData.reduce((acc, alert) => {
      acc[alert.type] = (acc[alert.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }, [data, selectedCompany])

  // Prepare historical data with stable time points
  const historicalData = useMemo(() => {
    if (selectedCompany === "all") return []

    const now = new Date()
    // Ensure stable time by setting to the start of the current hour
    now.setMinutes(0, 0, 0)
    
    const intervals = {
      "24h": 24,
      "7d": 7,
      "30d": 30,
      "1y": 12
    }

    let timePoints: { start: Date; end: Date }[] = []

    if (timeRange === "24h") {
      timePoints = Array.from({ length: intervals[timeRange] }, (_, i) => {
        const start = new Date(now)
        start.setHours(now.getHours() - (intervals[timeRange] - 1 - i))
        const end = new Date(start)
        end.setHours(end.getHours() + 1)
        return { start, end }
      })
    } else if (timeRange === "7d" || timeRange === "30d") {
      timePoints = Array.from({ length: intervals[timeRange] }, (_, i) => {
        const start = new Date(now)
        start.setDate(now.getDate() - (intervals[timeRange] - 1 - i))
        start.setHours(0, 0, 0, 0)
        const end = new Date(start)
        end.setDate(end.getDate() + 1)
        return { start, end }
      })
    } else {
      timePoints = Array.from({ length: intervals[timeRange] }, (_, i) => {
        const start = new Date(now)
        start.setMonth(now.getMonth() - (intervals[timeRange] - 1 - i))
        start.setDate(1)
        start.setHours(0, 0, 0, 0)
        const end = new Date(start)
        end.setMonth(end.getMonth() + 1)
        return { start, end }
      })
    }

    return timePoints.map(({ start, end }) => {
      const periodAlerts = data.filter(alert => {
        const alertDate = new Date(alert.timestamp)
        return alert.clientName === selectedCompany && 
               alertDate >= start && 
               alertDate < end
      })

      const timeLabel = timeRange === "24h" 
        ? `${start.getHours().toString().padStart(2, '0')}:00`
        : timeRange === "1y"
        ? new Intl.DateTimeFormat('en-US', { month: 'short' }).format(start)
        : new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(start)

      return {
        time: timeLabel,
        critical: periodAlerts.filter(a => a.type === 'critical').length,
        warning: periodAlerts.filter(a => a.type === 'warning').length,
        info: periodAlerts.filter(a => a.type === 'info').length,
        total: periodAlerts.length
      }
    })
  }, [data, selectedCompany, timeRange])

  // Format the timestamp in a stable way
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date)
  }

  return (
    <div className="w-full max-w-[2800px] mx-auto px-8 py-6 space-y-8">
      {/* Page Header */}


      {/* Company Selection and Time Range */}
      <div className="flex flex-wrap items-center gap-6 bg-card p-6 rounded-lg border">
        <div className="w-[350px]">
          <label className="text-sm font-medium mb-2 block">Company</label>
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies.map(company => (
                <SelectItem key={company} value={company}>{company}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-[250px]">
          <label className="text-sm font-medium mb-2 block">Time Range</label>
          <Select 
            value={timeRange} 
            onValueChange={(value: TimeRange) => setTimeRange(value)}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-full dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="text-sm font-medium">Critical Alerts</h3>
          </div>
          <p className="text-3xl font-bold text-red-600">{stats.critical || 0}</p>
        </Card>
        <Card className="p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-full dark:bg-yellow-900/20">
              <Bell className="h-5 w-5 text-yellow-600" />
            </div>
            <h3 className="text-sm font-medium">Warning Alerts</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{stats.warning || 0}</p>
        </Card>
        <Card className="p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/20">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-sm font-medium">Info Alerts</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats.info || 0}</p>
        </Card>
        <Card className="p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-full dark:bg-gray-800">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            <h3 className="text-sm font-medium">Total Alerts</h3>
          </div>
          <p className="text-3xl font-bold">{filteredAlerts.length}</p>
        </Card>
      </div>

      {/* Historical Alert Chart */}
      <Card className="p-8 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">
          {selectedCompany !== "all"
            ? `Alert Distribution for ${selectedCompany}`
            : "Select a company to view alert distribution"}
        </h3>
        {selectedCompany !== "all" ? (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalData} margin={{ left: 20, right: 20, bottom: 20, top: 20 }}>
                <XAxis 
                  dataKey="time"
                  label={{ 
                    value: timeRange === "24h" ? "Hour" : timeRange === "1y" ? "Month" : "Date",
                    position: "bottom",
                    offset: 10
                  }}
                />
                <YAxis 
                  allowDecimals={false}
                  label={{ 
                    value: "Number of Alerts",
                    angle: -90,
                    position: "insideLeft",
                    offset: -10
                  }}
                />
                <Tooltip 
                  formatter={(value: number) => [Math.floor(value), "alerts"]}
                  labelFormatter={(label) => timeRange === "24h" ? `Time: ${label}` : `Date: ${label}`}
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar 
                  dataKey="critical" 
                  stackId="a" 
                  fill="#ef4444" 
                  name="Critical"
                  isAnimationActive={false}
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="warning" 
                  stackId="a" 
                  fill="#eab308" 
                  name="Warning"
                  isAnimationActive={false}
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="info" 
                  stackId="a" 
                  fill="#3b82f6" 
                  name="Info"
                  isAnimationActive={false}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            Select a company to view alert distribution
          </div>
        )}
      </Card>

      {/* Filters */}
      <div className="bg-card p-6 rounded-lg border space-y-4">
        <h3 className="text-lg font-semibold mb-4">Alert Filters</h3>
        <div className="flex flex-wrap items-start gap-6">
          <div className="flex-1 min-w-[300px]">
            <label className="text-sm font-medium mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
          </div>
          <div className="w-[250px]">
            <label className="text-sm font-medium mb-2 block">Alert Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[200px]">
            <label className="text-sm font-medium mb-2 block">Sort Order</label>
            <Button
              variant="outline"
              onClick={() => setSortOrder(order => order === "desc" ? "asc" : "desc")}
              className="w-full h-10 flex items-center justify-center gap-2"
            >
              <SortDesc className="h-4 w-4" />
              {sortOrder === "desc" ? "Newest First" : "Oldest First"}
            </Button>
          </div>
        </div>
      </div>

      {/* Alert List */}
    <div className="space-y-4">
        <h3 className="text-lg font-semibold">Alert List</h3>
        {filteredAlerts.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <Bell className="h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">No alerts found matching your criteria</p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`p-5 transition-colors hover:shadow-md ${
                  alert.type === 'critical' 
                    ? 'bg-red-50/50 dark:bg-red-900/10' 
                    : alert.type === 'warning'
                    ? 'bg-yellow-50/50 dark:bg-yellow-900/10'
                    : 'bg-blue-50/50 dark:bg-blue-900/10'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className={`inline-flex items-center justify-center w-2.5 h-2.5 rounded-full ${
                        alert.type === 'critical' 
                          ? 'bg-red-500' 
                          : alert.type === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`} />
                      <h3 className="font-semibold truncate text-base">{alert.clientName}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        alert.type === 'critical' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' 
                        : alert.type === 'warning'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                      }`}>
                        {alert.type}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed break-words">{alert.message}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatTimestamp(alert.timestamp)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

