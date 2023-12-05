import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // כאן יש להוסיף את הלוגיקה לביצוע חיפוש
    // בדוגמה הזו, אני מסתיר את הפריטים שאינם מכילים את מחרוזת החיפוש
    const searchResults = props.items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // הצגת התוצאות של החיפוש
    console.log("Search Results:", searchResults);

    // כאן תוכל לעדכן את הסטייט של התוצאות באמצעות props או context
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

export default SearchBar;
