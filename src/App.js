import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import Login from "./components/registration/Login";
import Register from "./components/registration/Register";
import Cart from "./components/profile/Cart";
import FavoriteList from "./components/profile/FavoriteList";
import AuthContext, { AuthProvider } from "./components/context/AuthProvider";
import Footer from "./components/footer/Footer";
import CartContext from "./components/context/CartContext";
import FavouritesContext from "./components/context/FavoriteContext";
import UserProfileContext from "./components/context/UserProfileContext";
import ItemsContext from "./components/context/ItemsContext";
import UserProfile from "./components/profile/UserProfile";
import {
  addFavoriteItem,
  addItemToCart,
  getAllItems,
  getOpenOrder,
  removeFavoriteItem,
} from "./services/api";
import axios from "axios";
import Home from "./components/home/Home";
import Logout from "./components/registration/Logout";
import Header from "./components/header/Header";

function App() {
  const [errMsg] = useState("");

  return (
    <>
      {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}

      <AuthProvider>
        <Navbar />
        <Header />
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
