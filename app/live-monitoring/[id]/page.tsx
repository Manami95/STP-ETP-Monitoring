'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertTriangle, Building2, Factory, Clock, Power, ArrowUpRight, ArrowLeft } from "lucide-react";
import { ResponsiveContainer } from 'recharts';
import Chart from '@/components/Chart';
import { Button } from "@/components/ui/button";

// Add these type definitions at the top of the file, after imports
interface PlantActivity {
  month: string;
  active: number;
  inactive: number;
  delay: number;
  shutdown: number;
}

interface Alert {
  id: number;
  plant: string;
  issue: string;
  location: string;
  time: string;
}

interface IndustryDetails {
  establishedYear: string;
  totalCapacity: string;
  certifications: string[];
  mainProducts: string[];
  operationalHours: string;
  safetyRating: string;
  lastInspection: string;
  nextMaintenance: string;
}

interface IndustryData {
  plantActivityData: PlantActivity[];
  alerts: Alert[];
  details: IndustryDetails;
}

interface Industry {
  id: string;
  name: string;
  type: string;
  location: string;
  totalPlants: number;
}

// Import the mock data from the main page
const mockIndustries: Industry[] = [
  { id: '1', name: 'Sunshine Sugar Mills', type: 'Sugar Industry', location: 'Maharashtra', totalPlants: 5 },
  { id: '2', name: 'Green Energy Solutions', type: 'Renewable Energy', location: 'Gujarat', totalPlants: 8 },
  { id: '3', name: 'Steel Dynamics Corp', type: 'Steel Manufacturing', location: 'Karnataka', totalPlants: 3 },
  { id: '4', name: 'Textile Innovations', type: 'Textile Industry', location: 'Tamil Nadu', totalPlants: 6 },
  { id: '5', name: 'Chemical Solutions Ltd', type: 'Chemical Industry', location: 'Andhra Pradesh', totalPlants: 4 },
];

const mockIndustryData: Record<string, IndustryData> = {
  '1': {
    plantActivityData: [
      { month: 'Jan', active: 4, inactive: 1, delay: 1, shutdown: 0 },
      { month: 'Feb', active: 5, inactive: 0, delay: 0, shutdown: 0 },
      { month: 'Mar', active: 4, inactive: 1, delay: 1, shutdown: 0 },
      { month: 'Apr', active: 3, inactive: 2, delay: 1, shutdown: 1 },
      { month: 'May', active: 4, inactive: 1, delay: 0, shutdown: 0 },
      { month: 'Jun', active: 5, inactive: 0, delay: 0, shutdown: 0 },
    ],
    alerts: [
      { id: 1, plant: 'Plant A', issue: 'High COD Level', location: 'Unit 1', time: '2h ago' },
      { id: 2, plant: 'Plant C', issue: 'Temperature Warning', location: 'Unit 3', time: '4h ago' },
    ],
    details: {
      establishedYear: '1995',
      totalCapacity: '50,000 MT/year',
      certifications: ['ISO 9001:2015', 'FSSC 22000', 'GMP Certified'],
      mainProducts: ['Refined Sugar', 'Raw Sugar', 'Molasses'],
      operationalHours: '24/7',
      safetyRating: 'A+',
      lastInspection: '2024-02-15',
      nextMaintenance: '2024-04-01',
    }
  },
  // ... other industry data
};

export default function IndustryDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const industryInfo = mockIndustries.find(ind => ind.id === id);
  const industryData = mockIndustryData[id];
  const currentMonth = industryData?.plantActivityData[industryData.plantActivityData.length - 1];

  if (!industryInfo || !industryData) {
    return <div>Industry not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/90 dark:from-slate-950 dark:to-slate-900/90">
      {/* Header Section */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto py-6 px-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/live-monitoring')}
              className="rounded-full"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{industryInfo.name}</h2>
              <p className="text-muted-foreground mt-1">{industryInfo.type} - {industryInfo.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-violet-500/15 to-indigo-500/10 border-violet-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-violet-500/10">
                  <Building2 className="h-8 w-8 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-violet-600">Active Plants</p>
                  <p className="text-3xl font-bold text-violet-600">{currentMonth.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/15 to-amber-500/10 border-orange-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-orange-500/10">
                  <Power className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-600">Inactive</p>
                  <p className="text-3xl font-bold text-orange-600">{currentMonth.inactive}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/15 to-amber-500/10 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-yellow-500/10">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-600">Delayed</p>
                  <p className="text-3xl font-bold text-yellow-600">{currentMonth.delay}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/15 to-rose-500/10 border-red-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-red-500/10">
                  <Power className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600">Shutdown</p>
                  <p className="text-3xl font-bold text-red-600">{currentMonth.shutdown}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* Activity Chart */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-violet-600" />
                Plant Activity Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Chart data={industryData.plantActivityData} />
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Industry Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Industry Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Capacity</p>
                    <p className="font-medium">{industryData.details.totalCapacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Safety Rating</p>
                    <p className="font-medium">{industryData.details.safetyRating}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Operating Hours</p>
                    <p className="font-medium">{industryData.details.operationalHours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Inspection</p>
                    <p className="font-medium">{industryData.details.lastInspection}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Certifications & Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Certifications</p>
                  <div className="space-y-2">
                    {industryData.details.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Main Products</p>
                  <div className="space-y-2">
                    {industryData.details.mainProducts.map((product, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Factory className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{product}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Current Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {industryData.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-orange-50/50 dark:bg-orange-950/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      <div>
                        <p className="font-medium">{alert.issue}</p>
                        <p className="text-sm text-muted-foreground">{alert.plant} - {alert.location}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{alert.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 