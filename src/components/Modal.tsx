"use client";

import { useState, useEffect } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const NewPlaceModal = (
    { onClose, onSubmit 

    }: { 
        onClose: () => void;
        onSubmit: (name: string, latitude: string, longitude: string) => void; 
    }) => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "ug" } },
    debounce: 300,
  });

  const handleSelect = ({ description }: any) => () => {
    setValue(description, false);
    clearSuggestions();
    setName(description);

    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      setLatitude(lat.toString());
      setLongitude(lng.toString());
    });
  };

  const handleInputChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleLatLngChange = (e: any, type: string) => {
    if (type === "latitude") {
      setLatitude(e.target.value);
    } else {
      setLongitude(e.target.value);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      getGeocode({ location: { lat: parseFloat(latitude), lng: parseFloat(longitude) } })
        .then((results) => {
          if (results[0]) {
            setName(results[0].formatted_address);
            setValue(results[0].formatted_address, false);
            clearSuggestions();
          }
        })
        .catch((error) => {
          console.error("Error fetching place name:", error);
        });
    }
  }, [clearSuggestions, latitude, longitude, setValue]);

  const handleSubmit = () => {
    onSubmit(name, latitude, longitude);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-4 md:mx-0">
        <h2 className="text-xl font-bold mb-6 text-red-300">Add New Place</h2>
        <div className="mb-4">
          <label className="block text-red-300 mb-1">Place</label>
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder="Enter place name"
            className="w-full p-3 border border-gray-300 rounded text-red-300"
            disabled={!ready || (!!latitude && !!longitude)}
          />
          {status === "OK" && (
            <ul className="border border-gray-300 rounded mt-2 max-h-40 overflow-y-auto text-red-300">
              {data.map((suggestion) => {
                const {
                  structured_formatting: { main_text, secondary_text },
                } = suggestion;

                return (
                  <li
                    key={suggestion.place_id}
                    onClick={handleSelect(suggestion)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-red-300 mb-1">Latitude</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => handleLatLngChange(e, "latitude")}
            placeholder="Enter place latitude"
            className="w-full p-3 border border-gray-300 rounded text-red-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-red-300 mb-1">Longitude</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => handleLatLngChange(e, "longitude")}
            placeholder="Enter place longitude"
            className="w-full p-3 border border-gray-300 rounded text-red-300"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Add
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPlaceModal;
