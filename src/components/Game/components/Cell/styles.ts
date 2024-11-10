import { cellStyle } from "src/common/styles";
import { SxClasses } from "src/types/SxClassesType";

export const sxClasses: SxClasses = {
  cell: theme => ({
    height: cellStyle.size,
    width: cellStyle.size,
    outline: `${theme.spacing(cellStyle.spacing)} solid ${cellStyle.borderColor}`
  })
};
