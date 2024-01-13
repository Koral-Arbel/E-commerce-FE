import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/registration/Login";
import Register from "./components/registration/Register";
import Cart from "./components/Cart";
import FavoriteList from "./components/userRegistered/FavoriteList";
import AuthContext, { AuthProvider } from "./components/context/AuthProvider";
import Footer from "./components/footer/Footer";
import CartContext from "./components/context/CartContext";
import FavouritesContext from "./components/context/FavoriteContext";
import UserProfileContext from "./components/context/UserProfileContext";
import ItemsContext from "./components/context/ItemsContext";
import UserProfile from "./components/userRegistered/UserProfile";
import {
  addFavoriteItem,
  addItemToCart,
  getAllItems,
  getOpenOrder,
  removeFavoriteItem,
} from "./services/api";
import axios from "axios";

function App() {
  const { auth } = useContext(AuthContext);
  const { userProfile } = useContext(UserProfileContext);
  const { cart, setCart } = useContext(CartContext);
  const { favoriteItem, setFavoriteItem } = useContext(FavouritesContext);
  const { items, setItems } = useContext(ItemsContext);
  const [errMsg, setErrMsg] = useState("");

  // Remove from favorite list
  const handleRemoveItemFromFavoriteList = async (favoriteItemToRemove) => {
    const favoriteItemToRemoveId = favoriteItem.filter(
      (item) => item.id === favoriteItemToRemove.id
    );
    await removeFavoriteItem(favoriteItemToRemoveId[0].itemId, auth);
    setFavoriteItem(
      favoriteItem.filter(
        (favoriteItem) => favoriteItem.id !== favoriteItemToRemove.id
      )
    );
  };

  // useEffect(() => {
  //   // Fetch items on cart change
  //   getAllItems().then((res) => {
  //     console.log("Items fetched:", res.data);
  //     setItems(res.data);
  //   });
  // }, [cart, items]);

  // Add to favorites
  const handleAddItemToFavorites = async (item) => {
    let isInArray = false;
    favoriteItem.forEach((favItem) => {
      if (favItem.id === item.id) isInArray = true;
    });

    if (!isInArray) {
      const bodyParams = {
        userId: userProfile.user.id,
        itemId: item.id,
      };

      try {
        const res = await addFavoriteItem(bodyParams, auth);
        setFavoriteItem([...favoriteItem, { ...item, itemId: res.data }]);
      } catch (err) {
        if (!err.response) {
          setErrMsg("No Server Response");
        }
      }
    }
  };

  // Add to cart

  const createNewOrder = async () => {
    try {
      // Check if an open order exists for the user
      const orderId = await getOpenOrder();

      if (orderId) {
        return orderId;
      }

      // If no open order, create a new one
      const response = await axios.post(createNewOrder, {});
      return response.data; // Assuming the new order ID is returned in the response
    } catch (error) {
      console.error("Error creating new order:", error);
      throw error;
    }
  };

  const handleAddItemToCart = async (item) => {
    let isInArray = false;
    cart.forEach((cartItem) => {
      if (cartItem.id === item.id) isInArray = true;
    });

    if (!isInArray) {
      const bodyParams = {
        orderId: null,
        userId: userProfile.user.id,
        itemId: item.id,
        quantity: 1,
        price: item.price,
      };

      try {
        const res = await addItemToCart(bodyParams, auth);
        setCart([...cart, { ...item, id: res.data }]);
      } catch (err) {
        if (!err.response) {
          setErrMsg("No Server Response");
        } else if (err.response.status === 500) {
          setErrMsg("Item Out Of Stock");
        } else {
          setErrMsg("Authentication Failed");
        }
      }
    }
  };

  return (
    <>
      {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}

      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                createNewOrder={createNewOrder}
                handleAddItemToCart={handleAddItemToCart}
                handleAddItemToFavorites={handleAddItemToFavorites}
                handleRemoveItemFromFavoriteList={
                  handleRemoveItemFromFavoriteList
                }
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/favorite" element={<FavoriteList />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
