import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

class App extends React.Component {
  state = {"name": 'e', "version": 'xd'};
  
  get_data = () => {
    fetch('http://localhost:8000/').then(resp => {
    resp.json().then(resp => {
      console.log(resp);
      this.setState({"version": resp["version"], "name": resp["name"]});
    })
    }).catch(err => {
      console.log(err);
    });
  }

  render = () => {
    this.get_data();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          API: {this.state.name} Version: {this.state.version}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

export default App;
