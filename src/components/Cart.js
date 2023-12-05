import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    setTotalPrice(totalPrice + product.price);
  };

  return (
    <div>
      <h2>My Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <p>total price: ${totalPrice}</p>
    </div>
  );
};

export default Cart;
