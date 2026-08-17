import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { sxCommon } from "src/common/styles";
import FinishedDialog from "src/components/FinishedDialog";
import Game from "src/components/Game";
import Timer from "src/components/Timer";
import { sxClasses } from "./styles";

const MainPage: React.FC = () => {
  const [isGameFinished, setIsGameFinished] = React.useState(false);
  const [isFinishedDialogOpen, setIsFinishedDialogOpen] = React.useState(false);

  return (
    <>
      <Box sx={sxClasses.box} component="main">
        <Grid sx={[sxCommon.fullSize, sxClasses.page]} container>
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
