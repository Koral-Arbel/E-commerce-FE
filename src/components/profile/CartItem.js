import React from "react";

function CartItem({ item }) {
  return (
    <div key={item.id}>
      <img src={item.photo} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>Price: ${item.price}</p>
        <p>Available Stock: {item.availableStock}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    </div>
  );
}

export default CartItem;
