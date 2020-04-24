import React, { useState, createContext } from "react";

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [nick, setNick] = useState("guest");
  return (
    <UserContext.Provider
      value={{
        nick,
        setNick,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
