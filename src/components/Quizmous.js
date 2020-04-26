import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import ApiVersion from "./ApiVersion";
import Quiz from "./Quiz";
import SignIn from "./Signin";
import AppBar from "./AppBar";
import QuizList from "./QuizList";

function Quizmous() {
  const { logged } = useContext(UserContext);

  return (
    <div className="App">
      <AppBar></AppBar>
      {!logged && <SignIn></SignIn>}
      {logged && <QuizList></QuizList>}
      <footer className="footer">
        <span className="text-muted">
          <ApiVersion />
        </span>
      </footer>
    </div>
  );
}

export default Quizmous;
