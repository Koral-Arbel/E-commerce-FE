import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import OrderItem from "./OrderItem";

function Orders() {
  const { auth } = useContext(AuthContext);

  return (
    <section>
      <h1>Order History</h1>
      {auth ? (
        <>
          <ul>
            <OrderItem />
            <OrderItem />
          </ul>
        </>
      ) : (
        <p>You need to be logged in to view your orders.</p>
      )}
    </section>
  );
}

export default Orders;
