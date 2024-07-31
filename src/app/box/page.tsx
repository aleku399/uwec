"use client";

import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "pk.eyJ1IjoiYWxla3UzOTkiLCJhIjoiY2praDBkbXpzMDlxNjNrcDBqNGUwc3kzeSJ9.Jfwtzm5tQfXFiWBjIQUvUA";

const MapComponent = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/aleku399/clz70zcqi00r501pfh862a69g',
      // 0.04441431623531607, 32.4691756331856
      center: [32.4691756331856, 0.04441431623531607],
      zoom: 16,
    });

    map.on('load', () => {
      map.addSource('overlay', {
        type: 'image',
        url: '/Map1.png', // URL to your overlay image
        coordinates: [
          [32.472825, 0.055789], // Top left corner
          [32.480078, 0.055789], // Top right corner
          [32.480078, 0.049798], // Bottom right corner
          [32.472825, 0.049798]  // Bottom left corner
        ]
      });

      map.addLayer({
        id: 'overlay-layer',
        type: 'raster',
        source: 'overlay',
        paint: {}
      });
    });

    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
