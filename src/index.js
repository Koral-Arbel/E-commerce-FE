import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProfileProvider } from "./components/context/UserProfileContext";
import { ItemsProvider } from "./components/context/ItemsContext";
import { AuthProvider } from "./components/context/AuthProvider";
import { CartProvider } from "./components/context/CartContext";
import { FavouritesProvider } from "./components/context/FavoriteContext";
import { OrdersProvider } from "./components/context/OrdersContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ItemsProvider>
        <UserProfileProvider>
          <AuthProvider>
            <CartProvider>
              <FavouritesProvider>
                <OrdersProvider>
                  <App />
                </OrdersProvider>
              </FavouritesProvider>
            </CartProvider>
          </AuthProvider>
        </UserProfileProvider>
      </ItemsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
