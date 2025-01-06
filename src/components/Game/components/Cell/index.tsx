import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";

import NumberChoiceDialog from "src/components/NumberChoiceDialog";
import { CellType, NumberDisplay, SudokuNumber } from "src/types/Sudoku";
import FixedNumber from "./components/FixedNumber";
import OptionalNumbers from "./components/OptionalNumbers";
import { sxClasses } from "./styles";

type CellProps = {
  cellType: CellType;
  clicked: boolean;
  setClicked: () => void;
};

const Cell: React.FC<CellProps> = ({ cellType, clicked, setClicked }) => {
  const [choiceDialogOpen, setChoiceDialogOpen] = useState<boolean>(false);

  const onCellClick = (cellType: CellType) => {
    if (cellType !== CellType.Predefined) {
      setChoiceDialogOpen(true);
    }

    setClicked();
  };

  const renderType = useCallback((cellType: CellType): React.ReactNode => {
    switch (cellType) {
      case CellType.Empty:
        return <></>;

      case CellType.Predefined:
        return <FixedNumber value={6} displayType={NumberDisplay.Defined} />;

      case CellType.Fixed:
        return (
          <FixedNumber
            value={4}
            displayType={Math.random() >= 0.5 ? NumberDisplay.Correct : NumberDisplay.Wrong}
          />
        );

      case CellType.Options:
        return <OptionalNumbers values={new Set<SudokuNumber>([1, 3, 5, 7, 9])} />;
    }
  }, []);

  return (
    <>
      <Box
        sx={[sxClasses.cell, clicked && sxClasses.clicked]}
        onClick={() => onCellClick(cellType)}
      >
        {renderType(cellType)}
      </Box>
      <NumberChoiceDialog
        open={choiceDialogOpen}
        onChooseNumber={(type, num) => {}}
        onClose={() => {
          setChoiceDialogOpen(false);
        }}
      />
    </>
  );
};

export default Cell;
