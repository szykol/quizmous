import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { QuizContext } from "./QuizContext";
import ApiVersion from "./ApiVersion";
import Quiz from "./Quiz";
import SignIn from "./Signin";
import AppBar from "./AppBar";
import QuizList from "./QuizList";
import AddQuiz from "./AddQuiz";
import PrivateRoute from "./PrivateRoute";
import TokenCard from "./TokenCard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DisplayAnswers from "./DisplayAnswers";

function Quizmous() {
  const { logged } = useContext(UserContext);
  const { currentQuiz, quizCreation } = useContext(QuizContext);

  return (
    <div className="App">
      <AppBar></AppBar>
      <Switch>
        <PrivateRoute exact path="/quiz_list">
          <QuizList />
        </PrivateRoute>

        <PrivateRoute exact path="/take_quiz">
          <Quiz />
        </PrivateRoute>

        <PrivateRoute exact path="/add_new_quiz">
          <AddQuiz />
        </PrivateRoute>

        <PrivateRoute exact path="/check_answers">
          <TokenCard />
        </PrivateRoute>

        <PrivateRoute exact path="/display_answers">
          <DisplayAnswers />
        </PrivateRoute>

        <Route path="/">
          <SignIn />
        </Route>
      </Switch>
      <footer className="footer">
        <span className="text-muted">
          <ApiVersion />
        </span>
      </footer>
    </div>
  );
}

export default Quizmous;
