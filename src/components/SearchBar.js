import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (!props.items) {
      console.error("Items are undefined");
      return;
    }

    const results = props.items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results); // עדכון הסטייט של התוצאות
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </button>

      {/* כאן אתה יכול לעדכן את הסטייט של התוצאות דרך props */}
      {props.updateResults && props.updateResults(searchResults)}
    </div>
  );
}

export default SearchBar;
