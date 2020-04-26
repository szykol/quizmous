import React, { useState, useEffect, useContext } from "react";
import apiRequest from "../utils/request";
import Question from "./Question";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import QuizCard from "./QuizCard";
import { QuizContext } from "./QuizContext";

export default function Quiz() {
  const { currentQuiz, finishQuiz } = useContext(QuizContext);

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
          <Button onClick={finishQuiz} variant="contained" color="primary">
            Finish
          </Button>
        </QuizCard>
      </Grid>
    </div>
  );
}
