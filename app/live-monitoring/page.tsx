'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertTriangle, Building2, Factory, Clock, Power, ArrowUpRight, ArrowRight } from "lucide-react";
import { ResponsiveContainer } from 'recharts';
import Chart from '@/components/Chart';
import { IndustrySelector } from '@/components/IndustrySelector';
import Link from 'next/link';

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

interface IndustryData {
  plantActivityData: PlantActivity[];
  alerts: Alert[];
  details: {
    establishedYear: string;
    totalCapacity: string;
    certifications: string[];
    mainProducts: string[];
    operationalHours: string;
    safetyRating: string;
    lastInspection: string;
    nextMaintenance: string;
  };
}

type IndustryDataMap = {
  [key: string]: IndustryData;
}

// Mock industries data
const mockIndustries = [
  { id: '1', name: 'Sunshine Sugar Mills', type: 'Sugar Industry', location: 'Maharashtra', totalPlants: 5 },
  { id: '2', name: 'Green Energy Solutions', type: 'Renewable Energy', location: 'Gujarat', totalPlants: 8 },
  { id: '3', name: 'Steel Dynamics Corp', type: 'Steel Manufacturing', location: 'Karnataka', totalPlants: 3 },
  { id: '4', name: 'Textile Innovations', type: 'Textile Industry', location: 'Tamil Nadu', totalPlants: 6 },
  { id: '5', name: 'Chemical Solutions Ltd', type: 'Chemical Industry', location: 'Andhra Pradesh', totalPlants: 4 },
];

// Mock data per industry
const mockIndustryData: IndustryDataMap = {
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
  '2': {
    plantActivityData: [
      { month: 'Jan', active: 7, inactive: 1, delay: 2, shutdown: 1 },
      { month: 'Feb', active: 8, inactive: 0, delay: 1, shutdown: 0 },
      { month: 'Mar', active: 6, inactive: 2, delay: 1, shutdown: 1 },
      { month: 'Apr', active: 7, inactive: 1, delay: 0, shutdown: 0 },
      { month: 'May', active: 8, inactive: 0, delay: 1, shutdown: 0 },
      { month: 'Jun', active: 7, inactive: 1, delay: 1, shutdown: 0 },
    ],
    alerts: [
      { id: 1, plant: 'Solar Plant 2', issue: 'Low Efficiency', location: 'Array B', time: '1h ago' },
      { id: 2, plant: 'Wind Farm 1', issue: 'Maintenance Required', location: 'Turbine 3', time: '3h ago' },
    ],
    details: {
      establishedYear: '2010',
      totalCapacity: '200 MW',
      certifications: ['ISO 14001:2015', 'Green Energy Certified', 'LEED Gold'],
      mainProducts: ['Solar Power', 'Wind Energy', 'Biomass Energy'],
      operationalHours: '24/7',
      safetyRating: 'A',
      lastInspection: '2024-03-01',
      nextMaintenance: '2024-03-30',
    }
  },
};

export default function LiveMonitoring() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/90 dark:from-slate-950 dark:to-slate-900/90">
      {/* Header Section */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto py-6 px-8">
          <h2 className="text-3xl font-bold tracking-tight">Live Monitoring</h2>
          <p className="text-muted-foreground mt-1">Select an industry to view detailed information</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockIndustries.map((industry) => (
            <Link href={`/live-monitoring/${industry.id}`} key={industry.id}>
              <Card className="hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-slate-50 via-blue-50/5 to-slate-100/90 dark:from-slate-900 dark:via-blue-900/5 dark:to-slate-800/90 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <Factory className="h-6 w-6 text-blue-600" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-xl mt-4">{industry.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{industry.type}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{industry.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Plants</span>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{industry.totalPlants}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

