import React, { useState } from "react";
import { Box } from "@mui/material";

import NumberChoiceDialog from "src/components/NumberChoiceDialog";
import {
  CellValue,
  DefinedCellValue,
  EmptyCellValue,
  FixedCellValue,
  OptionsCellValue,
  SingleCellValue
} from "src/types/CellValue";
import { ChosenCellType, SudokuNumber } from "src/types/Sudoku";
import FixedNumber from "./components/FixedNumber";
import OptionalNumbers from "./components/OptionalNumbers";
import { sxClasses } from "./styles";

type CellProps = {
  value: CellValue;
  clicked: boolean;
  setClicked: () => void;
  updateValue: (v: CellValue) => void;
};

const Cell: React.FC<CellProps> = ({ value, clicked, setClicked, updateValue }) => {
  const [choiceDialogOpen, setChoiceDialogOpen] = useState<boolean>(false);

  const onCellClick = (cellValue: CellValue) => {
    if (!(cellValue instanceof DefinedCellValue)) {
      setChoiceDialogOpen(true);
    }

    setClicked();
  };

  const onChooseNumber = (newType: ChosenCellType, newNumber: SudokuNumber) => {
    const present = value.contains(newNumber);

    switch (newType) {
      case ChosenCellType.Fixed:
        if (present && value instanceof FixedCellValue) {
          updateValue(new EmptyCellValue());
        } else {
          updateValue(new FixedCellValue(newNumber));
        }
        break;

      case ChosenCellType.Options:
        if (present && value instanceof OptionsCellValue) {
          const newValues = value.allValues().filter(v => v !== newNumber);
          updateValue(new OptionsCellValue(...newValues));
        } else {
          updateValue(new OptionsCellValue(newNumber, ...value.allValues()));
        }
        break;
    }
  };

  const renderType = (value: CellValue): React.ReactNode => {
    if (value instanceof SingleCellValue) {
      return <FixedNumber value={value} />;
    }

    if (value instanceof OptionsCellValue) {
      return <OptionalNumbers values={value} />;
    }

    return <></>;
  };

  return (
    <>
      <Box sx={[sxClasses.cell, clicked && sxClasses.clicked]} onClick={() => onCellClick(value)}>
        {renderType(value)}
      </Box>
      <NumberChoiceDialog
        open={choiceDialogOpen}
        onChooseNumber={onChooseNumber}
        onClose={() => setChoiceDialogOpen(false)}
        currentValue={value}
      />
    </>
  );
};

export default Cell;
