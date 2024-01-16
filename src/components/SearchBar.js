import React, { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const searchResults = await searchTerm();
      console.log("Search results:", searchResults);
      // כאן תעשה משהו עם תוצאות החיפוש
    } catch (error) {
      // כאן תטפל בשגיאה
      console.error("Error handling search:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
