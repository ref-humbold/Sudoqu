import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid2 from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { CellValue } from "src/types/CellValue";
import { CellType, ChosenCellType, SudokuNumber } from "src/types/Sudoku";
import ChoiceGrid from "./components/ChoiceGrid";

type NumberChoiceDialogProps = {
  open: boolean;
  currentValue: CellValue;
  onChooseNumber: (type: ChosenCellType, num: SudokuNumber) => void;
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
        <Grid2 container direction="row" justifyContent="center" alignItems="center" spacing={6}>
          <Grid2>
            <ChoiceGrid
              type={CellType.Options}
              currentValue={currentValue}
              onClick={handleChoiceClick}
            />
          </Grid2>
          <Grid2>
            <ChoiceGrid
              type={CellType.Fixed}
              currentValue={currentValue}
              onClick={handleChoiceClick}
            />
          </Grid2>
        </Grid2>
      </DialogContent>
    </Dialog>
  );
};

export default NumberChoiceDialog;
