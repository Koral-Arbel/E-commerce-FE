import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrdersContext from "./context/OrdersContext";

function Order() {
  const { orders, setOrders } = useContext(OrdersContext);

  useEffect(() => {
    const fetchOrders = async () => {
      // Fetch open orders
      const openOrdersResponse = await getOpenOrders(auth.userId, auth.token);
      setOrders(openOrdersResponse.data);

      // Fetch closed orders
      const closedOrdersResponse = await getClosedOrders(
        auth.userId,
        auth.token
      );
      // Merge the closed orders into the existing orders state
      setOrders((prevOrders) => [...prevOrders, ...closedOrdersResponse.data]);
    };

    fetchOrders();
  }, [auth.userId, auth.token, setOrders]);

  return (
    <div>
      <h2>Order Details</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3>Date: {order.date}</h3>
              <h3>Shipping Address: {order.shippingAddress}</h3>
              <h3>Status: {order.status}</h3>

              <ul>
                {order.orderItems.map((item) => (
                  <li key={item.itemId}>
                    {item.quantity} x {item.item.title}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Order;
