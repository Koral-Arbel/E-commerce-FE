import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

function Item({ item, handleAddItemToCart, handleAddItemToFavorites }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        elevation={3}
        style={{ padding: "15px", margin: "10px", textAlign: "center" }}
      >
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

        {/* Quantity Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ marginRight: "10px" }}>Quantity:</span>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            max={item.availableStock}
            style={{ width: "50px", marginRight: "10px", fontSize: "16px" }}
          />
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => handleAddItemToCart(item.id, quantity)}
          variant="contained"
          color="primary"
        >
          Add to Cart
        </Button>

        {/* Add to Favorites Button */}
        <Button
          onClick={() => handleAddItemToFavorites(item.id)}
          variant="outlined"
          color="secondary"
        >
          Add to Favorites
        </Button>
      </Paper>
    </Grid>
  );
}

export default Item;
