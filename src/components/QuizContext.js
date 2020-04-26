import React, { useState, createContext, useEffect } from "react";
import apiRequest from "../utils/request";
const QuizContext = createContext();

function QuizContextProvider({ children }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizes, setQuizes] = useState([]);

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

  return (
    <QuizContext.Provider
      value={{
        selectedQuiz,
        setSelectedQuiz,
        quizes,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizContextProvider };
