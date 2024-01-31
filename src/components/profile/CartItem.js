import React from "react";
import "./Cart.module.css";

function CartItem({ item }) {
  return (
    <div className="cartItem" key={item.id}>
      <img src={item.photo} alt={item.title} className="itemImage" />
      <div className="itemDetails">
        <h3 className="itemTitle">{item.title}</h3>
        <p className="itemPrice">Price: ${item.price}</p>
        <p className="availableStock">Available Stock: {item.availableStock}</p>
        <p className="itemQuantity">Quantity: {item.quantity}</p>
      </div>
    </div>
  );
}

export default CartItem;
