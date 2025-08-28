import React from "react";
import Grid, { GridProps } from "@mui/material/Grid";

import { Coordinates } from "src/types/Sudoku";

type GridThreeProps = Pick<GridProps, "spacing" | "sx"> & {
  renderItem: (coords: Coordinates) => React.ReactNode;
};

const GridThree: React.FC<GridThreeProps> = ({ renderItem, ...gridProps }) => {
  const indices = [0, 1, 2];

  return (
    <Grid {...gridProps} container direction="column">
      {indices.map(i => (
        <Grid key={i} container direction="row">
          {indices.map(j => (
            <Grid key={j}>{renderItem(new Coordinates(i, j))}</Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default GridThree;
