import React, { useEffect, useState, useContext } from "react";
import { getProfileUser } from "../../services/api"; // אני מניח שיש לך פונקציה כזו בשירותים שלך
import AuthContext from "../context/AuthProvider";

const UserProfile = () => {
  const { auth } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getProfileUser(auth.username);
        setUserProfile(response);
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };

    fetchUserProfile();
  }, [auth.username]);

  return (
    <div>
      <h2>User Profile</h2>
      {userProfile ? (
        <div>
          <p>Username: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          <p>First Name: {userProfile.firstName}</p>
          <p>Last Name: {userProfile.lastName}</p>
          <p>Phone: {userProfile.phone}</p>
          <p>Full Address: {userProfile.fullAddress}</p>
          {/* וכל פרט אחר שתרצה להציג */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
