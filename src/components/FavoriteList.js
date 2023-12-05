import React, { useState } from "react";

const FavoriteList = () => {
  // משתנה state לאחסון רשימת המוצרים המועדפים
  const [favorites, setFavorites] = useState([]);

  // פונקציה להוספת מוצר לרשימת המועדפים
  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]);
  };

  // פונקציה להסרת מוצר מרשימת המועדפים
  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((product) => product.id !== productId)
    );
  };

  return (
    <div>
      <h2>Favorite Products</h2>
      <ul>
        {favorites.map((product) => (
          <li key={product.id}>
            {product.name}{" "}
            <button onClick={() => removeFromFavorites(product.id)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>

      {/* דוגמה לשימוש בקומפוננטה Favorite */}
      <FavoriteItem product={someProduct} onAddToFavorites={addToFavorites} />
    </div>
  );
};

export default FavoriteList;
