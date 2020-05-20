import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import { QuizContext } from "./QuizContext";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

const useStyles = makeStyles({
  root: {
    minWidth: 500,
  },
  media: {
    height: 140,
  },
});

export default function QuizTitleCard({
  title,
  description,
  author,
  id,
  taken,
}) {
  const classes = useStyles();
  const { selectCurrentQuiz } = useContext(QuizContext);
  const { isAdmin } = useContext(UserContext);

  let history = useHistory();
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
      <Card className={classes.root}>
        <CardHeader title={title} subheader={author} />
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            onClick={(e) => {
              history.push("/take_quiz");
              selectCurrentQuiz(id);
            }}
            color="primary"
          >
            Take the Quiz!
          </Button>
          {isAdmin && (
            <Button
              size="small"
              onClick={(e) => {
                history.push("/view_quiz_results");
                selectCurrentQuiz(id);
              }}
              color="primary"
            >
              View results!
            </Button>
          )}
          {taken && (
            <Typography variant="body2" color="secondary" component="p">
              This quiz has been taken
            </Typography>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
