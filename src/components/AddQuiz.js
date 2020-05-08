import React, { useState, useEffect, useContext } from "react";
import apiRequest from "../utils/request";
import Question from "./Question";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import QuizCard from "./QuizCard";
import { QuizContext } from "./QuizContext";
import TextField from "@material-ui/core/TextField";
import QuestionCard from "./QuestionCard";
import AddQuizButton from "./AddQuizButton";
import QuizTypeDropdown from "./QuizTypeDropdown";

export default function AddQuiz() {
  const { currentQuiz, finishQuiz, setPrivateKey } = useContext(QuizContext);

  function createQuestionTemplate() {
    return {
      question: "Your question",
      answers: ["Perfect!", "Outstanding!", "Good"],
      type: "RADIO",
    };
  }

  const [questions, setQuestions] = useState([createQuestionTemplate()]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <div style={{ padding: 20 }}>
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
          <TextField
            variant="outlined"
            multiline
            placeholder="Quiz Name"
            // onChange={(e) => setPrivateKey(e.target.value)}
          />

          <TextField
            variant="outlined"
            multiline
            placeholder="Quiz Description"
            // onChange={(e) => setPrivateKey(e.target.value)}
          />
        </Grid>

        {questions.map((question, currentIdx) => (
          <Grid
            container
            alignItems="center"
            style={{ maxWidth: 300 }}
            justify="center"
            alignContent="center"
            item
            key={currentIdx}
            xs={12}
          >
            <TextField
              variant="outlined"
              multiline
              placeholder="Your question here"
              value={question.question}
              // onChange={(e) => setPrivateKey(e.target.value)}
            />
            <QuizTypeDropdown />
            {questions[currentIdx].answers.map((answer, idx) => (
              <TextField
                key={idx}
                variant="outlined"
                multiline
                placeholder="Your answer here"
                value={answer}
              />
            ))}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => {
                let oldQuestions = [...questions];
                let currentQuestionObj = questions[currentIdx];
                currentQuestionObj.answers.push(null);
                oldQuestions.pop(currentIdx);
                setQuestions([...questions]);
              }}
            >
              Another Answer
            </Button>
          </Grid>
        ))}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={(e) => {
            setQuestions([...questions, createQuestionTemplate()]);
            setCurrentQuestion(currentQuestion + 1);
          }}
        >
          Add Question
        </Button>
      </Grid>
    </div>
  );
}
