import React, { useContext, useEffect, useState } from "react";
import { addFavoriteItem, getFavoriteItems } from "../../services/api";
import AuthContext from "../context/AuthProvider";

const FavoriteList = () => {
  const { auth } = useContext(AuthContext);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const response = await getFavoriteItems(auth);
        setFavoriteItems(response.data); // יש לוודא שזהו המבנה הנכון שמתקבל מהשרת
      } catch (error) {
        console.error("Error fetching favorite items:", error);
      }
    };

    fetchFavoriteItems();
  }, [auth]);

  return (
    <div>
      <h2>Favorite Items</h2>
      <ul>
        {favoriteItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
