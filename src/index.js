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
      <AuthProvider>
        <UserProfileProvider>
          <ItemsProvider>
            <CartProvider>
              <OrdersProvider>
                <FavouritesProvider>
                  <App />
                </FavouritesProvider>
              </OrdersProvider>
            </CartProvider>
          </ItemsProvider>
        </UserProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
