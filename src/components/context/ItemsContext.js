import { createContext, useState } from "react";

const ItemsContext = createContext({});

export const ItemsProvider = ({ children }) => {
  const [Items, setItems] = useState([]);

  return (
    <ItemsContext.Provider value={{ Items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;
