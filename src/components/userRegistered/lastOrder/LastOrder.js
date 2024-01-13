import React from "react";
import LastOrderItem from "./LastOrderItem";

function LastOrder(props) {
  const { orderId, orderDate } = props;
  return (
    <div className="last-order-container">
      <div className="last-order-details">
        <h3>Order Id: {orderId}</h3>
        <p>Order Date: {orderDate}</p>
        {/* <p>Total Products: {totalProducts}</p>
        <p>Total Price: ${totalPrice}</p> */}
      </div>
      <div className="last-order-products">
        {props.items.map((item) => (
          <LastOrderItem key={item.id} name={item.title} img={item.photo} />
        ))}
      </div>
    </div>
  );
}

export default LastOrder;
