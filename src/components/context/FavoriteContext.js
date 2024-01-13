import { createContext, useState } from "react";

const FavouritesContext = createContext({});

export const FavouritesProvider = ({ children }) => {
  const [favourite, setFavourite] = useState({});

  return (
    <FavouritesContext.Provider value={{ favourite, setFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContext;
