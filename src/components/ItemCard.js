import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function ItemCard({ id, title, photo, price, availableStock }) {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={photo}
        title={title}
      />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">Price: ${price.toFixed(2)}</Typography>
        <Typography variant="body2">Available Stock: {availableStock}</Typography>
      </CardContent>
    </Card>
  );
}

export default ItemCard;
