import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

function Item(props) {
  const [items, setItems] = useState();
  const [error, setError] = useState("");

  const getApiData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/public/item/all");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className="image-container">
      <br />
      <div>
        <h1>BUY NOW:</h1>
        <div className="image-container">
          {error && <h3>{error}</h3>}
          {items &&
            items.map((item) => (
              <ItemCard
                key={item.itemId}
                title={item.title}
                photo={item.photo}
                price={item.price}
                availableStock={item.availableStock}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Item;
