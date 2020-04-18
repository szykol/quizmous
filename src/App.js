import React from 'react';
import './App.css';
import TitleBar from './components/TitleBar'
import ApiVersion from './components/ApiVersion'
import wrap_payload from './utils/jwt';
import Login from './components/Login';
import Quiz from './components/Quiz';
class App extends React.Component {
  render = () => {
    
  return (
    <div className="App">
      <header className="jumbotron">
        <TitleBar />
      </header>
      {/* <div className="container col-md-6 clear-top">
        <Login/>
      </div> */}
      <Quiz></Quiz>
      <footer className="footer">
        <span className="text-muted"><ApiVersion/></span>
    </footer>
    </div>
  );
  }
}

export default App;
