import React from "react";

import { ThemeProvider } from "@mui/material";

import { theme } from "src/common/styles";
import { GameContextProvider } from "src/contexts/GameContext";
import MainPage from "../MainPage";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GameContextProvider>
        <MainPage />
      </GameContextProvider>
    </ThemeProvider>
  );
};

export default App;
