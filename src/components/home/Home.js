import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import AuthContext from "../context/AuthProvider";
import {
  addFavoriteItem,
  addItemToCart,
  createNewOrder,
  getAllItems,
  getProfileUser,
  getOpenOrder,
} from "../../services/api";
import Item from "./Item";
import UserProfileContext from "../context/UserProfileContext";

function Home() {
  const { auth } = useContext(AuthContext);
  const { userDetails, setUserDetails } = useContext(UserProfileContext);

  const [orderDate, setOrderDate] = useState(new Date().toISOString());
  const [shippingAddress, setShippingAddress] = useState("");
  const [status, setStatus] = useState("TEMP");
  const [orderNumber, setOrderNumber] = useState(null);

  const [items, setItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cart, setCart] = useState([]);

  const [showItems, setShowItems] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handlerShowItems();
    handlerUserProfile();
    checkOpenOrder();
  }, [auth.token, userDetails, showItems]);
  const checkOpenOrder = async () => {
    try {
      const response = await getOpenOrder(userDetails.id, auth.token);

      if (response.data) {
        setOrderNumber(response.data.orderNumber);
        setShowItems(true);
      } else {
        setShowItems(false);
      }
    } catch (error) {
      console.error("Error checking open order:", error);
    }
  };

  const handlerShowItems = async () => {
    try {
      const response = await getAllItems();
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again later.");
    }
  };

  const handlerUserProfile = async () => {
    try {
      const userProfile = await getProfileUser(auth.username);
      setUserDetails(userProfile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleAddItemToFavorites = async (itemId) => {
    try {
      await addFavoriteItem({ userId: userDetails.id, itemId }, auth.token);
      setFavoriteItems((prevItems) => [...prevItems, itemId]);

      // Re-run checkOpenOrder after adding item to favorites
      checkOpenOrder();
    } catch (error) {
      console.log("Adding item to favorites:", itemId);
      setError();
    }
  };

  const handleCreateOrder = async () => {
    try {
      const userId = userDetails.id;
      const jwtToken = auth.token;
      const response = await createNewOrder(
        {
          userId,
          orderDate,
          shippingAddress,
          status,
        },
        jwtToken
      );

      const newOrderNumber = response.data.orderNumber;
      setOrderNumber(newOrderNumber);

      // Perform additional actions after creating the order

      // After creating the order, check again if there is an open order
      checkOpenOrder();
    } catch (error) {
      console.error("Error in create new order", error);
    }
  };

  const handlerAddItemToCart = async (itemId) => {
    try {
      // Check if there is an open order with status "TEMP"
      if (!showItems) {
        // If no open order, create a new order
        await handleCreateOrder();
      }

      // Add item to cart
      await addItemToCart(
        {
          userId: userDetails.id,
          itemId: itemId,
          quantity: 1,
          shippingAddress: userDetails.shippingAddress,
        },
        auth.token
      );

      // Update the cart state
      setCart((prevItems) => [...prevItems, { itemId, shippingAddress }]);
      console.log("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setError();
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
          <Item
            key={item.id}
            item={item}
            handleAddItemToCart={() => handlerAddItemToCart(item.id)}
            handleAddItemToFavorites={() => handleAddItemToFavorites(item.id)}
          />
        ))}
      </Grid>
    </>
  );
}

export default Home;
