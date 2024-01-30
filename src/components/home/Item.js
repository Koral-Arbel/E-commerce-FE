import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import styles from "./Item.module.css";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Item({ item, handleAddItemToCart, handleAddItemToFavorites }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <div className={styles["item-container"]}>
        <Paper elevation={3} className={styles["item-content"]}>
          <div className={styles["item-title"]}>
            <span className={styles["span"]}>{item.title}</span>
          </div>
          <img
            src={item.photo}
            alt={item.title}
            className={styles["item-image"]}
          />
          <div className={styles["item-price"]}>Price: ${item.price}</div>
          <div>Available: {item.availableStock}</div>

          <div className={styles["quantity-container"]}>
            <span className={styles["quantity-label"]}>Quantity:</span>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={item.availableStock}
              className={styles["quantity-input"]}
            />
          </div>

          <Button
            onClick={() => handleAddItemToCart(item.id, quantity)}
            variant="contained"
            color="primary"
            startIcon={<FontAwesomeIcon icon={faShoppingCart} />}
          >
            Add to Cart
          </Button>

          <Button
            onClick={() => handleAddItemToFavorites(item.id)}
            variant="outlined"
            color="secondary"
            startIcon={<FontAwesomeIcon icon={faHeart} />}
          >
            Add to Favorites
          </Button>
        </Paper>
      </div>
    </Grid>
  );
}

export default Item;
