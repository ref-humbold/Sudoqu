import React from "react";

import { ThemeProvider } from "@mui/material";

import MainPage from "../MainPage";
import { theme } from "./styles";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
};

export default App;
