import React from "react";

const LocationSearchPanel = ({ suggestions = [], onSelect }) => {
  // 🔐 Always guarantee array
  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

  if (safeSuggestions.length === 0) {
    return (
      <div className="p-3 text-gray-500 text-sm">
        No locations found
      </div>
    );
  }

  return (
    <div className="p-3 space-y-2">
      {safeSuggestions.map((item, index) => (
        <div
          key={item.place_id || index}
          onClick={() => onSelect && onSelect(item)}
          className="p-2 rounded cursor-pointer hover:bg-gray-100 border"
        >
          <p className="font-medium">
            {item.structured_formatting?.main_text || item.description}
          </p>
          <p className="text-xs text-gray-500">
            {item.structured_formatting?.secondary_text || ""}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;