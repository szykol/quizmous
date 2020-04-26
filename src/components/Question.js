import React, { useContext } from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import QuestionCard from "./QuestionCard";
import { QuizContext } from "./QuizContext";

export default function Question({
  question_data: { question, question_id },
  type,
  answers,
}) {
  const { updateQuizAnswer } = useContext(QuizContext);
  const handleChange = (value) => {
    updateQuizAnswer(question_id, value, type);
  };

  const createWrapperComponent = () => {
    if (type == "RADIO") {
      return (
        <RadioGroup
          aria-label="answer"
          onChange={(e) =>
            handleChange({ answer_id: parseInt(e.target.value) })
          }
          name="answer"
        >
          {answers.map((answer, idx) => (
            <FormControlLabel
              key={answer.answer_id}
              value={answer.answer_id}
              control={<Radio />}
              label={answer.answer}
            />
          ))}
        </RadioGroup>
      );
    } else if (type == "YES_NO") {
      return (
        <RadioGroup
          aria-label="answer"
          onChange={(e) => handleChange({ value: e.target.value })}
          name="answer"
        >
          {["Yes", "No"].map((answer, idx) => (
            <FormControlLabel
              key={`${idx}${question_id}`}
              value={answer}
              control={<Radio />}
              label={answer}
            />
          ))}
        </RadioGroup>
      );
    } else if (type == "CHOICE") {
      return (
        <FormGroup>
          {answers.map((answer, idx) => (
            <FormControlLabel
              key={answer.answer_id}
              control={
                <Checkbox
                  onChange={(e) =>
                    handleChange(
                      {
                        answer_id: answer.answer_id,
                        checked: e.target.checked,
                      },
                      "CHOICE"
                    )
                  }
                  name={answer.answer}
                />
              }
              label={answer.answer}
            />
          ))}
        </FormGroup>
      );
    } else if (type == "OPEN") {
      return (
        <TextField
          variant="outlined"
          onChange={(e) => handleChange({ value: e.target.value })}
          name="password"
          multiline
        />
      );
    }
  };

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
      <QuestionCard question={question}>
        <FormControl fullWidth component="fieldset">
          {/* <FormLabel component="legend">{question}</FormLabel> */}
          {createWrapperComponent()}
        </FormControl>
      </QuestionCard>
    </Grid>
  );
}
