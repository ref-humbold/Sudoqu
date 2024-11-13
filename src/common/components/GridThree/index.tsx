import React from "react";
import Grid2, { Grid2Props } from "@mui/material/Grid2";

import { Coordinates } from "src/types/Sudoku";

type GridThreeProps = Pick<Grid2Props, "spacing" | "sx"> & {
  renderItem: (coords: Coordinates) => React.ReactNode;
};

const GridThree: React.FC<GridThreeProps> = ({ renderItem, ...gridProps }) => {
  const indices = [0, 1, 2];

  return (
    <Grid2 {...gridProps} container direction="column">
      {indices.map(i => (
        <Grid2 key={i} container direction="row">
          {indices.map(j => (
            <Grid2 key={j}>{renderItem(new Coordinates(i, j))}</Grid2>
          ))}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default GridThree;
