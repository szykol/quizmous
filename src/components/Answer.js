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

export default function Answer({ question, answers }) {
  const { updateQuizAnswer } = useContext(QuizContext);

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
      <AnswerCard question={question} answers={answers} />
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
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

function AnswerCard({ question, answers }) {
  const classes = useStyles();

  console.log(answers);
  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          title: classes.title,
        }}
        title={question}
      />
      <CardContent>
        {answers.map((el) => (
          <div>{el}</div>
        ))}
      </CardContent>
    </Card>
  );
}
