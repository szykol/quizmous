import React, { useState } from "react";
import wrap_payload from "../utils/jwt";

export default function Login() {
  const [nick, setNick] = useState();
  const [pass, setPass] = useState();
  const [register, setRegister] = useState(false);

  const login = () => {
    fetch(`http://localhost:3000/user/${register ? "register" : "login"}`, {
      method: "POST",
      body: wrap_payload({ nick, password: pass }),
    })
      .then((resp) => resp.json())
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const log_or_register = () => {
    return <span>Sign {register ? <span>up</span> : <span>in</span>}</span>;
  };

  return (
    <form className="form-signin">
      <h1 className="h3 mb-3 font-weight-normal">Please {log_or_register()}</h1>
      <label htmlFor="inputNick" className="sr-only">
        Email address
      </label>
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="text"
        onChange={(e) => setNick(e.target.value)}
        id="inputNick"
        className="form-control"
        placeholder="Nick"
        required
        autoFocus
      ></input>
      <input
        type="password"
        onChange={(e) => setPass(e.target.value)}
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        required
      ></input>
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          onChange={(e) => setRegister(e.target.checked)}
          id="inputRegister"
          className="form-control"
        ></input>
        <label htmlFor="inputRegister">Register</label>
      </div>

      <button
        className="btn btn-lg btn-primary btn-block"
        onClick={(e) => {
          e.preventDefault();
          login();
        }}
        type="submit"
      >
        {log_or_register()}
      </button>
    </form>
  );
}
