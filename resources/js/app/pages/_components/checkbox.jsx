import React from "react";

export default function Checkbox({ label, name, error, ...props }) {
  return (
    <div className="flex flex-col items-start space-y-1">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name={name}
          id={name}
          className="accent-blue-600 w-4 h-4"
          {...props}
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
