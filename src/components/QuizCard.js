import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 800,
    maxWidth: 800,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function QuizCard({ title, description, children }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Grid
                container
                spacing={5}
                direction="column"
                alignItems="center"
                justify="center"
        >
        <Grid container alignItems="center" style={{maxWidth: 300}}
            justify="center" alignContent="center" item xs={12}
        >
            <Typography variant="h3" component="h2">
                { title }
            </Typography>
        </Grid>
        <Grid container alignItems="center" style={{maxWidth: 300}}
            justify="center" alignContent="center" item xs={12}
        >
            <Typography className={classes.pos} color="textSecondary">
                { description }
            </Typography>
        </Grid>

        {children}
        
    </Grid>
  );
}
