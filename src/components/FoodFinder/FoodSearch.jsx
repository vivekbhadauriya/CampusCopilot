import React, { useState } from "react";
import { searchFood } from "../../Services/api";

const FoodSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await searchFood(query);
    setResults(data.results || []);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Find Food Near You</h2>
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700"
          placeholder="e.g. best dosa near hostel"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      <ul>
        {results.map(place => (
          <li key={place.place_id} className="mb-3 p-3 bg-gray-800 rounded-lg text-white">
            <div className="font-semibold">{place.name}</div>
            <div className="text-sm text-blue-200">{place.formatted_address}</div>
            {place.rating && (
              <div className="text-xs text-yellow-400">Rating: {place.rating}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodSearch;