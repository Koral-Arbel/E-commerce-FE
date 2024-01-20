import React, { useContext, useEffect, useState } from "react";
import { checkOutOrder, getAllOrders } from "../../services/api";
import AuthContext from "../context/AuthProvider";
import UserProfileContext from "../context/UserProfileContext";
import CartContext from "../context/CartContext";
import OrdersContext from "../context/OrdersContext";
import CartItem from "./CartItem";

function Cart() {
  const { auth } = useContext(AuthContext);
  const { userDetails } = useContext(UserProfileContext);
  const { cart, setCart } = useContext(CartContext);
  const { orders, setOrders } = useContext(OrdersContext);

  const [orderDetails, setOrderDetails] = useState({
    userId: userDetails.id,
    orderDate: null,
    shippingAddress: "",
    status: "TEMP",
    orderNumber: null,
    items: [], // Initialize items as an empty array
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlerLoadCart = async () => {
      try {
        if (!auth || !auth.token || !userDetails.id) {
          setLoading(false);
          return;
        }

        const response = await getAllOrders(userDetails.id, auth.token);

        if (response.data) {
          const cartItems = Array.isArray(response.data[0].item)
            ? response.data[0].item
            : [response.data[0].item];

          setCart(cartItems);

          const orderDetailsData = response.data[0].order || {};
          const items = cartItems.map((cartItem) => ({
            id: cartItem.id,
            title: cartItem.title,
            photo: cartItem.photo,
            price: cartItem.price,
            availableStock: cartItem.availableStock,
            quantity: cartItem.quantity,
          }));

          setOrderDetails({
            userId: userDetails.id,
            orderDate: orderDetailsData.orderDate,
            shippingAddress: orderDetailsData.shippingAddress,
            status: orderDetailsData.status,
            orderNumber: orderDetailsData.id,
            items: items,
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart details:", error);
        setError("Error fetching cart details. Please try again later.");
        setLoading(false);
      }
    };

    handlerLoadCart();
  }, [auth.token, userDetails.id, setCart]);

  const handlerCheckout = async () => {
    try {
      if (orderDetails.orderNumber && cart.length > 0 && auth.token) {
        await checkOutOrder(orderDetails.orderNumber, {}, auth.token);
        setOrderDetails((prevOrder) => ({
          ...prevOrder,
          status: "CLOSE",
          orderDate: new Date().toISOString(),
          orderId: orderDetails.id,
        }));
        setCart([]);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  function calculateTotalPrice() {
    return orderDetails.items.reduce((total, item) => {
      const itemPrice = item.price || 0;
      return total + itemPrice;
    }, 0);
  }

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
              {orderDetails.items.length > 0 ? (
                <div>
                  {orderDetails.items.map((orderItem) => (
                    <CartItem key={orderItem.id} item={orderItem} />
                  ))}
                </div>
              ) : (
                <p>No items purchased.</p>
              )}
              <p>Total Price: ${calculateTotalPrice()}</p>
            </div>
          ) : (
            <div>
              <h2>Items in Cart</h2>
              {cart.length > 0 ? (
                <ul>
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ul>
              ) : (
                <p>Your cart is empty.</p>
              )}
              <button onClick={handlerCheckout}>Checkout</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
