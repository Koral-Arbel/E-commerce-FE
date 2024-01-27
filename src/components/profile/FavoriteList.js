import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  addItemToCart,
  getFavoriteItems,
  removeFavoriteItem,
} from "../../services/api";
import AuthContext from "../context/AuthProvider";
import UserProfileContext from "../context/UserProfileContext";
import { Card, Grid, Button, Typography } from "@mui/material";

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
        if (!auth || !auth.token || !userDetails) {
          setLoading(false);
          return;
        }

        const userId = userDetails.id;
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
  }, [auth.token, userDetails]);

  const handlerAddCart = async (itemId) => {
    try {
      if (itemId) {
        await addItemToCart({ userId: userDetails, itemId }, auth.token);
        setCart((prevItems) => {
          // Check if the item is already in the cart
          if (!prevItems.includes(itemId)) {
            return [...prevItems, itemId];
          }
          return prevItems; // If item is already in cart, return the current state
        });
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setError(error.message || "An error occurred while adding item to cart");
    }
  };
  const handlerRemoveItemFavorite = async (itemId) => {
    try {
      await removeFavoriteItem(itemId, auth.token);
      setFavoriteItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item from favorites:", error);
      setError(
        error.message || "An error occurred while deleting item from favorites"
      );
    }
  };

  const isItemInCart = (itemId) => {
    return cart.includes(itemId);
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
        <Grid container spacing={2} justifyContent="center">
          {favoriteItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ minWidth: 275 }}>
                <img
                  src={item.photo}
                  alt={item.title}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body1">Price: ${item.price}</Typography>
                <Typography variant="body1">
                  Available Stock: {item.availableStock}
                </Typography>
                <Button
                  onClick={() => handlerAddCart(item.id)}
                  variant="contained"
                  color="primary"
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ marginRight: "8px" }}
                  />
                  Add to Cart
                </Button>
                <Button
                  onClick={() => handlerRemoveItemFavorite(item.id)}
                  variant="contained"
                  color="secondary"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{
                      marginRight: "8px",
                      color: isItemInCart(item.id) ? "red" : "gray",
                    }}
                  />
                  Delete
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default FavoriteList;
