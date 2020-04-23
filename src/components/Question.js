import React, { useState, useEffect } from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
  
const createWrapperComponent = (type, question, answers) => {
    if (type == "RADIO") {
        return (
            <RadioGroup aria-label="answer" name="answer">
            { 
                answers.map((answer, idx) => <FormControlLabel key={idx} value={answer.answer} control={<Radio />} label={answer.answer} />)
            }
            </RadioGroup>
        )
    } else if (type == "YES_NO") {
        return (
            <RadioGroup aria-label="answer" name="answer">
            { 
                ["Yes", "No"].map((answer, idx) => <FormControlLabel key={idx} value={answer} control={<Radio />} label={answer} />)
            }
            </RadioGroup>
        )
    } else if (type == "CHOICE") {
        return (
            <FormGroup>
            {answers.map((answer, idx) => 
                <FormControlLabel
                    control={<Checkbox key={idx} name={answer.answer} />}
                    label={answer.answer}
                />)
            }
            </FormGroup>
        )
        
    } else if (type == "OPEN") {
        return (
            <TextField
                variant="outlined"
                name="password"
                multiline
            />
        )
    }

}

export default function Question({ question, type, answers }) {
    return (
          <Grid container alignItems="center" style={{maxWidth: 300}}
            justify="center" alignContent="center" item xs={6}
          >
            <FormControl fullWidth component="fieldset">
                <FormLabel component="legend">{question}</FormLabel>
                {createWrapperComponent(type, question, answers)}
            </FormControl>
        </Grid>
    )
}