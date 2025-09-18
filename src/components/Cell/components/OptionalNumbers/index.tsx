import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { sxCommon } from "src/common/styles";
import { OptionsCellValue } from "src/types/CellValue";
import { SudokuNumber } from "src/types/Sudoku";

type OptionalNumbersProps = {
  values: OptionsCellValue;
};

const OptionalNumbers: React.FC<OptionalNumbersProps> = ({ values }) => {
  const valuesArray: SudokuNumber[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  return (
    <Grid sx={sxCommon.fullSize} container direction="column" justifyContent="space-evenly">
      {valuesArray.map((array, index) => (
        <Grid key={index} container direction="row" justifyContent="space-evenly">
          {array.map(v => (
            <Grid key={v}>
              <Typography
                variant="button"
                color="secondary"
                visibility={values.contains(v) ? undefined : "hidden"}
              >
                {v}
              </Typography>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default OptionalNumbers;
