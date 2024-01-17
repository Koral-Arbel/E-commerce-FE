// ב-CartContext.js
import React, { createContext, useState } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // לדוג, פונקציה להוספת פריט ל-Cart
  const addItemToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
