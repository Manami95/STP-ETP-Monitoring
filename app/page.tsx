'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, Building2, Factory, TrendingUp, Users, PowerOff, Clock, Power } from "lucide-react"
import { ResponsiveContainer } from 'recharts';
import Chart from '../components/Chart';
import OverviewChart from '../components/OverviewChart';
import dynamic from 'next/dynamic';

// Dynamically import the ClientMap component with no SSR
const ClientMap = dynamic(() => import('./components/ClientMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-xl bg-slate-100/50 dark:bg-slate-800/50 animate-pulse" />
  ),
});

export default function Home() {
  const plantActivityData = [
    { month: 'Jan', active: 145, inactive: 15, delay: 8, shutdown: 4 },
    { month: 'Feb', active: 152, inactive: 13, delay: 6, shutdown: 3 },
    { month: 'Mar', active: 156, inactive: 12, delay: 7, shutdown: 2 },
    { month: 'Apr', active: 158, inactive: 10, delay: 5, shutdown: 3 },
    { month: 'May', active: 155, inactive: 14, delay: 9, shutdown: 5 },
    { month: 'Jun', active: 160, inactive: 11, delay: 4, shutdown: 2 },
  ];

  const plantPerformanceData = [
    { date: '2025-01', efficiency: 92, downtime: 8, maintenance: 4 },
    { date: '2025-02', efficiency: 94, downtime: 6, maintenance: 5 },
    { date: '2025-03', efficiency: 91, downtime: 9, maintenance: 6 },
    { date: '2025-04', efficiency: 96, downtime: 4, maintenance: 3 },
    { date: '2025-05', efficiency: 93, downtime: 7, maintenance: 5 },
    { date: '2025-06', efficiency: 95, downtime: 5, maintenance: 4 },
  ];

  const currentMonth = plantActivityData[plantActivityData.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/90 dark:from-slate-950 dark:to-slate-900/90 p-8">
      <div className="max-w-full mx-auto space-y-12">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">Dashboard</h2>
        </div>

        <div className="grid grid-cols-6 gap-6 px-4">
          <Card className="bg-gradient-to-br from-blue-500/15 to-sky-500/10 hover:shadow-xl hover:scale-105 transition-all duration-300 border-blue-500/20 rounded-xl">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20 shadow-sm shadow-blue-500/10">
                  <Users className="h-2 w-2 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-blue-600/80 dark:text-blue-400/80 truncate">Clients</p>
                  <p className="text-lg font-bold text-blue-600">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-500/15 to-teal-500/10 hover:shadow-xl hover:scale-105 transition-all duration-300 border-emerald-500/20 rounded-xl">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20 shadow-sm shadow-emerald-500/10">
                  <Factory className="h-2 w-2 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-emerald-600/80 dark:text-emerald-400/80 truncate">Industries</p>
                  <p className="text-lg font-bold text-emerald-600">48</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-violet-500/15 to-indigo-500/10 hover:shadow-xl hover:scale-105 transition-all duration-300 border-violet-500/20 rounded-xl">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-500/10 ring-1 ring-violet-500/20 shadow-sm shadow-violet-500/10">
                  <Building2 className="h-2 w-2 text-violet-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-violet-600/80 dark:text-violet-400/80 truncate">Active Plants</p>
                  <p className="text-lg font-bold text-violet-600">{currentMonth.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/15 to-amber-500/10 hover:shadow-xl hover:scale-105 transition-all duration-300 border-orange-500/20 rounded-xl">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10 ring-1 ring-orange-500/20 shadow-sm shadow-orange-500/10">
                  <PowerOff className="h-2 w-2 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-orange-600/80 dark:text-orange-400/80 truncate">Inactive Plants</p>
                  <p className="text-lg font-bold text-orange-600">{currentMonth.inactive}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500/15 to-amber-500/10 hover:shadow-xl hover:scale-105 transition-all duration-300 border-yellow-500/20 rounded-xl">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10 ring-1 ring-yellow-500/20 shadow-sm shadow-yellow-500/10">
                  <Clock className="h-2 w-2 text-yellow-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-yellow-600/80 dark:text-yellow-400/80 truncate">Delayed Plants</p>
                  <p className="text-lg font-bold text-yellow-600">{currentMonth.delay}</p>
                </div>
              </div>
            </CardContent>
          </Card>
         
          <Card className="bg-gradient-to-br from-red-500/15 to-rose-500/10 hover:shadow-xl hover:scale-105 transition-all duration-300 border-red-500/20 rounded-xl">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10 ring-1 ring-red-500/20 shadow-sm shadow-red-500/10">
                  <Power className="h-2 w-2 text-red-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-red-600/80 dark:text-red-400/80 truncate">Shutdown</p>
                  <p className="text-lg font-bold text-red-600">{currentMonth.shutdown}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
          <Card className="bg-gradient-to-br from-slate-50 via-blue-50/5 to-slate-100/90 dark:from-slate-900 dark:via-blue-900/5 dark:to-slate-800/90 shadow-lg border-slate-200/50 dark:border-slate-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <div className="p-2 rounded-md bg-blue-500/10">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                Overall Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <OverviewChart data={plantPerformanceData} />
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-50 via-violet-50/5 to-slate-100/90 dark:from-slate-900 dark:via-violet-900/5 dark:to-slate-800/90 shadow-lg border-slate-200/50 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-violet-500/10">
                  <Activity className="h-5 w-5 text-violet-600" />
                </div>
                Plant Activity Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Chart data={plantActivityData} />
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

    {/* Client Map Section */}
    <div className="px-4">
          <Card className="bg-gradient-to-br from-slate-50 via-blue-50/5 to-slate-100/90 dark:from-slate-900 dark:via-blue-900/5 dark:to-slate-800/90 shadow-lg border-slate-200/50 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-blue-500/10">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                Client Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ClientMap />
            </CardContent>
          </Card> 
          </div>
          
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
          <Card className="bg-gradient-to-br from-slate-50 via-orange-50/5 to-slate-100/90 dark:from-slate-900 dark:via-orange-900/5 dark:to-slate-800/90 shadow-lg border-slate-200/50 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-orange-500/10">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                Critical Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/5 dark:bg-secondary/10"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      <div>
                        <p className="font-medium">High COD Level - Plant {i}</p>
                        <p className="text-sm text-muted-foreground">Sunshine Sugar Mills</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">2h ago</span>
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

