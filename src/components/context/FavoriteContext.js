import { createContext, useState } from "react";

const FavouritesContext = createContext({});

export const FavouritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState({});

  return (
    <FavouritesContext.Provider value={{ favoriteItems, setFavoriteItems }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContext;
