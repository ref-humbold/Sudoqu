import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { sxClasses } from "./styles";

type FinishedDialogProps = {
  open: boolean;
  onClose: () => void;
};

const FinishedDialog: React.FC<FinishedDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} maxWidth="md">
      <DialogContent>
        <Typography variant="h2" align="center" color="primary" sx={sxClasses.text}>
          Congratulations!{"\n"}You{"'"}ve finished the game.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button size="large" color="secondary" onClick={onClose} sx={sxClasses.button}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinishedDialog;
