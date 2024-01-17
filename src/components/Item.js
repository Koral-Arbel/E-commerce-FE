import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

function Item({ item, handleAddItemToCart, handleAddItemToFavorites }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={3} style={{ padding: "15px", margin: "10px" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.7rem",
            textAlign: "center",
          }}
        >
          {item.title}
        </div>
        <img src={item.photo} alt={item.title} width="100%" height="auto" />
        <div style={{ color: "green", fontWeight: "bold" }}>
          Price: ${item.price}
        </div>
        <div>Available: {item.availableStock}</div>

        <Button onClick={() => handleAddItemToCart(item.id)}>
          Add to Cart
        </Button>
        <Button onClick={() => handleAddItemToFavorites(item.id)}>
          Add to Favorites
        </Button>
      </Paper>
    </Grid>
  );
}

export default Item;
