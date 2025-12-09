import React from "react";

const TemplateSelector = ({ value, onChange }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange("classic")}
        className={`px-3 py-1 rounded ${
          value === "classic"
            ? "bg-indigo-600 text-white"
            : "border border-gray-300"
        }`}
      >
        Classic
      </button>

      <button
        onClick={() => onChange("harvard")}
        className={`px-3 py-1 rounded ${
          value === "harvard"
            ? "bg-indigo-600 text-white"
            : "border border-gray-300"
        }`}
      >
        Harvard Style
      </button>
    </div>
  );
};

export default TemplateSelector;
