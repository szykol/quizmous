import React, { useState, useEffect } from 'react';
import apiRequest from '../utils/request';
import Question from './Question';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



export default function Quiz() {
    const [quiz, setQuiz] = useState({
        name: "Quiz Name",
        description: "Quiz Description",
        questions: []
    });

    useEffect(() => {
        apiRequest('quiz', "GET").then(quiz => {
            console.log(quiz)
            setQuiz(quiz[0]);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <div>
            <h2>{quiz.name}</h2>
            <h3>{quiz.description}</h3>
            <Grid
                container
                spacing={5}
                direction="column"
                alignItems="flex-start"
                justify="center"
                >
                {quiz.questions.map((question, idx) => 
                <Grid container alignItems="flex-start" style={{minWidth: 500}}
                justify="center" key={idx} alignContent="flex-start" item xs={12}>
                    <Question data={question} ></Question>
                </Grid>
                )}
            </Grid>

            
            <Button variant="contained" color="primary">
                Finish
            </Button>
        </div>
    )
}