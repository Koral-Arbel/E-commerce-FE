// בקומפוננטת Logout

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

function Logout() {
  const { setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    // יש להתנתק מהשרת ולמחוק את המידע בקונטקסט
    setAuth({ username: null, token: null, isLoggedIn: false });
  };

  return (
    <div>
      <h1>Logout</h1>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout}>Logout</button>
      <p>
        <Link to="/">Go to Home</Link>
      </p>
    </div>
  );
}

export default Logout;
