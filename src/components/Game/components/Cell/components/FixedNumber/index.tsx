import React from "react";
import Typography from "@mui/material/Typography";

import { sxCommon } from "src/common/styles";
import Centered from "src/common/components/Centered";
import { NumberDisplay, SudokuNumber } from "src/types/Sudoku";
import { sxClasses } from "./styles";

type FixedNumberProps = {
  value: SudokuNumber;
  displayType: NumberDisplay;
};

const FixedNumber: React.FC<FixedNumberProps> = ({ value, displayType }) => {
  const getDisplayColor = (displayType: NumberDisplay) => {
    switch (displayType) {
      case NumberDisplay.Defined:
        return "textSecondary";

      case NumberDisplay.Correct:
        return "primary";

      case NumberDisplay.Wrong:
        return "error";
    }
  };

  return (
    <Centered>
      <Typography
        sx={[sxCommon.fullSize, sxClasses.value]}
        variant="button"
        color={getDisplayColor(displayType)}
      >
        {value}
      </Typography>
    </Centered>
  );
};

export default FixedNumber;
