import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

export type SxClasses = Record<string, SxProps<Theme>>;
export type SxFunction<Args extends unknown[]> = (...args: Args) => SxClasses;
