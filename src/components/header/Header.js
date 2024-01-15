import React, { useContext } from "react";
import AuthContext from "./context/AuthProvider";

function Header(props) {
  const { auth } = useContext(AuthContext);

  return (
    <header>
      <div>
        <h1>Hello, {auth?.username}!</h1>
      </div>
    </header>
  );
}

export default Header;
