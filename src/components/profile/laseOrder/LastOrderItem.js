import React from "react";

function LastOrderItem(props) {
  const { photo, title } = props;
  return (
    <div className="last-order-product-container">
      <img src={photo} alt={title} />
      <p>{title}</p>
    </div>
  );
}

export default LastOrderItem;
