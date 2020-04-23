import React, { useState, useEffect } from 'react';
import apiRequest from '../utils/request';
import Question from './Question';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import QuizCard from './QuizCard';

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
    <div style={{ padding: 20 }}>

        <Grid
                container
                spacing={5}
                direction="column"
                alignItems="center"
                justify="center"
                >
            <QuizCard title={quiz.name} description={quiz.description}>
                {quiz.questions.map((question, idx) => 
                    <Question question={question.question} key={idx} answers={question.answers} type={question.type}></Question>
                    )}
                <Button variant="contained" color="primary">
                    Finish
                </Button>
            </QuizCard>
        </Grid>
    </div>
    )
}