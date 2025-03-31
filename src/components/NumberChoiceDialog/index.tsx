import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid2 from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { CellType, ChosenType, SudokuNumber } from "src/types/Sudoku";
import ChoiceGrid from "./components/ChoiceGrid";

type NumberChoiceDialogProps = {
  open: boolean;
  onChooseNumber: (type: ChosenType, num: SudokuNumber) => void;
  onClose: () => void;
};

const NumberChoiceDialog: React.FC<NumberChoiceDialogProps> = ({
  open,
  onChooseNumber,
  onClose
}) => {
  const handleChoiceClick = (type: ChosenType, num: SudokuNumber) => {
    onChooseNumber(type, num);
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="md">
      <DialogContent>
        <Grid2 container direction="row" justifyContent="center" alignItems="center" spacing={6}>
          <Grid2>
            <ChoiceGrid type={CellType.Options} onClick={handleChoiceClick} />
          </Grid2>
          <Grid2>
            <ChoiceGrid type={CellType.Fixed} onClick={handleChoiceClick} />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <IconButton size="small" onClick={() => onClose()}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default NumberChoiceDialog;
