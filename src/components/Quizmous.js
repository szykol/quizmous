import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import ApiVersion from "./ApiVersion";
import Quiz from "./Quiz";
import SignIn from "./Signin";
import AppBar from "./AppBar";

function Quizmous() {
  const { logged } = useContext(UserContext);

  return (
    <div className="App">
      <AppBar></AppBar>
      {!logged && <SignIn></SignIn>}
      {logged && <Quiz></Quiz>}
      <footer className="footer">
        <span className="text-muted">
          <ApiVersion />
        </span>
      </footer>
    </div>
  );
}

export default Quizmous;
