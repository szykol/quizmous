import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import TitleBar from './components/TitleBar'
import ApiVersion from './components/ApiVersion'
import wrap_payload from './utils/jwt';
import Login from './components/Login'

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
      <div className="container col-md-6 clear-top">
        <Login/>
      </div>
      <footer className="footer">
        <span className="text-muted"><ApiVersion/></span>
    </footer>
    </div>
  );
  }
}

export default App;
