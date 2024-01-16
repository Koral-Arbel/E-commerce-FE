import React, { createContext, useState } from "react";
import UserProfile from "../userRegistered/UserProfile";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: null,
    token: null,
    isLoggedIn: false,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
