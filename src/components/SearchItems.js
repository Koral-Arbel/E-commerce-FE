import React, { useState } from "react";

function SearchItems({ items, updateResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (!items || !Array.isArray(items)) {
      console.error("Items are undefined or not an array");
      return;
    }

    const filteredResults = items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
    updateResults(filteredResults);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.map((result) => (
          <div key={result.id}>
            <h3>{result.title}</h3>
            <p>Price: ${result.price}</p>
            <img src={result.photo} alt={result.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchItems;
