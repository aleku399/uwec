"use client";

import { useLoadScript, GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { NextPage } from "next";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { FaWalking, FaClock, FaMapPin, FaCar, FaBicycle } from "react-icons/fa";

import PlacesAutocomplete from "@/components/PlacesAutoComplete";
import NewPlaceModal from "@/components/Modal";
import ProtectedRoute from "@/components/ProtectedRoute";

const Home: NextPage = () => {
  const [lat, setLat] = useState(0.308165434);
  const [lng, setLng] = useState(32.575331032);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [nearestMarker, setNearestMarker] = useState<{ lat: number, lng: number, title: string } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [searchedLocation, setSearchedLocation] = useState<boolean>(false);
  const [transportMode, setTransportMode] = useState<string>("walking");
  const [showModal, setShowModal] = useState(false);

  const libraries = useMemo(() => ["places"], []);
  const mapRef = useRef<google.maps.Map | null>(null);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  const [markers, setMarkers] = useState<any[]>([
    {
      lat: 0.315165434,
      lng: 32.575331032,
      title: "Lion Area",
      icon: "/lion.jpg",
    },
    {
      lat: 0.300165434,
      lng: 32.560331032,
      title: "Elephant Area",
      icon: "/ele.jpg",
    },
    {
      lat: 0.308165434,
      lng: 32.580331032,
      title: "Giraffe Area",
      icon: "/gir.jpg",
    },
  ]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLat(position.coords.latitude);
          setUserLng(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting user's location: ", error);
        }
      );
    }
  }, []);

  const handleGeolocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLat(position.coords.latitude);
          setUserLng(position.coords.longitude);
          if (mapRef.current) {
            mapRef.current.panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }
        },
        (error) => {
          console.error("Error getting user's location: ", error);
        }
      );
    }
  }, []);

  const handleAddressSelect = useCallback((address: string) => {
    getGeocode({ address }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      setLat(lat);
      setLng(lng);
      setSearchedLocation(true);
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng });
      }
    });
  }, []);

  const calculateDistance = useCallback((lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRadians = (deg: number) => deg * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }, []);

  useEffect(() => {
    if (userLat !== null && userLng !== null) {
      let nearest = null;
      let minDistance = Number.MAX_SAFE_INTEGER;

      markers.forEach(marker => {
        const dist = calculateDistance(userLat, userLng, marker.lat, marker.lng);
        if (dist < minDistance) {
          minDistance = dist;
          nearest = marker;
        }
      });

      if (nearest) {
        setNearestMarker(nearest);
        setDistance(minDistance);
        const speed = transportMode === "walking" ? 5 : transportMode === "bicycling" ? 15 : 50; // Average speeds: walking 5 km/h, bicycling 15 km/h, driving 50 km/h
        setTime(minDistance / speed);
      }
    }
  }, [userLat, userLng, markers, calculateDistance, transportMode]);

  const mapCenter = useMemo(() => {
    if (searchedLocation) {
      return { lat, lng };
    } else {
      return { lat: userLat || lat, lng: userLng || lng };
    }
  }, [lat, lng, userLat, userLng, searchedLocation]);

  const handleNewPlaceSubmit = (
    name: string, 
    latitude: string, 
    longitude: string
  ) => {
    const newMarker = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
      title: name || "New Place",
      icon: "/zebra.jpg", 
    };

    setMarkers([...markers, newMarker]);
  };


  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative w-full h-screen">
      <PlacesAutocomplete onAddressSelect={handleAddressSelect} handleClick={() => setShowModal(true)} />
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 bg-white p-4 rounded-full shadow-md text-red-300">
        {nearestMarker && distance && time && (
          <span className="flex items-center space-x-1">
            {transportMode === "walking" && <FaWalking className="w-4 h-4" />}
            {transportMode === "bicycling" && <FaBicycle className="w-4 h-4" />}
            {transportMode === "driving" && <FaCar className="w-4 h-4" />}
            <span className="text-sm">{`${distance.toFixed(2)} km`}</span>
            <FaClock className="w-4 h-4" />
            <span className="text-sm">{`${Math.round(time * 60)} mins`}</span>
          </span>
        )}
      </div>
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerClassName="w-full h-full"
        onLoad={(map) => {
          mapRef.current = map;
          console.log("Map Loaded");
        }}
        onClick={() => {
          const activeElement = document.activeElement as HTMLElement;
          activeElement && activeElement.blur();
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
            icon={{
              url: marker.icon,
              scaledSize: new google.maps.Size(50, 50),
            }}
            onLoad={() => console.log(`${marker.title} Marker Loaded`)}
          />
        ))}

        {userLat && userLng && (
          <Marker
            position={{ lat: userLat, lng: userLng }}
            title="Your Location"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new google.maps.Size(50, 50),
            }}
            onLoad={() => console.log("User Location Marker Loaded")}
          />
        )}

        {userLat && userLng && nearestMarker && (
          <Polyline
            path={[
              { lat: userLat, lng: userLng },
              { lat: nearestMarker.lat, lng: nearestMarker.lng },
            ]}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1.0,
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
      <div className="absolute bottom-16 left-6 ml-2 transform -translate-x-1/2 z-20 bg-white p-2  rounded-full shadow-md flex flex-col space-y-4 md:bottom-16 md:left-4">
        <FaMapPin className="w-6 h-6 text-blue-500 cursor-pointer" onClick={handleGeolocation} />
        <FaWalking className={`w-6 h-6 ${transportMode === "walking" ? "text-blue-500" : "text-gray-400 cursor-pointer"}`} onClick={() => setTransportMode("walking")} />
        <FaBicycle className={`w-6 h-6 ${transportMode === "bicycling" ? "text-blue-500" : "text-gray-400 cursor-pointer"}`} onClick={() => setTransportMode("bicycling")} />
        <FaCar className={`w-6 h-6 ${transportMode === "driving" ? "text-blue-500" : "text-gray-400 cursor-pointer"}`} onClick={() => setTransportMode("driving")} />
      </div>

      {showModal && (
        <NewPlaceModal
          onClose={() => setShowModal(false)}
          onSubmit={handleNewPlaceSubmit}
        />
      )}
    </div>
  );
};

export default Home;
