import React, { useState, createContext } from "react";
import wrap_payload from "../utils/jwt";
const UserContext = createContext();

function UserContextProvider({ children }) {
  const [nick, setNick] = useState("guest");
  const [logged, setLogged] = useState(false);

  async function loginUser(nick, password) {
    const resp = await fetch(`http://localhost:3000/user/login`, {
      method: "POST",
      body: wrap_payload({ nick, password }),
    });

    const payload = await resp.json();
    if (resp.status != 200) {
      console.error(payload);
      return;
    }

    console.log(payload);
    setNick(nick);
    setLogged(true);
  }

  async function registerUser(nick, password) {
    const resp = await fetch(`http://localhost:3000/user/register`, {
      method: "POST",
      body: wrap_payload({ nick, password }),
    });

    const payload = await resp.json();
    if (resp.status != 201) {
      console.error(payload);
      return;
    }

    console.log(payload);
    setLogged(false);
  }

  return (
    <UserContext.Provider
      value={{
        nick,
        loginUser,
        registerUser,
        logged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
