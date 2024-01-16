import React, { useContext, useEffect, useState } from "react";
import { getFavoriteItems } from "../services/api";
import AuthContext from "./AuthContext";

function FavoriteItem() {
  const { auth } = useContext(AuthContext);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        console.log("auth object:", auth);
        const response = await getFavoriteItems(auth);
        const fetchedItems = response.data;
        setFavoriteItems(fetchedItems); // יש לוודא שזהו המבנה הנכון שמתקבל מהשרת
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
        <div className="favorite-list-container">
          {favoriteItems.map((item) => (
            <div key={item.id} className="favorite-item-card">
              <img src={item.photo} alt={item.title} />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p>{item.price}</p>
                <p>Available Stock: {item.availableStock}</p>
                <button onClick={() => handleAddFavorite(item.id)}>
                  Add to Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoriteItem;
