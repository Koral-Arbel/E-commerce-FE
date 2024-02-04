import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import styles from "./Item.module.css";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Item({ item, handleAddItemToCart, handleAddItemToFavorites }) {
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    if (!isInCart && !isOutOfStock) {
      handleAddItemToCart(item.id, quantity);
      setIsInCart(true);
    }
  };

  const handleAddToFavorites = () => {
    handleAddItemToFavorites(item.id);
    setIsInFavorites(true);
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setIsInCart(cartItems.some((cartItem) => cartItem.id === item.id));

    const favoritesItems =
      JSON.parse(localStorage.getItem("favoritesItems")) || [];
    setIsInFavorites(favoritesItems.some((favItem) => favItem.id === item.id));

    setIsOutOfStock(item.availableStock === 0);
  }, [item.id, item.availableStock]);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <div
        className={`${styles["item-container"]} ${
          isOutOfStock && styles["out-of-stock"]
        }`}
      >
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
              readOnly={isOutOfStock} // אם הפריט במלאי 0, תחשוב על קריאת הכמות
            />
          </div>

          <Button
            onClick={handleAddToCart}
            variant="contained"
            color="primary"
            startIcon={<FontAwesomeIcon icon={faShoppingCart} />}
            className={`${
              isInCart || isOutOfStock ? styles.disabledButton : ""
            }`}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>

          <Button
            onClick={handleAddToFavorites}
            variant="outlined"
            color="secondary"
            startIcon={<FontAwesomeIcon icon={faHeart} />}
            className={`${
              isInFavorites || isOutOfStock ? styles.disabledButton : ""
            }`}
          >
            {isInFavorites ? "In Favorites" : "Add to Favorites"}
          </Button>
        </Paper>
      </div>
    </Grid>
  );
}

export default Item;
