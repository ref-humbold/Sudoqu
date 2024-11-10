import React from "react";
import Typography from "@mui/material/Typography";

import { sxCommon } from "src/common/styles";
import Centered from "src/common/components/Centered";
import { SudokuNumber } from "src/types/Sudoku";
import { sxClasses } from "./styles";

type FixedNumberProps = {
  value: SudokuNumber;
  displayWrong: boolean;
};

const FixedNumber: React.FC<FixedNumberProps> = ({ value, displayWrong }) => {
  return (
    <Centered>
      <Typography
        sx={[sxCommon.fullSize, sxClasses.value]}
        variant="button"
        color={displayWrong ? "error" : "primary"}
      >
        {value}
      </Typography>
    </Centered>
  );
};

export default FixedNumber;
