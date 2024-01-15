import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileContext from "../context/UserProfileContext";
import AuthContext from "../context/AuthProvider";
import CartContext from "../context/CartContext";
import { deleteUser, getUserById } from "../../services/api";
import OrdersContext from "../context/OrdersContext";
import LastOrder from "./lastOrder/LastOrder";

function Profile() {
  const { auth, setAuth } = useContext(AuthContext);
  const { userDetails, setUserDetails } = useContext(UserProfileContext);
  const { setCart } = useContext(CartContext);
  const { orders, setOrders } = useContext(OrdersContext);
  const [userDeleted, setUserDeleted] = useState(false);

  useEffect(() => {
    console.log("AuthContext:", auth); // ווידא שהפלט נכון בקונסול
  }, [auth]);

  const navigate = useNavigate();

  const showLastOrders = (orders) => {
    return (
      <div className="profile-last-orders">
        {orders.map((order, index) => (
          <LastOrder
            key={index}
            userId={order.user.id}
            orderDate={order.order.orderDate}
            shippingAddress={order.order.shippingAddress}
            status={order.order.status}
            items={order.items}
          />
        ))}
      </div>
    );
  };

  const showNothing = () => {
    return (
      <div className="shop-cart-empty">
        <h2>No Orders</h2>
      </div>
    );
  };

  const handleDeleteUserBtn = async () => {
    await deleteUser(userDetails.user.id, auth);
    setAuth({});
    setUserDetails();
    setCart([]);
    setOrders([]);
    setUserDeleted(true);
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
  };

  useEffect(() => {
    // אם יש טוקן, השתמש בו בקריאה לשרת
    if (auth && auth.length > 0) {
      // בקריאה לשרת, הוסף את הטוקן בכותרת ההרשאות
      getUserById(userDetails.id, auth)
        .then((response) => {
          // עבודה עם התשובה מהשרת
        })
        .catch((error) => {
          // טיפול בשגיאה מהשרת
        });
    }
  }, [auth]);
  return (
    <>
      {!userDeleted ? (
        <div className="profile-container">
          {orders.length > 0 ? showLastOrders(orders) : showNothing()}
          <button className="profile-delete-btn" onClick={handleDeleteUserBtn}>
            Delete Account
          </button>
        </div>
      ) : (
        <div className="profile-container">
          <h2>Account Deleted</h2>
        </div>
      )}
    </>
  );
}

export default Profile;
