import { HistoricalData } from "@/components/HistoricalData"

export default function HistoricalDataPage() {
  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/90 dark:from-slate-950 dark:to-slate-900/90">
      <div className="container mx-auto p-8 space-y-8">
        <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-lg backdrop-blur-sm shadow-lg">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Historical Data
          </h1>
          <p className="text-muted-foreground mt-1">View and analyze historical plant data</p>
        </div>
        <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-lg backdrop-blur-sm shadow-lg">
          <HistoricalData />
        </div>
      </div>
    </div>
  )
}

