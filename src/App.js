import React from "react";
import "./App.css";
import { UserContextProvider } from "./components/UserContext";
import { QuizContextProvider } from "./components/QuizContext";
import { QuizCreatorContextProvider } from "./components/QuizCreatorContext";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Quizmous from "./components/Quizmous";

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
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <QuizContextProvider>
          <QuizCreatorContextProvider>
            <Quizmous />
          </QuizCreatorContextProvider>
        </QuizContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
