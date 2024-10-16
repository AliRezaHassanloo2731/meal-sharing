"use client";

import { useState } from "react";

export default function Search({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    onSearch(query);
  };

  return (
    <div className="p-4 flex items-start justify-center text-primary-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="size-6 translate-x-7 translate-y-3 "
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
      <input
        value={search}
        placeholder="Search meals..."
        onChange={handleChange}
        // className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        className=" px-7 py-3 bg-primary-200 hover:bg-primary-700 outline-0
        focus:outline-none focus:text-primary-100 focus:text-xl"
      />
    </div>
  );
}
// so how can handle searchinput when i write a
