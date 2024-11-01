import React from "react";

import Paper from "@mui/material/Paper";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

import { sxClasses } from "./styles";

const MainPage: React.FC = () => {
  return (
    <Paper sx={sxClasses.paper}>
      <Grid2 container justifyContent="center" alignItems="center" sx={sxClasses.grid}>
        <Grid2>
          <Typography variant="h2">SUDOQU</Typography>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default MainPage;
