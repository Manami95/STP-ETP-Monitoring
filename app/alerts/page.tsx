import { AlertSystem } from "@/components/AlertSystem"

export default function AlertsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Alerts</h1>
      <AlertSystem data={[]} /> {/* We'll need to pass real data here */}
    </div>
  )
}

