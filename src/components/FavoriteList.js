import React, { useState } from "react";

const FavoriteList = () => {
  // משתנה state לאחסון רשימת המוצרים המועדפים
  const [favorites, setFavorites] = useState([]);

  // פונקציה להוספת מוצר לרשימת המועדפים
  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  // פונקציה להסרת מוצר מרשימת המועדפים
  const removeFromFavorites = (itemId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== itemId)
    );
  };

  return (
    <div>
      <h2>Favorite Products</h2>
      <ul>
        {favorites.map((item) => (
          <li key={item.id}>
            {item.name}{" "}
            <button onClick={() => removeFromFavorites(item.id)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
