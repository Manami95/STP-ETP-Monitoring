'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Plant } from '@/types';

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const DynamicMap = ({ plants }: { plants: Plant[] }) => {
  if (typeof window === 'undefined') return null;

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {plants?.map((plant) => (
          <Marker
            key={plant.id}
            position={[plant.latitude, plant.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-blue-600">{plant.name}</h3>
                <p className="text-sm text-gray-600">{plant.location}</p>
                <p className="text-xs text-gray-500">{plant.state}</p>
                <p className="text-xs text-gray-500">Status: {plant.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DynamicMap; 