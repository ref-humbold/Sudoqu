import React, { useCallback } from "react";
import { Box } from "@mui/material";

import { CellType, SudokuNumber } from "src/types/Sudoku";
import FixedNumber from "./components/FixedNumber";
import OptionalNumbers from "./components/OptionalNumbers";
import { sxClasses } from "./styles";

type CellProps = {
  cellType: CellType;
  clicked: boolean;
  setClicked: () => void;
};

const Cell: React.FC<CellProps> = ({ cellType, clicked, setClicked }) => {
  const renderType = useCallback((cellType: CellType): React.ReactNode => {
    switch (cellType) {
      case CellType.Empty:
        return <></>;

      case CellType.Fixed:
        return <FixedNumber value={4} displayWrong={Math.random() > 0.5} />;

      case CellType.Options:
        return <OptionalNumbers values={new Set<SudokuNumber>([1, 3, 5, 7, 9])} />;
    }
  }, []);

  return (
    <Box sx={[sxClasses.cell, clicked && sxClasses.clicked]} onClick={setClicked}>
      {renderType(cellType)}
    </Box>
  );
};

export default Cell;
