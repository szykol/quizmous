import React, { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import apiRequest from "../utils/request";
const QuizCreatorContext = createContext();

function QuizCreatorContextProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  function pushNewQuestion(question) {
    setQuestions([...questions, question]);
  }

  return (
    <QuizCreatorContext.Provider
      value={{
        questions,
        currentQuestion,
        pushNewQuestion,
      }}
    >
      {children}
    </QuizCreatorContext.Provider>
  );
}

export { QuizCreatorContext, QuizCreatorContextProvider };
