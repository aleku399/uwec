"use client";

import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "pk.eyJ1IjoiYWxla3UzOTkiLCJhIjoiY2praDBkbXpzMDlxNjNrcDBqNGUwc3kzeSJ9.Jfwtzm5tQfXFiWBjIQUvUA";

const MapComponent = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(32.4691756331856);
    const [lat, setLat] = useState(0.04441431623531607);
    const [zoom, setZoom] = useState(16);

    useEffect(() => {
        if (map.current || !mapContainer.current) return; 
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/aleku399/clz70zcqi00r501pfh862a69g/draft',
            center: [lng, lat],
            zoom: zoom
        });

        // Optional: Add map event listeners or other map initialization logic here

    }, [lat, lng, zoom]); // Dependency array to re-run useEffect if lng, lat, or zoom change

    return <div ref={mapContainer} id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
