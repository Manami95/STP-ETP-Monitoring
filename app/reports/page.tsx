"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon, Download, FileText, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Mock companies type
interface Company {
  id: string;
  name: string;
}

const reportTypes = [
  { id: "daily", name: "Daily Report" },
  { id: "weekly", name: "Weekly Report" },
  { id: "monthly", name: "Monthly Report" },
  { id: "custom", name: "Custom Range Report" },
]

const parameters = ["All Parameters", "pH", "COD", "BOD", "TSS", "TDS", "DO", "Flow Rate", "Temperature"]

export default function ReportsPage() {
  const router = useRouter()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<string>("")
  const [reportType, setReportType] = useState<string>("")
  const [selectedParameters, setSelectedParameters] = useState<string>("All Parameters")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReports, setGeneratedReports] = useState<Array<{
    id: string;
    name: string;
    date: string;
    type: string;
    status: string;
  }>>([])

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/auth/check-admin')
        const { isAdmin } = await response.json()
        setIsAdmin(isAdmin)
        if (!isAdmin) router.push('/login')
      } catch (error) {
        console.error("Error checking admin status:", error)
        router.push('/login')
      }
    }

    checkAdminStatus()
  }, [router])

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/companies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch companies')
        }

        const data = await response.json()
        setCompanies(data)
      } catch (err) {
        console.error('Error fetching companies:', err)
        setError('Failed to load companies')
        setCompanies([])
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  const handleGenerateReport = async () => {
    if (!selectedCompany || !reportType) return

    setIsGenerating(true)

    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        body: JSON.stringify({
          companyId: selectedCompany,
          reportType,
          parameters: selectedParameters,
          startDate,
          endDate,
        }),
      })
      const data = await response.json()
      setGeneratedReports(prev => [data, ...prev])
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async (reportId: string) => {
    try {
      const response = await fetch(`/api/reports/download/${reportId}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `report-${reportId}.pdf`
      a.click()
    } catch (error) {
      // Handle error
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-semibold mb-2">Report Generation</h1>
        <p className="text-muted-foreground">Generate and download detailed reports</p>
      </div>

      {/* Report Configuration */}
      <Card className="p-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Report Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Company Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Company</label>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Loading companies...</span>
                </div>
              ) : error ? (
                <div className="text-sm text-red-500">{error}</div>
              ) : (
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Report Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Parameters */}
            <div>
              <label className="text-sm font-medium mb-2 block">Parameters</label>
              <Select value={selectedParameters} onValueChange={setSelectedParameters}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parameters" />
                </SelectTrigger>
                <SelectContent>
                  {parameters.map((param) => (
                    <SelectItem key={param} value={param}>
                      {param}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            {reportType === "custom" && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerateReport} 
            disabled={!selectedCompany || !reportType || isGenerating}
            className="w-full md:w-auto"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Generated Reports */}
      <Card className="p-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Generated Reports</h2>
          
          {generatedReports.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No reports generated yet
            </div>
          ) : (
            <div className="divide-y">
              {generatedReports.map((report) => (
                <div 
                  key={report.id} 
                  className="py-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{report.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Generated on {report.date}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(report.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

