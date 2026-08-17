import React from "react";

import Box from "@mui/material/Box";
import Stack, { StackProps } from "@mui/material/Stack";

import { Coordinates } from "src/types/Sudoku";

type GridThreeProps = Pick<StackProps, "spacing" | "sx"> & {
  renderItem: (coords: Coordinates) => React.ReactNode;
};

const GridThree: React.FC<GridThreeProps> = ({ renderItem, ...stackProps }) => {
  const indices = [0, 1, 2];

  return (
    <Stack {...stackProps} direction="column">
      {indices.map(i => (
        <Stack key={i} direction="row">
          {indices.map(j => (
            <Box key={j}>{renderItem(new Coordinates(i, j))}</Box>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default GridThree;
