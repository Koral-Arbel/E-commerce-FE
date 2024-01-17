import React, { useContext, useEffect, useState } from "react";
import { checkOutOrder, getOrderTemp } from "../services/api";
import AuthContext from "./context/AuthProvider";
import UserProfileContext from "./context/UserProfileContext";
import CartContext from "./context/CartContext";
import OrdersContext from "./context/OrdersContext";

function Cart() {
  const { auth } = useContext(AuthContext);
  const { userDetails } = useContext(UserProfileContext);
  const { cart, setCart } = useContext(CartContext);
  const { orders, setOrders } = useContext(OrdersContext);

  const [orderDetails, setOrderDetails] = useState({
    orderNumber: null,
    orderDate: null,
    shippingAddress: "",
    status: "TEMP",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlerLoadCart = async () => {
    try {
      const response = await getOrderTemp(userDetails.id, auth.token);
      setCart(response.data.items);
      setOrderDetails({
        userId: userDetails.id,
        orderDate: response.data.orderDate,
        shippingAddress: response.data.shippingAddress,
        status: response.data.status,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart details:", error);
      setError("Error fetching cart details. Please try again later.");
    }
  };

  useEffect(() => {
    handlerLoadCart();
  }, [cart]);

  const handlerCheckout = async () => {
    try {
      await checkOutOrder(orderDetails.orderNumber, auth.token);
      setOrderDetails((prevOrder) => ({
        ...prevOrder,
        status: "CLOSE",
        orderDate: new Date().toISOString(),
      }));
      setCart([]);
      setOrders((prevOrders) => [...prevOrders, cart]);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.price || 0;
      return total + itemPrice;
    }, 0);
  };

  return (
    <div>
      <h1>My Cart</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orderDetails.orderNumber && (
        <>
          <h2>Order Details</h2>
          <p>Order Number: {orderDetails.orderNumber}</p>
          <p>Order Date: {new Date(orderDetails.orderDate).toLocaleString()}</p>
          <p>Shipping Address: {orderDetails.shippingAddress}</p>
          <p>Status: {orderDetails.status}</p>
          {orderDetails.status === "CLOSE" ? (
            <div>
              <h2>Items Purchased</h2>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.title} - {item.price} - {item.quantity}
                  </li>
                ))}
              </ul>
              <p>Total Price: {calculateTotalPrice()}</p>
            </div>
          ) : (
            <div>
              <h2>Items in Cart</h2>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.title} - {item.price} - {item.quantity}
                  </li>
                ))}
              </ul>
              <button onClick={handlerCheckout}>Checkout</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
