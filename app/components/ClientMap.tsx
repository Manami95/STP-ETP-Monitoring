import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Sample client data - replace with your actual client data
const clients = [
  { id: 1, name: "Client A", location: [19.0760, 72.8777], city: "Mumbai" },
  { id: 2, name: "Client B", location: [28.6139, 77.2090], city: "Delhi" },
  { id: 3, name: "Client C", location: [13.0827, 80.2707], city: "Chennai" },
  { id: 4, name: "Client D", location: [12.9716, 77.5946], city: "Bangalore" },
  { id: 5, name: "Client E", location: [22.5726, 88.3639], city: "Kolkata" },
];

// Custom icon for markers
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

export default function ClientMap() {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden">
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {clients.map((client) => (
          <Marker
            key={client.id}
            position={client.location as [number, number]}
            icon={customIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-blue-600">{client.name}</h3>
                <p className="text-sm text-gray-600">{client.city}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 