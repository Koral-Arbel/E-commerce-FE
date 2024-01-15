import React, { useContext, useEffect, useState } from "react";
import { getFavoriteItems } from "../services/api";
import AuthContext from "./AuthContext";

function Favorite() {
  const { auth } = useContext(AuthContext);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const items = await getFavoriteItems(auth);
        setFavoriteItems(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite items:", error);
        console.log(auth);
        setLoading(false);
      }
    };

    if (auth.isLoggedIn) {
      fetchFavoriteItems();
    }
  }, [auth]);

  return (
    <div>
      <h2>Your Favorite Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {favoriteItems.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorite;
