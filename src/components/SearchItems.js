import React, { useState } from "react";
import SearchBar from "./SearchBar"; // או את הנתיב המתאים לקומפוננטת החיפוש

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // בדיקה שה-props.items לא undefined
    if (!props.items || !Array.isArray(props.items)) {
      console.error("Items are undefined or not an array");
      return;
    }

    const results = props.items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results); // עדכון הסטייט של התוצאות
    // אם ברצונך להעביר גם את התוצאות חזרה לרכיב האב:
    props.updateResults && props.updateResults(results);
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
    </div>
  );
}

export default SearchItems;
