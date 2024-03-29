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
import ItemsContext from "../context/ItemsContext";

function Home() {
  const { auth } = useContext(AuthContext);
  const { userDetails, setUserDetails } = useContext(UserProfileContext);
  const { items, setItems } = useContext(ItemsContext);

  const [orderDate, setOrderDate] = useState(new Date().toISOString());
  const [shippingAddress, setShippingAddress] = useState("");
  const [status, setStatus] = useState("TEMP");
  const [orderNumber, setOrderNumber] = useState(null);

  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cart, setCart] = useState([]);

  const [showItems, setShowItems] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handlerShowItems();
    handlerUserProfile();
    checkOpenOrder();
  }, [auth.token]);
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

  const updateQuantity = (newQuantity) => {
    setCart(newQuantity);
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

      checkOpenOrder();
    } catch (error) {
      console.error("Error in create new order", error);
    }
  };

  const handlerAddItemToCart = async (itemId, quantity) => {
    try {
      if (!showItems) {
        await handleCreateOrder();
      }
      await addItemToCart(
        {
          userId: userDetails.id,
          itemId: itemId,
          quantity: quantity,
          shippingAddress: userDetails.shippingAddress,
        },
        auth.token
      );

      setCart((prevItems) => [
        ...prevItems,
        { itemId, quantity, shippingAddress: userDetails.shippingAddress },
      ]);
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
            handleAddItemToCart={(itemId, quantity) =>
              handlerAddItemToCart(item.id, quantity)
            }
            handleAddItemToFavorites={() => handleAddItemToFavorites(item.id)}
          />
        ))}
      </Grid>
    </>
  );
}

export default Home;
