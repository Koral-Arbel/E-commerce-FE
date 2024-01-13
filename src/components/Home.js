import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AuthContext from "./context/AuthProvider";
import {
  getOpenOrder,
  createNewOrder,
  addItemToCart,
  getAllItems,
  authenticate,
} from "../services/api";
import FavouritesContext from "./context/FavoriteContext";

function Home() {
  const { auth, setAuth } = useContext(AuthContext);
  const { favoriteItem } = useContext(FavouritesContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getAllItems();
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again later.");
    }
  };

  const handleAddItemToCart = async (itemId) => {
    console.log("Auth in handleAddItemToCart:", auth);

    try {
      if (auth?.token && auth?.userId) {
        const openOrderResponse = await getOpenOrder(auth.userId, auth.token);
        const orderId = openOrderResponse.data?.id || null;

        if (orderId) {
          await addItemToCart(orderId, itemId, auth.token);
          console.log("Item added to the order");
        } else {
          const newOrderResponse = await createNewOrder(
            auth.userId,
            itemId,
            auth.token
          );

          if (newOrderResponse.error) {
            console.error("Error creating new order:", newOrderResponse.error);
            return;
          }

          console.log(
            "New order created and item added:",
            newOrderResponse.data
          );
        }
      }
    } catch (error) {
      console.error("Error adding item to the order:", error);
    }
  };

  const handleAddItemToFavorites = async (itemId) => {
    try {
      if (auth?.user?.username) {
        if (Array.isArray(favoriteItem)) {
          const isInArray = favoriteItem.some(
            (favItem) => favItem.id === itemId
          );

          if (!isInArray) {
            console.log(
              `Item ${itemId} added to favorites for user ${auth.user.username}`
            );
          } else {
            console.log(
              `Item ${itemId} is already in favorites for user ${auth.user.username}`
            );
          }
        } else {
          console.error("favoriteItem is not an array.");
        }
      } else {
        console.log(
          "User is not logged in or missing required user properties."
        );
      }
    } catch (error) {
      console.error("Error adding item to favorites:", error);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <h1>Buy Now - Apple products</h1>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: "15px", margin: "10px" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.7rem",
                  textAlign: "center",
                }}
              >
                {item.title}
              </div>
              <img
                src={item.photo}
                alt={item.title}
                width="100%"
                height="auto"
              />
              <div style={{ color: "green", fontWeight: "bold" }}>
                {item.price}
              </div>
              <div>Available: {item.availableStock}</div>
              <div>Quantity: {item.quantity}</div>
              <Button onClick={() => handleAddItemToCart(item.id)}>
                Add to Cart
              </Button>
              <Button onClick={() => handleAddItemToFavorites(item.id)}>
                Add to Favorites
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;
