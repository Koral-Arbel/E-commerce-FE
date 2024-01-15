import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCircle } from "@fortawesome/free-solid-svg-icons";
import FavouritesContext from "./context/FavoriteContext";

function Item({
  item, // שיניתי את השם ל- item כי כנראה המתכוון לאובייקט יחיד
  handleRemoveItemFromFavoriteList,
  handleProducToFavorieList,
  handleAddItemToCart,
}) {
  const { title, price, available_stock, id, photo } = item; // שיניתי את ההפניה לפרטי הפריט
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
      <img src={photo} alt={title} />
    </div>
  );

  return (
    <div key={id}>
      <p>{title}</p>
      <p>{price}$</p>
      {renderProductImage()}
      {renderFavoriteButton()}
      <button onClick={() => handleAddItemToCart(id)}>Add to Cart</button>
    </div>
  );
}

export default Item;
