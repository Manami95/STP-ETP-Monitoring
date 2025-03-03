"use client"

import { Home, AlertTriangle, TrendingUp, FileText, Settings, Activity, Users, Building2, AlertCircle, BarChart3, LayoutDashboard, MessageSquare, Bell } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Users, label: "Clients", href: "/clients" },
  { icon: Activity, label: "Live Monitoring", href: "/live-monitoring" },
  { icon: AlertTriangle, label: "Alerts", href: "/alerts" },
  { icon: TrendingUp, label: "Historical Data", href: "/historical-data" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { 
    icon: MessageSquare, 
    label: "Support Tickets", 
    href: "/tickets",
    iconExtra: Bell,
  },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: Building2,
  },
  {
    title: "Alerts",
    href: "/alerts",
    icon: AlertCircle,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Support Tickets",
    href: "/tickets",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
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
                  <div className="relative">
                    <item.icon className="h-5 w-5" />
                    {item.iconExtra && (
                      <item.iconExtra className="h-3 w-3 absolute -top-1 -right-1 text-blue-500" />
                    )}
                  </div>
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

