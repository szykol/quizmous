import React, { useState, useEffect } from 'react';
import apiRequest from '../utils/request';
import Answer from './Answer';
import YesNo from './YesNo';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//     },
//     formControl: {
//       margin: theme.spacing(3),
//     },
//   }));
  

export default function Question(props) {
    const question = props.data;
    // const classes = useStyles();
    return (
        <div style={{width: 300}}>
        {question.type == "RADIO" && 
        <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">{question.question}</FormLabel>
        <RadioGroup aria-label="answer" name="answer">
        { question.answers.map((answer, idx) => <FormControlLabel key={idx} value={answer.answer} control={<Radio />} label={answer.answer} />
        ) }
        </RadioGroup>
        </FormControl>
}
        {
        question.type == "YES_NO" && 
        <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">{question.question}</FormLabel>
        <RadioGroup aria-label="answer" name="answer">
        { ["Yes", "No"].map((answer, idx) => <FormControlLabel key={idx} value={answer} control={<Radio />} label={answer} />
        ) }
        </RadioGroup>
        </FormControl>
}

        {
            question.type == "CHOICE" &&
            <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">{question.question}</FormLabel>
        <FormGroup>
            {question.answers.map((answer, idx) => 
          <FormControlLabel
          control={<Checkbox key={idx} name={answer.answer} />}
          label={answer.answer}
          />
          )}
        </FormGroup>
      </FormControl>
        }

{
            question.type == "OPEN" &&
              <TextField
                variant="outlined"
                name="password"
                label={question.question}
                multiline
            />
        }

    </div>



        // <div className="card">
        //     <div className="card-body">
        //         <h5 className="card-title">{question.question}</h5>
        //         { question.type == 'OPEN' ? <p><input type="text"></input></p> : null }
                
        //         { question.type == 'YES_NO' ? <YesNo></YesNo> : null } 
        //         <form className="controls">
        //             { question.answers.map((answer, idx) => <Answer data={answer} type={question.type} key={idx}></Answer>) }
        //         </form>
        //     </div>
        // </div>
    )
}