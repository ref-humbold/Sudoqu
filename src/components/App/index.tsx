import React from "react";

import { ThemeProvider } from "@mui/material";

import { theme } from "src/common/styles";
import { GameContextProvider } from "src/contexts/GameContext";
import { SudokuContextProvider } from "src/contexts/SudokuContext";
import MainPage from "../MainPage";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <SudokuContextProvider>
        <GameContextProvider>
          <MainPage />
        </GameContextProvider>
      </SudokuContextProvider>
    </ThemeProvider>
  );
};

export default App;
