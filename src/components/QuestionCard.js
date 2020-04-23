import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  title: {
      fontSize: 18,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function QuestionCard( {question, children} ) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        classes = {{
            title: classes.title
        }}
        title={question}
        // subheader="September 14, 2016"
      />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
