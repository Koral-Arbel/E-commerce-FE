import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
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
import Home from "./components/Home";
import Logout from "./components/registration/Logout";

function App() {
  const { auth } = useContext(AuthContext);
  const { userDetails } = useContext(UserProfileContext);
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

  // Add to favorites
  const handleAddItemToFavorites = async (item) => {
    let isInArray = false;
    favoriteItem.forEach((favItem) => {
      if (favItem.id === item.id) isInArray = true;
    });

    if (!isInArray) {
      const bodyParams = {
        userId: userDetails.user.id,
        itemId: item.id,
      };

      try {
        const res = await addFavoriteItem(bodyParams, auth);
        setFavoriteItem([...favoriteItem, { ...item, id: res.data }]);
      } catch (err) {
        if (!err.response) {
          setErrMsg("No Server Response");
        }
      }
    }
  };

  const handleAddItemToCart = async (item) => {
    let isInArray = false;
    cart.forEach((prd) => {
      if (prd.id === item.id) isInArray = true;
    });
    if (!isInArray) {
      const bodyParams = {
        orderId: null,
        userId: userDetails.user.id,
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
          setErrMsg("Product Out Of Stock");
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
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
