import React, { useContext, useState } from "react";
import axios from "axios";
import { createNewOrder } from "../services/api";
import AuthContext from "./context/AuthProvider";
import UserProfileContext from "./context/UserProfileContext";

function Cart() {
  const { auth } = useContext(AuthContext);
  const { userDetails, setUserDetails } = useContext(UserProfileContext);
  const [orderDate, setOrderDate] = useState(new Date().toISOString());
  const [shippingAddress, setShippingAddress] = useState("");
  const [status, setStatus] = useState("TEMP");
  const [orderNumber, setOrderNumber] = useState(null);

  const handleCreateOrder = async () => {
    try {
      const userId = userDetails.id;
      const jwtToken = auth.token;
      const response = await createNewOrder(
        {
          userId,
          orderDate,
          shippingAddress,
          status,
        },
        jwtToken
      );

      const newOrderNumber = response.data.orderNumber; // המספר של ההזמנה
      setOrderNumber(newOrderNumber);

      console.log("ההזמנה נוצרה בהצלחה:", response.data);

      // כאן ניתן להוסיף פעולות נוספות לאחר יצירת ההזמנה
    } catch (error) {
      console.error("שגיאה ביצירת ההזמנה:", error);
    }
  };

  const isCartEmpty = true; // צריך להגדיר באמת אם העגלה ריקה

  return (
    <div>
      {/* דוגמה לכפתור הזמנה */}
      <button onClick={handleCreateOrder}>צור הזמנה</button>

      {/* הודעה אם עגלת הקניות ריקה */}
      {isCartEmpty && <p>Cart Empty</p>}
    </div>
  );
}

export default Cart;
