import { ImageIcon } from "lucide-react";
import React from "react";
 const ImageField = React.memo(({ label, name, value, onChange }) => {
  const preview =
    typeof value === "string"
      ? `${import.meta.env.VITE_API_BASE_URL}/${value.replace(/\\/g, "/")}`
      : value
        ? URL.createObjectURL(value)
        : null;

  return (
    <div className="w-full">
      <label className="flex items-center gap-2">
        <ImageIcon className="w-4 h-4 text-blue-700" />
        {label}
      </label>

      <div className="flex items-center gap-3">
        <input
          type="file"
          name={name}
          className="border border-gray-300 rounded-md h-12 file:bg-blue-500 file:p-1 file:text-white file:rounded-md file:mt-2 file:ml-2 cursor-pointer w-full"
          onChange={onChange}
        />

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-14 h-14 object-contain"
          />
        ) : (
          <span className="text-sm text-red-500">No Document uploaded</span>
        )}
      </div>
    </div>
  );
});

export default ImageField;