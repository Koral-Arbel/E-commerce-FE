import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCircle } from "@fortawesome/free-solid-svg-icons";
import FavouritesContext from "./context/FavoriteContext";

function Item({
  items,
  handleRemoveItemFromFavoriteList,
  handleProducToFavorieList,
  handleAddItemToCart,
}) {
  const { title, price, available_stock } = item;
  const { favoriteList } = useContext(FavouritesContext);

  const renderFavoriteButton = () => {
    const isInFavorite = favoriteList.some(
      (favoriteItem) => favoriteItem.name === title
    );
    return isInFavorite ? (
      <FontAwesomeIcon
        icon={faHeart}
        className="product-wish-btn"
        onClick={() => handleRemoveItemFromFavoriteList(item)}
      />
    ) : (
      <FontAwesomeIcon
        icon={faCircle}
        className="product-wish-btn"
        onClick={() => handleProducToFavorieList(item)}
      />
    );
  };

  const renderProductImage = () => (
    <div className="product-img-container">
      <img src={item.photo} alt={title} />
    </div>
  );

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <button onClick={() => handleAddItemToCart(item.id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Item;
