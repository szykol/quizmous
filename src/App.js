import React, { useState } from 'react';
import './App.css';
import ApiVersion from './components/ApiVersion'
import Quiz from './components/Quiz';
import SignIn from './components/Signin';
import AppBar from './components/AppBar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { UserContextProvider } from './components/UserContext';

const prefersDarkMode = true;

function App() {
  const [logged, setLogged] = useState(false);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>

      <div className="App">
        <AppBar></AppBar>
        { !logged &&
          <SignIn onLogin={() => {
            setLogged(true)
          }}></SignIn> }
        {logged &&
          <Quiz></Quiz>
        }
        <footer className="footer">
          <span className="text-muted"><ApiVersion/></span>
      </footer>
      </div>
      </UserContextProvider>

    </ThemeProvider>
  );
}

export default App;

