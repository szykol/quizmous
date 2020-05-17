import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function QuizTypeDropdown({ disabled, propType, handleChange }) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={propType}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
        >
          <MenuItem value={"YES_NO"}>YES/NO</MenuItem>
          <MenuItem value={"CHOICE"}>CHOICE</MenuItem>
          <MenuItem value={"RADIO"}>RADIO</MenuItem>
          <MenuItem value={"OPEN"}>OPEN</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
