import React, { useState, createContext } from "react";
import wrap_payload from "../utils/jwt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserContext = createContext();

function UserContextProvider({ children }) {
  const [nick, setNick] = useState("guest");
  const [logged, setLogged] = useState(false);
  const [requestResponse, setRequestResponse] = useState(null);
  const [pass, setPass] = useState(null);
  const [userId, setUserId] = useState(null);

  async function loginUser(nick, password) {
    const resp = await fetch(`http://localhost:3000/user/login`, {
      method: "POST",
      body: wrap_payload({ nick, password }),
    });

    const payload = await resp.json();
    if (resp.status != 200) {
      console.error(payload);
      setRequestResponse({ message: payload.message });
      return;
    }

    console.log(payload);
    setNick(nick);
    setPass(password);
    setLogged(true);
    setRequestResponse(null);
    setUserId(payload.user.user_id);
    toast.info("Logged in successfuly !", { autoClose: 3000 });
  }

  async function registerUser(nick, password) {
    const resp = await fetch(`http://localhost:3000/user/register`, {
      method: "POST",
      body: wrap_payload({ nick, password }),
    });

    const payload = await resp.json();
    if (resp.status != 201) {
      console.error(payload);
      setRequestResponse({ message: payload.message });
      return;
    }

    console.log(payload);
    setLogged(false);
    setRequestResponse(null);
    toast.info("Registered successfuly !", { autoClose: 3000 });
  }

  async function logoutUser() {
    setLogged(false);
    setNick("guest");
    setPass(null);
    toast.info("Logged out successfuly !", { autoClose: 3000 });
  }

  return (
    <UserContext.Provider
      value={{
        nick,
        pass,
        loginUser,
        registerUser,
        logged,
        requestResponse,
        logoutUser,
        userId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
