import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Axios from "axios";
import AuthContext from "./context/AuthProvider";
import { getOpenOrder, createNewOrder, addItemToCart } from "../services/api";

function Home() {
  const authContext = useContext(AuthContext);
  const { auth } = authContext;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await Axios.get("http://localhost:8080/item/all");
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again later.");
    }
  };

  const handleAddItemToCart = async (itemId) => {
    try {
      // Check if the user is logged in and has a valid auth object
      if (auth && auth.token && auth.userId) {
        // Check if the user has an open order
        const openOrderResponse = await getOpenOrder(auth.userId, auth.token);
        const orderId = openOrderResponse.data.id;

        // If user has an open order, add the item to the order
        if (orderId) {
          await addItemToCart(orderId, itemId, auth.token);
          console.log("Item added to the order");
        } else {
          // If user doesn't have an open order, create a new order and add the item
          const newOrderResponse = await createNewOrder(
            auth.userId,
            itemId,
            auth.token
          );
          console.log(
            "New order created and item added:",
            newOrderResponse.data
          );
        }
      } else {
        console.log(
          "User is not logged in or missing required auth properties."
        );
        // Redirect to login page or handle as per your app's logic
      }
    } catch (error) {
      console.error("Error adding item to the order:", error);
    }
  };

  const handleAddItemToFavorites = async (itemId) => {
    try {
      // Add item to favorites using your API
      // (Assuming you have a corresponding API endpoint for this)
      console.log(
        `Item ${itemId} added to favorites for user ${auth.user.username}`
      );
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
