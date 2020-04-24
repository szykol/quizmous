import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 10
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nick: {
    marginLeft: 'auto'
  }
}));

export default function DenseAppBar() {
  const classes = useStyles();
  const { nick } = useContext(UserContext);

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Quizmous - Anonymous Quiz App
          </Typography>
          <Typography className={classes.nick}>
            Hello, { nick }
          </Typography> 
        </Toolbar>
      </AppBar>
    </div>
  );
}
