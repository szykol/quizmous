import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import TitleBar from './components/TitleBar'
import ApiVersion from './components/ApiVersion'
import wrap_payload from './utils/jwt';

class App extends React.Component {
  render = () => {
    fetch('http://localhost:3000/quiz', {
      headers: {
        'Authorization': `Bearer ${wrap_payload({})}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(response => response.json()).then(quiz => console.log(quiz)).catch(err => console.log(err));
  return (
    <div className="App">
      <header className="jumbotron">
        <TitleBar />
      </header>
      <div className="container col-md-6">
          <ApiVersion />
          <button className="btn btn-primary">
            Try it
          </button>
      </div>
    </div>
  );
  }
}

export default App;
