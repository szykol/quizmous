import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import TitleBar from './components/TitleBar'
import ApiVersion from './components/ApiVersion'

class App extends React.Component {
  render = () => {
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
