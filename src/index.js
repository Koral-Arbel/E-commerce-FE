import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProfileProvider } from "./components/context/UserProfileContext";
import { ItemsProvider } from "./components/context/ItemsContext";
import { AuthProvider } from "./components/context/AuthProvider";
import { CartProvider } from "./components/context/CartContext";
import { FavouritesProvider } from "./components/context/FavoriteContext";
import { OrdersProvider } from "./components/context/OrdersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ItemsProvider />
      <UserProfileProvider />
      <AuthProvider />
      <CartProvider />
      <FavouritesProvider />
      <OrdersProvider />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
