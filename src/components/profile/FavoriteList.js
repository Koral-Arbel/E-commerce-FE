import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import {
  addItemToCart,
  getFavoriteItems,
  removeFavoriteItem,
} from "../../services/api";
import UserProfileContext from "../context/UserProfileContext";
import "./FavoriteList.module.css";
import { Button } from "@mui/material";

function FavoriteList() {
  const { auth } = useContext(AuthContext);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userDetails } = useContext(UserProfileContext);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        if (!auth || !auth.token || !userDetails.id) {
          setLoading(false);
          return;
        }

        const userId = userDetails.id;
        console.log("auth object:", auth.token);
        console.log("userId:", userId);
        const response = await getFavoriteItems(userId, auth.token);
        const fetchedItems = response.data;
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
  }, [auth.token, userDetails.id]);

  const handlerAddCart = async (itemId) => {
    try {
      await addItemToCart({ userId: userDetails.id, itemId }, auth.token); // <-- שינוי כאן
      setCart((prevItems) => [...prevItems, { itemId }]);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setError(error.message || "An error occurred while adding item to cart");
    }
  };

  const handlerRemoveItemFavorite = async (itemId) => {
    try {
      await removeFavoriteItem({ userId: userDetails.id, itemId }, auth.token);
      setFavoriteItems((prevItems) => [...prevItems, { itemId }]);
    } catch (error) {
      console.error("Error adding item to favorites:", error);
      setError(
        error.message || "An error occurred while adding item to favorites"
      );
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <h2>Favorite Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : favoriteItems.length === 0 ? (
        <p>There are no favorite items</p>
      ) : (
        <div className="favorite-items-container">
          {favoriteItems.map((item) => (
            <div key={item.id} className="favorite-item-card">
              <img src={item.photo} alt={item.title} />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Available Stock: {item.availableStock}</p>
                <Button
                  onClick={() => handlerAddCart(item.id)}
                  variant="contained"
                  color="primary"
                >
                  Add to Favorites
                </Button>
                <Button
                  onClick={() => handlerRemoveItemFavorite(item.id)}
                  variant="contained"
                  color="secondary"
                >
                  Delete Item
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoriteList;
