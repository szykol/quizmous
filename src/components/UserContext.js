import React, { useState, createContext } from "react";
import wrap_payload from "../utils/jwt";
const UserContext = createContext();

function UserContextProvider({ children }) {
  const [nick, setNick] = useState("guest");
  const [logged, setLogged] = useState(false);
  const [requestError, setRequestError] = useState(null);

  async function loginUser(nick, password) {
    const resp = await fetch(`http://localhost:3000/user/login`, {
      method: "POST",
      body: wrap_payload({ nick, password }),
    });

    const payload = await resp.json();
    if (resp.status != 200) {
      console.error(payload);
      setRequestError(payload.message);
      return;
    }

    console.log(payload);
    setNick(nick);
    setLogged(true);
    setRequestError(null);
  }

  async function registerUser(nick, password) {
    const resp = await fetch(`http://localhost:3000/user/register`, {
      method: "POST",
      body: wrap_payload({ nick, password }),
    });

    const payload = await resp.json();
    if (resp.status != 201) {
      console.error(payload);
      setRequestError(payload.message);
      return;
    }

    console.log(payload);
    setLogged(false);
    setRequestError(null);
  }

  async function logoutUser() {
    setLogged(false);
    setNick("guest");
  }

  return (
    <UserContext.Provider
      value={{
        nick,
        loginUser,
        registerUser,
        logged,
        requestError,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
