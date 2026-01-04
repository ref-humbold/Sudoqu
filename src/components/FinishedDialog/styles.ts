import { SxClasses } from "src/types/SxClassesType";

export const sxClasses: SxClasses = {
  text: theme => ({
    margin: theme.spacing(3),
    wordWrap: "break-word",
    whiteSpace: "pre-line"
  }),
  button: {
    fontSize: "1.5rem"
  }
};
