import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { CellValue } from "src/types/CellValue";
import { CellType, ChosenCellType, SudokuNumber } from "src/types/Sudoku";
import ChoiceGrid from "./components/ChoiceGrid";

type NumberChoiceDialogProps = {
  open: boolean;
  currentValue: CellValue;
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
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={6}>
          <Grid>
            <ChoiceGrid
              type={CellType.Options}
              currentValue={currentValue}
              onClick={handleChoiceClick}
            />
          </Grid>
          <Grid>
            <ChoiceGrid
              type={CellType.Fixed}
              currentValue={currentValue}
              onClick={handleChoiceClick}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NumberChoiceDialog;
