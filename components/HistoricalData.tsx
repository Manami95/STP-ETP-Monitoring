"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const parameters = ["pH", "COD", "BOD", "TSS", "TDS", "DO", "Flow Rate", "Temperature"]

// Mock companies - Replace with your actual company data
const mockCompanies = [
  { id: "1", name: "Company A" },
  { id: "2", name: "Company B" },
  { id: "3", name: "Company C" },
]

function generateHistoricalData(companyId: string, parameter: string) {
  // Mock data generation with company-specific variations
  const baseValue = parseInt(companyId) * 20 // Different base values for different companies
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    value: baseValue + Math.random() * 50,
    min: baseValue - 10 + Math.random() * 10,
    max: baseValue + 40 + Math.random() * 10,
    average: baseValue + 20 + Math.random() * 10,
  }))
}

export function HistoricalData() {
  const [selectedCompany, setSelectedCompany] = useState<string>("")
  const [selectedParameter, setSelectedParameter] = useState(parameters[0])

  // Get companies data
  const companies = useMemo(() => mockCompanies, [])

  // Generate data based on selected company and parameter
  const data = useMemo(() => {
    if (!selectedCompany) return []
    return generateHistoricalData(selectedCompany, selectedParameter)
  }, [selectedCompany, selectedParameter])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Historical Data Analysis</h2>
          </div>
          <div className="flex gap-4 items-center">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-[250px]">
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

            <Select value={selectedParameter} onValueChange={setSelectedParameter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select parameter" />
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
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedCompany ? (
          <div className="space-y-6">
            {/* Parameter Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Current Value</h3>
                <p className="text-2xl font-bold mt-1">
                  {data[data.length - 1]?.value.toFixed(2)}
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Average</h3>
                <p className="text-2xl font-bold mt-1">
                  {data[data.length - 1]?.average.toFixed(2)}
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Min</h3>
                <p className="text-2xl font-bold mt-1">
                  {data[data.length - 1]?.min.toFixed(2)}
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Max</h3>
                <p className="text-2xl font-bold mt-1">
                  {data[data.length - 1]?.max.toFixed(2)}
                </p>
              </Card>
            </div>

            {/* Historical Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {selectedParameter} Trends for {companies.find(c => c.id === selectedCompany)?.name}
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2563eb" 
                      name="Current"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="average" 
                      stroke="#059669" 
                      name="Average"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="min" 
                      stroke="#dc2626" 
                      name="Minimum"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="max" 
                      stroke="#ea580c" 
                      name="Maximum"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
            Please select a company to view historical data
          </div>
        )}
      </CardContent>
    </Card>
  )
}

