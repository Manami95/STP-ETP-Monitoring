import { PlantMonitoring } from "@/components/PlantMonitoring"

const mockPlant = {
  id: "1",
  name: "Sunshine Sugar Mills - Plant 1",
  industryId: "1",
  status: "active" as const,
  parameters: {
    pH: 7.2,
    COD: 180,
    BOD: 25,
    TSS: 95,
    TDS: 1800,
    DO: 6.5,
    flowRate: 850,
    temperature: 35,
    colorConcentration: 75,
  },
  cameraUrl:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-21%2012.25.13%20-%20A%20detailed%20UI%20design%20for%20a%20real-time%20Effluent%20Treatment%20Plant%20(ETP)%20monitoring%20dashboard%20compliant%20with%20CPCB%20regulations.%20The%20UI%20should%20include%20the%20fo-Z44Xer2sG9UzpjRWjM5qwXTqMEuHRG.webp",
  lastUpdated: new Date().toLocaleString(),
}

export default function PlantPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <PlantMonitoring plant={mockPlant} />
    </div>
  )
}

