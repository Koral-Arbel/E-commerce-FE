// CartItem.js
import React, { useState } from "react";
import "./Cart.module.css";

function CartItem({ item, onUpdateQuantity }) {
  const [updatedQuantity, setUpdatedQuantity] = useState(item.quantity);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setUpdatedQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="cartItem" key={item.id}>
      <img src={item.photo} alt={item.title} className="itemImage" />
      <div className="itemDetails">
        <h3 className="itemTitle">{item.title}</h3>
        <p className="itemPrice">Price: ${item.price}</p>
        <p className="availableStock">Available Stock: {item.availableStock}</p>
        <label>
          Quantity:{" "}
          <input
            type="number"
            value={updatedQuantity}
            onChange={handleQuantityChange}
          />
        </label>
      </div>
    </div>
  );
}

export default CartItem;
