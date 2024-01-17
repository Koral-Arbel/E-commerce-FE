import React, { useContext, useEffect, useState } from "react";
import { checkOutOrder, getOrderTemp } from "../../services/api";
import AuthContext from "../context/AuthProvider";
import UserProfileContext from "../context/UserProfileContext";
import CartContext from "../context/CartContext";
import OrdersContext from "../context/OrdersContext";

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
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderClosed, setOrderClosed] = useState(false);

  useEffect(() => {
    const handlerLoadCart = async () => {
      try {
        if (!auth || !auth.token || !userDetails.id) {
          setLoading(false);
          return;
        }

        const response = await getOrderTemp(userDetails.id, auth.token);

        if (response.data) {
          setCart(response.data.items);
          setOrderDetails({
            userId: userDetails.id,
            orderDate: response.data.order?.orderDate,
            shippingAddress: response.data.order?.shippingAddress,
            status: response.data.order?.status,
            orderNumber: response.data.order?.id,
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
      if (orderDetails.orderNumber && cart.length > 0) {
        await checkOutOrder(orderDetails.orderNumber, auth.token);
        setOrderDetails((prevOrder) => ({
          ...prevOrder,
          status: "CLOSE",
          orderDate: new Date().toISOString(),
        }));
        setCart([]);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  function calculateTotalPrice(cart) {
    return cart.reduce((total, item) => {
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
              <div>
                {cart.map((item) => (
                  <div key={item.id}>
                    <img src={item.photo} alt={item.title} />
                    <div>
                      <h3>{item.title}</h3>
                      <p>Price: ${item.price}</p>
                      <p>Available Stock: {item.availableStock}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p>Total Price: ${calculateTotalPrice(cart)}</p>
            </div>
          ) : (
            <div>
              <h2>Items in Cart</h2>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    <img src={item.photo} alt={item.title} />
                    <div>
                      <h3>{item.title}</h3>
                      <p>Price: ${item.price}</p>
                      <p>Available Stock: {item.availableStock}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
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
