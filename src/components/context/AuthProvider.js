// AuthContext.js
import React, { createContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const storedAuth = useMemo(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : {
          username: null,
          token: null,
          isLoggedIn: false,
        };
  }, []);

  const [auth, setAuth] = useState(storedAuth);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
