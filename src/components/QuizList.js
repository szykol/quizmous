import React, { useEffect, useState } from "react";
import apiRequest from "../utils/request";
import QuizTitleCard from "./QuizTitleCard";
import Grid from "@material-ui/core/Grid";
function QuizList() {
  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    apiRequest("quiz", "GET")
      .then((quizes) => {
        console.log(quizes);
        setQuizes(quizes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
