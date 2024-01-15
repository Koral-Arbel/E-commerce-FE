import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import AuthContext from "./context/AuthProvider";
import { addFavoriteItem, getAllItems, getProfileUser } from "../services/api";
import Item from "./Item";

function Home() {
  const { auth } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getAllItems();
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again later.");
    }
  };

  const handleAddItemToFavorites = async (itemId) => {
    console.log("Auth details:", auth);
    console.log("Item ID :", itemId);
    console.log("User USERNAME : ", auth.username);
    console.log("User USERNAME : ", auth.token);

    try {
      // שלוף מידע על המשתמש מהשרת
      const userProfile = await getProfileUser(auth.username);

      // אם הצלחנו לשלוף את המידע, נשלוף ממנו את המזהה
      const userId = userProfile.userId;

      // קריאה לפונקציה שמוסיפה פריט למועדפים
      await addFavoriteItem({ userId: userId, itemId: itemId }, auth.token);

      // עדכון של הרשימת מועדפים בצד הלקוח
      setFavoriteItems([...favoriteItems, { itemId: itemId }]);
    } catch (error) {
      console.error("Error adding item to favorites:", error);
    }
  };
  return (
    <>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <h1>Buy Now - Apple products</h1>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Grid container spacing={2}>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleAddItemToCart={() => {}}
            handleAddItemToFavorites={handleAddItemToFavorites}
          />
        ))}
      </Grid>
    </>
  );
}

export default Home;
