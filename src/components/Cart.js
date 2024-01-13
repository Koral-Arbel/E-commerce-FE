import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderItem from "./OrderItem";
import CartContext from "./context/CartContext";
import AuthContext from "./context/AuthProvider";
import totalPriceCounter from "../utils/totalPriceCounter";
import { addItemToCart, removeItemFromCart } from "../services/api";
import axios from "axios";

// ...

function Cart(props) {
  const { cart, setCart } = useContext(CartContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (Object.keys(authContext["auth"]).length > 0) {
      addItemToCart({ Authorization: "Bearer " + authContext["auth"] }).then(
        (res) => {
          setCart(res.data.response);
        }
      );
    }
  }, [authContext, setCart]); // Include setCart in the dependency array

  const handleAddItemToCart = async (itemId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/order/create",
        {
          itemId: itemId,
        },
        {
          headers: {
            Authorization: "Bearer " + authContext["auth"],
          },
        }
      );

      console.log(response.data); // If you need to use the server response
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const showNothing = () => {
    return (
      <div className="shop-cart-empty">
        <h2>Cart is empty</h2>
      </div>
    );
  };

  return (
    <div className="shop-cart-container">
      {cart && cart.length > 0 ? (
        <div>
          {cart.map((cartItems) => (
            <OrderItem
              key={cartItems.id}
              item={cartItems}
              handleRemoveItemForCart={removeItemFromCart}
            />
          ))}
          <div className="cart-items-total-price">
            <p>Total Price</p>
            <p>${totalPriceCounter(cart)}</p>
          </div>
          <div className="cart-items">
            <p>Total Items</p>
            <p>{cart.length}</p>
          </div>
          <button onClick={() => handleAddItemToCart()}>Add to Cart</button>

          <button className="cart-check-out-btn">
            <Link to={"/checkout"}>Checkout Now</Link>
          </button>
        </div>
      ) : (
        showNothing()
      )}
      {Object.keys(authContext["auth"]).length > 0 && <p>{cart}</p>}
    </div>
  );
}

export default Cart;
