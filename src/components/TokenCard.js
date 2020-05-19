import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { QuizContext } from "./QuizContext";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    minWidth: 800,
    maxWidth: 800,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TokenCard() {
  const classes = useStyles();
  const { setCurrentToken } = useContext(QuizContext);
  const [token, setToken] = useState("");
  let history = useHistory();

  useEffect(() => {
    setCurrentToken(null);
  }, []);

  return (
    <Grid
      container
      spacing={5}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid
        container
        alignItems="center"
        style={{ maxWidth: 300 }}
        justify="center"
        alignContent="center"
        item
        xs={12}
      >
        <Typography variant="h5" component="h5">
          Insert token to check answers
        </Typography>
      </Grid>
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
          // value={question}
          onChange={(e) => {
            setToken(e.target.value);
          }}
          // readonly={readonly}
          // disabled={readonly}
        />
      </Grid>
      <Grid
        container
        alignItems="center"
        style={{ maxWidth: 300 }}
        justify="center"
        alignContent="center"
        item
        xs={12}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            setCurrentToken(token);
            history.push("/display_answers");
          }}
        >
          Check answers
        </Button>
      </Grid>
    </Grid>
  );
}
