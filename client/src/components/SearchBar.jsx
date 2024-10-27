import React from "react";

function SearchBar({ onChange, value, placeholder }) {
  return (
    <form className="form relative w-full ">
      <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
        <svg
          width="17"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="search"
          className="w-5 h-5 text-gray-700"
        >
          <path
            d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
            stroke="currentColor"
            strokeWidth="1.333"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <input
        className="input rounded-full w-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 bg-gray-100 placeholder-gray-400 transition-all duration-300 "
        placeholder={placeholder}
        required
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>
  );
}

export default SearchBar;
