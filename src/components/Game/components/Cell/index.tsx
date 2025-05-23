import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";

import NumberChoiceDialog from "src/components/NumberChoiceDialog";
import { CellValue } from "src/types/CellValue";
import { CellType, NumberDisplay, SudokuNumber } from "src/types/Sudoku";
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

  const onCellClick = (cellType: CellType) => {
    if (cellType !== CellType.Predefined) {
      setChoiceDialogOpen(true);
    }

    setClicked();
  };

  const onChooseNumber = (type: CellType, num: SudokuNumber) => {
    const present = value.values.has(num);

    if (type === CellType.Fixed) {
      if (present) {
        updateValue(CellValue.empty());
      } else {
        updateValue(CellValue.fixed(num));
      }
    } else {
      if (present && value.type === CellType.Options) {
        const newValues = [...value.values].filter(v => v !== num);

        updateValue(CellValue.options(...newValues));
      } else {
        updateValue(CellValue.options(num, ...value.values));
      }
    }
  };

  const renderType = useCallback((value: CellValue): React.ReactNode => {
    switch (value.type) {
      case CellType.Empty:
        return <></>;

      case CellType.Predefined:
        return <FixedNumber value={[...value.values][0]} displayType={NumberDisplay.Defined} />;

      case CellType.Fixed:
        return <FixedNumber value={[...value.values][0]} displayType={NumberDisplay.Correct} />;

      case CellType.Options:
        return <OptionalNumbers values={value.values} />;
    }
  }, []);

  return (
    <>
      <Box
        sx={[sxClasses.cell, clicked && sxClasses.clicked]}
        onClick={() => onCellClick(value.type)}
      >
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
