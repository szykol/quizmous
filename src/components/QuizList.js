import React, { useContext } from "react";
import QuizTitleCard from "./QuizTitleCard";
import Grid from "@material-ui/core/Grid";
import { QuizContext } from "./QuizContext";

function QuizList() {
  const { quizes } = useContext(QuizContext);

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
        />
      ))}
    </Grid>
  );
}

export default QuizList;
