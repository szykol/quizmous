import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { UserContext } from "./UserContext";
import { Route, Redirect } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.github.com/szykol/quizmous">
        Quizmous
      </Link>
      {"/"}
      <Link color="inherit" href="https://www.github.com/szykol/quizmous-api">
        QuizmousAPI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ onLogin }) {
  const classes = useStyles();
  const [nick, setNick] = useState();
  const [pass, setPass] = useState();
  const [register, setRegister] = useState(false);
  const { logged, loginUser, registerUser, requestResponse } = useContext(
    UserContext
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (!register) {
      loginUser(nick, pass);
      setRegister(false);
    } else {
      registerUser(nick, pass);
    }
  };

  return !logged ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {register ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nick"
            label="Nick"
            name="nick"
            autoComplete="nick"
            autoFocus
            onChange={(e) => setNick(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPass(e.target.value)}
          />
          {requestResponse && (
            <Alert severity="error">{requestResponse.message}</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => submitHandler(e)}
          >
            {register ? "Sign up" : "Sign in"}
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                onClick={(e) => setRegister(!register)}
                variant="body2"
              >
                {register
                  ? "Already have an acount? Sign In"
                  : "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  ) : (
    <Redirect
      to={{
        pathname: "/quiz_list",
      }}
    />
  );
}
