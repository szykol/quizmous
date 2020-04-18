import React, { useState, useEffect } from 'react';
import { useUID } from 'react-uid';


export default function Answer(props) {
    const answer = props.data;
    const type = props.type;
    const uid = useUID()
    return (
        <div>

            { type === 'RADIO' ? 
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id={uid} value={answer.answer}></input>
                <label className="form-check-label" htmlFor={uid}>{answer.answer}</label>
            </div> : null }

            { type === 'CHOICE' ? 
            
                <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id={uid}></input>
  <label className="form-check-label" htmlFor={uid}>
    {answer.answer}
  </label>
</div>
             : null
            }

            {/* <p className="card-text">{answer.answer}</p> */}
        </div>
    )
}