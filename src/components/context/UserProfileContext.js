import React, { createContext, useEffect, useState } from "react";

const UserProfileContext = createContext({});

export const UserProfileProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  return (
    <UserProfileContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContext;
