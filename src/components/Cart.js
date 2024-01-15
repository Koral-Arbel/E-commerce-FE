import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import AuthContext from "./context/AuthProvider";
import {
  addItemToCart,
  authenticate,
  createNewOrder,
  deleteOrderItem,
  getOpenOrder,
  getUserById,
  removeItemFromCart,
} from "../services/api";
import CartContext from "../components/context/CartContext";

function Cart() {
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth) {
      handleCheckTempOrder();
    }
  }, [auth]);

  const handleCheckTempOrder = async () => {
    try {
      console.log(auth);
      const response = await getOpenOrder(auth.userId);

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      console.log("Server response data:", await response.text());
      console.log("my order:", cart);

      if (!response.ok) {
        console.error("Failed to fetch cart items");
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      console.log("Data received:", data);

      setCart(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemToRemove) => {
    try {
      const response = await fetch(deleteOrderItem, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ itemId: itemToRemove.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      setCart((prevItems) =>
        prevItems.filter((item) => item.id !== itemToRemove.id)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <section>
      <h1>Shopping Cart</h1>
      {auth ? (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {cart.length > 0 ? (
                <>
                  <ul>
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onRemoveItem={handleRemoveItem}
                      />
                    ))}
                  </ul>
                  <button>Proceed to Checkout</button>
                </>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <p>You need to be logged in to view your cart.</p>
          <Link to="/login">Login</Link>
        </>
      )}
    </section>
  );
}

export default Cart;
