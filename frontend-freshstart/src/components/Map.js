import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Blue marker
const blueIcon = L.icon({
    iconUrl: "/blue_pin.png",
    iconSize: [18, 30],
});

// Red marker
const redIcon = L.icon({
    iconUrl: "/red_pin.png", // Replace with your image URL
    iconSize: [18, 30],
});

const MapWithPins = ({ blueCoords, redCoords }) => {
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        if (blueCoords.length || redCoords.length) {
          // Combine all blue and red coordinates
          const allCoords = [...blueCoords, ...redCoords];
    
          // Calculate the center of all coordinates (average latitude and longitude)
          const latSum = allCoords.reduce((sum, loc) => sum + loc.coord[0], 0);
          const lngSum = allCoords.reduce((sum, loc) => sum + loc.coord[1], 0);
    
          const centerLat = latSum / allCoords.length;
          const centerLng = lngSum / allCoords.length;
    
          // Set the calculated center as the map's center
          setCurrentPosition([centerLat, centerLng]);
        }
      }, [blueCoords, redCoords]);

    return (
        <div>
            {currentPosition ? (
            <MapContainer
                center={currentPosition}
                zoom={4}
                style={{ width: "100%", height: "60vh" }}
            >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=5ikt1N4O70If8TMIc2F4"
                />

                {/* Render blue markers */}
                {blueCoords.map((loc, index) => (
                <Marker key={`blue-${index}`} position={loc.coord} icon={blueIcon}>
                    <Popup>
                        <strong>{loc.name}</strong><br />
                        {loc.address}
                    </Popup>
                </Marker>
                ))}

                {/* Render red markers */}
                {redCoords.map((loc, index) => (
                <Marker key={`red-${index}`} position={loc.coord} icon={redIcon}>
                    <Popup>
                        <strong>{loc.name}</strong><br />
                        {loc.address}
                    </Popup>
                </Marker>
                ))}
            </MapContainer>
            ) : (
            <p>Loading Map...</p>
            )}
        </div>
    );
};

export default MapWithPins;
