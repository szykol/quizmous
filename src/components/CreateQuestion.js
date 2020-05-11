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

function CreateQuestion() {
  const [question, setQuestion] = useState("Your question");
  const [type, setType] = useState("RADIO");
  const [answers, setAnswers] = useState(["Perfect!", "Outstanding!", "Good"]);

  return (
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
        placeholder="Your question here"
        value={question.question}
        onChange={(e) => setQuestion(e.target.value)}
        readonly={question != null}
      />
      <QuizTypeDropdown />
      {answers.map((answer, idx) => (
        <TextField
          key={idx}
          variant="outlined"
          multiline
          placeholder="Your answer here"
          value={answers[idx]}
          onChange={(e) => {
            let newAnswers = [...answers];
            newAnswers[idx] = e.target.value;

            setAnswers(newAnswers);
          }}
          readonly={question != null}
        />
      ))}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={(e) => {
          setAnswers([...answers, "Your answer here..."]);
        }}
      >
        Another Answer
      </Button>
    </Grid>
  );
}

export default CreateQuestion;
