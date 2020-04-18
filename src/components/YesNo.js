import React, { useState, useEffect } from 'react';
import { useUID } from 'react-uid';

export default function YesNo() {
    const y_uid = useUID();
    const n_uid = useUID();

    return (
    <form className="controls">
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id={y_uid} value="Yes"></input>
            <label className="form-check-label" htmlFor={y_uid}>Yes</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id={n_uid} value="No"></input>
            <label className="form-check-label" htmlFor={n_uid}>No</label>
        </div>
    </form>
    )
}