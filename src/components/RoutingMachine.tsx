import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

interface CustomRoutingControlOptions extends L.Routing.RoutingControlOptions {
  createMarker?: (i: number, waypoint: L.Routing.Waypoint, n: number) => L.Marker | null;
}

const RoutingMachine = ({ waypoints, transportMode }: { waypoints: L.LatLng[], transportMode: string }) => {
  const map = useMap();
  const [control, setControl] = useState<L.Control | null>(null);

  console.log("transportMode", transportMode);

  useEffect(() => {
    if (!map || waypoints.length < 2) return;

    // Create and add the control to the map
    const newControl = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: true,
      createMarker: () => null, 
      lineOptions: {
        styles: [
          {
            color: transportMode === 'walking' ? 'blue' :
                   transportMode === 'bicycling' ? 'green' :
                   'red',
            weight: 4
          }
        ],
        extendToWaypoints: true,
        missingRouteTolerance: 10
      },
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false // Disable auto-zoom and centering
    } as CustomRoutingControlOptions).addTo(map);

    setControl(newControl);

    // Cleanup function to remove the control
    return () => {
      if (map && control) {
        map.removeControl(control);
      }
    };
  }, [map, waypoints, transportMode, control]);

  return null;
};

export default RoutingMachine;
