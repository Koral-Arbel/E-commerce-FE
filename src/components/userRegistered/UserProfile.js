import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";

function UserProfile() {
  const { auth } = useContext(AuthContext);
  console.log("Auth:", auth);

  return (
    <div>
      <h2>User Profile</h2>
      {auth.token ? (
        <div>
          <p>Username: {auth.username}</p>
          <p>User ID: {auth.userId}</p>
          {/* הוסף פרטים נוספים שאתה רוצה להציג */}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}

export default UserProfile;
