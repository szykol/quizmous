import React, { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import apiRequest from "../utils/request";
const QuizContext = createContext();

function QuizContextProvider({ children }) {
  const [quizes, setQuizes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [takenQuizes, setTakenQuizes] = useState([]);

  const { nick, pass } = useContext(UserContext);

  useEffect(() => {
    apiRequest("quiz", "GET")
      .then((quizes) => {
        console.log(quizes);
        setQuizes(quizes);

        for (let q of quizes) {
          apiRequest(`user/${nick}/quiz_taken/${q.quiz_id}`, "GET").then(
            (resp) => {
              if (resp.taken) {
                console.log([...takenQuizes, q.quiz_id]);
                setTakenQuizes([...takenQuizes, q.quiz_id]);
              }
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nick]);

  function selectCurrentQuiz(id) {
    const quiz = quizes.find((quiz) => quiz.quiz_id === id);

    setCurrentQuiz(quiz);
  }

  function finishQuiz() {
    apiRequest(`quiz/${currentQuiz.quiz_id}/answers`, "POST", userAnswers)
      .then((payload) => {
        console.log(payload);
        apiRequest(`user/quiz_taken/${currentQuiz.quiz_id}`, "POST", {
          nick,
          password: pass,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setTakenQuizes([...takenQuizes, currentQuiz.quiz_id]);
    setCurrentQuiz(null);
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
          new_array = [...currentAnswer.answer_id, answer_id];
        } else {
          new_array = currentAnswer.id.filter((val) => val !== answer_id);
        }
        newData = createNewData({ answer_id: new_array, value: null });
      } else {
        newData = createNewData({ answer_id: [answer_id], value: null });
      }
    } else if (type == "RADIO") {
      newData = createNewData({
        answer_id: answer_data.answer_id,
        value: null,
      });
    } else {
      newData = createNewData({ answer_id: null, value: answer_data.value });
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
        takenQuizes,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizContextProvider };
