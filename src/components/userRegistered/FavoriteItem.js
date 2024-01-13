import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";

function FavoriteItem(props) {
  const { auth } = useContext(AuthContext);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { title, photo, price, availableStock } = props.item;
  useEffect(() => {
    fetchFavoriteItems();
  }, []);

  const fetchFavoriteItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/favoriteItem/${auth.user.id}`
      );
      setFavoriteItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorite items:", error);
      setError("Error fetching favorite items. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Favorites</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {favoriteItems.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>Price: {item.price}</p>
        </div>
      ))}
    </div>
  );
}

//   return (
//     <div>
//       <img src={photo} alt={title} />
//       <h2>{title}</h2>
//       <p>{price}$</p>
//       <div>
//         <p>
//           {availableStock > 0 ? `only: ${availableStock} Left` : `Out Of Stock`}
//         </p>
//         <div>
//           <FontAwesomeIcon
//             icon="trash"
//             onClick={() => props.handleRemoveItem(props.item)}
//           />
//           <FontAwesomeIcon
//             icon="trash-alt"
//             onClick={() => props.handleAddItemToCart(props.item)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

export default FavoriteItem;
