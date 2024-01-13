import { createContext, useState } from "react";

const OrdersContext = createContext({});

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersContext;
