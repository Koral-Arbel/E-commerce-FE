import React from "react";
import { Typography, Button } from "@mui/material";
import styles from "./Cart.module.css";

function CartItem({
  item,
  orderDetails,
  handleOrderClick,
  handleUpdateQuantity,
  handleDeleteCartItem,
}) {
  return (
    <div
      key={item.id}
      className={styles.tempOrderItem}
      onClick={() => handleOrderClick(orderDetails.orderNumber)}
    >
      <img src={item.photo} alt={item.title} />
      <Typography variant="subtitle1">{item.title}</Typography>
      <Typography variant="body2">
        Price: ${item.price}, AvailableStock: {item.availableStock}
      </Typography>
      <label>
        <input
          type="number"
          value={item.quantity}
          min="1"
          max={item.availableStock}
          onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
          readOnly
        />
      </label>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => handleDeleteCartItem(item.id)}
      >
        Delete
      </Button>
    </div>
  );
}

export default CartItem;
