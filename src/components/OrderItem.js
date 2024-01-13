// OrderItem.js
import React from "react";

function OrderItem() {
  return (
    <li>
      <h3>Order #123</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <p>Total: $200</p>
      <p>Status: Shipped</p>
    </li>
  );
}

export default OrderItem;
