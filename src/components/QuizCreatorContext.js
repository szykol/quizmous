import React, { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import apiRequest from "../utils/request";
import { QuizContext } from "./QuizContext";
const QuizCreatorContext = createContext();

function QuizCreatorContextProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const { nick, pass } = useContext(UserContext);
  const { setQuizCreation } = useContext(QuizContext);
  function pushNewQuestion(question) {
    setQuestions([...questions, question]);
  }

  function submitQuiz(name, desc) {
    const quiz = {
      name,
      description: desc,
      questions,
      author: {
        user_id: 2,
        nick,
      },
    };

    console.log(quiz);

    apiRequest("quiz", "POST", quiz)
      .then((resp) => {
        console.log("Quiz added sucessfuly!");
        setQuizCreation(false);
      })
      .catch((err) => console.error(`Jeblo ${err}`));
  }

  return (
    <QuizCreatorContext.Provider
      value={{
        questions,
        currentQuestion,
        pushNewQuestion,
        submitQuiz,
      }}
    >
      {children}
    </QuizCreatorContext.Provider>
  );
}

export { QuizCreatorContext, QuizCreatorContextProvider };
