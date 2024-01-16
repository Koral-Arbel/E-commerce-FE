// FavoriteList.js
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { addFavoriteItem, getFavoriteItems } from "../../services/api";

function FavoriteList() {
  const { auth } = useContext(AuthContext);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        if (!auth || !auth.token) {
          setLoading(false);
          return;
        }

        console.log("auth object:", auth);
        const fetchedItems = await getFavoriteItems(auth.token);
        setFavoriteItems(fetchedItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite items:", error);
        setError(
          error.message || "An error occurred while fetching favorite items"
        );
        setLoading(false);
      }
    };

    fetchFavoriteItems();
  }, [auth.token]);

  const handleAddFavorite = async (itemId) => {
    try {
      await addFavoriteItem({ userId: auth.userId, itemId }, auth.token);
      setFavoriteItems((prevItems) => [...prevItems, { itemId }]);
    } catch (error) {
      console.error("Error adding item to favorites:", error);
      setError(
        error.message || "An error occurred while adding item to favorites"
      );
    }
  };

  return (
    <div>
      <h2>Favorite Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {favoriteItems.map((item) => (
            <li key={item.id}>
              {item.itemId} {item.title} {item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteList;
