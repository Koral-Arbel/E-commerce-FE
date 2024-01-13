// CartItem.js
import React from "react";
import {
  Button,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";

function CartItem({ item, onRemoveItem }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={item.title} src={item.image} />
      </ListItemAvatar>
      <ListItemText
        primary={item.title}
        secondary={
          <>
            <Typography component="span" variant="body2" color="text.primary">
              Price: ${item.price}
            </Typography>
            <br />
            <Typography component="span" variant="body2" color="text.primary">
              Quantity: {item.quantity}
            </Typography>
          </>
        }
      />
      <Button
        variant="contained"
        color="error"
        onClick={() => onRemoveItem(item)}
      >
        Remove Item
      </Button>
    </ListItem>
  );
}

export default CartItem;
