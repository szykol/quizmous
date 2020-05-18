import React from "react";
import "./App.css";
import { UserContextProvider } from "./components/UserContext";
import { QuizContextProvider } from "./components/QuizContext";
import { QuizCreatorContextProvider } from "./components/QuizCreatorContext";
import { ToastContainer, toast } from "react-toastify";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Quizmous from "./components/Quizmous";

import { BrowserRouter as Router } from "react-router-dom";

const prefersDarkMode = true;

function App() {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <QuizContextProvider>
            <QuizCreatorContextProvider>
              <Quizmous />
              <ToastContainer
                position="bottom-right"
                autoClose={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
              />
            </QuizCreatorContextProvider>
          </QuizContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
