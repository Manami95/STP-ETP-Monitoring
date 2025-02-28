'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Factory } from "lucide-react";

interface Industry {
  id: string;
  name: string;
  type: string;
  location: string;
  totalPlants: number;
}

interface IndustrySelectorProps {
  industries: Industry[];
  selectedIndustry: string | null;
  onSelectIndustry: (id: string) => void;
}

export function IndustrySelector({ industries, selectedIndustry, onSelectIndustry }: IndustrySelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Industries</h3>
      <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-4">
        {industries.map((industry) => (
          <Card 
            key={industry.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedIndustry === industry.id 
                ? 'bg-gradient-to-br from-blue-500/15 to-sky-500/10 border-blue-500/20' 
                : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/50'
            }`}
            onClick={() => onSelectIndustry(industry.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Factory className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{industry.name}</h4>
                  <p className="text-sm text-muted-foreground">{industry.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{industry.totalPlants} Plants</p>
                  <p className="text-xs text-muted-foreground">{industry.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 