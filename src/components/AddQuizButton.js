import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { QuizContext } from "./QuizContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginTop: "auto",
    marginRight: theme.spacing(1),
  },
}));

export default function AddQuizButton() {
  const classes = useStyles();
  const { setQuizCreation } = useContext(QuizContext);
  return (
    <div
      onClick={(e) => {
        setQuizCreation(true);
      }}
      className={classes.root}
    >
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}
