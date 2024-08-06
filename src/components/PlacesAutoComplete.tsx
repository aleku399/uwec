"use client";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useCallback } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const PlacesAutocomplete = ({
  onAddressSelect,
  // handleClick,
}: {
  onAddressSelect?: (address: string) => void;
  handleClick?: () => void; 
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "ug" } },
    debounce: 300,
    cache: 86400,
  });

  const renderSuggestions = useCallback(() => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
          className="p-2 cursor-pointer hover:bg-gray-200"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  }, [data, setValue, clearSuggestions, onAddressSelect]);

  return (
    <div className="py-2">
      <div className="flex space-x-2">
        <input
          value={value}
          disabled={!ready}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter location"
          className="suggest-input w-full p-2 border border-gray-300 rounded text-gray-700"
        />
        {/* <button
          className="flex items-center space-x-1 px-4 py-2 bg-red-300 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          onClick={handleClick}
        >
          <FaMapMarkerAlt className="w-4 h-4" />
          <span>New</span>
        </button> */}
      </div>
      {status === "OK" && (
        <ul className="suggestion ">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
