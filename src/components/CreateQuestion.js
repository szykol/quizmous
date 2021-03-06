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
import { QuizCreatorContext } from "./QuizCreatorContext";

function CreateQuestion({ questionObj }) {
  const readonly = questionObj != null;

  const [question, setQuestion] = useState(
    readonly ? questionObj.question : ""
  );
  const [type, setType] = useState(readonly ? questionObj.type : "RADIO");
  const [answers, setAnswers] = useState(
    readonly
      ? questionObj.answers.map((answer) => answer.answer)
      : ["Perfect!", "Outstanding!", "Good"]
  );
  const { pushNewQuestion, removeQuestion } = useContext(QuizCreatorContext);

  function handleChange(newType) {
    if (newType === "YES_NO") {
      setAnswers(["Yes", "No"]);
    } else if (newType === "OPEN") {
      setAnswers([]);
    }

    setType(newType);
  }

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
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        readonly={readonly}
        disabled={readonly}
      />
      <QuizTypeDropdown
        handleChange={handleChange}
        propType={type}
        disabled={readonly}
      />
      {answers.map((answer, idx) => (
        <>
          <div style={{ display: "inline-flex" }}>
            <div>
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
                readonly={type === "YES_NO" || readonly}
                disabled={type === "YES_NO" || readonly}
              />
            </div>
            {type !== "YES_NO" && (
              <div style={{ alignSelf: "center" }}>
                <Button
                  display="inline"
                  onClick={(e) => {
                    const newAnswers = answers.filter(
                      (item) => item !== answers[idx]
                    );
                    setAnswers(newAnswers);
                  }}
                >
                  -
                </Button>
              </div>
            )}
          </div>
        </>
      ))}
      {!readonly ? (
        <>
          {type !== "OPEN" && type !== "YES_NO" && (
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
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={
              question.trim() !== ""
                ? (e) => {
                    const newAnswers = answers.map((answer) => {
                      return {
                        answer,
                      };
                    });
                    pushNewQuestion({
                      question,
                      type: type,
                      answers: newAnswers,
                      required: true,
                    });

                    setType("RADIO");
                    setQuestion("");
                    setAnswers(["Perfect!", "Outstanding!", "Good"]);
                  }
                : null
            }
            disabled={question.trim() === ""}
          >
            Add Question
          </Button>
        </>
      ) : (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={(e) => {
            removeQuestion(question);
          }}
        >
          Remove Question
        </Button>
      )}
    </Grid>
  );
}

export default CreateQuestion;
