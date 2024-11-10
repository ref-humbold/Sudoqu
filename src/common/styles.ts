import { indigo, lightBlue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { SxClasses } from "src/types/SxClassesType";

export const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[600]
    },
    secondary: {
      main: indigo["A200"]
    }
  }
});

export const cellStyle = {
  size: "6rem",
  spacing: 0.25,
  borderColor: indigo[200]
};

export const fieldStyle = {
  spacing: 2 * cellStyle.spacing,
  borderColor: indigo[500]
};

export const sxCommon: SxClasses = {
  fullSize: {
    height: "100%",
    width: "100%"
  }
};
