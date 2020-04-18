import React, { useState, useEffect } from 'react';
import apiRequest from '../utils/request';
import Question from './Question';

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
        <div className="container-sm">
            <h4>Name: {quiz.name}</h4>
            <h5>Description: {quiz.description}</h5>

            {quiz.questions.map((question, idx) => <Question data={question} key={idx}></Question>)}

            <button className="btn btn-primary">
                Finish
            </button>
        </div>
    )
}