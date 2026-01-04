import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Game from "../Game";
import Timer from "../Timer";
import { sxClasses } from "./styles";
import { sxCommon } from "src/common/styles";
import FinishedDialog from "../FinishedDialog";

const MainPage: React.FC = () => {
  const [isGameFinished, setIsGameFinished] = React.useState(false);
  const [isFinishedDialogOpen, setIsFinishedDialogOpen] = React.useState(false);

  return (
    <>
      <Box sx={sxClasses.box} component="main">
        <Grid container direction="column" sx={sxCommon.fullSize}>
          <Grid>
            <Game
              onFinished={() => {
                setIsGameFinished(true);
                setIsFinishedDialogOpen(true);
              }}
            />
          </Grid>
          <Grid>
            <Timer stopped={isGameFinished} />
          </Grid>
        </Grid>
      </Box>
      <FinishedDialog open={isFinishedDialogOpen} onClose={() => setIsFinishedDialogOpen(false)} />
    </>
  );
};

export default MainPage;
