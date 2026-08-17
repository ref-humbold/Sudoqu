import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { sxCommon } from "src/common/styles";
import { OptionsCellValue } from "src/types/CellValue";
import { SudokuNumber } from "src/types/Sudoku";
import { sxClasses } from "./styles";

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
    <Stack sx={[sxCommon.fullSize, sxClasses.numbersGrid]} direction="column">
      {valuesArray.map((array, index) => (
        <Stack key={index} sx={sxClasses.numbersGrid} direction="row">
          {array.map(v => (
            <Typography
              key={v}
              sx={[!values.contains(v) && sxClasses.hidden]}
              variant="button"
              color={values.getTextColour(v)}
            >
              {v}
            </Typography>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default OptionalNumbers;
