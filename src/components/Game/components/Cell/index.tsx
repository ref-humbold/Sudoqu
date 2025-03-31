import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";

import NumberChoiceDialog from "src/components/NumberChoiceDialog";
import { CellValue } from "src/types/CellValue";
import { CellType, NumberDisplay } from "src/types/Sudoku";
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

  const renderType = useCallback((value: CellValue): React.ReactNode => {
    switch (value.type) {
      case CellType.Empty:
        return <></>;

      case CellType.Predefined:
        return <FixedNumber value={[...value.values][0]} displayType={NumberDisplay.Defined} />;

      case CellType.Fixed:
        return <FixedNumber value={[...value.values][0]} displayType={value.display} />;

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
        onChooseNumber={(type, num) =>
          updateValue(type === CellType.Fixed ? CellValue.fixed(num, true) : CellValue.options(num))
        }
        onClose={() => {
          setChoiceDialogOpen(false);
        }}
      />
    </>
  );
};

export default Cell;
