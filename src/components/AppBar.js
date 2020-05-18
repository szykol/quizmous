import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nick: {
    marginLeft: "auto",
    marginRight: 5,
  },
}));

export default function DenseAppBar() {
  const classes = useStyles();
  const { nick, logged, logoutUser } = useContext(UserContext);
  let history = useHistory();
  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Quizmous - Anonymous Quiz App
          </Typography>
          <Typography className={classes.nick}>Hello, {nick}</Typography>
          {logged && (
            <Button
              onClick={(e) => {
                history.push("/");
                logoutUser(e);
              }}
              color="primary"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
