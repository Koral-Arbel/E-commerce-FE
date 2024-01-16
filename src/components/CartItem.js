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
  // נוסיף בדיקה אם item מוגדר
  if (!item) {
    return null; // או ייתכן שאתה רוצה להחזיר משהו אחר
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={item.title} src={item.photo} />
      </ListItemAvatar>
      <ListItemText
        primary={item.title}
        secondary={
          <>
            <Typography component="span" variant="body2" color="text.primary">
              Price: ${item.price}
            </Typography>
            <br />
            {/* נוסיף בדיקה אם quantity מוגדר ולכן הקריאה ל-item.quantity לא תפל */}
            {item.quantity && (
              <Typography component="span" variant="body2" color="text.primary">
                Quantity: {item.quantity}
              </Typography>
            )}
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
