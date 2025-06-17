// src/components/custom/LiveTrackingMap.tsx
import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importez L pour les icônes personnalisées

// Les types de props ne changent pas, notre page parente n'aura pas besoin d'être modifiée.
export type SalespersonStatus = {
  id: string;
  nom: string;
  prenom: string;
  coordinates: [number, number]; // Format pour Leaflet est [latitude, longitude]
  enProspection: boolean;
};

type LiveTrackingMapProps = {
  salespeople: SalespersonStatus[];
  onSelectSalesperson: (salesperson: SalespersonStatus | null) => void;
  selectedSalesperson: SalespersonStatus | null;
};

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// Création d'icônes personnalisées pour les marqueurs
const iconProspecting = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const iconIdle = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


export function LiveTrackingMap({ salespeople, onSelectSalesperson, selectedSalesperson }: LiveTrackingMapProps) {
  if (!MAPBOX_TOKEN) {
    return <div>Clé Mapbox non configurée.</div>;
  }
  
  // URL pour les tuiles de Mapbox
  const mapboxTileUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`;

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border">
      <MapContainer 
        center={[48.8566, 2.3522]} // Note: [latitude, longitude]
        zoom={12} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={mapboxTileUrl}
        />
        
        {salespeople.map(sp => (
          <Marker
            key={sp.id}
            position={[sp.coordinates[1], sp.coordinates[0]]} // Note: [latitude, longitude]
            icon={sp.enProspection ? iconProspecting : iconIdle}
            eventHandlers={{
              click: () => {
                onSelectSalesperson(sp);
              },
            }}
          />
        ))}

        {selectedSalesperson && (
          <Popup position={[selectedSalesperson.coordinates[1], selectedSalesperson.coordinates[0]]}>
            <div className="text-sm font-semibold">{`${selectedSalesperson.prenom} ${selectedSalesperson.nom}`}</div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}