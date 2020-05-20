import React, { useState, useEffect, useContext } from "react";
import apiRequest from "../utils/request";
import Question from "./Question";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import QuizCard from "./QuizCard";
import { QuizContext } from "./QuizContext";
import TextField from "@material-ui/core/TextField";
import QuestionCard from "./QuestionCard";
import { useHistory } from "react-router-dom";

export default function Quiz() {
  const { currentQuiz, finishQuiz, setPrivateKey, canSubmit } = useContext(
    QuizContext
  );
  let history = useHistory();

  return (
    <div style={{ padding: 20 }}>
      <Grid
        container
        spacing={5}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <QuizCard
          title={currentQuiz.name}
          description={currentQuiz.description}
        >
          {currentQuiz.questions.map((question, idx) => (
            <Question
              question_data={question}
              key={idx}
              answers={question.answers}
              type={question.type}
            ></Question>
          ))}

          <QuestionCard>
            <Grid
              container
              spacing={5}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <TextField
                variant="outlined"
                multiline
                placeholder="Your private key here"
                onChange={(e) => setPrivateKey(e.target.value)}
              />
              <Button
                style={{ marginTop: 10 }}
                onClick={canSubmit ? finishQuiz : null}
                variant="contained"
                disabled={!canSubmit}
                color="primary"
              >
                Finish
              </Button>
            </Grid>
          </QuestionCard>
        </QuizCard>
      </Grid>
    </div>
  );
}
