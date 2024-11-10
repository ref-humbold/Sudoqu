import React from "react";

import { ThemeProvider } from "@mui/material";

import { theme } from "src/common/styles";
import MainPage from "../MainPage";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
};

export default App;
