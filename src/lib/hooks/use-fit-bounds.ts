import L from 'leaflet';
import React from 'react';
import { GeoJsonObject } from 'geojson';
import { useMap } from 'react-leaflet';

const useFitBounds = (feature: GeoJsonObject | null) => {
    const map = useMap();

    React.useEffect(() => {
      if (feature) {
        const bounds = L.geoJSON(feature).getBounds();
        map.fitBounds(bounds);
      }
    }, [feature, map]);
};

export default useFitBounds;
  