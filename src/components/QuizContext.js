import React, { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import apiRequest from "../utils/request";
import { ToastContainer, toast } from "react-toastify";
import Button from "@material-ui/core/Button";

const QuizContext = createContext();

function QuizContextProvider({ children }) {
  const [quizes, setQuizes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [takenQuizes, setTakenQuizes] = useState([]);
  const [privateKey, setPrivateKey] = useState("");
  const [quizCreation, setQuizCreation] = useState(false);
  const { nick, pass } = useContext(UserContext);

  useEffect(() => {
    apiRequest("quiz", "GET")
      .then((quizes) => {
        console.log(quizes);
        setQuizes(quizes);

        let promises = [];
        for (let q of quizes) {
          promises.push(
            apiRequest(`user/${nick}/quiz_taken/${q.quiz_id}`, "GET").then(
              (resp) => {
                if (resp.taken) {
                  return q.quiz_id;
                }
              }
            )
          );
        }

        Promise.all(promises).then((taken) => setTakenQuizes(taken));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nick, currentQuiz, quizCreation]);

  function selectCurrentQuiz(id) {
    const quiz = quizes.find((quiz) => quiz.quiz_id === id);

    setCurrentQuiz(quiz);
  }

  function Copyable({ message, token }) {
    return (
      <div>
        {message}
        Your token is: {token}
        <Button
          onClick={(e) => {
            navigator.clipboard.writeText(token);
          }}
        >
          COPY
        </Button>
      </div>
    );
  }

  function finishQuiz() {
    const taken = takenQuizes.includes(currentQuiz.quiz_id);

    if (!taken) {
      apiRequest(`quiz/${currentQuiz.quiz_id}/answers`, "POST", {
        ...userAnswers,
        key: privateKey,
      })
        .then((payload) => {
          console.log(payload);
          apiRequest(`user/quiz_taken/${currentQuiz.quiz_id}`, "POST", {
            nick,
            password: pass,
          });
          toast.success(
            <Copyable message="Quiz finished successfully." token="token" />
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.success(
        <Copyable message="Quiz has already been taken." token="token" />
      );
    }

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
        setPrivateKey,
        quizCreation,
        setQuizCreation,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizContextProvider };
