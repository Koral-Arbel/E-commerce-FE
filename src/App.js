import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import Login from "./components/registration/Login";
import Register from "./components/registration/Register";
import Cart from "./components/profile/Cart";
import FavoriteList from "./components/profile/FavoriteList";
import { AuthProvider } from "./components/context/AuthProvider";
import Footer from "./components/footer/Footer";

import UserProfile from "./components/profile/UserProfile";

import Home from "./components/home/Home";
import Logout from "./components/registration/Logout";
import Header from "./components/header/Header";
import { ItemsProvider } from "./components/context/ItemsContext";

function App() {
  const [errMsg] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleUpdateResults = (results) => {
    setSearchResults(results);
  };

  return (
    <>
      {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}

      <AuthProvider>
        <Navbar updateResults={handleUpdateResults} />
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
