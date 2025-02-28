export type Industry = {
  id: string
  name: string
  type: string
  location: string
  totalPlants: number
  activePlants: number
  client: string
}

export interface Plant {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive';
  clientName: string;
  state: string;
  parameters?: {
    pH: number;
    COD: number;
    BOD: number;
    TSS: number;
    TDS: number;
    DO: number;
    flowRate: number;
    temperature: number;
    colorConcentration: number;
  };
  cameraUrl?: string;
  lastUpdated?: string;
}

