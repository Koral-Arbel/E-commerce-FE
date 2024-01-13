import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import UserProfileContext from "../context/UserProfileContext";
import CartContext from "../context/CartContext";
import OrdersContext from "../context/OrdersContext";
import { getUsernameByUsername } from "../../services/api";
import { useNavigate } from "react-router-dom";
import LastOrder from "./lastOrder/LastOrder";
import axios from "axios";

function UserProfile(props) {
  const { userId, username } = props;

  const { auth, setAuth } = useContext(AuthContext);
  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const { setCart } = useContext(CartContext);
  const { orders, setOrders } = useContext(OrdersContext);
  const [customerDeleted, setCustomerDeleted] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [firstNameChange, setFirstNameChange] = useState("");
  const [lastNameChange, setLastNameChange] = useState("");
  const [emailChange, setEmailChange] = useState("");
  const [phoneChange, setPhoneChange] = useState("");
  const [shippingAddres, setShippingAddres] = useState("");
  const newUserBody = {
    firstName: firstNameChange,
    lastName: lastNameChange,
    email: emailChange,
    phone: phoneChange,
    shippingAddres: shippingAddres,
  };

  const navigate = useNavigate();
  const deleteUser = () => {
    const deleteUserUrl = new URL(
      "http://localhost:8080//user/deleteUser/${userId}"
    );
    for (const key in username) {
      deleteUserUrl.searchParams.append(key, username[key]);
    }
    axios.delete(deleteUserUrl);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/api/public/profile/${username}`);
        setUserProfile(response.data); // עדכון המשתנה userProfile
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (username) {
      fetchUserDetails();
    }
  }, [auth, username, setUserProfile]);

  const showLastOrders = (orders) => (
    <div className="profile-last-orders">
      {orders.map((order, id) => (
        <LastOrder
          key={id}
          orderId={order.order.id}
          orderDate={order.order.orderDate}
          totalPrice={order.item.totalPrice}
          items={order.item}
        />
      ))}
    </div>
  );

  const showNothing = () => (
    <div className="shop-cart-empty">
      <h2>No Orders</h2>
    </div>
  );

  const handleDeleteUserBtn = async () => {
    console.log("User Profile:", userProfile);
    console.log("User ID:", userProfile?.user?.id);

    try {
      // שימוש ב-Axios לביצוע בקשת DELETE
      await axios.delete(`/user/deleteUser`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });

      setAuth({});
      setUserProfile(null);
      setCart([]);
      setOrders([]);
      setCustomerDeleted(true);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (error) {
      console.error("Error deleting user:", error);
      // טפל בשגיאה
    }
  };

  return (
    <>
      <div>
        <h1>User details page</h1>
        <form className="form_details">
          <label>First Name: </label>
          <input
            type="text"
            value={newUserBody.firstName}
            onChange={(e) => setFirstNameChange(e.target.value)}
          ></input>
          <label>Last Name: </label>
          <input
            type="text"
            value={newUserBody.lastName}
            onChange={(e) => setLastNameChange(e.target.value)}
          ></input>
          <label>Email: </label>
          <input
            type="text"
            value={newUserBody.email}
            onChange={(e) => setEmailChange(e.target.value)}
          ></input>
          <label>Phone: </label>
          <input
            type="text"
            value={newUserBody.phone}
            onChange={(e) => setPhoneChange(e.target.value)}
          ></input>
          <label>Country: </label>
          <input
            type="text"
            value={newUserBody.country}
            onChange={(e) => setShippingAddres(e.target.value)}
          ></input>
          <label>City: </label>
          <input
            type="text"
            value={newUserBody.city}
            onChange={(e) => setShippingAddres(e.target.value)}
          ></input>
          {/* <button onClick={handleSubmit()}>Change</button> */}
        </form>
        <button onClick={deleteUser()}>Delete</button>
      </div>
    </>
  );
}

export default UserProfile;
