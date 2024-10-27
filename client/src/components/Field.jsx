import React from "react";

function Field({ label, type, handleChange, formData }) {
  return (
    <div className="block relative mb-6">
      <label
        htmlFor={label}
        className="block text-white text-sm font-medium mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        value={formData[label]}
        name={label}
        className="rounded-lg border border-gray-300 text-sm w-full font-normal leading-5 text-gray-900 tracking-wide appearance-none block h-12 px-4 py-2   outline-none transition duration-200 ease-in-out"
        required
        placeholder={`enter your ${label}`}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default Field;
