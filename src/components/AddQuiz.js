import React, { useState, useEffect, useContext } from "react";
import apiRequest from "../utils/request";
import Question from "./Question";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import QuizCard from "./QuizCard";
import { QuizContext } from "./QuizContext";
import { QuizCreatorContext } from "./QuizCreatorContext";
import TextField from "@material-ui/core/TextField";
import QuestionCard from "./QuestionCard";
import AddQuizButton from "./AddQuizButton";
import CreateQuestion from "./CreateQuestion";
import QuizTypeDropdown from "./QuizTypeDropdown";

export default function AddQuiz() {
  const { currentQuiz, finishQuiz, setPrivateKey } = useContext(QuizContext);
  const { questions } = useContext(QuizCreatorContext);
  // const [currentQuestion, setCurrentQuestion] = useState(0

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

        {questions.map((question, idx) => (
          <CreateQuestion questionObj={question} key={idx} />
        ))}
        <CreateQuestion questionObj={null} />
      </Grid>
    </div>
  );
}
