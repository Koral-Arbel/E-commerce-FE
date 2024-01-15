import React, { createContext, useState } from "react";

const UserProfileContext = createContext({});

export const UserProfileProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState();

  return (
    <UserProfileContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContext;
