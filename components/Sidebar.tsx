"use client"

import { Home, AlertTriangle, TrendingUp, FileText, Settings, Activity, Users, Building2 } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Users, label: "Clients", href: "/clients" },
  { icon: Activity, label: "Live Monitoring", href: "/live-monitoring" },
  { icon: AlertTriangle, label: "Alerts", href: "/alerts" },
  { icon: TrendingUp, label: "Historical Data", href: "/historical-data" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <SidebarComponent className="border-r border-border">
      <SidebarHeader className="border-b border-border p-2">
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-16 h-16">
            <Image
              src="/fotor-2025022032529.png"
              alt="HEEPL Logo"
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <div className="text-center w-full">
            <h2 className="text-sm font-bold text-blue-600 leading-tight">
              HITESH ENVIRO ENGINEERS PVT. LTD.
            </h2>
            <p className="text-[10px] text-blue-500 mt-0.5">ETP/STP Monitoring</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "w-full justify-start transition-colors duration-200",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400",
                )}
              >
                <Link href={item.href} className="flex items-center gap-2 p-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </SidebarComponent>
  )
}

