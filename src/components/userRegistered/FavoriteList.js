import React, { useContext } from "react";
import FavouritesContext from "../context/FavoriteContext";
import FavoriteItem from "./FavoriteItem";

function FavoriteList(props) {
  const { favorite } = useContext(FavouritesContext);

  if (!favorite || favorite.length === 0) {
    return <h2>Favorite List Empty</h2>;
  }

  return (
    <div>
      {favorite.map((item) => (
        <FavoriteItem
          key={item.id}
          item={item}
          handleAddItemToCart={props.handleAddItemToCart}
          handleRemoveItem={props.handleRemoveItem}
        />
      ))}
    </div>
  );
}

export default FavoriteList;
