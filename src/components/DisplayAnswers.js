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
import apiRequest from "../utils/request";

export default function DisplayAnswers() {
  const { fetchAnswersFromToken } = useContext(QuizContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnswersFromToken()
      .then((payload) => setData(payload))
      .catch((err) => setData(null));
  }, []);

  if (data) {
    console.log(data);
    return (
      <Grid
        container
        spacing={5}
        direction="column"
        alignItems="center"
        justify="center"
      >
        {Object.keys(data.answers.questions).map((elem, i) => (
          <Answer
            key={i}
            question={data.answers.questions[elem].question}
            answers={data.answers.questions[elem].answers}
          />
        ))}
      </Grid>
    );
  }
  return <p>No data</p>;
}
