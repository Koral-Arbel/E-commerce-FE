import React from "react";
import { Redirect } from "react-router-dom";

function Logout({ setUser }) {
  React.useEffect(() => {
    setUser(null);
  }, [setUser]);

  return <Redirect to="/" />;
}

export default Logout;
