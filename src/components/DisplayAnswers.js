import React, { useContext, useEffect, useState } from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Answer from "./Answer";
import { QuizContext } from "./QuizContext";
import Typography from "@material-ui/core/Typography";
import apiRequest from "../utils/request";
const jwt = require("jsonwebtoken");

export default function DisplayAnswers() {
  const { fetchAnswersFromToken, currentToken } = useContext(QuizContext);
  const [data, setData] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [tokenUserAnswers, setTokenUserAnswers] = useState({});
  const [validateData, setValidateData] = useState([]);
  const [info, setInfo] = useState(
    "Your answers stored in token match answers stored in database"
  );

  function extractJwt() {
    const payload = jwt.decode(currentToken);

    setCurrentQuiz(payload.currentQuiz);
    setTokenUserAnswers(payload.userAnswers);
  }

  function gatherData() {
    let newValidateData = [];
    Object.keys(data.answers.questions).map((elem, i) =>
      // <Answer
      //   key={i}
      //   question={data.answers.questions[elem].question}
      //   answers={data.answers.questions[elem].answers}
      //   // token_answers={}
      // />
      newValidateData.push({
        question: data.answers.questions[elem].question,
        backendAnswer: data.answers.questions[elem].answers,
        tokenAnswer: getAnswerListFromTokenElement(elem),
      })
    );

    setValidateData([...newValidateData]);
  }

  function getAnswerListFromTokenElement(elem) {
    let answerList = [];

    if (tokenUserAnswers[elem].value) {
      answerList.push(tokenUserAnswers[elem].value);
    } else {
      if (Array.isArray(tokenUserAnswers[elem].answer_id)) {
        answerList = [...tokenUserAnswers[elem].answer_id];
      } else {
        answerList.push(tokenUserAnswers[elem].answer_id);
      }

      answerList = answerList.map((elem, id) => {
        for (const question of currentQuiz.questions) {
          const answer = question.answers.find(
            (answer) => answer.answer_id === elem
          );
          if (answer) {
            return answer.answer;
          }
        }

        return null;
      });
    }
    return answerList;
  }

  function generate() {
    return Object.keys(tokenUserAnswers).map((elem, i) => {
      return (
        <Answer
          key={i}
          question={data.answers.questions[elem].question}
          answers={getAnswerListFromTokenElement(elem)}
        />
      );
    });
  }

  function setIncorrect() {
    setInfo(
      "Your answers stored in token DO NOT match answers stored in database"
    );
  }

  useEffect(() => {
    extractJwt();
    fetchAnswersFromToken()
      .then((payload) => setData(payload))
      .catch((err) => setData(null));
  }, []);

  useEffect(() => {
    if (data) gatherData();
  }, [data]);

  if (data) {
    // console.log(data);
    return (
      <Grid
        container
        spacing={5}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid
          container
          alignItems="center"
          style={{ maxWidth: 300 }}
          justify="center"
          alignContent="center"
          item
          xs={12}
        >
          <Typography>{info}</Typography>
        </Grid>
        {validateData.map((elem, i) => (
          <Answer
            key={i}
            question={elem.question}
            backendAnswers={elem.backendAnswer}
            tokenAnswers={elem.tokenAnswer}
            validate={setIncorrect}
            // token_answers={}
          />
        ))}
      </Grid>
    );
  }
  return <p>No data</p>;
}
