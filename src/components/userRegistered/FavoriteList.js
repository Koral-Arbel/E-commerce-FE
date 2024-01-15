import React, { useEffect, useState } from "react";
import { getAllFavoriteItems, removeFavoriteItem } from "../../services/api";

const FavoriteList = ({ auth }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const items = await getAllFavoriteItems(auth);
        setFavoriteItems(items);
      } catch (error) {
        console.error("Error fetching favorite items: ", error);
      }
    };

    fetchFavoriteItems();
  }, [auth]);

  const handleRemoveFavoriteItem = async (itemId) => {
    try {
      await removeFavoriteItem(itemId, auth);
      setFavoriteItems((prevItems) =>
        prevItems.filter((item) => item.itemId !== itemId)
      );
    } catch (error) {
      console.error("Error removing favorite item: ", error);
    }
  };

  return (
    <div>
      <h2>Favorite Items</h2>
      <ul>
        {favoriteItems.map((item) => (
          <li key={item.itemId}>
            {item.title}
            <button onClick={() => handleRemoveFavoriteItem(item.itemId)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
