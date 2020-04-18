import React, { useState, useEffect } from 'react';
import apiRequest from '../utils/request';
import Answer from './Answer';
import YesNo from './YesNo';

export default function Question(props) {
    const question = props.data;
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{question.question}</h5>
                { question.type == 'OPEN' ? <p><input type="text"></input></p> : null }
                { question.type == 'YES_NO' ? <YesNo></YesNo> : null } 
                <form className="controls">
                    { question.answers.map((answer, idx) => <Answer data={answer} type={question.type} key={idx}></Answer>) }
                </form>
            </div>
        </div>
    )
}