'use client';

import { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartProps {
  data: any[];
  colors?: Record<string, string>;
}

function ChartComponent({ data, colors = { 
  active: '#7c3aed', 
  inactive: '#f97316',
  delay: '#eab308',
  shutdown: '#dc2626'
} }: ChartProps) {
  if (!data?.length) {
    return <div className="w-full h-full flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
        />
        <Legend 
          wrapperStyle={{
            paddingTop: '20px'
          }}
        />
        <Bar
          dataKey="active"
          name="Active Plants"
          fill={colors.active}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="inactive"
          name="Inactive Plants"
          fill={colors.inactive}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="delay"
          name="Delayed Plants"
          fill={colors.delay}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="shutdown"
          name="Shutdown Plants"
          fill={colors.shutdown}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

ChartComponent.displayName = 'ChartComponent';

export default memo(ChartComponent);