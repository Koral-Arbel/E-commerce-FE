import React, { useContext, useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import AuthContext from "./context/AuthProvider";
import { createNewOrder } from "../services/api";

function OrderList() {
  const authContext = useContext(AuthContext);
  const [order, setOrder] = useState();

  useEffect(() => {
    if (Object.keys(authContext["auth"]).length > 0) {
      createNewOrder({ Authorization: "Bearer " + authContext["auth"] }).then(
        (res) => {
          setOrder(res.data.response);
        }
      );
    }
  }, [authContext]);

  // Assuming 'orders' is an array of order objects
  const orders = [];

  return (
    <div>
      {orders.map((order) => (
        <OrderItem
          key={order.orderId} // Make sure each order has a unique identifier
          orderId={order.orderId}
          orderDate={order.orderDate}
          shippingAddress={order.shippingAddress}
          // Include other necessary props
        />
      ))}
      {Object.keys(authContext["auth"]).length > 0 && <p>{order}</p>}
    </div>
  );
}

export default OrderList;
