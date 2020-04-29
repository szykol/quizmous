import React, { useState, createContext, useEffect } from "react";
import apiRequest from "../utils/request";
const QuizContext = createContext();

function QuizContextProvider({ children }) {
  const [quizes, setQuizes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});

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

    setCurrentQuiz(quiz);
  }

  function finishQuiz() {
    apiRequest(`quiz/${currentQuiz.quiz_id}/answers`, "POST", userAnswers)
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateQuizAnswer(question_id, answer_data, type) {
    const createNewData = (data) => {
      let temp = {};
      temp[question_id] = data;

      return temp;
    };

    let currentAnswer = userAnswers[question_id];

    let newData = {};
    if (type == "CHOICE") {
      const { answer_id, checked } = answer_data;

      if (currentAnswer) {
        let new_array = null;
        if (checked) {
          new_array = [...currentAnswer.id, answer_id];
        } else {
          new_array = currentAnswer.id.filter((val) => val !== answer_id);
        }
        newData = createNewData({ id: new_array, value: null });
      } else {
        newData = createNewData({ id: [answer_id], value: null });
      }
    } else if (type == "RADIO") {
      newData = createNewData({ id: answer_data.answer_id, value: null });
    } else {
      newData = createNewData({ id: null, value: answer_data.value });
    }
    setUserAnswers({
      ...userAnswers,
      ...newData,
    });
  }

  return (
    <QuizContext.Provider
      value={{
        quizes,
        selectCurrentQuiz,
        currentQuiz,
        updateQuizAnswer,
        finishQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizContextProvider };
