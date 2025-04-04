import { ButtonProps } from "@mui/material/Button";
import { TypographyProps } from "@mui/material/Typography";

type ButtonMetadata = {
  variant: ButtonProps["variant"];
  size: ButtonProps["size"];
  color: ButtonProps["color"];
  text: TypographyProps["variant"];
};

export const choiceButtonMetadata = (numberPresent: boolean): ButtonMetadata => ({
  variant: numberPresent ? "contained" : "text",
  size: "small",
  color: "secondary",
  text: "h5"
});

export const fixedButtonMetadata = (numberPresent: boolean): ButtonMetadata => ({
  variant: numberPresent ? "contained" : "outlined",
  size: "medium",
  color: "primary",
  text: "h4"
});
