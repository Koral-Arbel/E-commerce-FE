// בתוך קומפוננטת ה-Home
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Cart from "./Cart"; // שים לב לקבל את קומפוננטת ה-Cart

function Home(props) {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/public/item/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const addToCart = (itemId) => {
    const selectedProduct = items.find((item) => item.id === itemId);

    if (selectedProduct && selectedProduct.availableStock > 0) {
      setCart((prevCart) => [...prevCart, selectedProduct]);
      const updatedItems = items.map((item) => {
        if (item.id === itemId) {
          return { ...item, availableStock: item.availableStock - 1 };
        }
        return item;
      });
      setItems(updatedItems);

      console.log(`Item ${itemId} added to cart`);
    } else {
      console.log(`Item ${itemId} is out of stock`);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <h1>Buy Now - Apple products</h1>
      </div>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
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
              <img
                src={item.photo}
                alt={item.title}
                width="100%"
                height="auto"
              />
              <div style={{ color: "green", fontWeight: "bold" }}>
                {item.price}
              </div>
              <div>Available: {item.availableStock}</div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addToCart(item.id)}
              >
                Add to Cart
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;
