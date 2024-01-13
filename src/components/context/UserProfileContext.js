import React, { createContext, useState } from "react";

const UserProfileContext = createContext({});

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState();

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContext;
