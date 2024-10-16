"use client";

export default function Filter({ setActiveFilter }) {
  return (
    <div className="border border-primary-800 flex">
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => setActiveFilter("all")}
      >
        All meals
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => setActiveFilter("small")}
      >
        1&mdash;20 kr
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => setActiveFilter("medium")}
      >
        21&mdash;45 kr
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => setActiveFilter("large")}
      >
        46&mdash;100 kr
      </button>
    </div>
  );
}
