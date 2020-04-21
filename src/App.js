import React from 'react';
import './App.css';
import TitleBar from './components/TitleBar'
import ApiVersion from './components/ApiVersion'
import wrap_payload from './utils/jwt';
import Login from './components/Login';
import Quiz from './components/Quiz';
import SignIn from './components/Signin';
import AppBar from './components/AppBar';
class App extends React.Component {
  state = {
    logged: false
  }

  render = () => {
  const { logged } = this.state;
  return (
    <div className="App">
      <AppBar></AppBar>
      { !logged &&
        <SignIn onLogin={() => {
        this.setState({logged: true})
        }}></SignIn> }
      {logged &&
        <Quiz></Quiz>
      }
      <footer className="footer">
        <span className="text-muted"><ApiVersion/></span>
    </footer>
    </div>
  );
  }
}

export default App;
