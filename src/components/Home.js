import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import AuthContext from "./context/AuthProvider";
import {
  addFavoriteItem,
  addItemToCart,
  createNewOrder,
  getAllItems,
  getProfileUser,
  getOpenOrder,
} from "../services/api";
import Item from "./Item";
import UserProfileContext from "./context/UserProfileContext";

function Home() {
  const { auth } = useContext(AuthContext);
  const { userDetails, setUserDetails } = useContext(UserProfileContext);

  const [orderDate, setOrderDate] = useState(new Date().toISOString());
  const [shippingAddress, setShippingAddress] = useState("");
  const [status, setStatus] = useState("TEMP");
  const [orderNumber, setOrderNumber] = useState(null);

  const [items, setItems] = useState([]);
  const [setFavoriteItems] = useState([]);
  const [setCart] = useState([]);

  const [showItems, setShowItems] = useState(false); // האם להציג את הפריטים או לא
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handlerShowItems();
    handlerUserProfile();
    checkOpenOrder(); // בדוק אם יש הזמנה פתוחה בטעינת הדף
  }, []);

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
      setFavoriteItems((prevItems) => [...prevItems, { itemId }]);
    } catch (error) {
      console.log(" adding item to favorites:", itemId);
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

      // כאן ניתן להוסיף פעולות נוספות לאחר יצירת ההזמנה

      // לאחר יצירת ההזמנה, בדוק מחדש אם יש הזמנה פתוחה
      checkOpenOrder();
    } catch (error) {
      console.error("Error in create new order", error);
    }
  };

  const handlerAddItemToCart = async (itemId) => {
    try {
      await addItemToCart({ userId: userDetails.id, itemId }, auth.token);
      setCart((prevItems) => [...prevItems, { itemId }]);
    } catch (error) {
      console.error("Error adding item to cart:", itemId);
      setError();
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <h1>Buy Now - Apple products</h1>
      </div>
      {showItems ? (
        <>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Grid container spacing={2}>
            {items.map((item) => (
              <Item
                key={item.id}
                item={item}
                handleAddItemToCart={() => handlerAddItemToCart(item.id)}
                handleAddItemToFavorites={handleAddItemToFavorites}
              />
            ))}
          </Grid>
        </>
      ) : (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button onClick={handleCreateOrder}>
            Click here to start shopping
          </button>
        </div>
      )}
    </>
  );
}

export default Home;
