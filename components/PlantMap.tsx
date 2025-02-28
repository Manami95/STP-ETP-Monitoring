'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Plant } from '@/types';

const DynamicMap = dynamic(() => import('./DynamicMap').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-xl bg-slate-100/50 dark:bg-slate-800/50 animate-pulse" />
  ),
});

export function PlantMap({ plants }: { plants: Plant[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-slate-900">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Plant Locations</h2>
      <DynamicMap plants={plants} />
    </div>
  );
}