// UserProfileContext.js
import React, { createContext, useEffect, useMemo, useState } from "react";

const UserProfileContext = createContext({});

export const UserProfileProvider = ({ children }) => {
  const storedUserDetails = useMemo(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    return storedUserDetails ? JSON.parse(storedUserDetails) : null;
  }, []);

  const [userDetails, setUserDetails] = useState(storedUserDetails);

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  }, [userDetails]);

  return (
    <UserProfileContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContext;
