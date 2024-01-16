import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import AuthContext from "./context/AuthProvider";
import { addFavoriteItem, getAllItems, getProfileUser } from "../services/api";
import Item from "./Item";
import UserProfileContext from "./context/UserProfileContext";

function Home() {
  const { auth } = useContext(AuthContext);
  const { userDetails, setUserDetails } = useContext(UserProfileContext);

  const [items, setItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
    fetchUserProfile();
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

  const fetchUserProfile = async () => {
    try {
      // שלוף מידע על המשתמש מהשרת
      const userProfile = await getProfileUser(auth.username);
      console.log("User Profile:", userProfile);

      // שמור את פרטי המשתמש בקונטקסט
      setUserDetails(userProfile);
      return userProfile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleAddItemToFavorites = async (itemId) => {
    console.log("Auth details:", auth);
    console.log("Item ID :", itemId);
    console.log("User USERNAME : ", auth.username);
    console.log("User USERNAME : ", auth.token);

    try {
      // אם הצלחנו לשלוף את המידע, נשלוף ממנו את המזהה
      const userId = userDetails.id;
      console.log("User ID : ", userDetails.id);

      // קריאה לפונקציה שמוסיפה פריט למועדפים
      await addFavoriteItem({ userId: userDetails.id, itemId }, auth.token);
      setFavoriteItems((prevItems) => [...prevItems, { itemId }]);
    } catch (error) {
      console.error("Error adding item to favorites:", error);
      setError(
        error.message || "An error occurred while adding item to favorites"
      );
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
