import React, { useContext, useEffect, useState } from "react";
import { deleteUser, getProfileUser } from "../../services/api";
import AuthContext from "../context/AuthProvider";
import UserProfileContext from "../context/UserProfileContext";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { auth, setAuth } = useContext(AuthContext);
  const { userDetails, setUserDetails } = useContext(UserProfileContext);

  const [isUserDeleted, setUserDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getProfileUser(auth.username);
        setUserDetails(response);
        setAuth((prevAuth) => ({
          ...prevAuth,
          userId: response.userId,
        }));
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };

    fetchUserProfile();
  }, [auth.username, setAuth, setUserDetails]);

  const handleDeleteCustomerBtn = async () => {
    try {
      await deleteUser(userDetails.id, "Authorization = Bearer " + auth.token);
      setAuth((prevAuth) => ({
        ...prevAuth,
        isLoggedIn: false,
        userId: null,
        token: null,
        username: null,
      }));
      setUserDetails(null);
      setUserDeleted(true);

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {userDetails ? (
        <div>
          <p>userId: {userDetails.id}</p>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          <p>First Name: {userDetails.firstName}</p>
          <p>Last Name: {userDetails.lastName}</p>
          <p>Phone: {userDetails.phone}</p>
          <p>Full Address: {userDetails.fullAddress}</p>
          <button
            className="profile-delete-btn"
            onClick={handleDeleteCustomerBtn}
          >
            Delete Account
          </button>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default UserProfile;
