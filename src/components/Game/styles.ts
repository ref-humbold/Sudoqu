import { Theme } from "@mui/material/styles";

import { cellStyle, fieldStyle } from "src/common/styles";
import { SxClasses } from "src/types/SxClassesType";

const minSize = (theme: Theme): string =>
  `calc(9 * ${cellStyle.size} + 2 * ${theme.spacing(fieldStyle.spacing)} + 6 * ${theme.spacing(
    cellStyle.spacing
  )} )`;

export const sxClasses: SxClasses = {
  outerGrid: theme => ({
    minHeight: minSize(theme),
    minWidth: minSize(theme),
    margin: cellStyle.size
  }),
  innerGrid: theme => ({
    outline: `${theme.spacing(fieldStyle.spacing)} solid ${fieldStyle.borderColor}`
  })
};
