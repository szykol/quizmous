import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { QuizContext } from "./QuizContext";
import ApiVersion from "./ApiVersion";
import Quiz from "./Quiz";
import SignIn from "./Signin";
import AppBar from "./AppBar";
import QuizList from "./QuizList";
import AddQuiz from "./AddQuiz";
function Quizmous() {
  const { logged } = useContext(UserContext);
  const { currentQuiz } = useContext(QuizContext);

  return (
    <div className="App">
      <AppBar></AppBar>
      {!logged && <SignIn></SignIn>}
      {logged && ((currentQuiz && <Quiz />) || <AddQuiz />)}
      <footer className="footer">
        <span className="text-muted">
          <ApiVersion />
        </span>
      </footer>
    </div>
  );
}

export default Quizmous;
