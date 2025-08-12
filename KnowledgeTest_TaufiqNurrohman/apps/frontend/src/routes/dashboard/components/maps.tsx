import L, { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import type { Vehicle } from "@/models/vehicle";

import "leaflet/dist/leaflet.css";

import markerIconPng from "leaflet/dist/images/marker-icon.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapsViewer({ vehicle }: { vehicle: Vehicle }) {
  return (
    <MapContainer
      center={{ lat: vehicle.latitude, lng: vehicle.longitude }}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "650px", width: "100%", padding: 0, zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={{ lat: vehicle.latitude, lng: vehicle.longitude }}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>{vehicle.name} position</Popup>
      </Marker>
    </MapContainer>
  );
}
