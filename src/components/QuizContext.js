import React, { useState, createContext } from "react";
import wrap_payload from "../utils/jwt";

const QuizContext = createContext();

function QuizContextProvider({ children }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <QuizContext.Provider
      value={{
        selectedQuiz,
        setSelectedQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizContextProvider };
