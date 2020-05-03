import React, { useContext } from "react";
import QuizTitleCard from "./QuizTitleCard";
import Grid from "@material-ui/core/Grid";
import { QuizContext } from "./QuizContext";

function QuizList() {
  const { quizes, takenQuizes } = useContext(QuizContext);

  return (
    <Grid
      container
      spacing={5}
      direction="column"
      alignItems="center"
      justify="center"
    >
      {quizes.map((item, idx) => (
        <QuizTitleCard
          title={item.name}
          author={item.author.nick}
          description={item.description}
          key={idx}
          id={item.quiz_id}
          taken={takenQuizes.includes(item.quiz_id)}
        />
      ))}
    </Grid>
  );
}

export default QuizList;
