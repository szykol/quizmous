import React, { useState, createContext, useEffect } from "react";
import apiRequest from "../utils/request";
const QuizContext = createContext();

function QuizContextProvider({ children }) {
  const [quizes, setQuizes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);

  useEffect(() => {
    apiRequest("quiz", "GET")
      .then((quizes) => {
        console.log(quizes);
        setQuizes(quizes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function selectCurrentQuiz(id) {
    const quiz = quizes.find((quiz) => quiz.quiz_id === id);
    console.log(quiz);

    setCurrentQuiz(quiz);
  }

  return (
    <QuizContext.Provider
      value={{
        quizes,
        selectCurrentQuiz,
        currentQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizContextProvider };
