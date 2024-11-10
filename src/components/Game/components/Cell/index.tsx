import React from "react";
import { Box } from "@mui/material";

import { CellType, SudokuNumber } from "src/types/Sudoku";
import FixedNumber from "./components/FixedNumber";
import OptionalNumbers from "./components/OptionalNumbers";
import { sxClasses } from "./styles";

type CellProps = {
  cellType: CellType;
};

const Cell: React.FC<CellProps> = ({ cellType }) => {
  return (
    <Box sx={sxClasses.cell}>
      {cellType === CellType.Fixed ? (
        <FixedNumber value={4} displayWrong={Math.random() > 0.5} />
      ) : (
        <OptionalNumbers values={new Set<SudokuNumber>([1, 3, 5, 7, 9])} />
      )}
    </Box>
  );
};

export default Cell;
