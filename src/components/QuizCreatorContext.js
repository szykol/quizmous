import React, { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import apiRequest from "../utils/request";
import { QuizContext } from "./QuizContext";
import { ToastContainer, toast } from "react-toastify";

const QuizCreatorContext = createContext();

function QuizCreatorContextProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(null);

  const { nick, userId } = useContext(UserContext);
  const { setQuizCreation } = useContext(QuizContext);
  function pushNewQuestion(question) {
    setQuestions([...questions, question]);
  }

  useEffect(() => {
    setCanSubmit(questions.length > 0 && name && desc);
  }, [name, desc, questions]);

  function submitQuiz() {
    const quiz = {
      name,
      description: desc,
      questions,
      author: {
        user_id: userId,
        nick,
      },
    };

    console.log(quiz);

    apiRequest("quiz", "POST", quiz)
      .then((resp) => {
        console.log("Quiz added sucessfuly!");
        toast.success("Quiz added successfuly", { autoClose: 3000 });
        setQuizCreation(false);
      })
      .catch((err) => console.error(`Huknelo ${err}`));

    setQuestions([]);
    setCurrentQuestion([]);
  }

  function removeQuestion(question) {
    const newQuestions = questions.filter((el) => el.question !== question);
    setQuestions(newQuestions);
  }

  return (
    <QuizCreatorContext.Provider
      value={{
        questions,
        currentQuestion,
        pushNewQuestion,
        submitQuiz,
        removeQuestion,
        setName,
        setDesc,
        canSubmit,
      }}
    >
      {children}
    </QuizCreatorContext.Provider>
  );
}

export { QuizCreatorContext, QuizCreatorContextProvider };
