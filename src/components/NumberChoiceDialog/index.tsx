import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { sxCommon } from "src/common/styles";
import { UserCellValue } from "src/types/CellValue";
import { ChosenCellType, SudokuNumber } from "src/types/Sudoku";
import ChoiceGrid from "./components/ChoiceGrid";

type NumberChoiceDialogProps = {
  open: boolean;
  currentValue: UserCellValue;
  onChooseNumber: (newType: ChosenCellType, newNumber: SudokuNumber) => void;
  onClose: () => void;
};

const NumberChoiceDialog: React.FC<NumberChoiceDialogProps> = ({
  open,
  currentValue,
  onChooseNumber,
  onClose
}) => {
  const handleChoiceClick = (type: ChosenCellType, num: SudokuNumber) => {
    onChooseNumber(type, num);
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="md">
      <DialogActions>
        <IconButton size="small" onClick={() => onClose()}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogActions>
      <DialogContent>
        <Stack sx={sxCommon.centering} direction="row" spacing={6}>
          <ChoiceGrid
            type={ChosenCellType.Options}
            currentValue={currentValue}
            onClick={handleChoiceClick}
          />
          <ChoiceGrid
            type={ChosenCellType.Fixed}
            currentValue={currentValue}
            onClick={handleChoiceClick}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default NumberChoiceDialog;
