import { ReportGeneration } from "@/components/ReportGeneration"

export default function ReportsPage() {
  return (
    <div className="min-h-screen w-[1000px] bg-gradient-to-b from-slate-50 to-slate-100/90 dark:from-slate-950 dark:to-slate-900/90">
      <div className=" px-4">
        <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-lg backdrop-blur-sm shadow-lg mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Reports
          </h1>
          <p className="text-muted-foreground mt-1">Generate and view plant reports</p>
        </div>
        <div className="item-center w-[60%] bg-white/50 dark:bg-slate-800/50 p-6 rounded-lg backdrop-blur-sm shadow-lg">
          <ReportGeneration />
        </div>
      </div>
    </div>
  )
}

