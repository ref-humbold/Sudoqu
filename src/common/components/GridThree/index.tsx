import React from "react";
import Grid2, { Grid2Props } from "@mui/material/Grid2";

type GridThreeProps = Pick<Grid2Props, "spacing" | "sx"> & {
  renderItem: () => React.ReactNode;
};

const GridThree: React.FC<GridThreeProps> = ({ renderItem, ...gridProps }) => {
  const indices = [1, 2, 3];

  return (
    <Grid2 {...gridProps} container direction="column">
      {indices.map(i => (
        <Grid2 key={i} container direction="row">
          {indices.map(j => (
            <Grid2 key={j}>{renderItem()}</Grid2>
          ))}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default GridThree;
