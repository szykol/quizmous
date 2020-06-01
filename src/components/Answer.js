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
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import { red } from "@material-ui/core/colors";

export default function Answer({
  validate,
  question,
  backendAnswers,
  tokenAnswers,
}) {
  const { updateQuizAnswer } = useContext(QuizContext);

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function isCorrect() {
    const bSorted = [...backendAnswers];
    bSorted.sort();

    const tSorted = [...tokenAnswers];
    tSorted.sort();

    const equal = arraysEqual(bSorted, tSorted);
    if (!equal) {
      validate();
    }

    return equal;
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
      <AnswerCard
        question={question}
        backendAnswers={backendAnswers}
        tokenAnswers={tokenAnswers}
        correct={isCorrect()}
      />
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
  },
  error: {
    minWidth: 500,
    color: "red",
  },
  correct: {
    minWidth: 500,
    color: "green",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  title: {
    fontSize: 18,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function AnswerCard({ correct, question, backendAnswers, tokenAnswers }) {
  const classes = useStyles();

  // console.log(answers);
  return (
    <Card
      className={correct ? classes.correct : classes.error}
      style={{ borderColor: "red" }}
    >
      <CardHeader
        classes={{
          title: classes.title,
        }}
        title={`${question} ${correct ? "✓" : "╳"}`}
      />
      <CardContent>
        <h4>Answers from API</h4>
        {backendAnswers.map((el) => (
          <div>{el}</div>
        ))}
        <h4>Answers saved in token</h4>
        {tokenAnswers.map((el) => (
          <div>{el}</div>
        ))}
      </CardContent>
    </Card>
  );
}
