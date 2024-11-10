import React from "react";

import Box from "@mui/material/Box";

import Game from "../Game";
import { sxClasses } from "./styles";

const MainPage: React.FC = () => {
  return (
    <Box sx={sxClasses.box} component="main">
      <Game />
    </Box>
  );
};

export default MainPage;
