import React, { useContext, useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Answer from "./Answer";
import { QuizContext } from "./QuizContext";
import { UserContext } from "./UserContext";

import apiRequest from "../utils/request";
import { Typography } from "@material-ui/core";

export default function DisplayQuizResults() {
  const { currentQuiz } = useContext(QuizContext);
  const { nick, pass } = useContext(UserContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    apiRequest(`quiz/${currentQuiz.quiz_id}/all_answers`, "POST", {
      nick,
      password: pass,
    })
      .then((payload) => setData(payload))
      .catch((err) => setData(null));
  }, []);

  if (data) {
    return (
      <Grid
        container
        spacing={5}
        direction="column"
        alignItems="center"
        justify="center"
      >
        {Object.keys(data.questions).map((elem, i) => (
          <Answer
            key={i}
            question={data.questions[elem].question}
            answers={data.questions[elem].answers}
          />
        ))}

        <Answer
          question="Users that have taken the quiz"
          answers={data.user_ids}
        />
      </Grid>
    );
  }
  return <p>No data</p>;
}
